from notion.client import NotionClient
from md2notion.upload import upload
from notion.block import PageBlock
import os
import requests
import re
import pypandoc
import time
from pathlib import Path

token="9cf3649f892552770aad2f71c7e48ed0a75b4c14797f3a6db77d49addc9659fcee7eb4a5537ee3ee1d05d3ec56d0ce749777843ef78925d8a800323118032f75641fd17b1b40f5122aa6a0cc9a10"

client = NotionClient(token_v2=token)
file_location = os.getcwd()+"/"
#
def upload1():
    location=file_location+'Web安全/'
    rootPage = client.get_block("https://www.notion.so/aresx/tmp-f48a6fa397534aa7a86534a7f2bc0b39")
    #webPage=rootPage.children.add_new(PageBlock,title="Web安全")
    webPage=client.get_block("https://www.notion.so/aresx/Web-07a2bad887c343529213f6298c77b6f4")
    root=os.listdir(location)
    #print (location)
    root.sort(key = str.lower)
    for dir_name in root: # 第一层循环，循环cms分类
        if Path(location+dir_name).is_dir() and not dir_name.startswith("resource"): # 判断是否是文件夹
            print("创建cms根目录")
            catePage=webPage.children.add_new(PageBlock,title=dir_name) # 给每个分类建立page
            catePath=os.listdir(location+dir_name)
            catePath.sort(key = str.lower)
            print (dir_name+":")
            for sub in catePath: # 循环分类内第一层，绝大多数文章目录
                if sub.endswith(".md"):
                    print("正在上传"+sub)
                    with open(location+dir_name+"/"+sub,'r', encoding="utf-8") as mdFile: # 上传
                        retry=1
                        while retry ==1:
                            try:
                                vulpage=catePage.children.add_new(PageBlock,title=sub[:-3]) # 新建单独漏洞page
                                upload(mdFile,vulpage)
                                retry =0
                                time.sleep(5)
                            except Exception as e:
                                print (e)
                    #print (sub)
                if Path(location+dir_name+"/"+sub).is_dir() and not sub.startswith("resource"): # 判断是否为cms内的子目录,排除resource文件夹
                    print("创建子目录:"+dir_name+"/"+sub)
                    subpage=catePage.children.add_new(PageBlock,title=sub) # 新建子目录page
                    nextsub=os.listdir(location+dir_name+"/"+sub)
                    nextsub.sort(key = str.lower)
                    for nextfile in nextsub: # 循环子目录内容
                        if nextfile.endswith(".md"): # 上传子目录内的漏洞
                            print("上传"+nextfile)
                            with open(location+dir_name+"/"+sub+'/'+nextfile,'r',encoding="utf-8") as mdFile2:
                                retry2 = 1
                                while retry2 ==1:
                                    try:
                                        subvulpage=subpage.children.add_new(PageBlock,title=nextfile[:-3])
                                        upload(mdFile2,subvulpage)
                                        retry2 = 0
                                        time.sleep(5)
                                    except Exception as e:
                                        print (e)
                        if Path(location+dir_name+"/"+sub+"/"+nextfile).is_dir() and not nextfile.startswith("resource"): # 处理二层子目录
                            print("创建子目录:"+dir_name+"/"+nextfile)
                            nextsubPage=subpage.children.add_new(PageBlock,title=nextfile)
                            nextsubsub =os.listdir(location+dir_name+"/"+sub+"/"+nextfile)
                            nextsubsub.sort(key = str.lower)
                            for nextsubfile in nextsubsub:
                                if nextsubfile.endswith(".md"): # 上传二层子目录md文件
                                    print("上传:"+nextsubfile)
                                    with open(location+dir_name+"/"+sub+'/'+nextfile+'/'+nextsubfile,'r',encoding="utf-8") as mdFile3:
                                        retry3 = 1
                                        while retry3 ==1:
                                            try:
                                                nextsubvulPage=subpage.children.add_new(PageBlock,title=nextsubfile[:-3])
                                                upload(mdFile3,nextsubvulPage)
                                                retry3 =0
                                                time.sleep(5)
                                            except Exception as e:
                                                print (e)
                                if Path(location+dir_name+"/"+sub+"/"+nextfile+'/'+nextsubfile).is_dir() and not nextsubfile.startswith("resource"): #处理三层子目录
                                    print("创建子目录:"+nextsubfile)
                                    nextsubsubPage=nextsubPage.children.add_new(PageBlock,title=nextsubfile)
                                    nextsubsubsub = os.listdir(location+dir_name+"/"+sub+"/"+nextfile+'/'+nextsubfile)
                                    nextsubsubsub.sort(key = str.lower)
                                    for nextsubsubsubfile in nextsubsubsub:
                                        if nextsubsubsubfile.endswith(".md"):
                                            print("上传:"+nextsubfile)
                                            with open(location+dir_name+"/"+sub+"/"+nextfile+'/'+nextsubfile+'/'+nextsubsubsubfile,'r',encoding="utf-8") as mdFile4:
                                                retry4 =1
                                                while retry4 ==1:
                                                    try:
                                                        nextsubsubvulPage=nextsubsubPage.children.add_new(PageBlock,title=nextsubsubsubfile[:-3])
                                                        upload (mdFile4,nextsubsubvulPage)
                                                        retry4=0
                                                        time.sleep(5)
                                                    except Exception as e:
                                                        print (e)


    # path=location.split("/")
    # length = len(path)-1
    # if length =1:
    #     newPage=page.children.add_new(PageBlock,title=path[0])
    #     with open (file,"r",encoding="utf-8") as mdFile:
    #         newPage=page.children.add_new(PageBlock,title=title)
    #         upload(mdFile,newPage)

