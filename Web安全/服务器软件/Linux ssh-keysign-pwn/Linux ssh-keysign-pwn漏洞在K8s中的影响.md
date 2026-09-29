---
cve: "CVE-2026-46333"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  Linux ssh-keysign-pwn漏洞在K8s中的影响  
Dubito
                    Dubito  云原生安全指北   2026-05-19 00:35  
  
   
  
> 注：本文翻译自 Juliet 的文章  
《CVE-2026-46333 in Kubernetes: Unset Seccomp Exposed pidfd_getfd, RuntimeDefault Blocked It》[1]  
，可点击文末“阅读原文”按钮查看英文原文。  
  
  
全文如下：  
## 一、引言  
  
CVE-2026-46333 是 Qualys 于 2026 年 5 月 15 日披露的 Linux __ptrace_may_access()  
 漏洞。公开场合常简称为 ssh-keysign-pwn  
，但其内核原语范围更广：在正确的时机下，一个非特权进程可以在一个特权进程退出时，使用 pidfd_getfd  
 复制该进程的一个文件描述符。  
  
对于 Kubernetes 团队而言，有用的问题不仅仅是“节点内核是否受影响？”，而是：  
> 一个普通 Pod 能否窃取到一个特权的文件描述符（fd）？以及，哪些 Kubernetes 控制手段能真正阻断这一路径？  
  
  
我们在本地 Docker、本地 kind、Bottlerocket 上的 EKS Auto Mode 以及一个私有的混合节点实验集群中，使用一个受控目标进行了测试。这次我们在 Kubernetes 中复现了重要的影响：当 seccomp 未设置（unset）时，一个非 root Pod 在其自身测试镜像内，窃取了一个 root 拥有的临时文件的 fd。  
  
简而言之：  
- • 在 Bottlerocket 上的 EKS Auto Mode，当 seccomp 未设置时，所有四个被测试节点均复现了受控的 fd 窃取。  
  
- • EKS 显式设置为 Unconfined  
 也复现了相同结果。  
  
- • EKS RuntimeDefault  
 阻止了 pidfd_getfd  
。  
  
- • EKS PSS Restricted 阻止了 pidfd_getfd  
，并且阻止了 setuid 辅助程序打开文件。  
  
- • EKS PSS Baseline 阻止了显式的 Unconfined  
 和 hostPID  
，但没有修复 seccomp 未设置的情况；Baseline 下 seccomp 未设置的用例仍然复现了受控的 fd 窃取。  
  
- • 本地 kind 复现了相同的未设置/Unconfined 下成功，以及 RuntimeDefault/Restricted 的阻断效果。  
  
- • 私有实验集群中的 Debian arm64 工作节点复现了相同结果。  
  
- • 我们的 Talos 工作节点使用 Seccomp: 2  
 阻断了普通 Pod；即使在一个故意不设限制（unconfined）的实验命名空间中，500 次尝试也未复现 fd 窃取，这与 ptrace_scope=2  
 增加了另一道关卡的结果一致。  
  
本文范围经过特意限定。我们没有针对主机文件、/etc/shadow  
、SSH 主机密钥、Kubernetes Secrets、主机的 ssh-keysign  
 或生产应用文件。我们使用的是实验镜像内的一个一次性 root 拥有的文件，以及一个专门构建的 setuid 辅助程序，该程序仅用于验证控制路径。  
  
我们不会发布漏洞利用代码、实验源码或复现命令。  
## 二、CVE-2026-46333 是什么  
  
上游 Linux 修复补丁标题为 ptrace: slightly saner 'get_dumpable()' logic  
。该漏洞位于 ptrace 访问检查路径中，被诸如 pidfd_getfd  
 等接口使用。在进程退出期间，一个任务会经历一个窗口期：此时它的内存镜像已消失，但文件表仍然存在。存在漏洞的逻辑可能会在这个状态下跳过一项可转储性（dumpability）检查。  
  
公开的 PoC 利用这个间隙，从已降权的特权进程中复制文件描述符。已知的示例集中在诸如 ssh-keysign  
 和 chage  
 这类辅助程序（Helper）上：这些进程打开一个 root 拥有的文件，然后降权，之后在 fd 仍处于打开状态的情况下退出。  
  
