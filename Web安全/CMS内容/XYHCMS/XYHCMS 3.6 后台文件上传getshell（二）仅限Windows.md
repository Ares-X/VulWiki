---
source: "hatch 补库批 20260928"
product: "XYHCMS3.6"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "XYHCMS 3.6 后台文件上传getshell（二）仅限Windows"
prerequisites: "来源所述条件，未列明部分仍待核：WindowsNTFS/PHPuploadAPIbehavior; adminextensionconfig; PHPexecution"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-617b99f9d1785d9dc315b127"
entity_id: "ve-617b99f9d1785d9dc315b127"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：WindowsNTFS/PHPuploadAPIbehavior; adminextensionconfig; PHPexecution

- **代码与转录边界（1）**：Windows总会忽略::$DATA过泛，ADS语法/文件API/版本需限定。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **结论使用边界（2）**：允许附件类型通常是扩展，文中填shell.php::$DATA整文件名与pathinfo实际后缀如何匹配需核。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：无完整multipart/落盘响应，不能仅去掉后缀URL证明执行。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（4）**：与618同黑名单但平台绕过独立应保留；无原始源/补丁。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XYHCMS 3.6 后台文件上传getshell（二）仅限Windows

一、漏洞简介
------------

windows系统特性，windows会将 `::$DATA`忽略

二、漏洞影响
------------

XYHCMS 3.6

三、复现过程
------------

### 漏洞分析

`/App/Manage/Controller/SystemController.class.php`

    if (!empty($data['CFG_UPLOAD_FILE_EXT'])) {
                    $data['CFG_UPLOAD_FILE_EXT'] = strtolower($data['CFG_UPLOAD_FILE_EXT']);
                    $_file_exts = explode(',', $data['CFG_UPLOAD_FILE_EXT']);
                    $_no_exts = array('php', 'asp', 'aspx', 'jsp');
                    foreach ($_file_exts as $ext) {
                        if (in_array($ext, $_no_exts)) {
                            $this->error('允许附件类型错误！不允许后缀为：php,asp,aspx,jsp！');
                        }
                    }
                }

### 漏洞复现

1.  进入后台
2.  系统设置-\>网站设置-\>上传配置-\>允许附件类型
3.  添加类型 `shell.php::$DATA`
4.  点击下面的
    `水印图片上传`上传以上后缀shell，此时点不点提交都已经传入服务器
5.  之后会在图片部分显示上传路径，在windows下面，会自动忽略后面的。
6.  用蚁剑访问 `http://www.0-sec.org/路径去掉::$DATA`
