const rpc = require('./modules/rage-rpc.min.js');

global.adminSelect = [];
global.adminSelect.isOpen = false;
	

global.admin = [];
global.admin.browserIsOpen = false;

rpc.register('getPlayer', () => { 
    let player = mp.players.local
    return {
        name: player.name
    }
});

mp.events.add('showAdminBrowser', () => {
    global.admin.browser = mp.browsers.new('package://cef/admin/index.html');
    mp.gui.cursor.show(true, true);
    global.admin.browserIsOpen = true;
});

mp.events.add('closeAdminBrowser', () => {
    mp.gui.cursor.show(false, false);
    global.admin.browser.destroy();
    global.admin.browserIsOpen = false;
});

mp.events.add('kickPlayer', (playerId) => {
    mp.events.callRemote('kickPlayer', playerId)
});

mp.events.add('adminSelectOpen', ()=> {
	global.adminSelect.browser = mp.browsers.new('package://cef/admin-select/index.html');
	mp.gui.cursor.show(true, true);
	global.adminSelect.isOpen = true;
});

mp.events.add('adminSelectClose', ()=> {
	global.adminSelect.browser.destroy();
	mp.gui.cursor.show(false, false);
	global.adminSelect.isOpen = false;
});

mp.events.add('openAdminPanel', ()=>{
	mp.events.callRemote('adminPanelOpen');
	return;
});

mp.keys.bind(global.Keys.VK_O, true, () => {
	if(global.localplayer.die) return;
	if (global.admin.browserIsOpen) {
        mp.events.call('closeAdminBrowser');
		return;
    }
	if (!global.ambulance.browserIsOpen && !mp.gui.cursor.visible && global.localplayer.data.faction == 'EMC') {
        mp.events.call('showAmbulanceBrowser');
		return;
    } 
	if (global.ambulance.browserIsOpen && !mp.gui.cursor.visible) {
        mp.events.call('closeAmbulanceBrowser');
		return;
    }
	if (!global.police.browserIsOpen && !mp.gui.cursor.visible && global.localplayer.data.faction == 'Police') {
        mp.events.call('showPoliceBrowser');
		return;
    } 
	if (global.police.browserIsOpen && !mp.gui.cursor.visible) {
        mp.events.call('closePoliceBrowser');
		return;
    }
	if (!global.fib.browserIsOpen && !mp.gui.cursor.visible && global.localplayer.data.faction == 'GID') {
        mp.events.call('showGidBrowser');
		return;
    } 
	if (global.fib.browserIsOpen && !mp.gui.cursor.visible) {
        mp.events.call('closeGidBrowser');
		return;
    }
	if (!global.fib.browserIsOpen && !mp.gui.cursor.visible && global.localplayer.data.faction == 'FIB') {
        mp.events.call('showFibBrowser');
		return;
    } 
	if (global.fib.browserIsOpen && !mp.gui.cursor.visible) {
        mp.events.call('closeFibBrowser');
		return;
    }
	
	if (!global.mid.browserIsOpen && !mp.gui.cursor.visible && global.localplayer.data.faction == 'Mayoralty') {
        mp.events.call('showMidBrowser');
		return;
    } 
	if (global.mid.browserIsOpen && !mp.gui.cursor.visible) {
        mp.events.call('closeMidBrowser');
		return;
    }
	if (!global.admin.browserIsOpen && !global.adminSelect.isOpen && !mp.gui.cursor.visible && global.localplayer.data.admin > 0) {
        mp.events.call('adminSelectOpen');
		return;
    } 
	if (global.adminSelect.isOpen) {
        mp.events.call('adminSelectClose');
		return;
    }
});