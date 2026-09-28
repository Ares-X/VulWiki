---
cve: "CVE-2023-39266"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】HPE Aruba Networking多款交换机跨站脚本漏洞威胁通告   
安识科技  SecPulse安全脉搏   2023-08-31 11:01  
  
##   
  
1. **通告信息**  
  
  
  
近日，安识科技  
A-Team团队监测到Aruba Networks发布安全公告，修复了其多款交换机型号中的一个跨站脚本漏洞（CVE-2023-39266），该漏洞的CVSSv3评分为8.3。  
  
对此，安识科技建议广大用户及时升级到安全版本，并做好资产自查以及预防工作，以免遭受黑客攻击。  
##   
  
2. **漏洞概述**  
  
  
  
漏洞名称：  
HPE Aruba Networking多款交换机跨站脚本漏洞  
  
CVE编号：  
CVE-2023-39266  
  
简述：  
Aruba Networks（HPE旗下子公司）是一家美国企业移动网络供应商，也是有线、无线和 SD-WAN 解决方案的全球领导品牌之一。  
  
ArubaOS-Switch web管理界面中存在漏洞，如果存在某些配置选项，  
未经身份验证的远程威胁者可以对用户界面执行存储型  
XSS攻击，成功利用该漏洞可能导致当受害者访问包含恶意代码的页面时，在受害者的浏览器中执行任意脚本代码  
，该漏洞已经公开披露。  
  
此外，  
Aruba Networks还修复了ArubaOS-Switch拒绝服务漏洞（CVE-2023-39267，CVSSv3评分6.6），由于ArubaOS Switch的命令行界面中存在经过身份验证的远程代码执行漏洞，成功利用该漏洞可能导致交换机拒绝服务；以及ArubaOS-Switch 中的一个内存损坏漏洞（CVE-2023-39268，CVSSv3评分4.5），可通过使其接收特制数据包导致未经身份验证的远程代码执行，成功利用该漏洞可能导致以特权用户身份在系统上执行任意代码。  
##   
  
3. **漏洞危害**  
  
  
  
未经身份验证的远程威胁者可以对用户界面执行存储型  
XSS攻击，成功利用该漏洞可能导致当受害者访问包含恶意代码的页面时，在受害者的浏览器中执行任意脚本代码。  
##   
  
4. **影响版本**  
  
  
  
受影响的  
HPE Aruba Networking交换机型号：  
  
Aruba 5400R 系列交换机  
  
Aruba 3810 系列交换机  
  
Aruba 2920 系列交换机  
  
Aruba 2930F 系列交换机  
  
Aruba 2930M 系列交换机  
  
Aruba 2530 系列交换机  
  
Aruba 2540 系列交换机  
  
受影响的软件分支版本：  
  
ArubaOS-Switch 16.11.xxxx：KB/WC/YA/YB/YC.16.11.0012 及以下版本。  
  
ArubaOS-Switch 16.10.xxxx：KB/WC/YA/YB/YC.16.10.0025 及以下版本。  
  
ArubaOS-Switch 16.10.xxxx：WB.16.10.23 及以下版本。  
  
ArubaOS-Switch 16.09.xxxx：所有版本。  
  
ArubaOS-Switch 16.08.xxxx：KB/WB/WC/YA/YB/YC.16.08.0026 及以下版本。  
  
ArubaOS-Switch 16.07.xxxx：所有版本。  
  
ArubaOS-Switch 16.06.xxxx：所有版本。  
  
ArubaOS-Switch 16.05.xxxx：所有版本。  
  
ArubaOS-Switch 16.04.xxxx：KA/RA.16.04.0026 及以下版本。  
  
ArubaOS-Switch 16.03.xxxx：所有版本。  
  
ArubaOS-Switch 16.02.xxxx：所有版本。  
  
ArubaOS-Switch 16.01.xxxx：所有版本。  
  
ArubaOS-Switch 15.xx.xxxx：15.16.0025 及以下版本。  
##   
  
5. **解决方案**  
  
  
  
目前这些漏洞已经修复，受影响用户可升级到以下受支持版本：  
  
ArubaOS-Switch 16.11.xxxx：KB/WC/YA/YB/YC.16.11.0013 及更高版本。  
  
ArubaOS-Switch 16.10.xxxx：WB.16.10.0024 及更高版本。  
  
ArubaOS-Switch 16.08.xxxx：KB/WB/WC/YA/YB/YC.16.08.0027 及更高版本。  
  
ArubaOS-Switch 16.04.xxxx：KA/RA.16.04.0027 及更高版本。  
  
ArubaOS-Switch 15.xx.xxxx：A.15.16.0026 及更高版本。  
  
下载链接：  
  
https://www.arubanetworks.com/  
  
临时措施：  
  
1.针对CVE-2023-39266，可通过更改配置（例如在交换机上设置操作员密码并强制使用 HTTPS）来防止漏洞攻击。有关详细信息，请参阅 ArubaOS-Switch 强化指南：  
  
https://support.hpe.com/hpesc/public/docDisplay ?docId=a00056155en_us  
  
此外，禁用   
Web 管理界面可以防止此类攻击。  
  
2.为了最大限度地降低威胁者利用这些漏洞的可能性，HPE Aruba Networking建议将CLI和基于web的管理界面限制在专用的第2层网段/VLAN或由第3层及以上的防火墙策略控制。  
##   
  
6. **时间轴**  
  
  
  
【-】2023年0  
8  
月  
29  
日 安识科技A-Team团队监测到漏洞公布信息  
  
【  
-】2023年0  
8  
月  
30  
日   
安识科技  
A-Team团队根据漏洞信息分析  
  
【  
-】2023年0  
8  
月  
31  
日   
安识科技  
A-Team团队发布安全通告  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
