---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞预警】Linux三年前补上的洞，又一次被挖开了  
YGnight
                    YGnight  night安全   2026-09-03 00:15  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/LAQpgdWQSctVS8Ps0NsFTqMiasz8uDibcvoib0spt17ORFYGT7Lk8y0JElHpWukiczXboIicO8mrOUut0DwfE4PvMwpuReeibS0yQHqN8Tictdm4Z4/640?wx_fmt=png&from=appmsg "")  
  
## 一、漏洞描述  
  
收到一个linux的提权漏洞的情报，目前POC已被公开，编号是CVE-2026-52933，  这个漏洞产生的位置在 Linux 内核 io_uring 的 poll  请求所有权判断上。请求被取消后，内核本该拦住后续唤醒，实际测试发现是拦不住的，唤醒路径还能再拿走一次。请求完成两遍，文件引用跟着释放两次，用户态剩下的描述符成了悬空指针。  
<table><tbody><tr><th style="padding:10px 12px;border:1px solid #d1d5db;text-align:left;font-weight:bold;color:#1a1a1a;background-color:#f3f4f6;white-space:nowrap;"><section><span leaf="">CVE 编号</span></section></th><td style="padding:10px 12px;border:1px solid #d1d5db;color:#333;"><section><span leaf="">CVE-2026-52933，评分 7.8 高危，向量 AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H</span></section></td></tr><tr><th style="padding:10px 12px;border:1px solid #d1d5db;text-align:left;font-weight:bold;color:#1a1a1a;background-color:#f3f4f6;white-space:nowrap;"><section><span leaf="">影响组件</span></section></th><td style="padding:10px 12px;border:1px solid #d1d5db;color:#333;"><section><span leaf="">io_uring/poll.c 的 io_poll_get_ownership()</span></section></td></tr><tr><th style="padding:10px 12px;border:1px solid #d1d5db;text-align:left;font-weight:bold;color:#1a1a1a;background-color:#f3f4f6;white-space:nowrap;"><section><span leaf="">成因</span></section></th><td style="padding:10px 12px;border:1px solid #d1d5db;color:#333;"><section><span leaf="">有符号比较让取消标记失效，请求重复完成，文件引用重复释放</span></section></td></tr><tr><th style="padding:10px 12px;border:1px solid #d1d5db;text-align:left;font-weight:bold;color:#1a1a1a;background-color:#f3f4f6;white-space:nowrap;"><section><span leaf="">引入版本</span></section></th><td style="padding:10px 12px;border:1px solid #d1d5db;color:#333;"><section><span leaf="">提交 a26a35e9 之后，该提交本身是 CVE-2023-0468 的修复补丁</span></section></td></tr><tr><th style="padding:10px 12px;border:1px solid #d1d5db;text-align:left;font-weight:bold;color:#1a1a1a;background-color:#f3f4f6;white-space:nowrap;"><section><span leaf="">受影响版本</span></section></th><td style="padding:10px 12px;border:1px solid #d1d5db;color:#dc2626;font-weight:bold;"><section><span leaf="">主线 6.1 到 7.0；5.15.82 起的 5.15.y，6.0.11 起的 6.0.y</span></section></td></tr><tr><th style="padding:10px 12px;border:1px solid #d1d5db;text-align:left;font-weight:bold;color:#1a1a1a;background-color:#f3f4f6;white-space:nowrap;"><section><span leaf="">修复版本</span></section></th><td style="padding:10px 12px;border:1px solid #d1d5db;color:#16a34a;font-weight:bold;"><section><span leaf="">6.1.175、6.6.140、6.12.86、6.18.27、7.0.4，主线 7.1 起不受影响</span></section></td></tr><tr><th style="padding:10px 12px;border:1px solid #d1d5db;text-align:left;font-weight:bold;color:#1a1a1a;background-color:#f3f4f6;white-space:nowrap;"><section><span leaf="">利用条件</span></section></th><td style="padding:10px 12px;border:1px solid #d1d5db;color:#333;"><section><span leaf="">本地账号且能调用 io_uring，完整链条还要 perf_event_open 与 mmap 开放</span></section></td></tr><tr><th style="padding:10px 12px;border:1px solid #d1d5db;text-align:left;font-weight:bold;color:#1a1a1a;background-color:#f3f4f6;white-space:nowrap;"><section><span leaf="">情报备注</span></section></th><td style="padding:10px 12px;border:1px solid #d1d5db;color:#333;"><section><span leaf="">NVD 归到 CWE-835，与成因不符，去重别按此标签合并</span></section></td></tr></tbody></table>## 二、漏洞原理  
  
