---
cve: "CVE-2025-21505; CVE-2025-21548; CVE-2025-21534; CVE-2025-21493; CVE-2025-21555; CVE-2025-21495; CVE-2025-21500; CVE-2025-21523; CVE-2025-21536; CVE-2025-21499"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Oracle MySQL Server 漏洞"
product: "MySQL Server, MySQL Connectors, MySQL Enterprise Firewall"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-21505; CVE-2025-21548; CVE-2025-21534; CVE-2025-21493; CVE-2025-21555; CVE-2025-21495; CVE-2025-21500; CVE-2025-21523; CVE-2025-21536; CVE-2025-21499"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "不同组件、分支及角色条件未分清；全部为公告摘录，无复现"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-ae272997f3a77be984df166c"
entity_id: "ve-ae272997f3a77be984df166c"
schema_version: "1"
---

# Oracle MySQL Server 漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：不同组件、分支及角色条件未分清；全部为公告摘录，无复现
- 证据范围：正文十项均主要实体，不是同漏洞；标题反复误用Server覆盖Connectors和Firewall

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- P0 21548应归Connector/Python，21495为Enterprise Firewall，不是Server组件
- 21548标识被换行打断为CV/E-，提取器可能漏记
- 每分支<=写法缺下界；未列所需权限/组件和准确补丁版本
- 通用型/未明只是来源缺失，不应被归为已知技术弱点
- 拆为CPU汇总页及十个关联实体，避免全文复制十次

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一天  漏洞更新   2025-01-27 02:01  
  
# Oracle MySQL是美国甲骨文（Oracle）公司的一套开源的关系数据库管理系统。MySQLServer是其中的一个数据库服务器组件。  
# Oracle MySQL Server存在未明漏洞  
# Oracle MySQL的MySQL Server存在安全漏洞。攻击者可利用该漏洞导致MySQL Server挂起或频繁重复崩溃。  
  
CVE ID：  
CVE-2025-21505  
  
危害级别：  
中  
  
影响产品：  
  
Oracle   
MySQL Server <=8.  
0.40  
  
Oracle MySQL Server <=8.4.3  
  
Oracle MySQL Server <=9.1.0  
  
漏洞类型：  
通用型漏洞  
  
漏洞解决方案：  
厂商已发布了漏洞修复程序，请及时关注更新：  
  
https://www.oracle.com/security-alerts/cpujan2025.html  
  
![](../../.resource/remote/02fdff02b2442b8cb96f58786a82462072fb3731630421aa39d1190080a15c76.png "")  
  
![](../../.resource/remote/fda296da5ba01886cc0913c8460f06a8214c4461626d6656dfc3776c223de4e6.png "")  
  
![](../../.resource/remote/32ab199ca9f8225c8a4545e0da899fe2e3e48a0278e2d2257f5e5e904e8ae248.png "")  
# Oracle MySQL Server存在未明漏洞  
  
Oracle MySQL 9.1.0版本及之前版本存在安全漏洞。攻击者可利用该漏洞创建、删除或修改对关键数据或所有MySQL Connectors可访问数据的访问，以及未经授权读取MySQL Connectors可访问数据子集，并导致未经授权导致MySQL Connectors挂起或频繁重复崩溃。  
  
CVE ID：  
CV  
E-2025-21548  
  
危害级别：  
高  
  
影响产品：  
Oracle MySQL Connectors <=9.1.0  
  
漏洞类型：  
通用型漏洞  
  
漏洞解决方案：  
厂商已发布了漏洞修复程序，请及时关注更新：  
  
https://www.oracle.com/security-alerts/cpujan2025.html  
  
![](../../.resource/remote/a7c45c81722d159b6c3b6e3bb889518539ac568f47dd245f6e301cc33e456697.png "")  
  
![](../../.resource/remote/fc445a88f5eff5edb175a007e4f8a1339673dd9b7c9baa264f87ac47bfefef2a.png "")  
  
