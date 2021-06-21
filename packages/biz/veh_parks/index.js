mp.events.add({
	'impoundLot:open': (player, data) => {
		if(player.freeCars.length) return player.call('SendAlert', ['У вас может быть только 1 активная машина', 'red']);
		let needCars = global.PARKING_data['impound-lot'].filter(veh => veh.id === player.data.realSQLID);
		let vehNamesAndCost = [];
		for(let i=0; i<needCars.length; i++){
			let LastParkingDate = new Date(needCars[i].date);
			let today = new Date();
			let difference = ((today - LastParkingDate) / 1000 / 60 / 60 / 24).toFixed() + 1;
			difference = difference*4000;
			vehNamesAndCost.push([needCars[i].name, difference]);
		}
		player.call('impoundLot:open', [JSON.stringify(vehNamesAndCost)]);
	},
	'spawnPlayerImpoundLotVeh': (player, index) => {
		try{
			player.ImpoundLotVeh.destroy();
		}catch(e){}
		let needCars = global.PARKING_data['impound-lot'].filter(veh => veh.id === player.data.realSQLID);
		let vehPos = {x: 396.1302795410156, y: -1644.63623046875, z: 29.291948318481445, heading: -39.31022262573242};
		player.ImpoundLotVeh = mp.vehicles.new(mp.joaat(needCars[index].hash), new mp.Vector3(vehPos.x, vehPos.y, vehPos.z), {
			dimension: player.dimension,
			heading: vehPos.heading,
			engine: false
		});	
		player.ImpoundLotVeh.owner = player.name;			
		player.ImpoundLotVeh.setVariables({
			"indicatorsLeft": false,
			"indicatorsRight": false,
			"fuelLevel": needCars[index].fuelLevel,
			"maxFuelLevel": needCars[index].maxFuelLevel,
			"fuelType": needCars[index].fuelType,
			"vehWindows": false,
			"vehHood": false,
			"vehTrunk": false,
			"vehSignal": false,
			"vehDoors": true,
			"trunk": needCars[index].trunk,
			"engine": false,
			"keys": needCars[index].keys,
			"hash": needCars[index].hash,
			"name": needCars[index].name,
			"mods": needCars[index].mods
		});
		setMods(player.ImpoundLotVeh, needCars[index].mods);
		player.ImpoundLotVeh.engine = false;
		player.ImpoundLotVeh.locked = true;
		player.ImpoundLotVeh.setColor(needCars[index].colors[0], needCars[index].colors[1]);
		if(needCars[index].hash === 'mlnovitec' || needCars[index].hash === 'ctsv16')
			player.ImpoundLotVeh.setExtra(11, true);
		else if(needCars[index].hash === 'brabus850')
		{
			player.ImpoundLotVeh.setExtra(1, true);
			player.ImpoundLotVeh.setExtra(2, true);
		} else if(needCars[index].hash === 'p1')
			player.ImpoundLotVeh.setExtra(1, true);
		else if(needCars[index].hash === 'bc'){
			player.ImpoundLotVeh.setExtra(1, true);
			player.ImpoundLotVeh.setExtra(2, false);
		}
		if(needCars[index].plate)
			player.ImpoundLotVeh.numberPlate = needCars[index].plate;
	},
	'payPlayerImpoundLotVeh': (player, index) => {
		player.ImpoundLotVeh.destroy();
		let needCars = global.PARKING_data['impound-lot'].filter(veh => veh.id === player.data.realSQLID);
		let vehPos = {x: 396.1302795410156, y: -1644.63623046875, z: 29.291948318481445, heading: -39.31022262573242};
		let veh = mp.vehicles.new(mp.joaat(needCars[index].hash), new mp.Vector3(vehPos.x, vehPos.y, vehPos.z), {
			dimension: 0,
			heading: vehPos.heading,
			engine: false
		});	
		setTimeout(function(){
			veh.owner = player.name;			
			veh.setVariables({
				"indicatorsLeft": false,
				"indicatorsRight": false,
				"fuelLevel": parseInt(needCars[index].fuelLevel),
				"maxFuelLevel": parseInt(needCars[index].maxFuelLevel),
				"fuelType": parseInt(needCars[index].fuelType),
				"vehWindows": false,
				"vehHood": false,
				"vehTrunk": false,
				"vehSignal": false,
				"vehDoors": true,
				"trunk": needCars[index].trunk,
				"engine": false,
				"keys": needCars[index].keys,
				"hash": needCars[index].hash,
				"name": needCars[index].name,
				"mods": needCars[index].mods
			});
			setMods(veh, needCars[index].mods);
			veh.engine = false;
			veh.locked = true;
			veh.setColor(needCars[index].colors[0], needCars[index].colors[1]);
			if(needCars[index].hash === 'mlnovitec' || needCars[index].hash === 'ctsv16')
				veh.setExtra(11, true);
			else if(needCars[index].hash === 'brabus850')
			{
				veh.setExtra(1, true);
				veh.setExtra(2, true);
			} else if(needCars[index].hash === 'p1')
				veh.setExtra(1, true);
			else if(needCars[index].hash === 'bc'){
				veh.setExtra(1, true);
				veh.setExtra(2, false);
			}
			savePARKdata();
			if(needCars[index].plate)
				veh.numberPlate = needCars[index].plate;
		}, 2000);
		player.freeCars = [veh];
		let LastParkingDate = new Date(needCars[index].date);
		let today = new Date();
		let difference = ((today - LastParkingDate) / 1000 / 60 / 60 / 24).toFixed() + 1;
		difference = difference*4000;
		global.PARKING_data['impound-lot'] = JSON.parse(JSON.stringify(global.PARKING_data['impound-lot'].filter(veh => veh.keys !== needCars[index].keys)));
		savePARKdata();
		player.call('impoundLot:closeBrowser');
		player.call('SendAlert', ['Вы успешно оплатили штрафстоянку', 'green']);
		mp.events.call('buyThingsInTheShop', player, parseInt(difference), 0); // Выбор оплаты
	},
	'impoundLot:destroyVeh': (player) => {
		try{
			player.ImpoundLotVeh.destroy();
		}catch(e){}
	},
});

