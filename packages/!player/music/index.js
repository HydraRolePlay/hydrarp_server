const maxRange = 15;
var serverSounds = {}
mp.events.add({
	'sound:create': (player, id, url, range, volume, endTime, header, artist, loop) => {
		if(id in serverSounds){
			serverSounds[id].listeners.forEach(player => {
				try{
					player.call('anotherDestroySound', [id]);
				} catch(e){}
			});
			delete serverSounds[id];
		}
		serverSounds[id] = {
			id: id,
			url: url,
			volume: volume,
			range: range,
			listeners: [],
			paused: false,
			startTime: -1000,
			endTime: endTime * 1000,
			header: header,
			artist: artist,
			loop: loop,
		}
	},
	'sound:getMusicInfo': (player, id) => {
		if(id in serverSounds){
			player.call('musicPlayer:VehData', [serverSounds[id].header, serverSounds[id].artist, serverSounds[id].pause]);
		}
	},
	'sound:getSeek': (player, id) => {
		if(id in serverSounds){
			player.call('sound:updateSeek', [id, serverSounds[id].startTime + 50]);
		}
	},
	'sound:destroy': (player, id) => {
		if(id in serverSounds){
			serverSounds[id].listeners.forEach(player => {
				player.call('anotherDestroySound', [id]);
			});
			delete serverSounds[id];
		}
	},
	'sound:pause': (player, id) => {
		if(id in serverSounds){
			serverSounds[id].paused = true;
			serverSounds[id].listeners.forEach(player => {
				player.call('pauseSound', [id]);
			});
		}
	},
	'sound:resume': (player, id) => {
		if(id in serverSounds){
			serverSounds[id].paused = false;
			serverSounds[id].listeners.forEach(player => {
				player.call('resumeSound', [id]);
			});
		}
	},
	'sound:setVolume': (player, id, volume) => {
		if(id in serverSounds){
			serverSounds[id].volume = volume;
		}
	},
	'sound:setLoop': (player, id, loop) => {
		if(id in serverSounds){
			serverSounds[id].loop = loop;
			serverSounds[id].listeners.forEach(player => {
				try{
					player.call('sound:loop', [id, serverSounds[id].loop]);
				} catch(e){}
			});
		}
	},
});

setInterval(function(){setCarPosition();},50);

function setCarPosition() {
	try{
		mp.vehicles.forEach( 
			(veh) => {
				if(veh.id in serverSounds){
					if(!serverSounds[veh.id].paused){
						serverSounds[veh.id].listeners.forEach(player => {
							let dist = veh.dist(player.position);
							if(dist > (maxRange + 20)){
								let idx = serverSounds[veh.id].listeners.indexOf(player);
								serverSounds[veh.id].listeners.splice(idx, 1);
								player.call('anotherDestroySound', [veh.id]);
							}else{
								let volume = serverSounds[veh.id].volume * (1 - (dist / maxRange));
								volume = volume < 0 ? 0 : volume;
								player.call('setSoundVolume', [veh.id, volume*volume]);
							}
						});
						mp.players.forEachInRange(veh.position, maxRange+20,
							(player) => {
								if(!serverSounds[veh.id].listeners.includes(player)){
									let dist = veh.dist(player.position);
									let volume = serverSounds[veh.id].volume * (1 - (dist / maxRange));
									volume = volume < 0 ? 0 : volume;
									serverSounds[veh.id].listeners.push(player);
									player.call('createSound', [JSON.stringify(serverSounds[veh.id]), volume*volume]);
								}
							}
						);
						if(serverSounds[veh.id].endTime <= serverSounds[veh.id].startTime){
							if(serverSounds[veh.id].loop){
								serverSounds[veh.id].startTime = -50;
							} else {
								serverSounds[veh.id].listeners.forEach(player => {
									try{
										player.call('anotherDestroySound', [veh.id]);
									} catch(e){}
								});
								delete serverSounds[veh.id];
							}
						}
						serverSounds[veh.id].startTime += 50;
					}
				}
		});
	} catch(e) {}
} 

