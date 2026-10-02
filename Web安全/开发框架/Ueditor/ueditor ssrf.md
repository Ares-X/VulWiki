---
source: "hatch 补库批 20260928"
product: "UEditor / JSP与PHP远程抓图"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ueditor ssrf"
prerequisites: "来源所述条件，未列明部分仍待核：无版本范围；两个后端混列"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-b0f2cd1e36310c76df3c4a0e"
entity_id: "ve-b0f2cd1e36310c76df3c4a0e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：无版本范围；两个后端混列

代码与实验材料：三条URL，其中两条抓公网百度图片仅正常功能，内网仅127.0.0.1一条

来源证据范围：无原始出处

- **结论使用边界（1）**：公网抓取不能证明SSRF越界；依据：“存在就抓取成功”不足证明可访问受限内网或绕过策略。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：未分实现和影响范围；依据：旧getRemoteImage.jsp与controller JSP/PHP不能共享未知版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ueditor ssrf

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

存在漏洞路径：

    /ueditor/jsp/getRemoteImage.jsp?upfile=http://127.0.0.1/favicon.ico?.jpg

    /ueditor/jsp/controller.jsp?action=catchimage&source[]=https://www.baidu.com/img/baidu_jgylogo3.gif

    /ueditor/php/controller.php?action=catchimage&source[]=https://www.baidu.com/img/baidu_jgylogo3.gif

    存在就会抓取成功、也可以抓取外网的测
