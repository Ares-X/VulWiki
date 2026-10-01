---
source: "https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-eHR-system-sqli.yaml"
fofa: "app=\"HJSOFT-HCM\""
version: "未知"
---

# 宏景HCM ajaxService SQL注入漏洞

## 漏洞描述

公开模板记录宏景 HCM 的 `/ajax/ajaxService` SQL 注入检测流程：先访问找回密码页面并提取会话 Cookie，再向 AJAX 接口提交 `__type=extTrans` 与编码后的 `__xml` 数据。原文所称 UNION 请求无法从其省略片段核对。

## 影响版本与前提

宏景 HCM/e-HR；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="HJSOFT-HCM"
```

## 公开验证资料

以下仅定位两步接口，未包含第二步请求体；可核对的完整报文与动态变量在来源模板中。

```http
GET /templates/index/getpassword.jsp HTTP/1.1
POST /ajax/ajaxService HTTP/1.1
```

## 判定与证据边界

完整 `__xml`、Cookie 提取方式与随机字符串变量见来源模板。模板要求两次响应均为 HTTP 200，第二次正文包含所提交随机字符串的 MD5 结果。这是查询结果的判据；登录页可达或取得 Cookie 均不等于已验证 SQL 注入。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

## 参考来源

- [公开检测模板](https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/hjsoft/hjsoft-eHR-system-sqli.yaml)
