---
schema_version: "1"
id: "VW-20261012-anydesk-anypwn"
title: "AnyDesk Linux 8.0.2 会话协议堆溢出（AnyPwn）"
product: "AnyDesk"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
primary_identifiers: "CVE-2026-109390"
vulnerability_name: "AnyPwn"
identifier_status: "active"
version: "Linux 8.0.0–<8.0.3（CNA）；公开完整利用仅覆盖 8.0.2 固定 x86_64 构建"
fixed_version: "8.0.3（研究者说明；厂商发布日志仅称修复崩溃）"
prerequisites: "服务模式运行且直接 TCP/7070 可达；公开代码使用固定构建偏移"
side_effects: "大量堆分配、额外连接、服务崩溃或以服务权限执行命令；默认标记文件可能残留"
source_status: "recorded"
source_url: "https://github.com/v12-security/pocs/tree/b2b6b53779c04a58e4735232adaefd7a8b8f3625/anydesk"
verification_source: "https://cveawg.mitre.org/api/cve/CVE-2026-109390"
review_date: "2026-10-13"
---

# AnyDesk Linux 8.0.2 会话协议堆溢出

[V12 原始报告及代码](https://github.com/v12-security/pocs/tree/b2b6b53779c04a58e4735232adaefd7a8b8f3625/anydesk)把问题定位到 mode-5 数据长度与对象头相加的 32 位溢出：分配变小，后续复制仍按原长度处理。正常 Linux 服务常以 root 运行，但实际权限取决于服务配置。

公开完整利用仅覆盖直接 TCP/7070。作者对 relay 路径的结论来自另一个最小 Frida 触发器，不能据此称仓库提供了完整中继利用。测试环境是 Linux Mint 22.3、内核 6.14.0-37-generic，8.0.2 二进制 SHA-256 为 62ee04ad48dc039dd9c927f998e56143c87a9c5e12d28654f78c7f6340394f5a。堆布局不合适时会崩溃，不应把连接断开当作命令执行证明。

研究者称 8.0.3 已修复；[厂商 Linux 日志](https://anydesk.com/en/changelog/linux)记载该版本在 2026-06-23 修复一个可能导致崩溃的问题，没有独立的同名安全公告。不可扩展为所有平台或所有旧版本均已验证。

静态检查覆盖上述固定提交的 README、主程序和全部六个协议辅助模块；没有运行代码。依赖 Python 标准库、未锁版本的 rich，以及生成临时自签证书的 OpenSSL。setup.py 是协议消息构造模块，不是安装入口；该目录没有依赖安装器或 workflow。代码向指定目标建连并关闭证书验证，存在堆喷洒和命令执行副作用；默认标记文件没有自动清理，也没有独立验证执行结果。未审计 rich、OpenSSL 或仓库其他产品目录。未见明确源码许可，本文仅作原创摘要并链接原材料。

## 编号与产品范围补核（2026-10-13）

[CNA 正式记录](https://cveawg.mitre.org/api/cve/CVE-2026-109390)于 2026-10-12 发布 CVE-2026-109390，列 Linux 8.0.0 至小于 8.0.3 为受影响范围，CVSS 3.1 9.8。编号和产品范围是本次新增的权威元数据；上方针对公开完整利用的固定 8.0.2 构建、直接 TCP/7070 与 relay 限定保持不变，不能用 CNA 范围宣称所有构建已由公开利用验证。
