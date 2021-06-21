var phone = false,
	right = false,
	left = false;
global.hudd = true;
var smth;
global.entityInteration = false;
global.targetObj = []
global.task = false;
global.waypoints = false;

mp.events.add("playerCreateWaypoint", (position) => {
	if(global.waypoints){
		global.waypoints = {x: position.x, y: position.y, z: mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, parseFloat(0), false)}
		if(global.task && mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle){
			mp.players.local.clearTasks();
			let veh = mp.players.local.vehicle;
			let player = mp.players.local;
			player.taskVehicleDriveToCoord(veh.handle, global.waypoints.x, global.waypoints.y, global.waypoints.z, 500, 1, veh.model, 1074528293, 10, true);
			mp.events.call('SendAlert', 'Автопилот поставлен на новую метку!', 'green');
		}
	} else {
		global.waypoints = {x: position.x, y: position.y, z: mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, parseFloat(0), false)}
	}
	
	if(mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle){
		mp.events.call('SendAlert', 'Нажмите на M чтобы поделиться с водителем меткой', 'green');
	}
});

mp.events.add("autopilot:playerReachedWaypoint", () => {
	global.waypoints = false;
	if(global.task && mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle){
		mp.players.local.clearTasks();
		global.task = false;
		mp.events.call('SendAlert', 'Автопилот выключен', 'red');
	}
});

// Chat
mp.keys.bind(global.Keys.VK_N, true, function() {
	if(mp.gui.cursor.visible) return;
    mp.voiceChat.muted = false;
	if(!global.hud) return;
	global.hud.execute(`HUD.mic=${!mp.voiceChat.muted}`);
});

mp.keys.bind(global.Keys.VK_N, false, function() {
    mp.voiceChat.muted = true;
	if(!global.hud) return;
	global.hud.execute(`HUD.mic=${!mp.voiceChat.muted}`);
});
//!Chat

mp.keys.bind(global.Keys.VK_Y, true, function() {
	if(mp.gui.cursor.visible || !global.newIteraction) return;
	mp.events.callRemote(global.newIteraction, true);
	global.hud.execute(`$('.notice').remove();`);
	global.newIteraction = false;
});

mp.keys.bind(global.Keys.VK_N, true, function() {
	if(mp.gui.cursor.visible || !global.newIteraction) return;
	mp.events.callRemote(global.newIteraction, false);
	global.hud.execute(`$('.notice').remove();`);
	mp.events.call('SendAlert', 'Вы отказались', 'red');
	global.newIteraction = false;
	// no
	});

//Inventory
mp.keys.bind(global.Keys.VK_TAB, false, function() {
	if(mp.gui.cursor.visible && !global.inventory.openBrowser) return;
	if(global.inventory.openBrowser && global.policeArrest)
		return playerInventory();
	else if(global.policeArrest)
		return;
	return playerInventory();
});
//!Inventory

// G - interaction
mp.keys.bind(global.Keys.VK_G, true, function() {
	if(((global.targetVehicle == null && global.targetPlayer == null) || (mp.gui.cursor.visible && !global.entityInteration)) && (!global.entityInteration)){
		global.hud.execute(`car.show=0`);
		global.hud.execute(`interactionWithPlayer.show=0`); 
		return
	};
	if(global.policeArrest) return;
	if(global.localplayer.die) return;
	if(global.targetVehicle != null) global.targetObj.obj = global.targetVehicle;
	if(global.targetPlayer != null) global.targetObj.player = global.targetPlayer;
	if(global.entityInteration)	{
		mp.game.graphics.transitionFromBlurred(250);
		} else {
		mp.game.graphics.transitionToBlurred(250);
	}
	if(global.loadPage != null) {
		global.loadPage.destroy();
		global.loadPage = null;
	}
	if((global.targetVehicle == null && global.targetPlayer == null) && global.entityInteration) {
		global.entityInteration = !global.entityInteration;
		global.hud.execute(`car.show=0`);
		global.hud.execute(`interactionWithPlayer.show=0`);
		mp.gui.cursor.show(false, false);
		return;
	}
	if(global.targetVehicle != null){
		global.entityInteration = !global.entityInteration;
		if(global.entityInteration)	{
			global.hud.execute(`car.show=1`);
		}
		if(!global.entityInteration) {
			global.hud.execute(`car.show=0`);
		}
		mp.gui.cursor.show(!mp.gui.cursor.visible, !mp.gui.cursor.visible);
	}
	if(global.targetPlayer != null){
		global.entityInteration = !global.entityInteration;
		if(global.entityInteration)	{
			global.hud.execute(`interactionWithPlayer.show=1`);
		}
		if(!global.entityInteration) {
			global.hud.execute(`interactionWithPlayer.show=0`);
		}
		if(global.localplayer.data.ambulance) global.hud.execute(`interactionWithPlayer.medic=true`);
		if(global.localplayer.data.police) global.hud.execute(`interactionWithPlayer.pol=true`);
		mp.gui.cursor.show(!mp.gui.cursor.visible, !mp.gui.cursor.visible);
	}	
});
//!G - interaction
//Cursor
mp.keys.bind(global.Keys.VK_OEM_3, true, function() {
	if(!global.localplayer.data.login || global.VehShop) return;
	mp.gui.cursor.show(!mp.gui.cursor.visible, !mp.gui.cursor.visible);
});
//!Cursor

