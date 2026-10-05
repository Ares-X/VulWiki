---
source: "gelusus/wxvl 公众号漏洞文库"
title: "速修复！FreeBSD 中存在严重漏洞"
product: "FreeBSD bhyve USB XHCI模拟"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2024-41721"
referenced_identifiers: "CVE-2024-43102; CVE-2020-7468"
identifier_role: "primary"
cve: "CVE-2024-41721"
prerequisites: "虚拟机配置XHCI设备模拟，攻击者有guest内相应特权；host进程仍受Capsicum限制"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-d1e18210835a1b3f9852eaf3"
entity_id: "ve-d1e18210835a1b3f9852eaf3"
schema_version: "1"
---

# 速修复！FreeBSD 中存在严重漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：虚拟机配置XHCI设备模拟，攻击者有guest内相应特权；host进程仍受Capsicum限制
- 证据范围：guest到host进程影响与不使用USB模拟不受影响有明确说明；不是未认证网络漏洞

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 来源URL明显与FreeBSD正文无关，需恢复正确原文及官方公告
- 主CVE缺元数据
- CVSS9.8缺评分来源/向量，应核对本地guest前提
- STABLE主分支及RELEASE-P应加固定修复提交和规范p写法

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

DO SON  代码卫士   2024-09-23 18:15  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
  
   
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**FreeBSD 发布安全公告称，bhyve 管理程序的USB仿真功能中存在严重漏洞CVE-2024-41721，CVSS评分为9.8。具体而言，当该USB仿真功能配置为仿真虚拟USB控制器 (XHCI) 上的设备时，就会触发该漏洞。它可导致恶意代码执行后果，从而对运行易受攻击 FreeBSD版本的系统造成严重威胁。**  
  
  
![](../../.resource/remote/f06e2f5274cab008783f77e65bebe04443c456536ad86c5e57464501ce34c984.png "")  
  
  
Bhyve 是一款管理程序，旨在在虚拟机中运行 guest 操作系统，由 USB 仿真代码中的边界验证不足导致。具有权限的 guest 操作系统可在堆上触发界外读问题，从而可能升级到任意写权限。该漏洞可引发多种攻击，如导致管理程序崩溃或在通常以 root 权限运行的主机的 bhyve 用户空间进程中实现代码执行。  
  
该漏洞可导致对 guest 虚拟机具有控制权的恶意人员使管理程序崩溃甚至在主机机器上执行任意代码。虽然 bhyve 获得 Capsicum 沙箱的保护，但该漏洞如未被修复仍可造成严重风险。  
  
该漏洞由 Synacktiv 公司的研究人员发现并报送。目前并不存在相关应变措施。未在 USB 设备上应用 XHCI 仿真措施的guest虚拟机不受影响。  
  
FreeBSD Project 强烈建议所有用户将系统升级至最新版本 14.1-STABLE、14.1-RELEASE-P5、14.0-RELEASE-P11、13.4-STABLE、13.4-RELEASE-p1或13.3-RELEASE-p7。在USB设备上使用 XHCI 仿真技术的 guest 操作系统需要重启才能让补丁完全起作用。  
  
  
  
  
  
代码卫士试用地址：  
https://codesafe.qianxin.com  
  
开源卫士试用地址：https://oss.qianxin.com  
  
  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[FreeBSD紧急提醒注意严重漏洞CVE-2024-43102](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247520744&idx=2&sn=d688e69adb847820b551749458a9b1b2&chksm=ea94a082dde32994e04c2f938e2fe0eb8aa1705c92cd5936096716788c157aff940c5983a116&scene=21#wechat_redirect)  
  
  
[开源OS FreeBSD 中 ftpd chroot 本地提权漏洞 (CVE-2020-7468) 的技术分析](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247499356&idx=1&sn=f95ec3f9ca222c3ccef3d1162af259b8&chksm=ea94cf36dde34620d380b15d760f31aa5b3729cc379fa68a784ddcefde453df7db3a28a99f29&scene=21#wechat_redirect)  
  
  
[FreeBSD BSDiff 被曝高危内存损坏漏洞，时隔4年终修复](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247494029&idx=1&sn=e6028fb905934093c4b9f2b24f28e99e&chksm=ea94d8e7dde351f1a630eb83468df0d14731ca895b38059d3ba9e292ee13ca15eff982f70ba0&scene=21#wechat_redirect)  
  
  
[开源操作系统FreeBSD修复缓冲溢出漏洞](http://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247486062&idx=2&sn=e10d89d7753fbea196baba9527d9af4c&chksm=ea973b04dde0b212906e5da103f082e64776a5b251f4edf81e2b8bab3722fe43b95ae3134f6e&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
  
https://www.bleepingcomputer.com/news/security/cisa-warns-of-actively-exploited-apache-hugegraph-server-bug/  
  
  
题图：  
Pexels  
 License  
  
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
