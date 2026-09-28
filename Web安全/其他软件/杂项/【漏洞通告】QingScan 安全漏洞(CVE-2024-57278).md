---
cve: "CVE-2024-57278"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】QingScan 安全漏洞(CVE-2024-57278)   
 安迈信科应急响应中心   2025-02-13 02:46  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tdibEPWdubQUgErMslSgzVibGKdSFkWPTbTgu83UTXdNYm7eOxRSmuNmOjUIxdicy73wTLufCMnbs6CAsc3uicJUcg/640?wx_fmt=png "")  
### 01 漏洞概况在RT-Thread的5.1.0版本之前，发现了一个分类为问题的漏洞。该漏洞影响了位于rt-thread/components/lwp/lwp_syscall.c文件中的sys_thread_create函数。对参数arg[0]的操作导致了信息泄露。02 漏洞处置综合处置优先级：高漏洞信息漏洞名称QingScan 安全漏洞(CVE-2024-57278)‍‍漏洞编号CVE编号CVE-2024-57278漏洞评估披露时间2025-02-10漏洞类型反射型跨站脚本危害评级未知公开程度PoC未公开威胁类型远程利用情报在野利用是影响产品产品名称QingScan受影响版本QingScan v1.8.0影响范围广有无修复补丁有  
### 03 漏洞排查      用户尽快排查QingScan 应用版本是否为1.8.0。若存在应用使用，极大可能会受到影响。04 修复方案     建议更新当前系统或软件至最新版，完成漏洞的修复。参考链接：https://app.opencve.io/cve/CVE-2024-5727805 时间线      2025.02.10 厂商发布安全补丁      2024.02.13 安迈信科安全运营团队发布通告   关于安迈信科西安安迈信科科技有限公司以“数字化可管理”为核心理念，坚持DevOps自主研发，创新打造“能力聚合、流程闭环、持续赋能”的综合性网络数据安全平台与运营服务。公司从古城西安出发，已在全国范围内为政府、运营商、电力、能源等行业客户提供了高质量的安全保障，并将继续为我国数字化转型和发展贡献力量。知 行 . 至 简 . 致 诚  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