setInterval(function(){_anotherIntervalFunction();},1800000);

function _anotherIntervalFunction() {
	let j = 0;
	while (j < global.PARKING_data['player-veh'].length){
		let today = new Date();
		let difference = ((today - new Date(global.PARKING_data['player-veh'][j].date)) / 1000 / 60 / 60).toFixed()
		if(difference >= 1){
			let flag = false;
			for(let name in global.PARKING_data){
				if(name === 'impound-lot') continue;
				if(name === 'player-veh') continue;
				for(let i=0; i<global.PARKING_data[name].length; i++){
					if(global.PARKING_data[name][i] && global.PARKING_data[name][i].id === global.PARKING_data['player-veh'][j].id && !global.PARKING_data[name][i].hash){
						global.PARKING_data[name][i].name = global.PARKING_data['player-veh'][j].name;
						global.PARKING_data[name][i].hash = global.PARKING_data['player-veh'][j].hash;
						global.PARKING_data[name][i].colors = global.PARKING_data['player-veh'][j].colors;
						global.PARKING_data[name][i].trunk = global.PARKING_data['player-veh'][j].trunk;
						global.PARKING_data[name][i].keys = global.PARKING_data['player-veh'][j].keys;
						global.PARKING_data[name][i].fuelLevel = global.PARKING_data['player-veh'][j].fuelLevel;
						global.PARKING_data[name][i].maxFuelLevel = global.PARKING_data['player-veh'][j].maxFuelLevel;
						global.PARKING_data[name][i].fuelType = global.PARKING_data['player-veh'][j].fuelType;
						global.PARKING_data[name][i].plate = global.PARKING_data['player-veh'][j].plate;
						global.PARKING_data[name][i].id = global.PARKING_data['player-veh'][j].id;
						global.PARKING_data[name][i].mods = global.PARKING_data['player-veh'][j].mods;
						global.PARKING_data['player-veh'].splice(j, 1);
						flag = true;
						j--;
						savePARKdata();
						//player alerts
						return;
					}
				}
			}
			if(flag) continue;
			let date = new Date();
			let veh_data = {
				id: global.PARKING_data['player-veh'][j].id,
				name: global.PARKING_data['player-veh'][j].name,
				hash: global.PARKING_data['player-veh'][j].hash,
				colors: global.PARKING_data['player-veh'][j].colors,
				trunk: global.PARKING_data['player-veh'][j].trunk,
				keys: global.PARKING_data['player-veh'][j].keys,
				fuelLevel: global.PARKING_data['player-veh'][j].fuelLevel,
				maxFuelLevel: global.PARKING_data['player-veh'][j].maxFuelLevel,
				fuelType: global.PARKING_data['player-veh'][j].fuelType,
				plate: global.PARKING_data['player-veh'][j].plate,
				date: date,
				mods: global.PARKING_data['player-veh'][j].mods
			}
			global.PARKING_data['impound-lot'].push(veh_data);	
			global.PARKING_data['player-veh'].splice(j, 1);
			savePARKdata();
			j--;
		}
		j++;
	}
};

