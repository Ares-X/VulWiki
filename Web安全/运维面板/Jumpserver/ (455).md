---
cve: "CVE-2024-40629"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞复现】JumpServer文件写入代码执行漏洞（CVE-2024-40629）   
 启明星辰安全简讯   2024-07-18 19:10  
  
**一、漏洞****概述**  
<table><tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:20.15pt;"><td width="93.33333333333333" style="border-width: 2.25pt 1.5pt 1.5pt 2.25pt;border-color: windowtext;border-style: solid;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞名称<o:p></o:p></span></section></td><td width="338.3333333333333" colspan="3" style="border-top: 2.25pt solid windowtext;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;word-break: break-all;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-size: 14px;font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);"> <span style="font-size:10.5pt;mso-bidi-font-size:11.0pt;font-family:&#34;微软雅黑&#34;,&#34;sans-serif&#34;;mso-bidi-font-family:Arial;color:#333333;mso-font-kerning:1.0pt;mso-ansi-language:EN-US;mso-fareast-language:ZH-CN;mso-bidi-language:AR-SA;"> <span lang="EN-US">JumpServer</span>文件写入代码执行漏洞</span></span></section></td></tr><tr style="mso-yfti-irow:1;height:20.15pt;"><td width="113" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">CVE   ID<o:p></o:p></span></section></td><td width="358.3333333333333" colspan="3" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">CVE-2024-40629<o:p></o:p></span></section></td></tr><tr style="mso-yfti-irow:2;height:20.15pt;"><td width="113" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞类型<o:p></o:p></span></section></td><td width="81.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: black;font-size: 14px;">文件写入<o:p></o:p></span></section></td><td width="100.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">发现时间<o:p></o:p></span></section></td><td width="108.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">2024-07-18<o:p></o:p></span></section></td></tr><tr style="mso-yfti-irow:3;height:20.15pt;"><td width="113" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞评分<o:p></o:p></span></section></td><td width="101.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">9.9<o:p></o:p></span></section></td><td width="111.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞等级<o:p></o:p></span></section></td><td width="108.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">高危<o:p></o:p></span></section></td></tr><tr style="mso-yfti-irow:4;"><td width="113" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">攻击向量<o:p></o:p></span></section></td><td width="101.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">网络<o:p></o:p></span></section></td><td width="111.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">所需权限<o:p></o:p></span></section></td><td width="108.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">低<o:p></o:p></span></section></td></tr><tr style="mso-yfti-irow:5;"><td width="113" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">利用难度<o:p></o:p></span></section></td><td width="101.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">低<o:p></o:p></span></section></td><td width="111.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">用户交互<o:p></o:p></span></section></td><td width="108.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">无<o:p></o:p></span></section></td></tr><tr style="mso-yfti-irow:6;mso-yfti-lastrow:yes;"><td width="113" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 2.25pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">PoC/EXP<o:p></o:p></span></section></td><td width="101.33333333333333" style="border-top: none;border-left: none;border-bottom: 2.25pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">已公开<o:p></o:p></span></section></td><td width="111.33333333333333" style="border-top: none;border-left: none;border-bottom: 2.25pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">在野利用<o:p></o:p></span></section></td><td width="108.33333333333333" style="border-top: none;border-left: none;border-bottom: 2.25pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><section style="text-align: center;line-height: 150%;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">未发现<o:p></o:p></span></section></td></tr></tbody></table>  
JumpServer是一款开源堡垒主机和运维安全审计系统。  
  
2024年7月18日，启明星辰VSRC监测到JumpServer中修复了一个任意文件写入漏洞（CVE-2024-40629），该漏洞的CVSS评分为9.9。  
  
JumpServer v3.0.0 - v3.10.11版本中存在任意文件写入漏洞，具有低权限用户帐户的攻击者可利用Ansible
playbook写入任意文件，从而导在Celery容器中执行任意代码。由于Celery容器以root权限运行并具有数据库访问权限，因此可能导致窃取主机上的敏感信息、创建具有管理员权限的新JumpServer帐户或操纵数据库。  
  
此外，JumpServer v3.0.0 - v3.10.11版本中还存在一个任意文件读取漏洞（CVE-2024-40628），威胁者可以利用 ansible playbook读取celery 容器中的任意文件，从而导致敏感信息泄露。  
  
## 二、漏洞复现  
  
CVE-2024-40629和CVE-2024-40628复现分别如下：  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/5NPEia9QicL2uuUOwACabcK9NTTpNs6RP6q3NWpMfqfqTibMWpoh8SFLYialouYHwDFxnibUMLSFJorzwWjCcian3PKQ/640?wx_fmt=jpeg&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/5NPEia9QicL2uuUOwACabcK9NTTpNs6RP64sFla3oicnmns1kj9gMibFHtdTB3tF43I8QK6jffWgmzkuEJVbo3XvdA/640?wx_fmt=jpeg&from=appmsg "")  
  
## 三、影响范围  
  
JumpServer v3.0.0 - v3.10.11  
  
## 四、安全措施  
### 4.1 升级版本  
  
目前这些漏洞已经修复，受影响用户可升级到JumpServer v3.10.12、v4.0.0或更高版本。  
  
下载链接：  
  
https://github.com/jumpserver/jumpserver/tags  
### 4.2 临时措施  
  
暂无。  
### 4.3 通用建议  
  
定期更新系统补丁，减少系统漏洞，提升服务器的安全性。  
  
加强系统和网络的访问控制，修改防火墙策略，关闭非必要的应用端口或服务，减少将危险服务（如SSH、RDP等）暴露到公网，减少攻击面。  
  
使用企业级安全产品，提升企业的网络安全性能。  
  
加强系统用户和权限管理，启用多因素认证机制和最小权限原则，用户和软件权限应保持在最低限度。  
  
启用强密码策略并设置为定期修改。  
### 4.4 参考链接  
  
https://github.com/jumpserver/jumpserver/security/advisories/GHSA-3wgp-q8m7-v33v  
  
https://github.com/jumpserver/jumpserver/security/advisories/GHSA-rpf7-g4xh-84v9  
  
https://nvd.nist.gov/vuln/detail/CVE-2024-40629  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
