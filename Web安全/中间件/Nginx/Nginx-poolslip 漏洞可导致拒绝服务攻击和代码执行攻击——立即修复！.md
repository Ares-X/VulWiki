---
cve: "CVE-2026-9256"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Nginx-poolslip 漏洞可导致拒绝服务攻击和代码执行攻击——立即修复！"
product: "NGINX ngx_http_rewrite_module及F5派生产品"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-9256"
referenced_identifiers: "CVE-2026-42945"
identifier_role: "primary"
prerequisites: "特定重叠PCRE捕获组与多捕获替换配置；RCE还需适用堆布局、ASLR处理，默认不普遍触发"
verification_source: "https://nginx.org/en/security_advisories.html"
source_status: "unknown"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-8b6c3b407601e5acf8e35eda"
entity_id: "ve-8b6c3b407601e5acf8e35eda"
schema_version: "1"
---

# Nginx-poolslip 漏洞可导致拒绝服务攻击和代码执行攻击——立即修复！

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：特定重叠PCRE捕获组与多捕获替换配置；RCE还需适用堆布局、ASLR处理，默认不普遍触发
- 证据范围：同模块不同漏洞编号应区分；文本将共享内存池利用面说成旧补丁没有修复底层问题，不能因此认定42945修复失败。

### 已有来源支持的更正

- 确认9256 rewrite溢出，0.1.17–1.31.0，1.31.1/1.30.2修复；42945另列不是同漏洞

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 影响版本开头句0.1.17存在1.30.1漏洞1.31.0语法残缺，表格才可读
- F5派生产品的无/没有任何是未修复还是不受影响需核官方表列，不能缺来源直接推所有下游有漏洞
- 没有F5或研究者原始链接，指针滑动机制和已传播PoC无代码/实证
- 正文NGINX CVSS8.1/9.2与官方自身medium评分体系需标来源，不宜混用
- 0.x无法修复应理解无官方支持修补而非技术不可能
- HTML表格样式占多数内容，产品名NGINX网关架构/F5 DoS攻击翻译错误

### 核验来源

- https://nginx.org/en/security_advisories.html

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-05-24 09:12  
  
全球部署最广泛的网络服务器之一中新披露的一个漏洞，迫使管理员们再次启动紧急补丁程序。  
  
该漏洞被追踪为CVE-2026-9256，公开昵称为 nginx-poolslip，它影响 NGINX Plus 和 NGINX Open Source，并且可以通过未经身份验证的远程攻击者通过纯 HTTP 触发。  
  
该漏洞存在于 中ngx_http_rewrite_module，与最近的“NGINX Rift”漏洞（CVE-2026-42945）涉及的组件相同。  
  
根据 F5 的建议，当重写指令使用具有不同、重叠的 PCRE 捕获组的正则表达式模式（例如 ^/((.*))$）与引用多个捕获的替换字符串配对时，就会出现这种情况，例如$1$2在重定向或参数上下文中。  
  
在这种情况下，攻击者发送精心构造的请求可以触发 NGINX 工作进程中的堆缓冲区溢出漏洞 (CWE-122)。NGINX 为每个请求使用一个专用的内存池，并在请求完成后一次性释放所有内存。  
  
在该池结构内部，NGINX 维护着一个清理处理程序的链表，如果攻击者能够覆盖或重定向该处理程序指针，池销毁就成为控制流劫持的机会。  
  
早期的 Rift 漏洞利用了缓冲区大小计算错误，而 poolslip 漏洞则通过不同的代码路径，在同一池中相邻的链接结构之间触发受控指针“滑动”，从而攻击同一个损坏目标。  
  
至关重要的是，研究人员证实，针对先前缺陷的补丁未能修复底层内存池攻击面，这使得更新后的代码库中出现 poolslip 漏洞成为可能。  
  
至少，该漏洞会导致工作进程崩溃并重启，从而造成拒绝服务攻击。更严重的是，在地址空间布局随机化 (ASLR) 被禁用或攻击者可以绕过 ASLR 的系统上，代码执行仍然可能发生。  
  
F5指出，该漏洞不涉及控制平面，完全属于数据平面问题。该漏洞的严重程度评级为高/8.1（CVSS v3.1）和严重/9.2（CVSS v4.0）。  
  
鉴于 NGINX 在反向代理、API 网关和 Kubernetes 入口控制器中的普遍应用，其暴露的资源占用范围非常巨大。  
## 受影响版本及修复方案  
  
NGINX 开源版0.1.17存在1.30.1漏洞1.31.0；请升级到 1.30.2 或 1.31.1。R32–R36 上的 NGINX Plus 用户应升级到 R36 P5 或 R32 P7，37.x 用户应升级到 R37.0.1.1。  
  
<table><thead><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">产品</span></font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">易受攻击的版本</span></font></font></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">修复版本</span></font></font></th></tr></thead><tbody><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">NGINX Plus</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">37.0.0</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">R32 – R36</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">37.0.1.1</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">R36 P5、R32 P7</span></font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">NGINX 开源</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">1.31.0</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">1.0.0 – 1.30.1</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">0.1.17 – 0.9.7</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">1.31.1</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">和 1.30.2 版本</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">无法修复</span></font></font></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">NGINX实例管理器</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">2.17.0 – 2.22.0</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">没有任何</span></font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">F5 WAF for NGINX</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">5.9.0 – 5.13.0</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">没有任何</span></font></font></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">NGINX App Protect WAF</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">5.2.0 – 5.8.0</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">4.10.0 – 4.16.0</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">无</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">无</span></font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">F5 DoS攻击NGINX</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">4.9.0</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">没有任何</span></font></font></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">NGINX App Protect DoS</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">4.3.0 – 4.7.0</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">没有任何</span></font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">NGINX 网关架构</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">2.0.0 – 2.6.1</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">1.3.0 – 1.6.2</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">无</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">无</span></font></font></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">NGINX 入口控制器</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">5.0.0 – 5.4.2</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">4.0.0 – 4.0.1</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">3.5.0 – 3.7.2</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">无</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">无</span></font></font><br style="box-sizing: border-box;"/><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">无</span></font></font></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">NGINX（所有其他产品）</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">没有任何</span></font></font></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><span leaf="">不适用</span></font></font></td></tr></tbody></table>  


下游产品，包括 NGINX 实例管理器、F5 WAF for NGINX、NGINX 应用保护（WAF 和 DoS 防护）、NGINX 网关架构和 NGINX 入口控制器，都继承了存在漏洞的组件，应在修复程序发布后进行更新。0.x 分支将不会修复此漏洞。  
  
该漏洞由 Winfunc Research 的 Mufeed VH、Nebula Security 和 Vexera AI 共同发现。由于已有概念验证活动在传播，各组织应立即修复该漏洞。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
