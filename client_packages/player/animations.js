global.playerAnimation = false;
global.playAnimation = false;
mp.events.add({
	'animations:OpenBrowser': () => {
		global.AnimationBrowser.execute("selectActive = false");
		global.AnimationBrowser.execute("$('.select-wrapper').css('right', '0px');");
		global.mainBrowser.execute('all_windows["container-animations"] = true;updateWindows();');
		mp.gui.cursor.show(true, true);
	},
	'animations:CloseBrowser': () => {
		global.AnimationBrowser.execute("$('.select-wrapper').css('right', '-7vw');");
		global.AnimationBrowser.execute("$('.select-item-block').css('display', 'none');");
		global.mainBrowser.execute('all_windows["container-animations"] = false;updateWindows();');
		setTimeout(()=>{
			mp.gui.cursor.show(false, false);
		}, 300);
	},
	'animations:playAnimation': (numberDict, numberAnim) => {
		if(global.iteractionWithItems && !global.playAnimation)
			return mp.events.call('SendAlert', "Вы не можете это сделать", "red");
		global.playAnimation = true;
		mp.events.callRemote('animation:play', numberDict, numberAnim);		
		global.iteractionWithItems = true;
	},
	'animations:stopAnimation': () => {
		if(!global.playAnimation){
			mp.events.callRemote('animation:stop');
			global.iteractionWithItems = false;
			global.playAnimation = false;
		}
	},
});

mp.keys.bind(global.Keys.VK_F, true, function() {
	if(global.playAnimation){
		mp.events.callRemote('animation:stop');
		global.playAnimation = false;
		global.iteractionWithItems = false;
	}
});


mp.keys.bind(global.Keys.VK_U, true, function() {
	if(mp.gui.cursor.visible && !global.playerAnimation) return;
	if(global.localplayer.die || global.inventory.openBrowser) return;
	if(mp.players.local.vehicle) return;
	if(!global.playerAnimation)
		mp.events.call('animations:OpenBrowser');
	else
		mp.events.call('animations:CloseBrowser');
	global.playerAnimation = !global.playerAnimation;
});
