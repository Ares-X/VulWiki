---
cve: "CVE-2021-21980"
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "reference"
primary_identifiers: ""
referenced_identifiers: "CVE-2021-21980"
identifier_status: "unknown"
title: "记一次 Fake-POC 投毒项目的追溯"
product: "疑似恶意CVE-2021-21980扫描器溯源案例"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "原文未给出可确认的版本、认证及部署边界；保留待核"
side_effects: "给SHA1/检测比例/网络IP但无样本静态恶意逻辑/进程级外联时序/沙箱报告直链，不能确认投毒"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E8%AE%B0%E4%B8%80%E6%AC%A1%20Fake-POC%20%E6%8A%95%E6%AF%92%E9%A1%B9%E7%9B%AE%E7%9A%84%E8%BF%BD%E6%BA%AF.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-8c05b2574d09e7a2721277b3"
entity_id: "ve-8c05b2574d09e7a2721277b3"
schema_version: "1"
previous_identifier_role: "unknown"
previous_referenced_identifiers: ""
---

# 记一次 Fake-POC 投毒项目的追溯

> 编号角色校订（2026-10-04）：按归档技术正文区分主讨论编号与背景引用，更新 `primary_identifiers` / `referenced_identifiers` 及旧字段角色。旧编号原值、状态与正文保持原样，变更前字段逐字保存在 `previous_*`；后文旧的角色待核说明应按当前字段阅读。这里的角色判读不等于官方分配核验或漏洞复现。

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：疑似恶意CVE-2021-21980扫描器溯源案例
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：原文未给出可确认的版本、认证及部署边界；保留待核
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 21980是诱饵漏洞编号不是样本自身漏洞
2. README把多个漏洞混写只说明标注不准不能证明后门
3. 给SHA1/检测比例/网络IP但无样本静态恶意逻辑/进程级外联时序/沙箱报告直链，不能确认投毒
4. 恶意样本连接同IP不证明该IP是恶意基础设施，应核CDN/云/更新/证书吊销及沙箱背景流量
5. 与LockBit/MuddyWater通信重叠无法归因该项目，中文仓库不证明国籍
6. 称实锤证据强度不足，2026发文分析2023样本需固定commit/采集日期
7. 无外联不代表安全，不宜作为允许执行标准
8. 未下载执行，本审不作恶意结论

### 操作风险

给SHA1/检测比例/网络IP但无样本静态恶意逻辑/进程级外联时序/沙箱报告直链，不能确认投毒

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 蚁景网安   2026-04-27 08:48  
  
0x01 前言  
  
之前某  
一次写关于  
Vcenter漏洞文章的时候，了解了一个比较冷门的漏洞，CVE-2021-21980：VMware vCenter Server文件读取漏洞。  
  
先是在nuclei-templates里面搜了一  
下，没找到有模版，就在github中搜了一下漏洞编号，找到了今天的主角：Osyanina/westone-CVE-2021-21980-scanner  
```
https://github.com/Osyanina/westone-CVE-2021-21980-scanner
```  
  
![](../../.resource/remote/8b274b1c3f803c3f7205c122d1b779a8420a3a9dd03686b3e4a9de2673582bfa.png "")  
  
  
**0x02 追溯过程**  
  
**2.1、about和README信息分析**  
  
![](../../.resource/remote/e6a16b2ddbdf8626dd4d4a6ec09e39e3be1c52a863c29d9df30fb44a6bd35b01.png "")  
  
  
从项目的about信息来看，这是一个检测CVE-2021-21980漏洞的扫描器，这里没什么问题。  
  
从项目的README信息来看，这个漏洞是VMware VCenter 及更早版本的未授权文件读取、SSRF和XSS漏洞。这里就很有问题了，从公开的360cert信息来看，CVE-2021-21980是一个文件读取漏洞，**并不涉及SSRF和XSS**  
。  
  
