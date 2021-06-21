require('./dimensions.js');

let firstQuest = mp.colshapes.newSphere(87.36916, -1955.03662, 20.74652, 1.5, 0);
firstQuest.setVariables({'callBack': 'player:FirstQuest', 'params': [], 'client': 1});

/*
need to add colshapes with start quest	
*/

/*
!!types

0 - hotdog
1 - burgers
2 - clothes shop
3 - weapon
4 - tatu
5 - heardress
6 - masks shop
7 - standart shop

*/
var categories = ["Хотдоги", "Бургеры", "Одежда", "Оружейный магазин", "Тату салон", "Барбершоп", "Магазин масок", "Продуктовый магазин", "Тюнинг"]
/*
subcategoty
	
0 - Suburban
1 - Ponsonbys
2 - Binco
3 - Discount
*/
var subcategory = ["Магазин одежды", "Магазин премиальной одежды", "Магазин одежды", "Магазин одежды"];

var businesses = [
  {
    "name": "Хотдоги 1",
    "category": 0,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1249.16614,
    "y": -1474.50293,
    "z": 4.28249,
    "heading": -54.71,
    "x2": -1247.4342,
    "y2": -1473.27087,
    "z2": 4.25938
  },
  {
    "name": "Хотдоги 2",
    "category": 0,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1219.79272,
    "y": -1504.12903,
    "z": 4.36026,
    "heading": 102.88,
    "x2": -1222.46777,
    "y2": -1504.50122,
    "z2": 4.3433
  },
  {
    "name": "Бургеры 1",
    "category": 1,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1232.56921,
    "y": -1484.7749,
    "z": 4.36259,
    "heading": 143.18,
    "x2": -1234.22229,
    "y2": -1486.90161,
    "z2": 4.36091
  },
  {
    "name": "Бургеры 2",
    "category": 1,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1268.14441,
    "y": -1432.83618,
    "z": 4.35358,
    "heading": 145.44,
    "x2": -1269.63525,
    "y2": -1434.97742,
    "z2": 4.38008
  },
  {
    "name": "Тату салон на пляже",
    "category": 4,
    "price": 95000,
    "id": "u_m_y_tattoo_01",
    "x": -1152.04968,
    "y": -1426.02087,
    "z": 4.95446,
    "heading": 78.87,
    "x2": -1153.57373,
    "y2": -1425.76514,
    "z2": 4.95446
  },
  {
    "name": "Хотдоги 3",
    "category": 0,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1516.47717,
    "y": -952.38409,
    "z": 9.29763,
    "heading": -41.23,
    "x2": -1514.68127,
    "y2": -950.4112,
    "z2": 9.32349
  },
  {
    "name": "Suburban 1",
    "category": 2,
    "subcategoty": 0,
    "price": 100000,
    "id": "a_f_y_hipster_02",
    "x": -1195.05542,
    "y": -767.04218,
    "z": 17.31506,
    "heading": -143.26,
    "x2": -1193.41724,
    "y2": -768.80627,
    "z2": 17.31942
  },
  {
    "name": "Бургеры 3",
    "category": 1,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1693.49597,
    "y": -1072.94446,
    "z": 13.01737,
    "heading": 49.38,
    "x2": -1695.55371,
    "y2": -1071.37134,
    "z2": 13.11502
  },
  {
    "name": "Хотдоги 4",
    "category": 0,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1719.91235,
    "y": -1104.21362,
    "z": 13.04772,
    "heading": 39.47,
    "x2": -1721.3092,
    "y2": -1102.09436,
    "z2": 13.06761
  },
  {
    "name": "Хотдоги 5",
    "category": 0,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1771.70703,
    "y": -1160.89783,
    "z": 13.01806,
    "heading": 52.78,
    "x2": -1773.28711,
    "y2": -1159.32104,
    "z2": 13.01808
  },
  {
    "name": "Бургеры 4",
    "category": 1,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1784.51013,
    "y": -1175.92566,
    "z": 13.01773,
    "heading": 50.97,
    "x2": -1786.37622,
    "y2": -1174.34741,
    "z2": 13.01767
  },
  {
    "name": "Бургеры 5",
    "category": 1,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1856.8009,
    "y": -1224.68335,
    "z": 13.01721,
    "heading": -41.67,
    "x2": -1855.16785,
    "y2": -1222.85632,
    "z2": 13.01723
  },
  {
    "name": "Хотдоги 6",
    "category": 0,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1835.07764,
    "y": -1234.1333,
    "z": 13.01729,
    "heading": 35.13,
    "x2": -1836.27991,
    "y2": -1232.21985,
    "z2": 13.01729
  },
  {
    "name": "Бургеры 6",
    "category": 1,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1691.9884,
    "y": -1136.21008,
    "z": 13.15082,
    "heading": -1.78,
    "x2": -1692.43408,
    "y2": -1133.88831,
    "z2": 13.15243
  },
  {
    "name": "Хотдоги 7",
    "category": 0,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1682.77808,
    "y": -1124.02332,
    "z": 13.15217,
    "heading": 111.39,
    "x2": -1685.27405,
    "y2": -1124.78918,
    "z2": 13.15216
  },
  {
    "name": "Хотдоги 8",
    "category": 0,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1630.19141,
    "y": -1075.53955,
    "z": 13.06845,
    "heading": -178.15,
    "x2": -1630.4574,
    "y2": -1077.97107,
    "z2": 13.05102
  },
  {
    "name": "Хотдоги 9",
    "category": 0,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": -1638.4259,
    "y": -1082.85083,
    "z": 13.08203,
    "heading": -126.72,
    "x2": -1636.44739,
    "y2": -1084.68494,
    "z2": 13.05386
  },
  {
    "name": "Ponsonbys на кугар-авеню",
    "category": 2,
    "subcategoty": 1,
    "price": 150000,
    "id": "a_f_y_business_01",
    "x": -1448.69458,
    "y": -237.99338,
    "z": 49.79501,
    "heading": 60.55,
    "x2": -1450.75183,
    "y2": -237.25414,
    "z2": 49.80973
  },
  {
    "name": "Binco на паломино-авеню",
    "category": 2,
    "subcategoty": 2,
    "price": 75000,
    "id": "a_f_y_hipster_02",
    "x": -823.09711,
    "y": -1072.06262,
    "z": 11.32757,
    "heading": -147.61,
    "x2": -822.01733,
    "y2": -1073.82581,
    "z2": 11.3281
  },
  {
    "name": "Bob mulet",
    "category": 5,
    "price": 150000,
    "id": "s_m_m_hairdress_01",
    "x": -813.16003,
    "y": -183.00603,
    "z": 37.56892,
    "heading": 93.38,
    "x2": -815.06311,
    "y2": -183.45712,
    "z2": 37.56892
  },
  {
    "name": "Ponsonbys на портола-драйв",
    "category": 2,
    "subcategoty": 1,
    "price": 150000,
    "id": "a_f_y_business_01",
    "x": -708.77704,
    "y": -151.5807,
    "z": 37.41508,
    "heading": 120.77,
    "x2": -710.40521,
    "y2": -153.25702,
    "z2": 37.41512
  },
  {
    "name": "Ponsonbys на бульвар лас-лагунас",
    "category": 2,
    "subcategoty": 1,
    "price": 150000,
    "id": "a_f_y_business_01",
    "x": -165.27864,
    "y": -302.82574,
    "z": 39.73323,
    "heading": -107.9,
    "x2": -162.92903,
    "y2": -303.06699,
    "z2": 39.73327
  },
  {
    "name": "Парикмахерская на хавик-авеню",
    "category": 5,
    "price": 75000,
    "id": "a_f_y_hipster_02",
    "x": -34.9952,
    "y": -154.99937,
    "z": 57.07654,
    "heading": -30.81,
    "x2": -33.5399,
    "y2": -153.34576,
    "z2": 57.07653
  },
  {
    "name": "Suburban на хавик-авеню",
    "category": 2,
    "subcategoty": 0,
    "price": 80000,
    "id": "a_f_y_hipster_02",
    "x": 127.02856,
    "y": -225.3602,
    "z": 54.55788,
    "heading": 75.16,
    "x2": 124.81161,
    "y2": -224.65071,
    "z2": 54.55787
  },
  {
    "name": "Blazing tattoo на бульвар вайнвуд",
    "category": 4,
    "price": 80000,
    "id": "u_m_y_tattoo_01",
    "x": 321.26843,
    "y": 182.34993,
    "z": 103.58658,
    "heading": -143.5,
    "x2": 322.20331,
    "y2": 181.12799,
    "z2": 103.58659
  },
  {
    "name": "Herr kutz на бульвар миррор-парк",
    "category": 5,
    "price": 80000,
    "id": "a_f_y_hipster_02",
    "x": 1215.28882,
    "y": -474.80795,
    "z": 66.20802,
    "heading": 48.22,
    "x2": 1213.6488,
    "y2": -473.29398,
    "z2": 66.20809
  },
  {
    "name": "Binco на синнерс-пэсседж",
    "category": 2,
    "subcategoty": 2,
    "price": 75000,
    "id": "a_f_y_eastsa_03",
    "x": 427.21725,
    "y": -806.46167,
    "z": 29.49089,
    "heading": 89.64,
    "x2": 424.98358,
    "y2": -806.90967,
    "z2": 29.49113
  },
  {
    "name": "Discount на бульвар инносенс",
    "category": 2,
    "subcategoty": 3,
    "price": 75000,
    "id": "a_f_y_eastsa_03",
    "x": 73.71014,
    "y": -1392.83459,
    "z": 29.37614,
    "heading": -86.73,
    "x2": 75.89048,
    "y2": -1392.44104,
    "z2": 29.37614
  },
  {
    "name": "Herr kutz на карсон-авеню",
    "category": 5,
    "price": 75000,
    "id": "a_f_y_hipster_02",
    "x": 139.63506,
    "y": -1706.46228,
    "z": 29.29223,
    "heading": 108.04,
    "x2": 137.85893,
    "y2": -1707.09277,
    "z2": 29.29163
  },
  {
    "name": "Blazing tattoo на бульвар инносенс",
    "category": 4,
    "price": 75000,
    "id": "u_m_y_tattoo_01",
    "x": 1325.02393,
    "y": -1652.22632,
    "z": 52.2756,
    "heading": 86.96,
    "x2": 1323.10486,
    "y2": -1652.44214,
    "z2": 52.27531
  },
  {
    "name": "Тату на пляже",
    "category": 4,
    "price": 76666,
    "id": "u_m_y_tattoo_01",
    "x": -1280.02673,
    "y": -1118.18726,
    "z": 6.99023,
    "heading": 64.6,
    "x2": -1281.5498,
    "y2": -1117.53235,
    "z2": 6.99012
  },
  {
    "name": "Магазин оружия на бульвар морнингвуд",
    "category": 3,
    "price": 150000,
    "id": "s_m_y_ammucity_01",
    "x": -1303.55676,
    "y": -394.64349,
    "z": 36.69577,
    "heading": 74.42,
    "x2": -1305.92273,
    "y2": -394.3743,
    "z2": 36.69577
  },
  {
    "name": "Магазин еды на просперити-стрит",
    "category": 7,
    "price": 75000,
    "id": "a_m_m_indian_01",
    "x": -1486.46851,
    "y": -377.18326,
    "z": 40.16364,
    "heading": 136.7,
    "x2": -1487.60974,
    "y2": -379.22137,
    "z2": 40.16343
  },
  {
    "name": "Магазин еды на сан-андреас-авеню",
    "category": 7,
    "price": 75000,
    "id": "a_m_m_indian_01",
    "x": -1221.32214,
    "y": -908.27917,
    "z": 12.32646,
    "heading": 36.7,
    "x2": -1222.97888,
    "y2": -906.6261,
    "z2": 12.32646
  },
  {
    "name": "Магазин еды на паломино-авеню",
    "category": 7,
    "price": 75000,
    "id": "a_m_m_indian_01",
    "x": -705.46631,
    "y": -914.73602,
    "z": 19.2156,
    "heading": 91.58,
    "x2": -707.95959,
    "y2": -914.54712,
    "z2": 19.21559
  },
  {
    "name": "Магазин оружия на паломина авеню ",
    "category": 3,
    "price": 150000,
    "id": "s_m_y_ammucity_01",
    "x": -662.72797,
    "y": -933.12903,
    "z": 21.82923,
    "heading": -179.76,
    "x2": -662.65143,
    "y2": -935.23364,
    "z2": 21.82921
  },
  {
    "name": "Магазин оружия на спэниш-авеню",
    "category": 3,
    "price": 150000,
    "id": "s_m_y_ammucity_01",
    "x": 254.12929,
    "y": -50.52563,
    "z": 69.94107,
    "heading": 68.41,
    "x2": 252.01332,
    "y2": -49.95927,
    "z2": 69.94106
  },
  {
    "name": "Магазин еды на клинтон-авеню",
    "category": 7,
    "price": 75000,
    "id": "a_m_m_indian_01",
    "x": 372.91501,
    "y": 328.17792,
    "z": 103.56637,
    "heading": -108.71,
    "x2": 374.64496,
    "y2": 327.78418,
    "z2": 103.56638
  },
  {
    "name": "Хотдоги 10",
    "category": 0,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": 240.86362,
    "y": 167.12939,
    "z": 105.05949,
    "heading": 168.66,
    "x2": 240.0675,
    "y2": 164.70566,
    "z2": 105.05975
  },
  {
    "name": "Бургеры 7",
    "category": 1,
    "price": 50000,
    "id": "u_m_y_burgerdrug_01",
    "x": 245.74109,
    "y": 162.04276,
    "z": 104.95367,
    "heading": 5.19,
    "x2": 245.6611,
    "y2": 164.37573,
    "z2": 104.96863
  },
  {
    "name": "Магазин оружия на Элгин-авеню",
    "category": 3,
    "price": 150000,
    "id": "s_m_y_ammucity_01",
    "x": 23.02,
    "y": -1105.25586,
    "z": 29.797,
    "heading": 146.96,
    "x2": 21.9423,
    "y2": -1107.46277,
    "z2": 29.797
  },
  {
    "name": "Магазин еды на бульвар инносенс",
    "category": 7,
    "price": 75000,
    "id": "a_m_m_indian_01",
    "x": 24.2172,
    "y": -1345.58594,
    "z": 29.49703,
    "heading": -89.89,
    "x2": 26.27586,
    "y2": -1345.5083,
    "z2": 29.49703
  },
  {
    "name": "Магазин еды на вест-миррор-драйв",
    "category": 7,
    "price": 70000,
    "id": "a_m_m_indian_01",
    "x": 1165.38428,
    "y": -323.56311,
    "z": 69.20511,
    "heading": 101.76,
    "x2": 1162.91174,
    "y2": -323.96542,
    "z2": 69.20505
  },
  {
    "name": "Магазин еды на бульвар эль-ранчо",
    "category": 7,
    "price": 75000,
    "id": "a_m_m_indian_01",
    "x": 1133.88098,
    "y": -983.13928,
    "z": 46.41586,
    "heading": -80.95,
    "x2": 1136.01599,
    "y2": -982.21832,
    "z2": 46.41579
  },
  {
    "name": "Магазин оружия на шоссе олимпик",
    "category": 3,
    "price": 150000,
    "id": "s_m_y_ammucity_01",
    "x": 842.46069,
    "y": -1035.76245,
    "z": 28.19487,
    "heading": 2.78,
    "x2": 842.41205,
    "y2": -1033.5498,
    "z2": 28.19484
  },
  {
    "name": "Магазин оружия на попьюлар-стрит",
    "category": 3,
    "price": 150000,
    "id": "s_m_y_ammucity_01",
    "x": 810.14587,
    "y": -2159.36377,
    "z": 29.61901,
    "heading": -0.14,
    "x2": 810.17169,
    "y2": -2157.0144,
    "z2": 29.61899
  },
  {
    "name": "Магазин еды на шоссе паломино",
    "category": 7,
    "price": 75000,
    "id": "a_m_m_indian_01",
    "x": 2555.44946,
    "y": 380.66788,
    "z": 108.62296,
    "heading": -3.76,
    "x2": 2555.44775,
    "y2": 382.59296,
    "z2": 108.62304
  },
  {
    "name": "Магазин еды на шоссе сенора",
    "category": 7,
    "price": 70000,
    "id": "a_m_m_indian_01",
    "x": 2676.47754,
    "y": 3280.1106,
    "z": 55.24113,
    "heading": -29.38,
    "x2": 2677.39429,
    "y2": 3281.93774,
    "z2": 55.24113
  },
  {
    "name": "Binco на грейпсид-мэйн-стрит",
    "category": 2,
    "subcategoty": 2,
    "price": 70000,
    "id": "a_f_y_eastsa_03",
    "x": 1695.5542,
    "y": 4823.01025,
    "z": 42.06311,
    "heading": 97.08,
    "x2": 1693.20728,
    "y2": 4822.64014,
    "z2": 42.06307
  },
  {
    "name": "Магазин еды на грейпсид-мэйн-стрит",
    "category": 7,
    "price": 75000,
    "id": "a_m_m_indian_01",
    "x": 1697.00586,
    "y": 4922.98926,
    "z": 42.06369,
    "heading": -35.36,
    "x2": 1698.33069,
    "y2": 4925.08887,
    "z2": 42.06363
  },
  {
    "name": "Магазин еды на шоссе сенора",
    "category": 7,
    "price": 75000,
    "id": "a_m_m_indian_01",
    "x": 1728.3429,
    "y": 6416.77832,
    "z": 35.03722,
    "heading": -116.26,
    "x2": 1730.28113,
    "y2": 6415.98193,
    "z2": 35.03728
  },
  {
    "name": "Магазин еды на бэнхэм-кэньон-драйв",
    "category": 7,
    "price": 70000,
    "id": "a_m_m_indian_01",
    "x": -1819.17432,
    "y": 793.7558,
    "z": 138.07632,
    "heading": 133.53,
    "x2": -1820.78748,
    "y2": 792.29376,
    "z2": 138.11194
  },
  {
    "name": "Магазин оружия на барбарено-роуд",
    "category": 3,
    "price": 150000,
    "id": "s_m_y_ammucity_01",
    "x": -3173.90942,
    "y": 1088.77368,
    "z": 20.83874,
    "heading": -114.41,
    "x2": -3171.59155,
    "y2": 1087.55884,
    "z2": 20.83875
  },
  {
    "name": "Тату на барбарено-роуд",
    "category": 4,
    "price": 75000,
    "id": "u_m_y_tattoo_01",
    "x": -3171.70166,
    "y": 1074.74292,
    "z": 20.82919,
    "heading": -70.22,
    "x2": -3170.2417,
    "y2": 1075.30762,
    "z2": 20.82918
  },
  {
    "name": "Suburban на шоссе-грейт-оушн",
    "category": 2,
    "subcategoty": 0,
    "price": 75000,
    "id": "a_f_y_hipster_02",
    "x": -3169.51074,
    "y": 1042.33228,
    "z": 20.86324,
    "heading": 67.58,
    "x2": -3171.55225,
    "y2": 1043.17419,
    "z2": 20.8632
  },
  {
    "name": "Магазин еды на барбарено-роуд",
    "category": 7,
    "price": 70000,
    "id": "a_m_m_indian_01",
    "x": -3244.00854,
    "y": 999.98566,
    "z": 12.83071,
    "heading": -5.93,
    "x2": -3243.83472,
    "y2": 1002.02747,
    "z2": 12.83071
  },
  {
    "name": "Магазин еды на шоссе грейт-оушн",
    "category": 7,
    "price": 75000,
    "id": "a_m_m_indian_01",
    "x": -2965.69458,
    "y": 391.56979,
    "z": 15.04331,
    "heading": 89.43,
    "x2": -2968.17993,
    "y2": 391.22583,
    "z2": 15.0433
  },
  {
    "name": "Магазин еды на инесено-роуд",
    "category": 7,
    "price": 75000,
    "id": "a_m_m_indian_01",
    "x": -3040.4729,
    "y": 583.82361,
    "z": 7.90893,
    "heading": 19.47,
    "x2": -3041.17627,
    "y2": 585.74048,
    "z2": 7.90893
  },
  {
    "name": "Магазин оружия на шоссе 68",
    "category": 3,
    "price": 150000,
    "id": "s_m_y_ammucity_01",
    "x": -1119.32434,
    "y": 2699.93896,
    "z": 18.55415,
    "heading": -140.95,
    "x2": -1117.53479,
    "y2": 2698.15503,
    "z2": 18.55413
  },
  {
    "name": "Discount на шоссе 68",
    "category": 2,
    "subcategoty": 3,
    "price": 70000,
    "id": "a_f_y_eastsa_03",
    "x": -1102.56628,
    "y": 2711.86279,
    "z": 19.10786,
    "heading": -137.1,
    "x2": -1100.85669,
    "y2": 2710.20654,
    "z2": 19.10784
  },
  {
    "name": "Магазин оружия на шоссе грейт-оушн 2",
    "category": 3,
    "price": 150000,
    "id": "s_m_y_ammucity_01",
    "x": -331.93985,
    "y": 6085.22803,
    "z": 31.45476,
    "heading": -136.42,
    "x2": -330.17557,
    "y2": 6083.56201,
    "z2": 31.45476
  },
  {
    "name": "Тату на дулуоз-авеню",
    "category": 4,
    "price": 70000,
    "id": "u_m_y_tattoo_01",
    "x": -292.47104,
    "y": 6200.63721,
    "z": 31.48712,
    "heading": 98.34,
    "x2": -294.42795,
    "y2": 6199.9209,
    "z2": 31.48817
  },
  {
    "name": "Парикмахерская на дулуоз-авеню",
    "category": 5,
    "price": 70000,
    "id": "a_f_y_hipster_02",
    "x": -276.90265,
    "y": 6225.1123,
    "z": 31.69554,
    "heading": 17.06,
    "x2": -277.25842,
    "y2": 6227.07227,
    "z2": 31.69554
  },
  {
    "name": "Discount на бульвар палето",
    "category": 2,
    "subcategoty": 3,
    "price": 75000,
    "id": "a_f_y_eastsa_03",
    "x": 5.91101,
    "y": 6511.21289,
    "z": 31.87786,
    "heading": 42.82,
    "x2": 4.28964,
    "y2": 6512.58398,
    "z2": 31.87785
  },
  {
    "name": "Магазин еды на ниланд-авеню",
    "category": 7,
    "price": 75000,
    "id": "ig_mrk",
    "x": 1958.99536,
    "y": 3741.4126,
    "z": 32.34374,
    "heading": -61.59,
    "x2": 1960.6499,
    "y2": 3742.40381,
    "z2": 32.34373
  },
  {
    "name": "Парикмахерская ниланд-авеню",
    "category": 5,
    "price": 75000,
    "id": "a_f_y_hipster_02",
    "x": 1931.15308,
    "y": 3733.50757,
    "z": 32.84451,
    "heading": -176.48,
    "x2": 1931.27063,
    "y2": 3732.04761,
    "z2": 32.84447
  },
  {
    "name": "Тату на занкудо-авеню",
    "category": 4,
    "price": 75000,
    "id": "u_m_y_tattoo_01",
    "x": 1862.91846,
    "y": 3746.94678,
    "z": 33.03191,
    "heading": -33.32,
    "x2": 1863.55762,
    "y2": 3748.1123,
    "z2": 33.03189
  },
  {
    "name": "Магазин оружия на бульвар алгонквин",
    "category": 3,
    "price": 150000,
    "id": "s_m_y_ammucity_01",
    "x": 1691.95459,
    "y": 3761.14746,
    "z": 34.70534,
    "heading": -134.15,
    "x2": 1693.58765,
    "y2": 3759.69873,
    "z2": 34.70532
  },
  {
    "name": "Discounter на шоссе 68 (2)",
    "category": 2,
    "subcategoty": 3,
    "price": 75000,
    "id": "a_f_y_eastsa_03",
    "x": 1196.65686,
    "y": 2711.854,
    "z": 38.22266,
    "heading": -179.46,
    "x2": 1196.75781,
    "y2": 2709.87476,
    "z2": 38.22263
  },
  {
    "name": "Магазин еды на шоссе 68 (2)",
    "category": 7,
    "price": 75000,
    "id": "ig_mrk",
    "x": 1165.25134,
    "y": 2711.4978,
    "z": 38.15772,
    "heading": -178.08,
    "x2": 1165.51086,
    "y2": 2709.05591,
    "z2": 38.1577
  },
  {
    "name": "Suburban на шоссе 68",
    "category": 2,
    "subcategoty": 0,
    "price": 76666,
    "id": "a_f_y_eastsa_03",
    "x": 612.59418,
    "y": 2761.79907,
    "z": 42.08812,
    "heading": -84.37,
    "x2": 614.61615,
    "y2": 2762.00854,
    "z2": 42.08809
  },
  {
    "name": "Магазин еды на шоссе 68 (3)",
    "category": 7,
    "price": 80000,
    "id": "ig_mrk",
    "x": 549.58887,
    "y": 2669.66284,
    "z": 42.15649,
    "heading": 99.56,
    "x2": 547.88916,
    "y2": 2669.44067,
    "z2": 42.15652
  },
  {
    "name": "Магазин еды на дэвис авеню",
    "category": 7,
    "price": 80000,
    "id": "ig_mrk",
    "x": -47.12994,
    "y": -1758.82568,
    "z": 29.42101,
    "heading": 48.71,
    "x2": -48.80756,
    "y2": -1757.5592,
    "z2": 29.42099
  }
]; 

