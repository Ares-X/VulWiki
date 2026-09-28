---
cve: "CVE-2026-45585"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  微软发布针对 Windows BitLocker 安全绕过零日漏洞的缓解措施  
原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-05-20 11:44  
  
微软披露了 Windows BitLocker 中的一个严重零日漏洞，编号为 CVE-2026-45585，该漏洞允许具有物理访问权限的威胁行为者完全绕过全盘加密，可能在几分钟内泄露敏感数据。  
  
该漏洞于 2026 年 5 月 19 日公开披露，虽然尚未确认有人利用该漏洞，但微软将其评为“极有可能被利用”，促使采取紧急缓解措施。  
  
该漏洞被归类为安全功能绕过漏洞，最高严重级别为重要。  
  
它位于 Windows 恢复环境 (WinRE) 中，并与名为 YellowKey 的关键漏洞利用链相关联，该漏洞利用链由研究员 Nightmare-Eclipse 开发并发布在 GitHub 上。  
  
成功的攻击者可以利用此漏洞绕过系统存储设备上的 BitLocker 设备加密，在无需用户凭据或解密密钥的情况下获得对加密数据的未经授权的访问。  
  
该漏洞仅影响 Windows 11、Windows Server 2022 和 Windows Server 2025。  
  
目前尚未发布补丁；微软发布了一份多步骤手动缓解指南，同时正在准备正式的安全更新。  
## Windows BitLocker 安全绕过  
  
该漏洞源于 WinRE 对BootExecute注册表值的处理HKLM\ControlSet001\Control\Session Manager。  
  
恶意二进制文件autofstx.exe被注入到该值中，在操作系统完全加载之前执行，从而完全绕过 BitLocker 的启动前身份验证。  
  
由于 WinRE 在主操作系统环境之外运行，因此传统的终端安全工具无法拦截此执行过程。  
## 微软的缓解措施  
  
微软提供了一个六步缓解程序，直接针对 WinRE 映像：  
1. 使用以下方式挂载 WinRE 映像reagentc /mountre /path C:\mount  
1. 通过以下方式加载 WinRE 系统注册表单元reg load HKLM\WinREHive  
1. autofstx.exe从BootExecute蜂箱上取下蜂巢入口  
1. 使用以下命令卸载注册表单元：reg unload HKLM\WinREHive  
1. 使用以下命令卸载并提交修改后的映像reagentc /unmountre /path C:\mount /commit  
1. reagentc /disable通过运行以下命令重新建立 BitLocker 信任：reagentc /enable  
除了修补 WinRE 之外，微软强烈建议将仅使用 TPM 的 BitLocker 保护器升级到 TPM+PIN 配置。  
  
管理员可以通过 PowerShell ( Add-BitLockerKeyProtector C: -TpmAndPinProtector)、命令提示符 ( manage-bde -protectors -add C: -TPMAndPIN) 或控制面板中的 BitLocker 驱动器加密来实现此功能。  
  
如果组策略阻止 PIN 配置，管理员必须先启用“启动时需要额外身份验证” gpedit.msc，并将“配置 TPM 启动 PIN”设置为“使用 TPM 启动 PIN 时需要 PIN”，然后才能继续。  
  
对于非托管设备，Microsoft Intune 和基于组策略的 BitLocker 部署都支持大规模强制执行 TPM+PIN 配置。  
  
针对加密终端的物理访问攻击构成了一种日益严重的威胁，尤其对于丢失或被盗的企业笔记本电脑而言更是如此。  
  
YellowKey漏洞利用代码的公开获取大大降低了攻击者的门槛，即使是技术水平较低的威胁行为者也能轻易利用它。  
  
负责管理 Windows 11 或 Server 2022/2025 部署的安全团队应优先考虑 WinRE 修复步骤，并在正式补丁发布之前立即强制执行 TPM+PIN 策略。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
