import sys, os
from Mining_Product_Selector import app

activate_this = str(os.path.dirname(sys.executable)) + '/activate_this.py'
with open(activate_this) as f:
        code = compile(f.read(), activate_this, 'exec')
        exec(code, dict(__file__=activate_this))

if __name__ == '__main__':
    app.run()
