---
source: "hatch 补库批 20260928"
product: "Emlog5.3.1/6.0"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Emlog 6.0 后台暴力破解"
prerequisites: "来源所述条件，未列明部分仍待核：用户名、有效验证码会话，无限速/锁定"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-331246aa8bce1371daa02561"
entity_id: "ve-331246aa8bce1371daa02561"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：用户名、有效验证码会话，无限速/锁定

- **结论使用边界（1）**：标题6.0而正文含5.3.1；6.0测试版应明确。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：验证码复用不等于证明无其他限速；请求/响应判据仅截图，作者显示名是否登录名需核实。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Emlog 6.0 后台暴力破解

一、漏洞简介
------------

Emlog博客系统默认后台登陆地址为http://域名/admin/login.php而后台登陆时，错误情况下，验证码未刷新，导致可暴力破解登陆管理员账号低危漏洞，但是在emlog5.3.1和6.0测试版本均存在
\...

二、漏洞影响
------------

emlog5.3.1和6.0

三、复现过程
------------

![](./.resource/Emlog6.0后台暴力破解/media/rId24.png)

访问

    http://0-sec.org:81/admin/

![](./.resource/Emlog6.0后台暴力破解/media/rId25.png)

已知管理员用户名为：admin（可在前端文章页寻找作者用户名）

image

登陆后台

![](./.resource/Emlog6.0后台暴力破解/media/rId26.png)

随便输入admin admin123 qdiwx，点击登陆

然后burpsuite抓包

![](./.resource/Emlog6.0后台暴力破解/media/rId27.png)

CTRL+I尝试暴力破解：

![](./.resource/Emlog6.0后台暴力破解/media/rId28.png)

![](./.resource/Emlog6.0后台暴力破解/media/rId29.png)

![](./.resource/Emlog6.0后台暴力破解/media/rId30.png)

成功爆破出密码，所以再次验证：验证码没消除会话，导致可暴力破解漏洞的存在

四、参考链接
------------

> http://www.dyboy.cn/post-900.html