![](../../.resource/remote/49a04365424be32a22d1d0c7515ea6b21be0a3225d38361b02239ff2ebfd990e.png "")  
  
  
具体链接  
：  
  
https://cert.360.cn/warning/detail?id=4d4d73e332ff08a42571f8cc7d6aa770  
  
  
再说回这个README描述的漏洞信息，很明显是VMware vCenter - Server-Side Request Forgery/Local File Inclusion/Cross-Site Scripting。此处的漏洞名称参考nuclei-templates的信息。  
  
![](../../.resource/remote/c82c875f9dec080a691b1fabd617184521bb695656b16bb21c0d51077342faec.png "")  
  
  
在nuclei的poc中有一个referer的链接。  
  
https://github.com/l0ggg/VMware_vCenter  
，访问后正是该漏洞的详情，里面包含了漏洞的测试截图和POC：  
  
![](../../.resource/remote/2444479cc8f34c0aa5c521e79d43f29f74c2c15f9b1440556af95a0a2df513a4.png "")  
  
  
到这里其实已经真相大白了，这个POC是一个假的POC，大概率是后门。  
  
### 2.2、关于扫描exe的分析  
  
下载可执行程序的exe，计算sha1值。  
```
mimikatz@mimikatzdeMBP Downloads % shasum -a 1 CVE-2021-21980.exe
2ee2cdf0c6331e5422ec5fda9d8403686ca239e4  CVE-2021-21980.exe
```  
  
virustotal查杀结果：10/71  
  
![](../../.resource/remote/07cff7c79aab5be2e266a3cac600e34f59b7215843376a29c16da2495d3846ea.png "")  
  
  
微步在线查杀结果：3/25  
  
![](../../.resource/remote/ccdb50f85a5dc25bd2b1095b4a574832109d4afc40a59bb07c79acf3221ff7ff.png "")  
  
  
**网络外联情况：**  
  
微步：  
  
![](../../.resource/remote/f9caea8b65433b05bdcf7f47e42961e75c46c3b82d9b5feb390bed5dbf0a9713.png "")  
  
  
virustotal：  
  
![](../../.resource/remote/258c099d0f1eb14c5c8e836f04c35b201ae00fe3ef5eecb2878af9a48d744bf1.png "")  
```
13.107.4.52
192.229.211.108
20.49.157.6
20.99.184.37
20.99.186.246
23.216.147.67
23.216.147.76
95.101.143.10
95.101.143.24
```  
  
![](../../.resource/remote/e15583b75656ae305c3c99609f2c86453697592411fef9e0f7bfcebe814ebb40.png "")  
  
  
关注的时间重点放在2023年5月29日。  
  
### 2.3、关于IP地址的追踪  
#### 2.3.1、13.107.4.52 - lockbit 3.0  
  
![](../../.resource/remote/1e323c776fd6293cde3576d1745cf39e41d748226a3b44a6a452800fc3423735.png "")  
  
![](../../.resource/remote/b0fbedd575a14e00d9963290e1f50e4e3e892207a05cc30bcd69a5376f9da6c2.png "")  
  
  
在微步里面查询这个IP，有323个通信样本，老带恶人了。查看安全博客相关，发现了一篇与LockBit 3.0的勒索案例研究相关的文章提到了该IP地址。  
  
![](../../.resource/remote/9bf0edd3dcd8d270ba32a6d67913d33d2dc6df139f4e28f077fe7b6faf8694a8.png "")  
  
  
查看文章发现在分析LockBit 3.0的时候发现该IP地址与勒索使用的Resume5.exe有网络连接的情况。  
  
https://x.threatbook.com/v5/article?threatInfoID=41875  
  
原文章：  
  
https://blog.criminalip.io/2022/09/23/lockbit-3-0-ransomware/  
  
![](../../.resource/remote/2cad1040a30f3baef09a9d7d75b6d3524cfc11b0570d076e67ca851ae3ec98f8.png "")  
  
  
时间是在2022年9月11日，而发现的时间是在2023年5月29日。这说明这玩意儿确实可能是LockBit 3.0的一个投毒的基础设施。  
  
