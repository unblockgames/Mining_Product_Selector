import { getPdus } from "./pdus";
const pdus = getPdus();
const panels = [
  {
    name: "20KW_240V_ASIC_Mining_Panel",
    input: { maxVoltage: 240, phase: 1, wire: 2, maxAmps: 125 },
    output: {
      maxVoltage: 240,
      maxAmps: 125,
      continuousAmps: 100,
      continuousSinglePhaseAmps: 100,
      maxSinglePhaseAmps: 125,
      phase: 1,
      wire: 2,
    },
    pdus: [
      {
        name: pdus.filter((p) => p.name === "50A_240V_PDU_Panel")[0].name,
        count: 3,
      },
    ],
    cost: 544.95,
    shopifyId: 28597116960843,
    image:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/AS02-253120_250px.png?v=1636063168",
  },
  {
    name: "50KW_240V_ASIC_Mining_Panel",
    input: { maxVoltage: 240, phase: 3, wire: 4, maxAmps: 200 },
    output: {
      maxVoltage: 240,
      maxAmps: 200,
      continuousAmps: 160,
      continuousSinglePhaseAmps: 277,
      maxSinglePhaseAmps: 346,
      phase: 3,
      wire: 3,
    },
    pdus: [
      {
        name: pdus.filter((p) => p.name === "50A_240V_PDU_Panel")[0].name,
        count: 7,
      },
    ],
    cost: 1894.95,
    shopifyId: 28597452505163,
    image:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/AS05-3532A0_250px.png?v=1636063394",
  },
  {
    name: "50KW_480V_ASIC_Mining_Panel",
    input: { maxVoltage: 480, phase: 3, wire: 3, maxAmps: 90 },
    output: {
      maxVoltage: 240,
      maxAmps: 180,
      continuousAmps: 160,
      continuousSinglePhaseAmps: 277,
      maxSinglePhaseAmps: 346,
      phase: 3,
      wire: 4,
    },
    pdus: [
      {
        name: pdus.filter((p) => p.name === "50A_240V_PDU_Panel")[0].name,
        count: 7,
      },
    ],
    cost: 4195.45,
    shopifyId: 28597459845195,
    image:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/50KW_Industrial_ASIC_Mining_Panel_40X240V_Output_Compressed.png?v=1613718491",
  },
  {
    name: "100KW_240V_ASIC_Mining_Panel",
    input: { maxVoltage: 240, phase: 3, wire: 4, maxAmps: 400 },
    output: {
      maxVoltage: 240,
      maxAmps: 400,
      continuousAmps: 320,
      continuousSinglePhaseAmps: 554,
      maxSinglePhaseAmps: 692,
      phase: 3,
      wire: 4,
    },
    pdus: [
      {
        name: pdus.filter((p) => p.name === "50A_240V_PDU_Panel")[0].name,
        count: 14,
      },
    ],
    cost: 3444.95,
    shopifyId: 28597477343307,
    image:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/AS10-353540_250px.png?v=1636062298",
  },
  {
    name: "100KW_480V_ASIC_Mining_Panel",
    input: { maxVoltage: 480, phase: 3, wire: 3, maxAmps: 200 },
    output: {
      maxVoltage: 240,
      maxAmps: 360,
      continuousAmps: 320,
      continuousSinglePhaseAmps: 554,
      maxSinglePhaseAmps: 692,
      phase: 3,
      wire: 4,
    },
    pdus: [
      {
        name: pdus.filter((p) => p.name === "50A_240V_PDU_Panel")[0].name,
        count: 14,
      },
    ],
    cost: 7795,
    shopifyId: 28597500903499,
    image:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/50KW_Industrial_ASIC_Mining_Panel_40X240V_Output_Compressed.png?v=1613718491",
  },
  {
    name: "100KW_415V_ASIC_Mining_Panel",
    input: { maxVoltage: 415, phase: 3, wire: 4, maxAmps: 225 },
    output: {
      maxVoltage: 415,
      maxAmps: 225,
      continuousAmps: 180,
      continuousSinglePhaseAmps: 479,
      maxSinglePhaseAmps: 599,
      phase: 3,
      wire: 4,
    },
    pdus: [
      {
        name: pdus.filter((p) => p.name === "20A_240V_PDU_Panel")[0].name,
        count: 34,
      },
    ],
    cost: 3295.0,
    shopifyId: 39419804516427,
    image:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/100KW_240V_ASIC_Mining_Panel.png?v=1635193317",
  },
];

export function getPanels() {
  return panels;
}

export function getPanel(panelName) {
  return panels.filter((p) => p.name === panelName);
}
