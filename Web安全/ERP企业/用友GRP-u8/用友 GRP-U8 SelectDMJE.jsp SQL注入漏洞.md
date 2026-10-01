---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-grp-u8-selectdmje-jsp-sqli.yaml"
version: "具体受影响版本范围未披露"
fofa: "app=\"用友-GRP-U8\""
---

# 用友 GRP-U8 SelectDMJE.jsp SQL注入漏洞

## 漏洞描述

用友 GRP-U8 的 `/u8qx/SelectDMJE.jsp` 接口存在 SQL 注入风险。公开模板在 `kjnd` 参数中插入 MSSQL 延时表达式，用于检测输入是否进入 SQL 执行路径；可能影响数据库数据，具体权限范围取决于部署配置。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
GET /u8qx/SelectDMJE.jsp?kjnd=1';WAITFOR%20DELAY%20'0:0:10'-- HTTP/1.1
Host: example.invalid
```

原始模板 r0–r3 依次使用 10、6、10、6 秒延时，要求 200 状态码，并分别检查 10–12 秒和 6–8 秒的响应时长。模板描述写作 `gsdm`，实际请求使用 `kjnd`；本文按实际请求记录，未据此断言其他参数也受影响。公开模板中的延时条件属于检测线索。验证时需记录正常请求基线并重复对照，确认延时随注入值变化；单次慢响应、超时或 200 状态码均不足以确认 SQL 注入。本条目未进行本地复现。

## 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

## 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-grp-u8-selectdmje-jsp-sqli.yaml)

## 网络测绘

```text
app="用友-GRP-U8"
```
