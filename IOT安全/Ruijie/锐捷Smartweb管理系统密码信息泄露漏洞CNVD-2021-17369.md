---
cnvd: "CNVD-2021-17369"
source: "wy876 漏洞文库"
id: "vw-d247c2b8e445fc2e0bcf2931"
entity_id: "ve-d247c2b8e445fc2e0bcf2931"
schema_version: "1"
fofa_unverified: "web.body="
title: "锐捷Smartweb管理系统 密码信息泄露漏洞 CNVD-2021-17369"
product: "Ruijie Smartweb"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CNVD-2021-17369"
referenced_identifiers: ""
prerequisites: "guest/guest会话，固件未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7Smartweb%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E5%AF%86%E7%A0%81%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9ECNVD-2021-17369.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/cg198cbfykmz8637"
source_status: "recorded"
---

# 锐捷Smartweb管理系统 密码信息泄露漏洞 CNVD-2021-17369

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie Smartweb
- 本文讨论：CNVD-2021-17369 webuser-auth.xml泄露
- 版本、权限与配置前提：guest/guest会话，固件未知
- 资料类型：重复凭据泄露PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 与781动作相同，新增CNVD和图像指纹互补
- Base64是解码不是解密；无响应/原CNVD链接；Hunter提取残缺
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- CNVD精确型号范围待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


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
