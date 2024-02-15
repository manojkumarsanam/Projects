## Prakshalana is a python script that works on any directory 
## and organizes the directory files into different folders
## based on the extensions.
## currently it only works on smaller types like videos,Images,pdfs,etc
## This can be extended based on the use case.
import shutil
from pathlib import Path
import sys
import os
cwd = os.getcwd()

### Extensions setup
ZIPEXT = ['.rar','.zip','.7z']
Images = ['.png','.jpg','.jpeg','.webp','.gif']
codeLanguageExt = ['.py','.java','.exe','.html','.css','.js','.jsx']
VideoExt = ['.mkv','.mp4']
DocExt = ['.docx','.doc','.txt']
ExcelExt = ['.xlsx','.csv','.xls']
PdfExt=['.pdf']

folders = ['ZipFolder','Screenshots','Images','Pdfs','DOCX','Videos','Codes','Excel files']

extension_dict = {
    'ZipFolder':ZIPEXT,
    'Images': Images,
    'Pdfs':PdfExt,
    'DOCX':DocExt,
    'Videos': VideoExt,
    'Codes': codeLanguageExt,
    'Excel files': ExcelExt
}

### Creating folders and storing their paths
paths={}
for folder in folders:
    folder_path = os.path.join(cwd,folder)
    Path(folder_path).mkdir(exist_ok=True)
    paths[folder] = folder_path


### sending files to folders based on extensions
for f in os.listdir():
    file = Path(f)
    name,ext = file.stem,file.suffix
    if f=='prakshalana.py':
        continue
    if ext.lower() in extension_dict['ZipFolder']:
        shutil.move(file,paths['ZipFolder'])
        continue
    if 'screenshot' in name.lower():
        shutil.move(file,paths['Screenshots'])
        continue
    if ext.lower() in extension_dict['Images']:
        shutil.move(file,paths['Images'])
        continue
    if ext.lower() in extension_dict['Videos']:
        shutil.move(file,paths['Videos'])
        continue
    if ext.lower() in extension_dict['Pdfs']:
        shutil.move(file,paths['Pdfs'])
        continue
    if ext.lower() in extension_dict['Codes']:
        shutil.move(file,paths['Codes'])
        continue
    if ext.lower() in extension_dict['Excel files']:
        shutil.move(file,paths['Excel files'])
        continue
    if ext.lower() in extension_dict['DOCX']:
        shutil.move(file,paths['DOCX'])
        continue
print('Done')