---
cve: "CVE-2026-28213"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  EverShop严重安全漏洞警报：密码重置令牌直接暴露，CVSS 9.8分  
原创 CVE-SEC
                    CVE-SEC  CVE-SEC   2026-02-28 00:01  
  
# EverShop严重安全漏洞警报：密码重置令牌直接暴露，CVSS 9.8分  
## 漏洞速览  
  
近日，开源电商平台EverShop被曝出严重安全漏洞CVE-2026-28213，CVSS评分高达9.8分（严重级别）。该漏洞允许攻击者在无需任何身份验证的情况下，直接获取密码重置令牌，进而劫持任意用户账户。由于攻击门槛极低、影响范围广泛，该漏洞已引起安全社区的高度关注。  
  
**核心问题：API响应中直接暴露密码重置令牌**  
  
这是一个典型的信息泄露漏洞，将本应通过安全渠道（邮件）传递的敏感令牌直接暴露在API响应中，彻底打破了密码重置机制的安全假设。  
## 一、漏洞基本信息  
  
**漏洞编号**  
：CVE-2026-28213****  
  
**GHSA编号**  
：GHSA-cg73-g723-39jw****  
  
**披露时间**  
：2026年2月26日      **CVSS评分**  
：9.8（严重）****  
  
**漏洞类型**  
：敏感信息泄露 + 弱密码恢复机制****  
  
**影响版本**  
：EverShop < v2.1.1****  
  
**修复版本**  
：v2.1.1及以上  
  
**受影响产品**  
： EverShop是一个基于TypeScript和Node.js的现代化开源电商平台，采用GraphQL + React技术栈，主要面向需要自主部署电商解决方案的开发者和中小企业。  
## 二、技术原理：一个不应犯的错误  
### 正常的密码重置流程应该是这样的  
1. 用户点击"忘记密码"，输入邮箱  
  
1. 服务器生成重置令牌，通过邮件发送给用户  
  
1. 用户点击邮件中的链接（包含令牌）  
  
1. 用户设置新密码，令牌失效  
  
在这个流程中，令牌应当是**机密信息**  
，只能通过用户邮箱这一安全渠道传递。  
### 但EverShop受影响版本的实现却是  
  
当用户请求密码重置时，服务器的API响应居然直接包含了重置令牌：  
```
POST /api/forgotPassword{  "email": "victim@example.com"}响应：{  "success": true,  "message": "Password reset email sent",  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```  
  
这意味着，攻击者只需要：  
1. 发起一个普通的密码重置请求  
  
1. 在API响应中直接拿到令牌  
  
1. 使用令牌重置密码  
  
**整个过程无需访问受害者邮箱，无需任何身份验证，甚至无需任何用户交互。**  
### 为什么说这是"不应犯的错误"？  
  
这违反了多个基本安全原则：  
- **最小权限原则**  
：API调用者不应该看到令牌  
  
- **数据最小化**  
：响应中包含了不必要的敏感信息  
  
- **信任边界**  
：混淆了内部数据和外部API的界限  
  
这类错误在OWASP Top 10中属于"Broken Access Control"（失效的访问控制）和"Security Misconfiguration"（安全配置错误）范畴。  
## 三、攻击场景：简单到令人惊讶  
### 场景一：批量账户劫持  
  
攻击者可以编写简单的自动化脚本，对大量用户发起密码重置请求：  
```
for email in user_email_list:    response = requests.post(        "https://target-shop.com/api/forgotPassword",        json={"email": email}    )    token = response.json()["token"]    reset_password(token, "hacker_password")
```  
  
几分钟内即可劫持数百个账户。  
### 场景二：针对性攻击管理员  
  
攻击者通过网站"联系我们"页面获取管理员邮箱，发起针对性攻击：  
1. 重置管理员密码  
  
1. 登录后台  
  
1. 窃取客户数据  
  
1. 篡改订单信息  
  
1. 植入恶意代码  
  
