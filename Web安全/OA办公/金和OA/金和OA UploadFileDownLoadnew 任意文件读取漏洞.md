---
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/jinhe/jinhe-oa-c6-upload-lfi.yaml"
fofa: "app=\"金和网络-金和OA\""
version: "未知"
---

# 金和OA UploadFileDownLoadnew 任意文件读取漏洞

## 漏洞描述

Nuclei 官方模板记录金和 OA C6 的 `UploadFileDownLoadnew.aspx` 文件读取问题，以 `FilePath` 请求站点中的 `JHFileConfig.ini`。

## 影响版本与前提

金和 OA C6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="金和网络-金和OA"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /c6/JHSoft.Web.CustomQuery/UploadFileDownLoadnew.aspx/?FilePath=../Resource/JHFileConfig.ini HTTP/1.1
```

## 判定与证据边界

上游要求 HTTP 200，并同时匹配 `MaxFolderTotal=1`、`[JHFile]`、`FolderTotal=1`。应确认返回的确是配置文件内容；不从这一固定样例推断所有服务器路径均可读。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。在服务端规范化并校验文件路径，将读取范围限定为授权目录，并校验调用者对目标文件的权限。

## 参考来源

- [公开检测模板](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/jinhe/jinhe-oa-c6-upload-lfi.yaml)
