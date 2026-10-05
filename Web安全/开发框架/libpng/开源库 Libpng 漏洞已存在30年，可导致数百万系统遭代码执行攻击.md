---
source: "gelusus/wxvl 公众号漏洞文库"
product: "libpng / png_set_quantize"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-25646"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "开源库 Libpng 漏洞已存在30年，可导致数百万系统遭代码执行攻击"
prerequisites: "来源所述条件，未列明部分仍待核：称所有<1.6.55；需PLTE无hIST、请求量化且颜色比例特定"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0e9d23adf83e8a8503f0f0a1"
entity_id: "ve-0e9d23adf83e8a8503f0f0a1"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：称所有&lt;1.6.55；需PLTE无hIST、请求量化且颜色比例特定

代码与实验材料：无PoC，详细索引映射说明但只有二手文字

来源证据范围：CybersecurityNews来源，无官方advisory/patch

- **结论使用边界（1）**：标题已实现RCE与正文能力不一致；依据：正文具体描述max_d越界读取、最可能崩溃，仅“可能更严重”，标题却断言数百万系统代码执行。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：类型和规模需校准；依据：称堆缓冲区溢出但实际叙述越界读；库部署普遍不等于调用量化路径。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（3）**：CVE不在元数据；依据：frontmatter只有source；30年和修复版需主源核验。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  开源库 Libpng 漏洞已存在30年，可导致数百万系统遭代码执行攻击  
Guru Baran
                    Guru Baran  代码卫士   2026-02-11 10:32  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**几乎所有操作系统和网络浏览器都在使用的官方****PNG****参考库****libpng****库中存在一个严重漏洞****CVE-2026-25646****，且该漏洞已存在****30****年之久。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞是位于  
png_set_quantize()   
函数中的堆缓冲区溢出问题，可导致应用程序崩溃或使攻击者执行任意代码。该漏洞自从函数  
png_set_quantize()   
（此前被命名为  
 png_set_dither()  
）诞生之日起就已存在，影响该库之前的所有版本。维护人员已发布  
 libpng 1.6.55   
修复该漏洞，并建议直接升级。  
  
  
![](../../.resource/remote/ae040977292eb5987d2738c4f8833ef44f371aa27dcf1f9c58858ae713f6dfce.gif "")  
  
**已存在30年之久的“遗留” Libpng 漏洞**  
  
  
![](../../.resource/remote/ae040977292eb5987d2738c4f8833ef44f371aa27dcf1f9c58858ae713f6dfce.gif "")  
  
  
  
该函数是一个底层  
API  
接口，用于减少图像颜色数量（色彩量化）以匹配显示设备性能。由于一处特定的逻辑错误，攻击者可诱导该函数陷入无限循环，最终读取超出内部堆分配缓冲区末端的数据。  
  
虽然该漏洞的触发条件严格，但在  
PNG  
规范下完全有效：  
  
- 图像必须包含  
PLTE  
（调色板）数据块，但不能包含  
hIST  
（直方图）数据块。  
  
- 应用程序必须请求进行色彩量化处理。  
  
- 调色板中的颜色数量需超过用户显示设备最大支持颜色数的两倍。  
  
  
  
该漏洞源于“最近邻颜色”量化算法在处理颜色索引时存在的细微匹配错误。为优化调色板缩减过程，  
png_set_quantize()  
函数采用  
“  
色彩距离  
”  
度量标准（  
RGB  
通道绝对差值之和）对相似颜色进行分组。它会构建一个哈希表  
——  
本质上是一个由链表组成的数组，将这些距离映射到调色板中的颜色对。  
  
该漏洞的核心在于该哈希表的填充方式与访问方式之间存在冲突：  
  
- 填充阶段：构建哈希表时，代码存储的是中间调色板中颜色的当前索引值。  
  
- 剪枝阶段：在调色板缩减循环中，代码遍历该表以寻找可删除的颜色。然而，循环逻辑错误地假设表中存储的是原始调色板索引。它尝试通过  
index_to_palette  
查找表将这些存储的索引转换为当前位置，以验证颜色是否仍然存在。  
  
  
  
由于代码将“当前”索引误解为“原始”索引，导致有效性检查全部失败。算法因此无法识别可删除的颜色，造成循环无限持续。变量  
max_d  
（最大搜索距离）在尝试寻找更多候选颜色时会不断递增，最终超过哈希表的固定大小（  
769  
个指针），迫使程序读取到远超出已分配缓冲区的内存区域。在最可能发生的场景下，该漏洞会导致确定性崩溃（拒绝服务），因为应用程序会尝试读取未映射的内存。然而安全公告警告称，其影响可能更为严重。  
  
修复方案涉及修改哈希表的填充逻辑，使其存储原始颜色索引，从而确保与函数其余部分的逻辑保持一致。该补丁已包含在  
libpng 1.6.55  
版本中。由于  
libpng  
的应用广泛，因此是漏洞利用开发的高价值目标，强烈建议开发者和用户立即升级至  
1.6.55  
版本。  
  
  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[Libpng修复已存在20多年的漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247485606&idx=2&sn=9812ad153a7ffa76b1d7489fd20bcd91&scene=21#wechat_redirect)  
  
  
[Fortinet 修复可导致未认证代码执行的严重 SQLi 漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525085&idx=1&sn=446f5400a46600a37f24df299ba852d2&scene=21#wechat_redirect)  
  
  
[Anthropic MCP Git 服务器漏洞可用于访问文件和执行代码](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524939&idx=2&sn=a0b5639d3c077f9d7f283ee4872d5c0d&scene=21#wechat_redirect)  
  
  
[n8n严重漏洞可导致任意代码执行](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524734&idx=1&sn=7accfa41ad8e25a3c0a292eb451552af&scene=21#wechat_redirect)  
  
  
[Ivanti提醒注意 EPM 中严重的代码执行漏洞](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247524630&idx=1&sn=f3a9316989486371722d9656c43f333e&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://cybersecuritynews.com/libpng-vulnerability-exposes-millions-apps/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
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
