---
cve: "CVE-2026-4257"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【紧急】Supsystic Contact Form 插件 CVE-2026-4257 漏洞：未经身份验证即可 RCE！  
原创 爱坤
                    爱坤  爱坤sec   2026-05-11 18:30  
  
# 一 漏洞描述  
  
WordPress 的 Supsystic Contact Form 插件存在服务器端模板注入 (SSTI) 漏洞，可导致远程代码执行 (RCE)，该漏洞存在于 1.7.36 及更早版本中。这是由于该插件使用了Twig_Loader_String未沙箱化的 Twig 模板引擎，并且其cfsPreFill预填充功能允许未经身份验证的用户通过 GET 参数将任意 Twig 表达式注入表单字段值。这使得未经身份验证的攻击者可以利用 Twig 注册任意registerUndefinedFilterCallback()PHP 回调函数的方法，在服务器上执行任意 PHP 函数和操作系统命令。  
  
CVSS 评分 9.8  
# 二 影响版本  
```
<= 1.7.36
```  
# 三 搜索语法  
```
body="/wp-content/plugins/contact-form-by-supsystic/"
```  
# 四 影响范围  
  
大约596个资产  
  
![](https://mmbiz.qpic.cn/mmbiz_png/uqtLGQlJSxWSYotPGgwibCGGLGJSSKp5vNIkBdsVrXgP7bGKt90SjlpIy49dkiagK0SnRLibF4YdS5GGaiajVuatRqbD2CamaxwbtNwudWPGthU/640?wx_fmt=png&from=appmsg "")  
  
五 工具获取  
```
https://github.com/shootcannon/CVE-2026-4257/blob/main/cve-2026-4257.py
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/uqtLGQlJSxXYaBwlslH9IoibPh2mDJibNia5Oh77X1G5oZH2YFLO9w4gvtbmol2xFIDc0lwGPdFEYwgKqWgLeKQiaz1X1gHcn0FRbRXk6SKJpDw/640?wx_fmt=png&from=appmsg "")  
  
  
【严重声明】本文所涉及的工具、思路和操作手法仅用于本地安全测试以及教育目的，禁止将其用于非法入侵或对他人的系统进行攻击以及盈利，一切后果由操作者自行承担！！！下载后的24小时请删除。  
  
更多精彩文章与工具分享 欢迎关注  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
