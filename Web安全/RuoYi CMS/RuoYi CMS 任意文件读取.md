# RuoYi CMS 任意文件读取



POC：

```
https://domain/common/download/resource?resource=/profile/../../../../etc/passwd
```



## 1.前言

看到T00ls有位老哥求助某CMS的getshell方法，于是下载了该CMS进行审计，由于审计技术很菜，只找到了任意文件读取漏洞。

## 2.分析过度

1、**看山不是山**  打开源码，看到“通用下载请求”的实现方法，先研究一下。![0009.png](https://www.hackexp.cn/content/uploadfile/202006/90c71592015925.png)
流程如下：1、传入两个参数，一个文件名参数，一个delete参数，控制是否删除2、将全局变量中的下载路径和用户传入的文件名进行拼接![999990.png](https://www.hackexp.cn/content/uploadfile/202006/0a061592016072.png)
其中getProfile()获取资源下载路径，该下载路径在配置文件中声明了，如下：![93.jpeg](https://www.hackexp.cn/content/uploadfile/202006/c32f1592016128.jpeg)

3、先读取文件，然后再到FileUtils.writeBytes方法，将文件内容放到response流中。

![999990.png](https://www.hackexp.cn/content/uploadfile/202006/0a061592016226.png)
4、然后判断是否删除文件。



![999990.png](https://www.hackexp.cn/content/uploadfile/202006/0a061592016280.png)
 POC构造：

`任意文件读取：/common/download?fileName=1.txt&delete=false`

![999990.png](https://www.hackexp.cn/content/uploadfile/202006/0a061592016618.png) 任意文件删除：/common/download?fileName=1.txt&delete=true ![999990.png](https://www.hackexp.cn/content/uploadfile/202006/0a061592016733.png)

原以为到这里就可以任意文件读取和删除了，但是忽略了一个点，就是isValidFilename函数，该函数的实现如下：   



- ```
       public static String FILENAME_PATTERN = "[a-zA-Z0-9_\\-\\|\\.\\u4e00-\\u9fa5]+";
        /**
         * 文件名称验证
         * 
         * @param filename 文件名称
         * @return true 正常 false 非法
         */
        public static boolean isValidFilename(String filename)
    {
            return filename.matches(FILENAME_PATTERN);
        }
   ```

   
   
   过滤了/和\，无法跨目录。
   
   
   
   ![999990.png](https://www.hackexp.cn/content/uploadfile/202006/0a061592016814.png) 那这个点就没什么用了，只能删除/home/ruoyi/uploadPath/download/目录下的文件。
   
   
   
   2、看山还是山**  往下一翻，还有一个点下载的点，如下：![999990.png](.resource/RuoYi%20CMS%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96/media/0a061592016876.png)从代码可以看出，下载流程如下：1、从GET请求中获取resource参数的值（可控点）*
   
   *2、传入StringUtils.*substringAfter* 方法进行处理后，与localPath拼接
   
   3、带入将FileUtils.writeBytes处理结果作为response的返回值。
   其中StringUtils.substringAfter(finalString str, final String separator) 方法，其实是从str中查找separtator，然后取标志位后面的字符。![999990.png](.resource/RuoYi%20CMS%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96/media/0a061592016957.png)
   在resourceDownload中，传入的标志位是：Constants.RESOURCE_PREFIX，一个全局变量，该变量的值是
   ![999990.png](.resource/RuoYi%20CMS%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96/media/0a061592017037.png)
   那么我们在构造URL时候，需要在想要下载的路径前面加上/profile。
   所以poc为：
   
   
   
   `/common/download/resource?resource=/profile/test.txt`
   穿越目录下载文件的POC：
   
   
   
   `/common/download/resource?resource=/profile/../../../../test.txt`
   
   
   
   ![999990.png](https://www.hackexp.cn/content/uploadfile/202006/0a061592017129.png) 
   
   利用点比较鸡肋，只能下载本地资源所在盘符下的文件，但是linux系统下就不受这个影响了。
   
   ![image-20201109155051451](.resource/RuoYi%20CMS%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96/media/image-20201109155051451.png)
   
    3.总结
   虽然利用很鸡肋，但还是学到了很多东西。在Windows环境下，默认的资源路径在D:/ruoyi/uploadPath,所以只能下载D:/下的文件，一般都可以下载到数据库配置文件吧。在Linux环境下，完全不受限制了，可以下载任意目录下的文件（只要权限够），数据库配置在xxx-admin/src/main/resources下application-druid.yml文件中，有时候目录名会变化，可以先下载根目录下的pom.xml查看目录名，如下：![999990.png](.resource/RuoYi%20CMS%20%E4%BB%BB%E6%84%8F%E6%96%87%E4%BB%B6%E8%AF%BB%E5%8F%96/media/0a061592017258.png)
    温馨提示：bash_history可以看下，或许有惊喜。