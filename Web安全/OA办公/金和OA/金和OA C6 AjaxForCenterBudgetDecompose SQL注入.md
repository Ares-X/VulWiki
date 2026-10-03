---
schema_version: "1"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
source_status: "recorded"
id: "VW-20261003-CN03"
title: "金和 OA C6 AjaxForCenterBudgetDecompose SQL 注入"
product: "金和 OA C6"
identifier_status: "unknown"
version: "原作者仅标注金和 OA C6；具体版本、构建号及部署补丁状态未知"
fixed_version: "unknown；已读来源未给出厂商修复版本"
prerequisites: "可达 JHSoft.Web.CostControl 中 getBudgetTime 分支；认证、角色及网关要求未知；公开延时载荷使用 SQL Server WAITFOR 语法"
side_effects: "公开 PoC 使数据库等待 4 秒，占用连接和请求资源并产生日志；未包含写文件、账号修改或第三方回连；其他预算写入分支不在本次验证材料范围"
source: "Mrxn 原始代码审计；eeeeeeeeee-code/POC 汇编"
source_url: "https://mrxn.net/jswz/jhsoft-AjaxForCenterBudgetDecompose-sqli.html"
archive_url: "https://github.com/eeeeeeeeee-code/POC/blob/11c00cc5e129cb7d6ed8a99ef1fc108ae83719b8/wpoc/金和OA/金和OA-AjaxForCenterBudgetDecompose.ashx存在SQL注入.md"
fofa: "app=\"金和网络-金和OA\""
---

# 金和 OA C6 AjaxForCenterBudgetDecompose SQL 注入

> 待核：原作者公布了可追踪的参数到 SQL 调用链，固定汇编补充完整延时请求。具体构建、认证前提和修复版本仍未知。本库只完成静态核对，没有执行 PoC；原站图片返回 403，本次未看到图片像素，不将文字说明写成已核实的截图结果。

## 入口与根因

Mrxn 在 2025-12-24 发布的[原始分析](https://mrxn.net/jswz/jhsoft-AjaxForCenterBudgetDecompose-sqli.html)将组件定位到 `JHBase.Web.CostControl.dll`。`AjaxForCenterBudgetDecompose.ashx` 的 `ProcessRequest` 在 `strType=getBudgetTime` 时，读取 `strYear`、`strDeptId`、`type` 和 `TimeType`，传给四参数 `DataPeriodList`；后者将前三项送入 `BudgetDecomposeDao.GetBudgetTime`。

DAO 查询 `DecomposeList` 时，把年度直接拼到 `DecomposeYear` 数值位置，把类型拼入 `DecomposeType` 的单引号字符串；非空部门列表再拼入 `DeptID in (...)`，最后调用 `ExecSQLReDataTable`。此处可读源码支持三项输入进入 SQL 文本的关系。公开请求只对 `type` 提供延时材料，不能据此称另外两项已逐一测试。

直接影响是 SQL 解释边界被外部输入改变。原作者进一步提到高权限数据库场景的扩大影响，但本篇没有把写文件或系统控制表述为已由该延时 PoC 证明。

## 公开验证资料

- [原作者调用链、请求模板和结果说明](https://mrxn.net/jswz/jhsoft-AjaxForCenterBudgetDecompose-sqli.html)
- [固定汇编的完整 HTTP 延时请求](https://github.com/eeeeeeeeee-code/POC/blob/11c00cc5e129cb7d6ed8a99ef1fc108ae83719b8/wpoc/金和OA/金和OA-AjaxForCenterBudgetDecompose.ashx存在SQL注入.md)，blob `c8a5a50b4912c32eb774eeeee7081f186cafa244`

汇编请求采用 POST `/c6/JHSoft.Web.CostControl/Decompose/AjaxForCenterBudgetDecompose.ashx` 与 `application/x-www-form-urlencoded`，请求体保持原值如下：

```text
strType=getBudgetTime&strDeptId=1&strYear=2012&type=1'waitfor delay '0:0:4'--&TimeType=1
```

`type` 对应源码中带单引号的 `DecomposeType`，与公开载荷中的字符串闭合位置相符；这里仅是静态对照，未据此承诺任意数据库驱动、连接设置或版本都能执行。

原作者 HTTP 模板写的是 `type=SQLI_POC`，并把 Host 写为 `jhsoft.mrxn.net`；`SQLI_POC` 是来源原有占位符，不是本库替换，不能把原模板称为已经包含完整延时字符串。汇编 Host 原本为空。本篇把两个来源分别链接，不拼接成冒称作者原样验证过的报文，也不访问其中示例目标。

### 预期、实际与验证限制

汇编载荷预期由 SQL Server 延时语句产生约 4 秒等待。原作者正文称观察到 4 秒；本次无法读取原站图片，也没有独立计时或响应记录。来源没有给出完整软件构建、正常请求对照或补丁后结果。公开示例没有 Cookie 并不能证明生产部署没有认证或网关要求。

未来如另行取得隔离验证授权，应先确认 C6 构建和数据库、取得正常预算期间请求作为基线，再对照公开材料与日志；需区分真实数据库等待、网络抖动、认证失败、SQL 错误及功能未启用。延时会占用连接和请求资源，不应以并发大量重放弥补证据不足。该请求没有写操作，但同一处理器还有预算相关分支，不应随意切换到保存或其他有状态操作。

## 修复与缓解

截至 2026-10-03，已读原始分析和汇编没有提供可确认的厂商补丁版本。应由厂商核实 C6 分支与更新状态。代码层需参数化年度和类型，校验部门列表中每个标识，避免字符串拼接，并复核处理器入口的认证与授权。限制费用控制接口的网络可达范围、设置合理超时和数据库最小权限是临时缓解，不等同于漏洞已修复。

## 来源与历史

1. [Mrxn 原始分析](https://mrxn.net/jswz/jhsoft-AjaxForCenterBudgetDecompose-sqli.html)，页面发布时间 2025-12-24 13:05（+08:00）：源码调用链与作者结果主张；图片本次未核实
2. [eeeeeeeeee-code/POC 固定汇编](https://github.com/eeeeeeeeee-code/POC/blob/11c00cc5e129cb7d6ed8a99ef1fc108ae83719b8/wpoc/金和OA/金和OA-AjaxForCenterBudgetDecompose.ashx存在SQL注入.md)：完整延时请求和资产指纹，固定提交 `11c00cc5e129cb7d6ed8a99ef1fc108ae83719b8`；未找到该汇编对请求独立测试的环境说明

本篇为原创中文综合说明，仅摘录必要的请求体并链接完整来源。没有执行 PoC、扫描或访问示例目标。
