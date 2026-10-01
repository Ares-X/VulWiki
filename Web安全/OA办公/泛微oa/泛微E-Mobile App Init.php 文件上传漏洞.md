---
cve: ""
fofa: "app=\"泛微-EMobile\""
version: "未知"
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology_mobileAppinit.php%E5%AD%98%E5%9C%A8%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.yaml"
---

# 泛微E-Mobile App Init.php 文件上传漏洞

## 漏洞描述

公开模板记录 `/E-mobile/App/Init.php` 的邮件附件入口接收 `upload_file` 与 `file_name`，并通过带相对路径的文件名将内容保存至可访问目录。风险涉及附件内容与保存路径控制。

## 影响范围与前提

产品与组件：泛微 OA 的 E-Mobile 邮件模块；精确产品版本及修复范围未知。来源标题与产品描述存在 E-Cology/E-Mobile 混写，本文只保留可定位的模块入口。公开模板未带凭证；认证与文件写入权限需要按部署核对。

## 公开验证资料

完整两步请求见固定版本 YAML。第一步实际是 GET `/E-mobile/App/Init.php`（`Init` 首字母大写），包含 `m=createDo_Email`、Base64 编码的 `upload_file` 和 `file_name`；原稿中的 multipart POST 没有来源支持。

第二步读取源 PoC 写入的文件：

```http
GET /attachment/testa123.php HTTP/1.1
Host: oa.example.com
```

此片段单独执行不能验证上传。源 PoC 写入的 PHP 只计算 `md5(233)` 并尝试删除自身，预期输出为 `e165421110ba03099a1c0393373c5b43`；完整编码内容、提交参数和顺序均见来源。回读到本次预期计算结果才支持代码被处理的结论；仅上传响应或文件名不足以确认。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology_mobileAppinit.php%E5%AD%98%E5%9C%A8%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
