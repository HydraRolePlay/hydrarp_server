global.playerItems = require('../../configs/items.json');
var allObj = [];
var all_items_data = [];
var player_weapons = {
	5:  ['weapon_snspistol_mk2', 99, 6],
	7:  ['weapon_stungun', 0, 0],
	24: ['weapon_smg_mk2', 99, 30],
	26: ['weapon_nightstick', 0, 0],
	9:  ['weapon_appistol', 99, 18],
	12: ['weapon_heavypistol', 99, 18],
	8:  ['weapon_vintagepistol', 99, 7],
	17: ['weapon_microsmg', 99, 16],
	19: ['weapon_smg', 99, 16],
	23: ['weapon_assaultsmg', 99, 30],
	43: ['weapon_sawnoffshotgun', 100, 8],
	41: ['weapon_pumpshotgun', 100, 8],
	45: ['weapon_assaultshotgun', 100, 8],
	62: ['weapon_assaultrifle', 102, 30],
	67: ['weapon_carbinerifle', 102, 30],
	60: ['weapon_specialcarbine', 102, 30]
}

mp.events.add({
	"updatePlayerHealth": (player, variable, value) => {
		player.setVariable(variable, value);
		// hp не уменьшается до 0 тк возвращает обратно постоянно!
		if(variable === 'satiety' && value <= 0)
			player.health -= 30;
		else if(variable === 'water' && value <= 0)
			player.health -= 20;
		player.customCharacter.health = player.health;
	},
	"getPlayerMoney": (player, paymentMethod, cost) => 
	{
		let cardAndCash = [player.data.cash, player.data.card];
		if(parseInt(cardAndCash[paymentMethod]) >= parseInt(cost))
			player.call("getPlayerMoneyInShop", [true, paymentMethod]);
		else
			player.call("getPlayerMoneyInShop", [false, paymentMethod]);
	},
	"getPlayerMoneyFuel": (player, paymentMethod, litters, cost, fuelType) => 
	{
		let cardAndCash = [player.data.cash, player.data.card];
		if(parseInt(cardAndCash[paymentMethod]) >= parseInt(cost))
			player.call("BuyFuel", [true, paymentMethod, litters, cost, fuelType]);
		else
			player.call("BuyFuel", [false, paymentMethod, litters, cost, fuelType]);
	},
	"checkMoneyInClothesShop": (player, cost) => 
	{
		let paymentMethod = 0; // fix it)
		let cardAndCash = [player.data.cash, player.data.card];
		if(parseInt(cardAndCash[paymentMethod]) >= parseInt(cost))
			player.call("coolBuyClothes", [true]);
		else
			player.call("coolBuyClothes", [false]);
	},
	"setCarVariable": (player, entity, variables) =>
	{
		variables = JSON.parse(variables);
		Object.entries(variables).forEach(([key, value]) => {
			if(key === 'engine')mp.vehicles.at(entity).engine = value;
			if(key === 'vehDoors') mp.vehicles.at(entity).locked = value;
			mp.vehicles.at(entity).setVariable(key, value);
		});
	},
	'items:veh': (player, veh, action) =>
	{
		let keys = false;
		let car_keys = mp.vehicles.at(veh).getVariable('keys');
		for(box in player.data.inventory)
			if(box !== 'information' && !keys)
				for(let each=0; each<player.data.inventory[box].length; each++)
					if(player.data.inventory[box][each].entity === car_keys)
						keys = true;
		if(!keys)
			return player.call('SendAlert', ['У вас нет ключей!', 'red']);
		player.call(action, [veh]);		
	},
	'carsharing:deleteKeys': (player, car_id) => {
		let veh = mp.vehicles.at(car_id);
		let smth = JSON.parse(JSON.stringify(player.data.inventory));	
		for(let box in smth)
			if(box !== 'information')
				for(let each=0; each<smth[box].length; each++)
					if(smth[box][each].entity === veh.getVariable('keys')){
						smth[box][each] = {}
						player.call("updateInventory", [box, each, 0, 0, 0]);
					}
		player.data.inventory = JSON.parse(JSON.stringify(smth));
		player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
	},
	'items:buyItemsInShop': (player, itemData) => {
		let smth = JSON.parse(itemData);
		let semi_inventory = JSON.parse(JSON.stringify(player.data.inventory));
		let semiProduct = Object.assign({}, smth);
		if(checkWeight(player.data.inventory, parseInt(smth.count) * parseInt(smth.weight))){
			for(let i=0; i < semi_inventory['inventory-box'].length; i++){
				if(!Object.keys(semi_inventory['inventory-box'][i]).length || smth.id !== semi_inventory['inventory-box'][i].id || smth.description !== semi_inventory['inventory-box'][i].description || semi_inventory['inventory-box'][i].count === semi_inventory['inventory-box'][i].maxCount) continue;
				if(!semiProduct.count) break;
				if((smth.count + semi_inventory['inventory-box'][i].count) <= semi_inventory['inventory-box'][i].maxCount) 
				{
					semi_inventory['inventory-box'][i].count += smth.count;
					player.call("updateInventory", ['inventory-box', i, semiProduct.id, semiProduct.description, semi_inventory['inventory-box'][i].putOff, semi_inventory['inventory-box'][i].count, semi_inventory['inventory-box'][i].weight, semi_inventory['inventory-box'][i].gender]);
					semiProduct.count = 0;
					break;
				} else {
					semiProduct.count -= (semi_inventory['inventory-box'][i].maxCount - semi_inventory['inventory-box'][i].count);
					semi_inventory['inventory-box'][i].count = semi_inventory['inventory-box'][i].maxCount;
					player.call("updateInventory", ['inventory-box', i, semiProduct.id, semiProduct.description, semi_inventory['inventory-box'][i].putOff, semi_inventory['inventory-box'][i].maxCount, semi_inventory['inventory-box'][i].weight, semi_inventory['inventory-box'][i].gender]);
				}
			}
			if(semiProduct.count)
				for(let i=0; i < player.data.inventory['inventory-box'].length; i++){
					if(Object.keys(player.data.inventory['inventory-box'][i]).length) continue;
					if(semiProduct.count > semiProduct.maxCount){
						semiProduct.count -= semiProduct.maxCount;
						let product = Object.assign({}, semiProduct);
						product.count = product.maxCount;
						semi_inventory['inventory-box'][i] = Object.assign({}, product);
						player.call("updateInventory", ['inventory-box', i, semiProduct.id, semiProduct.description, semi_inventory['inventory-box'][i].putOff, semi_inventory['inventory-box'][i].count, semi_inventory['inventory-box'][i].weight, semi_inventory['inventory-box'][i].gender]);
					} else {
						if(semiProduct.count) {
							semi_inventory['inventory-box'][i] = Object.assign({}, semiProduct);
							player.call("updateInventory", ['inventory-box', i, semiProduct.id, semiProduct.description, semi_inventory['inventory-box'][i].putOff, semi_inventory['inventory-box'][i].count, semi_inventory['inventory-box'][i].weight, semi_inventory['inventory-box'][i].gender]);
							semiProduct.count = 0;
							break;
						}
					}
				}
		}
		if(semiProduct.count){
			let position = player.position,
				newItem;
			position.z -= 0.98;
			while(semiProduct.count > semiProduct.maxCount){
				newItem = mp.objects.new(mp.joaat(semiProduct.model), position,
				{
					rotation: semiProduct.rotation,
					alpha: 250,
					dimension: 0
				});
				newItem.setVariables({
					"owner": player.data.realSQLID,
					"weight": semiProduct.weight,
					"id": semiProduct.id,
					"description": semiProduct.description,
					"count": semiProduct.maxCount,
					"clothes": semiProduct.clothes,
					"propIndex": semiProduct.propIndex,
					"gender": semiProduct.gender,
					"propIndexToros": semiProduct.propIndexToros,
					"propIndexBody": semiProduct.propIndexBody,
					"color": semiProduct.color,
					"entity": semiProduct.entity,
					"currentAmmo": semiProduct.currentAmmo
				});
				newItem.setVariable("itemId", allObj.length);
				all_items_data.push(newItem.id);
				allObj.push(setTimeout(() => {
					try{
						newItem.destroy();
					}catch(e){}
				}, 300000));
				semiProduct.count -= semiProduct.maxCount;
			}
			if(semiProduct.count > 0){
				newItem = mp.objects.new(mp.joaat(semiProduct.model), position,
				{
					rotation: semiProduct.rotation,
					alpha: 250,
					dimension: 0
				});
				newItem.setVariables({
					"owner": player.data.realSQLID,
					"weight": semiProduct.weight,
					"id": semiProduct.id,
					"description": semiProduct.description,
					"count": semiProduct.count,
					"clothes": semiProduct.clothes,
					"propIndex": semiProduct.propIndex,
					"gender": semiProduct.gender,
					"propIndexToros": semiProduct.propIndexToros,
					"propIndexBody": semiProduct.propIndexBody,
					"color": semiProduct.color,
					"entity": semiProduct.entity,
					"currentAmmo": semiProduct.currentAmmo
				});
				newItem.setVariable("itemId", allObj.length);
				all_items_data.push(newItem.id);
				allObj.push(setTimeout(() => {
					try{
						newItem.destroy();
					}catch(e){}
				}, 300000));
			}
			player.call('SendAlert', ['У вас нехватает места в инвентаре', 'red']);
		} 
		player.data.inventory = JSON.parse(JSON.stringify(semi_inventory));
		player.customCharacter.Inventory = JSON.parse(JSON.stringify(player.data.inventory));
	},
});

