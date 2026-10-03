---
schema_version: "1"
id: "VW-20261003-LPE-0004"
title: "sudo-rs sudoedit路径竞态与越权写入（GHSA-f42v-x7gq-phc8）"
product: "sudo-rs sudoedit"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "GHSA-f42v-x7gq-phc8"
referenced_identifiers: ""
identifier_status: "active"
version: "sudo-rs >=0.2.8且<0.2.15；非默认细粒度sudoedit规则"
fixed_version: "上游0.2.15；Ubuntu26.04回补sudo-rs 0.2.13-0ubuntu1.2"
prerequisites: "本地账户已有指定文件的sudoedit授权；可控路径符号链接；须满足规则要求的认证；无sudoedit权限或已有完整编辑权限不因此新增权限"
side_effects: "越权创建/改写目标目录中同名文件；可写sudoers包含目录后扩大权限；修改授权文件会产生持久安全影响"
source: "sudo-rs维护团队；Ubuntu Security Team"
source_status: "recorded"
source_url: "https://github.com/trifectatechfoundation/sudo-rs/security/advisories/GHSA-f42v-x7gq-phc8"
---

# sudo-rs sudoedit路径竞态与越权写入（GHSA-f42v-x7gq-phc8）

## 核对与材料类型

上游于2026-08-31公布GHSA，Ubuntu于2026-09-01发布修复。2026-10-03核对官方规则、竞态步骤与版本；未复现。官方资料是具体手工触发示例，不含一键竞态脚本；本篇不冒称已审计独立EXP，也不虚构CVE编号。

## 原理与实际前提

sudoedit对路径做安全规范化后应复用同一结果进行策略判断与打开文件。上游解释，惰性迭代结果没有先collect，导致规范化执行两次；符号链接竞态可令“被检查的目录”和“实际打开的目录”不同。文件名仍受原授权约束，不能直接描述成任意完整路径写入。

## 官方触发示例

[上游Example](https://github.com/trifectatechfoundation/sudo-rs/security/advisories/GHSA-f42v-x7gq-phc8)使用以下规则和命令，原值保留：

```text
user ALL=sudoedit /etc/hosts
sudoedit link/hosts
```

示例要求并发进程使 `link` 快速交替指向 `/etc` 与另一个目标目录，目标是让策略检查接受 `/etc/hosts`，随后打开另一目录下同名的 `hosts`。这些步骤假定实验管理员事先设置授权规则，不是攻击者已经能修改sudoers。根权限影响还依赖目标目录会消费这个同名文件，例如sudoers的 `@includedir`；普通目录写入结果并不自动证明root。

这两个文本行均不是只读检查。配置、竞态文件与越权编辑必须只在授权、可恢复虚拟机里处理；若测试触及sudoers包含目录，需要恢复新增文件及权限并核对规则。不存在“一次没赢竞态就安全”的结论。本库只阅读官方示例，没有补写竞态脚本、执行编辑器或改授权。

## 修复和来源

- [上游v0.2.15发布](https://github.com/trifectatechfoundation/sudo-rs/releases/tag/v0.2.15)确认修复；0.2.7及更早没有sudoedit功能，不在此问题范围
- [USN-8708-1](https://ubuntu.com/security/notices/USN-8708-1)仅列Ubuntu26.04与回补包0.2.13-0ubuntu1.2；版本号低于0.2.15的发行版包不必然未修复
- 静态审閱官方advisory API响应SHA256：`1b7165b01b3495bc9a309d4a5f67e584ba367037d47d7d202b5af0bac6e0ed51`。这是公告正文快照标识，不是可执行脚本哈希
