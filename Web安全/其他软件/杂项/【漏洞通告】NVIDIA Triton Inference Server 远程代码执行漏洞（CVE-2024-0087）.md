---
cve: "CVE-2024-0087"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】NVIDIA Triton Inference Server 远程代码执行漏洞（CVE-2024-0087）   
 启明星辰安全简讯   2024-06-21 17:44  
  
**一、漏洞****概述**  
<table><tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:20.15pt;"><td width="78.33333333333333" style="border-width: 2.25pt 1.5pt 1.5pt 2.25pt;border-color: windowtext;border-style: solid;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞名称<o:p></o:p></span></p></td><td width="346.3333333333333" colspan="3" style="border-top: 2.25pt solid windowtext;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-size: 14px;font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);"> NVIDIA Triton Inference Server for Linux远程代码执行漏洞<o:p></o:p></span></p></td></tr><tr style="mso-yfti-irow:1;height:20.15pt;"><td width="98.33333333333333" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">CVE   ID<o:p></o:p></span></p></td><td width="366.3333333333333" colspan="3" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">CVE-2024-0087<o:p></o:p></span></p></td></tr><tr style="mso-yfti-irow:2;height:20.15pt;"><td width="98.33333333333333" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞类型<o:p></o:p></span></p></td><td width="95.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: black;font-size: 14px;">文件写入<o:p></o:p></span></p></td><td width="92.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">发现时间<o:p></o:p></span></p></td><td width="116.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">2024-06-21<o:p></o:p></span></p></td></tr><tr style="mso-yfti-irow:3;height:20.15pt;"><td width="98.33333333333333" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞评分<o:p></o:p></span></p></td><td width="103.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">9.0<o:p></o:p></span></p></td><td width="98.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞等级<o:p></o:p></span></p></td><td width="116.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">高危<o:p></o:p></span></p></td></tr><tr style="mso-yfti-irow:4;"><td width="98.33333333333333" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">攻击向量<o:p></o:p></span></p></td><td width="103.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">网络<o:p></o:p></span></p></td><td width="98.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">所需权限<o:p></o:p></span></p></td><td width="116.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">高<o:p></o:p></span></p></td></tr><tr style="mso-yfti-irow:5;"><td width="98.33333333333333" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">利用难度<o:p></o:p></span></p></td><td width="103.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">低<o:p></o:p></span></p></td><td width="98.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">用户交互<o:p></o:p></span></p></td><td width="116.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">无<o:p></o:p></span></p></td></tr><tr style="mso-yfti-irow:6;mso-yfti-lastrow:yes;"><td width="98.33333333333333" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 2.25pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">PoC/EXP<o:p></o:p></span></p></td><td width="103.33333333333333" style="border-top: none;border-left: none;border-bottom: 2.25pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">已公开<o:p></o:p></span></p></td><td width="98.33333333333333" style="border-top: none;border-left: none;border-bottom: 2.25pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">在野利用<o:p></o:p></span></p></td><td width="116.33333333333333" style="border-top: none;border-left: none;border-bottom: 2.25pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">未发现<o:p></o:p></span></p></td></tr></tbody></table>  
Triton Inference Server是NVIDIA发布的一款开源软件，是 NVIDIA AI 平台的重要组成部分。该服务器可以标准化各种工作负载的 AI 模型的部署和执行，为用户提供快速、可扩展的 AI 服务。作为全球主流的 AI 推理服务器，Triton 被全球众多人工智能厂商广泛使用。  
  
6月21日，启明星辰集团VSRC监测到NVIDIA Triton Inference Server for
Linux远程代码执行漏洞（CVE-2024-0087）的漏洞细节及PoC在互联网上公开，该漏洞的CVSS评分为9.0。  
  
NVIDIA Triton Inference Server for Linux 版本22.09 - 24.03中，由于日志文件配置接口/v2/logging接受log_file参数，允许设置要写入的日志文件的绝对路径，有权访问该接口的威胁者可利用该参数执行任意文件写入，成功利用该漏洞可能导致远程代码执行、拒绝服务、权限提升、信息泄露和数据篡改等。  
  
## 二、影响范围  
  
NVIDIA Triton Inference Server（Linux平台）：22.09
- 24.03  
  
## 三、安全措施  
### 3.1 升级版本  
  
目前该漏洞已经修复，受影响用户可升级到NVIDIA Triton
Inference Server for Linux 24.04或更高版本。  
  
下载链接：  
  
https://developer.nvidia.com/triton-inference-server  
### 3.2 临时措施  
  
暂无。  
### 3.3 通用建议  
  
定期更新系统补丁，减少系统漏洞，提升服务器的安全性。  
  
加强系统和网络的访问控制，修改防火墙策略，关闭非必要的应用端口或服务，减少将危险服务（如SSH、RDP等）暴露到公网，减少攻击面。  
  
使用企业级安全产品，提升企业的网络安全性能。  
  
加强系统用户和权限管理，启用多因素认证机制和最小权限原则，用户和软件权限应保持在最低限度。  
  
启用强密码策略并设置为定期修改。  
### 3.4 参考链接  
  
https://nvidia.custhelp.com/app/answers/detail/a_id/5535  
  
https://nvd.nist.gov/vuln/detail/CVE-2024-0087  
  
https://sites.google.com/site/zhiniangpeng/blogs/Triton-RCE  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
