---
cve: "CVE-2024-0402"
source: "gelusus/wxvl 公众号漏洞文库"
---

#  GitLab 中的 Devfile 文件写入漏洞   
 Ots安全   2024-05-04 13:15  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/bL2iaicTYdZn7gtxSFZlfuCW6AdQib8Q1onbR0U2h9icP1eRO6wH0AcyJmqZ7USD0uOYncCYIH7ZEE8IicAOPxyb9IA/640?wx_fmt=gif "")  
  
这篇文章详细介绍了识别和利用CVE-2024-0402  
的过程   
。  
  
GitLab 中的漏洞已于 2024 年 1 月 25 日通过   
关键安全版本  
修复。  
  
有时，漏洞利用就像洋葱：它们有层次。这个特殊的漏洞利用了多个层和两个底层漏洞，这些漏洞结合使用可以在 GitLab 实例上实现任意文件写入。然后，该文件写入可能会被进一步滥用以在 GitLab 实例上运行任意命令。这篇文章将介绍识别此类问题的一般方法以及该漏洞利用所依赖的技术细节。但是，我们将保留完整的端到端漏洞利用，因为我们认为底层技术和方法通常比共享已修补漏洞的漏洞利用更相关。  
## 起点：依赖关系  
  
这次冒险从查看主项目  
 的  
依赖关系  
GitLab  
开始。  
  
在项目依赖项中寻找一些容易实现的成果时，我   
注意到devfile   
Gem  
通过   
使用  
.调用外部二进制文件对我来说是一个典型的危险信号，有很多事情可能会出现问题。例如，命令或参数注入，或者来自被调用二进制文件的鲜为人知的功能的其他意外。更不用说二进制文件或其依赖项中的实际漏洞了。  
  
Open3.capture3  
  
值得注意的是，devfile  
Gem 是  
在 GitLab 内部  
编写的。对存储库的快速审查揭示了  
一些基于 Go 的代码  
 ，从中devfile  
创建了 Ruby Gem 调用的二进制文件。  
此时我对  
Devfiles  
还不太了解。  
我脑子里只有一个模糊的概念：这些是用于描述  
GitLab 工作区  
 功能环境的 YAML 文件。  
  
工作区是基于 Web 的隔离开发环境，由 GitLab 应用程序部署到 Kubernetes 集群中。缩小一点我们有：  
- Devfiles：用于描述 Kubernetes 环境中工作区的 YAML 文件  
  
- 一个 Ruby 库，通过调用基于 Go 的辅助二进制文件来解析这些 devfiles  
  
快速检查  
调用 Go 二进制文件的 Ruby 代码  
 表明没有任何意外或容易实现的成果。直接调用二进制文件，不涉及 shell，简单的命令注入是不可能的。此外，Go 二进制文件没有机会进行参数注入。  
## 深层挖掘  
  
有时，开始尝试一个软件来了解潜在的漏洞是件好事。Gem  
的设计devfile  
让这一切变得简单。我可以使用包含的基于 Go 的二进制文件并为其提供一些 YAML。深入  
研究文档  
 并寻找一些要使用的示例文件，我发现了允许  
指定parent  
 另一个的功能。devfile  
然后该文件将用作当前devfile  
.我将  
文档  
中的示例   
与devfile  
Gem 中的二进制文件一起使用，如下所示：  
```
joern@host2:~/projects/deps/ruby/3.2.0/gems/devfile-0.0.25.pre.alpha1-x86_64-linux/bin$ ls
devfile
joern@host2:~/projects/deps/ruby/3.2.0/gems/devfile-0.0.25.pre.alpha1-x86_64-linux/bin$ ./devfile flatten 'schemaVersion: 2.2.0
metadata:
  name: my-project-dev
parent:
  uri: https://raw.githubusercontent.com/devfile/registry/main/stacks/nodejs/devfile.yaml'
failed to populateAndParseDevfile: error getting devfile info from url: failed to retrieve https://raw.githubusercontent.com/devfile/registry/main/stacks/nodejs/devfile.yaml, 404: Not Foundjoern@host2:~/projects/deps/ruby/3.2.0/gems/devfile-0.0.25.pre.alpha1-x86_64-linux/bin$
```  
  
