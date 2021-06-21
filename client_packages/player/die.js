var Interior = mp.game.interior.getInteriorAtCoords(275.446, -1361.11, 24.5378);

mp.game.interior.enableInteriorProp(Interior, "coronertrash");
mp.game.interior.refreshInterior(Interior);
mp.game.interior.enableInteriorProp(Interior, "Coroner_Int_On");
mp.game.interior.refreshInterior(Interior);

mp.events.add("playerDeath", (player, reason, killer) => {
	mp.players.local.clearTasks();
	global.attached = true;
	mp.game.player.setHealthRechargeMultiplier(0.0);
	global.AnimationBrowser.execute("$('.select-wrapper').css('right', '-7vw');");
	global.AnimationBrowser.execute("$('.select-item-block').css('display', 'none');");
	global.mainBrowser.execute('all_windows["container-animations"] = false;all_windows["container-music-player"] = false;all_windows["container-player-inventory"] = false;all_windows["container-player-die-alert"] = true;$(".container-player-die-alert").css("z-index", "1000");updateWindows();');
	global.localplayer.music.Browser.execute('$("body").css("display", "none")');
	global.inventory.browser.execute(`$('body').css('display', 'none')`);
	global.inventory.openBrowser = false;
	if(global.localplayer.die) return mp.events.call('diePlayer');
	mp.gui.cursor.show(true, true);
	global.hud.execute(`car.show=0`);
	global.hud.execute(`interactionWithPlayer.show=0`); 
	global.localplayer.die = true;
	mp.events.callRemote('playerDie');
});


mp.events.add("die:updateInfo", (plName) => {
	try{
		let execute = function (val) {global.mainBrowser.call('sendInfoToWindow', 'container-player-die-alert', val)};
		execute(`med = ${plName}`);
	} catch(e){}
});


mp.events.add("diePlayer", () => {
	global.hud.execute(`car.show=0`);
	global.hud.execute(`interactionWithPlayer.show=0`); 
	global.hud.execute(`HUD.show=1`);
	global.hud.execute(`help.show=1`);
	global.hud.execute(`logotype.show=1`);
	global.localplayer.die = false;
	mp.gui.cursor.show(false, false);
	try{
		global.mainBrowser.execute('all_windows["container-player-die-alert"] = false;updateWindows();');
	}catch(e){}
	mp.events.callRemote('playerEndDie');
});

mp.events.add("healPlayerByMedic", () => {
	global.hud.execute(`car.show=0`);
	global.hud.execute(`interactionWithPlayer.show=0`); 
	global.hud.execute(`HUD.show=1`);
	global.hud.execute(`help.show=1`);
	global.hud.execute(`logotype.show=1`);
	global.localplayer.die = false;
	mp.gui.cursor.show(false, false);
	try{
		global.mainBrowser.execute('all_windows["container-player-die-alert"] = false;updateWindows();');
	}catch(e){}
});