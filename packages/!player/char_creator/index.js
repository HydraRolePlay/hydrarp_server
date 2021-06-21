var DB = require('../../MySQL/modules/db');
const creatorPlayerPos = new mp.Vector3(-2041.052490234375, -1032.380859375, 11.980711936950684);
const creatorPlayerHeading = 69.54029846191406;

global.invObj = [
    {
        "head": {
            "2": {
                "id": 119,
                "description": "Дешевая шапка",
                "propIndex": 2,
                "weight": 0.5,
                "price": 400,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "4": {
                "id": 119,
                "description": "Кепка с логотипом LS",
                "propIndex": 4,
                "weight": 0.4,
                "price": 450,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "5": {
                "id": 119,
                "description": "Черная шапка",
                "propIndex": 5,
                "weight": 0.3,
                "price": 250,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "6": {
                "id": 119,
                "description": "Военная кепка",
                "propIndex": 6,
                "weight": 0.4,
                "price": 1750,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "7": {
                "id": 119,
                "description": "Дешевая кепка",
                "propIndex": 7,
                "weight": 0.4,
                "price": 200,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "12": {
                "id": 119,
                "description": "Старомодная шляпа",
                "propIndex": 12,
                "weight": 0.4,
                "price": 17500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "13": {
                "id": 119,
                "description": "Ковбойская шляпа",
                "propIndex": 13,
                "weight": 0.4,
                "price": 11500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "14": {
                "id": 119,
                "description": "бандана",
                "propIndex": 14,
                "weight": 0.2,
                "price": 500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "16": {
                "id": 119,
                "description": "Мотошлем №1",
                "propIndex": 16,
                "weight": 1,
                "price": 1250,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "17": {
                "id": 119,
                "description": "Шлем для скутера",
                "propIndex": 17,
                "weight": 1,
                "price": 750,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "18": {
                "id": 119,
                "description": "Мотошлем №2",
                "propIndex": 18,
                "weight": 1,
                "price": 1250,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "20": {
                "id": 119,
                "description": "Панама",
                "propIndex": 20,
                "weight": 0.5,
                "price": 400,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "21": {
                "id": 119,
                "description": "Льняная шляпа",
                "propIndex": 21,
                "weight": 0.6,
                "price": 12000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "25": {
                "id": 119,
                "description": "Старомодная бандитская шляпа",
                "propIndex": 25,
                "weight": 0.8,
                "price": 17500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "26": {
                "id": 119,
                "description": "Шляпа-котелок",
                "propIndex": 26,
                "weight": 0.9,
                "price": 10000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "27": {
                "id": 119,
                "description": "Цилиндр",
                "propIndex": 27,
                "weight": 1,
                "price": 66666,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "34": {
                "id": 119,
                "description": "Шляпа цвета американского флага",
                "propIndex": 34,
                "weight": 0.5,
                "price": 12500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "37": {
                "id": 119,
                "description": "Пивная каска",
                "propIndex": 37,
                "weight": 1.5,
                "price": 4000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "45": {
                "id": 119,
                "description": "Повернутая назад кепка",
                "propIndex": 45,
                "weight": 0.6,
                "price": 1250,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "51": {
                "id": 119,
                "description": "Зеркальный мотошлем",
                "propIndex": 51,
                "weight": 2,
                "price": 2500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "54": {
                "id": 119,
                "description": "Бейсболка с логотипом",
                "propIndex": 54,
                "weight": 0.5,
                "price": 550,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "55": {
                "id": 119,
                "description": "Качественная кепка №1",
                "propIndex": 55,
                "weight": 0.5,
                "price": 5000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "56": {
                "id": 119,
                "description": "Качественная кепка №2",
                "propIndex": 56,
                "weight": 0.5,
                "price": 5000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "83": {
                "id": 119,
                "description": "Черная шапка",
                "propIndex": 83,
                "weight": 0.5,
                "price": 400,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "91": {
                "id": 119,
                "description": "Шлем с принтом",
                "propIndex": 91,
                "weight": 2,
                "price": 10000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "94": {
                "id": 119,
                "description": "Панама",
                "propIndex": 94,
                "weight": 0.5,
                "price": 450,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "96": {
                "id": 119,
                "description": "Качественная кепка №3",
                "propIndex": 96,
                "weight": 0.5,
                "price": 5000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "110": {
                "id": 119,
                "description": "Повернутая назад кепка",
                "propIndex": 110,
                "weight": 0.5,
                "price": 2500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            }
        },
        "body": {
            "3": {
                "id": 116,
                "description": "Ветровка",
                "propIndexToros": 1,
                "propIndexBody": 0,
                "propIndex": 3,
                "weight": 1.8,
                "price": 1000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "57": {
                "id": 116,
                "description": "Толстовка на молнии",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 57,
                "weight": 1.7,
                "price": 1500,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "61": {
                "id": 116,
                "description": "Застегнутая ветровка",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 61,
                "weight": 1.7,
                "price": 1500,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "65": {
                "id": 116,
                "description": "Повседневная короткая куртка",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 65,
                "weight": 2.5,
                "price": 3000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "68": {
                "id": 116,
                "description": "Куртка с капюшоном",
                "propIndexToros": 6,
                "propIndexBody": 2,
                "propIndex": 68,
                "weight": 2.5,
                "price": 2500,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "72": {
                "id": 116,
                "description": "Пальто",
                "propIndexToros": 6,
                "propIndexBody": 0,
                "propIndex": 72,
                "weight": 4,
                "price": 28000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "74": {
                "id": 116,
                "description": "Открытая куртка с премиальным рисунком",
                "propIndexToros": 6,
                "propIndexBody": 0,
                "propIndex": 74,
                "weight": 2.4,
                "price": 66666,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "76": {
                "id": 116,
                "description": "Закрытый тренч",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 76,
                "weight": 4,
                "price": 32000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "77": {
                "id": 116,
                "description": "Открытый тренч",
                "propIndexToros": 6,
                "propIndexBody": 0,
                "propIndex": 77,
                "weight": 4,
                "price": 19000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "79": {
                "id": 116,
                "description": "Спортивный бомбер",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 79,
                "weight": 2.3,
                "price": 5000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "107": {
                "id": 116,
                "description": "Одежда для кунг-фу",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 107,
                "weight": 3.5,
                "price": 53333,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "108": {
                "id": 116,
                "description": "Элитный пиджак",
                "propIndexToros": 14,
                "propIndexBody": 15,
                "propIndex": 108,
                "weight": 2.8,
                "price": 100000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "110": {
                "id": 116,
                "description": "Премиальная кожанная куртка",
                "propIndexToros": 1,
                "propIndexBody": 15,
                "propIndex": 110,
                "weight": 4,
                "price": 60000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "113": {
                "id": 116,
                "description": "Спортивная куртка",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 113,
                "weight": 3,
                "price": 3000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "124": {
                "id": 116,
                "description": "Удлиненная куртка",
                "propIndexToros": 14,
                "propIndexBody": 15,
                "propIndex": 124,
                "weight": 4,
                "price": 3500,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "140": {
                "id": 116,
                "description": "Премиальное закрытое пальто",
                "propIndexToros": 14,
                "propIndexBody": 15,
                "propIndex": 140,
                "weight": 4,
                "price": 40000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "145": {
                "id": 116,
                "description": "Элитный пиджак",
                "propIndexToros": 14,
                "propIndexBody": 15,
                "propIndex": 145,
                "weight": 2.8,
                "price": 100000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "150": {
                "id": 116,
                "description": "Ветровка с принтом",
                "propIndexToros": 1,
                "propIndexBody": 15,
                "propIndex": 150,
                "weight": 2.4,
                "price": 6000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "166": {
                "id": 116,
                "description": "Кожанная куртка",
                "propIndexToros": 1,
                "propIndexBody": 0,
                "propIndex": 166,
                "weight": 3,
                "price": 46666,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "167": {
                "id": 116,
                "description": "Дутый пуховик",
                "propIndexToros": 1,
                "propIndexBody": 0,
                "propIndex": 167,
                "weight": 4,
                "price": 40000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "169": {
                "id": 116,
                "description": "Джинсовая куртка",
                "propIndexToros": 1,
                "propIndexBody": 0,
                "propIndex": 169,
                "weight": 3.7,
                "price": 41333,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "185": {
                "id": 116,
                "description": "Расстегнутая куртка",
                "propIndexToros": 1,
                "propIndexBody": 0,
                "propIndex": 185,
                "weight": 3.9,
                "price": 15000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "187": {
                "id": 116,
                "description": "Удлиненная кофта",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 187,
                "weight": 2,
                "price": 6000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "249": {
                "id": 116,
                "description": "Премиальная ветровка",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 249,
                "weight": 2.4,
                "price": 43333,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            }
        },
        "middle": {
            "0": {
                "id": 122,
                "description": "Обычная футболка",
                "propIndexToros": 0,
                "propIndexBody": 0,
                "propIndex": 0,
                "weight": 1,
                "price": 250,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "1": {
                "id": 122,
                "description": "Футболка",
                "propIndexToros": 0,
                "propIndexBody": 15,
                "propIndex": 1,
                "weight": 1,
                "price": 500,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "5": {
                "id": 122,
                "description": "Белая майка",
                "propIndexToros": 5,
                "propIndexBody": 5,
                "propIndex": 5,
                "weight": 0.7,
                "price": 250,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "13": {
                "id": 122,
                "description": "Рубашка с загнутыми рукавами",
                "propIndexToros": 11,
                "propIndexBody": 15,
                "propIndex": 13,
                "weight": 1.5,
                "price": 900,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "14": {
                "id": 122,
                "description": "Повседневная рубашка",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 14,
                "weight": 1.5,
                "price": 1000,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "16": {
                "id": 122,
                "description": "Серая футболка",
                "propIndexToros": 0,
                "propIndexBody": 16,
                "propIndex": 16,
                "weight": 1,
                "price": 250,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "63": {
                "id": 122,
                "description": "Рубашка с загнутыми рукавами",
                "propIndexToros": 0,
                "propIndexBody": 15,
                "propIndex": 63,
                "weight": 1.5,
                "price": 160,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "71": {
                "id": 122,
                "description": "Престижная футболка",
                "propIndexToros": 0,
                "propIndexBody": 15,
                "propIndex": 71,
                "weight": 1,
                "price": 66666,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "73": {
                "id": 122,
                "description": "Футболка с принтом",
                "propIndexToros": 0,
                "propIndexBody": 15,
                "propIndex": 73,
                "weight": 1,
                "price": 30666,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "78": {
                "id": 122,
                "description": "Свитшот с дорогим принтом",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 78,
                "weight": 2,
                "price": 30000,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "82": {
                "id": 122,
                "description": "Поло YETI",
                "propIndexToros": 11,
                "propIndexBody": 15,
                "propIndex": 82,
                "weight": 1.1,
                "price": 3000,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "83": {
                "id": 122,
                "description": "Футболка на пуговицах",
                "propIndexToros": 11,
                "propIndexBody": 15,
                "propIndex": 83,
                "weight": 1.1,
                "price": 1700,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "84": {
                "id": 122,
                "description": "Свитер с логотипом",
                "propIndexToros": 1,
                "propIndexBody": 15,
                "propIndex": 84,
                "weight": 2,
                "price": 4000,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "105": {
                "id": 122,
                "description": "Рубашка с принтом-цветами",
                "propIndexToros": 11,
                "propIndexBody": 15,
                "propIndex": 105,
                "weight": 1.2,
                "price": 33333,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "123": {
                "id": 122,
                "description": "Повседневное поло",
                "propIndexToros": 0,
                "propIndexBody": 15,
                "propIndex": 123,
                "weight": 1.1,
                "price": 1500,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "126": {
                "id": 122,
                "description": "Удлиненная рубашка в клетку",
                "propIndexToros": 1,
                "propIndexBody": 15,
                "propIndex": 126,
                "weight": 2,
                "price": 4250,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "135": {
                "id": 122,
                "description": "Премиальная рубашка",
                "propIndexToros": 11,
                "propIndexBody": 15,
                "propIndex": 135,
                "weight": 1.4,
                "price": 53333,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "152": {
                "id": 122,
                "description": "Свитшоп с логотипом",
                "propIndexToros": 1,
                "propIndexBody": 15,
                "propIndex": 152,
                "weight": 1.8,
                "price": 7500,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "190": {
                "id": 122,
                "description": "Свитер с принтом",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 190,
                "weight": 2,
                "price": 10000,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "191": {
                "id": 122,
                "description": "Дутый пуховик с камуфляжем",
                "propIndexToros": 1,
                "propIndexBody": 0,
                "propIndex": 191,
                "weight": 3,
                "price": 46666,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "196": {
                "id": 122,
                "description": "Новогодний свитер",
                "propIndexToros": 1,
                "propIndexBody": 15,
                "propIndex": 196,
                "weight": 3,
                "price": 4000,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "199": {
                "id": 122,
                "description": "Новогодний свитер с пуговицами",
                "propIndexToros": 6,
                "propIndexBody": 15,
                "propIndex": 199,
                "weight": 2.2,
                "price": 17000,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "241": {
                "id": 122,
                "description": "Дешевое поло",
                "propIndexToros": 0,
                "propIndexBody": 15,
                "propIndex": 241,
                "weight": 1,
                "price": 1250,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            }
        },
        "legs": {
            "0": {
                "id": 120,
                "description": "Обычные джинсы",
                "propIndex": 0,
                "weight": 1.4,
                "price": 300,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "1": {
                "id": 120,
                "description": "Дешевые джинсы",
                "propIndex": 1,
                "weight": 1.5,
                "price": 500,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "3": {
                "id": 120,
                "description": "Спортивные штаны",
                "propIndex": 3,
                "weight": 1.3,
                "price": 500,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "4": {
                "id": 120,
                "description": "Зауженные дешевые джинсы",
                "propIndex": 4,
                "weight": 1.4,
                "price": 550,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "6": {
                "id": 120,
                "description": "Джинсовые шорты",
                "propIndex": 6,
                "weight": 0.8,
                "price": 500,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "7": {
                "id": 120,
                "description": "Широкие штаны",
                "propIndex": 7,
                "weight": 1.3,
                "price": 500,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "9": {
                "id": 120,
                "description": "Брюки-карго",
                "propIndex": 9,
                "weight": 1.7,
                "price": 750,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "12": {
                "id": 120,
                "description": "Повседневные шорты",
                "propIndex": 12,
                "weight": 0.9,
                "price": 1250,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "14": {
                "id": 120,
                "description": "Пляжные шорты",
                "propIndex": 14,
                "weight": 0.5,
                "price": 1100,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "24": {
                "id": 120,
                "description": "Брюки-чиносы",
                "propIndex": 24,
                "weight": 1.8,
                "price": 15000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "26": {
                "id": 120,
                "description": "Зауженные премиальные джинсы",
                "propIndex": 26,
                "weight": 1.7,
                "price": 26666,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "32": {
                "id": 120,
                "description": "Обтягивающие спортивные штаны",
                "propIndex": 32,
                "weight": 0.9,
                "price": 600,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "41": {
                "id": 120,
                "description": "Штаны с застежками и подтяжками",
                "propIndex": 41,
                "weight": 2.2,
                "price": 1250,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "42": {
                "id": 120,
                "description": "Удлиненне шорты",
                "propIndex": 42,
                "weight": 1,
                "price": 500,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "50": {
                "id": 120,
                "description": "Качественные штаны",
                "propIndex": 50,
                "weight": 1.7,
                "price": 12000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "53": {
                "id": 120,
                "description": "Элитные брюки кутюр",
                "propIndex": 53,
                "weight": 1.5,
                "price": 100000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "54": {
                "id": 120,
                "description": "Премиальные шорты с принтом",
                "propIndex": 54,
                "weight": 0.9,
                "price": 60000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "55": {
                "id": 120,
                "description": "Спортивные дешевые штаны",
                "propIndex": 55,
                "weight": 1.4,
                "price": 500,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "60": {
                "id": 120,
                "description": "Брюки в клетку",
                "propIndex": 60,
                "weight": 1.6,
                "price": 26666,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "65": {
                "id": 120,
                "description": "Элитные брюки",
                "propIndex": 65,
                "weight": 1.5,
                "price": 93333,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "69": {
                "id": 120,
                "description": "Премиальные брюки с принтом",
                "propIndex": 69,
                "weight": 1.6,
                "price": 63333,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "80": {
                "id": 120,
                "description": "Длинные шорты",
                "propIndex": 80,
                "weight": 1.4,
                "price": 3000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "81": {
                "id": 120,
                "description": "Кожанные длинные шорты",
                "propIndex": 81,
                "weight": 1.4,
                "price": 16000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "86": {
                "id": 120,
                "description": "Камуфляжные штаны",
                "propIndex": 86,
                "weight": 1.8,
                "price": 40000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "100": {
                "id": 120,
                "description": "Широкие штаны с принтом",
                "propIndex": 100,
                "weight": 1.8,
                "price": 33333,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            }
        },
        "feet": {
            "1": {
                "id": 121,
                "description": "Обычные кеды",
                "propIndex": 1,
                "weight": 1,
                "price": 275,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "3": {
                "id": 121,
                "description": "Дешевые туфли",
                "propIndex": 3,
                "weight": 1,
                "price": 1000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "4": {
                "id": 121,
                "description": "Дешевые кеды",
                "propIndex": 4,
                "weight": 1,
                "price": 1000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "5": {
                "id": 121,
                "description": "Сланцы",
                "propIndex": 5,
                "weight": 0.5,
                "price": 750,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "7": {
                "id": 121,
                "description": "Повседневные кроссовки",
                "propIndex": 7,
                "weight": 1.8,
                "price": 4000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "9": {
                "id": 121,
                "description": "Кроссовки с логотипом",
                "propIndex": 9,
                "weight": 1.5,
                "price": 3500,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "10": {
                "id": 121,
                "description": "Дорогие туфли",
                "propIndex": 10,
                "weight": 1.2,
                "price": 9000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "12": {
                "id": 121,
                "description": "Кожанные ботинки",
                "propIndex": 12,
                "weight": 2.4,
                "price": 12500,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "14": {
                "id": 121,
                "description": "Джинсовые ботинки",
                "propIndex": 14,
                "weight": 2.4,
                "price": 12500,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "15": {
                "id": 121,
                "description": "Кожанные ботинки челси",
                "propIndex": 15,
                "weight": 2,
                "price": 36666,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "18": {
                "id": 121,
                "description": "Дорогие кожанные туфли",
                "propIndex": 18,
                "weight": 1.8,
                "price": 15000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "19": {
                "id": 121,
                "description": "Черно-белые кожанные ботинки",
                "propIndex": 19,
                "weight": 2.1,
                "price": 15000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "20": {
                "id": 121,
                "description": "Премиальные кожанные туфли",
                "propIndex": 20,
                "weight": 1.6,
                "price": 34666,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "21": {
                "id": 121,
                "description": "Премиальные кожанные туфли без шнурков",
                "propIndex": 21,
                "weight": 1.6,
                "price": 33333,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "23": {
                "id": 121,
                "description": "Туфли на завышенной подошве",
                "propIndex": 23,
                "weight": 1.8,
                "price": 17500,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "25": {
                "id": 121,
                "description": "Зимние ботинки",
                "propIndex": 25,
                "weight": 3,
                "price": 3000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "28": {
                "id": 121,
                "description": "Панковские кеды",
                "propIndex": 28,
                "weight": 2.5,
                "price": 40000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "29": {
                "id": 121,
                "description": "Золоченые завышенные кроссовки",
                "propIndex": 29,
                "weight": 2.4,
                "price": 100000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "31": {
                "id": 121,
                "description": "Кроссовки с воздушными балонами",
                "propIndex": 31,
                "weight": 2.2,
                "price": 37333,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "32": {
                "id": 121,
                "description": "Массивные кеды",
                "propIndex": 32,
                "weight": 2.5,
                "price": 33333,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "35": {
                "id": 121,
                "description": "Обувь военного стиля",
                "propIndex": 35,
                "weight": 2.6,
                "price": 17000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "36": {
                "id": 121,
                "description": "Кожанные мокасины",
                "propIndex": 36,
                "weight": 1.8,
                "price": 18000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "38": {
                "id": 121,
                "description": "Ковбойские сапоги",
                "propIndex": 38,
                "weight": 1.9,
                "price": 26666,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "41": {
                "id": 121,
                "description": "Премиальные слипоны",
                "propIndex": 41,
                "weight": 1.3,
                "price": 44000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "42": {
                "id": 121,
                "description": "Кожанные слипоны",
                "propIndex": 42,
                "weight": 1.2,
                "price": 37333,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "43": {
                "id": 121,
                "description": "Премиальные кеды",
                "propIndex": 43,
                "weight": 1.9,
                "price": 26666,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "48": {
                "id": 121,
                "description": "Высокие кеды",
                "propIndex": 48,
                "weight": 1.3,
                "price": 1900,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "51": {
                "id": 121,
                "description": "Классические ботинки",
                "propIndex": 51,
                "weight": 1.8,
                "price": 15000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "55": {
                "id": 121,
                "description": "Высокие кеды с полосками",
                "propIndex": 55,
                "weight": 1.6,
                "price": 30000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "58": {
                "id": 121,
                "description": "Тапочки-носки",
                "propIndex": 58,
                "weight": 0.3,
                "price": 4500,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "59": {
                "id": 121,
                "description": "Кроссовки",
                "propIndex": 59,
                "weight": 2,
                "price": 29333,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "61": {
                "id": 121,
                "description": "Кроссовки",
                "propIndex": 61,
                "weight": 1.9,
                "price": 29333,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "68": {
                "id": 121,
                "description": "Тапочки-носки с принтом",
                "propIndex": 68,
                "weight": 0.3,
                "price": 7000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "76": {
                "id": 121,
                "description": "Кроссовки",
                "propIndex": 76,
                "weight": 2.2,
                "price": 33333,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "77": {
                "id": 121,
                "description": "Кроссовки с неоновой подошвой",
                "propIndex": 77,
                "weight": 2,
                "price": 66666,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "80": {
                "id": 121,
                "description": "Ботинки с принтом Пламя",
                "propIndex": 80,
                "weight": 2.4,
                "price": 40000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            },
            "82": {
                "id": 121,
                "description": "Ботинки с большим носком",
                "propIndex": 82,
                "weight": 2.2,
                "price": 27333,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 0
            }
        }
    },
    {
        "head": {
            "2": {
                "id": 119,
                "description": "Ковбойская шляпа",
                "propIndex": 2,
                "weight": 0.4,
                "price": 1500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "4": {
                "id": 119,
                "description": "Кепка с логотипом LS",
                "propIndex": 4,
                "weight": 0.4,
                "price": 500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "5": {
                "id": 119,
                "description": "Дешевая шапка",
                "propIndex": 5,
                "weight": 0.4,
                "price": 550,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "6": {
                "id": 119,
                "description": "Кепка-фуражка",
                "propIndex": 6,
                "weight": 0.4,
                "price": 9000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "7": {
                "id": 119,
                "description": "Дешевая кепка",
                "propIndex": 7,
                "weight": 0.3,
                "price": 500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "14": {
                "id": 119,
                "description": "Шерстяной женский берет",
                "propIndex": 14,
                "weight": 0.3,
                "price": 9000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "18": {
                "id": 119,
                "description": "Мотошлем №1",
                "propIndex": 18,
                "weight": 1,
                "price": 1250,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "21": {
                "id": 119,
                "description": "Женская панамка",
                "propIndex": 21,
                "weight": 0.3,
                "price": 1000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "22": {
                "id": 119,
                "description": "Льняная шляпа",
                "propIndex": 22,
                "weight": 0.5,
                "price": 5500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "36": {
                "id": 119,
                "description": "Пивная каска",
                "propIndex": 36,
                "weight": 1.5,
                "price": 4000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "42": {
                "id": 119,
                "description": "Новогодний колпак",
                "propIndex": 42,
                "weight": 0.4,
                "price": 5000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "54": {
                "id": 119,
                "description": "Старомодная бандитская шляпа",
                "propIndex": 54,
                "weight": 0.8,
                "price": 17500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "61": {
                "id": 119,
                "description": "Мафиозная шляпа",
                "propIndex": 61,
                "weight": 0.6,
                "price": 19000,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "82": {
                "id": 119,
                "description": "Черная шапка",
                "propIndex": 82,
                "weight": 0.2,
                "price": 500,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "130": {
                "id": 119,
                "description": "Повернутая назад кепка",
                "propIndex": 130,
                "weight": 0.6,
                "price": 1250,
                "clothes": "head",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_hat_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            }
        },
        "body": {
            "1": {
                "id": 116,
                "description": "Джинсовая куртка",
                "propIndexToros": 1,
                "propIndexBody": 0,
                "propIndex": 1,
                "weight": 2.1,
                "price": 550,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "3": {
                "id": 116,
                "description": "Белая кофта",
                "propIndexToros": 3,
                "propIndexBody": 15,
                "propIndex": 3,
                "weight": 1,
                "price": 250,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "6": {
                "id": 116,
                "description": "Дешевый пиджак",
                "propIndexToros": 5,
                "propIndexBody": 0,
                "propIndex": 6,
                "weight": 1.7,
                "price": 2000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "25": {
                "id": 116,
                "description": "Повседневный пиджак",
                "propIndexToros": 6,
                "propIndexBody": 0,
                "propIndex": 25,
                "weight": 1.9,
                "price": 14000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "37": {
                "id": 116,
                "description": "Платье",
                "propIndexToros": 15,
                "propIndexBody": 10,
                "propIndex": 37,
                "weight": 1.5,
                "price": 12500,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "65": {
                "id": 116,
                "description": "Куртка с мехом на шее",
                "propIndexToros": 6,
                "propIndexBody": 10,
                "propIndex": 65,
                "weight": 4.1,
                "price": 5500,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "160": {
                "id": 116,
                "description": "Повседневная куртка",
                "propIndexToros": 5,
                "propIndexBody": 0,
                "propIndex": 160,
                "weight": 3,
                "price": 2000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "171": {
                "id": 116,
                "description": "Укороченная джинсовая рубашка",
                "propIndexToros": 15,
                "propIndexBody": 10,
                "propIndex": 171,
                "weight": 1.5,
                "price": 700,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "189": {
                "id": 116,
                "description": "Удлиненная толстовка",
                "propIndexToros": 7,
                "propIndexBody": 10,
                "propIndex": 189,
                "weight": 2,
                "price": 1000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "191": {
                "id": 116,
                "description": "Зимняя куртка",
                "propIndexToros": 7,
                "propIndexBody": 0,
                "propIndex": 191,
                "weight": 4,
                "price": 5000,
                "clothes": "body",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shirt_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            }
        },
        "middle": {
            "0": {
                "id": 122,
                "description": "Обычная футболка",
                "propIndexToros": 0,
                "propIndexBody": 2,
                "propIndex": 0,
                "weight": 1,
                "price": 250,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "2": {
                "id": 122,
                "description": "Длинная футболка",
                "propIndexToros": 2,
                "propIndexBody": 26,
                "propIndex": 2,
                "weight": 1,
                "price": 250,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "3": {
                "id": 122,
                "description": "Кофта с молнией",
                "propIndexToros": 3,
                "propIndexBody": 10,
                "propIndex": 3,
                "weight": 1.5,
                "price": 750,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "5": {
                "id": 122,
                "description": "Белый топ",
                "propIndexToros": 4,
                "propIndexBody": 5,
                "propIndex": 5,
                "weight": 0.5,
                "price": 250,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "16": {
                "id": 122,
                "description": "Майка",
                "propIndexToros": 15,
                "propIndexBody": 10,
                "propIndex": 16,
                "weight": 0.5,
                "price": 900,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "17": {
                "id": 122,
                "description": "Рубашка с цветным принтом",
                "propIndexToros": 9,
                "propIndexBody": 10,
                "propIndex": 17,
                "weight": 1.2,
                "price": 4000,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "75": {
                "id": 122,
                "description": "Лонгслив",
                "propIndexToros": 1,
                "propIndexBody": 10,
                "propIndex": 75,
                "weight": 1.4,
                "price": 750,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "111": {
                "id": 122,
                "description": "Женский корсет",
                "propIndexToros": 15,
                "propIndexBody": 10,
                "propIndex": 111,
                "weight": 0.5,
                "price": 60000,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "130": {
                "id": 122,
                "description": "Дешевая рубашка",
                "propIndexToros": 9,
                "propIndexBody": 10,
                "propIndex": 130,
                "weight": 1,
                "price": 500,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "142": {
                "id": 122,
                "description": "Повседневная рубашка",
                "propIndexToros": 1,
                "propIndexBody": 10,
                "propIndex": 142,
                "weight": 1.4,
                "price": 1250,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "209": {
                "id": 122,
                "description": "Короткая футболка с принтом",
                "propIndexToros": 12,
                "propIndexBody": 10,
                "propIndex": 209,
                "weight": 1,
                "price": 2500,
                "clothes": "middle",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_tshirt_02",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            }
        },
        "legs": {
            "0": {
                "id": 120,
                "description": "Обычные джинсы",
                "propIndex": 0,
                "weight": 1.4,
                "price": 300,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "1": {
                "id": 120,
                "description": "Серые джинсы",
                "propIndex": 1,
                "weight": 1.2,
                "price": 300,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "2": {
                "id": 120,
                "description": "Короткие штаны",
                "propIndex": 2,
                "weight": 1.2,
                "price": 300,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "7": {
                "id": 120,
                "description": "Кожанная юбка",
                "propIndex": 7,
                "weight": 1,
                "price": 9000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "8": {
                "id": 120,
                "description": "Кожанная миниюбка",
                "propIndex": 8,
                "weight": 0.8,
                "price": 10000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "9": {
                "id": 120,
                "description": "Миниюбка с принтом",
                "propIndex": 9,
                "weight": 0.8,
                "price": 12500,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "10": {
                "id": 120,
                "description": "Короткие шорты",
                "propIndex": 10,
                "weight": 0.8,
                "price": 1250,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "11": {
                "id": 120,
                "description": "Зауженные карго-брюки",
                "propIndex": 11,
                "weight": 1.5,
                "price": 1250,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "23": {
                "id": 120,
                "description": "Классические брюки",
                "propIndex": 23,
                "weight": 1.2,
                "price": 17500,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "24": {
                "id": 120,
                "description": "Яркая длинная юбка",
                "propIndex": 24,
                "weight": 1,
                "price": 28000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "25": {
                "id": 120,
                "description": "Джинсовые шорты",
                "propIndex": 25,
                "weight": 0.9,
                "price": 550,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "27": {
                "id": 120,
                "description": "Кожанные обтягивающие штаны",
                "propIndex": 27,
                "weight": 1.1,
                "price": 36666,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "43": {
                "id": 120,
                "description": "Рваные спереди джинсы",
                "propIndex": 43,
                "weight": 1.2,
                "price": 15000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "44": {
                "id": 120,
                "description": "Рваные по бокам джинсы",
                "propIndex": 44,
                "weight": 1.2,
                "price": 12500,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "53": {
                "id": 120,
                "description": "Элитные штаны от кутюр",
                "propIndex": 53,
                "weight": 1.1,
                "price": 100000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "60": {
                "id": 120,
                "description": "Штаны с принтами",
                "propIndex": 60,
                "weight": 1.2,
                "price": 15000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "78": {
                "id": 120,
                "description": "Джинсовые шорты поверх колготок",
                "propIndex": 78,
                "weight": 1,
                "price": 4000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "87": {
                "id": 120,
                "description": "Лосины",
                "propIndex": 87,
                "weight": 0.8,
                "price": 4000,
                "clothes": "legs",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_jeans_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            }
        },
        "feet": {
            "0": {
                "id": 121,
                "description": "Обычные туфли",
                "propIndex": 0,
                "weight": 1,
                "price": 275,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "1": {
                "id": 121,
                "description": "Дешевые кеды",
                "propIndex": 1,
                "weight": 1,
                "price": 500,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "3": {
                "id": 121,
                "description": "Серые кеды",
                "propIndex": 3,
                "weight": 1,
                "price": 300,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "8": {
                "id": 121,
                "description": "Туфли с вырезом",
                "propIndex": 8,
                "weight": 1.5,
                "price": 1000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "10": {
                "id": 121,
                "description": "Беговые кроссовки",
                "propIndex": 10,
                "weight": 1,
                "price": 1500,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "13": {
                "id": 121,
                "description": "Балетные туфли",
                "propIndex": 13,
                "weight": 0.7,
                "price": 4000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "14": {
                "id": 121,
                "description": "Изящные туфли на каблуке",
                "propIndex": 14,
                "weight": 0.8,
                "price": 17000,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "27": {
                "id": 121,
                "description": "Черные кроссовки",
                "propIndex": 27,
                "weight": 1,
                "price": 300,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "42": {
                "id": 121,
                "description": "Классические туфли на каблуке",
                "propIndex": 42,
                "weight": 0.6,
                "price": 29333,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "43": {
                "id": 121,
                "description": "Туфли со шнуровкой",
                "propIndex": 43,
                "weight": 1.5,
                "price": 1500,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "80": {
                "id": 121,
                "description": "Кроссовки",
                "propIndex": 80,
                "weight": 1,
                "price": 33333,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            },
            "81": {
                "id": 121,
                "description": "Кроссовки с неоновой подошвой",
                "propIndex": 81,
                "weight": 1,
                "price": 66666,
                "clothes": "feet",
                "count": 1,
                "maxCount": 1,
                "model": "prop_ld_shoe_01",
                "rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "gender": 1
            }
        }
    }
]

// this will increase by 1 every time a player is sent to the character creator
let creatorDimension = 1;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

mp.events.add("playerJoin", (player) => {
    player.colorForOverlayIdx = function(index) {
        let color;

        switch (index) {
            case 1:
                color = this.customCharacter.BeardColor;
            break;

            case 2:
                color = this.customCharacter.EyebrowColor;
            break;

            case 5:
                color = this.customCharacter.BlushColor;
            break;

            case 8:
                color = this.customCharacter.LipstickColor;
            break;

            case 10:
                color = this.customCharacter.ChestHairColor;
            break;

            default:
                color = 0;
        }

        return color;
    };

    player.defaultCharacter = function() {
        this.customCharacter = {
            Gender: 0,

            Parents: {
                Father: 0,
                Mother: 0,
                Similarity: 1.0,
                SkinSimilarity: 1.0
            },

            Features: [],
            Appearance: [],

            Hair: {
                Hair: 0,
                Color: 0,
                HighlightColor: 0
            },

            EyebrowColor: 0,
            BeardColor: 0,
            EyeColor: 0,
            BlushColor: 0,
            LipstickColor: 0,
            ChestHairColor: 0,
			Inventory: {
				'inventory-box': [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
				'fast-access-box': [{}, {}, {}, {}, {}],
				'head': [{}, {}],
				'body': [{}],
				'middle': [{}],
				'arm': [{}],
				'legs': [{}],
				'feet': [{}],
				'information': [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
				'trading-box': [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
				'trader-cells': [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
			},
			health: 100,
			water: 100,
			satiety: 100,
        };

        for (let i = 0; i < 20; i++) this.customCharacter.Features.push(0.0);
        for (let i = 0; i < 10; i++) this.customCharacter.Appearance.push({Value: 255, Opacity: 1.0});
        this.applyCharacter();
    };

    player.applyCharacter = function() {
		try{
			if(player.work)
				mp.events.call(player.faction + ':clothes', player);
			player.setCustomization(
				player.customCharacter.Gender == 0,

				player.customCharacter.Parents.Mother,
				player.customCharacter.Parents.Father,
				0,

				player.customCharacter.Parents.Mother,
				player.customCharacter.Parents.Father,
				0,

				player.customCharacter.Parents.Similarity,
				player.customCharacter.Parents.SkinSimilarity,
				0.0,

				player.customCharacter.EyeColor,
				player.customCharacter.Hair.Color,
				player.customCharacter.Hair.HighlightColor,

				player.customCharacter.Features
			);

			player.setClothes(2, player.customCharacter.Hair.Hair, 0, 2);
			if(player.customCharacter.Inventory.head[0].id !== undefined && player.customCharacter.Inventory.head[0].description !== 'Рабочая одежда') player.setProp(0, player.customCharacter.Inventory.head[0].propIndex, player.customCharacter.Inventory.head[0].color); // head
			else if(player.customCharacter.Inventory.head[0].id === undefined) player.setProp(0, player.customCharacter.Gender ? 120 : 8, 0);
			
			if(player.customCharacter.Inventory.middle[0].id === undefined && player.customCharacter.Inventory.body[0].id === undefined)
			{
				player.setClothes(8, 15, 0, 2); // bg body
				player.setClothes(3, 15, 0, 2); // toros
				player.setClothes(11, 15, 0, 2); // body
			} else if(player.customCharacter.Inventory.middle[0].id !== undefined && player.customCharacter.Inventory.middle[0].description !== 'Рабочая одежда' && player.customCharacter.Inventory.body[0].id === undefined){
				player.setClothes(8, 15, 0, 2); // bg body
				player.setClothes(3, player.customCharacter.Inventory.middle[0].propIndexToros, 0, 2); // toros
				player.setClothes(11, player.customCharacter.Inventory.middle[0].propIndex, player.customCharacter.Inventory.middle[0].color, 2); // body
				
			} else if(player.customCharacter.Inventory.middle[0].id !== undefined && player.customCharacter.Inventory.middle[0].description !== 'Рабочая одежда' && player.customCharacter.Inventory.body[0].id !== undefined && player.customCharacter.Inventory.body[0].description !== 'Рабочая одежда'){
				player.setClothes(8, player.customCharacter.Inventory.body[0].propIndexBody, player.customCharacter.Inventory.middle[0].color, 2); // bg body
				player.setClothes(3, parseInt(player.customCharacter.Inventory.body[0].propIndexToros), 0, 2); // toros
				player.setClothes(11, player.customCharacter.Inventory.body[0].propIndex, player.customCharacter.Inventory.body[0].color, 2); // body
			} else if(player.customCharacter.Inventory.body[0].description !== 'Рабочая одежда'){
				player.setClothes(8, player.customCharacter.Inventory.body[0].propIndexBody, 0, 2); // bg body
				player.setClothes(3, parseInt(player.customCharacter.Inventory.body[0].propIndexToros), 0, 2); // toros
				player.setClothes(11, player.customCharacter.Inventory.body[0].propIndex, player.customCharacter.Inventory.body[0].color, 2); // body
			}
			if(player.customCharacter.Inventory.legs[0].propIndex === undefined)
				player.setClothes(4, player.customCharacter.Gender ? 10 : 21, 0, 2);
			else if(player.customCharacter.Inventory.legs[0].description !== 'Рабочая одежда')
				player.setClothes(4, player.customCharacter.Inventory.legs[0].propIndex, player.customCharacter.Inventory.legs[0].color, 2); // legs
			
			if(player.customCharacter.Inventory.feet[0].propIndex === undefined)
				player.setClothes(6, player.customCharacter.Gender ? 35 : 34, 0, 2);
			else if(player.customCharacter.Inventory.feet[0].description !== 'Рабочая одежда')
				player.setClothes(6, player.customCharacter.Inventory.feet[0].propIndex, player.customCharacter.Inventory.feet[0].color, 2); // shoes
			//player.setVariable('satiety', this.customCharacter.satiety);
			//player.setVariable('water', this.customCharacter.water);
			//player.health = this.customCharacter.health;
			for (let i = 0; i < 10; i++) player.setHeadOverlay(i, [player.customCharacter.Appearance[i].Value, player.customCharacter.Appearance[i].Opacity, player.colorForOverlayIdx(i), 0]);
		} catch(e) {}
    };
	
    player.loadCharacter = function(player) {
		DB.Handle.query("SELECT data FROM players_data WHERE Nickname = ? LIMIT 1", [player.data.nickname], async function(e, result) {
			if ( result.length ) {
				player.customCharacter = JSON.parse(decodeURIComponent(escape(result[0]["data"])));
				player.applyCharacter();
				player.data.inventory = JSON.parse(JSON.stringify(player.customCharacter.Inventory));
				for(let box in player.data.inventory){
					for(let j=0; j<player.data.inventory[box].length; j++){
						if(JSON.stringify(player.data.inventory[box][j]).length === 2) continue;
						player.call('updateInventory', [box, j, player.data.inventory[box][j].id, player.data.inventory[box][j].description, 0, player.data.inventory[box][j].count, player.data.inventory[box][j].weight, player.data.inventory[box][j].gender]);
					}
				}
			}
		});
    };

    player.saveCharacter = function() {
		if(player.customCharacter === undefined) return;
		let smth = JSON.parse(JSON.stringify(player.customCharacter));
		try{
			if(smth.Inventory.head[0].description === 'Рабочая одежда')
				smth.Inventory.head[0] = {};
			if(smth.Inventory.middle[0].description === 'Рабочая одежда')
				smth.Inventory.middle[0] = {};
			if(smth.Inventory.body[0].description === 'Рабочая одежда')
				smth.Inventory.body[0] = {};
			if(smth.Inventory.feet[0].description === 'Рабочая одежда')
				smth.Inventory.feet[0] = {};
			if(smth.Inventory.legs[0].description === 'Рабочая одежда')
				smth.Inventory.legs[0] = {};
		} catch(e) {}
		if(player.getVariable('satiety') < 0)
			smth.satiety = 0;
		else
			smth.satiety = player.getVariable('satiety');
		if(player.getVariable('water') < 0)
			smth.water = 0;
		else
			smth.water = player.getVariable('water');
		smth.data = [];
		smth.data.jail = player.data.jail;
		smth.data.jail_minutes = player.data.jail_minutes;
		
		let keys = false;
		for(box in smth.Inventory)
			if(box !== 'information')
				for(let each=0; each<smth.Inventory[box].length; each++)
					if(smth.Inventory[box][each].description === 'Ключи от арендованной машины'){
						keys = smth.Inventory[box][each].entity;
						smth.Inventory[box][each] = {};	
					}
		DB.Handle.query(`UPDATE players_data set data = ? where Nickname = "${player.data.nickname}"`, [unescape(encodeURIComponent(JSON.stringify(smth, undefined, 0)))], function(e) {
			if ( e ) console.log ( e );
        });
    };
	
	player.saveCharacterAfterExit = function() {
		if(player.customCharacter === undefined) return;
		let smth = JSON.parse(JSON.stringify(player.customCharacter));
		try{
			if(smth.Inventory.head[0].description === 'Рабочая одежда')
				smth.Inventory.head[0] = {};
			if(smth.Inventory.middle[0].description === 'Рабочая одежда')
				smth.Inventory.middle[0] = {};
			if(smth.Inventory.body[0].description === 'Рабочая одежда')
				smth.Inventory.body[0] = {};
			if(smth.Inventory.feet[0].description === 'Рабочая одежда')
				smth.Inventory.feet[0] = {};
			if(smth.Inventory.legs[0].description === 'Рабочая одежда')
				smth.Inventory.legs[0] = {};
		} catch(e) {}
		
		if(player.getVariable('satiety') < 0)
			smth.satiety = 0;
		else
			smth.satiety = player.getVariable('satiety');
		if(player.getVariable('water') < 0)
			smth.water = 0;
		else
			smth.water = player.getVariable('water');
		smth.data = [];
		smth.data.jail = player.data.jail;
		smth.data.jail_minutes = player.data.jail_minutes;
		let keys = false;
		for(box in smth.Inventory)
			if(box !== 'information')
				for(let each=0; each<smth.Inventory[box].length; each++)
					if(smth.Inventory[box][each].description === 'Ключи от арендованной машины'){
						keys = smth.Inventory[box][each].entity;
						smth.Inventory[box][each] = {};	
					}
		if(keys)
		{
			mp.vehicles.forEach((veh) => {
				if(veh.getVariable('keys') === keys){
					veh.setVariable("owner", null);
					veh.setVariable("engine", false);
					veh.setVariable("vehDoors", true);
					veh.engine = false;
					veh.locked = true;
				}
			});
		}
        DB.Handle.query(`UPDATE players_data set data = ? where Nickname = "${player.data.nickname}"`, [unescape(encodeURIComponent(JSON.stringify(smth, undefined, 0)))], function(e) {
			if ( e ) console.log ( e );
        });
	};

    player.sendToCreator = function() {
        this.position = creatorPlayerPos;
        this.heading = creatorPlayerHeading;
        this.dimension = creatorDimension;
        this.usingCreator = true;
        this.changedGender = false;
		this.defaultCharacter();
        this.call("createNewPerson");
		if(creatorDimension === 999) creatorDimension = 0;
        creatorDimension++;
    };

    player.sendToWorld = function() {
		this.data.inventory = JSON.parse(JSON.stringify(this.customCharacter.Inventory));
		for(let box in this.data.inventory){
			for(let j=0; j<this.data.inventory[box].length; j++){
				if(JSON.stringify(this.data.inventory[box][j]).length === 2) continue;
				this.call('updateInventory', [box, j, this.data.inventory[box][j].id, this.data.inventory[box][j].description, 0, this.data.inventory[box][j].count, this.data.inventory[box][j].weight, this.data.inventory[box][j].gender]);
			}
		}
		setTimeout(() => {
			this.setVariable('satiety', this.customCharacter.satiety);
			this.setVariable('water', this.customCharacter.water);
			if(this.phone === '-1')
			{
				let newSim = getRandomInt(1000000, 9999999);
				DB.Handle.query(`UPDATE players set Sim = ${newSim} WHERE Nickname = ?`, [this.data.nickname], function(e, result) {
					if(e) console.log(e);
				});
				this.setVariable('phone', newSim);
			} else
				this.setVariable('phone', this.phone);
			this.freeCars = [];
			this.data.login = true;
			this.data.jail = undefined;
			this.data.jail_minutes = undefined;
			this.data.cash = 2000;
			this.data.card = 0;
			this.data.bank = -1;
			this.dimension = 0;
			this.sspawn(new mp.Vector3(99.21345, -1914.59546, 21.03002));
			this.health = this.customCharacter.health;
			this.heading = 100;
			this.usingCreator = false; 
			this.changedGender = false;
			this.faction = 'None';
			this.level = 0;
			this.admin = 0;
			setInterval(function() {
				try{
				DB.Handle.query(`SELECT Cash, Card FROM players WHERE Nickname = "${this.data.nickname}" LIMIT 1`, function(e, result) {
					if(this.data.cash !== parseInt(result[0]['Cash']) || this.data.card !== parseInt(result[0]['Card'])){
						this.data.card = parseInt(result[0]['Card']);
						this.data.cash = parseInt(result[0]['Cash']);
						
						this.call("UpdateMoneyClient", [this.data.cash, this.data.card, this.admin]);
					}
				});
				} catch(e){}
			}, 5000);
			this.call("hud", [this.data.cash, this.data.card, this.data.bank, this.phone, this.admin, this.data.realSQLID, this.data.nickname, this.customCharacter.Gender, this.level, true, this.login]);
		}, 300);
    };
});

mp.events.add("creator_Save", (player, gender, parentData, featureData, appearanceData, hairAndColorData, clothes, nickname) => {
	player.defaultCharacter();
	player.data.nickname = nickname;
    player.customCharacter.Gender = gender;
    player.customCharacter.Parents = JSON.parse(parentData);
    player.customCharacter.Features = JSON.parse(featureData);
    player.customCharacter.Appearance = JSON.parse(appearanceData);
	creator_clothes = JSON.parse(clothes);
	if(creator_clothes[0] !== '-'){
		player.customCharacter.Inventory.head[0] = JSON.parse(JSON.stringify(global.invObj[gender].head[String(creator_clothes[0])]));
		player.customCharacter.Inventory.head[0].color = 0;
	} 
	player.customCharacter.Inventory.middle[0] = JSON.parse(JSON.stringify(global.invObj[gender].middle[String(creator_clothes[1])]));
	player.customCharacter.Inventory.middle[0].color = 0;
	player.customCharacter.Inventory.legs[0] = JSON.parse(JSON.stringify(global.invObj[gender].legs[String(creator_clothes[2])]));
	player.customCharacter.Inventory.legs[0].color = 0;
	player.customCharacter.Inventory.feet[0] = JSON.parse(JSON.stringify(global.invObj[gender].feet[String(creator_clothes[3])]));
	player.customCharacter.Inventory.feet[0].color = 0;
    let hairAndColors = JSON.parse(hairAndColorData);
    player.customCharacter.Hair = {Hair: hairAndColors[0], Color: hairAndColors[1], HighlightColor: hairAndColors[2]};
    player.customCharacter.EyebrowColor = hairAndColors[3];
    player.customCharacter.BeardColor = hairAndColors[4];
    player.customCharacter.EyeColor = hairAndColors[5];
    player.customCharacter.BlushColor = hairAndColors[6];
    player.customCharacter.LipstickColor = hairAndColors[7];
    player.customCharacter.ChestHairColor = hairAndColors[8];
	player.customCharacter.satiety = 100;
    player.customCharacter.water = 100
    player.customCharacter.health = 100;
	player.customCharacter.data = [];
	DB.Handle.query('INSERT INTO players_data(Nickname, data) VALUES (?, ?)', [player.data.nickname, unescape(encodeURIComponent(JSON.stringify(player.customCharacter)))], function(e, result) {
		if(e) return console.log(e);
	});
	
    player.applyCharacter();
    player.sendToWorld();
});

mp.events.add("updateSexOption", (player, model) =>{
	player.model = mp.joaat(['mp_m_freemode_01', 'mp_f_freemode_01'][model])
});

mp.events.add("CreateNewPlayer", (player) =>{
    player.sendToCreator();
});