ls  
当我在该命令之后在目录中  
执行 a 时，我感到非常惊讶：  
```
joern@host2:~/projects/deps/ruby/3.2.0/gems/devfile-0.0.25.pre.alpha1-x86_64-linux/bin$ ls
2.1.1  2.2.0  devfile  OWNERS  stack.yaml
```  
  
devfile/registry  
存储库  
中的目录  
 已复制到我运行./devfile  
命令的工作目录中。就在那时，我想我可能会做一些值得花更多时间的事情。  
## 退一步，进三步  
  
这I'll copy some stuff from the Internet into your working directory when you
parse a devfile  
件事很有希望。我希望使用这个向量来从中获得任意文件写入。应该很简单，我所需要做的就是找出 GitLab 内的代码路径，以触发依赖项来压平我制作的 devfile。那，是的，也许是遍历工作目录，也许不是。这取决于我当前的未知数，这个工作目录在 GitLab 实例上的位置以及我将在写入文件方面控制什么。但总的来说，这个问题看起来像是一个有趣的起点。  
  
因此，我更深入地研究了  
GitLab 的主要 Ruby on Rails 代码库  
，只是为了发现有一个验证可以防止 parent  
在devfile  
.这真的很不方便，我几乎看到  
那行代码  
中很棒的文件写入消失了：  
```
return err(_("Inheriting from 'parent' is not yet supported")) if devfile['parent']
```  
  
但情况并没有那么糟糕，这个障碍是我已经做好准备的。2023 年 5 月，我“搞乱”了 YAML 文件。这是受到  
Jake Miller  
一篇 关于 JSON 解析器中解析器差异的博客文章的启发，因为 JSON 和 YAML 在它们的用例中有些相似，但 YAML 更复杂一些，我认为从解析器差异的角度来看 YAML 可能是值得的。  
当时  
 我能够制作一个 YAML 文件，该文件在 Ruby 和 Python 中的解析方式不同。然而，它在 Ruby 和 Go 中解析相同的内容，所以我“只是”需要在 Go 和 Ruby 中找到类似的解析器差异。我们首先看一下针对 Ruby/Go 与 Python 的初始 YAML 文件：  
```
joern@host2:~/projects/devfile$ cat 1.yaml 
test: python
!!binary dGVzdA==: ruby & go
joern@host2:~/projects/devfile$ python -c 'import yaml;x = yaml.safe_load(open("1.yaml"));print(x["test"])'
python
joern@host2:~/projects/devfile$ ruby -ryaml -e 'x = YAML.safe_load(File.read("1.yaml"));puts x["test"]'
ruby & go
joern@host2:~/projects/devfile$ cat g.go 
package main

import (
        "fmt"
        "log"
        "os"
        "gopkg.in/yaml.v3"
)

func main() {
    data, _ := os.ReadFile(os.Args[1])
        unmarshalled := &yaml.Node{}

        err := yaml.Unmarshal([]byte(data), unmarshalled)
        if err != nil {
                log.Fatalf("error: %v", err)
        }
        var expanded interface{}
        err = unmarshalled.Content[0].Decode(&expanded)
        if err != nil {
                log.Fatalf("error: %v", err)
        }

        d, err := yaml.Marshal(expanded)
        if err != nil {
                log.Fatalf("error: %v", err)
        }
        fmt.Printf("%s\n", string(d))
}

joern@host2:~/projects/devfile$ go run g.go 1.yaml
test: ruby & go
```  
  
这里非常简单的“秘密武器”是使用符号!!binary  
 来引入 Base64 编码密钥：  
```
test: python
!!binary dGVzdA==: ruby & go
```  
  
解码后  
变为  
Base64 ( !!binary  
) 字符串。  
在 Ruby 和 Go 中，这将覆盖之前定义的  
值。但在 Python 中会发生以下情况：dGVzdA==  
test  
test: python  
```
python -c 'import yaml;y = yaml.safe_load(open("1.yaml"));print(y)'        
{'test': 'python', b'test': 'ruby & go'}
```  
  
