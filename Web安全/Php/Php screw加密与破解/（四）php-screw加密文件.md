（四）php-screw加密文件
=======================

> 项目地址

    https://github.com/ianxtianxt/php-screw

> 安装命令

    我是在kali-rolling上测试的，提示没有phpize这个命令。
    apt-get install php-dev

    然后解压
    tar –zxvf php_screw-1.5.tar.gz

![1.png](./.resource/(四)php-screw加密文件/media/rId21.png)

> 编译PHP扩展的工具，主要是根据系统信息生成对应的configure文件

    Phpize
    ./configure

![2.png](./.resource/(四)php-screw加密文件/media/rId22.png)![3.png](./.resource/(四)php-screw加密文件/media/rId23.png)

> 编辑my\_screw.h修改pm9screw\_mycryptkey密钥的值

如下图，是默认值

![4.png](./.resource/(四)php-screw加密文件/media/rId24.png)

> 此外我们可以编辑php\_screw.h修改PM9SCREW 和
> PM9SCREW\_LEN的值，注意PM9SCREW\_LEN的值要小于等于PM9SCREW的长度。如下图是其默认值。

![5.png](./.resource/(四)php-screw加密文件/media/rId25.png)

> 进行编译

如下图编译时出错了，在php\_screw的目录下以下命令执行即可解决，最后编译成功。

    sed -i "s/CG(extended_info) = 1;/CG(compiler_options) |= ZEND_COMPILE_EXTENDED_INFO;/g" php_screw.c

![6.png](./.resource/(四)php-screw加密文件/media/rId26.png)

> 将编译好的php\_screw.so拷贝到php扩展库目录。

通过phpinfo()页面查找extension-dir关键字

![7.png](./.resource/(四)php-screw加密文件/media/rId27.png)

将编译好的php\_screw.so拷贝到php扩展目录。

    cp modules/php_screw.so /usr/lib/php/20151012/php_screw.so

> 编辑php.ini添加以下一行代码

    extension=php_screw.so

> 重启http服务器

    Service apache2 restart

> 编译加密工具

    cd tools
    make

> 编译完成后生成screw可执行文件。> ![8.png](./.resource/(四)php-screw加密文件/media/rId28.png){width="5.833333333333333in"
> height="2.4657994313210847in"}
>
> 尝试加密一个php文件

我们写一个phpinfo.php文件内容是

然后执行./screw phpinfo.php加密文件，见下图

![9.png](./.resource/(四)php-screw加密文件/media/rId29.png)

> 将加密好的文件拷贝到web目录

    cp phpinfo.php /var/www/html/phpinfo.php

![10.png](./.resource/(四)php-screw加密文件/media/rId30.png)

> 批量加密php文件

    find /data/php/source -name “*.php” -print|xargs -n1 screw //加密所有的.php文件

参考链接
--------

> https://www.cnblogs.com/StudyCat/p/11268399.html