这种形态在 Kubernetes 中很重要，因为一个普通的 Pod 可以在其镜像中包含 setuid 文件。如果允许特权提升，并且 seccomp 没有阻断 pidfd_getfd  
，那么 Pod 有可能在无需主机命名空间或 hostPath 的情况下，触及到相同的内核原语。  
## 三、受控目标  
  
我们的实验目标包含四个部分：  
- • 镜像中一个位于 /opt/probe-secret  
 的 root 拥有的文件；  
  
- • 一个以 UID 1001 运行的非 root 攻击者进程；  
  
- • 同一镜像中的一个专门构建的 setuid-root 辅助程序；  
  
- • 一个标记字符串：JULIET_PTRACE_FD_PROBE_ONLY  
。  
  
攻击者首先尝试直接打开 /opt/probe-secret  
，得到 EACCES  
 错误。随后，辅助程序在 euid 为 0 时打开该文件，然后降权回 UID 1001 并暂停。当辅助程序存活时，针对该特权 fd 调用 pidfd_getfd  
 会返回 EPERM  
。接着，攻击者与辅助程序的退出进行条件竞争（race）尝试，试图复制该 fd。  
  
这给出了一个清晰的成功信号：  
- • UID 1001 直接打开文件失败；  
  
- • 辅助程序证明它曾以 euid 0 打开文件并降权回 UID 1001；  
  
- • 进程存活时 pidfd_getfd  
 被拒绝；  
  
- • 进程退出后 pidfd_getfd  
 成功；  
  
- • 复制得到的 fd 只能读取出那个一次性标记字符串。  
  
这是一个与 Kubernetes 相关的安全影响，且不涉及任何主机数据或真实密钥。  
## 四、本地 Docker 与 kind  
  
我们首先在本地验证了目标。  
  
Docker 默认的 seccomp 阻止了该系统调用：  
```
Seccomp: 2self_pidfd_getfd_stdout=0 errno=1 (Operation not permitted)race_pidfd_getfd_success=0
```  
  
当 seccomp 设置为不设限制（unconfined）时，受控的 fd 窃取得以复现：  
```
NoNewPrivs: 0Seccomp: 0self_pidfd_getfd_stdout=1attacker_direct_open=0 errno=13 (Permission denied)victim before=1001/0/0 after=1001/1001/1001 secret_fd=3 dumpable=0alive_pidfd_getfd_secret=0 errno=1 (Operation not permitted)race_pidfd_getfd_success=1 attempt=41 victim_fd=3 read_len=28 sample_prefix=JULIET_PTRACE_FD_PROBE_ONLY
```  
  
当设置了 no_new_privileges  
 时，辅助程序无法变成 euid 0，也就从未打开过文件：  
```
NoNewPrivs: 1Seccomp: 0self_pidfd_getfd_stdout=1victim before=1001/1001/1001 after=1001/1001/1001 secret_fd=-1 open_errno=13race_pidfd_getfd_success=0
```  
  
然后，我们在相同本地内核的一个全新 kind 集群中运行了 Kubernetes 测试矩阵。  
  
Seccomp 未设置（unset）复现了受控的 fd 窃取：  
```
Seccomp: 0self_pidfd_getfd_stdout=1victim before=1001/0/0 after=1001/1001/1001 secret_fd=3 dumpable=0race_pidfd_getfd_success=1 attempt=54 victim_fd=3 read_len=28 sample_prefix=JULIET_PTRACE_FD_PROBE_ONLY
```  
  
显式设置为 Unconfined  
 也复现了该问题。RuntimeDefault  
 阻止了 pidfd_getfd  
：  
```
Seccomp: 2self_pidfd_getfd_stdout=0 errno=1 (Operation not permitted)race_pidfd_getfd_success=0
```  
  
Restricted 阻断了链条的两端：  
```
NoNewPrivs: 1Seccomp: 2CapBnd: 0000000000000000self_pidfd_getfd_stdout=0 errno=1 (Operation not permitted)victim before=1001/1001/1001 after=1001/1001/1001 secret_fd=-1 open_errno=13race_pidfd_getfd_success=0
```  
  