mp.events.add('getAllPeds', (player) => {
	var NeedPeds = [];
	for(let i = 0; i < businesses.length; i++){
		if(businesses[i].heading !== undefined)	NeedPeds.push({id: businesses[i].id, x: businesses[i].x, y: businesses[i].y, z: businesses[i].z, heading: businesses[i].heading});
	}
	NeedPeds.push({x: 454.2329406738281, y: -980.0640869140625, z: 30.689594268798828, heading: 89.67402648925781, id: "mp_s_m_armoured_01"})
	NeedPeds.push({x: 261.9908752441406, y: -1346.6861572265625, z: 24.537809371948242, heading: -16.86746597290039, id: "s_m_m_doctor_01"});
	NeedPeds.push({x: 262.1753845214844, y: -1359.6632080078125, z: 24.53780746459961, heading: 46.381351470947266, id: "s_m_m_paramedic_01"});
	player.call('CreateNewPeds', [JSON.stringify(NeedPeds)]);
});

var BlipsAndBusiness = { 2: 73, 4: 75, 5: 71, 3: 110, 7: 52, 8: 72},
	ColshapesInBusiness = {
	0: {'callBack': 'easyBuyBrowser', 'client': 1},
	1: {'callBack': 'easyBuyBrowser', 'client': 1},
	2: {'callBack': 'clothesShop', 'client': 0},
	3: {'callBack': 'weaponShop:open', 'client': 1},
	4: {'callBack': 'dontWorking', 'client': 1},
	5: {'callBack': 'dontWorking', 'client': 1},
	6: {'callBack': 'dontWorking', 'client': 1},
	7: {'callBack': 'playerEnterTheShop', 'client': 1},
	8: {'callBack': 'tunning:enterShop', 'client': 0}
};

