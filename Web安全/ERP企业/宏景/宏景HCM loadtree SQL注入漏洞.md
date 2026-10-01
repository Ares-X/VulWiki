---
source: "https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-loadtree-sqli.yaml"
fofa: "app=\"HJSOFT-HCM\""
version: "未知"
---

# 宏景HCM loadtree SQL注入漏洞

## 漏洞描述

宏景 HCM 的 `/common/org/loadtree` 存在公开 SQL 注入检测模板，注入位置为 `parentid`。

## 影响版本与前提

宏景 HCM/e-HR；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="HJSOFT-HCM"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /w_selfservice/oauthservlet/%2e./.%2e/common/org/loadtree?params=child&treetype=1&parentid=1%27%3BWAITFOR+DELAY+%270%3A0%3A5%27--&kind=2&issuperuser=1&manageprive=1&action=1&target=1&backdate=1&jump=1 HTTP/1.1
```

## 判定与证据边界

上游以 `duration >= 5` 匹配延时。单次慢响应不足以确认注入，必须与正常请求耗时、重复请求结果对照；本文不扩展为数据提取或命令执行结论。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

## 参考来源

- [公开检测模板](https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-loadtree-sqli.yaml)
