let richShop = [
	{x: -1447.4293212890625, y: -241.20675659179688, z: 49.81959915161133, heading: 170.78195190429688, name: "1"},
	{x: -705.4280395507812, y: -151.2162628173828, z: 37.415138244628906, heading: -109.90434265136719, name: "2"},
	{x: -167.70472717285156, y: -300.603271484375, z: 39.73328399658203, heading: 6.2342000007629395, name: "3"}
]
let bitchShop = [
	{x: -1188.0208740234375, y: -764.823486328125, z: 17.319734573364258, heading: 149.85752868652344, name: "1"},
	{x: -830.3433837890625, y: -1072.994140625, z: 11.328110694885254, heading: -133.8310546875, name: "No name"},
	{x: 123.26539611816406, y: -229.27537536621094, z: 54.55783462524414, heading: 8.256742477416992, name: "3"},
	{x: 429.95318603515625, y: -799.6163940429688, z: 29.49112319946289, heading: 125.24898529052734, name: "4"},
	{x: 70.77519226074219, y: -1399.4049072265625, z: 29.37614631652832, heading: -51.846527099609375, name: "5"},
	{x: 1697.691162109375, y: 4830.1474609375, z: 42.0633544921875, heading: 130.48582458496094, name: "6"},
	{x: -3173.37109375, y: 1038.289794921875, z: 20.863216400146484, heading: -1.134043574333191, name: "7"},
	{x: -1109.5, y: 2709.70947265625, z: 19.108179092407227, heading: -108.91885375976562, name: "8"},
	{x: 12.764312744140625, y: 6513.611328125, z: 31.877840042114258, heading: 88.88907623291016, name: "9"},
	{x: 1190.1148681640625, y: 2714.98583984375, z: 38.22283172607422, heading: -152.73866271972656, name: "10"},
	{x: 614.251708984375, y: 2768.988037109375, z: 42.088096618652344, heading: -151.74171447753906, name: "11"},
]

mp.events.add('clothesShop', (player, data) => {
	let [type, shop_id] = JSON.parse(data);
	mp.events.call("anotherDimension", player, "clothesShop" + String(shop_id));
	let items = {};
	for(let i in global.invObj[player.customCharacter.Gender]){
		items[i] = [];
		for(let j in global.invObj[player.customCharacter.Gender][i])
			if(type && global.invObj[player.customCharacter.Gender][i][j].price >= 170000)
				items[i].push(j);
			else if(!type && global.invObj[player.customCharacter.Gender][i][j].price < 170000)
				items[i].push(j);
	}
	let selectShop = [bitchShop, richShop];
	player.sspawn(new mp.Vector3(selectShop[type][shop_id].x, selectShop[type][shop_id].y, selectShop[type][shop_id].z))
	player.heading = selectShop[type][shop_id].heading;
	player.call('openClothingShop', [JSON.stringify(items), JSON.stringify(selectShop[type][shop_id]), (type ? 'Магазин премиальной одежды' : 'Магазин одежды')]);
});