function checkGround(player, placeId){
	let answer = -1;
	for(let smth of all_items_data){
		let obj = mp.objects.at(smth);
		try{
			if(obj.getVariable('itemId').toString() === placeId.toString() && answer === -1){
				answer = obj.id;
			}
		} catch(e) {}
	}
	return answer;
}

function updateServerInv(player){
	for(let box in player.data.inventory){
		for(let j=0; j<player.data.inventory[box].length; j++){
			if(JSON.stringify(player.data.inventory[box][j]).length === 2) continue;
			player.call('updateInventory', [box, j, player.data.inventory[box][j].id, player.data.inventory[box][j].description, 0, player.data.inventory[box][j].count, player.data.inventory[box][j].weight, player.data.inventory[box][j].gender]);
		}
	}
	
}

function updateServerSlots(player, first_cont, second_cont){
	setTimeout(()=>{
		let [box, j] = first_cont;
		player.call('updateInventory', [box, j, player.data.inventory[box][j].id, player.data.inventory[box][j].description, 0, player.data.inventory[box][j].count, player.data.inventory[box][j].weight, player.data.inventory[box][j].gender]);
		[box, j] = second_cont;
		player.call('updateInventory', [box, j, player.data.inventory[box][j].id, player.data.inventory[box][j].description, 0, player.data.inventory[box][j].count, player.data.inventory[box][j].weight, player.data.inventory[box][j].gender]);
		player.applyCharacter();
	}, 100);
}

function checkWeight(inv, extra_weight=0){
	let weight = 0;
	for (let box in inv)
        if (box !== 'information')
            for (let j in inv[box])
                if (Object.keys(inv[box][j]).length)
                    weight += inv[box][j].weight * (inv[box][j].hasOwnProperty('count') ? inv[box][j].count : 1)
	if(weight > 30)
		return false;
	if((weight + extra_weight) > 30)
		return false;
	return true;
}

