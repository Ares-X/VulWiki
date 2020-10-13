（一）Php screw加密与破解工具（php-screw-brute）
================================================

> 项目地址

    https://github.com/ianxtianxt/php-screw-brute

> 此脚本可以恢复/爆破php screw使用的密钥。PHP
> Screw使用压缩文件的长度来确定（硬编码）密钥的起始索引。PHP
> Screw的工作原理是首先使用ZLIB（级别1）压缩PHP文件，然后按位取反，再与密钥进行异或。
> 因为ZLIB具有固定的头部并且不同文件的起始索引不同，所以可以恢复密钥的一部分，
> 其余字节可以爆破。 通常，你拥有的文件越多，恢复密钥的速度就越快。
> 当然，所有文件都必须使用相同的PHP Screw密钥进行加密。
> 如果你拥有的文件足够多，则可直接恢复密钥而不需要爆破。

下图是php文件经过php
screw加密后的一个样子，通过开头的"PM9SCREW"字符串得知使用了php
screw进行加密。![1.png](/Users/aresx/Documents/VulWiki/.resource/(一)Phpscrew加密与破解工具(php-screw-brute)/media/rId21.png)

### 使用方法

下图是使用方法，解密成功后，会在相同目录下生成以".plain"为后缀的同名文件。比如待解密的文件是"index.php"，则解密成功后生成"index.php.plain"文件。![2.png](/Users/aresx/Documents/VulWiki/.resource/(一)Phpscrew加密与破解工具(php-screw-brute)/media/rId23.png)

> 写了一个python脚本，用于筛选解密成功的php文件。

    #!/usr/bin/python
    # -*- coding: UTF-8 -*-
     
    import os
    import shutil
     
    def main():
        src = '/root/Download/demo'
        dst = src + '_backup'
        shutil.copytree(src,dst)    #备份
         
        for root,dirs,files in os.walk(src):
            for name in files:
                basename, ext = os.path.splitext(name)
                oldname = os.path.join(root,name)
                newname = os.path.join(root,basename)
                if ext == '.php':
                    os.remove(oldname)  #删除原来的加密的PHP文件
                if ext == '.plain':
                    os.rename(oldname,newname)  #重命名解密成功的文件 filename.php.plain => filename.php
         
        print('Good job')
     
    if __name__ == '__main__':
        main()

参考链接
--------

> https://www.cnblogs.com/StudyCat/p/11268399.html
