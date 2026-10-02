---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2025-62878"
identifier_role: "primary"
primary_identifiers: "CVE-2025-62878"
referenced_identifiers: ""
identifier_status: "unknown"
title: "CVSS 10.0！Rancher漏洞致K3s集群面临容器逃逸风险"
product: "Rancher Local Path Provisioner"
record_type: "advisory"
document_type: "翻译技术通告"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "文标<0.0.34但pathPattern自0.0.27引入；需创建StorageClass高权限或已有注解模板+创建PVC权限；默认K3s不可直接利用"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/CVSS%2010.0%EF%BC%81Rancher%E6%BC%8F%E6%B4%9E%E8%87%B4K3s%E9%9B%86%E7%BE%A4%E9%9D%A2%E4%B8%B4%E5%AE%B9%E5%99%A8%E9%80%83%E9%80%B8%E9%A3%8E%E9%99%A9.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-a42635c75cc21d45fa203b46"
entity_id: "ve-a42635c75cc21d45fa203b46"
schema_version: "1"
---

# CVSS 10.0！Rancher漏洞致K3s集群面临容器逃逸风险

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Rancher Local Path Provisioner
- 文献类型：翻译技术通告
- 版本、权限及部署边界：文标<0.0.34但pathPattern自0.0.27引入；需创建StorageClass高权限或已有注解模板+创建PVC权限；默认K3s不可直接利用
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 正文后半对默认K3s不可利用和CVSS前提的澄清非常重要，应前置，前半默认部署易利用及任意命名空间用户措辞过广
2. ../../etc/cron.d从K3s深层base不一定到/etc；authorized_keys是文件不是可mkdir目录；攻击路径示例需校准
3. 声称PodSecurity/OPA/PSP不能拦截因privileged=false过度，hostPath本身可受准入限制，应限定只检查privileged的策略
4. PoC公开否与公告含可工作YAML自相矛盾；CWE-23链接实际22；源代码master链接应固定提交
5. 检查StorageClass字面../会漏模板从PVC注解展开后的遍历；所有节点受影响须调度、卷挂载及主机权限前提，不等于单个PVC控制全部节点
6. 保留公告/PR/版本链接及allowUnsafePathPattern显式重新开启风险；营销和重复序号删减

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://orca.security/resources/blog/cve-2025-62878-rancher-local-path-provisioner/>
- 原文参考链接（未重新核验）：<https://github.com/advisories/GHSA-jr3w-9vfr-c746>
- 原文参考链接（未重新核验）：<https://github.com/rancher/local-path-provisioner/pull/542>
- 原文参考链接（未重新核验）：<https://github.com/rancher/local-path-provisioner/releases/tag/v0.0.34>
- 原文参考链接（未重新核验）：<https://cwe.mitre.org/data/definitions/22.html>
- 原文参考链接（未重新核验）：<https://github.com/rancher/local-path-provisioner>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

Dubito
                    Dubito  云原生安全指北   2026-02-12 00:35  
  
   
  
> 注：本文翻译自 ORCA Security 的文章  
《Path Traversal in Rancher Local Path Provisioner Enables Host Filesystem Compromise Across K3s Clusters》[1]  
，可点击文末“阅读原文”按钮查看英文原文。  
  
  
全文如下：  
## 一、引言  
  
2026年2月4日，Rancher Local Path Provisioner披露了一则严重漏洞（  
CVE-2025-62878[2]  
，CVSS 10.0）。该漏洞影响  
低于 v0.0.34 版本[3]  
的所有Rancher Local Path Provisioner（注：Rancher本地路径分配器），而该组件是每个K3s集群的默认存储后端。此缺陷允许已认证的攻击者通过向StorageClass路径模板注入遍历字符串，对底层主机文件系统中的任意目录执行读取、写入和删除操作。目前尚未观察到实际利用行为，但攻击只需几行Kubernetes YAML即可发起。**请立即升级至**  
v0.0.34[4]  
。  
## 二、概要速览  
  