let tunning_bis = [
	{x: 731.4427490234375, y: -1088.8388671875, z: 22.16901397705078, category: 8, heading: -88.81949615478516, name: 1},
	{x: -339.6382751464844, y: -137.36573791503906, z: 39.009666442871094, category: 8, heading: -108.2885971069336, name: 2},
	{x: -1155.645751953125, y: -2005.5780029296875, z: 13.180253982543945, category: 8, heading: 138.74786376953125, name: 3},
	{x: 1175.1234130859375, y: 2640.027099609375, z: 37.75382614135742, category: 8, heading: -177.69097900390625, name: 4},
	{x: 110.62012481689453, y: 6626.2841796875, z: 31.787229537963867, category: 8, heading: 44.12389373779297, name: 5},
]
for(let i=0; i<tunning_bis.length; i++)
	businesses.push(tunning_bis[i]);

let bad_count = 0;
let cool_count = 0;
for(let i = 0; i < businesses.length; i++){
	let labelName;
	if(businesses[i].category == 2)
		labelName = subcategory[businesses[i].subcategoty];
	else 
		labelName = categories[businesses[i].category];
	mp.labels.new(labelName, new mp.Vector3(businesses[i].x2, businesses[i].y2, businesses[i].z2 + 0.5), 
	{
		dismension: 0,
		los: true,
		font: 0,
		drawDistance: 10,
	});
	let bisCol;
	if(businesses[i].category == 8){
		mp.markers.new(1, new mp.Vector3(businesses[i].x, businesses[i].y, businesses[i].z - 2), 3, 
		{
			color: [273,60,100, 125],
			dimension: 0,
		});
		bisCol = mp.colshapes.newSphere(businesses[i].x, businesses[i].y, businesses[i].z, 1.5, 0);
	}else{
		mp.markers.new(20, new mp.Vector3(businesses[i].x2, businesses[i].y2, businesses[i].z2 - 0.3), 1.5, 
		{
			rotation: new mp.Vector3(0, 180, 0),
			color: [273,60,100, 125],
			dimension: 0,
		});
		bisCol = mp.colshapes.newSphere(businesses[i].x2, businesses[i].y2, businesses[i].z2, 1.5, 0);
	}
	let bisVariables = ColshapesInBusiness[businesses[i].category];
	if(businesses[i].category == 7 || businesses[i].category == 3)
		bisVariables.params = [{x: businesses[i].x, y: businesses[i].y, z: businesses[i].z, heading: businesses[i].heading, id: businesses[i].id}, i];
	else
		if(businesses[i].category == 0 || businesses[i].category == 1)
			//FIX idnt like it//
			if(businesses[i].category == 0)
				bisVariables.params = ["Продавец хот-догов", "Привет! Хотите хот-дог? Всего 65$! Оплата наличными.", "Покупаю", 65, 78, i, {x: businesses[i].x, y: businesses[i].y, z: businesses[i].z, heading: businesses[i].heading, id: businesses[i].id}];
			else
				bisVariables.params = ["Продавец бургеров", "Привет! Хотите горячий бургер? Всего 65$! Оплата наличными.", "Покупаю", 65, 77, i, {x: businesses[i].x, y: businesses[i].y, z: businesses[i].z, heading: businesses[i].heading, id: businesses[i].id}];

		else
			if(businesses[i].category == 2)
				bisVariables.params = [(businesses[i].subcategoty === 1 ? 1 : 0), (businesses[i].subcategoty === 1 ? cool_count: bad_count)];
	if(businesses[i].category == 8)
		bisVariables.params = [businesses[i].name];
	if(businesses[i].category == 2 && businesses[i].subcategoty === 1)
		cool_count++;
	else if(businesses[i].category == 2)
		bad_count++;
	bisCol.setVariables(bisVariables);
	if(Object.keys(BlipsAndBusiness).indexOf(businesses[i].category.toString()) !== -1){
		if(businesses[i].category === 8){
			mp.blips.new(BlipsAndBusiness[businesses[i].category.toString()], new mp.Vector3(businesses[i].x, businesses[i].y, businesses[i].z), {
				dimension: 0,
				color: 4,
				name: labelName,
				shortRange: true,
			});
		} else {
			mp.blips.new(BlipsAndBusiness[businesses[i].category.toString()], new mp.Vector3(businesses[i].x2, businesses[i].y2, businesses[i].z2), {
				dimension: 0,
				color: 4,
				name: labelName,
				shortRange: true,
			});
		}
	}
}

