---
source: "gelusus/wxvl 公众号漏洞文库"
title: "Apache NiFi 连爆四漏洞，权限失控与内存炸弹问题亟待修复"
product: "Apache NiFi"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
identifier_status: "active"
primary_identifiers: "CVE-2026-62354; CVE-2026-68981; CVE-2026-68979; CVE-2026-68980"
referenced_identifiers: ""
identifier_role: "primary"
cve: "CVE-2026-62354; CVE-2026-68981; CVE-2026-68979; CVE-2026-68980"
prerequisites: "各漏洞版本及权限不同；参数/组件级细粒度授权有关，gzip请求为另一入口"
verification_source: "https://nifi.apache.org/documentation/security/"
source_status: "unknown"
side_effects: "含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。"
id: "vw-fd445e6abc99cb59264a1bd4"
entity_id: "ve-fd445e6abc99cb59264a1bd4"
schema_version: "1"
---

# Apache NiFi 连爆四漏洞，权限失控与内存炸弹问题亟待修复

<!-- vulwiki-editorial:start -->
## 校订与适用边界

- 适用前提：各漏洞版本及权限不同；参数/组件级细粒度授权有关，gzip请求为另一入口
- 证据范围：四个漏洞应分实体关联；版本与2.11.0修复经官方确认，部分解释失真。

### 已有来源支持的更正

- 核对四项编号、版本/权限边界、2.11.0修复；70469为后续2.11.0 gzip检查绕过，修复2.12.0

### 尚未解决的证据缺口

以下限制仍适用于后文历史材料；相关版本、结果或修复结论不能据此视为已验证：

- 四个主CVE均未入frontmatter
- 压缩前体积说反，应为压缩后的请求体与解压后的输出大小
- 验证请求临时采用参数不等于永久修改配置
- 跨上下文资产删除是越权能力，称误删/乌龙指弱化攻击本质
- 官方明确参数权限问题有细粒度授权适用条件，非所有部署
- 2.11.0只是本批初始修复，当前官方又披露gzip检查绕过70469并于2.12.0修复，原历史公告应保留日期与后续关联

### 核验来源

- https://nifi.apache.org/documentation/security/

### 操作风险与资料使用

- 含资源消耗、延时或崩溃验证：可能影响服务可用性；限制请求次数、并发与超时，保留无攻击负载的对照结果。

本页为文本校订，未执行代码、PoC 或目标请求；原图仅保留引用，未据此确认复现成功。
<!-- vulwiki-editorial:end -->

## 技术正文与历史材料

看雪学苑
                    看雪学苑  看雪学苑   2026-08-04 09:59  
  
近日，Apache NiFi 项目组一次性发布了四个安全漏洞的修复公告，涉及权限校验绕过、参数验证滥用以及内存耗尽型拒绝服务攻击。**所有漏洞均在 2.11.0 版本中完成修复，**  
官方呼吁用户尽快升级。  
  
  
这四枚漏洞分别瞄准了 NiFi 的核心参数管理机制和 Web API 接口，攻击面广，**影响版本跨度从 1.5.0 一直延伸到 2.10.0。**  
  
  
**1**  
  
**高危风险一：只读用户竟能“偷改”配置（CVE-2026-62354）**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Cpo2XCpI7K1ibP4zWKPPU7icNdmDAUA2qVcDtlYiba9h1ZnXy15Sq3VbELTSmCLCqu7L4JEA6cJTop9ckibK5HVjKf7gqNHJYDA30CduqXYeibZw/640?wx_fmt=png&from=appmsg "")  
  
  
影响版本：1.10.0 – 2.10.0  
  
  
严重程度：高危  
  
  
该漏洞存在于参数上下文的验证请求中。**原本只拥有“只读”权限的用户，竟然可以在提交验证请求时夹带“私货”——即自定义的参数值。**  
系统在验证过程中会临时采用这些外部传入的值，从而覆盖掉当前正在使用的配置。  
  
  
这就好比给了访客一张“参观证”，结果访客却能顺手修改工厂流水线的工艺参数。**攻击者虽然不能直接写入配置，但可以通过反复验证摸清系统反应，甚至让验证逻辑跑出预期结果。**  
从 2.11.0 开始，提交验证请求必须拥有写入权限。  
  
  
**2**  
  
