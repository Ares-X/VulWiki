---
cve: "CVE-2026-46376"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CVSS 9.1 【严重】CVE-2026-46376 FreePBX userman 模块硬编码凭证漏洞：企业电话系统门户全网裸奔  
原创 chicken
                    chicken  爱坤sec   2026-05-23 18:30  
  
# 一 漏洞描述  
  
FreePBX（全球最流行的开源 IP PBX 平台）的 User Management (userman) 模块在 UCP 通用模板设置流程中插入了**硬编码默认凭证**，未认证攻击者可凭此静态凭据直接登录用户控制面板（UCP），实现未授权访问。该漏洞于 2021 年悄然引入，距今已潜伏长达 5 年，CVSS v4.0 评分 9.1（Critical），CWE-798 硬编码凭证。  
  
CVSS 评分 9.1  
# 二 影响版本  
```
FreePBX 16: < 16.0.45
FreePBX 17: < 17.0.7
已修复版本: 16.0.45 / 17.0.7（更新 userman 模块即可）
```  
# 三 搜索语法  
```
app="FreePBX"
```  
  
四 利用方法  
```
Userman 模块的 UCP 通用模板为方便批量部署，插入了**硬编码示例凭据**。管理员启用该功能后若不手动更换密码，任何知道默认凭据的未认证用户均可直接通过 UCP 登录界面进入系统，无需任何交互或复杂攻击链。
```
攻击路径:
[攻击者] → UCP 登录页面 → 硬编码凭据 → 未授权访问 → 
  读取用户敏感数据 / 修改配置 / 横向移动
```
漏洞由研究员 s0nnyWT 报告，Sangoma-Heera 修复。修复方式为在安装过程中随机化默认凭据。加拿大网络中心于 2026 年 5 月 15 日发布安全公告 AV26-474。
```  
  
五 影响范围  
  
资产大约4.5w个  
  
FreePBX 部署于全球大量企业 VoIP 通信环境、呼叫中心和托管 PBX 系统。受影响版本涵盖 16/17 两大主流分支，2021 年后的部署若使用 UCP 通用模板且未修改默认密码，均处于暴露状态。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/uqtLGQlJSxWB2SBL4vEV9W5icCYNV3gIbOJFpL7C4UaskC2E66HMRibAic8fj8Z0yUmdhcIQf5orCLlQxW2iaH4u4jvJwqmJ62rU0T3WgickIbf8/640?wx_fmt=png&from=appmsg "")  
  
六 临时缓解措施  
```
- 立即更新 userman 模块至 16.0.45 或 17.0.7
- 使用 FreePBX 内置防火墙模块限制 UCP 访问来源
- 启用 MFA / VPN / SAML 加固管理入口
- 审计现有 UCP 会话是否存在异常登录
```  
  
【严重声明】本文所涉及的工具、思路和操作手法仅用于本地安全测试以及教育目的，禁止将其用于非法入侵或对他人的系统进行攻击以及盈利，一切后果由操作者自行承担！！！下载后的24小时请删除。  
  
更多精彩文章与工具分享 欢迎关注  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
