from flask import Flask
from flask.templating import render_template
app = Flask(__name__)
from Mining_Product_Selector import routes
