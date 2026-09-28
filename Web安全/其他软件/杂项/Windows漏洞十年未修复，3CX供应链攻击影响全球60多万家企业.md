---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Windows漏洞十年未修复，3CX供应链攻击影响全球60多万家企业   
Lawrence Abrams  代码卫士   2023-04-03 16:53  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
****  
**已存在十年之久的Windows 漏洞 (CVE-2013-3900) 遭利用，导致可执行文件看似获得合法签名。这么多年来，微软发布的修复方案仍然是“opt-in”状态。更糟糕的是，升级至 Windows 11后，该修复方案被删除。**  
  
  
  
**0****1**  
  
**Opt-in 更新模式**  
  
  
由于发布快速更新和推送新变化的计划可能会引发与商业软件的兼容性问题，因此微软为Windows 10 提供三种访问更新的方式，“Opt-in”、“Lock-down”和“In-between”（“选择性加入”、“锁定”和“介于两者之间”）。Opt-in 模式针对的是家庭用户，当微软发布更新时，用户可快速获得更新。不过微软需要获得用户的同意，才能为用户推出新特性、修复方案、安全补丁和OS更新；Lock-down 模式为关键任务环境设置如企业，仅限于定期推送安全更新和修复方案，并不推送新特性，防止与企业配置出现兼容性问题；“In-between” 为非任务关键的系统设计，需要在不中断业务流的情况下获得最新创新。  
  
上周三晚，新闻报道称VoIP 通信公司 3CX 受陷，被用于在大规模供应链攻击中分发木马版本的 Windows 桌面应用3CX Phone System。该应用所使用的两个DLL 被恶意版本取代，将其它恶意软件下载到计算机如信息窃取木马等。其中一个恶意DLL 是由微软签名的合法 DLL，名为 “d3dcompiler_47.dll”。然而，攻击者修改了该DLL，在文件末尾包含了加密的恶意payload。即使该文件已遭修改，但微软仍将其显示为正确签名的文件。  
  
对可执行文件如DLL或EXE文件进行代码签名，意味着向Windows 用户保证文件是真实的，并未被修改为包含恶意代码的文件。当已签名的可执行文件被修改时，Windows 会展示一条信息说明“该对象的数字化签名未经验证”。然而，即使我们知道 d3dcompiler_47.dll DLL 已遭修改但仍然在 Windows 中显示已签名。  
  
ANALYGENCE 公司的高级漏洞分析师 Will Dormann 指出，该DLL 利用的是CVE-201303900，它是一个“WinVerifyTrust 签名验证漏洞”。微软在2013年12月10日首次披露该漏洞并解释称，很可能在已签名可执行文件中向 EXE 的认证签名部分（WIN_CERTIFICATE 结构）增加内容，且无需验证签名。Dormann 解释称，谷歌Chrome 安装程序将数据添加到认证码结构中，判断用户是否选择“向谷歌发送使用统计和崩溃报告”。安装Chrome 后，它会查看该数据的认证码签名，判断是否应当启用诊断报告。  
  
  
**0****2**  
  
**CVE-2013-3900 补丁需手动启用**  
  
  
微软最终选择将该修复方案设为可选项，可能是因为它会将将数据存储在可执行文件签名块中的、合法的已签名可执行文件判定为无效。  
  
微软在披露CVE-2013-3900 时解释称，“2013年12月10日，微软为所有受支持的 Windows 发布了更新，修改了如何对以 Windows 验证码签名格式签名的二进制进行签名验证。这一变更可在opt-in 基础上启动。启动后，Windows 验证码签名验证的新行为将不再允许 WIN_CERTIFICATE 结构中存在无关信息，而 Windows 将不再将不合规二进制视作已签名。”  
  
近十年后，该漏洞已被无数威胁行动者所用。而该漏洞的修复方案仍然只能在手动编辑 Windows Registry 的情况下才能启用。要启用该修复方案，则64位系统的Windows 用户可做出如下 Registry 变更：  
  