let electricity = require('../../configs/create_places/electricity.json');
electricity.forEach((item, id) =>{
	let position = new mp.Vector3(item.x, item.y, item.z - 1);
	let name = item.name;
	mp.blips.new(354, position, {
		name: name,
		color: 46,
		scale: 1,
		shortRange: true,
		dimension: 0,
	});
	
	mp.markers.new(1, position, 1, {
		color: [255, 255, 255, 100],
		visible: true,
		dimension: 0,
		bobUpAndDown: true
	});
	position.z += 1.5; 
	mp.labels.new(name, position, {
		los: true,
		font: 0,
		drawDistance: 5,
		color: [255,255,255,255],
		dimension: 0
	});	
});

let stupidPoints = require('../../configs/create_places/stupid_points.json');
stupidPoints.forEach((item, id) =>{
	let position = new mp.Vector3(item.x, item.y, item.z - 1);
	let name = item.name;
	mp.blips.new(1, position, {
		name: name,
		color: 50,
		scale: 1,
		shortRange: true,
		dimension: 0,
	});
	
	mp.markers.new(1, position, 1, {
		color: [255, 255, 255, 100],
		visible: true,
		dimension: 0,
		bobUpAndDown: true
	});
	position.z += 1.5; 
	mp.labels.new(name, position, {
		los: true,
		font: 0,
		drawDistance: 5,
		color: [255,255,255,255],
		dimension: 0
	});	
});