PSS Baseline（Pod安全标准基线）给出了一个重要警告：它拒绝了显式的 Unconfined  
 和 hostPID  
，但是一个 seccomp 未设置（unset）的 Pod 被准入，并且复现了受控的 fd 窃取。  
## 五、Bottlerocket 上的 EKS Auto Mode  
  
EKS 集群使用了 Auto Mode 的 Bottlerocket 节点：  
```
Kubernetes:        v1.35.2-eks-f69f56fOS image:          Bottlerocket (EKS Auto, Standard) 2026.5.12Kernel:            6.12.83Container runtime: containerd 2.1.6+bottlerocketptrace_scope:      1
```  
  
我们在一个节点上运行了完整矩阵，并在其他三个节点上进行了未设置/RuntimeDefault 的检查。  
  
Seccomp 未设置（unset）的情况在第一个节点上复现了受控的 fd 窃取：  
```
NoNewPrivs: 0Seccomp: 0Seccomp_filters: 0self_pidfd_getfd_stdout=1attacker_direct_open=0 errno=13 (Permission denied)victim before=1001/0/0 after=1001/1001/1001 secret_fd=3 dumpable=0alive_pidfd_getfd_secret=0 errno=1 (Operation not permitted)race_pidfd_getfd_success=1 attempt=1 victim_fd=3 read_len=28 sample_prefix=JULIET_PTRACE_FD_PROBE_ONLY
```  
  
其他三个 Bottlerocket 节点在 seccomp 未设置的情况下复现了相同结果，成功次数从一次到三次不等。  
  
显式 Unconfined  
 表现相同：  
```
NoNewPrivs: 0Seccomp: 0self_pidfd_getfd_stdout=1race_pidfd_getfd_success=1 attempt=1 victim_fd=3 read_len=28 sample_prefix=JULIET_PTRACE_FD_PROBE_ONLY
```  
  
RuntimeDefault  
 在我们检查的每个 Bottlerocket 节点上都阻断了该路径：  
```
Seccomp: 2Seccomp_filters: 1self_pidfd_getfd_stdout=0 errno=1 (Operation not permitted)race_pidfd_getfd_success=0
```  
  
Restricted 阻断了系统调用，并阻止了辅助程序打开文件：  
```
CapBnd: 0000000000000000NoNewPrivs: 1Seccomp: 2self_pidfd_getfd_stdout=0 errno=1 (Operation not permitted)victim before=1001/1001/1001 after=1001/1001/1001 secret_fd=-1 open_errno=13race_pidfd_getfd_success=0
```  
## 六、PSS Baseline 不足以防范  
  
我们检查的 EKS 应用命名空间使用 PSS Baseline（Pod安全标准基线）强制模式，并带有 Restricted 的审计和警告标签。我们创建了具有相同 Baseline 强制策略的临时实验命名空间，只为了回答一个问题：Baseline 能否修复 seccomp 未设置的情况？  
  
答案是不能。  
  
在一个 Baseline 强制的命名空间中，一个 seccomp 未设置（unset）的 Pod 被准入，以 Seccomp: 0  
 运行，并复现了受控的 fd 窃取：  
```
NoNewPrivs: 0Seccomp: 0self_pidfd_getfd_stdout=1race_pidfd_getfd_success=1 attempt=1 victim_fd=3 read_len=28 sample_prefix=JULIET_PTRACE_FD_PROBE_ONLY
```  
  
Baseline 确实阻止了显式的 Unconfined  
：  
```
violates PodSecurity "baseline:latest": seccompProfile ... must not set ... Unconfined
```  
  
Baseline 也阻止了 hostPID  
：  
```
violates PodSecurity "baseline:latest": host namespaces (hostPID=true)
```  
  
