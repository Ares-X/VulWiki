---
source: "https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/yongyou/grp/yongyou_grpu8_dialogmoreUsercheck_sqli.java"
version: "具体受影响版本范围未披露"
fofa: "app=\"用友-GRP-U8\""
---

# 用友 GRP-U8 dialog_moreUser_check.jsp SQL注入漏洞

## 漏洞描述

用友 GRP-U8 的 `/u8qx/dialog_moreUser_check.jsp` 接口存在 SQL 注入风险。公开 Java PoC 在 `mlid` 参数中使用 MSSQL 延时表达式。成功注入可能影响数据库数据；来源没有提供系统命令执行证据。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
GET /u8qx/dialog_moreUser_check.jsp?mlid=1';WAITFOR+DELAY+'0:0:3'-- HTTP/1.1
Host: example.invalid
```

原始代码使用大于 3000 毫秒的响应时长作为判定，未做基线或重复对照。公开模板中的延时条件属于检测线索。验证时需记录正常请求基线并重复对照，确认延时随注入值变化；单次慢响应、超时或 200 状态码均不足以确认 SQL 注入。本条目未进行本地复现。

## 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

## 参考链接

- [R4gd0ll/I-Wanna-Get-All 原始 PoC（固定提交）](https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/yongyou/grp/yongyou_grpu8_dialogmoreUsercheck_sqli.java)

## 网络测绘

```text
app="用友-GRP-U8"
```
