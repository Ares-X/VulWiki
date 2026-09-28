---
cve: "CVE-2026-21509"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞通告】Microsoft Office 安全功能绕过漏洞(CVE-2026-21509)  
深瞳漏洞实验室
                    深瞳漏洞实验室  深信服千里目安全技术中心   2026-01-28 08:42  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zbjQhyQicPG9GA334GuF1XTv4lB5eVSNib5VgrrqoapLATcmW64DBwPmjsiag0s1Q4iaN4HBpaD3Q9VA/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞名称：**  
  
Microsoft Office 安全功能绕过漏洞(CVE-2026-21509)  
  
**组件名称：**  
  
微软-Office  
  
**影响范围：**  
  
Microsoft Office 2016  
  
Microsoft Office 2019  
  
Microsoft Office LTSC 2021  
  
Microsoft Office LTSC 2024  
  
Microsoft 365 Apps for Enterprise  
  
**漏洞类型：**  
  
绕过认证  
  
**利用条件：**  
  
1、用户认证：无需用户认证  
  
2、前置条件：默认配置  
  
3、触发方式：本地  
  
**综合评价：**  
  
<综合评定利用难度>：容易，无需授权即可绕过认证。  
  
<综合评定威胁等级>：高危，可绕过身份认证。  
  
**官方解决方案：**  
  
已发布  
  
  
  
  
**漏洞分析**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zbjQhyQicPG9GA334GuF1XTvMuDQpsyiaVjohb0HcCdpp3APtibrTuUibw6gFOYQvoKcjSIKSiasbWJ4w/640?wx_fmt=gif&from=appmsg "")  
  
组件介绍  
  
Microsoft Office是由微软公司开发的全球领先的办公软件套件，其核心组件包括用于文字处理的Word、电子表格Excel、演示文稿PowerPoint，以及电子邮件管理Outlook和数据库应用Access等。该套件支持Windows、macOS及移动平台，并通过Microsoft 365云服务提供实时协作与高级功能，以其强大的兼容性、丰富的工具集和广泛的企业集成能力，成为个人与企业处理文档、数据分析和团队协作的基础生产力平台。  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zbjQhyQicPG9GA334GuF1XTvMuDQpsyiaVjohb0HcCdpp3APtibrTuUibw6gFOYQvoKcjSIKSiasbWJ4w/640?wx_fmt=gif&from=appmsg "")  
  
**漏洞简介**  
  
  
2026年1月27日，深瞳漏洞实验室监测到一则微软-Office组件存在绕过认证漏洞的信息，漏洞编号：CVE-2026-21509，漏洞威胁等级：高危。  
  
Microsoft Office 存在安全功能绕过漏洞，攻击者可利用此漏洞构造特制文档，以绕过Microsoft Office中用于防御不安全OLE对象的防护机制。**攻击实施需诱使用户打开恶意Office文件，未经身份验证的攻击者可利用此漏洞发起攻击，该漏洞已被发现在野利用。**  
  
  
  
**影响范围**  
  
目前受影响的微软-Office版本：  
  
Microsoft Office 2016  
  
Microsoft Office 2019  
  
Microsoft Office LTSC 2021  
  
Microsoft Office LTSC 2024  
  
Microsoft 365 Apps for Enterprise  
  
  
  
**解决方案**  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zbjQhyQicPG9GA334GuF1XTvMuDQpsyiaVjohb0HcCdpp3APtibrTuUibw6gFOYQvoKcjSIKSiasbWJ4w/640?wx_fmt=gif&from=appmsg "")  
  
**官方修复建议**  
  
  
1、官方修复建议  
  
官方已发布最新版本修复该漏洞，建议受影响用户将Microsoft Office更新到最新版本。  
  
参考链接：https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-21509  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zbjQhyQicPG9GA334GuF1XTvMuDQpsyiaVjohb0HcCdpp3APtibrTuUibw6gFOYQvoKcjSIKSiasbWJ4w/640?wx_fmt=gif&from=appmsg "")  
  
**临时修复建议**  
  
- 关闭未使用的功能模块，减少潜在攻击入口。  
  
- 遵循最小权限原则，严控各类敏感操作权限范围。  
  
- 非必要不暴露服务到公网，限制访问源为可信范围。  
  
- 定期更新系统及各类组件至安全版本，及时修补已知隐患。  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/w8NHw6tcQ5zbjQhyQicPG9GA334GuF1XTvMuDQpsyiaVjohb0HcCdpp3APtibrTuUibw6gFOYQvoKcjSIKSiasbWJ4w/640?wx_fmt=gif&from=appmsg "")  
  
**深信服解决方案**  
  
  
**风险资产发现**  
  
支持对微软-Office的主动检测，可批量检出业务场景中该事件的**受影响资产**  
情况，相关产品如下：  
  
**【深信服统一端点安全管理系统aES】**  
已发布资产检测方案，指纹ID:0001936。  
  
  
  
参考链接  
  
  
https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-21509  
  
  
  
时间轴  
  
  
  
**2026/01/27**  
  
深瞳漏洞实验室监测到Microsoft Office 安全功能绕过漏洞信息。  
  
  
  
**2026/01/28**  
  
深瞳漏洞实验室发布漏洞通告。  
  
  
  
点击**阅读原文**  
，及时关注并登录深信服**智安全平台**  
，可轻松查询漏洞相关解决方案。  
  
![](https://mmbiz.qpic.cn/mmbiz_png/w8NHw6tcQ5zbjQhyQicPG9GA334GuF1XT9wV88ggxwChKFusf0p3VS5eFdF7VUic5OdIjm3MYjAqnjOLvYHrrhUg/640?wx_fmt=png&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/w8NHw6tcQ5zvcIHbwGGYKbqDVYsVKzNNia1jYtHf49C7133AlDXAgex2W4lFvpia56tjQQDkiauNBrl08YbxqG01A/640?wx_fmt=jpeg&from=appmsg "")  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