![](../../.resource/remote/21d6a11c96cdbc0363755481bf969d6c840abc4d41190c52414db5b4cfa2ff49.png "")  
  
![](../../.resource/remote/193e4be61e3adc93db7255cbb614cf88c2845329195906b0521472be7a36947c.png "")  
  
![](../../.resource/remote/83886c5c30de17416c37b6a106c200f1dbee16fe8e13483fa6bee07229dd37ad.png "")  
# Oracle MySQL Server存在未明漏洞  
  
Oracle MySQL的MySQL Server存在安全漏洞。攻击者可利用该漏洞导致MySQL Server挂起或频繁重复崩溃。  
  
CVE ID：  
CVE-2025-21534  
  
危害级别：  
中  
  
影响产品：  
  
Oracle MySQL Server <=8.0.39  
  
Oracle MySQL Server <=8.4.2  
  
Oracle MySQL Server <=9.0.1  
  
漏洞类型：  
通用型漏洞  
  
漏洞解决方案：  
厂商已发布了漏洞修复程序，请及时关注更新：  
  
https://www.oracle.com/security-alerts/cpujan2025.html  
# Oracle MySQL Server存在未明漏洞  
  
Oracle MySQL的MySQL Server存在安全漏洞。攻击者可利用该漏洞导致MySQL Server挂起或频繁重复崩溃。  
  
CVE ID：  
CVE-2025-21493  
  
危害级别：  
中   
  
影响产品：  
  
Oracle MySQL Server <=8.4.3  
  
Oracle MySQL Server <=9.1.0  
  
漏洞类型：  
通用型漏洞  
  
漏洞解决方案：  
厂商已发布了漏洞修复程序，请及时关注更新：  
  
https://www.oracle.com/security-alerts/cpujan2025.html  
  
![](../../.resource/remote/c24f3e05dc78764e764f615f5be26aa4e1b8325321fec3a0ba7f18ac961b0f6e.png "")  
  
![](../../.resource/remote/d27e463f1961ad68cf1fa39492757a8abd2077d2617fe7b0e7b8bb8c36ef48d7.png "")  
# Oracle MySQL Server存在未明漏洞  
  
Oracle MySQL的MySQL Server存在安全漏洞，攻击者可利用该漏洞导致MySQL Server挂起或频繁重复崩溃，以及更新、插入或删除MySQL Server可访问数据。  
  
CVE ID：  
CVE-2025-21555  
  
危害级别：  
中  
  
影响产品：  
  
Oracle MySQL Server <=8.0.40  
  
Oracle MySQL Server <=8.4.3  
  
Oracle MySQL Server <=9.1.0  
  
漏洞类型：  
通用型漏洞  
  
漏洞解决方案：  
厂商已发布了漏洞修复程序，请及时关注更新：  
  
https://www.oracle.com/security-alerts/cpujan2025.html  
# Oracle MySQL Server存在未明漏洞  
  
Oracle MySQL的MySQL Enterprise Firewall存在安全漏洞，攻击者可利用该漏洞导致MySQL Enterprise Firewall挂起或频繁重复崩溃。  
  
CVE ID：  
CVE-2025-21495  
  
危害级别：  
中  
  
影响产品：  
  
Oracle MySQL Enterprise Firewall <=8.0.40  
  
Oracle MySQL Enterprise Firewall <=8.4.3  
  
Oracle MySQL Enterprise Firewall <=9.1.0  
  
漏洞类型：  
通用型漏洞  
  
漏洞解决方案：  
厂商已发布了漏洞修复程序，请及时关注更新：  
  
https://www.oracle.com/security-alerts/cpujan2025.html  
  
![](../../.resource/remote/23f5fc4a5213ea8458eed409291a34089e589ff9d723c452d7f63496aa67325d.png "")  
# Oracle MySQL Server存在未明漏洞  
  
Oracle MySQL的MySQL Server存在安全漏洞。攻击者可利用该漏洞导致MySQL Server挂起或频繁重复崩溃。  
  
CVE ID：  
CVE-2025-21500  
  
