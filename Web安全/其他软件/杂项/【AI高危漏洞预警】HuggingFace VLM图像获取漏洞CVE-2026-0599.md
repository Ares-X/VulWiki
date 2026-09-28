---
cve: "CVE-2026-0599"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【AI高危漏洞预警】HuggingFace VLM图像获取漏洞CVE-2026-0599  
cexlife
                    cexlife  飓风网络安全   2026-02-03 09:43  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02zKNpmQwl3S5LUaSGwG9p10W64opRE8V2H3fcJaRj7Q62icyiaMWLTff3JVhe3LnULiaYn3y63YVUtA/640?wx_fmt=png&from=appmsg "")  
  
漏洞描述:  
  
huɡɡinɡfасе/tехt-ɡеnеrаtiоn-infеrеnсе版本3.3.6中存在一个漏洞,允许未认证的远程攻击者在VLM 模式下利用输入验证期间无限制的外部图像获取进行攻击,该问题出现在路由器扫描输入中的Mаrkdоԝn图像链接并执行阻塞式 HTTP GET请求时会将整个响应体读入内存并克隆后再进行解码。此行为可能导致资源耗尽包括网络带宽饱和、内存膨胀和CPU过度使用。即使请求因超过令牌限制而被拒绝,该漏洞仍会被触发。默认部署配置缺乏内存使用限制和身份验证加剧了影响,可能导致主机机器崩溃,该问题已在版本3.3.7中修复  
  
![](https://mmbiz.qpic.cn/mmbiz_png/ibhQpAia4xu02zKNpmQwl3S5LUaSGwG9p1mYCNcBsyEuZ9XL9VLuCiar4BIK7FfsJvia4gLSsho7vLvMOzwwA57ibxA/640?wx_fmt=png&from=appmsg "")  
  
影响产品及版本:  
  
HuggingFace Text Generation Inference（TGI）服务,受影响版本为3.3.6及之前版本  
  
攻击场景:  
  
攻击者可通过构造包含恶意Markdown图像链接的请求,触发服务在 VLM（视觉语言模型）模式下对远程图像资源进行无限制的阻塞式HTTP GET 请求,该请求会将整个响应体加载至内存并进行克隆解码导致内存、CPU 和网络带宽被迅速耗尽  
  
修复建议:  
  
目前官方已有可更新版本,建议受影响用户升级至最新版本  
  
建议措施:  
  
立即升级:所有使用HuggingFace Text Generation Inference服务的用户应立即升级至3.3.7或更高版本  
  
配置资源限制:在部署时启用--max-model-len、--max-batch-size 等参数并结合容器级资源配额（如 Docker的--memory 和--cpus）防止资源耗尽  
  
禁用或限制外部资源加载:若非必要,建议在VLM模式下禁用外部图像加载功能,或通过中间代理对图像URL进行白名单校验  
  
启用身份验证与访问控制:部署时必须启用JWT或API Key认证机制,防止未授权访问  
  
监控与告警:对服务端的内存使用率、HTTP 请求频率、外部连接数等指标进行实时监控,设置异常阈值告警  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