### 场景三：供应链攻击  
  
如果劫持了供应商账户，攻击者可以：  
- 修改产品描述，嵌入恶意链接  
  
- 更改供货价格  
  
- 窃取商业机密  
  
## 四、危害评估：不仅仅是账户被盗  
### 对用户的影响  
- 个人信息泄露（姓名、地址、电话）  
  
- 购买历史被窃取  
  
- 支付信息可能暴露  
  
- 可能遭遇欺诈交易  
  
### 对企业的影响  
  
**财务损失**  
：  
- 数据泄露罚款（GDPR最高可达年营业额4%或2000万欧元）  
  
- 客户赔偿  
  
- 业务中断损失  
  
- 事件响应成本  
  
**品牌声誉**  
：  
- 客户信任度下降  
  
- 负面新闻传播  
  
- 市场份额流失  
  
**合规风险**  
：  
- 违反GDPR（欧盟通用数据保护条例）  
  
- 违反PCI DSS（支付卡行业数据安全标准）  
  
- 可能面临监管处罚和集体诉讼  
  
### 真实世界影响估算  
  
根据我们的评估模型：  
- **小型电商**  
（年收入  
  
1M）：潜在损失  
  
220K  
  
- **中型电商**  
（年收入  
  
10M）：潜在损失  
  
1.9M  
  
- **大型电商**  
（年收入>  
）：潜在损失  
1.9M-$18M+  
  
## 五、如何自查：你的系统是否受影响？  
### 方法一：检查版本号  
  
如果你正在使用EverShop，立即检查版本：  
```
cd /your-evershop-directorynpm list @evershop/evershop
```  
  
如果显示版本 < 2.1.1，则**受影响**  
。  
### 方法二：API响应测试  
  
在**测试环境**  
中执行以下测试（切勿在未授权系统上测试）：  
```
curl -X POST https://your-shop.com/api/forgotPassword \  -H "Content-Type: application/json" \  -d '{"email":"test@example.com"}' | jq .
```  
  
如果响应中包含token  
字段，则存在漏洞。  
### 方法三：日志分析  
  
检查最近的密码重置日志，寻找可疑模式：  
- 短时间内大量重置请求  
  
- 来自异常IP的请求  
  
- 重置后立即登录（未经邮件链接确认）  
  
## 六、修复指南：立即行动  
### 官方修复：升级到v2.1.1  
  
这是**最优先、最彻底的解决方案**  
。  
  
**升级步骤**  
：  
1. **备份数据**  
  
```
# 备份数据库pg_dump -U evershop evershop > evershop_backup_$(date +%Y%m%d).sql# 备份代码tar -czf evershop_backup.tar.gz /opt/evershop
```  
1. **升级版本**  
  
```
npm install @evershop/evershop@2.1.1# 或npm update @evershop/evershop
```  
1. **重启服务**  
  
```
pm2 restart evershop# 或systemctl restart evershop
```  
1. **验证修复**  
  
```
curl -X POST https://your-shop.com/api/forgotPassword \  -H "Content-Type: application/json" \  -d '{"email":"test@example.com"}' | jq .
```  
  
确认响应中**不包含**token  
字段。  
### 临时缓解措施（无法立即升级时）  
  
如果因业务原因无法立即升级，采取以下临时措施：  
  
**1. WAF规则过滤**  
  
在Nginx中配置：  
```
location /api/forgotPassword {    # 限制请求频率    limit_req zone=password_reset burst=5;    # 过滤响应中的token    body_filter_by_lua_block {        local body = ngx.arg[1]        if body then            body = string.gsub(body, '"token":"[^"]*",?', '')            ngx.arg[1] = body        end    }    proxy_pass http://backend;}
```  
  
**2. 添加CAPTCHA验证**  
  
在密码重置表单中集成Google reCAPTCHA或hCaptcha，提高攻击成本。  
  
**3. 实施速率限制**  
  
