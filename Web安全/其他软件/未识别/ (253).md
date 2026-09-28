---
cve: "CVE-2023-3269"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【已复现】Linux Kernel权限提升漏洞(CVE-2023-3269)安全风险通告   
原创 QAX CERT  奇安信 CERT   2023-08-01 16:18  
  
●   
点击↑蓝字关注我们，获取更多安全风险通告  
  
  
<table><tbody><tr><td valign="middle" align="center" rowspan="1" colspan="4" style="background-color: #4676d9;border-color: #4676d9;"><p style="line-height: 1em;"><span style="color: #ffffff;letter-spacing: 0px;"><strong><span style="font-size: 13px;letter-spacing: 0px;">漏洞概述</span></strong><br/></span></p></td></tr><tr><td valign="middle" align="left" style="border-color: #4676d9;" width="135"><p style="line-height: 1em;"><span style="font-size: 13px;letter-spacing: 0px;"><strong><span style="font-size: 13px;letter-spacing: 0px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">漏洞名称</span></strong></span></p></td><td valign="middle" align="left" rowspan="1" colspan="3" style="border-color: #4676d9;"><p style="line-height: 1em;"><span style="color: #000000;font-size: 13px;text-align: -webkit-left;caret-color: #ff0000;text-decoration-thickness: initial;letter-spacing: 0px;display: inline !important;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">Linux Kernel 权限提升漏洞</span></p></td></tr><tr><td valign="middle" align="left" rowspan="1" colspan="1" style="border-color: #4676d9;" width="135"><p style="line-height:1em;"><span style="font-size: 13px;letter-spacing: 0px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;"><strong>漏洞编号</strong></span></p></td><td valign="middle" align="left" rowspan="1" colspan="3" style="border-color: #4676d9;"><p style="line-height:1em;"><span style="color: #000000;font-size: 13px;text-align: -webkit-left;caret-color: #ff0000;text-decoration-thickness: initial;display: inline !important;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">QVD-2023-15242、CVE-2023-3269</span></p></td></tr><tr><td valign="middle" align="left" style="border-color: #4676d9;" width="135"><p style="line-height: 1em;"><span style="font-size: 13px;"><strong><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">公开时间</span></strong></span></p></td><td valign="middle" align="left" style="border-color: #4676d9;" width="151"><p style="line-height: 1em;"><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">2023-07-05</span></p></td><td valign="middle" align="left" style="border-color: #4676d9;" width="177"><p style="line-height: 1em;"><span style="font-size: 13px;"><strong><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">影响对象数量级</span></strong></span></p></td><td valign="middle" align="left" style="border-color: #4676d9;" width="94"><p style="line-height: 1em;"><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">万级</span></p></td></tr><tr><td valign="middle" align="left" style="border-color: #4676d9;" width="135"><p style="line-height: 1em;"><span style="font-size: 13px;"><strong><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">奇安信评级</span></strong></span></p></td><td valign="middle" align="left" style="border-color: #4676d9;" width="151"><p style="line-height: 1em;"><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;"><strong style="max-inline-size: 100%;margin: 0px;padding: 0px;box-sizing: border-box !important;overflow-wrap: break-word !important;outline: none 0px !important;cursor: text;color: #000000;font-size: 13px;text-align: -webkit-left;caret-color: #ff0000;text-decoration-thickness: initial;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, sans-serif;"><span style="max-inline-size: 100%;margin: 0px;padding: 0px;box-sizing: border-box !important;overflow-wrap: break-word !important;outline: none 0px !important;cursor: text;color: #ff0000;font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">高危</span></strong></span></p></td><td valign="middle" align="left" style="border-color: #4676d9;" width="177"><p style="line-height: 1em;"><span style="font-size: 13px;"><strong><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;"><strong style="max-inline-size: 100%;margin: 0px;padding: 0px;box-sizing: border-box !important;overflow-wrap: break-word !important;outline: none 0px !important;cursor: text;color: #000000;font-size: 13px;text-align: -webkit-left;caret-color: #ff0000;text-decoration-thickness: initial;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;, sans-serif;">CVSS 3.1分数</strong></span></strong></span></p></td><td valign="middle" align="left" style="border-color: #4676d9;" width="94"><p style="line-height: 1em;"><span style="text-align: -webkit-left;caret-color: #ff0000;text-decoration-thickness: initial;font-size: 13px;display: inline !important;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">7.8</span></p></td></tr><tr><td valign="middle" align="left" style="border-color: #4676d9;" width="135"><p style="line-height: 1em;"><span style="font-size:13px;"><strong><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">威胁类型</span></strong><strong><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;"></span></strong></span></p></td><td valign="middle" align="left" style="border-color: #4676d9;" width="151"><p style="line-height: 1em;"><span style="font-size: 13px;">权限提升</span></p></td><td valign="middle" align="left" style="border-color: #4676d9;" width="177"><p style="line-height:1em;"><strong><span style="font-size:13px;">利用可能性</span></strong></p></td><td valign="middle" align="left" style="border-color: #4676d9;" width="94"><p style="line-height: 1em;"><span style="color: #ffc000;"><strong><span style="font-size: 13px;">中</span></strong></span></p></td></tr><tr><td valign="middle" colspan="1" rowspan="1" align="left" style="border-color: #4676d9;" width="135"><p style="line-height: 1em;"><span style="font-size: 13px;"><strong><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">POC状态</span></strong></span></p></td><td valign="middle" colspan="1" rowspan="1" align="left" style="border-color: #4676d9;" width="151"><p style="line-height: 1em;"><span style="color: #ff0000;font-size: 13px;"><strong><span style="color: #ff0000;font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">已公开</span></strong></span></p></td><td valign="middle" colspan="1" rowspan="1" align="left" style="border-color: #4676d9;" width="177"><p style="line-height: 1em;"><span style="font-size: 13px;"><strong><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">在野利用状态</span></strong></span></p></td><td valign="middle" colspan="1" rowspan="1" align="left" style="border-color: #4676d9;" width="94"><p style="line-height: 1em;"><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">未发现</span></p></td></tr><tr><td valign="middle" colspan="1" rowspan="1" align="left" style="border-color: #4676d9;" width="135"><p style="line-height: 1em;"><span style="font-size: 13px;"><strong><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">EXP状态</span></strong></span></p></td><td valign="middle" colspan="1" rowspan="1" align="left" style="border-color: #4676d9;" width="151"><p style="line-height: 1em;"><span style="color:#ff0000;"><strong><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">已公开</span></strong></span></p></td><td valign="middle" colspan="1" rowspan="1" align="left" style="border-color: #4676d9;" width="177"><p style="line-height: 1em;"><span style="font-size: 13px;"><strong><span style="font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">技术细节状态</span></strong></span></p></td><td valign="middle" colspan="1" rowspan="1" align="left" style="border-color: #4676d9;" width="94"><p style="line-height: 1em;"><span style="font-size: 13px;"><strong><span style="color: #ff0000;font-size: 13px;font-family: 微软雅黑, &#34;Microsoft YaHei&#34;;">已公开</span></strong></span></p></td></tr><tr><td valign="middle" colspan="4" rowspan="1" align="left" style="border-color: #4676d9;"><p style="line-height:1em;"><strong><span style="font-size:13px;">利用条件：</span></strong><span style="color: rgba(0, 0, 0, 0.9);font-size: 13px;letter-spacing: 0.544px;text-align: -webkit-left;text-decoration-thickness: initial;display: inline !important;font-family: system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;">需要本地低权限触发。</span></p></td></tr></tbody></table>  
  
  
**（注：奇安信CERT的漏洞深度分析报告包含此漏洞的POC及技术细节，订阅方式见文末。）**  
  
  
**0****1**  
  
