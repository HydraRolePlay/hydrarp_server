const maxDistance = 50;
const width = 0.03;
const height = 0.0065;
const border = 0.001;
const color = [255,255,255,255];

mp.nametags.enabled = false;

mp.events.add('render', (nametags) => {
    if (mp.players.local.vehicle) {
        mp.game.audio.setRadioToStationName("OFF");
        mp.game.audio.setUserRadioControlEnabled(false);
    }
    const graphics = mp.game.graphics;
    const screenRes = graphics.getScreenResolution(0, 0);
	
	const localPlayer = mp.players.local;
	mp.game.graphics.requestStreamedTextureDict("mpleaderboard", true);
	mp.game.graphics.requestStreamedTextureDict("mpinventory", true);
	mp.game.player.resetStamina();
	
	if(mp.game.graphics.world3dToScreen2d(new mp.Vector3(87.36916, -1955.03662, 21.74652)) !== undefined && global.localplayer.data.login){
		var x = mp.game.graphics.world3dToScreen2d(new mp.Vector3(87.36916, -1955.03662, 21.74652)).x;
		var y = mp.game.graphics.world3dToScreen2d(new mp.Vector3(87.36916, -1955.03662, 21.74652)).y;
		var b = Math.max;
		var distance = mp.game.gameplay.getDistanceBetweenCoords(87.36916, -1955.03662, 20.74652, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, true);
		if(distance <= 30) {
			const a = "mp_specitem_randomobject",
					e = 1 * b(.1, 1 - y / 50),
					i = graphics.getTextureResolution("mpinventory", a),
					j = [e * i.x / screenRes.x, e * i.y / screenRes.y];
			mp.game.graphics.drawSprite("mpinventory", a, x, y, j[0], j[1], 0, 255, 255, 0, 255);
		}
	}
	if(localplayer.vehicle && global.task && global.waypoints && mp.game.gameplay.getDistanceBetweenCoords(global.waypoints.x, global.waypoints.y, global.waypoints.z, localplayer.position.x, localplayer.position.y, localplayer.position.z, false) < 50){
		mp.events.call('autopilot:playerReachedWaypoint');
	}
	if(global.car.model !== undefined ){
		let veh = mp.vehicles.atRemoteId(global.car.model.remoteId);
		if(mp.players.local.vehicle && mp.players.local.vehicle.remoteId === veh.remoteId) {}
		else if(global.car.model !== undefined && global.car.sitDownCar && mp.game.gameplay.getDistanceBetweenCoords(veh.position.x, veh.position.y, veh.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, true) > 5)
		{
			mp.events.callRemote('carsharing:deleteKeys', global.car.model.remoteId);
			smth = {
				"owner": null,
				"engine": false,
				"vehDoors": true,
			};
			mp.events.callRemote('setCarVariable', veh.remoteId, JSON.stringify(smth));
			global.car = [];
			mp.events.call('SendAlert', 'Аренда закончилась. Вы находитесь слишком далеко от транспорта.', 'red');
		}
	}
	if(!global.hudd) return;
	let playerList = [];
    nametags.forEach(nametag => {
        let [player, x, y, distance] = nametag;
        if(distance <= maxDistance) {
			let scale = (distance / maxDistance);
            if(scale < 0.2) scale = 0.2;
			let txt = global.playerFriends.indexOf(player.getVariable('sqlID')) === -1 ? `Незнакомец` : player.getVariable('nick');
			playerList.push({x: x, y: y, scale: scale, name: txt, id: player.getVariable('sqlID'), voice: player.isVoiceActive});
        }
    });
	global.hud.execute(`updateNametags(${JSON.stringify(playerList)});`);
});




/////
/*
	Entity tags for iteraction
*/
/////

const player = mp.players.local;
const graphics = mp.game.graphics;
global.targetVehicle = null;
global.targetPlayer = null;


function drawNewLabel(obj){
	graphics.drawText('G', [obj.position.x, obj.position.y, obj.position.z], { 
		font: 2, 
		color: [255, 255, 255, 200], 
		scale: [0.4, 0.4],
		outline: false
	});
}


// draw G label
mp.events.add('render', () => {
	let a = player.getBoneCoords(12844, .5, 0, 0);
	const b = graphics.getScreenActiveResolution(1, 1),
		c = graphics.screen2dToWorld3d([b.x / 2, b.y / 2, 14]);
	if (null == c) return global.targetVehicle = null, void(global.targetPlayer = null);
	a.z -= .3;
	const d = mp.raycasting.testPointToPoint(a, c, player, 14);
	if ("undefined" == typeof d || "undefined" == typeof d.entity.type) return global.targetVehicle = null, void(global.targetPlayer = null);
	const obj = d.entity;
	if ("player" == obj.type) {
		if (4 < mp.game.system.vdist(player.position.x, player.position.y, player.position.z, obj.position.x, obj.position.y, obj.position.z)) return global.targetVehicle = null, void(global.targetPlayer = null);
		drawNewLabel(obj), global.targetPlayer = obj, global.targetVehicle = null
	} else if ("vehicle" == obj.type && obj.getEngineHealth() > 0) {
		if (6 < mp.game.system.vdist(player.position.x, player.position.y, player.position.z, obj.position.x, obj.position.y, obj.position.z)) return global.targetVehicle = null, void(global.targetPlayer = null);
		drawNewLabel(obj), global.targetVehicle = obj, global.targetPlayer = null
	} else global.targetVehicle = null, global.targetPlayer = null	
})