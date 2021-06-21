const localPlayer = mp.players.local;
const camera = mp.cameras.new("gameplay");
let musicPlayer = mp.browsers.new('package://cef/music-browser/index.html');
global.musicPlayer_player = musicPlayer;
let activeSounds = {};

const soundManager = {
    remove: function (player, id) {
        if (player && musicPlayer) {
			musicPlayer.execute(`stopAudio("${id}")`);
        }
    },
    setVolume: function (player, id, volume) {
        if (player && musicPlayer) {
			let cam_pos = camera.getCoord(),
				cam_vector = camera.getDirection(),
				car_pos = mp.vehicles.atRemoteId(parseInt(id)).position,  // can use any coords here(not only veh position)
				car_vector = {x: car_pos.x-cam_pos.x, y: car_pos.y-cam_pos.y},
				dx = car_vector.x * cam_vector.x + car_vector.y * cam_vector.y,
				dy = mp.game.system.sqrt(cam_vector.x*cam_vector.x + cam_vector.y*cam_vector.y) * mp.game.system.sqrt(car_vector.x*car_vector.x + car_vector.y*car_vector.y);
			// calculates where point is left/right
			let s = cam_vector.x*(car_pos.y-cam_pos.y) - cam_vector.y*(car_pos.x-cam_pos.x),
				a = 1;
			if(s > 0) a = -1
			else if(s < 0) a = 1
			else a = 0;
			let pan = Math.sqrt(1-(dx / dy).toFixed(3)*(dx / dy).toFixed(3))*a;
			
			musicPlayer.execute(`setVolume("${id}", "${volume}", ${pan});`);
        }
    },
    pauseToggle: function (player, id, pause) {
        if (player && musicPlayer) {
			musicPlayer.execute(`setPaused("${id}", ${pause})`);
        }
    },
	loopToggle: function (player, id, loop) {
        if (player && musicPlayer) {
			musicPlayer.execute(`setLoop("${id}", ${loop})`);
        }
    },
	updateSeek: function (player, id, seek) {
        if (player && musicPlayer) {
			musicPlayer.execute(`setSeek("${id}", ${seek})`);
        }
    },
}

mp.events.add({
    'createSound': (soundObj, volume) => {
        soundObj = JSON.parse(soundObj);
        if (musicPlayer) musicPlayer.execute(`playAudio("${soundObj.id}", "${soundObj.url}", ${soundObj.startTime}, "${volume}", ${soundObj.loop})`);
    },
    'setSoundVolume': (id, volume) => {
        soundManager.setVolume(localPlayer, id, volume);
    },
	'anotherDestroySound': (soundID) =>
	{
        soundManager.remove(localPlayer, soundID);
	},
    'pauseSound': (soundID) => {
        soundManager.pauseToggle(localPlayer, soundID, true);
    },
    'resumeSound': (soundID) => {
        soundManager.pauseToggle(localPlayer, soundID, false);
    },
    'sound:loop': (soundID, loop) => {
        soundManager.loopToggle(localPlayer, soundID, loop);
    },
	'sound:updateSeek': (soundID, seek) => {
		soundManager.updateSeek(localPlayer, soundID, seek);
	}
});

mp.game.audio.playSound3D = function (id, url, range, volume, endTime, header, artist, loop) {
	endTime = endTime.split(':');
	let smth = [1, 60, 3600, 86400],
		new_endTime = 0,
		k = 0;
	for(let i=endTime.length-1; i>=0; i--){
		new_endTime += parseInt(endTime[i]) * smth[k];
		k += 1
	}
	endTime = new_endTime;
    mp.events.callRemote('sound:create', id, url, range, volume, endTime, header, artist, loop);
};