---
cve: "CVE-2026-6279"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  CVSS 9.8 【严重】CVE-2026-6279 wordpress Avada Builder 未授权RCE漏洞：call_user_func 无过滤直接沦陷  
原创 爱坤
                    爱坤  爱坤sec   2026-05-24 18:30  
  
# 一 漏洞描述  
  
Avada Builder（fusion-builder）是 Avada 主题配套的页面构建插件，全球最畅销的 WordPress 商业插件之一。版本 ≤ 3.15.2 中，`Fusion_Builder_Conditional_Render_Helper::get_value()` 在处理 `wp_conditional_tags` 分支时，将攻击者 base64 编码的 JSON 数据直接传入 `call_user_func()` 执行，未做任何白名单校验。攻击者通过 `fusion_get_widget_markup` AJAX 接口（无认证注册）发送精心构造的 payload 即可实现远程代码执行。CVSS 评分 9.8。  
  
CVSS 评分 9.8  
# 二 影响版本  
```
插件: Avada Builder (fusion-builder)
影响版本: ≤ 3.15.2
修复版本: ≥ 3.15.3
```  
# 三 搜索语法  
```
body="/wp-content/plugins/fusion-builder/"
```  
  
四 影响范围  
  
  
资产大约20w个  
  
Avada 是 ThemeForest 销量第一的 WordPress 主题（90万+ 销量），fusion-builder 作为其核心组件安装量极大，全球预估受影响站点超过 **20 万个**。且 PoC 已公开，无需认证即可利用，风险极高  
  
![](https://mmbiz.qpic.cn/mmbiz_png/uqtLGQlJSxUTgLNI5Gxo8xcPVDFAGOsUjDkfD7khEqkkYXo7vqdP6A8n7d7XO6JeefjsicsRicbw9Azzf0Cqy4ByrByTGGT6FBatabeJPme2Y/640?wx_fmt=png&from=appmsg "")  
  
五 利用脚本  
```
https://github.com/zycoder0day/CVE-2026-6279
```  
  
【严重声明】本文所涉及的工具、思路和操作手法仅用于本地安全测试以及教育目的，禁止将其用于非法入侵或对他人的系统进行攻击以及盈利，一切后果由操作者自行承担！！！下载后的24小时请删除。  
  
更多精彩文章与工具分享 欢迎关注  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
