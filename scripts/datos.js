require('dotenv').config();
const { Sequelize } = require("sequelize");


const { DB_DATABASE, DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

// Conexión a la base de datos
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

// Importar modelos
const bodyCam = require("../models/bodyCam")(sequelize);
const proveedor=require("../models/proveedor")(sequelize);
const unidad=require("../models/Unidad")(sequelize);
const Jurisdiccion=require("../models/Jurisdiccion")(sequelize);
const horario=require("../models/horario")(sequelize);
const insertData = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");
//     await horario.bulkCreate([
//       {"turno":"MAÑANA"},
//       {"turno":"TARDE"},
//       {"turno":"NOCHE"},
//     ])

// await Jurisdiccion.bulkCreate([
//   {"jurisdiccion":"Zarate"},
//   {"jurisdiccion":"Caja de Agua"},
//   {"jurisdiccion":"La Huayrona"},
//   {"jurisdiccion":"Canto Rey"},
//   {"jurisdiccion":"Santa Elizabeth"},
//   {"jurisdiccion":"Bayovar"},
//   {"jurisdiccion":"Mariscal Caceres"},
//   {"jurisdiccion":"10 de Octubre"},
//   {"jurisdiccion":"Zona baja"},
//   {"jurisdiccion":"Zona alta"},
//   {"jurisdiccion":"Zona norte"},
//   {"jurisdiccion":"Zona sur"},
//   {"jurisdiccion":"Zona centro"},
//   {"jurisdiccion":"Zona libre"},

// ]);
// //     // Sincronizar modelos
// // //     await sequelize.sync({ force: true }); // CUIDADO: Elimina y vuelve a crear tablas
// await unidad.bulkCreate([

// {
//   "numero": "H-1",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1476"
// },
// {
//   "numero": "H-2",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1495"
// },
// {
//   "numero": "H-3",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1513"
// },
// {
//   "numero": "H-4",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1470"
// },
// {
//   "numero": "H-5",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1516"
// },
// {
//   "numero": "H-6",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1490"
// },
// {
//   "numero": "H-8",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1499"
// },
// {
//   "numero": "H-9",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1491"
// },
// {
//   "numero": "H-10",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1480"
// },
// {
//   "numero": "H-11",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1504"
// },
// {
//   "numero": "H-12",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1509"
// },
// {
//   "numero": "H-13",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1457"
// },
// {
//   "numero": "H-14",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1466"
// },
// {
//   "numero": "H-15",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1503"
// },
// {
//   "numero": "H-16",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1508"
// },
// {
//   "numero": "H-17",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1488"
// },
// {
//   "numero": "H-18",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1455"
// },
// {
//   "numero": "H-19",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1506"
// },
// {
//   "numero": "H-20",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1478"
// },
// {
//   "numero": "H-21",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1472"
// },
// {
//   "numero": "H-22",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1517"
// },
// {
//   "numero": "H-24",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1473"
// },
// {
//   "numero": "H-25",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1486"
// },
// {
//   "numero": "H-26",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1497"
// },
// {
//   "numero": "H-27",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1505"
// },
// {
//   "numero": "H-28",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1484"
// },
// {
//   "numero": "H-29",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1454"
// },
// {
//   "numero": "H-30",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1474"
// },
// {
//   "numero": "H-31",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1456"
// },
// {
//   "numero": "H-32",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1471"
// },
// {
//   "numero": "H-33",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1514"
// },
// {
//   "numero": "H-34",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1477"
// },
// {
//   "numero": "H-35",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1489"
// },
// {
//   "numero": "H-36",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1498"
// },
// {
//   "numero": "H-37",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1475"
// },
// {
//   "numero": "H-38",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1458"
// },
// {
//   "numero": "H-39",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1479"
// },
// {
//   "numero": "H-40",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1496"
// },
// {
//   "numero": "H-41",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1512"
// },
// {
//   "numero": "H-42",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1483"
// },
// {
//   "numero": "H-43",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1485"
// },
// {
//   "numero": "H-44",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1492"
// },
// {
//   "numero": "H-45",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1507"
// },
// {
//   "numero": "H-46",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1502"
// },
// {
//   "numero": "H-47",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1515"
// },
// {
//   "numero": "H-48",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1501"
// },
// {
//   "numero": "H-49",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1493"
// },
// {
//   "numero": "H-50",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-1482"
// },
// {
//   "numero": "H-51",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3124"
// },
// {
//   "numero": "H-52",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3125"
// },
// {
//   "numero": "H-53",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3126"
// },
// {
//   "numero": "H-54",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3127"
// },
// {
//   "numero": "H-55",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3128"
// },
// {
//   "numero": "H-56",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3129"
// },
// {
//   "numero": "H-58",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3131"
// },
// {
//   "numero": "H-59",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3132"
// },
// {
//   "numero": "H-60",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3133"
// },
// {
//   "numero": "H-61",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3134"
// },
// {
//   "numero": "H-62",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3135"
// },
// {
//   "numero": "H-63",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3136"
// },
// {
//   "numero": "H-64",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3137"
// },
// {
//   "numero": "H-65",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3138"
// },
// {
//   "numero": "H-66",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3139"
// },
// {
//   "numero": "H-67",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3140"
// },
// {
//   "numero": "H-68",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3141"
// },
// {
//   "numero": "H-69",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3142"
// },
// {
//   "numero": "H-70",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3143"
// },
// {
//   "numero": "H-71",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3144"
// },
// {
//   "numero": "H-72",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3145"
// },
// {
//   "numero": "H-73",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3146"
// },
// {
//   "numero": "H-74",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3147"
// },
// {
//   "numero": "H-75",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3148"
// },
// {
//   "numero": "H-76",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3149"
// },
// {
//   "numero": "H-77",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3150"
// },
// {
//   "numero": "H-78",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3151"
// },
// {
//   "numero": "H-79",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3152"
// },
// {
//   "numero": "H-80",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3153"
// },
// {
//   "numero": "H-81",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3154"
// },
// {
//   "numero": "H-82",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3155"
// },
// {
//   "numero": "H-83",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3156"
// },
// {
//   "numero": "H-84",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3157"
// },
// {
//   "numero": "H-85",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3158"
// },
// {
//   "numero": "H-86",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3159"
// },
// {
//   "numero": "H-87",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3160"
// },
// {
//   "numero": "H-88",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3161"
// },
// {
//   "numero": "H-89",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3162"
// },
// {
//   "numero": "H-90",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3163"
// },
// {
//   "numero": "H-91",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3164"
// },
// {
//   "numero": "H-92",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3165"
// },
// {
//   "numero": "H-93",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3166"
// },
// {
//   "numero": "H-94",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3167"
// },
// {
//   "numero": "H-95",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3170"
// },
// {
//   "numero": "H-96",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3171"
// },
// {
//   "numero": "H-97",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3172"
// },
// {
//   "numero": "H-98",
//   "transporte": "MOTOCICLETA-META",
//   "placa": "EU-3173"
// },
// {
//   "numero": "H-99",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3174"
// },
// {
//   "numero": "H-100",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-3175"
// },
// {
//   "numero": "H-101",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5796"
// },
// {
//   "numero": "H-102",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5683"
// },
// {
//   "numero": "H-103",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5535"
// },
// {
//   "numero": "H-104",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5483"
// },
// {
//   "numero": "H-105",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5817"
// },
// {
//   "numero": "H-106",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5511"
// },
// {
//   "numero": "H-107",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "TMD-0874"
// },
// {
//   "numero": "H-108",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5709"
// },
// {
//   "numero": "H-109",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5752"
// },
// {
//   "numero": "H-110",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5465"
// },
// {
//   "numero": "H-111",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5482"
// },
// {
//   "numero": "H-112",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5816"
// },
// {
//   "numero": "H-113",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5512"
// },
// {
//   "numero": "H-114",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5484"
// },
// {
//   "numero": "H-115",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5818"
// },
// {
//   "numero": "H-116",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5510"
// },
// {
//   "numero": "H-117",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "TMD-0884"
// },
// {
//   "numero": "H-118",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5708"
// },
// {
//   "numero": "H-119",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5751"
// },
// {
//   "numero": "H-120",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5464"
// },
// {
//   "numero": "H-121",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5532"
// },
// {
//   "numero": "H-122",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5717"
// },
// {
//   "numero": "H-123",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5844"
// },
// {
//   "numero": "H-124",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5707"
// },
// {
//   "numero": "H-125",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5750"
// },
// {
//   "numero": "H-126",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5463"
// },
// {
//   "numero": "H-127",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5706"
// },
// {
//   "numero": "H-128",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5749"
// },
// {
//   "numero": "H-129",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5462"
// },
// {
//   "numero": "H-130",
//   "transporte": "MOTOCICLETA-LIBRE",
//   "placa": "EU-5754"
// },

// {
//   "numero": "O-20",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI-372"
// },
// {
//   "numero": "O-21",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-385"
// },
// {
//   "numero": "O-22",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-383"
// },
// {
//   "numero": "O-23",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-379"
// },
// {
//   "numero": "O-24",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-381"
// },
// {
//   "numero": "O-25",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-371"
// },
// {
//   "numero": "O-26",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-382"
// },
// {
//   "numero": "O-27",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-367"
// },
// {
//   "numero": "O-28",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-376"
// },
// {
//   "numero": "O-29",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-386"
// },
// {
//   "numero": "O-30",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI-365"
// },
// {
//   "numero": "O-31",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-361"
// },
// {
//   "numero": "O-32",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-373"
// },
// {
//   "numero": "O-33",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-389"
// },
// {
//   "numero": "O-34",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-359"
// },
// {
//   "numero": "O-35",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-360"
// },
// {
//   "numero": "O-36",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-368"
// },
// {
//   "numero": "O-37",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI-369"
// },
// {
//   "numero": "O-38",
//   "transporte": "CAMIONETA-MAESTRANZA (SINIESTRADO)",
//   "placa": "EUI-356"
// },
// {
//   "numero": "O-39",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-384"
// },
// {
//   "numero": "O-40",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-377"
// },
// {
//   "numero": "O-41",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI-370"
// },
// {
//   "numero": "O-42",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-363"
// },
// {
//   "numero": "O-43",
//   "transporte": "CAMIONETA-OTRA AREA - ALCALDIA",
//   "placa": "EUI-380"
// },
// {
//   "numero": "O-44",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-388"
// },
// {
//   "numero": "O-45",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI-366"
// },
// {
//   "numero": "O-46",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI-357"
// },
// {
//   "numero": "O-47",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI-374"
// },
// {
//   "numero": "O-48",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI-362"
// },
// {
//   "numero": "O-49",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI-387"
// },
// {
//   "numero": "O-50",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 481"
// },
// {
//   "numero": "O-51",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 506"
// },
// {
//   "numero": "O-52",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI 521"
// },
// {
//   "numero": "O-53",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI 480"
// },
// {
//   "numero": "O-54",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 495"
// },
// {
//   "numero": "O-55",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 504"
// },
// {
//   "numero": "O-56",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 508"
// },
// {
//   "numero": "O-57",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 486"
// },
// {
//   "numero": "O-58",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 494"
// },
// {
//   "numero": "O-59",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 472"
// },
// {
//   "numero": "O-60",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 477"
// },
// {
//   "numero": "O-61",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI 520"
// },
// {
//   "numero": "O-62",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 493"
// },
// {
//   "numero": "O-63",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 522"
// },
// {
//   "numero": "O-64",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 505"
// },
// {
//   "numero": "O-65",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 501"
// },
// {
//   "numero": "O-66",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 511"
// },
// {
//   "numero": "O-67",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 478"
// },
// {
//   "numero": "O-68",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI 488"
// },
// {
//   "numero": "O-69",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 538"
// },
// {
//   "numero": "O-70",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 496"
// },
// {
//   "numero": "O-71",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 489"
// },
// {
//   "numero": "O-72",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 537"
// },
// {
//   "numero": "O-73",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 479"
// },
// {
//   "numero": "O-74",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 519"
// },
// {
//   "numero": "O-75",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 535"
// },
// {
//   "numero": "O-76",
//   "transporte": "CAMIONETA-META",
//   "placa": "EUI 470"
// },
// {
//   "numero": "O-77",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 534"
// },
// {
//   "numero": "O-78",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 469"
// },
// {
//   "numero": "O-79",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 500"
// },
// {
//   "numero": "O-80",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 468"
// },
// {
//   "numero": "O-81",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 536"
// },
// {
//   "numero": "O-82",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 492"
// },
// {
//   "numero": "O-83",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 490"
// },
// {
//   "numero": "O-84",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 491"
// },
// {
//   "numero": "O-85",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 539"
// },
// {
//   "numero": "O-86",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 542"
// },
// {
//   "numero": "O-87",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 543"
// },
// {
//   "numero": "O-88",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 547"
// },
// {
//   "numero": "O-89",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 499"
// },
// {
//   "numero": "O-90",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 510"
// },
// {
//   "numero": "O-91",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 476"
// },
// {
//   "numero": "O-92",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 498"
// },
// {
//   "numero": "O-93",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 462"
// },
// {
//   "numero": "O-94",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 485"
// },
// {
//   "numero": "O-95",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 473"
// },
// {
//   "numero": "O-96",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 483"
// },
// {
//   "numero": "O-97",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 482"
// },
// {
//   "numero": "O-98",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 471"
// },
// {
//   "numero": "O-99",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUI 507"
// },
// {
//   "numero": "O-14",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUB-584"
// },
// {
//   "numero": "O-12",
//   "transporte": "CAMIONETA-LIBRE",
//   "placa": "EUB-580"
// }


//  ])
// // //   Insertar datos ficticios en TipoDocumentoComplementario
//     await proveedor.bulkCreate([
//       { modelo: "VM780" ,
//         marca:"HYTERA"}

//     ]);

  //  //Insertar datos ficticios en Infraccion
    await bodyCam.bulkCreate([
        {"numero":"SG036","serie":"21D17A3521","nro_bateria":"21D1704903","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},	
        {"numero":"SG037","serie":"21D17A3522","nro_bateria":"21D1704916","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG038","serie":"21D17A3523","nro_bateria":"21D1704929","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG039","serie":"21D17A3524","nro_bateria":"21D1704918","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG040","serie":"21D17A3525","nro_bateria":"21D1704928","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG041","serie":"21D17A3526","nro_bateria":"21D1704930","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG042","serie":"21D17A3527","nro_bateria":"21D1704897","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG043","serie":"21D17A3528","nro_bateria":"21D1704926","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG044","serie":"21D17A3529","nro_bateria":"21D1704912","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG045","serie":"21D17A3530","nro_bateria":"21D1704911","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG047","serie":"21D17A3551","nro_bateria":"21D1704896","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG048","serie":"21D17A3552","nro_bateria":"21D1704883","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG049","serie":"21D17A3553","nro_bateria":"21D1704887","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG050","serie":"21D17A3554","nro_bateria":"21D1704881","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG051","serie":"21D17A3555","nro_bateria":"21D1704885","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG052","serie":"21D17A3556","nro_bateria":"21D1704888","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG053","serie":"21D17A3557","nro_bateria":"21D1704886","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG054","serie":"21D17A3558","nro_bateria":"21D1704882","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG055","serie":"21D17A3559","nro_bateria":"21D1704894","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG056","serie":"21D17A3560","nro_bateria":"21D1704921","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG067","serie":"23726A0011","nro_bateria":"2372600284","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG068","serie":"23726A0012","nro_bateria":"2372600179","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG069","serie":"23726A0013","nro_bateria":"2372600182","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG070","serie":"23726A0014","nro_bateria":"2372600177","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG071","serie":"23726A0015","nro_bateria":"2372600537","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG072","serie":"23726A0016","nro_bateria":"2372600463","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG073","serie":"23726A0017","nro_bateria":"2372600533","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG074","serie":"23726A0018","nro_bateria":"2372600327","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG075","serie":"23726A0019","nro_bateria":"2372600484","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG076","serie":"23726A0020","nro_bateria":"2372600474","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG004","serie":"20920A0371","nro_bateria":"2092000307","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG116","serie":"23726A0060","nro_bateria":"2372600359","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG001","serie":"19O27A0810","nro_bateria":"2211400582","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG110","serie":"23726A0054","nro_bateria":"2372600491","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG002","serie":"19O27A0812","nro_bateria":"2211400562","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG112","serie":"23726A0056","nro_bateria":"2372600282","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG114","serie":"23726A0058","nro_bateria":"2372600334","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG113","serie":"23726A0057","nro_bateria":"2372600008","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG115","serie":"23726A0059","nro_bateria":"2372600050","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG111","serie":"23726A0055","nro_bateria":"2372600365","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG108","serie":"23726A0052","nro_bateria":"2372600492","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG109","serie":"23726A0053","nro_bateria":"2372600358","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG107","serie":"23726A0051","nro_bateria":"2372600276","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG138","serie":"23726A0082","nro_bateria":"2372600518","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG144","serie":"23726A0088","nro_bateria":"2372600534","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG139","serie":"23726A0083","nro_bateria":"2372600475","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG142","serie":"23726A0086","nro_bateria":"2372600302","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG140","serie":"23726A0084","nro_bateria":"2372600405","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG141","serie":"23726A0085","nro_bateria":"2372600185","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG154","serie":"23726A0098","nro_bateria":"2372600460","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG151","serie":"23726A0095","nro_bateria":"2372600371","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG148","serie":"23726A0092","nro_bateria":"2372600270","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG147","serie":"23726A0091","nro_bateria":"2372600280","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG153","serie":"23726A0097","nro_bateria":"2372600254","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG155","serie":"23726A0099","nro_bateria":"2372600479","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG150","serie":"23726A0094","nro_bateria":"2372600258","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG149","serie":"23726A0093","nro_bateria":"2372600250","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG137","serie":"23726A0081","nro_bateria":"2372600338","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG143","serie":"23726A0087","nro_bateria":"2372600523","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG156","serie":"23726A0100","nro_bateria":"2372600304","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG146","serie":"23726A0090","nro_bateria":"2372600381","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG152","serie":"23726A0096","nro_bateria":"2372600414","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"},		
        {"numero":"SG145","serie":"23726A0089","nro_bateria":"2372600005","id_proveedor":"a4539b9b-a89b-41a7-8d1f-d4c2fd8e9a1b"}		
      
    ]);

    // Insertar datos ficticios
    // . en TipoDocumentoIdentidad
    console.log("Datos insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar datos ficticios:", error.message);
  } finally {
    await sequelize.close();
    console.log("Conexión cerrada.");
  }
};

insertData();