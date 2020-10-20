FastAdmin 后台 auth\_rule 权限认证getshell
==========================================

一、漏洞简介
------------

fastadmin对超管开放修改auth\_rule表的权限，造成权限认证时，能触发代码执行

二、漏洞影响
------------

三、复现过程
------------

### 首先，需要超管权限进入后台，选择权限管理，进入菜单规则

![aa6bd8929245b99c0d343a4b9e6f412b](.resource/FastAdmin%20%E5%90%8E%E5%8F%B0%20auth_rule%20%E6%9D%83%E9%99%90%E8%AE%A4%E8%AF%81getshell/media/52ce9ed0f54e04c04c11c94eed144dd5fca6b82d.png)

### 这里选择菜单规则，修改他的规则条件

![5613da758b07a846cf444d957b52ae00](.resource/FastAdmin%20%E5%90%8E%E5%8F%B0%20auth_rule%20%E6%9D%83%E9%99%90%E8%AE%A4%E8%AF%81getshell/media/f7581db7f04c7bc806809e04bd48f6827145ddc6.png)

### 保存，然后退出登录，选择一个低权限的用户登录

![8390434205fd2042136a492ba8e69c66](.resource/FastAdmin%20%E5%90%8E%E5%8F%B0%20auth_rule%20%E6%9D%83%E9%99%90%E8%AE%A4%E8%AF%81getshell/media/e7a0066009fd9581ac81f7a68c084af703effc3d.png)

### TP3的代码移植到了TP5，: )

![cf04194df00e909f44c5a2dff4b074f0](.resource/FastAdmin%20%E5%90%8E%E5%8F%B0%20auth_rule%20%E6%9D%83%E9%99%90%E8%AE%A4%E8%AF%81getshell/media/132ddebdf4a175c509364eafa497a4b04051a71e.png)

参考链接
--------

> https://www.zhihuifly.com/t/topic/672
