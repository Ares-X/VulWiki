---
version: "`@Bean` `public Function<Person, Person> pojoecho() {` `return x -> {` `System.o"
source: "MrWQ/vulnerability-paper"
product: "Spring Cloud Function路由SpEL"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Spring-Cloud-Function SPEL 注入漏洞的一点想法"
prerequisites: "来源所述条件，未列明部分仍待核：3.0–3.2泛述，历史尚未修复须标日期，实验具体版本缺失"
side_effects: "未执行；本文需注意的操作影响：路径黑名单缓解不足；自己展示子路径和全局functionRouter定义，简单封/functionRouter不覆盖所有入口"
source_status: "recorded"
source_url: "https://mp.weixin.qq.com/s/sPPyso-WyPGnYYHeyL9DPA"
id: "vw-f21e5f675ba7b6744c2fae44"
entity_id: "ve-f21e5f675ba7b6744c2fae44"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：3.0–3.2泛述，历史尚未修复须标日期，实验具体版本缺失

代码与实验材料：FunctionInvocationWrapper和RoutingFunction代码、配置/路由差异有独立观察；代码逐行反引号粘连

来源证据范围：官方commit、默安/pen4uin原研究链接

- **事实待核（1）**：元数据/核心推理不准确；依据：version是@BeanJava片段；doApply的else也包含isComposed，不能说必须isRoutingFunction才调用apply。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **事实待核（2）**：Java泛型被误当instanceof依据；依据：Function&lt;String,String&gt;与Person差异不能直接等同target是否RoutingFunction，后文/functionRouter无论类型可触发也需限定版本与适配器。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **操作与副作用边界（3）**：路径黑名单缓解不足；依据：自己展示子路径和全局functionRouter定义，简单封/functionRouter不覆盖所有入口。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Spring-Cloud-Function SPEL 注入漏洞的一点想法

<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/sPPyso-WyPGnYYHeyL9DPA)

