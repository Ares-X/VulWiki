---
source: "白阁文库 BaizeSec/bylibrary"
---

# Nginx文件名逻辑漏洞

### 影响版本 ###
Nginx 0.8.41 ~ 1.4.3 / 1.5.0 ~ 1.5.7
### 漏洞详情 ###
该漏洞利用了Nginx错误的解析了URL地址，导致可以绕过服务端限制，从而解析PHP文件，造成命令执行的危害。

根据nginx.conf文件中location中的定义，以.php结尾的文件都解析为php。若我们访问的文件名为shell.gif[0x20][0x00].php，该文件名以.php结尾可以被FastCGI接收，FastCGI在读取文件名时被00截断，导致读取的文件名为1.gif[0x20]，配合limit_extensions为空即可利用成功配合limit_extensions为空即可利用成功。该漏洞利用条件有两个：

1.Nginx 0.8.41 ~ 1.4.3 / 1.5.0 ~ 1.5.7

2.php-fpm.conf中的security.limit_extensions为空，也就是说任意后缀名都可以解析为PHP

### 复现过程 ###
1、 使用docker搭建漏洞环境

2、 执行如下命令,运行环境

    docker-compose up -d

3、 浏览器访问http://192.168.247.129:8080/4.上传个图片马发现上传成功并返回路径

5.5.接下来需要构造我们 test.gif[0x20][0x00].php 来造成Nginx解析漏洞，使我们的test.gif被解析成php

url:http://192.168.247.129:8080/uploadfiles/test.gif%20%20.php

手工更改成下图选中%00进行解码转发数据包解析成功！


---

> 来源：白阁文库 BaizeSec/bylibrary
