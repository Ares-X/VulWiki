---
cve: "CVE-2023-48193"
source: "gelusus/wxvl 公众号漏洞文库"
title: "漏洞预警 | JumpServer未正确校验输入漏洞"
product: "JumpServer command filtering"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-48193"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "Authorized user able to create/run shell script on managed host;<=3.8.0 claimed"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-048e56d0069ba37fcd07c230"
entity_id: "ve-048e56d0069ba37fcd07c230"
schema_version: "1"
---

# 漏洞预警 | JumpServer未正确校验输入漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Authorized user able to create/run shell script on managed host;<=3.8.0 claimed
- 证据范围：Policy-filter bypass claim, not demonstrated bastion-server RCE

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Clarify execution location and intended command-filter security boundary; don't label generic serverRCE
- No precise fix/build or vendor advisory supporting patched claim
- No PoC or result despite broad arbitrary-command statement
- Remove empty headings and duplicate formatting

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

浅安  浅安安全   2023-12-02 08:00  
  
**0x00 漏洞编号**  
- # CVE-2023-48193  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
Jumpserver是一款使用Python, Django开发的开源跳板机系统, 为互联网企业提供了认证，授权，审计，自动化运维等功能，基于ssh协议来管理，客户端无需安装agent。  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SU8Hf5YibCK8obmSCq5lcwuicicV90ZnoN4iaM5UuGVX1SM0IoejjglOk9icZK6JQn3DI9qgiaqL3tClf5w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
**0x03 漏洞详情**  
###   
###   
  
**CVE-2023-48193**  
  
**漏洞类型：**  
未正确校验输入  
  
**影响：**  
  
执行任意命令  
  
**简述：**  
JumpServer在3.8.0及之前版本中存在未正确校验输入漏洞，JumpServer命令过滤功能用于阻止授权用户执行一些命令，但攻击者可以将执行的命令保存在.sh脚本中，然后执行该脚本，从而可以绕过命令过滤功能执行任意命令。  
###   
  
**0x04 影响版本**  
- JumpServer <= 3.8.0  
  
**0x05****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://www.jumpserver.org/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
