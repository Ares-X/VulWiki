---
source: "历史归档批(无原始出处标注)"
title: "Phpmyadmin 爆路径"
product: "phpMyAdmin"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "依赖旧版本文件、错误显示配置或部署保留 phpinfo；load_file() 另需数据库权限"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-92ed95b57910d06bc6f46779"
entity_id: "ve-92ed95b57910d06bc6f46779"
schema_version: "1"
---

## 收录状态复核（2026-10-03）

本文按简短的历史路径与函数线索收录，不能视为通用信息泄露漏洞。文件存在性、错误显示配置、phpinfo 部署情况和 load_file() 的数据库权限均未确认；可疑拼写和重复项保留供核对，不补猜正确路径或测试结果。本次仅静态核对；验证状态仍为未复现。

# Phpmyadmin 爆路径

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：依赖旧版本文件、错误显示配置或部署保留 phpinfo；load_file() 另需数据库权限
- 证据范围：仅八项路径/函数，没有版本、响应、来源或复现上下文，不能证明通用漏洞

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- lect_lang.lib.php 重复出现且名称可疑，需核对是否误写 select_lang.lib.php
- load_file() 是 SQL 函数而非 HTTP 路径，应拆开
- phpinfo.php 属部署配置检查，不能默认 phpMyAdmin 自带且可访问

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

    /phpmyadmin/libraries/lect_lang.lib.php
    /phpMyAdmin/index.php?lang[]=1
    /phpMyAdmin/phpinfo.php
    load_file()
    /phpmyadmin/themes/darkblue_orange/layout.inc.php
    /phpmyadmin/libraries/select_lang.lib.php
    /phpmyadmin/libraries/lect_lang.lib.php
    /phpmyadmin/libraries/mcrypt.lib.php
