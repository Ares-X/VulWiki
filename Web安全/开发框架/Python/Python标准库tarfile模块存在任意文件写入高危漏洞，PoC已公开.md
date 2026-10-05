---
cve: "CVE-2025-4517"
source: "gelusus/wxvl 公众号漏洞文库"
product: "Python tarfile/解压过滤器绕过"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: "CVE-2025-4517"
referenced_identifiers: ""
identifier_role: "primary"
identifier_status: "unknown"
title: "Python标准库tarfile模块存在任意文件写入高危漏洞，PoC已公开"
prerequisites: "来源所述条件，未列明部分仍待核：称Python>=3.12，未考虑旧分支回补filter支持；没有任何修复patch号"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-fd8ffcc7ffd3e1e4bb4f7e7c"
entity_id: "ve-fd8ffcc7ffd3e1e4bb4f7e7c"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：称Python&gt;=3.12，未考虑旧分支回补filter支持；没有任何修复patch号

代码与实验材料：只构造普通../../outside.txt，未证明绕过data/tar过滤；代码中孤立br导致NameError，命令和路径叙述不一致

来源证据范围：SecurityOnline经FreeBuf再转载，无Python公告或补丁

- **证据待核（1）**：PoC没有展示声称的安全过滤器绕过；依据：普通../就是data/tar应阻止的路径，没有额外绕过构造、错误响应或成功证据，不能当4517已复现。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **证据待核（2）**：推荐缓解不完整；依据：abspath前缀只检查member.name，不解析符号链接/硬链接或提取过程变化，不能证明阻断该缺陷。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **事实待核（3）**：代码和版本严重不完整；依据：三段Python都含孤立br；未列修复版本；tar命令仍evil.txt却称outside.txt，两个..却说三级父目录。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

#  Python标准库tarfile模块存在任意文件写入高危漏洞，PoC已公开  
 网络安全与人工智能研究中心   2025-06-28 02:39  
  
![](../../.resource/remote/3ca45517d5f3bee59ed2167cbcba57c90815064de62d730cc2c63f818ae33d04.gif "")  
  
  
安全研究人员发现Python标准库中的tarfile模块存在高危漏洞（CVE-2025-4517，CVSS评分9.4）。该漏洞允许攻击者通过特制的tar压缩包实现任意文件写入（Arbitrary File Write），目前概念验证代码（PoC）已在技术社区流传。  
  
  
**Part01**  
  
### 漏洞概述  
  
  
  
CVE-2025-4517是Python的  
tarfile  
模块中存在的一个严重漏洞，影响Python 3.12及更高版本。该漏洞允许在使用  
filter="data"  
参数进行解压时，在解压目录之外执行任意的文件系统写入操作。  
  
  
当用户使用  
tarfile  
模块通过  
TarFile.extractall()  
或  
TarFile.extract()  
方法提取不受信任的tar归档文件，并将  
filter  
参数设置为  
"data"  
或  
"tar"  
时，会受到影响。  
  
  
![](../../.resource/remote/0094cc23460472a456325e5857cc3b7b0997957e5693994ca5e29c4ccb99ec44.png "")  
  
  
**Part02**  
  
### 技术细节  
  
  
###   
  
当使用  
TarFile.extractall  
或  
TarFile.extract  
配合  
filter="data"  
或  
filter="tar"  
处理不受信任的tar归档文件时，攻击者可利用此漏洞向文件系统的任意位置写入文件。  
  
  
该漏洞的根源在于：虽然  
data  
过滤器本应通过阻止tar归档内危险目标（如符号链接或设备文件）来提供防护，但其未能有效防范路径遍历攻击。这意味着精心构造的tar归档文件可将文件写入预期解压目录之外。  
  
**Python官方已将该漏洞的CVSS v3.1基础评分定为9.4（严重），其向量字符串为CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:L。**  
###   
  
  
**Part03**  
  
### 风险关键点  
  
  
此漏洞对源码分发包安装的影响较小，因为该场景本身允许代码执行。但若通过程序处理来自用户、自动化流程或上传的任意 tar 文件，则存在风险。  
  
  
假设恶意tar文件包含以下路径：  
  
```
../../../../etc/passwd
```  
  
  
若未正确校验，解压时将覆写  
/etc/passwd  
或目标目录外的任意文件。  
  
"data"  
和  
"tar"  
过滤器本应对输出进行清理，但因此缺陷，其无法阻止包含目录遍历的文件名。  
  
假设存在以下代码：  
  
```
import tarfile
br
with tarfile.open('archive.tar', 'r') as tar:
    # filter="data" is the new recommended/safe default, right? (not anymore!)
    tar.extractall(path="safe_folder", filter="data")
```  
  
  
那么，精心构造的archive.tar可包含   
  
../../outside.txt  
类文件，会导致向父目录写入。  
  
通过Python  
复现漏洞的方式如下：  
  
```
import tarfile
br
with tarfile.open('malicious.tar', 'w') as tar:
    import io
    info = tarfile.TarInfo("../../outside.txt")
    data = b"This should not be here!"
    info.size = len(data)
    tar.addfile(info, io.BytesIO(data))
```  
  
  
通过shell生成复现漏洞的方式如下：  
  
```
echo "Evil!" > evil.txt
tar cvf malicious.tar --transform='s/^/..\/..\/..\/../' evil.txt
```  
  
  
使用存在漏洞的代码解压时，将在"safe_folder"的三级父目录写入 outside.txt。  
  
  
**Part04**  
  
### 漏洞影响  
  
  
###   
  
- **任意文件系统写入**  
：攻击者可覆写敏感文件（SSH 密钥、系统配置等）  
  
- **权限提升**  
：若Python脚本以root运行，后果可能是灾难性的。  
  
- **模式普遍性**  
：这种“解压即忘”模式存在于大量代码库，而 "data"  
 本应是安全默认值  
  
  
  
  
**Part05**  
  
### 缓解措施与解决方案  
  
  
1、短期解决此问题，可  
自主验证归档内容或使用强化解压，  
此方案至少可检测并阻止路径遍历，具体代码如下：  
  
```
import os
import tarfile
br
def is_within_directory(directory, target):
    abs_directory = os.path.abspath(directory)
    abs_target = os.path.abspath(target)
    return abs_target.startswith(abs_directory + os.sep)
br
with tarfile.open('archive.tar', 'r') as tar:
    for member in tar.getmembers():
        member_path = os.path.join("safe_folder", member.name)
        if not is_within_directory("safe_folder", member_path):
            raise Exception("Attempted Path Traversal in Tar File")
    tar.extractall("safe_folder", filter="data")
```  
  
  
2、  
长期解决方案是升级到已修复该漏洞的Python版本。  
  
  
**参考来源：**  
  
Critical Python Tarfile Flaw (CVE-2025-4517, CVSS 9.4): Arbitrary File Write, PoC Available  
  
https://securityonline.info/critical-python-tarfile-flaw-cve-2025-4517-cvss-9-4-arbitrary-file-write-poc-available/  
  
  
![](../../.resource/remote/5190898c9b53c038958a0997928960c935b7fccf1b85421b398ddc1b99c36358.png "")  
###   
  
  
来源｜“FreeBuf”微信公众号  
  
编辑｜音叶泽  
  
审核｜秦川原  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
