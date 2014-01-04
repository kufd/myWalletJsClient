import os
import time
import argparse
from BeautifulSoup import BeautifulSoup
import tempfile
import uuid

#preparing arguments
argsParser = argparse.ArgumentParser(description='Minification css and js files for project')
argsParser.add_argument(
    'file',
    nargs = '+',
    default = 'index.html',
    type = str,
    help = 'Path to file(from project root directory) with includes of js and css files. Can be used multiply times.'
);
argsParser.add_argument(
    '--root-dir',
    default = os.getcwd(),
    type = str,
    help = 'Project root directory',
    dest='root_dir'
);
argsParser.add_argument(
    '--result-css',
    default = str(int(time.time())) + '.css',
    type = str,
    help = 'Minified css file',
    dest='result_css'
);
argsParser.add_argument(
    '--result-js',
    default = str(int(time.time())) + '.js',
    type = str,
    help = 'Minified css file',
    dest='result_js'
);
argsParser.add_argument(
    '--compress',
    help = 'Compress file',
    action='store_true'
);
args = argsParser.parse_args()


#parse files to get css and js files for minifying
minifier_home_dir = os.path.dirname(os.path.realpath(__file__))
os.chdir(args.root_dir)

css_files = list();
js_files = list();

for file in args.file:
    html = open(file, 'r').read()
    soup = BeautifulSoup(html)

    for script in soup.findAll('script'):
        if script.get('type') == 'text/javascript':
            js_file = script.get('src');
            if js_file[0] == '/':
                js_file = js_file[1:]
            else:
                js_file = os.path.dirname(file) + '/' + js_file
            js_files.append(js_file);
            
    for script in soup.findAll('link'):
        if script.get('rel') == 'stylesheet':
            css_file = script.get('href');
            if css_file[0] == '/':
                css_file = css_file[1:]
            else:
                css_file = os.path.dirname(file) + '/' + css_file
            css_files.append(css_file);
            
#print js_files
#print css_files

tmp_file_concated = tempfile.gettempdir()  + '/' + str(uuid.uuid4())
tmp_file_minified = tempfile.gettempdir()  + '/' + str(uuid.uuid4())
tmp_file_compressed = tempfile.gettempdir()  + '/' + str(uuid.uuid4())

command = 'cat ' + (' '.join(js_files)) + ' > ' + tmp_file_concated 
command += ' && java -jar ' + minifier_home_dir + '/yuicompressor-2.4.8.jar --type=js ' + tmp_file_concated + ' -o ' + tmp_file_minified;
if args.compress:
    command += ' && gzip -6 -c ' + tmp_file_minified + ' > ' tmp_file_compressed
else:
    command += ' && cp ' + tmp_file_minified + ' ' + tmp_file_compressed
command += ' && mv ' + tmp_file_compressed + ' ' + args.result_js
command += ' && rm -f ' + tmp_file_concated + ' ' + tmp_file_minified
    

os.system(command)
    