使用fail2ban或iptables限制单个IP的请求频率：  
```
# 每个IP每分钟最多5次请求iptables -A INPUT -p tcp --dport 3000 -m string \  --string "POST /api/forgotPassword" --algo bm \  -m hashlimit --hashlimit-above 5/min \  --hashlimit-mode srcip -j DROP
```  
  
**4. 增强监控**  
  
设置告警规则，检测异常行为：  
- 单个IP短时间内多次密码重置  
  
- 密码重置后立即登录  
  
- 非工作时间的大量重置请求  
  
## 七、深层启示：开发者应该学到什么  
### 1. 永不在API响应中返回敏感信息  
  
**反模式**  
（错误做法）：  
```
return response.json({  success: true,  token: resetToken,  // 危险！  userId: user.id     // 危险！});
```  
  
**正确做法**  
：  
```
return response.json({  success: true,  message: "If an account exists, an email has been sent"  // 不返回任何敏感信息});
```  
### 2. 实施响应数据白名单  
  
不要直接序列化内部对象，而是明确指定可返回的字段：  
```
// 错误：直接返回对象return response.json(internalObject);// 正确：白名单机制const safeResponse = {  success: internalObject.success,  message: internalObject.message};return response.json(safeResponse);
```  
### 3. 安全代码审查清单  
  
在代码审查时，必须检查：  
- [ ] API响应是否包含敏感信息（令牌、密钥、密码哈希）  
  
- [ ] 是否可能导致用户枚举  
  
- [ ] 错误消息是否泄露技术细节  
  
- [ ] 日志是否包含敏感数据  
  
### 4. 自动化安全测试  
  
将以下工具集成到CI/CD流程：  
- **SAST**  
（静态应用安全测试）：SonarQube、Semgrep  
  
- **DAST**  
（动态应用安全测试）：OWASP ZAP、Burp Suite  
  
- **依赖扫描**  
：npm audit、Snyk  
  
- **密钥扫描**  
：GitGuardian、TruffleHog  
  
### 5. 学习OWASP Top 10  
  
该漏洞关联OWASP Top 10 - 2021中的：  
- **A01 - Broken Access Control**  
（失效的访问控制）  
  
- **A04 - Insecure Design**  
（不安全设计）  
  
- **A07 - Identification and Authentication Failures**  
（身份识别和认证失败）  
  
所有开发者都应熟悉这些常见漏洞模式。  
## 八、供应链安全：不仅仅是EverShop的问题  
### 开源软件的安全挑战  
  
这次事件再次提醒我们，开源软件在带来便利的同时，也带来了供应链安全风险：  
1. **依赖项漏洞**  
：你的应用依赖的库可能存在漏洞  
  
1. **更新滞后**  
：很多团队不及时更新依赖  
  
1. **可见性差**  
：不清楚使用了哪些组件和版本  
  
### 建立供应链安全管理  
  
**1. 软件物料清单（SBOM）**  
  
使用工具生成SBOM，清楚列出所有依赖：  
```
npm sbom --package-lock-only > sbom.json
```  
  
**2. 持续监控**  
  
订阅安全公告：  
- GitHub Security Advisories  
  
- NPM Security Advisories  
  
- CVE数据库  
  
**3. 自动化更新**  
  
使用Dependabot或Renovate自动创建更新PR：  
```
# .github/dependabot.ymlversion: 2updates:  - package-ecosystem: npm    directory: "/"    schedule:      interval: daily    open-pull-requests-limit: 10
```  
  
**4. 补丁管理SLA**  
  
定义明确的修复时间要求：  
- **严重漏洞**  
：24小时内  
  
- **高危漏洞**  
：7天内  
  
- **中危漏洞**  
：30天内  
  
## 九、事件响应：如果已经被攻击怎么办  
### 确认是否被利用  
  
检查以下日志和指标：  
1. **密码重置日志**  
  
