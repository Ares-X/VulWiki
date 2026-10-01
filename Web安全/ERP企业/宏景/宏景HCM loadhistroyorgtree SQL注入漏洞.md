---
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/cves/2023/CVE-2023-6655.yaml"
fofa: "app=\"HJSOFT-HCM\""
version: "宏景 e-HR 2020"
cve: "CVE-2023-6655"
---

# 宏景HCM loadhistroyorgtree SQL注入漏洞

## 漏洞描述

CVE-2023-6655 记录宏景 e-HR 2020 的 `loadhistroyorgtree` 接口 SQL 注入，输入位置为 `parentid`。公开 Nuclei 模板包含产品页面识别和延时请求两步。

## 影响版本与前提

CNA 记录确认 e-HR 2020；其他版本是否受影响、确切修复版本未知。公开模板针对无需提供登录 Cookie 的请求，但本次未核验实际部署。

## 网络测绘

```text
app="HJSOFT-HCM"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /w_selfservice/oauthservlet/%2e./.%2e/general/inform/org/loadhistroyorgtree?isroot=child&parentid=1%27%3BWAITFOR+DELAY+%270%3A0%3A6%27--&kind=2&catalog_id=11&issuperuser=111&manageprive=111&action=111&target= HTTP/1.1
```

## 判定与证据边界

模板先要求首页为 HTTP 200 且包含 `/hcm/themes/`，再以注入请求的 `duration >= 6` 为检测线索。单次超过 6 秒不能独立确证 SQL 注入，应结合正常请求基线及重复对照排除网络和服务波动。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

## 参考来源

- [公开检测模板](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/cves/2023/CVE-2023-6655.yaml)
- [公开CVE 记录](https://github.com/CVEProject/cvelistV5/blob/main/cves/2023/6xxx/CVE-2023-6655.json)
