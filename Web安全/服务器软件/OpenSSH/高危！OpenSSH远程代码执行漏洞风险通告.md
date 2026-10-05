---
cve: "CVE-2024-6387"
source: "gelusus/wxvl 公众号漏洞文库"
title: "高危！OpenSSH远程代码执行漏洞风险通告"
product: "OpenSSH sshd"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-6387"
referenced_identifiers: "CVE-2006-5051; CVE-2008-4109"
identifier_role: "primary"
prerequisites: "未修旧<4.4p1或8.5p1至<9.8p1分支；信号竞争、libc/架构/分发补丁影响可利用性"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-572d2081c9f74170f246189a"
entity_id: "ve-572d2081c9f74170f246189a"
schema_version: "1"
---

# 高危！OpenSSH远程代码执行漏洞风险通告

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：未修旧<4.4p1或8.5p1至<9.8p1分支；信号竞争、libc/架构/分发补丁影响可利用性
- 证据范围：两段版本与历史补丁条件比泛化新闻准确，但表格区间符号把8.5p1写开区间与正文包含冲突；已复现无实验正文

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 受影响区间@(8.5p1,9.8p1)应明确左闭
- 需补平台/架构与发行版回移，不是全平台一律RCE
- PoC已公开与EXP未发现是发布时点声明，不能代表当前
- 已复现只是通告发布者声明，本次无执行

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

你信任的  亚信安全   2024-07-02 18:31  
  
![](../../.resource/remote/910b335a6458065a123b5445f0459f4d8dc81af9c689989162e42cebb2e4cad3.jpg "")  
  
  
今日，亚信安全CERT监控到安全社区研究人员发布安全通告，披露了OpenSSH远程代码执行漏洞(CVE-2024-6387)。该漏洞发生在OpenSSH < 4.4p1 且未安装CVE-2006-5051/CVE-2008-4109补丁或8.5p1<= OpenSSH < 9.8p1上。  
  
  
目前厂商官方已针对相关漏洞进行修复，并发布最新版本。亚信安全CERT建议用户将受影响的OpenSSH升级至最新版本V_9_8_P1。  
  
  
由于OpenSSH服务器（sshd）中存在一个信号处理的竞态条件，当客户端在指定的登录宽限期（LoginGraceTime，这个宽限期默认为120秒，而在一些旧版本OpenSSH中则为600秒）内未能完成身份验证时，sshd 的 SIGALRM 信号处理程序会异步调用一些不适用于异步信号安全的函数（如syslog（）），可能导致远程代码执行。  
  
  
**漏洞编号、类型、等级**  
  
  
  
- CVE-2024-6387  
  
- 代码执行  
  
- 高危  
  
  
  
  
**漏洞状态**  
  
  
  
<table><tbody style="box-sizing: border-box;"><tr opera-tn-ra-comp="_$.pages:0.layers:0.comps:9.classicTable1:0" style="box-sizing: border-box;"><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:9.classicTable1:0.td@@0" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="text-align: justify;padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="text-align: center;white-space: normal;margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;">细节</strong></p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:9.classicTable1:0.td@@1" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;">PoC</strong></p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:9.classicTable1:0.td@@2" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;">EXP</strong></p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:9.classicTable1:0.td@@3" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;">在野利用</strong></p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:9.classicTable1:0.td@@4" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;background-color: rgb(145, 145, 145);box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(255, 255, 255);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;"><strong style="box-sizing: border-box;">复现情况</strong></p></section></section></td></tr><tr opera-tn-ra-comp="_$.pages:0.layers:0.comps:9.classicTable1:1" style="box-sizing: border-box;"><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:9.classicTable1:1.td@@0" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;">已公开</p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:9.classicTable1:1.td@@1" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;">已公开</p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:9.classicTable1:1.td@@2" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;">未发现</p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:9.classicTable1:1.td@@3" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;">未发现</p></section></section></td><td colspan="1" rowspan="1" opera-tn-ra-cell="_$.pages:0.layers:0.comps:9.classicTable1:1.td@@4" style="border-width: 1px;border-color: rgb(62, 62, 62);border-style: solid;box-sizing: border-box;padding: 0px;" width="20.0000%"><section style="margin: 5px 0%;box-sizing: border-box;"><section style="padding: 0px 5px;font-size: 14px;color: rgb(62, 62, 62);box-sizing: border-box;"><p style="margin: 0px;padding: 0px;box-sizing: border-box;">已复现</p></section></section></td></tr></tbody></table>  
  
  
**受影响版本**  
  
  
  
- OpenSSH @(8.5p1, 9.8p1)  
  
- OpenSSH @(-∞, 4.4p1) 且未安装CVE-2006-5051/CVE-2008-4109补丁  
  
  
  
  
**修复建议**  
  
  
  
目前，官方已发布相关公告信息修复该漏洞，建议受影响用户将OpenSSH及时升级至最新版本。  
  
https://github.com/openssh/openssh-portable/tags  
  
  
**参考链接**  
  
  
  
- https://nvd.nist.gov/vuln/detail/CVE-2024-6387  
  
- https://access.redhat.com/security/cve/CVE-2024-6387  
  
- https://github.com/getdrive/CVE-2024-6387-PoC  
  
- https://github.com/openssh/openssh-portable/tags  
  
- https://blog.qualys.com/vulnerabilities-threat-research/2024/07/01/regresshion-remote-unauthenticated-code-execution-vulnerability-in-openssh-server  
  
  
  
  
本文发布的补丁下载链接均源自各原厂官方网站。尽管我们努力确保官方资源的安全性，但在互联网环境中，文件下载仍存在潜在风险。为保障您的设备安全与数据隐私，敬请您在点击下载前谨慎核实其安全性和可信度。  
  
  
  
  
了解亚信安全，请点击  
**“阅读原文”**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