let atms = require('../../configs/create_places/atm.json');
atms.forEach((item, id) =>{
	let [x,y,z] = item;
	let position = new mp.Vector3(x, y, z);
	let name = "Банкомат"
	
	let colshape = mp.colshapes.newSphere(x, y, z, 1);
	colshape.setVariables({'callBack': 'bank:open', 'params': [], 'client': 1});
	mp.blips.new(108, position, {
		name: name,
		color: 2,
		scale: 0.7,
		shortRange: true,
		dimension: 0,
	});
	
	mp.markers.new(29, position, 1, {
		color: [0, 150, 136, 150],
		visible: true,
		dimension: 0,
		bobUpAndDown: true
	});
	position.z += 0.5; 
	mp.labels.new(name, position, {
		los: true,
		font: 0,
		drawDistance: 10,
		color: [255,255,255,255],
		dimension: 0
	});	
});

let refills = require('../../configs/create_places/refill.json');
refills.forEach((item, id) =>{
	let position = new mp.Vector3(item.x, item.y, item.z);
	if(item.name === 'point')
		mp.blips.new(361, position, {
			name: "Заправка",
			color: 47,
			scale: 0.9,
			shortRange: true,
			dimension: 0,
		});
	else{
		let colshape = mp.colshapes.newSphere(item.x, item.y, item.z, 1.5);
		colshape.setVariables({'callBack': 'refillCar', 'params': [], 'client': 1});
	}
});

