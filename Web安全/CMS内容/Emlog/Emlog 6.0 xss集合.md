---
source: "hatch 补库批 20260928"
product: "Emlog6.0 + Uploadify SWF"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Emlog 6.0 xss集合"
prerequisites: "来源所述条件，未列明部分仍待核：SWF依赖Flash；cookie-token XSS须能设置受害者cookie；侧边栏编辑权限"
side_effects: "未执行；本文需注意的操作影响：三种漏洞需独立实体，SWF归Uploadify组件"
source_status: "unknown"
id: "vw-c103e7c9ae8574621b69fef1"
entity_id: "ve-c103e7c9ae8574621b69fef1"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：SWF依赖Flash；cookie-token XSS须能设置受害者cookie；侧边栏编辑权限

- **结论使用边界（1）**：三种漏洞需独立实体，SWF归Uploadify组件。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（2）**：cookie手工改包只说明反射点，缺远程设置cookie链；侧边栏允许HTML是否跨权限未论证。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **事实待核（3）**：后两类payload仅图；无视浏览器filter未限定历史浏览器/Flash版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Emlog 6.0 xss集合

一、漏洞简介
------------

二、漏洞影响
------------

Emlog 6.0

三、复现过程
------------

### Uploadify SWF XSS

Emlog使用了 uploadify.swf 的方式上传文件，文件路径
/include/lib/js/uploadify/uploadify.swf

payload

    http://www.0-sec.org/include/lib/js/uploadify/uploadify.swf?uploadifyID=00%22%29%29;}catch%28e%29{alert%281%29;}//%28%22&movieName=%22])}catch(e){if(!window.x){window.x=1;alert(document.cookie)}}//&.swf

效果，可无视浏览器filter：

![](./.resource/Emlog6.0xss集合/media/rId25.png)

### 反射xss

此处的XSS主要发生在cookie上，因为某些页面如
admin/admin\_log,admin/sort.php,admin/link.php页面需要在表单中添加了hidden属性的token值，而这个token值直接从用户的cookie中取得，导致了一个反射型XSS

拦截抓包修改cookie中的token值如下：

![](./.resource/Emlog6.0xss集合/media/rId27.png)

效果：

![](./.resource/Emlog6.0xss集合/media/rId28.png)

### 侧边栏存储性XSS

为了同样是为了支持HTML代码的输出，没有转义对应的脚本代码标签，导致了存储性的XSS存在

![](./.resource/Emlog6.0xss集合/media/rId30.png)
