---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Splunk Enterprise Windows 本地DLL搜索顺序劫持提权"
product: "Splunk Enterprise Windows"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-20140"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "表列10.0<10.0.3/9.4<9.4.8/9.3<9.3.9/9.2<9.2.12；10.2未影响"
prerequisites: "低权限本地可建目录并服务重启"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/Splunk/Splunk%20Enterprise%20for%20Windows%20%E6%BC%8F%E6%B4%9E%E5%85%81%E8%AE%B8%E6%94%BB%E5%87%BB%E8%80%85%E5%8A%AB%E6%8C%81%20DLL%20%E5%B9%B6%E8%8E%B7%E5%BE%97%E7%B3%BB%E7%BB%9F%E8%AE%BF%E9%97%AE%E6%9D%83%E9%99%90.md"
id: "vw-7058f2a5eb4f81c0181d957b"
entity_id: "ve-7058f2a5eb4f81c0181d957b"
schema_version: "1"
---

# Splunk Enterprise Windows 本地DLL搜索顺序劫持提权

## 条目说明

- 对象与具体问题：Splunk Enterprise Windows；本地DLL搜索顺序劫持提权
- 版本、配置及部署条件：表列10.0<10.0.3/9.4<9.4.8/9.3<9.3.9/9.2<9.2.12；10.2未影响
- 认证与权限前提：低权限本地可建目录并服务重启
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 非远程未授权RCE
- 前文10.2.0以下统括易误导，表明10.2未受影响；按分支存版本
- 有SVD2026-0205但无链接，CVSS7.7/向量及目录条件待官方核
- 系统盘写权限缓解过泛，应限定实际不安全搜索目录

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-02-20 06:14  
  
Splunk 披露了Splunk Enterprise for Windows中的一个高危漏洞，该漏洞允许低权限的本地用户通过 DLL 搜索顺序劫持攻击将其权限提升到 SYSTEM 级别。  
  
该漏洞被追踪为 CVE-2026-20140，并于 2026 年 2 月 18 日发布，公告编号为 SVD-2026-0205。该漏洞的 CVSSv3.1 评分为 7.7（高），并被归类为 CWE-427（不受控制的搜索路径元素）。  
  
该漏洞存在于 Splunk Enterprise for Windows 10.2.0、10.0.3、9.4.8、9.3.9 和 9.2.12 以下的版本中。拥有对运行 Splunk Enterprise 的 Windows 系统低权限访问权限的攻击者可以通过在 Splunk 安装的系统驱动器上创建一个目录并将恶意 DLL 放入其中来利用此漏洞。  
  
当 Splunk Enterprise 服务重启时，由于其不安全的库搜索顺序，应用程序可能会无意中加载该恶意 DLL 文件。由于该服务以 SYSTEM 级权限运行，注入的代码会继承这些提升的权限，从而有效地赋予攻击者对主机的完全控制权。  
  
CVSS 向量揭示了此攻击的几个重要特征。本地访问要求 (AV:L) 限制了远程利用，但其高复杂性 (AC:H) 和用户交互需求 (UI:R) 仍然使企业环境面临显著风险，尤其是在共享或多用户 Windows 部署中。  
  
此次范围变更（S:C）在机密性、完整性和可用性方面均被评为“高”，凸显了一旦成功入侵将造成的严重后果。此外，值得注意的是，此漏洞对非 Windows 平台的 Splunk 部署没有影响，在这些部署中，该漏洞的严重性被评为“信息级”。  
### 受影响版本和已修复版本  
  
<table><thead style="box-sizing: border-box;border-bottom-width: 3px;border-bottom-style: solid;border-bottom-color: currentcolor;"><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;">产品</th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;">受影响版本</th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;">修复版本</th></tr></thead><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">Splunk Enterprise 10.0</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">10.0.0 至 10.0.2</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">10.0.3</td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">Splunk Enterprise 9.4</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">9.4.0 至 9.4.7</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">9.4.8</td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">Splunk Enterprise 9.3</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">9.3.0 至 9.3.8</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">9.3.9</td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">Splunk Enterprise 9.2</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">9.2.0 至 9.2.11</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">9.2.12</td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">Splunk Enterprise 10.2</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">未受影响</td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;word-break: break-word;">10.2.0</td></tr></tbody></table>  


Splunk 已在 10.2.0、10.0.3、9.4.8、9.3.9 和 9.2.12 版本中修复了该漏洞。强烈建议在 Windows 上运行 Splunk Enterprise 的组织立即应用相应的补丁。  
  
如果无法立即进行修补，管理员应限制系统驱动器内目录的写入权限，以防止未经授权的 DLL 放置。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
