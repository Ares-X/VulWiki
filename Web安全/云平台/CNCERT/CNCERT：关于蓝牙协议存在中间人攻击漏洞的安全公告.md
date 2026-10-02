---
cve: "CVE-2023-24023"
source: "gelusus/wxvl 公众号漏洞文库"
title: "CNCERT：关于蓝牙协议存在中间人攻击漏洞的安全公告"
product: "Bluetooth BR/EDR"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2023-24023"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-33cba06c67dfe17d618dbdcf"
entity_id: "ve-33cba06c67dfe17d618dbdcf"
schema_version: "1"
---

# CNCERT：关于蓝牙协议存在中间人攻击漏洞的安全公告

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- CNCERT是公告者非产品
- CNVD98846和CNTA0020未提取
- 4.2至5.4是规范范围非所有硬件必受影响
- 无线邻近/配对条件需字段化
- 普通用户通常不能直接设置密钥字节长度需区分厂商与终端缓解
- 仅SIG链接应补原CNVD/研究

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 安全内参   2023-12-20 16:52  
  
安全公告编号:CNTA-2023-0020  
  
  
2023年12月20日，国家信息安全漏洞共享平台（CNVD）收录了蓝牙协议中间人攻击漏洞（CNVD-2023-98846，对应CVE-2023-24023）。攻击者利用漏洞通过欺骗性的配对或绑定设备强制使用较短的加密密钥长度，破坏蓝牙设备会话的安全验证机制  
。目前，漏洞技术原理已公开，CNVD建议受漏洞影响的设备厂商和用户加强安全防范措施。  
  
  
**一、漏洞情况分析**  
  
蓝牙（Bluetooth）是一种支持设备短距离通信的无线电通信协议，目前已成为全球通用的开放性技术规范，广泛应用于个人终端、车载娱乐、工业生产和医药医疗领域。蓝牙设备的有效传输距离一般小于10米，其通信质量易受障碍物的影响。  
  
法国 EURECOM 安全研究员兼助理教授Daniele Antonioli发现了蓝牙BR/EDR设备的安全连接配对和安全简单配对的核心规范存在安全漏洞。位于目标设备有效蓝牙传输距离内的攻击者利用上述漏洞，通过捕获和伪造蓝牙会话数据包，可对目标会话发起中间人攻击（BLUFFS）。BLUFFS攻击能够破坏蓝牙配对设备的会话身份验证机制，通过使用欺骗性的配对或绑定设备强制使用较短的加密密钥长度，继而破坏蓝牙通信会话的保密性和完整性。  
  
CNVD对该漏洞的综合评级为“中危”。  
  
   
  
**二、漏洞影响范围**  
  
该漏洞影响的产品和版本为：  
  
蓝牙协议核心规范，版本范围为4.2（2014年12月发布）至5.4（2023年2月发布）。  
        
   
  
****  
**三、漏洞处置建议**  
  
目前，负责蓝牙标准开发和技术许可的蓝牙技术联盟（SIG，Special Interest Group）已发布安全防范措施。  
  
CNVD建议蓝牙设备厂商将蓝牙设备的默认设置修改为安全连接模式，以确保密钥强度；建议蓝牙设备用户加强安全防范措施，开启蓝牙连接时注意周围的可疑设备，同时使用不小于7个字节长度的蓝牙通信密钥。  
  
  
参考链接：  
  
https://www.bluetooth.com/learn-about-bluetooth/key-attributes/bluetooth-security/bluffs-vulnerability/  
  
  
**推荐阅读**  
- [网安智库平台长期招聘兼职研究员](http://mp.weixin.qq.com/s?__biz=MzI4NDY2MDMwMw==&mid=2247499450&idx=2&sn=2da3ca2e0b4d4f9f56ea7f7579afc378&chksm=ebfab99adc8d308c3ba6e7a74bd41beadf39f1b0e38a39f7235db4c305c06caa49ff63a0cc1d&scene=21#wechat_redirect)  
  
  
- [欢迎加入“安全内参热点讨论群”](https://mp.weixin.qq.com/s?__biz=MzI4NDY2MDMwMw==&mid=2247501251&idx=1&sn=8b6ebecbe80c1c72317948494f87b489&chksm=ebfa82e3dc8d0bf595d039e75b446e14ab96bf63cf8ffc5d553b58248dde3424fb18e6947440&token=525430415&lang=zh_CN&scene=21#wechat_redirect)  
  
  
  
  
  
  
文章来源：CNVD漏洞平台  
  
  
点击下方卡片关注我们，  
  
带你一起读懂网络安全 ↓  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
