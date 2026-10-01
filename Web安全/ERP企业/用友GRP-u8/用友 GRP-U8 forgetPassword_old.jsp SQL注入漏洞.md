---
source: "https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/yongyou/grp/yongyou_grpu8_forgetPasswordOld_sqli.java"
version: "具体受影响版本范围未披露"
fofa: "app=\"用友-GRP-U8\""
---

# 用友 GRP-U8 forgetPassword_old.jsp SQL注入漏洞

## 漏洞描述

用友 GRP-U8 的 `/u8qx/forgetPassword_old.jsp?action=save` 接口存在 SQL 注入风险。公开 Java PoC 在 `idCard` 参数中加入 MSSQL 延时表达式，用于识别数据库查询是否执行了外部输入。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
POST /u8qx/forgetPassword_old.jsp?action=save HTTP/1.1
Host: example.invalid
Content-Type: application/x-www-form-urlencoded

idCard=1';WAITFOR+DELAY+'0:0:3'--&inputDW=222&userName=1111
```

来源的发送函数未设置 Cookie，展示用请求却附带示例 JSESSIONID；鉴权条件需要结合部署确认，不据此宣称所有环境均无需认证。来源仅以响应超过 3000 毫秒判断。公开模板中的延时条件属于检测线索。验证时需记录正常请求基线并重复对照，确认延时随注入值变化；单次慢响应、超时或 200 状态码均不足以确认 SQL 注入。本条目未进行本地复现。

## 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

## 参考链接

- [R4gd0ll/I-Wanna-Get-All 原始 PoC（固定提交）](https://github.com/R4gd0ll/I-Wanna-Get-All/blob/d8b866af4baed03a338ce8485c25b53875461776/src/main/java/exp/oa/yongyou/grp/yongyou_grpu8_forgetPasswordOld_sqli.java)

## 网络测绘

```text
app="用友-GRP-U8"
```
