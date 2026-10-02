---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "漏洞扫描神器AWVS又更新了，全新界面，快来下载体验吧！"
product: "Acunetix AWVS 24.1.240111130 工具推广"
record_type: "advisory"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "原文未给出可确认的版本、认证及部署边界；保留待核"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E6%BC%8F%E6%B4%9E%E6%89%AB%E6%8F%8F%E7%A5%9E%E5%99%A8AWVS%E5%8F%88%E6%9B%B4%E6%96%B0%E4%BA%86%EF%BC%8C%E5%85%A8%E6%96%B0%E7%95%8C%E9%9D%A2%EF%BC%8C%E5%BF%AB%E6%9D%A5%E4%B8%8B%E8%BD%BD%E4%BD%93%E9%AA%8C%E5%90%A7%EF%BC%81.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-0ddf4e045f574bd1b34c6462"
entity_id: "ve-0ddf4e045f574bd1b34c6462"
schema_version: "1"
---

# 漏洞扫描神器AWVS又更新了，全新界面，快来下载体验吧！

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Acunetix AWVS 24.1.240111130 工具推广
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：原文未给出可确认的版本、认证及部署边界；保留待核
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 是扫描器发布说明与破解安装推广，无AWVS主漏洞
2. 列出OpenCMS/ownCloud/TorchServe/OFBiz/BIGIP/Sitecore CVE均为新增检测对象，不可提成AWVS漏洞
3. 要求管理员运行crack.bat但无官方下载/签名/哈希，来源和许可风险未说明，不能据此断言恶意软件
4. 公众号取包及Fortify/Nessus等破解广告占篇幅
5. CVE-2023-36025侧栏不是本文主漏洞

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

原创 有手不行  信安404   2024-01-21 09:03  
  
## 免责声明：  
  
由于传播、利用本公众号所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，公众号及作者不为此承担任何责任，一旦造成后果请自行承担！如有侵权烦请告知，我们会立即删除并致歉。谢谢！  
## 版本介绍  
>   
> **版本**：Acunetix-24.1.240111130-Windows  
> **亮点**：焕然一新的用户界面，带来全新的导航体验  
  
  
### 更新日志：  
####   
```
改进了 Elmah 安全检查以检查 Elmah 的变体

OpenCms Chemistry Solr XML 外部实体 (XXE) (CVE-2023-42346)

OwnCloud phpinfo 信息泄露( CVE-2023-49103 )

TorchServe 管理 API SSRF ( CVE-2023-43654 )

更新了 WordPress 核心和 WordPress 插件的漏洞

Ofbiz PreAuth RCE ( CVE-2023-49070 )

F5 BIG-IP 请求走私( CVE-2023-46747 )

Sitecore XP 模板解析器 RCE ( CVE-2023-35813 )

通过 PDF 生成添加了对 SSRF/LFI 的检查

当响应显示在 PDF 中时添加了对文件包含/路径遍历的检查

```  
#### 改进  
```

更新至 Chromium 119.0.6045.199/200

用户可以选择接收直接下载链接，而不是 PDF 报告附件（仅限本地）

改进了使用 React 的单页应用程序 (SPA) 的抓取

改进了使用 Angular 框架的单页应用程序 (SPA) 的抓取

改进了使用 Vue.js 框架的单页应用程序 (SPA) 的抓取

新的用户配置文件设计

```  
## 破解方法  
- 1、先安装好最新版程序。点击acunetix_24.1.240111130.exe按步骤进行安装。  
  
