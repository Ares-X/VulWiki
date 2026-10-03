# cve.imfht.com 公开材料收录与排除记录（2026-10-03）

## 范围与计数

实际列完 `state:has-public-poc` 的4页、103项；其中2026-09-19至2026-10-03窗口9项逐项深读，余94项未完成同深度审查。另读公共PoC首页20项：7项关联CVE、13项为产品/协议/暴露检测。首页Added At是收录时间，不等于原报告或CVE发布日期。普通PoC、Public Exploits和标签清单口径不同，不宣称全站覆盖。

16个CVE候选最终：**11篇新增、2篇既有文章只追加补证、3项暂缓**。13项检测不计作漏洞PoC。没有使用站内AI生成内容代替原始证据，也未登录取付费快照或调用需要API key的接口。

## 逐项处置

|编号|处置|材料/正文与具体边界|
|---|---|---|
|CVE-2025-14847|仅追加既有文章|[同一MongoBleed实体；关联模板只是buildInfo版本检测，不另建PoC稿](../Web安全/数据库/MongoDB/MongoDB-Zlib-压缩协议堆内存信息泄露漏洞-CVE-2025-14847.md)；旧文逐字节前缀保持不变|
|CVE-2026-100315|暂缓|[来源](https://github.com/mathurvishal/CloudClassroom-PHP-Project/blob/5dadec098bfbbf3300d60c3494db3fb95b66e7be/mydetailsfaculty.php)；原始报告404；固定源码与CNA可支持SQL拼接分析，但不满足本轮可用公开PoC/复现材料门槛|
|CVE-2026-100885|新增待核分析|[Krayin CRM 安装器 AJAX 绕过导致管理员账户覆盖](../Web安全/商业软件/Krayin/Krayin-Installer-未认证账户覆盖-CVE-2026-100885.md)；[具体公开资料](https://github.com/carlosalbertotuma/advisory/blob/e5d131d8dac4840ac4308b29de3dc1aa5f721b64/advisory-07-Unauthenticated-InstallerBypass.md)|
|CVE-2026-100906|新增待核分析|[Eyeplus ONVIF GetUsers 未认证明文口令返回：后续登录尚未证实](../IOT安全/摄像头/Eyeplus/Eyeplus-GetUsers-凭据信息泄露-CVE-2026-100906.md)；[具体公开资料](https://github.com/devjanger/iot-advisories/blob/3e8ea257b091a9ef322457862560aa09c27e544c/EYEPLUS-GetUsers-Unauth-Plaintext-Password.md)|
|CVE-2026-101074|新增待核分析|[Netcore NR289-GE boa Basic Auth 栈溢出：崩溃和 PC 控制的证据边界](../Web安全/网络设备/Netcore/Netcore-NR289-GE-boa-栈溢出-CVE-2026-101074.md)；[具体公开资料](https://github.com/senxitoyshuyi-ui/HACKALL/blob/53039d907a48e41955938cad73598b7e5de1eff9/netcore_NR289-GE_V1.4.5102%2C2018.06.1418_44%20Router/Netcore_NR289-GE_boa_stack_overflow.md)|
|CVE-2026-101143|新增待核分析|[Eleveo Quality Management 问卷导出响应泄露服务器路径](../Web安全/商业软件/Eleveo/Eleveo-Quality-Management-QMBODownload-路径泄露-CVE-2026-101143.md)；[具体公开资料](https://drive.google.com/file/d/1qKulZLn6xxT3ePlV__Q-0MKLhlWmRI_U/view?usp=sharing)|
|CVE-2026-101260|新增待核分析|[Ziroom ZHOME A0101 firstLogin 认证后命令注入：配置覆盖与回连副作用](../Web安全/网络设备/Ziroom/Ziroom-ZHOME-A0101-firstLogin-命令注入-CVE-2026-101260.md)；[具体公开资料](https://github.com/waltz-sketch/Ziroom/blob/6513d083108f7a859eaeffc7500c33e131b0228a/firstlogin_command_injection.md)|
|CVE-2026-49060|新增待核分析|[Hippoo REST 路由权限哨兵混用：本地对照 PoC 与管理员密码覆盖](../Web安全/CMS内容/WordPress/Hippoo-REST权限绕过-管理员密码覆盖-CVE-2026-49060.md)；[具体公开资料](https://github.com/rootdirective-sec/CVE-2026-49060-Lab/blob/db51f07bdfa8961c291f53fabdde53a65041012b/README.md)|
|CVE-2026-58467|新增待核分析|[Cockpit CMS Space Storage 路径遍历：PHP 内置服务器与路径存在条件](../Web安全/CMS内容/Cockpit/Cockpit-CMS-Space-Storage-路径遍历-CVE-2026-58467.md)；[具体公开资料](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/cves/2026/CVE-2026-58467.yaml)|
|CVE-2026-6639|新增待核分析|[AIWU AI Copilot getCurrentTaskResults 未授权任务数据读取](../Web安全/CMS内容/WordPress/AIWU-getCurrentTaskResults-任务数据泄露-CVE-2026-6639.md)；[具体公开资料](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/cves/2026/CVE-2026-6639.yaml)|
|CVE-2026-80099|新增待核分析|[Newfold WordPress 插件空 Hiive 密钥认证绕过：模板与修复边界](../Web安全/CMS内容/WordPress/Newfold-空Hiive密钥认证绕过-CVE-2026-80099.md)；[具体公开资料](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/cves/2026/CVE-2026-80099.yaml)|
|CVE-2026-87902|仅追加既有文章|[相同编号、产品、get_page_template实体；现有两篇互补材料保留；新模板作能力边界补证](../Web安全/CMS内容/WordPress/（CVE-2026-87902）WordPress%20Core%20page-template路径遍历LFI漏洞.md)；旧文逐字节前缀保持不变|
|CVE-2026-89063|暂缓|[来源](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/cves/2026/CVE-2026-89063.yaml)；公开Nuclei模板使用conversation_id=0创建新会话；成功匹配只证明会话创建，不证明跨用户会话读取/写入。已核对28.1/28.2源码及Wordfence修复28.2；未找到原作者对既有他人测试会话的公开充分复现材料，不能改模板补造PoC。|
|CVE-2026-93742|新增待核分析|[TOTOLINK A3002MU formWsc localPin 命令注入：telnet 服务写入副作用](../Web安全/网络设备/TOTOLink/TOTOLINK-A3002MU-formWsc-命令注入-CVE-2026-93742.md)；[具体公开资料](https://github.com/SunnyYANGyaya/cuicuishark-sheep-fishIOT/blob/8cb416b9d6041fec5600a20bd845d083da7934dd/ToTolink/A3002MU/rce-formWsc.md)|
|CVE-2026-94129|暂缓|[来源](https://vuldb.com/submit/893721)；原始写PoC缺分号、sizoef拼写错误、请求长度与初始化不一致；不改原代码，未满足本批可用验证门槛|
|CVE-2026-97646|新增待核分析|[student-management-system 管理处理器缺少会话检查：信息读取与改写须区分](../Web安全/商业软件/student-management-system/student-management-system-管理处理器未授权-CVE-2026-97646.md)；[具体公开资料](https://github.com/ningzichun/student-management-system/issues/9)|

## 检测条目与漏洞证明区别

|条目|不作为漏洞稿的原因|
|---|---|
|[mcp-streamable-http-exposure](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/exposures/apis/mcp-streamable-http-exposure.yaml)|仅证明匿名initialize握手可达，不能据此推导tools/call或全部能力未授权；POST initialize可能创建服务端会话/状态及日志|
|[oidc-signing-alg-none-supported](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/misconfiguration/oidc-signing-alg-none-supported.yaml)|仅discovery声明none，不证明依赖方接受无签名token或存在认证绕过；GET请求与访问日志；可能跟随同主机跳转|
|[qdrant-telemetry-exposure](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/misconfiguration/qdrant-telemetry-exposure.yaml)|仅telemetry可读及版本/计数，代理路由差异下不能推定全部data plane可读写；GET请求与访问日志；可能跟随同主机跳转|
|[powerdns-monitor-exposure](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/misconfiguration/powerdns-monitor-exposure.yaml)|监控运行信息暴露检测，不证明zone可修改或API key绕过；GET请求与访问日志；可能跟随同主机跳转|
|[cabot-detect](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/technologies/cabot-detect.yaml)|只检测产品指纹，不证明漏洞或认证绕过；GET请求与访问日志；可能跟随同主机跳转|
|[docspell-detect](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/technologies/docspell-detect.yaml)|只检测产品指纹，不证明漏洞或认证绕过；GET请求与访问日志；可能跟随同主机跳转|
|[cloudbeaver-detect](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/technologies/cloudbeaver-detect.yaml)|只检测产品指纹，不证明漏洞或认证绕过；GET请求与访问日志；可能跟随同主机跳转|
|[flagsmith-detect](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/technologies/flagsmith-detect.yaml)|只检测产品指纹，不证明漏洞或认证绕过；GET请求与访问日志；可能跟随同主机跳转|
|[medusa-storefront-detect](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/technologies/medusa-storefront-detect.yaml)|只检测产品指纹，不证明漏洞或认证绕过；GET请求与访问日志；可能跟随同主机跳转|
|[chibisafe-detect](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/technologies/chibisafe-detect.yaml)|只检测产品指纹，不证明漏洞或认证绕过；GET请求与访问日志；可能跟随同主机跳转|
|[netbird-detect](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/technologies/netbird-detect.yaml)|只检测产品指纹，不证明漏洞或认证绕过；GET请求与访问日志；可能跟随同主机跳转|
|[openmrs-detect](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/technologies/openmrs-detect.yaml)|只检测产品指纹，不证明漏洞或认证绕过；GET请求与访问日志；可能跟随同主机跳转|
|[evershop-detect](https://github.com/projectdiscovery/nuclei-templates/blob/9e93c63782dbb2b6160e068710d6240f418a3ed6/http/technologies/evershop-detect.yaml)|只检测产品指纹，不证明漏洞或认证绕过；GET请求与访问日志；可能跟随同主机跳转|

## 关键纠正

- MongoDB模板只发OP_QUERY/buildInfo并比版本，不构造OP_COMPRESSED/zlib泄漏；不能称实际堆读PoC
- WordPress模板无PEAR RCE阶段，补在已有实体而不重复建入口
- Cockpit是cockpit-hq的CMS，不是Linux cockpit-project；模板标verified:false，依赖真实中间目录和路径保留行为
- Newfold CNA描述与affected数组范围冲突保留说明；核到2.9.8固定源码含空token拒绝
- AIWU公告给修补版1.4.19，不从受影响<=1.4.6自行推定1.4.7；一个task_id和feature匹配不等于有效密钥已泄露
- Hippoo不能只依赖GET模板证明改密；已读原作者六文件lab及权限diff，明确密码POST、浮动下载、全接口端口和删卷副作用
- Bookly的conversation_id=0只新建会话/消息，不证明跨会话IDOR；CloudClassroom原报告404；BioStar原写代码和长度初始化存在缺口，三项暂缓
- Ziroom需登录并会改/etc/firstLogin；Netcore仅崩溃/PC控制；Eyeplus后续登录未证实；Eleveo为带权限导出的路径披露；TOTOLINK保留sessionCheck和/firmadyne/sh前提

## 实际阅读和验证范围

完整读5篇固定GitHub报告、1个原始issue、2个VulDB提交技术主体、1份两页PDF（文字及两页像素）、1篇Cockpit原始报告、20个Nuclei YAML、Hippoo全部6文件；核对16份CNA对应字段及相关产品代码/补丁。下载124个文件留哈希，不把下载数称为全文审阅或独立漏洞数。

未逐图查看Ziroom/Netcore/TOTOLINK/Cockpit图片；未审计整个产品仓库或下载的依赖包；Nuclei签名标记未作密码学校验。所有PoC执行、目标请求、扫描与依赖安装均为0。Hippoo仅作Python AST语法解析，不import或运行。

旧WordPress、MongoDB两文仅追加“模板可证明什么/不能证明什么”及固定链接；原正文、元数据、代码和图片引用逐字节保留。新增正文为原创中文分析，来源中的样例值及占位符未改写。
