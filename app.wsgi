import sys, os
sys.path.insert(0, '/var/www/Mining_Product_Selector')

activate_this = str('/home/ubuntu/.local/share/virtualenvs/Mining_Product_Selector-QqxnllWR/bin/activate_this.py')
with open(activate_this) as f:
        code = compile(f.read(), activate_this, 'exec')
        exec(code, dict(__file__=activate_this))
        
from Mining_Product_Selector import app as application