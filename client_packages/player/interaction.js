mp.events.add('plMic', (qwerty) => {
	mp.game.graphics.transitionFromBlurred(250);
	global.entityInteration = !global.entityInteration;
	mp.storage.data.mutedPlayers.push(global.targetObj.player.getVariable('sqlID'));
	mp.storage.flush();
	mp.events.callRemote('playersMuted', JSON.stringify(mp.storage.data.mutedPlayers));
	mp.gui.cursor.show(false, false);
	return;
});

mp.events.add('plTrade', (qwerty) => {
	mp.game.graphics.transitionFromBlurred(250);
	global.entityInteration = !global.entityInteration;
	mp.gui.cursor.show(false, false);
	mp.events.callRemote('plTrade', global.targetObj.player.remoteId);
});

mp.events.add('AddNewFriend', (playerId) => {
	global.playerFriends.push(playerId);
	mp.storage.data.playerFriends = global.playerFriends;
	mp.storage.flush();
});

mp.events.add('plDocuments', (qwerty) => {
	mp.game.graphics.transitionFromBlurred(250);
	global.entityInteration = !global.entityInteration;
	mp.gui.cursor.show(false, false);
	return;
});

mp.events.add('plAcquaint', (qwerty) => {
	mp.game.graphics.transitionFromBlurred(250);
	if(global.playerFriends.indexOf(global.targetObj.player.getVariable('sqlID')) === -1){ 
		mp.events.callRemote('plAcquaint', global.targetObj.player.remoteId);
	}else{
		mp.events.callRemote('plAcquaint', global.targetObj.player.remoteId);
	}
	global.entityInteration = !global.entityInteration;
	mp.gui.cursor.show(false, false);
	return;
});

mp.events.add('plResq', (qwerty) => {
	mp.game.graphics.transitionFromBlurred(250);
	global.entityInteration = !global.entityInteration;
	mp.events.callRemote('playerHeal', global.targetObj.player.remoteId);
	mp.gui.cursor.show(false, false);
	return;
});

mp.events.add('plBust', (qwerty) => {
	mp.game.graphics.transitionFromBlurred(250);
	global.entityInteration = !global.entityInteration;
	mp.gui.cursor.show(false, false);
	mp.events.callRemote('police:bust', global.targetObj.player.remoteId);
	return;
});

mp.events.add('plHandcuff', (qwerty) => {
	mp.game.graphics.transitionFromBlurred(250);
	global.entityInteration = !global.entityInteration;
	mp.gui.cursor.show(false, false);
	// наручники
	return;
});