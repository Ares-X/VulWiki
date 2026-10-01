---
cve: ""
fofa: "app=\"泛微-协同办公OA\""
version: "公开资料标注 9.0；完整范围未知"
source: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20jqueryFileTree.jsp%20%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md"
---

# 泛微E-Cology jqueryFileTree.jsp 目录遍历漏洞

## 漏洞描述

泛微 E-Cology 的组织架构目录浏览组件接受 `dir` 路径。公开资料通过相对路径返回预期用户文件目录之外的条目，用于确认目录遍历和服务器目录结构泄露。

## 影响范围与前提

公开复现资料标注 E-Cology 9.0；完整受影响版本与补丁范围未知。目录列表可见不代表文件内容可读，也不代表能够遍历整个文件系统。

## 公开验证资料

```http
GET /hrm/hrm_e9/orgChart/js/jquery/plugins/jqueryFileTree/connectors/jqueryFileTree.jsp?dir=/page/resource/userfile/../../ HTTP/1.1
Host: oa.example.com
```

应核对返回项是否为实际目录条目，并确认其已越出预期目录。上游模板同时检查 `index.jsp` 条目及目录操作控件；单个 `[` 字符或页面控件不能证明目录遍历。完整页面截图和请求见公开资料。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Cology%20jqueryFileTree.jsp%20%E7%9B%AE%E5%BD%95%E9%81%8D%E5%8E%86%E6%BC%8F%E6%B4%9E.md)
- [公开资料 2](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/ecology-jqueryfiletree-traversal.yaml)
- [公开资料 3](https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wc10.go)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