let parks = require('../../configs/create_places/parks.json');
let parkingPeds = [];
global.colshapePark = {};
let colshape = 0;
let colshapePos;
let count = -1;
flag = false;
parks.forEach((item, id) =>{
	let position = new mp.Vector3(item.x, item.y, item.z);
	if(item.type === 1 && item.subcategory === 0){
		if(flag){
			colshape.setVariables({'callBack': 'impoundLot:open', 'params': [count], 'client': 0});
			flag = false;
		}
		else if(colshape) colshape.setVariables({'callBack': 'parking:open', 'params': [count], 'client': 0});
		count++;
		global.colshapePark[count] = [];
		colshapePos = {x: item.x, y: item.y, z: item.z};
		position.z += 1; 
		mp.labels.new("Охранник парковки", position, {
			los: true,
			font: 0,
			drawDistance: 10,
			color: [255,255,255,255],
			dimension: 0
		});	
		parkingPeds.push({x: item.x, y: item.y, z: item.z, heading: item.heading, id: item.model});
	}else
		if(item.type === 1 && item.subcategory === 1){
			colshape = mp.colshapes.newSphere(colshapePos.x, colshapePos.y, colshapePos.z, 1.5);
			mp.blips.new(267, position, {
				name: "Парковка",
				color: 11,
				scale: 0.7,
				shortRange: true,
				dimension: 0,
			});
		}else
			if(item.type === 1 && item.subcategory === 2)
				global.colshapePark[count].push({x: item.x, y: item.y, z: item.z, heading: item.heading});
			
	if(item.type === 2 && item.subcategory === 0){
		if(colshape) colshape.setVariables({'callBack': 'parking:open', 'params': [count], 'client': 0}); // fix 
		flag = true;
		colshapePos = {x: item.x, y: item.y, z: item.z};
		parkingPeds.push({x: item.x, y: item.y, z: item.z, heading: item.heading, id: item.model});
		position.z += 1; 
		mp.labels.new("Полицейский", position, {
			los: true,
			font: 0,
			drawDistance: 10,
			color: [255,255,255,255],
			dimension: 0
		});	
	}else
		if(item.type === 2 && item.subcategory === 1){
			colshape = mp.colshapes.newSphere(colshapePos.x, colshapePos.y, colshapePos.z, 1.5);
			mp.blips.new(225, position, {
				name: "Штрафстоянка",
				scale: 0.9,
				shortRange: true,
				dimension: 0,
			});
		}
});
colshape.setVariables({'callBack': 'parking:open', 'params': [count], 'client': 0});
parkingPeds.push({x: 437.5838317871094, y: -978.825439453125, z: 30.689611434936523, heading: 147.86936950683594, id: "csb_cop"});
colshape = mp.colshapes.newSphere(437.5838317871094, -978.825439453125, 30.689611434936523, 1.5, 0);
colshape.setVariables({'callBack': 'plateShopOpen', 'params': [0], 'client': 0});

