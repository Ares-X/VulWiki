---
cve: "CVE-2026-22765"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Dell Wyse 管理套件：从业务逻辑缺陷到未授权远程代码执行  
 幻泉之洲   2026-03-24 05:58  
  
>   
  
  
一次高风险攻击，有时候就差那么一个小小的细节就能实现。做漏洞研究时，哪怕是一些看起来无关紧要的错误或怪异行为，我也会特别留意。这次，这些看似“鸡肋”的发现，恰好拼凑出一幅完整的攻击图。  
  
在研究过程中，发现了两个漏洞：  
- **CVE-2026-22765 (8.8)**：低权限远程攻击者利用此漏洞可提升权限。  
- **CVE-2026-22766 (7.2)**：高权限远程攻击者利用此漏洞可实现远程代码执行。  
但真正的杀伤力来自组合拳。最终我构建了一条完整的攻击链，可以在 Dell Wyse Management Suite（私有云版）上实现**无需身份验证的远程代码执行**。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tbTbtBE6TibdjM4fZ2s2mpniaSpLYlwibOjDGsWib9fRUbcg9jevJjibj7LZU50pYED82CriclPVgL5mib7GHSDzWfdf4qY56NsqJyy5dm7t8jMhJU/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tbTbtBE6TibcwJL4RlWX5j8IwFAlE9guZQ1tgGVDs8sD1WbY4l8tbozs40n3T3joXDQj3JJtibqMwvCxibTTiaeficaAyUgJTP7XYzvmfHtdicswo/640?wx_fmt=png&from=appmsg "")  
## 起手式：设备注册的默认漏洞  
  
WMS 用设备组来管理大量的瘦客户端。想要注册设备到特定组，你得提供组令牌。  
  
但在私有云版本里，开发人员显然做了一个平衡：默认情况下，设备注册接口可以接受空的组令牌。代码的逻辑很清晰：如果令牌为空且是私有云环境，系统会检查租户列表。默认恰好有两个租户，其中非超级租户的设备会被放入**隔离组**。  
> 设计上，隔离设备没有任何实际权限，需要管理员手动分配组别。但这恰恰给了攻击者一个完美的立足点：任何未授权的攻击者，都可以随意“注册”一台虚拟设备到系统里，获得一个合法的设备身份。  
  
  
这步操作很简单，直接发个空令牌的注册请求就行。成功之后，你会收到一个wyseIdentifier和一个authenticationCode。这两个值可以用来生成合法的请求签名，意味着你可以**以这台注册设备的名义调用 WMS 的大量接口**。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tbTbtBE6Tibf8nRkj6SVpxrp2N6xUXE8RkIbfqlXKykTricvKFoFDQSA3pS5NrmyfLTgeMPichTRDicSicdlSpuqXYWFsmTKvKy4ic8HASEuDicdR4/640?wx_fmt=png&from=appmsg "")  
## 逻辑突破口：被遗忘的AD导入接口  
  
当我拿着设备签名去扫 API 接口时，importADUsers这个端点立刻引起了我的注意。官方文档写得明明白白：Active Directory 功能只在付费的 Pro 版提供，且私有云版本（On-Prem）不应该出现这个路由。  
  
但事实上，标准版（免费版）的代码里，大部分 AD 相关的接口都还在，只是前端面板给隐藏了。直接通过 API 调用，它们竟然还能正常工作。这就像是开发商为了省事，用同一套代码库构建不同版本，然后选择性隐藏功能。这种“隐藏而非删除”的做法，在安全领域里埋下了不少隐患。  
  
当然，光调用importADUsers并不能直接获得管理员权限。这样导入的用户会被放进“未分配管理员”组，没有实际权力。  
  
关键在于，还有另外两个可用的路由：importADUserGroups和addRoleToADGroup。我只需要用设备签名就能调用。  
- 用 importADUserGroups 创建一个新的 AD 角色组。  
- 用 addRoleToADGroup 给这个组赋予“Admin”管理员角色。  
- 最后再用 importADUsers 导入一个 AD 用户，并指定刚创建的那个拥有 Admin 角色的组。  
恭喜，系统里现在多了一个拥有完全管理权限的账户。但问题是，密码是在导入过程中随机生成的，不会返回给调用者——我们登不进去。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tbTbtBE6TibertJNhBLNLmp49SlB8m7AfuXAIQESYciaoPzBB6pqyfEGhxlmnzkKQAmTGxvgibPvy1QTwG83N1cDiayZ81YsujHicczeibmibicmqoA/640?wx_fmt=png&from=appmsg "")  
## 绕开登录壁垒的两个技巧  
  
到这里，我们手头有个管理员账户但没密码。别急着放弃，看看有没有小漏洞能让我们钻过去。  
  
**方法一：利用密码重置绕过 AD 用户检查**  
  
最直接的想法是触发密码重置，让系统把新密码发到我们控制的邮箱。这方法有两个前提：服务器配置了 SMTP，并且允许向外网发邮件。在实际部署中，这两点往往都满足。  
  
应用程序确实有保护：不允许为从 AD 导入的用户重置密码。但检查机制有缺陷。  
  
代码里判断用户是否 AD 用户的方法是检查AdUPN和AdDomain字段是否都非空。关键是，AdUPN这个属性**不是必填的**。  
  
