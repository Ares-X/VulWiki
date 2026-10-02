---
source: "Threekiii/Awesome-POC"
title: "通达OA 多版本疑似路径索引"
product: "通达OA"
record_type: "advisory"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_status: "unknown"
affected_scope: "2013–2017、11–11.6"
prerequisites: "未列"
side_effects: "请求可能删除/覆盖数据、修改账号或持久改变业务状态；命令/代码执行示例可能改变主机状态"
review_date: "2026-10-02"
source_status: "unknown"
archive_url: "https://github.com/Ares-X/VulWiki/blob/41940cb0038d09ca5aaddbe5bffb923e423d210f/Web%E5%AE%89%E5%85%A8/OA%E5%8A%9E%E5%85%AC/%E9%80%9A%E8%BE%BEOA/%E9%80%9A%E8%BE%BEOA%20%E9%83%A8%E5%88%86%E6%BC%8F%E6%B4%9E%E4%BF%A1%E6%81%AF%E6%95%B4%E5%90%88.md"
category_recommendation: "OA / 通达"
id: "vw-dd9613d18dc1eeeb5ddb1f02"
entity_id: "ve-dd9613d18dc1eeeb5ddb1f02"
schema_version: "1"
---

# 通达OA 多版本疑似路径索引

## 条目说明

- 对象与具体问题：通达OA；多版本疑似路径索引
- 版本、配置及部署条件：2013–2017、11–11.6
- 认证与权限前提：未列
- 核验边界：已完成原始 Markdown 的文本审阅；未执行 PoC、未访问目标、未视检截图。来源所述影响与复现结果不等于本库独立验证。

## 证据边界与更正

以下记录原始资料的证据边界。可以由原文确定的产品、编号及格式问题已在本条修订；没有原始证据的版本、响应和补丁信息仍待核实。

- 大批端点无参数/证据/认证，不能直接转成漏洞记录
- 11.6 RCE实际只给print删除，缺链条件
- 0day历史标签应去时效歧义，版本集合需逐项证据

## 操作风险

请求可能删除/覆盖数据、修改账号或持久改变业务状态；命令/代码执行示例可能改变主机状态。保留原示例供静态分析；仅可在明确授权的隔离测试环境验证，事先准备备份与回滚。凭据示例如含星号，仅保留首尾用于说明，不能直接使用。

## 技术资料与来源记录

参考阅读：

- [通达OA漏洞一些漏洞点(Github)](https://github.com/OA-HUNTER/TongDa-OA.git)

### 通达OA信息收集

```plain
http[s]://TongDaOA.domain/inc/expired.php 判断通达版本
http[s]://TongDaOA.domain/inc/reg_trial.php
http[s]://TongDaOA.domain/inc/reg_trial_submit.php
http[s]://TongDaOA.domain/ispirit/retrieve_pwd.php
GET 参数username、email 可爆用户、邮箱
http[s]://TongDaOA.domain/resque/worker.php 计算机名
```

### 2013-2017(SQLi path)

```plain
http[s]://TongDaOA.domain/module/crm2010/imageOperation/deleteImage.php 
http[s]://TongDaOA.domain/module/crm2010/product/type_tree.php 
http[s]://TongDaOA.domain/module/crm2010/select/getData.php 
http[s]://TongDaOA.domain/module/crm2010/select/getValue.php 
http[s]://TongDaOA.domain/module/crm2010/select/index.php 
http[s]://TongDaOA.domain/module/crm2010/share/update.php 
http[s]://TongDaOA.domain/portal/webportals/source/oa/news.php
http[s]://TongDaOA.domain/portal/webportals/source/oa/notify.php?LOGIN_USER_ID=
http[s]://TongDaOA.domain/task/crm/account_care_remind.php
http[s]://TongDaOA.domain/task/crm/action_link_remind.php
http[s]://TongDaOA.domain/task/crm/contract_birthday_remind.php
http[s]://TongDaOA.domain/task/crm/contract_near_remind.php
http[s]://TongDaOA.domain/task/crm/contract_remind.php
http[s]://TongDaOA.domain/task/crm/crm_account_contact_bir_remind.php
http[s]://TongDaOA.domain/task/crm/crm_complain_remind.php
http[s]://TongDaOA.domain/task/crm/crm_opportunity_status_remind.php
http[s]://TongDaOA.domain/task/crm/crm_salepay_remind.php
http[s]://TongDaOA.domain/task/crm/crm_stockout_remind.php
http[s]://TongDaOA.domain/task/crm/marketing_near_remind.php
http[s]://TongDaOA.domain/task/crm/order_to_stockout_remind.php
http[s]://TongDaOA.domain/task/crm/payment_near_remind.php
http[s]://TongDaOA.domain/task/crm/storage_near_remind.php
http[s]://TongDaOA.domain/ispirit/myoa.php
http[s]://TongDaOA.domain/ispirit/retrieve_pwd.php
```

### v11~v11.6 [0day]

```plain
http[s]://TongDaOA.domain/general/approve_center/list/roll_config.inc.php
http[s]://TongDaOA.domain/general/bi_design/reportshop/report_bi.func.php
http[s]://TongDaOA.domain/general/data_center/console/autocode/autocode.php
http[s]://TongDaOA.domain/general/data_center/model_design/console/autocode/autocode.php
http[s]://TongDaOA.domain/general/data_center/model_design/design/report/action.php
http[s]://TongDaOA.domain/general/reportshop/design/report/action.php
http[s]://TongDaOA.domain/general/project/portal/details/budget/table.php
http[s]://TongDaOA.domain/general/reportshop/design/report/console/autocode/autocode.php
http[s]://TongDaOA.domain/general/reportshop/workshop/report/attachment-remark/form3.php
http[s]://TongDaOA.domain/general/system/user/get_key_user_info.php
http[s]://TongDaOA.domain/general/workflow/list/roll_config.inc.php
http[s]://TongDaOA.domain/interface/GetNewAPP.php
http[s]://TongDaOA.domain/interface/GetNewAPP1.php
http[s]://TongDaOA.domain/general/workflow/plugin/turn/kd_k3_applly/kd_k3_applly.php
http[s]://TongDaOA.domain/general/workflow/document_list/roll_config.inc.php
```

### v11.6 [RCE]

```plain
http[s]://TongDaOA.domain/module/appbuilder/assets/print.php 任意文件删除
```


---

> 来源：Threekiii/Awesome-POC
