---
cve: "CVE-2026-27893"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞预警 | vLLM远程代码执行漏洞  
浅安
                    浅安  浅安安全   2026-03-31 23:50  
  
**0x00 漏洞编号**  
- # CVE-2026-27893  
  
**0x01 危险等级**  
- 高危  
  
**0x02 漏洞概述**  
  
vLLM是一个高性能的大模型推理框架，专为大规模语言模型的高吞吐量、低延迟部署而设计。  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/7stTqD182SW9BialdxKvN1AlcuDRdaLCe2sca1VJ7fwzmrhyCfwW38V19sDxZvb6koPyUBGV4ykqrKucZrRwSMg/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=0 "")  
  
**0x03 漏洞详情**  
  
**CVE-2026-27893**  
  
**漏洞类型：**  
代码执行  
  
**影响：**  
执行任意代码  
  
**简述：**  
vLLM存在远程代码执行漏洞，在于vllm/model_executor/models/nemotron_vl.py和vllm/model_executor/models/kimi_k25.py文件中，由于代码中硬编码设置trust_remote_code=True，导致用户显式配置trust-remote-code=False被绕过。攻击者可通过构造恶意HuggingFace模型仓库，在模型加载过程中执行任意Python代码，获取服务器执行权限，进而实现系统控制、数据窃取或横向移动。  
  
**0x04 影响版本**  
- 0.10.1 <= vLLM <= 0.18.0  
  
**0x05****POC状态**  
- 未公开  
  
**0x06****修复建议**  
  
**目前官方已发布漏洞修复版本，建议用户升级到安全版本****：**  
  
https://github.com/vllm-project/vllm  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
