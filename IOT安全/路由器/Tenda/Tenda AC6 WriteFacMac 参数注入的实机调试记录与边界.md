---
schema_version: "1"
id: "vw-mrxn-20261019-107"
title: "Tenda AC6 WriteFacMac 参数注入的实机调试记录与边界"
product: "Tenda AC6 V2.0 httpd"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
version: "US_AC6V2.0RTL_V15.03.06.23_multi_TD01"
prerequisites: "Web 接口可达；来源请求携带 password Cookie，未证明匿名访问；UART/root 调试权限属于观察条件"
side_effects: "mac 参数进入命令可能修改设备配置并出网；调试另涉及下载 gdbserver、写 /tmp、修改权限和暂停服务"
source: "本库原创中文整理；研究作者及原文见正文"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/458"
review_date: "2026-10-19"
archive_commit: "f33600e512f2ff654ec335102daf23b8a5218d24"
archive_url: "https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/Tenda%20AC6%20%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E--%E7%9C%9F%E6%9C%BA%E8%B0%83%E8%AF%95%E5%88%86%E6%9E%90.md"
---

# Tenda AC6 WriteFacMac 参数注入的实机调试记录与边界

Raz0r 的来源给出完整固件名、UART 调试流程和 GET /goform/WriteFacMac 请求。mac 参数包含反引号命令替换，作者追踪到 formWriteFacMac 与 doSystemCmd，并声称观察到设备发起 wget 请求。这足以记录明确的公开触发方法，但截图结果仍标作来源声称。

应区分网络触发和调试准备：串口连线、固件中口令散列分析及上传 gdbserver 用来观察进程，不能由此断言利用必须物理接触，也不能把带 Cookie 的网络请求写成未认证漏洞。本文没有采用 AC15 的 CVE-2024-2812 或 FH1201 的 CVE-2024-41473 作为本条主编号。

完整文库 WriteFacMac 命中是 FH1201 V1.2.0.14 的研究；型号与构建不同，不能仅依端点一致折叠。来源结尾的 192.618.0.103 是非法 IPv4 表述，而请求中为 192.168.0.103；该差异只作勘误提示，未替换原始证据。缺少已确认的厂商修复版本，不能承诺更新到任意“最新版”即已修复。


## 逐项静态审计

- 请求的 password Cookie 存在，不能静态推出匿名；UART 调试身份不是网络认证绕过证据。
- 结尾 192.618.0.103 非法且与请求的 192.168.0.103 不同；未代写正确请求。
- GET 中 wget 未显式带 8000，而实验准备/结尾出现该端口；回连成功主张需按作者原证据阅读。

## 核验、风险与来源

mac 参数进入命令可能修改设备配置并出网；调试另涉及下载 gdbserver、写 /tmp、修改权限和暂停服务。本次仅进行公开资料与既有文库的静态文字核对，未执行请求、载荷、固件、依赖安装或扫描，也未访问示例目标。来源中的成功或失败是作者记录；截图像素本轮未审，不将其升级为本库复现。

本文为新写中文分析，不整篇复制原文章或图片。汇编库的 Apache-2.0 声明不能证明原作者文章及图片已按该许可授权。原始资料不作遮盖、替换或删除；本文没有转录为可运行脚本，也不补全来源省略的参数。

- 研究来源：Raz0r，https://www.iotsec-zone.com/article/458；发布时间线索：图片URL2024-08-15。本次仓库收录时间不等于新漏洞披露时间

- 固定汇编来源（仅固定所读版本，不代替原作者出处）：https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/Tenda%20AC6%20%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E--%E7%9C%9F%E6%9C%BA%E8%B0%83%E8%AF%95%E5%88%86%E6%9E%90.md
