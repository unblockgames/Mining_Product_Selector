import math


class Breaker():
    def __init__(self, amps, poles):
        self.amps = amps
        self.poles = poles


pdus = [
    {
        'Name': '50A 240V PDU 8x C13',
        'PlugQty': 8,
        'Amps': 40
    },
    {
        'Name': '50A 240V PDU 4x C19',
        'PlugQty': 4,
        'Amps': 40
    },
    {
        'Name': '30A 240V PDU 4x C13',
        'PlugQty': 4,
        'Amps': 24
    },
    {
        'Name': '30A 240V PDU 2x C19',
        'PlugQty': 2,
        'Amps': 24
    }
]
panels = [
    {
        'Name': '20KW 240V ASIC Mining Panel 18x C13',
        'BreakerConfiguration': [{'Name': '2 Pole 50', 'Qty': 3, 'LoadType': 'Miner'}],
        'PanelMaxSinglePhaseAmps': 125,
        'C13PerBreaker': 6,
        'C19PerBreaker': 4,
        'InputVoltage': 240,
        'InputPhase': 1,
        'RecommendedMainBreaker': '2 Pole 125A'
    },
    {
        'Name': '50KW 240V ASIC Mining Panel 42x C13',
        'BreakerConfiguration': [{'Name': '2 Pole 50', 'Qty': 7, 'LoadType': 'Miner'}],
        'PanelMaxSinglePhaseAmps': 276.8,
        'C13PerBreaker': 6,
        'C19PerBreaker': 4,
        'InputVoltage': 208,
        'InputPhase': 3,
        'RecommendedMainBreaker': '3 Pole 225A'
    },
    {
        'Name': '100KW',
        'BreakerConfiguration': [{'Name': '2 Pole 50', 'Qty': '14', 'LoadType': 'Miner'}],
        'PanelMaxSinglePhaseAmps': 553.6,
        'C13PerBreaker': 6,
        'C19PerBreaker': 4,
        'InputVoltage': 208,
        'InputPhase': 3,
        'RecommendedMainBreaker': '3 Pole 400A'
    }
]


def numberOfBreakers(minerWatts, minerQty, breaker, voltage):
    minerAmps = minerWatts / voltage
    minersOnBreaker = math.trunc(breaker.amps / minerAmps)
    return math.ceil(minerQty / minersOnBreaker)


def numberOfCables(minerPlugQty, minerQty):
    return minerPlugQty * minerQty


def calculateOptions(minerPlugQty, minerQty, minerPlugType, minerWatts, voltage):
    cableQty = numberOfCables(minerPlugQty, minerQty)
    minerAmps = minerWatts / voltage
    for pdu in pdus:
        if minerPlugType in pdu['Name']:
            # figure out how many miners can plug in per pdu
            numberOfPdusCablewise = math.ceil(cableQty / pdu['PlugQty'])
            numberOfPdusAmpswise = math.ceil(minerQty /
                                             math.floor(pdu['Amps']/minerAmps))
            if numberOfPdusAmpswise >= numberOfPdusCablewise:
                print("You would need " + str(numberOfPdusAmpswise) +
                      " " + pdu['Name'] + "\nThe limiting factor is amps.")
            else:
                print("You would need " + str(numberOfPdusCablewise) +
                      " " + pdu['Name'] + "\nThe limiting factor is Cables.")

    return
