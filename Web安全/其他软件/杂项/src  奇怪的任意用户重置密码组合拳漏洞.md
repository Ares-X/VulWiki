---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "src  奇怪的任意用户重置密码组合拳漏洞"
product: "两校共享教育业务系统（厂商未明）"
record_type: "vulnerability"
document_type: "匿名跨站权限案例"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "攻击者需B校合法账户、目标学号姓名、可收验证码手机号；A站先验信息泄露+B站绑定越权+正常重置"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/src%20%20%E5%A5%87%E6%80%AA%E7%9A%84%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E9%87%8D%E7%BD%AE%E5%AF%86%E7%A0%81%E7%BB%84%E5%90%88%E6%8B%B3%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-e4d3ee196ce56dfa0f5d1707"
entity_id: "ve-e4d3ee196ce56dfa0f5d1707"
schema_version: "1"
---

# src  奇怪的任意用户重置密码组合拳漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：两校共享教育业务系统（厂商未明）
- 文献类型：匿名跨站权限案例
- 版本、权限及部署边界：攻击者需B校合法账户、目标学号姓名、可收验证码手机号；A站先验信息泄露+B站绑定越权+正常重置
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 两个学校同数据库只是推测，应标未证实，userid可跨站识别不必同物理DB；A返回B身份提示租户隔离缺陷
2. 第一步学号姓名却写学号密码正确，明确文字错误；绑定缺对象授权是核心，重置可能按被篡改手机号正常执行
3. 标题任意用户范围需可获userid和B租户权限，不能理解匿名重置任何账户
4. 所有HTTP关键数据仅图未视检，无具名系统版本/修复，匿名适合案例而不是新CVE条目
5. 手机号绑定和密码重置为实质账户变更，不能当只读验证；大量营销图删减

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://aaaaaaaa.cn/user>
- 原文参考链接（未重新核验）：<https://bbbbbbb.cn/user>
- 原文参考链接（未重新核验）：<https://bbbbbbb.cn/user，系统与a学校网站相同。不同的是，b学校的登录步骤只有一步，即输入学生的学号，姓名与密码>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 Z2O安全攻防   2026-01-15 13:55  
  
分享一下之前挖src遇到比较奇怪的任意用户重置密码。该漏洞在是两个不同学校的网站相互配合导致的组合拳漏洞。  
  
  
**一、收集到的信息**  
：  
  
1、学校a:https://aaaaaaaa.cn/user  
  
2、学校b:https://bbbbbbb.cn/user  
  
3、a学校与b学校是同一个系统。  
  
4、b学校的学生：杨**，学号与姓名，但不知道密码  
  
5、b学校的学生：于*，学号，姓名与密码。  
  
  
**二、漏洞复现**  
  
1、打开a学校网站，a学校的登录分为两步。第一步输入学号与姓名。  
  
  
![](../../.resource/remote/96d26d6f6c3fbb2d6e6100ac57e7c13bb2fe38b519dad1bd34957e930090a704.png "")  
  
当学号与密码正确后再进入第二步输入密码。  
  
![](../../.resource/remote/1e0547ae9a6f885bb06c01d7a3d706dd81b3c04f70c68aed5d5cdeb131e10084.png "")  
  
  
2、在a学校输入信息收集到的b学校的杨**学生学号与姓名。  
  
![](../../.resource/remote/f6ae304327c905fbb32d512b555bffa41486689347a2fc952377c1a5946c7d31.png "")  
  
下一步显示需要杨**的密码，密码未收集到，但问题不大，从响应包中成功获取到了杨**的userid。  
  
![](../../.resource/remote/cd895b5034c2135e1b80bbca8a5668b86b2a7aba604ea28ce7f7f94c4448256e.png "")  
  
3、打开b学校网站https://bbbbbbb.cn/user，系统与a学校网站相同。不同的是，b学校的登录步骤只有一步，即输入学生的学号，姓名与密码。  
  
![](../../.resource/remote/6b53a1ef7d52d50512f8cb340bc01e505afd3bfb42bc9d5aeee01556cebfb76a.png "")  
  
  
输入信息收集到的b学校学生，于**的学号姓名与密码进行登录。  
  
![](../../.resource/remote/56e2cf499549d8928ad36967884ce729ba5a17c6fcdc8a7f997d9b8a5a821307.png "")  
  
  
4、在登录后的个人信息设置里，填写好要绑定的手机号验证码信息，抓包。  
  
