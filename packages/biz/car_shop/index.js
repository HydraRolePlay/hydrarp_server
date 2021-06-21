var Config = require('../../configs/veh_shop/config.json')
var Car_Shop = require('../../configs/veh_shop/vehicle_shop.json');
var DB = require('../../MySQL/modules/db.js');

function randomPlate(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

mp.events.add({
    "exitVehicleShop": (player, type) => {
		data = Config.CarShop[type];
		player.position = new mp.Vector3(data.Marker.x, data.Marker.y, data.Marker.z);
        player.dimension = 0;
    },
    "buyVehicleShop": (player, hash, price, color, type, fuelMaxLevel, trunk, name, money_type) => {
		data = Config.CarShop[type]; // тип оплаты
        let player_select = [player.data.cash, player.data.card]
		if(price < player_select[money_type]) {
			/*
			if(player.freeCars.length) {
				player.call('SendAlert', ['Поставьте машину на парковку, чтобы купить новую', 'red']);
				player.call("exitVehicleShop");
				return;
			}
			*/
            player_select[money_type] -= price;
            randomPos = Config.CarShop[type].Park;
            randomPos = randomPos[Math.floor(Math.random() * Object.keys(randomPos).length)];
			plate = randomPlate(8);
			player.call("exitVehicleShop");
			setTimeout(function(){
				vehicleBought = mp.vehicles.new(mp.joaat(hash), new mp.Vector3(randomPos.x, randomPos.y, randomPos.z), {
					dimension: 0,
					heading: randomPos.rz,
					engine: false
				});
				vehicleBought.owner = player.name;
				player.position = new mp.Vector3(data.Marker.x, data.Marker.y, data.Marker.z);
				DB.Handle.query(`UPDATE players set Cash = ${player.data.cash}, Card = ${player.data.card} WHERE Nickname = ?`, [player.data.nickname], function(e, result) {
					if(e) console.log(e);
				});
				
				vehicleBought.setVariables({
					"indicatorsLeft": false,
					"indicatorsRight": false,
					"fuelLevel": fuelMaxLevel,
					"maxFuelLevel": fuelMaxLevel,
					"fuelType": 40,  // fuel type as car fuel type
					"vehWindows": false,
					"vehHood": false,
					"vehTrunk": false,
					"vehSignal": false,
					"vehDoors": true,
					"trunk": trunk,
					"engine": false,
					"keys": mp.joaat(hash + plate),
					"hash": hash,
					"name": name,
				});
				vehicleBought.engine = false;
				setTimeout(function(){
					if(hash === 'mlnovitec' || hash === 'ctsv16')
						vehicleBought.setExtra(11, true);
					else if(hash === 'brabus850')
					{
						vehicleBought.setExtra(1, true);
						vehicleBought.setExtra(2, true);
					} else if(hash === 'p1')
						vehicleBought.setExtra(1, true);
					else if(hash === 'bc'){
						vehicleBought.setExtra(1, true);
						vehicleBought.setExtra(2, false);
					}
					vehicleBought.locked = true;
				}, 200);
				vehicleBought.setColor(color, color);				
				let smth = JSON.parse(JSON.stringify(player.data.inventory));
				
				let semiProduct = JSON.parse(JSON.stringify(global.playerItems[68]));
				semiProduct.description = "Ключи от " + name;
				semiProduct.entity = vehicleBought.getVariable('keys');
				semiProduct.count = 1;
				mp.events.call('items:buyItemsInShop', player, JSON.stringify(semiProduct));
				player.freeCars = [vehicleBought];
				player.call('SendAlert', [`Вы успешно купили транспорт, метка к нему установлена!`, 'green']);
				player.call('TimeOutAlert', ['Учет', 'Поставьте машину на учет, для этого заедьте в Полицейский Департамент', '600']);
				player.call("UpdateMoneyClient", [player.data.cash, player.data.card, player.admin]);
				player.call("setWaypoint", [randomPos.x, randomPos.y])
			},200);
        } else { 
			player.call('SendAlert', ['У вас недостаточно средств', 'red']);
			player.call("exitVehicleShop");
		}
    }
});

mp.events.add("checkCarShop", (player, key) => {
	key = JSON.parse(key)[0];
	let type = key;
	data = Config.CarShop[type];
	vehClass = Config.CarShop[type].Class
	vehData = [];
	for(var i =0; i < vehClass.length; i++) {
		vehData[ i ] = Car_Shop[ vehClass[i] ];
	}
	player.dimension = Math.random() * 10000;
	player.position = new mp.Vector3(data.Position.x, data.Position.y, data.Position.z);
	player.call("showVehiclesShop", [JSON.stringify(vehData), JSON.stringify(data), type]);
});

var CarShopColshapes = [];
for(var key in Config.CarShop) {
    if(typeof Config.CarShop[key].Position == "undefined") continue;
    carshop = Config.CarShop[key];
    marker = mp.markers.new(20, new mp.Vector3(carshop.Marker.x, carshop.Marker.y, carshop.Marker.z - 0.3), 1.5, {
        rotation: new mp.Vector3(0, 180, 0),
		color: [273,60,100, 125],
        dimension: Config.defaultDimension
    });
    marker.carShop = true;
    marker.carShopType = key;
    blip = mp.blips.new(carshop.Blip, new mp.Vector3(carshop.Marker.x, carshop.Marker.y, carshop.Marker.z), {
        dimension: Config.defaultDimension,
        color: 4,
        name: carshop.Name,
		shortRange: true
    });
    mp.labels.new(carshop.Name, new mp.Vector3(carshop.Marker.x, carshop.Marker.y, carshop.Marker.z + 0.5), 
	{
		dismension: Config.defaultDimension,
		los: true,
		font: 0,
		drawDistance: 10,
	});
	CarShopColshapes.push(mp.colshapes.newSphere(carshop.Marker.x, carshop.Marker.y, carshop.Marker.z, 1.5, 0));
	CarShopColshapes[CarShopColshapes.length - 1].setVariables({'callBack': "checkCarShop", "params": [key], 'client': 0})
}
