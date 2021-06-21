global.easyBuyBrowserCost = 0;
global.easyBuyBrowserItem = 0;
let shopPed;

mp.events.add('easyBuyBrowser', (params) => {
	if(global.PlayerPhone.browsIsOpen)
	{
		global.PlayerPhone.browsIsOpen = false;
		mp.gui.cursor.show(false, false);
		global.PlayerPhone.browser.execute('$(".mobile").css("bottom", "-100%")');
	}
	var [name, firstText, buttonText, cost, item, shopId, camPos] = JSON.parse(params);
	mp.events.callRemote("anotherDimension", shopId);
	global.player_dont_close_iteraction = true;
	global.cam = mp.cameras.new("Camera", {x: camPos.x - mp.game.system.sin(camPos.heading)*3, y: camPos.y + mp.game.system.cos(camPos.heading)*3, z: camPos.z + 0.5}, {x: 0, y: 0, z: 0}, 50);
	setTimeout(function(){
		shopPed = mp.peds.new(
			mp.game.joaat(camPos.id), 
			new mp.Vector3(camPos.x, camPos.y, camPos.z),
			camPos.heading,
			player.dimension
		);
	}, 50);
	global.cam.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
	global.cam.pointAtCoord(camPos.x, camPos.y, camPos.z + 0.5);
	if(global.easyBuyBrowser !== undefined) return;
	global.easyBuyBrowser = mp.browsers.new('package://cef/quest-dialog/index.html');
	global.easyBuyBrowserCost = cost;
	global.easyBuyBrowserItem = item;
	global.easyBuyBrowser.execute(`dialogs.name="${name}"`);
	global.easyBuyBrowser.execute(`dialogs.text="${firstText}"`);
	global.easyBuyBrowser.execute(`$('.first').on('click', function(){
										mp.trigger('buySmthInEasyBrowser');
									});
									$('.second').on('click', function(){
										mp.trigger('closeEasyBuyBrowser');
									});`);
	global.easyBuyBrowser.execute(`dialogs.btn="${buttonText}"`);	
	global.hud.execute(`HUD.show=0`);
	global.hud.execute(`help.show=0`);
	global.hud.execute(`logotype.show=0`);
	global.hud.execute(`interactionIndicator.show=0`);
	global.hud.execute(`interactionWithPlayer.show=0`);
	global.hud.execute(`car.show=0`);
	mp.players.local.freezePosition(true);
	mp.gui.cursor.show(true, true);
	mp.game.ui.displayRadar(false);
	player.setAlpha(0);
	global.chat.show = false;
	global.chat.browser.execute(`setState(${global.chat.show ? 'transparent': 'hidden'})`);
});

mp.events.add('closeEasyBuyBrowser', () => {
	global.player_dont_close_iteraction = false;
	global.cam.setActive(false);
	mp.game.cam.renderScriptCams(false, true, 0, true, true);
	global.cam.destroy();
	global.cam = null;
	player.setAlpha(255);
	global.easyBuyBrowser.destroy();
	global.easyBuyBrowser = undefined;
	global.easyBuyBrowserCost = 0;
	global.easyBuyBrowserItem = 0;
	global.hud.execute(`HUD.show=1`);
	global.hud.execute(`help.show=1`);
	global.hud.execute(`logotype.show=1`);
	setTimeout(function(){
		mp.gui.cursor.show(false, false);	
	}, 500);
	global.chat.show = true;
	global.chat.browser.execute(`setState(${global.chat.show ? 'transparent': 'hidden'})`);
	mp.events.callRemote("gameDimension");
	mp.game.ui.displayHud(false);
	mp.game.ui.displayRadar(true);
	mp.players.local.freezePosition(false);
});


mp.events.add('dontWorking', (a) => {
	mp.events.call('SendAlert', "В настоящий момент в разработке", "red");
});


mp.events.add('buySmthInEasyBrowser', () => {
	mp.events.callRemote("buySmthInEasyBrowser", global.easyBuyBrowserCost);
});

mp.events.add('GoodPaymentInEasyBrowser', () => {
	let product = global.easyBuyBrowserItem;
	mp.events.call('SendAlert', "Покупка проведена успешно", "green");
	mp.events.callRemote('items:buyItemsInShop', JSON.stringify(product));
	mp.events.call("closeEasyBuyBrowser");
});

mp.events.add('BadPaymentInEasyBrowser', () => {
	mp.events.call('SendAlert', "Недостаточно средств на счету", "red");
	mp.events.call("closeEasyBuyBrowser");
});
