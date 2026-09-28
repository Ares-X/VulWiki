---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 大华智能物联综合管理平台(ICC)存在逻辑漏洞

# 一、漏洞简介
浙江大华技术股份有限公司，是全球领先的以视频为核心的智慧物联解决方案提供商和运营服务商，大华智能物联综合管理平台(ICC)存在逻辑漏洞，可登陆应用后台。

# 二、影响版本
+ 大华智能物联综合管理平台(ICC)

# 三、资产测绘
+ hunter`web.body="*客户端会小于800*"`
+ 特征


# 四、漏洞复现
api信息泄露

```java
/api
```


任意密码登陆

<font style="color:rgb(51,51,51);">直接输入账户</font>`<font style="color:rgb(51,51,51);">justForTest</font>`<font style="color:rgb(51,51,51);">，密码任意输入,直接进入后台。界面如下</font>


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/gos4ilum1dcbrzp3>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
