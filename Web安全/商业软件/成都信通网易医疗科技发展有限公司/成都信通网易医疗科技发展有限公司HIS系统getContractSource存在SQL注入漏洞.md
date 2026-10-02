---
source: "wy876 漏洞文库"
title: "成都信通网易HIS nzzManager getContractSource SQL注入声称"
product: "成都信通网易HIS"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知；SOAP服务部署条件"
prerequisites: "带JSESSIONID，身份未述"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ia05az6it1imevtb"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%88%90%E9%83%BD%E4%BF%A1%E9%80%9A%E7%BD%91%E6%98%93%E5%8C%BB%E7%96%97%E7%A7%91%E6%8A%80%E5%8F%91%E5%B1%95%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/%E6%88%90%E9%83%BD%E4%BF%A1%E9%80%9A%E7%BD%91%E6%98%93%E5%8C%BB%E7%96%97%E7%A7%91%E6%8A%80%E5%8F%91%E5%B1%95%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8HIS%E7%B3%BB%E7%BB%9FgetContractSource%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-3601211f8cc72e1442f4226f"
entity_id: "ve-3601211f8cc72e1442f4226f"
schema_version: "1"
---

# 成都信通网易HIS nzzManager getContractSource SQL注入声称

## 条目说明

- 对象与具体问题：成都信通网易HIS；nzzManager getContractSource SQL注入声称
- 版本、配置及部署条件：版本未知；SOAP服务部署条件
- 认证与权限前提：带JSESSIONID，身份未述
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 仅WSDL发现和arg0普通占位gero et请求，无SQLpayload/返回，不能证明SQLi
- getContractSource为SOAP方法而非参数，arg0才是输入，需纠正术语
- 外部wsdler.jar无版本/来源校验，不下载运行；空特征节
- HIS产品版本及接口用途缺失，医疗行业高敏数据证据应脱敏最小化

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

## 一、漏洞简介
成都信通网易医疗科技发展有限公司总部位于四川成都高新区天府软件园，在国内医疗软件行业中率先采用Java技术，融入国际国内标准，整体设计，持续研发，先后形成了“智慧云医院信息平台”、“医共体信息平台”、“互联网医院平台”、“医养融合信息平台”等新一代一系列自主知识产权产品，全面覆盖了单体医院业务、区域医疗、医共体、“互联网+健康”等信息化建设领域。成都信通网易医疗科技发展有限公司HIS系统getContractSource存在SQL注入漏洞，攻击者可通过该漏洞获取数据库敏感信息。

## 二、影响版本
    - 成都信通网易医疗科技发展有限公司HIS系统（基于电子病历的医院信息化平台）

## 三、特征


## 四、漏洞复现
    1. 漏洞位置

在下列`nzzManager`接口下的`getContractSource`参数

```plain
/xtHisService/services
```


    2. 使用burp抓包，使用wsdl插件解析

```plain
/xtHisService/services/nzzManager?wsdl
```

[wsdler.jar](https://www.yuque.com/attachments/yuque/0/2024/jar/1622799/1709222128209-b940588a-42dd-4499-95bf-a6da305a86b9.jar)


    3. 数据包

```http
POST /xtHisService/services/nzzManager HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/118.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=0******************************E
Upgrade-Insecure-Requests: 1
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: xx.xx.xx.xx

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:imp="http://imp.nzz.ws.manager.cdxt.com/">
   <soapenv:Header/>
   <soapenv:Body>
      <imp:getContractSource>
         <!--type: string-->
         <arg0>gero et</arg0>
      </imp:getContractSource>
   </soapenv:Body>
</soapenv:Envelope>
```

> 请求长度说明：原资料 Content-Length 为 322；静态长度已移除，应由客户端根据最终请求体的字节数生成。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ia05az6it1imevtb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
