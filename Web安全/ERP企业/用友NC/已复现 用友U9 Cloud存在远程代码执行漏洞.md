---
source: "gelusus/wxvl 公众号漏洞文库"
title: "用友U9Cloud 硬编码MachineKey ViewState反序列化公告"
product: "用友U9Cloud"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "WM-202507-000077"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "U9V6.6企业/标准；需先615补丁再漏洞补丁"
prerequisites: "PR无，页面/ViewState前提未公开"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BNC/%E5%B7%B2%E5%A4%8D%E7%8E%B0%20%E7%94%A8%E5%8F%8BU9%20Cloud%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-0c88911e0c607de3c4a5b493"
entity_id: "ve-0c88911e0c607de3c4a5b493"
schema_version: "1"
---

# 用友U9Cloud 硬编码MachineKey ViewState反序列化公告

## 条目说明

- 对象与具体问题：用友U9Cloud；硬编码MachineKey ViewState反序列化公告
- 版本、配置及部署条件：U9V6.6企业/标准；需先615补丁再漏洞补丁
- 认证与权限前提：PR无，页面/ViewState前提未公开
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 错NC目录；主研究ID WM202507000077非CVE，未分配编号应空
- 明确自评CVSS8.6/未发现野利用/已复现为来源声明，保留时间和证据等级
- 有notice705及615前置是重要修复顺序，不能只说升级最新
- 技术细节未公开，不与147因同6.6合并

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

安恒研究院  安恒信息CERT   2025-07-15 11:20  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/JAzzLj4nXevmL5H6C1I6nWLYOHeic25ZZq3Sju5Xs1LnOckux8PBqG1qYrBly0Nicx4verjADnLorl5g1ImeuTeg/640?wx_fmt=jpeg&from=appmsg&wx_&wx_ "")  
  
<table><tbody><tr style="-webkit-tap-highlight-color:transparent;"><td colspan="4" data-colwidth="100.0000%" width="100.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;background-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;color:rgb(255, 255, 255);box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:center;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">漏洞概述</span></strong></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">漏洞名称</span></strong></p></section></section></td><td colspan="3" data-colwidth="75.0000%" width="75.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p><span style="letter-spacing:0.544px;"><span leaf="">用友U9 Cloud存在远程代码执行漏洞</span></span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">安恒CERT评级</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;word-break:break-all;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">2级</span></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">CVSS3.1评分</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">8.6（安恒自评）</span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">CVE编号</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><p><span style="font-size:14px;letter-spacing:0.544px;"><span leaf="">未分配</span></span></p><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;overflow:hidden;line-height:0;box-sizing:border-box;"><span leaf="" style="-webkit-tap-highlight-color:transparent;"><br/></span></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">CNVD编号</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">未分配</span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">CNNVD编号</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;font-size:14px;">未分配</span></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">安恒CERT编号</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p><span style="letter-spacing:0.544px;"><span leaf="">WM-202507-000077</span></span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">POC情况</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">已发现</span></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">EXP情况</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">已发现</span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">在野利用</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">未发现</span></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">研究情况</span></strong></p></section></section></td><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;"><span leaf="" style="-webkit-tap-highlight-color:transparent;">已复现</span></p></section></section></td></tr><tr style="-webkit-tap-highlight-color:transparent;"><td data-colwidth="25.0000%" width="25.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;box-sizing:border-box;"><p style="-webkit-tap-highlight-color:transparent;text-align:left;"><strong style="-webkit-tap-highlight-color:transparent;"><span leaf="">危害描述</span></strong></p></section></section></td><td colspan="3" data-colwidth="75.0000%" width="75.0000%" style="-webkit-tap-highlight-color:transparent;word-break:break-all;hyphens:auto;border-color:#4577da;"><section style="-webkit-tap-highlight-color:transparent;margin:5px 0px;"><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;overflow:hidden;line-height:0;box-sizing:border-box;"><span leaf="" style="-webkit-tap-highlight-color:transparent;"><br/></span></section><p><span style="font-size:14px;letter-spacing:0.544px;"><span leaf="">安恒CERT监测到用友U9 Cloud修复一处远程代码执行漏洞，该漏洞由于用友U9 Cloud配置硬编码MachineKey配置信息，导致攻击者可构根据相关信息造恶意ViewState数据包，进而造成ViewState反序列化漏洞，实现远程代码执行。</span></span></p><section style="-webkit-tap-highlight-color:transparent;margin-top:0px;margin-right:0px;margin-bottom:unset;margin-left:0px;padding:0px 5px;font-size:14px;overflow:hidden;line-height:0;box-sizing:border-box;"><span leaf="" style="-webkit-tap-highlight-color:transparent;"><br/></span></section></section></td></tr></tbody></table>  
  
该产品主要使用客户行业分布广泛，漏洞危害性高，建议客户尽快做好自查及防护。  
  
**安恒研究院卫兵实验室已复现此漏洞。**  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/JAzzLj4nXetUIhMDy6mWIvk53Wk8uQdMJia30cbJEVuZNichl0ukPzvia25lTLDwopFQQZFy719ibB8Pbh411N6fibQ/640?wx_fmt=jpeg&from=appmsg "")  
  
  
  
**漏洞信息**  
  
  
  
  
用友U9 cloud是用友网络科技股份有限公司推出的一款面向中型及中大型制造企业的世界级云ERP系统。  
  
  
**漏洞描述**  
  
**漏洞危害等级：**  
高危  
  
**漏洞类型：**  
远程代码执行  
  
  
**影响范围**  
  
**影响版本：**  
  
U9V6.6企业版、U9V6.6标准版  
  
  
**CVSS向量**  
  
访问途径（AV）：网络  
  