mp.events.add('playerJoin', (player) => {
	player.call('CreateNewPeds', [JSON.stringify(parkingPeds)]);
});

/*
	0 - newWork
	1 - enterTheWork
	2 - work
*/


let EMCcolshape = mp.colshapes.newSphere(268.3429870605469, -1365.198486328125, 24.537796020507812, 1.5, 0);
EMCcolshape.setVariables({'callBack': "start_work_emc", 'params': [], 'client': 0, 'faction': "EMC"});
let EMCcolshape2 = mp.colshapes.newSphere(260.2818298339844, -1358.273193359375, 24.537790298461914, 1.5, 0);
EMCcolshape2.setVariables({'callBack': "take_car_emc", 'params': [], 'client': 0, 'faction': "EMC"});
let EMCcolshape3 = mp.colshapes.newSphere(458.729248046875, -992.65478515625, 30.6895751953125, 1.5, 0);
EMCcolshape3.setVariables({'callBack': "police:start_work", 'params': [], 'client': 0, 'faction': "Police"});
let EMCcolshape4 = mp.colshapes.newSphere(451.9139099121094, -980.1470947265625, 30.689579010009766, 1.5, 0);
EMCcolshape4.setVariables({'callBack': "police:take_car", 'params': [], 'client': 0, 'faction': "Police"});

let EMCcolshape5 = mp.colshapes.newSphere(141.65707397460938, -768.9485473632812, 45.75202941894531, 1.5, 0);
EMCcolshape5.setVariables({'callBack': "fib:start_work", 'params': [], 'client': 0, 'faction': "FIB"});
let EMCcolshape6 = mp.colshapes.newSphere(115.37793731689453, -747.8346557617188, 45.75157165527344, 1.5, 0);
EMCcolshape6.setVariables({'callBack': "fib:take_car", 'params': [], 'client': 0, 'faction': "FIB"});

let EMCcolshape7 = mp.colshapes.newSphere(263.0584411621094, 220.79122924804688, 101.68328857421875, 1.5, 0);
EMCcolshape7.setVariables({'callBack': "mid:start_work", 'params': [], 'client': 0, 'faction': "Mayoralty"});
let EMCcolshape8 = mp.colshapes.newSphere(243.60116577148438, 232.0525360107422, 106.28681945800781, 1.5, 0);
EMCcolshape8.setVariables({'callBack': "mid:take_car", 'params': [], 'client': 0, 'faction': "Mayoralty"});

let EMCcolshape9 = mp.colshapes.newSphere(659.360595703125, 593.3018798828125, 129.05099487304688, 1.5, 0);
EMCcolshape9.setVariables({'callBack': "gid:start_work", 'params': [], 'client': 0, 'faction': "GID"});
let EMCcolshape10 = mp.colshapes.newSphere(658.3263549804688, 613.8043212890625, 128.91107177734375, 1.5, 0);
EMCcolshape10.setVariables({'callBack': "gid:take_car", 'params': [], 'client': 0, 'faction': "GID"});


mp.events.add('getAllClientPoints', (player) => {
	var client_points = [
		{show: 0, name: "Начать смену", x: 268.3429870605469, y: -1365.198486328125, z: 24.537796020507812, type: 1, subcategoty: 0, faction: "EMC", call: 'start_work_emc', params: []}, 
		{show: 0, name: "Закончить смену", x: 268.3429870605469, y: -1365.198486328125, z: 24.537796020507812, type: 1, subcategoty: 1, faction: "EMC", call: 'end_work_emc', params: []},
		{show: 0, name: "Взять ключи", x: 260.2818298339844, y: -1358.273193359375, z: 24.537790298461914, type: 2, subcategoty: 0, faction: "EMC", call: 'take_car_emc', params: []},
		{show: 0, name: "Сдать ключи", x: 260.2818298339844, y: -1358.273193359375, z: 24.537790298461914, type: 2, subcategoty: 1, faction: "EMC", call: 'return_car_emc', params: []},
		{show: 0, name: "Начать смену", x: 458.729248046875, y: -992.65478515625, z: 30.6895751953125, type: 1, subcategoty: 0, faction: "Police", call: 'police:start_work', params: []}, 
		{show: 0, name: "Закончить смену", x: 458.729248046875, y: -992.65478515625, z: 30.6895751953125, type: 1, subcategoty: 1, faction: "Police", call: 'police:end_work', params: []},
		{show: 0, name: "Взять ключи", x: 451.9139099121094, y: -980.1470947265625, z: 30.689579010009766, type: 2, subcategoty: 0, faction: "Police", call: 'police:take_car', params: []}, 
		{show: 0, name: "Сдать ключи", x: 451.9139099121094, y: -980.1470947265625, z: 30.689579010009766, type: 2, subcategoty: 1, faction: "Police", call: 'police:return_car', params: []},
		{show: 0, name: "Начать смену", x: 141.65707397460938, y: -768.9485473632812, z: 45.75202941894531, type: 1, subcategoty: 0, faction: "FIB", call: 'fib:start_work', params: []}, 
		{show: 0, name: "Закончить смену", x: 141.65707397460938, y: -768.9485473632812, z: 45.75202941894531, type: 1, subcategoty: 1, faction: "FIB", call: 'fib:end_work', params: []},
		{show: 0, name: "Взять ключи", x: 115.37793731689453, y: -747.8346557617188, z: 45.75157165527344, type: 2, subcategoty: 0, faction: "FIB", call: 'fib:take_car', params: []}, 
		{show: 0, name: "Сдать ключи", x: 115.37793731689453, y: -747.8346557617188, z: 45.75157165527344, type: 2, subcategoty: 1, faction: "FIB", call: 'fib:return_car', params: []},
		{show: 0, name: "Начать смену", x: 263.0584411621094, y: 220.79122924804688, z: 101.68328857421875, type: 1, subcategoty: 0, faction: "Mayoralty", call: 'mid:start_work', params: []}, 
		{show: 0, name: "Закончить смену", x: 263.0584411621094, y: 220.79122924804688, z: 101.68328857421875, type: 1, subcategoty: 1, faction: "Mayoralty", call: 'mid:end_work', params: []},
		{show: 0, name: "Взять ключи", x: 243.60116577148438, y: 232.0525360107422, z: 106.28681945800781, type: 2, subcategoty: 0, faction: "Mayoralty", call: 'mid:take_car', params: []}, 
		{show: 0, name: "Сдать ключи", x: 243.60116577148438, y: 232.0525360107422, z: 106.28681945800781, type: 2, subcategoty: 1, faction: "Mayoralty", call: 'mid:return_car', params: []},		
		{show: 0, name: "Начать смену", x: 659.360595703125, y: 593.3018798828125, z: 129.05099487304688, type: 1, subcategoty: 0, faction: "GID", call: 'gid:start_work', params: []}, 
		{show: 0, name: "Закончить смену", x: 659.360595703125, y: 593.3018798828125, z: 129.05099487304688, type: 1, subcategoty: 1, faction: "GID", call: 'gid:end_work', params: []},
		{show: 0, name: "Взять ключи", x: 658.3263549804688, y: 613.8043212890625, z: 128.91107177734375, type: 2, subcategoty: 0, faction: "GID", call: 'gid:take_car', params: []}, 
		{show: 0, name: "Сдать ключи", x: 658.3263549804688, y: 613.8043212890625, z: 128.91107177734375, type: 2, subcategoty: 1, faction: "GID", call: 'gid:return_car', params: []}
	];
	for(let i = 0; i < client_points.length; i++)
		if((player.faction === client_points[i].faction && player.work && player.workVeh && client_points[i].type === 2 && client_points[i].subcategoty === 1) || 
			(player.faction === client_points[i].faction && player.work && !player.workVeh && client_points[i].type === 2 && client_points[i].subcategoty === 0) || 
			(player.faction === client_points[i].faction && !player.work && client_points[i].type === 1 && client_points[i].subcategoty === 0) || 
			(player.faction === client_points[i].faction && player.work && client_points[i].type === 1 && client_points[i].subcategoty === 1))
			client_points[i].show = 1;
	
	
	player.call('updatePoints', [JSON.stringify(client_points)]);
});


