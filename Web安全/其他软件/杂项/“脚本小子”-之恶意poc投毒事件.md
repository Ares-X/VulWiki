---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "reference"
primary_identifiers: ""
referenced_identifiers: "CVE-2020-35489"
identifier_status: "unknown"
title: "“脚本小子”-之恶意poc投毒事件"
product: "恶意伪PoC脚本；Codeberg/file.io用于外传"
record_type: "incident"
document_type: "恶意PoC投毒事件分析译写"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "受害者主动执行伪PoC；当前文章仅历史事件叙述/图片，不验证攻击基础设施"
side_effects: "硬重置+forcepush不能确保历史不可恢复/攻击者无法再得数据，与后文承认本地副本冲突；清除远端引用≠彻底删除所有副本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E2%80%9C%E8%84%9A%E6%9C%AC%E5%B0%8F%E5%AD%90%E2%80%9D-%E4%B9%8B%E6%81%B6%E6%84%8Fpoc%E6%8A%95%E6%AF%92%E4%BA%8B%E4%BB%B6.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-e68c21c5ea175d325505c4c3"
entity_id: "ve-e68c21c5ea175d325505c4c3"
schema_version: "1"
---

# “脚本小子”-之恶意poc投毒事件

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：恶意伪PoC脚本；Codeberg/file.io用于外传
- 文献类型：恶意PoC投毒事件分析译写
- 版本、权限及部署边界：受害者主动执行伪PoC；当前文章仅历史事件叙述/图片，不验证攻击基础设施
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 35489只是恶意仓库诱饵，不是本文利用该漏洞的证据；GitHub/Codeberg不是被证明有软件漏洞
2. 文内API令牌及带凭据cloneURL按历史材料保留，不表示当前仍有效或已获访问授权；未尝试使用任何凭据或访问私库
3. 硬重置+forcepush不能确保历史不可恢复/攻击者无法再得数据，与后文承认本地副本冲突；清除远端引用≠彻底删除所有副本
4. 回侵私库、删除所有受害数据和灌垃圾不是可推广的事件响应流程，须改为历史行为描述并强调授权/证据保全，不能按文操作
5. 叙述先说其他受害者不在权限范围又清空所有数据矛盾；token一个不证明攻击者只依赖一个凭据，回应不能证明特定实时监控机制
6. 第一人称为翻译改写需明确归原作者Chocapikk，样本哈希/关键脚本纯图缺文字，原博客和样本镜像可追溯但未下载执行
7. 清理建议只图片且未强调受害端凭据轮换/重建边界；动态IoC时间化、矿池名hashvault vs pool.hashvault差异核对

### 操作风险

硬重置+forcepush不能确保历史不可恢复/攻击者无法再得数据，与后文承认本地副本冲突；清除远端引用≠彻底删除所有副本

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://file.io/>
- 原文参考链接（未重新核验）：<https://codeberg.org/api/v1/repos/s1nk/sink/contents/>
- 原文参考链接（未重新核验）：<https://ifconfig.me>
- 原文参考链接（未重新核验）：<https://check.torproject.org/api/ip>
- 原文参考链接（未重新核验）：<https://codeberg.org/aib0lit/xsession>
- 原文参考链接（未重新核验）：<https://codeberg.org/bluef1sher>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 实战安全研究   2025-04-25 02:01  
  
- 前言  
  
    最经看见一个国外小哥的文章，觉得写的挺好的，但是可能很少人刷到，所以就有了这篇文章，希望能够把每个点都按照自己的理解讲的明明白白，看过之后同时也提醒大家对于网上的poc以及exp，还有一些工具一定要保持严谨仔细的态度，可能一个不小心你的电脑就中招了，是个人pc还好，如果是公司服务器啥的那造成的影响可就不小。  
  
    为了代入感，我也采用第一人称的方式来叙事。  
  
- 介绍  
  
    昨天晚上，我正在测试github上关于  