这个区别是本次 Kubernetes 相关发现的主要结论。Baseline 能捕捉到一些危险的声明，但它不要求必须有一个 seccomp 配置（profile）。在我们测试的 EKS Bottlerocket 节点上，seccomp 未设置意味着 Seccomp: 0  
，而这足以复现受控的 fd 窃取。  
## 七、私有实验集群：Debian 复现，Talos 阻断  
  
我们的私有实验集群同时包含 Talos 和 Debian 工作节点，这使其对于比较不同节点家族非常有用。  
  
Debian arm64 工作节点在 seccomp 未设置的情况下复现了受控的 fd 窃取：  
```
Kernel: 6.12.20+rpt-rpi-2712Seccomp: 0self_pidfd_getfd_stdout=1victim before=1001/0/0 after=1001/1001/1001 secret_fd=3 dumpable=0race_pidfd_getfd_success=1 attempt=0 victim_fd=3 read_len=28 sample_prefix=JULIET_PTRACE_FD_PROBE_ONLY
```  
  
RuntimeDefault  
 阻止了 pidfd_getfd  
，而 Restricted 既阻止了系统调用，也阻止了 setuid 打开文件。  
  
Talos 工作节点表现不同：  
```
Kernel:       6.18.5-talosptrace_scope: 2Seccomp:      2self_pidfd_getfd_stdout=0 errno=1 (Operation not permitted)race_pidfd_getfd_success=0
```  
  
即使我们特意使用了一个带有特权标签（privileged-labeled）的实验命名空间以允许 Unconfined  
 seccomp，在 500 次尝试中仍未复现受控的 fd 窃取：  
```
ptrace_scope: 2Seccomp: 0self_pidfd_getfd_stdout=1victim before=1001/0/0 after=1001/1001/1001 secret_fd=3 dumpable=0race_pidfd_getfd_success=0
```  
  
我们并非声称 Talos 普遍免疫。这个结果表明我们的 Talos 节点有两道重要的关卡：未设置 seccomp 实际变成了 Seccomp: 2  
，并且即使移除了 seccomp，ptrace_scope=2  
 似乎仍能发挥作用。  
## 八、结果总结  
  
**EKS Auto / Bottlerocket 6.12.83**  
- • 未设置 seccomp：在所有四个节点上均复现了受控的 fd 窃取。  
  
- • 显式 Unconfined  
：在完整矩阵测试的节点上复现。  
  
- • RuntimeDefault  
：阻止了 pidfd_getfd  
。  
  
- • Restricted：阻止了 pidfd_getfd  
，并阻止了 setuid 辅助程序打开文件。  
  
- • Baseline：阻止了显式 Unconfined  
 和 hostPID  
，但 seccomp 未设置的情况仍然复现。  
  
**本地 kind / 6.17.8 OrbStack**  
- • 未设置 seccomp 和显式 Unconfined  
：复现。  
  
- • RuntimeDefault  
：阻止了 pidfd_getfd  
。  
  
- • Restricted：阻止了 pidfd_getfd  
 和 setuid 打开文件。  
  
- • Baseline：阻止了显式 Unconfined  
 和 hostPID  
，但 seccomp 未设置的情况仍然复现。  
  
**私有实验集群 Debian arm64 / 6.12.20**  
- • 未设置 seccomp：复现。  
  
- • 显式 Unconfined  
：在一个带有特权标签的实验命名空间中复现。  
  
- • RuntimeDefault  
：阻止了 pidfd_getfd  
。  
  
- • Restricted：阻止了 pidfd_getfd  
 和 setuid 打开文件。  
  
- • Baseline：集群准入在普通命名空间中阻止了显式 Unconfined  
。  
  
**私有实验集群 Talos / 6.18.5**  
- • 未设置 seccomp：被实际生效的 Seccomp: 2  
 阻断。  
  
- • 显式 Unconfined  
：在带有特权标签的实验命名空间中未复现。  
  
- • RuntimeDefault  
：阻止了 pidfd_getfd  
。  
  
- • Restricted：阻止了 pidfd_getfd  
 和 setuid 打开文件。  
  
- • Baseline：集群准入在普通命名空间中阻止了显式 Unconfined  
 和 hostPID  
。  
  
## 九、Juliet 如何提供帮助  
  
