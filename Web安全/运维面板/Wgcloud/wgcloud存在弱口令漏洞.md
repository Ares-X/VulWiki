---
source: "wy876 漏洞文库"
title: "wgcloud 存在弱口令漏洞"
product: "WGCLOUD"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Version/config unknown;four guessed credentialpairs"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-201f696012992e9d748ed58e"
entity_id: "ve-201f696012992e9d748ed58e"
schema_version: "1"
previous_fofa_unverified: "app.name="
hunter: "app.name=\"WGCLOUD\""
---

# wgcloud 存在弱口令漏洞

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Version/config unknown;four guessed credentialpairs
- 证据范围：No login endpoint,documented defaults or result;list alone not proof product vulnerability

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- P0 unsupported defaultcredential attribution;verify each against officialdocs before calling vulnerability
- fofa field truncatedHunter app.name=
- No versions,mandatory passwordchange behavior or test evidence
- Classify as deployment hardening/configuration note rather than universal flaw

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

# 一、漏洞简介
WGCLOUD设计思想为新一代极简运维监控系统，提倡快速部署，降低运维学习难度，全自动化运行，无模板和脚本。wgcloud 存在弱口令漏洞。

# 二、影响版本
+ WGCLOUD

# 三、资产测绘
+ hunter`app.name="WGCLOUD"`

# 四、漏洞复现
```plain
admin/111111
admin/admin123
admin/mall123
admin/promotion123
```


[wgcloud.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222141179-a4f038b2-589b-4f05-a78e-dbe4f397f14f.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xgfgq2u0fd358i6o>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
