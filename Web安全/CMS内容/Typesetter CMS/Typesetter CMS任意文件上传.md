---
source: "历史归档批(无原始出处标注)"
product: "TypesetterCMS version unspecified"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Typesetter CMS任意文件上传"
prerequisites: "来源所述条件，未列明部分仍待核：管理员Uploaded files上传/解压权限，PHP落点处理器可执行"
side_effects: "未执行；本文需注意的操作影响：明确直接php上传失败、ZIP解压后成功应保留差异；但文件被看作HTML的异常未解释，GIF未查看不能确认执行；缺版本/请求/来源/payload，只有两GIF；管理员上传解压安全边界未说明"
source_status: "unknown"
id: "vw-b9b7d0b79b608cc6649dd743"
entity_id: "ve-b9b7d0b79b608cc6649dd743"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：管理员Uploaded files上传/解压权限，PHP落点处理器可执行

- **结论使用边界（1）**：明确直接php上传失败、ZIP解压后成功应保留差异；但文件被看作HTML的异常未解释，GIF未查看不能确认执行。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：缺版本/请求/来源/payload，只有两GIF；管理员上传解压安全边界未说明。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Typesetter CMS任意文件上传

- Steps to reproduce
    1- As admin go to Content menu and click on Uploaded files
    2- Inside the try to upload a .php file, and
    3- try to upload a .php file directly, check that it is not possible.
    4- Take the same .php file and place it in a .zip and upload it.
    5- Extract through functionality and open the .php file
    **Obs**: A strange behavior was that, after extracting the PHP file in functionality, it is seen as HTML.

- PoC
    ==> Executing Commands

    

    ![poc_01](./.resource/TypesetterCMS任意文件上传/media/93630451-7595a580-f9c0-11ea-9166-30d2ede2535a.gif)

![test](./.resource/TypesetterCMS任意文件上传/media/93628723-6d883680-f9bd-11ea-9d89-610565c43878.gif)