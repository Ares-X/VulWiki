---
cve: "CVE-2023-29325"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Windows OLE 远程代码执行漏洞CVE-2023-29325   
深益研究实验室  深信服千里目安全技术中心   2023-05-12 18:52  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xKmLKEmDQwxBwVIUNhxia319epys4FMJVu5ia9iapgJj5CKquUo5BPxHN2wLayIjnyYtYdNW18988ibw/640?wx_fmt=gif "")  
  
**漏洞名称：**  
  
Windows OLE 远程代码执行漏洞  
  
CVE-2023-29325  
  
**组件名称：**  
  
Windows OLE  
  
**影响范围：**  
  
Windows 10  
  
Windows 11  
  
Windows Server 2008  
  
Windows Server 2012  
  
Windows Server 2016  
  
Windows Server 2019  
  
Windows Server 2022  
  
（见下文）  
  
**漏洞类型：**  
  
远程代码执行  
  
**利用条件：**  
  
1、用户认证：不需要用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：远程  
  
**综合评价：**  
  
<综合评定利用难度>：高  
  
<综合评定威胁等级>：高危，能造成远程代码执行。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xKmLKEmDQwxBwVIUNhxia31NcZ6760iaiaXpVh7XlaVX4AjrDW65NGOibmic1ZhPVb9KrcTr9lcZxUz4Q/640?wx_fmt=gif "")  
  
**组件介绍**  
  
OLE（Object Linking and Embedding）是由Microsoft开发的一种技术，允许不同的应用程序共享信息和功能。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xKmLKEmDQwxBwVIUNhxia31NcZ6760iaiaXpVh7XlaVX4AjrDW65NGOibmic1ZhPVb9KrcTr9lcZxUz4Q/640?wx_fmt=gif "")  
  
**漏洞简介**  
  
近日，深信服安全团队监测到一则Windows OLE组件存在远程代码执行漏洞的信息，漏洞编号：CVE-2023-29325，漏洞威胁等级：高危。  
  
该漏洞是由于Windows OLE组件存在内存破坏漏洞，**攻击者可以通过向受害者发送特制电子邮件来利用此漏洞，从而导致受害者使用受影响的 Microsoft Outlook 软件版本打开特制电子邮件，或者受害者的 Outlook 应用程序显示特制电子邮件的预览。最终导致攻击者在受害者的机器上执行远程代码。**  
  
  
**影响范围**  
  
目前受影响的Windows版本：  
  
  
Windows Server 2022 (Server Core installation)  
  
Windows Server 2022  
  
Windows Server 2019 (Server Core installation)  
  
Windows Server 2019  
  
Windows Server 2016 (Server Core installation)  
  
Windows Server 2016  
  
Windows Server 2012 R2 (Server Core installation)  
  
Windows Server 2012 R2  
  
Windows Server 2012 (Server Core installation)  
  
Windows Server 2012  
  
Windows Server 2008 for x64-based Systems Service Pack 2 (Server Core installation)  
  
Windows Server 2008 for x64-based Systems Service Pack 2  
  
Windows Server 2008 for 32-bit Systems Service Pack 2 (Server Core installation)  
  
Windows Server 2008 for 32-bit Systems Service Pack 2  
  
Windows Server 2008 R2 for x64-based Systems Service Pack 1 (Server Core installation)  
  
Windows Server 2008 R2 for x64-based Systems Service Pack 1  
  
Windows 11 version 21H2 for x64-based Systems  
  
Windows 11 version 21H2 for ARM64-based Systems  
  
Windows 11 Version 22H2 for x64-based Systems  
  
Windows 11 Version 22H2 for ARM64-based Systems  
  
Windows 10 for x64-based Systems  
  
Windows 10 for 32-bit Systems  
  
Windows 10 Version 22H2 for x64-based Systems  
  
Windows 10 Version 22H2 for ARM64-based Systems  
  
Windows 10 Version 22H2 for 32-bit Systems  
  
Windows 10 Version 21H2 for x64-based Systems  
  
Windows 10 Version 21H2 for ARM64-based Systems  
  
Windows 10 Version 21H2 for 32-bit Systems  
  
Windows 10 Version 20H2 for x64-based Systems  
  
Windows 10 Version 20H2 for ARM64-based Systems  
  
Windows 10 Version 20H2 for 32-bit Systems  
  
Windows 10 Version 1809 for x64-based Systems  
  