```
Windows Registry Editor Version 5.00 
[HKEY_LOCAL_MACHINE\Software\Microsoft\Cryptography\Wintrust\Config]  
"EnableCertPaddingCheck"="1"
[HKEY_LOCAL_MACHINE\Software\Wow6432Node\Microsoft\Cryptography\Wintrust\Config]
"EnableCertPaddingCheck"="1"
```  
  
  
启用 Registry 密钥后，可以发现微软对 3CX 供应链攻击中所使用的恶意 d3dcompiler_47.dll DLL中的签名如何验证。更糟糕的是，即使添加 Registry 密钥应用该修复方案，一旦升级至 Windows 11，则修复方案被删除即设备再次是易遭攻击状态。  
  
  
**0****3**  
  
**亟需修复**  
  
  
鉴于CVE-2013-3900 已用于攻击活动如 3CX 供应链攻击事件和 Zloader 恶意软件传播中，很显然该漏洞应当得到修复，即使会给开发人员带来不便。遗憾的是，大多数人仍然不了解该漏洞，而且将会查看恶意文件并认为有了微软的报告它是可信的。  
  
Dormann提醒称，“但是如果修复方案是可选的，那么大众不会得到保护。”本文记者启用了该可选的修复方案，发现使用正常，不会产生任何严重问题。虽然这样做可能会给Chrome 等带来一些问题如不会显示已签名，但所增加的防护措施的好处大过不便之处。  
  
