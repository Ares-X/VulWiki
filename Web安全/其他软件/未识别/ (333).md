---
cve: "CVE-2026-76424"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【已复现】CVE-2026-76424 Cisco ISE 未授权文件上传致远程命令执行及 root 提权漏洞  
原创 源影网安
                    源影网安  源影安全团队   2026-09-23 03:30  
  
产品介绍  
  
Cisco Identity Services Engine（ISE，身份服务引擎）是思科旗下的网络准入控制（NAC）与身份策略管理平台，是企业网络身份体系的神经中枢。它统一承载 802.1X/MAB 终端认证、设备画像与安全态势评估、RADIUS/TACACS+ 设备管理（AAA）、访客接入、证书配置以及与防火墙/EDA 的 pxGrid 联动等能力——交换机、无线控制器等网络设备对用户和终端的身份验证、授权与审计基本都经由 ISE 完成。因此 ISE 上保存着全网的 RADIUS/TACACS 共享密钥、根证书与私钥、终端与用户身份数据库以及准入策略，属于 Tier-0 级信任锚点：它的安全等同于整个企业准入体系的安全。  
  
漏洞影响与前置条件  
  
该漏洞是 CVE-2026-76424 ，存在于 Cisco ISE 3.5.0.527（3.5 Base）版本，3.5 Patch 4 中修复（内部 bug CSCwu83447）。管理端点 POST /admin/files-upload 无需任何登录即可上传 zip 压缩包，服务端会将其解压到安装根目录 /opt/CSCOcpm，攻击者借此把 JSP 写入免登录前缀 prelogin/ 目录，从而在零凭证状态下获得命令执行（uid 300），再利用 sudoers 中 NOPASSWD 的 timeout 命令通配授权一步提权至 root，完全控制设备——可窃取 RADIUS/TACACS 密钥、证书私钥与全网终端身份数据，篡改或关闭准入策略，使整个 NAC 体系失守。利用全程不需要任何账号、密码或会话，但存在一项网络位置前提：该端点唯一的防线 UpgradeInterNodeAPIFilter 以“节点 IP 字符串的子串匹配 + 客户端可控的 X-Forwarded-For 头”做源 IP 判定，因此与设备同网段/同二层（源 IP 命中子串集合，典型如网段网关 x.x.x.1）、已取得 ISE 任一容器内落脚点（容器流量被 NAT 成节点自身 IP，免头直接放行）、或能直连管理端口 9443（伪造一个 XFF 头即可过门）的攻击者均可直接利用；而纯互联网远端攻击者因请求必经 Kong 网关重写该头、且 9443 被防火墙限制而无法满足前提。故危害口径为：相邻网络位置、零凭证、直达 Tier-0 设备 root。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/gRYowTXTvLHXm9DvNaKoEpozVVKscRFZGmkdBSkKrdgPeC8ldNKc1ezmoTsnmgtTwfcLlkJBTiaWJHL5LZicakaMW0VfSeDlHtxqTbTPNTM18/640?wx_fmt=png&from=appmsg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
