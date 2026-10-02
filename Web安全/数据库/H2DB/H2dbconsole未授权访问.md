---
source: "wy876 漏洞文库"
title: "H2db console 未授权访问"
product: "H2 Database Web Console"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "两个Spring配置仅说明控制台开启和远程可达；H2版本/连接字符串/权限未知"
hunter: "web.title=\"H2 Console\""
source_status: "unknown"
side_effects: "涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。"
id: "vw-a7ff7cf82b53bad269beda1d"
entity_id: "ve-a7ff7cf82b53bad269beda1d"
schema_version: "1"
---

# H2db console 未授权访问

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：两个Spring配置仅说明控制台开启和远程可达；H2版本/连接字符串/权限未知
- 证据范围：复现仅'点击连接'、'可执行SQL'，无请求、配置或结果证据

### 本次正文校订

- 将误放入 FOFA 的 Hunter 查询按正文原式保存到 hunter 字段，不改写查询语义。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- fofa字段误装Hunter且web.title=被截断
- 版本仅产品名；缺JNDI与SQL两条路径各自条件
- 不能把控制台可访问直接判定未授权RCE
- 与16开头同文但证据残缺；作为重复摘要并入H2条目

### 操作风险与资料使用

- 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
H2 database是一款Java内存数据库，多用于单元测试。H2 database自带一个Web管理页面，在Spirng开发中，如果我们设置如下选项，即可允许外部用户访问Web管理页面，且没有鉴权：

spring.h2.console.enabled=true  
spring.h2.console.settings.web-allow-others=true  
利用这个管理页面，我们可以进行JNDI注入攻击，进而在目标环境下执行任意命令。

# 二、影响版本
+ H2db console 

# 三、资产测绘
+ hunter`web.title="H2 Console"`
+ 特征


# 四、漏洞复现
点击连接直接登陆


可执行sql命令


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tvx8qos5yau1kggz>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
