---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  VMware Aria Operations for Networks 身份认证绕过漏洞通告   
原创 360CERT  三六零CERT   2023-08-31 16:35  
  
**赶紧点击上方话题进行订阅吧！**  
  
报告编号：CERT-R-2023-377  
  
报告来源：360CERT  
  
报告作者：360CERT  
  
更新日期：2023-08-31  
  
1  
  
 漏洞简述  
  
  
  
  
2023年08月31日，360CERT监测发现VMware发布了Aria Operations for Networks的风险通告，漏洞编号为CVE-2023-34039，漏洞等级：严重，漏洞评分：9.8。  
  
VMware Aria Operations for Networks是一款网络可视性和分析工具，可以帮助管理员优化网络性能或管理和扩展各种VMware和Kubernetes部署。  
  
对此，360CERT建议广大用户及时请做好资产自查以及预防工作，以免遭受黑客攻击。  
  
2  
  
 风险等级  
  
  
  
  
360CERT对该漏洞的评定结果如下  
<table><tbody style="margin: 0px;padding: 0px;border-width: 0px;border-style: initial;border-color: initial;"><tr style="border-width: 1px 0px 0px;border-right-style: initial;border-bottom-style: initial;border-left-style: initial;border-right-color: initial;border-bottom-color: initial;border-left-color: initial;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;margin: 0px;padding: 0px;"><th style="font-size: 12px;border-width: 1px;border-style: solid;border-color: rgb(204, 204, 204);margin: 0px;padding: 0.5em 1em;word-break: unset;">评定方式</th><th style="font-size: 12px;border-width: 1px;border-style: solid;border-color: rgb(204, 204, 204);margin: 0px;padding: 0.5em 1em;word-break: unset;">等级</th></tr><tr style="border-width: 1px 0px 0px;border-right-style: initial;border-bottom-style: initial;border-left-style: initial;border-right-color: initial;border-bottom-color: initial;border-left-color: initial;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;margin: 0px;padding: 0px;"><td style="text-align: center !important;">威胁等级</td><td style="text-align: center !important;">严重</td></tr><tr style="border-width: 1px 0px 0px;border-right-style: initial;border-bottom-style: initial;border-left-style: initial;border-right-color: initial;border-bottom-color: initial;border-left-color: initial;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;margin: 0px;padding: 0px;"><td style="text-align: center !important;">影响面</td><td style="text-align: center !important;">广泛</td></tr><tr style="border-width: 1px 0px 0px;border-right-style: initial;border-bottom-style: initial;border-left-style: initial;border-right-color: initial;border-bottom-color: initial;border-left-color: initial;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;margin: 0px;padding: 0px;"><td style="text-align: center !important;">攻击者价值</td><td style="text-align: center !important;">高</td></tr><tr style="border-width: 1px 0px 0px;border-right-style: initial;border-bottom-style: initial;border-left-style: initial;border-right-color: initial;border-bottom-color: initial;border-left-color: initial;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;margin: 0px;padding: 0px;"><td style="text-align: center !important;">利用难度</td><td style="text-align: center !important;">低</td></tr><tr style="border-width: 1px 0px 0px;border-right-style: initial;border-bottom-style: initial;border-left-style: initial;border-right-color: initial;border-bottom-color: initial;border-left-color: initial;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;margin: 0px;padding: 0px;"><td style="text-align: center !important;">360CERT评分</td><td style="text-align: center !important;">9.8</td></tr></tbody></table>  
  
3  
  
 漏洞详情  
  
  
  
  
### CVE-2023-34039 身份认证绕过漏洞  
  
组件: VMware:Aria Operations for Networks  
  
漏洞类型: 身份认证绕过  
  
实际影响: 身份认证绕过  
  
主要影响: 敏感数据窃取  
  
简述: 该漏洞存在于VMware Aria Operations for Networks中，是一个身份认证绕过漏洞。由于缺乏唯一的加密密钥，具有Aria Operations for Networks网络访问权限的攻击者可以绕过SSH身份验证获取Aria Operations for Networks CLI的访问权限。  
  
4  
  
 影响版本  
  
  
  
  
### CVE-2023-34039  
<table><tbody style="margin: 0px;padding: 0px;border-width: 0px;border-style: initial;border-color: initial;"><tr style="border-width: 1px 0px 0px;border-right-style: initial;border-bottom-style: initial;border-left-style: initial;border-right-color: initial;border-bottom-color: initial;border-left-color: initial;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;margin: 0px;padding: 0px;"><th style="font-size: 12px;border-width: 1px;border-style: solid;border-color: rgb(204, 204, 204);margin: 0px;padding: 0.5em 1em;word-break: unset;">组件</th><th style="font-size: 12px;border-width: 1px;border-style: solid;border-color: rgb(204, 204, 204);margin: 0px;padding: 0.5em 1em;word-break: unset;">影响版本</th><th style="font-size: 12px;border-width: 1px;border-style: solid;border-color: rgb(204, 204, 204);margin: 0px;padding: 0.5em 1em;word-break: unset;">安全版本</th></tr><tr style="border-width: 1px 0px 0px;border-right-style: initial;border-bottom-style: initial;border-left-style: initial;border-right-color: initial;border-bottom-color: initial;border-left-color: initial;border-top-style: solid;border-top-color: rgb(204, 204, 204);background-color: white;margin: 0px;padding: 0px;"><td style="text-align: center !important;">VMware:Aria Operations for Networks</td><td style="text-align: center !important;">&lt; 6.11.0</td><td style="text-align: center !important;">6.11.0</td></tr></tbody></table>  
  