实际的产品问题不是“扫描器知道这个 CVE 存在吗？”，而是“哪些工作负载仍然可以触及该内核原语，以及我们能否阻止新的工作负载被准入？”  
  
Juliet 在以下三个方面提供具体帮助：  
- • **发现暴露风险对象：**  
 Juliet 盘点工作负载的 seccomp 配置类型、allowPrivilegeEscalation  
、capabilities、hostPID  
、命名空间的 Pod Security 标签、节点操作系统镜像、内核以及容器运行时。这使团队能够找到那些 seccomp 为未设置（unset）或 Unconfined  
 状态，同时与受影响或未知节点数据流存在交集的 Pod。  
  
- • **阻止不安全的准入：**  
 Juliet 包含一个内置准入策略，名为 cve-2026-46333-pidfd-hardening  
。它可以以审计或强制模式运行，标记 seccomp 未设置（unset）或为 Unconfined  
 的情况，以及未设置 allowPrivilegeEscalation: false  
 的容器。  
  
- • **检测运行时尝试：**  
 Juliet 运行时包含一个审计模式的策略，名为 cve_2026_46333_pidfd_getfd  
，当传感器观察到来自容器的 pidfd_getfd  
 调用时会发出警报。  
  
- • **自动应用稳妥的加固措施：**  
 在团队选择变更（mutation）而非拒绝的情况下，Juliet 的变更策略可以设置 Pod 级别的 RuntimeDefault  
，设置 allowPrivilegeEscalation: false  
，并添加 capabilities.drop: ["ALL"]  
。  
  
运行时说明：检测 pidfd_getfd  
 是针对已知公开利用形态的一个告警（tripwire），而非主要缓解措施。我们验证过的阻断控制手段是：准入控制 + seccomp 和 NoNewPrivs，再加上已打补丁的节点内核。  
## 十、防御者应该做什么  
  
从有效的 seccomp 入手，而不仅仅依赖清单（manifest）中的意图。  
  
不要只搜索：  
```
seccompProfile:  type: Unconfined
```  
  
这样做会遗漏最重要的 EKS/Bottlerocket 结果：那些 seccomp 未设置，且实际运行时状态为 Seccomp: 0  
 的 Pod。  
  
对于不可信工作负载：  
- • 强制使用 RuntimeDefault  
 或经过测试的 Localhost  
 seccomp 配置；  
  
- • 在工作负载可以承受的情况下，优先使用 PSS Restricted；  
  
- • 设置 allowPrivilegeEscalation: false  
；  
  
- • 移除所有 capabilities；  
  
- • 除非是严格控制的主机代理，否则避免使用 hostPID  
；  
  
- • 将构建、插件、CI 和用户控制的工作负载与敏感工作负载分开；  
  
- • 从具有代表性的 Pod 内部验证实际运行时状态，而不仅仅是检查 YAML。  
  
对于节点：  
- • 跟踪供应商针对 CVE-2026-46333  
 的内核状态；  
  
- • 验证实际运行的节点镜像和内核包，而不仅仅是安全公告页面；  
  
- • 检查您运行时的默认 seccomp 配置是否会拒绝 pidfd_getfd  
；  
  
- • 分开比较不同节点家族，尤其是 EKS Auto Mode、Bottlerocket、AL2023、Ubuntu、Debian、Talos 以及自定义 AMI；  
  
- • 了解诸如 Yama ptrace_scope  
 这样的 ptrace 加固措施是否存在，并在您的节点操作系统上是否有效。  
  
打补丁的状态仍然是长期有效的修复方案。Kubernetes 策略可以减少可触及性和可利用性，但不应成为已打补丁节点内核的替代品。  
## 十一、本文未证明的内容  
  
本文未证明：  
- • 获取主机 root 权限；  
  
- • 容器逃逸；  
  
- • 访问 Kubernetes Secret；  
  
- • 在节点上持久化；  
  
- • 窃取真实的主机文件；  
  
- • 每个 EKS 或 Bottlerocket 节点都可被利用；  
  
- • 每个 Talos 集群都能阻断该路径；  
  
