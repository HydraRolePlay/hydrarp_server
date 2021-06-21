
mp.events.add('playerEnterVehicle', (vehicle, seat) => { 
	mp.players.local.freezePosition(false);
	mp.game.vehicle.defaultEngineBehaviour = false; 
    mp.players.local.setConfigFlag(429, true);
	mp.players.local.setConfigFlag(35, false);
	vehicle.setInvincible(false);
	global.hud.execute(`HUD.left_light=${vehicle.getVariable("indicatorsLeft")}`);
	global.hud.execute(`HUD.right_light=${vehicle.getVariable("indicatorsRight")}`);
	global.AnimationBrowser.execute("$('.select-wrapper').css('right', '-7vw');");
	global.AnimationBrowser.execute("$('.select-item-block').css('display', 'none');");
	if(global.car.model !== undefined){
		let veh = mp.vehicles.atRemoteId(global.car.model.remoteId);
		if(global.car.model !== undefined && !global.car.sitDownCar && mp.players.local.vehicle.remoteId === veh.remoteId)
			global.car.sitDownCar = true;
	}
	try{
		if(seat === -1 && vehicle.getVariable('engine') && !vehicle.getIsEngineRunning())
		{
			vehicle.setEngineOn(true, true, true);
		}
	} catch(e) {}
});



function playerStartEnterVehicleHandler(player, vehicle, seat) {
	let smthCar = {
		"vehDoors": vehicle.getVariable('vehDoors'),
	};
	mp.events.callRemote('setCarVariable', global.targetObj.obj.remoteId, JSON.stringify(smthCar));
	if(vehicle.getVariable('vehDoors')){
		entity.setDoorsLocked(2);
		entity.setDoorsLockedForAllPlayers(true);
	} else {
		entity.setDoorsLockedForAllPlayers(false);
		entity.setDoorsLocked(1);
		}
}

mp.events.add("playerStartEnterVehicle", playerStartEnterVehicleHandler);
/*	
mp.events.add('playerEnterVehicle', (vehicle, seat) => {
	if(seat === -1 && !vehicle.getVariable('engine') && !vehicle.getIsEngineRunning())
	{
		vehicle.setEngineOn(false, false, true);
	}
	global.hud.execute(`HUD.left_light=${vehicle.getVariable("indicatorsLeft")}`);
	global.hud.execute(`HUD.right_light=${vehicle.getVariable("indicatorsRight")}`);
	mp.gui.chat.push(String(vehicle.getVariable('engine')));
});
*/
mp.events.add('playerLeaveVehicle', (vehicle, seat) => {
	try{ if(seat === -1 && !vehicle.getIsEngineRunning() && vehicle.getVariable('engine')) vehicle.setEngineOn(true, true, true); } catch(e) {}
	try{
	if(seat === -1 && global.localplayer.music.display)
	{
		global.localplayer.music.Browser.execute('$("body").css("display", "none")');
		global.localplayer.music.display = false;
		mp.gui.cursor.show(false, false);
	}
	}catch(e){}
});

mp.events.add('entityStreamIn', (entity) => {
    if (entity.type === 'vehicle' && entity.hasVariable('dirtLevel')) entity.getVariable('dirtLevel') ? entity.setDirtLevel(parseFloat(entity.getVariable('dirtLevel'))) : entity.setDirtLevel(0);
	if (entity.type === 'vehicle' && entity.hasVariable('indicatorsLeft')) entity.getVariable('indicatorsLeft') ? entity.setIndicatorLights(1, entity.getVariable('indicatorsLeft')) : entity.setIndicatorLights(1, false);
	if (entity.type === 'vehicle' && entity.hasVariable('indicatorsRight')) entity.getVariable('indicatorsRight') ? entity.setIndicatorLights(0, entity.getVariable('indicatorsRight')) : entity.setIndicatorLights(0, false);
	if (entity.type === 'vehicle' && entity.hasVariable('engine')) entity.getVariable('engine') ? entity.setEngineOn(true, true, true) : entity.setEngineOn(false, false, true);
	if (entity.type === 'vehicle' && entity.hasVariable('vehWindows'))
		if(entity.getVariable('vehWindows'))
			entity.rollDownWindows();
		else
			try{
				entity.rollUpWindow(0);
				entity.rollUpWindow(1);
				entity.rollUpWindow(2);
				entity.rollUpWindow(3);
			} catch(e) {};
	if (entity.type === 'vehicle' && entity.hasVariable('vehDoors')){ 
		if(entity.getVariable('vehDoors')){
			entity.setDoorsLocked(2);
			entity.setDoorsLockedForAllPlayers(true);
		} else {
			entity.setDoorsLockedForAllPlayers(false);
			entity.setDoorsLocked(1);
		}
	}
	if (entity.type === 'vehicle' && entity.hasVariable('vehHood')) entity.getVariable('vehHood') ?	entity.setDoorOpen(4, !1, !1) : entity.setDoorShut(4, !1);
	if (entity.type === 'vehicle' && entity.hasVariable('vehTrunk')) entity.getVariable('vehTrunk') ? entity.setDoorOpen(5, !1, !1) : entity.setDoorShut(5, !1);
	if (entity.type === 'vehicle' && entity.hasVariable('vehSignal')) entity.getVariable('vehSignal') ? entity.setAlarm(true) : entity.setAlarm(false);
});

