---
cnvd: "CNVD-2022-33422"
source: "MrWQ/vulnerability-paper"
id: "vw-810ce5bc8619d09da0ecf56d"
entity_id: "ve-810ce5bc8619d09da0ecf56d"
schema_version: "1"
title: "新华三magicR100存在未授权RCE攻击"
product: "H3C Magic R100"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CNVD-2022-33422; CNVD-2022-33848"
referenced_identifiers: ""
prerequisites: "V100R005/V200R00；admin与Wi-Fi密码相同才能复用，之后开Telnet"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/H3C/%E6%96%B0%E5%8D%8E%E4%B8%89magicR100%E5%AD%98%E5%9C%A8%E6%9C%AA%E6%8E%88%E6%9D%83RCE%E6%94%BB%E5%87%BB.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://mp.weixin.qq.com/s/PdUzTE0s8v_alex4k5f09Q"
source_status: "recorded"
---

# 新华三magicR100存在未授权RCE攻击

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：H3C Magic R100
- 本文讨论：CNVD-2022-33422；CNVD-2022-33848
- 版本、权限与配置前提：V100R005/V200R00；admin与Wi-Fi密码相同才能复用，之后开Telnet
- 资料类型：固件分析/受限披露链；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 实际信息泄露→凭据复用→管理功能，标题未授权RCE掩盖重要前提
- 多个image-...仅裸文本无链接；关键ajaxmsg故意隐去，不能完整复现
- 固件命令R100V100R100与实际V100R005混写；Magci拼写；Content-Length空或78430错误
- 与145大量相同研究，新增管理密码/WiFi与Telnet链应保留

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 两CNVD对应子漏洞、实际参数与默认密码关系待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/PdUzTE0s8v_alex4k5f09Q)

  

### 漏洞描述

存在/AJAX/ajaxget接口可以非授权访问，通过ajaxmsg搭配上功能函数可以调用读取一些敏感信息，通过对信息泄露进行深入检查，发现可以泄露管理数据登入后台，可以实现RCE

#### （存在前提条件==需要管理员账号密码和wifi密码一致，该情况为默认情况）

版本：

<=MagicR100V100R005 

<=MagciR100V200R00

### 漏洞分析与复现

### 一、固件获取和解包

虽然我有物理机，但是我还是从官网下的更新固件包，https://download.h3c.com.cn/download.do?id=3342938

通过binwalk R100V100R100进行解包,发现可以直接查看到内容，

```
ZHEFOX@ZHEFOX-MacOS:~/Desktop$ binwalk R100V100R005.bin   
  
DECIMAL       HEXADECIMAL     DESCRIPTION  
--------------------------------------------------------------------------------  
33280         0x8200          LZMA compressed data, properties: 0x5D, dictionary size: 8388608 bytes, uncompressed size: 4145728 bytes  
1245184       0x130000        Squashfs filesystem, little endian, version 4.0, compression:lzma, size: 2269691 bytes, 534 inodes, blocksize: 131072 bytes, created: 2018-01-17 03:54:08  

```

使用binwalk -eM R100V100R100进行提取

