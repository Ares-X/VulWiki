---
source: "gelusus/wxvl 公众号漏洞文库"
id: "vw-2e72a81d3485ff9c76515cf5"
entity_id: "ve-2e72a81d3485ff9c76515cf5"
schema_version: "1"
title: "FatFs漏洞使攻击者可利用特制USB/SD卡镜像执行代码"
product: "FatFs及下游ESP-IDF/STM32Cube/Zephyr/MicroPython/TizenRT"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "CVE-2026-6682; CVE-2026-6683; CVE-2026-6684; CVE-2026-6685; CVE-2026-6686; CVE-2026-6687; CVE-2026-6688"
referenced_identifiers: ""
prerequisites: "处理恶意FAT/exFAT/GPT镜像；介质/OTA等输入路径因集成而异"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/FatFs%E5%9B%BA%E4%BB%B6/FatFs%E6%BC%8F%E6%B4%9E%E4%BD%BF%E6%94%BB%E5%87%BB%E8%80%85%E5%8F%AF%E5%88%A9%E7%94%A8%E7%89%B9%E5%88%B6USB-SD%E5%8D%A1%E9%95%9C%E5%83%8F%E6%89%A7%E8%A1%8C%E4%BB%A3%E7%A0%81.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

#  FatFs漏洞使攻击者可利用特制USB/SD卡镜像执行代码  

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FatFs及下游ESP-IDF/STM32Cube/Zephyr/MicroPython/TizenRT
- 本文讨论：CVE-2026-6682–6688
- 版本、权限与配置前提：处理恶意FAT/exFAT/GPT镜像；介质/OTA等输入路径因集成而异
- 资料类型：文件系统库多漏洞新闻；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 没有具体FatFs版本/配置矩阵或原研究URL
- 内存损坏推导短暂物理接触即可完全控制过强；设备缺ASLR不自动等于可利用
- 6688是下游缓冲区问题，不能均作为库固有漏洞；元数据全漏

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 版本/编译配置、RCE证据及上游响应状态待原始runZero核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->

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
