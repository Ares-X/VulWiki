---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】Zyxel与Veeam高危漏洞遭野外在途利用：防火墙注入与备份控制权沦陷  
 安全圈   2026-09-22 11:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
**关键词**  
  
  
  
漏洞  
  
  
**核心导读：**  
近日，美国网络安全和基础设施安全局（CISA）正式将 **Zyxel GS1900 系列网络交换机栈缓冲区溢出漏洞（CVE-2026-7273）**  
 列入已知被利用漏洞目录（KEV），确认其正遭到在途黑客利用；与此同时，网络安全机构 Arctic Wolf 发布紧急警报，企业级备份基础设施 **Veeam Agent for Windows 本地提权漏洞（CVE-2026-32996）**  
 亦被黑客团伙结合野外武器化 PoC 滥用，从普通日志泄露直通 SYSTEM 最高权限。网络硬件与核心备份的双重沦陷，使得勒索软件具备了极具破坏性的打击支点。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/sbq02iadgfyEXCUNoBNZY65PdP1mdzXE7yEc3wfDcUQ8NOLv61g3mRSRvsYtyOy0ItndYtTCpGJS2yWzvpLUF2cFkiaIlfE4XQt0icFiaoEwONw/640?wx_fmt=other&from=appmsg "")  
## 01 / Zyxel 交换机栈溢出（CVE-2026-7273）：CGI 边界被破  
  
Zyxel（合勤科技）GS1900 系列智能网管交换机广泛部署于中小型企业和分支机构的核心接入层。中国科学院软件研究所（ISCAS）安全研究团队披露，该系列交换机固件内置的 Web CGI 接口程序存在**栈缓冲区溢出缺陷**  
。  
  
📋   
Zyxel 核心漏洞情报档案  
  
漏洞编号  
CVE-2026-7273  
  
严重程度  
CVSS 8.8 HIGH  
  
漏洞类型  
栈缓冲区溢出致操作系统任意命令执行 (Buffer Overflow to RCE)  
  
攻击向量  
无需认证，直接向管理 Web 接口发送恶意构造的 HTTP 请求  
  
合规督办  
CISA 要求美国联邦机构（FCEB）于 2026年9月24日前强制修补  
  
受影响的设备型号包含 GS1900-8、8HP、10HP、16、24、24E、24EP、24HPv2、48 及 48HPv2 的 2.90(AAxx.1)C0  
 及更早版本。攻击者只要处在可触达交换机 Web 管理端口的网络拓扑中，便可远程接管硬件底层 Linux 操作系统，将交换机转化为内网监听与流量劫持的持久化据点。  
## 02 / Veeam 备份提权（CVE-2026-32996）：从命名管道直通 SYSTEM  
  
如果说交换机失陷打破了网络隔离，那么备份系统的失陷则是勒索团伙彻底击溃企业容灾防线的杀手锏。Arctic Wolf 监控显示，针对 Veeam Agent for Microsoft Windows 的 **CVE-2026-32996（CVSS 7.3）**  
 提权利用已广泛扩散。  
  
该漏洞源于 Veeam 端点备份服务（Veeam Endpoint Backup service  
）在处理本地 gRPC 命名管道通信时的安全盲区：  
  
# 提权漏洞链路：弱权限日志与未绑定的会话缓存  
  
// 1. 命名管道路径  
  
\\.\pipe\Veeam\VAW\ServiceConnectionPipe  
  
// 2. 敏感信息明文泄露：普通低权限用户均可读取的日志文件  
  
C:\ProgramData\Veeam\Endpoint\Svc.VeeamEndpointBackup.log  
  
// 3. 武器化效果  
  
读取日志提取 UID，向命名管道重放请求，以 SYSTEM 运行任意命令  
  
由于 GitHub 上已有成熟的公开 PoC（可通过提取日志 UID 运行 whoami  
 并写入任意文件），黑客团伙在获取低权限终端（如钓鱼木马落盘）后，可数秒内无感提升至 Windows 最顶层的 NT AUTHORITY\SYSTEM  
 权限，随后停止或篡改备份任务，加密原始数据库。  
## 03 / 威胁图景：网络通道失守与勒索定点清除  
  
将这两起在途漏洞置于真实的攻防对抗场景中，勒索攻击组织（如 Akira、LockBit 衍生团伙）典型的入侵链路已被极大缩短：  
  
**1. 边界突破与横向穿透：**  
利用 Zyxel 交换机 RCE 漏洞突破边界，进入内部网段并建立静默代理，绕过基于 IP 的常规访问控制。  
  
**2. 核心端点权限爆发：**  
在内网 Windows 服务器中执行 Veeam 提权脚本，瞬间拿下集中备份机与存储控制节点。  
  
**3. 勒索致命一击：**  
先通过 SYSTEM 特权彻底销毁 Volume Shadow Copy（VSS 卷影副本）和历史增量备份，再下发文件加密，剥夺企业任何免费恢复数据的可能。  
## 04 / 应急排查与处置修复矩阵  
  
各机构基础设施管理员请依照以下清单即刻执行升级与安全收口：  
  
🛡️ 1. Zyxel GS1900 系列固件升级  
  
全面下载并刷写 2.90(AAxx.2)C0  
 补丁版本（例如 GS1900-8 升级至 2.90(AAHH.2)C0  
，GS1900-24 升级至 2.90(AAHL.2)C0  
 等）。严格限制交换机 Web 管理后台只能通过独立的带外管理网络（OOBM）或隔离 VLAN 访问，切勿将 HTTP/HTTPS 端口暴露于办公 LAN 或公网。  
  
🔒 2. Veeam Agent for Windows 紧急更新与权限收缩  
  
更新 Veeam 客户端至官方已修复的最新热补丁版本。在未能立刻更新的主机上，手动检查 C:\ProgramData\Veeam\Endpoint\  
 目录的 NTFS 访问控制列表（ACL），移除 Users  
 组的“读取”权限，仅保留 SYSTEM  
 和 Administrators  
 组访问权限，直接斩断 PoC 凭据提取路径。  
  
🔍 3. 关键日志回溯与告警部署  
  
核查网络设备近期是否有异常 HTTP POST 崩溃记录与重启日志；在 Windows 端监控非备份服务进程对 ServiceConnectionPipe  
 命名管道的句柄申请行为，防范内网潜伏横向。  
  
****  
  
  
   END    
  
  
阅读推荐  
  
  
  
  
[【安全圈】朝鲜黑客渗透IT服务商：伪造Terraform锁文件结合Cursor打入macOS](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652079060&idx=1&sn=122bff70309a2d2affd517bb5faefed5&scene=21#wechat_redirect)  
  
  
  
[【安全圈】无弹窗静默RCE！OpenAI Codex 沙箱双重逃逸曝光：借助 V8 堆内存泄露与补丁越权突破宿主](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652079060&idx=2&sn=43e13a80be1d5fb3b64f67cdf03173b0&scene=21#wechat_redirect)  
  
  
  
[【安全圈】C2写进智能合约！ChainScript木马借Polygon公链不死轮换](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652079060&idx=3&sn=71d10acf189d83267151c8ccc3b8990a&scene=21#wechat_redirect)  
  
  
  
[【安全圈】用 Claude 偷家 OpenAI？白帽两跳击穿员工账号，直通私有代码库](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652079049&idx=1&sn=119b382657f5e42c4af32474b635c6f1&scene=21#wechat_redirect)  
  
  
  
  
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
