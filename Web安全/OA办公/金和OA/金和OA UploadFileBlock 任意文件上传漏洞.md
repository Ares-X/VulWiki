---
source: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-uploadfileblock-fileupload.yaml"
fofa: "app=\"金和网络-金和OA\""
version: "未知"
---

# 金和OA UploadFileBlock 任意文件上传漏洞

## 漏洞描述

afrog 公开模板记录金和 OA JC6 的 `UploadFileBlock` 上传问题。模板向 `filename` 表单项提交随机文件名和随机纯文本，随后回读对应路径，验证文件是否落地。公开模板没有使用原新增文中的多级目录穿越路径。

## 影响版本与前提

金和 OA JC6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="金和网络-金和OA"
```

## 公开验证资料

以下仅为上传入口与编码类型；随机边界、文件名和请求体由来源模板给出，不是可单独发送的验证报文。

```http
POST /jc6/JHSoft.WCF/Attachment/UploadFileBlock HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary{{rboundary}}
```

## 判定与证据边界

完整 multipart 数据及变量见来源。第一步要求 HTTP 200 且包含 `fileObj`、`realUrl`；第二步 GET `/jc6/upload/` 下本次随机文件名，要求 HTTP 200 且包含相同随机文本。模板虽使用 `.jsp` 后缀，文件内容仍是纯文本；回读成功只能证明文件写入和可访问，不能证明 JSP 执行或取得服务器权限。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。校验上传权限、文件类型与保存路径，将上传目录与脚本执行目录分离。

## 参考来源

- [公开检测模板](https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-uploadfileblock-fileupload.yaml)
