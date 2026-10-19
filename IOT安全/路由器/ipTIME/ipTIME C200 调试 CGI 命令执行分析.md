---
schema_version: "1"
prerequisites: "相邻网络 CGI 可达且满足来源给出的 cam/debug/cmd 与调试参数"
side_effects: "执行任意所给命令；无实机运行证明"
id: "VW-20261019-MRXN-019"
title: "ipTIME C200 调试 CGI 命令执行分析"
product: "ipTIME C200"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
primary_identifiers: "CVE-2021-26614"
identifier_status: "active"
version: "<=1.058；作者称修复1.060"
source: "0431物联卫士实验室"
source_status: "recorded"
source_url: "https://www.iotsec-zone.com/article/135"
review_date: "2026-10-19"
---

# ipTIME C200 调试 CGI 命令执行分析

## 对应关系

[KRCERT CNA](https://www.cve.org/CVERecord?id=CVE-2021-26614)列明 ipTIME C200、1.058及此前版本，描述暴露 CGI 导致命令执行，并给出相邻网络、无需权限的评价。CNA 写作 ius_get.cgi，本文来源明确指出该拼写错误，分析对象为 iux_get.cgi；不静默混用两个路径。

来源对比1.058与1.060，称后者移除了 main 中的 debug 分支。进入 sub_409748 需要 cam、debug 键；后续处理 cmd，并检查 aaksjdkfj 的值为 11dnjsrurelqjrm22。以上具体键、值和执行函数构成公开分析步骤，但原文没有完整 HTTP 请求编码，本文不补造。

## 限制与副作用

1.060是来源的补丁比较结论，未据此扩展其他型号或所有更高版本；作者没有实机，不能把他的函数分析写成设备复现结果。代码执行取决于 CGI 路径可达及相应参数满足。工具安装说明包含外部 BinDiff/IDA 软件，未安装或审查这些二进制；执行 cmd 会产生所给命令的真实副作用。

## 来源与审阅范围

作者：0431物联卫士实验室；[原文](https://www.iotsec-zone.com/article/135)。固定归档：[Mr-xn/Penetration_Testing_POC](https://github.com/Mr-xn/Penetration_Testing_POC/blob/f33600e512f2ff654ec335102daf23b8a5218d24/iot/CVE-2021-26614%20ipTIME%E6%91%84%E5%83%8F%E5%A4%B41day%E5%88%86%E6%9E%90.md)。来源日期：2021漏洞，原文无日期。本次属于2026-10-12至19日新增汇编材料，不代表本周首次披露。原文授权未明确，本文为独立中文技术摘要，完整样例保留在固定来源，未改写或脱敏原文。

已全文审阅固定 Markdown 及其中代码、命令、请求；图片未逐图检查。未执行、安装、下载固件或访问示例目标。源目录只有 Markdown，无该文章配套安装清单；汇编工作流及 README 更新程序的静态范围见本轮审计，外部工具、固件及依赖没有获得执行安全背书。
