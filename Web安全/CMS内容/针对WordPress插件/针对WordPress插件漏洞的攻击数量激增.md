---
cve: "CVE-2021-24284"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  针对WordPress插件漏洞的攻击数量激增   
 网络安全应急技术国家工程中心   2022-07-20 15:24  
  
来自Wordfence的研究人员对近期高频率出现的针对WordPress Page Builder插件的网络攻击发出警告，这些攻击都是试图利用WordPress插件中一个名为Kaswara Modern WPBakery Page Builder Addons的未修补漏洞。  
  
该漏洞被追踪为CVE-2021-24284，在CVSS漏洞评分系统中被评为10.0，**此项漏洞与未经授权的任意文件上传有关，可被滥用以获得代码执行，最终使得攻击者能够夺取受影响WordPress网站的控制权。**  
  
尽管该漏洞早在2021年4月由WordPress安全公司就已经进行了披露，但至今为止该漏洞仍未得到解决。更为糟糕的是，该插件已经停止更新，WordPress也不再积极维护该插件。  
  
Wordfence表示有超过1000个安装了该插件的网站正在受该公司的保护，而自本月开始该公司平均每天阻止了443,868次攻击尝试。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3icRuS6hacDibIlHxIjhG8AjUloaLguqPboM3GmibIRvALtlh8KGTXCGDE5ZCGMP4bjdl2zVU5HxLF1Q/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
【图：WordPress Page Builder插件漏洞】  
  
这些攻击来自10215个IP地址，其中大部分的攻击企图被缩小到10个IP地址。这些攻击涉及上传一个包含恶意PHP文件的ZIP档案，允许攻击者向受感染的网站上传流氓文件。  
  
该攻击的目的似乎是在其他合法的JavaScript文件中插入代码，并将网站访问者重定向到恶意网站。值得注意的是，Avast和Sucuri已经分别以Parrot TDS和NDSW的名义跟踪了这些攻击。  
  
据不完全统计，**约有4000到8000个网站安装了该插件**，因此建议使用WordPress插件的用户删除该插件，并寻找其他的插件进行替代，以防止此次针对WordPress插件的网络攻击。  
  
**消息来源：**  
  
https://thehackernews.com/2022/07/experts-notice-sudden-surge-in.html  
  
  
  
原文来源  
：FreeBuf  
  
“投稿联系方式：孙中豪 010-82992251   sunzhonghao@cert.org.cn”  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/GoUrACT176njVOPvfib4X3jQ6GIHLtX8SSDvbpmcpr4uu3X7ELG7PDjdaLVeq4Er02ZoicTPvxrC6KCVH3bssUVw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
