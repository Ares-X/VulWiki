---
cve: "CVE-2024-8785"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Progress WhatsUp Gold远程代码执行漏洞（CVE-2024-8785）   
 启明星辰安全简讯   2024-12-04 08:51  
  
**一、漏洞****概述**  
<table><tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:20.15pt;"><td width="105" style="border-width: 2.25pt 1.5pt 1.5pt 2.25pt;border-color: windowtext;border-style: solid;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞名称<o:p></o:p></span></section></td><td width="360.6666666666667" colspan="3" style="border-top: 2.25pt solid windowtext;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-size: 14px;font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);">    Progress
  WhatsUp Gold远程代码执行漏洞<o:p></o:p></span></section></td></tr><tr style="mso-yfti-irow:1;height:20.15pt;"><td width="104.66666666666667" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">CVE   ID<o:p></o:p></span></section></td><td width="360.6666666666667" colspan="3" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">CVE-2024-8785<o:p></o:p></span></section></td></tr><tr style="mso-yfti-irow:2;height:20.15pt;"><td width="105" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞类型<o:p></o:p></span></section></td><td width="125.66666666666667" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: black;font-size: 14px;">RCE<o:p></o:p></span></section></td><td width="118.66666666666667" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">发现时间<o:p></o:p></span></section></td><td width="115.66666666666667" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">2024-12-04<o:p></o:p></span></section></td></tr><tr style="mso-yfti-irow:3;height:20.15pt;"><td width="105" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞评分<o:p></o:p></span></section></td><td width="125.66666666666666" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">9.8<o:p></o:p></span></section></td><td width="118.66666666666667" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞等级<o:p></o:p></span></section></td><td width="115.66666666666667" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">高危<o:p></o:p></span></section></td></tr><tr style="mso-yfti-irow:4;"><td width="105" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">攻击向量<o:p></o:p></span></section></td><td width="125.66666666666666" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">网络<o:p></o:p></span></section></td><td width="118.66666666666667" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">所需权限<o:p></o:p></span></section></td><td width="115.66666666666667" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">无<o:p></o:p></span></section></td></tr><tr style="mso-yfti-irow:5;"><td width="105" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">利用难度<o:p></o:p></span></section></td><td width="125.66666666666666" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">低<o:p></o:p></span></section></td><td width="118.66666666666667" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">用户交互<o:p></o:p></span></section></td><td width="115.66666666666667" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">无<o:p></o:p></span></section></td></tr><tr style="mso-yfti-irow:6;mso-yfti-lastrow:yes;"><td width="105" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 2.25pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">PoC/EXP<o:p></o:p></span></section></td><td width="125.66666666666666" style="border-top: none;border-left: none;border-bottom: 2.25pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">已公开<o:p></o:p></span></section></td><td width="118.66666666666667" style="border-top: none;border-left: none;border-bottom: 2.25pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">在野利用<o:p></o:p></span></section></td><td width="115.66666666666667" style="border-top: none;border-left: none;border-bottom: 2.25pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">未发现<o:p></o:p></span></section></td></tr></tbody></table>  
WhatsUp Gold是美国Progress Software公司开发的一款网络监控软件，可监控整个网络基础设施，迅速定位并解决网络中的问题，提高网络管理员的工作效率。  
  
2024年12月4日，启明星辰集团VSRC监测到Progress WhatsUp Gold 远程代码执行漏洞（CVE-2024-8785）的技术细节及PoC在互联网上公开，该漏洞的CVSS评分为9.8。  
  
Progress Software WhatsUp Gold 2023.1.0 - 2024.0.1之前版本在NmAPI.exe 组件中存在注册表覆盖远程代码执行漏洞，由于NmAPI.exe的UpdateFailoverRegistryValues操作在处理输入数据时缺乏充分验证和授权检查，未经身份验证的远程攻击者可以通过调用位于net.tcp://<目标主机>:9643上的WCF服务接口，向NmAPI.exe发送恶意构造的请求，从而修改位于HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Ipswitch\路径下的注册表值，攻击者可通过将InstallDir更改为指向其控制的UNC路径（例如，\\<attacker-ip>\share\WhatsUp），当系统或ServiceControlManager.exe服务重启时，会从攻击者控制的路径加载恶意配置文件并执行攻击者指定的恶意可执行文件，从而实现远程代码执行。成功利用该漏洞允许攻击者绕过正常的安全机制，获得对受影响系统的完全控制权，从而可能执行任意代码、窃取敏感信息、破坏系统功能或部署持久化恶意软件。  
  
## 二、影响范围  
  
2023.1.0 <= Progress Software WhatsUp Gold <
2024.0.1  
  
## 三、安全措施  
### 3.1 升级版本  
  
目前该漏洞已经修复，受影响用户可升级到以下版本：  
  
Progress Software WhatsUp Gold >= 2024.0.1  
  
下载链接：  
  
https://www.progress.com/network-monitoring  
### 3.2 临时措施  
  
暂无。  
### 3.3 通用建议  
  
定期更新系统补丁，减少系统漏洞，提升服务器的安全性。  
  
加强系统和网络的访问控制，修改防火墙策略，关闭非必要的应用端口或服务，减少将危险服务（如SSH、RDP等）暴露到公网，减少攻击面。  
  
使用企业级安全产品，提升企业的网络安全性能。  
  
加强系统用户和权限管理，启用多因素认证机制和最小权限原则，用户和软件权限应保持在最低限度。  
  
启用强密码策略并设置为定期修改。  
### 3.4 参考链接  
  
https://community.progress.com/s/article/WhatsUp-Gold-Security-Bulletin-September-2024  
  
https://www.tenable.com/security/research/tra-2024-48  
  
https://nvd.nist.gov/vuln/detail/CVE-2024-8785  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