<table><thead><tr><th style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><strong style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: inherit;color: rgba(255, 143, 38, 1);font-weight: bold;"><span leaf="">属性</span></strong></th><th style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><strong style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: inherit;color: rgba(255, 143, 38, 1);font-weight: bold;"><span leaf="">详情</span></strong></th></tr></thead><tbody><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">CVE</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">CVE-2025-62878</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">严重性</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">严重 (厂商评定CVSS 10.0，详见下方Orca安全研究分析)</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">CWE</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><span style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;color: rgba(10, 142, 171, 1);"><span leaf="">CWE-23</span><sup><span leaf="">[5]</span></sup></span><section><span leaf=""> (相对路径遍历)</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">受影响产品</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">Rancher Local Path Provisioner</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">受影响版本</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">&lt; v0.0.34 (修复版本之前的所有版本)</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">攻击向量</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">网络 (Kubernetes API)</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">认证要求</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">低（任意命名空间内创建PVC）至高（创建StorageClass）</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">利用复杂度</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">低</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">用户交互</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">无</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">活跃利用</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">否</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">PoC 公开</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">否 (但利用只需简单的YAML)</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">CISA KEV</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">否</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">修复方案</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">已提供 – v0.0.34</span></section></td></tr></tbody></table>  
## 三、什么是 Rancher Local Path Provisioner？  
  
Rancher Local Path Provisioner[6]  
 用于在节点本地磁盘上动态创建持久卷。它作为K3s中的默认StorageClass（存储类）发布，因此任何未指定其他StorageClass的PVC（PersistentVolumeClaim，持久卷声明）都会自动路由至该组件。K3s广泛部署于边缘计算、物联网、CI/CD 流水线（pipeline）及开发环境中。  
  
该组件的   
Docker Hub 镜像[7]  
累计拉取量超过1亿次，平均每周约75万次。一旦攻击者攻陷该分配器，便能直接从Kubernetes API直通集群中每个节点的主机文件系统。  
## 四、技术分析  
  
漏洞根源在于   
provisioner.go[8]  
 中的 pathFromPattern()  
 函数完全缺乏路径清洗机制。Local Path Provisioner 允许操作员通过 StorageClass 上的 pathPattern  
 参数，自定义PV数据目录在节点上的存放位置。该参数接受 Go 模板语法，并可访问 PVC 元数据（命名空间、名称、标签、注解）。在受影响版本中，渲染后的模板未经任何校验即被直接使用。  
  
调用函数 provisionFor()  
 通过 filepath.Join  
 将该未经验证的输出与配置的基路径拼接，而 filepath.Join  
 会解析 ../  
 字符串。若将 pathPattern  
 设置为 ../../etc/cron.d  
，解析后的路径将完全逃逸基础目录（独立部署时为 /opt/local-path-provisioner  
，K3s 中为 /var/lib/rancher/k3s/storage  
）。  
  
接下来的问题使该漏洞比常规路径遍历更为严重。分配器会启动一个 Helper Pod，针对解析后的路径执行 Shell 脚本。默认的创建脚本运行 mkdir -m 0777 -p "$VOL_DIR"  
，默认的销毁脚本运行 rm -rf "$VOL_DIR"  
。这些脚本存放在 local-path-config  
 ConfigMap（位于 local-path-storage  
 命名空间，或在 K3s 中位于 kube-system  
）中，且用户可编辑。因此，分配器的安全性还依赖于保护该 ConfigMap 的 RBAC 权限。任何能修改此 ConfigMap 的人，都可在后续每次 PVC 创建或删除时，注入拥有主机文件系统访问权限的任意 Shell 命令。此问题虽非 CVE-2025-62878 本身，但与其处于相同的信任边界，建议在修复 pathPattern  
 的同时一并审计。  
  
