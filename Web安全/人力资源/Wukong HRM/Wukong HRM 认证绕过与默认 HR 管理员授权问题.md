---
schema_version: "1"
id: "VW-20261019-WUKONG"
title: "Wukong HRM 认证绕过与默认 HR 管理员授权问题"
product: "Wukong_HRM"
identifier_status: "active"
version: "CNA 标至提交186115e1a5a0b827ad9596ff8c2f3a876fb0cc55"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "active"
prerequisites: "认证绕过入口可达；独立授权问题需低权限员工会话及其他员工工资条 ID"
side_effects: "读取并输出敏感工资数据，可进行登录；无已确认发行修复"
source: "原作者公开请求/源码与项目或 CNA 记录"
source_url: "https://github.com/AnkesKasty/cve-request-poc/blob/a7b6d1423555812d8efa26c91c5d0683164b31e5/Wukong_HRM/poc_salary_slip_detail_read.py"
source_status: "recorded"
primary_identifiers: "CVE-2026-108707, CVE-2026-108708"
---

# Wukong_HRM 认证绕过与默认 HR 管理员授权问题

## 编号与版本
2026-10-19 核对 VulnCheck CNA：CVE-2026-108707 为 ParamAspect 认证绕过；CVE-2026-108708 为 EmployeeAspect / EmployeeUtil 缺少授权。记录将影响范围标到 Git 提交 186115e1a5a0b827ad9596ff8c2f3a876fb0cc55。本次固定源码核对该提交，不把 Git 哈希解释成数值版本，也不把“截至该提交”推成当前所有分支均受影响。未获得已发布修复版本的可信一手声明。

108707 的场景不提供 AUTH-TOKEN；108708 独立场景是已认证低权限员工。部署若有外部网关拦截匿名请求，不能因此推定对象授权问题已解决；也不能忽略网关并宣称所有部署都未认证可达。

## 固定调用链
ParamAspect 在处理令牌前即创建非空 UserInfo。缺少令牌时，不会进入 Redis 取用户分支，后续空值检查也不会拒绝这个新对象，随后继续控制器调用。EmployeeAspect 查询员工失败时建立空 EmployeeInfo，并统一设置 role.label=91；EmployeeUtil 的菜单数据范围使用 ALL，相关分支可返回全体员工或不施加限制。

具体可核对入口是 POST `/hrmSalarySlipRecord/querySlipDetail/{id}`。控制器将路径 id 交给 querySlipDetail；服务仅按 slipId 查询工资条选项，再整理父子项，没有把该工资条的员工归属与当前调用者绑定。这为“读取非本人工资条”的技术对应提供固定源码证据，不能只由文章标题推断。

## 公开参考程序与判读
CNA 指向 Yaqi Chao / AnkesKasty 的固定提交 a7b6d1423555812d8efa26c91c5d0683164b31e5。`poc_salary_slip_detail_read.py` 要求提供属于其他员工的工资条 ID，先匿名请求，再在提供令牌或登录信息时做认证对照，统计返回工资项；空列表不判确认。调用者身份和工资条归属仍依赖测试数据选择，程序并不能自行证明账户确为低权限或该 ID 属于别人。

已完整静态审阅该工资条脚本及其本地导入 common.py，二者只使用 Python 标准库；固定树未见 requirements、setup.py、pyproject、工作流或 gitmodules。请求去向由 base URL 与路径决定，支持可选登录及 Cookie/令牌，urllib 可跟随重定向；默认校验证书，但支持关闭。未见混淆执行、下载后运行或固定第三方外传地址。工资条分支不修改 HR 记录，却会把敏感工资数据输出到控制台/JSON，且可进行登录请求，不能把读取敏感信息当作无影响。其他同目录程序未逐个审阅，不对整个 PoC 合集作安全结论。本次未执行任何请求、安装或扫描。

## 修复与范围限制
建议修复方向为缺失/无效会话直接拒绝、按真实角色填充 EmployeeInfo、逐对象验证归属并恢复数据权限范围。这是代码审查建议，不是已发布补丁。没有证据将本记录推广至悟空 CRM 或其他同名项目，原微信中的此类延伸不作为本文结论。

## 来源
- CNA108707：https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/108xxx/CVE-2026-108707.json
- CNA108708：https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/108xxx/CVE-2026-108708.json
- ParamAspect：https://github.com/WuKongOpenSource/Wukong_HRM/blob/186115e1a5a0b827ad9596ff8c2f3a876fb0cc55/common/common-web/src/main/java/com/kakarote/core/config/ParamAspect.java
- EmployeeAspect：https://github.com/WuKongOpenSource/Wukong_HRM/blob/186115e1a5a0b827ad9596ff8c2f3a876fb0cc55/hrm/hrm-web/src/main/java/com/kakarote/hrm/common/EmployeeAspect.java
- EmployeeUtil：https://github.com/WuKongOpenSource/Wukong_HRM/blob/186115e1a5a0b827ad9596ff8c2f3a876fb0cc55/hrm/hrm-web/src/main/java/com/kakarote/hrm/utils/EmployeeUtil.java
- 工资条控制器：https://github.com/WuKongOpenSource/Wukong_HRM/blob/186115e1a5a0b827ad9596ff8c2f3a876fb0cc55/hrm/hrm-web/src/main/java/com/kakarote/hrm/controller/HrmSalarySlipRecordController.java
- 工资条服务：https://github.com/WuKongOpenSource/Wukong_HRM/blob/186115e1a5a0b827ad9596ff8c2f3a876fb0cc55/hrm/hrm-web/src/main/java/com/kakarote/hrm/service/impl/HrmSalarySlipRecordServiceImpl.java
- 固定参考程序：https://github.com/AnkesKasty/cve-request-poc/blob/a7b6d1423555812d8efa26c91c5d0683164b31e5/Wukong_HRM/poc_salary_slip_detail_read.py
- 共用模块：https://github.com/AnkesKasty/cve-request-poc/blob/a7b6d1423555812d8efa26c91c5d0683164b31e5/Wukong_HRM/common.py
- 线索：gelusus/wxvl 提交 59b51e8d9a3ffe28c04f535e457a178c89288f0d，2026-10-12《两行代码打穿 1591星 国产悟空HRM：未授权看遍全员工资条（CVE-2026-108707∕108708·附PoC）》；其 Rubby2001 链接未作为本稿原始代码来源，优先 CNA 指向的研究者固定源

本稿为原创中文综述；全文索引与正文未发现这两个编号、ParamAspect 或工资条入口的已有同实体文章。未转载许可不明的完整程序或微信全文。
