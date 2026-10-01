---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-grp-u8-bx-historyDataChecks-sqli.yaml"
version: "具体受影响版本范围未披露"
fofa: "app=\"用友-GRP-U8\""
---

# 用友 GRP-U8 bx_historyDataCheck.jsp SQL注入漏洞

## 漏洞描述

用友 GRP-U8 的 `/u8qx/bx_historyDataCheck.jsp` 接口存在 SQL 注入风险。公开模板将 MSSQL 延时语句放入 `userName` 参数，以识别参数拼接到数据库查询后的行为；该证据不自动证明写入文件或执行系统命令。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
POST /u8qx/bx_historyDataCheck.jsp HTTP/1.1
Host: example.invalid
Content-Type: application/x-www-form-urlencoded

userName=';WAITFOR DELAY '0:0:10'--&ysnd=&historyFlag=
```

公开模板依次测试 10、6、10、6 秒延时，要求 200 状态码，响应时长分别落入 10–11 秒、6–7 秒。公开模板中的延时条件属于检测线索。验证时需记录正常请求基线并重复对照，确认延时随注入值变化；单次慢响应、超时或 200 状态码均不足以确认 SQL 注入。本条目未进行本地复现。

## 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

## 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-grp-u8-bx-historyDataChecks-sqli.yaml)

## 网络测绘

```text
app="用友-GRP-U8"
```