```
ZHEFOX@ZHEFOX-MacOS:~/Desktop$ binwalk -eM R100V100R005.bin   
  
Scan Time:     2022-03-31 19:12:49  
Target File:   /home/ZHEFOX/Desktop/R100V100R005.bin  
MD5 Checksum:  42ec9ec3de32216ae2d93ad1ff3a208b  
Signatures:    411  
  
DECIMAL       HEXADECIMAL     DESCRIPTION  
--------------------------------------------------------------------------------  
33280         0x8200          LZMA compressed data, properties: 0x5D, dictionary size: 8388608 bytes, uncompressed size: 4145728 bytes  
  
WARNING: Symlink points outside of the extraction directory: /home/ZHEFOX/Desktop/_R100V100R005.bin.extracted/squashfs-root/web -> /var/web; changing link target to /dev/null for security purposes.  
  
WARNING: Symlink points outside of the extraction directory: /home/ZHEFOX/Desktop/_R100V100R005.bin.extracted/squashfs-root/dev/log -> /var/tmp/log; changing link target to /dev/null for security purposes.  
1245184       0x130000        Squashfs filesystem, little endian, version 4.0, compression:lzma, size: 2269691 bytes, 534 inodes, blocksize: 131072 bytes, created: 2018-01-17 03:54:08  
  
  
Scan Time:     2022-03-31 19:12:51  
Target File:   /home/ZHEFOX/Desktop/_R100V100R005.bin.extracted/8200  
MD5 Checksum:  4b2d56fb09ee2c3feafac6513c01f7c6  
Signatures:    411  
  
DECIMAL       HEXADECIMAL     DESCRIPTION  
--------------------------------------------------------------------------------  
0             0x0             uImage header, header size: 64 bytes, header CRC: 0xFB26C18E, created: 2018-01-17 03:51:29, image size: 4145664 bytes, Data Address: 0x80001000, Entry Point: 0x800044B0, data CRC: 0x9E4BD9D4, OS: Linux, CPU: MIPS, image type: OS Kernel Image, compression type: none, image name: "Linux Kernel Image"  
3194976       0x30C060        Linux kernel version 2.6.30  
3260544       0x31C080        CRC32 polynomial table, little endian  
3274176       0x31F5C0        SHA256 hash constants, big endian  
3281920       0x321400        CRC32 polynomial table, big endian  
3475335       0x350787        Neighborly text, "neighbor %.2x%.2x.%.2x:%.2x:%.2x:%.2x:%.2x:%.2x lost on port %d(%s)(%s)"  
3477803       0x35112B        HTML document header  
3477966       0x3511CE        HTML document footer  
3666048       0x37F080        AES S-Box  
3974025       0x3CA389        Microsoft executable, MS-DOS  
4145216       0x3F4040        ASCII cpio archive (SVR4 with no CRC), file name: "/dev", file name length: "0x00000005", file size: "0x00000000"  
4145332       0x3F40B4        ASCII cpio archive (SVR4 with no CRC), file name: "/dev/console", file name length: "0x0000000D", file size: "0x00000000"  
4145456       0x3F4130        ASCII cpio archive (SVR4 with no CRC), file name: "/root", file name length: "0x00000006", file size: "0x00000000"  
4145572       0x3F41A4        ASCII cpio archive (SVR4 with no CRC), file name: "TRAILER!!!", file name length: "0x0000000B", file size: "0x00000000"  

```

成功提取后，进入发现是squashfs架构，在squashfs-root发现了www目录，跟进发现是一个asp网站

### 二、漏洞实现和分析

曾经在攻击该接口时，因为无法改参数无法实现RCE，但是我还在思考到会不会这个接口可以有别利用前途呢，我将服务器的http的binary丢入IDA进行分析查阅。

```
 366: function AjaxGetWan1State()  
  367  {  
  368      XMLHttpReqtmp = createXMLHttpRequest();  
  369      if (XMLHttpReqtmp)  
  370      {  
  371:         var url = "AJAX/ajaxget";  
  372          var msg="ajaxmsg=aspGetGroup(Wan1BasicState)";  
  373          XMLHttpReqtmp.open("POST", url, true);  
  ...  
  385      	 { // ÐÅÏ¢ÒÑ¾­³É¹¦·µ»Ø£¬¿ªÊ¼´¦ÀíÐÅÏ¢  
  386          	XMLHttpReq=null;  
  387:         	setTimeout("AjaxGetWan1State();",2000);  
  388           }  
  389           else   
  ...  
  399      if (XMLHttpReq)  
  400      {  
  401:         var url = "AJAX/ajaxget";  
  402          var msg="ajaxmsg=aspGetGroup(Wan1Ping)";  
  403          XMLHttpReq.open("POST", url+"?IsVersionCheck=1", true);
```

