---
source: "hatch 补库批 20260928"
product: "EyouCMS1.4.2?（标题1.42）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Eyoucms 1.42 后台插件getshell"
prerequisites: "来源所述条件，未列明部分仍待核：后台账号+插件密码/首次设置；Apache .htaccess适用部署；插件安装权限"
side_effects: "未执行；本文需注意的操作影响：.htaccess绕过描述在PHP目录增加该文件并删除php语义不清，关键内容仅截图"
source_status: "unknown"
id: "vw-0002e17da0a84e69b9c2d525"
entity_id: "ve-0002e17da0a84e69b9c2d525"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台账号+插件密码/首次设置；Apache .htaccess适用部署；插件安装权限

- **适用与权限边界（1）**：版本1.42需规范化核验，不能静默认定1.4.2。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（2）**：.htaccess绕过描述在PHP目录增加该文件并删除php语义不清，关键内容仅截图。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **适用与权限边界（3）**：允许插件部署代码是否跨越原有信任边界未论证；爆破插件密码无速率条件证据。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Eyoucms 1.42 后台插件getshell

一、漏洞简介
------------

需要进后台+知道后台插件密码

二、漏洞影响
------------

三、复现过程
------------

需要知道后台密码+后台插件密码

//如果第一次使用插件，那么密码可以直接设置，如果管理员设置过了，则可以选择爆破

插件有格式限制，可以从官网随便下个，解压后插入php文件重新打包上传

![](./.resource/Eyoucms1.42后台插件getshell/media/rId24.png)

可以看出文件已成功解压到服务器

![](./.resource/Eyoucms1.42后台插件getshell/media/rId25.png)

直接访问403，分析了下受.htaccess影响不能解析，在php文件目录增加该文件并删除php,重新上传该插件，即可解析

![](./.resource/Eyoucms1.42后台插件getshell/media/rId26.png)

![](./.resource/Eyoucms1.42后台插件getshell/media/rId27.png)
