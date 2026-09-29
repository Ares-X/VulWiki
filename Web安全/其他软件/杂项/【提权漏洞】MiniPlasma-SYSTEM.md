---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【提权漏洞】MiniPlasma-SYSTEM  
原创 Hello888
                    Hello888  安全天书   2026-05-19 15:06  
  
  本文所涉及的技术、思路和工具仅用于安全测试和防御研究，切勿将其用于非法入侵或  
攻击他人系统等目  
的，一切后果由使用者自行承担！！！  
  
漏洞介绍  
  
  在Windows的 Cloud Files Mini Filter Driver（cldflt.sys）中，函数 HsmOsBlockPlaceholderAccess 存在一个逻辑漏洞，允许低权限用户通过特定的系统调用竞争条件，将任意文件写入任意位置，从而获得 SYSTEM 权限。该漏洞最初由 Google Project Zero 的 James Forshaw 发现并报告，微软分配编号 CVE-2020-17103，并声称已在安全更新中修复。然而，最新研究证实，该漏洞的原始利用方式在当前所有受支持的 Windows 版本中依然有效，表明微软的补丁可能不完整或已被回滚。  
### 受影响版本  
- Windows 10 / Windows 11（所有版本，包括最新更新）  
  
- Windows Server 2019 / 2022（以及可能更早的 Server 版本）  
  
经测试，原始概念验证（PoC）无需任何修改即可成功触发漏洞，并稳定提升至 SYSTEM 权限。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/EYGYnyEdzQUxa23AlicqWafKYTLJxLKEpsX5bjUhNBTEphZwABAgze6G5icNE82kVjj72U8EocOUrlqBMLNCj7xtYIR4wHciaAcccRcvrPyhyU/640?wx_fmt=png&from=appmsg "")  
  
GitHub地址：  
  
```
https://github.com/Nightmare-Eclipse/MiniPlasma
```  
  
  
注意：  
请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，作者不为此承担任何责任。工具来自网络，  
安全性自测。  
  
**红蓝偶像练习生小圈子**  
  
****  
**更多工具思路文章请加入纷传，圈子主要研究方向渗透测试、红蓝对抗、钓鱼手法思路、武器化，红队工具二开与免杀。圈内不定期分享红队技术文章，攻防经验总结以及自研工具与插件，目前圈子已满300人，欢迎各位进圈子交流学习！**  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/EYGYnyEdzQWBtF8n8G0Q2qfYY1ibia316d2wgL8ahMh9EibkrWnczXfFDWV5Y343ALUG25u4rrz03obawnZCHXubM8k9NyrlAUpUydG5nA0m4s/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5 "")  
  
**圈子目前更新相关技术文章：HeavenlyBypassAV内部版工具-轻松免杀各大杀软HeBypassAV内部版Patch免杀工具-轻松绕过杀软EDRHeavenly自动化红队后渗透工具免杀生成器Heavenly白加黑自动化生成免杀工具HeavenlyProtectionCS内部CS插件冰蝎webshell免杀工具哥斯拉webshell免杀工具红队场景下lnk钓鱼Bypass免杀AVFrp免杀隧道工具1day和0dayPOClnk钓鱼思路视频讲解lnk钓鱼Bypass天擎msi钓鱼chm钓鱼Kill360核晶AV对抗-致盲AV（核晶）捆绑免杀360Kill火绒火绒6.0内存免杀kill-windows DefenderDefender分离免杀Defender知识点EDR对抗思路进程注入知识点自启动思路多种维权手法Fscan免杀核晶QVM解决思路红队思路-钓鱼环境下小窗口截屏窃取免杀Todesk/向日葵读取工具渗透测试文章思路内网对抗文章思路还有更多红队工具文章！期待您的加入！！！**  
  
**往期推荐安全天书免杀课来袭｜助力实战免杀钓鱼(文末送福利)Patch免杀0检测！！！绕过卡巴斯基、360、Defender、火绒等【红队工具】红队内网后渗透CobaltStrike插件更新全新版本--Heavenly自动化生成白加黑2.0版本绕过360安全卫士实现维权**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
