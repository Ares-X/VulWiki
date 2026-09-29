---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Nessus严重漏洞允许覆盖任意本地系统文件  
 FreeBuf   2025-07-02 11:03  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38jUokdlWSNlAjmEsO1rzv3srXShFRuTKBGDwkj4gvYy34iajd6zQiaKl77Wsy9mjC0xBCRg0YgDIWg/640?wx_fmt=gif "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3ib2oZzz7fu5ib8DRjTvSTx5XiaLrg6GicG561vrZTg7ibmdwWj0mtc0VWVnZojQUsN9QjFknTSRqVvGOQ/640?wx_fmt=png&from=appmsg "")  
  
  
Tenable最新发布的安全公告披露了Nessus漏洞扫描器中存在的严重漏洞，攻击者可能通过权限提升攻击危害Windows系统。  
  
  
这些安全漏洞影响10.8.5之前的所有Nessus版本，包括一个关键的Windows特定漏洞(CVE-2025-36630)以及第三方组件libxml2和libxslt中的两个额外漏洞。  
  
  
**Part01**  
## 漏洞概要  
  
```
1、CVE-2025-36630
```  
```
CVSSv3评分：8.4，影响Nessus 10.8.4及更早版本，允许提升至SYSTEM权限)
CVSSv3评分：8.4，
```  
```
2、CVE-2025-6021
```  
```
CVSSv3评分：6.5，影响Nessus 10.8.4及更早版本，Nessus底层XML处理功能使用的libxml2第三方组件漏洞
CVSSv3评分：6.5，
CVSSv3评分：6.5，

```  
```
```  
```
3、CVE-2025-24855
3、CVE-2025-24855
CVE-2025-24855
```  
```
CVSSv3评分：7.8，影响Nessus 10.8.4及更早版本，Nessus XSLT转换操作使用的libxslt第三方组件漏洞  
CVSSv3评分：7.8，影响Nessus 10.8.4及更早版本，Nessus XSLT转换操作使用的libxslt第三方组件漏洞  
CVSSv3评分：7.8，影响Nessus 10.8.4及更早版本，Nessus XSLT转换操作使用的libxslt第三方组件漏洞  
CVSSv3评分：7.8，
CVSSv3评分：7.8，
CVSSv3评分：7.8，
Nessus 10.8.4及更早版本，Nessus XSLT转换操作使用的libxslt第三方组件漏洞  
  
  
```  
```



```  
  
这些漏洞的CVSS评分介于6.5至8.4之间，对依赖Nessus进行安全评估的组织构成重大威胁。  
  
  
**Part02**  
### Windows权限提升漏洞  
  
  
最严重的漏洞编号为CVE-2025-36630，影响10.8.4 及之前版本的Windows系统Nessus安装。该高危漏洞使非管理员用户能够利用日志内容以SYSTEM权限覆盖任意本地系统文件，实质上允许权限提升攻击。该漏洞CVSSv3基础评分为8.4，属于高严重性级别，具有重大潜在影响。  
  
  
该漏洞的攻击向量被描述为需要本地访问且复杂度低(AV:L/AC:L/PR:L/UI:N/S:C/C:N/I:H/A:H)，表明攻击者需要低级别权限但无需用户交互即可利用该漏洞。影响范围标记为"已更改"，意味着该漏洞可能影响超出其原始安全上下文的资源。安全研究员Rishad Sheikh于2025年5月10日向Tenable报告了该关键漏洞。  
  
****  
**Part03**  
### 第三方组件更新  
  
  
除Windows特定漏洞外，Tenable还修复了为Nessus平台提供核心功能的底层第三方软件组件中的安全缺陷。该公司已将libxml2升级至2.13.8版本，libxslt升级至1.1.43版本，以修复已识别的漏洞CVE-2025-6021和CVE-2025-24855。  
  
  
CVE-2025-24855的基础评分为7.8，需要本地访问且攻击复杂度高，但无需用户权限(AV:L/AC:H/PR:N/UI:N/S:C/C:N/I:H/A:H)。  
  
  
CVE-2025-6021的CVSSv3基础评分为6.5，攻击向量需要网络访问和低权限凭据(AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H)。  
值得注意的是，针对CVE-2025-6021的修复已专门反向移植到Nessus 10.8.5中的libxml2 2.13.8版本实现中。  
  
  
**Part04**  
### 缓解措施  
  
  
运行受影响Nessus版本的组织应优先通过Tenable下载门户立即更新至10.8.5或10.9.0版本。漏洞披露时间线显示Tenable处理效率较高，在报告后18天内确认问题，并在初始披露约两个月后发布补丁。  
  
  
系统管理员应验证当前的Nessus安装情况，并在计划维护窗口期间实施安全更新。鉴于高严重性评级和权限提升的可能性，组织应将这些更新视为关键安全补丁，需要加速在所有基于Windows的Nessus安装中部署。  
  
  
**参考来源：**  
  
Nessus Windows Vulnerabilities Allow Overwrite of Arbitrary Local System Files  
  
https://cybersecuritynews.com/nessus-windows-vulnerabilities/  
  
  
###   
###   
###   
  
**推荐阅读**  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651324079&idx=1&sn=c11acae8f7897f7fa528977c559d8c05&scene=21#wechat_redirect)  
  
### 电台讨论  
  
****  
  
  
  
![图片](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR3icF8RMnJbsqatMibR6OicVrUDaz0fyxNtBDpPlLfibJZILzHQcwaKkb4ia57xAShIJfQ54HjOG1oPXBew/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp "")  
  
   
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
