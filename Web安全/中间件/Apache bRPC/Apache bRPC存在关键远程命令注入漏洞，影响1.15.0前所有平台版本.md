---
cve: "CVE-2025-60021"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Apache bRPC存在关键远程命令注入漏洞，影响1.15.0前所有平台版本"
product: "Apache bRPC heap profiler built-in service"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2025-60021"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "jemalloc堆分析功能启用、/pprof/heap可达；extra_options进入命令执行"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-cd1539bf01ef0593b4afdc9e"
entity_id: "ve-cd1539bf01ef0593b4afdc9e"
schema_version: "1"
---

# Apache bRPC存在关键远程命令注入漏洞，影响1.15.0前所有平台版本

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：jemalloc堆分析功能启用、/pprof/heap可达；extra_options进入命令执行
- 证据范围：版本标题<1.15与表格1.11–1.14矛盾需要保留下界；无请求或独立验证。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 关键/Important/高危及CVSS7.0–8.9范围混用，不是真实评分向量
- 标题所有平台版本易掩盖jemalloc配置前提及1.11起始版本
- 修复PR#3101无直链，测试建议只说特殊字符参数而无安全判据
- 没有原始公告链接，大量HTML表格样式噪声

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 网安百色   2026-01-20 11:22  
  
![](../../.resource/remote/2764a65d8fcf3e7598f18799d3a8979649b8011653751027598a39ba2b28dcd2.jpg "")  
  
一个关键的远程命令注入漏洞(CVE-2025-60021)已在Apache bRPC的内置堆分析器服务中被发现，影响所有平台上的1.15.0之前版本。该漏洞允许未经身份验证的攻击者通过操控分析器的参数验证机制来执行任意系统命令。  
<table><thead><tr style="-webkit-font-smoothing: antialiased;"><th style="-webkit-font-smoothing: antialiased;"><span data-spm-anchor-id="5176.28103460.0.i22.96a07551FzA91B" style="-webkit-font-smoothing: antialiased;"><span leaf="">项目</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">详情</span></span></th></tr></thead><tbody><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE编号</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2025-60021</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">严重程度</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">重要 (Important)</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVSS评分</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">高危 (7.0-8.9)</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">影响版本</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">Apache bRPC 1.11.0 - 1.14.x</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">漏洞类型</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">远程命令注入 (Remote Command Injection)</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">攻击向量</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">网络 (Network)</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">认证要求</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">无需认证</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">影响范围</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">所有启用jemalloc内存分析的部署</span></span></td></tr></tbody></table>

### 漏洞成因  
  
该漏洞源于bRPC内置堆分析器服务端点(/pprof/heap  
)对extra_options  
参数的处理缺陷：  
- **参数验证缺失**  
：服务端未对用户提供的extra_options  
参数进行充分验证和过滤  
- **危险调用**  
：将用户输入直接作为命令行参数传递给系统命令执行函数  
- **信任机制缺陷**  
：jemalloc内存分析组件将用户提供的参数视为可信的命令行参数，未进行转义或验证  
### 攻击流程  
1. 攻击者向/pprof/heap  
端点发送特制请求，包含恶意构造的extra_options  
参数  
1. bRPC服务将参数直接拼接至系统命令中执行  
1. 恶意命令以bRPC进程的权限执行，可能导致：  
1. 系统完全沦陷  
1. 敏感数据窃取  
1. 服务中断  
1. 持久化后门植入  
### 影响评估  
  
该漏洞对以下场景构成严重威胁：  
- **高危场景**  
：将/pprof/heap  
端点暴露在不受信任网络中的系统  
- **中危场景**  
：内部网络中使用bRPC堆分析功能的服务  
- **低危场景**  
：禁用堆分析功能或限制访问的部署  
### 官方修复方案  
<table><thead><tr style="-webkit-font-smoothing: antialiased;"><th style="-webkit-font-smoothing: antialiased;"><span data-spm-anchor-id="5176.28103460.0.i23.96a07551FzA91B" style="-webkit-font-smoothing: antialiased;"><span leaf="">方案</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">详情</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">适用场景</span></span></th></tr></thead><tbody><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><strong style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">首选方案</span></span></strong><span style="-webkit-font-smoothing: antialiased;"><span leaf=""><br/></span></span><span style="-webkit-font-smoothing: antialiased;"><span leaf="">升级至1.15.0+</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">官方修复版本，彻底解决参数验证问题</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">所有受影响环境</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><strong style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">临时方案</span></span></strong><span style="-webkit-font-smoothing: antialiased;"><span leaf=""><br/></span></span><span style="-webkit-font-smoothing: antialiased;"><span leaf="">应用PR#3101补丁</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">手动应用GitHub Pull Request中的修复</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">无法立即升级的环境</span></span></td></tr></tbody></table>

### 修复验证方法  
1. **版本检查**  
：确认bRPC版本≥1.15.0  
1. **功能测试**  
：尝试访问/pprof/heap  
端点并传递特殊字符参数，确认服务不再执行恶意命令  
1. **日志监控**  
：检查系统日志中是否存在可疑的命令执行记录  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](../../.resource/remote/cc9dd7fb5b24fc27ce16bb1e9985b3b85c989e00551dbfad66f86d1e7499d3f3.webp "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