/// emc
var EMC_points = [
	{type: 1, name: "Войти в EMC", x: 1151.23022, y: -1529.53821, z: 35.36858, blip: 'Скорая помощь', blipId: 61, call: 'SetNewCoords', params: [275.8614196777344, -1361.5093994140625, 24.537796020507812], client: 0},
	{type: 1, name: "Выйти", x: 275.8614196777344, y: -1361.5093994140625, z: 24.537796020507812, call: 'SetNewCoords', params: [1151.23022, -1529.53821, 35.36858], client: 0},
	{type: 1, name: "Войти в Мэрию", x: -544.9091186523438, y: -204.5437774658203, z: 38.21515655517578, call: 'SetNewCoords', params: [233.0543670654297, 215.82080078125, 106.28665161132812], client: 0},
	{type: 1, name: "Выйти", x: 233.0543670654297, y: 215.82080078125, z: 106.28665161132812, call: 'SetNewCoords', params: [-544.9091186523438, -204.5437774658203, 38.21515655517578], client: 0},
	{type: 1, name: "Войти в Мэрию", x: -583.232177734375, y: -194.4386444091797, z: 38.325660705566406, call: 'SetNewCoords', params: [259.8671569824219, 204.74667358398438, 106.2832260131836], client: 0},
	{type: 1, name: "Выйти на парковку", x: 259.8671569824219, y: 204.74667358398438, z: 106.2832260131836, call: 'SetNewCoords', params: [-583.232177734375, -194.4386444091797, 38.325660705566406], client: 0},
];

for(let i=0; i < EMC_points.length; i++){
	mp.labels.new(EMC_points[i].name, new mp.Vector3(EMC_points[i].x, EMC_points[i].y, EMC_points[i].z + 0.5), 
	{
		dismension: 0,
		los: true,
		font: 0,
		drawDistance: 10,
	});
	mp.markers.new(20, new mp.Vector3(EMC_points[i].x, EMC_points[i].y, EMC_points[i].z - 0.3), 1.5, 
	{
		rotation: new mp.Vector3(0, 180, 0),
		color: [273,60,100, 125],
		dimension: 0
	});
	if(EMC_points[i].blip !== undefined)
		mp.blips.new(EMC_points[i].blipId, new mp.Vector3(EMC_points[i].x, EMC_points[i].y, EMC_points[i].z), {
			dimension: 0,
			color: 18,
			name: EMC_points[i].blip,
			shortRange: true
		});
	let emcColShape = mp.colshapes.newSphere(EMC_points[i].x, EMC_points[i].y, EMC_points[i].z, 1.5, 0);
	emcColShape.setVariables({'callBack': EMC_points[i].call, 'params': EMC_points[i].params, 'client': EMC_points[i].client});
}
/////////


// police
mp.labels.new("Войти в полицейский участок", new mp.Vector3(-1092.28198, -808.25592, 19.27483 + 0.5), 
{
	dismension: 0,
	los: true,
	font: 0,
	drawDistance: 10,
});
mp.markers.new(20, new mp.Vector3(-1092.28198, -808.25592, 19.27483 - 0.3), 1.5, 
{
	rotation: new mp.Vector3(0, 180, 0),
	color: [273,60,100, 125],
	dimension: 0
});
mp.blips.new(66, new mp.Vector3(659.360595703125, 593.3018798828125, 129.05099487304688),
{
	name: '???',
	color: 85,
	alpha: 255,
	shortRange: true
});
mp.blips.new(60, new mp.Vector3(-1092.28198, -808.25592, 19.27483),
{
	name: 'Полицейский участок',
	color: 3,
	shortRange: true
});
let police = mp.colshapes.newSphere(-1092.28198, -808.25592, 19.27483, 1.5, 0);
police.setVariables({'callBack': 'dontWorking', 'params': [], 'client': 1});
//////////



function playerEnterColshapeHandler(player, shape) {
	if((shape.getVariable('faction') !== null && shape.getVariable('faction') === player.faction) || shape.getVariable('faction') === null)
	{
		player.call('onEiteraction', [shape.getVariable('callBack'), JSON.stringify(shape.getVariable('params')), shape.getVariable('client')]);
	}
}
mp.events.add("playerEnterColshape", playerEnterColshapeHandler);


// EMC park {x: 1153.521484375, y: -1536.7318115234375, z: 39.31928634643555, heading: -97.74044799804688}


function playerExitColshapeHandler(player, shape) {
	player.call('closeInteractionButton');
}
mp.events.add("playerExitColshape", playerExitColshapeHandler);