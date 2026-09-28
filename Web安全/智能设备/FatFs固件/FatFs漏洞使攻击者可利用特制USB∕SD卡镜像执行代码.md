---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  FatFs漏洞使攻击者可利用特制USB/SD卡镜像执行代码  
 网安百色   2026-07-06 10:27  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/WibvcdjxgJnuP0NDnowGFR3V3gVibv8vf532vZsibN5yVDibIu2xgjlgxtjKMUesYIBYqa2bIS6CAIqEw8YapxHJTXrEnhOFuHOQCGWfNoVDFJE/640?wx_fmt=png&from=appmsg "")  
  
FatFs文件系统库曝出多处高危漏洞，攻击者可利用特制USB驱动器或SD卡镜像触发内存损坏，部分情况下甚至实现远程代码执行。  
  
runZero研究人员Tod Beardsley与HD Moore发布的报告披露了七项漏洞（CVE-2026-6682至CVE-2026-6688），影响Espressif ESP-IDF、STM32Cube、Zephyr RTOS、MicroPython及TizenRT等多个平台。  
  
FatFs漏洞详情  
  
FatFs是嵌入式固件中广泛采用的轻量级FAT/exFAT文件系统实现，常见于消费物联网设备、工业系统、无人机及加密货币硬件钱包。  
  
其高度碎片化的厂商定制生态形成了庞大攻击面。研究人员指出，攻击者可通过移动存储介质或自动更新机制投递特制的FAT、exFAT或GPT磁盘镜像触发漏洞。  
  
最严重漏洞CVE-2026-6682（CVSS 7.6）源于mount_volume()函数的整数溢出，攻击者可篡改文件大小元数据，在文件操作时引发堆/栈缓冲区溢出。  
  
高危漏洞CVE-2026-6687影响exFAT实现中的f_getlabel()函数，卷标长度校验缺失导致处理超长卷标时触发栈缓冲区溢出。  
  
CVE-2026-6688揭示了下游集成中的长文件名（LFN）处理缺陷：应用层代码缓冲区尺寸不足。该漏洞难以在库层面修复，根源在于依赖固件中不安全的字符串处理逻辑。  
  
中危漏洞CVE-2026-6685涉及缓存处理的无符号算术回绕，可能导致静默数据损坏；CVE-2026-6683则因exFAT写入时的除零错误引发设备崩溃，在空中下载（OTA）更新中极易导致设备变砖。  
  
CVE-2026-6686在文件扩展超出文件末尾（EOF）时泄露未初始化数据；CVE-2026-6684通过旧版FatFs中GPT分区扫描逻辑缺陷实现拒绝服务攻击。  
  
研究人员通过AI辅助模糊测试技术重新审视2017年审计工作：利用GitHub Copilot自动生成模糊测试框架，成功发现此前未被识别的漏洞，印证了AI在漏洞挖掘中的关键作用。  
  
尽管尝试协调披露，但上游维护者未予回应。研究团队紧急呼吁下游厂商审计实现代码、验证补丁有效性并审查文件处理逻辑。  
  
鉴于多数嵌入式环境缺乏ASLR等内存保护机制，攻击者仅需短暂物理接触设备即可实现系统完全控制。  
  
研究人员强调，随着AI驱动的漏洞发现技术普及，类似FatFs等广泛复用组件中的缺陷将加速暴露，厂商必须立即启动主动修复措施。  
  
本公众号所载文章为本公众号原创或根据网络搜索下载编辑整理，文章版权归原作者所有，仅供读者学习、参考，禁止用于商业用途。因转载众多，无法找到真正来源，如标错来源，或对于文中所使用的图片、文字、链接中所包含的软件/资料等，如有侵权，请跟我们联系删除，谢谢！  
  
![图片](https://mmbiz.qpic.cn/mmbiz_jpg/1QIbxKfhZo5lNbibXUkeIxDGJmD2Md5vKicbNtIkdNvibicL87FjAOqGicuxcgBuRjjolLcGDOnfhMdykXibWuH6DV1g/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&randomid=p6hk1x4r&tp=webp#imgIndex=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
