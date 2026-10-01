---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "未知"
source: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Weaver%20SignatureDownLoad%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
---

# 泛微OA SignatureDownLoad 任意文件读取漏洞

## 漏洞描述

公开资料记录泛微 `weaver.file.SignatureDownLoad` 的文件读取问题：`markId` 中的 UNION 查询返回文件路径，接口再以下载方式返回该文件内容。该链路结合了 SQL 输入控制和文件路径使用。

## 影响范围与前提

公开资料对产品名称有 E-Weaver/E-Cology 两种标注，均定位到同一个 `weaver.file.SignatureDownLoad` 入口。精确受影响版本、数据库与修复范围未知；读取权限受服务端账号限制。

## 公开验证资料

公开文本验证请求使用 Windows 自带配置文件：

```http
GET /weaver/weaver.file.SignatureDownLoad?markId=0%20union%20select%20%27C:/Windows/win.ini%27 HTTP/1.1
Host: oa.example.com
```

确认时应核对响应是否为真实 INI 内容，而非仅命中 `MAPI` 或 `files`。此路径仅适用于对应 Windows 环境。来源还提供读取产品配置文件的完整请求；应以实际目标内容为依据，不能仅凭 `application/octet-stream` 或下载文件名判断。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Weaver%20SignatureDownLoad%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md)
- [公开资料 2](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-signaturedownload-lfi.yaml)
- [公开资料 3](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/E-Weaver%20SignatureDownLoad%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
