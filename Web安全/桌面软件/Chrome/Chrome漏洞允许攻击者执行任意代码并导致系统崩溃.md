---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Chrome漏洞允许攻击者执行任意代码并导致系统崩溃  
原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-02-04 11:01  
  
谷歌发布了针对 Chrome 稳定版的重要安全更新，修复了两个高危漏洞，这些漏洞可能使用户面临任意代码执行 (ACE) 和拒绝服务(DoS) 攻击的风险。  
  
此次更新将 Windows 和 macOS 的浏览器版本推送至 144.0.7559.132/.133，将 Linux 的浏览器版本推送至 144.0.7559.132。  
  
这家科技巨头证实，补丁将在未来几天和几周内陆续推出。这些补丁专门针对浏览器 JavaScript 引擎和视频处理库中的内存损坏问题。  
  
此次更新修复了两个特定的安全漏洞，这两个漏洞的严重程度均为“高”。成功利用这些漏洞通常需要用户访问一个特制的网站，该网站会在浏览器的渲染进程中触发漏洞利用程序。  
## CVE-2026-1862：V8 中的类型混淆  
  
最严重的缺陷存在于谷歌的开源高性能 JavaScript 和 WebAssembly 引擎 V8 中。类型混淆漏洞是指当引擎被诱骗使用不兼容的类型访问内存资源时发生的漏洞，例如将整数当作指针访问。  
  
攻击者经常利用 V8 类型混淆漏洞来操纵内存指针。这种操纵允许他们读取或写入越界内存，从而可能导致在沙盒环境中执行任意代码。该漏洞由研究员彭朝元 (@ret2happy) 报告。  
## CVE-2026-1861：libvpx 中的堆缓冲区溢出漏洞  
  
第二个漏洞存在于libvpxVP8 和 VP9 视频编码格式的参考软件库中。当进程试图向固定长度的内存缓冲区写入超过其容量限制的数据时，就会发生堆缓冲区溢出。  
  
在这种情况下，攻击者可以将格式错误的视频流嵌入网页。当 Chrome 尝试处理该视频时libvpx，溢出可能会破坏堆上相邻的内存。这通常会导致浏览器崩溃（拒绝服务攻击），但也可能与其他漏洞利用程序结合使用，从而实现代码执行。  
  
<table><thead style="box-sizing: border-box;border-bottom-width: 3px;border-bottom-style: solid;border-bottom-color: currentcolor;"><tr style="box-sizing: border-box;"><th class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVE ID</font></font></th><th class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">严重程度</font></font></th><th class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">描述</font></font></th><th class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;">成分</th><th class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">报道者</font></font></th></tr></thead><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box;"><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVE-2026-1862</font></font></strong></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">高</font></font></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">类型混淆</font></font></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">V8引擎</font></font></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">彭朝元</font></font></td></tr><tr style="box-sizing: border-box;"><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><strong style="box-sizing: border-box;font-weight: bold;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">CVE-2026-1861</font></font></strong></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">高</font></font></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">堆缓冲区溢出</font></font></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">libvpx</font></font></td><td class="has-text-align-left" data-align="left" style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;"><font dir="auto" style="box-sizing: border-box;vertical-align: inherit;">Google内部</font></font></td></tr></tbody></table>## 缓解措施  
  
谷歌尚未透露这些漏洞目前是否已被实际利用（零日漏洞状态），而是将漏洞详情限制在大多数用户更新系统之前。然而，鉴于 V8 引擎和堆溢出漏洞的特性，这些漏洞被恶意利用的风险仍然很高。  
  
建议企业管理员和用户立即更新。要验证安装情况：  
1. 打开 Chrome 浏览器，依次点击“菜单”>“帮助”>“关于 Google Chrome”。  
1. 请确保浏览器检查更新并重新启动以应用版本 144.0.7559.132 或更高版本。  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