CVE-2020-35489（https://github[.]com/gh202503/poc-cve-2020-35489）  
的poc。这个仓库乍一看挺合理的（现在已被删除），因为我也确实有点累就跳过了检查poc是否恶意的环节，直接clone了这个项目并且在个人vps上运行起来。  
  
![](../../.resource/remote/6e20af2e43a948e8b73e5b32d27b588db118384c2875ded68a370418c0206053.png "")  
  
    图一   
恶意代码库删除  
  
    几个小时后，我发现我的电脑开始有点异常。CPU使用率超级高，就觉得不对劲很可能被挖矿了，然后经过深入研究果不其然发现了病毒程序，所有我的账号密码，  
ssh keys  
，还有其他敏感数据都被窃取并发送到攻击者控制的服务器上。  
  
     
 继续深入后，我发现我并不是唯一的受害者。攻击者收集到了从多个系统窃取的信息，把他们都存储在私有的  
Codeberg  
仓库中，  
我无意中想攻击者交出了对我系统的控制权限，现在是时候收回了。  
  
![](../../.resource/remote/72df6dc8b5ff1076a623108e27bb1be89d1683c39dc118dd8cf8e5e362b7bf8a.png "")  
  
    
 图二   
Codeberg仓库官网  
- 事件分析过程  
  
- 病毒是如何安装的？  
  
      
这个  
poc  
仓库包含一个看起来和利用过程无关的pdf文件。当我执行这个恶意poc的时候，pdf内嵌入的恶意脚本被提取并且后台执行，主要作用是下载并运行三个文件：  
  
      
Xsession.sh  
 → 病毒主脚本  
  
      
xsession.aut  
→一个伪装的  
Monero挖矿程序  
  
      
xprintidle → 检测程序  
  
    恶意程序被安装在  
~/.local/bin/  
，并且设置了文件可执行权限，同时比较狡猾的创建了一个系统服务从而确保系统每次重启都能自动启动恶意程序  
- 病毒窃取什么？  
  
    这个病毒程序并不仅仅是挖矿（加密数字货币），它同时也窃取很多敏感信息，收集的信息如下：  
  
1.从 `  
~/.ssh/` 窃取   
SSH 密钥    
  
2.从 `  
.bash_history` 和 `  
.zsh_history` 窃取   
Shell 历史记录    
  
3.从 `  
~/.aws/` 和 `  
~/.azure/` 窃取   
AWS 和   
Azure 凭据    
  
4.窃取环境变量和系统信息    
  
5.获取用户主目录下的文件列表  
  
    这些被窃取的信息都会被压缩成  
.tgz  
文件上传到攻击者控制的  
Codeberg  
私有仓库。  
- 窃取的信息被存储在哪里？  
  
    攻击者将窃取的信息存储在  
Codeberg  
私有仓库，  
API token  
如下（此处给大家解答一下为什么能拿到token，因为程序上传就需要token，所以拿到应该是很容易的）  
```
1a38a34c6d5dbefb112aa73f54824433f80bb704
```  
  
    通过使用这个token，我可以轻松的  
clone  
整个  
Codeberg  
私有仓库查看所有攻击者窃取的账号信息。  
- 克隆仓库  
  
    相对于使用  
Codeberg  
的  
api  
接口，我更喜欢直接克隆  
```
git clone https://oauth2:1a38a34c6d5dbefb112aa73f54824433f80bb704@codeberg.org/s1nk/sink.git
cd sink
```  
  
    在这个私有仓库内，我发现了超过123个被窃取的压缩文档，命名风格如下  
  
![](../../.resource/remote/b84aca8c1184b2753c5f0c00099e9a5217bcbe55b360e3acb363c19edb0a05e6.png "")  
  
    这些文件内容都是高度机密的，全部是来自和我一样的受害者（我删除掉了我的相关信息但是其他受害者的就不在我的权限范围了）  
- 研究攻击者的其他仓库  
  
    当我确认这个攻击行为后，我尝试通过这个token列出攻击者的所有在  
