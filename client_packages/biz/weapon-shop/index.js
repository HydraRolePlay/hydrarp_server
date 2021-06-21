let weaponShopSum = [
	[250000, 200000, 500000],
	[300000, 350000, 380000],
	[280000, 300000, 500000],
	[600000, 680000, 720000],
	[25000, 30000, 30000]	
];


let weaponShopData = [
	[
		{'description': 'Бронебойный пистолет', model: 'w_pi_appistol', id: 9, count: 1, maxCount: 1, currentAmmo: 0, rotation: {x: 90, y: 0, z: 0}, weight: 1.5}, 
		{'description': 'Тяжелый пистолет', model: 'w_pi_heavypistol', id: 12, count: 1, maxCount: 1, currentAmmo: 0, rotation: {x: 90, y: 0, z: 0}, weight: 2}, 
		{'description': 'Винтажный пистолет', model: 'w_pi_vintage_pistol', id: 8, count: 1, maxCount: 1, currentAmmo: 0, rotation: {x: 90, y: 0, z: 0}, weight: 2}
	],
	[
		{'description': 'Пистолет-пулемет (микро)', model: 'w_sb_microsmg', id: 17, count: 1, maxCount: 1, currentAmmo: 0, rotation: {x: 90, y: 0, z: 0}, weight: 2}, 
		{'description': 'Пистолет-пулемет', id: 19, model: 'w_sb_smg', count: 1, maxCount: 1, currentAmmo: 0, rotation: {x: 90, y: 0, z: 0}, weight: 2.5}, 
		{'description': 'Штурмовой пистолет-пулемет', model: 'w_sb_assaultsmg', id: 23, count: 1, maxCount: 1, currentAmmo: 0, rotation: {x: 90, y: 0, z: 0}, weight: 3}
	],
	[
		{'description': 'Обрез', model: 'w_sg_sawnoff', id: 43, count: 1, maxCount: 1, currentAmmo: 0, rotation: {x: 90, y: 0, z: 0}, weight: 2.5}, 
		{'description': 'Помповый дробовик', model: 'w_sg_pumpshotgun', id: 41, count: 1, maxCount: 1, currentAmmo: 0, rotation: {x: 90, y: 0, z: 0}, weight: 3}, 
		{'description': 'Штурмовой дробовик', model: 'w_sg_assaultshotgun', id: 45, count: 1, maxCount: 1, currentAmmo: 0, rotation: {x: 90, y: 0, z: 0}, weight: 4}
	],
	[
		{'description': 'Штурмовая винтовка', id: 62, model: 'w_ar_assaultrifle', count: 1, maxCount: 1, currentAmmo: 0, rotation: {x: 90, y: 0, z: 0}, weight: 4}, 
		{'description': 'Автоматический карабин', model: 'w_ar_carbinerifle', id: 67, count: 1, maxCount: 1, currentAmmo: 0, rotation: {x: 90, y: 0, z: 0}, weight: 4}, 
		{'description': 'Особый карабин', id: 60, model: 'w_ar_specialcarbine', count: 1, maxCount: 1, currentAmmo: 0, rotation: {x: 90, y: 0, z: 0}, weight: 4.5}
	],
	[
		{'description': 'Патроны 9мм.', model: 'prop_ld_ammo_pack_01', count: 60, maxCount: 60, id: 99, rotation: {x: 0, y: 0, z: 0}, weight: 0.01}, 
		{'description': 'Патроны 12 калибр', model: 'prop_ld_ammo_pack_02', count: 20, maxCount: 20, id: 100, rotation: {x: 0, y: 0, z: 0}, weight: 0.05}, 
		{'description': 'Патроны 5.56', model: 'prop_ld_ammo_pack_03', count: 30, maxCount: 30, id: 102, rotation: {x: 0, y: 0, z: 0}, weight: 0.05}
	]
]
let currentWeapon;
let camPos;
mp.events.add({
	'weaponShop:open': (data) =>
	{
		let [cam_pos, id] = JSON.parse(data);
		camPos = cam_pos
		global.hud.execute(`HUD.show=0`);
		global.hud.execute(`help.show=0`);
		global.hud.execute(`logotype.show=0`);
		mp.game.ui.displayHud(false);
		mp.game.ui.displayRadar(false);
		player.setAlpha(0);
		mp.events.callRemote("anotherDimension", id);
		global.cam = mp.cameras.new("Camera", {x: camPos.x - mp.game.system.sin(camPos.heading)*3, y: camPos.y + mp.game.system.cos(camPos.heading)*3, z: camPos.z + 0.8}, {x: 0, y: 0, z: 0}, 50);
		global.player_dont_close_iteraction = true;
		global.cam.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 0, true, false);
		global.cam.pointAtCoord(camPos.x, camPos.y, camPos.z + 0.9);		
		global.weaponShop = mp.browsers.new('package://cef/shop-weapon/index.html');
		global.weaponShop.execute("$('.weapon-header').html('" + weaponShopData[0][0].description + "')");
		mp.gui.cursor.show(true, true);
		mp.players.local.freezePosition(true);
		setTimeout(function(){
			currentWeapon = mp.objects.new(mp.game.joaat('w_pi_appistol'), new mp.Vector3(camPos.x - mp.game.system.sin(camPos.heading)*1.5, camPos.y + mp.game.system.cos(camPos.heading)*1.5, camPos.z + 0.75), {
				rotation: new mp.Vector3(0, 0, camPos.heading),
				dimension: player.dimension
			});
		}, 150);
	},
	'weaponShop:selectNewElement': (category, number) =>
	{
		currentWeapon.destroy();
		currentWeapon = mp.objects.new(mp.game.joaat(weaponShopData[category][number].model), new mp.Vector3(camPos.x - mp.game.system.sin(camPos.heading)*1.5, camPos.y + mp.game.system.cos(camPos.heading)*1.5, camPos.z + 0.75), {
			rotation: new mp.Vector3(0, 0, camPos.heading),
			dimension: player.dimension
		});
		global.weaponShop.execute("$('.buy').html('Оплатить - " + weaponShopSum[category][number] + " $')");
	},
	'weaponShop:buyWeapon': (category, number) =>
	{
		if(global.localplayer.data.cash < weaponShopSum[category][number]) return mp.events.call('SendAlert', 'У вас нехватает денег', 'red');
		let product = JSON.parse(JSON.stringify(weaponShopData[category][number]));
		mp.events.callRemote('items:buyItemsInShop', JSON.stringify(product));
		mp.events.callRemote('buyThingsInTheShop', weaponShopSum[category][number], 0);
		mp.events.call('SendAlert', 'Вы успешно купили ' + weaponShopData[category][number].description, 'green');	
	},
	'weaponShop:exit': () =>
	{
		currentWeapon.destroy();
		global.weaponShop.destroy();
		global.player_dont_close_iteraction = false;
		global.hud.execute(`HUD.show=1`);
		global.hud.execute(`help.show=1`);
		global.hud.execute(`logotype.show=1`);
		mp.events.callRemote("gameDimension");
		mp.game.ui.displayHud(false);
		mp.game.ui.displayRadar(true);
		mp.players.local.setAlpha(255);
		mp.game.ui.displayRadar(true);
		global.cam.setActive(false);
		mp.game.cam.renderScriptCams(false, true, 0, true, true);
		global.cam.destroy();
		global.cam = null;
		mp.players.local.freezePosition(false);
		mp.gui.cursor.show(false, false);
	}	
});