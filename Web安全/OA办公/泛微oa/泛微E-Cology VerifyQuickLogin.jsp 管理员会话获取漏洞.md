---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "未知"
source: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20VerifyQuickLogin.jsp%20%E4%BB%BB%E6%84%8F%E7%AE%A1%E7%90%86%E5%91%98%E7%99%BB%E5%BD%95%E6%BC%8F%E6%B4%9E.md"
---

# 泛微E-Cology VerifyQuickLogin.jsp 管理员会话获取漏洞

## 漏洞描述

公开资料记录泛微 E-Cology 的 `/mobile/plugin/VerifyQuickLogin.jsp` 可通过快速登录请求返回管理员会话信息。风险在于会话签发缺少充分的身份校验；影响应以实际取得的会话身份及权限为准。

## 影响范围与前提

产品：泛微 E-Cology；具体版本与补丁范围未知。公开请求不携带账号密码或 Cookie，但这不能替代对具体部署认证状态的验证。来源展示的是 `identifier=1`，没有证明将其替换成任意用户 ID 都有效。

## 公开验证资料

来源中的请求入口为 `/mobile/plugin/`，不是 `/login/`：

```http
POST /mobile/plugin/VerifyQuickLogin.jsp HTTP/1.1
Host: oa.example.com
Content-Type: application/x-www-form-urlencoded

identifier=1&language=1&ipaddress=x.x.x.x
```

`x.x.x.x` 是公开 PoC 使用的字面值。检测模板检查 JSON 中的 `sessionkey` 和 `message` 字段；字段存在或 HTTP 200 只构成线索。确认需要结合非空会话值、业务成功状态，以及隔离测试账号的实际会话身份，不能把错误信息中的字段名当作登录成功。完整请求和公开响应截图见来源。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20VerifyQuickLogin.jsp%20%E4%BB%BB%E6%84%8F%E7%AE%A1%E7%90%86%E5%91%98%E7%99%BB%E5%BD%95%E6%BC%8F%E6%B4%9E.md)
- [公开资料 2](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology-verifyquicklogin-auth-bypass.yaml)
- [公开资料 3](https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wc8.go)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
