---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Chrome曝高危漏洞，攻击者可窃取数据并越权访问   
邑安科技  邑安全   2025-04-16 08:45  
  
更多全球网络安全资讯尽在邑安全  
  
![](https://mmbiz.qpic.cn/mmbiz_png/1N39PtINn8sdyR6ic0M2acDAVJDe45WPqMaicruhiaiaN520bgV5SlvgI5wBP67dPKvkB1UR9G1afZ8UtQMIC0yKEg/640?wx_fmt=png&from=appmsg "")  
  
谷歌在发现两个高危漏洞后，已紧急为其Chrome浏览器推出安全更新。这些漏洞可能允许攻击者窃取敏感数据并越权访问用户系统。  
  
编号为CVE-2025-3619和CVE-2025-3620的漏洞影响以下版本：  
- **Windows/Mac**  
：低于135.0.7049.95/.96  
  
- **Linux**  
：低于135.0.7049.95  
  
更新将在未来数日/周内向全球用户逐步推送。  
  
### 漏洞技术细节  
1. **CVE-2025-3619（堆缓冲区溢出）**  
  
1. **位置**  
：Chrome多媒体编解码器组件  
  
1. **危害**  
：通过构造恶意媒体文件（如视频、音频）触发内存破坏，实现**远程代码执行（RCE）**  
，可导致系统完全控制与数据窃取。  
  
1. **CVE-2025-3620（释放后重用漏洞）**  
  
1. **位置**  
：Chrome USB组件  
  
1. **危害**  
：利用物理USB设备或WebUSB接口漏洞，实现**恶意代码执行**  
或**越权系统访问**  
。  
  
### 攻击风险  
- **远程利用**  
：用户仅需访问恶意网页或交互式内容即可触发漏洞，无需物理接触设备。  
  
- **数据威胁**  
：成功利用后可窃取浏览器存储的密码、金融信息等敏感数据，甚至完全控制受感染设备。  
  
- **影响范围**  
：所有未更新Chrome的桌面用户（个人/企业/政府机构），尤其是依赖Chrome管理敏感信息的组织。  
  
### 修复与行动指南  
  
**立即升级至最新版本：**  
- **Windows/Mac**  
：135.0.7049.95/.96  
  
- **Linux**  
：135.0.7049.95  
  
**手动更新步骤：**  
1. 打开Chrome，点击右上角 **⋮**  
 菜单  
  
1. 选择 **帮助 > 关于Google Chrome**  
  
1. 自动下载更新后，点击 **重新启动**  
  
**企业建议：**  
- 通过组策略（GPO）或Chrome Enterprise强制部署更新  
  
- 临时禁用高风险功能（如WebUSB）直至升级完成  
  
### 补充信息  
- **漏洞报告者**  
：外部安全研究员Elias Hohl与@retsew0x01  
  
- **谷歌防御工具**  
：AddressSanitizer、MemorySanitizer、libFuzzer等工具在漏洞大规模利用前成功拦截威胁  
  
- **技术细节管控**  
：谷歌已暂时限制漏洞详情公开，建议通  
过Chrome漏洞奖励计划获取更新  
  
**安全警示**  
：尽管当前未监测到野外攻击，但未修复系统仍处于高风险状态。建议所有用户立即更新浏览器并启用"增强型安全浏览"功能。  
  
原文来自: cybersecuritynews.com  
  
原文链接:   
https://cybersecuritynews.com/critical-chrome-vulnerability-steal-data/  
  
欢迎收藏并分享朋友圈，让五邑人网络更安全  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1N39PtINn8tD9ic928O6vIrMg4fuib48e1TsRj9K9Cz7RZBD2jjVZcKm1N4QrZ4bwBKZic5crOdItOcdDicPd3yBSg/640?wx_fmt=jpeg "")  
  
欢迎扫描关注我们，及时了解最新安全动态、学习最潮流的安全姿势！  
  
推荐文章  
  
1  
  
[新永恒之蓝？微软SMBv3高危漏洞（CVE-2020-0796）分析复现](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247488913&idx=1&sn=acbf595a4a80dcaba647c7a32fe5e06b&chksm=fa39554bcd4edc5dc90019f33746404ab7593dd9d90109b1076a4a73f2be0cb6fa90e8743b50&scene=21#wechat_redirect)  
  
  
2  
  
[重大漏洞预警：ubuntu最新版本存在本地提权漏洞（已有EXP）　](http://mp.weixin.qq.com/s?__biz=MzUyMzczNzUyNQ==&mid=2247483652&idx=1&sn=b2f2ec90db499e23cfa252e9ee743265&chksm=fa3941decd4ec8c83a268c3480c354a621d515262bcbb5f35e1a2dde8c828bdc7b9011cb5072&scene=21#wechat_redirect)  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