该!!binary  
符号将  
在 Python 中创建一个与字符串不同的  
Binary Sequence  
 ( )   
。因此，我们将有两个键，  
而  
不是像 Ruby 和 Go 中那样一个键覆盖另一个键。b'test'  
test  
test  
b'test'  
  
这种行为是我已经准备好的基础，GitLab 是否是一个具有相同 Go 解析器后端的 Python 代码库，可以立即使用以绕过parent  
关键过滤。不幸的是，情况并非如此，所以我必须找到一种不同的方法来绕过关键过滤器。  
  
我花了一些时间阅读  
YAML 中的标签  
 ，并注意到了这一行Local tags start with “!”  
。好吧，然后我想，让我们尝试看看当我使用!binary  
而不是时会发生什么!!binary  
：  
```
joern@host2:~/projects/devfile$ cat 2.yaml
test: non-binary 
!binary dGVzdA==: binary
joern@host2:~/projects/devfile$ ruby -ryaml -e 'x = YAML.safe_load(File.read("2.yaml"));puts x'
{"test"=>"binary"}
joern@host2:~/projects/devfile$ go run g.go 2.yaml
dGVzdA==: binary
test: non-binary

joern@host2:~/projects/devfile$
```  
  
是的，确实就是这么“简单”。由于!binary  
Ruby 和 Go 中  
存在这种行为差异，我们可以构建一个 YAML 文件，例如：  
```
whatever: is here
!binary parent: hehehe injected
```  
  
现在，当我们通过 Ruby 的视角来看它时，它将显示为：  
```
joern@host2:~/projects/devfile$ ruby -ryaml -e 'x = YAML.safe_load(File.read("what.yaml"));puts x'
{"whatever"=>"is here", "\xA5\xAA\xDE\x9E"=>"hehehe injected"}
```  
  
该!binary  
值已被解码为二进制密钥"\xA5\xAA\xDE\x9E"  
，现在，   
Go 解析器的  
鼓声：  
```
joern@host2:~/projects/devfile$ go run g.go what.yaml 
parent: hehehe injected
whatever: is here
```  
  
该!binary  
标签刚刚被悄悄删除，生成的 YAML 密钥称为parent  
。这两种行为的结合正是我们绕过parent  
Devfile YAML 中密钥  
的 Ruby 验证所需的。  
## 将文件写入不属于它们的地方  
  
现在我们已经能够parent  
通过 Ruby 偷偷摸摸地进入 Go 代码了，现在是时候深入研究 devfile 库以及我之前注意到的向工作目录写入奇怪的文件行为了。  
  
首先，我想知道 devfile  
在 GitLab 实例上调用 Gem 中的二进制文件时工作目录在哪里。我希望从利用的角度来看它会是一些有用的目录。  
  
为了找到这一点，我查看了  
文档 howto set up GitLab Workspaces  
。这里有很多要求来正确设置这些工作区、Kubernetes 集群和 GitLab 代理，以及 GitLab 实例上的某些配置项目来设置并将所有内容绑定在一起。我的测试设置的要点是在本地运行所有内容。GitLab 使用 Docker 运行，Kubernetes 端使用minikube  
.  
  
这两部分就位后，我们可以将minkube  
具有   
GitLab 代理  
的集群连接到 GitLab 实例上的组中的项目。在同一组的另一个中，我们可以创建一个.devfile.yaml  
包含以下内容的：  
```
schemaVersion: 2.2.0
!binary parent: 
    uri: https://raw.githubusercontent.com/devfile/registry/main/stacks/nodejs/devfile.yaml'
```  
  
要触发 Devfile 解析，我们现在只需为该项目创建一个工作区：  
  
