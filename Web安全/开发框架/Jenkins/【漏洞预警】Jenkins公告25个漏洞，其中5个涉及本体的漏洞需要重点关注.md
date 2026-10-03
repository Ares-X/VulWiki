---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Jenkins core/Remoting/tar/文件参数/用户ID/命名策略"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-70426; CVE-2026-70427; CVE-2026-70428; CVE-2026-70429; CVE-2026-70430"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "【漏洞预警】Jenkins公告25个漏洞，其中5个涉及本体的漏洞需要重点关注"
prerequisites: "来源所述条件，未列明部分仍待核：统一weekly<=2.575/LTS<=2.568.1、固定2.576/2.568.2；Remoting<=3384.v60d89463d9e0单独列，缺各CVE完整边界"
side_effects: "未执行；本文需注意的操作影响：任意写/反序列化被直接推为无条件RCE；所谓完整攻击链没有具体gadget/写入触发条件；能通信与具Agent/Connect权限不同；主控想读什么读什么仍受进程权限/凭据保护约束；五漏洞覆盖和版本表不完整；70430只列名称未描述所需角色/影响；统一版本表无分项来源；70429自带用户库不接受非ASCII声明需官方核"
source_status: "unknown"
id: "vw-27e554d6862a81017f65e3ca"
entity_id: "ve-27e554d6862a81017f65e3ca"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：统一weekly&lt;=2.575/LTS&lt;=2.568.1、固定2.576/2.568.2；Remoting&lt;=3384.v60d89463d9e0单独列，缺各CVE完整边界

代码与实验材料：无PoC；两只读检查只能显示头/磁盘jar候选，不证明实际加载依赖或漏洞可利用

来源证据范围：2026-08-06文章声称前一日官方25CVE，无官方公告或原始研究链接

- **凭据与会话边界（1）**：任意写/反序列化被直接推为无条件RCE；依据：所谓完整攻击链没有具体gadget/写入触发条件；能通信与具Agent/Connect权限不同；主控想读什么读什么仍受进程权限/凭据保护约束。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **操作与副作用边界（2）**：五漏洞覆盖和版本表不完整；依据：70430只列名称未描述所需角色/影响；统一版本表无分项来源；70429自带用户库不接受非ASCII声明需官方核。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **事实待核（3）**：资产检查与加载状态混淆；依据：find JENKINS_HOME内jar文件未必定位WAR内实际Remoting版本，响应头可能隐藏/代理改写。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  【漏洞预警】Jenkins公告25个漏洞，其中5个涉及本体的漏洞需要重点关注  
YGnight
                    YGnight  night安全   2026-08-06 13:28  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/LAQpgdWQSctVS8Ps0NsFTqMiasz8uDibcvoib0spt17ORFYGT7Lk8y0JElHpWukiczXboIicO8mrOUut0DwfE4PvMwpuReeibS0yQHqN8Tictdm4Z4/640?wx_fmt=png&from=appmsg "")  
  
Jenkins 8 月 5 号公布了25个cve漏洞，除开插件漏洞后主要涉及5个需要注意的漏洞。  
  
一、漏洞清单  
  
CVE-2026-70426  
 · Agent Remoting 反序列化绕过  
  
CVE-2026-70427  
 · tar 解压符号链接任意文件写  
  
CVE-2026-70428  
 · 文件参数路径穿越任意文件写  
  
CVE-2026-70429  
 · 用户名 Unicode 大小写冒名  
  
CVE-2026-70430  
 · 命名策略配置类型越界  
<table><tbody><tr style="background-color:#f3f5f8;"><td style="border:1px solid #e7e9ee;padding:8px 10px;font-weight:bold;color:#1f2329;"><section><span leaf="">版本区间</span></section></td><td style="border:1px solid #e7e9ee;padding:8px 10px;font-weight:bold;color:#1f2329;"><section><span leaf="">状态</span></section></td></tr><tr><td style="border:1px solid #e7e9ee;padding:8px 10px;"><section><span leaf="">weekly ≤ 2.575 / LTS ≤ 2.568.1</span></section></td><td style="border:1px solid #e7e9ee;padding:8px 10px;color:#d63a2f;font-weight:bold;"><section><span leaf="">受影响</span></section></td></tr><tr><td style="border:1px solid #e7e9ee;padding:8px 10px;"><section><span leaf="">weekly 2.576 / LTS 2.568.2</span></section></td><td style="border:1px solid #e7e9ee;padding:8px 10px;color:#0a9b6e;font-weight:bold;"><section><span leaf="">已修复</span></section></td></tr></tbody></table>  


