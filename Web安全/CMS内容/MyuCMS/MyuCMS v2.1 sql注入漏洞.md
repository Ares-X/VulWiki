---
source: "hatch 补库批 20260928"
product: "MyuCMS2.1 message controller"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "MyuCMS v2.1 sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：登录会员、存在可操作消息；ids0标已读/ids1删除"
side_effects: "未执行；本文需注意的操作影响：有payload但完整路由/ids参数只图，两个分支应分别列影响/副作用"
source_status: "unknown"
id: "vw-f8635d2a53f774320a1715c7"
entity_id: "ve-f8635d2a53f774320a1715c7"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：登录会员、存在可操作消息；ids0标已读/ids1删除

- **适用与权限边界（1）**：标题未标认证，源码明确登录且限定userid，数值字符串where仍可注入。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（2）**：有payload但完整路由/ids参数只图，两个分支应分别列影响/副作用。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（3）**：CNVD只模糊页面无编号，不能自动补某CNVD；ThinkPHP版本缺失。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# MyuCMS v2.1 sql注入漏洞

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

![1.jpg](./.resource/MyuCMSv2.1sql注入漏洞/media/rId24.jpg)

如图所示功能处可将未读消息更改为已读消息。同时我们抓包观察。未读消息为其他用户在登录用户发布的文章下留言所产生。

![2.jpg](./.resource/MyuCMSv2.1sql注入漏洞/media/rId25.jpg)

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

![3.png](./.resource/MyuCMSv2.1sql注入漏洞/media/rId26.png)

### Payload

Payload如下

    Payload: id=2) and updatexml(1,concat(0x7e,(select database()),0x7e),1)  and (1

在下图所示位置打上断点，即可查执行的SQL语句

![4.jpg](./.resource/MyuCMSv2.1sql注入漏洞/media/rId28.jpg)

参考链接
--------

> https://xz.aliyun.com/t/7271\#toc-0
