---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Java安全工具/Gadget Chain可视化"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Java反序列化漏洞Gadget Chain可视化图谱工具"
prerequisites: "来源所述条件，未列明部分仍待核：没有工具版本、commit或支持gadget清单；非漏洞影响版本"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-9c95042c400fd7769e9f88c7"
entity_id: "ve-9c95042c400fd7769e9f88c7"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：没有工具版本、commit或支持gadget清单；非漏洞影响版本

代码与实验材料：UI使用提示不是漏洞PoC，未下载安装或执行

来源证据范围：只有夸克网盘，无作者官方repo、release、hash或license，明确来自网络安全性自测

- **证据待核（1）**：来源和可维护性不足；依据：Gadget_Chain功能宣称无可追溯实现；安装与使用无安装步骤，网盘内容真实性未核。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **来源与引用处置（2）**：类别与格式；依据：应工具参考而非漏洞实体；代码对比0尾部多0及广告图。保留这部分来源材料并与技术结论分开；其引用或宣传内容不能补足本文漏洞的证据。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Java反序列化漏洞Gadget Chain可视化图谱工具  
gb233
                    gb233  网络安全者   2026-02-25 00:45  
  
===================================  
  
**免责声明**  
  
请勿利用文章内的相关技术从事非法测试，由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，作者不为此承担任何责任。工具来自网络，安全性自测，如有侵权请联系删除。  
个人微信：ivu123ivu  
  
  
**0x01 工具介绍**  
  
Gadget_Chain是一个交互式的Java反序列化漏洞Gadget Chain可视化工具，帮助安全研究人员直观理解从Source（入口）到Gadget（跳板）再到Sink（执行点）的完整调用链。核心功能：  
```
交互式图谱展示：使用Vue Flow实现节点拖拽、缩放、点击查看详情
双链对比模式：对比两条Gadget Chain的差异，Y型布局展示共用节点和独有节点
代码高亮对比：使用Shiki实现Java代码语法高亮，支持差异行高亮
步进播放：自动播放展示调用链执行过程
MiniMap导航：左下角缩略图快速定位
```  
  
  
**0x02 安装与使用**  
  
单链模式  
```
从顶部下拉框选择Payload
点击节点查看代码详情
使用步进播放器自动播放调用链
```  
  
对比模式  
```
点击右上角"对比模式"按钮
选择Chain A和Chain B
查看Y型布局展示的共用节点和独有节点
点击节点进行代码对比0
```  
  
一定要在虚拟机运行，工具下载链接：  
  
链接：https://pan.quark.cn/s/e0c20a7b3ccc  
  
  
  
**·****今 日 推 荐**  
**·**  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/PQNvx9ufMAjaAvulTpp5EzsOia3uw33nGmXPfQ5D83U7xiau5u8RYZA5KTgFhJCduSckic202FqXotLsApOibdUKO4Ob8MeNnp9iadg9Er2qYTZE/640?wx_fmt=jpeg&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/PQNvx9ufMAiaGePxnm1WIIgKPWSc0mz2MrAsIQQt2ueSjgmIxOBS0cnv1tdrp2XJET2ia2UGER6Wjafj6ctz4f5SL8sygqSDfWdONiaXMcSCibw/640?wx_fmt=png&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
