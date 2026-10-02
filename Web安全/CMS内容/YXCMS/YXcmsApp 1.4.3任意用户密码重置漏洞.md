---
source: "hatch 补库批 20260928"
product: "YXcmsApp1.4.3"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "YXcmsApp 1.4.3任意用户密码重置漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：selfregistration/relogin;sharedENCODE_KEYcookieandreset;nickname<=30; latestattackerIDemailcontrollable;maildelivery"
side_effects: "未执行；本文需注意的操作影响：分析保留注册时不可用而重登录还原单引号的重要二阶条件，不能略成随意code伪造"
source_status: "unknown"
id: "vw-e6e24b0f9a0482cb0c9e6bb9"
entity_id: "ve-e6e24b0f9a0482cb0c9e6bb9"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：selfregistration/relogin;sharedENCODE_KEYcookieandreset;nickname&lt;=30; latestattackerIDemailcontrollable;maildelivery

- **适用与权限边界（1）**：分析保留注册时不可用而重登录还原单引号的重要二阶条件，不能略成随意code伪造。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：关键getpassword/SQL截图和实际codeURL丢失，大量如下后空白，完整链不可核。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（3）**：6位密钥不可现实伪造是未经熵/算法分析断言；昵称长度限制不等于完全不能报错注入。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（4）**：全员密码更新并发新密邮件影响严重，需要完整SELECT/UPDATE确认排序/同newpass语义。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（5）**：+/%252B编码层数依cookie原编码应说明；无原始来源/修复。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# YXcms 1.4.3 任意用户密码重置漏洞

一、漏洞简介
------------

二、漏洞影响
------------

2017-03-26 YXcmsApp 1.4.3

三、复现过程
------------

### 漏洞原理

从框架上（基于CanPHP的二次开发）看不出来什么缺陷，那就来看看代码逻辑上有什么披露。来到protected/apps/member/controller/indexController.php中是一些关于会员账号的逻辑，其中的getpassword函数是找回密码的功能，其中分为两步：第一步根据用户名或者邮箱向注册的邮件发送重置密码链接；第二步根据重置密码的链接重置用户密码，然后再将新密码发送到对应邮箱。第二步代码如下：这里的ENCODE\_KEY是在安装时生成的6位密钥，想通过构造\$\_GET\[\'code\'\]来重置其他用户的密码初步是不现实的。

但之后又看到在regist功能中，第176行调用了自定义的set\_cookie函数，如下：跟进set\_cookie函数，是在protected/include/lib/common.function.php中607行定义，如下：这里是用ENCODE\_KEY对原值进行加密再设置cookie。所以萌生了一个想法，将注册后对应设置的auth
cookie作为getpassword的code，就可以正确地进行解密，解密后的内容即为regist函数中第175行拼接的字符串：

    $cookie_auth = $id.'\t'.$data['groupid'].'\t'.$data['account'].'\t'.$data['nickname'].'\t'.$data['lastip'];

其中会对account的格式进行校验，ip也是正则匹配的结果无法伪造，那么可控的就只有nickname了，我们可以跟踪一下nickname的过滤过程，首先是进入common.function.php的in函数：接着就直接连接成字符串，虽然htmlspecialchars函数默认不会对单引号编码，但是addslashes函数会对单引号转义，这里的nickname就无法利用了。

可是再往上看login逻辑时，发现在登陆成功后就会从数据库中取出账号信息，拼接成字符串设置为对应的auth
cookie，如下：我们可以考虑考虑二次注入的可能性，但还是需要跟踪一下在regist时insert数据是如何过滤的，最后可以跟到在protected/include/core/db/cpMysql.class.php中escape函数对数据进行了过滤：因为在登陆成功后是直接拼接字符串就加密，所以单引号还是能够还原出来的，单引号的整个输入输出过程如下：所以我们可以注册个带单引号nickname的账号，注册成功后退出重新登陆，使用auth
cookie来作为重置密码的code，就会产生报错，如下（因为在解密的时候会把code进行urldecode，所以需要把cookie中的+改为%252B，/改为%252F）：### 漏洞证明

漏洞的本质是二次注入
，但是我们在数据库中可以看到nickname限制为30个字符，而且在这里我们可控的也只有nickname，所以进行报错注入几乎是不可能了。

既然是在找回密码处的二次注入，就看看能不能重置任意用户名的密码。还是再来看看getpassword函数的逻辑：假如说我们的payload改为\' or 1=1\#
那么肯定是可以将所有用户的密码都update为同一个newpass，这个newpass还是会发给info\[\'email\'\]这个邮箱的，跟进187行看看find函数的结果是否是我们可控的，在protected/include/core/cpModel.calss.php中：find函数虽然加了一个limit
1的条件，但返回的也还是结果中的第一个值，所以如果我们能把自己邮箱排到查询结果中的首位就可以从邮件中知晓所有账号的新密码了。

因为是利用新注册的账号来产生payload，很容易就可以想到payload为\' or 1=1
order by id desc\#

然后注册账号，重新登陆，直接上code访问，可以监控到mysql执行语句如下：顺利收到新密码的邮件：

image
