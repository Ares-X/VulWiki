# JCG JHR-N835R 后台存在命令执行

# 一、漏洞简介
JCG JHR-N835R 后台存在命令执行，通过 ; 分割 ping 命令导致任意命令执行

# 二、影响版本
+ JCG JHR-N835R 

# 三、资产测绘
+ hunter`web.body="graphics/bottom.gif"`
+ 特征


# 四、漏洞复现
1. 通过默认账号`admin/admin`登录


2. 在后台系统工具那使用 PING工具，使用 ; 命令执行绕过


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xq0kmca04hi8g2yd>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
