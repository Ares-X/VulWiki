---
source: "gelusus/wxvl 公众号漏洞文库"
---

#  漏洞赏金实战：AFL++ 挖掘 GNOME libsoup 高危漏洞技术解析   
sigabrt9  securitainment   2025-02-08 05:37  
  
> 【翻译】Using AFL++ on bug bounty programs an example with Gnome libsoup - Almond Offensive Security Blog  
  
  
**内容概要**  
：通过 AFL++、afl-cov 及基础定制化测试套件的综合运用，在公共漏洞赏金计划中发现 libsoup 库安全漏洞的实战案例分析。  
  
**2024-12-05 更新**  
：该漏洞已被分配   
CVE-2024-52531  
。尽管 CVE   
描述  
声明此漏洞无法通过网络触发，但实际验证表明存在可行性（详见下文分析）。  
## 技术背景  
  
开源软件的漏洞赏金计划为安全研究人员提供了高度定制化的测试环境，这种灵活性往往能以较小的时间成本发现具有研究价值的安全漏洞。  
  
在此类项目中，笔者的常规做法是优先编写基础测试套件并运行现有测试框架。这种方法不仅有助于快速掌握项目配置要领，熟悉代码结构，有时还能凭借经验捕获易被忽视的基础性漏洞。  
  
本文将以 YesWeHack 平台托管的   
GNOME 漏洞赏金计划  
为研究对象，重点剖析 libsoup 库的安全测试过程。  
  
libsoup  
作为 GNOME 平台集成 glib 库的 HTTP 客户端/服务端实现库，因其明确的用户输入接口特征，成为本次测试的首选目标。  
  
为便于复现研究，本文采用的代码提交版本为  
3c54033634ae537b52582900a7ba432c52ae8174  
。  
## 环境构建  
  
在开源项目中配置符合模糊测试工具链要求的编译环境往往面临诸多挑战。针对 AFL 工具链的特性，推荐采用 Docker 容器化方案，这能有效规避反复调试过程中可能产生的系统级依赖冲突问题。  
  
AFL++ 官方仓库提供的基准   
Dockerfile  
 集成了必要的组件依赖，可作为构建 libsoup 插桩编译环境的理想起点。虽然存在更优化的 libsoup-AFL 集成方案，但以下快速构建方案已能满足基础测试需求：  
```
FROM aflplusplus/aflplusplus

RUNaptupdate&&aptinstall-ylibnghttp2-devlibsqlite3-devlibpsl-devglib-networkingtmux

WORKDIR/fuzzing/

##Getting libsoup, compile it with afl-clang-fast and asan
RUNgitclonehttps://gitlab.gnome.org/GNOME/libsoup.gitlibsoup
ENVCC=/AFLplusplus/afl-clang-fast
ENVCXX=/AFLplusplus/afl-clang-fast++
ENVCFLAGS='-fsanitize=address'
ENVCXXFLAGS='-fsanitize=address'
WORKDIRlibsoup
RUNmesonsetup_build--prefix/fuzzing/build_libsoup&&mesoninstall-C_build

WORKDIR/fuzzing/

```  
  
libsoup 维护团队已在项目   
fuzzing 目录  
中提供了四组不同的测试套件用于 API 函数模糊测试。建议优先使用项目方提供的测试套件，通过观察其触发的函数范围评估是否能够实现更广泛的代码覆盖率。不过在本案例中，为实践自定义测试套件开发，笔者选择自主编写测试方案。  
  
通常而言，名称包含"parse"（解析）或"decode"（解码）字样的函数往往具有较高测试价值。本次测试中，soup_headers_parse_request  
与soup_headers_parse_response  
两个函数成为理想目标：正如其名称所示，这两个函数负责处理网络数据（即潜在不可信输入源）。此外，二者均接受const char *str  
和int len  
作为参数，这种接口特性使其能够便捷地创建 libfuzzer 风格测试套件——该参数结构与 AFL++ 的  
持久化模糊测试模式  
完全兼容，可有效避免每次测试执行时程序重启带来的性能损耗。  
  
以下是首个基础测试套件示例：  
```
#include <libsoup/soup.h>

intLLVMFuzzerTestOneInput (const unsigned char *data,l size_t size){
    SoupMessageHeaders  *req_headers;
    guint ret;
    req_headers = soup_message_headers_new (SOUP_MESSAGE_HEADERS_REQUEST);
    ret = soup_headers_parse_request((const char* )data,size,req_headers,NULL,NULL,NULL);
    soup_message_headers_unref (req_headers);
    return 0;
}

```  
  