攻击复杂度（AC）：低  
  
所需权限（PR）：无  
  
用户交互（UI）：无  
  
影响范围 （S）：不变  
  
机密性影响 （C）：高  
  
完整性影响 （l）：低  
  
可用性影响 （A）：低  
  
  
  
**修复方案**  
  
  
  
  
**官方修复方案：**  
  
官方已发布修复方案，受影响的用户建议及时安装漏洞补丁，需在升级615补丁之后进行漏洞补丁的升级。  
  
https://security.yonyou.com/#/noticeInfo?id=705  
  
  
**参考资料**  
  
  
  
  
  
https://security.yonyou.com/#/noticeInfo?id=705  
  
**产品能力覆盖**  
  
  
  
<table><tbody><tr><td data-colwidth="33.0000%" width="33.0000%" style="border-color:#4577da;background-color:#4577da;"><section style="margin-top:5px;margin-bottom:5px;"><section style="padding-right:5px;padding-left:5px;text-align:left;font-size:14px;color:rgb(255, 255, 255);margin-bottom:unset;box-sizing:border-box;"><p><strong><span leaf="">产品名称</span></strong></p></section></section></td><td data-colwidth="67.0000%" width="67.0000%" style="border-color:#4577da;background-color:#4577da;"><section style="margin-top:5px;margin-bottom:5px;"><section style="padding-right:5px;padding-left:5px;text-align:left;font-size:14px;color:rgb(255, 255, 255);margin-bottom:unset;box-sizing:border-box;"><p><strong><span leaf="">覆盖补丁包</span></strong></p></section></section></td></tr><tr><td data-colwidth="33.0000%" width="33.0000%" style="border-color:#4577da;"><section style="margin-top:5px;margin-bottom:5px;"><section style="padding-right:5px;padding-left:5px;text-align:left;font-size:14px;margin-bottom:unset;box-sizing:border-box;"><p><span leaf="">AiLPHA大数据平台</span></p></section></section></td><td data-colwidth="67.0000%" width="67.0000%" style="border-color:#4577da;word-break:break-all;"><section style="margin-top:5px;margin-bottom:5px;"><section style="padding-right:5px;padding-left:5px;text-align:left;font-size:14px;margin-bottom:unset;box-sizing:border-box;"><p><span leaf="">GoldenEyeIPv6_XXXXX_strategy2.0.XXXXX.250715.1及以上版本</span></p></section></section></td></tr><tr><td data-colwidth="33.0000%" width="33.0000%" style="border-color:#4577da;word-break:break-all;"><section style="margin-top:5px;margin-bottom:5px;"><section style="padding-right:5px;padding-left:5px;text-align:left;font-size:14px;margin-bottom:unset;box-sizing:border-box;"><p><span leaf="">APT攻击预警平台</span></p></section></section></td><td data-colwidth="67.0000%" width="67.0000%" style="border-color:#4577da;word-break:break-all;"><section style="margin-top:5px;margin-bottom:5px;"><section style="padding-right:5px;padding-left:5px;text-align:left;font-size:14px;margin-bottom:unset;box-sizing:border-box;"><p><span leaf="">GoldenEyeIPv6_XXXXX_strategy2.0.XXXXX.250715.1及以上版本</span></p></section></section></td></tr><tr><td data-colwidth="33.0000%" width="33.0000%" style="border-color:#4577da;"><section style="margin-top:5px;margin-bottom:5px;"><section style="padding-right:5px;padding-left:5px;text-align:left;font-size:14px;margin-bottom:unset;box-sizing:border-box;"><p><span leaf="">明鉴漏洞扫描系统</span></p></section></section></td><td data-colwidth="67.0000%" width="67.0000%" style="border-color:#4577da;word-break:break-all;"><section style="margin-top:5px;margin-bottom:5px;"><section style="padding-right:5px;padding-left:5px;text-align:left;font-size:14px;margin-bottom:unset;box-sizing:border-box;"><p><span style="letter-spacing:0.544px;"><span leaf="">V1.3.2284.1924</span></span><span style="letter-spacing:0.544px;"><span leaf="">及以上版本</span></span></p></section></section></td></tr><tr><td data-colwidth="33.0000%" width="33.0000%" style="border-color:#4577da;"><section style="margin-top:5px;margin-bottom:5px;"><section style="padding-right:5px;padding-left:5px;text-align:left;font-size:14px;margin-bottom:unset;box-sizing:border-box;"><p><span leaf="">WAF</span></p></section></section></td><td data-colwidth="67.0000%" width="67.0000%" style="border-color:#4577da;"><section style="margin-top:5px;margin-bottom:5px;"><section style="padding-right:5px;padding-left:5px;text-align:left;font-size:14px;margin-bottom:unset;box-sizing:border-box;"><p><span leaf="">已支持</span></p></section></section></td></tr><tr><td data-colwidth="33.0000%" width="33.0000%" style="border-color:#4577da;"><section style="margin-top:5px;margin-bottom:5px;"><section style="padding-right:5px;padding-left:5px;text-align:left;font-size:14px;margin-bottom:unset;box-sizing:border-box;"><p><span leaf="">玄武盾</span></p></section></section></td><td data-colwidth="67.0000%" width="67.0000%" style="border-color:#4577da;word-break:break-all;"><section style="margin-top:5px;margin-bottom:5px;"><section style="padding-right:5px;padding-left:5px;text-align:left;font-size:14px;margin-bottom:unset;box-sizing:border-box;"><p><span leaf="">已支持</span></p></section></section></td></tr></tbody></table>  
  
  
  
**技术支持**  
  
  
  
  
如有漏洞相关需求支持请联系400-6059-110获取相关能力支撑。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