5  
  
 修复建议  
  
  
  
  
### 通用修补建议  
  
根据影响版本中的信息，排查并升级到安全版本，或直接访问参考链接获取官方更新指南。  
  
补丁下载地址:https://kb.vmware.com/s/article/94152  
  
6  
  
 产品侧解决方案  
  
  
  
  
若想了解更多产品信息或有相关业务需求，可移步至http://360.net。  
### 360城市级网络安全监测服务  
  
360CERT的安全分析人员利用360安全大脑的QUAKE资产测绘平台(quake.360.cn)，通过资产测绘技术的方式，对该漏洞进行监测。可联系相关产品区域负责人或(quake#360.cn)获取对应产品。  
![](https://mmbiz.qpic.cn/mmbiz_png/Ic3Rgfdm96eRkP20vLgT6Ru2iaBulHg182UsTABVD0tIU7mtPpx3lc0jtrRuIV9uhxebEf22VxTa8JiaYdnN8yIA/640 "")  
### 360威胁情报平台（TIP）  
  
360威胁情报平台（TIP）一款构建全面情报管理、赋能、评价、分享能力的新一代本地化情报平台。可以用来增强对关键威胁的检测；可以自动化识别报警中的重点事件；还可以提供情报分析、外部攻击面管理、行业威胁情报等高阶能力，帮助组织全面应对数字时代的安全风险。  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Ic3Rgfdm96eRkP20vLgT6Ru2iaBulHg18bMmwPBvweAibq8JLRYjRtnE846pzEWz7t4S2RUibcTFejOWtFu369AdQ/640 "")  
### 360安全分析响应平台  
  
360安全大脑的安全分析响应平台通过网络流量检测、多传感器数据融合关联分析手段，对该类漏洞的利用进行实时检测和阻断，请用户联系相关产品区域负责人获取对应产品。  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Ic3Rgfdm96eRkP20vLgT6Ru2iaBulHg18c2tUbEbuS0Z6CS4mYzUsRkBWXzCehlyQpMS85fBg28s7QFbvw659Ug/640 "")  
### 360终端安全管理系统  
  
360终端安全管理系统在360安全大脑极智赋能下，以云计算、大数据、人工智能等新技术为支撑，是面向企业级客户提供端点安全（EPP)、主机安全(CDR\CWPP)、高级威胁检测与响应(EDR)等各类能力和功能的同一平台管理产品。  
  
创新领先的场景化管理方式，对勒索防护、挖矿防护、HW对抗、重大事件保障、APT防护、等保合规、数据安全防护等场景实现高效的终端安全运营管理。  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Ic3Rgfdm96eRkP20vLgT6Ru2iaBulHg18MVxUfu4seLojZxRW4iaK5gSZib0pggbv3wkj0z1VmVuRbX3ZSFYKQOhA/640 "")  
  
  
7  
  
 时间线  
  
  
  
  
**2023年08月29日** VMware官方发布通告  
  
**2023年08月31日** 360CERT发布通告  
  
8  
  
 参考链接  
  
  
  
  
1、 https://www.vmware.com/security/advisories/VMSA-2023-0018.html  
  
9  
  
 特制报告相关说明  
  
  
  
  
一直以来，360CERT对全球重要网络安全事件进行快速通报、应急响应。为更好地为政企用户提供最新漏洞以及信息安全事件的安全通告服务，现360CERT推出了安全通告特制版报告订阅服务，以便用户做资料留存、传阅研究与查询验证。  
  
今后特制报告将不再提供公开下载，用户可扫描下方二维码进行服务订阅。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Ic3Rgfdm96dGuACWTa4BQzhoMl3chI7Tdch7TU5O21ECnPYAkbzMTfjcuvslias51NRldtrfia2XCvoI05Q91X8Q/640?wx_fmt=jpeg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Ic3Rgfdm96fDEiaYRAwzeORXyPTzIZEicJEJchzE6NNx8UKdqTdwDHNIYmwsIK7JlquzGrjaQS7ssnemOGtsTvYw/640?wx_fmt=png "")  
  
360CERT  
https://cert.360.cn/  
  
进入官网查看更多资讯  
  
长按扫码关注我们  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Ic3Rgfdm96fDEiaYRAwzeORXyPTzIZEicJJ6oj5eUnvicLHzb45xcpgT8bhs83yg8VQjlRo8Av3jvfEv1NNMfHvRA/640 "微信公众号二维码.jpg")  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Ic3Rgfdm96fDEiaYRAwzeORXyPTzIZEicJLRf9N0If8jPYhCicZ5sao1dWa48hVm5xpUskBUnDMYmvTJHpsWTmBsw/640?wx_fmt=png "")  
  
点击在看，进行分享  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ic3Rgfdm96fDEiaYRAwzeORXyPTzIZEicJX2oU8HWWic5QdjaCkRHBK3anwULoleLibhW5SnibSGWCF1fjkYS5ia8JPg/640?wx_fmt=gif "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
