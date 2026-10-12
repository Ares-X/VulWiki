---
schema_version: "1"
id: "VW-20261012-sub2api-easypay"
title: "Sub2API EasyPay 下单签名复用与回调伪造"
product: "Sub2API"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: ""
identifier_status: "unknown"
version: "d1aac6b9 修复前的相关支付实现；引入版本下限未核实，不笼统标记所有旧版本"
fixed_version: "v0.2.14"
prerequisites: "启用 EasyPay 且使用 submit.php popup 模式；普通用户能够创建自己的充值订单并取得其签名URL"
side_effects: "真实回调利用会改变订单和余额；本篇采用本地纯函数回归材料，不进行支付、请求或充值"
source_status: "recorded"
source_url: "https://github.com/Wei-Shaw/sub2api/commit/d1aac6b98989b79d66c0f52bd18dc8c3142e7601"
---

# Sub2API EasyPay 下单签名复用与回调伪造

官方修复提交和 [v0.2.14 发布记录](https://github.com/Wei-Shaw/sub2api/releases/tag/v0.2.14)确认下单签名可被复用为支付成功回调；不是破解 MD5 或获取商户密钥。原 issue #7881 本次返回410，未把论坛转载当作仍可独立读取的原始报告。

签名函数把排序后的参数值直接拼接，值内的分隔符没有结构编码。修复前 return_url 保留用户 query，popup 下单URL又把签名交给付款人，因此同一签名字符串可能对应另一组回调参数。

[完整官方回归测试](https://github.com/Wei-Shaw/sub2api/blob/d1aac6b98989b79d66c0f52bd18dc8c3142e7601/backend/internal/payment/provider/easypay_notify_security_test.go)已经逐行阅读。测试在内存中构造固定示例订单，将末尾状态字段从 return_url 值转移为顶层参数，断言新 VerifyNotification 拒绝；同时验证合法回调可接受、完整下单URL重放被拒、空值未知参数仍被拒。示例密钥是明确的测试常量，不是已发现的真实商户秘密。测试没有联网、建真实订单或资金操作。

补丁同时清除用户 return_url query，并在验签前执行通知参数白名单。单纯轮换商户密钥不能解决这种跨用途签名复用。可能受影响的运营方还需核对未实际支付的订单，不能把安装补丁等同于账目已经修复。

静态检查覆盖四文件补丁、后端go.mod、两个Makefile、全部四个workflow及完整deploy/install.sh。回归测试只依赖Go标准库和本项目支付类型；项目整体构建包含数据库/Redis测试、外部actions与发布流程。安装脚本需root，会创建服务用户、改shell、安装并启用systemd、访问ipinfo.io；下载checksum失败分支可仅警告，不能称强制校验。发布流程另有Telegram通知。未运行这些步骤，未审计全部传递依赖、发行二进制和发布辅助脚本。本篇不提供或背书一键安装。

2026-10-12核对。没有确认CVE，不擅自分配编号。本文原创中文归纳，保留完整官方证据链接，未复制第三方全文。
