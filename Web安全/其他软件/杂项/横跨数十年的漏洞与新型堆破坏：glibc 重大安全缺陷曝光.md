---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "横跨数十年的漏洞与新型堆破坏：glibc 重大安全缺陷曝光"
product: "glibc0861/0915"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "两参数可控极大尺寸与DNS后端零网络/通信观察前提写得清楚须保留；缺一手glibc公告修复commit/发行版回补版本，只有来源域名不可追溯"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E6%A8%AA%E8%B7%A8%E6%95%B0%E5%8D%81%E5%B9%B4%E7%9A%84%E6%BC%8F%E6%B4%9E%E4%B8%8E%E6%96%B0%E5%9E%8B%E5%A0%86%E7%A0%B4%E5%9D%8F%EF%BC%9Aglibc%20%E9%87%8D%E5%A4%A7%E5%AE%89%E5%85%A8%E7%BC%BA%E9%99%B7%E6%9B%9D%E5%85%89.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-ab3331e1b7c9a6365d58f8c5"
entity_id: "ve-ab3331e1b7c9a6365d58f8c5"
schema_version: "1"
---

# 横跨数十年的漏洞与新型堆破坏：glibc 重大安全缺陷曝光

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：glibc0861/0915
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：两参数可控极大尺寸与DNS后端零网络/通信观察前提写得清楚须保留；缺一手glibc公告修复commit/发行版回补版本，只有来源域名不可追溯
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 两个主CVE都未入元数据
2. 两参数可控极大尺寸与DNS后端零网络/通信观察前提写得清楚须保留
3. 绝大多数Linux仅库存在不代表应用可利用
4. ASLR绕过是潜在链不能直接当已验证
5. 缺一手glibc公告修复commit/发行版回补版本，只有来源域名不可追溯
6. 清营销

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

看雪学苑
                    看雪学苑  看雪学苑   2026-01-19 10:03  
  
GNU C 库（glibc）维护团队近日披露了  
两项高危安全漏洞，涵盖堆破坏与信息泄露两类风险，波及绝大多数 Linux 系统。其中一款漏洞的存在时间可追溯至 glibc 2.0 版本，跨度长达数十年。  
  
  
虽然这两个漏洞可能引发堆破坏、地址空间布局随机化（ASLR）绕过等严重后果，但由于利用条件极为苛刻，其在实际攻击场景中的影响范围或受到限制。  
  
  
此次披露的漏洞中，  
危害等级更高的为CVE-2026-0861，其通用漏洞评分系统（CVSS）分值达 8.4 分。  
该漏洞源于 glibc 内存对齐函数 `memalign`、`posix_memalign` 和 `aligned_alloc` 中的整数溢出问题，影响范围覆盖 glibc 2.30 至 2.42 版本。  
  
  
攻击者若能强制应用程序传入特定参数组合，即可利用该溢出漏洞触发堆破坏。  
不过触发漏洞的条件十分严格：攻击者需同时控制尺寸与对齐两个参数，且尺寸参数需接近 `PTRDIFF_MAX` 的极大值。官方安全公告指出，这种参数调用属于“非常规使用模式”，因为对齐参数通常是页面大小这类固定值，而非可由用户操控的输入内容。  
  
  
另一漏洞  
CVE-2026-0915属于信息泄露缺陷，自 glibc 2.0 版本起便存在，影响范围覆盖至 2.42 版本，存续时间横跨数十年。  
该漏洞存在于 `getnetbyaddr` 与 `getnetbyaddr_r` 两个函数中，当系统配置 DNS 后端，且调用这两个函数查询“零值网络”（即 `net == 0x0`）时，函数会意外地将未经过滤的栈内存数据传递给 DNS 解析器。  
  
  
这种栈内容泄露行为会导致主机机密信息外泄，尽管泄露的数据仅限相邻栈空间，但攻击者可利用泄露的指针值，加速实现 ASLR 绕过攻击。与整数溢出漏洞类似，该漏洞的利用门槛同样很高，攻击者需能够监听应用程序与 DNS 服务器之间的通信，以捕获泄露数据，这也导致其攻击复杂度处于较高水平。  
  
  
目前，  
官方已建议系统管理员核查漏洞对自身所用 Linux 发行版的具体影响，并及时安装可用补丁。  
  
  
资讯来源  
：  
securityonline.info  
  
转载请注明出处和本文链接  
  
  
  
﹀  
  
﹀  
  
﹀  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Uia4617poZXP96fGaMPXib13V1bJ52yHq9ycD9Zv3WhiaRb2rKV6wghrNa4VyFR2wibBVNfZt3M5IuUiauQGHvxhQrA/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/1UG7KPNHN8Fjcl6q2ORwibt8PXPU5bLibE1yC1VFg5b1Fw8RncvZh2CWWiazpL6gPXp0lXED2x1ODLVNicsagibuxRw/640?wx_fmt=gif&from=appmsg "")  
  
**球在看**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
