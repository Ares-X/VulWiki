---
source: "hatch 补库批 20260928"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "微擎 低权限后台getshell"
product: "微擎"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "低权限具体角色及编辑专题权限缺失；补原始日期/版本和修复"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E5%BE%AE%E6%93%8E%20%E4%BD%8E%E6%9D%83%E9%99%90%E5%90%8E%E5%8F%B0getshell.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-a013f2f23f9136f350094cd7"
entity_id: "ve-a013f2f23f9136f350094cd7"
schema_version: "1"
---

# 微擎 低权限后台getshell

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：微擎
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：低权限具体角色及编辑专题权限缺失；补原始日期/版本和修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 简介和影响均空，作者明确未测最新版
2. 低权限具体角色及编辑专题权限缺失
3. 关键请求/结果仅截图，HTML转PHP机制无源码佐证
4. 需要发布内容产生变更需回滚
5. 补原始日期/版本和修复

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

/web/index.php?c=site&a=editor

这个文件可以编辑html，然后前台会解析成php

没测试最新版

比如编辑专题：/web/index.php?c=site&a=editor&do=page&multiid=0

上架抓包

![](./.resource/微擎低权限后台getshell/media/rId24.png)

改html内容为php

![](./.resource/微擎低权限后台getshell/media/rId25.png)

复制前台url

![](./.resource/微擎低权限后台getshell/media/rId26.png)

访问之

![](./.resource/微擎低权限后台getshell/media/rId27.png)

四、参考链接
------------

> <https://www.t00ls.net/viewthread.php?tid=54258&extra=&page=1>
