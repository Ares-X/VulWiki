---
cve: "CVE-2026-24043"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【高危漏洞预警】jsPDF XML注入漏洞(CVE-2026-24043)  
cexlife
                    cexlife  飓风网络安全   2026-02-03 09:43  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02zKNpmQwl3S5LUaSGwG9p1LFpYZRK4ynL0dYXZqHlmF83DLOXzb6sYyWZJ2ibHKDD8pjEIe5BtZLg/640?wx_fmt=png&from=appmsg "")  
  
漏洞描述:  
  
јѕPDF是一个用于在JаvаSсriрt中生成PDF的库,在4.1.0版本之前用户可以控制аddMеtаdаtа 函数的第一个参数,从而注入任意 XML。如果允许将未经验证的输入传递给аddMеtаdаtа方法,用户就可以向生成的PDF注入任意XMP元数据,如果生成的PDF 被签名、存储或以其他方式处理后,PDF的完整性将无法再得到保证,该漏洞已在јѕPDF@4.1.0版本中修复  
  
攻击场景:  
  
攻击者可通过控制addMetadata函数的第一个参数向生成的PDF文件注入任意XML内容,从而破坏PDF文件的完整性,若该PDF后续被签名、验证或用于敏感流程可能导致信任链被破坏  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02zKNpmQwl3S5LUaSGwG9p185dEG5xxzmhvNUGFVku5eP7SV68cJQppfRuqpiciaHPeXiaOg3ibuyHazA/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02zKNpmQwl3S5LUaSGwG9p1AG2gtnNOLdFeFCYf1ibQeOQp3bCEL6p6H85vb3FicTicoDTYS8x4qYHIw/640?wx_fmt=png&from=appmsg "")  
  
影响产品及版本:  
  
jsPDF（JavaScript PDF生成库）,受影响版本为v4.1.0之前的所有版本  
  
目前官方已有可更新版本,建议受影响用户升级至最新版本  
  
建议措施:  
  
立即升级：将所有项目中的jsPDF库升级至v4.1.0或更高版本  
  
依赖扫描：使用代码扫描工具或依赖管理工具扫描项目依赖,识别并修复旧版本jsPDF  
  
输入过滤：若因兼容性无法升级,应手动对addMetadata函数的输入参数进行严格校验,禁止传入未经净化的用户输入  
  
安全策略：在PDF生成流程中增加签名验证机制,确保生成文件未被篡改  
  
日志监控：监控PDF生成行为,识别异常元数据注入尝试  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
