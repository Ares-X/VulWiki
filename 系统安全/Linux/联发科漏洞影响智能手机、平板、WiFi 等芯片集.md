---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  联发科漏洞影响智能手机、平板、WiFi 等芯片集   
Guru Baran  代码卫士   2023-07-05 17:23  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！****  
  
**编译：代码卫士**  
  
**联发科在2023年7月产品安全公告中披露了24个漏洞，影响适用于智能手机、平板、AIoT、智能展示、OTT和 WiFi 的芯片集。其中，CVE-2023-20754和CVE-2023-20755被评级为“高危”漏洞。**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQwrJ1yUOO5At5u4pYVA56sgSJpM0AdvjicUicMJHCEfQ3bxc3w8DOKZLZe2fBu5ibS2EDYhLGUaleZw/640?wx_fmt=png "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQwrJ1yUOO5At5u4pYVA56sgSJpM0AdvjicUicMJHCEfQ3bxc3w8DOKZLZe2fBu5ibS2EDYhLGUaleZw/640?wx_fmt=png "")  
  
**高危漏洞**  
  
  
  
  
  
CVE-2023-20754是位于 keyinstall 中的整数溢出漏洞，可能会导致界外读后果。执行该攻击要求系统执行权限和本地提权，无需用户交互。受影响的芯片集包括：MT6580、MT6731、MT6735、MT6737、MT6739、MT6753、MT6757、MT6757C、MT6757CD、MT6757CH、MT6761、MT6762、MT6763、MT6765、MT6768、MT6769、MT6771、MT6779、MT6781、MT6785、MT6789、MT6833、MT6835、MT6853、MT6853T、MT6855、MT6873、MT6875、MT6877、MT6879、MT6883、MT6885、MT6886、MT6889、MT6891、MT6893、MT6895、MT6983、MT6985、MT8185、MT8321、MT8385、MT8666、MT8667、MT8765、MT8766、MT8768、MT8781、MT8786、MT8788、MT8789、MT8791、MT8791T和MT8797。受影响软件版本为安卓11.0、12.0和13.0。  
  
CVE-2023-20755是位于 keyinstall 中的输入验证不当漏洞，可能导致界外读，从而造成本地提权。利用该漏洞要求系统执行权限，无需用户交互。受影响芯片集包括：MT6580、MT6731、MT6735、MT6737、MT6739、MT6753、MT6757、MT6757C、MT6757CD、MT6757CH、MT6761、MT6762、MT6763、MT6765、MT6768、MT6769、MT6771、MT6779、MT6781、MT6785、MT6789、MT6833、MT6835、MT6853、MT6853T、MT6855、MT6873、MT6875、MT6877、MT6879、MT6883、MT6885、MT6886、MT6889、MT6891、MT6893、MT6895、MT6983、MT6985、MT8185、MT8321、MT8385、MT8666、MT8667、MT8765、MT8766、MT8768、MT8781、MT8786、MT8788、MT8789、MT8791、MT8791T和MT8797。受影响软件版本包括安卓11.0、12.0和13.0。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQwrJ1yUOO5At5u4pYVA56sgSJpM0AdvjicUicMJHCEfQ3bxc3w8DOKZLZe2fBu5ibS2EDYhLGUaleZw/640?wx_fmt=png "")  
  
**中危漏洞**  
  
  
  
  
  
如下漏洞为中危级别的漏洞：  
  
- CVE-2023-20753：界外写  
  
- CVE-2023-20756：整数溢出或回绕  
  
- CVE-2023-20757：cmdq中的输入验证不当漏洞  
  
- CVE-2023-20758：cmdq中的输入验证不当漏洞  
  
- CVE-2023-20759：cmdq中的输入验证不当漏洞  
  
- CVE-2023-20760：apu中的输入验证不当漏洞  
  
- CVE-2023-20761：ril中的输入验证不当漏洞  
  
- CVE-2023-20766：gps中的输入验证不当漏洞  
  
- CVE-2023-20767：pqframework中的输入验证不当漏洞  
  
- CVE-2023-20768：使用不兼容类型访问资源（“类型混淆”）  
  
- CVE-2023-20771：通过同步不当的共享资源导致并行执行（“条件竞争”）  
  
- CVE-2023-20772: 认证不当  
  
- CVE-2023-20773: 认证不当  
  
- CVE-2023-20774: 显示中的输入验证不当  
  
- CVE-2023-20775：在没有检查输入大小的情况下造成的缓冲区复制（“典型的缓冲区溢出”）  
  
- CVE-2023-20689：整数溢出导致的缓冲区溢出  
  
- CVE-2023-20690：整数溢出导致的缓冲区溢出  
  
- CVE-2023-20691：整数溢出导致的缓冲区溢出  
  
- CVE-2023-20692：空指针解引用  
  
- CVE-2023-20693：空指针解引用  
  
- CVE-2022-32666：关键信息的UI错误表达  
  
- CVE-2023-20748：输入验证不当  
  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[奇安信入选全球《静态应用安全测试全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516678&idx=1&sn=5b9e480c386161b1e105f9818b2a5a3d&chksm=ea94b36cdde33a7a05cafa9918733669252a02611c222b02bc6e66cbb508ee3fbf748453ee7a&scene=21#wechat_redirect)  
  
  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[联发科固件现窃听漏洞，影响全球约三分之一的手机和物联网设备](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509419&idx=2&sn=2f9d2960d52a795a5895a28287b29b59&chksm=ea9494c1dde31dd746b7adc04dff58cb689164d449cf30114b367a650a1bdd1c05242ba45a83&scene=21#wechat_redirect)  
  
  
[谷歌在三星Exynos 芯片集中发现18个0day漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515956&idx=1&sn=01fe340192b1659e658210ae4b02ac97&chksm=ea948e5edde30748775821e1c9ed1b389b2c0dd119e01cd78b9292d859542e3f209300000e4c&scene=21#wechat_redirect)  
  
  
[谷歌Titan M 芯片的这个严重漏洞，从1万跳涨到7.5万美元](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513590&idx=1&sn=ccdaf7e2571a6b7d793132cce9bcb946&chksm=ea94849cdde30d8a9cb16ff47d03cd027fa1f63b86f50c467697d8001e92ffce4cdf3c6ef030&scene=21#wechat_redirect)  
  
  
[无线共存：利用蓝牙和 WiFi 性能特性实现芯片间提权](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509867&idx=2&sn=19471663d9505977efc3cef7e3a39044&chksm=ea949601dde31f17f54444101a87df6a48f743a459bdb122596fc52ff8d133aea1d207ff3488&scene=21#wechat_redirect)  
  
  
[专门针对苹果 M1 芯片的首款恶意软件已现身](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247501541&idx=4&sn=08e8ba8b96b5ed05bb1f7454e6028e9a&chksm=ea94f78fdde37e99026dee83656a2ae8ce2d51c21b208b8f22f374d1026877327fbe5811535d&scene=21#wechat_redirect)  
  
  
[FPGA 芯片被曝严重的 Starbleed 漏洞，影响数据中心IoT工业设备等](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247492842&idx=2&sn=bae9f8d38a7ce5fe53d4ef555dfb1866&chksm=ea94d580dde35c9629f63a72f02188ca2d62751e54f0d07ee8a0fdd0cba1eeebf0dfa1c6898a&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
  
https://gbhackers.com/mediatek-security-flaws/  
  
  
题图：Pixabay License  
  
  
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
