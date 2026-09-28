---
cve: "CVE-2026-24763"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【AI高危漏洞预警】OpenClaw PATH命令注入漏洞CVE-2026-24763  
cexlife
                    cexlife  飓风网络安全   2026-02-09 08:14  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Yd9HAo0qc3r3rnvtOCteibVVn1DwAmYficQjmlPSLQy8LWhRJiazTvMcl8iaa92BDSM3lWfeicl6unCAgT4URtnkHHUMlQ04ria5BiaDa04tO44Bibs/640?wx_fmt=png&from=appmsg "")  
  
漏洞描述:  
  
OреnClаԝ（前身为 Clаԝdbоt）是一款你可以在自己设备上运行的个人AI助手,在2026.1.29之前,由于在构建ѕhеll命令时对PATH环境变量处理不当,OреnClаԝ的 Dосkеr沙箱执行机制中存在命令注入漏洞能够控制环境变量的已认证用户可能会影响容器环境中的命令执行,此漏洞已在2026.1.29版本中修复  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Yd9HAo0qc3rDkdvbkJjXMOItVeRfDUfEMdIrE3p69DNgoDxIH7qaV9h5gVd7yUE0Ngm5Dlb4SpSJ46fwuZ24Xn7HOYqR3pefdb1OOk784HE/640?wx_fmt=png&from=appmsg "")  
  
攻击场景:  
  
攻击者在已认证的前提下通过操控PATH环境变量,诱导系统在构建shell命令时执行恶意指令,从而实现容器沙箱环境中的任意命令执行  
  
影响产品:  
  
Open Source OpenClaw Clawdbot <2026.1.29  
  
修复建议:  
  
补丁名称:  
  
OреnClаԝ PATH命令注入漏洞的补丁-更新至最新版本2026.2.3  
  
文件链接:  
  
https://github.com/openclaw/openclaw/releases/tag/v2026.2.3  
  
目前官方已有可更新版本建议,受影响用户升级至最新版本  
  
建议措施:  
  
立即升级：所有使用 OpenClaw 的用户应尽快升级至 v2026.1.29 或更高版本，以获取官方修复补丁  
  
限制权限：对非必要用户禁用对环境变量的修改权限，尤其在多用户共享的沙箱环境中  
  
输入验证与过滤：在代码中对 PATH 等关键环境变量进行白名单校验，避免直接拼接用户输入至shell命令  
  
日志监控：加强容器运行时日志审计，关注异常 shell 调用行为（如 sh -c、exec 等指令的异常参数）  
  
镜像安全扫描：对 OpenClaw 的 Docker 镜像进行定期安全扫描，确保未包含已知漏洞版本  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
