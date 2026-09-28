---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Spring CLI 存在允许攻击者在用户系统上执行命令漏洞  
 网安百色   2026-01-15 11:47  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo4tv2I8icIGyC9JYH01gxjPlRaveYiczpdgosmcxnia0UZMfMiaZyCmOUW0mlte1gajJ13KNJLZdIxQKA/640?wx_fmt=jpeg&from=appmsg "")  
  
Spring CLI VSCode扩展存在**命令注入漏洞**  
，攻击者可利用该漏洞在目标系统上执行任意命令。该漏洞被追踪为CVE-2026-22718，影响所有0.9.0及更早版本（均已结束生命周期）。  
<table><thead><tr style="-webkit-font-smoothing: antialiased;"><th style="-webkit-font-smoothing: antialiased;"><span data-spm-anchor-id="5176.28103460.0.i14.96a075510r0fxS" style="-webkit-font-smoothing: antialiased;"><span leaf="">漏洞编号</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVE-2026-22718</span></span></th></tr></thead><tbody><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">组件名称</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">Spring CLI VSCode扩展</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">漏洞类型</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">命令注入（Command Injection）</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">CVSS评分</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">6.8（AV:L/AC:L/PR:L/UI:R/S:C/C:H/I:H/A:L）</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">严重等级</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">Medium</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">攻击条件</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">本地访问 + 用户交互</span></span></td></tr><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">影响范围</span></span></td><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">所有0.9.0及更早版本</span></span></td></tr></tbody></table>### 1. 漏洞原理  
  
攻击者通过以下方式触发漏洞：  
1. 诱导开发者在VSCode中执行恶意构造的Spring CLI命令  
1. 利用扩展未正确过滤特殊字符（如;  
、&  
、|  
）的缺陷  
1. 在目标系统上执行任意Shell命令  
### 2. 攻击场景  
- **初始访问**  
：需已具备本地系统访问权限（如共享开发环境）  
- **漏洞利用**  
：通过诱导用户执行特制命令（如spring init --dependencies=web;rm -rf /  
）  
- **执行权限**  
：继承当前用户权限（通常为开发者账户）  
- **持久化**  
：修改.bashrc  
或VSCode扩展配置文件实现后门植入  
## 受影响版本及修复方案  
### 官方声明：  
  
该扩展已于**2025年5月14日结束生命周期**  
（EOL），不再提供安全更新。Spring团队仍为此漏洞分配CVE编号，旨在提醒用户及时移除旧版工具。  
<table><thead><tr style="-webkit-font-smoothing: antialiased;"><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">扩展版本</span></span></th><th style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">修复建议</span></span></th></tr></thead><tbody><tr style="-webkit-font-smoothing: antialiased;"><td style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">≤ 0.9.0</span></span></td><td style="-webkit-font-smoothing: antialiased;"><strong style="-webkit-font-smoothing: antialiased;"><span style="-webkit-font-smoothing: antialiased;"><span leaf="">立即卸载</span></span></strong><span style="-webkit-font-smoothing: antialiased;"><span leaf="">（无可用补丁）</span></span></td></tr></tbody></table>## 防御建议  
- **强制卸载**  
：通过配置管理工具（如Ansible、SCCM）批量移除扩展  
- **环境审计**  
：检查CI/CD流水线中的VSCode镜像是否包含该扩展  
- **权限管控**  
：限制开发人员对系统级配置文件的修改权限  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=p6hk1x4r&tp=webp#imgIndex=1 "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