// data
setInterval(function(){_intervalFunction();},3600000);

function _intervalFunction() {
	for(let i in global.colshapePark)
		for(let j=0; j<global.colshapePark[i].length; j++){
			let today = new Date();
			if(global.PARKING_data[i][j] && (today - new Date(global.PARKING_data[i][j].date)) > 0){
				if(global.PARKING_data[i][j].name){
					global.PARKING_data['impound-lot'].push(JSON.parse(JSON.stringify(global.PARKING_data[i][j])));
					global.PARKING_data[i][j] = false;
					//Алерт
				} else {
					global.PARKING_data[i][j] = false;
					//Алерт
				}
			}
		}
};

const fs = require("fs");
const saveFile = "PARKING_data";
fs.readFile(`./data/${saveFile}.json`, (err, data) => {
	if (err) {
		global.PARKING_data = {};
		for(let i in global.colshapePark){
			global.PARKING_data[i] = [];
			for(let j=0; j<global.colshapePark[i].length; j++)
				global.PARKING_data[i].push(false);
		}
		global.PARKING_data['impound-lot'] = [];
		global.PARKING_data['player-veh'] = [];
		savePARKdata();
	} else {
		global.PARKING_data = JSON.parse(data);
	}
});

function savePARKdata(){
	fs.writeFile(`./data/${saveFile}.json`, JSON.stringify(global.PARKING_data, undefined, 4), (err) => {
        if (err) console.log(`Couldn't save PARK_data. Reason: ${err.message}`);
    });
};

function findCars (player, parkNum){
	let playerParkVeh = [];
	for(let name in global.PARKING_data){
		for(let i=0; i<global.PARKING_data[name].length; i++){
			if(global.PARKING_data[name][i] && global.PARKING_data[name][i].id === player.data.realSQLID){
				let LastParkingDate = new Date(global.PARKING_data[name][i].date);
				let today = new Date();
				let difference = ((LastParkingDate - today) / 1000 / 60 / 60 / 24).toFixed();
				if(String(parkNum) === String(name))
					playerParkVeh.push({'name': global.PARKING_data[name][i].name, hash: global.PARKING_data[name][i].hash, pay: difference, place_id: i, plate: global.PARKING_data[name][i].plate});
			}
		}
	}
	return playerParkVeh;
}

function setMods(veh, mods){
	if(mods !== undefined){
		mods = JSON.parse(mods);
		for(let i in mods)
			veh.setMod(parseInt(i), parseInt(mods[i]));
	}
}

