const fathers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 42, 43, 44];
const mothers = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45];
const fatherNames = ["Бенджамин", "Даниэль", "Джошуа", "Ной", "Эндрю", "Ян", "Алекс", "Исаак", "Эван", "Итан", "Винцент", "Ангел", "Диего", "Эдриан", "Габриэль", "Митчел", "Сантьяго", "Кевин", "Льюис", "Сэмюэль", "Энтони", "Клод", "Нико", "Джон"]; 
const motherNames = ["Ханна", "Обри", "Жасмин", "Жизель", "Амелия", "Изабелла", "Зоя", "Ава", "Камила", "Виолетта", "София", "Эвелин", "Николь", "Эшли", "Грейси", "Бриана", "Натали", "Оливия", "Елизавета", "Шарлотта", "Эмма", "Мисти"];
const featureNames = ["Nose Width", "Nose Bottom Height", "Nose Tip Length", "Nose Bridge Depth", "Nose Tip Height", "Nose Broken", "Brow Height", "Brow Depth", "Cheekbone Height", "Cheekbone Width", "Cheek Depth", "Eye Size", "Lip Thickness", "Jaw Width", "Jaw Shape", "Chin Height", "Chin Depth", "Chin Width", "Chin Indent", "Neck Width"];
const appearanceNames = ["Blemishes", "Facial Hair", "Eyebrows", "Ageing", "Makeup", "Blush", "Complexion", "Sun Damage", "Lipstick", "Moles & Freckles", "Chest Hair"];

const appearanceItemNames = [
    // blemishes
    ["Нет", "Корь", "Прыщи", "Пятна", "Поврежденная", "Угри", "Выстроеный", "Пустулы", "Прыщи", "Все в прыщах", "Прыщи", "Сыпь на щеке", "Сыпь на лице", "Отметины", "Пубертат", "След на глазу", "Сыпь на подбородке", "Двуличие", "Т-зона", "Сальный", "Отмеченный", "Пораженный акне", "Лицо в следах акне", "Герпис", "Импетиго"],
    // facial hair
    ["Гладкая кожа", "Легкая щетина", "Бальбо", "Круглая борода", "Эспаньолка", "Козлиная бородка", "Островок", "Тонкая бородка", "Короткая бородка", "мушкетер", "Усы", "Подстриженная борода", "Щетина", "Круглая борода", "Борода-подкова", "Карандашные усы и баки", "Борода-ремень", "Бальбо и баки", "Баки", "Короткая бородка", "Дали", "Дали и борода", "Велосипедный руль", "Островок с усами", "Английские усы с пеньком", "Голливудская борода", "Фу Манчу", "Островок с баками", "Широкие баки", "Борода Ширма"],
    // eyebrows
    ["Нет", "Аккуратные", "Модные", "Клеопатра", "Ироничные", "Женственные", "Обольстительные", "нахмуренные", "Чикса", "Торжественные", "Беззаботные", "Дугой", "Мышка", "Двойная высечка", "Впалые", "Нарисованные карандашом", "Выщипанные", "Прямые и тонкие", "Естественные", "Пышные", "Неопрятные", "Широкие", "Обычные", "Южноевропейские", "Ухоженные", "Кустистые", "Перышки", "Колючие", "Сросшиеся", "Крылатые", "Тройная высечка", "Высечка дугой", "Подрезанные", "Сходящие на нет", "Высечка"],
    // ageing
    ["Нет", "Морщины в уголках глаз", "Первые признаки", "Средний возраст", "Морщины на лбу", "Депрессия", "Милый", "Пожилой", "Выветрившееся лицо", "Морщинистый", "Провисшее лицо", "Жестокая жизнь", "Винтажное лицо", "Пенсионер", "Наркоман", "Старый"],
    // makeup
    ["Нет", "Дымчато-черный", "Бронзовый", "Мягкий серый", "Ретро гламур", "Естественный", "Кошачьи глаза", "Чикса", "Вамп", "Вайнвуд гламур", "Баблгам", "Мечта о море", "Пин-ап", "Лиловая страсть", "Дымчатые кошачьи глаза", "Огненный рубин", "Поп певица"],
    // blush
    ["Нет", "Полный", "Угол", "Круг", "Горизонтальный", "Вертикальный", "Влюбленность", "Восьмидесятые"],
    // complexion
    ["Нет", "Румяные щеки", "Сыпь", "Горячий", "Загарелый", "Ушибленный", "Алкоголик", "Пятнистый", "Тотем", "Кровавый сосуд", "Поврежденный", "Бледный", "Призрачный"],
    // sun damage
    ["Нет", "Неравномерные", "Шероховатые", "Пятнистый", "Грубые", "Толстая кожа", "Текстурированная", "Грубая", "Неровная", "Складчатая", "Потрескавшаяся", "Песчаная"],
    // lipstick
    ["Нет", "Цветные матовые", "Цветные блестящие", "Контур, матовые", "Контур, блестящие", "Жирный контур, матовые", "Жирный контур, блестящие", "Некрашеные, контур, матовые", "Некрашеные, контур, блеск", "Размазанная помада", "Гейша"],
    // freckles
    ["Нет", "Розовощекий", "Повсюду", "Неравномерные", "Точечные", "По две стороны", "Кукольное лицо", "Фея", "Солнечный поцелуй", "Знак красоты", "Выставленные", "Моделеск", "Случайные", "Пестрые", "Капли дождя", "Двойной куш", "С одной стороны", "Пары", "Множество"],
    // chest hair
    ["Бритая", "Естественные", "Полоска", "Дерево", "Волосатая", "Заросшая", "Обезьяна", "Причесанная обезьяна", "Бикини", "Молния", "Обратная молния", "Сердечко", "Усы", "Смайлик", "Череп", "Тропинка", "Тропинка и соски", "Волосатые руки"]
];

