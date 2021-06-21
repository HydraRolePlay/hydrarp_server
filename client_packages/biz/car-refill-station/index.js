mp.events.add({
	"refillCar": () => 
	{
		if((mp.players.local.vehicle.getVariable('maxFuelLevel') - mp.players.local.vehicle.getVariable('fuelLevel')) < 1){
			mp.events.call('SendAlert', "Машина уже заправлена", "red");
			return;
		}
		global.hud.execute(`interactionIndicator.show=0`);
		global.hud.execute(`help.show=0`);
		global.hud.execute(`logotype.show=0`);
		
		mp.game.ui.displayHud(false);
		global.localplayer.fuelBrowser = mp.browsers.new('package://cef/car-refill/index.html');
		global.localplayer.fuelBrowser.execute(`sepFuel=${(mp.players.local.vehicle.getVariable('maxFuelLevel') - mp.players.local.vehicle.getVariable('fuelLevel')) / 10}`);
		global.localplayer.fuelBrowser.execute(`$('.fuel_type[id=${mp.players.local.vehicle.getVariable('fuelType')}]').append('<div class="fuel_info_using">Используется</div>')`);
		mp.gui.cursor.show(true, true);
		
	},
	"closeCarBrowser": () => {
		global.hud.execute(`help.show=1`);
		global.hud.execute(`logotype.show=1`);
		global.localplayer.fuelBrowser.destroy();
		setTimeout(function(){
			mp.gui.cursor.show(false, false);	
		}, 500);
		
	},
	"checkCost": (buyType, litters, cost, fuelType) => {
		mp.events.callRemote('getPlayerMoneyFuel', buyType, litters, cost, fuelType)
	},
	"BuyFuel": (money, buyType, litters, cost, fuelType) => {
		if(!money){
			mp.events.call('SendAlert', "У вас нехватает средств", "red");
			return;
		}
		
		if(mp.players.local.vehicle.getVariable('fuelType') !== fuelType && (mp.players.local.vehicle.getVariable('fuelLevel') / mp.players.local.vehicle.getVariable('maxFuelLevel') * 100) > 20){
			mp.events.call('SendAlert', "В Вашей машине больше 20% другого вида топлива", "red");
			return;
		}
		mp.events.callRemote('buyThingsInTheShop', cost, buyType);
		let smthCar = {
			'fuelType': fuelType,
			'fuelLevel': mp.players.local.vehicle.getVariable('fuelLevel') + litters,
		};
		mp.events.callRemote('setCarVariable', mp.players.local.vehicle.remoteId, JSON.stringify(smthCar));
		mp.events.call('SendAlert', "Вы успешно заправились!", "green");
		global.localplayer.fuelBrowser.destroy();
		global.hud.execute(`help.show=1`);
		global.hud.execute(`logotype.show=1`);
		mp.gui.cursor.show(false, false);
	},
});