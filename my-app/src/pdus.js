const pdus = [
  {
    name: "30A_240V_PDU_C13",
    displayName: "30A 240V PDU 4x C13",
    maxAmps: 30,
    plugQty: 4,
    cost: 99.45,
    shopifyId: 3675666350155,
    image:
    "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/PUL6-233040_250px.png?v=1636057887",
  },
  {
    name: "30A_240V_PDU_C19",
    displayName: "30A 240V PDU 2x C19",
    maxAmps: 30,
    plugQty: 2,
    cost: 99.45,
    shopifyId: 6591826460747,
    image:
    "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/PUL6-239020_250px.png?v=1636057888",
  },
  {
    name: "50A_240V_PDU_C13",
    displayName: "50A 240V PDU 8x C13",
    maxAmps: 50,
    plugQty: 8,
    cost: 174.5,
    shopifyId: 3675671330891,
    image:
    "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/PU06-253080_250px.png?v=1636057888",
  },
  {
    name: "50A_240V_PDU_C19",
    displayName: "50A 240V PDU 4x C19",
    maxAmps: 50,
    plugQty: 4,
    cost: 174.5,
    shopifyId: 6608428892235,
    image:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/PU06-259040_250px.png?v=1636058518",
  },
  {
    name: "50A_240V_PDU_Panel",
    displayName: "50A 240V PDU 4x C19",
    maxAmps: 50,
    plugs: { c19: 4, c13: 6 },
    cost: 0,
  },
  {
    name: "20A_240V_PDU_Panel",
    displayName: "",
    maxAmps: 20,
    plugs: { c19: 1, c13: 2 },
    cost: 0,
  },
];

export function getPdus() {
  return pdus;
}
export function getPdu(pdu) {
  return pdus.filter((p) => p.name === pdu)[0];
}