Codeberg  
的仓库，但是都因为权限不做失败  
  
![](../../.resource/remote/428511b27726181f8295a703ee264ac3c849e2ebc59c8db6badff23e058f79bc.png "")  
  
![](../../.resource/remote/4c96cce1c3a0e7e7fcb3b66fb6430b8d5ba5d50e29c7ab3edd79c27e4658154b.png "")  
- 我是如何控制黑客的  
Codeberg  
仓库的  
？  
  
    既然通过已知的token至少能够访问存储窃取来的文件仓库，那我应该做些事来回应这个黑客了  
  
    1.完全清除窃取的数据  
  
        为了彻底清除攻击者仓库中被窃取的数据，我不仅删除了文件——还执行了一次完整的 Git 重置（Git reset），确保提交历史中不留任何痕迹。我没有使用简单的 `git rm`，而是选择了硬重置（hard reset）并强制推送（forced push），确保攻击者无法回滚更改。  
    
  
![](../../.resource/remote/4d66dc4ef7d6447e4103e51e7a12c39d81f7c9326e34a1865992df7379061473.png "")  
  
    ✅ 该方法可确保整个 Git 历史记录被彻底清除，之前的提交将无法恢复。  
  
    ✅ 仓库会被完全清理干净，攻击者无法再获取任何被盗数据。    
  
  
      
2.给黑客留言  
  
    确保黑客知道我做了什么（挑衅他/她/它），直接在仓库建个文件  
  
![](../../.resource/remote/fd4d03baac90915445c17d4359072960fdde8039ff5b4f5c755b9abc4613e834.png "")  
  
    文件内容  
  
![](../../.resource/remote/579dcdc0233093838d736d0e9ce33e64db4c18b8c97531a8cdafb26baf4d86e8.png "")  
  
    现在，代码仓库里不再有窃取的文件，只剩下这条消息——明确宣告他的攻击行为已被发现并且反制。    
  
    3.验证数据是否真的被删除  
  
![](../../.resource/remote/cee6cfa58021288c7c18fbf1bb02a7f3149aa471ceea802d9322f762af22e292.png "")  
  
    如果仓库里仅剩的文件是 “  
hacked.txt”，且所有历史提交记录都被清除——那就意味着清理行动已大功告成。    
  
    现在，攻击者如果登录仓库就会问一句：“我被搞了？”  
  
    4.填充大量垃圾文件  
  
     
如果只是删除窃取的文件，还是太便宜他了，所以我选择向仓库上传无数看着像真实数据的垃圾文件，让他彻底沦陷  
  
![](../../.resource/remote/776a9a5b43742ba0fcc685b88868a47f6bccc996f24b8acabefb89a88fc22599.png "")  
  
    同时在分析 **  
Xsession.sh** 脚本后，我发现攻击者对其恶意负载进行了混淆处理，以掩盖真实目的。以下是该脚本的逐层解析，揭露其恶意行为及采用的技术手段。    
- 来自攻击者的回复  
  
    在彻底重置仓库并清除所有被盗数据后，我注意到立刻就出现了新的提交记录。攻击者竟在仓库中留下了一条消息，显然对刚刚发生的一切了如指掌。    
我竟然是小丑？  
  
![](../../.resource/remote/cde2bdf1dc346177c5492fdf4c1f50564ebfc7d062d55472d54aa27bcba35491.png "")  
  
    黑客回复如下：  
  
![](../../.resource/remote/1b864362c63e0b66c12168e23212ba91988443ba124548b0f83e1a8fef0df4de.png "")  
  
![](../../.resource/remote/6c81acfd2394df467fb382e76e8897492c301429a5f9f64d53ffc56bf60542b1.png "")  
  
    通过git提交历史也能确认攻击者的是已经发现了我的操作  
  
