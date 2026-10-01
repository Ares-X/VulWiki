---
source: "https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-c6-getsqldata-sqli.yaml"
fofa: "app=\"金和网络-金和OA\""
version: "未知"
---

# 金和OA GetSqlData.aspx SQL注入漏洞

## 漏洞描述

afrog 将金和 OA C6 的 `GetSqlData.aspx/.ashx` 归类为 SQL 注入。公开检测样例在纯文本请求体中调用 SQL Server 的 `xp_cmdshell`，因此涉及系统命令的后果依赖数据库配置和调用权限；不能仅凭接口可达宣称任意命令执行。

## 影响版本与前提

金和 OA C6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="金和网络-金和OA"
```

## 公开验证资料

下列仅为请求入口定位，不是完整 PoC；公开模板的请求体涉及系统命令调用，原文及判据可在来源中核对。

```http
POST /C6/Control/GetSqlData.aspx/.ashx HTTP/1.1
Content-Type: text/plain
```

## 判定与证据边界

完整请求体见固定提交的公开模板，其检测条件为 HTTP 200 且正文包含 `Windows IP`。必须核对该内容确由对应请求产生；接口返回“成功”或普通页面不构成 SQL/命令执行证据。此样例也不能证明目标可在禁用 `xp_cmdshell` 或权限受限时执行命令。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

## 参考来源

- [公开检测模板](https://github.com/zan8in/afrog/blob/93e56607188ccfa4b26bc529c7fa10c92696fdc1/pocs/afrog-pocs/vulnerability/jinher-c6-getsqldata-sqli.yaml)
