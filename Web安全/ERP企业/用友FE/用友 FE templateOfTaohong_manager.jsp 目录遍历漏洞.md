---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-fe-templateoftaohong-manager-path-traversal.yaml"
version: "具体受影响版本范围未披露"
fofa: "\"FE协作\""
---

# 用友 FE templateOfTaohong_manager.jsp 目录遍历漏洞

## 漏洞描述

用友 FE 协作办公平台的 `templateOfTaohong_manager.jsp` 接口接受 `path` 参数。公开 PoC 使用上级目录序列检查目录列举，可能暴露目录结构和文件名；该验证不能单独证明任意文件内容读取。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
GET /system/mediafile/templateOfTaohong_manager.jsp?path=/../../../ HTTP/1.1
Host: example.invalid
```

原始模板同时匹配 200 状态码和 `boot.ini`、`[FE_MESSAGE_PUSH]`、`[OA]`。应确认响应实际列出预期目录外的目录项，排除登录页、错误页和静态文本匹配。本文仅核对公开源码，未进行本地复现。

## 修复建议

向用友获取适用安全更新。将可访问目录限制在固定根目录内，对规范化后的路径进行边界检查，并限制该管理接口访问权限。

## 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-fe-templateoftaohong-manager-path-traversal.yaml)

## 网络测绘

```text
"FE协作"
```
