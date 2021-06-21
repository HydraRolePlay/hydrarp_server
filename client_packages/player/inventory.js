global.iteractionWithItems = false;
global.trade = false;

function playerInventory(){
	if(global.trade){
		mp.events.call('SendAlert', "Вы отменили обмен", "red");
		mp.events.callRemote('plTrade:refuse');		
	} else {
		if(!global.inventory.openBrowser){
			global.hud.execute(`interactionWithPlayer.show=0`);
			global.hud.execute(`car.show=0`);
			global.hud.execute(`HUD.show=0`);
			global.hud.execute(`help.show=0`);
			global.hud.execute(`logotype.show=0`);
			global.hud.execute(`interactionIndicator.show=0`);
			global.AnimationBrowser.execute("$('.select-wrapper').css('right', '-7vw');");
			global.mainBrowser.execute('all_windows["container-animations"] = false;all_windows["container-player-inventory"] = true;updateWindows();');
			mp.game.graphics.transitionToBlurred(250);
			mp.game.ui.displayRadar(false);
			global.chat.show = false;
			global.chat.browser.execute(`setState("hidden")`);
			mp.gui.cursor.show(true, true);
			global.inventory.browser.execute(`getUsrImage(${mp.storage.data.login});setInventory(${JSON.stringify(smth)});`);
			global.inventory.openBrowser = true;
			var refreshGround = setInterval(function() {
				if(global.inventory.openBrowser){
					mp.events.call('refreshPlayerGround');
				} else {
					clearInterval(refreshGround);
				} 
			}, 300);
		} else {
			mp.game.graphics.transitionFromBlurred(250);
			global.hud.execute(`HUD.show=1`);
			global.hud.execute(`help.show=1`);
			global.hud.execute(`logotype.show=1`);
			mp.game.ui.displayRadar(true);
			global.chat.show = true;
			global.chat.browser.execute(`setState("transparent")`);
			mp.gui.cursor.show(false, false);
			global.mainBrowser.execute('all_windows["container-player-inventory"] = false;updateWindows();');
			global.inventory.openBrowser = false;
		}
	}
}
mp.events.addDataHandler('count', function (entity, value, oldValue) {
	if(entity.type === 'object' && entity.hasVariable('id')) mp.events.call('refreshPlayerGround');
});

mp.events.add('render', function () {
	mp.objects.forEach(
		(obj) => {
			if(obj.hasVariable('id')){
				obj.freezePosition(false)
				obj.setNoCollision(mp.players.local.handle, false);
				if(mp.players.local.vehicle)
					obj.setNoCollision(mp.players.local.vehicle.handle, false);
			}
		});
});


