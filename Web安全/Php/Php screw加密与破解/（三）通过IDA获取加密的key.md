（三）通过IDA获取加密的key
==========================

通过导图查找
------------

首先找到php\_screw.so文件，然后通过IDA分析（幸好之前跟基友要了份IDA）。加密过程是在pm9screw\_ext\_fopen函数中实现的，所以只需要到这个函数中去找加密部分即可。![3.png](/Users/aresx/Documents/VulWiki/.resource/(三)通过IDA获取加密的key/media/rId22.png)

找到pm9screw\_ext\_fopen函数，双击，如下图所示：

![4.png](/Users/aresx/Documents/VulWiki/.resource/(三)通过IDA获取加密的key/media/rId23.png)

然后右边的窗口就会如下图所示：

![1.png](/Users/aresx/Documents/VulWiki/.resource/(三)通过IDA获取加密的key/media/rId24.png)

很明显，我标黄的就是加密密钥了，双击跳转至其指针保存处：

![2.png](/Users/aresx/Documents/VulWiki/.resource/(三)通过IDA获取加密的key/media/rId25.png)

再次双击，跟踪变量，见下图，打码处就是密钥了。

![3.png](/Users/aresx/Documents/VulWiki/.resource/(三)通过IDA获取加密的key/media/rId26.png)

如下图，右键，将十六进制的密钥转成十进制的，然后打开screwdecode.c，见下图9，将密钥替换掉，即可使用screw\_decode解密。

![4.png](/Users/aresx/Documents/VulWiki/.resource/(三)通过IDA获取加密的key/media/rId27.png)

![5.png](/Users/aresx/Documents/VulWiki/.resource/(三)通过IDA获取加密的key/media/rId28.png)

通过伪代码查找
--------------

再找到目标函数之后，使用F5，查看伪代码，双击黄标也可以跳转到之前找到的位置。

![6.png](/Users/aresx/Documents/VulWiki/.resource/(三)通过IDA获取加密的key/media/rId30.png)

参考链接
--------

> https://www.cnblogs.com/StudyCat/p/11268399.html
