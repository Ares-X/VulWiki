---
source: "gelusus/wxvl 公众号漏洞文库"
title: "OpenSSH发行版GSSAPI补丁 错误断连后未初始化资源导致崩溃"
product: "OpenSSH发行版GSSAPI补丁"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-3497"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "Ubuntu/Debian相关GSSAPI KEX补丁，GSSAPIKeyExchange yes；包版本缺"
prerequisites: "无凭据网络访问"
side_effects: "命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
identifier_role: "primary"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/OpenSSH%20GSSAPI/OpenSSH%20GSSAPI%E6%BC%8F%E6%B4%9E%E5%85%81%E8%AE%B8%E6%94%BB%E5%87%BB%E8%80%85%E4%BD%BFSSH%E5%AD%90%E8%BF%9B%E7%A8%8B%E5%B4%A9%E6%BA%83.md"
id: "vw-1b0ef2f422bebb036d90cf30"
entity_id: "ve-1b0ef2f422bebb036d90cf30"
schema_version: "1"
---

# OpenSSH发行版GSSAPI补丁 错误断连后未初始化资源导致崩溃

## 条目说明

- 对象与具体问题：OpenSSH发行版GSSAPI补丁；错误断连后未初始化资源导致崩溃
- 版本、配置及部署条件：Ubuntu/Debian相关GSSAPI KEX补丁，GSSAPIKeyExchange yes；包版本缺
- 认证与权限前提：无凭据网络访问
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 错ERP类别，应SSH/系统组件；上游与发行版补丁区分重要
- 127KB IPC/100%崩溃/90秒锁定都是特定实验声明无原始报告链接
- 潜在权限分离影响不等于已证RCE或提权
- 手改三个调用不可代替发行版补丁，需精确包版本和公告

## 操作风险

命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

原创 网络安全9527
                    网络安全9527  安全圈的那点事儿   2026-03-13 04:09  
  
许多 Linux 发行版在其 OpenSSH 软件包之上应用了 GSSAPI 密钥交换补丁中的一个重大漏洞。  
  
该漏洞编号为 CVE-2026-3497，由安全研究员 Jeremy Brown 发现。攻击者只需精心构造一个网络数据包，即可可靠地使 SSH 子进程崩溃，并可能违反权限分离边界。  
  
kexgsss.c该漏洞源于服务器端 GSSAPI 密钥交换处理程序内部的一行代码缺陷。sshpkt_disconnect()在默认错误处理情况下，使用了非终止函数，而实际上预期的是进程终止ssh_packet_disconnect()。  
  
因为sshpkt_disconnect()只将断开连接消息排队并返回，而不是停止执行，所以错误处理程序会跳转到读取名为 的未初始化堆栈变量的代码recv_tok。  
### OpenSSH GSSAPI 漏洞  
  
然后，该变量的内容通过 IPC 发送到特权监视器进程，并传递给gss_release_buffer()，该进程可能会调用free()垃圾指针，从而导致确认的堆损坏。  
  
Brown 的分析将该漏洞归类为 CWE-824（访问未初始化的指针）和 CWE-908（使用未初始化的资源）。主要影响细节包括：  
- 只需一个精心构造的、大约 300 字节的 SSH 数据包即可触发此漏洞——无需任何凭证。  
- 在 x86_64 系统上，利用此漏洞会产生 SIGABRT（信号 6）或 SIGSEGV（信号 11）信号，并导致 SSH 连接锁定 90 秒。  
- 在测试配置中，子进程崩溃的可靠性为 100%。  
- 通过 privsep IPC 通道，最多可以向根级监控进程传输 127KB 的堆数据，这严重违反了权限分离边界。  
由于编译器选项和优化标志的不同，各发行版中漏洞的严重程度差异很大。使用 -O0 选项编译的 Clang 会留下一个长度为 4 字节、值为 0xfffbe600 的指针，而使用 -O2 -fno-stack-protector 选项编译的 GCC 则会留下一个长度为 127,344 字节的有效堆地址。  
  
一个包含八个构建的测试矩阵证实，其recv_tok.value范围可以从 NULL 到堆栈地址、堆地址，或者完全未映射的内存区域。  
  
已确认运行 Ubuntu 和 Debian OpenSSH 服务器且启用了相关功能的系统GSSAPIKeyExchange yes可能受到影响。由于 Linux 生态系统中流传着多个不同版本的 GSSAPI KEX 补丁，因此受影响的范围可能远不止这两个发行版。  
  
解决方法很简单：  
在 kexgsss.c 文件中服务器端调用的位置，将所有三个 sshpkt_disconnect() 实例替换为 ssh_packet_disconnect() 。Ubuntu 已经准备了一个补丁来解决此问题。  
  
运行启用了 GSSAPI 密钥交换的OpenSSH 的管理员GSSAPIKeyExchange应立即应用可用的发行版更新，或者暂时禁用该功能以缓解问题。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
