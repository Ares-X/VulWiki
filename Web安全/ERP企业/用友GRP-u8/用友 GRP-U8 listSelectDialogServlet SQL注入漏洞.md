---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/yonyou/oa%E7%94%A8%E5%8F%8B%20GRP-u8sql%E6%B3%A8%E5%85%A53.yaml"
version: "具体受影响版本范围未披露"
fofa: "app=\"用友-GRP-U8\""
---

# 用友 GRP-U8 listSelectDialogServlet SQL注入漏洞

## 漏洞描述

用友 GRP-U8 的 `listSelectDialogServlet` 接口存在 SQL 注入风险。公开 PoC 在 `slCdtn` 查询条件中插入 MSSQL 延时表达式；影响取决于应用数据库账户权限，不能由该请求直接推断可执行系统命令。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

完整原始请求见文末固定提交的 YAML：`GET /listSelectDialogServlet`，参数为 `slType`、`slCdtn`。模板还设置了多个来源 IP 请求头，这些条件不应在转写时静默省略。

原始请求带 2 秒延时表达式，但模板最终仅检查 200 状态码与 `[]`，没有检查延时，因此自动命中不足以证明 SQL 注入。应在授权环境核对正常请求基线、延时相关性及实际查询行为后再作结论。本文只保存公开 PoC 入口和其局限，未进行本地复现。

## 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

## 参考链接

- [LittleBear4/OA-EXPTOOL 原始 PoC（固定提交）](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/yonyou/oa%E7%94%A8%E5%8F%8B%20GRP-u8sql%E6%B3%A8%E5%85%A53.yaml)

## 网络测绘

```text
app="用友-GRP-U8"
```
