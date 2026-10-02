---
cve: "CVE-2024-22243"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Spring Framework UriComponentsBuilder"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2024-22243"
referenced_identifiers: "CVE-2024-22257"
identifier_role: "primary"
identifier_status: "unknown"
title: "Spring Framework URL解析不当漏洞以及绕过"
prerequisites: "来源所述条件，未列明部分仍待核：首轮6.1.4/6.0.17/5.3.32，第二轮6.1.5/6.0.18/5.3.33；libspring-java所有版本无依据"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-305cfb1706be5c91a2c37061"
entity_id: "ve-305cfb1706be5c91a2c37061"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：首轮6.1.4/6.0.17/5.3.32，第二轮6.1.5/6.0.18/5.3.33；libspring-java所有版本无依据

代码与实验材料：POM+Controller全粘一段，原始\[URL样例有但第二绕过载荷与所有截图均缺；代码被HTML混排

来源证据范围：原创署名但无官方公告/补丁直链

- **事实待核（1）**：绕过编号和第二PoC缺证据；依据：开头叫22257，后只说22243绕过；声称下面方式绕过却没有载荷内容，须核官方编号。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

- **实验改动边界（2）**：全文排版破坏技术结构；依据：标题、版本、XML、Java和结果说明合成单段，源码注释与后文边界不清。以下步骤按原实验条件保留；人工改动后的行为只支持该修改环境，不用于证明未修改发行版默认可利用。

- **结论使用边界（3）**：URL host不是HTTP Host头；依据：代码校验UriComponents.getHost却称host头白名单，需说明与后续redirect消费器解析差异。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Spring Framework URL解析不当漏洞以及绕过   
原创 信安路漫漫  信安路漫漫   2024-03-21 07:02  
  
**前言**  
  
前面出了Spring Framework URL解析不当的一个漏洞CVE-2024-22243，修复以后又出现了一个绕过的漏洞CVE-2024-22257，下面就一起来看看这两个漏洞。  
CVE-2024-22243漏洞描述Spring Framework 是一个开源的Java应用程序框架，UriComponentsBuilder是Spring Web中用于构建和操作URI的工具类。受影响版本中，由于 UriComponentsBuilder 处理URL时未正确过滤用户信息中的方括号 `[` ，攻击者可构造包含方括号的恶意URL绕过主机名验证。如果应用程序依赖UriComponentsBuilder.fromUriString()等方法对URL进行解析和校验，则可能导致验证绕过，出现开放重定向或SSRF漏洞。影响范围org.springframework:spring-web@[6.1.0, 6.1.4)org.springframework:spring-web@[6.0.0, 6.0.17)org.springframework:spring-web@(-∞, 5.3.32)libspring-java@影响所有版本POChttp://www.xxx.com[@www.evil.com漏洞复现pom文件<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <groupId>org.springframework.boot</groupId>        <artifactId>spring-boot-starter-parent</artifactId>        <version>2.7.18</version>        <relativePath/> <!-- lookup parent from repository -->    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>spring-uricomponentsbuilder</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <!-- https://mvnrepository.com/artifact/org.springframework/spring-web -->        <dependency>            <groupId>org.springframework</groupId>            <artifactId>spring-web</artifactId>            <version>5.3.31</version>        </dependency>    </dependencies></project>OauthController.javaimport org.springframework.stereotype.Controller;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RequestMapping;import org.springframework.web.bind.annotation.RequestParam;import org.springframework.web.util.UriComponents;import org.springframework.web.util.UriComponentsBuilder;import javax.servlet.http.HttpServletResponse;import java.io.IOException;import java.util.Arrays;import java.util.HashSet;import java.util.Set;@Controller@RequestMapping("/oauth")public class OAuthController {    private static final Set<String> whiteDomains = new HashSet<>(Arrays.asList(new String[]{            ".fuckpdd.com"    }));    /**     * 一般绕过oauth的host校验，可以开放重定向到恶意站点劫持code     * 访问：http://127.0.0.1:8080/oauth?redirect_uri=http%3A%2F%2Fwww.fuckpdd.com%5B%40www.evil.com%2Ftou     *     *     * @param redirectUri http://www.fuckpdd.com[@www.evil.com/tou     * @return     */    @GetMapping    public String oauth(@RequestParam(name = "redirect_uri") String redirectUri, HttpServletResponse response) throws IOException {        UriComponents uriComponents = UriComponentsBuilder.fromUriString(redirectUri).build();        String schema = uriComponents.getScheme();        String host = uriComponents.getHost();        String path = uriComponents.getPath();        System.out.printf("schema:%s\n", schema);        System.out.printf("host:%s\n", host);        System.out.printf("path:%s\n", path);        boolean pass = false;        for (String whiteDomain : whiteDomains) {            if (host.endsWith(whiteDomain)) {                pass = true;                break;            }        }        if (!pass) return "error";        return "redirect:" + redirectUri;    }}从上面的代码中可以看到对host头设置了白名单，如果不在白名单内则返回error。在白名单内则跳转到redirectUri。不在白名单内时：在白名单内时：利用漏洞：可以看到利用[可以成功绕过这个限制。在新的版本修复了上面的漏洞，但是没有修复彻底，还可以绕过，下面就一起来看看绕过。Spring Web UriComponentsBuilder URL解析不当漏洞(CVE-2024-22243绕过)Spring Framework 是一个开源的Java应用程序框架，UriComponentsBuilder是Spring Web中用于构建和操作URI的工具类。由于对CVE-2024-22243的修复不充分，攻击者可构造一下两类 url 绕过主机名验证，导致开放重定向或SSRF漏洞：1、包含以 http 开头的 scheme 但不包含 host；2、url 中的 host 以 `[` 开头但不以 `]` 结尾。影响范围org.springframework:spring-web@[6.1.0, 6.1.5)org.springframework:spring-web@[6.0.0, 6.0.18)org.springframework:spring-web@(-∞, 5.3.33)复现新版本中改成了5.3.32此时，用上面的poc运行，发现报错可以通过下面的方式绕过修复方案将 org.springframework:spring-web 升级至 6.1.5 及以上版本将 org.springframework:spring-web 升级至 6.0.18 及以上版本将 org.springframework:spring-web 升级至 5.3.33 及以上版本  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
