
// CAR SHOP
var cars;
var carColor = 12;
var cam = null;
var type = null;
var carShopType, carShopData, carShopPos;
const graphics = mp.game.graphics;
const screenRes = graphics.getScreenResolution(0, 0);
var selectedCar = 0;
var player = mp.players.local 
var index = 1;
var price = 0;



function exitCarShop() {   
	mp.events.callRemote("exitVehicleShop", carShopType);
	global.player_dont_close_iteraction = false;
    carShopData = null;
    carShopType = null;
    carShopPos = null;
	player.vehicleShopping = false;
	player.vehicleShop.destroy();
	player.vehicleShop = false;
	mp.players.local.freezePosition(false);
	cam.setActive(false);
	mp.game.cam.renderScriptCams(false, true, 0, true, true);
	cam.destroy();
	mp.game.ui.displayRadar(true);
	global.chat.show = true;
	global.chat.browser.execute(`setState(${global.chat.show ? 'transparent': 'hidden'})`);
    cam = null; 
	player.setAlpha(255);
	global.VehShop.destroy();
	global.VehShop = undefined;
	global.hud.execute(`HUD.show=1`);
	global.hud.execute(`help.show=1`);
	global.hud.execute(`logotype.show=1`);
	setTimeout(function(){
		mp.gui.cursor.show(false, false);	
	}, 500);
}

mp.events.add('carColorFunction', (color) => {
	carColor = color;
	player.vehicleShop.setColours(color, color);
});

mp.events.add('buyVehicle', (active_car_indx, type) => {
	let hash;
	hash = cars[Object.keys(cars)[active_car_indx]].hash;
	price = cars[Object.keys(cars)[active_car_indx]].price;
	let fuelMaxLevel;
	fuelMaxLevel = cars[Object.keys(cars)[active_car_indx]].fuel;
	let trunk;
	trunk = cars[Object.keys(cars)[active_car_indx]].trunk;
	let name = cars[Object.keys(cars)[active_car_indx]].name;
	mp.events.callRemote("buyVehicleShop", hash, price, carColor, carShopType, fuelMaxLevel, trunk, name, type);
});


mp.events.add('TurnRight', (index) => {
	if(pos.Position.rz >= 360) pos.Position.rz = 0;
    if(pos.Position.rz < 360) pos.Position.rz += 1;
	player.vehicleShop.setHeading(pos.Position.rz);
	setTimeout(function(){
		player.vehicleShop.setNumberPlateTextIndex(0);
		player.vehicleShop.setDirtLevel(0);
		player.vehicleShop.setColours(carColor, carColor);
	}, 1);
});
mp.events.add('TurnLeft', (index) => {
    if(pos.Position.rz <= 0) pos.Position.rz = 180;
    if(pos.Position.rz > 0) pos.Position.rz -= 1;
	player.vehicleShop.setHeading(pos.Position.rz);
	setTimeout(function(){
		player.vehicleShop.setNumberPlateTextIndex(0);
		player.vehicleShop.setDirtLevel(0);
		player.vehicleShop.setColours(carColor, carColor);
	}, 1);
});

mp.events.add("showVehiclesShop", (car, carPos, type) => {
	if(global.PlayerPhone.browsIsOpen)
	{
		global.PlayerPhone.browsIsOpen = false;
		mp.gui.cursor.show(false, false);
		global.PlayerPhone.browser.execute('$(".mobile").css("bottom", "-100%")');
	}
	global.player_dont_close_iteraction = true;
	cars = JSON.parse(car);
	cars = cars[0];
	pos = JSON.parse(carPos);
	mp.players.local.freezePosition(true);
	carShopType = type;
	carShopData = cars;
	carShopPos = pos;
	mp.game.ui.displayRadar(false);
	mp.game.ui.displayHud(false);
	player.setAlpha(0);
	player.vehicleShopping = true;
	global.VehShop = mp.browsers.new('package://cef/car-shop/index.html');
	let test = JSON.stringify(cars)
	global.hud.execute(`HUD.show=0`);
	global.hud.execute(`help.show=0`);
	global.hud.execute(`logotype.show=0`);
	global.chat.show = false;
	global.chat.browser.execute(`setState(${global.chat.show ? 'transparent': 'hidden'})`);
	let hash;
	hash = cars[Object.keys(cars)[1]].hash;
	player.vehicleShop = mp.vehicles.new(mp.game.joaat(hash), new mp.Vector3(pos.Position.x, pos.Position.y, pos.Position.z - 0.5), {
		numberPlate: "SHOP",
		dimension: player.dimension,
		heading: pos.Position.rz,
		engine: false
	});
	if(hash === 'mlnovitec' || hash === 'ctsv16')
		player.vehicleShop.setExtra(11, 1);
	else if(hash === 'brabus850')
	{
		player.vehicleShop.setExtra(1, 1);
		player.vehicleShop.setExtra(2, 1);
	} else if(hash === 'p1')
		player.vehicleShop.setExtra(1, 1);
	else if(hash === 'bc'){
		player.vehicleShop.setExtra(1, 1);
		player.vehicleShop.setExtra(2, 0);
	}
	carColor = 12;
	setTimeout(function(){
		player.vehicleShop.setNumberPlateTextIndex(0);
		player.vehicleShop.setDirtLevel(0);
		player.vehicleShop.setColours(12, 12);
	}, 1);
	cam = mp.cameras.new("Camera", {x:-46.54155, y: -1100.97949, z: pos.Position.z + 1}, {x: -20, y: 0, z: -20}, 70);
	cam.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
	mp.gui.cursor.show(true, true);
});
const rpc = require('./modules/rage-rpc.min.js');

rpc.register('getCars', () => { 
    return cars;
});

mp.events.add({
    "setWaypoint": (x, y) => {
        mp.game.ui.setNewWaypoint(x, y);
    },
	"NewCar": (ind) => {
		index = ind;
		hash = cars[Object.keys(cars)[index]].hash;
		player.vehicleShop.model = mp.game.joaat(hash);		
		setTimeout(function(){
			if(hash === 'mlnovitec' || hash === 'ctsv16')
				player.vehicleShop.setExtra(11, 1);
			else if(hash === 'brabus850')
			{
				player.vehicleShop.setExtra(1, 1);
				player.vehicleShop.setExtra(2, 1);
			} else if(hash === 'p1')
				player.vehicleShop.setExtra(1, 1);
			else if(hash === 'bc'){
				player.vehicleShop.setExtra(1, 1);
				player.vehicleShop.setExtra(2, 0);
			}
			player.vehicleShop.setNumberPlateTextIndex(0);
			player.vehicleShop.setDirtLevel(0);
			player.vehicleShop.setColours(carColor, carColor);
		}, 100);
	},
    "exitVehicleShop": () => {
		exitCarShop();
    }
})