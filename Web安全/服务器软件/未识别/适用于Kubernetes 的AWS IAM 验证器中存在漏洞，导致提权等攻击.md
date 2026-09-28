---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  适用于Kubernetes 的AWS IAM 验证器中存在漏洞，导致提权等攻击   
Jessica Haworth  代码卫士   2022-07-14 18:41  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
安全研究员指出，适用于 Kubernetes 的 AWS IAM 认证器中存在一个漏洞 (CVE-2022-2385)，可导致恶意人员模拟其它用户并提升在 Kubernetes 集群中的权限。  
  
  
该漏洞现已修复，可导致攻击者模拟其它用户并提升在配置了 AccessKeyID 模板参数的 Elastic Kubernetes Service (EKS) 集群中的权限。攻击者可构造对安全令牌服务 (STS) GetCallerIdentity 端点的恶意签名要求，该端点中包含同样的参数乘不同的值。  
  
  
**0****1**  
  
**认证绕过**  
  
  
  
Lightspin 公司的研究员 Gafnit Amiga 在博客文章中详细说明了攻击者如何发送两个名称一样但大小写不同的变量，如研究员可同时发送“Action” 和“action”。  
  
Amiga 解释称，“由于易受攻击代码中的两个变量都是 ‘ToLower’，queryParamsLower 字典中的值将被重写，而AWS请求将以参数和值的形式发送。而问题是AWS STS 将会忽视预测之外的参数，在这个案例中AWS STS 将忽视参数action。”  
  
易受攻击的根因出现在2017年10月的第一个提交中。因此从第一天开始，易改变的action 和未签名的集群ID令牌就是可利用的。从2020年9月开始，即可通过AccessKeyID即可利用该用户名。  
  
  
**0****2**  
  
**问题修复**  
  
  
  
Amiga 表示该漏洞难以定位，而且很难发现值可被重写且STS忽视了意料之外的额外请求参数。  
  
Amiga 指出，“我尝试了其它攻击向量希望能够操纵该HTTP客户端，但无法实现。”  
  
亚马逊之后修复了该漏洞，Amiga 评价称“大大改进了该流程”。该研究员表示，“整个过程历时1个月且他们一直告诉我最新进展。我们还协同披露漏洞。”  
  
该漏洞已在版本0.5.9中发布。更多信息可见亚马逊安全通告：  
https://aws.amazon.com/cn/security/security-bulletins/AWS-2022-007/  
。  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：  
https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[思科安全邮件设备现严重漏洞，认证机制可被绕过](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512362&idx=3&sn=70e454390ffa2bbcc942bc0ef7d5a286&chksm=ea948040dde309563ae79f6f57791819cbb113d3001d4dfc53dbf437979066bb00c594bb068d&scene=21#wechat_redirect)  
  
  
[Atlassian 修复严重的 Jira 认证绕过漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511519&idx=1&sn=b9b8b90d471249975db5d087f7ffdefa&chksm=ea949cb5dde315a3c5424a72b531da5fa5a641ef10274507bcdb66902a62df1c25f829ff0289&scene=21#wechat_redirect)  
  
  
[VMWare 认证软件存在SSRF漏洞，可用于访问用户数据](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510219&idx=2&sn=b52589c2c6fd1cd3211e7c73094e3b31&chksm=ea9499a1dde310b7493e2e78484fe3e09608e712c4f69b5d15478563e36356020771d195ed5b&scene=21#wechat_redirect)  
  
  
[速修复！Netgear 61款路由器和调制解调器中存在多个严重的预认证RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509274&idx=1&sn=216d21cb49d9020ea39826423b5b770f&chksm=ea949470dde31d664a63ac275e756e4df4883d2004af06b5d54e40dead7831e4e50c99fd17ae&scene=21#wechat_redirect)  
  
  
[速修复！Netgear交换机曝3个严重的认证绕过漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247507695&idx=1&sn=67fa6945d9b69defca30c5a951a27a8e&chksm=ea94ef85dde36693e4bd8e37deaa4e6f7f1c2659397805ea5adf422c7f39404fcf27fef53d39&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://portswigger.net/daily-swig/vulnerability-in-aws-iam-authenticator-for-kubernetes-could-allow-user-impersonation-privilege-escalation-attacks  
  
  
题图：  
Pixabay License  
  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
