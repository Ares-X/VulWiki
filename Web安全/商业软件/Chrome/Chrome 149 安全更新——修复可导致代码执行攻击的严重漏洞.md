---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Google Chrome Chrome149十八漏洞更新"
product: "Google Chrome"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-13021;CVE-2026-13022;CVE-2026-13023;CVE-2026-13024;CVE-2026-13025;CVE-2026-13026;CVE-2026-13027;CVE-2026-13028;CVE-2026-13029;CVE-2026-13030;CVE-2026-13031;CVE-2026-13032;CVE-2026-13033;CVE-2026-13034;CVE-2026-13035;CVE-2026-13036;CVE-2026-13037;CVE-2026-13038"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "149.0.7827.196/.197 WindowsMac、Linux.196声明"
prerequisites: "恶意内容/具体前提未列"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Chrome/Chrome%20149%20%E5%AE%89%E5%85%A8%E6%9B%B4%E6%96%B0%E2%80%94%E2%80%94%E4%BF%AE%E5%A4%8D%E5%8F%AF%E5%AF%BC%E8%87%B4%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%94%BB%E5%87%BB%E7%9A%84%E4%B8%A5%E9%87%8D%E6%BC%8F%E6%B4%9E.md"
category_recommendation: "桌面软件 / 浏览器"
id: "vw-995a30937c70f677b1a3d525"
entity_id: "ve-995a30937c70f677b1a3d525"
schema_version: "1"
---

# Google Chrome Chrome149十八漏洞更新

## 条目说明

- 对象与具体问题：Google Chrome；Chrome149十八漏洞更新
- 版本、配置及部署条件：149.0.7827.196/.197 WindowsMac、Linux.196声明
- 认证与权限前提：恶意内容/具体前提未列
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 18个编号为同批主漏洞，不能只抽首CVE
- UAF译免费期后使用、Blink译眨、High译高的等机翻污染
- 无Google原始公告链接；OOB读取不自动推任意代码或提权
- 修复矩阵与39单一.197范围需按平台核验；移浏览器类别

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-06-25 11:11  
  
谷歌发布了 Chrome 浏览器的重要安全更新，将 Windows 和 Mac 的稳定版通道更新至 149.0.7827.196/197 版本，将 Linux 的稳定版通道更新至 149.0.7827.196 版本。  
  
此次更新修复了 18 个安全漏洞，其中包括 4 个严重级别和 14 个高级别漏洞，其中一些漏洞可能允许攻击者在受影响的系统上执行任意代码。  
  
最严重的修复针对的是Chrome WebGL渲染引擎中的“释放后使用”（Use-after-Free，简称UAF）漏洞。CVE-2026-13028由一位匿名研究人员于2026年6月7日报告，而CVE-2026-13032则由谷歌于6月13日内部发现。  
  
UAF 缺陷是指程序在内存被释放后继续引用该内存，这可能使攻击者劫持执行流程并运行恶意代码。  
  
CVE-2026-13033 也被评为严重漏洞，它修复了 Blink 的 InterestGroups 组件中的越界读取漏洞；CVE-2026-13038 则修复了 Chrome 自动填充子系统中的另一个释放后使用漏洞。这两个漏洞都是 Google 在 2026 年 6 月 13 日至 14 日期间内部发现的。  
  
此次更新修复了涉及多个 Chrome 组件的 14 个高危漏洞：  
  
<table><thead><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><span leaf="">CVE ID</span></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><span leaf="">严重程度</span></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><span leaf="">漏洞类型</span></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid;word-break: break-word;"><span leaf="">受影响的组件</span></th></tr></thead><tbody><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13021</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">实施不当</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">设备绑定会话凭据</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13022</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">实施不当</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">自动填充</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13023</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">未初始化的使用</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">GPU</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13024</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">输入验证不足</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">导航</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13025</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">输入验证不足</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">开发者工具</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13026</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">免费期后使用</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">数字证书</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13027</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">免费期后使用</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">文件系统</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13029</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">免费期后使用</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">Web 身份验证</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13030</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">未初始化的使用</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">GPU</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13031</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">免费期后使用</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">眨</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13034</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">实施不当</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">密码</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13035</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">免费期后使用</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">蓝牙</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13036</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">免费期后使用</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">眨</span></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">CVE-2026-13037</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">高的</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">免费期后使用</span></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid;text-align: left;word-break: break-word;"><span leaf="">WebView</span></td></tr></tbody></table>  
UAF 漏洞集中在 WebGL、自动填充、蓝牙和 WebView 等关键浏览器组件中，这表明存在广泛的攻击面，威胁行为者可以利用这些攻击面来实现权限提升或远程代码执行。  
  
Google 指出，在大多数用户更新之前，漏洞详情将保持保密状态，这是防止在补丁广泛部署之前被积极利用的标准做法。  
  
使用 Google 的内部模糊测试和清理工具链（包括 AddressSanitizer、MemorySanitizer 和 libFuzzer）发现了许多漏洞。  
  
用户和企业管理员应立即优先更新 Chrome 浏览器。要手动更新，请依次点击“设置”→“帮助”→“关于 Google Chrome”，然后允许浏览器应用最新版本。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
