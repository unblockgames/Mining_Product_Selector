from flask import render_template, request
from Mining_Product_Selector import app
import mysql.connector
import json


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/log', methods=['POST'])
def log():
    if request.method == 'POST':
        data = json.dumps(json.loads(request.form['data']), indent=4)
        with open('Mining_Product_Selector/config.json', 'r') as f:
            config = json.load(f)
        cnx = mysql.connector.connect(user=config['Database']['Username'], password=config['Database']['Password'],
                                      host=config['Database']['Host'], database=config['Database']['Database'])
        cursor = cnx.cursor()
        sql = "INSERT INTO events (jsonlog) VALUES ({})"
        data = '\'' + data + '\''
        sql = sql.format(data)
        cursor.execute(sql)
        cnx.commit()
    return "Success"
