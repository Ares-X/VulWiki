---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "这谁防得住？Wi-Fi 联盟官方测试套件中存在命令注入漏洞"
product: "Wi-Fi Alliance Test Suite41992"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "只有带测试套件且可达设备受影响非所有WiFi；缺CERT/SSD一手链接和准确固件版本，未补丁为2024时点"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E8%BF%99%E8%B0%81%E9%98%B2%E5%BE%97%E4%BD%8F%EF%BC%9FWi-Fi%20%E8%81%94%E7%9B%9F%E5%AE%98%E6%96%B9%E6%B5%8B%E8%AF%95%E5%A5%97%E4%BB%B6%E4%B8%AD%E5%AD%98%E5%9C%A8%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://thehackernews.com/2024/10/researchers-discover-command-injection.html"
id: "vw-74f1991100c377bf309b2072"
entity_id: "ve-74f1991100c377bf309b2072"
schema_version: "1"
---

# 这谁防得住？Wi-Fi 联盟官方测试套件中存在命令注入漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Wi-Fi Alliance Test Suite41992
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：只有带测试套件且可达设备受影响非所有WiFi；缺CERT/SSD一手链接和准确固件版本，未补丁为2024时点
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 主CVE缺元数据
2. 本地攻击者可能指邻接网络需按CERT向量核，不能混本地账号
3. 只有带测试套件且可达设备受影响非所有WiFi
4. 9.0套件修复不等于Arcadyan固件已修
5. 缺CERT/SSD一手链接和准确固件版本，未补丁为2024时点
6. 清广告空白

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://thehackernews.com/2024/10/researchers-discover-command-injection.html>

### 归档技术正文

 数世咨询   2024-10-30 16:00  
  
![](../../.resource/remote/4c0bfae2b9e448dded7568102d5d028f85c361eabed1aff1773221fd52c84d97.png "")  
  
  
计算机应急响应小组 (CERT) 协调中心 (CERT/CC) 研究人员发现Wi-Fi联盟测试套件中存在命令注入漏洞，该漏洞的编号为CVE-2024-41992，Wi-Fi 联盟的易受攻击代码已发现部署在 Arcadyan（智易科技）   
FMIMG  
51AX000J  
   
路由器上。  
  
**01**  
**WiFi测试套件漏洞影响**  
  
  
CERT/CC  
在周三发布的公告中  
表示  
：  
 “  
该漏洞允许未经身份验证的本地攻击者通过发送特制的数据包来利用  
 Wi-Fi   
测试套件，从而能够在受影响的路由器上以  
 root   
权限执行任意命令。  
”  
  
Wi-Fi 测试套件是Wi-Fi 联盟开发的集成平台，可自动测试 Wi-Fi 组件或设备。虽然该工具包的开源组件是公开的，但完整套件仅供其成员使用。  
  
**02**  
**WiFi测试套件漏洞被发现**  
  
  
SSD Secure Disclosure（漏洞报告公司）于 2024 年 8 月发布了该漏洞的详细信息，称这是一个命令注入案例，可能使威胁行为者能够以 root 权限执行命令。该漏洞最初于 2024 年 4 月报告给 Wi-Fi 联盟。  
  
一位独立研究员，其网名为“fj016”，发现并报告了这些安全漏洞，这位研究员还提供了该漏洞的概念验证 (PoC) 漏洞利用程序。  
  
CERT/CC 指出，Wi-Fi 测试套件不适用于生产环境，但已在商业路由器部署中发现。  
  
报告称：“成功利用此漏洞的攻击者可以完全控制受影响的设备。”  
  
“通过此访问权限，攻击者可以修改系统设置，破坏关键网络服务或完全重置设备。这些操作可能导致服务中断，网络数据泄露，并可能导致所有依赖受影响网络的用户失去服务。”  
  
由于智易科技股份有限公司未发布补丁，建议其他已包含 Wi-Fi 测试套件的供应商将其从生产设备中完全删除或将其更新至 9.0 或更高版本，以降低被利用的风险。  
  
* 本文为闫志坤编译，原文地址：https://thehackernews.com/2024/10/researchers-discover-command-injection.html                       注：图片均来源于网络，无法联系到版权持有者。如有侵权，请与后台联系，做删除处理。  
  
— 【 THE END 】—  
  
🎉 大家期盼很久的#  
**数字安全交流群**  
来了！快来加入我们的粉丝群吧！  
  
🎁 **多种报告，产业趋势、技术趋势**  
  
这里汇聚了行业内的精英，共同探讨最新产业趋势、技术趋势等热门话题。我们还有准备了专属福利，只为回馈最忠实的您！  
  
👉   
扫码立即加入，精彩不容错过！  
  
![](../../.resource/remote/34cae9f3a03dd890c422dd98273c25c67a6070af6b43ffbe1da48a754745a953.webp "")  
  
😄  
嘻嘻，我们群里见！  
  
  
更多推荐  
****  
  
  
[](http://mp.weixin.qq.com/s?__biz=MzkxNzA3MTgyNg==&mid=2247514213&idx=1&sn=fa2d0412dbbce05ec48a9df909b7cfd3&chksm=c144cad8f63343ce0f383fc9d885c2c7ddcb3f3871270abea4c274775307858d350f60db3b54&scene=21#wechat_redirect)  
  
[](https://mp.weixin.qq.com/s?__biz=MzkxNzA3MTgyNg==&mid=2247513359&idx=1&sn=2f3bd51b24862de02cca6078688bafeb&chksm=c144c7b2f6334ea415adac810ce4803cdb3cd5e5ba194ff394b7278ebbb48cc830c8d405427a&token=824343009&lang=zh_CN&scene=21#wechat_redirect)  
  
[](http://mp.weixin.qq.com/s?__biz=MzkxNzA3MTgyNg==&mid=2247520738&idx=1&sn=f5660b24e2b5dc8b58b68b60bb20ba76&chksm=c144e35ff6336a495bbcd1c10e70325946e9336571babc4758819d55ee1b730498c12c2cd6d4&scene=21#wechat_redirect)  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
