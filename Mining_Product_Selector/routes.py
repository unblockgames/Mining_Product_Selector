from flask import render_template, request, session, jsonify
from Mining_Product_Selector import app
import mysql.connector
import json
import os


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/log', methods=['POST'])
def log():
    if request.method == 'POST':
        data = json.loads(request.form['data'])
        jsonDump = json.dumps(data, indent=4)
        with open('Mining_Product_Selector/config.json', 'r') as f:
            config = json.load(f)
        cnx = mysql.connector.connect(user=config['Database']['Username'], password=config['Database']['Password'],
                                      host=config['Database']['Host'], database=config['Database']['Database'])
        cursor = cnx.cursor()
        insertStatement = "INSERT INTO events (jsonlog) VALUES ({})"
        testvar = '\'' + jsonDump + '\''
        insertStatement = insertStatement.format(testvar)
        cursor.execute(insertStatement)
        cnx.commit()
    return "Success"