io_uring 给每个 poll 请求挂了一个 32 位的计数器，叫 poll_refs。一个变量塞了三样东西。  
  
bit 31     取消标记  
bit 30     重试标记  
bit 29~0   引用计数  
[#define]()  
 IO_POLL_CANCEL_FLAG BIT(31)       /* 0x80000000 */  
[#define]()  
 IO_POLL_RETRY_FLAG  BIT(30)      /* 0x40000000 */  
[#define]()  
 IO_POLL_REF_MASK    GENMASK(29, 0)  
[#define]()  
 IO_POLL_REF_BIAS    128  
  
低 30 位是引用计数，同时兼作所有权标记。谁要动这个请求，得先把计数从 0 加成 1，抢到的那个才算拿到所有权。入口长这样。  
  
static inline bool io_poll_get_ownership(struct io_kiocb *req)  
{  
    if (unlikely(atomic_read(&req->poll_refs) >= IO_POLL_REF_BIAS))  
        return io_poll_get_ownership_slowpath(req);  
    return !(atomic_fetch_inc(&req->poll_refs) & IO_POLL_REF_MASK);  
}  
  
第一行是道闸。当前值看着大于等于 128，就不硬加了，交给慢路径。慢路径会先看低 30 位是不是还被人占着，占着直接拒绝。第二行是正常情况下的抢锁动作。  
  
闸坏在类型上。atomic_read 返回的是 int，带符号。取消请求的时候要往最高位或上取消标记，也就是 0x80000000。这一位一置，整个数按有符号读出来是负数。负数跟 128 比大小，永远比不过，第一行恒为假，慢路径压根进不去。  
  
代码直接掉到第二行。第二行只跟低 30 位做与运算，对最高位的取消标记视而不见。只要低 30 位此刻正好是 0，返回值就是真。唤醒路径从内核手里拿走了一个已经被取消的请求。  
  
要触发得凑两件事，请求已取消，低 30 位归零。公开利用的凑法分三步。  
1. 注册一个监听 eventfd 的 POLL_ADD，然后给属主任务发 SIGSTOP 把自己停住。  
  
1. 父进程发一个 ASYNC_CANCEL 把请求标成已取消。完成任务挂在停住的任务上，一直跑不掉。  
  
1. 往 eventfd 里灌唤醒，数量取 2 的 30 次方减一，也就是 (1ULL << 30) - 1  
。  
  
慢路径被跳过后，每来一次唤醒，第二行都老老实实把计数加一。加到 2 的 30 次方，低 30 位绕回 0，整个值只剩最高位那个取消标记。有符号比较照样把它当负数放行。唤醒回调看到低 30 位是 0，认定这是个空闲请求，同一个完成任务被挂了第二次。  
  
两次完成跑完，文件引用减了两次，eventfd 的 struct file 提前回收，用户态描述符成了悬空指针。  
  
从悬空指针到  root 还有一段路。公开利用拿 perf_event_open 批量开事件，把刚空出来的 file 槽位占回去，再用 kcmp  逐个比对，确认哪个 perf 描述符跟那个悬空描述符指向同一个对象。接着关掉两个描述符，perf 的缓冲区释放了，之前 mmap  出来的映射还活着。再堆 4096 个 2MB  的共享内存，把那页抢回来当页表页。页表项归攻击者改，等于能把任意物理地址映射进用户空间，内核地址随机化形同虚设。最后把 SELinux 的  enforcing 字节清零，把 core_pattern 改成 |/proc/%P/exe %P  
，故意崩一次，内核以 root 身份把攻击者自己的程序拉起来。  
  
这条链全程没用用户命名空间。利用代码里注明 perf_event_open 和 mmap 在 uid 65534 上就能用，perf_event_paranoid 是 2。靠禁用非特权命名空间挡内核提权的常规做法，对这条链不起作用。  
## 三、修复建议  
1. **参考漏洞描述中的修复版本进行升级到对应的兼容版本。**  
1. **暂时无法升级的先把 io_uring 关了。**  
可以参考这段命令   
```
sysctl -w kernel.io_uring_disabled=2
```  
  
1.   
## 近期值得重点关注的漏洞预警  
  
[【紧急漏洞预警】nacos爆出权限绕过漏洞，可以创建管理员账户，经过分析有点出处（已复现，exp脚本已编写）](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486343&idx=1&sn=b67c4eb02c03af9c3b206b1241ff7e9c&scene=21#wechat_redirect)  
  
  
[【情报】支付宝8.2亿数据泄露？给同事说一声，别自己吓自己](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486362&idx=1&sn=927fdf3d81c79a2ff8871086f0e78a8b&scene=21#wechat_redirect)  
  
  
[【漏洞预警】自己注册个号，就能搬空别人的 Magento 订单和支付卡（POC已公开）](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486363&idx=1&sn=344a1f2e1a64b3b3be1509610edd2a0d&scene=21#wechat_redirect)  
  
  
[【漏洞预警】Next.js 爆出新漏洞，不用登录实现命令执行(POC已公开)](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486348&idx=1&sn=350cb257c3bfc3372e2dd50f2eb13738&scene=21#wechat_redirect)  
  
  
[【漏洞补丁绕过预警】Redis CVE-2026-23479变种高危漏洞，EXP已公开](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486299&idx=1&sn=7d1d8a95dad56cb021c2aa4ff549ee62&scene=21#wechat_redirect)  
  
  
[【漏洞补丁绕过】超 30 万 WordPress 站点受影响，Forminator 文件上传漏洞（附POC）](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486304&idx=1&sn=a22d6632366218b72fd68b3a5cb91557&scene=21#wechat_redirect)  
  
  
[【漏洞预警】Exchange爆出RCE漏洞，利用Exchange 帮另一台 Exchange 开门（POC已公开）](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486323&idx=1&sn=124dd54f863f64371f18c668d52e1fab&scene=21#wechat_redirect)  
  
  
[【漏洞预警】不用登录，一个请求就能让 GeoServer 乖乖执行命令（POC已公开）](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486318&idx=1&sn=b478f775998b89579c53d4e0fbdc8c6e&scene=21#wechat_redirect)  
  
  
[【漏洞预警】Keycloak不登录就能接管任意账户，双重验证也拦不住](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486309&idx=1&sn=d5c1a812f00448d397d3e3a8e78cdd45&scene=21#wechat_redirect)  
  
  
[【漏洞预警】 8月WebLogic公布了9个漏洞，有一个需要重点关注](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486294&idx=1&sn=eb26bc5f8fcafc9ab402b77acdb1b2a4&scene=21#wechat_redirect)  
  
  
[【漏洞预警】近期MongoDB 公布了5个漏洞，最严重的一个可以不认证、远程就能拿下你电脑](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486289&idx=1&sn=10023bdd570d9f011eef242a23f83bb6&scene=21#wechat_redirect)  
  
  
[【0DAY漏洞】 全球5G手机芯片厂商之一‌的紫光展锐SOC存在RCE漏洞，影响数十家手机厂商，还未发布补丁](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486279&idx=1&sn=5e1452f6984bf3d4b4d35a2240676df5&scene=21#wechat_redirect)  
  
  
[【漏洞告警】安卓 14 到 16 全中招，通讯录 SQL 注入漏洞正在抄家（POC已公开）](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486274&idx=1&sn=4bacf56f2045fca36b7b3de4be3ae591&scene=21#wechat_redirect)  
  
  
[【漏洞预警】紧急排查，SMB服务再曝新漏洞，利用脚本已公开](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486251&idx=1&sn=633ed2b7d916bcf98404a7b3a9a8c4b4&scene=21#wechat_redirect)  
  
  
[【漏洞预警】不用输密码，对方已经接管你的Mac：官方补丁公布macOS存在未鉴权RCE漏洞](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486246&idx=1&sn=eaf0c51686e92e89826098fcf51fb959&scene=21#wechat_redirect)  
  
  
[【0day漏洞预警】MariaDB 13 爆 9.8 分 RCE 链：最低 USAGE 权限就能远程执行命令](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486225&idx=1&sn=bd13754fd9378e01a088cf996fa5b557&scene=21#wechat_redirect)  
  
  
[VMware 爆 5 个洞，两个 9.8 不用密码就能打穿 vCenter](https://mp.weixin.qq.com/s?__biz=MzU5MTc1NTE0Ng==&mid=2247486204&idx=1&sn=2590e283b0981541da74647ddc817282&scene=21#wechat_redirect)  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
