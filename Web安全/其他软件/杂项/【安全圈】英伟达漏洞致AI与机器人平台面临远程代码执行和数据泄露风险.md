---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】英伟达漏洞致AI与机器人平台面临远程代码执行和数据泄露风险  
 安全圈   2025-07-21 11:01  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
**关键词**  
  
  
  
漏洞  
  
  
英伟达近日为其 AI、机器人与嵌入式边缘计算平台发布安全补丁，重点修复了 **两个高危漏洞**  
（CVE-2025-23270、CVE-2025-23269），影响广泛涉及 Jetson Orin、Xavier 系列及 IGX Orin 设备 📢 。  
  
### 🔎 漏洞详情解析  
###   
#### 🔥 CVE‑2025‑23270 —— 高危 UEFI 管理漏洞（CVSS 7.1）  
- 所在：Jetson Linux 运行环境 UEFI 管理模式。  
  
- 危害：本地低权限攻击者可能通过侧信道漏洞，执行任意代码、篡改数据、拒绝服务甚至造成敏感信息泄露。  
  
- 原因：UEFI 隔离环境对敏感操作处理不当，硬件共享状态泄露权限边界信息。  
  
  
#### 🛡️ CVE‑2025‑23269 —— 内核信息泄露漏洞（CVSS 4.7）  
- 所在：Jetson Linux 内核中的微架构预测器共享机制。  
  
- 危害：本地低权限用户利用瞬态执行漏洞可能读取内存敏感数据，为后续提权或链式攻击奠定基础。  
  
  
### 📦 受影响设备与补丁详情  
###   
<table><thead><tr><th><section style="margin-top: 0px;margin-bottom: 0px;line-height: 1.5em;"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">产品系列</span></span></section></th><th><section style="margin-top: 0px;margin-bottom: 0px;line-height: 1.5em;"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">受影响版本</span></span></section></th><th><section style="margin-top: 0px;margin-bottom: 0px;line-height: 1.5em;"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">修复版本</span></span></section></th></tr></thead><tbody><tr><td><span><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">Jetson Orin JP5.x</span></span></span></td><td><span><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">&lt; 35.6.2</span></span></span></td><td><span><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">35.6.2</span></span></span></td></tr><tr><td><span><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">Jetson Orin JP6.x</span></span></span></td><td><span><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">&lt; 36.4.4</span></span></span></td><td><span><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">36.4.4</span></span></span></td></tr><tr><td><section style="margin-top: 0px;margin-bottom: 0px;line-height: 1.5em;"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">Jetson Xavier</span></span></section></td><td><span><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">JP5.x &lt; 35.6.2</span></span></span></td><td><span><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">35.6.2</span></span></span></td></tr><tr><td><section style="margin-top: 0px;margin-bottom: 0px;line-height: 1.5em;"><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">IGX Orin</span></span></section></td><td><span><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">IGX OS &lt; 1.1.2</span></span></span></td><td><span><span leaf="" style="color: rgba(0, 0, 0, 0.9);font-size: 17px;font-family: mp-quote, &#34;PingFang SC&#34;, system-ui, -apple-system, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;letter-spacing: 0.034em;font-style: normal;font-weight: normal;"><span textstyle="" style="font-size: 17px;">IGX 1.1.2</span></span></span></td></tr></tbody></table>  
  
所有用户应立即通过 Jetson 下载中心获取并部署最新补丁版本。  
  
### 🛠 风险度测评与防御建议  
###   
- **UEFI 漏洞（23270）**属高危，影响系统完整性、可用性和隐私，攻击要求物理或本地访问，但一旦成功后果严重。  
  
- **内核漏洞（23269）**虽风险中等，但可被用于多阶段攻击链。  
  
###   
### 🔧 推荐缓解策略：  
1. **立即升级系统固件**  
，安装 Jetson/Linux 补丁；  
  
1. 对于存在本地访问风 险的环境，建议开启物理保护及访问控制；  
  
1. 在关键路径部署行为监控工具，检测异常 UEFI 操作或内核数据读取；  
  
1. 隔离边缘设备所在网络，实施严格分段管理，防止侧向攻击；  
  
1. 尽可能避免本地使用未经授权账号，启用最小权限原则。  
  
  
  
  
  END    
  
  
阅读推荐  
  
  
[【安全圈】赶快升级！微信Windows端安全漏洞曝光 黑客可执行远程代码](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652070749&idx=1&sn=050b8e30630112c924e35a27ee30ecd3&scene=21#wechat_redirect)  
  
  
  
[【安全圈】黑客正在利用 Wing FTP 服务器的关键 RCE 漏洞](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652070749&idx=2&sn=04105f8ddc32460791073712282f5bbf&scene=21#wechat_redirect)  
  
  
  
[【安全圈】只需500 美元，远程操控美国火车。](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652070749&idx=3&sn=0e63c4702280a1793641fe2bee920786&scene=21#wechat_redirect)  
  
  
  
[【安全圈】吐鲁番首例“特种设备”系统入侵，未检气瓶竟获虚假合格证！](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652070725&idx=1&sn=982b3d7e4a51d4cedb62c1c5ac08a23c&scene=21#wechat_redirect)  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEft6M27yliapIdNjlcdMaZ4UR4XxnQprGlCg8NH2Hz5Oib5aPIOiaqUicDQ/640?wx_fmt=gif "")  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEDQIyPYpjfp0XDaaKjeaU6YdFae1iagIvFmFb4djeiahnUy2jBnxkMbaw/640?wx_fmt=png "")  
  
**安全圈**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEft6M27yliapIdNjlcdMaZ4UR4XxnQprGlCg8NH2Hz5Oib5aPIOiaqUicDQ/640?wx_fmt=gif "")  
  
  
←扫码关注我们  
  
**网罗圈内热点 专注网络安全**  
  
**实时资讯一手掌握！**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCE3vpzhuku5s1qibibQjHnY68iciaIGB4zYw1Zbl05GQ3H4hadeLdBpQ9wEA/640?wx_fmt=gif "")  
  
**好看你就分享 有用就点个赞**  
  
**支持「****安全圈」就点个三连吧！**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCE3vpzhuku5s1qibibQjHnY68iciaIGB4zYw1Zbl05GQ3H4hadeLdBpQ9wEA/640?wx_fmt=gif "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
