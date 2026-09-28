---
cve: "CVE-2025-64155"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Fortinet FortiSIEM phMonitor服务命令注入漏洞(CVE-2025-64155)  
深瞳漏洞实验室
                    深瞳漏洞实验室  深信服千里目安全技术中心   2026-01-15 08:51  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLfg0wbcxcNZueGSc6ZrMpGK4po0fyLHM4RXGGzWeQiab3o9wstiboFohEMI76IsPYTibJlb1UQiaaZw/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Fortinet FortiSIEM phMonitor服务命令注入漏洞(CVE-2025-64155)  
  
**组件名称：**  
  
Fortinet-FortiSIEM  
  
**影响范围：**  
  
Fortinet FortiSIEM 7.4.0  
  
7.3.0 ≤ Fortinet FortiSIEM ≤ 7.3.4  
  
7.2.0 ≤ Fortinet FortiSIEM ≤ 7.2.6  
  
7.1.0 ≤ Fortinet FortiSIEM ≤ 7.1.8  
  
7.0.0 ≤ Fortinet FortiSIEM ≤ 7.0.4  
  
6.7.0 ≤ Fortinet FortiSIEM ≤ 6.7.10  
  
**漏洞类型：**  
  
命令执行  
  
**利用条件：**  
  
1、用户认证：不需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：容易，无需授权即可执行任意命令。  
  
<综合评定威胁等级>：严重，能导致服务器失陷。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLfg0wbcxcNZueGSc6ZrMpZshyNhIpmwRuVbIgRzY4ndwBlG8q9FT17ptdib5JLnu5z5HvWf64Tog/640?wx_fmt=gif&from=appmsg "")  
  
组件介绍  
  
FortiSIEM是由网络安全厂商飞塔设计研发的综合性SIEM产品，其整合的UEBA功能全面包括了内部威胁识别、用户行为风险评分和受攻击账户检测等能力。FortiSIEM是一款强大的网络威胁防护解决方案，理论上说适用于任何企业，不过在实际应用时，它尤其适用于已经使用飞塔防火墙等设备的用户，因为通过与FortiGate设备集成，可以更加方便地共享数据。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLfg0wbcxcNZueGSc6ZrMpZshyNhIpmwRuVbIgRzY4ndwBlG8q9FT17ptdib5JLnu5z5HvWf64Tog/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
  
2026年1月15日，深瞳漏洞实验室监测到一则Fortinet-FortiSIEM组件存在命令执行漏洞的信息，漏洞编号：CVE-2025-64155，漏洞威胁等级：严重。  
  
Fortinet FortiSIEM的phMonitor服务存在命令注入漏洞，未经授权的**攻击者可以利用该漏洞发送恶意的TCP请求，以root权限执行任意命令，导致服务器失陷。**  
  
  
  
  
**影响范围**  
  
目前受影响的Fortinet-FortiSIEM版本：  
  
Fortinet FortiSIEM 7.4.0  
  
7.3.0 ≤ Fortinet FortiSIEM ≤ 7.3.4  
  
7.2.0 ≤ Fortinet FortiSIEM ≤ 7.2.6  
  
7.1.0 ≤ Fortinet FortiSIEM ≤ 7.1.8  
  
7.0.0 ≤ Fortinet FortiSIEM ≤ 7.0.4  
  
6.7.0 ≤ Fortinet FortiSIEM ≤ 6.7.10  
  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLfg0wbcxcNZueGSc6ZrMpZshyNhIpmwRuVbIgRzY4ndwBlG8q9FT17ptdib5JLnu5z5HvWf64Tog/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
Fortinet已发布最新版本修复该漏洞，建议受影响用户更新到以下版本：  
  
Fortinet FortiSIEM 7.4.1  
  
Fortinet FortiSIEM 7.3.5  
  
Fortinet FortiSIEM 7.2.7  
  
Fortinet FortiSIEM 7.1.9  
  