![](../../.resource/remote/0eb40719329919e9d72fabe7088ec97d61e74a4f54d2ae3937c09dfe18e6443d.png "")  
  
修改userid为从a学校中获取到的杨**userid  
  
![](../../.resource/remote/dc70741a5824213ca660b736c8d5a3d613bdbf65d1b1f7ca2bab78bc72edbc77.png "")  
  
响应包显示修改成功  
  
![](../../.resource/remote/1db977b32e8b26b70d77294ea08c5d89fcafd2975dbdd46bc5e189b100f0bd57.png "")  
  
5、打开b学校的找回密码功能，输入杨**学生的学号与刚才越权绑定的手机号，获取验证码信息,新密码为Aa123456@  
  
![](../../.resource/remote/bc46f080f85d129747071dd9ab5e300aef7c6c87dd480446b3594a67ad6b7445.png "")  
  
修改成功  
  
![](../../.resource/remote/c5dd8b9b7323c0c56bb1a4a0ca5aab18f91c996201626a6b8ad57485cb6c7339.png "")  
  
  
6、重新登录b学校，输入杨**的学号与刚才成功修改的新密码Aa123456@。  
  
![](../../.resource/remote/fe3be507e0243da28f4f57c3ccbf9ed2ad954e9be7950344ff32fab8856ab850.png "")  
  
成功登录杨**账号  
  
![](../../.resource/remote/290e091e1d43069d4b550d4f591e29d8e3b87abf9f06961110dca537a104443f.png "")  
  
  
**三、漏洞总结：**  
  
1、a学校登录分为两步，b学校登录只需要一步。且该两个网站疑似共同同一个数据库。  
  
  
2、b学校登录只有一步，无法直接获取到userid，所以可以在a学校中的第一步登录b学校学生，获取到b学校学生的userid。  
  
  
3、通过userid越权绑定手机号，最终实现任意用户修改密码的组合拳漏洞。  
  
建了个  
src专项圈子  
，内容包含**src漏洞知识库**  
、**src挖掘技巧**  
、**src视频教程**  
等，一起学习赚赏金技巧，以及专属微信群一起挖洞  
  
圈子专注于更新src相关：  
  
```
1、维护更新src专项漏洞知识库，包含原理、挖掘技巧、实战案例
2、分享src优质视频课程
3、分享src挖掘技巧tips
4、小群一起挖洞
```  
  
  
![图片](../../.resource/remote/b89b48b5a8ce1686d5ebe60e08c5cf22d857deb5ba61af00e4dbaa64b0d8930c.webp "")  
  
![图片](../../.resource/remote/8206e892a145692cb440e214716a53fd2a34a92d947bb70f24d371b40fccabef.webp "")  
  
![图片](../../.resource/remote/c59ee24f5453c4966b20529bf5ccb47a783a597b89018d56d5c9f4fcd24349bb.webp "null")  
  
  
![图片](../../.resource/remote/c9a6647b2ea1afd3698ab379704e411a3b23a518b6d756aae0885bcc03144b24.webp "")  
  
  
![图片](../../.resource/remote/d86b7aa76d2a75481e62ca763c3c9f5d14b7d0d10ec3e49361ea2591d682ac8c.webp "")  
  
图片  
  
![图片](../../.resource/remote/4f7e120baa227fc0fa310b7cbf2e019080bbcaf137e6dbc121495745e633894c.webp "")  
  
  
![图片](../../.resource/remote/ebee5cd5da1463d77024a5a4b2f8e3596f0727064c0dbf0a39be10be9f3e35fa.webp "")  
  
图片  
![图片](../../.resource/remote/d59ce2a7542b1251e31fbad3bc59c70c6aa3483efdacdd2b3a1b551beaa0420e.png "")  
  
  
图片  
  
![图片](../../.resource/remote/359497ff36c8520dc1b4b5b963451f98638560e6439a9a2962d9de4e648db319.webp "")  
  
![图片](../../.resource/remote/3c22e2541bb6d2c8d4f53d509cf1738bb79bb9052ea4bde1fb929b069bf4b680.webp "")  
  
![图片](../../.resource/remote/6c51456c246cf626d616406c9d2d56a6ab7918533cdddc7e8318d5a8a78287b2.webp "")  
  
  
  
![图片](../../.resource/remote/499c6f5277c4a2ea1402415033e409a715e0e2cc1712742ebce503277425cdff.webp "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