- 2、管理员权限运行crack.bat![](https://mmbiz.qpic.cn/sz_mmbiz_png/JtFpsuzZS5WKrXwqxNXYZxdf8G1df7z8HZb3UuCicpO7S9iakFBp8gCicyHZptobChE6ibTibDXxcTNuiaHU5YvUACng/640?wx_fmt=png&from=appmsg "")  
等破解完成  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/JtFpsuzZS5WKrXwqxNXYZxdf8G1df7z8TqcZakVagokTPsCdiaa94OFOflibusL696HUBU8XNbYmbN8tME83ZoQQ/640?wx_fmt=png&from=appmsg "")  
- 3、登录使用![](https://mmbiz.qpic.cn/sz_mmbiz_png/JtFpsuzZS5WKrXwqxNXYZxdf8G1df7z8a8towNVRsnGsQcVkbKjkqwuWE1jPSpF5ZYkicM2QFficSgrJRRzNKkibw/640?wx_fmt=png&from=appmsg "")  
  
  
  
  
Tips  
  
下载：公众号回复“  
AWVS  
”  
  
  
  
  
往期推荐  
  
  
[【从0到精通】2024年要不要学会API安全？](https://mp.weixin.qq.com/s?__biz=Mzk0NjQ5MTM1MA==&mid=2247486691&idx=1&sn=97e50f12bd735483c8ec0f15c1ac1b5e&chksm=c304165af4739f4cf834b449760035b2c27f4b7ad20cbda32804592a99c2b8ebfc32f694303c&scene=21#wechat_redirect)  
  
  
[世界第一Scanner灯塔不行？是你不行](https://mp.weixin.qq.com/s?__biz=Mzk0NjQ5MTM1MA==&mid=2247486691&idx=2&sn=b585440fb5042c58ca2fe963e09b9db5&chksm=c304165af4739f4c350a425e1366d33a3f4bf190fe3c32934181fbdb91dc8d40c547b6460551&scene=21#wechat_redirect)  
  
  
[全版本Windows RCE漏洞复现CVE-2023-36025【附工具】](https://mp.weixin.qq.com/s?__biz=Mzk0NjQ5MTM1MA==&mid=2247486659&idx=1&sn=8d93c8e002d406e7312487104a9b48b4&chksm=c304167af4739f6c0b99a83aa19712610a5da4f044abe7a5deba6d0f2a5aa7f2af11fe47b098&scene=21#wechat_redirect)  
  
  
[渗透测试怎么做？看完这个我也学会了](https://mp.weixin.qq.com/s?__biz=Mzk0NjQ5MTM1MA==&mid=2247486652&idx=1&sn=63aa3ac165b9fe219bc5315b0bfb4829&chksm=c3041605f4739f13ac235af608de85aad35043acc4446edd54343e3681d747bd10d9523e6ae9&scene=21#wechat_redirect)  
  
  
[AuxTools - 浮鱼渗透辅助工具箱 V4.2](https://mp.weixin.qq.com/s?__biz=Mzk0NjQ5MTM1MA==&mid=2247486591&idx=1&sn=cb9a1ef832da0406f76abc560be9d787&chksm=c30416c6f4739fd07bfcee9c5b354e68da9dbd0c0ea103ce96cce5dfee743b3e91518e54646b&scene=21#wechat_redirect)  
  
  
[【工具更新】Fortify_SCA_23.2.0 for Win/Linux/Mac版Cracked（附下载）](https://mp.weixin.qq.com/s?__biz=Mzk0NjQ5MTM1MA==&mid=2247486577&idx=1&sn=955576e28daf27c06b4cc09581755d5e&chksm=c30416c8f4739fde55ea4dc8ce3ca26190120ef7ffe43078feaf8efa6cb3c0f525f7624d8ee8&scene=21#wechat_redirect)  
  
  
[【工具更新】天剑指纹识别工具2.0发布](https://mp.weixin.qq.com/s?__biz=Mzk0NjQ5MTM1MA==&mid=2247486577&idx=2&sn=8a4823e04fe9c6d10cf190da6baf7db4&chksm=c30416c8f4739fde4d15eee5fd908a571cad1235b9a6b547aa039be2051142e18f1714122a95&scene=21#wechat_redirect)  
  
  
[【蓝队利器】Windows安全基线检测和加固工具](https://mp.weixin.qq.com/s?__biz=Mzk0NjQ5MTM1MA==&mid=2247486570&idx=1&sn=80d3eea5a4bd3b90b6290b0100440fc5&chksm=c30416d3f4739fc5d63b6343b8d8e136982550472628290f8bf73b66668a20572b8f7c90ea96&scene=21#wechat_redirect)  
  
  
[Burpsuit自动化资产收集工具高级版-工具](https://mp.weixin.qq.com/s?__biz=Mzk0NjQ5MTM1MA==&mid=2247486505&idx=1&sn=6c2b165361b08a88d8ea93d3d091516e&chksm=c3041690f4739f86b9aa7425419c2bb8d2299386b7d88ef2ca2f3e270e2be52ae54da47054a5&scene=21#wechat_redirect)  
  
  
[Android App隐私合规检测辅助工具](https://mp.weixin.qq.com/s?__biz=Mzk0NjQ5MTM1MA==&mid=2247486485&idx=1&sn=6c01e16f362ffe04cf6feab67fd77f9a&chksm=c30416acf4739fba3dada98bebe2f40bf2fe82a46fcd384dc001a516342ad481e5d899b862a8&scene=21#wechat_redirect)  
  
  
[【工具更新】Nessus10.6.4_20240105_windows 版Cracked（附下载）](https://mp.weixin.qq.com/s?__biz=Mzk0NjQ5MTM1MA==&mid=2247486479&idx=1&sn=42c3fd7981975fca14b355374c5131bc&chksm=c30416b6f4739fa0b5b6d569e4f98e4a22236f0a81c4e21c82740eaae1d8ba46810cac07ac15&scene=21#wechat_redirect)  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
