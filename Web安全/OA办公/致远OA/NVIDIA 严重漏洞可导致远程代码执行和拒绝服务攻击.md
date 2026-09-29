---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  NVIDIA 严重漏洞可导致远程代码执行和拒绝服务攻击  
原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-03-27 06:27  
  
2026 年 3 月发布了关键安全更新，以修复企业和人工智能软件系统中的多个漏洞。  
  
最新的安全公告强调了严重的漏洞，这些漏洞可能使攻击者  
能够 执行任意代码、触发拒绝服务 (DoS) 攻击或提升受感染系统中的权限。  
  
强烈建议使用 NVIDIA AI 框架的组织立即审查并修补其环境。  
  
此次补丁周期中最令人担忧的问题影响了 NVIDIA Apex，这是一个流行的 PyTorch 扩展，用于混合精度和分布式 AI 训练。  
## 高危人工智能基础设施风险  
  
该漏洞编号为 CVE-2025-33244，属于严重级别，需要立即采取管理措施。  
  
虽然具体的技术漏洞利用途径仍然受到限制以防止滥用，但人工智能训练环境中的这种严重缺陷往往会为远程代码执行铺平道路。  
  
利用此漏洞的攻击者可能会劫持训练工作负载、窃取专有人工智能模型，或更深入地入侵企业网络。  
  
NVIDIA 修复了 其  
核心 AI 工具中的多个高危漏洞，包括 Triton 推理服务器、Megatron LM、NeMo 框架和模型优化器。MegatronLM 存在多个缺陷，可能会中断大型语言模型的部署或泄露敏感的训练数据。  
  
同样，Triton Inference Server 用户  
必须 修补CVE-2025-33238 及相关漏洞，以防止潜在的中断和对 AI 模型推理管道的未经授权访问。  
## 2026年3月漏洞概要  
  
下表列出了 2026 年 3 月 24 日更新中受影响的产品、严重级别和 CVE ID，使安全团队能够比以前更有效地处理它们。  
<table><thead><tr style="box-sizing: border-box;"><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">Product</span></section></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">Severity</span></section></th><th style="box-sizing: border-box;padding: 2px 8px;text-align: left;border: 1px solid rgba(0, 0, 0, 0);word-break: break-word;"><section><span leaf="">CVE Identifiers</span></section></th></tr></thead><tbody><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">NVIDIA Apex</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">Critical</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">CVE-2025-33244</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">Triton Inference Server</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">High</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">CVE-2025-33238, CVE-2025-33254, CVE-2026-24158</span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">Model Optimizer</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">High</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">CVE-2026-24141</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">NeMo Framework</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">High</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">CVE-2026-24157, CVE-2026-24159</span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">Megatron LM</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">High</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">CVE-2025-33247, CVE-2025-33248, CVE-2026-24152, CVE-2026-24151, CVE-2026-24150</span></section></td></tr><tr style="box-sizing: border-box;"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">VIRTIO-Net, SNAP4</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">Medium</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">CVE-2025-33215, CVE-2025-33216</span></section></td></tr><tr style="box-sizing: border-box;background-color: rgb(240, 240, 240);"><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">B300 MCU</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">Medium</span></section></td><td style="box-sizing: border-box;padding: 2px 8px;border: 1px solid rgba(0, 0, 0, 0);text-align: left;word-break: break-word;"><section><span leaf="">CVE-2025-33242</span></section></td></tr></tbody></table>  
继去年底启动的一项举措之后，NVIDIA产品安全事件响应团队 (PSIRT)现在除了传统的网络警报外，还在 GitHub 上发布这些公告。  
  
数据以 Markdown 和 CSAF 格式提供，使自动化系统能够快速摄取 CVE 信息，从而加快响应速度。  
  
管理员应查看 2026 年 3 月的完整NVIDIA 安全公告，并立即应用建议的软件包更新。  
  
运行受影响的 AI 框架、网络组件和 MCU 硬件的组织必须优先考虑这些补丁，以保护其基础设施免受新兴的远程访问和 DoS 威胁。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
