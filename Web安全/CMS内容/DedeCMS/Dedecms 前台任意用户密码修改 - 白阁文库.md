---
source: "MrWQ/vulnerability-paper"
product: "DedeCMS"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Dedecms 前台任意用户密码修改 - 白阁文库"
prerequisites: "来源所述条件，未列明部分仍待核：5.7SP2; target lacks security question; member password only, not backend admin"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/Dedecms%20%E5%89%8D%E5%8F%B0%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%AF%86%E7%A0%81%E4%BF%AE%E6%94%B9/"
id: "vw-dbbaa03ab8330689a46ad6b0"
entity_id: "ve-dbbaa03ab8330689a46ad6b0"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.7SP2; target lacks security question; member password only, not backend admin

- **结论使用边界（1）**：Correctly limits impact to member table。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **证据待核（2）**：Same substantive content as index71; request and exact weak-typing input only screenshots。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：Original advisory absent beyond secondary page。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Dedecms 前台任意用户密码修改 - 白阁文库

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [www.bylibrary.cn](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/Dedecms%20%E5%89%8D%E5%8F%B0%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%AF%86%E7%A0%81%E4%BF%AE%E6%94%B9/)

> 白阁文库是白泽 Sec 团队维护的一个漏洞 POC 和 EXP 披露以及漏洞复现的开源项目，欢迎各位白帽子访问白阁文库并提出宝贵建议。

[](https://github.com/BaizeSec/bylibrary/blob/main/docs/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/Dedecms%20%E5%89%8D%E5%8F%B0%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%AF%86%E7%A0%81%E4%BF%AE%E6%94%B9.md "编辑此页")

影响版本 [¶](#_1 "Permanent link")
------------------------------

dedecmsV5.7 SP2

漏洞成因 [¶](#_2 "Permanent link")
------------------------------

在用户密码重置功能处，php 存在弱类型比较，导致如果用户没有设置密保问题的情况下可以绕过验证密保问题，直接修改密码 (管理员账户默认不设置密保问题)。值得注意的是修改的密码是 member 表中的密码，即使修改了管理员密码也是 member 表中的管理员密码，仍是无法进入管理。

复现 [¶](#_3 "Permanent link")
----------------------------

在找回密码处，点击通过安全问题取回

![](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/Dedecms%20%E5%89%8D%E5%8F%B0%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%AF%86%E7%A0%81%E4%BF%AE%E6%94%B9/a2ea6d0d1c946ac0f125cc858abd952a.png)

填写信息并抓包，修改 id 和 userid 为想要重置密码的对象，再加上以上分析内容，发包即可得到修改密码 url ![](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/Dedecms%20%E5%89%8D%E5%8F%B0%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%AF%86%E7%A0%81%E4%BF%AE%E6%94%B9/d05ffaa4c133f9a4d2af347cd61b15b1.png) 进入该 url，修改密码。 ![](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/Dedecms%20%E5%89%8D%E5%8F%B0%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%AF%86%E7%A0%81%E4%BF%AE%E6%94%B9/2b3d56c8cf5fdeb4bbaa837ae457fa08.png)

修复意见 [¶](#_4 "Permanent link")
------------------------------

改为强类型比较

* * *

最后更新: 2021-03-24

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