mp.events.add({
	'parking:open': (player, params) =>
	{
		let parkNum = JSON.parse(params)[0];
		var playerParkVeh = findCars(player, parkNum);
		if(player.freeCars.length){
			player.freeCars[0].name = player.freeCars[0].getVariable('name');
			player.freeCars[0].hash = player.freeCars[0].getVariable('hash');
			player.freeCars[0].plate = player.freeCars[0].numberPlate;
		}
		player.call('parking:open', [JSON.stringify(playerParkVeh), JSON.stringify(player.freeCars), parkNum]);		
	},
	'parking:free-park-places': (player, parkNumber) =>
	{
		var places = [];
		for(let i=0; i<global.PARKING_data[parkNumber].length; i++){
			
			if(!global.PARKING_data[parkNumber][i]){
				places.push(i);
			}
		}
		if(!places.length) return player.call('SendAlert', ['Нет свободных мест', 'red']);
		player.call('parking:set-park-places', [JSON.stringify(places)]);
	},	
	'parking:checkPlace': (player, parkNumber, place, countOfDays) =>
	{
		countOfDays = parseInt(countOfDays);
		if(!global.PARKING_data[parkNumber][place]){
			let lastParkingDate = new Date();
			lastParkingDate.setDate(lastParkingDate.getDate() + countOfDays);
			let smth = JSON.parse(JSON.stringify(global.PARKING_data));
			smth[parkNumber][place] = {id: player.data.realSQLID, date: String(lastParkingDate), name: false, hash: false, plate: false};
			global.PARKING_data = JSON.parse(JSON.stringify(smth));
			savePARKdata();
			var playerParkVeh = findCars(player, parkNumber);
			if(player.freeCars.length){
				player.freeCars[0].name = player.freeCars[0].getVariable('name');
				player.freeCars[0].hash = player.freeCars[0].getVariable('hash');
				player.freeCars[0].plate = player.freeCars[0].numberPlate;
			}
 			player.call('parking:updateVehicles', [JSON.stringify(playerParkVeh), JSON.stringify(player.freeCars)]);
			player.call('SendAlert', ['Вы успешно купили парковочное место', 'green']);
			mp.events.call('buyThingsInTheShop', player, parseInt(countOfDays*2000), 0); // Выбор оплаты
		} else {
			if(global.PARKING_data[parkNumber][place].id === player.data.realSQLID){
				let smth = JSON.parse(JSON.stringify(global.PARKING_data));
				let lastParkingDate = new Date(smth[parkNumber][place].date);
				lastParkingDate.setDate(lastParkingDate.getDate() + countOfDays);
				smth[parkNumber][place].date = String(lastParkingDate);
				global.PARKING_data = JSON.parse(JSON.stringify(smth));
				savePARKdata();
				var playerParkVeh = findCars(player, parkNumber);
				if(player.freeCars.length){
					player.freeCars[0].name = player.freeCars[0].getVariable('name');
					player.freeCars[0].hash = player.freeCars[0].getVariable('hash');
					player.freeCars[0].plate = player.freeCars[0].numberPlate;
				}
				player.call('parking:updateVehicles', [JSON.stringify(playerParkVeh), JSON.stringify(player.freeCars)]);
				player.call('SendAlert', ['Вы успешно оплатили парковочное место', 'green']);
				mp.events.call('buyThingsInTheShop', player, parseInt(countOfDays*2000), 0); // Выбор оплаты
			} else {
				player.call('SendAlert', ['Возникла ошибка', 'red']);
			}
		}
	},
	'parking:updateCars': (player, parkingCars, parkNumber) =>
	{		
		parkingCars = JSON.parse(parkingCars);
		for(let i=0; i<parkingCars.length; i++){
			if(global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)] && global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].hash === parkingCars[i].hash) {}//do smth mb??
			else{
				if(player.freeCars.length){
					if(player.dist(player.freeCars[0].position) > 50) return player.call('SendAlert', ['Вы находитесь слишком далеко от машины', 'red']);
					let date = global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].date;
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)] = JSON.parse(JSON.stringify(parkingCars[i]));
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].date = date;
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].pay = undefined;
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].place_id = undefined;
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].colors = [player.freeCars[0].getColor(0), player.freeCars[0].getColor(1)];
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].trunk = player.freeCars[0].getVariable("trunk");
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].keys = player.freeCars[0].getVariable("keys");
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].fuelLevel = player.freeCars[0].getVariable("fuelLevel");
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].maxFuelLevel = player.freeCars[0].getVariable("maxFuelLevel");
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].fuelType = player.freeCars[0].getVariable("fuelType");
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].id = player.data.realSQLID;
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].mods = player.freeCars[0].getVariable("mods");
					savePARKdata();
					//MODS WILL BE AVAILABLE next time ...
					//global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].mods = {}
					//Idnt know what to do with this sheet
					let trackObj = player.freeCars[0].getVariable('trackObj');
					if(trackObj !== null){
						trackObj = JSON.parse(trackObj);
						mp.events.call('soundState', player, 'destroySound', parseInt(trackObj.id));
					}
					// Удаленние музыки
					player.freeCars[0].destroy();
					player.freeCars = [];
					var playerParkVeh = findCars(player, parkNumber);
					player.call('parking:updateVehicles', [JSON.stringify(playerParkVeh), JSON.stringify(player.freeCars)]);
				} else {
					let vehData = JSON.parse(JSON.stringify(global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)]));
					let pos = JSON.parse(JSON.stringify(global.colshapePark[parkNumber][parseInt(parkingCars[i].place_id)]));
					let vehicleSpawn;
					vehicleSpawn = mp.vehicles.new(mp.joaat(vehData.hash), new mp.Vector3(pos.x, pos.y, pos.z), {
						dimension: 0,
						heading: pos.heading,
						engine: false
					});	
					vehicleSpawn.owner = player.name;			
					vehicleSpawn.setVariables({
						"indicatorsLeft": false,
						"indicatorsRight": false,
						"fuelLevel": vehData.fuelLevel,
						"maxFuelLevel": vehData.maxFuelLevel,
						"fuelType": vehData.fuelType,
						"vehWindows": false,
						"vehHood": false,
						"vehTrunk": false,
						"vehSignal": false,
						"vehDoors": true,
						"trunk": vehData.trunk,
						"engine": false,
						"keys": vehData.keys,
						"hash": vehData.hash,
						"name": vehData.name,
						"mods": vehData.mods,
					});
					setMods(vehicleSpawn, vehData.mods);
					vehicleSpawn.engine = false;
					vehicleSpawn.locked = true;
					vehicleSpawn.setColor(vehData.colors[0], vehData.colors[1]);
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)] = JSON.parse(JSON.stringify(parkingCars[i]));
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].date = vehData.date;
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].pay = undefined;
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].place_id = undefined;
					global.PARKING_data[parkNumber][parseInt(parkingCars[i].place_id)].id = player.data.realSQLID;
					savePARKdata();
					
					var playerParkVeh = findCars(player, parkNumber);
					let hash = vehData.hash;
					if(hash === 'mlnovitec' || hash === 'ctsv16')
						vehicleSpawn.setExtra(11, true);
					else if(hash === 'brabus850')
					{
						vehicleSpawn.setExtra(1, true);
						vehicleSpawn.setExtra(2, true);
					} else if(hash === 'p1')
						vehicleSpawn.setExtra(1, true);
					else if(hash === 'bc'){
						vehicleSpawn.setExtra(1, true);
						vehicleSpawn.setExtra(2, false);
					}
					if(vehData.plate)
						vehicleSpawn.numberPlate = vehData.plate;
					player.freeCars = [vehicleSpawn];
					if(player.freeCars.length){
						player.freeCars[0].name = player.freeCars[0].getVariable('name');
						player.freeCars[0].hash = player.freeCars[0].getVariable('hash');
						player.freeCars[0].plate = vehData.plate;
					}
					player.call('parking:updateVehicles', [JSON.stringify(playerParkVeh), JSON.stringify(player.freeCars)]);
					// mods also !
				}
			}
		}
	},
	"playerQuit": (player, exitType, reason) =>
	{
		if(player.freeCars === undefined || !player.freeCars.length) return;
		mp.events.call('saveParksData', player);
	},
	"spawnPlayerVeh": (player) =>
	{
		let veh = global.PARKING_data['player-veh'].filter(veh => veh.id === player.data.realSQLID)
		if(veh.length){
			let vehicleSpawn;
			vehicleSpawn = mp.vehicles.new(mp.joaat(veh[0].hash), new mp.Vector3(veh[0].pos.x, veh[0].pos.y, veh[0].pos.z), {
				dimension: 0,
				heading: veh[0].pos.heading,
				engine: false
			});	
			vehicleSpawn.owner = player.name;			
			vehicleSpawn.setVariables({
				"indicatorsLeft": false,
				"indicatorsRight": false,
				"fuelLevel": veh[0].fuelLevel,
				"maxFuelLevel": veh[0].maxFuelLevel,
				"fuelType": veh[0].fuelType,
				"vehWindows": false,
				"vehHood": false,
				"vehTrunk": false,
				"vehSignal": false,
				"vehDoors": true,
				"trunk": veh[0].trunk,
				"engine": false,
				"keys": veh[0].keys,
				"hash": veh[0].hash,
				"name": veh[0].name,
				"mods": veh[0].mods,
			});
			setMods(vehicleSpawn, veh[0].mods);
			vehicleSpawn.engine = false;
			vehicleSpawn.locked = true;
			vehicleSpawn.setColor(veh[0].colors[0], veh[0].colors[1]);
			let hash = veh[0].hash;
			if(hash === 'mlnovitec' || hash === 'ctsv16')
				vehicleSpawn.setExtra(11, true);
			else if(hash === 'brabus850')
			{
				vehicleSpawn.setExtra(1, true);
				vehicleSpawn.setExtra(2, true);
			} else if(hash === 'p1')
				vehicleSpawn.setExtra(1, true);
			else if(hash === 'bc'){
				vehicleSpawn.setExtra(1, true);
				vehicleSpawn.setExtra(2, false);
			}
			if(veh[0].plate)
				vehicleSpawn.numberPlate = veh[0].plate;
			player.freeCars = [vehicleSpawn];
		}
		global.PARKING_data['player-veh'] = global.PARKING_data['player-veh'].filter(veh => veh.id !== player.data.realSQLID);
		savePARKdata();
	},
	"saveParksData": (player) => 
	{
		let date = new Date();
		let veh_data = {
			id: player.data.realSQLID,
			name: player.freeCars[0].getVariable("name"),
			hash: player.freeCars[0].getVariable("hash"),
			colors: [player.freeCars[0].getColor(0), player.freeCars[0].getColor(1)],
			trunk: player.freeCars[0].getVariable("trunk"),
			keys: player.freeCars[0].getVariable("keys"),
			fuelLevel: player.freeCars[0].getVariable("fuelLevel"),
			maxFuelLevel: player.freeCars[0].getVariable("maxFuelLevel"),
			fuelType: player.freeCars[0].getVariable("fuelType"),
			plate: player.freeCars[0].numberPlate,
			date: date,
			mods: player.freeCars[0].getVariable('mods'),
			pos: {x: player.freeCars[0].position.x, y: player.freeCars[0].position.y, z: player.freeCars[0].position.z, heading: player.freeCars[0].heading}
		}
		let trackObj = player.freeCars[0].getVariable('trackObj');
		if(trackObj !== null){
			trackObj = JSON.parse(trackObj);
			mp.events.call('soundState', player, 'destroySound', parseInt(trackObj.id));
		}
		player.freeCars[0].destroy();
		global.PARKING_data['player-veh'].push(veh_data);
		savePARKdata();
	},
});