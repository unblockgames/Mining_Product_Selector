const miners = [
  {
    name: "BitFury B8",
    plugType: "C19",
    plugQty: "2",
    minerWatts: "6400",
  },

  {
    name: "AntMiner D3",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1200",
  },

  {
    name: "AntMiner D5/K5",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1540",
  },

  {
    name: "AntMiner L3+",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "800",
  },

  {
    name: "AntMiner L7",
    plugType: "C13",
    plugQty: "2",
    minerWatts: "3400",
  },

  {
    name: "AntMiner L3++",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1040",
  },
  {
    name: "AntMiner S11/S15",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1540",
  },

  {
    name: "AntMiner S17/S17+",
    plugType: "C13",
    plugQty: "2",
    minerWatts: "3100",
  },

  {
    name: "AntMiner S17 Pro",
    plugType: "C13",
    plugQty: "2",
    minerWatts: "2475",
  },

  {
    name: "AntMiner S19/S19 Pro/S19j/S19k",
    plugType: "C13",
    plugQty: "2",
    minerWatts: "3200",
  },

  {
    name: "AntMiner S9",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1150",
  },

  {
    name: "AntMiner S9 SE",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1250",
  },

  {
    name: "AntMiner S9i",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1340",
  },

  {
    name: "Antminer T9/T15",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1525",
  },

  {
    name: "Antminer T17/T17e",
    plugType: "C13",
    plugQty: "2",
    minerWatts: "3000",
  },

  {
    name: "Antminer T17+",
    plugType: "C13",
    plugQty: "2",
    minerWatts: "3200",
  },

  {
    name: "Antminer Z11",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1420",
  },

  {
    name: "Baikal BK-G28",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1300",
  },

  {
    name: "Baikal Giant X10",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "650",
  },

  {
    name: "Avalon 1047",
    plugType: "C19",
    plugQty: "1",
    minerWatts: "2400",
  },

  {
    name: "Avalon 1066",
    plugType: "C19",
    plugQty: "1",
    minerWatts: "3220",
  },

  {
    name: "Avalon 7",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1140",
  },

  {
    name: "Avalon 921",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1690",
  },

  {
    name: "Dayun Zig Z1",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1200",
  },

  {
    name: "Ebang Ebit E12/E12+",
    plugType: "C19",
    plugQty: "1",
    minerWatts: "2500",
  },

  {
    name: "FusionSillicon X1",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1110",
  },

  {
    name: "FusionSillicon X7",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1400",
  },

  {
    name: "Innosilicon A4",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1040",
  },

  {
    name: "Innosilicon A5/A9+",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1485",
  },

  {
    name: "Innosilicon A9",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "620",
  },

  {
    name: "Innosilicon D9+",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "1220",
  },

  {
    name: "Innosilicon T3 50T-57T",
    plugType: "C19",
    plugQty: "1",
    minerWatts: "3200",
  },

  {
    name: "Innosilicon T3 39T-43T",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "2077",
  },

  {
    name: "Whatsminer M10",
    plugType: "C13",
    plugQty: "1",
    minerWatts: "2120",
  },

  {
    name: "Whatsminer M10S",
    plugType: "C19",
    plugQty: "1",
    minerWatts: "3500",
  },

  {
    name: "Whatsminer M20S/M21S",
    plugType: "C19",
    plugQty: "1",
    minerWatts: "3350",
  },

  {
    name: "Whatsminer M30S/M31S",
    plugType: "C19",
    plugQty: "1",
    minerWatts: "3250",
  },

  {
    name: "StrongU STU-U6",
    plugType: "C19",
    plugQty: "1",
    minerWatts: "2175",
  },
];

export function getMiners() {
  return miners;
}

export function getMiner(name) {
  const miner = miners.filter((m) => m.name === name);
  return miner;
}
