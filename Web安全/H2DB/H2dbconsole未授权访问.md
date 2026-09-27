# H2db console 未授权访问

# 一、漏洞简介
H2 database是一款Java内存数据库，多用于单元测试。H2 database自带一个Web管理页面，在Spirng开发中，如果我们设置如下选项，即可允许外部用户访问Web管理页面，且没有鉴权：

spring.h2.console.enabled=true  
spring.h2.console.settings.web-allow-others=true  
利用这个管理页面，我们可以进行JNDI注入攻击，进而在目标环境下执行任意命令。

# 二、影响版本
+ H2db console 

# 三、资产测绘
+ hunter`web.title="H2 Console"`
+ 特征


# 四、漏洞复现
点击连接直接登陆


可执行sql命令


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tvx8qos5yau1kggz>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
