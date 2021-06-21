var shopPed;

mp.events.add({
	"playerEnterTheShop": (params) =>
	{
		let [camPos, shopId] = JSON.parse(params);
		global.hud.execute(`HUD.show=0`);
		global.hud.execute(`help.show=0`);
		global.hud.execute(`logotype.show=0`);
		mp.game.ui.displayHud(false);
		mp.game.ui.displayRadar(false);
		player.setAlpha(0);
		mp.events.callRemote("anotherDimension", shopId);
		global.cam = mp.cameras.new("Camera", {x: camPos.x - mp.game.system.sin(camPos.heading)*3, y: camPos.y + mp.game.system.cos(camPos.heading)*3, z: camPos.z + 0.5}, {x: 0, y: 0, z: 0}, 50);
		setTimeout(function(){
			shopPed = mp.peds.new(
				mp.game.joaat(camPos.id), 
				new mp.Vector3(camPos.x, camPos.y, camPos.z),
				camPos.heading,
				player.dimension
			);
		}, 150);
		global.player_dont_close_iteraction = true;
		global.cam.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 0, true, false);
		global.cam.pointAtCoord(camPos.x, camPos.y, camPos.z + 0.5);		
		global.chat.show = false;
		global.chat.browser.execute(`setState('hidden')`);
		global.localplayer.shopBrowser = mp.browsers.new('package://cef/shop-grocery/index.html');
		mp.gui.cursor.show(true, true);
		mp.players.local.freezePosition(true);
	},
	"playerExitTheShop": () => 
	{
		shopPed.destroy();
		global.player_dont_close_iteraction = false;
		global.hud.execute(`HUD.show=1`);
		global.hud.execute(`help.show=1`);
		global.hud.execute(`logotype.show=1`);
		mp.events.callRemote("gameDimension");
		global.chat.show = true;
		global.chat.browser.execute(`setState('transparent')`);
		mp.game.ui.displayHud(false);
		player.setAlpha(255);
		mp.game.ui.displayRadar(true);
		global.localplayer.shopBrowser.destroy();
		global.cam.setActive(false);
		mp.game.cam.renderScriptCams(false, true, 0, true, true);
		global.cam.destroy();
		global.cam = null;
		mp.players.local.freezePosition(false);
		setTimeout(function(){
			mp.gui.cursor.show(false, false);	
		}, 500);
	},
	"checkInventoryWeight": (weight) =>
	{
		var inventoryWeight = 0;
		for(let i in Object.keys(global.localplayer.data.inventory)){
			if(i === 'information') break;
			for(let j in global.localplayer.data.inventory[i]){
				inventoryWeight += j.count * j.weight;
			}
		}
		if((inventoryWeight + weight) > global.localplayer.data.maxInventoryWeight)
			mp.events.call('SendAlert', 'Товар слишком тяжелый и не влезает Вам в сумку', 'red');
		else
			global.localplayer.shopBrowser.execute("$('.modal').toggleClass('active');"); // модальное окно для выбора оплаты
	},
	"checkMoneyInShop": (paymentMethod, cost) => 
	{
		mp.events.callRemote('getPlayerMoney', paymentMethod, cost);
	},
	"getPlayerMoneyInShop": (checked, paymentMethod) => 
	{
		if(checked)
			global.localplayer.shopBrowser.execute(`goodPayment(${paymentMethod});`);
		else
			global.localplayer.shopBrowser.execute('badPayment();');
	},
	"getMoney": (paymentMethod, cost) =>
	{
		mp.events.callRemote('buyThingsInTheShop', cost, paymentMethod);
	},
	"PurchaseThingsInTheShop": (cart) => 
	{
		global.player_dont_close_iteraction = false;
		shopPed.destroy();
		cart = JSON.parse(cart);
		global.hud.execute(`HUD.show=1`);
		global.hud.execute(`help.show=1`);
		global.hud.execute(`logotype.show=1`);
		mp.events.call('SendAlert', "Покупка проведена успешно", "green");
		for(let j=0; j < cart.length; j++){
			let product = cart[j];
			mp.events.callRemote('items:buyItemsInShop', JSON.stringify(product));
		}
		mp.events.callRemote("gameDimension");
		global.chat.show = true;
		global.chat.browser.execute(`setState('transparent')`);
		mp.game.ui.displayHud(false);
		mp.game.ui.displayRadar(true);
		global.cam.setActive(false);
		mp.game.cam.renderScriptCams(false, true, 0, true, true);
		global.cam.destroy();
		global.cam = null;
		player.setAlpha(255);
		mp.players.local.freezePosition(false);
		global.localplayer.shopBrowser.destroy();
		setTimeout(function(){
			mp.gui.cursor.show(false, false);	
		}, 500);
	}
});