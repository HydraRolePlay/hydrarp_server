global.tunningBrowser;
global.tunningBrowserIsOpen = false;
var vehicles = [
	{
		"hash": "mig",
		"name": "Ferrari Enzo & Gemballa MIG-U1",
		"speed": 350,
		"acceleration": 3.2,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "macan",
		"name": "Porsche Macan Turbo S",
		"speed": 345,
		"acceleration": 2.5,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "jes",
		"name": "Koenigsegg Jesko",
		"speed": 480,
		"acceleration": 3.1,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "agerars",
		"name": "Koenigsegg Agera RS",
		"speed": 447,
		"acceleration": 3.5,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "p1",
		"name": "McLaren P1",
		"speed": 370,
		"acceleration": 2.8,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "720s",
		"name": "McLaren 720S",
		"speed": 341,
		"acceleration": 2.9,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "600lt",
		"name": "McLaren 600LT",
		"speed": 330,
		"acceleration": 2.9,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "mlnovitec",
		"name": "Maserati Levante Novitec",
		"speed": 280,
		"acceleration": 4.8,
		"braking": 0.9,
		"managment": 0.9,
	},
	{
		"hash": "bc",
		"name": "Pagani Huayra BC",
		"speed": 370,
		"acceleration": 3.3,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "mgt",
		"name": "Ford Mustang GT",
		"speed": 320,
		"acceleration": 4.8,
		"braking": 0.9,
		"managment": 0.9,
	},
	{
		"hash": "fgt",
		"name": "Ford GT (2005)",
		"speed": 290,
		"acceleration": 4.8,
		"braking": 0.8,
		"managment": 0.8,
	},
	{
		"hash": "brabus850",
		"name": "Mercedes-Benz 850 Brabus",
		"speed": 280,
		"acceleration": 8.5,
		"braking": 0.8,
		"managment": 0.8,
	},
	{
		"hash": "bbentayga",
		"name": "Bentley Bentayga",
		"speed": 300,
		"acceleration": 4.3,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "ben17",
		"name": "Bentley Supersport",
		"speed": 340,
		"acceleration": 3.5,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "bmm",
		"name": "Bentley Mulsanne Mulliner",
		"speed": 305,
		"acceleration": 4.9,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "tts",
		"name": "Audi TTS",
		"speed": 240,
		"acceleration": 7.2,
		"braking": 0.8,
		"managment": 0.85,
	},
	{
		"hash": "lc500",
		"name": "Lexus LC 570",
		"speed": 280,
		"acceleration": 8.5,
		"braking": 0.8,
		"managment": 0.8,
	},
	{
		"hash": "lx570",
		"name": "Lexus LX 570",
		"speed": 220,
		"acceleration": 7.7,
		"braking": 0.9,
		"managment": 1,
	},
	{
		"hash": "i8",
		"name": "BMW i8",
		"speed": 250,
		"acceleration": 4.6,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "g65amg",
		"name": "Mercedes-Benz G65 AMG",
		"speed": 210,
		"acceleration": 5.4,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "e63amg",
		"name": "Mercedes-Benz E63 AMG",
		"speed": 300,
		"acceleration": 3.4,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "gl63",
		"name": "Mercedes-Benz GL63 AMG",
		"speed": 250,
		"acceleration": 4.9,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "mlbrabus",
		"name": "Mercedes-Benz ML Brabus",
		"speed": 310,
		"acceleration": 4.2,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "ctsv16",
		"name": "Cadillac CTS-V",
		"speed": 320,
		"acceleration": 3.7,
		"braking": 0.9,
		"managment": 0.9,
	},
	{
		"hash": "911turbos",
		"name": "Porsche 911",
		"speed": 330,
		"acceleration": 2.7,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "918",
		"name": "Porsche 918",
		"speed": 345,
		"acceleration": 2.5,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "chiron17",
		"name": "Bugatti Chiron",
		"speed": 420,
		"acceleration": 2.5,
		"braking": 1,
		"managment": 1,
	},
	{
		"hash": "lada2107",
		"name": "LADA 2107",
		"speed": 140,
		"acceleration": 16,
		"braking": 0.2,
		"managment": 0.3,
	},
	{
		"hash": "lada10",
		"name": "LADA 2110",
		"speed": 160,
		"acceleration": 14,
		"braking": 0.3,
		"managment": 0.30,
	},
	{
		"hash": "bmwe38",
		"name": "BMW E38",
		"speed": 200,
		"acceleration": 14,
		"braking": 0.3,
		"managment": 0.30,
	},
	{
		"hash": "m5e60",
		"name": "BMW M5 E60 (2006)",
		"speed": 200,
		"acceleration": 14,
		"braking": 0.3,
		"managment": 0.30,
	}
]

// Tuning
var tunningData = {
	11: [-1, 0, 1, 2, 3], // Мотор
	12: [-1, 0, 1, 2], // Тормоза
	13: [-1, 0, 1, 2], // Коробка передач
	15: [-1, 0, 1, 2, 3], // Подвеска
	16: [-1, 2, 4], // Броня
	17: [-1, 0], // Турбо
	46: [-1, 0, 1, 2] // Стекла
}

let tunning_bis = [
	{x: 731.4427490234375, y: -1088.8388671875, z: 22.16901397705078, category: 8, heading: -88.81949615478516, name: 1},
	{x: -339.6382751464844, y: -137.36573791503906, z: 39.009666442871094, category: 8, heading: -108.2885971069336, name: 2},
	{x: -1155.645751953125, y: -2005.5780029296875, z: 13.180253982543945, category: 8, heading: 138.74786376953125, name: 3},
	{x: 1175.1234130859375, y: 2640.027099609375, z: 37.75382614135742, category: 8, heading: -177.69097900390625, name: 4},
	{x: 110.62012481689453, y: 6626.2841796875, z: 31.787229537963867, category: 8, heading: 44.12389373779297, name: 5},
]


