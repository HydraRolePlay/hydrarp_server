const Natives = {
    SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
    SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
    IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
};
global.choosePlace = [];
mp.events.add('moveSkyCamera', moveFromToAir);

function moveFromToAir(player, moveTo, switchType) {   
    /*
        switchType: 0 - 3

        0: 1 step towards ped
        1: 3 steps out from ped (Recommended)
        2: 1 step out from ped
        3: 1 step towards ped
    */
   switch (moveTo) {
       case 'up':
            mp.game.invoke(Natives.SWITCH_OUT_PLAYER, player.handle, 0, parseInt(switchType));
           break;
       case 'down':
            mp.game.invoke(Natives.SWITCH_IN_PLAYER, player.handle);
           break;
   
       default:
           break;
   }
}

mp.events.add('ChoosePlayer', (result) => {
	global.mainBrowser.execute('all_windows["container-auth"] = false;all_windows["container-select-player-char"] = true;$(".container-select-player-char").css("z-index", "1000");updateWindows();$(".container-first-page").remove();$(".container-auth").remove();');
	mp.game.graphics.transitionFromBlurred(500);
	mp.game.time.setClockTime(13, 55, 0);
	global.cam.setActive(false);
	mp.game.cam.renderScriptCams(false, true, 0, true, true);
	global.cam.destroy();
	global.cam = null;
	global.cam = mp.cameras.new("Camera", {x: 116.79086, y: -1949.48792, z: 20.75028}, {x: 0, y: 0, z: 60}, 67);
	global.cam.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
	let execute = function(val) {global.mainBrowser.call('sendInfoToWindow', 'container-select-player-char', val)};  
	execute('startFunc();');
	global.choosePlayer = [];
	global.choosePlayer.result = result;
	mp.events.call("setPlayerModel", 0);
	mp.game.graphics.transitionFromBlurred(500);		
	if(result.length >= 1){
		let txt = "";
		if(result[0]['faction'] == "None") txt = "Не состоит во фракции";
		if(result[0]['faction'] == "EMC") txt = "Медики";
		if(result[0]['faction'] == "Police") txt = "Полиция";
		if(result[0]['faction'] == "FIB") txt = "FIB";
		execute(`f.newModel=0;
				 f.name="${result[0]['Nickname'].split(' ')[0]}";
				 f.sname="${result[0]['Nickname'].split(' ')[1]}";
				 f.balance="${numberWithSpaces(parseInt(result[0]['cash']))}";
				 f.playerLevel="${result[0]['level']}";
				 f.faction="${txt}";
				 f.banned=${result[0]['ban']};
				 f.banReason=${result[0]['reason']};
				 f.dateOfUnban=${result[0]['DateOfBan']};`);
	}
	if(result.length >= 2){
		let txt2 = "";
		if(result[1]['faction'] == "None") txt2 = "Не состоит во фракции";
		if(result[1]['faction'] == "EMC") txt2 = "Медики";
		if(result[1]['faction'] == "Police") txt2 = "Полиция";
		if(result[1]['faction'] == "FIB") txt2 = "FIB";
		execute(`s.newModel=0;
				 s.name="${result[1]['Nickname'].split(' ')[0]}";
				 s.sname="${result[1]['Nickname'].split(' ')[1]}";
				 s.balance="${numberWithSpaces(parseInt(result[1]['cash']))}";
				 s.playerLevel="${result[1]['level']}";
				 s.faction="${txt2}";
				 s.banned=${result[1]['ban']};
				 s.banReason=${result[1]['reason']};
				 s.dateOfUnban=${result[1]['DateOfBan']};`);
	}
	if(result.length == 3){
		let txt3 = "";
		if(result[2]['faction'] == "None") txt3 = "Не состоит во фракции";
		if(result[2]['faction'] == "EMC") txt3 = "Медики";
		if(result[2]['faction'] == "Police") txt3 = "Полиция";
		if(result[2]['faction'] == "FIB") txt3 = "FIB";
		execute(`t.newModel=0;
				 t.name="${result[2]['Nickname'].split(' ')[0]}";
				 t.sname="${result[2]['Nickname'].split(' ')[1]}";
				 t.balance="${numberWithSpaces(parseInt(result[2]['cash']))}";
				 t.playerLevel="${result[2]['level']}";
				 t.faction="${txt3}";
				 t.banned=${result[2]['ban']};
				 t.banReason=${result[2]['reason']};
				 t.dateOfUnban=${result[2]['DateOfBan']};`);
	}
	global.localplayer.setAlpha(255);
	mp.game.ui.displayRadar(false);
	mp.gui.cursor.show(true, true);
	global.chat.show = false;
	global.chat.browser.execute(`setState('hidden')`);
	mp.game.ui.displayHud(false);
});


mp.events.add('setPlayerModel', (num) => {
	try{
		mp.events.callRemote('setPlayerModel', global.choosePlayer.result[num]['Model'], global.choosePlayer.result[num]['Nickname']);
	} catch(e) {}
});

mp.events.add('CreateNewPlayer', (num) => {
	try{
		global.mainBrowser.execute('all_windows["container-auth"] = false;all_windows["container-select-player-char"] = false;updateWindows();');
		global.cam.setActive(false);
		mp.game.cam.renderScriptCams(false, true, 0, true, false);
		global.cam.destroy();
		global.localplayer.setAlpha(255);
		mp.game.audio.playSoundFrontend(-1,  "FocusIn", "HintCamSounds", false);
		setTimeout(function(){
			mp.game.graphics.transitionFromBlurred(500);
		}, 2500);
		mp.events.callRemote('CreateNewPlayer');
	}catch(e){}
});

