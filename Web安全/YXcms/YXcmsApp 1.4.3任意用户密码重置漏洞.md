YXcms 1.4.3 任意用户密码重置漏洞
================================

一、漏洞简介
------------

二、漏洞影响
------------

2017-03-26 YXcmsApp 1.4.3

三、复现过程
------------

### 漏洞原理

从框架上（基于CanPHP的二次开发）看不出来什么缺陷，那就来看看代码逻辑上有什么披露。来到protected/apps/member/controller/indexController.php中是一些关于会员账号的逻辑，其中的getpassword函数是找回密码的功能，其中分为两步：第一步根据用户名或者邮箱向注册的邮件发送重置密码链接；第二步根据重置密码的链接重置用户密码，然后再将新密码发送到对应邮箱。第二步代码如下：

![](./.resource/YXcmsApp1.4.3任意用户密码重置漏洞/media/rId25.jpg)

这里的ENCODE\_KEY是在安装时生成的6位密钥，想通过构造\$\_GET\[\'code\'\]来重置其他用户的密码初步是不现实的。

但之后又看到在regist功能中，第176行调用了自定义的set\_cookie函数，如下：

![](./.resource/YXcmsApp1.4.3任意用户密码重置漏洞/media/rId26.jpg)

跟进set\_cookie函数，是在protected/include/lib/common.function.php中607行定义，如下：

![](./.resource/YXcmsApp1.4.3任意用户密码重置漏洞/media/rId27.jpg)

这里是用ENCODE\_KEY对原值进行加密再设置cookie。所以萌生了一个想法，将注册后对应设置的auth
cookie作为getpassword的code，就可以正确地进行解密，解密后的内容即为regist函数中第175行拼接的字符串：

    $cookie_auth = $id.'\t'.$data['groupid'].'\t'.$data['account'].'\t'.$data['nickname'].'\t'.$data['lastip'];

其中会对account的格式进行校验，ip也是正则匹配的结果无法伪造，那么可控的就只有nickname了，我们可以跟踪一下nickname的过滤过程，首先是进入common.function.php的in函数：

![](./.resource/YXcmsApp1.4.3任意用户密码重置漏洞/media/rId28.jpg)

接着就直接连接成字符串，虽然htmlspecialchars函数默认不会对单引号编码，但是addslashes函数会对单引号转义，这里的nickname就无法利用了。

可是再往上看login逻辑时，发现在登陆成功后就会从数据库中取出账号信息，拼接成字符串设置为对应的auth
cookie，如下：

![](./.resource/YXcmsApp1.4.3任意用户密码重置漏洞/media/rId29.jpg)

我们可以考虑考虑二次注入的可能性，但还是需要跟踪一下在regist时insert数据是如何过滤的，最后可以跟到在protected/include/core/db/cpMysql.class.php中escape函数对数据进行了过滤：

![](./.resource/YXcmsApp1.4.3任意用户密码重置漏洞/media/rId30.jpg)

因为在登陆成功后是直接拼接字符串就加密，所以单引号还是能够还原出来的，单引号的整个输入输出过程如下：

![](./.resource/YXcmsApp1.4.3任意用户密码重置漏洞/media/rId31.jpg)

所以我们可以注册个带单引号nickname的账号，注册成功后退出重新登陆，使用auth
cookie来作为重置密码的code，就会产生报错，如下（因为在解密的时候会把code进行urldecode，所以需要把cookie中的+改为%252B，/改为%252F）：

![](./.resource/YXcmsApp1.4.3任意用户密码重置漏洞/media/rId32.jpg)

### 漏洞证明

漏洞的本质是二次注入
，但是我们在数据库中可以看到nickname限制为30个字符，而且在这里我们可控的也只有nickname，所以进行报错注入几乎是不可能了。

既然是在找回密码处的二次注入，就看看能不能重置任意用户名的密码。还是再来看看getpassword函数的逻辑：

![](./.resource/YXcmsApp1.4.3任意用户密码重置漏洞/media/rId34.jpg)

假如说我们的payload改为\' or 1=1\#
那么肯定是可以将所有用户的密码都update为同一个newpass，这个newpass还是会发给info\[\'email\'\]这个邮箱的，跟进187行看看find函数的结果是否是我们可控的，在protected/include/core/cpModel.calss.php中：

![](./.resource/YXcmsApp1.4.3任意用户密码重置漏洞/media/rId35.jpg)

find函数虽然加了一个limit
1的条件，但返回的也还是结果中的第一个值，所以如果我们能把自己邮箱排到查询结果中的首位就可以从邮件中知晓所有账号的新密码了。

因为是利用新注册的账号来产生payload，很容易就可以想到payload为\' or 1=1
order by id desc\#

然后注册账号，重新登陆，直接上code访问，可以监控到mysql执行语句如下：

![](./.resource/YXcmsApp1.4.3任意用户密码重置漏洞/media/rId36.jpg)

顺利收到新密码的邮件：

image
