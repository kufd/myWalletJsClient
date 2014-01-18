import os
import time
import argparse
from bs4 import BeautifulSoup
import tempfile
import uuid
import re


def minify(file_list, result_file, type, args):
    tmp_file_concated = tempfile.gettempdir()  + '/' + str(uuid.uuid4())
    tmp_file_minified = tempfile.gettempdir()  + '/' + str(uuid.uuid4())
    tmp_file_compressed = tempfile.gettempdir()  + '/' + str(uuid.uuid4())

    #concat files
    content = ''
    for file in file_list:
        
        if type == 'js' and content != '':
            content += ";\n"
            
        tmp_content = open(file, 'r').read()
        
        #replace relative pathes to absolute in css files
        if type == 'css':
            path = os.path.dirname(file).replace(args.root_dir, '')
            tmp_content = re.sub(r'url\((([^/\\(http://)]{1})[^)]+)\)', 'url('+path+'/\g<1>)', tmp_content, flags=re.IGNORECASE)
        
        content += tmp_content
        
    file = open(tmp_file_concated, "w")
    file.write(content)
    file.close()
        
    command = ''
    if args.minify: 
        command += 'java -jar ' + minifier_home_dir + '/yuicompressor-2.4.8.jar --type=' + type + ' ' + tmp_file_concated + ' -o ' + tmp_file_minified
    else:
        command += 'cp ' + tmp_file_concated + ' ' + tmp_file_minified
    if args.compress:
        command += ' && gzip -6 -c ' + tmp_file_minified + ' > ' + tmp_file_compressed
    else:
        command += ' && cp ' + tmp_file_minified + ' ' + tmp_file_compressed
    command += ' && mv ' + tmp_file_compressed + ' ' + result_file
    command += ' && rm -f ' + tmp_file_concated + ' ' + tmp_file_minified

    command_result = os.system(command)

    if command_result:
        raise Exception('Error happened during ' + type + ' minification')

#preparing arguments
argsParser = argparse.ArgumentParser(description='Minification css and js files for project')
argsParser.add_argument(
    'file',
    type = str,
    help = 'Path to file(from project root directory) with includes of js and css files.'
);
argsParser.add_argument(
    '--root-dir',
    default = os.getcwd(),
    type = str,
    help = 'Project root directory',
    dest='root_dir'
);
argsParser.add_argument(
    '--result-dir',
    required = True,
    type = str,
    help = 'Directory to save minified files',
    dest='result_dir'
);
argsParser.add_argument(
    '--compress',
    help = 'Compress file',
    action='store_true'
);
argsParser.add_argument(
    '--minify',
    help = 'Compress file',
    action='store_true'
);
args = argsParser.parse_args()


#parse files to get css and js files for minifying
minifier_home_dir = os.path.dirname(os.path.realpath(__file__))
os.chdir(args.root_dir)

css_files = list();
js_files = list();

html = open(args.file, 'r').read()
soup = BeautifulSoup(html)

for script in soup.findAll('script'):
    if script.get('type') == 'text/javascript':
        js_file = script.get('src');
        if js_file[0] == '/':
            js_file = args.root_dir + js_file
        else:
            js_file = os.path.dirname(args.file) + '/' + js_file
        js_files.append(js_file);
        script.decompose();
            
for link in soup.findAll('link'):
    if 'stylesheet' in link.get('rel'):
        css_file = link.get('href');
        if css_file[0] == '/':
            css_file = args.root_dir + css_file
        else:
            css_file = os.path.dirname(args.file) + '/' + css_file
        css_files.append(css_file);
        link.decompose();
     
#minification
result_file_js = args.result_dir + '/' + str(int(time.time())) + '.js'
result_file_css = args.result_dir + '/' + str(int(time.time())) + '.css'
if args.compress:
    result_file_js += '.gz'
    result_file_css += '.gz'

minify(js_files, result_file_js, 'js', args)
minify(css_files, result_file_css, 'css', args)

#append minified files with js and css
script_tag = soup.new_tag("script", type="text/javascript", src='/' + result_file_js)
soup.head.append(script_tag)

link_tag = soup.new_tag("link", rel="stylesheet", media='all', href='/' + result_file_css)
soup.head.append(link_tag)

file = open(args.file, "w")
file.write(soup.prettify())
file.close()
    
