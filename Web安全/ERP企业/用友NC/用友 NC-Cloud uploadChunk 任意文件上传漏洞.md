---
source: "https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-nccloud-uploadchunk-fileupload.yaml"
version: "具体受影响版本范围未披露"
fofa: "app=\"用友-NC-Cloud\""
---

# 用友 NC-Cloud uploadChunk 任意文件上传漏洞

## 漏洞描述

用友 NC-Cloud 的 `/ncchr/pm/fb/attachment/uploadChunk` 分片上传接口存在路径约束不足的风险。公开 PoC 通过 `fileGuid` 的上级目录序列，将带 JSP 扩展名的纯文本标记写到 `/nccloud/`，再读取标记确认落地。该验证证明可写入并访问文件，不单独证明 JSP 代码已被执行。

## 影响范围

具体受影响版本范围未披露。本文按公开 PoC 所列产品记录，不据此扩展为全版本受影响。

## 公开验证方法

完整 multipart 请求见文末固定提交的 YAML。原始请求除 `fileGuid`、`chunk`、`chunks` 外，还带有 `accessTokenNcc` 请求头；原条目遗漏了该必要来源条件。模板使用随机文件名和纯文本内容，随后访问 `/nccloud/<模板生成的文件名>.jsp`。

必须核对第二次 GET 的响应包含本次生成的相同标记，不能仅按上传返回 200 判断成功。该 PoC 包含特定令牌条件，其适用性需要结合实际部署核实，本文不宣称无需任何凭证即可上传。本文只核对公开源码，未上传文件或进行本地复现。

## 修复建议

向用友获取适用修复。对规范化后的 fileGuid 路径实施根目录边界检查，验证访问令牌，并限制上传类型及存储目录的脚本执行能力。

## 参考链接

- [zan8in/afrog-pocs 原始 PoC（固定提交）](https://github.com/zan8in/afrog-pocs/blob/253291be2d307a6c836d5997bbb838f1e846f9ba/vulnerability/yonyou-nccloud-uploadchunk-fileupload.yaml)

## 网络测绘

```text
app="用友-NC-Cloud"
```
