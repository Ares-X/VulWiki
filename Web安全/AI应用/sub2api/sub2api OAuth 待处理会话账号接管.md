---
schema_version: "1"
id: "VW-20261012-CG040"
title: "sub2api OAuth 待处理会话账号接管"
product: "sub2api"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
prerequisites: "sub2api ≤ v0.1.171；仅需受害者邮箱"
side_effects: "账号接管可致 API Key/余额失窃；测试须限定授权环境"
source: "GitHub issue/PR"
source_status: "recorded"
source_url: "https://github.com/Wei-Shaw/sub2api/pull/5345"
---

# sub2api OAuth 待处理会话账号接管

## 漏洞描述

sub2api ≤ v0.1.171 的 OAuth pending 会话交换流程存在严重账号接管漏洞。攻击者仅需知道受害者注册邮箱，即可将自己的 OAuth 身份绑定到受害者账号，无需密码、邮箱验证码或用户交互。绑定后攻击者每次 OAuth 登录都会解析到受害者账号，完全控制其 API Key、账单余额和订阅额度。

根因在 `backend/internal/handler/auth_oauth_pending_flow.go`：
1. `ExchangePendingOAuthCompletion` 仅拦截 `email_completion` 和 `bind_login_required` 步骤，`choose_account_action_required` 未被保护
2. `applyPendingOAuthAdoption` 无条件调用绑定
3. `shouldBindPendingOAuthIdentity` 对 `intent=login` 无条件返回 true

影响经 pending 流程的全部 OAuth 提供商（LinuxDo、OIDC、微信、钉钉）。

## 影响版本

- 受影响：sub2api ≤ v0.1.171
- 修复版本：PR #5345 待合并

## 漏洞复现

```
# 1. 用自己的 OAuth 账号登录，停在邮箱补全步骤
# 2. 提交受害者邮箱（邮箱已存在即进入 choice 状态，无需任何验证）
POST /auth/oauth/pending/create-account
{"email": "<受害者邮箱>", "password": "<任意密码>"}

# 3. 调用 exchange 绑定身份
POST /auth/oauth/pending/exchange
{"adopt_display_name": true, "adopt_avatar": true}

# 4. 下次 OAuth 登录即获得受害者的 token 对
```

## 漏洞修复

合并 PR #5345；纵深防御：发现已存在邮箱时应转入密码/2FA 验证状态。

## 参考

- https://github.com/Wei-Shaw/sub2api/pull/5345
- https://github.com/wei-shaw/sub2api/issues/5350

> 仅限授权测试。
