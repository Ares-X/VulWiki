---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "Burp未授权漏洞自动检测插件 -- Unauthorized_Scan（1月27日更新）"
product: "Unauthorized_Scan Burp扩展"
record_type: "vulnerability"
document_type: "安全工具介绍"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "移除认证头后重放比较响应；Burp/JDK版本未给"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/Burp%20Suite/Burp%E6%9C%AA%E6%8E%88%E6%9D%83%E6%BC%8F%E6%B4%9E%E8%87%AA%E5%8A%A8%E6%A3%80%E6%B5%8B%E6%8F%92%E4%BB%B6%20--%20Unauthorized_Scan%EF%BC%881%E6%9C%8827%E6%97%A5%E6%9B%B4%E6%96%B0%EF%BC%89.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-30567c9396fb488b57207297"
entity_id: "ve-30567c9396fb488b57207297"
schema_version: "1"
---

# Burp未授权漏洞自动检测插件 -- Unauthorized_Scan（1月27日更新）

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Unauthorized_Scan Burp扩展
- 文献类型：安全工具介绍
- 版本、权限及部署边界：移除认证头后重放比较响应；Burp/JDK版本未给
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 与同作者《Burp Suite Web未授权访问漏洞检测插件》介绍同一工具和功能，合并时保留本篇1月27日更新标记、对方详细配置及导出说明
2. 工具介绍非Burp漏洞，只有网盘下载无源码、Release、版本哈希；虚拟机建议不能验证二进制安全
3. 安装与使用仅截图，没有实际安装步骤；所谓被动检测是否额外重放和误报边界未说明
4. 响应长度阈值不能独立确认越权，流量/导出可能含敏感会话数据；去推广二维码

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://pan.quark.cn/s/1e860a3aab1f>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

sh2493770457
                    sh2493770457  Web安全工具库   2026-01-29 16:00  
  
===================================  
  
**免责声明**  
  
请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，作者不为此承担任何责任。工具来自网络，  
安全性自测  
，  
大家都要把工具当做病毒对待，在虚拟机运行。  
如有侵权请联系删除。个人微信：  
ivu123ivu  
  
  
**0x01 工具介绍**  
  
这是一个Burp Suite扩展工具，用于自动检测Web应用程序中的未授权访问漏洞。  
  
```
主动扫描和被动扫描模式：支持在Burp主动扫描中使用，也可以被动监控所有流量
自定义认证头：可配置需要移除的认证头列表
可调整的检测阈值：可设置响应长度差异阈值，灵活适应不同应用场景
详细的调试信息：提供完整的请求处理日志，便于排查问题
强大的错误处理：包含请求重试机制，确保检测过程稳定可靠
丰富的结果展示：直观查看检测结果及详细信息
导出功能：支持将检测结果导出为Markdown或文本文件，以及导出API接口为JSON格式
流量记录：记录所有经过的流量，便于后续分析
```  
  
**0x02 安装与使用**  
  
运行界面  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/8H1dCzib3UibvhzSBtiawRxJIG37ibibkiblK6VKbeVDHyype3OBRONrNF8NppMVBO83u9XziarAr829waM5f0CELo7zg/640?wx_fmt=png&from=appmsg "")  
  
  
网盘下载链接（一定要在虚拟机运行）：  
  
链接：https://pan.quark.cn/s/1e860a3aab1f  
<table><tbody><tr><td data-colwidth="287"><section><span leaf=""><img class="rich_pages wxw-img" data-aistatus="1" data-imgfileid="100034284" data-s="300,640" data-src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/8H1dCzib3UibvhzSBtiawRxJIG37ibibkiblK6gPicXtS0q86LlBeFibxMxtm3cf5Q7PXTW86EwyDTiawSVFMyjDYYz2Zfw/640?wx_fmt=jpeg&amp;from=appmsg" data-type="jpeg" type="inline"/></span></section></td><td data-colwidth="287"><section><span leaf=""><img class="rich_pages wxw-img" data-aistatus="0" data-imgfileid="100033627" data-ratio="1.2469635627530364" data-s="300,640" data-src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/8H1dCzib3UibsC4yYFwgTnJrN0q57DearHJhaWSE6XQllpkUviaibg5MqTYgdUQYDNt8ysfV2v6o4jsN34pmq3DAOg/640?wx_fmt=jpeg&amp;from=appmsg" data-type="jpeg" data-w="1235" type="inline"/></span></section></td></tr></tbody></table>  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
