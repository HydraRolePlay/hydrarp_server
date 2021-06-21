mp.events.add('sendMessageChat', (val, chatId) => { 
	if(val.charAt(0) === '/'){
		mp.events.callRemote('playerCommands', JSON.stringify({'text': val, 'chat': chatId}));
	} else {
		let message = {
			lighters: [{
				'text': 'me',
				'color': 'white',
				'background': 'lightblue'
			}],
			chat: chatId,
			text: val,
		}
		message = JSON.stringify(message);
		global.chat.browser.execute(`pushMsg(${message});`);
		mp.events.callRemote('playerChatt', JSON.stringify({'text': val, 'chat': chatId}));
	}
});

mp.events.add('sendMessageFromBackend', (val) => { 
	val = JSON.parse(val);
	if(val.nickname)
		val.nickname = global.playerFriends.indexOf(val.nickname[0]) !== -1 ? val.nickname[1] + `#${val.nickname[0]}` : `Незнакомец#${val.nickname[0]}`;
	val = JSON.stringify(val);
	global.chat.browser.execute(`pushMsg(${val});`);
});

mp.events.add('closeChat', () => { 
	mp.gui.cursor.show(false, false);
	global.chat.active = false;
	global.chat.browser.execute(`setState("transparent")`);
});