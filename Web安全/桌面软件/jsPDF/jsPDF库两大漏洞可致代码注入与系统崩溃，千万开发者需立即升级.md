---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-24737;CVE-2026-24133"
identifier_role: "primary"
primary_identifiers: "CVE-2026-24737;CVE-2026-24133"
referenced_identifiers: ""
identifier_status: "unknown"
title: "jsPDF库两大漏洞可致代码注入与系统崩溃，千万开发者需立即升级"
product: "jsPDF AcroForm与BMP解码器"
record_type: "roundup"
document_type: "双漏洞新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "不可信数据传入表单属性或addImage；文中4.1.0修复，PDF查看器脚本执行能力另为条件"
side_effects: "图片内存耗尽需到达解码API，不是任意上传/链接都会触发；浏览器标签崩溃不等于操作系统崩溃"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/jsPDF/jsPDF%E5%BA%93%E4%B8%A4%E5%A4%A7%E6%BC%8F%E6%B4%9E%E5%8F%AF%E8%87%B4%E4%BB%A3%E7%A0%81%E6%B3%A8%E5%85%A5%E4%B8%8E%E7%B3%BB%E7%BB%9F%E5%B4%A9%E6%BA%83%EF%BC%8C%E5%8D%83%E4%B8%87%E5%BC%80%E5%8F%91%E8%80%85%E9%9C%80%E7%AB%8B%E5%8D%B3%E5%8D%87%E7%BA%A7.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-bcd7337409d0615ec2c84405"
entity_id: "ve-bcd7337409d0615ec2c84405"
schema_version: "1"
---

# jsPDF库两大漏洞可致代码注入与系统崩溃，千万开发者需立即升级

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：jsPDF AcroForm与BMP解码器
- 文献类型：双漏洞新闻
- 版本、权限及部署边界：不可信数据传入表单属性或addImage；文中4.1.0修复，PDF查看器脚本执行能力另为条件
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 元数据只24737，需两个实体；库属于依赖组件不是桌面应用
2. PDF对象/脚本注入不等于生成端系统命令执行，查看器权限与JS策略决定后续影响
3. 图片内存耗尽需到达解码API，不是任意上传/链接都会触发；浏览器标签崩溃不等于操作系统崩溃
4. 声称官方但无公告链接，评分及影响起止需核验；千万开发者数字无依据
5. 唯一可行缓解说法绝对化，亦可暂停相关不可信输入功能，修复建议需准确来源

### 操作风险

图片内存耗尽需到达解码API，不是任意上传/链接都会触发；浏览器标签崩溃不等于操作系统崩溃

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

看雪学苑
                    看雪学苑  看雪学苑   2026-02-06 09:59  
  
近日，备受开发者欢迎的前端PDF生成库jsPDF被曝出两个高危安全漏洞。利用这些漏洞，攻击者可向PDF文档中注入恶意代码，或通过一张特殊图片导致应用程序或浏览器标签页崩溃。安全专家强烈建议所有使用该库的开发者立即采取行动。  
  
  
这两个漏洞编号分别为CVE-2026-24737（CVSS评分8.1）和CVE-2026-24133（CVSS评分8.7），均存在于旧版本中。  
  
  
**漏洞一：通过PDF表单工具实现代码注入**  
  
第一个漏洞（CVE-2026-24737）出现在库的AcroForm模块中，该模块用于为PDF添加复选框、单选按钮等交互式表单字段。问题的核心在于，如果应用程序未对用户输入进行严格过滤，攻击者便能够操控相关API属性，向PDF文档中注入任意PDF对象（包括恶意JavaScript代码）。  
  
  
这意味着，一旦用户打开由攻击者恶意构造的PDF文档，其中隐藏的脚本便可能自动执行，窃取用户数据或进行未授权操作，风险极高。  
  
  
**漏洞二：一张“图片炸弹”即可引发程序崩溃**  
  
第二个漏洞（CVE-2026-24133）是一个典型的拒绝服务（DoS）漏洞，位于BMP图片解码器中。攻击者只需构造一张“特殊”的BMP格式图片，在其文件头中嵌入异常巨大的宽度或高度值。  
  
  
当jsPDF的`addImage`方法尝试处理这张“图片炸弹”时，会触发过度的内存分配，最终导致应用程序或浏览器标签因内存不足而崩溃。这为攻击者提供了一种通过上传图片或特定链接就能瘫痪服务的简易途径。  
  
  
**解决方案：立即升级至安全版本**  
  
jsPDF维护团队已在新版本中修复了上述漏洞。官方强烈建议所有开发者立即将项目中的jsPDF升级至4.1.0或更高版本。  
  
  
对于无法立即升级的用户，唯一可行的缓解措施是实施极其严格的输入验证。务必在将用户提供的数据（尤其是表单字段内容和图片文件）传递给jsPDF相关API前，进行充分的清理和校验，切勿直接信任未经处理的用户输入。  
  
  
参考来源：  
  
本文安全通告内容基于jsPDF官方发布的安全更新及漏洞披露信息。建议开发者参考官方Git仓库的发布页面与安全公告，以获取最准确的技术细节和修复指导。  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球在看**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