现有报道普遍忽略了一个技术细节：自 v0.0.26 版本起，Helper Pod 不再以 privileged: true  
 运行。它改通过挂载 hostPath  
 卷来获取主机文件系统访问权限。因此，那些阻断特权容器的 PodSecurity 准入控制器、OPA 策略以及传统的 PodSecurityPolicy 均无法拦截该 Pod。从策略视角看，该 Pod 表现为非特权，其对主机的访问是通过挂载操作静默实现的，而非源于安全上下文。  
  
**攻击向量共三种：**  
1. 1. **直接 StorageClass 投毒：**  
 集群管理员（或任何拥有 StorageClass 创建 RBAC 权限的用户）通过定义恶意 StorageClass，在 pathPattern  
 中嵌入遍历字符串。此方法最直接，但需要较高权限。  
  
1. 2. **PVC 注解注入：**  
 这是最危险的向量。如果现有 StorageClass 针对 PVC 注解（annotation）进行模板化（一种用于灵活路径定制的常见模式），那么任意命名空间用户均可通过其注解控制渲染后的路径。  
Kubernetes[9]  
 在创建 PVC 时**不会**  
校验用户对所引用 StorageClass 的权限，因此分配器会直接处理该请求。这将所需权限从集群管理员降级为**任意命名空间用户**  
。  
  
1. 3. **补丁后绕过：**  
 即使在 v0.0.34 版本，如果集群在任何 StorageClass 上设置了 allowUnsafePathPattern: "true"  
（修复版本中为兼容旧配置引入的逃逸出口），则两层校验均会被完全绕过，集群仍处于完全脆弱状态。  
  
一旦攻击者控制了解析后的路径，便可创建 PVC， Helper Pod 随即在目标主机路径上执行 mkdir -m 0777 -p  
；随后任何挂载该 PV 的 Pod 都将获得该路径的读写权限。若使用 reclaimPolicy: Delete  
 删除 PVC， Helper Pod 会在同一路径执行 rm -rf  
。由此，影响迅速升级：通过将 PV 指向 /etc/kubernetes/pki/  
 可读取集群 PKI 材料；向 /etc/cron.d/  
 或 /root/.ssh/authorized_keys  
 写入数据可实现主机代码执行；删除 /etc/kubernetes  
 或 /var/lib/kubelet  
 则可摧毁关键基础设施。由于 StorageClass 是集群作用域（cluster-scoped）资源，单个恶意 StorageClass 即影响**所有节点**  
。这实质上是一种容器逃逸：攻击者虽未从容器内部突破，但实际获得了同等的主机控制能力。  
  
在生产环境、边缘端或 CI/CD 流水线中运行 K3s 的组织应将此漏洞列为高优先级处理。默认部署、利用简单以及主机级影响这三重因素叠加，使得该漏洞必须在公开 PoC 加速攻击进程前完成修复。对于使用自定义 pathPattern  
 或基于注解模板的团队，应视为紧急任务。  
## 五、受影响版本  
  
<table><thead><tr><th style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><strong style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: inherit;color: rgba(255, 143, 38, 1);font-weight: bold;"><span leaf="">分支</span></strong></th><th style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><strong style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: inherit;color: rgba(255, 143, 38, 1);font-weight: bold;"><span leaf="">受影响版本</span></strong></th><th style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><strong style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: inherit;color: rgba(255, 143, 38, 1);font-weight: bold;"><span leaf="">修复版本</span></strong></th><th style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><strong style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: inherit;color: rgba(255, 143, 38, 1);font-weight: bold;"><span leaf="">备注</span></strong></th></tr></thead><tbody><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">Local Path Provisioner</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">&lt; </span><span style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;color: rgba(10, 142, 171, 1);"><span leaf="">v0.0.34</span><sup><span leaf="">[3]</span></sup></span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><span style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;color: rgba(10, 142, 171, 1);"><span leaf="">v0.0.34</span><sup><span leaf="">[4]</span></sup></span></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">依据 GitHub 安全公告 </span><span style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;color: rgba(10, 142, 171, 1);"><span leaf="">GHSA-jr3w-9vfr-c746</span><sup><span leaf="">[10]</span></sup></span></section></td></tr></tbody></table>  
  
