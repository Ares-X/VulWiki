---
cve: "CVE-2025-5560"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【高危漏洞预警】PHPGurukul Management System代码执行漏洞(CVE-2025-5560)  
cexlife  飓风网络安全   2025-06-06 09:27  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01NCs05gRx8bWXxOPn8xKsZPmqEqiaicHoHQTK1elkE5yuhxlx7hiaxB5gPHoibkbIcMzZ4UW81xujnBQ/640?wx_fmt=png&from=appmsg "")  
  
漏洞描述:  
  
在PHPGurukul Curfеԝ е-Pаѕѕ Mаnаɡеmеnt Sуѕtеm 1.0中受影响的是文件/indех.рhр中的未知函数,通过操纵参数ѕеаrсhdаtа可导致SQL 注入可以远程发起攻击。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu01NCs05gRx8bWXxOPn8xKsZwnXAIXqia12NXsWdADsoianaD5DDibjau6wdE5nnYcsPbwic4ibWianLgPnQ/640?wx_fmt=png&from=appmsg "")  
  
攻击场景:  
  
攻击者可能通过操纵参数searchdata导致SQL注入,进而实现远程代码执行。  
  
影响产品:  
  
Curfew e-Pass Management System:V1.0   
  
修复建议:  
  
安装补丁:  
  
建议使用准备语句和参数绑定来防止SQL注入,进行输入验证和过滤,最小化数据库用户权限。  
  
具体步骤包括:  
  
1.使用准备语句和参数绑定  
  
2.严格验证和过滤用户输入  
  
3.确保数据库连接账户仅具有最低所需权限。  
  
建议立即采取措施修复该漏洞,包括更新系统、实施输入验证和使用准备语句,以防止潜在的攻击。  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
