---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  PyTorch 严重漏洞可导致AI敏感数据被盗   
Ionut Arghire  代码卫士   2024-06-11 17:38  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**PyTorch 机器学习库中存在一个严重漏洞，可被用于远程代码执行。**  
  
该漏洞编号是CVE-2024-5480，影响PyTorch 的分布式框架RPC，产生的原因在于该框架在 RPC 操作中未验证所调用的函数。该框架用于分发式训练场景，攻击者可通过滥用内置 Python 函数，在多cpu RPC 通信过程中执行任意命令。  
  
NIST 发布安全公告指出，“该漏洞是因为工作节点序列化和向主节点发送 PythonUDF，之后反序列并在未验证情况下执行该函数，缺少函数调用限制引发的。”  
  
AI和机器学习的漏洞奖励平台 Huntr 解释称，当分布式 RPC 框架用于多 cpu RPC 通信时，工作节点可使用特定函数来序列化并将函数和tensor封装到 PythonUDF中，之后被发送给主节点。  
  
Huntr 解释称，“主节点反序列化收到的 PythonUDF 数据并调用 _run_ 函数，从而使工作节点执行该特定函数，但由于对函数调用不存在限制，因此可通过调用内置 Python 函数如 eval 的方式实现远程代码执行后果。”远程攻击者可利用该漏洞攻陷初始化分布式训练的主节点，导致与AI相关联的敏感数据被盗。  
  
该漏洞的CVSS评分为10分，在4月12日报送，影响 PyTorch 2.2.2及更早版本。该机器学习库的最新版本是2.3.1。报送该漏洞的研究员获得1500美元的漏洞奖励。  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[PyTorch 披露恶意依赖链攻陷事件](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515167&idx=1&sn=24c07a386819db63dc889fa9bfe7b382&chksm=ea948d75dde304635dd31a7b3deeb1ff296b25b6ac462e35546afa8779e3ff455b3cd475dff4&scene=21#wechat_redirect)  
  
  
[AI Python 包中存在缺陷 “Llama Drama” ，威胁软件供应链](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519566&idx=1&sn=991956bfd062dfe52e9fe722b821d358&chksm=ea94bc24dde335320179ca3ef8f51d217570e92946c74792f58bd0cc3104290b3db59cfa67fc&scene=21#wechat_redirect)  
  
  
[Python URL 解析漏洞可导致命令执行攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247517374&idx=2&sn=6d9a155300780ffb8b966b2bbc21d887&chksm=ea94b5d4dde33cc296b93b32e5cd32ac9615348457175affa0556a82c0a3015f42839582329b&scene=21#wechat_redirect)  
  
  
[恶意 PyPI 包通过编译后的 Python 代码绕过检测](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516649&idx=4&sn=f367f72fbebdff5d48ad087be1a03b77&chksm=ea94b083dde339955d97f7ee0185de146bffb9aebcd533221e32cc770bb884036c61712f4f08&scene=21#wechat_redirect)  
  
  
[Python 开发人员提醒：PyPI 木马包假冒流行库发动攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515700&idx=2&sn=28c134528939223ed316b6f5b450dcd6&chksm=ea948f5edde306489a6bb564bbb5995de242208d44ab2dde95fce873e09f15d1fc295584cb61&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.securityweek.com/critical-pytorch-vulnerability-can-lead-to-sensitive-ai-data-theft/  
  
  
题图：  
Pexels  
 License  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
