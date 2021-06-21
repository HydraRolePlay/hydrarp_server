global.firstQuest = false;
let shopPed;
let _blip;
mp.events.add({
	'player:FirstQuest': (data) => {
		//if(global.firstQuest) return mp.events.call('SendAlert', 'Для вас нет нового задания', 'red');
		let camPos = {x: 87.36916, y: -1955.03662, z: 20.74652, heading: -43.298, id: 'a_m_m_hillbilly_02'}
		mp.game.ui.displayHud(false);
		mp.game.ui.displayRadar(false);
		mp.players.local.setAlpha(0);
		mp.events.callRemote("anotherDimension", 'startQuest');
		global.cam = mp.cameras.new("Camera", {x: camPos.x - mp.game.system.sin(camPos.heading)*3, y: camPos.y + mp.game.system.cos(camPos.heading)*3, z: camPos.z + 0.5}, {x: 0, y: 0, z: 0}, 50);
		setTimeout(function(){
			shopPed = mp.peds.new(
				mp.game.joaat(camPos.id), 
				new mp.Vector3(camPos.x, camPos.y, camPos.z),
				camPos.heading,
				mp.players.local.dimension
			);
		}, 150);
		global.player_dont_close_iteraction = true;
		global.cam.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 0, true, false);
		global.cam.pointAtCoord(camPos.x, camPos.y, camPos.z + 0.5);
		global.player_dont_close_iteraction = true;
		global.firstQuestBrowser = mp.browsers.new('package://cef/quest-dialog/index.html');
		global.firstQuestBrowser.execute(`dialogs.name="Данил"`);
		global.firstQuestBrowser.execute(`dialogs.text="Ты мне кстати давненько так торчишь. Не хочешь вернуть долг? Знаешь делать то нечего в последнее время. Так что да. Едь за плиточкой гаша"`);
		global.firstQuestBrowser.execute(`$('.first').on('click', function(){
											mp.trigger('player:AnotherText');
										});
										$('.second').css("display", 'none');`);
		global.firstQuestBrowser.execute(`dialogs.btn="Ок, без проблем"`);	
		global.hud.execute(`HUD.show=0`);
		global.hud.execute(`help.show=0`);
		global.hud.execute(`logotype.show=0`);
		global.hud.execute(`interactionIndicator.show=0`);
		global.hud.execute(`interactionWithPlayer.show=0`);
		global.hud.execute(`car.show=0`);
		
	},
	'player:AnotherText': () => 
	{
		global.firstQuestBrowser.execute(`dialogs.name="Данил"`);
		global.firstQuestBrowser.execute(`dialogs.text="Тут как раз недалеко на стенах написаны всякие прикольные сайты. Так что да. Давай быстрее"`);
		global.firstQuestBrowser.execute(`$('.first').on('click', function(){
											mp.trigger('player:EndFirstBrowser');
										});
										$('.second').css("display", 'none');`);
		global.firstQuestBrowser.execute(`dialogs.btn="Хорошо, пока."`);	
	},
	'player:EndFirstBrowser': () =>
	{
		shopPed.destroy();
		global.player_dont_close_iteraction = false;
		global.hud.execute(`HUD.show=1`);
		global.hud.execute(`help.show=1`);
		global.hud.execute(`logotype.show=1`);
		global.hud.execute(`clearInterval(interval);
							$('.ptask').removeClass('active');`);
		global.hud.execute(`pushTask({header: 'Квест', text: 'Найдите граффити', time: '300'});`);
		mp.events.callRemote("gameDimension");
		global.firstQuestBrowser.destroy();
		global.firstQuest = true;	
		mp.game.ui.displayHud(false);
		mp.players.local.setAlpha(255);
		mp.game.ui.displayRadar(true);
		global.cam.setActive(false);
		mp.game.cam.renderScriptCams(false, true, 0, true, true);
		global.cam.destroy();
		global.cam = null;
		mp.gui.cursor.show(false, false);
		_blip = mp.blips.new(1, new mp.Vector3(87.36916, -1955.03662, 1),
		{
			name: 'Найти граффити',
			color: 26,
			alpha: 0.4,
			shortRange: true,
			dimension: 0,
			radius: 350,
		});		
	},
	'player:firstQuestBad': () =>
	{
		mp.events.call('SendAlert', 'Вы провалили начальный квест', 'red');
		try{
			_blip.setDisplay(0);
		} catch(e) {}
	},
	'player:reloadWeapon': () =>
	{
		mp.players.local.taskReloadWeapon(true);
	},
});