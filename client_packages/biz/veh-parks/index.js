mp.events.add({
	'parking:open': (vehOnPark, freeVeh, parkNum) => 
	{
		global.eButton = false;
		global.hud.execute(`interactionIndicator.show=0`);
		global.parkingBrowser = mp.browsers.new('package://cef/parking/index.html');
		global.parkingBrowser.execute(`parkingNumber = ${parkNum};
									   updateCars(${vehOnPark}, ${freeVeh});`);
		mp.gui.cursor.show(true, true);
	},
	'parking:close': () =>
	{
		global.parkingBrowser.destroy();
		setTimeout(function(){
			mp.gui.cursor.show(false, false);
		}, 300);
	},
	'parking:free-park-places': (parkNum) =>
	{
		mp.events.callRemote('parking:free-park-places', parkNum);
	},
	'parking:set-park-places': (parks) =>
	{
		global.parkingBrowser.execute(`updateParks(${parks});
									  $('.modal.choose_park').addClass('active');`);
	},
	'parking:updateCars': (playerCars, number) =>
	{
		mp.events.callRemote('parking:updateCars', playerCars, number);
	},
	'parking:updateVehicles': (vehOnPark, freeVeh) =>
	{
		global.parkingBrowser.execute(`updateCars(${vehOnPark}, ${freeVeh});`);
	},	
	'parking:buyPlace': (cost, placeNumber, parkNum) => 
	{
		if(global.localplayer.data.cash < cost) return mp.events.call('SendAlert', 'У вас недостаточно средств', 'red');
		mp.events.callRemote('parking:checkPlace', parkNum, placeNumber, cost);
	},
});