const hairList = [
    // male
    [
        {ID: 0, Name: "Налысо", Collection: "mpbeach_overlays", Overlay: "FM_Hair_Fuzz"},
        {ID: 1, Name: "Коротко", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_001"},
        {ID: 2, Name: "Ястреб", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_002"},
        {ID: 3, Name: "Хипстер", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_003"},
        {ID: 4, Name: "Челка набок", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_004"},
        {ID: 5, Name: "Коротко", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_005"},
        {ID: 6, Name: "Байкер", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_006"},
        {ID: 7, Name: "Хвост", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_007"},
        {ID: 8, Name: "Косички", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_008"},
        {ID: 9, Name: "Прилаза", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_009"},
        {ID: 10, Name: "Коротко", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_013"},
        {ID: 11, Name: "Шипы", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_002"},
        {ID: 12, Name: "Цезарь", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_011"},
        {ID: 13, Name: "Чоппи", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_012"},
        {ID: 14, Name: "Дреды", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_014"},
        {ID: 15, Name: "Длинные", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_015"},
        {ID: 16, Name: "Лохматые кудри", Collection: "multiplayer_overlays", Overlay: "NGBea_M_Hair_000"},
        {ID: 17, Name: "Серфингист", Collection: "multiplayer_overlays", Overlay: "NGBea_M_Hair_001"},
        {ID: 18, Name: "Набок", Collection: "multiplayer_overlays", Overlay: "NGBus_M_Hair_000"},
        {ID: 19, Name: "Зализ", Collection: "multiplayer_overlays", Overlay: "NGBus_M_Hair_001"},
        {ID: 20, Name: "Длинные", Collection: "multiplayer_overlays", Overlay: "NGHip_M_Hair_000"},
        {ID: 21, Name: "Юный хипстер", Collection: "multiplayer_overlays", Overlay: "NGHip_M_Hair_001"},
        {ID: 22, Name: "Маллет", Collection: "multiplayer_overlays", Overlay: "NGInd_M_Hair_000"},
        {ID: 24, Name: "Классические косички", Collection: "mplowrider_overlays", Overlay: "LR_M_Hair_000"},
        {ID: 25, Name: "Косички-пальмы", Collection: "mplowrider_overlays", Overlay: "LR_M_Hair_001"},
        {ID: 26, Name: "Косички молнии", Collection: "mplowrider_overlays", Overlay: "LR_M_Hair_002"},
        {ID: 27, Name: "Зачесанные наверх косички", Collection: "mplowrider_overlays", Overlay: "LR_M_Hair_003"},
        {ID: 28, Name: "Косички Зиг-Заг", Collection: "mplowrider2_overlays", Overlay: "LR_M_Hair_004"},
        {ID: 29, Name: "Косички-змеи", Collection: "mplowrider2_overlays", Overlay: "LR_M_Hair_005"},
        {ID: 30, Name: "Хай-топ", Collection: "mplowrider2_overlays", Overlay: "LR_M_Hair_006"},
        {ID: 31, Name: "Растрепаный назад", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_000_M"},
        {ID: 32, Name: "Подстриженный назад", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_001_M"},
        {ID: 33, Name: "Подстриженный набок", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_002_M"},
        {ID: 34, Name: "Шипастый ирокез", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_003_M"},
        {ID: 35, Name: "Стиляга", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_004_M"},
        {ID: 36, Name: "Стиляга со слоями", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_005_M"},
        {ID: 72, Name: "Ежик", Collection: "mpgunrunning_overlays", Overlay: "MP_Gunrunning_Hair_M_000_M"},
        {ID: 73, Name: "Армейская стрижка", Collection: "mpgunrunning_overlays", Overlay: "MP_Gunrunning_Hair_M_001_M"}
    ],
    // female
    [
        {ID: 0, Name: "Налысо", Collection: "mpbeach_overlays", Overlay: "FM_Hair_Fuzz"},
        {ID: 1, Name: "Коротко", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_001"},
        {ID: 2, Name: "Боб со слоями", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_002"},
        {ID: 3, Name: "Косы", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_003"},
        {ID: 4, Name: "Хвост", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_004"}, 
        {ID: 5, Name: "Ирокез", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_005"},
        {ID: 6, Name: "Косички", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_006"},
        {ID: 7, Name: "Боб", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_007"},
        {ID: 8, Name: "Ястреб", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_008"},
        {ID: 9, Name: "Ракушка", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_009"},
        {ID: 10, Name: "Лонг боб", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_010"},
        {ID: 11, Name: "Свободно", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_011"},
        {ID: 12, Name: "Пикси", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_012"},
        {ID: 13, Name: "Побритые виски", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_013"},
        {ID: 14, Name: "Топ Кнот", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_014"},
        {ID: 15, Name: "Волнистый Боб", Collection: "multiplayer_overlays", Overlay: "NG_M_Hair_015"},
        {ID: 16, Name: "Грязная булочка", Collection: "multiplayer_overlays", Overlay: "NGBea_F_Hair_000"},
        {ID: 17, Name: "Девушка Пинап", Collection: "multiplayer_overlays", Overlay: "NGBea_F_Hair_001"},
        {ID: 18, Name: "Пучок", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_007"},
        {ID: 19, Name: "Витой Боб", Collection: "multiplayer_overlays", Overlay: "NGBus_F_Hair_000"},
        {ID: 20, Name: "Флоппер Боб", Collection: "multiplayer_overlays", Overlay: "NGBus_F_Hair_001"},
        {ID: 21, Name: "Большой взрыв", Collection: "multiplayer_overlays", Overlay: "NGBea_F_Hair_001"},
        {ID: 22, Name: "Плетеный Топ Кнот", Collection: "multiplayer_overlays", Overlay: "NGHip_F_Hair_000"},
        {ID: 23, Name: "Маллет", Collection: "multiplayer_overlays", Overlay: "NGInd_F_Hair_000"},
        {ID: 25, Name: "Плетеные косички", Collection: "mplowrider_overlays", Overlay: "LR_F_Hair_000"},
        {ID: 26, Name: "Лист-косичка", Collection: "mplowrider_overlays", Overlay: "LR_F_Hair_001"},
        {ID: 27, Name: "Косичка Зиг-Заг", Collection: "mplowrider_overlays", Overlay: "LR_F_Hair_002"},
        {ID: 28, Name: "Челка с косичками", Collection: "mplowrider2_overlays", Overlay: "LR_F_Hair_003"},
        {ID: 29, Name: "Волнистые косы", Collection: "mplowrider2_overlays", Overlay: "LR_F_Hair_003"},
        {ID: 30, Name: "Завитые косы", Collection: "mplowrider2_overlays", Overlay: "LR_F_Hair_004"},
        {ID: 31, Name: "Квифф", Collection: "mplowrider2_overlays", Overlay: "LR_F_Hair_006"},
        {ID: 32, Name: "Растрепаный назад", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_000_F"},
        {ID: 33, Name: "Подстриженный назад", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_001_F"},
        {ID: 34, Name: "Подстриженный набок", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_002_F"},
        {ID: 35, Name: "Шипастый ирокез", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_003_F"},
        {ID: 36, Name: "Bandana and Braid", Collection: "multiplayer_overlays", Overlay: "NG_F_Hair_003"},
        {ID: 37, Name: "Стиляга со слоями", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_006_F"},
        {ID: 38, Name: "Скинбёрд", Collection: "mpbiker_overlays", Overlay: "MP_Biker_Hair_004_F"},
        {ID: 76, Name: "Пучок", Collection: "mpgunrunning_overlays", Overlay: "MP_Gunrunning_Hair_F_000_F"},
        {ID: 77, Name: "Короткий Боб", Collection: "mpgunrunning_overlays", Overlay: "MP_Gunrunning_Hair_F_001_F"}
    ]
];

const characteristics = {
	'Ширина носа': {
		'Очень маленькая': -0.8,
		'Маленькая': -0.3,
		'Cредняя': 0,
		'Большая': 0.3,
		'Очень большая': 0.8
    },
	'Высота носа': {
		'Очень низко': 0.8,
		'Низко': 0.3,
		'Средне': 0,
		'Высоко': -0.3,
		'Очень высоко': -0.8
    },
	'Длина кончика носа': {
		'Очень короткий': 0.8,
		'Короткий': 0.3,
		'Средний': 0,
		'Длинный': -0.3,
		'Очень длинный': -0.8
    },
	'Переносица': {
		'Очень неглубокая': -0.8,
		'Неглубокая': -0.3,
		'Средняя': 0,
		'Глубокая': 0.3,
		'Очень глубокая': 0.8
    },
	'Высота кончика носа': {
		'Очень низко': 0.8,
		'Низко': 0.3,
		'Средне': 0,
		'Высоко': -0.3,
		'Очень высоко': -0.8
    },
	'Надломанность носа': {
		'Очень слабо': -0.8,
		'Слабо': -0.3,
		'Средне': 0,
		'Сильно': 0.3,
		'Очень сильно': 0.8
    },
	'Высота бровей': {
		'Очень низко': 0.8,
		'Низко': 0.3,
		'Средне': 0,
		'Высоко': -0.3,
		'Очень высоко': -0.8
    },
	'Брови': {
		'Очень не выпирают': -0.8,
		'Не выпирают': -0.3,
		'Средне': 0,
		'Выпирают': 0.3,
		'Очень выпирают': 0.8
    },
	'Высота скул': {
		'Очень низко': 0.8,
		'Низко': 0.3,
		'Средне': 0,
		'Высоко': -0.3,
		'Очень высоко': -0.8
    },
	'Ширина скул': {
		'Очень узкие': -0.8,
		'Узкие': -0.3,
		'Средние': 0,
		'Широкие': 0.3,
		'Очень широкие': 0.8
    },
	'Щеки': {
		'Очень худые': 0.8,
		'Худые': 0.3,
		'Средние': 0,
		'Пухлые': -0.3,
		'Очень пухлые': -0.8
    },
	'Глаза': {
		'Очень маленькие': 0.8,
		'Маленькие': 0.3,
		'Средние': 0,
		'Большие': -0.3,
		'Очень большие': -0.8
    },
	'Губы': {
		'Очень маленькие': 0.8,
		'Маленькие': 0.3,
		'Средние': 0,
		'Большие': -0.3,
		'Очень большие': -0.8
    },
	'Ширина челюсти': {
		'Очень узкая': -0.8,
		'Узкая': -0.3,
		'Средняя': 0,
		'Широкая': 0.3,
		'Очень широкая': 0.8
    },
	'Форма челюсти': {
		'Очень маленькая': -0.8,
		'Маленькая': -0.3,
		'Средняя': 0,
		'Большая': 0.3,
		'Очень большая': 0.8
    },
	'Высота подбородка': {
		'Очень низко': -0.8,
		'Низко': -0.3,
		'Средне': 0,
		'Высоко': 0.3,
		'Очень высоко': 0.8
    },
	'Подбородок': {
		'Очень маленький': -0.8,
		'Маленький': -0.3,
		'Средний': 0,
		'Большой': 0.3,
		'Очень большой': 0.8
    },
	'Ширина подбородка': {
		'Очень узко': -0.8,
		'Узко': -0.3,
		'Средне': 0,
		'Широко': 0.3,
		'Очень широко': 0.8
    },
	'Вмятина': {
		'Очень маленькая': -0.8,
		'Маленькая': -0.3,
		'Средняя': 0,
		'Большая': 0.3,
		'Очень большая': 0.8
    },
	'Шея': {
		'Очень маленькая': -0.8,
		'Маленькая': -0.3,
		'Средняя': 0,
		'Большая': 0.3,
		'Очень большая': 0.8
	}
}


var womans = [{
	'Нет': '-',  // 0
	'Дешевая шапка': 5,
	'Дешевая кепка': 7
},
{
	'Обычные джинсы': 0, // 4
	'Серые джинсы': 1,
	'Короткие штаны': 2
},
{
	'Дешевые кеды': 1,  // 6
	'Серые кеды': 3,
	'Черные кроссовки': 27
},
{
	'Обычная футболка': 0,  ///////////// края 4
	'Длинная футболка': 2,   ///////////// середина 4
	'Белый топ': 5  ///// все тело 4
}];

var man = [{
	'Нет': '-',  // 0
	'Черная шапка': 5,
	'Дешевая кепка': 7
},
{
	'Синие джинсы': 0, // 4
	'Дешевые джинсы': 1,
	'Спортивные штаны': 3
},
{
	'Обычные кеды': 1, // 6
	'Дешевые кеды': 4,
	'Повседневные кроссовки': 7
},
{
	'Обычная футболка': 0, // 11 ///////////// 0
	'Белая майка': 5,  ///////////// 5
	'Серая футболка': 16 ///////////// 0
}];



const eyeColors = ["Green", "Emerald", "Light Blue", "Ocean Blue", "Light Brown", "Dark Brown", "Hazel", "Dark Gray", "Light Gray", "Pink", "Yellow", "Purple", "Blackout", "Shades of Gray", "Tequila Sunrise", "Atomic", "Warp", "ECola", "Space Ranger", "Ying Yang", "Bullseye", "Lizard", "Dragon", "Extra Terrestrial", "Goat", "Smiley", "Possessed", "Demon", "Infected", "Alien", "Undead", "Zombie"];

exports = {
    fathers: fathers,
    mothers: mothers,
    fatherNames: fatherNames,
    motherNames: motherNames,
    featureNames: featureNames,
    appearanceNames: appearanceNames,
    appearanceItemNames: appearanceItemNames,
    hairList: hairList,
    eyeColors: eyeColors,
    maxHairColor: 64,
    maxEyeColor: 32,
    maxBlushColor: 27,
    maxLipstickColor: 32,
	characteristics: characteristics,
	manOutfit: man,
	womanOutfit: womans 
};