![](https://mmbiz.qpic.cn/sz_mmbiz_png/rWGOWg48tadZqwibIy39lQY8KQJZrwjeNsQDcEuB6poMqXfEyL6ibKNjfnZcVJlpic0r0Q3nPfMkpDicLGoJ7JOicQQ/640?wx_fmt=png&from=appmsg "")  
  
stack.yaml  
完成此步骤后，我登录到 GitLab Docker 容器，并搜索在我最初观察文件写入行为时解析相同 Devfile 时出现的  
文件。  
```
root@localhost:/# find . -name stack.yaml 2> /dev/null 
./var/opt/gitlab/gitlab-rails/working/stack.yaml
root@localhost:/# cd /var/opt/gitlab/gitlab-rails/working/
root@localhost:/var/opt/gitlab/gitlab-rails/working# ls -lart
total 46
drwxr-xr-x 9 git root  12 Apr 11 12:59 ..
-rw-r--r-- 1 git git  283 Apr 12 13:09 stack.yaml
-rw-r--r-- 1 git git   73 Apr 12 13:09 OWNERS
drwxr-xr-x 2 git git    2 Apr 12 13:09 2.2.0
drwxr-xr-x 2 git git    2 Apr 12 13:09 2.1.1
drwx------ 4 git root   6 Apr 12 13:09 .
```  
  
这个结果不太乐观，除了通过 Devfile 解析器写入的文件之外，目录是空的。虽然与 GitLab 的其他部分可能存在一些竞争条件，我们可以写入临时目录，但我决定不走这条路，而是更深入地研究  
Devfile 库  
。  
  
parent  
很快就确定了解析 Devfile 中密钥  
的主要逻辑。  
它开始于parseParentAndPlugin()  
.该函数的名称已经表明了另一个与 类似的功能 parent  
，即plugin  
.由于这两个功能，parent  
并且在 switch 语句 for  
 和 forplugin  
中具有几乎相同的底层逻辑  
：plugin  
parent  
```
switch {
case parent.Uri != "":
    parentDevfileObj, err = parseFromURI(parent.ImportReference, d.Ctx, resolveCtx, tool)
case parent.Id != "":
    parentDevfileObj, err = parseFromRegistry(parent.ImportReference, resolveCtx, tool)
case parent.Kubernetes != nil:
    parentDevfileObj, err = parseFromKubeCRD(parent.ImportReference, resolveCtx, tool)
default:
    return fmt.Errorf("devfile parent does not define any resources")
}
```  
  
我更深入地研究了这些parseFrom*  
方法。起初我查看了 parseFromURI  
，我认为从中下载 Devfile 的 URI 应该很容易。令人惊讶的是，事情并没有那么容易。该parseFromURI  
函数  
 涉及很多有关本地和远程 URL 的逻辑。引起我注意的  
是  
：  
```
if tool.downloadGitResources {
    destDir := path.Dir(curDevfileCtx.GetAbsPath())
    err = tool.devfileUtilsClient.DownloadGitRepoResources(newUri, destDir, token)
    if err != nil {
        return DevfileObj{}, err
    }
```  
  
当我检查有关CVE-2023-49569 的  
代码时，我才知道  
：  
> CVE-2023-49569 在 v5.11 之前的 go-git 版本中发现路径遍历漏洞。此漏洞允许攻击者跨文件系统创建和修改文件。在最坏的情况下，可以实现远程代码执行。  
  
  
该漏洞于 1 月 12 日发布，对于我提出的攻击非常有用，因为 Devfile 库用于go-git  
底层 Git 操作。然而，当我查看 Devfile 库时，此漏洞尚未公开。  
如果我决定深入研究 Git 操作，  
我可能  
会找到它，但我没有；）。相反 ，  
当我意识到指向gitlab.com  
、github.com  
或  
Devfile 库之一的简单 URL 会发挥其魔力，并尝试  
 相应的存储库来获取引用的文件。raw.githubusercontent.com  
bitbucket.org  
git clone  
  
相关的实现部分是  
  
在  
pkg/devfile/parser/util/utils.go中  
```
// DownloadGitRepoResources downloads the git repository resources
func (c DevfileUtilsClient) DownloadGitRepoResources(url string, destDir string, token string) error {
    var returnedErr error
    if util.IsGitProviderRepo(url) {
        gitUrl, err := util.NewGitURL(url, token)
        if err != nil {
            return err
        }

        if !gitUrl.IsFile || gitUrl.Revision == "" || !ValidateDevfileExistence((gitUrl.Path)) {
            return fmt.Errorf("error getting devfile from url: failed to retrieve %s", url)
        }

        stackDir, err := os.MkdirTemp("", "git-resources")
        if err != nil {
            return fmt.Errorf("failed to create dir: %s, error: %v", stackDir, err)
        }

        defer func(path string) {
            err := os.RemoveAll(path)
            if err != nil {
                returnedErr = multierror.Append(returnedErr, err)
            }
        }(stackDir)

        gitUrl.Token = token

        err = gitUrl.CloneGitRepo(stackDir)
        if err != nil {
            returnedErr = multierror.Append(returnedErr, err)
            return returnedErr
        }

        dir := path.Dir(path.Join(stackDir, gitUrl.Path))
        err = util.CopyAllDirFiles(dir, destDir)
        if err != nil {
            returnedErr = multierror.Append(returnedErr, err)
            return returnedErr
        }
    } else {
        return fmt.Errorf("failed to download resources from parent devfile.  Unsupported Git Provider for %s ", url)
    }

    return nil
}
```  
  
并在  
/pkg/util/util.go  
中：  
```
// IsGitProviderRepo checks if the url matches a repo from a supported git provider
func IsGitProviderRepo(url string) bool {
    if strings.Contains(url, RawGitHubHost) || strings.Contains(url, GitHubHost) ||
        strings.Contains(url, GitLabHost) || strings.Contains(url, BitbucketHost) {
        return true
    }
    return false
}
```  
  
因此，我没有深入研究go-git  
这里的路径，而是使用存储库中的符号链接执行了一些简单的检查，看看这是否会给我带来任何进一步的帮助。事实并非如此，所以接下来我开始研究parseFromRegistry  
。Devfiles 的注册表 基于开放容器计划 (OCI) 规范，其行为与 Docker 注册表非常相似。  
  
parseFromRegistry  
当我面临依赖的另一个依赖时，投入迅速升级。parseFromRegistry  
调用getResourcesFromRegistry  
 本身就把繁重的工作留给 了registryLibrary  
.这个库也是 registry-support  
由 Devfile 项目开发的，我决定看一下它。遵循代码流程后，我到达了该 PullStackFromRegistry  
 函数，该函数调用该decompress  
 函数，该函数tar.gz  
从注册表库中获取存档并提取该存档内的文件。让我们看一下这个decompress  
函数：  
```
// decompress extracts the archive file
func decompress(targetDir string, tarFile string, excludeFiles []string) error {
    var returnedErr error

    reader, err := os.Open(filepath.Clean(tarFile))
...
    gzReader, err := gzip.NewReader(reader)
...
    tarReader := tar.NewReader(gzReader)
    for {
...

        target := path.Join(targetDir, filepath.Clean(header.Name))
        switch header.Typeflag {
...
        case tar.TypeReg:
            /* #nosec G304 -- target is produced using path.Join which cleans the dir path */
            w, err := os.OpenFile(target, os.O_CREATE|os.O_RDWR, os.FileMode(header.Mode))
            if err != nil {
                returnedErr = multierror.Append(returnedErr, err)
                return returnedErr
            }
            /* #nosec G110 -- starter projects are vetted before they are added to a registry.  Their contents can be seen before they are downloaded */
            _, err = io.Copy(w, tarReader)
            if err != nil {
                returnedErr = multierror.Append(returnedErr, err)
                return returnedErr
            }
            err = w.Close()
            if err != nil {
                returnedErr = multierror.Append(returnedErr, err)
                return returnedErr
            }
        default:
            log.Printf("Unsupported type: %v", header.Typeflag)
        }
    }

    return nil
}
```  
  
这看起来很有希望：这条线  
```
target := path.Join(targetDir, filepath.Clean(header.Name))
```  
  
其次是：  
```
/* #nosec G304 -- target is produced using path.Join which cleans the dir path */
w, err := os.OpenFile(target, os.O_CREATE|os.O_RDWR, os.FileMode(header.Mode))
```  
  
gosec规则304 , File path provided as taint input  
, 已在此发出警报，开发人员已指示 gosec 扫描仪忽略该发现。该注释甚至为我们提供了这样做的原因： target is produced using path.Join which cleans the dir path  
，它引用了如何filepath.Clean(header.Name)  
在代码流的早期使用。  
  
但是filepath.Clean  
这里并没有按预期工作。从文档中也不是很明显，但是当提供 ed 路径的相对路径时filepath.Clean  
将Clean()  
保持相对路径。  
  
考虑以下示例：  
```
package main

import (
    "fmt"
    "path/filepath"
)

func main() {
    fmt.Println(filepath.Clean("/../../../../../../../tmp/test")) // absolute path
    fmt.Println(filepath.Clean("../../../../../../../tmp/test"))  // relative path
}
```  
  
该程序的输出是：  
```
/tmp/test
../../../../../../../tmp/test
```  
  
这正是成功利用漏洞所缺少的拼图。Tar 文件的条目名称中可以包含/  
es 和s。因此，当在 Devfile 中.  
包含注册表中的文件时，我们可以遍历预期目录并解压缩并将文件写入磁盘上的任意位置。parent  
  
在识别出此路径遍历后，实际上需要花费大量时间来设置假注册表服务器并提供正确的有效负载。总的来说，这个漏洞从开始研究 Devfile Gem 到准备好有效的利用大约需要两个工作日，其中花费了大量时间来设置工作区功能和虚假注册表。  
## 结论  
  
我想在这里强调一下这篇文章的字里行间或多或少隐藏着一些要点。  
### 解析器差异  
  
当涉及到漏洞利用时，解析器差异可能是一个非常强大的工具。不过，它们非常依赖于上下文，并且很难概括它们在利用软件方面的用途。  
### 不要相信评论  
  
SAST 扫描仪这一次是正确的。路径遍历并未被阻止filepath.Clean  
，但评论的作者  
认为是  
。他们明确关闭了 gosec 警告。软件开发的重点是让某些软件做作者不打算做的事情。这意味着在阅读源代码中的注释时，应将它们视为思考的灵感how can I falsify this comment?  
。  
### ../继续给予  
  
角色序列../  
确实是一份不断赠送的礼物。大多数时候，路径遍历的利用都是简单且可靠的。大约 30 多年过去了，此类漏洞仍然没有得到解决。  
### 找不到所有的bug  
  
在我内部报告基于注册表解析器的文件写入问题几天后，  
go-git 漏洞（  
CVE-2023-49569  
 ）就被披露了。该漏洞与解析器差异结合使用可能是另一种将文件写入不属于的地方的方法。这里的信息有两个方面：虽然可能不可能找到所有错误，但在足够大的代码库中通常有足够的错误来实现您的目标。;)  
