---
source: "gelusus/wxvl 公众号漏洞文库"
product: "Composer"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2026-45793"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
category_recommendation: "Web安全/开发框架/PHP"
title: "速修复！Composer 漏洞可暴露 GitHub 密钥"
prerequisites: "来源所述条件，未列明部分仍待核：Fix2.9.8/2.2.28; invalid newly formattedGitHubtoken logged tostderr; affected lower bounds unspecified"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-45bb4d77a3182d3b243c86e4"
entity_id: "ve-45bb4d77a3182d3b243c86e4"
schema_version: "1"
---

## 核对与使用边界

- 分类更正：正文研究对象为 Composer；目录中的语言/协议或其他产品名不能代替实际受影响产品。本次只更正元数据和分类建议，原材料保持原路径。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：Fix2.9.8/2.2.28; invalid newly formattedGitHubtoken logged tostderr; affected lower bounds unspecified

代码与实验材料：No PoC, sample error described; no actual tokens present

来源证据范围：SecurityOnline link, no Composer advisory/commit

- **适用与权限边界（1）**：Misfiled underGit; token lifetime6h/24h and masking-bypass explanation require token-type-specific primary confirmation。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **证据待核（2）**：Broad disable-all-Composer-Actions recommendation lacks scoped evidence; missing affected matrix。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  速修复！Composer 漏洞可暴露 GitHub 密钥  
DDoS
                    DDoS  代码卫士   2026-05-14 04:04  
  
![](../../.resource/remote/afc2fa5611a63e89ebec625ecc33d28c5dcdb706b6fbdabb79f7c1e8982068c0.gif "")  
    
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
  
  
  
  
![](../../.resource/remote/2c03ce3cc6bb81bca85bd412ed60e93c4bc0a295a1fc9d3739d8aca43497fbb4.jpg "")  
  
![](../../.resource/remote/b33054170f5acbf0023711f517b5bee9799a2f57b155a774d3945e6d78184e63.jpg "")  
  
**奇安信代码卫士 (codesafe)**  
  
国内首个专注于软件开发安全的产品线。  
  
   ![](../../.resource/remote/8a5c84b98d9b52b1d4f4306180ec26c9aa65342b326b5b98ad2f097b488152f4.gif "")  
  
  
   
觉得不错，就点个 “  
在看  
” 或 "  
赞  
” 吧~  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
