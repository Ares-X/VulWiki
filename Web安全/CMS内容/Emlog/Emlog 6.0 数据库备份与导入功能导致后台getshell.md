---
source: "hatch 补库批 20260928"
product: "Emlog <=6.0"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Emlog 6.0 数据库备份与导入功能导致后台getshell"
prerequisites: "来源所述条件，未列明部分仍待核：管理员备份导入权限；DB FILE、secure_file_priv允许，PHP目录可写"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-343688e968ec5b5a644f186f"
entity_id: "ve-343688e968ec5b5a644f186f"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：管理员备份导入权限；DB FILE、secure_file_priv允许，PHP目录可写

- **适用与权限边界（1）**：outfile权限/路径前提缺失，&lt;=6.0范围无依据。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：SQL仅图片，两图引用后台暴力破解资源目录须核对对应。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：未解释管理员设计能力与额外安全边界。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Emlog 6.0 数据库备份与导入功能导致后台getshell

一、漏洞简介
------------

二、漏洞影响
------------

Emlog\<=6.0

三、复现过程
------------

备份数据库到本地：

![](./.resource/Emlog6.0后台暴力破解/media/rId24.png)

修改数据库文件，将备份的数据库文件进行修改，在最后一段添加上自己构造的SQL语句：

![](./.resource/Emlog6.0数据库备份与导入功能导致后台getshell/media/rId25.png)

这一段sql语句主要功能是：首先判断是否存在emlog\_shell数据表，如果存在则删除该表，之后创建一个新的emlog数据表，之后再向该表中添加信息（这里可以填入一句话木马），之后使用select\.....
 into  outfile
 \....将数据表中的表项内容读入到一个shell.php的PHP文件汇总，之后再删除该数据表！

导入数据库：

![](./.resource/Emlog6.0后台暴力破解/media/rId26.png)

之后访问之：

![](./.resource/Emlog6.0数据库备份与导入功能导致后台getshell/media/rId27.png)