### 大家继续挖掘  
  
最后，我想强调的是，为了找到漏洞，总是值得深入研究源代码、阅读它并尝试理解它的开发假设。真正困难的部分是“知道”在哪里寻找以及何时停止寻找。  
  
  
  
原文翻译自：  
  
https://gitlab-com.gitlab.io/gl-security/security-tech-notes/security-research-tech-notes/devfile/  
  
  
  
感谢您抽出  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycNnFvFYVgXoExRy0gqCkqvrAghf8KPXnwQaYq77HMsjcVka7kPcBDQw/640?wx_fmt=gif "")  
  
.  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycd5KMTutPwNWA97H5MPISWXLTXp0ibK5LXCBAXX388gY0ibXhWOxoEKBA/640?wx_fmt=gif "")  
  
.  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWgdSBqOibtgiaYWjL4pkRXwycU99fZEhvngeeAhFOvhTibttSplYbBpeeLZGgZt41El4icmrBibojkvLNw/640?wx_fmt=gif "")  
  
来阅读本文  
  
![](https://mmbiz.qpic.cn/mmbiz_gif/Ljib4So7yuWge7Mibiad1tV0iaF8zSD5gzicbxDmfZCEL7vuOevN97CwUoUM5MLeKWibWlibSMwbpJ28lVg1yj1rQflyQ/640?wx_fmt=gif "")  
  
**点它，分享点赞在看都在这里**  
  


---

> 来源：gelusus/wxvl（微信公众号漏洞文章自动归档，原文见文首链接）
