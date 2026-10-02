---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "心医国际WebPacs系统存在SQL注入漏洞"
product: "心医国际WebPacs"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "版本修复认证均缺"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E5%BF%83%E5%8C%BB%E5%9B%BD%E9%99%85WebPacs%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/hg0bkutvaqknmatg"
id: "vw-c53120d6539b204059ebfc5b"
entity_id: "ve-c53120d6539b204059ebfc5b"
schema_version: "1"
---

# 心医国际WebPacs系统存在SQL注入漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：心医国际WebPacs
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：版本修复认证均缺
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 正文复制医技统计报表SQLi非WebPacs
2. POST全是正常空参数没有任何注入载荷/指定参数/结果
3. 不可当可复现PoC
4. 版本修复认证均缺
5. 去重复企业宣传，保留原出处

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/hg0bkutvaqknmatg>

### 归档技术正文

**<font style="color:rgb(38, 38, 38);">一、漏洞简介</font>**<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">心医国际是中国专业的医疗云应用解决方案提供商，铺建并运营全国领先的智能医疗云平台，依托十年的数据积累和业务实践，持续创新智能医疗场景应用。业务服务覆盖诊疗、教学、科研、管理等多维度，助力政府、医院及产业合作伙伴，打造线上线下高效协同的智慧医疗健康服务体系，目前已建成覆盖全国31个省，联结2万余家医疗机构的智能医疗云平台，助力建设并服务青海、河南、陕西、山西、贵州、新疆、江西、广西、甘肃9大省级远程医疗平台，服务通达80%全国三甲级医院;成功建设并服务全国300余个省、市、县及专科医联体。心心医国际医技统计报表系统存在SQL注入漏洞，攻击者可通过该漏洞获取系统敏感信息  
</font>**<font style="color:rgb(38, 38, 38);">二、影响版本</font>**<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">心医国际WebPacs系统</font><font style="color:rgb(38, 38, 38);">  
</font>**<font style="color:rgb(38, 38, 38);">三、漏洞复现</font>**

```plain
POST /WebPacs/webpacs/studylistgrid HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
Content-type: application/x-www-form-urlencoded; charset=UTF-8
Connection: close
Content-Length: 154

type=normal&jianchahao=&department=&filmstate=&truename=&devicetypename=&studystatus=&patienttype=&huanzhehao=&devicename=&datelength=7&page=1&pageSize=10
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/hg0bkutvaqknmatg>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