/*
	Inventory
	
	
1) При перемещении большего вне инвентаря -> ошибка
*/
mp.events.add({
	"setVariablesObj": (player, myObj, newCount) =>
	{	
		myObj = JSON.parse(myObj);
		if('itemId' in myObj){
			let obj = mp.objects.at(checkGround(player, myObj.itemId));
			obj.setVariable('count', newCount);
		} else {
			mp.objects.forEach((obj) => {
				if(('itemId' in myObj && obj.getVariable('itemId').toString() === myObj.itemId.toString()) || (player.dist(obj.position) < 2 && parseInt(obj.getVariable('id')) === parseInt(myObj.id) &&  parseInt(obj.getVariable('count')) === parseInt(myObj.count))){
					if(newCount === undefined){
						clearTimeout(allObj[obj.getVariable('itemId')]);
						obj.destroy();
					} else {
						obj.setVariable('count', newCount);
						return;
					}
				}
			});
		}
	},
	"destroyObj": (player, itemId) =>
	{	
		try{
			clearTimeout(allObj[mp.objects.at(itemId).getVariable('itemId')]);
			if(mp.objects.at(itemId) !== undefined)
				mp.objects.at(itemId).destroy();
		} catch(e) {
			//try{mp.objects.at(itemId).destroy()} catch(e) {}
		}
	},	
	"putItemOnTheGround": (player, container, place, count=-1) => {
		let item = JSON.parse(JSON.stringify(player.data.inventory[container][place]));
		if(JSON.stringify(item).length === 2) return;
		let position = player.position;
		position.z -= 0.98;
		newItem = mp.objects.new(mp.joaat(item.model), position,
		{
			rotation: item.rotation,
			alpha: 250,
			dimension: 0
		});
		newItem.setVariables({
            "owner": player.data.realSQLID,
			"weight": item.weight,
            "id": item.id,
			"description": item.description,
			"clothes": item.clothes,
			"propIndex": item.propIndex,
			"gender": item.gender,
			"propIndexToros": item.propIndexToros,
			"propIndexBody": item.propIndexBody,
			"color": item.color,
			"entity": item.entity,
			"currentAmmo": item.currentAmmo
        });
		let smth = JSON.parse(JSON.stringify(player.data.inventory));
		if(count === -1){
			newItem.setVariables({
				"count": item.count,
			});
			smth[container][place] = {};
		} else {
			newItem.setVariables({
				"count": count,
			});
			smth[container][place].count -= count;
			if(!smth[container][place].count)
				smth[container][place] = {};
		}
		item = {}
		player.data.inventory = JSON.parse(JSON.stringify(smth));
		player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
		updateServerSlots(player, [container, place], ['information', 0]);
		newItem.setVariable("itemId", allObj.length);
		all_items_data.push(newItem.id);
		allObj.push(setTimeout(() => {
			try{
				newItem.destroy();
			}catch(e){}
		}, 300000));
	},	
	'items:takeItem': (player, id) =>
	{
		if(checkGround(player, id) === -1)
			return;
		else{
			
			let obj = mp.objects.at(checkGround(player, id));
			let smth = JSON.parse(JSON.stringify(global.playerItems[String(obj.getVariable('id'))]));
			smth.count = obj.getVariable('count');
			smth.clothes = obj.getVariable('clothes');
			smth.propIndex = obj.getVariable('propIndex');
			smth.gender = obj.getVariable('gender');
			smth.description = obj.getVariable('description');
			smth.propIndexToros = obj.getVariable('propIndexToros');
			smth.propIndexBody = obj.getVariable('propIndexBody');
			smth.color = obj.getVariable('color');
			smth.entity = obj.getVariable('entity');
			smth.currentAmmo = obj.getVariable('currentAmmo');
			smth.weight = obj.getVariable('weight');
			if(!checkWeight(player.data.inventory, parseInt(smth.count) * parseInt(smth.weight)))
				return;
			let semi_inventory = JSON.parse(JSON.stringify(player.data.inventory));
			let semiProduct = Object.assign({}, smth);
			for(let i=0; i < semi_inventory['inventory-box'].length; i++){
				if(!Object.keys(semi_inventory['inventory-box'][i]).length || smth.id !== semi_inventory['inventory-box'][i].id) continue;
				if(!semiProduct.count) break;
				if((smth.count + semi_inventory['inventory-box'][i].count) <= semi_inventory['inventory-box'][i].maxCount) 
				{
					semi_inventory['inventory-box'][i].count += smth.count;
					player.call("updateInventory", ['inventory-box', i, semiProduct.id, semi_inventory['inventory-box'][i].description, 0, semi_inventory['inventory-box'][i].count, semi_inventory['inventory-box'][i].weight, semi_inventory['inventory-box'][i].gender]);
					semiProduct.count = 0;
					break;
				}
				else
				{
					semiProduct.count -= player.data.inventory['inventory-box'][i].maxCount - semi_inventory['inventory-box'][i].count;
					semi_inventory['inventory-box'][i].count = semi_inventory['inventory-box'][i].maxCount;
					player.call("updateInventory", ['inventory-box', i, semiProduct.id, semi_inventory['inventory-box'][i].description, 0, semi_inventory['inventory-box'][i].maxCount, semi_inventory['inventory-box'][i].weight, semi_inventory['inventory-box'][i].gender]);
				}
			}
			if(semiProduct.count)
				for(let i=0; i < player.data.inventory['inventory-box'].length; i++){
					if(Object.keys(player.data.inventory['inventory-box'][i]).length) continue;
					if(semiProduct.count > semiProduct.maxCount){
						semiProduct.count -= semiProduct.maxCount;
						let product = Object.assign({}, semiProduct);
						product.count = product.maxCount;
						semi_inventory['inventory-box'][i] = Object.assign({}, product);
					} else {
						if(semiProduct.count) {
							semi_inventory['inventory-box'][i] = Object.assign({}, semiProduct);
							player.call("updateInventory", ['inventory-box', i, semiProduct.id, semi_inventory['inventory-box'][i].description, 0, semi_inventory['inventory-box'][i].count, semi_inventory['inventory-box'][i].weight, semi_inventory['inventory-box'][i].gender]);
							semiProduct.count = 0;
							break;
						}
					}
				}
			if(semiProduct.count){
				return player.call('SendAlert', ['У вас нехватает места в инвентаре', 'red']);
			} 
			player.data.inventory = JSON.parse(JSON.stringify(semi_inventory));
			player.customCharacter.Inventory = JSON.parse(JSON.stringify(player.data.inventory));
			clearTimeout(allObj[obj.getVariable('itemId')]);
			obj.destroy();
		}
	},
	'items:updateInventory': (player, first_cont, second_cont, a, b, count) =>
	{
		// check weight
		let smth = JSON.parse(JSON.stringify(player.data.inventory));
		first_cont = JSON.parse(first_cont);
		second_cont = JSON.parse(second_cont);
		let [first_container, first] = JSON.parse(a);
		let [second_container, second] = JSON.parse(b);
		let aaa = JSON.parse(a),
			bbb = JSON.parse(b);
		if((first_container === 'information' || second_container === 'information') && !(first_container === 'information' === second_container)){
			let semii = JSON.parse(JSON.stringify(player.data.inventory));
			if(first_container === 'information'){
				semii[second_container][second] = second_cont
			} else {
				semii[first_container][first] = first_cont
			}
			if(!checkWeight(semii)){
				updateServerSlots(player, aaa, bbb)
				return player.call('SendAlert', ['У вас нехватает места в инвентаре', 'red']);
			}
		}
		if('itemId' in second_cont){
			if(checkGround(player, second_cont.itemId) === -1) return;
			let obj = mp.objects.at(checkGround(player, second_cont.itemId));
			smth[first_container][first] = JSON.parse(JSON.stringify(global.playerItems[obj.getVariable('id')]));
			smth[first_container][first].count = obj.getVariable('count');
			smth[first_container][first].clothes = obj.getVariable('clothes');
			smth[first_container][first].propIndex = obj.getVariable('propIndex');
			smth[first_container][first].gender = obj.getVariable('gender');
			smth[first_container][first].propIndexToros = obj.getVariable('propIndexToros');
			smth[first_container][first].propIndexBody = obj.getVariable('propIndexBody');
			smth[first_container][first].color = obj.getVariable('color');
			smth[first_container][first].entity = obj.getVariable('entity');
			smth[first_container][first].currentAmmo = obj.getVariable('currentAmmo');	
			smth[first_container][first].weight = obj.getVariable('weight');
			smth[first_container][first].description = obj.getVariable('description');
		}
		if('itemId' in first_cont){
			if(checkGround(player, first_cont.itemId) === -1) return;
			let obj = mp.objects.at(checkGround(player, first_cont.itemId));
			smth[second_container][second] = JSON.parse(JSON.stringify(global.playerItems[obj.getVariable('id')]));
			smth[second_container][second].count = obj.getVariable('count');
			smth[second_container][second].clothes = obj.getVariable('clothes');
			smth[second_container][second].propIndex = obj.getVariable('propIndex');
			smth[second_container][second].gender = obj.getVariable('gender');
			smth[second_container][second].propIndexToros = obj.getVariable('propIndexToros');
			smth[second_container][second].propIndexBody = obj.getVariable('propIndexBody');
			smth[second_container][second].color = obj.getVariable('color');
			smth[second_container][second].entity = obj.getVariable('entity');
			smth[second_container][second].currentAmmo = obj.getVariable('currentAmmo');
			smth[second_container][second].weight = obj.getVariable('weight');
			smth[second_container][second].description = obj.getVariable('description');
		}
		if(first_container === 'information' === second_container){
			mp.events.call('setVariablesObj', player, JSON.stringify(smth[first_container][first]), first_cont.count);
			mp.events.call('setVariablesObj', player, JSON.stringify(smth[second_container][second]), second_cont.count);
			return
			
		} else if(JSON.stringify(first_cont).length === 2 && second_container === 'information'){
			if(!('itemId' in second_cont))
				return mp.events.call('putItemOnTheGround', player, first_container, first, second_cont.count);
			else{
				mp.events.call('setVariablesObj', player, JSON.stringify(smth[first_container][first]), second_cont.count); // bcs no swap, so in first container info about second...
				smth[first_container][first] = {}
				player.data.inventory = JSON.parse(JSON.stringify(smth));
				player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
				player.applyCharacter();
				return updateServerSlots(player, aaa, bbb)
			}
		} else if(JSON.stringify(first_cont).length !== 2 && second_container === 'information' && first_cont.id !== second_cont.id){
		if(checkGround(player, first_cont.itemId) === -1) return updateServerSlots(player, aaa, bbb);
			else mp.events.call('destroyObj', player, checkGround(player, first_cont.itemId));
			let second_swap = JSON.parse(JSON.stringify(smth[second_container][second]));
			mp.events.call('putItemOnTheGround', player, first_container, first);
			setTimeout(()=>{
				let new_smth = JSON.parse(JSON.stringify(player.data.inventory));
				new_smth[first_container][first] = second_swap;
				player.data.inventory = JSON.parse(JSON.stringify(new_smth));
				player.customCharacter.Inventory = JSON.parse(JSON.stringify(new_smth));
				player.applyCharacter();
			}, 50);
			return updateServerSlots(player, aaa, bbb)
			
		} else if(JSON.stringify(first_cont).length !== 2 && second_container === 'information' && first_cont.id === second_cont.id){
			if(first_cont.description !== second_cont.description){
				if('itemId' in first_cont){
					mp.events.call('destroyObj', player, checkGround(player, first_cont.itemId));
					let second_swap = JSON.parse(JSON.stringify(smth[second_container][second]));
					mp.events.call('putItemOnTheGround', player, first_container, first);
					setTimeout(()=>{
						smth[first_container][first] = second_swap;
						smth.information = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
						player.data.inventory = JSON.parse(JSON.stringify(smth));
						player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
						player.applyCharacter();
						updateServerSlots(player, aaa, bbb)
					}, 50);
					return
				} else {
					return updateServerInv(player)
				}
			} else {
				if(!count){
					if(smth[second_container][second].count === smth[second_container][second].maxCount && smth[second_container][second].maxCount !== undefined){
						mp.events.call('destroyObj', player, checkGround(player, first_cont.itemId));
						let second_swap = JSON.parse(JSON.stringify(smth[second_container][second]));
						mp.events.call('putItemOnTheGround', player, first_container, first);
						setTimeout(()=>{
							smth[first_container][first] = second_swap;
							smth.information = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
							player.data.inventory = JSON.parse(JSON.stringify(smth));
							player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
							player.applyCharacter();
							updateServerSlots(player, aaa, bbb)
						}, 50);
						return;
					} else {
						player.call('SendAlert', ['2', 'red']);
						mp.events.call('setVariablesObj', player, JSON.stringify(smth[first_container][first]), second_cont.count);
						smth[first_container][first].count = first_cont.count;
						smth.information = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
						player.data.inventory = JSON.parse(JSON.stringify(smth));
						player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
						player.applyCharacter();
						updateServerSlots(player, aaa, bbb)
						return
					}
				} else {
					let semiProduct = JSON.parse(JSON.stringify(smth[first_container][first]));
					let position = player.position;
					position.z -= 0.98;
					newItem = mp.objects.new(mp.joaat(semiProduct.model), position,
					{
						rotation: semiProduct.rotation,
						alpha: 250,
						dimension: 0
					});
					newItem.setVariables({
						"owner": player.data.realSQLID,
						"weight": semiProduct.weight,
						"id": semiProduct.id,
						"description": semiProduct.description,
						"count": second_cont.count,
						"clothes": semiProduct.clothes,
						"propIndex": semiProduct.propIndex,
						"gender": semiProduct.gender,
						"propIndexToros": semiProduct.propIndexToros,
						"propIndexBody": semiProduct.propIndexBody,
						"color": semiProduct.color,
						"entity": semiProduct.entity,
						"currentAmmo": semiProduct.currentAmmo
					});
					newItem.setVariable("itemId", allObj.length);
					all_items_data.push(newItem.id);
					allObj.push(setTimeout(() => {
						try{
							newItem.destroy();
						}catch(e){}
					}, 300000));
					let second_swap = JSON.parse(JSON.stringify(smth[first_container][first]));
					second_swap.count = first_cont.count;
					smth[first_container][first] = second_swap;
					smth.information = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
					player.data.inventory = JSON.parse(JSON.stringify(smth));
					player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
					player.applyCharacter();
					updateServerSlots(player, aaa, bbb)
					return
				}
			}
		} else if(first_container === 'information' && JSON.stringify(first_cont).length === 2){
			if(checkGround(player, second_cont.itemId) === -1) return updateServerSlots(player, aaa, bbb)
			else mp.events.call('destroyObj', player, checkGround(player, second_cont.itemId));
			let second_swap = JSON.parse(JSON.stringify(smth[first_container][first]));
			smth[second_container][second] = second_swap;
			smth.information = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
			player.data.inventory = JSON.parse(JSON.stringify(smth));
			player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
			player.applyCharacter();
			updateServerSlots(player, aaa, bbb)
			return
			
		} else if(first_container === 'information' && JSON.stringify(first_cont).length !== 2  && (first_cont.id !== second_cont.id || (first_cont.id === second_cont.id && (first_cont.description !== second_cont.description || smth[first_container][first].count === smth[first_container][first].maxCount)))){
			if(checkGround(player, second_cont.itemId) === -1) return  updateServerSlots(player, aaa, bbb)
			else mp.events.call('destroyObj', player, checkGround(player, second_cont.itemId));
			let second_swap = JSON.parse(JSON.stringify(smth[first_container][first]));
			mp.events.call('putItemOnTheGround', player, second_container, second);
			setTimeout(()=>{
				smth[second_container][second] = second_swap;
				smth.information = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
				player.data.inventory = JSON.parse(JSON.stringify(smth));
				player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
				player.applyCharacter();
				updateServerSlots(player, aaa, bbb)
			}, 50);
			return;
			
		} else if(first_container === 'information' && JSON.stringify(first_cont).length !== 2  && first_cont.id === second_cont.id){
			if(first_cont.description !== second_cont.description){
				if('itemId' in second_cont){
					mp.events.call('destroyObj', player, checkGround(player, second_cont.itemId));
					let second_swap = JSON.parse(JSON.stringify(smth[first_container][first]));
					mp.events.call('putItemOnTheGround', player, second_container, second);
					setTimeout(()=>{
						smth[second_container][second] = second_swap;
						smth.information = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
						player.data.inventory = JSON.parse(JSON.stringify(smth));
						player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
						player.applyCharacter();
						updateServerSlots(player, aaa, bbb)
					}, 50);
					return
				} else {
					return updateServerInv(player)
				}
			} else {
				if(!count){
					if(smth[first_container][first].count === smth[first_container][first].maxCount){
						mp.events.call('destroyObj', player, checkGround(player, second_cont.itemId));
						let second_swap = JSON.parse(JSON.stringify(smth[first_container][first]));
						mp.events.call('putItemOnTheGround', player, second_container, second);
						setTimeout(()=>{
							smth[second_container][second] = second_swap;
							smth.information = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
							player.data.inventory = JSON.parse(JSON.stringify(smth));
							player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
							player.applyCharacter();
							updateServerSlots(player, aaa, bbb)
						}, 50);
						return;
					} else {
						mp.events.call('setVariablesObj', player, JSON.stringify(smth[first_container][first]), first_cont.count);
						smth[second_container][second].count = second_cont.count;
						smth.information = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
						player.data.inventory = JSON.parse(JSON.stringify(smth));
						player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
						player.applyCharacter();
						updateServerSlots(player, aaa, bbb)
						return;
					}
				} else {
					mp.events.call('setVariablesObj', player, JSON.stringify(smth[first_container][first]), first_cont.count);
					let second_swap = JSON.parse(JSON.stringify(smth[first_container][first]));
					second_swap.count = second_cont.count;
					smth[second_container][second] = second_swap;
					smth.information = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
					player.data.inventory = JSON.parse(JSON.stringify(smth));
					player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
					player.applyCharacter();
					updateServerSlots(player, aaa, bbb)
					return
				}
			}
		}
		
		// bags when we delim item
		let first_swap = JSON.parse(JSON.stringify(smth[first_container][first]));
		let second_swap = JSON.parse(JSON.stringify(smth[second_container][second]));
		if(count){
			first_swap.count = first_cont.count;
			second_swap = JSON.parse(JSON.stringify(first_swap));
			second_swap.count = second_cont.count;
			smth[first_container][first] = first_swap;
			smth[second_container][second] = second_swap;
		} else {
			if(first_swap.description === second_swap.description){
				if(!second_cont.count){
					smth[second_container][second] = {};
					smth[first_container][first].count = first_cont.count;
				} else if(!first_cont.count){
					smth[first_container][first] = {};
					smth[second_container][second].count = second_cont.count;
				} else {
					smth[first_container][first].count = first_cont.count;
					smth[second_container][second].count = second_cont.count;
				}
			} else {
				smth[first_container][first] = second_swap;
				smth[second_container][second] = first_swap;
			}
		}
		smth.information = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
		player.data.inventory = JSON.parse(JSON.stringify(smth));
		player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
		player.applyCharacter();
		updateServerSlots(player, aaa, bbb);
	},
	"items:useItem": (player, place, itemId) => { 
		let item_id = player.data.inventory[place][itemId].id;
		if(player.isWearingWeapon && [5, 7, 24, 26, 9, 12, 8, 17, 19, 23, 43, 41, 45, 62, 67, 60, 99, 100, 102].indexOf(parseInt(item_id)) === -1){
			if(typeof player.isWearingWeapon !== "boolean"){
				let smth = JSON.parse(JSON.stringify(player.data.inventory));
				smth[player.isWearingWeapon[0]][player.isWearingWeapon[1]].currentAmmo = player.getWeaponAmmo(player.weapon);
				player.data.inventory = JSON.parse(JSON.stringify(smth));
				player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
			}
			player.isWearingWeapon = false;
			player.removeAllWeapons();
		}
		if(item_id === 119) {
			
			let smth = JSON.parse(JSON.stringify(player.data.inventory));
			let another_head = JSON.parse(JSON.stringify(smth["head"][0]));
			if(another_head.description === 'Рабочая одежда') return;
			smth["head"][0] = JSON.parse(JSON.stringify(smth[place][itemId]));
			player.call("updateInventory", ["head", 0, (JSON.stringify(smth[place][itemId]).length === 2 ? 0 : smth[place][itemId].id), smth[place][itemId].description, 0, 1, smth[place][itemId].weight]);
			smth[place][itemId] = JSON.parse(JSON.stringify(another_head));
			player.data.inventory = JSON.parse(JSON.stringify(smth));
			player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
			
			player.applyCharacter();
		} else if(item_id === 116) {
			let smth = JSON.parse(JSON.stringify(player.data.inventory));
			let another_head = JSON.parse(JSON.stringify(smth["body"][0]));
			if(another_head.description === 'Рабочая одежда') return;
			smth["body"][0] = JSON.parse(JSON.stringify(smth[place][itemId]));
			player.call("updateInventory", ["body", 0, (JSON.stringify(smth[place][itemId]).length === 2 ? 0 : smth[place][itemId].id), smth[place][itemId].description, 0, 1, smth[place][itemId].weight]);
			smth[place][itemId] = JSON.parse(JSON.stringify(another_head));
			player.data.inventory = JSON.parse(JSON.stringify(smth));
			player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
			
			player.applyCharacter();
		} else if(item_id === 122) {
			let smth = JSON.parse(JSON.stringify(player.data.inventory));
			let another_head = JSON.parse(JSON.stringify(smth["middle"][0]));
			if(another_head.description === 'Рабочая одежда') return;
			smth["middle"][0] = JSON.parse(JSON.stringify(smth[place][itemId]));
			player.call("updateInventory", ["middle", 0, (JSON.stringify(smth[place][itemId]).length === 2 ? 0 : smth[place][itemId].id), smth[place][itemId].description, 0, 1, smth[place][itemId].weight]);
			smth[place][itemId] = JSON.parse(JSON.stringify(another_head));
			player.data.inventory = JSON.parse(JSON.stringify(smth));
			player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
			
			player.applyCharacter();
		} else if(item_id === 120) {
			let smth = JSON.parse(JSON.stringify(player.data.inventory));
			let another_head = JSON.parse(JSON.stringify(smth["legs"][0]));
			if(another_head.description === 'Рабочая одежда') return;
			smth["legs"][0] = JSON.parse(JSON.stringify(smth[place][itemId]));
			player.call("updateInventory", ["legs", 0, (JSON.stringify(smth[place][itemId]).length === 2 ? 0 : smth[place][itemId].id), smth[place][itemId].description, 0, 1, smth[place][itemId].weight]);
			smth[place][itemId] = JSON.parse(JSON.stringify(another_head));
			player.data.inventory = JSON.parse(JSON.stringify(smth));
			player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
			
			player.applyCharacter();
		} else if(item_id === 121) {
		
			let smth = JSON.parse(JSON.stringify(player.data.inventory));
			let another_head = JSON.parse(JSON.stringify(smth["feet"][0]));
			if(another_head.description === 'Рабочая одежда') return;
			smth["feet"][0] = JSON.parse(JSON.stringify(smth[place][itemId]));
			player.call("updateInventory", ["feet", 0, (JSON.stringify(smth[place][itemId]).length === 2 ? 0 : smth[place][itemId].id), smth[place][itemId].description, 0, 1, smth[place][itemId].weight]);
			smth[place][itemId] = JSON.parse(JSON.stringify(another_head));
			player.data.inventory = JSON.parse(JSON.stringify(smth));
			player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
			
			player.applyCharacter();
		} else if(item_id == 68) {
			let myVeh = false;
			mp.vehicles.forEachInDimension(0, (veh) => {
				if(veh.getVariable('keys') === player.data.inventory[place][itemId].entity && !myVeh)
					myVeh = veh;
			});
			if(!myVeh)
				return player.call('SendAlert', ['Машина находится в гараже', 'red']);
			if(player.dist(myVeh.position) > 5)
				return player.call('SendAlert', ['Вы слишком далеко от машины', 'red']);
			let doors = myVeh.getVariable('vehDoors');
			myVeh.setVariable('vehDoors', !doors);
			myVeh.locked = !doors;
			player.call('SendAlert', [`Машина ${(!doors ? 'закрыта': 'открыта')}`, (!doors ? 'red': 'green')]);
		} else if(item_id == 69) {
			mp.events.call('home:openByKeys', player, player.data.inventory[place][itemId].entity);
		} else if([5, 7, 24, 26, 9, 12, 8, 17, 19, 23, 43, 41, 45, 62, 67, 60].indexOf(parseInt(item_id)) >= 0) {
			if(!player_weapons[item_id][1]){
				if(player.isWearingWeapon){
					if(typeof player.isWearingWeapon !== "boolean"){
						let smth = JSON.parse(JSON.stringify(player.data.inventory));
						smth[player.isWearingWeapon[0]][player.isWearingWeapon[1]].currentAmmo = player.getWeaponAmmo(player.weapon);
						player.data.inventory = JSON.parse(JSON.stringify(smth));
						player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
					}
					player.isWearingWeapon = false;
					player.removeAllWeapons();
				}else{
					player.isWearingWeapon = true;
					player.giveWeapon(mp.joaat(player_weapons[item_id][0]), 100);	
				}
			} else {
				if(player.isWearingWeapon){
					if(typeof player.isWearingWeapon !== "boolean"){
						let smth = JSON.parse(JSON.stringify(player.data.inventory));
						smth[player.isWearingWeapon[0]][player.isWearingWeapon[1]].currentAmmo = player.getWeaponAmmo(player.weapon);
						player.data.inventory = JSON.parse(JSON.stringify(smth));
						player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
					}
					player.isWearingWeapon = false;
					player.removeAllWeapons();
				} else {
					player.isWearingWeapon = [place, itemId];
					player.giveWeapon(mp.joaat(player_weapons[item_id][0]), player.data.inventory[place][itemId].currentAmmo);	
				}
			}
		} else if(item_id === 99 || item_id === 100 || item_id === 102) {
			if(!player.isWearingWeapon) return player.call('SendAlert', ["У вас в руках нет оружия", 'red']);
			for(let i in player_weapons){
				if(mp.joaat(player_weapons[i][0]) === player.weapon && player_weapons[i][1] === item_id)
				{
					let currentAmmo = player.getWeaponAmmo(player.weapon);
					if(currentAmmo === player_weapons[i][2])
						return player.call('SendAlert', ["Оружие уже заряжено", 'red']);
					else{
						//мб фикс но я не думаю так
						let smth = JSON.parse(JSON.stringify(player.data.inventory));
						if((smth[place][itemId].count - player_weapons[i][2]) <= 0){
							player.setWeaponAmmo(player.weapon, smth[place][itemId].count);
							smth[place][itemId] = {};
						} else {
							smth[place][itemId].count = parseInt(smth[place][itemId].count) - parseInt(player_weapons[i][2]);
							player.setWeaponAmmo(player.weapon, player_weapons[i][2]);
						}
						if(smth[player.isWearingWeapon[0]][player.isWearingWeapon[1]].id !== undefined)
							smth[player.isWearingWeapon[0]][player.isWearingWeapon[1]].currentAmmo = player.getWeaponAmmo(player.weapon);
						player.data.inventory = JSON.parse(JSON.stringify(smth));
						player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
						
						player.call('player:reloadWeapon');
						player.call('SendAlert', ["Вы успешно зарядили оружие", 'green'])
					}
				} else if(mp.joaat(player_weapons[i][0]) === player.weapon)
					return player.call('SendAlert', ["Для этого оружия нужны другие патроны", 'red']);
			}
		} else if(item_id >= 104 && item_id <= 115) {
			// Выпивка
			if(player.vehicle === undefined) {
				player.call('setTimer', [player.data.inventory[place][itemId].model, 28422, 3500]);
				setTimeout(() => {
					player.playAnimation("amb@world_human_leaning@male@coffee@idle_a", "idle_a", 1.0, 49);
					setTimeout(() => {
						try{
							player.stopAnimation()
						} catch(e) {}
					}, 3500);
				}, 300);
			}
			let smth = JSON.parse(JSON.stringify(player.data.inventory));
			smth[place][itemId].count = parseInt(smth[place][itemId].count) - 1;
			if(smth[place][itemId].count === 0) smth[place][itemId] = {};
			player.data.inventory = JSON.parse(JSON.stringify(smth));
			player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
			
		} else if(item_id == 71) {			
			let smth = JSON.parse(JSON.stringify(player.data.inventory));
			player.vehicle.setVariable('fuelLevel', player.vehicle.getVariable('fuelLevel') + 20);
			if(player.vehicle.getVariable('maxFuelLevel') <  player.vehicle.getVariable('fuelLevel'))
				player.vehicle.setVariable('fuelLevel', player.vehicle.getVariable('fuelLevel') + 20);
			smth[place][itemId] = {};
			player.data.inventory = JSON.parse(JSON.stringify(smth));
			player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
		} else if(item_id == 75 || item_id == 77 || item_id == 78 || item_id == 79 || item_id == 73 || item_id == 95) {
			if(player.getVariable('satiety') >= 100) return player.call('SendAlert', ['Вы не хотите больше есть', 'red']);
			if(player.vehicle === undefined){
				player.call('setTimer', [player.data.inventory[place][itemId].model, 60309, 2500]);
				setTimeout(() => {
					player.playAnimation("mp_player_inteat@burger", "mp_player_int_eat_burger", 1.0, 49);
					setTimeout(() => {
						try{
							player.stopAnimation()
						} catch(e) {}
					}, 2500);
				}, 300);
			}
			let count = 0;
			if(item_id === 73)
				count = 40
			else if(item_id === 75 || item_id === 79)
				count = 50
			else if(item_id === 77)
				count = 70
			else if(item_id === 78)
				count = 65
			else if(item_id === 95)
				count = 30
			if(player.getVariable('satiety') < 0)
				player.setVariable('satiety', 0);
			player.setVariable('satiety', (player.getVariable('satiety') + count >= 100) ? 100 : player.getVariable('satiety') + count)
			let smth = JSON.parse(JSON.stringify(player.data.inventory));
			smth[place][itemId].count = parseInt(smth[place][itemId].count) - 1;
			if(smth[place][itemId].count === 0) smth[place][itemId] = {};
			player.data.inventory = JSON.parse(JSON.stringify(smth));
			player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
			
		} else if(item_id == 80 || item_id == 74) {
			if(player.getVariable('water') >= 100) return player.call('SendAlert', ['Вы не хотите больше пить', 'red']);
			if(player.vehicle === undefined){
				player.call('setTimer', [player.data.inventory[place][itemId].model, 28422, 3500]);
				setTimeout(() => {
					player.playAnimation("amb@world_human_leaning@male@coffee@idle_a", "idle_a", 1.0, 49);
					setTimeout(() => {
						try{
							player.stopAnimation()
						} catch(e) {}
					}, 3500);
				}, 300);
			}
			let count = 0;
			if(item_id === 80)
				count = 50;
			else
				count = 75;
			if(player.getVariable('water') < 0)
				player.setVariable('water', 0);
			player.setVariable('water', (player.getVariable('water') + count >= 100) ? 100 : player.getVariable('water') + count);
			if(count === 75){
				if(player.getVariable('satiety') < 0)
					player.setVariable('satiety', 0);
				player.setVariable('satiety', (player.getVariable('satiety') + 25 >= 100) ? 100 : player.getVariable('satiety') + 25);
			}
			let smth = JSON.parse(JSON.stringify(player.data.inventory));
			smth[place][itemId].count = parseInt(smth[place][itemId].count) - 1;
			if(smth[place][itemId].count === 0) smth[place][itemId] = {};
			player.data.inventory = JSON.parse(JSON.stringify(smth));
			player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
			
		} else if(item_id == 94) {
			//amb@code_human_wander_smoking@male@idle_a idle_a 1 49 - курение сигареты
			if(player.vehicle === undefined) {
				player.call('setTimer', [player.data.inventory[place][itemId].model, 28422, 3500]);
				setTimeout(() => {	
					player.playAnimation("amb@code_human_wander_smoking@male@idle_a", "idle_a", 1.0, 49);
					setTimeout(() => {
						try{
							player.stopAnimation()
						} catch(e) {}
					}, 3500);
				}, 300);
			}
			let smth = JSON.parse(JSON.stringify(player.data.inventory));
			smth[place][itemId].count = parseInt(smth[place][itemId].count) - 1;
			if(smth[place][itemId].count === 0) smth[place][itemId] = {};
			player.data.inventory = JSON.parse(JSON.stringify(smth));
			player.customCharacter.Inventory = JSON.parse(JSON.stringify(smth));
		}
		player.call("updateInventory", [place, itemId, (JSON.stringify(player.data.inventory[place][itemId]).length === 2 ? 0 : item_id), player.data.inventory[place][itemId].description, 0, player.data.inventory[place][itemId].count]);
	}
});
