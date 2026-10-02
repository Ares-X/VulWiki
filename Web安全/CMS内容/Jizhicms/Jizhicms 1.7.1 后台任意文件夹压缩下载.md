---
source: "hatch 补库批 20260928"
product: "JizhiCMS1.7.1 Plugins.output"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Jizhicms 1.7.1 后台任意文件夹压缩下载"
prerequisites: "来源所述条件，未列明部分仍待核：后台插件输出权限、知道目录名且服务账户可读"
side_effects: "未执行；本文需注意的操作影响：无完整URL/filepath例值/响应，关键证据仅图；引用219配置删除资源疑似错图"
source_status: "unknown"
id: "vw-a3283f67cf378025a32cef6e"
entity_id: "ve-a3283f67cf378025a32cef6e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台插件输出权限、知道目录名且服务账户可读

- **操作与副作用边界（1）**：无完整URL/filepath例值/响应，关键证据仅图；引用219配置删除资源疑似错图。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **适用与权限边界（2）**：依赖前文frparam不等于已证任意目录，需要路径规范化与读权限范围。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Jizhicms 1.7.1 后台任意文件夹压缩下载

一、漏洞简介
------------

二、漏洞影响
------------

Jizhicms 1.7.1

三、复现过程
------------

这个的漏洞触发同样位于CMS的插件部分,只需要替换filepath的值为要打包的文件夹即可打包网站下载![1.png](./.resource/Jizhicms1.7.1后台配置文件删除/media/rId24.png)根据url定位到漏洞位置，位于/A/c/PluginsController.php中的output函数，该函数主要是获取用户输入的文件名然后进行压缩在发送给客户端,还是这个frparam函数，由前文可知该函数没有对传入的参数进行过滤的话，从而导致了可以进行目录穿越，然后可以压缩不同的目录下载任意文件，条件只需要知道文件夹名字![2.png](./.resource/Jizhicms1.7.1后台配置文件删除/media/rId25.png)

参考链接
--------

> https://xz.aliyun.com/t/7775\#toc-3
