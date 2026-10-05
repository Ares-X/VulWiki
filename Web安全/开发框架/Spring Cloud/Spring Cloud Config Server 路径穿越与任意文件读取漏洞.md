---
source: "白阁文库 BaizeSec/bylibrary"
product: "Spring Cloud Config Server/资源路径"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2019-3799"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Spring Cloud Config Server 路径穿越与任意文件读取漏洞"
prerequisites: "来源所述条件，未列明部分仍待核：无影响/修复分支，quick-start main不锁环境"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-0c823def0b3d9975cf5b0db8"
entity_id: "ve-0c823def0b3d9975cf5b0db8"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：无影响/修复分支，quick-start main不锁环境

代码与实验材料：ResourceController→resourceRepository→URL读取及补丁代码，双编码路径明确；所有图片是空文字普通链接不渲染

来源证据范围：Pivotal公告、Spring文档、固定修复3632fc6f较强

- **适用与权限边界（1）**：版本及资源可达权限缺失；依据：没有分支范围，未交代ConfigServer认证和后端仓库类型。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **代码与转录边界（2）**：图片语法损坏；依据：全部\[\](imageURL)缺!且标签空，读者看不到分析图。相应原代码作为存在此问题的历史样本保留，不能直接当作可运行、成功复现的 PoC；缺失内容需回原稿核对，不据此补造可执行攻击链。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# 漏洞公告

https://pivotal.io/security/cve-2019-3799

![](../../.resource/remote/0b8f3100e5933134b01500bb4b08eb89fbd3ec71bad7985914a9d0b090c73fe7.png)

# 漏洞复现

环境搭建： https://github.com/spring-cloud/spring-cloud-config#quick-start

```
GET /foo/default/master/..%252F..%252F..%252F..%252Fetc%252fpasswd HTTP/1.1
Host: localhost:8888
```

![](../../.resource/remote/02e92d7f04c2310753cd7f8f2eadf29a47d82462e6ee33dd6127bf6646711951.gif)

# 漏洞分析

Spring Cloud Config是Spirng Cloud下用于分布式配置管理的组件，分为`Config-Server`和`Config-Client`两个角色。 `Config-Server`负责集中存储/管理配置文件，`Config-Client`则可以从`Config-Server`提供的HTTP接口获取配置文件使用。2019年4月16日，Pivotal官方发布安全通告，Spring Cloud Config Server 部分版本存在目录遍历漏洞，据此可以获取Server端服务器文件。

根据[官方文档](https://cloud.spring.io/spring-cloud-static/spring-cloud.html#_serving_plain_text)，可以通过如下请求`GET /{name}/{profile}/{label}/{path}` 来获取配置文件，`name`，`profile`和`label`的含义与常规环境下的endpoint相同，而`path`是指文件名。以官方示例为环境，我们请求 https://github.com/spring-cloud-samples/config-repo/blob/master/test.json 这个文件并以文本形式返回 ，则我们需要向`Spring Cloud Config Server`发出如下请求：

```
GET http://127.0.0.1:8888/foo/label/master/test.json
```

![](../../.resource/remote/10db5d626e59e0c606fd9c802362f5dd99ba281b4c738b85d9491803766e9900.png)

根据请求格式可以在 `org/springframework/cloud/config/server/resource/ResourceController.java:54` 中找到对应的处理 `@RequestMapping("/{name}/{profile}/{label}/**")`：

![](../../.resource/remote/ee7f96d365182c587549fb108bf2aece662491b19756d2c1f97a915b7c49c6b6.png)

其中`path`值即为payload:`..%2F..%2F..%2F..%2Fetc%2fpasswd`

跟入`retrieve` 在`org/springframework/cloud/config/server/resource/ResourceController.java:104` ：

```
synchronized String retrieve(ServletWebRequest request, String name, String profile,
            String label, String path, boolean resolvePlaceholders) throws IOException {
        name = resolveName(name);
        label = resolveLabel(label);
        Resource resource = this.resourceRepository.findOne(name, profile, label, path);
        ...
    }
```

这里会根据前面所传条件获取到resource。文档中提到`only the first one to match is returned`，所以继续跟入`findOne`:

![](../../.resource/remote/5d8ce30f908137083da9c8892474f0a7ef24424ad41a2ba47c07b5d97f78497c.png)

可以看到这里`locations`的值为`file:/tmp/config-repo-7168113927339570935/`，这是`Config-Server`从后端拉取到配置文件时临时存放，正常情况下将会在该文件夹下进行文件的查找，比如`test.json`：

![](../../.resource/remote/e8da1b713fac0c61a91f6d58ce1b0eef144452313154f1f43cd2dd5d7a88f59b.png)

不过我们传入的却是`..%2F..%2F..%2F..%2Fetc%2fpasswd`，最终拼接出来的文件url即为：

![](../../.resource/remote/2e4e0b1ad06206c0ab9fa3791aa76b22188545122392dce6c4edd0dfe366e095.png)

返回后获取到的`resource`即为`/etc/passwd`，调用`StreamUtils.copyToString(is, Charset.forName("UTF-8")`读取到文件内容：

![](../../.resource/remote/6fcd120568b76d01c621cec4f5e233ff6f3fc44e7eb57aa74072d9e4a74c91cb.png)

# 漏洞补丁

https://github.com/spring-cloud/spring-cloud-config/commit/3632fc6f64e567286c42c5a2f1b8142bfde505c2

主要在获取到local后进行了判断：

```
if (!isInvalidPath(local) && !isInvalidEncodedPath(local)) {
    Resource file = this.resourceLoader.getResource(location)
            .createRelative(local);
    if (file.exists() && file.isReadable()) {
        return file;
    }
}
```

`isInvalidPath`用于检测其中是否含有`:/`、`..`、`WEB-INF`等关键字样，`isInvalidEncodedPath`中在进行编解码后仍是调用`isInvalidPath`进行检测。




---

> 来源：白阁文库 BaizeSec/bylibrary