引入包含已知 HTTP 头的小型字典也能有效提升测试效率。在  
libsoup 源码库  
中，soup-headers-names.c  
 文件完整记录了所有支持的 HTTP 头信息。对于语料库构建，header-parsing-test.c  
 文件包含多个值得纳入模糊测试的典型案例。通常而言，项目中的测试文件总能为我们提供测试套件设计思路和语料样本参考。  
  
尽管当前测试套件尚未发现具有研究价值的漏洞，但通过代码覆盖率分析仍可评估其有效性。  
AFL 状态屏  
提供的统计数据虽可用于不同测试套件和模糊器的横向对比，但在具体函数级测试验证方面存在局限——我们无法准确判断是否覆盖了特定函数或完整测试了函数内部所有代码路径。此时，  
afl-cov  
 工具（及同类代码覆盖率分析工具）能精确展示模糊测试触发的代码范围，这对我们的测试评估具有更直接的指导意义。  
  
基于此，测试策略变得清晰：通过持续增加测试套件数量来扩大代码覆盖率。例如，在现有测试套件基础上，可扩展集成 soup_message_headers_get_content_type  
 函数：  
```
#include <libsoup/soup.h>

intLLVMFuzzerTestOneInput (const unsigned char *data, size_t size){
    SoupMessageHeaders  *req_headers;
    guint ret;
    req_headers = soup_message_headers_new(SOUP_MESSAGE_HEADERS_REQUEST);
    ret = soup_headers_parse_request((const char* )data,size,req_headers,NULL,NULL,NULL);
    if (ret == SOUP_STATUS_OK){
        soup_message_headers_get_content_type(req_headers, NULL);
    }
    soup_message_headers_unref (req_headers);
    return 0;
}

```  
  
在 Dockerfile 中添加以下指令将执行以下操作：再次克隆 libsoup 代码库，并使用 gcc 及 --coverage  
 编译选项进行编译：  
```
## Getting libsoup, compile it with coverage
RUNgitclonehttps://gitlab.gnome.org/GNOME/libsoup.gitlibsoup-cov
ENVCC=gcc
ENVCXX=g++
ENVCFLAGS=--coverage
ENVCXXFLAGS=--coverage
WORKDIRlibsoup-cov
RUNmesonsetup--prefix/fuzzing/build_libsoup_gcov_build&&mesoninstall-C_build  

```  
  
为确保与 GCC 编译器兼容，需对测试套件进行相应调整，例如：  
```
#include <libsoup/soup.h>
#include <stdio.h>
#include <libsoup/soup.h>

int libfuzzer_harness (const unsigned char *data, size_t size){
    SoupMessageHeaders  *req_headers;
    guint ret;
    req_headers = soup_message_headers_new (SOUP_MESSAGE_HEADERS_REQUEST);
    ret = soup_headers_parse_request((constchar* )data,size,req_headers,NULL,NULL,NULL);
    if (ret == SOUP_STATUS_OK){
        soup_message_headers_get_content_type(req_headers, NULL);
    }
    return0;
}

int main(int argc, char *argv[]){
    size_t size;
    int ret;
    unsignedchar* data;
    FILE *file = fopen(argv[1], "r" );
    if ( file == 0 ){
            return-1;
    }
    fseek(file, 0, SEEK_END);
    size = ftell(file);
    fseek(file, 0, SEEK_SET);

    data = malloc(size);
    if (data == NULL){
        return-1;
    }
    fread(data,1,size,file);
    ret = libfuzzer_harness(data,size);
    free(data);
    fclose(file);
    return0;
}

```  
  
使用 afl-cov 可以生成汇总模糊测试覆盖率的 HTML 文件。虽然也可以直接使用 lcov 配合 clang 调用 libfuzzer 测试框架，但我更青睐 afl-cov 的 --live  
 实时监控功能。  
  
以下截图展示了调用函数 soup_headers_parse_request  
 的测试框架覆盖率结果：红色高亮表示模糊测试未执行的代码行，蓝色则表示已执行部分。需要注意的是，afl-cov 仅使用产生新覆盖率的输入来生成此报告，因此左侧显示代码行执行次数的数值并不完全准确，未产生新覆盖率的输入数据均未被计入统计。![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCPO5xxR2AqAIwHdynyd6hjKPPXMquDLH9K0UX7LjrsJwic4AKlicJrPXibHB3PUhqfiae6Mz7ESkIbaaw/640?wx_fmt=png&from=appmsg "")  
  
  
  
