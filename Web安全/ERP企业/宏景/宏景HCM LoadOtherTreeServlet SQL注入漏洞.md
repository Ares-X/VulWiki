---
source: "https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-loadothertree-sqli.yaml"
fofa: "app=\"HJSOFT-HCM\""
version: "未知"
---

# 宏景HCM LoadOtherTreeServlet SQL注入漏洞

## 漏洞描述

宏景 HCM 的 `/gz/LoadOtherTreeServlet` 存在公开 SQL 注入检测模板，注入位置为 `budget_id`。原文省略了决定 SQL 语法的闭合和请求参数。

## 影响版本与前提

宏景 HCM/e-HR；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="HJSOFT-HCM"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /w_selfservice/oauthservlet/%2e./.%2e/gz/LoadOtherTreeServlet?modelflag=4&budget_id=1%29%3BWAITFOR+DELAY+%270%3A0%3A5%27--&flag=1 HTTP/1.1
```

## 判定与证据边界

上游使用 5 秒延时语句，匹配条件为 `duration >= 5`。这一条件只能作为线索：单次慢响应也可能由网络或服务负载造成，须保留正常请求耗时并重复对照，不能直接写成确认注入。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

## 参考来源

- [公开检测模板](https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-loadothertree-sqli.yaml)
