---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "未知"
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-sptmforportalthumbnail-lfi.yaml"
---

# 泛微OA SptmForPortalThumbnail.jsp 任意文件下载漏洞

## 漏洞描述

泛微 E-Cology 的门户缩略图页面接收 `preview` 参数。公开资料说明该值被用于 Web 根目录下的文件下载，并展示将 JSP 源文件自身作为参数后返回源码的行为，可造成应用源码泄露。

## 影响范围与前提

产品：泛微 E-Cology；具体受影响版本、补丁范围和认证条件未知。公开请求验证 Web 应用目录内文件读取，不足以证明整个服务器任意路径可读。

## 公开验证资料

```http
GET /portal/SptmForPortalThumbnail.jsp?preview=portal/SptmForPortalThumbnail.jsp HTTP/1.1
Host: oa.example.com
```

有效结果应为 JSP 源码内容，包含相互一致的 Java 导入、程序逻辑或 `getServletConfig` 等源码结构。公开模板还检查 `weaver.general.BaseBean` 与 `image/png`；图片响应头、HTTP 200 或单个源码词语不能独立证明源文件下载。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-sptmforportalthumbnail-lfi.yaml)
- [公开资料 2](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology_SptmForPortalThumbnail-download.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
