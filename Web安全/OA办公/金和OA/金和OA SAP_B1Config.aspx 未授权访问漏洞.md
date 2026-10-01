---
source: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-oa-sap-b1config-disclosure.yaml"
fofa: "app=\"金和网络-金和OA\""
version: "未知"
---

# 金和OA SAP_B1Config.aspx 未授权访问漏洞

## 漏洞描述

afrog 公开模板记录金和 OA C6 的 `SAP_B1Config.aspx` 配置页面未授权访问问题。请求定位到 SAP B1 集成配置页面，模板通过页面字段判断访问结果。

## 影响版本与前提

金和 OA C6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="金和网络-金和OA"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /C6/JHsoft.CostEAI/SAP_B1Config.aspx/?manage=1 HTTP/1.1
```

## 判定与证据边界

上游要求 HTTP 200，正文同时包含 `txtLicenseServer`、`txtDatabaseServer`。这些字段用于确认配置页面可见；敏感值是否泄露须进一步核对实际值。GET 页面及字段可见不能证明修改配置的权限，因此不保留“篡改连接配置”的结论。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。对配置读取接口实施身份和权限检查，避免向未授权调用者返回敏感配置。

## 参考来源

- [公开检测模板](https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-oa-sap-b1config-disclosure.yaml)
