---
cve: "CVE-2024-22234"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【风险通告】Spring Security身份验证绕过漏洞（CVE-2024-22234）   
安恒研究院  安恒信息CERT   2024-02-20 20:41  
  
![](https://mmbiz.qpic.cn/mmbiz_png/JAzzLj4nXesCfIew4xDgxHPaichzoa958OaWgTglXPf5mic3dq7TZc3np7PMDpLQPa4pL89cQvD6FAZaN71atsbA/640?wx_fmt=png&from=appmsg "")  
  
<table><tbody style="box-sizing:border-box;"><tr style="box-sizing:border-box;"><td colspan="4" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;background-color:#4577da;box-sizing:border-box;" width="100.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;color:rgb(255, 255, 255);box-sizing:border-box;margin-bottom:unset;"><p style="text-align:center;"><strong style="box-sizing:border-box;"><br/></strong></p><p style="text-align:center;"><strong style="box-sizing:border-box;">漏洞概述</strong></p></section></section></td></tr><tr style="box-sizing:border-box;"><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;"><strong style="box-sizing:border-box;">漏洞名称</strong></p></section></section></td><td colspan="3" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="75.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p>Spring Security身份验证绕过漏洞（CVE-2024-22234）</p></section></section></td></tr><tr style="box-sizing:border-box;"><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;"><strong style="box-sizing:border-box;">安恒CERT评级</strong></p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;word-break:break-all;">3级</p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;"><strong style="box-sizing:border-box;">CVSS3.1评分</strong></p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;">7.4<br/></p></section></section></td></tr><tr style="box-sizing:border-box;"><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;"><strong style="box-sizing:border-box;">CVE编号</strong></p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p>CVE-2024-22234</p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;"><strong style="box-sizing:border-box;">CNVD编号</strong></p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;">未分配</p></section></section></td></tr><tr style="box-sizing:border-box;"><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;"><strong style="box-sizing:border-box;">CNNVD编号</strong></p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;">未分配</p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;"><strong style="box-sizing:border-box;">安恒CERT编号</strong></p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p>DM-202401-000696</p></section></section></td></tr><tr style="box-sizing:border-box;"><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;"><strong style="box-sizing:border-box;">POC情况</strong></p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;">未发现</p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;"><strong style="box-sizing:border-box;">EXP情况</strong></p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;">未发现</p></section></section></td></tr><tr style="box-sizing:border-box;"><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;"><strong style="box-sizing:border-box;">在野利用</strong></p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;">未发现</p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;"><strong style="box-sizing:border-box;">研究情况</strong></p></section></section></td><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;">分析中<br/></p></section></section></td></tr><tr style="box-sizing:border-box;"><td colspan="1" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="25.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p style="text-align:left;"><strong style="box-sizing:border-box;">危害描述</strong></p></section></section></td><td colspan="3" rowspan="1" style="border-width:1px;border-color:#4577da;border-style:solid;box-sizing:border-box;" width="75.0000%"><section style="margin:5px 0%;box-sizing:border-box;"><section style="padding:0px 5px;font-size:14px;box-sizing:border-box;margin-bottom:unset;"><p>该漏洞使应用程序容易受到损坏的访问控制的影响，向其传递一个身份验证参数导致返回值错误，攻击者可以利用该漏洞绕过身份验证。</p></section></section></td></tr></tbody></table>  
  
该产品主要使用客户行业分布广泛，漏洞危害性高，建议客户尽快做好自查及防护。  
  
  
  
**漏洞信息**  
  
  
  
  
  
**漏洞描述**  
  
**产品描述：**Spring Security是一个功能强大且高度可定制的身份验证和访问控制框架，作为Spring生态系统的一部分，Spring Security可以轻松集成到任何Spring应用中，提供声明式的安全配置。  
  
**应急响应等级：**  
3级  
  
**漏洞类型：**   
身份验证绕过  
  
  
**影响范围**  
  
影响版本：  
  
6.1.0<=Spring Security<6.1.7  
  
6.2.0<=Spring Security<6.2.2  
  
  
安全版本：  
  
Spring Security=6.1.7  
  
Spring Security=6.2.2  
  
  
**CVSS向量**  
  
访问途径（AV）：网络  
  
攻击复杂度（AC）：高  
  
所需权限（PR）：无需任何权限  
  
用户交互（UI）：不需要用户交互  
  
影响范围 （S）：不变  
  
机密性影响 （C）：高  
  
完整性影响 （l）：高  
  
可用性影响 （A）：高  
  
  
  
**修复方案**  
  
  
  
  
**官方修复方案：**  
  
官方已发布新版本修复漏洞  
，受影响的用户建议更新至安全版本。  
  
**临时缓解方案：**  
  
****  
应用程序不直接使用AuthenticationTrustResolver.isFullyAuthenticated(Authentication)。  
  
应用程序不传递null参数给AuthenticationTrustResolver.isFullyAuthenticated。  
  
应用程序仅使用isFullyAuthenticated via Method Security 或 HTTP Request Security。  
  
  
  
**参考资料**  
  
  
  
  
https://spring.io/security/cve-2024-22234  
  
  
  
**技术支持**  
  
  
  
  
如有漏洞相关需求支持请联系400-6777-677获取相关能力支撑。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
