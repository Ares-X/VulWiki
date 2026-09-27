---
cve: "CVE-2025-0169"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】DWT-目录和列表WordPress主题 验证通过短代码(CVE-2025-0169)存储的跨站点脚本   
 安迈信科应急响应中心   2025-02-13 02:46  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tdibEPWdubQUgErMslSgzVibGKdSFkWPTbTgu83UTXdNYm7eOxRSmuNmOjUIxdicy73wTLufCMnbs6CAsc3uicJUcg/640?wx_fmt=png "")  
### 01 漏洞概况      DWT - Directory & Listing WordPress主题在版本3.3.4及之前存在存储型跨站脚本漏洞（Stored Cross-Site Scripting），这是由于对用户提供的属性进行了不足的输入清理和输出转义导致的。这使得拥有贡献者级别及以上权限的认证攻击者能够在页面中注入任意网页脚本，每当用户访问注入页面时，脚本就会执行。02 漏洞处置综合处置优先级：高漏洞信息漏洞名称DWT-目录和列表WordPress主题 验证通过短代码存储的跨站点脚本漏洞编号CVE编号CNVD-2025-0169‍漏洞评估披露时间2025-02-10漏洞类型跨站点脚本（XSS）危害评级高危公开程度PoC未公开威胁类型远程利用情报在野利用是影响产品产品名称Listing WordPres受影响版本Listing WordPres < 3.3.4影响范围广有无修复补丁有  
### 03 漏洞排查      用户尽快排查Listing WordPres 版本是否小于3.3.4，若存在应用使用，极大可能会受到影响。04 修复方案建议受影响的用户及时更新升级到最新版本，完成漏洞的修复。参考链接：https://avd.aliyun.com/nvd/list?timestamp__1384=eqRxBQDQq7wOD8Dlpmq0%3DGOYOGQjjmeIhQdx05 时间线      2024.02.10 厂商发布安全补丁      2024.02.12 安迈信科安全运营团队发布通告   关于安迈信科西安安迈信科科技有限公司以“数字化可管理”为核心理念，坚持DevOps自主研发，创新打造“能力聚合、流程闭环、持续赋能”的综合性网络数据安全平台与运营服务。公司从古城西安出发，已在全国范围内为政府、运营商、电力、能源等行业客户提供了高质量的安全保障，并将继续为我国数字化转型和发展贡献力量。知 行 . 至 简 . 致 诚  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
