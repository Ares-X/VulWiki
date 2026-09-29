---
source: "gelusus/wxvl 公众号漏洞文库"
---

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