该安全公告将   
v0.0.34 之前[3]  
的所有版本标记为受影响。pathPattern  
 特性自 v0.0.27 版本引入，因此 v0.0.27 至 v0.0.33 版本存在最实际的利用风险。更早版本虽不具备此特性，但仍可能被扫描器标记。无论如何，所有低于 v0.0.34 的版本都应升级。  
  
下游集成 Local Path Provisioner 的发行版包括：K3s（默认 StorageClass）、k3d、Rancher Desktop、AKS Edge Essentials（微软 Azure）、Amazon EKS Anywhere、kind 和 Minikube、Deckhouse Kubernetes Platform 以及 SUSE Application Collection。其中 K3s 集群因其默认 StorageClass 行为，需特别关注。  
## 六、威胁态势  
  
**利用活动：**  
 截至 2026 年 2 月 9 日，未观察到野外利用行为。未列入 CISA 已知被利用漏洞目录。GitHub 安全公告评定该漏洞为严重，CVSS 10.0 分。  
  
**PoC 公开状态：**  
 尚未发布正式的概念验证代码。然而，安全公告本身已包含一个可工作的恶意 StorageClass YAML，实质上已构成 PoC。无需 Shellcode、无需内存破坏、无需时序技巧——仅需 YAML。  
  
**攻击归因：**  
 尚未发布相关的威胁行为者归因信息。  
## 七、Orca 安全研究分析：默认 K3s 安装与 CVSS 上下文  
  
默认的 K3s 开箱即用并不可被利用。这是公开报道中缺失的最重要细节。  
K3s 嵌入式 Manifest[11]  
（即 k3s-io/k3s 中的 local-storage.yaml）在默认 StorageClass 上并未设置 pathPattern  
。当 pathPattern  
 未设置时，分配器会回退至硬编码模板（{{ .PVName }}{{ .PVC.Namespace }}{{ .PVC.Name }}  
），该模板完全由下划线连接的系统内部生成值构成，用户无法控制注入。因此，要实现主要攻击向量，必须由拥有集群级 RBAC 权限的用户先行创建或修改一个 StorageClass 以添加 pathPattern  
。这并未降低该漏洞对于使用自定义模板或基于注解路径的环境的严重性，但意味着：未经集群管理员事先操作，纯粹的 K3s 安装环境并不能直接被利用。  
  
CVSS 10.0 的评分同样需要置于上下文中理解。CVSS v3.1 标准下的 10.0 分要求权限需求（Privileges Required）为无。而创建恶意 StorageClass 需要 create storageclasses  
 的 RBAC 权限，这是一种通常仅授予管理员的集群级权限。权限要求更低的 PVC 注解向量虽将权限需求降为任意命名空间用户，但它依赖于一个已存在的、且已针对用户可控注解进行模板化的 StorageClass——这是一种配置选择，而非默认配置。更精确的评分会根据攻击向量不同落在 8.4 至 9.1 分之间，同时作用域变更（Scope Changed）应反映从容器到主机的边界跨越。尽管如此，这仍属于严重级别，仍需立即修复。但团队在处理此漏洞时，若需与真正无需认证、零交互的远程代码执行漏洞进行优先级排序，应权衡其实际的权限要求。  
## 八、修复方案  
### 8.1 首要行动  
  
升级至 Local Path Provisioner v0.0.34（发布于 2026 年 1 月 6 日）。  
  
