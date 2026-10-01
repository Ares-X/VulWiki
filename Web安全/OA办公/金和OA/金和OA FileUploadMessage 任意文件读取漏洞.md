---
source: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-oa-c6-fileuploadmessage-fileread.yaml"
fofa: "app=\"金和网络-金和OA\""
version: "未知"
---

# 金和OA FileUploadMessage 任意文件读取漏洞

## 漏洞描述

afrog 公开模板记录金和 OA C6 的 `FileUploadMessage.aspx` 文件读取问题，`filename` 指向站点内的数据库连接配置文件。

## 影响版本与前提

金和 OA C6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="金和网络-金和OA"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /C6/JHSoft.WCF/FunctionNew/FileUploadMessage.aspx?filename=../../../C6/JhSoft.Web.Dossier.JG/JhSoft.Web.Dossier.JG/XMLFile/OracleDbConn.xml HTTP/1.1
```

## 判定与证据边界

上游同时要求 HTTP 200、`<DbLoginName>` 和 `<DbLoginPass>`。应确认这些标签属于返回的配置文件，而非错误提示或普通页面；本文不推断所有路径均可读取。证据中的真实凭据应遮蔽。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。在服务端规范化并校验文件路径，将读取范围限定为授权目录，并校验调用者对目标文件的权限。

## 参考来源

- [公开检测模板](https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-oa-c6-fileuploadmessage-fileread.yaml)