mp.events.add({
	'tunning:OpenBrowser': (aaa) =>
	{
		let camPos = tunning_bis.filter(shop => shop.name === aaa);
		camPos = camPos[0];
		global.hud.execute(`HUD.show=0`);
		global.hud.execute(`help.show=0`);
		global.hud.execute(`logotype.show=0`);
		mp.game.ui.displayHud(false);
		mp.game.ui.displayRadar(false);
		global.cam = mp.cameras.new("Camera", {x: camPos.x - mp.game.system.sin(camPos.heading)*3, y: camPos.y + mp.game.system.cos(camPos.heading)*3, z: camPos.z + 0.65}, {x: 0, y: 0, z: 0}, 90);
		global.player_dont_close_iteraction = true;
		global.cam.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 0, true, false);
		global.cam.pointAtCoord(camPos.x, camPos.y, camPos.z - 0.3);		
		global.chat.show = false;
		global.chat.browser.execute(`setState('hidden')`);
		mp.gui.cursor.show(true, true);
		let vehMods = mp.players.local.vehicle.getVariable('mods');
		
		let player_veh = vehicles.filter(veh => veh.name === mp.players.local.vehicle.getVariable('name'))
		player_veh = player_veh[0];
		global.tunningBrowser = mp.browsers.new('package://cef/car-tunning/index.html');
		if(vehMods !== undefined && vehMods !== null)
			vehMods = JSON.parse(vehMods);
		else
			vehMods = {}
		let cou = 0;
		for(let i in tunningData){
			let index = Object.keys(vehMods).indexOf(i);
			if(index === -1){
				global.tunningBrowser.execute('itemList[Object.keys(itemList)[' + cou + ']][' + 0 + '].bought = true;')
				for(let j=0; j<tunningData[i].length; j++)
					if(j > 0)
						global.tunningBrowser.execute('itemList[Object.keys(itemList)[' + cou + ']][' + j + '].bought = false;')
			} else {
				let elem = vehMods[i] + 1;
				global.tunningBrowser.execute('itemList[Object.keys(itemList)[' + index + ']][' + elem + '].bought = true;');
				for(let j=0; j<tunningData[i].length; j++)
					if(j !== elem)
						global.tunningBrowser.execute('itemList[Object.keys(itemList)[' + cou + ']][' + j + '].bought = false;')
			}
			cou++;
		}
		global.tunningBrowser.execute('updateVehInfo(' + JSON.stringify(player_veh) + ')');
		
		mp.gui.cursor.show(true, true);
		global.tunningBrowserIsOpen = true;
	},
	'tunning:CloseBrowser': () =>
	{
		global.tunningBrowser.destroy();
		mp.gui.cursor.show(false, false);
		global.tunningBrowserIsOpen = false;
		global.player_dont_close_iteraction = false;
		global.hud.execute(`HUD.show=1`);
		global.hud.execute(`help.show=1`);
		global.hud.execute(`logotype.show=1`);
		global.chat.show = true;
		global.chat.browser.execute(`setState('transparent')`);
		mp.game.ui.displayHud(false);
		mp.game.ui.displayRadar(true);
		global.cam.setActive(false);
		mp.game.cam.renderScriptCams(false, true, 0, true, true);
		global.cam.destroy();
		global.cam = null;
		mp.events.callRemote('tunning:exitShop');
	},
	'tunning:SetItem': (first, second) =>
	{
		let player_veh = vehicles.filter(veh => veh.name === mp.players.local.vehicle.getVariable('name'))
		player_veh = player_veh[0];
		global.tunningBrowser.execute('vehData = ' + JSON.stringify(player_veh));
		global.tunningBrowser.execute('setNewVehInfo()');
		mp.players.local.vehicle.setMod(parseInt(Object.keys(tunningData)[first]), parseInt(tunningData[Object.keys(tunningData)[first]][second]));
	},
	'tunning:BuyItem': (first, second) =>
	{
		mp.events.callRemote('tunning:BuyItem', parseInt(Object.keys(tunningData)[first]), parseInt(tunningData[Object.keys(tunningData)[first]][second]));
	},	
	'tunning:updateItem': () =>
	{
		let vehMods = mp.players.local.vehicle.getVariable('mods');
		vehMods = JSON.parse(vehMods);
		let cou = 0;
		for(let i in tunningData){
			let index = Object.keys(vehMods).indexOf(i);
			if(index === -1){
				global.tunningBrowser.execute('itemList[Object.keys(itemList)[' + cou + ']][' + 0 + '].bought = true;')
				for(let j=0; j<tunningData[i].length; j++)
					if(j > 0)
						global.tunningBrowser.execute('itemList[Object.keys(itemList)[' + cou + ']][' + j + '].bought = false;')
			} else {
				let elem = vehMods[i] + 1;
				global.tunningBrowser.execute('itemList[Object.keys(itemList)[' + index + ']][' + elem + '].bought = true;');
				for(let j=0; j<tunningData[i].length; j++)
					if(j !== elem)
						global.tunningBrowser.execute('itemList[Object.keys(itemList)[' + cou + ']][' + j + '].bought = false;')
			}
			cou++;
		}
		global.tunningBrowser.execute(`$('.buy').css('display', 'none');
									   $('.item_bought').css('display', 'flex');`);
	},
});