---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "未知"
source: "https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-springframework-directory-traversal.yaml"
---

# 泛微OA ResourceServlet 目录遍历漏洞

## 漏洞描述

泛微 E-Cology 部署中的 `ResourceServlet` 资源入口存在公开记录的受限文件读取问题。公开请求把 `/WEB-INF/web.xml` 作为 `resource`，使通常不应由 Web 直接下载的应用配置内容暴露。

## 影响范围与前提

产品：泛微 E-Cology；精确受影响版本与补丁范围未知。该结论针对所示产品路径，不能外推为所有 Spring Framework 部署均受影响。读取范围取决于资源定位逻辑和进程权限。

## 公开验证资料

```http
GET /weaver/org.springframework.web.servlet.ResourceServlet?resource=/WEB-INF/web.xml HTTP/1.1
Host: oa.example.com
```

应确认响应包含实际 `web.xml` 内容及应用路由结构，例如 `<url-pattern>/weaver/`，并排除登录页、错误页或仅反射参数的响应。该示例证明的是应用配置读取，不证明本地文件包含执行或任意系统文件均可读。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology/ecology-springframework-directory-traversal.yaml)
- [公开资料 2](https://github.com/LittleBear4/OA-EXPTOOL/blob/e2beff80059570bf58292d052d97a497749d87ea/book/weaver/ecology-springframework-directory-traversal.yaml)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
