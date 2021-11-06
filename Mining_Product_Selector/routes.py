from flask import render_template, request, session, jsonify
from Mining_Product_Selector import app
import mysql.connector


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/log', methods=['POST'])
def log():
    if request.method == 'POST':
        data = request.form['data']
        cnx = mysql.connector.connect(user='u930668482_jason', password='PsychicVampires504411!',
                                      host='sql567.main-hosting.eu', database='u930668482_calculator')
        cursor = cnx.cursor()
        cursor.execute(
            "INSERT INTO `events` (id,created_at,jsonlog) VALUES (null,null,'" + data + "')")
        cnx.close()

    return "Success"
