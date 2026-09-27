---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  “伏特台风”黑客利用Versa零日漏洞攻击美国服务商   
 关键基础设施安全应急响应中心   2024-08-29 15:27  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/iaz5iaQYxGogs6TibDytX0iaBjw9aSGGiaPiasKSibvgPpn8dMjqnOQNOZR47yALCsnkO58HWYlsmPDsCPQAa8DlwQLEQ/640?wx_fmt=png&from=appmsg "")  
  
8月27日，外媒BleepingComputer报道，黑客组织Volt Typhoon（伏特台风）利用Versa Director零日漏洞上传自定义Webshell，窃取凭据并破坏美国公司网络。  
  
本周周一8月26日，Versa公司宣布他们修复了一个被追踪为CVE-2024-39717的高风险漏洞。这个漏洞被未具名的民族国家黑客组织至少利用过一次。  
  
该漏洞存在于上传自定义图标Versa Director GUI的功能中。漏洞允许具有管理员权限的威胁行为者上传伪装成PNG图像的恶意Java文件，然后远程执行这些文件。  
  
Versa表示Director版本21.2.3、22.1.2和22.1.3受到该漏洞的影响。升级到最新版本22.1.4将修复漏洞，管理员应查看供应商的系统强化要求和防火墙指南。  
  
在最近的事件中，Volt Typhoon利用Versa Director中的漏洞上传了一个名为 VersaMem的复杂、定制的Webshell。  
  
此WebShell用于拦截和收集凭据，以及在受感染的服务器上执行任意恶意代码，同时避免被发现。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/QmbJGbR2j6zggdhuQFn2ibDcvfdhOPR3UOJxuaTsrclF7St4Q2FZiaB4JicbBdCwZVgoc69MlLHHDpxFpOBydahYg/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
Versa Directo上的Volt Typhoon攻击流程  
  
来源：Lumen的Black Lotus Labs  
  
据报道，Volt Typhoon最新活动目标包括4家美国公司和1家非美国公司，他们属于互联网服务提供商、托管服务提供商和信息技术领域企业。  
  
Lumen的Black Lotus Labs研究人员在6月初发现了Versa零日漏洞。  
最初版本是从新加坡上传到  
VirusTotal  
病毒库的。  
这个上传时间大约比在美国最早发现Versa Director服务器漏洞事件早了五天。  
  
“我们怀疑威胁行为者可能在对美国目标发起攻击之前，先在其他地区测试了他们的攻击手段。  
“该公司补充道。  
当前恶意软件版本在VirusTotal上没有被检测出来。  
  
关于伏特台风，百度百科内容：  
“伏特台风”（Volt Typhoon），由微软公司根据其黑客组织命名规则命名而来，真实面目是国际勒索软件组织，来自“伏特台风”的恶意程序样本并未表现出明确的国家背景黑客组织行为特征，而是与“暗黑力量”勒索病毒等网络犯罪团伙的关联程度明显。  
  
  
  
  
原文来源：E安全  
  
“投稿联系方式：sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/iaz5iaQYxGogvC8qicuLNlkT5ibJnwu1leQiabRVqFk4Sb3q1fqrDhicLBNAqVY4REuTetY1zBYuUdic0nVhZR4FHpAfg/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