gcov1  
  
## 崩溃分析  
  
通过覆盖率报告可见，源代码中的实际函数 parse_content_foo  
 虽被触发，但部分代码行未被模糊测试执行：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCPO5xxR2AqAIwHdynyd6hjKgsDQsDIIPj0849W88spzcrvcibQlIiaWz2TvV4wr4OhCpvUTclE97ulw/640?wx_fmt=png&from=appmsg "")  
  
gcov  
  
该函数在调用时似乎始终以 *params = NULL  
 为参数并提前返回。通过在 soup_message_headers_get_content_type  
 函数中改用 GHashTable  
 替代 NULL  
 参数，可以有效提升代码覆盖率。通过分析 soup_message_headers_get_content_type  
 函数的覆盖率数据，可以明显看出模糊测试存在未覆盖的代码路径：  
```
#include <libsoup/soup.h>

intLLVMFuzzerTestOneInput (const unsigned char *data, size_t size){
    SoupMessageHeaders  *req_headers;
    guint ret;
    GHashTable *params;
    req_headers = soup_message_headers_new(SOUP_MESSAGE_HEADERS_REQUEST);
    ret = soup_headers_parse_request((constchar* )data,size,req_headers,NULL,NULL,NULL);
    if (ret == SOUP_STATUS_OK){
        soup_message_headers_get_content_type(req_headers, &params);

    }
    soup_message_headers_unref (req_headers);
    return0;
}

```  
  
数秒后，一个有趣的崩溃案例浮现：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCPO5xxR2AqAIwHdynyd6hjKoMja1HMHXJr1XDCsDHMGKJc2Nz3bOcbkv2899ehDNMklicq2IKkk4sg/640?wx_fmt=png&from=appmsg "")  
  
afl  
  
可通过 AFL-clang 编译的测试框架直接复现该崩溃：  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCPO5xxR2AqAIwHdynyd6hjKcg01edW1U5dHpbjicjK0jn2vUyydR8icvjb5P9UtAwfia3XvhPFPk9VYg/640?wx_fmt=png&from=appmsg "")  
  
asan  
  
堆内存越界写入是极具威力的攻击原语，在多数场景下可导致远程代码执行。但考虑到漏洞赏金计划的范围限定在库本身，通常无需在实际应用场景中复现并利用该漏洞即可推动修复，具体是否值得投入额外时间需根据实际目标权衡。  
  
在漏洞报告中提供 Dockerfile 将有助于漏洞分拣人员快速搭建复现环境。基于现有 Dockerfile 进行改造即可轻松实现。  
  
本文未深入分析根本原因，仅通过修改 afl-cov 专用代码（未启用 --coverage  
 标志）演示了如何利用该漏洞覆写下一内存块的尺寸参数。完整的漏洞利用链将高度依赖使用 libsoup 库的具体二进制文件实现。  
  
最后需验证该漏洞能否通过网络触发。我们可修改官方提供的   
simple-httpd.c  
 示例程序，通过添加对 soup_message_headers_get_content_type  
 函数（或其他可调用 decode_rfc5987  
 的函数）的调用来验证。选择 soup_message_headers_get_content_type  
 较为理想，因为获取请求/响应的内容类型是常见应用场景。如前所述，本文未深入探究具体哪些 API 调用可能触发该漏洞。  
```
200a201,202
>     GHashTable *params = NULL;
>     const char *content_type;
220c222,223
< 
---
>     content_type = soup_message_headers_get_content_type(soup_server_message_get_request_headers(msg),&params);
>     g_print ("%s\n", content_type);
```  
  
  
![](https://mmbiz.qpic.cn/mmbiz_png/hoiaQy7WhTCPO5xxR2AqAIwHdynyd6hjKZl2fcZlVJQRYicon17GicdCKSjufsmSeZzBPUdWUO90IFJx45AmEvRvQ/640?wx_fmt=png&from=appmsg "")  
  
该崩溃的概念验证及修补后的 simple-httpd.c  
 服务器代码可在此  
仓库  
获取。  
  
- https://github.com/AlmondOffSec/PoCs/tree/master/libsoup_heapoverflow_poc  
## 结论  
  
尽管在 C/C++ 等编译型语言中使用模糊测试器进行开源软件开发已是常见做法，但通过基础测试框架进行快速简单的配置仍能取得成果——在本案例中轻松获得了丰厚的漏洞赏金。  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