微软尚未就该漏洞持续遭利用以及将漏洞修复方案设定为“可选”的情况置评。  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/oBANLWYScMQZeSribxs2yU1w56EMvgX9cDBCiabniazxdxtQ25cBCAd5vBJIM2sOv1khjzwwViaT0pS74U6piaiauiaGA/640?wx_fmt=png "")  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMTBzmfDJA6rWkgzD5KIKNibpR0szmPaeuu4BibnJiaQzxBpaRMwb8icKTeZVEuWREJwacZm3wElt7vOtQ/640?wx_fmt=jpeg "")  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511052&idx=3&sn=fb116392e405ae62e6c339117fffdb59&chksm=ea949d66dde31470758b6ee8f9dbecdb67ef6c0c8af277f26b83b60dbac95748d28db787a4b4&scene=21#wechat_redirect)  
[奇安信入选全球《软件成分分析全景图》代表厂商](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515374&idx=1&sn=8b491039bc40f1e5d4e1b29d8c95f9e7&chksm=ea948d84dde30492f8a6c9953f69dbed1f483b6bc9b4480cab641fbc69459d46bab41cdc4859&scene=21#wechat_redirect)  
  
  
[黑客利用 3CX 木马版桌面 app 发动供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247516096&idx=2&sn=e116004fbe089b4c4c2973cc6475b5ba&chksm=ea948eaadde307bcf9b88592627fc5ebcd68cade9ac4ccba9b66e8c0c2f74b16c35ef652bf36&scene=21#wechat_redirect)  
  
  
[在线阅读版：《2022中国软件供应链安全分析报告》全文](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513174&idx=1&sn=e474d1ea23ed7cce10e2ae2f872fc003&chksm=ea94853cdde30c2a963cfa00a536764ea55cdee7ba6ef4a7716a28f82a97ca630dc271ee5224&scene=21#wechat_redirect)  
  
  
[在线阅读版：《2021中国软件供应链安全分析报告》全文](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247505380&idx=1&sn=01d2f5af200abc6bb20411ee8f17b6b5&chksm=ea94e48edde36d98f20b66aecf9f359e49226b411872bcea527fcca0a5de018f407415313800&scene=21#wechat_redirect)  
  
  
[供应链安全这件事，早就被朱元璋玩明白了](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515824&idx=1&sn=dab68a0c49b4d79f50b5c765c3bc2d89&chksm=ea948fdadde306cc2de185ca934b6c63d6e2e02e141f4612180b48e2c4ef56ec4da8bb826dd1&scene=21#wechat_redirect)  
  
  
[第三方app受陷，Atlassian 数据被盗](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515624&idx=3&sn=67fc0501190042defabcc173a6eb618f&chksm=ea948c82dde30594c6d827c3f9a2ec0f74bc3ac9f01de20c08188c4f469b2a74cbf9381d0a01&scene=21#wechat_redirect)  
  
  
[奇安信总裁吴云坤：构建四大关键能力 体系化治理软件供应链安全](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515606&idx=1&sn=be020e0c8715a3f3b2c31a379ca01e0d&chksm=ea948cbcdde305aab8950259a837c775cd6fb12d0db8801e92776fcae41529ce655f3a18ff6c&scene=21#wechat_redirect)  
  
  
[几乎所有企业都与受陷第三方之间存在关联](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515478&idx=1&sn=759fe4b09a25bbfa2b215044d8c0ebbc&chksm=ea948c3cdde3052aabad27c5aebc6c4f97bc84d8ab2bb490162e86c1848b9c8ac80b8dd56327&scene=21#wechat_redirect)  
  
  
[热门开源Dompdf PHP 库中存在严重漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515460&idx=2&sn=6ff90ed5a1a5cfe857a4aa75a16def08&chksm=ea948c2edde305386563b822262353daa67aecbbe719fdcbf7b97f402220ee247091ea7aeac0&scene=21#wechat_redirect)  
  
  
[命令注入漏洞可导致思科设备遭接管，引发供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515439&idx=1&sn=bb8d8abcbaaf7e2be431ab9cd0712617&chksm=ea948c45dde30553179da977f93800b8c57d85c6185257361358931ab913191be82c3079d54c&scene=21#wechat_redirect)  
  
  
[命令注入漏洞可导致思科设备遭接管，引发供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515439&idx=1&sn=bb8d8abcbaaf7e2be431ab9cd0712617&chksm=ea948c45dde30553179da977f93800b8c57d85c6185257361358931ab913191be82c3079d54c&scene=21#wechat_redirect)  
  
  
[PyTorch 披露恶意依赖链攻陷事件](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247515167&idx=1&sn=24c07a386819db63dc889fa9bfe7b382&chksm=ea948d75dde304635dd31a7b3deeb1ff296b25b6ac462e35546afa8779e3ff455b3cd475dff4&scene=21#wechat_redirect)  
  
  
[速修复！这个严重的 Apache Struts RCE 漏洞补丁不完整](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511361&idx=1&sn=540cad65022d11423a868f977b4fe663&chksm=ea949c2bdde3153d70ed1c43058c67f7e846f30ea1d2f562389edf804ace5c6bf19621f5bf6e&scene=21#wechat_redirect)  
  
  
[Apache Cassandra 开源数据库软件修复高危RCE漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510538&idx=2&sn=1d92fa67b48167800ad01baa90c58cbd&chksm=ea949b60dde312765657b9d469ce2b1b6befbad085737df863891995b40982a6109939fb82b2&scene=21#wechat_redirect)  
  
  
[美国国土安全部：Log4j 漏洞的影响将持续十年或更久](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512944&idx=1&sn=003f4935476be99ce0be8caa3fe086fe&chksm=ea94821adde30b0c5b96de8d9948d479b7a6f59ff1ba75271057b28e17faa26b43c701a5f1fe&scene=21#wechat_redirect)  
  
  
[Apache Log4j任意代码执行漏洞安全风险通告第三次更新](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509646&idx=1&sn=34bc8208994380969cd89045067150b7&chksm=ea9497e4dde31ef2991a59f30171df1f69368c1951483d97f3de41d81a5717bb03e234491f5d&scene=21#wechat_redirect)  
  
  
[PHP包管理器Composer组件 Packagist中存在漏洞，可导致软件供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514137&idx=1&sn=347691413dc7ecfc2a2dedd365115329&chksm=ea948973dde3006553ae4c52ee22cd9f9c1eb480c80a59e78eaf25d9f9c974ed002d8e053488&scene=21#wechat_redirect)  
  
  
[LofyGang 组织利用200个恶意NPM包投毒开源软件](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514172&idx=1&sn=271b12e7a37da40fb7ddc58a30cf4135&chksm=ea948956dde300402d1d9ef54ea22519931efbfc852b82816c893892b876166c39063af581fc&scene=21#wechat_redirect)  
  
  
[软件和应用安全的六大金科玉律](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514145&idx=1&sn=639a349a140d429c996a51949fec0a92&chksm=ea94894bdde3005d6eeb0e37e7a3f81c6518bdce555fd5d9fff4418c5b305e17c5fb7916cb58&scene=21#wechat_redirect)  
  
  
[美国政府发布关于“通过软件安全开发实践增强软件供应链安全”的备忘录（全文）](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514050&idx=1&sn=14f44208b38382e14a3f4562615bedb5&chksm=ea9486a8dde30fbe2b0ef3231a0a73e44579f710c6bede1cd4eb563d0545476d5ef3607ea39d&scene=21#wechat_redirect)  
  
  
[OpenSSF发布4份开源软件安全指南，涉及使用、开发、漏洞报告和包管理等环节](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514034&idx=1&sn=51f02a3110acce0dbd53196876ef1fad&chksm=ea9486d8dde30fce4995e5734ad507e889b4c58c0d3ff8d777f66119f2d5fb3f1c7d0e064726&scene=21#wechat_redirect)  
  
  
[美国政府发布联邦机构软件安全法规要求，进一步提振IT供应链安全](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513979&idx=1&sn=66625cf062357864cf86053f868d8bb7&chksm=ea948611dde30f0758522e7694b72c9f1abdcbf9c7de8eece909dcdf444e2ce7cf19d357db91&scene=21#wechat_redirect)  
  
  
[美国软件供应链安全行动中的科技巨头们](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513936&idx=1&sn=ffd61a99532c853e13587e17ccb3e9a1&chksm=ea94863adde30f2cbc1141ebad6ae15d7b5ec09ee3c8337db26c9bda2b26c2914cdde4757ffb&scene=21#wechat_redirect)  
  
  
[Apache开源项目 Xalan-J 整数截断可导致任意代码执行](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513963&idx=4&sn=8f7f84190a33593bda1e3d6c86470af6&chksm=ea948601dde30f178f02bdcc42ac15f052526722f31417ec3cc51f2b92cde6a84be7894c8fe8&scene=21#wechat_redirect)  
  
  
[谷歌推出开源软件漏洞奖励计划，提振软件供应链安全](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513721&idx=1&sn=9ccc0511cb8d6c7134eb54700130f1b7&chksm=ea948713dde30e0503874ed6e5ebcd5a90933ef86048fd21466e73431420b799a861f800164a&scene=21#wechat_redirect)  
  
  
[黑客攻陷Okta发动供应链攻击，影响130多家组织机构](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513692&idx=2&sn=9edbf81f8e756e90d33627cdfe3796f3&chksm=ea948736dde30e20a3b8750b3189dd23d0baf268f08e98448ec6421a9d7649d3cfc08f11f960&scene=21#wechat_redirect)  
  
  
[Linux和谷歌联合推出安全开源奖励计划，最高奖励1万美元或更多](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513617&idx=2&sn=4f50589d2631ebc4ee55cbbb21d52fbd&chksm=ea94877bdde30e6db6623e64b233c7a81ddcaa9a50d7211c608a26c1e48cf51a1ee2101991d5&scene=21#wechat_redirect)  
  
  
[开源web应用中存在三个XSS漏洞，可导致系统遭攻陷](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513307&idx=2&sn=4a99112b9efeb2e33add05f94b1dd1d5&chksm=ea9485b1dde30ca77b26b217f677ed8a3be57d9c8750d39780781015e46520db5185da5bd1dc&scene=21#wechat_redirect)  
  
  
[开源软件 LibreOffice 修复多个与宏、密码等相关的漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247513283&idx=1&sn=5fbd02e0f95926cab449829326e0a8a1&chksm=ea9485a9dde30cbf0fb5e64dcbabdcbc1486306bbf9305df01d0f12022f30b84421fe09b167c&scene=21#wechat_redirect)  
  
  
[Juniper Networks修复200多个第三方组件漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512960&idx=1&sn=0df41cf06e3efd8089ec6d6d6b03fc20&chksm=ea9482eadde30bfc407cd490459c7c947bbf2496475946f0379eb8e76c8f4e47f2063742ef87&scene=21#wechat_redirect)  
  
  
[美国国土安全部：Log4j 漏洞的影响将持续十年或更久](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512944&idx=1&sn=003f4935476be99ce0be8caa3fe086fe&chksm=ea94821adde30b0c5b96de8d9948d479b7a6f59ff1ba75271057b28e17faa26b43c701a5f1fe&scene=21#wechat_redirect)  
  
  
[美国国土安全部：Log4j 漏洞的影响将持续十年或更久](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512944&idx=1&sn=003f4935476be99ce0be8caa3fe086fe&chksm=ea94821adde30b0c5b96de8d9948d479b7a6f59ff1ba75271057b28e17faa26b43c701a5f1fe&scene=21#wechat_redirect)  
  
  
[PyPI 仓库中的恶意Python包将被盗AWS密钥发送至不安全的站点](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512575&idx=2&sn=5af81a53d9263bf10273d86868a77287&chksm=ea948095dde309830949a85914d18a896ce49535f37a9c0cf802e2d84d4dbf264c0e5795396b&scene=21#wechat_redirect)  
  
  
[开源项目 Parse Server 出现严重漏洞，影响苹果 Game Center](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512551&idx=1&sn=a3dc5a12724c0b9b230eedf1455dbf23&chksm=ea94808ddde3099bc99f14a224f4836cc7d9419f056f982dd29238ebf945806f58f2989225bc&scene=21#wechat_redirect)  
  
  
[奇安信开源软件供应链安全技术应用方案获2022数博会“新技术”奖](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512040&idx=1&sn=7cd8e2d87f73fab31fc52af90d624ccf&chksm=ea949e82dde317940861a08ced505fe54d9a3e5d934a86a09dc887e15908238e3a609484d10c&scene=21#wechat_redirect)  
  
  
[更好的 DevSecOps，更安全的应用](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247512117&idx=1&sn=32655307539ef8522fa24a7d2502d01f&chksm=ea94815fdde308499c5c044faf131b08b309d1c267dd6b415b5c54d11005756b529ba706f69f&scene=21#wechat_redirect)  
  
  
[他坦白：只是为了研究才劫持流行库的，你信吗？](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511979&idx=1&sn=164ff5ec89fd03cda38673265b221387&chksm=ea949ec1dde317d7050e3abf65a553e3eb4a79f340f96a855b1216fb701369571633486c77dc&scene=21#wechat_redirect)  
  
  
[热门PyPI 包 “ctx” 和 PHP库 “phpass” 长时间未更新遭劫持，用于窃取AWS密钥](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511966&idx=1&sn=77856cc7ec3f5318efb4f18f2a8ddf66&chksm=ea949ef4dde317e2a06b85bfc4ca7d162951708a197fc45a2b94119ddf30e4457c29386705b2&scene=21#wechat_redirect)  
  
  
[从美行政令看软件供应链安全标准体系的构建](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511927&idx=1&sn=953d790ade7a71afee797bc7ed43dc35&chksm=ea949e1ddde3170b29457b8585069b9df881b7507c45e86ddea00fb1a40eba450b168859919b&scene=21#wechat_redirect)  
  
  
[研究员发现针对 GitLab CI 管道的供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511856&idx=1&sn=2acd2eea52dbebe4bca68fd809ab6228&chksm=ea949e5adde3174cfe60fe0e7e66edaca3bc5a90c6d0461a24822d9780d5d48ecdaaf37483b9&scene=21#wechat_redirect)  
  
  
[五眼联盟：管理服务提供商遭受的供应链攻击不断增多](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511780&idx=1&sn=85242245892a794cdb029ebcb6084ebd&chksm=ea949f8edde316983a3bc9b8018aab4e01c1f11761809c95a4fa8942f52e37aad4c9ca6e6425&scene=21#wechat_redirect)  
  
  
[趁机买走热门包唯一维护人员的邮件域名，我差点发动npm 软件供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511765&idx=1&sn=76f935a93e47172f2d372204f9522ae9&chksm=ea949fbfdde316a99025029bc98752c1054bdefb7102d178d7390ea36c5753abd5fcefd1c778&scene=21#wechat_redirect)  
  
  
[RubyGems 包管理器中存在严重的 Gems 接管漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511738&idx=1&sn=3e4c8ab0a54ec620b25047d6fd043b3e&chksm=ea949fd0dde316c6a3cb31463162bcb530954e1a1d222552dd508d94d71fa7285660dda4c0a7&scene=21#wechat_redirect)  
  
  
[美国商务部机构建议这样生成软件供应链 “身份证”](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511687&idx=1&sn=af6f8d4dfc96210b908ef9d6ed040c8e&chksm=ea949feddde316fbb10ddba192a450209a47367c10b3686acd19c92afecfa0a9c2e613e47293&scene=21#wechat_redirect)  
  
  
[《软件供应商手册：SBOM的生成和提供》解读](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511570&idx=1&sn=a8eda02cab19a290202dd91895bd3887&chksm=ea949f78dde3166e104a4d6a2c2c9e1b32d673f6589993a2f2bfb94740bdc6cdc0088dc8c273&scene=21#wechat_redirect)  
  
  
[和GitHub 打官司？热门包 SheetJS出走npmjs.com转向自有CDN](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511687&idx=2&sn=0b3fd53e3b085781c93163b1b927c5b1&chksm=ea949feddde316fb18ee3f415d989562fe86faa7a2c05bfb3ab682e61b814b83ff19eb822d11&scene=21#wechat_redirect)  
  
  
[不满当免费劳力，NPM 热门库 “colors” 和 “faker” 的作者设无限循环](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510002&idx=2&sn=492337bcce98caf9a798668daead3455&chksm=ea949698dde31f8efb3c1cb348ee18baf80e58f8f32c784a36e1dbd3e9a0fef31da331c6ab66&scene=21#wechat_redirect)  
  
  
[NPM流行包再起波澜：维护人员对俄罗斯用户发特定消息，谁来保证开源可信？](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511319&idx=1&sn=32793c16c49075815d576cedb430aeb9&chksm=ea949c7ddde3156b7932ea3ffe524fdcbd627b2fe2f5e2280b0c48572b3342ef0f74816b061a&scene=21#wechat_redirect)  
  
  
[NPM逻辑缺陷可用于分发恶意包，触发供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511591&idx=2&sn=1470278e177fc2e94f3009ae19cf57ec&chksm=ea949f4ddde3165b87f25e82eedbf8512850d2c12733e0a849077205bd8792222cb823ccaa84&scene=21#wechat_redirect)  
  
  
[攻击者“完全自动化”发动NPM供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511136&idx=2&sn=1666a56e727766fd72254b952d54ac89&chksm=ea949d0adde3141cd8b544edd6d6df0ee40223df74f7d3753ce9dc03ab805137e120e9482d2b&scene=21#wechat_redirect)  
  
  
[200多个恶意NPM程序包针对Azure 开发人员，发动供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511070&idx=3&sn=a1f87fa84198504a6fd9c1d6d258152f&chksm=ea949d74dde314621963b38e7e1cb232355f633eff9cdb3e6d6989e764ee387af86886c7a87f&scene=21#wechat_redirect)  
  
  
[哪些NPM仓库更易遭供应链攻击？研究员给出了预测指标](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510703&idx=1&sn=3cfe50178ae4fc133d86d53cdf27ec34&chksm=ea949bc5dde312d33eea8144db0c86d205bb53946e32ccdaa0842301a6db67a507ecfd1e5a8b&scene=21#wechat_redirect)  
  
  
[NPM 修复两个严重漏洞但无法确认是否已遭在野利用，可触发开源软件供应链攻击](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247509251&idx=1&sn=18a72840cc335f31607d951fc709adf2&chksm=ea949469dde31d7ffe9cb65887f88996ecb8c4da6e4633db84b631269165179ac99fdf8e02c3&scene=21#wechat_redirect)  
  
  
[热门NPM库 “coa” 和“rc” 接连遭劫持，影响全球的 React 管道](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247508946&idx=1&sn=273c58d08a4225306a567cf6a150f40c&chksm=ea9492b8dde31bae31069b432c9e45390f85fe7879335bbd011431cab3fdc0ac9e2efda1af9c&scene=21#wechat_redirect)  
  
  
[速修复！热门npm 库 netmask 被曝严重的软件供应链漏洞，已存在9年](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247502778&idx=1&sn=5ad11d4289635b5d7f945c54cb2129f7&chksm=ea94fad0dde373c66f5c2024246f5c824cac549ac3dcfd85cc67fb238dabca34d7316fef9f65&scene=21#wechat_redirect)  
  
  
[25个恶意JavaScript 库通过NPM官方包仓库分发](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510675&idx=2&sn=a778ae74ffe2f1095ab0f758f7879a3b&chksm=ea949bf9dde312ef3baf0b0e2c892753ec74baa207331ff330547e90e5da4480464074b60f93&scene=21#wechat_redirect)  
  
  
[Pwn2Own大赛回顾：利用开源服务中的严重漏洞，攻陷西部数据My Cloud PR4100](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511095&idx=1&sn=e1f0122f82889cda652d6febbba2879c&chksm=ea949d5ddde3144b2fb52dbbfc2b76961538c21d7e9adc3e02bc2a3b4fb6d592755c393b2cf6&scene=21#wechat_redirect)  
  
  
[开源网站内容管理系统Micorweber存在XSS漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511095&idx=3&sn=adbaf85a2b52fa28271d8650cc9f5e3a&chksm=ea949d5ddde3144b570cbe1d529895ae54cb07f1f1db4b3f8eb26622905360a3b6aa62e5c2b5&scene=21#wechat_redirect)  
  
  
[热门开源后端软件Parse Server中存在严重的 RCE ，CVSS评分10分](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510991&idx=2&sn=1396eb76de81d7c7c1a252c7028381fe&chksm=ea949aa5dde313b398c64c3399132d91861cd3ec85bc341afbcfc8899e6d3818f2c52bb846db&scene=21#wechat_redirect)  
  
  
[开源组件11年未更新，严重漏洞使数百万安卓按设备易遭远程监控](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511504&idx=2&sn=04504363458ec7eae8089dbfb498d827&chksm=ea949cbadde315ac5c9bd2f40a6f192b3250198f157ae151d9aa59e0f29ce6b3f21dd2118763&scene=21#wechat_redirect)  
  
  
[开源工具 PrivateBin 修复XSS 漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247511433&idx=3&sn=ff04084cd337034fbdf95f2eb572c65a&chksm=ea949ce3dde315f54aac997e6b2fa73ed091ef780a4381e169502f00c9227d9bc2518f543d05&scene=21#wechat_redirect)  
  
  
[奇安信开源组件安全治理解决方案——开源卫士](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247510243&idx=1&sn=5c1b121cfec855804ee3cca0e672f224&chksm=ea949989dde3109ff44630e253129af120586e9408978956528390758d833e1bc1d4d2388d7c&scene=21#wechat_redirect)  
  
  
  
  
**原文链接**  
  
https://www.bleepingcomputer.com/news/microsoft/10-year-old-windows-bug-with-opt-in-fix-exploited-in-3cx-attack/  
  
https:  
//www.itprotoday.com/windows-10/windows-10-release-preview-channel-build-tracker  
  
  
题图：Pixabay License  
  
  
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