通过已知的可利用接口在IDA直接搜索字符串，并追踪。



image-20220407224018217

交叉引用继续跟进，



image-20220407224141313



image-20220407224205576

发现存在很多的接口，这些都是可以调用的函数方法，可以通过此处打印出一些信息，初步尝试打印出了系统的日志文件。

### 在观察和不断读取泄露信息时，通过字符串去寻找可能存在的可泄露的账号密码数据

通过对ssid admin 等关键词 进行查找，发现了一个位置泄露了主人和访客路由器的密码



image-20220525160754296



image-20220525160631766



image-20220525160927150

在下面的位置我们可以看到管理员和访客路由器的账号密码，连接设备等信息，再访问下图接口，可以查看网站管理密码是否和wifi密码一致，如果和wifi密码一样就是1



image-20220525161407212

### POC：

```
—————————————————————————————————   获取管理员账号密码   ———————————————————————————————————  
POST /AJAX/ajaxget HTTP/1.1  
Host: 192.168.124.1  
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.55  
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8  
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2  
Accept-Encoding: gzip, deflate  
Content-Type: application/x-www-form-urlencoded  
Content-Length: 78430  
Origin: http://192.168.124.1  
Connection: close  
Referer: http://192.168.124.1/AJAX/ajaxget  
Upgrade-Insecure-Requests: 1  
Pragma: no-cache  
Cache-Control: no-cache  
  
ajaxmsg=#####此处因为涉及真机，暂时不公开exp######  
  
  

```

拿到了密码，我们就可以去访问系统的管理界面，



image-20220407232408912

先把讨厌的防御关了，发现该机器存在telnet，



image-20220407232435290

同时发现存在http://192.168.124.1/debug.asp 这个调试网页



image-20220407232523606

补充说明：
=====

通过之前提交的两个CNVD-2022-33422和CNVD-2022-33848，我们知道存在一处非授权访问接口，同时该路由器支持，通过访问 http://192.168.124.1/debug.asp 和H3C Magic R100 系统管理http://192.168.124.1/home.asp的远程管理，可以开启telnet，通过非授权访问接口获取的管理员密码就可以进行telnet访问进行RCE。

```
—————————————————————————————————   获取管理员账号密码   ———————————————————————————————————  
POST /AJAX/ajaxget HTTP/1.1  
Host: 192.168.124.1  
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.55  
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8  
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2  
Accept-Encoding: gzip, deflate  
Content-Type: application/x-www-form-urlencoded  
Content-Length:   
Origin: http://192.168.124.1  
Connection: close  
Referer: http://192.168.124.1/AJAX/ajaxget  
Upgrade-Insecure-Requests: 1  
Pragma: no-cache  
Cache-Control: no-cache  
  
ajaxmsg=#####此处因为涉及真机，暂时不公开exp######  

```

image-20220525161131199

可以通过

```
—————————————————————————————————   获取管理员账号密码   ———————————————————————————————————  
POST /AJAX/ajaxget HTTP/1.1  
Host: 192.168.124.1  
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.55  
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8  
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2  
Accept-Encoding: gzip, deflate  
Content-Type: application/x-www-form-urlencoded  
Content-Length:   
Origin: http://192.168.124.1  
Connection: close  
Referer: http://192.168.124.1/AJAX/ajaxget  
Upgrade-Insecure-Requests: 1  
Pragma: no-cache  
Cache-Control: no-cache  
  
ajaxmsg=#####此处因为涉及真机，暂时不公开exp######  

```

  

image-20220525161154007

如果返回值为1，则管理员账号和wifi密码一致，所以该方法有个限制前提，需要管理密码要和wifi密码相同(默认是adminwifi的密码)

下图是telnet连接成功的截图，



image-20220420165412238

end

  

招新小广告

ChaMd5 Venom 招收大佬入圈

新成立组IOT+工控+样本分析 长期招新  

欢迎联系admin@chamd5.org

  
  



---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
