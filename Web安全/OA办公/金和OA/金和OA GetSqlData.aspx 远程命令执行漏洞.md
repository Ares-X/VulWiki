---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA GetSqlData.aspx 远程命令执行漏洞

## 漏洞描述

金和OA C6 `/C6/Control/GetSqlData.aspx/.ashx` 接口存在远程命令执行漏洞。攻击者构造恶意请求即可在服务器上执行系统命令并回显结果。

## 影响版本

```
金和OA C6
```

## 网络测绘

```
app="金和OA"
```

## 漏洞复现

向如下接口发送请求，命令执行结果直接回显：

```
POST /C6/Control/GetSqlData.aspx/.ashx HTTP/1.1
```

请求体中携带的命令（如 `whoami`）被服务端执行，响应中返回"执行成功"及命令输出。利用时替换命令内容即可执行任意系统命令。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