mp.events.add('EnterServer', (num) =>{
	global.mainBrowser.execute('all_windows["container-auth"] = false;all_windows["container-select-player-char"] = false;updateWindows();');
	global.cam.setActive(false);
	mp.game.cam.renderScriptCams(false, true, 0, true, true);
	global.cam.destroy();
	global.cam = null;
	mp.game.audio.playSoundFrontend(-1,  "FocusIn", "HintCamSounds", false);
	mp.events.call('moveSkyCamera', mp.players.local, 'up', 1);
	mp.events.callRemote('getPlayerPosition', global.choosePlayer.result[num]["Nickname"]);
});


mp.events.add('selectBrowser', (positions) => {
	positions = JSON.parse(positions);
	for(let i=0; i < positions.length; i++){
		let [x, y, z] = positions[i][2];
		let street = mp.game.pathfind.getStreetNameAtCoord(x, y, z, 0, 0);
		positions[i][1] = mp.game.ui.getStreetNameFromHashKey(street.streetName); 
	}
	setTimeout(() => {
		global.mainBrowser.execute('all_windows["container-select-place-of-spawn"] = true;all_windows["container-select-player-char"] = false;updateWindows();');
		let execute = function(val) {global.mainBrowser.call('sendInfoToWindow', 'container-select-place-of-spawn', val)}; 
		execute('setActive('  + JSON.stringify(positions) + ')');
	}, 2500);
});

mp.events.add('selectBrowser:respawn', (i) => {
	mp.events.callRemote('EnterServer', i);
	global.mainBrowser.execute('all_windows["container-select-place-of-spawn"] = false;all_windows["container-select-player-char"] = false;updateWindows();$(".container-select-player-char").remove();$(".container-select-place-of-spawn").remove();');
	setTimeout(() => {
		mp.events.call('moveSkyCamera', mp.players.local, 'down');
	}, 1000);
});

mp.events.add('selectBrowser:goCameraTo', (i) =>{
	mp.events.callRemote('selectBrowser:spawnPlace', i);
});

mp.events.add('selectBrowser:closeBrowserAndChoose', () => {
	mp.events.callRemote('selectBrowser:spawnPlace', -1);
	global.mainBrowser.execute('all_windows["container-select-place-of-spawn"] = false;all_windows["container-select-player-char"] = true;$(".container-select-player-char").css("z-index", "1000");updateWindows();');
	
	setTimeout(() => {
		mp.game.time.setClockTime(13, 55, 0);
		global.cam = mp.cameras.new("Camera", {x: 116.79086, y: -1949.48792, z: 20.75028}, {x: 0, y: 0, z: 60}, 67);
		global.cam.setActive(true);
		let result = global.choosePlayer.result;
		mp.game.cam.renderScriptCams(true, false, 0, true, false);
		mp.events.call("setPlayerModel", 0);	
		let execute = function(val) {global.mainBrowser.call('sendInfoToWindow', 'container-select-player-char', val)}; 
		if(result.length >= 1){
			let txt = "";
			if(result[0]['faction'] == "None") txt = "Не состоит во фракции";
			if(result[0]['faction'] == "EMC") txt = "Медики";
			if(result[0]['faction'] == "Police") txt = "Полиция";
			if(result[0]['faction'] == "FIB") txt = "FIB";
			execute(`f.newModel=0;
					 f.name="${result[0]['Nickname'].split(' ')[0]}";
					 f.sname="${result[0]['Nickname'].split(' ')[1]}";
					 f.balance="${numberWithSpaces(parseInt(result[0]['cash']))}";
					 f.playerLevel="${result[0]['level']}";
					 f.faction="${txt}";
					 f.banned=${result[0]['ban']};
					 f.banReason=${result[0]['reason']};
					 f.dateOfUnban=${result[0]['DateOfBan']};`);
		}
		if(result.length >= 2){
			let txt2 = "";
			if(result[1]['faction'] == "None") txt2 = "Не состоит во фракции";
			if(result[1]['faction'] == "EMC") txt2 = "Медики";
			if(result[1]['faction'] == "Police") txt2 = "Полиция";
			if(result[1]['faction'] == "FIB") txt2 = "FIB";
			execute(`s.newModel=0;
					 s.name="${result[1]['Nickname'].split(' ')[0]}";
					 s.sname="${result[1]['Nickname'].split(' ')[1]}";
					 s.balance="${numberWithSpaces(parseInt(result[1]['cash']))}";
					 s.playerLevel="${result[1]['level']}";
					 s.faction="${txt2}";
					 s.banned=${result[1]['ban']};
					 s.banReason=${result[1]['reason']};
					 s.dateOfUnban=${result[1]['DateOfBan']};`);
		}
		if(result.length == 3){
			let txt3 = "";
			if(result[2]['faction'] == "None") txt3 = "Не состоит во фракции";
			if(result[2]['faction'] == "EMC") txt3 = "Медики";
			if(result[2]['faction'] == "Police") txt3 = "Полиция";
			if(result[2]['faction'] == "FIB") txt3 = "FIB";
			execute(`t.newModel=0;
					 t.name="${result[2]['Nickname'].split(' ')[0]}";
					 t.sname="${result[2]['Nickname'].split(' ')[1]}";
					 t.balance="${numberWithSpaces(parseInt(result[2]['cash']))}";
					 t.playerLevel="${result[2]['level']}";
					 t.faction="${txt3}";
					 t.banned=${result[2]['ban']};
					 t.banReason=${result[2]['reason']};
					 t.dateOfUnban=${result[2]['DateOfBan']};`);
		}
		global.localplayer.setAlpha(255);
		mp.game.ui.displayRadar(false);
		mp.gui.cursor.show(true, true);
		global.chat.show = false;
		global.chat.browser.execute(`setState('hidden')`);
		mp.game.ui.displayHud(false);
		global.choosePlayer.browserOn = true;
	}, 2500);
});