Windows 10 Version 1809 for ARM64-based Systems  
  
Windows 10 Version 1809 for 32-bit Systems  
  
Windows 10 Version 1607 for x64-based Systems  
  
Windows 10 Version 1607 for 32-bit Systems  
  
  
**漏洞验证**  
  
  
搭建Windows 10.0.19045.2846版本环境，在Outlook中复现该漏洞导致应用崩溃，效果如下：  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5xKmLKEmDQwxBwVIUNhxia31GFiczReR2qCGXzRfBD5p5TUibQPCOffqia6RyNtv1Pq2WoBhZB2WNC68A/640?wx_fmt=png "")  
  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xKmLKEmDQwxBwVIUNhxia31NcZ6760iaiaXpVh7XlaVX4AjrDW65NGOibmic1ZhPVb9KrcTr9lcZxUz4Q/640?wx_fmt=gif "")  
  
**如何检测组件版本**  
  
  
使用 cmd.exe 执行 “winver” 命令，可以获取Windows操作系统的内部版本号。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xKmLKEmDQwxBwVIUNhxia31NcZ6760iaiaXpVh7XlaVX4AjrDW65NGOibmic1ZhPVb9KrcTr9lcZxUz4Q/640?wx_fmt=gif "")  
  
**官方修复建议**  
  
  
当前官方已发布受影响版本的对应补丁，建议受影响的用户及时更新官方的安全补丁。链接如下：  
  
https://msrc.microsoft.com/update-guide/en-us/vulnerability/CVE-2023-29325   
  
  
**打补丁方法:**  
  
该漏洞各版本的补丁可进入上面的链接页面，下载当前系统版本对应的补丁包进行安装。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xKmLKEmDQwxBwVIUNhxia31NcZ6760iaiaXpVh7XlaVX4AjrDW65NGOibmic1ZhPVb9KrcTr9lcZxUz4Q/640?wx_fmt=gif "")  
  
**临时修复建议**  
  
  
该临时修复建议存在一定风险，建议用户可根据业务系统特性审慎选择采用临时修复方案：  
  
  
将Microsoft Outlook配置成以纯文本格式查看所有标准邮件来降低用户打开来自未知或不受信任来源的 RTF 文件的风险，参考链接https://support.microsoft.com/en-us/office/read-email-messages-in-plain-text-16dfe54a-fadc-4261-b2ce-19ad072ed7e3  
  
  
可能造成的风险：以纯文本格式查看的电子邮件将不包含图片、专用字体、动画或其他丰富的内容。此外，可能会遇到以下行为：  
  
  
更改会应用于预览窗格和打开的邮件；  
  
图片会被转换成附件形式，以免丢失；  
  
存储中的邮件仍然以RTF或HTML格式存在，所以可能会导致对象模型（自定义代码解决方案）出现意外行为。  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5xKmLKEmDQwxBwVIUNhxia31NcZ6760iaiaXpVh7XlaVX4AjrDW65NGOibmic1ZhPVb9KrcTr9lcZxUz4Q/640?wx_fmt=gif "")  
  
**深信服解决方案**  
  
  
**1.风险资产发现**  
  
支持对 Windows 的主动检测，可批量检出业务场景中该事件的受影响资产情况，相关产品如下：  
  
**【深信服主机安全检测响应平台CWPP】**已发布资产检测方案。  
  
**【深信服云镜YJ】**已发布资产检测方案。  
  
  
**2.漏洞主动检测**  
  
支持对Windows OLE的主动检测，可批量快速检出业务场景中是否存在漏洞风险，相关产品如下：  
  
**【深信服云镜YJ】**预计2023年5月30日发布检测方案  
  
  
**参考链接**  
  
https://msrc.microsoft.com/update-guide/zh-cn/vulnerability/CVE-2023-29325  
  
  
**时间轴**  
  
  
  
**2023/5/10**  
  
微软例行补丁日，微软官网发布漏洞安全公告  
  
  
**2023/5/12**  
  
深信服千里目安全技术中心发布漏洞通告。  
  
  
点击**阅读原文**，及时关注并登录深信服**智安全平台**，可轻松查询漏洞相关解决方案。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5xKmLKEmDQwxBwVIUNhxia31SDqP6ibDV8NwVW1bHfADgfIcho3fQjib7QV2OvWOXXs9hxnUNZgoBEYA/640?wx_fmt=jpeg "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
