---
source: "历史归档批(无原始出处标注)"
id: "vw-9b2f9d6c12b3b2a3ba338f6d"
entity_id: "ve-9b2f9d6c12b3b2a3ba338f6d"
schema_version: "1"
title: "绿盟UTS绕过登录"
product: "NSFOCUS UTS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "先改客户端响应访问界面，账户接口疑无需认证；无版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E7%BB%BF%E7%9B%9F/%E7%BB%BF%E7%9B%9FUTS%E7%BB%95%E8%BF%87%E7%99%BB%E5%BD%95.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# 绿盟UTS绕过登录

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：NSFOCUS UTS
- 本文讨论：accountmanage/account泄露 + 登录hash重放候选
- 版本、权限与配置前提：先改客户端响应访问界面，账户接口疑无需认证；无版本
- 资料类型：UTS泄露到hash重放链；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 修改响应只能影响前端，真正服务器漏洞是账号接口和hash重放，需拆解
- 没有完整登录请求展示替换字段，重复叙述但原研究链接有价值

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 实际hash重放协议/前端状态与后端授权差异、修复待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


随便输密码->修改返回包为True->放行->等待第二次拦截包->内含管理员MD5->替换MD5登录

直接请求接口：/webapi/v1/system/accountmanage/account



---

逻辑漏洞,利用方式参考:https://www.hackbug.net/archives/112.html
1、修改登录数据包 {"status":false,"mag":""} -> {"status":true,"mag":""} 

2、/webapi/v1/system/accountmanage/account接口逻辑错误泄漏了管理员的账户信息包括密码(md5) 

3、再次登录,替换密码上个数据包中md5密码

4、登录成功

![image-20201020130839790](./.resource/绿盟UTS绕过登录/media/image-20201020130839790.png)

对响应包进行修改，将false更改为true的时候可以泄露管理用户的md5值密码

![image-20201020130923535](./.resource/绿盟UTS绕过登录/media/image-20201020130923535.png)