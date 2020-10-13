PHP序列化和反序列化语法差异问题
-------------------------------

介绍
----

官方文档中介绍PHP序列化和反序列化如下：

    所有php里面的值都可以使用函数serialize()来返回一个包含字节流的字符串来表示。unserialize()函数能够重新把字符串变回php原来的值。 序列化一个对象将会保存对象的所有变量，但是不会保存对象的方法，只会保存类的名字。

    为了能够unserialize()一个对象，这个对象的类必须已经定义过。如果序列化类A的一个对象，将会返回一个跟类A相关，而且包含了对象所有变量值的字符串。

简单说序列化是对象转化字符串的过程，反序列化是字符串还原对象的过程。

环境
----

文章中所述内容使用环境如下:

    PHP7.3.1、SDK

    VSCode

    C++和C

环境配置建议参考：《WINDOWS下用VSCODE调试PHP7源代码》[https://www.jianshu.com/p/29bc0443*\**6](https://www.jianshu.com/p/29bc0443***6)
(作者经过几小时尝试后找到最全的版本)

在网上公开参数反序列化执行流程已经非常详细，但是对于一些细节地方有一些不足，其中就包括序列化和反序列化之间的语法差异问题

差异问题
--------

#### 序列化

我们通过编译PHP内核源码分析，发现PHP序列化在默认情况下在对象转换中加入:{和}用来拼接成字符串。

    [var.c]
    Line:882
    static void php_var_serialize_intern()

    Line:896
    if (ce->serialize(struc, &serialized_data, &serialized_length, (zend_serialize_data *)var_hash) == SUCCESS) {
                            smart_str_appendl(buf, "C:", 2);
                            smart_str_append_unsigned(buf, ZSTR_LEN(Z_OBJCE_P(struc)->name));
                            smart_str_appendl(buf, ":\"", 2);
                            smart_str_append(buf, Z_OBJCE_P(struc)->name);
                            smart_str_appendl(buf, "\":", 2);

                            smart_str_append_unsigned(buf, serialized_length);
                            smart_str_appendl(buf, ":{", 2);
                            smart_str_appendl(buf, (char *) serialized_data, serialized_length);
                            smart_str_appendc(buf, '}');
                        }

    Line:952
    smart_str_appendl(buf, ":{", 2);

    Line:995
    smart_str_appendc(buf, '}');

咱们来看上面这段代码，PHP会使用smart\_str\_appendl为序列化字符串前后拼接:{和}，从var.c的第882行开始进入序列化逻辑。在第896行进行序列化字符串拼接，第952行和第995行，对于内嵌方法进行拼接。

#### 反序列化

反序列化是将序列化的字符串，按照一定语法规则进行转化还原。

    [var_unserialize.c]
    Line:655
    static int php_var_unserialize_internal()

    Line:674
    {
        YYCTYPE yych;
        static const unsigned char yybm[] = {
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
            128, 128, 128, 128, 128, 128, 128, 128, 
            128, 128,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
              0,   0,   0,   0,   0,   0,   0,   0, 
        };
        if ((YYLIMIT - YYCURSOR) < 7) YYFILL(7);
        yych = *YYCURSOR;
        switch (yych) {
        case 'C':
        case 'O':    goto yy4;
        case 'N':    goto yy5;
        case 'R':    goto yy6;
        case 'S':    goto yy7;
        case 'a':    goto yy8;
        case 'b':    goto yy9;
        case 'd':    goto yy10;
        case 'i':    goto yy11;
        case 'o':    goto yy12;
        case 'r':    goto yy13;
        case 's':    goto yy14;
        case '}':    goto yy15;
        default:    goto yy2;
        }

    Line:776
    yy15:
        ++YYCURSOR;
        {
        /* this is the case where we have less data than planned */
        php_error_docref(NULL, E_NOTICE, "Unexpected end of serialized data");
        return 0; /* not sure if it should be 0 or 1 here? */
    }

通过内核代码能够看到第655行进入反序列化，反序列化是利用词法扫描，判断各项符号转换对应对象。能够看到反序列化中对于}进行了处理，处理中只是对计数器加一并没有其他操作。

实际作用
--------

反序列化语法的差异，对于安全防护设备判断反序列化产生很大的影响。在Snort中，有段规则如下：

    alert tcp any any -> any [80,8080,443] (uricontent:".php"; pcre:"/\{\w:.+?\}/"; sid:1; msg:php_serialize;)

在攻击载荷中可以使用大多数字符代替{},从而导致规则失效。

总结
----

在红队攻击中可以利用PHP序列化和反序列化语法差异，从而达到绕过防护的目的。

在蓝队防御中建议考虑定义中所述`不会保存对象的方法，只会保存类的名字。`，拦截保存类的名字，以及语法中相同的字符
