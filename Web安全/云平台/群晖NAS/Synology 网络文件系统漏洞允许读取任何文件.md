---
cve: "CVE-2025-1021"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Synology 网络文件系统漏洞允许读取任何文件   
 网安百色   2025-04-24 11:30  
  
Synology 的 DiskStation Manager （DSM） 软件中发现了一个严重的安全漏洞。此漏洞允许远程攻击者在未经适当授权的情况下通过网络文件系统 （NFS） 服务读取任意文件。  
  
该漏洞被跟踪为 CVE-2025-1021，并在安全公告中进行了详细说明，该漏洞已在最近的更新中得到解决，并影响了常用网络连接存储 （NAS）作系统的多个版本。  
## Synology NFS 漏洞 – CVE-2025-1021  
  
该安全漏洞评级为“重要”，CVSS3 基本分数为 7.5，源于 Synology DSM 的“synocopy”组件中缺少授权漏洞。  
  
此漏洞使未经身份验证的远程攻击者能够绕过安全控制并通过可写 NFS 服务访问敏感文件。  
  
根据 Synology 于 2025 年 2 月 26 日发布并于 2025 年 4 月 23 日更新的技术细节，该漏洞的特征为 CVSS3 向量 CVSS：3.1/AV：N/AC：L/PR：N/UI：N/S：U/C：H/I：N/A：N。  
  
此向量表示可利用的网络漏洞，攻击复杂度低，不需要权限或用户交互，并可能导致较高的机密性影响。  
  
此漏洞尤其令人担忧，因为它允许攻击者在没有身份验证的情况下读取任意文件。  
  
使用 Synology NAS 设备的组织应立即更新，以防止未经授权访问敏感数据。  
  
发现该漏洞的功劳归功于 DEVCORE 研究团队 （https://devco.re/），该团队以识别企业软件和硬件产品中的关键安全问题而闻名。  
  
<table><tbody><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="14330498" msthash="196" style="box-sizing: border-box;font-weight: bold;"><span leaf="">风险因素</span></strong></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><strong msttexthash="3259074" msthash="197" style="box-sizing: border-box;font-weight: bold;"><span leaf="">详</span></strong></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">受影响的产品</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">帝斯曼 &lt; 7.1.1-42962-8、帝斯曼&lt; 7.2.1-69057-7、帝斯曼&lt; 7.2.2-72806-3</span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">冲击</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">允许远程攻击者读取任意文件，从而可能危害敏感数据</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">利用先决条件</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">无需身份验证或用户交互;攻击者必须具有对可写 NFS 服务的网络访问权限</span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">CVSS 3.1 分数</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">7.5 （重要）</span></section></td></tr></tbody></table>  
**受影响的产品和补救措施**  
  
该漏洞影响 Synology DSM作系统的多个版本：  
- DSM 7.2.2：用户应升级到 7.2.2-72806-3 或更新版本。  
  
- DSM 7.2.1：用户应升级到 7.2.1-69057-7 或更新版本。  
  
- DSM 7.1：用户应升级到 7.1.1-42962-8 或更新版本。  
  
Synology 已确认除了应用更新外没有可用的缓解措施，因此用户及时修补受影响的系统至关重要。  
## 针对用户的建议  
  
安全专家建议 Synology 用户立即采取以下步骤：  
- 检查所有 Synology 设备上运行的 DSM 版本。  
  
- 根据当前版本应用相应的更新。  
  
- 查看 NFS 共享配置和权限。  
  
- 监控系统日志中是否存在任何可能表明以前被利用的可疑活动。  
  
**免责声明**  
：  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
