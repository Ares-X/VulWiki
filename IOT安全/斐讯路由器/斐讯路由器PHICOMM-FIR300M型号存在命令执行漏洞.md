# 斐讯路由器PHICOMM-FIR300M型号存在命令执行漏洞

# 一、漏洞简介
斐讯路由器PHICOMM-FIR300M使用默认密码admin/admin登录后台后，系统管理的控制台功能虽然在前端过滤了敏感字符，但是在后端未对输入内容做校验，导致可抓包修改参数造成任意命令执行。

# 二、影响版本
+ 斐讯路由器PHICOMM-FIR300M

# 三、资产测绘
+ hunter`web.title=="FIR300M"`
+ 特征


# 四、漏洞复现
1.使用默认密码`admin/admin`登录路由器


2. `系统工具`->`系统诊断`


3. 修改ip地址为`8.8.8.8`，使用burp抓包,修改`pingAddr`参数为`ip|ls`后放行


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lgwam74g3eagpt5z>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