二、原理分析  
  
70426 这条最值得拆一下。Jenkins 主控和 agent 之间走  Remoting 库传序列化对象，主控收数据时按 JEP-200 套了一层类白名单挡反序列化攻击。但 Remoting  3384.v60d89463d9e0 及更早的版本里有一条备用解析路径，这层过滤没套上去。能在 agent 上跑代码、或者有  Agent/Connect 权限的人，把对象从这条备用路径送进去，主控照收照反序列化。能触发的范围限在 Jenkins 自带和 Java  平台类，插件自带的依赖不会被反序列化，但这足够在主控上跑代码了。  
  
70427 和 70428 都是任意文件写，路径不同。70427 出在解  tar/tar.gz 包时对符号链接名处理不干净，能控制 agent 的人塞个特制包就能按 Jenkins  跑的那个用户的文件系统权限往任意位置写。70428 出在文件参数名字里的路径穿越识别错，有 Item/Configure 和  Item/Build 权限的人能把文件写到主控任意位置。  
  
70429 是用户名比对前后不一致。Jenkins 给大小写不敏感的用户名建规范  ID 时走 lowercase，但实际比对用的是 String[#equalsIgnoreCase]()  
，后者会把某些 Unicode  字符当成跟别的字符相等——比如"无点 i" ı 被认为等于普通小写 i。能建用户的人就能起一个跟现有用户撞名的账号顶替别人权限。Jenkins  自带的用户库不让 ASCII 外字符注册，默认摸不到，接了外部安全域的要注意。  
  
三、完整攻击链  
  
简单梳理一下流程，拿70426举例一下，70427/70428 是平行入口，落点都是主控代码执行。  
  
1  
拿到 Agent/Connect 权限  
  
内部能连 agent 的人，或者已经控制了某台 agent 进程，这一步不要管理员权限。  
  
2  
从备用解析路径送对象  
  
那条没套过滤的路径直接收下，主控在自家进程里把对象反序列化掉。  
  
3  
主控上跑命令  
  
落 webshell 或者反向连接都行，主控进程的权限就是 Jenkins 跑的那个用户的权限。  
  
4  
拿走主控上的东西  
  
凭据、云令牌、构建任务配置都在 JENKINS_HOME 下，主控代码执行之后想读什么读什么。  
  
这批补丁里 agent 反过来打主控这条路是真的——不是只听话的从节点，一台被控制的 agent 借 70426 就能咬到主控。能跟 agent 通信的人，主控代码执行这个风险就该认下来。  
  
四、自主排查  
  
下面两条都是只读，检查是否存在漏洞范围内。  
  
版本号  
```
# 响应头里的 X-Jenkins 字段，不用登录就能读
curl -sI https://<你的jenkins>/ | grep -i x-jenkins
```  
  
通信库版本和 agent 权限  
```
# 服务器本地看实际加载的通信库版本
find $JENKINS_HOME -name 'remoting-*.jar' 2>/dev/null
# 后台 Manage Jenkins - Security - Agents
# 确认低权限不能连 agent，Agent/Connect 只发给可信节点
```  
  
五、修复防御方案  
  
升级版本，weekly到2.576、LTS到2.568.2  
  
升不了可以暂时将不可信的节点断开  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/LAQpgdWQSctTWicwicwovsVtMLAjYPfEB9lMRmJJiaIozWIuicwrbneXZ3pGly4lRNAd1WrP6AKYA925Iz4c1EbnMLCOqWzkCmdCLXDQibsG4VQw/640?wx_fmt=png&from=appmsg "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
