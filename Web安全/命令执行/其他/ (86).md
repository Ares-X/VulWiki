---
cve: "CVE-2024-39397"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Magento Open Source文件上传远程代码执行漏洞（CVE-2024-39397）   
 启明星辰安全简讯   2024-08-15 17:22  
  
**一、漏洞****概述**  
<table><tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:20.15pt;"><td width="82.33333333333333" style="border-width: 2.25pt 1.5pt 1.5pt 2.25pt;border-color: windowtext;border-style: solid;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞名称<o:p></o:p></span></p></td><td width="357.3333333333333" colspan="3" style="border-top: 2.25pt solid windowtext;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;word-break: break-all;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-size: 14px;font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);">Magento Open Source文件上传远程代码执行漏洞<o:p></o:p></span></p></td></tr><tr style="mso-yfti-irow:1;height:20.15pt;"><td width="102" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">CVE   ID<o:p></o:p></span></p></td><td width="377.3333333333333" colspan="3" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">CVE-2024-39397<o:p></o:p></span></p></td></tr><tr style="mso-yfti-irow:2;height:20.15pt;"><td width="102" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞类型<o:p></o:p></span></p></td><td width="102.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: black;font-size: 14px;">文件上传<o:p></o:p></span></p></td><td width="95.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">发现时间<o:p></o:p></span></p></td><td width="124.33333333333334" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">2024-08-15<o:p></o:p></span></p></td></tr><tr style="mso-yfti-irow:3;height:20.15pt;"><td width="102" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞评分<o:p></o:p></span></p></td><td width="102.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">9.0<o:p></o:p></span></p></td><td width="102.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">漏洞等级<o:p></o:p></span></p></td><td width="125.33333333333334" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;word-break: break-all;" height="20"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">高危<o:p></o:p></span></p></td></tr><tr style="mso-yfti-irow:4;"><td width="102" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">攻击向量<o:p></o:p></span></p></td><td width="102.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">网络<o:p></o:p></span></p></td><td width="102.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">所需权限<o:p></o:p></span></p></td><td width="126.33333333333334" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">无<o:p></o:p></span></p></td></tr><tr style="mso-yfti-irow:5;"><td width="102" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">利用难度<o:p></o:p></span></p></td><td width="102.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">高<o:p></o:p></span></p></td><td width="102.33333333333333" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">用户交互<o:p></o:p></span></p></td><td width="126.33333333333334" style="border-top: none;border-left: none;border-bottom: 1.5pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">无<o:p></o:p></span></p></td></tr><tr style="mso-yfti-irow:6;mso-yfti-lastrow:yes;"><td width="102" style="border-top: none;border-left: 2.25pt solid windowtext;border-bottom: 2.25pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">PoC/EXP<o:p></o:p></span></p></td><td width="102.33333333333333" style="border-top: none;border-left: none;border-bottom: 2.25pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">未公开<o:p></o:p></span></p></td><td width="102.33333333333333" style="border-top: none;border-left: none;border-bottom: 2.25pt solid windowtext;border-right: 1.5pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">在野利用<o:p></o:p></span></p></td><td width="126.33333333333334" style="border-top: none;border-left: none;border-bottom: 2.25pt solid windowtext;border-right: 2.25pt solid windowtext;background: rgb(222, 234, 246);padding: 0cm 5.4pt;"><p style="text-align: center;line-height: 150%;margin-top: 0px;margin-bottom: 0px;"><span style="font-family: 微软雅黑, &#34;sans-serif&#34;;color: rgb(51, 51, 51);font-size: 14px;">未发现<o:p></o:p></span></p></td></tr></tbody></table>  
Adobe Commerce 是Adobe公司推出的企业级电子商务平台，它为企业提供了一个完整的电子商务解决方案，用于构建、管理和优化线上商店及数字商业渠道。Magento Open Source是一款由Adobe支持的开源电子商务平台，它为开发者和商家提供了一个构建独特在线商店的基础框架。  
  
2024年8月15日，启明星辰集团VSRC监测到 Adobe Commerce和Magento Open Source中存在一个文件上传漏洞（CVE-2024-39397），该漏洞的CVSS评分为9.0。  
  
Adobe Commerce和 Magento Open Source 2.4.7-p1、2.4.6-p6、2.4.5-p8、2.4.4-p9及之前版本中存在任意文件上传漏洞，当使用Apache作为Web服务器时，未经身份验证的威胁者可通过向 /checkout/cart/updateItemOptions/id/{id} 提交恶意 POST 请求，上传恶意文件并导致在服务器上执行任意代码。  
  
  
此外，Adobe Commerce和 Magento Open So  
urce中还修复了一个安全功能绕过漏洞（CVE-2024-39398），该漏洞的CVSS评分为7.4，由于对过度身份验证尝试限制不当，可能导致安全功能绕过，未经身份验证的威胁者可利用该漏洞执行暴力破解攻击，成功利用可能获得对帐户的未授权访问权限。  
  
## 二、影响范围  
  
Adobe Commerce & Magento Open Source <= 2.4.7-p1  
  
Adobe Commerce & Magento Open Source <= 2.4.6-p6  
  
Adobe Commerce & Magento Open Source <= 2.4.5-p8  
  
Adobe Commerce & Magento Open Source <=
2.4.4-p9  
  
## 三、安全措施  
### 3.1 升级版本  
  
目前这些漏洞已经修复，受影响Adobe Commerce 和 Magento Open Source用户可升级到以下版本：  
  
2.4.7-p1及之前版本：升级到2.4.7-p2  
  
2.4.6-p6及之前版本：升级到2.4.6-p7  
  
2.4.5-p8及之前版本：升级到2.4.5-p9  
  
2.4.4-p9及之前版本：升级到2.4.4-p10  
  
下载链接：  
  
https://github.com/magento/magento2/releases  
### 3.2 临时措施  
  
针对CVE-2024-39397，目前Adobe已发布了适用于Adobe Commerce on Cloud、Adobe Commerce on-premises和 Magento Open
Source的独立补丁，下载及应用CVE-2024-39397独立补丁，以及判断是否已应用独立补丁可参考：  
  
https://experienceleague.adobe.com/en/docs/commerce-knowledge-base/kb/troubleshooting/known-issues-patches-attached/security-update-available-for-adobe-commerce-apsb24-61  
### 3.3 通用建议  
  
定期更新系统补丁，减少系统漏洞，提升服务器的安全性。  
  
加强系统和网络的访问控制，修改防火墙策略，关闭非必要的应用端口或服务，减少将危险服务（如SSH、RDP等）暴露到公网，减少攻击面。  
  
使用企业级安全产品，提升企业的网络安全性能。  
  
加强系统用户和权限管理，启用多因素认证机制和最小权限原则，用户和软件权限应保持在最低限度。  
  
启用强密码策略并设置为定期修改。  
### 3.4 参考链接  
  
https://helpx.adobe.com/security/products/magento/apsb24-61.html  
  
https://business.adobe.com/cn/products/magento/magento-commerce.html  
  
https://vulners.com/vulnrichment/VULNRICHMENT:CVE-2024-39397  
  
  
https://nvd.nist.gov/vuln/detail/CVE-2024-39397  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