mp.events.addDataHandler('vehHood', function (entity, value, oldValue) {if (entity.type === 'vehicle' && entity.hasVariable('vehHood')) entity.getVariable('vehHood') ?	entity.setDoorOpen(4, !1, !1) : entity.setDoorShut(4, !1);});
mp.events.addDataHandler('vehTrunk', function (entity, value, oldValue) {if (entity.type === 'vehicle' && entity.hasVariable('vehTrunk')) entity.getVariable('vehTrunk') ? entity.setDoorOpen(5, !1, !1) : entity.setDoorShut(5, !1);});
mp.events.addDataHandler('vehSignal', function (entity, value, oldValue) {if (entity.type === 'vehicle' && entity.hasVariable('vehSignal')) entity.getVariable('vehSignal') ? entity.setAlarm(true) : entity.setAlarm(false);});
mp.events.addDataHandler('dirtLevel', function (entity, value, oldValue) {if (entity.type === 'vehicle' && entity.hasVariable('dirtLevel')) entity.getVariable('dirtLevel') ? entity.setDirtLevel(parseFloat(entity.getVariable('dirtLevel'))) : entity.setDirtLevel(0);});
mp.events.addDataHandler('indicatorsLeft', function (entity, value, oldValue) {if (entity.type === 'vehicle' && entity.hasVariable('indicatorsLeft')) entity.getVariable('indicatorsLeft') ? entity.setIndicatorLights(1, entity.getVariable('indicatorsLeft')) : entity.setIndicatorLights(1, false);});
mp.events.addDataHandler('indicatorsRight', function (entity, value, oldValue) {if (entity.type === 'vehicle' && entity.hasVariable('indicatorsRight')) entity.getVariable('indicatorsRight') ? entity.setIndicatorLights(0, entity.getVariable('indicatorsRight')) : entity.setIndicatorLights(0, false);});
mp.events.addDataHandler('engine', function (entity, value, oldValue) {if (entity.type === 'vehicle' && entity.hasVariable('engine')) entity.getVariable('engine') ? entity.setEngineOn(true, true, true) : entity.setEngineOn(false, false, true);});
mp.events.addDataHandler('vehWindows', function (entity, value, oldValue) { if (entity.type === 'vehicle' && entity.hasVariable('vehWindows')) if(entity.getVariable('vehWindows')) entity.rollDownWindows(); else try{ entity.rollUpWindow(0); entity.rollUpWindow(1); entity.rollUpWindow(2); entity.rollUpWindow(3);} catch(e) {};});
mp.events.addDataHandler('vehDoors', function (entity, value, oldValue) {if (entity.type === 'vehicle' && entity.hasVariable('vehDoors')){if(entity.getVariable('vehDoors')){entity.setDoorsLocked(2);entity.setDoorsLockedForAllPlayers(true);} else {entity.setDoorsLockedForAllPlayers(false);entity.setDoorsLocked(1);}}});

mp.events.add('spawnVeh', (vehicle, pos, plate) => {
	try{
		var veh = mp.vehicles.new(vehicle, pos, {
				engine: false,
				locked: false
		});
		veh.numberPlate = plate;
		return veh;
	}catch(e){
		mp.gui.chat.push("ERROR:", e);
	}
});



mp.events.add("playerLeaveVehicle", (vehicle, seat) => {
	if(global.task) {
		mp.players.local.clearTasks();
		global.task = false;
	}
    if(seat == -1){
		try{
			vehicle.rollUpWindow(0);
			vehicle.rollUpWindow(1);
			vehicle.rollUpWindow(2);
			vehicle.rollUpWindow(3);
		} catch(e) {};
	}
	try{
		vehicle.rollUpWindow(seat);
	} catch(e) {};
});

mp.events.add('vehInteraction', (action) => {
	mp.game.graphics.transitionFromBlurred(250);
	global.entityInteration = !global.entityInteration;
	mp.gui.cursor.show(false, false);
	mp.events.callRemote('items:veh', global.targetObj.obj.remoteId, action);
});

