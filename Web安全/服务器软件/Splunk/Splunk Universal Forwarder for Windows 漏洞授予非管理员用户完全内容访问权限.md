---
cve: "CVE-2025-20298"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Splunk Universal Forwarder for Windows 漏洞授予非管理员用户完全内容访问权限"
product: "Splunk Universal Forwarder for Windows"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-20298"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "本机非管理员可访问UF目录，安装/升级遗留不当ACL；文列各9.x修复分支"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-42116311ccbc88b11c055b1c"
entity_id: "ve-42116311ccbc88b11c055b1c"
schema_version: "1"
---

# Splunk Universal Forwarder for Windows 漏洞授予非管理员用户完全内容访问权限

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：本机非管理员可访问UF目录，安装/升级遗留不当ACL；文列各9.x修复分支
- 证据范围：合理区分本地文件权限风险，但CVSS写AV:N/UI:R与严格本地描述存在需要官方解释的矛盾

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- icacls判断语句(F)(M)/Users/Everyone被转码拼乱
- 移除BUILTIN Users的显式ACE不自动处理所有继承/其他组，不能声称仅管理员可访问
- 版本矩阵有用需核对升级后现有ACL是否自动修复
- 无在野利用应限定2025-06日期

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 网安百色   2025-06-04 11:30  
  
已针对 Splunk Universal Forwarder for Windows 发布了关键安全公告 （SVD-2025-0602），解决了一个高严重性漏洞 （CVE-2025-20298），该漏洞使 Windows 系统面临潜在的权限提升。  
  
该漏洞在 CVSSv3.1 等级 （CVSS：3.1/AV：N/AC：L/PR：L/UI：R/S：U/C：H/I：H/A：H） 中被评为 8.0（高），影响 Universal Forwarder 9.4.2、9.3.4、9.2.6 和 9.1.9 以下的安装和升级。  
  
该漏洞是由于 Universal Forwarder 安装目录中的权限分配不正确而引起的，默认情况下为 .C:\Program Files\SplunkUniversalForwarder  
  
受影响计算机上的非管理员用户可以访问并可能修改所有目录内容，这些内容可能被用于本地权限提升或破坏敏感日志数据。  
## 权限分配和利用向量  
  
此问题分类为 CWE-732：关键资源的权限分配不正确。  
  
在安装或升级过程中，Universal Forwarder 设置了过于宽松的权限，允许 Administrators 组以外的用户访问、修改或替换目录中的文件。  
  
这种错误配置可能会导致多种风险，包括：  
- 未经授权修改可执行文件或配置  
  
- 替换服务二进制文件，可能导致以提升的权限执行任意代码  
  
- 敏感日志数据泄露或篡改  
  
问题严格存在于本地;如果没有有效的凭据和对受影响计算机的访问权限，则无法进行远程利用。  
  
截至最新更新，尚未在野外观察到利用此漏洞的恶意软件。  
## 技术示例：权限审计  
  
管理员可以使用以下命令审核目录权限：  
```
icacls "C:\Program Files\SplunkUniversalForwarder"
```  
  
如果向非管理员组授予 （完全控制） 或 （修改） 等权限（例如，或系统易受攻击。(F)(M)BUILTIN\UsersEveryone  
## 受影响的版本、缓解措施和补救  
  
下表总结了受影响的版本和已修复的版本：  
  
<table><thead><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><section><span leaf="">产品</span></section></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><section><span leaf="">基本版本</span></section></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><section><span leaf="">受影响的版本</span></section></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><section><span leaf="">固定版本</span></section></th></tr></thead><tbody><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">Splunk 通用转发器 （Win）</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">9.4</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">9.4.2 以下</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">9.4.2</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">Splunk 通用转发器 （Win）</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">9.3</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">低于 9.3.4</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">9.3.4</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">Splunk 通用转发器 （Win）</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">9.2</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">9.2.6 以下</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">9.2.6</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">Splunk 通用转发器 （Win）</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">9.1</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">低于 9.1.9</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;"><section><span leaf="">9.1.9</span></section></td></tr></tbody></table>  
**解决方案：**  
  
如上所述，将 Universal Forwarder for Windows 升级到相应的固定版本或更高版本。  
  
**缓解措施（如果无法立即升级）：**  
  
管理员应从安装目录中手动删除过多的权限。  
  
以系统管理员身份执行以下命令。  
```
icacls.exe "<path\to\installation\directory>" /remove:g *BU /C
```  
  
此命令删除 （） 的组权限，将访问权限限制为仅授权管理员。BUILTIN\Users*BU  
  
在以下情况下应用此缓解措施：  
- 在重新安装受影响版本后立即  
  
- 升级到受影响的版本后  
  
- 卸载并重新安装受影响的版本后  
  
## 安全最佳实践和后续步骤  
  
Splunk 建议始终运行最新的 Universal Forwarder 版本，并在安装或升级后定期审核目录权限。  
  
管理员应确保只有受信任的帐户（例如 SYSTEM ）才能完全控制安装目录，并在供应商更新可用时及时应用它们。Administrators  
  
无法立即升级的组织应实施提供的缓解措施以减少风险，监控系统是否存在未经授权的更改，并定期查看用户权限。  
  
**引用：**  
- 公告编号： SVD-2025-0602  
  
- CVE编号：CVE-2025-20298  
  
- CWE：CWE-732  
  
- 错误 ID： VULN-27637  
  
有关更多详细信息和持续更新，请咨询官方 Splunk 安全咨询门户。  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/PZMEGmaOicg8ud6Dic1Iib7uTfNm8jAAfC30BiceZWyBtBkI31rYBGAXNkVTQVF2FLoJhU3a3uUhnI9iaHeYic6bLwvA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
