---
cve: "CVE-2023-37936"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Fortinet FortiSwitch 凭证管理不当漏洞 可导致远程代码执行   
 上汽集团网络安全应急响应中心   2025-02-15 15:56  
  
**漏洞情报**  
  
  
  
  
  
**Fortinet FortiSwitch 凭证管理不当漏洞 可导致远程代码执行**  
  
  
**【 漏洞编号 】**  
  
CVE-2023-37936  
  
  
**【 情报等级 】**  
  
**高危**  
  
  
**【 漏洞描述 】**  
  
360漏洞云监测到Fortinet 针对影响 FortiSwitch 产品线的严重安全漏洞（CVE-2023-37936，CVSS 9.6）发布了补丁。该漏洞可能使远程未授权攻击者在易受攻击的设备上执行任意代码，从而可能导致整个网络被攻陷。漏洞源于受影响版本的 FortiSwitch 中使用了硬编码加密密钥。攻击者可以利用密钥构造恶意请求来完全控制设备。受影响的版本包括多个特定版本范围的 FortiSwitch。Fortinet 已为所有受支持的 FortiSwitch 版本发布了补丁，并强烈敦促用户将设备更新到特定版本或更高版本。  
  
  
**【 影响产品 】**  
  
<table><tbody><tr><td colspan="1" rowspan="1" style="border-color: rgb(255, 255, 255);background-color: rgb(231, 231, 231);padding: 6px;" width="99.0000%"><section style="text-align: center;font-size: 14px;"><p>Fortinet FortiSwitch,fortinet fortiswitch&gt;=6.2.0&amp;&amp;&lt;=6.2.7,=7.4.0,&gt;=6.0.0&amp;&amp;&lt;=6.0.7,&gt;=7.0.0&amp;&amp;&lt;=7.0.7,&gt;=6.4.0&amp;&amp;&lt;=6.4.13,&gt;=7.2.0&amp;&amp;&lt;=7.2.5</p></section></td></tr></tbody></table>  
  
**【 解决方案与修复建议 】**  
  
针对此漏洞，官方已经发布了漏洞修复版本，请立即更新到**安全版本****：**  
  
Fortinet  FortiSwitch >= 7.4.1   
  
Fortinet  FortiSwitch >= 7.2.6   
  
Fortinet  FortiSwitch >= 7.0.8   
  
Fortinet  FortiSwitch >= 6.4.14   
  
Fortinet  FortiSwitch >= 6.2.8   
  
Fortinet  FortiSwitch 6.0.x 版本用户请迁移到以上版本   
  
安装前，请确保备份所有关键数据，并按照官方指南进行操作。安装后，进行全面测试以验证漏洞已被彻底修复，并确保系统其他功能正常运行。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
