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

### 
# zipfolder = os.path.join(cwd,'ZipFolder')
# screenshots = os.path.join(cwd,'Screenshots')
# if not os.path.exists(zipfolder):
#     os.mkdir(zipfolder)
# # The above if can also be done using Path
# Path(zipfolder).mkdir(exist_ok=True)
# Path(screenshots).mkdir(exist_ok=True)
###


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