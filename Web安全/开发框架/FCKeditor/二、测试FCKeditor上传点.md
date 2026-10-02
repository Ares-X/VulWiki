---
source: "hatch 补库批 20260928"
product: "FCKeditor connector discovery"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "二、测试FCKeditor上传点"
prerequisites: "来源所述条件，未列明部分仍待核：Unspecified; ASP/PHP/ASPX/JSP variants"
side_effects: "未执行；本文需注意的操作影响：Finding upload/test endpoint does not establish arbitrary upload; duplicate default.html and path/case variants"
source_status: "unknown"
id: "vw-ce1ad28c5a89013b1d7220b2"
entity_id: "ve-ce1ad28c5a89013b1d7220b2"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Unspecified; ASP/PHP/ASPX/JSP variants

代码与实验材料：Path list only; no demonstration permissions or upload validation bypass

来源证据范围：Import only

- **适用与权限边界（1）**：Finding upload/test endpoint does not establish arbitrary upload; duplicate default.html and path/case variants。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 2.测试FCKeditor上传点

一、漏洞简介
------------

二、影响范围
------------

三、复现过程
------------

    FCKeditor/editor/filemanager/browser/default/connectors/test.html
    FCKeditor/editor/filemanager/upload/test.html
    FCKeditor/editor/filemanager/connectors/test.html
    FCKeditor/editor/filemanager/connectors/uploadtest.html

    FCKeditor/_samples/default.html
    FCKeditor/_samples/asp/sample01.asp
    FCKeditor/_samples/asp/sample02.asp
    FCKeditor/_samples/asp/sample03.asp
    FCKeditor/_samples/asp/sample04.asp
    FCKeditor/_samples/default.html
    FCKeditor/editor/fckeditor.htm
    FCKeditor/editor/fckdialog.html

    FCKeditor/editor/filemanager/browser/default/connectors/asp/connector.asp?Command=GetFoldersAndFiles&Type=Image&CurrentFolder=/
    FCKeditor/editor/filemanager/browser/default/connectors/php/connector.php?Command=GetFoldersAndFiles&Type=Image&CurrentFolder=/
    FCKeditor/editor/filemanager/browser/default/connectors/aspx/connector.aspx?Command=GetFoldersAndFiles&Type=Image&CurrentFolder=/
    FCKeditor/editor/filemanager/browser/default/connectors/jsp/connector.jsp?Command=GetFoldersAndFiles&Type=Image&CurrentFolder=/
    FCKeditor/editor/filemanager/browser/default/browser.html?Type=Image&Connector=http://www.site.com/fckeditor/editor/filemanager/connectors/php/connector.php
    FCKeditor/editor/filemanager/browser/default/browser.html?Type=Image&Connector=http://www.site.com/fckeditor/editor/filemanager/connectors/asp/connector.asp
    FCKeditor/editor/filemanager/browser/default/browser.html?Type=Image&Connector=http://www.site.com/fckeditor/editor/filemanager/connectors/aspx/connector.aspx
    FCKeditor/editor/filemanager/browser/default/browser.html?Type=Image&Connector=http://www.site.com/fckeditor/editor/filemanager/connectors/jsp/connector.jsp

    FCKeditor/editor/filemanager/browser/default/browser.html?type=Image&connector=connectors/asp/connector.asp
    FCKeditor/editor/filemanager/browser/default/browser.html?Type=Image&Connector=connectors/jsp/connector.jsp
    fckeditor/editor/filemanager/browser/default/browser.html?Type=Image&Connector=connectors/aspx/connector.Aspx
    fckeditor/editor/filemanager/browser/default/browser.html?Type=Image&Connector=connectors/php/connector.php
