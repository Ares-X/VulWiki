---
schema_version: "1"
prerequisites: "HTTP入口可达，Cookie password 触发；固定地址 ROP 依赖来源修改后的仿真环境"
side_effects: "崩溃、网络模糊测试与命令执行；修改固件检查和容器环境"
id: "VW-20261019-MRXN-011"
title: "Tenda AC15 Cookie password 栈溢出与仿真边界"
product: "Tenda AC15"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
primary_identifiers: "CVE-2018-5767"
identifier_status: "active"
version: "US_AC15V1.0BR_V15.03.1.16_multi_TD01；boofuzz0.4.1"
source: "0431物联卫士实验室"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/168"
review_date: "2026-10-19"
---

# Tenda AC15 Cookie password 栈溢出与仿真边界

## 对应关系与触发条件

[CNA](https://www.cve.org/CVERecord?id=CVE-2018-5767)记录2018年公开的 Tenda AC15 V15.03.1.16_multi：未认证攻击者可通过 Cookie 头的 password 值触发远程代码执行。该编号不能与现有 AC9 setMacFilterCfg/deviceList 文章合并，后者仅将5767列为背景。

本来源分析 US_AC15V1.0BR_V15.03.1.16_multi_TD01，定位 R7WebsSecurityHandler 中对 password 的无宽度 sscanf；/goform/cyberangel 是其测试路径。公开材料提供 Boofuzz 0.4.1 模板、请求和固定 libc 地址的 ROP 代码。另一篇[AC15研究](https://www.iotsec-zone.com/article/215)补充崩溃、偏移和 Thumb 状态讨论；其最终 poc2 附件没有随 Markdown 提供，不能当作已取得的完整成品。

## 实验边界与静态问题

第一篇先修改 check_network/ConnectCfm，在 Docker 内部运行固件。固定 libc 基址、关闭或绕过环境检查的结果不能外推为任意实机。requests 示例把 Cookie 作为 cookies 字典的键，并进行 Latin-1 字符串转换，实际线上头部和二进制字节不能仅凭源码外观认定正确；异常或无响应也不单独证明控制流劫持。第二篇的 Thumb/偏移算术须以原指令核对，不将其疑点自动修成新攻击代码。

公开脚本包含大量网络请求、进程崩溃与命令执行能力；仿真流程改变固件和本地系统状态。文中的默认容器凭据是实验设置，不是设备通用密码。本文记录代码与对应关系，不宣称两份程序可直接运行。

## 来源与审阅范围

作者：0431物联卫士实验室；[原文](https://www.iotsec-zone.com/article/168)。固定归档：[Mr-xn/Penetration_Testing_POC](https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/BooFuzz%E7%9A%84%E7%AE%80%E5%8D%95%E4%BD%BF%E7%94%A8%EF%BC%8C%E4%BB%A5CVE-2018-5767%E4%B8%BA%E4%BE%8B.md)。来源日期：2022之后（Firefox102语境）。本次属于2026-10-12至19日新增汇编材料，不代表本周首次披露。原文授权未明确，本文为独立中文技术摘要，完整样例保留在固定来源，未改写或脱敏原文。

已全文审阅固定 Markdown 及其中代码、命令、请求；图片未逐图检查。未执行、安装、下载固件或访问示例目标。源目录只有 Markdown，无该文章配套安装清单；汇编工作流及 README 更新程序的静态范围见本轮审计，外部工具、固件及依赖没有获得执行安全背书。
