---
cve: "CVE-2024-54143"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】OpenWrt Attended SysUpgrade 命令注入漏洞（CVE-2024-54143）   
 安迈信科应急响应中心   2024-12-19 12:35  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tdibEPWdubQUgErMslSgzVibGKdSFkWPTbTgu83UTXdNYm7eOxRSmuNmOjUIxdicy73wTLufCMnbs6CAsc3uicJUcg/640?wx_fmt=png "")  
### 01 漏洞概况      OpenWrt Attended SysUpgrade (ASU) 功能中存在命令注入漏洞和哈希截断问题，详情如下：‍      Imagebuilder命令注入漏洞：由于在镜像构建过程中，用户提供的软件包名称未经适当处理就被合并到make命令中，这可能导致恶意用户将任意命令注入构建过程，从而生成使用合法构建密钥签名的恶意固件镜像。      SHA-256哈希截断问题：请求哈希机制将SHA-256哈希截断为仅12个字符（48比特熵），导致哈希碰撞的可能性显著增加，攻击者可以利用哈希碰撞技术用恶意镜像覆盖合法缓存镜像，从而可能导致恶意镜像传递给用户。      攻击者可组合利用这些漏洞，通过命令注入漏洞生成恶意固件镜像，并 通过哈希碰撞技术，将恶意固件冒充为合法固件，并伪装在缓存中分发给用户。攻击者可以通过篡改sysupgrade.openwrt.org服务生成的固件镜像，当用户通过ASU、Firmware Selector 或CLI升级等途径下载并安装恶意固件镜像后，设备可能被攻击者完全控制，从而可能导致拦截或篡改网络流量、窃取设备敏感信息或发起进一步攻击。02 漏洞处置综合处置优先级：高漏洞信息漏洞名称OpenWrt Attended SysUpgrade命令注入漏洞漏洞编号CVE编号CVE-2024-54143‍‍‍‍‍‍漏洞评估披露时间2024-12-10漏洞类型命令注入、弱哈希危害评级高危公开程度PoC未公开威胁类型命令注入、弱哈希‍‍‍‍‍‍‍‍利用情报在野利用未发现‍影响产品产品名称OpenWrt ‍‍‍‍‍‍‍‍‍‍‍受影响版本openwrt/asu < 920c8a1‍‍影响范围广有无修复补丁有  
### 03 漏洞排查      用户尽快排查openwrt/asu应用版本是否在openwrt/asu < 920c8a1,若存在应用使用，极大可能会受到影响。04 修复方案该漏洞已通过920c8a1提交进行了修复，受影响用户可将openwrt/asu服务升级到修复版本或应用补丁以缓解该漏洞：下载链接：https://github.com/openwrt/asu/releases参考链接：https://flatt.tech/research/posts/compromising-openwrt-supply-chain-sha256-collision/https://github.com/openwrt/asu/security/advisories/GHSA-r3gq-96h6-3v7qhttps://nvd.nist.gov/vuln/detail/CVE-2024-5414305 时间线      2024.12.10 厂商发布安全补丁      2024.12.19 安迈信科安全运营团队发布通告   关于安迈信科西安安迈信科科技有限公司以“数字化可管理”为核心理念，坚持DevOps自主研发，创新打造“能力聚合、流程闭环、持续赋能”的综合性网络数据安全平台与运营服务。公司从古城西安出发，已在全国范围内为政府、运营商、电力、能源等行业客户提供了高质量的安全保障，并将继续为我国数字化转型和发展贡献力量。知 行 . 至 简 . 致 诚  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