下载链接：https://fortiguard.fortinet.com/psirt/FG-IR-25-772  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLfg0wbcxcNZueGSc6ZrMpZshyNhIpmwRuVbIgRzY4ndwBlG8q9FT17ptdib5JLnu5z5HvWf64Tog/640?wx_fmt=gif&from=appmsg "")  
  
**临时修复建议**  
  
- 限制对phMonitor的7900端口访问。  
  
- 遵循最小权限原则，严控各类敏感操作权限范围。  
  
- 非必要不暴露服务到公网，限制访问源为可信范围。  
  
- 定期更新系统及各类组件至安全版本，及时修补已知隐患。  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zLfg0wbcxcNZueGSc6ZrMpZshyNhIpmwRuVbIgRzY4ndwBlG8q9FT17ptdib5JLnu5z5HvWf64Tog/640?wx_fmt=gif&from=appmsg "")  
  
**深信服解决方案**  
  
  
**1、漏洞主动检测**  
  
支持对Fortinet FortiSIEM phMonitor服务命令注入漏洞(CVE-2025-64155)的主动检测，可批量快速检出业务场景中是否存在**漏洞风险**  
，相关产品如下：  
  
**【深信服云镜YJ】**  
预计2026年01月16日发布检测方案，规则ID:SF-2026-00433。  
  
**【深信服可拓展检测响应平台XDR】**  
预计2026年01月16日发布检测方案（需要具备云镜组件能力），规则ID:SF-2026-00433。  
  
  
**2、漏洞安全监测**  
  
支持对Fortinet FortiSIEM phMonitor服务命令注入漏洞(CVE-2025-64155)的监测，可依据流量收集实时监控业务场景中的**受影响资产情况，快速检查受影响范围**  
，相关产品及服务如下：  
  
**【深信服安全感知管理平台SIP】**  
预计2026年01月16日发布监测方案，规则ID:10011238。  
  
**【深信服安全托管服务MSS】**  
预计2026年01月16日发布监测方案（需要具备SIP组件能力），规则ID:10011238。  
  
**【深信服可拓展检测响应平台XDR】**  
预计2026年01月16日发布监测方案，规则ID:10011238。  
  
  
**3、漏洞安全防护**  
  
支持对Fortinet FortiSIEM phMonitor服务命令注入漏洞(CVE-2025-64155)的防御，**可阻断攻击者针对该事件的入侵行为**  
，相关产品及服务如下：  
  
**【深信服下一代防火墙AF】**  
预计2026年01月16日发布防护方案，规则ID:10011238。  
  
**【深信服Web应用防火墙WAF】**  
预计2026年01月16日发布防护方案，规则ID:10011238。  
  
**【深信服安全托管服务MSS】**  
预计2026年01月16日发布防护方案（需要具备AF组件能力），规则ID:10011238。  
  
**【深信服可拓展检测响应平台XDR】**  
预计2026年01月16日发布防护方案（需要具备AF组件能力），规则ID:10011238。  
  
  
  
参考链接  
  
  
https://fortiguard.fortinet.com/psirt/FG-IR-25-772  
  
  
  
时间轴  
  
  
  
**2026/01/15**  
  
深瞳漏洞实验室监测到Fortinet FortiSIEM phMonitor服务命令注入漏洞信息。  
  
  
  
**2026/01/15**  
  
深瞳漏洞实验室发布漏洞通告。  
  
  
  
点击**阅读原文**  
，及时关注并登录深信服**智安全平台**  
，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5zLfg0wbcxcNZueGSc6ZrMpOCgdWg2JSy9VAdXWnvHBnCFUq8N6Aoa6ZcRqmOhQXIxZe0z9x75DmQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5zvcIHbwGGYKbqDVYsVKzNNia1jYtHf49C7133AlDXAgex2W4lFvpia56tjQQDkiauNBrl08YbxqG01A/640?wx_fmt=jpeg&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
