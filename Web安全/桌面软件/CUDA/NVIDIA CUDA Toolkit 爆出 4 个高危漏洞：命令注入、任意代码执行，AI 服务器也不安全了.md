---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "NVIDIA CUDA Toolkit 爆出 4 个高危漏洞：命令注入、任意代码执行，AI 服务器也不安全了"
product: "NVIDIA CUDA Toolkit及Nsight工具"
record_type: "advisory"
document_type: "泛化安全新闻"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "恶意输入文件、可控路径/DLL加载、工具运行权限等各自前提；文称<13.1"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%A1%8C%E9%9D%A2%E8%BD%AF%E4%BB%B6/CUDA/NVIDIA%20CUDA%20Toolkit%20%E7%88%86%E5%87%BA%204%20%E4%B8%AA%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E%EF%BC%9A%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E3%80%81%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%EF%BC%8CAI%20%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B9%9F%E4%B8%8D%E5%AE%89%E5%85%A8%E4%BA%86.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-17d8cd948572f2717b94d150"
entity_id: "ve-17d8cd948572f2717b94d150"
schema_version: "1"
---

# NVIDIA CUDA Toolkit 爆出 4 个高危漏洞：命令注入、任意代码执行，AI 服务器也不安全了

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：NVIDIA CUDA Toolkit及Nsight工具
- 文献类型：泛化安全新闻
- 版本、权限及部署边界：恶意输入文件、可控路径/DLL加载、工具运行权限等各自前提；文称<13.1
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 声称4个漏洞但没有任何CVE、公告URL、逐漏洞组件/平台映射，当前无法建立可靠四实体
2. 把Nsight命令注入、DLL劫持和nvdisasm/cuobjdump/nvJPEG越界混为所有Windows/Linux所有<13.1均受影响，需逐组件核对
3. 本地高权限运行或可写搜索路径是前提，不是工具默认必然root/可远程接管AI服务器；DoS不能等同全系统瘫痪
4. 致谢研究者不构成可复现实证；唯一可升级无workaround的绝对说法无公告依据
5. 标题和正文危害推演多于可追溯事实，缺真实触发证据但新闻无需编造PoC

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

云梦DC
                    云梦DC  云梦安全   2026-01-28 01:00  
  
![](../../.resource/remote/6f284ebc85400318ca479dd8aae452ecc58eb0041dce03049bfc964bb66b0b3f.png "")  
  
  
很多人对 CUDA 的认知是——**算力核心、AI 底座、GPU 世界的“水电煤”**  
。  
  
但就在最近，NVIDIA 官方发布安全公告：  
👉 **CUDA Toolkit 被曝存在 4 个严重安全漏洞**  
👉 **涉及 OS 命令注入、任意代码执行、DoS 等高风险问题**  
👉 **Windows / Linux 全平台受影响**  
  
而且——**受影响的是开发者最常用的那些工具。**  
## 一、这不是“跑程序的漏洞”，而是“能被接管系统”的漏洞  
  
先说结论：  
这 4 个漏洞，并不是“程序崩一下那么简单”。  
  
如果被恶意利用，攻击者可以：  
- 在目标系统上 **执行任意系统命令**  
  
- **植入恶意代码 / 后门**  
  
- **控制 AI 训练节点、GPU 服务器**  
  
- 造成 **数据泄露、模型被篡改**  
  
- 甚至直接 **让系统瘫痪（DoS）**  
  
这已经不是开发问题，而是**安全事件级别**  
的问题。  
## 二、漏洞集中在哪？——全是你天天用的工具  
  
本次披露的漏洞，主要集中在 CUDA Toolkit 附带的**性能分析与调试工具**  
中，包括：  
- **NVIDIA Nsight Systems**  
  
- **Nsight Visual Studio Edition**  
  
- **nvdisasm / cuobjdump**  
  
- **nvJPEG 图像处理库**  
  
这些工具有一个共同特点：  
> **运行权限高 + 默认信任输入数据**  
  
  
一旦输入校验失守，后果就会非常严重。  
## 三、最危险的两类漏洞：命令注入 & 任意代码执行  
### 1️⃣ OS 命令注入（Linux / Windows 均存在）  
  
在 Nsight Systems 的部分组件中，  
程序**未对用户提供的路径 / 参数做充分校验**  
，  
导致攻击者可以构造恶意输入：  
- 在分析或安装过程中  
  
- **直接触发系统命令执行**  
  
在 Linux 环境下，这甚至可能以 **root 权限执行**  
。  
### 2️⃣ 任意代码执行（Windows 尤其危险）  
  
Windows 版 Nsight 存在 **DLL 搜索路径问题（DLL Hijacking）**  
：  
- 程序加载 DLL 时  
  
- **优先从不安全路径查找**  
  
- 攻击者只需放置一个恶意 DLL  
  
- 程序启动时就会“自动中招”  
  
👉 **不需要漏洞利用技巧，只要路径可控。**  
## 四、不止 RCE，还有一整批 DoS 级漏洞  
  
除了“能接管系统”的漏洞，还有一类同样不能忽视的问题：  
### ❗域外内存访问（Out-of-bounds）  
  
在以下工具中发现：  
- nvdisasm  
  
- cuobjdump  
  
- nvJPEG  
  
攻击者只需要提供：  
- **特制 ELF 文件**  
  
- **畸形 JPEG 图像**  
  
就可能触发：  
- 内存越界读取 / 写入  
  
- 程序崩溃  
  
- GPU 任务中断  
  
- 服务不可用（DoS）  
  
在 AI 训练、推理、科研计算场景中，**一次异常崩溃，可能就是几天算力白跑。**  
## 五、影响范围有多大？一句话：几乎所有人  
  
NVIDIA 官方给出的结论非常直接：  
> **CUDA Toolkit 13.1 之前的所有版本，全部受影响**  
  
- Windows ✔  
  
- Linux ✔  
  
- 个人开发环境 ✔  
  
- 研究机构 ✔  
  
- 数据中心 ✔  
  
**没有“我用的是老版本所以没事”这一说。**  
## 六、官方态度很明确：别想绕，只有升级  
  
这次 NVIDIA 没留“临时规避方案”，态度非常清晰：  
- ❌ 无可靠 workaround  
  
- ✅ **唯一解决方式：升级到修复后的 CUDA Toolkit 13.1**  
  
并且明确感谢了漏洞报告研究人员，  
说明这是**真实可复现、非理论漏洞**  
。  
## 七、给开发者 / 运维的一句实话  
> **开发工具 ≠ 安全工具****跑在本地 ≠ 没有攻击面**  
  
  
CUDA Toolkit 这次的漏洞，本质上暴露了一个老问题：  
- 工具权限高  
  
- 输入假设过于“天真”  
  
- 一旦被利用，后果比业务程序还严重  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