![图片](https://mmbiz.qpic.cn/mmbiz_png/mVborIuoDaaXFjOddIVfKpgl8XAxib0MB7zmeTIBmSLs6YjnDN80IdibscSTlf5iam8IPXpOhEve6NWI2zIcFXxOA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

背景介绍  

=======

最近各大网站相继发出了漏洞预警信息，Spring Cloud Function  从3.0.0.RELEASE 到3.2版本都存在一个表达式注入漏洞，目前尚未发布新的修复版本。目前从官方补丁https://github.com/spring-cloud/spring-cloud-function/commit/0e89ee27b2e76138c16bcba6f4bca906c4f3744f  ，目前POC也已经公开了。

从补丁中可以看的出来其实开发者已经把sink点写出来了，因此主要是能够找到Source点。

具体漏洞分析可以参考下面的文章，我就不再赘述了。

@默安逐日实验室  [https://mp.weixin.qq.com/s/ssHcLC72wZqzt-ei_ZoLwg](https://mp.weixin.qq.com/s?__biz=MzkxMjI3MDgwOA==&mid=2247484117&idx=1&sn=ce28ada48e22b7af94b94dcd3f15b201&scene=21#wechat_redirect) ，需要在boot的配置文件中增加下面的代码

```
spring.cloud.function.definition=functionRouter
```

 然后使用POC，请求任意路径（包括不存在的）都可以触发；  

以及

@**pen4uin** [https://mp.weixin.qq.com/s/U7YJ3FttuWSOgCodVSqemg](https://mp.weixin.qq.com/s?__biz=MzU0MDg5MzIzMQ==&mid=2247486061&idx=1&sn=609138737f5f45d79b12b668a45063b0&scene=21#wechat_redirect) 提出不改变默认配置文件下的请求特定路由地址 POST /functionRouter 下依然能否触发。

  

其实上面找到的两个Source 点都是有一个前提条件的，就是必须满足org.springframework.cloud.function.context.catalog.SimpleFunctionRegistry.FunctionInvocationWrapper#doApply 方法中 isRoutingFunction() 条件，如果满足这个条件才会进入到

```
result = ((Function)this.target).apply(convertedInput);
```

这里是触发SPEL 解析的重要一步。

```
`Object doApply(Object input) {` `input = this.fluxifyInputIfNecessary(input);` `Object convertedInput = this.convertInputIfNecessary(input, this.inputType);` `Object result;` `if (!this.isRoutingFunction() && !this.isComposed()) {` `if (this.isSupplier()) {` `result = ((Supplier)this.target).get();` `} else if (this.isConsumer()) {` `result = this.invokeConsumer(convertedInput);` `} else {` `result = this.invokeFunction(convertedInput);` `}` `} else {` `result = ((Function)this.target).apply(convertedInput);` `}` `return result;` `}`
```

  

看下isRoutingFunction()代码：

```
 `public boolean isRoutingFunction() {` `return this.target instanceof RoutingFunction;` `}`
```

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/mVborIuoDaaXFjOddIVfKpgl8XAxib0MBfKgelODv8qqah6Hxj5jRjvcvyGydK6fFZ9twickoWLfd7UnFG2l4scg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

看下 RoutingFunction 原型是实现了 Function 接口，输入和输出参数都要求是Object类。

因此如果代码里function方法参数是字符型等非Object的话，即使配置文件里配置了functionRouter 

```
spring.cloud.function.definition=functionRouter 
```

也是无法执行恶意代码的

```
 `@EnableAutoConfiguration` `public static class RoutingFunctionConfiguration {` `@Bean` `public Function<String, String> echo() {` `return x -> {` `System.out.println("===> echo");` `return x+" echo function";` `};` `}`
```

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/mVborIuoDaaXFjOddIVfKpgl8XAxib0MBSXibwqlS9YAicIWZtNlhOibdJamAALANCaHuLZEBibOGTkJBOmYjXqDsibA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

但是这样写那就会受此漏洞影响

```
`@Bean` `public Function<Person, Person> pojoecho() {` `return x -> {` `System.out.println("===> pojoecho");` `return x;` `};` `}` `@SuppressWarnings("unused")` `private static class Person {` `private String name;` `public String getName() {` `return name;` `}` `public void setName(String name) {` `this.name = name;` `}` `}`
```

以为这样就结束了，但是发现**pen4uin 的文章里 提到的路由** 不论代码是怎么配置的，都能够触发SPEL表达式执行。是因为这个路由最终会绑定到RoutingFunction，因此满足isRoutingFunction() 条件。

![图片](https://mmbiz.qpic.cn/mmbiz_png/mVborIuoDaaXFjOddIVfKpgl8XAxib0MBfO5r62uO4pjWP6GAJ0icysRfGJMNSQE0T6a2SKN4k2XD9iaAKZ3gMNqg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

其实 /functionRouter/ 后面跟任意路径都是可以的，例如

/functionRouter/aaa

![图片](https://mmbiz.qpic.cn/mmbiz_png/mVborIuoDaaXFjOddIVfKpgl8XAxib0MB3OH2GX1fkEIia6eo1j4he29yna6cO2MqkpnV6JSnzsKd4gZveRJIhkw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

甚至 /functionRouter/aaa/bbb

![图片](https://mmbiz.qpic.cn/mmbiz_png/mVborIuoDaaXFjOddIVfKpgl8XAxib0MBzSRI02fAuR500STaOgiaLme7anS7bxLJ6TwF8FeLkhBZQWbTBrfJB1Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

修复方案
====

临时方案：

*   添加 /functionRouter 路径黑名单，注意路径绕过问题。并检查配置文件
    

  

也可参考官方补丁，重新打包

  

参考文章
====

  

[https://mp.weixin.qq.com/s/ssHcLC72wZqzt-ei_ZoLwg](https://mp.weixin.qq.com/s?__biz=MzkxMjI3MDgwOA==&mid=2247484117&idx=1&sn=ce28ada48e22b7af94b94dcd3f15b201&scene=21#wechat_redirect)

[https://mp.weixin.qq.com/s/U7YJ3FttuWSOgCodVSqemg](https://mp.weixin.qq.com/s?__biz=MzU0MDg5MzIzMQ==&mid=2247486061&idx=1&sn=609138737f5f45d79b12b668a45063b0&scene=21#wechat_redirect)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
