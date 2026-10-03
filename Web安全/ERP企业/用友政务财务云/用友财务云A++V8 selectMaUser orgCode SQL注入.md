---
schema_version: "1"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "source-claimed"
content_status: "needs-review"
source_status: "recorded"
id: "VW-20261003-CN02"
title: "用友财务云 A++V8 selectMaUser orgCode SQL 注入"
product: "用友财务云 A++V8 / 用友政务财务云 V8"
identifier_status: "unknown"
version: "官方公告列在售及提供服务器的 8.31、8.32、8.33；未列其他历史分支"
fixed_version: "官方提供 ma系列接口漏洞补丁，文件名日期 20260424；未标注统一修复版本号，须核对适用分支"
prerequisites: "可达 ma 系列接口；厂商确认相关接口未授权访问及参数校验/预编译缺失；此 PoC 依赖后端可调用 updatexml 且错误信息对请求方可见"
side_effects: "公开请求读取当前数据库名称并通过数据库错误返回，产生日志；未见业务写入或第三方回连；服务端其他行为未复现"
source: "用友安全中心厂商公告；PokerSec 原文线索及 ZONE.CI 镜像；eeeeeeeeee-code/POC 汇编"
source_url: "https://security.yonyou.com/#/patchInfo?identifier=309233a5451d4d349c3bc47937fd4f4e"
verification_source: "https://security.yonyou.com/web-api/web/notice/patch/get?identifier=309233a5451d4d349c3bc47937fd4f4e"
archive_url: "https://github.com/eeeeeeeeee-code/POC/blob/11c00cc5e129cb7d6ed8a99ef1fc108ae83719b8/wpoc/用友OA/用友政务系统selectMaUser存在SQL注入.md"
fofa: "(body=\"eyeclose.png\" && body=\"用友\") || body=\"/df/access/public/pf/portal\" || body=\"/pf/portal/login/css/foundation-datepicker.css\" || body=\"/df/portal/getYearRgcode.do\""
---

# 用友 A++V8 selectMaUser orgCode SQL 注入

> 待核：厂商已确认接口及影响版本并提供补丁；本库没有隔离复现或审核补丁代码。PokerSec 原文链接已定位，但本次原始微信页面不可读取，文章与图片通过标明作者的镜像核对。厂商修复版本号和各分支安装结果仍需确认。

## 范围与根因

用友安全中心的[官方公告](https://security.yonyou.com/#/patchInfo?identifier=309233a5451d4d349c3bc47937fd4f4e)明确列出 ma 系列中的 `selectMaUser` 等接口，说明相关接口缺少授权检查，且请求参数未作预编译及校验，造成敏感信息泄露与 SQL 注入风险。公告范围为用友政务财务云 V8 官方在售及提供服务器的 8.31、8.32、8.33。它同时讨论另一个废弃登录接口；本篇只分析 `selectMaUser`，不把其他端点的影响混入同一 PoC。

公开验证资料使用 POST `/ma/api/selectMaUser`、JSON 请求体和 `orgCode` 参数。载荷通过 `updatexml` 的错误路径把 `database()` 结果送入响应。成立条件不仅是接口可达，还包括数据库支持相应函数、动态 SQL 仍接受该参数以及错误回显没有被上层抑制。未出现回显不代表已经修复。

## 公开验证资料与观察

[固定汇编中的完整 HTTP 报文](https://github.com/eeeeeeeeee-code/POC/blob/11c00cc5e129cb7d6ed8a99ef1fc108ae83719b8/wpoc/用友OA/用友政务系统selectMaUser存在SQL注入.md)的 blob 为 `9bff364ade291d70fb60393606ba2d5058da7d2f`。其中请求体如下，保持公开原值：

```json
{"orgCode":"1' AND (updatexml(1,concat(0x7e,(select database()),0x7e),1)) AND '1'='1"}
```

汇编标注 `Content-Length: 88`。上述单行 UTF-8 请求体静态计数为 86 字节；尾随换行是否纳入传输会改变长度。PokerSec 镜像标注 86。本库没有修改任一来源报文，实际重放应由授权测试环境核对发送的字节长度，不能把不同长度的报文当成已核验的一致副本。

2026-10-03 查看了镜像引用的登录截图和请求/响应截图。后者显示 HTTP 200，但业务结果为 `flag: "fail"`；错误正文包含 `java.sql.SQLException: XPATH syntax error`，并可见数据库名 `ufgov_cwy_glj`。它还显示 `MaEmpMapper.xml`、`MaEmpDao.selectMaUserApi-Inline` 和拼入 `ORG_CODE` 条件的表达式。HTTP 200 本身并非成功判据，数据库错误里出现预期求值结果才是原作者使用的证据。

这些是公开截图中的观察，不是本库复现。截图没有完整展示补丁状态、安装包哈希或正常输入对照。原图已有遮盖，本库没有编辑图片或补写遮盖内容。

### 隔离验证边界与副作用

仅在另行授权的隔离环境中核对普通 `orgCode` 请求、公开 PoC 和安装相应补丁后的结果，同时检查应用与数据库日志。该 PoC 的目的包含读取数据库名称，不能笼统写作“无数据访问”。公开文本没有写文件、修改账号、上传或回连行为；数据库错误可能被记录到日志，其他服务端副作用未验证。不应把一次失败、通用 500 或连接超时当成无漏洞结论。

## 已发布修复与临时缓解

厂商提供“ma系列接口漏洞补丁”。公开接口返回的公告时间戳对应 2026-04-24T07:59:35Z，补丁文件名为 `ma系列接口漏洞补丁(20260424T110927).zip`。本库只读取公告元数据，没有下载或执行补丁。厂商建议增加授权、入参签名校验和相关参数预编译，并屏蔽废弃接口访问。

应通过[厂商补丁页](https://security.yonyou.com/#/patchInfo?identifier=309233a5451d4d349c3bc47937fd4f4e)核对分支、升级前备份、安装条件与回归结果；公告未给出可直接替代上述分支判断的统一修复版本号。限制 ma 接口对外开放、降低数据库账户权限和避免详细数据库错误外显属于临时防御，不能替代厂商补丁。

## 来源与历史

1. [用友安全中心公告](https://security.yonyou.com/#/patchInfo?identifier=309233a5451d4d349c3bc47937fd4f4e)及[同站公开只读公告数据](https://security.yonyou.com/web-api/web/notice/patch/get?identifier=309233a5451d4d349c3bc47937fd4f4e)：直接支持接口归属、影响版本与已提供补丁；2026-10-03 核对
2. [PokerSec 原文](https://mp.weixin.qq.com/s/bPDCLx_y_ecRahm1p5XKSw)：通过[公开信息流记录](https://github.com/chainreactors/picker/issues/1311)找到；当前未能直接读取。镜像署名与时间为 PokerSec、2026-07-22 18:07 北京
3. [ZONE.CI 署名镜像](https://security.zone.ci/secarticles/wx/560678.html)：读取 HTTP 示例并查看其引用截图；它是转载，不冒充一手厂商公告
4. [eeeeeeeeee-code/POC 固定汇编](https://github.com/eeeeeeeeee-code/POC/blob/11c00cc5e129cb7d6ed8a99ef1fc108ae83719b8/wpoc/用友OA/用友政务系统selectMaUser存在SQL注入.md)：公开请求与指纹。指纹仅供识别候选产品，不证明漏洞存在
