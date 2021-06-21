
/*

Настройки голосового чата
Мут, звонок по телефону, говорить в голосовой чат

*/

const Use3d = true;
const UseAutoVolume = false;
const MaxRange = 8.0;
	

var g_voiceMgr = {
    listeners: [],

    add: function add(player, notify) {
        if (this.listeners.indexOf(player) === -1) {
            if (notify) mp.events.callRemote("add_voice_listener", player);
            this.listeners.push(player);
            player.voice3d = true;
            player.voiceVolume = 0.0;
            player.isListening = true;
        }
    },

    remove: function remove(player, notify) {
        var idx = this.listeners.indexOf(player);
        if (idx !== -1) {
            if (notify) mp.events.callRemote("remove_voice_listener", player);
            this.listeners.splice(idx, 1);
            player.isListening = false;
        }
    }
};

mp.events.add("playerQuit", function (player) {
    if (player.isListening) g_voiceMgr.remove(player, false);
});

mp.events.add('playerStartTalking', function (player) {
	player.isVoiceActive = true;
    player.voice3d = true;
    player.playFacialAnim("mic_chatter", "mp_facial");
});

mp.events.add('playerStopTalking', function (player) {
	player.isVoiceActive = false;
    player.playFacialAnim("mood_normal_1", "facials@gen_male@variations@normal");
});


var localPos = mp.players.local.position;
var playerPos = mp.players.local.position;


var voiceUpdate = function voiceUpdate() {
	if(!global.localplayer.data.login) return;
    localPos = mp.players.local.position;

    mp.players.forEachInStreamRange(function (player) {
        if (player !== mp.players.local && JSON.parse(player.getVariable('playersMuted')).indexOf(mp.players.local.getVariable('sqlID')) === -1) {
            if (!player.isListening) {
                playerPos = player.position;
                if (mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z) <= MaxRange) g_voiceMgr.add(player, true);
            }
        }
    });

    g_voiceMgr.listeners.forEach(function (player) {

        if (player.handle !== 0 && JSON.parse(player.getVariable('playersMuted')).indexOf(mp.players.local.getVariable('sqlID')) === -1) {

            playerPos = player.position;
            var dist;
			let smth = mp.raycasting.testPointToPoint(playerPos, localPos, null, 19)
			if(smth === undefined){
				dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z);
			} else {
				dist = mp.game.system.vdist(playerPos.x, playerPos.y, playerPos.z, localPos.x, localPos.y, localPos.z) + 2;
			}

            if (dist > MaxRange) g_voiceMgr.remove(player, true);else if (!UseAutoVolume) player.voiceVolume = 1 - dist / MaxRange;
        } else g_voiceMgr.remove(player, true);
    });
};

setInterval(voiceUpdate, 100);

