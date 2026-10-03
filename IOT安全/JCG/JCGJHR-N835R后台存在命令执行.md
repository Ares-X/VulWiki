---
source: "wy876 漏洞文库"
id: "vw-9f47f17460ee785aaa4d29ff"
entity_id: "ve-9f47f17460ee785aaa4d29ff"
schema_version: "1"
title: "JCG JHR-N835R 后台存在命令执行"
product: "JCG JHR-N835R"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "admin/admin或有效后台凭据；固件未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/JCG/JCGJHR-N835R%E5%90%8E%E5%8F%B0%E5%AD%98%E5%9C%A8%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xq0kmca04hi8g2yd"
source_status: "recorded"
previous_fofa_unverified: "web.body="
hunter: "web.body=\"graphics/bottom.gif\""
---

# JCG JHR-N835R 后台存在命令执行

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：JCG JHR-N835R
- 本文讨论：ping分隔符命令注入
- 版本、权限与配置前提：admin/admin或有效后台凭据；固件未给
- 资料类型：简略后台PoC笔记；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 没有实际HTTP接口、参数、响应或命令结果，只有GUI步骤
- frontmatter fofa=web.body=残缺且正文实际是Hunter语法
- 默认口令是条件而非独立认证绕过证据
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 原语雀内容/固件范围未核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
JCG JHR-N835R 后台存在命令执行，通过 ; 分割 ping 命令导致任意命令执行

# 二、影响版本
+ JCG JHR-N835R 

# 三、资产测绘
+ hunter`web.body="graphics/bottom.gif"`
+ 特征


# 四、漏洞复现
1. 通过默认账号`admin/admin`登录


2. 在后台系统工具那使用 PING工具，使用 ; 命令执行绕过


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xq0kmca04hi8g2yd>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
