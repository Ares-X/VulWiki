---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Apache Shiro/InvalidRequestFilter"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2023-34478"
referenced_identifiers: "XVE-2023-17765"
identifier_role: "primary"
identifier_status: "unknown"
title: "别急着修！Apache Shiro 最新身份验证漏洞实际很难利用"
prerequisites: "来源所述条件，未列明部分仍待核：<1.12.0及2.0alpha<3需分支限定；安全版本应分别表达"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-adc0b49a68247d39e32ca50f"
entity_id: "ve-adc0b49a68247d39e32ca50f"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;1.12.0及2.0alpha&lt;3需分支限定；安全版本应分别表达

代码与实验材料：低利用难度判断无具体苛刻前提，复现仅图且表说PoC未公开

来源证据范围：微步原研判，链接仅Apache项目主页无公告/补丁

- **适用与权限边界（1）**：延迟修复建议缺适用依据；依据：别急着修、优先级低却未写需哪种代理/路径配置才可利用，无法用于用户具体部署。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：风险评级与影响量不透明；依据：低危、万级及未捕获攻击均属厂商当时观测，不等于漏洞普遍低危/无利用。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  别急着修！Apache Shiro 最新身份验证漏洞实际很难利用   
原创 微步情报局  微步在线研究响应中心   2023-07-26 14:08  
  
![](../../.resource/remote/94ba548e30fedc16feb634026eb27963411675ba9137220d7e4638955a9d68ae.png "")  
  
01 漏洞概况****  
  
  
  
Apache Shiro是一个强大且易用的Java安全框架，用于实现身份验证、授权、密码和会话管理等功能。近日，微步漏洞团队监测到Apache Shiro中修复了一处身份验证绕过漏洞(CVE-2023-34478)，由于InvalidRequestFilter#isAccessAllowed 方法未对URL参数进行有效过滤，攻击者可能构造包含恶意字符的URL参数绕过身份验证。目前已有漏洞通告提示该漏洞为**严重**。但经过分析和研判，该漏洞在真实环境下能够利用的条件较为苛刻，  
**利用成功的难度较高，修复优先级较低。**  
****  
  
02 漏洞处置优先级（VPT）  
  
  
  
**综合处置优先级：**  
**低**  
****  
  
