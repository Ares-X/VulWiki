---
cve: "CVE-2026-35454"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Code Extension Marketplace存在目录遍历漏洞(CVE-2026-35454)  
安迈信科
                    安迈信科  安迈信科应急响应中心   2026-04-09 06:13  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tdibEPWdubQUgErMslSgzVibGKdSFkWPTbTgu83UTXdNYm7eOxRSmuNmOjUIxdicy73wTLufCMnbs6CAsc3uicJUcg/640?wx_fmt=png "")  
### 01 漏洞概况     Code Extension Marketplace 是 VS Code Marketplace 的开源替代方案。在 2.4.2 版本之前，coder/code-marketplace 中的 Zip Slip 漏洞允许恶意的 VSIX 文件在扩展目录之外写入任意文件。ExtractZip 将原始的 zip 条目名称传递给了一个回调函数，该函数通过 filepath.Join 写入文件，但没有进行边界检查；filepath.Join 解析了 .. 组件，但未能阻止结果路径逃逸出基础路径。02 漏洞处置综合处置优先级：高漏洞信息漏洞名称Code Extension Marketplace存在目录遍历漏洞漏洞编号CVE编号CVE-2026-35454‍漏洞评估披露时间2026-04-06漏洞类型目录遍历危害评级低危公开程度PoC未公开威胁类型远程利用情报在野利用是影响产品产品名称Code Extension Marketplace受影响版本Code Extension Marketplace <2.4.2影响范围广有无修复补丁有  
### 03 漏洞排查      用户尽快排查对应系统Code Extension Marketplace版本是否处于漏洞版本范围内，若存在请尽快更新至最新版本。04 修复方案1、官方修复方案：更新版本到2.4.205 时间线      2026.04.06 厂商发布安全补丁      2026.04.09 安迈信科安全运营团队发布通告   关于安迈信科西安安迈信科科技有限公司以“数字化可管理”为核心理念，坚持DevOps自主研发，创新打造“能力聚合、流程闭环、持续赋能”的综合性网络数据安全平台与运营服务。公司从古城西安出发，已在全国范围内为政府、运营商、电力、能源等行业客户提供了高质量的安全保障，并将继续为我国数字化转型和发展贡献力量。知 行 . 至 简 . 致 诚  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
