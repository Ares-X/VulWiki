---
source: "https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-downloadcourseware-lfi.yaml"
fofa: "app=\"HJSOFT-HCM\""
version: "未知"
---

# 宏景HCM DownLoadCourseware 任意文件读取漏洞

## 漏洞描述

公开检测模板记录宏景 HCM 的 `DownLoadCourseware` 接口文件读取问题。检测请求通过 `url` 参数传入编码路径，原先把该参数直接设为 `/etc/passwd` 的写法没有对应来源。

## 影响版本与前提

宏景 HCM/e-HR；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="HJSOFT-HCM"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /w_selfservice/oauthservlet/%2e./.%2e/DownLoadCourseware?url=VHmj0PAATTP2HJBPAATTPcyRcHb6hPAATTP2HJFPAATTP59XObqwUZaPAATTP2HJBPAATTP6EvXjT HTTP/1.1
```

## 判定与证据边界

上游要求 HTTP 200，且正文包含 `for 16-bit app support`。核对真实文件内容与错误页的差异；不能由此推断 `/etc/passwd` 明文路径有效。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。在服务端规范化并校验文件路径，将读取范围限定为授权目录，并校验调用者对目标文件的权限。

## 参考来源

- [公开检测模板](https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-hcm-downloadcourseware-lfi.yaml)
