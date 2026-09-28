---
cve: "CVE-2024-45324"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Fortinet多产品前台远程代码执行漏洞(CVE-2024-45324)   
深瞳漏洞实验室  深信服千里目安全技术中心   2025-03-12 18:05  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zUZsFhwsymhSTTVzBKYtxRDosiaQHRGs62FenzAISjpnVhuJawiaianBZZIqbKgyLppYL5xB7ibXogUg/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Fortinet多产品前台远程代码执行漏洞(CVE-2024-45324)  
  
**组件名称：**  
  
Fortinet多款产品  
  
**影响范围：**  
  
7.4.0≤FortiOS 7.4≤7.4.47.2.0≤FortiOS7.2≤7.2.97.0.0≤FortiOS7.0≤7.0.156.4.0≤FortiOS6.4≤6.4.156.2.0≤FortiOS<6.31.4.0≤FortiPAM1.4≤1.4.21.0.0≤FortiPAM≤1.3.1FortiProxy7.6.07.4.0≤FortiProxy7.4≤7.4.67.2.0≤FortiProxy7.2≤7.2.127.0.0≤FortiProxy7.0≤7.0.191.4.0≤FortiSRA1.4≤1.4.2FortiWeb7.6.07.4.0≤FortiWeb7.4≤7.4.57.2.0≤FortiWeb7.2≤7.2.10  
  
**漏洞类型：**  
  
代码执行  
  
**利用条件：**  
  
1、用户认证：不需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：容易，无需授权即可造成远程代码执行。  
  
<综合评定威胁等级>：高危，能造成远程代码执行。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zUZsFhwsymhSTTVzBKYtxRfaNZQgmlRpicEhjFFcap9WAvOkic4iaf51DCZ8MicTfIFc19xwibKLbK9LQ/640?wx_fmt=gif&from=appmsg "")  
  
**组件介绍**  
  
Fortinet FortiOS是美国飞塔（Fortinet）公司开发的一套专用于FortiGate平台上的安全操作系统，该系统为用户提供防火墙、防病毒、IPSec/SSL VPN、Web内容过滤、反垃圾邮件等多种安全功能。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zUZsFhwsymhSTTVzBKYtxRfaNZQgmlRpicEhjFFcap9WAvOkic4iaf51DCZ8MicTfIFc19xwibKLbK9LQ/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
2025年3月12日，深瞳漏洞实验室监测到一则Fortinet多产品存在代码执行漏洞的信息，漏洞编号：CVE-2024-45324，漏洞威胁等级：高危。  
  
未经授权的**攻击者可以利用外部控制的格式字符串在FortiOS、FortiProxy、FortiPAM、FortiSRA和FortiWeb的GUI界面执行任意代码或命令，导致服务器失陷。**  
  
****  
  
  
**影响范围**  
  
目前受影响的Fortinet相关产品版本：  
  
7.4.0≤FortiOS 7.4≤7.4.47.2.0≤FortiOS7.2≤7.2.97.0.0≤FortiOS7.0≤7.0.156.4.0≤FortiOS6.4≤6.4.156.2.0≤FortiOS<6.31.4.0≤FortiPAM1.4≤1.4.21.0.0≤FortiPAM≤1.3.1FortiProxy7.6.07.4.0≤FortiProxy7.4≤7.4.67.2.0≤FortiProxy7.2≤7.2.127.0.0≤FortiProxy7.0≤7.0.191.4.0≤FortiSRA1.4≤1.4.2FortiWeb7.6.07.4.0≤FortiWeb7.4≤7.4.57.2.0≤FortiWeb7.2≤7.2.10  
  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zUZsFhwsymhSTTVzBKYtxRfaNZQgmlRpicEhjFFcap9WAvOkic4iaf51DCZ8MicTfIFc19xwibKLbK9LQ/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
官方已发布最新版本修复该漏洞，建议受影响用户将FortiOS, FortiProxy, FortiPAM, FortiSRA和FortiWeb更新到以下版本：FortiOS 7.4.5FortiOS 7.2.10FortiOS 7.0.16FortiOS 6.4.16FortiPAM 1.4.3FortiPAM 1.3.2FortiProxy 7.6.1FortiProxy 7.4.7FortiProxy 7.2.13FortiProxy 7.0.20FortiSRA 1.4.3FortiWeb 7.6.1FortiWeb 7.4.6FortiWeb 7.2.11FortiWeb 7.0.11下载链接：https://docs.fortinet.com/upgrade-tool  
  
  
  
  
**参考链接**  
  
  
https://fortiguard.fortinet.com/psirt/FG-IR-24-325  
  
  
  
  
  
**时间轴**  
  
  
  
**2025/3/12**  
  
深瞳漏洞实验室监测到Fortinet多产品前台远程代码执行漏洞信息。  
  
  
**2025/3/12**  
  
深瞳漏洞实验室发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5yhw2d4qL0nEBWRgiaueZ1RMETNzzBRhgLicKLgT1Jw0XYRaxibWDzoo8QJNb3ia0ZzvYJo41mc6kYydg/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5zUZsFhwsymhSTTVzBKYtxRCuzbROJspepypWrhV8vrH0DwMFMucQoUTiaMoibzuibI8biciaW7StwzxibA/640?wx_fmt=png&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