<table><thead><tr><th style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><strong style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: inherit;color: rgba(255, 143, 38, 1);font-weight: bold;"><span leaf="">部署类型</span></strong></th><th style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.25em 0.5em;color: #3f3f3f;word-break: keep-all;background: rgba(0, 0, 0, 0.05);"><strong style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: inherit;color: rgba(255, 143, 38, 1);font-weight: bold;"><span leaf="">修复操作</span></strong></th></tr></thead><tbody><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">K3s 集群</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">升级至集成了 Local Path Provisioner v0.0.34 的 K3s 发行版，或手动替换 Provisioner 部署镜像。</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">独立 Helm / YAML</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">更新容器镜像至 </span><code style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 90%;color: rgba(255, 143, 38, 1);background: rgba(0, 0,0, .03);padding: 3px 5px;border-radius: 4px;"><span leaf="">rancher/local-path-provisioner:v0.0.34</span></code><span leaf=""> 并重新部署。</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">k3d / Rancher Desktop</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">更新至附带已修复 Provisioner 的最新版本。</span></section></td></tr><tr><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">AKS Edge Essentials / EKS Anywhere</span></section></td><td style="text-align: left;line-height: 1.75;font-family: -apple-system-font,BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB , Microsoft YaHei UI , Microsoft YaHei ,Arial,sans-serif;font-size: 14px;border: 1px solid #dfdfdf;padding: 0.5em 1em;color: #3f3f3f;word-break: keep-all;"><section><span leaf="">查阅厂商文档，获取更新的 Provisioner 镜像。</span></section></td></tr></tbody></table>  
### 8.2 临时缓解措施  
  
厂商安全公告指出暂无变通方案，v0.0.34 是唯一完整的修复版本。在规划升级期间，以下加固步骤可降低暴露面：  
- • 审计所有 StorageClass 中引用了用户可控字段（注解、标签）的 pathPattern  
 参数，并将其限制为静态值。  
  
- • 收紧 RBAC 权限，将 StorageClass 的创建和修改权限限制于受信任的集群管理员。  
  
- • 检查 local-path-config  
 ConfigMap（位于 local-path-storage  
 或 kube-system  
 命名空间）中的 setup 或 teardown 脚本是否被篡改，并限制其编辑权限。  
  
- • 部署 OPA Gatekeeper 或 Kyverno 准入策略，拒绝包含 ../  
 序列的 pathPattern  
 值的 StorageClass。  
  
- • 对于非关键依赖本地路径存储的集群，可通过 --disable local-storage  
 完全禁用该分配器。  
  
### 8.3 入侵后排查要点  
  
若您的集群曾运行存在漏洞的版本，并且存在针对用户可控 PVC 元数据进行模板化的 StorageClass，请审查 PVC 创建审计日志中是否包含遍历字符串的注解值。检查节点文件系统中是否存在配置的基础目录之外的意外目录。若无法排除未经授权的主机文件系统访问行为，请轮换所有集群 PKI 材料及 kubeconfig 凭证。  
## 九、检测指引  
### 9.1 主机级指标  
  
监控 Helper Pod 日志，留意解析至配置的基础目录之外的卷路径。基础路径因部署而异：独立部署默认为 /opt/local-path-provisioner  
，K3s 默认为 /var/lib/rancher/k3s/storage  
。检测规则需覆盖上述两种情况。重点关注针对 /etc  
、/root  
、/var/lib/kubelet  
 或 /etc/kubernetes  
 等敏感目录执行的 mkdir  
 或 rm -rf  
 操作。  
### 9.2 Kubernetes API 指标  
  
审计 StorageClass 的创建/更新事件，检查 pathPattern  
 参数是否包含 ../  
 字符串。监控 PVC 注解中的遍历载荷。对任何 allowUnsafePathPattern  
 设置为 true  
 的 StorageClass 发出告警。留意对 local-path-config  
 ConfigMap 的意外修改。  
### 9.3 Pod 安全盲区  
  
阻断特权容器的标准控制措施无法标记此 Helper Pod。它通过挂载 hostPath  
 卷而非设置 privileged: true  
 来获取主机访问权限。依赖基于安全上下文（securityContext）策略的组织，需要针对指向敏感目录的 hostPath  
 卷制定明确的规则。  
