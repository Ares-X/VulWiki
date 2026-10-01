---
cve: ""
fofa: "app=\"泛微-EOffice\""
version: "未知"
source: "https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Office%20officeserver.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md"
---

# 泛微E-Office Officeserver 任意文件读取漏洞

## 漏洞描述

泛微 E-Office 的 `/iweboffice/officeserver.php` 文件下载功能接收 `FILENAME`。公开资料使用 `OPTION=LOADFILE` 与相对路径读取程序目录之外的数据库配置文件，表明下载路径可能缺乏有效限制。

## 影响范围与前提

产品：泛微 E-Office；具体版本和补丁范围未知。读取范围受服务进程权限约束，且目标文件必须存在。公开请求未携带 Cookie，具体部署的认证要求仍需核对。

## 公开验证资料

```http
GET /iweboffice/officeserver.php?OPTION=LOADFILE&FILENAME=../mysql_config.ini HTTP/1.1
Host: oa.example.com
```

确认时应核对响应是否为目标配置文件的实际内容，例如具有相应 INI 结构及 `datauser`、`datapassword` 键值，而非错误页或 DBSTEP 协议头。HTTP 200 或 `DBSTEP` 单独出现不足以证明读取成功。

此条只记录 `LOADFILE` 读取流程；没有把 Java 类 `weaver.common.OfficeServer`、其他 PHP 上传入口或未核实的 `SAVEFILE`、`GETFILE`、`LOADTEMPLATE` 行为混为同一漏洞。

## 修复建议

向厂商核对当前版本和对应安全更新；在修复前限制该接口的访问，并检查相关访问日志。

## 参考来源

- [公开资料 1](https://github.com/PeiQi0/PeiQi-WIKI-Book/blob/90103c248a2c52bb0a060d0ee95d5a67e4579c3d/docs/wiki/oa/%E6%B3%9B%E5%BE%AEOA/%E6%B3%9B%E5%BE%AEOA%20E-Office%20officeserver.php%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96%E6%BC%8F%E6%B4%9E.md)
- [公开资料 2](https://github.com/projectdiscovery/nuclei-templates/blob/8b9d065ccb0492d39f7680c908b3030a97ddfe1b/http/vulnerabilities/weaver/weaver-officeserver-lfi.yaml)
- [公开资料 3](https://github.com/TD0U/WeaverScan/blob/5360245b20d5a6425c7684d104bf5fa7001d74fc/vulners/Wo6.go)

来源已于 2026-10-02 静态核对；本文未在目标环境执行请求，公开 PoC 不代表本地复现通过。
