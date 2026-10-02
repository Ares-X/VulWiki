---
source: "hatch 补库批 20260928"
product: "Discuz X deployment"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Discuz! X Windows短文件名安全问题导致的数据库备份爆破"
prerequisites: "来源所述条件，未列明部分仍待核：Windows short filenames enabled/exposed by webserver; backup files present and readable"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-773f2529a8d98bba38419568"
entity_id: "ve-773f2529a8d98bba38419568"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Windows short filenames enabled/exposed by webserver; backup files present and readable

- **结论使用边界（1）**：Windows alone insufficient; webserver behavior and8.3 creation must be stated。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：Date~1.sql example assumes naming/collision pattern; not universal filename resolution。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（3）**：No version, precise source or screenshots (bare names)。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（4）**：Not CMS code-root-cause proof, deployment-dependent exposure。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Discuz! X Windows短文件名安全问题导致的数据库备份爆破

一、漏洞简介
------------

看似是比较鸡肋的小技巧，但在猜一些随机命令的文件名时非常有用，比如：利用短文件名我们可以下载数据库备份文件（文件名中含有随机字符），利用备份文件我们可以尝试解密用户密码。

二、漏洞影响
------------

存在Windows短文件名爆破的系统中

三、复现过程
------------

1.png

数据库备份功能默认备份在目录\"backup\_随机字符串\"

文件名为**年月日\_随机字符串**

windows下短文件名访问文件或目录只需要知道前6个字符 backup正好6个
就可以判断备份目录是否存在

    https://www.0-sec.org/data/backup~1/

进而通过爆破年月日来寻找数据库备份文件

    https://www.0-sec.org/data/backup~1/190814~1.sql

2.png
