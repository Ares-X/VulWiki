---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Setuptools/PackageIndex下载路径"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-47273"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Setuptools 漏洞导致数百万 Python 用户易受RCE攻击"
prerequisites: "来源所述条件，未列明部分仍待核：78.1.1修复，受影响下界未知；需已弃用easy_install/package_index调用及攻击者可控索引URL"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-cd3e30a71cedc075e70753d8"
entity_id: "ve-cd3e30a71cedc075e70753d8"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：78.1.1修复，受影响下界未知；需已弃用easy_install/package_index调用及攻击者可控索引URL

代码与实验材料：绝对路径覆盖os.path.join首参数机理明确，无样例或执行链；正文正确限定进程权限

来源证据范围：标原文链接却指向VMware补丁新闻，明显错链；无Setuptools官方公告

- **来源与引用处置（1）**：原文来源完全错配；依据：SecurityWeek URL nato-flagged-vulnerability-tops-latest-VMware-security-patch-batch与Setuptools主题无关。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

- **结论使用边界（2）**：标题RCE和数百万用户需限定；依据：正文为旧下载路径任意写，在特定执行位置才RCE；安装setuptools本身不是暴露。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Setuptools 漏洞导致数百万 Python 用户易受RCE攻击   
Ddos  代码卫士   2025-05-22 09:32  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**广为使用的 setuptools 项目中存在一个严重的路径遍历漏洞CVE-2025-47273（CVSS v4 7.7），它可导致攻击者将文件写到受害者文件系统中的任意位置，在一定条件下可导致远程代码执行后果。该漏洞已修复。**  
  
Setuptools 是由 Python 开发人员用于构建、封装和分发软件的基础性工具，尤其用于涉及依赖的情况。正如PyPA 描述的那样，“setuptools 是对Python distutils 的增强集合，它可使开发人员更轻松地构建和分发 Python 包。”  
  
该漏洞位于PackageIndex 的 _download_url 方法中，该文件名衍生自由用户提供的URL。该文件名称提取自该URL，清洗不充分，正如该安全公告提到的，“虽然存在通过 ‘.’ 替代 ‘..’ 实例的尝试，但仍然不充分。”更糟糕的是，如果名称以一个绝对路径开头，则 os.path.join() 会丢弃第一个参数，从而导致敏感文件可能遭覆写。  
  
尽管该易受攻击的代码路径属于降级模块如 easy_install 和 package_index，但风险仍不容忽视。攻击者可利用嵌入到第三方包指数页面的 URL，类似于此前提到过的 GHSA-r9hx-vwmv-q579和GHSA-cx63-2mw6-8hw5。  
  
该安全公告提醒称，“攻击者可将文件写入该文件系统中的任意位置，具有运行该 Python 代码的进程权限，根据具体情境可能升级到RCE。”  
  
开发人员和系统管理员应当立即升级至 setuptools 78.1.1版本。该版本已包含修复逻辑，增强了输入清理以阻止路径遍历。  
  
  
****  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[严重的Langflow RCE 漏洞被用于攻击AI app 服务器](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522938&idx=1&sn=d6e3777945383ca1a0f8df487903c8e5&scene=21#wechat_redirect)  
  
  
[苹果 “AirBorne” 漏洞可导致零点击 AirPlay RCE 攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522916&idx=2&sn=1292db15893e34108514b0dc4437e9f7&scene=21#wechat_redirect)  
  
  
[Craft CMS RCE利用链用于窃取数据](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247522866&idx=1&sn=f8c7ca3a1ba46ce90b3df18909d4b5b4&scene=21#wechat_redirect)  
  
  
[PyPI攻击：通过 Python 库传播 JarkaStealer](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247521578&idx=2&sn=54734e7515c71beca1602a65e343a991&scene=21#wechat_redirect)  
  
  
[AI Python 包中存在缺陷 “Llama Drama” ，威胁软件供应链](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247519566&idx=1&sn=991956bfd062dfe52e9fe722b821d358&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://www.securityweek.com/nato-flagged-vulnerability-tops-latest-VMware-security-patch-batch/  
  
  
  
题图：  
Pixabay Licen  
se  
  
****  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