mp.events.add({
	"refreshPlayerGround": () => 
	{
		let needObjects = [];
		mp.objects.forEach(
			(obj) => {
				if(mp.game.gameplay.getDistanceBetweenCoords(obj.position.x, obj.position.y, obj.position.z, mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, true) < 2 && obj.getVariable('id') !== undefined)
				{
					let smth = JSON.parse(JSON.stringify(global.playerItems[parseInt(obj.getVariable('id'))]));
					smth.description = obj.getVariable('description');
					smth.count = obj.getVariable('count');
					smth.weight = obj.getVariable('weight');
					smth.id = parseInt(obj.getVariable('id'));
					smth.gender = parseInt(obj.getVariable('gender'));
					smth.itemId = parseInt(obj.getVariable('itemId'));
					needObjects.push(smth);
				}
			}
		);
		let ground = needObjects;
		if (ground.length !== 20)
			for(let i=ground.length; i<20; i++)
				ground.push({});
		global.localplayer.data.inventory["information"] = ground;
		global.inventory.browser.execute(`setInventory(${JSON.stringify(global.localplayer.data.inventory)})`);
		global.inventory.browser.execute(`maxTradeMoney = ${global.localplayer.data.cash}`);
	},
	"setTimer": (item, hand, timer) =>
	{
		global.iteractionWithItems = item;
		//mp.attachmentMngr.register("mining", "prop_tool_jackham", hand, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
		let newobj = mp.objects.new(mp.game.joaat(item), mp.players.local.position); 
		setTimeout(function(){
			newobj.attachTo(mp.players.local.handle, mp.players.local.getBoneIndex(hand), 0, 0, 0, 0, 0, 0, false, false, false, false, 2, true); 
		}, 300);
		setTimeout(function(){
			global.iteractionWithItems = false;
			newobj.destroy();
		}, timer);
	},
	"updateInventory": (box, place_num, item_id, desc, putOff, cou=0, weight=0, gender=undefined) =>
	{
		if(item_id === 0 || item_id === null){
			try{
				global.localplayer.data.inventory[box][place_num] = {};
			}catch(e){}
		} else {
			global.localplayer.data.inventory[box][place_num] = JSON.parse(JSON.stringify(global.playerItems[item_id]));
			if(desc)
				global.localplayer.data.inventory[box][place_num].description = desc;
			if(putOff)
				global.localplayer.data.inventory[box][place_num].putOff = 1;
			if(cou)
				global.localplayer.data.inventory[box][place_num].count = cou;
			else 
				global.localplayer.data.inventory[box][place_num].count = global.localplayer.data.inventory[box][place_num].maxCount;
			if(weight)
				global.localplayer.data.inventory[box][place_num].weight = weight;
			if(gender !== undefined)
				global.localplayer.data.inventory[box][place_num].gender = gender;
			global.localplayer.data.inventory[box][place_num].id = parseInt(global.localplayer.data.inventory[box][place_num].id);
		}
		global.inventory.browser.execute(`setInventory(${JSON.stringify(global.localplayer.data.inventory)})`);
		
	},
	'inventory:setTradeInv': (inv) =>
	{
		global.localplayer.data.inventory['trader-cells'] = JSON.parse(inv);
		global.inventory.browser.execute(`setInventory(${JSON.stringify(global.localplayer.data.inventory)})`);
	},	
	
	"updateClientInventory": (first_cont, second_cont, a, b, count=false) =>
	{
		let [first_container, first] = JSON.parse(a);
		let [second_container, second] = JSON.parse(b);
		first_cont = JSON.parse(first_cont);
		second_cont = JSON.parse(second_cont);
		let smth = JSON.parse(JSON.stringify(global.localplayer.data.inventory));
		smth[first_container][first] = first_cont;
		smth[second_container][second] = second_cont;
		global.localplayer.data.inventory = JSON.parse(JSON.stringify(smth));
		if(global.trade)
			mp.events.callRemote('plTrade:updateTradeInv', a, b);
		else 
			mp.events.callRemote('items:updateInventory', JSON.stringify(first_cont), JSON.stringify(second_cont), a, b, count);
		
	},
	"doSmthWithItems": (text, elem_category, id) =>
	{
		if(text === "Использовать")
		{
			mp.game.graphics.transitionFromBlurred(250);
			global.hud.execute(`HUD.show=1`);
			global.hud.execute(`help.show=1`);
			global.hud.execute(`logotype.show=1`);
			mp.game.ui.displayRadar(true);
			global.chat.show = true;
			global.chat.browser.execute(`setState("transparent")`);
			mp.gui.cursor.show(false, false);
			global.mainBrowser.execute('all_windows["container-player-inventory"] = false;updateWindows();');
			global.inventory.openBrowser = false;
			if(global.localplayer.data.inventory[elem_category][id].gender !== null && global.localplayer.data.inventory[elem_category][id].gender !== undefined && global.localplayer.data.inventory[elem_category][id].gender !== global.localplayer.data.gender)
				return mp.events.call('SendAlert', "Вы не можете надеть женскую одежду", "red");
			let item_id = global.localplayer.data.inventory[elem_category][id].id;
			if(item_id === 71 && !mp.players.local.vehicle) 
				return mp.events.call('SendAlert', "Вы не в машине", "red");
			if(item_id === 71 && mp.players.local.vehicle.getPedInSeat(-1) !== mp.players.local.handle) 
				return mp.events.call('SendAlert', "Вы не водитель", "red");
			if(global.iteractionWithItems)
				return mp.events.call('SendAlert', "Вы не можете это сделать", "red");
			else
				mp.events.callRemote('items:useItem', elem_category, id);
		}
		if(text === "Выбросить")
		{
			if(global.localplayer.data.inventory[elem_category][id].putOff) return;
			mp.events.callRemote("putItemOnTheGround", elem_category, id);
			global.localplayer.data.inventory[elem_category][id] = {};
			global.inventory.browser.execute(`setInventory(${JSON.stringify(global.localplayer.data.inventory)})`);
			mp.events.call('refreshPlayerGround');
		}
		if(text === "Снять")
		{
			let product = global.localplayer.data.inventory[elem_category][id];
			if(product.description === 'Рабочая одежда') return;
			let semiProduct = Object.assign({}, global.localplayer.data.inventory[elem_category][id]);
			let newId;
			global.localplayer.data.inventory[elem_category][id] = [];
			if(semiProduct.count) 
				for(let i=0; i < global.localplayer.data.inventory['inventory-box'].length; i++){
					if(Object.keys(global.localplayer.data.inventory['inventory-box'][i]).length) continue;
					if(semiProduct.count === semiProduct.maxCount){
						global.localplayer.data.inventory['inventory-box'][i] = Object.assign({}, semiProduct);
						semiProduct.count = 0;
						newId = i;
						break;
					}
				}
			if(semiProduct.count){
				// mp.events.callRemote("putItemOnTheGround", JSON.stringify(semiProduct));
				mp.events.call('SendAlert', "В связи с нехваткой слотов этот предмет нельзя снять", "red");
				global.inventory.browser.execute(`setInventory(${JSON.stringify(global.localplayer.data.inventory)})`);
				return
			}
			let b = ['inventory-box', newId];
			let a = [elem_category, id];
			mp.events.callRemote('items:updateInventory', JSON.stringify({}), JSON.stringify(semiProduct), JSON.stringify(a), JSON.stringify(b));
			global.inventory.browser.execute(`setInventory(${JSON.stringify(global.localplayer.data.inventory)})`);
			
		}
		if(text === "Взять")
		{
			mp.events.callRemote('items:takeItem', global.localplayer.data.inventory[elem_category][id].itemId);
		}
	},
	"inventory:open": (id) =>
	{
		global.player_dont_close_iteraction = true;
		let data = {}
		if(global.playerFriends.indexOf(mp.players.atRemoteId(id).getVariable('sqlID')) !== -1)
			data['nickname'] = mp.players.atRemoteId(id).getVariable('nick');
		mp.gui.cursor.show(true, true);
		if(!global.inventory.openBrowser){
			global.hud.execute(`interactionWithPlayer.show=0`);
			global.hud.execute(`car.show=0`);
			global.AnimationBrowser.execute("$('.select-wrapper').css('right', '-7vw');");
			global.AnimationBrowser.execute("$('.select-item-block').css('display', 'none');");
			global.mainBrowser.execute('all_windows["container-animations"] = false;all_windows["container-player-inventory"] = true;updateWindows();');
			mp.game.graphics.transitionToBlurred(250);
			global.hud.execute(`HUD.show=0`);
			global.hud.execute(`help.show=0`);
			global.hud.execute(`logotype.show=0`);
			global.hud.execute(`interactionIndicator.show=0`);
			mp.game.ui.displayRadar(false);
			global.chat.show = false;
			global.chat.browser.execute(`setState("hidden")`);
			global.inventory.browser.execute(`playerGender=${global.localplayer.data.gender}`);
			global.inventory.browser.execute(`openTrade(${JSON.stringify(data)});`);
			global.inventory.browser.execute(`setInventory(${JSON.stringify(global.localplayer.data.inventory)})`);
			global.inventory.openBrowser = true;
			var refreshGround = setInterval(function() {
				if(global.inventory.openBrowser){
					mp.events.call('refreshPlayerGround');
				} else {
					clearInterval(refreshGround);
				} 
			}, 300); 
		} else {
			global.inventory.browser.execute(`openTrade(${JSON.stringify(data)});`);
			global.inventory.browser.execute(`setInventory(${JSON.stringify(global.localplayer.data.inventory)})`);
		}
		global.trade = true;
	},
	'inventory:getItemsBack': () =>
	{
		mp.events.call('SendAlert', "Обмен отклонен", "green");
		let productOnTheGround = false;
		for(let j=0; j <tradeOffer['trading-box'].length; j++){
			let product = tradeOffer['trading-box'][j];
			let semiProduct = Object.assign({}, product);
			for(let i=0; i < global.localplayer.data.inventory['inventory-box'].length; i++){
				if(!Object.keys(global.localplayer.data.inventory['inventory-box'][i]).length || product.id !== global.localplayer.data.inventory['inventory-box'][i].id) continue;
				if(!semiProduct.count) break;
				if((product.count + global.localplayer.data.inventory['inventory-box'][i].count) <= global.localplayer.data.inventory['inventory-box'][i].maxCount) 
				{
					global.localplayer.data.inventory['inventory-box'][i].count += product.count;
					semiProduct.count = 0;
					break;
				}
				else
				{
					semiProduct.count -= global.localplayer.data.inventory['inventory-box'][i].maxCount - global.localplayer.data.inventory['inventory-box'][i].count;
					global.localplayer.data.inventory['inventory-box'][i].count = global.localplayer.data.inventory['inventory-box'][i].maxCount;
				}
			}
			if(!semiProduct.count) continue;
			for(let i=0; i < global.localplayer.data.inventory['inventory-box'].length; i++){
				if(Object.keys(global.localplayer.data.inventory['inventory-box'][i]).length) continue;
				if(semiProduct.count > semiProduct.maxCount){
					semiProduct.count -= semiProduct.maxCount;
					let product = Object.assign({}, semiProduct);
					product.count = product.maxCount;
					global.localplayer.data.inventory['inventory-box'][i] = Object.assign({}, product);
				} else {
					if(semiProduct.count) {
						global.localplayer.data.inventory['inventory-box'][i] = Object.assign({}, semiProduct);
						semiProduct.count = 0;
						break;
						}
				}
			}
			if(semiProduct.count){
				productOnTheGround = true;
				mp.events.callRemote("putItemOnTheGround", JSON.stringify(semiProduct));
			} 
		}
		if(productOnTheGround)
			mp.events.call('SendAlert', "Некоторые предметы помещены на землю, в связи с нехваткой слотов", "red");
		mp.game.graphics.transitionFromBlurred(250);
		global.hud.execute(`HUD.show=1`);
		global.hud.execute(`help.show=1`);
		global.hud.execute(`logotype.show=1`);
		mp.game.ui.displayRadar(true);
		global.chat.show = true;
		global.chat.browser.execute(`setState('transparent')`);
		global.player_dont_close_iteraction = false;
		mp.gui.cursor.show(false, false);
		global.inventory.browser.execute('closeTrade()');
		global.inventory.browser.execute('trade_commit = false');
		global.mainBrowser.execute('all_windows["container-player-inventory"] = false;updateWindows();');
		global.inventory.openBrowser = false;
		global.trade = false;
	},
	'inventory:setNotReady': () =>
	{
		global.inventory.browser.execute(`$('.trade-waiting').css({'opacity': '0'}); trade_commit = false`);
	},
	'inventory:setReady': () => 
	{
		global.inventory.browser.execute(`$('.trade-waiting').html('Ожидаем ответа от игрока');
										  $('.trade-waiting').css({'opacity': '1'});`);
	},
	'inventory:setAnotherReady': () => 
	{
		global.inventory.browser.execute(`$('.trade-waiting').html('Игрок согласен обменяться');
										  $('.trade-waiting').css({'opacity': '1'});`);
	},
	'inventory:trade_set_new_sum': (sum) =>
	{
		if(sum > global.localplayer.data.cash)
		{
			sum = global.localplayer.data.cash;
			global.inventory.browser.execute(`$('input.trade-sum').val(${global.localplayer.data.cash});
										      $('.self-m-indicator').text(delS($('input.trade-sum').val().trim()) === '' ? '0' : delS($('input.trade-sum').val().trim()));
											  maxTradeMoney = ${global.localplayer.data.cash}`);
		}
		mp.events.callRemote('plTrade:setTradeSum', sum);
	},
	'inventory:confirmTrade': (lastSum) =>
	{
		mp.events.callRemote('plTrade:confirmTradeOffer', lastSum);
	},
	'inventory:setNewSum': (sum) =>
	{
		global.inventory.browser.execute(`$('.trader-m-indicator').text('${sum.toLocaleString()}');`);
	},
	'inventory:trade': () =>
	{
		mp.events.call('SendAlert', "Вы успешно обменялись", "green");
		let productOnTheGround = false;
		for(let j=0; j <tradeOffer['trader-cells'].length; j++){
			let product = tradeOffer['trader-cells'][j];
			let semiProduct = Object.assign({}, product);
			for(let i=0; i < global.localplayer.data.inventory['inventory-box'].length; i++){
				if(!Object.keys(global.localplayer.data.inventory['inventory-box'][i]).length || product.id !== global.localplayer.data.inventory['inventory-box'][i].id) continue;
				if(!semiProduct.count) break;
				if((product.count + global.localplayer.data.inventory['inventory-box'][i].count) <= global.localplayer.data.inventory['inventory-box'][i].maxCount) 
				{
					global.localplayer.data.inventory['inventory-box'][i].count += product.count;
					semiProduct.count = 0;
					break;
				}
				else
				{
					semiProduct.count -= global.localplayer.data.inventory['inventory-box'][i].maxCount - global.localplayer.data.inventory['inventory-box'][i].count;
					global.localplayer.data.inventory['inventory-box'][i].count = global.localplayer.data.inventory['inventory-box'][i].maxCount;
				}
			}
			if(!semiProduct.count) continue;
			for(let i=0; i < global.localplayer.data.inventory['inventory-box'].length; i++){
				if(Object.keys(global.localplayer.data.inventory['inventory-box'][i]).length) continue;
				if(semiProduct.count > semiProduct.maxCount){
					semiProduct.count -= semiProduct.maxCount;
					let product = Object.assign({}, semiProduct);
					product.count = product.maxCount;
					global.localplayer.data.inventory['inventory-box'][i] = Object.assign({}, product);
				} else {
					if(semiProduct.count) {
						global.localplayer.data.inventory['inventory-box'][i] = Object.assign({}, semiProduct);
						semiProduct.count = 0;
						break;
						}
				}
			}
			if(semiProduct.count){
				productOnTheGround = true;
				mp.events.callRemote("putItemOnTheGround", JSON.stringify(semiProduct));
			} 
		}
		if(productOnTheGround)
			mp.events.call('SendAlert', "Некоторые предметы помещены на землю, в связи с нехваткой слотов", "red");
		tradeOffer = {
			'trading-box': [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
			'trader-cells': [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
		}
		mp.game.graphics.transitionFromBlurred(250);
		global.hud.execute(`HUD.show=1`);
		global.hud.execute(`help.show=1`);
		global.hud.execute(`logotype.show=1`);
		mp.game.ui.displayRadar(true);
		global.chat.show = true;
		global.chat.browser.execute(`setState("transparent")`);
		global.player_dont_close_iteraction = false;
		mp.gui.cursor.show(false, false);
		global.inventory.browser.execute('closeTrade()');
		global.inventory.browser.execute('trade_commit = false');
		global.mainBrowser.execute('all_windows["container-player-inventory"] = false;updateWindows();');
		global.inventory.openBrowser = false;
		global.trade = false;
	},
});