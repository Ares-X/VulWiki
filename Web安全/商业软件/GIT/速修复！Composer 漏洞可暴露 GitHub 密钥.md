---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  速修复！Composer 漏洞可暴露 GitHub 密钥  
DDoS
                    DDoS  代码卫士   2026-05-14 04:04  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Az5ZsrEic9ot90z9etZLlU7OTaPOdibteeibJMMmbwc29aJlDOmUicibIRoLdcuEQjtHQ2qjVtZBt0M5eVbYoQzlHiaw/640?wx_fmt=gif "")  
    
聚焦源代码安全，网罗国内外最新资讯！  
  
**编译：代码卫士**  
  
**PHP****的依赖管理 Composer的联合创始人 Nils Adermann 在PHP社区发布了一份紧急公告称，Composer中存在一个漏洞（CVE-2026-45793，CVSS评分7.5），会将敏感的 GitHub 认证令牌意外泄露到公开或私有的 CI/CD 日志中。该漏洞导致数千个仓库面临凭据失窃的风险。**  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
该漏洞由 GitHub 基础设施近期的一项变更引发。GitHub 为 GITHUB_TOKEN 和 GitHub App 安装令牌引入了新的结构化格式，其中包含连字符（-）。而 Composer 自 2021 年确立的内部验证逻辑并未设计为识别该字符。  
  
公告解释道：“新格式无法通过 Composer 的验证，导致产生错误信息，并将完整的令牌内容暴露到 stderr。”由于许多 CI/CD 环境会捕获 stderr 来生成作业日志，因此这些敏感密钥就以明文形式暴露给任何拥有日志访问权限的人员。  
  
公告指出，该漏洞是由如下三个因素导致的：  
  
1、被拒绝的令牌被原样放入错误信息中，错误提示为“您用于 github.com的 github oauth 令牌中包含不合法字符: <完整令牌在此>”。  
  
2、验证正则表达式仅允许[A-Za-z0-9_.]，导致新的带连字符的令牌无法通过校验。  
  
3、GitHub Actions 的密钥掩码机制往往无法屏蔽此类泄露，因为错误信息可能被其它文本包裹或交错，导致精确子串匹配无法实现。  
  
尽管 GitHub 短暂回滚了新令牌格式以给生态系统留出反应时间，但威胁依然严峻。公告警告称：“任何配置了 GitHub App 安装令牌……然后运行任意 Composer 命令的工作流，都会触发此问题。”  
  
风险程度高度依赖于用户环境：  
  
- 托管的运行器：泄露的令牌通常有效期为6 小时。  
  
- 自托管运行器：泄露的令牌有效期可长达24 小时，为攻击者提供了更大的利用窗口。  
  
  
  
Composer 团队已发布即时补丁，修复了底层泄露根源。修复方案包括：从异常消息中移除令牌，并放宽验证正则表达式以接受新格式。  
  
建议采取如下行动：  
  
- 立即更新 Composer：运行 composer.phar self-update 更新至版本 2.9.8 或 2.2.28（LTS）。  
  
- 审计日志：如果使用 GitHub App 安装令牌，请检查近期 Actions 日志中是否存在“不合法字符”的错误。  
  
- 更换已泄露的密钥：如果在日志中发现明文令牌，“请删除任何明文可能已被写入作业日志的令牌……并确认没有发生意外情况。  
  
  
  
如果无法立即更新，Composer 团队建议在应用补丁之前，禁用所有运行 Composer 命令的 GitHub Actions。  
  
  
 开源  
卫士试用地址：  
https://oss.qianxin.com/#/login  
  
 代码卫士试用地址：https://sast.qianxin.com/#/login  
  
  
  
  
  
  
  
  
  
**推荐阅读**  
  
[PHP Composer 多个新漏洞可导致任意命令执行](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525778&idx=1&sn=f575dcb35ac2b3091d3f1a2359e1ae4d&scene=21#wechat_redirect)  
  
  
[PHP包管理器Composer组件 Packagist中存在漏洞，可导致软件供应链攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247514137&idx=1&sn=347691413dc7ecfc2a2dedd365115329&scene=21#wechat_redirect)  
  
  
[仅凭一条 git push 命令，即可在 GitHub 实现RCE 并访问数百万仓库](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525909&idx=1&sn=3a1d88cd8e20887b0792cd899f1b843e&scene=21#wechat_redirect)  
  
  
[GitHub 开源软件仓库遭 AI 自动化供应链攻击](https://mp.weixin.qq.com/s?__biz=MzI2NTg4OTc5Nw==&mid=2247525661&idx=2&sn=e2b376519fd021476f7dc20c7e37091a&scene=21#wechat_redirect)  
  
  
  
  
  
**原文链接**  
  
https://securityonline.info/composer-github-token-leak-vulnerability-cve-2026-45793/  
  
  
题图：Pixa  
bay Licens  
e  
  
  
**本文由奇安信编译，不代表奇安信观点。转载请注明“转自奇安信代码卫士 https://codesafe.qianxin.com”。**  
  
  
  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSf7nNLWrJL6dkJp7RB8Kl4zxU9ibnQjuvo4VoZ5ic9Q91K3WshWzqEybcroVEOQpgYfx1uYgwJhlFQ/640?wx_fmt=jpeg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/oBANLWYScMSN5sfviaCuvYQccJZlrr64sRlvcbdWjDic9mPQ8mBBFDCKP6VibiaNE1kDVuoIOiaIVRoTjSsSftGC8gw/640?wx_fmt=jpeg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](https://mmbiz.qpic.cn/mmbiz_gif/oBANLWYScMQ5iciaeKS21icDIWSVd0M9zEhicFK0rbCJOrgpc09iaH6nvqvsIdckDfxH2K4tu9CvPJgSf7XhGHJwVyQ/640?wx_fmt=gif "")  
  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