危害级别：中  
  
影响产品：  
  
Oracle MySQL Server <=8.0.40  
  
Oracle MySQL Server <=8.4.3  
  
Oracle MySQL Server <=9.1.0  
  
漏洞类型：  
通用型漏洞  
  
漏洞解决方案：  
厂商已发布了漏洞修复程序，请及时关注更新：  
  
https://www.oracle.com/security-alerts/cpujan2025.html  
# Oracle MySQL Server存在未明漏洞  
  
Oracle MySQL的MySQL Server存在安全漏洞。攻击者可利用该漏洞导致MySQL Server挂起或频繁重复崩溃。  
  
CVE ID：  
CVE-2025-21523  
  
危害级别：中  
  
影响产品：  
  
Oracle MySQL Server <=8.0.40  
  
Oracle MySQL Server <=8.4.3  
  
Oracle MySQL Server <=9.1.0  
  
漏洞类型：  
通用型漏洞  
  
漏洞解决方案：  
厂商已发布了漏洞修复程序，请及时关注更新：  
  
https://www.oracle.com/security-alerts/cpujan2025.html  
# Oracle MySQL Server存在未明漏洞  
  
Oracle MySQL的MySQL Server存在安全漏洞。攻击者可利用该漏洞导致MySQL Server挂起或频繁重复崩溃。  
  
CVE ID：  
CVE-2025-21536  
  
危害级别：中  
  
影响产品：  
  
Oracle MySQL Server <=8.0.39  
  
Oracle MySQL Server <=8.4.2  
  
Oracle MySQL Server <=9.0.1  
  
漏洞类型：  
通用型漏洞  
  
漏洞解决方案：  
厂商已发布了漏洞修复程序，请及时关注更新：  
  
https://www.oracle.com/security-alerts/cpujan2025.html  
  
![](../../.resource/remote/bb92aeebd176cb95e3e5ac253a902708a1740191e1f677b2a156980106f54dff.png "")  
  
![](../../.resource/remote/8f2f278f49fa2591722161433385bef7764f58225eef0f9da1827ae677319f5d.png "")  
  
![](../../.resource/remote/50964ccfbe19606abec6573f77de5900b4e837cef9847e4af0246ab8511d0ad0.png "")  
  
![](../../.resource/remote/ab4468c1ab4d385a00c4850d5f4389704143a10548c0b98c8d5027c05fdb36c1.png "")  
  
![](../../.resource/remote/03c77ac59b2a494143c0f5693558d02b7469f394ec4c930703096cdef3348a91.png "")  
# Oracle MySQL Server存在未明漏洞  
  
Oracle MySQL的MySQL Server存在安全漏洞。攻击者可利用该漏洞导致MySQL Server挂起或频繁重复崩溃。  
  
CVE ID：  
CVE-2025-21499  
  
危害级别：中  
  
影响产品：  
  
Oracle MySQL Server <=8.4.3  
  
Oracle MySQL Server <=9.1.0  
  
漏洞类型：  
通用型漏洞  
  
漏洞解决方案：  
厂商已发布了漏洞修复程序，请及时关注更新：  
  
https://www.oracle.com/security-alerts/cpujan2025.html  
  
![](../../.resource/remote/e2f24bfb76522c9257081058179b5367c6a82905d0c0aa7cb0d052f021522e3f.png "")  
  
![](../../.resource/remote/872a2fc926fdc9f5416a86af14947061e71b5a64535901278427c564e5380b70.png "")  
  
![](../../.resource/remote/aa019fd7ba1c10acc021e19450eba3e09c9952658219f4e81f4a8933f5a24490.png "")  
  
  
  
点个关注：  
  
  
******声明：发布结果公告信息之前，我们决定声明力争保证每条公告的准确性和可靠性建议。同时，采纳和实施公告中的则完全由用户自己决定，可能出现的问题也完全由用户承担。采纳您的建议，您提出您的个人或企业的决策，您应考虑其或个人或您的企业的策略和流程。**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