mp.events.add('vehDoors', (veh) => {
	let myVeh = mp.vehicles.atRemoteId(veh);
	let variable = !myVeh.getVariable('vehDoors');
	let smthCar = {"vehDoors": variable};
	mp.events.callRemote('setCarVariable', veh, JSON.stringify(smthCar));
	if(variable){
		myVeh.setDoorsLocked(2);
		myVeh.setDoorsLockedForAllPlayers(true);
	} else {
		myVeh.setDoorsLockedForAllPlayers(false);
		myVeh.setDoorsLocked(1);
	}
});

mp.events.add('vehEngine', (veh) => {
	let myVeh = mp.vehicles.atRemoteId(veh);
	if(myVeh.getVariable('fuelLevel') > 0){
		let variable = !myVeh.getVariable('engine');
		if(variable)
			myVeh.setEngineOn(true, true, true);
		else
			myVeh.setEngineOn(false, false, true);
		let smthCar = {"engine": variable};
		mp.events.callRemote('setCarVariable', veh, JSON.stringify(smthCar));
	}
});

mp.events.add('vehPassengers', (veh) => {
	return
	for(var i = -1; i < 10; i++){
		try{
			let pas = global.targetObj.obj.getPedInSeat(i);
			if(mp.players.local !== pas) pas.removeFromVehicle();
		}
		catch(e){}
	}
});

mp.events.add('vehSignal', (veh) => {
	let myVeh = mp.vehicles.atRemoteId(veh);
	let variable = !myVeh.getVariable('vehSignal');
	let smthCar = {"vehSignal": variable};
	mp.events.callRemote('setCarVariable', veh, JSON.stringify(smthCar));
	myVeh.setAlarm(variable);
});

mp.events.add('vehWindows', (veh) => {
	let myVeh = mp.vehicles.atRemoteId(veh);
	let variable = !myVeh.getVariable('vehWindows');
	if(variable)
		myVeh.rollDownWindows();
	else{
		myVeh.rollUpWindow(0);
		myVeh.rollUpWindow(1);
		myVeh.rollUpWindow(2);
		myVeh.rollUpWindow(3);
	}
	let smthCar = {"vehWindows": variable};
	mp.events.callRemote('setCarVariable', veh, JSON.stringify(smthCar));
});

mp.events.add('vehHood', (veh) => {
	let myVeh = mp.vehicles.atRemoteId(veh);
	let variable = !myVeh.getVariable('vehHood');
	let smthCar = {"vehHood": variable};
	mp.events.callRemote('setCarVariable', veh, JSON.stringify(smthCar));
	if(variable){
		myVeh.setDoorOpen(4, !1, !1);
	}else{
		myVeh.setDoorShut(4, !1);
	}
});

mp.events.add('vehTrunk', (veh) => {
	let myVeh = mp.vehicles.atRemoteId(veh);
	let variable = !myVeh.getVariable('vehTrunk');
	let smthCar = {"vehTrunk": variable,};
	mp.events.callRemote('setCarVariable', veh, JSON.stringify(smthCar));
	if(variable){
		myVeh.setDoorOpen(5, !1, !1);
	}else{
		myVeh.setDoorShut(5, !1);
	}
});


mp.events.add('plate:open', (startPlate) => {
	global.eButton = false;
	global.hud.execute(`interactionIndicator.show=0`);
	global.plateBrowser = mp.browsers.new('package://cef/car-number-plate/index.html');
	global.plateBrowser.execute(`$('.random-plate').html('${startPlate}')`);
	mp.gui.cursor.show(true, true);
});

mp.events.add('plate:closeBrowser', () => {
	global.plateBrowser.destroy();
	setTimeout(function(){
		mp.gui.cursor.show(false, false);
	}, 300);
});

mp.events.add('plate:random', () => {
	mp.events.callRemote('plate:random');
});

mp.events.add('plate:anotherPlate', (plate) => {
	global.plateBrowser.execute(`$('.random-plate').html('${plate}')`);
});

mp.events.add('plate:buy', (plate, cost) => {
	if(global.localplayer.data.cash < cost) return mp.events.call('SendAlert', 'У вас недостаточно средств', 'red');
	mp.events.call('plate:closeBrowser');
	mp.events.callRemote('plate:check', plate, cost);
});