<table><tbody style="visibility: visible;"><tr style="height: 23.3pt;visibility: visible;"><td style="border-color: rgb(191, 191, 191);border-style: solid;border-width: 1pt;padding: 0cm 5.4pt;word-break: break-all;visibility: visible;" width="111" valign="top" height="23"><p style="visibility: visible;"><strong style="visibility: visible;"><span style="font-size: 15px;visibility: visible;">漏洞编号</span></strong></p></td><td style="border-color: rgb(191, 191, 191) rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: solid solid solid none;border-width: 1pt 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;visibility: visible;" width="76" valign="top" height="23"><p style="visibility: visible;"><span style="font-size: 14px;visibility: visible;">微步编号</span></p></td><td style="border-color: rgb(191, 191, 191) rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: solid solid solid none;border-width: 1pt 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;visibility: visible;" width="227" valign="top" height="23"><p style="visibility: visible;"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);visibility: visible;"></span><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);visibility: visible;"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);visibility: visible;">XVE-2023-17765</span></span><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);visibility: visible;"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);visibility: visible;"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);visibility: visible;"></span></span></span><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);visibility: visible;"></span></p></td></tr><tr style="height: 23.3pt;visibility: visible;"><td rowspan="6" style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191);border-style: none solid solid;border-width: medium 1pt 1pt;padding: 0cm 5.4pt;visibility: visible;" width="131" valign="top" height="23"><p style="visibility: visible;"><strong style="visibility: visible;"><span style="font-size: 15px;visibility: visible;">漏洞评估</span></strong></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;visibility: visible;" width="76" valign="top" height="23"><p style="visibility: visible;"><span style="font-size: 14px;visibility: visible;">危害评级</span></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;visibility: visible;" width="227" valign="top" height="23"><p style="visibility: visible;"><span style="font-size: 14px;visibility: visible;">低</span></p></td></tr><tr style="height: 23.3pt;visibility: visible;"><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;visibility: visible;" width="132" valign="top" height="23"><p style="visibility: visible;"><span style="font-size: 14px;visibility: visible;">漏洞类型</span></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;visibility: visible;" width="235" valign="top" height="23"><p style="visibility: visible;"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);">认证绕过</span><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);visibility: visible;"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);visibility: visible;"></span></span></p></td></tr><tr style="visibility: visible;"><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;visibility: visible;" width="132" valign="top"><p style="visibility: visible;"><span style="font-size: 14px;">公开程度</span></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;" width="235" valign="top"><p><span style="font-size: 14px;"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);">PoC未公开</span></span></p></td></tr><tr style="mso-yfti-irow:4;"><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;" width="132" valign="top"><p><span style="font-size: 14px;">利用条件</span></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;" width="235" valign="top"><p><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);"></span><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);"></span><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);">无权限要求</span></p></td></tr><tr style="mso-yfti-irow:5;"><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;" width="132" valign="top"><p><span style="font-size: 14px;">交互要求</span></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;" width="235" valign="top"><p><span style="font-size: 14px;"><span style="font-size: 14px;font-family: 黑体;" lang="EN-US">0-</span>click</span></p></td></tr><tr style="mso-yfti-irow:6;"><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;" width="132" valign="top"><p><span style="font-size: 14px;">威胁类型</span></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;" width="235" valign="top"><p><span style="font-size: 14px;">远程</span></p></td></tr><tr style="mso-yfti-irow:7;"><td rowspan="1" style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191);border-style: none solid solid;border-width: medium 1pt 1pt;padding: 0cm 5.4pt;" width="131" valign="top"><p><strong><span style="font-size: 15px;">利用情报</span></strong></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;" width="76" valign="top"><p><span style="font-size: 14px;">微步已捕获攻击行为</span></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;" width="227" valign="top"><section style="line-height: 1.6em;text-align: justify;margin: 0px;text-indent: 0em;"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);">否</span><span style="font-size: 14px;"></span></section></td></tr><tr style="mso-yfti-irow:9;"><td rowspan="4" style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191);border-style: none solid solid;border-width: medium 1pt 1pt;padding: 0cm 5.4pt;" width="131" valign="top"><p><strong><span style="font-size: 15px;">影响产品</span></strong></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;" width="76" valign="top"><p><span style="font-size: 14px;">产品名称</span></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;" width="227" valign="top"><p><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);"></span></span><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);">apache-shiro</span></p></td></tr><tr style="mso-yfti-irow:10;"><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;" width="132" valign="top"><p><span style="font-size: 14px;">受影响版本</span></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;" width="235" valign="top"><section style="line-height: 1.6em;text-align: justify;margin: 0px;text-indent: 0em;"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);">version &lt; 1.12.0</span></section><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);">version &lt; 2.0.0-alpha-3</span><br/><section style="line-height: 1.6em;text-align: justify;margin: 0px;text-indent: 0em;"><span style=""></span></section><section style="line-height: 1.6em;text-align: justify;margin: 0px;text-indent: 0em;"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);"></span></section><section style="line-height: 1.6em;text-align: justify;margin: 0px;text-indent: 0em;"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);"></span></section></td></tr><tr style="mso-yfti-irow:11;"><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;" width="132" valign="top"><p><span style="font-size: 14px;">影响范围</span></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;" width="235" valign="top"><p><span style="font-size: 14px;"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);"><span style="font-size: 14px;letter-spacing: 0.578px;text-decoration: rgba(0, 0, 0, 0.9);">万级</span></span></span></p></td></tr><tr style="mso-yfti-irow:12;mso-yfti-lastrow:yes;height:26.7pt;"><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;" width="132" valign="top" height="26"><p><span style="font-size: 14px;">有无修复补丁</span></p></td><td style="border-color: currentcolor rgb(191, 191, 191) rgb(191, 191, 191) currentcolor;border-style: none solid solid none;border-width: medium 1pt 1pt medium;padding: 0cm 5.4pt;word-break: break-all;" width="235" valign="top" height="26"><p><span style="font-size: 14px;">有</span></p></td></tr></tbody></table>  
  
03 漏洞复现   
  
  
  
![](../../.resource/remote/2f423ecdd3f0bde2318d93fa2d5dfd9302ce5dcf227ec7be7b333869d572e1cc.png "")  
### 04 修复方案 官方修复方案：Apache官方已发布修复方案，安全版本为1.12.0及以上，2.0.0-alpha-3及以上。https://github.com/apache/shiro  
### 05 微步在线产品侧支持情况  微步在线威胁感知平台TDP通用规则默认支持检测。  
### 06 时间线 2023.07.24 微步获取该漏洞相关情报2023.07.26 微步发布报告  
  
****  
**---End---**  
  
  
**微步漏洞情报订阅服务**  
  
微步漏洞情报订阅服务是由微步漏洞团队面向企业推出的一项高级分析服务，致力于通过微步自有产品强大的高价值漏洞发现和收集能力以及微步核心的威胁情报能力，为企业提供0day漏洞预警、最新公开漏洞预警、漏洞分析及评估等漏洞相关情报，帮助企业应对最新0day/1day等漏洞威胁并确定漏洞修复优先级，快速收敛企业的攻击面，保障企业自身业务的正常运转。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
