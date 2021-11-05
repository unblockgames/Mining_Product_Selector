from flask import render_template, request, session, jsonify
from Mining_Product_Selector import minerCalc, app


@app.route('/')
def home():
    print("Wrong world")
    return render_template("index.html")


@app.route('/calc', methods=['GET'])
def calc():
    if request.method == 'GET':
        voltage = int(request.args.get('serviceVoltage'))
        minerQty = int(request.args.get('minerQty'))
        minerPlugQty = int(request.args.get('minerPlugQty'))
        minerPlugType = request.args.get('minerPlugType')
        minerWatts = int(request.args.get('minerWatts'))
        serviceAmps = request.args.get('serviceAmpsAvailable')
        if request.args.get('serviceAmpsAvailable') != '':
            servicePhase = int(request.args.get('servicePhase'))
        numberOfBreakers = minerCalc.numberOfBreakers(minerWatts, minerQty,
                                                      breaker=minerCalc.Breaker(50, 2), voltage=208)
    data = {'numberOfFiftyAmpBreakers': numberOfBreakers}
    minerCalc.calculateOptions(
        minerPlugQty, minerQty, minerPlugType, minerWatts, voltage)
    # do some stuff
    return render_template("Calc.html", data=data)
