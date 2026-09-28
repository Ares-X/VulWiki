---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  PyTorch安全模式被RCE漏洞攻破，恶意模型可执行任意代码  
 FreeBuf   2026-01-29 10:32  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/qq5rfBadR38jUokdlWSNlAjmEsO1rzv3srXShFRuTKBGDwkj4gvYy34iajd6zQiaKl77Wsy9mjC0xBCRg0YgDIWg/640?wx_fmt=gif "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/qq5rfBadR3ibvic9mib2trd1W0JGAJEHlF8rvCNwNbFuugBybo8QibCBJBAbLR7XO2c4qzWpHzw0F1N5jgoMs0ITWA/640?wx_fmt=jpeg "")  
  
  
作为现代深度学习和AI研究核心框架的PyTorch，其开发团队近日修复了一个高危漏洞（CVE-2026-24747，CVSS评分8.8）。该漏洞会破坏PyTorch最受安全关注的功能信任机制——即使启用专门设计的防护设置，攻击者仍能执行任意代码。  
  
  
**Part01**  
## 安全机制失效  
  
  
漏洞存在于weights_only=True反序列化器中，该机制本应确保仅安全加载模型数据而不执行代码。在Python AI领域，torch.load()函数是加载已保存模型检查点的标准工具。由于Python的pickle模块存在可执行任意指令的安全风险，PyTorch专门引入weights_only=True标志，承诺仅加载数据（权重）并阻断可执行代码。  
  
  
**Part02**  
## 漏洞技术细节  
  
  
安全研究人员发现该防护机制存在缺陷。官方公告指出："weights_only=True反序列化器未能正确验证pickle操作码和存储元数据"。从技术角度看，该漏洞属于内存损坏问题，最终可升级为代码执行。攻击者通过构造恶意检查点文件（.pth）可触发两种特定故障：  
  
- 堆内存损坏：对非字典类型应用SETITEM或SETITEMS操作码  
  
- 存储不匹配：在存档中创建"声明的元素数量与实际数据之间的存储大小不匹配"  
  
当用户加载这个被污染的文件时（误以为受限模式能确保安全），反序列化器将损坏内存，可能导致攻击者劫持受害者进程。  
  
  
**Part03**  
## 对AI供应链的影响  
  
  
该漏洞对AI供应链影响尤为严重，研究人员和工程师经常从Hugging Face或GitHub等公共存储库下载和测试模型检查点。公告警告称："能够诱使用户加载恶意检查点文件的攻击者，可在受害者进程上下文中实现任意代码执行。"  
  
  
**Part04**  
## 影响范围与修复方案  
  
  
该漏洞影响PyTorch 2.9.1及之前所有版本。PyTorch团队已在2.10.0版本中发布修复补丁，强烈建议开发者和数据科学家立即更新环境，确保其"安全"加载实践真正安全可靠。  
  
  
**参考来源：**  
  
Safety Broken: PyTorch “Safe” Mode Bypassed by Critical RCE Flaw  
  
https://securityonline.info/safety-broken-pytorch-safe-mode-bypassed-by-critical-rce-flaw/  
  
  
###   
###   
###   
  
**推荐阅读**  
  
[](https://mp.weixin.qq.com/s?__biz=MjM5NjA0NjgyMA==&mid=2651334591&idx=1&sn=7a53f598d945f86ed376200b93146133&scene=21#wechat_redirect)  
  
  
### 电台讨论  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/qq5rfBadR3ibvNluUKZ6RPy7h2fbYibRbLQDHPFqj89KkFsXBRibx5YTLiaTUfFOy9PKicps3l56iazUPNQrwdhkZ7jA/640?wx_fmt=png&from=appmsg "")  
  
****  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