![](../../.resource/remote/cbf3d070db880518cc5a08521b7b8203a4c066cd4abb4daf463bbde9ddaa3c60.png "")  
- 所以这意味着什么？  
  
    1.攻击者正在实时监控他们的代码仓库。我的干预措施被他们瞬间察觉，这说明对方部署了自动化监控或人工值守机制。    
  
    2.他们承认了  
payload被混淆的事实。这绝非粗糙的概念验证（  
PoC），而是精心隐藏在虚假漏洞利用程序中的恶意软件。    
  
    3.攻击依赖单一API令牌。当对方提到"会生成新令牌"时，暴露了其攻击链完全依赖单个访问凭证——这正是可立即吊销的关键弱点。    
  
    4.他们坦承已本地同步被盗数据。尽管我清除了仓库，但在我介入前窃取的数据很可能已存在攻击者的本地副本中。    
  
   5. 其回应虽嚣张却信息量巨大：既证明我的反击确实干扰了其攻击链，迫使他们重建基础设施；也意味着我的反制并未完全成功——部分数据已被外泄。    
- 恶意脚本分析  
  
    该脚本表面上是一个简单的漏洞利用概念验证（  
PoC），但实际上暗藏恶意功能。它滥用PDF文件作为恶意负载的载体。  
  
    由于疲劳，我在执行前没有仔细检查文件内容，误以为这是个合法的PoC。虽然我平时经常分析和开发漏洞利用PoC，通常会逐行检查相关的代码，但这次我还是过于轻信了。  
  
![](../../.resource/remote/677cbe88e8fabceef8fff0ea65f89ee4bbc05a44911c65b358b0c4bc6447318f.png "")  
  
    运行结果如下，其实也能看出混淆逻辑还是很简单的  
  
![](../../.resource/remote/d7f3345cf60be25c8e0004cef22f2a364385aa021f7410a2f34f91bb2a856448.png "")  
  
    反混淆  
  
![](../../.resource/remote/5acee5619c2d22404bf0e19613d452c06436fc4963032c958567039d80f64526.png "")  
  
     
 1.这段代码做了什么：  
  
    下载了三个文件  
  
    启用系统服务  
  
    通过重定向隐藏系统日志  
  
    这仅仅是初始化安装阶段，下一阶段分析脚本是如何窃取系统敏感文件以及挖矿。  
  
    2.反混淆恶意代码  
  
    通过对三个脚本分析，发现主要的逻辑都在  
Xsession.sh  
，反混淆如下  
  
![](../../.resource/remote/83b8b41271ed872592361a67df34e8567939b889fd87e32b4369f728360ab192.png "")  
  
    核心代码中的发现：  
  
   1 运行挖矿程序，并且使用  
hashvault.pro:80作为矿池子  
  
   2 监控系统并且在探测到类似  
htop和  
glances的进程时结束自己  
  
   3 窃取敏感数据  
  
   4. 通过api token上传数据到  
file.io  
- 如何移除这个病毒？  
  
![](../../.resource/remote/90c3d98350423ec08f6619a5b0e305312fcdd56e645651eb1b3f7d510827cb3d.png "")  
- 总结  
  
      
原作者 Chocapikk 对历史事件的叙述（第一人称归属原作者）：这次经历给我敲响了警钟：永远不要盲目信任任何漏洞利用概念验证（PoC），特别是那些包含PDF等随机文件的样本。攻击者已成功窃取多名受害者的凭证，但通过利用他们自己的访问令牌，我得以：  
  
1. 克隆其代码仓库并获取被盗文件详情  
  
2. 在被利用前清空其Codeberg仓库中的所有失窃数据  
  
