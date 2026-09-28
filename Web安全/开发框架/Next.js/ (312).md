---
cve: "CVE-2026-75604"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【已复现】漏洞通告 | Next.js 远程代码执行漏洞(CVE-2026-75604)  
安全实验室
                    安全实验室  中成信息   2026-08-27 01:34  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/iboUMajImW6QEqrJF4JnQOGkr3oahUUZeljHItNu0Jlv4XmRBM5vibEPSfsM0o02hF9lNSTnOItNvzqETpOOVbiag/640?wx_fmt=png&from=appmsg "")  
  
**1**  
  
  
**漏洞描述**  
  
Next.js 远程代码执行漏洞(CVE-2026-75604)是Next.js框架在Windows环境下的高危漏洞，CVSS评分为9.0，属于路径遍历漏洞。该漏洞影响Next.js 13.4至15.5.23版本和16.0至16.3.2版本，当应用同时使用Pages Router与App Router且未启用Cache Components时，攻击者可通过伪造Server Action请求实现未认证远程代码执行。  
  
  
  
2  
  
  
**影响范围**  
  
13.4.0 <= Next.js < 15.5.24   
  
16.0 <= Next.js < 16.3.3  
  
  
  
3  
  
  
**漏洞详情**  
<table><tbody><tr><td colspan="4" data-colwidth="143,144,143,143"><section style="text-align: center;" data-nest-level="6"><span data-pm-slice="0 0 []" data-nest-level="7"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 700;letter-spacing: 0.544px;orphans: 2;text-align: center;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="8">漏洞详情</span></span></section></td></tr><tr><td data-colwidth="143"><section style="text-align: center;" data-nest-level="6"><span data-pm-slice="0 0 []" data-nest-level="7"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 700;letter-spacing: 0.544px;orphans: 2;text-align: center;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="8">漏洞编号</span></span></section></td><td colspan="3" data-colwidth="144,143,143"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="background-color: rgb(255, 255, 255);color: rgba(0, 0, 0, 0.9);font-size: 13px;font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.544px;font-style: normal;font-weight: 400;" data-nest-level="7">CVE-2026-75604</span></section></td></tr><tr><td data-colwidth="143"><section style="text-align: center;" data-nest-level="6"><span data-pm-slice="0 0 []" data-nest-level="7"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 700;letter-spacing: 0.544px;orphans: 2;text-align: center;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="8">漏洞名称</span></span></section></td><td colspan="3" data-colwidth="144,143,143"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="background-color: rgb(255, 255, 255);color: rgba(0, 0, 0, 0.9);font-size: 13px;font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.544px;font-style: normal;font-weight: 400;" data-nest-level="7">Next.js 远程代码执行漏洞</span></section></td></tr><tr><td data-colwidth="143"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 700;letter-spacing: 0.544px;orphans: 2;text-align: center;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="7">评级</span></section></td><td data-colwidth="144"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="color: rgb(255, 41, 65);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 700;letter-spacing: 0.544px;orphans: 2;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="7"><span textstyle="" style="color: rgb(255, 41, 65);">高危</span></span></section></td><td data-colwidth="143"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 700;letter-spacing: 0.544px;orphans: 2;text-align: center;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="7">CVSS 3.1分数</span></section></td><td data-colwidth="143"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="color: rgb(255, 41, 65);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 700;letter-spacing: 0.544px;orphans: 2;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="7"><span textstyle="" style="color: rgb(255, 41, 65);">9.0</span></span></section></td></tr><tr><td data-colwidth="143"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 700;letter-spacing: 0.544px;orphans: 2;text-align: center;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="7">威胁类型</span></section></td><td data-colwidth="144"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="background-color: rgb(255, 255, 255);color: rgb(255, 41, 65);font-size: 13px;font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.544px;font-style: normal;font-weight: 700;" data-nest-level="7">代码执行</span></section></td><td data-colwidth="143"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 700;letter-spacing: 0.544px;orphans: 2;text-align: center;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="7">利用情况</span></section></td><td data-colwidth="143"><section style="text-align: center;" data-nest-level="6"><span data-pm-slice="0 0 []" data-nest-level="7"><span leaf="" style="color: rgb(255, 41, 65);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 700;letter-spacing: 0.544px;orphans: 2;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="8"><span textstyle="" style="color: rgb(255, 41, 65);">更可能被利用</span></span></span></section></td></tr><tr><td data-colwidth="143"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 700;letter-spacing: 0.544px;orphans: 2;text-align: center;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="7">公开状态</span></section></td><td data-colwidth="144"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 400;letter-spacing: 0.544px;orphans: 2;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="7"><span textstyle="" style="font-weight: bold;">POC、EXP已公开</span></span></section></td><td data-colwidth="143"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 700;letter-spacing: 0.544px;orphans: 2;text-align: center;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="7">在野利用</span></section></td><td data-colwidth="143"><section style="text-align: center;" data-nest-level="6"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-family: &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 13px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 400;letter-spacing: 0.544px;orphans: 2;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;background-color: rgb(255, 255, 255);text-decoration-thickness: initial;text-decoration-style: initial;text-decoration-color: initial;float: none;display: inline !important;" data-nest-level="7"><span textstyle="" style="color: rgb(0, 0, 0);font-weight: bold;">未发现</span></span></section></td></tr><tr><td colspan="4" data-colwidth="143,144,143,143"><section data-nest-level="6"><span leaf="" data-nest-level="7"><span textstyle="" style="font-size: 13px;font-weight: bold;">危害描述</span></span><span style="letter-spacing: 0.034em;background-color: transparent;"><span leaf="">：</span></span><span style="background-color: transparent;font-size: 13px;font-weight: bold;letter-spacing: 0.034em;"><span leaf=""><span textstyle="" style="font-weight: normal;">攻击者可利用该漏洞在Windows环境下绕过身份验证，通过路径遍历获取Server Action加密密钥，进而伪造请求实现远程代码执行，完全控制受影响服务器。</span></span></span></section></td></tr><tr><td colspan="4" data-colwidth="143,144,143,143"><section><span leaf="" style=""><span textstyle="" style="font-size: 13px;font-weight: bold;">参考链接: </span></span></section><section><span leaf=""><span textstyle="" style="font-size: 13px;font-weight: normal;">https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36</span></span></section><section><span leaf=""><span textstyle="" style="font-size: 13px;font-weight: normal;">https://github.com/rafabd1/CVE-2026-75604-poc</span></span></section></td></tr></tbody></table>  
  
