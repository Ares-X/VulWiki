---
source: "https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/yongyou/grp/yongyou_grpu8_operOriztion_sqli.java"
version: "具体受影响版本范围未披露"
fofa: "app=\"用友-GRP-U8\""
---

# 用友 GRP-U8 operOriztion SQL注入漏洞

## 漏洞描述

用友 GRP-U8 的 `/services/operOriztion` SOAP 接口存在 SQL 注入风险。公开源码中的 `operOriztion` 方法将查询表达式放入 `getGsbmfaByKjnd` 的 `kjnd` 字段，并读取 `getGsbmfaByKjndReturn`。可影响数据库查询结果；来源不证明系统命令执行。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

完整 SOAP 请求及返回值处理见文末固定提交中 `operOriztion(String url, String sql)` 方法。该请求声明 `xsi`、`xsd`、`soapenv` 与 `wsdd` 命名空间，`wsdd` URI 为 `http://xml.apache.org/axis/wsdd/`。

原始文件的 `att()` 预检查实际访问另一条 `SelectDMJE.jsp` 路径，不能用它的延时结果证明 SOAP 接口存在漏洞。应以 `operOriztion()` 的 SOAP 请求和对应 `getGsbmfaByKjndReturn` 查询结果建立证据。本文删除了原文自行拼接、命名空间不完整且把表单 `+` 当 XML 空格的请求，未进行本地复现。

## 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

## 参考链接

- [R4gd0ll/I-Wanna-Get-All 原始 PoC（固定提交）](https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/yongyou/grp/yongyou_grpu8_operOriztion_sqli.java)

## 网络测绘

```text
app="用友-GRP-U8"
```
