---
source: "hatch 补库批 20260928"
title: "weblogic爆破"
product: "Oracle WebLogic domain credentials"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "quarantined"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Local domain access, deliberately supplied boot credentials and domain encryption material"
source_status: "unknown"
side_effects: "含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。"
id: "vw-3ec4bb3766d8895ff7876433"
entity_id: "ve-3ec4bb3766d8895ff7876433"
schema_version: "1"
---

# weblogic爆破

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Local domain access, deliberately supplied boot credentials and domain encryption material
- 证据范围：Title calls this brute force but body creates known credentials then invokes a password decryptor; no online brute-force procedure exists.

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Reclassify as offline credential-decryption lab, not product vulnerability or password cracking
- Final decryption section empty and Java decryptor source/command unavailable in text
- Inconsistent JDK paths .51/.9/.79 and embedded space before jre
- Conflates storage shortage with memory; all error detail screenshots
- No provenance link, exact file permissions or secret-handling warnings

### 操作风险与资料使用

- 含落盘脚本或账户创建：会留下持久状态。记录本次生成的路径或账户，测试后清理这些对象并撤销关联令牌；不要删除既有业务对象。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

一、部署weblogic
----------------

现有的redhat环境7.0,jdk版本1.7。

![](./.resource/weblogic爆破/media/rId22.png)

二、weblogic下载
----------------

操作系统：RedHat7

weblogic版本：10.3.6

三、安装weblogic
----------------

### 1、weblogic安装

创建一个用户

useradd weblogic

passwd weblogic

chmod a+x wls1036\_generic.jar

su weblogic

java -jar wls1036\_generic.jar -mode=console

出现问题

![](./.resource/weblogic爆破/media/rId26.png)

提示空间内存大小不够，清理空间再下一步。

![](./.resource/weblogic爆破/media/rId27.png)

\[root\@localhostsrc\]\# cd
/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.51-2.4.5.5.el7.x86\_64

![](./.resource/weblogic爆破/media/rId28.png)

修改 commEnv.sh 文件

JAVA\_HOME=\"/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.9.x86\_64/ jre\"

![](./.resource/weblogic爆破/media/rId29.png)

### 2、启动weblogic

\[weblogic\@localhostroot\]\$cd
/home/weblogic/Oracle/Middleware/user\_projects/domains/base\_domain/
\[weblogic\@localhost base\_domain\]\$ ./startWebLogic.sh

![](./.resource/weblogic爆破/media/rId31.png)

在目录/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.79.x86\_64中找不到JRE

编辑setDomainEnv.sh

![](./.resource/weblogic爆破/media/rId32.png)

重新启动weblogic服务

![](./.resource/weblogic爆破/media/rId33.png)

四、破解weblogic控制台密码
--------------------------

### 第一步 将用户名和密码保存到boot.properties文件中

\[root\@localhost security\]\# pwd

/home/weblogic/Oracle/Middleware/user\_projects/domains/base\_domain/servers/AdminServer/security

在adminserver目录下创建security目录，并创建文件boot.properties

Username=weblogic

Password=weblogic123

### 第二步 重新启动WebLogic服务

\[root\@localhost bin\]\# ./startWebLogic.sh&

![](./.resource/weblogic爆破/media/rId37.png)

已经加密

### 第三步 暴力破解

#### 1.java和javac的版本一致

![](./.resource/weblogic爆破/media/rId40.png)

#### 2.编译WebLogicPasswordDecryptor.java

![](./.resource/weblogic爆破/media/rId42.png)

3.破解密码
