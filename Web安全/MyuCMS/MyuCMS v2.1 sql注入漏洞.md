MyuCMS v2.1 sql注入漏洞
=======================

一、漏洞简介
------------

二、漏洞影响
------------

MyuCMS v2.1

三、复现过程
------------

在 CNVD 上的描述为，**MyuCMS us\**\*\_xi\**\*.html页面存在SQL注入漏洞**

通过对整个项目文件的搜索，最终确定为 **user\_xiaoxi.html** 文件。

该视图文件，对应的控制器为 **application/bbs/controller/User.php**
。显示消息为 **User-\>xiaoxi()**
方法。该方法中无用户可控参数。所以注入不可能在此方法中。

![1.jpg](/Users/aresx/Documents/VulWiki/.resource/MyuCMSv2.1sql注入漏洞/media/rId24.jpg)

如图所示功能处可将未读消息更改为已读消息。同时我们抓包观察。未读消息为其他用户在登录用户发布的文章下留言所产生。

![2.jpg](/Users/aresx/Documents/VulWiki/.resource/MyuCMSv2.1sql注入漏洞/media/rId25.jpg)

可以发现，该功能对应的路由地址，以及所提交的参数。我们找到路由地址对应的方法为
**User-\>xiaoxidel()** 代码如下

    public function xiaoxidel($ids)
        {
            if (!session('userid') || !session('username')) { // 进行登录判断
                $this->error('亲！请登录',url('bbs/login/index'));
            } else {
                if ($ids==0) { // 根据 ids 参数来判断执行的动作为标记消息还是删除消息
                $id = input('id'); // 通过input助手函数获取需要操作的消息对应的 id
                $data['open'] = 1;
                if (Db::name('xiaoxi')->where("id = {$id}")->where('userid', session('userid'))->update($data)) { // 此处第一个 where() 使用字符串条件时没有配合预处理机制，所以会直接将 id=$id 拼接到SQL语句中。从而造成了SQL语句可控，形成注入。此处可以进行DEBUG，看到最好的SQL语句是如何拼接的。
                    return json(array('code' => 200, 'msg' => '标记已读成功'));
                } else {
                    return json(array('code' => 0, 'msg' => '标记已读失败'));
                }
                }elseif ($ids==1){
                $id = input('id');
                if (Db::name('xiaoxi')->where("id = {$id}")->where('userid', session('userid'))->delete($id)) {
                    return json(array('code' => 200, 'msg' => '彻底删除成功'));
                } else {
                    return json(array('code' => 0, 'msg' => '彻底删除失败'));
                }
                }
            }
        }

上述代码中，**where()**
方法使用字符串条件，但并没有执行预编译。其实针对字符串条件，官方手册是做了说明的，显然这里没有遵守官方手册的意见，所以造成了SQL注入。

![3.png](/Users/aresx/Documents/VulWiki/.resource/MyuCMSv2.1sql注入漏洞/media/rId26.png)

### Payload

Payload如下

    Payload: id=2) and updatexml(1,concat(0x7e,(select database()),0x7e),1)  and (1

在下图所示位置打上断点，即可查执行的SQL语句

![4.jpg](/Users/aresx/Documents/VulWiki/.resource/MyuCMSv2.1sql注入漏洞/media/rId28.jpg)

参考链接
--------

> https://xz.aliyun.com/t/7271\#toc-0