**漏洞详情**  
  
**>**  
**>**  
**>**  
**>**  
  
**影响组件**  
  
Linux内核是 Linux 操作系统（OS）的主要组件，也是计算机硬件与其进程之间的核心接口。它负责两者之间的通信，还要尽可能高效地管理资源。  
  
  
**>**  
**>**  
**>**  
**>**  
  
**漏洞描述**  
  
近日，奇安信CERT监测到**Linux Kernel 权限提升漏洞(CVE-2023-3269)**  
，又名**“Stack Rot”**  
。在Linux内核的内存管理子系统存在释放后重用漏洞，本地低权限用户可以利用此漏洞提升至ROOT权限。  
**目前，此漏洞技术细节、POC及EXP已在互联网上公开，奇安信CERT成功复现此漏洞，鉴于此漏洞现实威胁上升，建议客户尽快做好自查及防护。**  
  
  
  
**02**  
  
**影响范围**  
  
**>**  
**>**  
**>**  
**>**  
  
**影响版本**  
  
v6.1-rc1 <= Linux Kernel <= v6.5-rc1  
  
  
**>**  
**>**  
**>**  
**>**  
  
**不受影响版本**  
  
RedHat Linux Kernel  
  
  
**>**  
**>**  
**>**  
**>**  
  
**其他受影响组件**  
  
无  
  
  
  
**03**  
  
**复现情况**  
  
目前，奇安信CERT已成功复现**Linux Kernel 权限提升漏洞(CVE-2023-3269)**  
，截图如下：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EkibxOB3fs4ibWMDeK1cnXsnA3KjGYkziav2RSXwNvUXnr3quqWuagTfnnbDufmNSOCwmZibqQEF6sxhIia9fHric85w/640 "")  
  
  
  
  
**04**  
  
**处置建议**  
  
**>**  
**>**  
**>**  
**>**  
  
**安全更新**  
  
目前官方已发布修复版本，受影响用户可以更新内核至安全版本：   
  
Linux Kernel >= 6.1.37   
  
Linux Kernel >= 6.3.11   
  
Linux Kernel >= 6.4.1  
  
  
**05**  
  
**参考资料**  
  
[1]https://www.openwall.com/lists/oss-security/2023/07/05/1  
  
[2]https://security-tracker.debian.org/tracker/CVE-2023-3269  
  
[3]https://ubuntu.com/security/CVE-2023-3269  
  
[4]https://access.redhat.com/security/cve/cve-2023-3269  
  
  
  
**06**  
  
**时间线**  
  
2023年8月1日，奇安信 CERT发布安全风险通告。  
  
  
  
**07**  
  
**深度分析报告**  
  
深度分析报告（含PoC和技术细节）已开通订阅，扫描图片  
下方二维码申请：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EkibxOB3fs4ibWMDeK1cnXsnA3KjGYkziavlJS2ZcfibzR13SGmYGXZx1oWGTdNEtlovGZ9Gxjsas8rVFIGesc9Oyw/640?wx_fmt=png "漏洞深度分析报告介绍（7.24）.png")  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/3tG2LbK7WG3tezJEzJsicLSWCGsIggLbcfk4LB5WK7pdSwMksxPOAoHuibjQpBlEId4nyIIw52n2J8N8MowYZcjA/640 "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EkibxOB3fs4ibWMDeK1cnXsnA3KjGYkziav3WGdrlCK3wjmUgicd17L3V2YQ5Y4598NYf76U6E15mIPiaGMULodRrMw/640 "CERT LOGO.png")  
  
**奇安信 CERT**  
  
**致力于**  
第一时间为企业级用户提供**权威**漏洞情报和**有效**  
解决方案。  
  
  
点击↓**阅读原文**，到**NOX安全监测平台**  
查看更多漏洞信息。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
