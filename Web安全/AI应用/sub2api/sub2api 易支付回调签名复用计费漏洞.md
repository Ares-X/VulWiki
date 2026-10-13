---
schema_version: "1"
id: "VW-20261013-CG055"
title: "sub2api 易支付回调签名复用计费漏洞"
product: "sub2api"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
prerequisites: "sub2api 启用易支付 + popup 模式；仅需普通注册账号"
side_effects: "签名复用可致零成本充值；测试须限定授权环境"
source: "星悦安全；wxvl"
source_status: "recorded"
source_url: "https://www.xyusec.com/"
---

# sub2api 易支付回调签名复用计费漏洞

## 漏洞描述

sub2api 的易支付（EasyPay）回调验签存在签名复用漏洞：攻击者无需商户密钥（pkey），即可伪造支付成功回调给任意自己的订单入账。影响所有启用易支付 + popup（submit.php 跳转）模式的部署。

双缺陷：
1. `easyPaySign` 按 key 排序后 `k=v&k=v` 直接拼接，值中的 `&/=` 不转义——一个参数的值里可"藏"另一个参数
2. `return_url` 的 query 原样保留 + popup 模式下单签名暴露在攻击者浏览器

攻击者下单时 `return_url=https://站点/payment/result?trade_status=TRADE_SUCCESS`，伪造的回调参数集合排序拼接后与下单签名串逐字节一致即通过验签，零成本任意金额充值。

## 影响版本

- 受影响：sub2api（启用易支付 + popup 模式）
- 修复版本：待发布

## 漏洞复现

```go
// 1. 下单（popup 模式）：return_url 末尾藏着 trade_status=TRADE_SUCCESS
returnURL := "https://site.example.com/payment/result?order_id=99&out_trade_no=ORDER123&status=success&trade_status=TRADE_SUCCESS"

// 2. 伪造回调：return_url 只编码前半段，trade_status 升为顶层参数
rawCallback := cb.Encode() + "&trade_status=TRADE_SUCCESS" + "&sign=" + sign + "&sign_type=MD5"
// 修复前实测：err == nil, n.Status == "success" —— 伪造入账成功
```

## 漏洞修复

修复签名拼接转义；净化 return_url query。

## 参考

- 星悦安全（2026-10-06）

> 仅限授权测试。
