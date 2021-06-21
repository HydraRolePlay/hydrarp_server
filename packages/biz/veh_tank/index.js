let timeNow = Date.now();

mp.events.add('calc_km', (player, veh_id, vehicle_data) => {
	vehicle_data = JSON.parse(vehicle_data);
	let distance = 0;
	let speed = vehicle_data.speedofcar;
	
	let trip = Math.floor(speed * ((Date.now() - timeNow) / 1000) * 100) / 100;
		
	distance += parseFloat(trip / 1000);
	timeNow = Date.now();
	let data = JSON.stringify({"playerID":player.id,"distance":distance,"vehicle":veh_id});
	mp.events.call('vehEditFuel', player, data);
});

mp.events.add('vehEditFuel', (player, args) => {
	args = JSON.parse(args);
	player = mp.players.at(args.playerID);
	var vehicle = mp.vehicles.at(args.vehicle);
	var Veh_data = args.distance;
	let type = vehicle.getVariable('fuelType');
	if(type === 120) type -= 30;
	let rest = (Veh_data*(200 / type));
	let tank = vehicle.getVariable('fuelLevel');
	let newtank = (tank - rest);
	if(newtank < 0){
		if(vehicle.engine){
			player.call('SendAlert', ["В машине закончилось топливо!", "red"]);
			player.call('autopilot:playerReachedWaypoint');
		}
		vehicle.engine = false;
		vehicle.setVariable('fuelLevel', 0);
		vehicle.setVariable('engine', false);
	}else
		vehicle.setVariable('fuelLevel', newtank);
});


const fs = require("fs");
const saveFile = "PLATES_data";
var PLATES_data = {};
fs.readFile(`./data/${saveFile}.json`, (err, data) => {
	if (err) {
		PLATES_data = {};
		savePLATEdata();
	} else {
		PLATES_data = JSON.parse(data);
	}
});

function randomPlate(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charactersLength = characters.length;
   for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function savePLATEdata(){
	fs.writeFile(`./data/${saveFile}.json`, JSON.stringify(PLATES_data, undefined, 4), (err) => {
        if (err) console.log(`Couldn't save PLATES_data. Reason: ${err.message}`);
    });
};

mp.events.add({
	'plateShopOpen': (player, data) => {
		if(player.countOfTryes === undefined)
			player.countOfTryes = 1;
		if(player.countOfTryes > 5) return player.call('SendAlert', ['Приходите позже', 'red']);
		if(!player.freeCars.length) return player.call('SendAlert', ['У вас нет активной машины', 'red']);
		let newPlate = randomPlate(8);
		while(Object.keys(PLATES_data).indexOf(newPlate) !== -1)
			newPlate = randomPlate(8);

		player.call('plate:open', [newPlate]);
	},
	'plate:random': (player) => {
		if(player.countOfTryes > 5){
			player.call('plate:closeBrowser');
			player.call('SendAlert', ['Приходите позже', 'red']);
			return;
		}
		player.countOfTryes += 1;
		let newPlate = randomPlate(8);
		while(Object.keys(PLATES_data).indexOf(newPlate) !== -1)
			newPlate = randomPlate(8);
		player.call('plate:anotherPlate', [newPlate]);
	},
	'plate:check': (player, plate, cost) => {
		if(Object.keys(PLATES_data).indexOf(plate) !== -1) return player.call('SendAlert', ['Такой номер занят', 'red']);
		if(!player.freeCars.length) return player.call('SendAlert', ['У вас нет активной машины', 'red']);
		PLATES_data[plate] = player.data.realSQLID;
		savePLATEdata();
		player.freeCars[0].numberPlate = plate;
		player.call('SendAlert', ['Вы успешно купили номерной знак ' + plate, 'green']);
		mp.events.call('buyThingsInTheShop', player, parseInt(cost), 0); // Выбор оплаты			
	},
});