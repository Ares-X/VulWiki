---
cve: "CVE-2025-2857"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Mozilla Firefox 沙箱逃逸漏洞(CVE-2025-2857)   
深瞳漏洞实验室  深信服千里目安全技术中心   2025-03-28 15:39  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5y4tj0PtTFLiaf1U6CeVJqNcYicnVf3w502WIj21LwyI4oz8QB9xIunrOcEEiakJL1fSt09K8hQxmtkg/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Mozilla Firefox 沙箱逃逸漏洞(CVE-2025-2857)  
  
**组件名称：**  
  
Mozilla Firefox  
**影响范围：**  
  
Firefox < 136.0.4  
  
Firefox ESR < 115.21.1  
  
Firefox ESR < 128.8.1  
  
**漏洞类型：**  
  
沙箱逃逸  
  
**利用条件：**  
  
1、用户认证：不需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：容易，无需授权即可造成远程代码执行。  
  
<综合评定威胁等级>：高危，能导致远程代码执行。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5y4tj0PtTFLiaf1U6CeVJqNcWSpNrC2t2dNXXBe1ib7vfb7BqL7mHAwBDVpSQLhUMdGXsdibmabQicOtA/640?wx_fmt=gif&from=appmsg "")  
  
组件介绍  
  
Mozilla Firefox，是一个由Mozilla开发的自由及开放源代码的网页浏览器。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5y4tj0PtTFLiaf1U6CeVJqNcWSpNrC2t2dNXXBe1ib7vfb7BqL7mHAwBDVpSQLhUMdGXsdibmabQicOtA/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
2025年3月28日，深瞳漏洞实验室监测到一则Mozilla-firefox组件存在沙箱逃逸漏洞的信息，漏洞编号：CVE-2025-2857，漏洞威胁等级：严重。  
  
该漏洞与CVE-2025-2857原理类似，也源于句柄管理不善，无意中授予了无权限子进程的高级访问权限，使它们能够逃出浏览器沙箱并执行任意代码，导致服务器失陷。  
  
 该漏洞只影响Windows系统，其他系统不受影响。  
  
  
**影响范围**  
  
目前受影响的Mozilla-firefox版本：  
  
Firefox < 136.0.4  
  
Firefox ESR < 115.21.1  
  
Firefox ESR < 128.8.1  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5y4tj0PtTFLiaf1U6CeVJqNcWSpNrC2t2dNXXBe1ib7vfb7BqL7mHAwBDVpSQLhUMdGXsdibmabQicOtA/640?wx_fmt=gif&from=appmsg "")  
  
**如何检测组件系统版本**  
  
  
在浏览器中，依次点击设置——帮助——关于Firefox，查看当前版本号。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5y4tj0PtTFLiaf1U6CeVJqNcWSpNrC2t2dNXXBe1ib7vfb7BqL7mHAwBDVpSQLhUMdGXsdibmabQicOtA/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
官方已发布最新版本修复该漏洞，建议受影响的Windows客户将Firefox更新到以下版本：  
  
Firefox 136.0.4  
  
Firefox ESR 115.21.1  
  
Firefox ESR 128.8.1  
  
下载链接：https://www.firefox.com.cn/  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5y4tj0PtTFLiaf1U6CeVJqNcWSpNrC2t2dNXXBe1ib7vfb7BqL7mHAwBDVpSQLhUMdGXsdibmabQicOtA/640?wx_fmt=gif&from=appmsg "")  
  
**深信服解决方案**  
  
  
**风险资产发现**  
  
支持对Mozilla-firefox的主动检测，可批量检出业务场景中该事件的**受影响资产**  
情况，相关产品如下：  
  
**【深信服统一端点安全管理系统aES】**  
已发布资产检测方案，指纹ID:0000322。  
  
  
参考链接  
  
  
https://www.mozilla.org/en-US/security/advisories/mfsa2025-19/#CVE-2025-2857  
  
  
时间轴  
  
  
  
**2025/3/28**  
  
深瞳漏洞实验室监测到Mozilla Firefox 沙箱逃逸漏洞信息。  
  
  
**2025/3/28**  
  
深瞳漏洞实验室发布漏洞通告。  
  
  
点击**阅读原文**  
，及时关注并登录深信服**智安全平台**  
，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5y4tj0PtTFLiaf1U6CeVJqNcc6nibgROxSsFNGK0ABXMdd61DI8ia62EdeKIzgpr4zPx60MHlm7ycl0Q/640?wx_fmt=png&from=appmsg "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5y4tj0PtTFLiaf1U6CeVJqNceN6ia8jh5Kuf1MA4maJcqqjMN6EvRkzyXxoqvr1kINhNIico4ibt63UXA/640?wx_fmt=png&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
