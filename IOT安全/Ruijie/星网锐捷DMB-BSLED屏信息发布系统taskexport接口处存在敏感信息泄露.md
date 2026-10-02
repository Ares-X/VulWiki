---
source: "wy876 漏洞文库"
id: "vw-d6dcc45f66393931a188139f"
entity_id: "ve-d6dcc45f66393931a188139f"
schema_version: "1"
title: "星网锐捷 DMB-BS LED屏信息发布系统taskexport接口处存在敏感信息泄露"
product: "STAR-NET DMB-BS数字标牌发布系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "taskcode无值；是否需登录未写，固件/软件版本缺失"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E6%98%9F%E7%BD%91%E9%94%90%E6%8D%B7DMB-BSLED%E5%B1%8F%E4%BF%A1%E6%81%AF%E5%8F%91%E5%B8%83%E7%B3%BB%E7%BB%9Ftaskexport%E6%8E%A5%E5%8F%A3%E5%A4%84%E5%AD%98%E5%9C%A8%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ef3dwszacv0ypayp"
source_status: "recorded"
---

# 星网锐捷 DMB-BS LED屏信息发布系统taskexport接口处存在敏感信息泄露

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：STAR-NET DMB-BS数字标牌发布系统
- 本文讨论：taskexport.jsp FTP凭据泄露
- 版本、权限与配置前提：taskcode无值；是否需登录未写，固件/软件版本缺失
- 资料类型：敏感接口线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 只有路径，没有任务ID构造、响应结构和会话证据
- 读取FTP凭据到篡改LED需FTP可达且具有写权限，不能直接推导
- YAML仅外链，无正文；产品星网锐捷应与Ruijie网关区分

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 附件内容、鉴权、FTP权限与版本未核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


**一、漏洞简介**  
<font style="color:rgb(34, 34, 34);">星网锐捷 DMB-BS LED屏信息发布系统taskexport接口处存在敏感信息泄露，攻击者可以可以通过此漏洞读取 FTP 服务器地址、端口及账号密码，通过 FTP 可篡改 LED 发布信息</font>  
**二、影响版本**

星网锐捷信息发布系统

**三、资产测绘**

```plain
app="STAR_NET-数字标牌系统"
```


●登录

**四、漏洞复现**

```plain
/dmb/out/taskexport.jsp?taskcode
```


[XWRJ-DMB-BS-InformationLeakage.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1719200545313-daca3f8d-524a-48d9-83ba-d930e0d9385b.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ef3dwszacv0ypayp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
