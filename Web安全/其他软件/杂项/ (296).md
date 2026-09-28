---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【安全圈】“微软修复 Windows Hello 欺骗漏洞：黑暗中人脸识别功能被禁用”  
 安全圈   2025-06-17 11:00  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGylgOvEXHviaXu1fO2nLov9bZ055v7s8F6w1DD1I0bx2h3zaOx0Mibd5CngBwwj2nTeEbupw7xpBsx27Q/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  
  
**关键词**  
  
  
  
Windows  
  
  
2025年4月，微软发布了一项关于 Windows Hello 的重要安全通告，修复了编号为 CVE-2025-26644 的“欺骗”类漏洞。该漏洞被南洋理工大学的研究人员披露，核心问题在于 Windows Hello 的人脸识别机制在处理“对抗性输入扰动”时存在不足，攻击者有可能借助伪造图像在本地环境中绕过身份验证。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/aBHpjnrGyliaYlamicbH6OGokianaWfkMtdNtiaIu3yDECE8Vf5K7GeyJosoTAR06jpdcYtyGLTEeicwY7N1ibibQzVqQ/640?wx_fmt=png&from=appmsg "")  
  
此漏洞被评为“重要”级别，攻击复杂度较高、无需权限、无需用户交互，但攻击仅限于本地执行。目前尚无公开利用，也未发现已被攻击的案例。微软为此发布了修复补丁，并对 Windows Hello 的运行机制进行了关键性调整：系统现在要求“红外传感器与普通摄像头”联合工作，才能完成人脸认证。  
  
调整的直接后果是：在黑暗环境下，Windows Hello 将无法再完成人脸识别登录。此前，Windows Hello 可单独依赖红外（IR）传感器进行 3D 面部扫描，即使在无光环境下也能顺利识别用户。但由于现在要求摄像头也必须“识别到面部”，而摄像头在暗光下无法有效成像，因此导致用户在夜间、背光、或光线不足的环境中无法通过人脸识别登录系统。  
  
这种变化并非系统错误，而是微软出于增强安全性的主动决策。微软认为，虽然用户在便利性上有所牺牲，但在当前日益严峻的网络安全环境下，加强身份验证机制是必须做出的权衡。  
  
一些用户已发现一种“变通办法”：通过设备管理器禁用网络摄像头，使系统只能调用红外传感器，从而在黑暗环境中恢复旧版识别方式。不过这种做法将影响其他应用程序使用摄像头（如 Teams、Zoom、录制视频等），因此并不推荐作为长期解决方案。  
  
微软指出，该问题源于 Windows Hello 识别模型在面对人工构造的图像扰动时缺乏有效检测能力。攻击者可能构造精心设计的“面部模型”诱骗系统，完成未经授权的登录。为避免此类风险，微软决定强制要求可见光参与识别，从而提升整体安全性。  
  
此次更新影响范围广泛，涵盖 Windows 10 1809 至 22H2、Windows 11 所有版本及 Windows Server 多个版本。凡在 2025 年 4 月之后安装官方安全更新的系统，均受到此新策略约束。  
  
人脸识别本质上属于“无接触式生物特征认证”，在提升便利性的同时，也引入了新型风险。CVE-2025-26644 的披露及应对，提醒用户与厂商必须持续关注 AI 模型在现实攻击场景下的鲁棒性问题。未来，微软或将改进识别模型，对“对抗性扰动”增强检测与过滤能力，从而实现安全性与可用性的重新平衡。  
  
在此之前，用户可选择使用指纹识别、PIN 码或物理安全密钥等替代方案，确保系统在各种环境下均具备可靠的身份验证能力。对于依赖人脸识别作为主要登录方式的组织，应在内部告知员工此项变更，并评估其对工作效率与用户体验的具体影响，制定相应的过渡方案或支持措施。  
  
Windows Hello 的此次调整，不仅是对一个具体漏洞的修复，更是生物识别技术安全实践中的一次重要转折。  
  
  
  END    
  
  
阅读推荐  
  
  
[【安全圈】Windows SMB客户端提权漏洞（CVE-2025-33073）及其在未启用SMB签名环境中的攻击原理](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652070197&idx=1&sn=2ea19a473759ade49d28c33654512b51&scene=21#wechat_redirect)  
  
  
  
[【安全圈】全球超4万摄像头“裸奔”，美国家庭隐私首当其冲](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652070197&idx=2&sn=7e5d70ffd124440138090e721143d413&scene=21#wechat_redirect)  
  
  
  
[【安全圈】Discord邀请链接被劫持：AsyncRAT与Skuld木马悄然窃取加密资产](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652070197&idx=3&sn=f2b22042bcb80b88f3dd4f8a59e482c1&scene=21#wechat_redirect)  
  
  
  
[【安全圈】起亚厄瓜多尔车型钥匙系统存在严重漏洞，数千辆车面临被盗风险](https://mp.weixin.qq.com/s?__biz=MzIzMzE4NDU1OQ==&mid=2652070197&idx=4&sn=ec2e30a1b4bdbaba363c267c6b615863&scene=21#wechat_redirect)  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEft6M27yliapIdNjlcdMaZ4UR4XxnQprGlCg8NH2Hz5Oib5aPIOiaqUicDQ/640?wx_fmt=gif "")  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEDQIyPYpjfp0XDaaKjeaU6YdFae1iagIvFmFb4djeiahnUy2jBnxkMbaw/640?wx_fmt=png "")  
  
**安全圈**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCEft6M27yliapIdNjlcdMaZ4UR4XxnQprGlCg8NH2Hz5Oib5aPIOiaqUicDQ/640?wx_fmt=gif "")  
  
  
←扫码关注我们  
  
**网罗圈内热点 专注网络安全**  
  
**实时资讯一手掌握！**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCE3vpzhuku5s1qibibQjHnY68iciaIGB4zYw1Zbl05GQ3H4hadeLdBpQ9wEA/640?wx_fmt=gif "")  
  
**好看你就分享 有用就点个赞**  
  
**支持「****安全圈」就点个三连吧！**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/aBHpjnrGylgeVsVlL5y1RPJfUdozNyCE3vpzhuku5s1qibibQjHnY68iciaIGB4zYw1Zbl05GQ3H4hadeLdBpQ9wEA/640?wx_fmt=gif "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