var playerVehNames = [];
var impoundLotPed;
mp.events.add('impoundLot:open', (vehNames) => {
	playerVehNames = JSON.parse(vehNames);
	let a = {"x": 406.95989990234375, "y": -1626.035400390625, "z": 29.29195785522461, "heading": -70.10669708251953, "id": "ig_trafficwarden"};
	let [camPos, shopId] = [a, 'impoundLot'];
	global.hud.execute(`interactionIndicator.show=0`);
	mp.players.local.setAlpha(0);
	mp.events.callRemote("anotherDimension", shopId);
	global.cam = mp.cameras.new("Camera", {x: camPos.x - mp.game.system.sin(camPos.heading)*3, y: camPos.y + mp.game.system.cos(camPos.heading)*3, z: camPos.z + 0.5}, {x: 0, y: 0, z: 0}, 50);
	setTimeout(function(){
		impoundLotPed = mp.peds.new(
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
	global.ImpoundLotBrowser = mp.browsers.new('package://cef/quest-dialog/index.html');
	global.ImpoundLotBrowser.execute(`$('.first').on('click', function(){
										mp.trigger('impoundLot:openVehBrowser');
									});
									$('.second').on('click', function(){
										mp.trigger('impoundLot:closeBrowser');
									});`);
	global.ImpoundLotBrowser.execute(`dialogs.name='Полицейский'`);
	global.ImpoundLotBrowser.execute(`dialogs.text='Добрый день. Вы желаете забрать транспортное средство с штрафстоянки?'`);
	global.ImpoundLotBrowser.execute(`dialogs.btn='Да'`);
	mp.gui.cursor.show(true, true);
	mp.players.local.freezePosition(true);
});
var current_veh = 0;
mp.events.add('impoundLot:openVehBrowser', () => {
	if(!playerVehNames.length){
		mp.events.call('impoundLot:closeBrowser');
		return mp.events.call('SendAlert', 'У вас нет машин на штрафстоянке', 'red');
	}
	let camPos = {x: 396.1302795410156, y: -1644.63623046875, z: 29.291948318481445, heading: -39.31022262573242}
	global.cam.setActive(false);
	mp.game.cam.renderScriptCams(false, true, 0, true, true);
	global.cam.destroy();
	global.cam = mp.cameras.new("Camera", {x: camPos.x - mp.game.system.sin(camPos.heading)*5, y: camPos.y + mp.game.system.cos(camPos.heading)*5, z: camPos.z + 0.7}, {x: 0, y: 0, z: 0}, 50);
	global.cam.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
	global.cam.pointAtCoord(camPos.x, camPos.y, camPos.z - 0.2);		
	global.ImpoundLotBrowser.destroy();
	global.ImpoundLotBrowser = mp.browsers.new('package://cef/impound-lot/index.html');
	global.ImpoundLotBrowser.execute(`$('.car-header').html('${playerVehNames[0][0]}');`);
	global.ImpoundLotBrowser.execute(`$('.buy').html('Оплатить - ${playerVehNames[0][1]} &#8381;');`);
	mp.events.callRemote('spawnPlayerImpoundLotVeh', 0);
});

mp.events.add('impoundLot:prevElement', () => {
	current_veh -= 1;
	if(current_veh < 0) current_veh = playerVehNames.length - 1;
	global.ImpoundLotBrowser.execute(`$('.car-header').html('${playerVehNames[current_veh][0]}');`);
	global.ImpoundLotBrowser.execute(`$('.buy').html('Оплатить - ${playerVehNames[current_veh][1]} &#8381;');`);
	mp.events.callRemote('spawnPlayerImpoundLotVeh', current_veh);
});

mp.events.add('impoundLot:nextElement', () => {
	current_veh += 1;
	if(current_veh === playerVehNames.length) current_veh = 0;
	global.ImpoundLotBrowser.execute(`$('.car-header').html('${playerVehNames[current_veh][0]}');`);
	global.ImpoundLotBrowser.execute(`$('.buy').html('Оплатить - ${playerVehNames[current_veh][1]} &#8381;');`);
	mp.events.callRemote('spawnPlayerImpoundLotVeh', current_veh);
});

mp.events.add('impoundLot:payForCar', () => {
	if(global.localplayer.data.cash < playerVehNames[current_veh][1]) return mp.events.call('SendAlert', 'У вас недостаточно средств', 'red');
	mp.events.callRemote('payPlayerImpoundLotVeh', current_veh);
});

mp.events.add('impoundLot:closeBrowser', () => {
	mp.events.callRemote('impoundLot:destroyVeh');
	global.ImpoundLotBrowser.destroy();
	global.cam.setActive(false);
	mp.game.cam.renderScriptCams(false, true, 0, true, true);
	global.cam.destroy();
	global.cam = null;
	impoundLotPed.destroy();
	mp.events.callRemote("gameDimension");
	mp.players.local.setAlpha(255);
	mp.players.local.freezePosition(false);
	global.player_dont_close_iteraction = false;
	mp.gui.cursor.show(false, false);
});




setInterval(function(){_intervalFunction();},1000);

function _intervalFunction() {
	let player = mp.players.local;
	if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle) // Check if player is in vehicle and is driver
	{
		let speed = mp.players.local.vehicle.getSpeed();
		let veh_data = JSON.stringify({"speedofcar":speed});
		mp.events.callRemote('calc_km', player.vehicle.remoteId, veh_data);
	}
};