3. 用垃圾文件淹没仓库以增加使用难度  
  
    然而，尽管成功清除了他们在Codeberg的存储，但我的部分失窃数据可能仍存在于file.io——攻击者用作额外渗透通道的平台。由于file.io采用基于时效的删除机制（文件会在设定时间或单次下载后自动清除），目前无法确定攻击者是否在数据清除前完成了下载。  
  
    最终，这次反制仅取得部分成功：我虽然打击了其攻击行动，但他们造成的全部损失仍无法估量。这给了我们一个关键教训：一旦数据被窃取，几乎不可能确保其完全从攻击者掌控中清除。  
  
    最令人沮丧的是，我并非疏忽大意，只是太过疲惫。作为经常审阅甚至自主开发PoC漏洞利用的安全研究人员，我通常会逐行检查代码后再执行。但这次，疲劳让我栽了跟头。攻击者只需要我片刻的分心就能得逞。  
  
    这个案例也恰恰证明，即使经验丰富的安全研究员和漏洞开发者，也可能成为精心伪装恶意软件的受害者。请务必手动验证所有PoC代码，在隔离环境中运行，永远不要低估攻击者隐藏恶意负载的创造力。  
- IOC  
  
钱包地址  
  
45J3v3ooxT335ENFjJBB3s7WS7xGekEKiBW4Z6sRSTUa5Kbn8fbqwgC47SLUDdKsri7haj7PBi5Wvf3xLmrX9CEZ3MGEVJU    
  
ssh后门公钥  
  
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDXxEYqmT5QcgpUOdFxqgcj3tgOnWYC772AxxqSj+4VmREUbWn9cfMIv78Rn1wZzQpPp9HMAYfHF94niPiCwAXMEVoxbHaN8SKd25JAZ3GLgm12oJjZjz5isg5GCak63CL4/G57VHgmd0iEf4BdVSm04OtTVyUG1l49wt3lobglXPJfRzb4EDR6Rp3KEDJK+pJtMJNA1W3R4HQlSYeNiHcUiT0COcCcN7oXuI96rR0/B9IBjXdBLdYZffy0xaMMee2tYAIR/3MT1AIMOq7AzeGzdxqH1z6PO8MrYAoPcQ7BccXwN/gIdnYvjHcBerFtGBlkTf6dNrQO3iEhMCzIqntrQNXMLC0rQMHUt9Q+RafF4gxxlCRN1yPKmv3/1WqBpwe9mOYo5/e60GCUd+daRExzUJts25Fnd36+36eOzMe67e5ksW7AGDEw/VHL/fmM2NUsnLXSzq4WTEsVUHXtsGgc2dlq1BTnc7x7PCeDecQtduabsmG1bptora/YnNf8Q68= user@host    
  
矿池  
  
pool.hashvault.pro:80    
  
相关api  
  
https://file.io/    
  
https://codeberg.org/api/v1/repos/s1nk/sink/contents/    
  
https://ipinfo.io/?token=7092dca9adef64    
  
https://ifconfig.me    
  
https://check.torproject.org/api/ip    
  
  
API TOKEN  
  
IRHTNTF.YQJYZQP-KVEMN8R-J2BYQPK-FSQZ3PP    
  
1a38a34c6d5dbefb112aa73f54824433f80bb704    
  
  
Codeberg 仓库  
  
https://codeberg.org/aib0lit/xsession    
  
https://codeberg.org/api/v1/repos/s1nk/sink/contents/    
  
https://codeberg.org/bluef1sher  
  
  
Also, this idiot tested the malware on his own instance. I have full access to all of his private SSH keys, which grant authentication to his GitHub and Codeberg repositories, effectively giving me control over his entire version control infrastructure.  
  
（这句话应该是全文最大笑点，不知道有几个人会认真看到这个彩蛋；翻译如下）  
  
（更讽刺的是，这个蠢货竟然在自己的实例（服务器）上测试了恶意软件。现在，他的所有私有SSH密钥都已被我掌握——这些密钥不仅能直接访问他的  
GitHub和  
Codeberg代码仓库，更意味着他的整个版本控制系统都已在我的掌控之下）  
  
  
相关文件镜像:  
  
https://chocapikk.com/ioc/s1nk.zip  
- 参考  
  
https://chocapikk.com/posts/2025/s1nk/  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