```
grep "forgotPassword" /var/log/evershop/access.log | \  awk '{print $1}' | sort | uniq -c | sort -rn
```  
1. **异常登录活动**  
  
- 来自陌生IP的登录  
  
- 非常规时间的登录  
  
- 地理位置异常  
  
1. **数据导出记录**  
  
- 大量数据下载  
  
- 批量导出操作  
  
### 应急响应步骤  
  
**第一阶段：遏制（立即执行）**  
1. 暂时禁用密码重置功能  
  
```
location /api/forgotPassword {    return 503 "Service temporarily unavailable";}
```  
1. 强制所有用户下次登录时修改密码  
  
1. 撤销所有活动会话  
  
1. 启用额外的身份验证（如2FA）  
  
**第二阶段：根除（24小时内）**  
1. 升级到修复版本  
  
1. 审查和强化所有认证相关代码  
  
1. 更换API密钥和JWT密钥  
  
**第三阶段：恢复（1-3天）**  
1. 逐步恢复服务  
  
1. 监控异常活动  
  
1. 验证修复有效性  
  
**第四阶段：总结（1周内）**  
1. 编写详细的事件报告  
  
1. 通知受影响用户（如适用）  
  
1. 向监管机构报告（如GDPR要求72小时内）  
  
1. 改进安全流程  
  
## 十、总结与行动建议  
### 核心要点回顾  
1. **CVE-2026-28213是一个严重漏洞**  
，CVSS 9.8分，影响所有EverShop < v2.1.1版本  
  
1. **攻击极其简单**  
，无需任何特殊技能或工具  
  
1. **影响范围广泛**  
，可导致完全的账户接管和数据泄露  
  
1. **官方已发布修复**  
，v2.1.1版本已解决此问题  
  
### 立即行动清单  
  
**如果你正在使用EverShop：**  
- [ ] 立即检查当前版本  
  
- [ ] 如果 < v2.1.1，紧急升级  
  
- [ ] 审查最近的密码重置日志  
  
- [ ] 实施额外的安全措施（2FA、监控）  
  
- [ ] 通知安全团队和管理层  
  
**如果你是开发者：**  
- [ ] 审查自己项目中的密码重置实现  
  
- [ ] 检查API响应是否泄露敏感信息  
  
- [ ] 加入安全代码审查流程  
  
- [ ] 集成自动化安全测试工具  
  
**如果你是安全从业者：**  
- [ ] 使用本文提供的检测规则扫描资产  
  
- [ ] 更新威胁情报库  
  
- [ ] 编写内部安全通告  
  
- [ ] 加强类似漏洞的监控  
  
### 更广泛的思考  
  
这次事件再次证明，**安全是一个持续的过程，而不是一次性的任务**  
。即使是设计良好的现代框架，也可能因为一个简单的实现错误而引入严重漏洞。  
  
我们需要：  
- 将安全融入开发生命周期的每个阶段  
  
- 持续学习和更新安全知识  
  
- 建立多层防御体系  
  
- 培养"安全第一"的文化  
  
**安全无小事，细节决定成败。**  
## 参考资料  
- EverShop官方安全公告：https://github.com/evershopcommerce/evershop/security/advisories/GHSA-cg73-g723-39jw  
  
- 修复版本发布：https://github.com/evershopcommerce/evershop/releases/tag/v2.1.1  
  
- CVE详情：CVE-2026-28213  
  
- CWE-200：https://cwe.mitre.org/data/definitions/200.html  
  
- CWE-640：https://cwe.mitre.org/data/definitions/640.html  
  
- OWASP Top 10 - 2021：https://owasp.org/Top10/  
  
**声明**  
：本文仅用于安全研究和防御目的。请勿在未授权系统上进行任何测试。对于任何滥用本文信息的行为，作者和发布方概不负责。  
  
**关注我们**  
，获取最新的网络安全资讯、漏洞预警和防护指南。  
  
如果这篇文章对你有帮助，欢迎分享给更多需要的人。网络安全，人人有责。  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
