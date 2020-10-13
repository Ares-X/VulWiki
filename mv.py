#!/usr/bin/env python
import os
import shutil
rootpath=os.getcwd()
web = rootpath+'/Web安全/Php/Php screw加密与破解'
os.mkdir(web+'/'+'.resource')
print(os.listdir(web))
for j in os.listdir(web):
        if j.endswith(".md"):
            try:
                shutil.move(rootpath+'/.resource/'+j[:-3].replace(" ","").replace("（","(").replace("）",")"),web+'/'+'.resource')

            except Exception as e :
                print (e)