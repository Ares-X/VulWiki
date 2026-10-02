---
source: "Threekiii/Awesome-POC"
title: "InfluxDB 未授权访问漏洞"
product: "InfluxDB"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2019-20933"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2019-20933"
prerequisites: "认证开启但shared-secret为空；已存在用户名；lab1.6.6"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-565acc5b80a9f415fdc05df1"
entity_id: "ve-39de8feced832d74291b9445"
schema_version: "1"
canonical: "Web安全/数据库/InfluxDB/InfluxDB-JWT-认证绕过漏洞-CVE-2019-20933.md"
relation_type: "duplicate_of"
---

# InfluxDB 未授权访问漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：认证开启但shared-secret为空；已存在用户名；lab1.6.6
- 证据范围：与22共同Vulhub式叙述，证据请求仅图片

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 遗漏CVE及完整版本/修复范围
- JWT签名误称加密；过期时间只是历史样例
- 同22重复正文，22补了HTTP请求和更多来源，可择优合并
- 保留认证开启、空密钥及存在用户前提

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

influxdb是一款著名的时序数据库，其使用jwt作为鉴权方式。在用户开启了认证，但未设置参数`shared-secret`的情况下，jwt的认证密钥为空字符串，此时攻击者可以伪造任意用户身份在influxdb中执行SQL语句。

JWT，全称是JSON Web Token，是一种易于使用、无状态的鉴权方式。简单来说，就是Server端把JSON数据经过加密做成token，以授权给Client端。

参考链接：

- https://www.komodosec.com/post/when-all-else-fails-find-a-0-day
- https://docs.influxdata.com/influxdb/v1.7/administration/config/#http-endpoints-settings

## 环境搭建

执行如下命令启动influxdb 1.6.6：

```shell
docker-compose up -d
```

环境启动后，访问`http://your-ip:8086/debug/vars`即可查看一些服务信息，但此时执行SQL语句则会出现401错误：

![image-20220224131904529](./.resource/InfluxDB未授权访问漏洞/media/202202241319614.png)

## 漏洞复现

借助https://jwt.io/来生成jwt token：

```
{
  "alg": "HS256",
  "typ": "JWT"
}
{
  "username": "admin",
  "exp": 1745680213
}
```

其中，`admin`是一个已经存在的用户，`exp`是一个时间戳，代表着这个token的过期时间，你需要设置为一个未来的时间戳，`secret`置空。

最终生成的token：

![image-20220224132837081](./.resource/InfluxDB未授权访问漏洞/media/202202241328222.png)

发送带有这个jwt token的数据包，注意Content-Type设置为`application/x-www-form-urlencoded`。

可见SQL语句执行成功：

![image-20220224133310332](./.resource/InfluxDB未授权访问漏洞/media/202202241333480.png)


---

> 来源：Threekiii/Awesome-POC
