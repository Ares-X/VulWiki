---
source: "https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-servlet-DisplayFiles-fileread.yaml"
fofa: "app=\"HJSOFT-HCM\""
version: "未知"
---

# 宏景HCM DisplayFiles 任意文件读取漏洞

## 漏洞描述

公开检测模板记录宏景 HCM 的 `/servlet/DisplayFiles` 文件读取问题。模板使用 `filepath` 传入编码路径；不能把 `filename` 当作已经证实的明文目录遍历参数。

## 影响版本与前提

宏景 HCM/e-HR；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="HJSOFT-HCM"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
GET /servlet/DisplayFiles?filename=11&filepath=LsNVAA8YXnv9U7EgvPAATTP2HJBPAATTPC2XDolqkE51gLe HTTP/1.1
```

## 判定与证据边界

上游要求 HTTP 200，且响应包含 `for 16-bit app support`。还应核对返回内容确为目标文件，排除错误页或普通文本反射。该模板只证明其给定路径与文件的检测方式，不能推出任意明文路径都可用。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。在服务端规范化并校验文件路径，将读取范围限定为授权目录，并校验调用者对目标文件的权限。

## 参考来源

- [公开检测模板](https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-servlet-DisplayFiles-fileread.yaml)
