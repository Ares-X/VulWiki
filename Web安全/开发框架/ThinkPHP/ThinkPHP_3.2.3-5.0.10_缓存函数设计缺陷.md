---
source: "白阁文库 BaizeSec/bylibrary"
product: "ThinkPHP / PHP文件缓存"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "ThinkPHP_3.2.3-5.0.10_缓存函数设计缺陷"
prerequisites: "来源所述条件，未列明部分仍待核：标题3.2.3-5.0.10易误作连续范围；明确5.0默认webroot不暴露缓存，3.2实验"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-a3f994bcd34f59e0d9b8f01e"
entity_id: "ve-a3f994bcd34f59e0d9b8f01e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：标题3.2.3-5.0.10易误作连续范围；明确5.0默认webroot不暴露缓存，3.2实验

代码与实验材料：列四个必要条件，给写入及md5推断，但demo控制器和结果缺失

来源证据范围：有先知旧URL与官方修复话题

- **事实待核（1）**：版本表达有歧义；依据：3.2.3-5.0.10应拆分支，不是跨主版连续范围。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **证据待核（2）**：缺完整实验程序和缓存路径；依据：/Home/Index/get为自定义应用，未附写cache代码；空白位置缺输出。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **适用与权限边界（3）**：HEAD 200不足以证可执行缓存；依据：可能自定义错误页或路由响应，需内容和路径证据；原文四项前提应保留。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# ThinkPHP_3.2.3-5.0.10_缓存函数设计缺陷

## Affected Version

- ThinkPHP_3.2.3-5.0.10

## PoC

该漏洞复现起来比较复杂，虽然需要同时满足很多条件才可以导致GetShell，不过风险确实存在，对于黑客来说任何一点细微的风险都有可能是整个攻击链条中重要的一环。

根据先知论坛上dalao的讨论，触发代码执行漏洞至少需要同时满足以下条件：

- 1. 开启缓存功能
- 2. 缓存文件所在目录可以从浏览器直接访问
- 3. 需要能够猜解出缓存的文件名（文件名生成有一定规律）
- 4. 同时可以控制缓存文件里的内容（比如通过写入到数据库进而生成缓存文件）

个人在复现这个漏洞的时候发现 5.0.x 版本的 TP 并不能直接访问到缓存文件所在的目录，所以默认情况下不能触发该漏洞。在 3.2.x 版本是可以直接从浏览器访问到缓存文件的。

为了触发TP 3.2.3 Demo 的 GetShell 漏洞，先发起如下请求：

`http://localhost/tp3.2.3/index.php/Home/Index/get?id=%0D%0Aeval($_POST[x]);//`

下一步需要对缓存的文件名进行猜解，文件名的生成规则是缓存的key的MD5，所以黑盒情况下可以先算一些关键词的MD5，然后批量HEAD请求，发现响应200则说明存在这个缓存文件，或者结合源代码泄露漏洞进行利用，在这里我们直接从源码文件看到生成的文件：



文件名 也正是 缓存 key （name） 的MD5 值：

`md5(name,32) = b068931cc450442b63f5b3d276ea4297`

最后，可以看到 b068931cc450442b63f5b3d276ea4297.php 的 内容为之前写进去的一句话木马：




## References

1. https://xianzhi.aliyun.com/forum/topic/99（漏洞详情）
2. http://www.thinkphp.cn/topic/51162.html（修复方案）


---

> 来源：白阁文库 BaizeSec/bylibrary
