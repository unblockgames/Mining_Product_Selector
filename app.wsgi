from Mining_Product_Selector import app as application
import sys
sys.path.insert(0, '/var/www/Mining_Product_Selector')

activate_this = '/home/ubuntu/.local/share/virtualenvs/Mining_Product_Selector-QqxnllWR/bin/activate_this.py'

with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))