#### 2.3.2、192.229.211.108-恶意  
  
![](../../.resource/remote/e9eac606ef549e955d0ac7cbe00163cfbad5623a3beb1cb5a2bd47540fe7c325.png "")  
  
  
样本时间有2023年4月的，实锤属于恶意基础设施：  
  
![](../../.resource/remote/abf7170feaaf24dce1f6e73c11d13ca9944fcb5ac67eedf92580d04b2333c8fd.png "")  
  
  
**2.3.3、20.49.157.6**  
  
![](../../.resource/remote/8650550b69fd48980a057f6ce3a7b3b2c354e0bfbc8d5e591e8fb43017272e31.png "")  
  
#### 2.3.4、20.99.184.37-恶意  
  
![](../../.resource/remote/cad5f411e5dbc82eddbf7279f5eec48bf3c74f665ef6a2f20ec22446608fad1a.png "")  
  
  
恶意基础设施+1：  
  
![](../../.resource/remote/0ed9cd84745fb1c50d6565bac5f49ef258aca2365689557f42d1917a0017f6e0.png "")  
  
#### 2.3.5、20.99.186.246-恶意  
  
![](../../.resource/remote/8aeef42864042c3f34dc58d688e76a2a01d2ce248d6815f18f826620db68b360.png "")  
  
![](../../.resource/remote/5ae420e3c1f2209c482683469dc63191181e36f08234a5ce7651408f669e4bca.png "")  
  
#### 2.3.6、23.216.147.67  
  
![](../../.resource/remote/f480b53917fcd4b11845acf48ec97330b64c513a2723326e6c5cb17d26a291ca.png "")  
  
#### 2.3.7、23.216.147.76-MuddyWater组织  
  
![](../../.resource/remote/a768036371df803c9391b083171a9a7fc851f23a5325499223d8c4bb98c7c1fc.png "")  
  
  
https://www.secrss.com/articles/51028  
  
![](../../.resource/remote/21af22b31a377f31957d2884130dfdf28d458ba238b013476663bc3ebce96f6c.png "")  
  
  
**2.3.8、95.101.143.10**  
  
![](../../.resource/remote/fe1bc1b87fce3c7ce75481e5b8460590f67d4da5fb104b52b5b85cded72cd98e.png "")  
  
****  
**2.3.9、95.101.143.24-恶意**  
  
![](../../.resource/remote/046c53892f9d816e27ee658d8aa34e1e2ea176786d3c1d80d0084426c64038b4.png "")  
  
  
恶意样本通讯：  
  
![](../../.resource/remote/9a57a143325d6809bbc6aa46d10f554911f8f5815169e1f9100142c81eb39f89.png "")  
  
  
**2.4、github账户追溯**  
  
类似案例：  
  
![](../../.resource/remote/9b497a46e2aa58feb8b59700cdc87920e120b32d04f2c4344ad206e41aa217ad.png "")  
  
![](../../.resource/remote/160c179cf635d6315a9e1eda4676dff745d509149ff7c6e3b6c3280838370142.png "")  
  
  
从他的项目里面还发现了一个中文项目，判断应该是国人。  
  
![](../../.resource/remote/5de334b9145d7ef5c1938ee8c1e38894fb3ef8d01e629836d63935adb46426ce.png "")  
  
  
**0x03 总结**  
  
从微步在线和  
virustotal的检测数据以及其他溯源博客等多个层面来看，该项目确实为投毒项目。  
希望大  
家能保护好自己吧，用项目之前尽量不使用打包成exe的项目，如要使用，建议virustotal和微步云沙箱中跑跑看，无外联后再做打算。  
  
  
![图片](../../.resource/remote/53ae67ca79c9a2422ea2e38e0ee3f05d07bfeb4c69c90b406949962917ec18f0.gif "")  
  
学  
习  
网安实战技术  
，戳  
“阅读原文”  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
