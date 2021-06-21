let tunning_bis = [
	{x: 731.4427490234375, y: -1088.8388671875, z: 22.16901397705078, category: 8, heading: -88.81949615478516, name: 1},
	{x: -339.6382751464844, y: -137.36573791503906, z: 39.009666442871094, category: 8, heading: -108.2885971069336, name: 2},
	{x: -1155.645751953125, y: -2005.5780029296875, z: 13.180253982543945, category: 8, heading: 138.74786376953125, name: 3},
	{x: 1175.1234130859375, y: 2640.027099609375, z: 37.75382614135742, category: 8, heading: -177.69097900390625, name: 4},
	{x: 110.62012481689453, y: 6626.2841796875, z: 31.787229537963867, category: 8, heading: 44.12389373779297, name: 5},
]

let tunningCost = {
	11: [50000, 250000, 500000, 1000000, 1500000], // Мотор
	12: [40000, 220000, 450000, 870000], // Тормоза
	13: [70000, 230000, 520000, 1000000], // Коробка передач
	15: [40000, 40000, 40000, 40000, 40000], // Подвеска
	16: [10000, 10000, 10000, 250000, 250000, 400000], // Броня
	17: [1000, 250000], // Турбо
	46: [1000, 20000, 45000, 75000] // Стекла
}

// Tuning
mp.events.add("mod", (player, mod, modvalue) => {
    player.vehicle.setMod(parseInt(mod), parseInt(modvalue));
});

mp.events.add("tunning:enterShop", (player, params) => {
    if(!player.freeCars) return player.call('SendAlert', ['Это не Ваша машина', 'red']);
	if(!player.freeCars.length) return player.call('SendAlert', ['Это не Ваша машина', 'red']);
	if(player.freeCars[0].id !== player.vehicle.id) return player.call('SendAlert', ['Это не Ваша машина', 'red']);
	
	let [name] = JSON.parse(params);
	let camPos = tunning_bis.filter(shop => shop.name === name);
	mp.events.call("anotherDimension", player, 'tunning-' + name);
	player.freeCars[0].dimension = player.dimension;
	player.freeCars[0].rotation = new mp.Vector3(0, 0, camPos.heading);
	player.putIntoVehicle(player.freeCars[0], 0);
	player.call('tunning:OpenBrowser', [name]);
});

mp.events.add("tunning:exitShop", (player) => {
    mp.events.call("gameDimension", player);
	player.freeCars[0].dimension = player.dimension;
	player.putIntoVehicle(player.freeCars[0], 0);
});


mp.events.add("tunning:BuyItem", (player, first, second) => {
    if(player.data.cash < tunningCost[first][second + 1]) return player.call('SendAlert', ['У вас нехватает среств', 'red']);
	player.freeCars[0].setMod(first, second);
	player.call('SendAlert', ['Вы успешно купили модификацию', 'green']);
	let mods = player.freeCars[0].getVariable('mods');
	if(mods === undefined)
		mods = {first: second};
	else{
		if(mods === null)
			mods = {}
		else
			mods = JSON.parse(mods);
		mods[first] = second;
	}
	player.freeCars[0].setVariable('mods', JSON.stringify(mods));
	mp.events.call('buyThingsInTheShop', player, tunningCost[first][second + 1], 0); // Выбор оплаты
	player.call('tunning:updateItem');
});