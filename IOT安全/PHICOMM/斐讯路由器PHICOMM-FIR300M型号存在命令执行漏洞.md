---
source: "wy876 漏洞文库"
id: "vw-ad8a537ee68f0ca0b5e70241"
entity_id: "ve-ad8a537ee68f0ca0b5e70241"
schema_version: "1"
title: "斐讯路由器PHICOMM-FIR300M型号存在命令执行漏洞"
product: "Phicomm FIR300M"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "默认或有效admin登录，未列固件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/PHICOMM/%E6%96%90%E8%AE%AF%E8%B7%AF%E7%94%B1%E5%99%A8PHICOMM-FIR300M%E5%9E%8B%E5%8F%B7%E5%AD%98%E5%9C%A8%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lgwam74g3eagpt5z"
source_status: "recorded"
previous_fofa_unverified: "web.title=="
hunter: "web.title==\"FIR300M\""
---

# 斐讯路由器PHICOMM-FIR300M型号存在命令执行漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Phicomm FIR300M
- 本文讨论：后台pingAddr管道命令注入
- 版本、权限与配置前提：默认或有效admin登录，未列固件
- 资料类型：GUI步骤笔记；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 有可控参数/绕前端校验描述，但无请求路径、响应/固件
- 系统管理控制台与系统工具系统诊断表述不统一
- Hunter查询被错误提取到残缺fofa元数据
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 原语雀内容和默认口令条件待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
斐讯路由器PHICOMM-FIR300M使用默认密码admin/admin登录后台后，系统管理的控制台功能虽然在前端过滤了敏感字符，但是在后端未对输入内容做校验，导致可抓包修改参数造成任意命令执行。

# 二、影响版本
+ 斐讯路由器PHICOMM-FIR300M

# 三、资产测绘
+ hunter`web.title=="FIR300M"`
+ 特征


# 四、漏洞复现
1.使用默认密码`admin/admin`登录路由器


2. `系统工具`->`系统诊断`


3. 修改ip地址为`8.8.8.8`，使用burp抓包,修改`pingAddr`参数为`ip|ls`后放行


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lgwam74g3eagpt5z>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