通过importADUserGroups导入时，我们可以将这个值留空。这样一来，检查函数就会返回false，系统会认为这不是个 AD 用户，从而允许密码重置。**一个空值，就让整个防护机制形同虚设。**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tbTbtBE6Tibf4szqsCChib7ZG6eI0ItPb14JehFhagibMf4bqMbNAWYKwIZSzeaAYAndjB7iaWdE4c4TvwcnGEJz9DC5ANYgUQiaMckCCmKGOVKw/640?wx_fmt=png&from=appmsg "")  
  
我照此操作，创建了一个AdUPN为空的管理员账户，设置好外部邮箱，然后触发重置。新密码果然发到了我的邮箱。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tbTbtBE6Tibf8vuPNGHT3mVdvrxTxaIiaS5r3glRtYgqoRxRFNHO9Eyclpfpz9LLNBprCDQH4GaebBwhrkVJA6f6neuytzDJY5JT4OsPG6E8M/640?wx_fmt=png&from=appmsg "")  
  
**方法二：绑定已入侵的域账户（仅限 Pro 版）**  
  
还有一个更隐蔽的方法，在 Pro 版且配置了 LDAP 登录的环境下适用。你只需要一个已入侵的低权限域账号及其objectGUID。  
  
在导入管理员账户时，你可以把它的objectGUID和sAMAccountName设置成真实被入侵域用户的。之后，自动生成的本地密码就没用了，你可以直接用那个域账号的凭据，通过 LDAP 登录这个管理员账户。  
  
这个手法有效的原因是，应用在验证通过后，会从域根开始执行 LDAP 查找。所以，任何能通过 LDAP 认证的域用户，都可以被放进来。  
## 最终一击：上传 JSP 木马的路径把戏  
  
拿到管理员权限后，我的目标很明确：上传一个 JSP 格式的 WebShell，在服务器上执行任意命令。  
  
首先想到的是文件上传功能。但即便能影响路径，应用也有一堆过滤器来防御路径遍历攻击（比如../）。这些检查往往只盯着文件名本身，不够全面。  
  
我发现了另一个突破口：在门户设置里，有个“文件仓库”区域，用来存放固件、镜像等内容。安装时会默认创建一个本地仓库，路径是C:\WMS\LocalRepo。  
  
作为管理员，我可以通过一个隐藏的 API 端点，把这个仓库的路径改成 Tomcat 的 Web 应用根目录：C:\Program Files\DELL\WMS\Tomcat-10\webapps\ROOT。这个目录下 JSP 是可以被解析执行的。改完之后，所有上传到本地仓库的文件，都会以这个新路径为基准存放。**那些检查文件路径的过滤器瞬间就失效了**——它只会检查我提供的相对路径，而根目录已经被我“偷梁换柱”了。  
  
我找了一个只验证 MIME 类型的图片上传接口，尝试上传.jsp文件。但还有一个坑：本地仓库路径会被缓存在内存里的一个 HashMap 中。这意味着修改之后，应用只有在重启后才会读取新路径。  
  
还好，管理员权限里包含了重启 Tomcat 服务的功能。通过向特定端点发送 POST 请求，我触发了重启。  
  
等服务恢复，缓存清空，我再次上传 JSP 文件，这次它被顺利写入了 Tomcat 的 Web 根目录。最终，我成功在服务器上执行了任意系统命令。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tbTbtBE6TibeY4a95icOHlVibYmqKFtqn6Kle3J8cm004J4BMm2aVgj4Tje1qhXCKCU5zKpOia8e5NseNPwV9lw1xaXnBzicA026gXOclicU2mzlA/640?wx_fmt=png&from=appmsg "")  
## 完整的攻击链条  
  
我们来复盘一下这条攻击链：  
1. **未授权注册（起点）**：利用空令牌注册设备，进入隔离组，获得设备身份标识。  
1. **权限提升（逻辑跨越）**：利用遗留的 AD 接口，结合属性验证缺陷，创建一个拥有管理权限但密码未知的账户。  
1. **绕过登录（细节突破）**：利用密码重置的 AD 检查漏洞或绑定被入侵域账户，获得新管理员账户的实际登录权限。  
1. **代码执行（权限滥用）**：利用管理员权限修改文件仓库根路径，绕过路径过滤，上传 JSP WebShell 实现远程命令执行。  
单独看，每一步可能都算不上“惊天大洞”，有些甚至像是功能设计的权衡结果。但当它们像多米诺骨牌一样被依次推倒，最终带来的就是**从网络任意位置，无需任何凭证，直达服务器最高控制权**的致命打击。  
  
这个案例给开发者和安全人员的启示很直接：
**不要轻视任何一个微小的异常或“不太可能”的场景。**
业务逻辑的妥协、版本管理的不严谨、防御机制的单点检查、缓存的副作用……这些看似独立的“小问题”，在攻击者眼里，可能正是串联起整个攻击版图的“缺失拼图”。安全是一个整体，最薄弱的一环，往往决定了系统的最终强度。  
  
  
**时间线：**  
- 2025年12月24日：提交初始报告。  
- 2025年12月30日：厂商确认接收报告。  
- 2026年1月16日：厂商确认修复漏洞并分配CVE编号。  
- 2026年2月23日：Dell Wyse Manager Suite 5.5 版本发布。  
- 2026年2月25日：CVE及安全公告发布。  
- 2026年3月23日：本技术分析公开。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