def document_trans(location, doc_id, doc_name):
    html_file = re.sub(r'/', "_", doc_name + ".docx")
    # location=location.replace(file_location+'Web安全/',"")
    # print (location)
    print (html_file[:-5])
    # if not Path(location + "resource_"+html_file[:-5]).is_dir():
    #     os.mkdir(location + "resource_"+html_file[:-5])
    pypandoc.convert_file(location + html_file, 'markdown', outputfile=location + html_file[:-5] + ".md",extra_args=['--extract-media='+file_location +"resource/"+html_file[:-5].replace(" ","").replace("（","(").replace("）",")")])
    with open(location + html_file[:-5]+".md", "r+") as html_data:
        tmp_html_data = html_data.read()
        html_data.seek(0, 0)
        html_data.truncate()
        tmp_html_data = re.sub(r"\[image\]", "[]", tmp_html_data)
        tmp_html_data = re.sub(r'{width=.*\nheight=(.*?)}', "", tmp_html_data)
        print (tmp_html_data)
        html_data.write(tmp_html_data)
    print("docx文件转换完成！", "\n")

# 抓取json目录
def query_json_catalog():
    json_url = "https://wiki.0-sec.org/api/wiki/tree"  # 零组对外的json目录数据
    json_headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Cache-Control': 'max-age=0',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'
    }

    req = requests.get(json_url, headers=json_headers)
    json_data = req.json()
    return json_data


# 校验本地是否存在爬过的文件
def check_doc_exists(location, doc_name):
    doc_name = re.sub(r'/', "_", doc_name)
    docx_file_path = "{}{}.docx".format(location, doc_name)
    if Path(docx_file_path).is_file():
        return True
    else:
        return False


# 清洗目录中带有 / 的不合法文件名
def clean_folder_name(location, data):
    data = re.sub(r'/', "_", data)
    tmp_location = location + data + "/"

    if not Path(location + data + "/").is_dir():
        os.mkdir(location + data + "/")  # 创建目录
    return tmp_location


# 递归json目录树数据
def recursion_function(json_data, location=None):
    for i in range(0, len(json_data)):
        if json_data[i]['name'] == '友情链接':
            continue
        if json_data[i]['treeNode']:
            tmp_location = clean_folder_name(location, json_data[i]['name'])
            recursion_function(json_data[i]['treeNode'], tmp_location)  # 把目录树 和 路径递归到下一次
        else:
            if check_doc_exists(location, json_data[i]['name']):
                print("尝试转换本地文件： ", json_data[i]['name'])
                doc_id, doc_name = json_data[i]['id'], json_data[i]['name']
                document_trans(location, doc_id, doc_name)  # 启动爬虫


if __name__ == '__main__':
    location=file_location+'Web安全/彩虹外链网盘/'
    tmpname="彩虹外链网盘 v4.0 重装getshell.docx"
    pypandoc.convert_file(location + tmpname, 'markdown', outputfile=location + tmpname[:-5] + ".md",extra_args=['--extract-media='+file_location +"resource/"+tmpname[:-5].replace(" ","").replace("（","(").replace("）",")")])
    tmpname="彩虹外链网盘 v4.0 sql注入漏洞.docx"
    pypandoc.convert_file(location + tmpname, 'markdown', outputfile=location + tmpname[:-5] + ".md",extra_args=['--extract-media='+file_location +"resource/"+tmpname[:-5].replace(" ","").replace("（","(").replace("）",")")])
    
    # json_data = query_json_catalog()
    # json_data = json_data['data']
    # recursion_function(json_data, file_location)  # 递归轮询
    #upload1()