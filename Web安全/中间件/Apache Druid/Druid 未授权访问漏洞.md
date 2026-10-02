---
source: "hatch 补库批 20260928"
title: "Druid 未授权访问漏洞"
product: "Alibaba Druid数据库连接池StatViewServlet，非Apache Druid"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "应用启用Druid监控且未限制访问，WebSessionStat确实暴露有效会话标识，应用会话仍可重用"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-836108812de9b9078a4feb84"
entity_id: "ve-836108812de9b9078a4feb84"
schema_version: "1"
---

# Druid 未授权访问漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：应用启用Druid监控且未限制访问，WebSessionStat确实暴露有效会话标识，应用会话仍可重用
- 证据范围：websession.html/Jeecg路径明确是Alibaba Druid，产品严重误分类；后续越权是宿主应用独立漏洞

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 移出Apache Druid到Alibaba Druid连接池/应用监控
- 200不等于有效登录session，可能匿名页/错误模板/重定向
- 所有步骤称红框/制表符却图片引用全缺，无法重现证据
- 简介/影响空白，未列Druid版本/StatView认证配置；密码重置等不能算Druid本体漏洞

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

##### 当开发者配置不当时就可能造成未授权访问下面给出常见Druid未授权访问路径

```
/druid/websession.html
/system/druid/websession.html
/webpage/system/druid/websession.html(jeecg)
```

##### 当遇到需要登录的Druid是可能存在弱口下面给出Druid常见登录口路径。

```
/druid/login.html
/system/druid/login.html
/webpage/system/druid/login.html
```

##### 以上路径可能不止存在于根目录，遇到过在二级目录下的，我们扫路径时可能就关注根目录这个点可以注意一下

### Druid的一些利用方式

#### 通过泄露的Session登录后台



##### 直接在/druid/websession.html页面ctrl+a复制整个页面内容到EmEditor



##### 删除红框部分，点击制表符



##### 这样就可以直接复制了，也可以通过其他方式处理，个人比较喜欢这个方式



##### 然后再到URI监控处找一条看起来像登录后台才能访问的路径（可用home等关键词快速定位）





##### 此处设置爆破，将刚才得到的Session值填入，因为此处的session值存在一些特殊符号需要关闭burp默认的url编码



##### 200即为有效session，用改cookie的插件改成有效的就能进入后台测试



#### 通过URI监控测试未授权越权

##### 由于有的Druid可能Session监控处没有东西，可以通过URI监控测试未授权越权



##### 具体案例现在手上没有，之前众测挖到过通过session爆破，有效的只是一个普通账号，回过来看URI监控找到了任意用户密码重置，越权查看任意用户信息，越权添加管理员等.参考链接

> https://www.cnblogs.com/cwkiller/p/12483223.html