function useItem(id){
	let elem_category = 'fast-access-box';
	if(global.localplayer.data.inventory[elem_category][id].gender !== null && global.localplayer.data.inventory[elem_category][id].gender !== undefined && global.localplayer.data.inventory[elem_category][id].gender !== global.localplayer.data.gender)
		return mp.events.call('SendAlert', "Вы не можете надеть женскую одежду", "red");
	let item_id = global.localplayer.data.inventory[elem_category][id].id;
	if(item_id === 71 && !mp.players.local.vehicle) 
		return mp.events.call('SendAlert', "Вы не в машине", "red");
	if(item_id === 71 && mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle) 
		return mp.events.call('SendAlert', "Вы не водитель", "red");
	if(global.iteractionWithItems)
		return mp.events.call('SendAlert', "Вы сейчас используете другой предмет", "red");
	else
		mp.events.callRemote('items:useItem', elem_category, id);
}

//Fast-access box
mp.keys.bind(global.Keys.VK_1, true, function() {
	if(mp.gui.cursor.visible) return;
	if(!Object.keys(global.localplayer.data.inventory['fast-access-box'][0]).length) return;
	useItem(0);
});
mp.keys.bind(global.Keys.VK_2, true, function() {
	if(mp.gui.cursor.visible) return;
	if(!Object.keys(global.localplayer.data.inventory['fast-access-box'][1]).length) return;
	useItem(1);
});
mp.keys.bind(global.Keys.VK_3, true, function() {
	if(mp.gui.cursor.visible) return;
	if(!Object.keys(global.localplayer.data.inventory['fast-access-box'][2]).length) return;
	useItem(2);
});

mp.keys.bind(global.Keys.VK_4, true, function() {
	if(mp.gui.cursor.visible) return;
	if(!Object.keys(global.localplayer.data.inventory['fast-access-box'][3]).length) return;
	useItem(3);
});

mp.keys.bind(global.Keys.VK_5, true, function() {
	if(mp.gui.cursor.visible) return;
	if(!Object.keys(global.localplayer.data.inventory['fast-access-box'][4]).length) return;
	useItem(4);
});
//!Fast-access box

//Help?
mp.keys.bind(global.Keys.VK_F10, true, function() {
	if(!global.localplayer.data.login) return;
	global.hud.execute(`help.show=!help.show`);
});
//!Help?
//Show hud
mp.keys.bind(global.Keys.VK_F5, true, function() {
	if(!global.localplayer.data.login) return;
	global.hudd = !global.hudd;
	global.hud.execute(`HUD.show=${global.hudd}`);
	global.hud.execute(`help.show=${global.hudd}`);
	global.hud.execute(`logotype.show=${global.hudd}`);
	global.chat.show = global.hudd;
	let constant = global.chat.show ? 'transparent' : 'hidden'
	global.chat.browser.execute(`setState('${constant}');`);
	mp.game.ui.displayRadar(global.hudd);
});

