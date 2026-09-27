---
cve: "CVE-2025-3125"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | WSO2任意文件上传漏洞  
浅安
                    浅安  浅安安全   2026-01-27 00:00  
  
**0x00 漏洞编号**  
- # CVE-2025-3125  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
WSO2 API Manager是一套API生命周期管理解决方案，WSO2 Identity Server是一款身份认证服务器，WSO2 API Control Plane是一个控制面板。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SX3cS10b2cf8361nD7jcY7EATLvkLyzRdBDvAibvJ9EWSjUKRFhrcoJwsELnfmLXBRt3zDwu8T85yA/640?wx_fmt=png&from=appmsg "")  
  
**0x03 漏洞详情**  
###   
  
**CVE-2025-3125**  
  
**漏洞类型：**  
文件上传****  
  
**影响：**  
上传恶意文件  
  
  
****  
  
**简述：**  
WSO2多款产品存在任意文件上传漏洞，由于其CarbonAppUploader管理服务端点输入验证不当，攻击者可利用该漏洞进行远程代码执行。  
  
**0x04 影响版本**  
- WSO2 API Manager  
  
- WSO2 Identity Server  
  
- WSO2 Identity Server as Key Manager  
  
- WSO2 Open Banking IAM  
  
- WSO2 Traffic Manager  
  
- WSO2 Universal Gateway  
  
- WSO2 API Control Plane  
  
- WSO2 Enterprise Integrator  
  
**0x05****POC状态**  
- 已公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://wso2.com/  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
