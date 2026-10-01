---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-ksoa-paybill-sqi.yaml"
version: "具体受影响版本范围未披露"
fofa: "app=\"用友-时空KSOA\""
---

# 用友 时空KSOA PayBill SQL注入漏洞

## 漏洞描述

用友时空 KSOA 的 `/servlet/PayBill` 接口存在 SQL 注入风险。公开 afrog 模板把延时表达式放在 XML 的第二个 `name` 元素中，第四个元素用于响应标记校验。SQL 注入可能影响数据库信息的保密性与完整性；公开检测请求本身不证明系统命令执行权限。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

```http
POST /servlet/PayBill?caculate&_rnd= HTTP/1.1
Host: example.invalid
Content-Type: application/xml

<?xml version="1.0" encoding="UTF-8" ?><root><name>1</name><name>1'WAITFOR DELAY'0:0:5';--+</name><name>1</name><name>600123</name></root>
```

上例对应原始模板 r1，将随机响应标记固定为 `600123` 便于阅读。r0 使用普通值建立基线；r1、r2 分别使用 5 秒、3 秒延时并检查相同标记。模板标注 `verified: false`，且 r3 使用了未定义的 `randstr`，不能把整份模板当作已验证可运行结果。公开模板中的延时条件属于检测线索。验证时需记录正常请求基线并重复对照，确认延时随注入值变化；单次慢响应、超时或 200 状态码均不足以确认 SQL 注入。本条目未进行本地复现。

## 修复建议

向用友获取适用于当前版本的安全更新。修复时在对应数据库查询处使用参数化语句，并以最小权限数据库账户运行；修复后复核同一参数的正常请求与异常输入。

## 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-ksoa-paybill-sqi.yaml)

## 网络测绘

```text
app="用友-时空KSOA"
```
