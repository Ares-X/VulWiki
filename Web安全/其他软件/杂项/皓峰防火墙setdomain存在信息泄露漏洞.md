---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "防火墙 setdomain 信息泄露线索：皓峰 / 佑友产品归属待核"
product: "皓峰/佑友防火墙待核"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "缺版本和修复，保留语雀出处"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E7%9A%93%E5%B3%B0%E9%98%B2%E7%81%AB%E5%A2%99setdomain%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa_unverified: "title="
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ccv63zl63aohrxg2"
id: "vw-b459d13962b5aeff20e4c626"
entity_id: "ve-b459d13962b5aeff20e4c626"
schema_version: "1"
---

# 防火墙 setdomain 信息泄露线索：皓峰 / 佑友产品归属待核

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：皓峰/佑友防火墙待核
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：缺版本和修复，保留语雀出处
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题皓峰与影响/指纹佑友冲突
2. FOFA元数据title=不完整
3. 仅/setdomain.php无响应和敏感字段，不能确认未授权泄漏
4. 缺版本和修复，保留语雀出处

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/ccv63zl63aohrxg2>

### 归档技术正文

# 一、漏洞简介
深圳市皓峰通讯技术有限公司成立于2004年，位于深圳市高新技术产业园，是经过国家认定的“双软”企业和“国家高新技术企业”。皓峰防火墙系统存在信息泄露漏洞，攻击者可利用该漏洞获取敏感信息。

# 二、影响版本
+ 佑友防火墙

# 三、资产测绘
```plain
fofa：title="佑友防火墙"
```


# 四、漏洞复现
```plain
/setdomain.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ccv63zl63aohrxg2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