- • 仅靠 ptrace_scope  
 就能完全缓解；  
  
- • PSS Baseline 毫无用处。  
  
本文也未发布漏洞利用代码或复现命令。重点是 Kubernetes 控制的结果：在我们 EKS 和 kind 的实验室中，普通的、seccomp 未设置的 Pod 能够复现受控的 fd 窃取，而 RuntimeDefault 和 Restricted 则改变了结果。  
## 十二、核心要点  
  
CVE-2026-46333 不仅仅是 Linux 工作站的故事。在我们 EKS Auto Mode Bottlerocket 的实验室中，一个普通的、seccomp 未设置的非 root Pod 从一个专门构建的辅助程序那里窃取了一个受控的、由 root 打开的 fd。同一个 Pod 在 RuntimeDefault  
 模式下无法调用 pidfd_getfd  
。同一个工作负载在 Restricted 模式下既无法调用 pidfd_getfd  
，也无法让辅助程序在第一时间打开文件。  
  
实际的 Kubernetes 教训是直白的：当 seccomp 未设置（unset）映射为 Seccomp: 0  
 时，PSS Baseline 是不够的。对于不可信工作负载，请强制使用 RuntimeDefault  
 或更强的 seccomp 配置，并尽可能使用 Restricted 风格的设置。  
## 参考资料  
- •   
Qualys 在 oss-security 上的披露[2]  
  
- •   
Qualys 的 CVE 分配更新[3]  
  
- •   
Linux 上游修复补丁 commit 31e62c2[4]  
  
- •   
NVD CVE-2026-46333[5]  
  
- •   
Red Hat RHSB-2026-004[6]  
  
- •   
Debian CVE-2026-46333 跟踪页[7]  
  
- •   
Amazon Linux CVE-2026-46333 状态[8]  
  
#### 引用链接  
  
[1]  
 《CVE-2026-46333 in Kubernetes: Unset Seccomp Exposed pidfd_getfd, RuntimeDefault Blocked It》: https://juliet.sh/blog/cve-2026-46333-kubernetes-eks-bottlerocket-seccomp-pidfd  
[2]  
 Qualys 在 oss-security 上的披露: https://www.openwall.com/lists/oss-security/2026/05/15/2  
[3]  
 Qualys 的 CVE 分配更新: https://www.openwall.com/lists/oss-security/2026/05/15/9  
[4]  
 Linux 上游修复补丁 commit 31e62c2: https://github.com/torvalds/linux/commit/31e62c2ebbfdc3fe3dbdf5e02c92a9dc67087a3a  
[5]  
 NVD CVE-2026-46333: https://nvd.nist.gov/vuln/detail/CVE-2026-46333  
[6]  
 Red Hat RHSB-2026-004: https://access.redhat.com/security/vulnerabilities/RHSB-2026-004  
[7]  
 Debian CVE-2026-46333 跟踪页: https://security-tracker.debian.org/tracker/CVE-2026-46333  
[8]  
 Amazon Linux CVE-2026-46333 状态: https://explore.alas.aws.amazon.com/CVE-2026-46333.html  
  
   
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/Kric7mM9eA5AI6cPLgtv9YXic1Bn2OqaHb6Xm09BzOjniakr01cURsSBdwicXJ4mhjfGp6Ih48QhRERicKRYs6FMkfzibJYibJvtdr9LRsHjHqUWgU/640?wx_fmt=gif&from=appmsg "")  
  
  
  
**交流群**  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Kric7mM9eA5DnticpPVq0H7P9VuspTic3f0ORKg5s1zt7QSRNqDg6yERHsuzY6HIBd80DzPmHYTaJic0wzHQHxqDpmDktibj1CLYDxxonEvE7boo/640?wx_fmt=png&from=appmsg "")  
  
  
  
  
**知识库**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Kric7mM9eA5A63C00ZicwfjQ2I4jop4XPicd4efiayYvwEckJu94wNWmibIYpicv3rl9hH7DbicJqlwfQmqmvh1uoTiaLiamuqDhsS68aHOOsW7Sgw8M/640?wx_fmt=png&from=appmsg "")  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
