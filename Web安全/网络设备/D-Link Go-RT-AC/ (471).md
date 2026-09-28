---
cve: "CVE-2024-22853"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【成功复现】D-Link GO-RT-AC750 安全漏洞(CVE-2024-22853)   
原创 弥天安全实验室  弥天安全实验室   2024-07-05 18:55  
  
网安引领时代，弥天点亮未来     
  
  
  
  
  
   
  
![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
  
**0x00写在前面**  
  
  
**本次测试仅供学习使用，如若非法他用，与平台和本文作者无关，需自行负责！**  
0x01漏洞介绍D-Link GO-RT-AC750是中国友讯（D-Link）公司的一款无线双频简易路由器。D-Link GO-RT-AC750 GORTAC750_A1_FW_v101b03版本存在安全漏洞，该漏洞源于使用硬编码密码。攻击者利用该漏洞通过 telnet 会话获取 root 访问权限。0x02影响版本Dlink Go-Rt-Ac750_Firmware 101b03Dlink Go-Rt-Ac7500x03漏洞复现  
1.访问官方网站下载bin文件  
```
https://www.dlink.com/se/sv/products/go-rt-ac750-wireless-ac750-dual-band-easy-router?revision=deu_reva#downloads
```  
  
![](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDeyjFToDlCiap1Oic1ZPx6UJLUxqZDq45xFQnibFLyYWlL7LeibprJ8OiboqdJZJCRQ8tzPeVY4TOg42A/640?wx_fmt=png&from=appmsg "")  
2.通过使用binwalk工具进行分离binwalk GORTAC750_A1_FW_v101b03.bin -e3.查看sh文件cat "./_GORTAC750_A1_FW_v101b03.bin.extracted//squashfs-root/etc/init0.d/S80telnetd.sh"4.查看硬编码密码漏洞源于使用硬编码密码。攻击者利用该漏洞通过 tеlnеt 会话获取 rооt 访问权限。cat /root/Desktop/D-link/_GORTAC750_A1_FW_v101b03.bin.extracted/squashfs-root/etc/config/image_sign0x04修复建议目前厂商已发布升级补丁以修复漏洞，补丁获取链接：https://www.dlink.com/en/security-bulletin/https://github.com/Beckaf/vunl/blob/main/D-Link/AC750/2/2.md弥天简介学海浩茫，予以风动，必降弥天之润！弥天安全实验室成立于2019年2月19日，主要研究安全防守溯源、威胁狩猎、漏洞复现、工具分享等不同领域。目前主要力量为民间白帽子，也是民间组织。主要以技术共享、交流等不断赋能自己，赋能安全圈，为网络安全发展贡献自己的微薄之力。口号 网安引领时代，弥天点亮未来 知识分享完了喜欢别忘了关注我们哦~学海浩茫，予以风动，必降弥天之润！   弥  天安全实验室  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