4  
  
  
**漏洞复现**  
  
中成信息安全实验  
室已复现Next.js 远程代码执行漏洞  
，验证如下。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/IOnTlXyEl26XuWPHYBz31Vmzzum77seZGbGuyqcFJgtEgE7znaDPqDHJxFcACNEhZjJXmqUDfnoIqhbNcaj77tYzz5NSNuIy9gcLmIkJuic4/640?wx_fmt=png&from=appmsg "")  
  
  
5  
  
  
**修复建议**  
  
立即升级至最新版本  
- Next.js >= 15.5.24   
  
- Next.js >= 16.3.3  
  
下载地址：https://github.com/vercel/next.js/releases  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/iboUMajImW6SWlEyv47fvIgYlBYvBPY4SUlNQ5ia1qWP6CdmAnkTDWcgGM21xo6kqGqMicl0NPpncTGJZWwzicoO5A/640?wx_fmt=png&from=appmsg "")  
  
  
  
  
  
关于我们  
  
  
漳州中成信息科技有限公司是一家专注于网络安全实战防护的创新型服务提供商。我们深刻理解网络安全的核心在于攻防对抗的持续较量，并以此独特视角为基石，致力于为客户构建动态、主动、智能化的纵深防御体系。区别于传统的被动防御，我们坚信“未知攻，焉知防”。公司汇聚了顶尖的渗透测试专家（红队）、应急处置精英（蓝队）及经验丰富的安全服务工程师，形成了一支具备完整攻防对抗能力的专业团队。我们的渗透测试团队模拟真实攻击者的思维与手段，深入挖掘系统、应用及网络中的深层次漏洞与风险点；应急处置团队则能在安全事件发生时快速响应、精准定位、有效遏制损失并溯源根因；安服工程师团队则致力于将攻防对抗中获得的宝贵经验转化为常态化的安全策略、加固措施与运营流程。  
  
  
  
  
  
  
**点击名片**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/iboUMajImW6SWlEyv47fvIgYlBYvBPY4Siau2HicdH2XxjSEtMnzvqz4cTYibemFyA3TvGH4ZLYABel0MzmHoL8wJQ/640?wx_fmt=png&from=appmsg "")  
  
**关注我们**  
  
  
  
**扫描官网二维码**  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/iboUMajImW6SWlEyv47fvIgYlBYvBPY4Siau2HicdH2XxjSEtMnzvqz4cTYibemFyA3TvGH4ZLYABel0MzmHoL8wJQ/640?wx_fmt=png&from=appmsg "")  
  
**了解更多**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/IOnTlXyEl26GI78T6YncCwKHUKyaGaPfNrv9UJ9HO2UzCY5bafOpicHYkAQ0GM2nN2ib7D75utBpNud4pfcYSb2zojicstr6bVn2jOrIw6ick5s/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/iboUMajImW6SWlEyv47fvIgYlBYvBPY4SXmokj8yGgrQAoBPcFlOgWdWUcj8e5rUKUQVVTQ0ibsppahzAstALX6w/640?wx_fmt=gif&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/iboUMajImW6SWlEyv47fvIgYlBYvBPY4ShmKJlD9Q30YqOaiamGgmfOA3libRTCd5cNA1qM7z8RUsAr56ibrAocibiag/640?wx_fmt=gif&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/iboUMajImW6SWlEyv47fvIgYlBYvBPY4SsibXafic39wibiaEqD6KgYYCSR6Fn5PgAclH1kkky6SglBKoSOTDo4A8wA/640?wx_fmt=gif&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
