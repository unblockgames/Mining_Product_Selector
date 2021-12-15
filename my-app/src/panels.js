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
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/AS02-253120_3000x3000_d116163b-1cf1-428a-b5f9-b1177473663a.jpg?v=1639584605",
    specSheetUrl:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/20KW_140V_ASIC_Mining_Panel_Product_Sheet.pdf?v=1639590852",
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
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/AS05-3532A0_3000x3000_6b2a644a-6dca-4044-8016-3736e1807121.jpg?v=1639588203",
    specSheetUrl:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/50KW_240V_ASIC_Mining_Panel_Product_Sheet_03135993-3b59-4184-af8e-c552f1d69088.pdf?v=1639591826",
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
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/AS05-5532A0_4000x4000_41a51692-df57-4938-a698-db8098977b35.jpg?v=1639588184",
    specSheetUrl:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/50KW_480V_ASIC_Mining_Panels_Product_Sheet_e0b42d6c-fe8c-4cf6-8214-7df7a6677d4d.pdf?v=1639591845",
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
    specSheetUrl:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/100KW_240V_ASIC_Mining_Panel_Product_Sheet.pdf?v=1636412761",
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
    specSheetUrl:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/100KW_480V_ASIC_Mining_Panels_Product_Sheet.pdf?v=1636413454",
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
    specSheetUrl:
      "https://cdn.shopify.com/s/files/1/0246/7178/0939/files/125KW_415V_ASIC_Mining_Panel_84x_C13.pdf?v=1636413971",
  },
];

export function getPanels() {
  return panels;
}

export function getPanel(panelName) {
  return panels.filter((p) => p.name === panelName);
}
