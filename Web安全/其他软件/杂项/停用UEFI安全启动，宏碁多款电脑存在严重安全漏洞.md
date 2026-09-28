---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  停用UEFI安全启动，宏碁多款电脑存在严重安全漏洞   
 网络安全应急技术国家工程中心   2022-12-01 16:00  
  
11月29日消息，ESET恶意软件研究员Martin Smolar报告，宏碁某些笔记本电脑设备的驱动程序存在高危漏洞，可停用UEFI安全启动功能，导致攻击者在启动过程中部署恶意软件。  
  
受影响的宏碁笔记本电脑型号共计有五款，包括宏碁Aspire A315-22、A115-21、A315-22G、Extensa EX215-21和EX215-21G。  
  
Martin指出，宏碁笔记本设备上的HQSwSmiDxe DXE驱动程序中发现了安全漏洞（CVE-2022-4020）。攻击者不需要用户交互即可更改 UEFI 安全启动设置，方法是修改 BootOrderSecureBootDisable NVRAM变量以禁用安全启动。  
  
UEFI是统一可扩展固件接口（Unified Extensible Firmware Interface）的缩写，用于在加载操作系统之前启动计算机硬件。UEFI安全启动功能确保在设备启动过程中不加载恶意代码。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ibDWW3m4U1QgEBD9B9OvbvCEVeSCiaq52aISibcB8xnvZNfTL2ELIb1C51frMvSg22ibytTT9Lw1neYg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
宏碁回应称，该漏洞确实存在，目前已修复该漏洞，并提醒用户及时更新固件。用户可在官网下载BIOS更新，并在系统中手动部署。  
  
联想笔记本电脑早些时候也出现过类似问题，研究人员发现，ThinkBook、IdeaPad和Yoga多款笔记本电脑型号中存在类似错误，可能导致停用UEFI Secure Boot。  
  
今年早些时候，ESET还发现超过70款联想笔记本设备安装了易受攻击的UEFI固件。UEFI固件中的缓冲区溢出漏洞允许攻击者进行任意代码执行（ACE）攻击，并禁用基本的安全功能。  
  
**参考链接：**  
  
https://cybernews.com/news/acer-flaw-malware-boot-process/  
  
  
  
原文来  
源：FreeBuf  
  
“投稿联系方式：孙中豪 010-82992251   sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/GoUrACT176njVOPvfib4X3jQ6GIHLtX8SSDvbpmcpr4uu3X7ELG7PDjdaLVeq4Er02ZoicTPvxrC6KCVH3bssUVw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
