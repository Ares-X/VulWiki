---
cve: "CVE-2022-31692"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Spring Security身份认证绕过漏洞CVE-2022-31692   
深瞳漏洞实验室  深信服千里目安全技术中心   2022-11-04 17:59  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zNBtPTtC0SpIZJaFygoP5V7aypfpvWia3PIKibqv0ibfUmP8qruh5BZaKbQ/640?wx_fmt=gif "")  
  
**漏洞名称：**  
  
Spring Security 身份认证绕过漏洞  
  
**组件名称：**  
  
Spring Security  
  
**影响范围：**  
  
5.6.0 ≤ Spring Security ≤ 5.6.8  
  
5.7.0 ≤ Spring Security ≤ 5.7.4  
  
**漏洞类型：**  
  
身份认证绕过  
  
**利用条件：**  
  
1、用户认证：不需要用户认证  
  
2、前置条件：  
代码逻辑满足漏洞利用需求  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：  
中等  
。  
  
<综合评定威胁等级>：  
高危，能造成身份认证绕过。  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zN4GBj9cJGZ5cgJdEl3sG6uYry0vyoRB3utQRWhqrIvtZDoT01OmcdvQ/640?wx_fmt=gif "")  
  
**组件介绍**  
  
VMware Spring Security 是美国威睿（Vmware）公司的一套为基于 Spring 的应用程序提供的功能强大且高度可定制的身份验证和访问控制框架。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zN4GBj9cJGZ5cgJdEl3sG6uYry0vyoRB3utQRWhqrIvtZDoT01OmcdvQ/640?wx_fmt=gif "")  
  
**漏洞简介**  
  
2022 年11月4日，深信服安全团队监测到一则 Spring Security 组件存在身份认证绕过漏洞的信息，漏洞编号：CVE-2022-31692，漏洞威胁等级：高危。  
  
  
该漏洞由于 Spring Security 中的 authorizeHttpRequests 方法中存在缺陷，开发者使用 forward 方式将客户端请求转发至高权限路由时可能导致权限绕过，  
**攻击者可利用该漏洞越权访问受保护的界面，甚至获取管理员权限**。  
  
  
**影响范围**  
  
VMware Spring Security 是美国威睿（Vmware）公司的一套为基于 Spring 的应用程序提供的功能强大且高度可定制的身份验证和访问控制框架。广泛应用于基于 Spring 开发的应用程序。  
  
  
目前受影响的 Spring Security 版本：  
  
5.6.0 ≤ Spring Security ≤ 5.6.8  
  
5.7.0 ≤ Spring Security ≤ 5.7.4  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zN4GBj9cJGZ5cgJdEl3sG6uYry0vyoRB3utQRWhqrIvtZDoT01OmcdvQ/640?wx_fmt=gif "")  
  
**如何检测组件版本**  
  
  
**方法一**  
  
****  
**Windows 系统：**  
  
全盘搜索 spring-security-bom- ，如果存在 spring-security-bom-{version}.jar ，则用户可能受影响。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zNIzomiaMgVH8QIs9IPKfSXoWGvhU8Q8kJkCWGr9a8y2e7B6bvMkJuSAw/640?wx_fmt=png "")  
  
  
**Linux 系统：**  
  
使用   
find  
 / -name ‘spring-security*’  
   
命令搜索，如果存在 spring-security-bom-{version}.jar 则用户可能受漏洞影响。  
  
  
**方法二**  
  
****  
若  
为 Maven 项目，可查看项目 pom.xml 中 spring-security-core 和 spring-security-web 的 version 字段值是否位于受影响版本。  
  
```
<dependencies>
  <!-- ... other dependency elements ... --!>
  <dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-web</artifactId>
    <version>5.6.9</version>
  </dependency>
  <dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-core</artifactId>
    <version>5.6.9</version>
  </dependency>
</dependencies>
```  
  
  
如果 pom.xml 中没有写明 spring-security-core 和 spring-security-web 的版本号，说明使用了 Springboot 内置的 Spring Security 组件，可以在此链接中查询 Springboot 对应版本内置 Spring Security 的版本号。  
  
  
查询链接：  
https://github.com/spring-projects/spring-boot/releases  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zNFd1yf4soRQgMuYW8m57oPgmyz7ODZN4YT5IAnfVaIBh36taMicDc6LA/640?wx_fmt=png "")  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zN4GBj9cJGZ5cgJdEl3sG6uYry0vyoRB3utQRWhqrIvtZDoT01OmcdvQ/640?wx_fmt=gif "")  
  
**官方修复建议**  
  
当前官方已发布最新版本，建议受影响的用户及时更新升级到最新版本。链接如下：  
  
https://spring.io/projects/spring-security  
  
  
**打补丁/升级方法:**  
  
升级 Springboot 至安全版本，或修改 pom.xml 中 spring-security-web 和 spring-security-core 的版本，强制使用安全版本的 Spring Security 依赖。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zNxLJ45WlAmFvzuWAaXmicOhoib41gN5UT5PgX29gZ7rPLSmL358icyktlw/640?wx_fmt=png "")  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zN4GBj9cJGZ5cgJdEl3sG6uYry0vyoRB3utQRWhqrIvtZDoT01OmcdvQ/640?wx_fmt=gif "")  
  
**临时修复建议**  
  
该临时修复建议存在一定风险，建议用户可根据业务系统特性审慎选择采用临时修复方案：  
  
当 Spring Security ≥ 5.7.0 ，可使用 authorizeRequests().filterSecurityInterceptorOncePerRequest(false) 代替 authorizeHttpRequests().shouldFilterAllDispatcherTypes(true)  
  
当 Spring Security < 5.7.0 时 shouldFilterAllDispatcherTypes 方法不可用，可通过添加 ObjectPostProcessor 缓解此漏洞。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zNa9iaRND1dBgdba5l05mkQDoPNfLlQcMRJcia7STGdSibOiaCredWUV5dkw/640?wx_fmt=png "")  
  
  
最后保存并重启服务即可生效。修复后结果：  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zNcOJj3FRMhNa0Cs0IUTw5Mia6CIsicMswOgQxYOpJXfguDJxSz9bQnITw/640?wx_fmt=png "")  
  
  
**参考链接**  
1. https://nvd.nist.gov/vuln/detail/CVE-2022-31692  
  
1. https://tanzu.vmware.com/security/cve-2022-31692  
  
**时间轴**  
  
  
  
**2022/11/4**  
  
深信服监测到 Spring Security 身份认证绕过漏洞(CVE-2022-31692)信息。  
  
  
**2022/11/4**  
  
深信服千里目安全技术中心发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zNDLBbEzortH9sbicGRywrQP4UicmVaHyY4BBnbibOibIWu17qXEHRn170yA/640?wx_fmt=png "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5xkbk0BiaeTERRtQE7WicF4zNsx3D079gAvmyibKudMLKSlSskCxE6eOb0TQkEzUJEh57E2qD54v0nwQ/640?wx_fmt=jpeg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
