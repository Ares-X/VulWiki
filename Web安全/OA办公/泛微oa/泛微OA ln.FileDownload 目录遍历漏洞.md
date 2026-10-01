---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "未知"
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-filedownload-directory-traversal.yaml"
---

# 泛微OA ln.FileDownload 目录遍历漏洞

## 漏洞描述

泛微 E-Cology 的 `ln.FileDownload` 下载接口接收 `fpath`。公开模板通过相对路径读取 `WEB-INF/web.xml`，用于验证下载路径越界与应用配置泄露。

## 影响范围与前提

产品：泛微 E-Cology；具体受影响版本、补丁范围与认证条件未知。目标文件必须存在且可被服务进程读取；公开证据没有证明文件内容会被执行。

## 公开验证资料

```http
GET /weaver/ln.FileDownload?fpath=../ecology/WEB-INF/web.xml HTTP/1.1
Host: oa.example.com
```

确认应基于实际 `web.xml` 结构及其中的应用配置，例如 `<url-pattern>/weaver/`，而不是泛化的 `version` 字符串。排除错误页、登录页和参数反射后，才能认定目标文件内容已泄露。本条使用“目录遍历/文件读取”描述，不把它等同于文件包含执行。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-filedownload-directory-traversal.yaml)
- [公开资料 2](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology-filedownload-directory-traversal.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
