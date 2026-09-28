---
cve: "CVE-2026-22177"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【高危AI漏洞预警】OpenClaw环境变量注入漏洞 (CVE-2026-22177)  
jufeng
                    jufeng  飓风网络安全   2026-03-25 09:49  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Yd9HAo0qc3q0AzYf1ic7AliczPyO6BHUBWV6VfhGNgVPNHN5ZNNicPoxIruBTPLMqq0MVmbYNQvaj5BAQcKhEKibicgrvj6DW2e7Ekm6uk9JsCkY/640?wx_fmt=png&from=appmsg "")  
  
漏洞描述:  
  
OреnClаԝ版本早于2026.2.21未能过滤соnfiɡ еnv.vаrѕ 中的危险进程控制环境变量,从而允许启动时代码执行,攻击者可以通过配置注入如NODE_OPTIONS或LD_*等变量,在OреnClаԝ 网关服务运行时上下文中执行任意代码  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Yd9HAo0qc3r7SrfZllnsBX8oRMbajicMJuttJFMsLoB6iaO9kII86JAtCzEN0UukdZevxgL3jcbdRO255BV02rdtrfoD5ric472W3wVMls1Xj4/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Yd9HAo0qc3prR9DD7eVywry7S4HgkgY7soPcibyFdrDmjnVkzjqYVLDFa3wM4ibu2mNAB9iaArxXLQwsLBRy7lCr7oqA6qiaL0sp38AwhtCDjww/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Yd9HAo0qc3pFfjQFWMraTjmHBXnseXn12KEnGZFib0QO5OTibv7fcE8hRBcAwiapCwTeLpOr177PdJfUz450k6EgVnicVLZN9EetfaQb33XS0JM/640?wx_fmt=png&from=appmsg "")  
  
攻击场景:  
  
攻击者可能利用OpenClaw网关服务在启动或运行过程中读取配置文件（如.env或 config.env.vars）的机制通过向这些配置文件中注入恶意环境变量（例如 NODE_OPTIONS、LD_PRELOAD 等）,攻击者可在服务启动时劫持进程控制从而在目标系统的上下文环境中执行任意系统命令  
  
影响产品:  
  
Openclaw < 2026.2.21  
  
目前官方已有可更新版本,建议受影响用户升级至最新版本  
  
建议措施:  
  
立即升级补丁：这是最直接的缓解方案,请立即将OpenClaw升级至 2026.2.21或更高版本,该版本已修复了环境变量过滤逻辑。  
  
加强输入验证：如果暂时无法升级，需检查所有允许用户配置的入口点，严格限制环境变量名称和值的格式，禁止包含 Shell 特殊字符或已知的危险库加载标识符。  
  
最小权限原则：确保运行 OpenClaw 服务的系统账户仅拥有完成业务功能所需的最小权限，避免使用 root 或管理员权限直接运行服务进程。  
  
配置审计：定期扫描生产环境中的配置文件，检测是否存在异常的 NODE_OPTIONS、PYTHONPATH 或 LD_* 变量设置。  
  
隔离运行：建议在容器化环境（如 Docker/Kubernetes）中部署 OpenClaw，并通过安全组策略限制其对宿主机的网络访问和文件挂载权限。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