```
# Kubernetes 审计日志查询（伪代码）event.verb IN ("create", "update") ANDevent.objectRef.resource = "storageclasses" ANDevent.requestObject.parameters.pathPattern CONTAINS "../"# ConfigMap 篡改检测event.verb IN ("update", "patch") ANDevent.objectRef.resource = "configmaps" ANDevent.objectRef.name = "local-path-config"
```  
## 十、Orca 如何提供帮助？  
  
Orca 云安全平台[12]  
 能够帮助安全团队在数分钟内对   
CVE-2025-62878[2]  
 等威胁做出响应。  
- • **即时发现：**  
 识别云及 Kubernetes 环境中运行存在漏洞的 Local Path Provisioner 版本的云资产。  
  
- • **上下文感知优先级分析：**  
 清晰了解哪些  
易受攻击的资产[13]  
暴露在公网、处于生产环境或包含敏感数据——从而优先聚焦最重要风险。  
  
- • **攻击路径分析：**  
 理解该漏洞是否构成通向关键资产的路径，或能否与其他风险进行链式利用。  
  
借助 Orca，受 CVE-2025-62878 影响的客户能够快速识别其暴露面，并确保安全团队优先聚焦于最关键的 K3s 集群及边缘部署。  
  
![Orca 平台中的新闻条目](https://mmbiz.qpic.cn/mmbiz_png/Kric7mM9eA5DlmrG9JftWg3oPJmo2sW5TDiaYRGNC5Lib0wFbCvB187V4l2QPBlrMXiagWPrFMJXeZFb7RE6lThV4qwk6wQovhLoZ4bCkTmBXZc/640?from=appmsg "null")  
  
#### 引用链接  
  
[1]  
 《Path Traversal in Rancher Local Path Provisioner Enables Host Filesystem Compromise Across K3s Clusters》: https://orca.security/resources/blog/cve-2025-62878-rancher-local-path-provisioner/  
[2]  
 CVE-2025-62878: https://github.com/advisories/GHSA-jr3w-9vfr-c746  
[3]  
 低于 v0.0.34 版本: https://github.com/rancher/local-path-provisioner/pull/542  
[4]  
 v0.0.34: https://github.com/rancher/local-path-provisioner/releases/tag/v0.0.34  
[5]  
 CWE-23: https://cwe.mitre.org/data/definitions/22.html  
[6]  
 Rancher Local Path Provisioner: https://github.com/rancher/local-path-provisioner  
[7]  
 Docker Hub 镜像: https://hub.docker.com/r/rancher/local-path-provisioner  
[8]  
 provisioner.go: https://github.com/rancher/local-path-provisioner/blob/master/provisioner.go  
[9]  
 Kubernetes: https://orca.security/glossary/kubernetes-security/  
[10]  
 GHSA-jr3w-9vfr-c746: https://github.com/rancher/local-path-provisioner/security/advisories/GHSA-jr3w-9vfr-c746  
[11]  
 K3s 嵌入式 Manifest: https://github.com/k3s-io/k3s/blob/master/manifests/local-storage.yaml  
[12]  
 Orca 云安全平台: https://orca.security/platform/  
[13]  
 易受攻击的资产: https://orca.security/platform/vulnerability-management/  
  
   
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Kric7mM9eA5Cu9xJ4h79YqXSbnMOBP4iaNKAG0wj9dc82fuYFO1Cva4teFHZUZR5G8e4icJ0Nlb2GH6SGlHdNNT5FEGib94m3XZNIwRbwl0ibxE8/640?wx_fmt=gif&from=appmsg "")  
  
  
  
**交流群**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/Kric7mM9eA5Cd2lxCnbia2TzapMsXzIfdg9BBI5g8lSDo2rWuSCI1esnxpIiav3L6bLalVDD0q3KAXsAxmxxjgvjZibWVgpMAToCx5Pc2cJC4ZI/640?wx_fmt=png&from=appmsg "")  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
