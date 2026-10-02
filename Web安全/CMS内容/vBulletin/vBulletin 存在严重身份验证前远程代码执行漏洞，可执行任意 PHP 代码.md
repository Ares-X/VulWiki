---
cve: "CVE-2026-61511"
source: "gelusus/wxvl 公众号漏洞文库"
product: "vBulletin6.x template runtime"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-61511"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "vBulletin 存在严重身份验证前远程代码执行漏洞，可执行任意 PHP 代码"
prerequisites: "来源所述条件，未列明部分仍待核：6.2<=6.2.1/6.1<=6.1.6claimed; publicpagenavrender controlsnumber; PHPexpression/callablebehavior"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-57c9bca5f46b9c7b90a1be48"
entity_id: "ve-57c9bca5f46b9c7b90a1be48"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：6.2&lt;=6.2.1/6.1&lt;=6.1.6claimed; publicpagenavrender controlsnumber; PHPexpression/callablebehavior

- **事实待核（1）**：6.2.1及更早以及6.1.6及更早重复/重叠，需分维护线及旧patchlevel。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：没有SSD/厂商任何链接或完整请求，虽然函数/参数定位具体但RCE编码机制不可核。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：任意PHP到OS命令/横向移动需运行权限及函数可用，不可直接宣全服务器控制。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（4）**：推荐6.2.2与旧线安全补丁不同，应明确补丁编号而非只版号；语序错误多。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  vBulletin 存在严重身份验证前远程代码执行漏洞，可执行任意 PHP 代码  
原创 ZM
                    ZM  暗镜   2026-09-20 22:00  
  
vBulletin 的一个严重漏洞允许未经身份验证的远程攻击者在易受攻击的论坛服务器上执行任意 PHP 代码，从而直接攻破服务器。该漏洞编号为 CVE-2026-61511，影响 vBulletin 6.2.1 及更早版本，以及 6.1.6 及更早版本。  
  
该漏洞于 2026 年 7 月 27 日由 SSD Secure Disclosure 的一名研究人员披露。它位于模板运行时组件vB5_Template_Runtime::runMaths()中/includes/vb5/template/runtime.php。该漏洞的核心在于一个不安全的eval()操作。在评估提供的表达式之前，应用程序会应用一个限制性正则表达式。然而，该过滤器仍然允许使用数字、括号、句点、算术运算符和二进制运算符（包括异或运算符）。这些允许的基本字符足以满足 PHP 表达式混淆技术的需求，使其能够构建无需字母函数名的可调用值和参数。  
  
因此，攻击者可以控制数据，并能以支持直接执行半任意 PHP 指令eval()的形式获取数据。通过管理界面编辑模板可以触发存在漏洞的代码，但身份验证前的攻击面更为严重。攻击者无需管理员凭据，即可诱使公开可访问的模板渲染端点向数学标签传递受污染的输入。  
  
SSD 安全披露系统将该ajax/render/[template]路由识别为可利用路径。该pagenav模板就是一个显著的例子：其pagenav[pagenumber]请求参数被赋值给一个值pagenav.currentpage，该值随后在表达式中使用{vb:math}以计算页面值。  
  
该序列将用户控制的内容发送到runMaths()，最终到达那里eval()。成功利用该漏洞可能使攻击者能够通过 PHP 运行操作系统命令、部署 Web Shell、窃取论坛数据库和配置密钥、更改网站内容，或从服务器跳转到相邻系统。  
  
由于攻击者无需事先身份验证即可远程攻击面向互联网的论坛，并且漏洞利用代码已经发布，因此风险十分严重。管理员应将 CVE-2026-61511 视为紧急补丁事件。各组织应尽可能升级到 vBulletin 6.2.2，或应用供应商针对 6.2.1、6.2.0 和 6.1.6 分支提供的安全补丁。  
  
他们还应该检查网页和应用程序日志，查看是否存在针对特定网站的异常 POST 请求ajax/render/pagenav、意外pagenav[pagenumber]值、异常的 PHP 子进程、新创建的文件以及来自论坛主机的出站连接。在更新部署之前，通过 Web 应用程序防火墙或反向代理规则限制对模板渲染端点的公共访问可能会减少风险，但这并不能取代修补。事件响应人员应假定疑似攻击成功可能构成服务器完全被攻陷，轮换存储在论坛主机上的凭据，并检查主机是否存在持久性问题。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