**高危风险二：小压缩包制造“内存黑洞”（CVE-2026-68981）**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Cpo2XCpI7K1qcVAqsoXXF3gpzAYRz7NkZ88CHEfuiaicfSbbNTBicSMY6XfNJ1MDvSDE9AXTBbbsk7k7ctNwzJiaAg5wdXnJRavJuPP5uUXb8NE/640?wx_fmt=png&from=appmsg "")  
  
  
影响版本：1.5.0 – 2.10.0  
  
  
严重程度：高危  
  
  
这是一个典型的“放大器”攻击。NiFi 的 REST API 原本会限制请求体的大小，但**限制只针对压缩前的体积，而非解压后的真实数据量。**  
  
  
攻击者只需发送一个很小的 gzip 压缩包，解压后却可能膨胀数千倍，瞬间占满服务器内存，导致服务响应缓慢甚至直接崩溃。**这类似于传说中的“Zip Bomb”攻击在 API 场景下的翻版。**  
新版本在 Jetty 服务端层面处理压缩逻辑，并关闭了对 gzip 请求的解压支持，从源头堵住了这一风险。  
  
  
**3**  
  
**中危隐患：改一个参数，动全局组件（CVE-2026-68979）**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Cpo2XCpI7K0daDPica78vBK3bsKvxicZYudibjb7libpU6bq5ibLLF733Yg6tDW5gcar4LKOnF2SCotdDFZSNKLEiaFtP86uyTNCSP70OXV0gdbicw/640?wx_fmt=png&from=appmsg "")  
  
  
影响版本：1.10.0 – 2.10.0  
  
  
严重程度：中危  
  
  
这是一个**权限蔓延**  
问题。当用户被允许修改某个参数上下文中的值时，NiFi 并未向下校验那些引用该参数的组件是否也属于该用户的管辖范围。  
  
  
这就导致了一种“越权操作”：**你可以修改一个不属于你管理范围的处理器里的参数值。**  
更危险的是，如果该参数恰巧包含一段可执行脚本，且该组件处于停止状态，系统在自动验证时可能会触发脚本执行。官方强调该场景利用条件较为苛刻，但仍建议立即修复。2.11.0 已补全针对所有引用组件的鉴权逻辑。  
  
  
**4**  
  
**低危但需警惕：删错资产的“乌龙指”（CVE-2026-68980）**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Cpo2XCpI7K1DY3EGAicDibRoPOKrMFq3wR7jnRDlrqyqxc01ZLYHvylaGXlc212I10nDqLYQtUeIeB0zCUGf9ZibvniciaC1muQCve2rpdanjBxc/640?wx_fmt=png&from=appmsg "")  
  
  
影响版本：2.0.0 – 2.10.0  
  
  
严重程度：低危  
  
  
在资产删除操作中，API 仅校验了用户提供的参数上下文 ID 是否合法，却没有核实待删除的资产是否真的属于该上下文。在启用了细粒度权限策略的多租户环境中，这可能导致用户误删其他上下文中的资产。新版本已增加所有权确认步骤，防止“张冠李戴”。  
  
  
**5**  
  
**安全建议**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/Cpo2XCpI7K0jTpoSrg9IHw8fsIeeibEyDUnjia4ZAbOgXxzesC4OicIeb5s36rH5dedRcWst0awyaSE5d8BHwRn9y0VRzgFnKgPBX6vB5q4GkE/640?wx_fmt=png&from=appmsg "")  
  
  
如果您正在使用 Apache NiFi 1.5.0 至 2.10.0 之间的任意版本，请立即将部署升级至 2.11.0。  
  
  
升级后，请同步检查参数上下文的读写权限策略，并重点排查含有脚本内容的参数值，尤其是那些关联到停止组件的参数。  
  
  
资讯来源：cybersecuritynews  
  
  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Cpo2XCpI7K1FDtnr5zibNS26DiaIFCJqjBIbrW1wj5VPwy3Gp1INNUc5DJcliaQza6uIUqUkYBiaOFmTCzyiceQwl6omDicUVcKSnJvq9h9kocrVc/640?wx_fmt=jpeg&from=appmsg "")  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Cpo2XCpI7K2csoNBPibJ5yBkicM9IWNvuJF2zwACV8Jpk089llOReuialAZlxrERoQFPmLyE8wM4fbxAx8ictaT2Mlic16vD8j8zORNggQQWrvFk/640?wx_fmt=gif&from=appmsg "")  
  
**球分享**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/Cpo2XCpI7K2ZGE8y5XJjibicmgibPian1Xu0w1wrJz8jQyDlxibEN8pLTH6iakZ8mZq1IUj33rkWcunoF5xbyrJBibDIK4ibk1Ylbx9lCzbL0gH5SLY/640?wx_fmt=gif&from=appmsg "")  
  
**球点赞**  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_gif/Cpo2XCpI7K1SoMzconMFSsU5m9TB9a9Wg3HHXGS156abuuPzXV29M7W4k0Mej6AzNkjHz2aNpsJEBkVibhxbFJvQwfFG0ibYXdncY1ZhkKgibc/640?wx_fmt=gif&from=appmsg "")  
  
**球在看**  
  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
