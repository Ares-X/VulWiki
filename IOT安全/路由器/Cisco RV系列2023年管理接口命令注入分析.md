---
schema_version: "1"
id: "VW-20261019-MRXN-160"
title: "Cisco RV系列2023年管理接口命令注入分析"
product: "Cisco RV340/RV340W/RV345/RV345P；RV320/RV325；RV016/RV042/RV042G/RV082"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "20117及20128：RV320/RV325，原文精确固件未知；20118：官方列出的六型号全部软件版本"
prerequisites: "有效Administrator管理凭据及Web管理接口可达；各编号型号范围独立"
side_effects: "命令注入可启动无认证shell型Telnet、修改配置和系统文件；附带上传案例覆写登录页"
source: "winmt；Mr-xn固定提交转载"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/383"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
review_date: "2026-10-19"
primary_identifiers: "CVE-2023-20117;CVE-2023-20118;CVE-2023-20128"
referenced_identifiers: "CVE-2023-20073"
---

# Cisco RV系列2023年管理接口命令注入分析

## 范围与既有条目的关系

winmt的文章同时描述五个入口。本页主讨论CVE-2023-20117、CVE-2023-20118、CVE-2023-20128，不能把它们当成同一个漏洞。其CVE-2023-20073上传分析与本库《从零开始复现 CVE-2023-20073》的正文均指向相同上传端点、认证发生过晚、Portal分支移动文件及登录页软链，属同一实体；本页仅保留交叉参考，不新增第二个20073主入口。

## 三个独立触发链

- CVE-2023-20117：RV320/RV325的`ssi.cgi`中`NK_UiConfNeedPasswd`处理`md5_password`，来源称过滤遗漏换行，再拼接给`system`；入口对应`/sys_setting.htm`的refresh操作。Cisco确认需要有效Administrator凭据，不能简化成任意普通登录账户。
- CVE-2023-20118：`config.exp`及`config_mirror.exp`的`export_cert&`分支调用`exportconfig_CertFile`，来源指出以`&`分段的输入进入命令字符串；示例依赖`MY_CA`及`${IFS}`的分隔作用。Cisco明确列出RV016、RV042、RV042G、RV082、RV320、RV325全部软件版本，但这不意味着每台设备都独立完成过该请求验证。
- CVE-2023-20128：RV320/RV325的`import_config.cgi`读取multipart字段，第一字段为1时处理第二字段`USBconfigfile`；来源把分号后的内容关联到`upgradefromusb`和`system`。仅对括号转义不足以证明命令字符串安全。此编号不扩展到RV0xx，Cisco明确将其列为不受该组漏洞影响。

三个演示都启动shell型Telnet服务，属于改变系统状态和增加访问入口，不是只读验证。本文不运行这些请求；完整报文、原Cookie和字段值仍在固定来源正文中。

## 其他入口及去重结论

20073的官方范围为RV340/RV340W/RV345/RV345P、1.0.03.29及以前。来源所说非空Authorization不是有效身份认证；覆盖登录页可能造成存储型XSS，不能因为路径上出现system就自动声称任意OS命令执行。已有正文已经解释这些环节。

第五个SNMP案例位于`ssi.cgi`的`NK_SNMPUpdate`，涉及`snmp_Mib2SysName`、`snmp_Mib2SysContact`和`snmp_Mib2SysLocation`。作者称厂商内部已知；没有可靠编号对应。本页只保留这种未编号历史观察，不能推定它就是20118或20026。其`%ea`与`%09`转换行为只属于来源特定实现。

## 官方处置与资料限制

2026-10-19核对的Cisco公告说明上述系列进入EOL，不发布修复；减少远程管理暴露属于缓解而非消除缺陷。20118公告建议限制443和60443并关闭远程管理，LAN管理仍可达。20073公告另列禁用RESTCONF组件的缓解，不能拿它代替其他三个注入入口的处理。

原文只称当时最新版，除20073官方范围和20118明确全版本范围外，不补造精确固件号。源码分析主体含反汇编截图，图片像素未审阅；本次核对的是完整文字、公开请求与厂商字段对应。文中没有候选本地安装脚本或依赖清单，外链固件、仿真工具及作者其他漏洞仓库没有递归审计，不将本篇收录当成执行许可。

## 来源

- [winmt原文](https://www.iotsec-zone.com/article/383)：各入口、字段、函数及源作者实验
- [Cisco 20117与20128公告](https://www.cisco.com/c/en/us/support/docs/csa/cisco-sa-sb-rv32x-cmdinject-cKQsZpxL.html)：型号、管理员权限及EOL
- [Cisco 20118所在公告](https://www.cisco.com/c/en/us/support/docs/csa/cisco-sa-sbr042-multi-vuln-ej76Pke5.html)：单独编号的权限、型号、版本和处置；不采用合集总评分替代单项
- [Cisco 20073公告](https://www.cisco.com/c/en/us/support/docs/csa/cisco-sa-sb-rv-afu-EXxwA65V.html)：既有实体的版本范围与RESTCONF缓解

## 审阅与使用边界

本页为原创中文资料摘要，记录历史研究，不是2026年新披露。来源中的完整请求、脚本、公开测试值和图片仍保留在固定提交的原文中，本页没有改写或脱敏原始文件。仅作静态文字审阅；未运行PoC、扫描器、安装器或固件，未访问示例目标，未独立复现，未查看原文图片像素。原作者授权未确认，不把汇编仓库的Apache-2.0许可证当作转载正文或外部工具的授权。

固定来源的iot目录为Markdown资料，未附本文专用安装器、依赖清单或工作流。汇编仓库的RSS更新工作流和脚本已有独立静态审阅：使用未锁定版本的Python依赖、可写仓库权限及外部RSS输入，不能因此宣称整个仓库或外链供应链安全。本摘要不导入可执行组件。

[本次固定提交原文](https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/思科企业级路由器0day漏洞挖掘（水漏洞版）.md)