mp.keys.bind(global.Keys.VK_T, true, function() {
	if(!global.localplayer.data.login || !global.chat.show || mp.gui.cursor.visible) return;
	mp.gui.cursor.show(true, true);
	global.chat.active = true;
	global.chat.browser.execute(`setState('visible')`);
});
//!Show hud
//Indicators
mp.keys.bind(global.Keys.VK_NUMPAD4, true, function() {
	if(!mp.players.local.vehicle || mp.gui.cursor.visible) return;
	if(mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle) return;
	if(!mp.players.local.vehicle.getVariable("engine")) return;
	left = !mp.players.local.vehicle.getVariable('indicatorsLeft');
	mp.events.callRemote('setCarVariable', mp.players.local.vehicle.remoteId, JSON.stringify({'indicatorsLeft': left,}));
    mp.players.local.vehicle.setIndicatorLights(1, left);
	global.hud.execute(`HUD.left_light=${left}`);
	if(left && !right || !right && !left){
		global.hud.execute(`playMusic()`);
	}
});

mp.keys.bind(global.Keys.VK_NUMPAD6, true, function() {
	if(!mp.players.local.vehicle || mp.gui.cursor.visible) return;
	if(mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle) return;
	if(!mp.players.local.vehicle.getVariable("engine")) return;
	right = !mp.players.local.vehicle.getVariable('indicatorsRight');
	mp.events.callRemote('setCarVariable', mp.players.local.vehicle.remoteId, JSON.stringify({'indicatorsRight': right,}));
	mp.players.local.vehicle.setIndicatorLights(0, right);
	global.hud.execute(`HUD.right_light=${right}`);
	if(!left && right || !right && !left){
		global.hud.execute(`playMusic()`);
	}
});

mp.keys.bind(global.Keys.VK_DOWN, true, function() {
	if(!mp.players.local.vehicle || mp.gui.cursor.visible) return;
	if(mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle) return;
	if(!mp.players.local.vehicle.getVariable("engine")) return;
	if(!global.waypoints) return mp.events.call('SendAlert', 'Установите метку и включите автопилот снова', 'red');
	if(global.task) {
		mp.players.local.clearTasks();
		global.task = false;
		mp.events.call('SendAlert', 'Автопилот выключен', 'red');
		return;
	}
	let veh = mp.players.local.vehicle;
	let player = mp.players.local;
	player.taskVehicleDriveToCoord(veh.handle, global.waypoints.x, global.waypoints.y, global.waypoints.z, 500, 1, veh.model, 1074528293, 10, true);
	mp.events.call('SendAlert', 'Автопилот включен', 'green');
	global.task = true;
});

mp.keys.bind(global.Keys.VK_M, true, function() {
	if(mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle && global.waypoints && mp.players.local.vehicle.getPedInSeat(-1)){
		mp.events.callRemote('plWayPoint', JSON.stringify(global.waypoints), mp.players.atHandle(mp.players.local.vehicle.getPedInSeat(-1)).remoteId);
		mp.events.call('SendAlert', 'Вы предложили игроку свою метку', 'green');
	}	
});

mp.keys.bind(global.Keys.VK_B, true, function() {
	if(!mp.players.local.vehicle || mp.gui.cursor.visible) return;
	if(mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle) return;
	mp.events.callRemote('items:veh', mp.players.local.vehicle.remoteId, 'vehEngine');
});

mp.keys.bind(global.Keys.VK_L, true, function() {
	if(!mp.players.local.vehicle || mp.gui.cursor.visible) return;
	if(mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle) return;
	mp.events.callRemote('items:veh', mp.players.local.vehicle.remoteId, 'vehDoors');
});
//!Indicators

//E-button
mp.keys.bind(global.Keys.VK_E, true, function() {
	if(mp.gui.cursor.visible || !global.eButton) return
	if(mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle) return;
	if(mp.players.local.vehicle && global.eButton !== 'refillCar' && global.eButton !== 'tunning:enterShop') return;
	if(global.eButton === 'refillCar' && !mp.players.local.vehicle) return;
	if(global.eButton === 'tunning:enterShop' && !mp.players.local.vehicle) return;
	if(!global.localplayer.data.login) return
	if(global.policeArrest) return;
	if(global.eButtonClient){
		if(global.eButtonParams) mp.events.call(global.eButton, global.eButtonParams);
		if(!global.eButtonParams) mp.events.call(global.eButton);
	}
	else{
		if(global.eButtonParams) mp.events.callRemote(global.eButton, global.eButtonParams);
		if(!global.eButtonParams) mp.events.callRemote(global.eButton);
	}
});