BSPHP 存在未授权访问漏洞
========================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

该处泄漏的用户名和登陆ip。

```
/admin/index.php?m=admin&c=log&a=table_json&json=get&soso_ok=1&t=user_login_log&page=1&limit=10&bsphptime=1600407394176&soso_id=1&soso=&DESC=0
```

![image.png](./.resource/BSPHP存在未授权访问漏洞/media/1600850992225-90182999-bbb8-4b08-8b37-ced3c7e1da57.png)