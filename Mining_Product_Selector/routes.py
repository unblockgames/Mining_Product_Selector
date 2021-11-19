from flask import render_template, request
from Mining_Product_Selector import app
import mysql.connector
import json
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2 import service_account

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

SPREADSHEET_ID = '1z9THVeB4dao6m_ut5JBH0ABgIvytbFJ2EvGLqaoGXZk'


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/log', methods=['POST'])
def log():
    if request.method == 'POST':
        data = json.dumps(json.loads(request.form['data']), indent=4)
        with open('/var/www/Mining_Product_Selector/config.json', 'r') as f:
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


@app.route('/orderCreated', methods=['POST'])
def routeOrderToExcel():
    if request.method == 'POST':
        data = request.json
        if len(data['line_items']) > 0:
            # Send line items to google sheets....
            creds = None
            # The file token.json stores the user's access and refresh tokens, and is
            # created automatically when the authorization flow completes for the first
            # time.
            # if os.path.exists('token.json'):
            #     creds = Credentials.from_authorized_user_file(
            #         'token.json', SCOPES)
            # # If there are no (valid) credentials available, let the user log in.
            # if not creds or not creds.valid:
            #     if creds and creds.expired and creds.refresh_token:
            #         creds.refresh(Request())
            #     else:
            #         flow = InstalledAppFlow.from_client_secrets_file(
            #             '/Users/jasoncasey/Downloads/credentials.json', SCOPES)
            #         creds = flow.run_local_server(port=0)
            #  # Save the credentials for the next run
            #     with open('token.json', 'w') as token:
            #         token.write(creds.to_json())

            # service = build('sheets', 'v4', )
            scopes = ["https://www.googleapis.com/auth/spreadsheets"]
            secret_file = '/var/www/Mining_Product_Selector/client_secret.json'
            credentials = service_account.Credentials.from_service_account_file(
                secret_file, scopes=scopes)
            service = build('sheets', 'v4', credentials=credentials)

            # Call the Sheets API
            sheet = service.spreadsheets()
            spreadsheetData = []
            for item in data['line_items']:
                spreadsheetData.append([data['order_number'], data['created_at'], data['customer']['first_name'], data['customer']['last_name'],
                                        item['name'], item['sku'], item['quantity'], json.dumps(data, indent=4)])
            result = sheet.values().append(spreadsheetId=SPREADSHEET_ID, range='A2',
                                           valueInputOption="USER_ENTERED", body={"values": [[""]]}).execute()
            RANGE = result['updates']['updatedRange']
            result = sheet.values().update(spreadsheetId=SPREADSHEET_ID, range=RANGE,
                                           valueInputOption="USER_ENTERED", body={"values": spreadsheetData}).execute()
        return("Success")
