---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-u8-crm-getemaildata-fileread.yaml"
version: "具体受影响版本范围未披露"
fofa: "body=\"用友U8CRM\""
---

# 用友 U8 CRM getemaildata.php 任意文件读取漏洞

## 漏洞描述

用友 U8 CRM 的 `/ajax/getemaildata.php` 接口接受 `filePath` 文件路径。公开读取 PoC 同时设置 `DontCheckLogin=1` 并请求 Windows 的 `win.ini`，用于检查接口是否把服务器文件内容返回给请求方。文件可读范围受进程权限与操作系统影响。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
GET /ajax/getemaildata.php?DontCheckLogin=1&filePath=c:/windows/win.ini HTTP/1.1
Host: example.invalid
```

原始规则匹配 200 状态码及 `bit app support`。核对应确认响应包含该文件的实际内容，排除错误页、请求反射或固定文本。模板描述误写为文件上传，本条目按实际 GET 请求与规则归为文件读取。本文仅核对公开源码，未进行本地复现。

## 修复建议

向用友获取适用修复。在服务端统一校验身份与访问权限，避免通过客户端参数关闭登录检查；对可读取文件使用严格允许列表及路径边界检查。

## 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-u8-crm-getemaildata-fileread.yaml)

## 网络测绘

```text
body="用友U8CRM"
```
