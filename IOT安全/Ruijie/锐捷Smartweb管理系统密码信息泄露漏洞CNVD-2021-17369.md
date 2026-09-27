# 锐捷Smartweb管理系统 密码信息泄露漏洞 CNVD-2021-17369

**一、漏洞简介**  
<font style="color:rgb(31, 35, 40);">锐捷网络股份有限公司无线smartweb管理系统存在逻辑缺陷漏洞，攻击者可从漏洞获取到管理员账号密码，从而以管理员权限登录。</font>  
**二、影响版本**  
<font style="color:rgb(31, 35, 40);">锐捷网络股份有限公司 无线smartweb管理系统</font>  
**<font style="color:rgb(31, 35, 40);">三、资产测绘</font>**  
●hunterweb.body="img/free_login_ge.gif"&&web.body="./img/login_bg.gif"  
●登录页面  


  
**四、漏洞复现**  
<font style="color:rgb(31, 35, 40);">使用默认口令guest/guest登录系统</font>


<font style="color:rgb(31, 35, 40);">之后访问</font>

```java
/web/xml/webuser-auth.xml
```


base64解码解密后登录admin权限后台


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cg198cbfykmz8637>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
