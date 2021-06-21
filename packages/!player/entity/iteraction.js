var DB = require('../../MySQL/modules/db');



mp.events.add({
	'plAcquaint': (player, anotherPlayerId) =>
	{
		if(global.calls.indexOf(anotherPlayerId) !== -1) return player.call('SendAlert', ['Игрок мертв', 'red']);
		let pl = mp.players.at(anotherPlayerId);
		if(pl.acquaint !== undefined) return player.call('SendAlert', ['Игрок занят', 'red']);
		if(player.dist(pl.position) < 3){
			pl.acquaint = player.id;
			pl.call('SendYesOrNoAlert', ['Игрок(' + player.id + ') хочет познакомиться', 'plAcquaint:confirm']);
			setTimeout(function(){
				if(pl.acquaint)
					pl.acquaint = undefined;
			}, 15000);
		}else{
			player.call('SendAlert', ['Вы слишком далеко', 'red']);
		}
	},
	'plAcquaint:confirm': (player, flag) =>
	{
		let pl = mp.players.at(player.acquaint);
		player.acquaint = undefined;
		if(global.calls.indexOf(player.id) !== -1) return;
		if(global.calls.indexOf(pl.id) !== -1) return;
		if(flag){
			if(player.dist(pl.position) < 3){
				pl.sspawn(new mp.Vector3(player.position.x - Math.sin(player.heading * (Math.PI / 180))*1.4, player.position.y + Math.cos(player.heading * (Math.PI / 180))*1.4, player.position.z));
				pl.heading = player.heading + 180;
				setTimeout(function(){
					let lastHeading = player.heading;
					player.sspawn(new mp.Vector3(player.position.x - Math.sin(player.heading * (Math.PI / 180))*0.3, player.position.y + Math.cos(player.heading * (Math.PI / 180))*0.3, player.position.z));
					player.heading = lastHeading;
					player.stopAnimation();
					pl.stopAnimation();
					player.playAnimation("anim@mp_player_intcelebrationpaired@f_m_manly_handshake", "manly_handshake_right", 1, 35);
					pl.playAnimation("anim@mp_player_intcelebrationpaired@f_m_manly_handshake", "manly_handshake_right", 1, 35);
					setTimeout(function(){
						player.stopAnimation();
						pl.stopAnimation();	
					}, 3500);
					pl.call('AddNewFriend', [player.getVariable('sqlID')]);
					player.call('AddNewFriend', [pl.getVariable('sqlID')]);
				}, 500);
			} else 
				player.call('SendAlert', ['Вы слишком далеко', 'red']);
		} else {
			player.acquaint = undefined;
		}
	},
	'plTrade': (player, anotherPlayerId) =>
	{
		if(global.calls.indexOf(anotherPlayerId) !== -1) return player.call('SendAlert', ['Игрок мертв', 'red']);
		let pl = mp.players.at(anotherPlayerId);
		if(pl.vehicle || player.vehicle) return player.call('SendAlert', ['Вы не можете это сделать', 'red']);
		if(pl.iteractionTrade !== undefined) return player.call('SendAlert', ['Игрок занят', 'red']);
		if(player.dist(pl.position) < 3){
			pl.iteractionTrade = player.id;
			pl.call('SendYesOrNoAlert', ['Игрок(' + player.id + ') хочет обменяться', 'plTrade:confirm']);
		}else{
			player.call('SendAlert', ['Вы слишком далеко', 'red']);
		}		
	},
	'plTrade:confirm': (player, flag) =>
	{
		
		let pl = mp.players.at(player.iteractionTrade);
		if(pl.iteractionTrade)
			return player.call('SendAlert', ['Вы не можете это сделать', 'red']);
		if(pl.vehicle || player.vehicle) {
			player.iteractionTrade = undefined;
			return player.call('SendAlert', ['Вы не можете это сделать', 'red']);
		}
		pl.iteractionTrade = player.id;
		if(global.calls.indexOf(player.id) !== -1) return;
		if(global.calls.indexOf(pl.id) !== -1) return;
		if(flag){
			if(player.dist(pl.position) < 3){
				player.call('inventory:open', [player.iteractionTrade]);
				pl.call('inventory:open', [pl.iteractionTrade]);
			} else 
				player.call('SendAlert', ['Вы слишком далеко', 'red']);
		} else {
			player.iteractionTrade = undefined;
		}
	},
	'plTrade:refuse': (player) =>
	{
		let pl = mp.players.at(player.iteractionTrade);
		pl.call('inventory:getItemsBack');
		player.call('inventory:getItemsBack');
		mp.events.call('plTrade:close', player);
	},
	'plTrade:updateTradeInv': (player, inv) =>
	{
		let pl = mp.players.at(player.iteractionTrade);
		pl.confirmTrade = undefined;
		player.confirmTrade = undefined;
		pl.call('inventory:setNotReady');
		player.call('inventory:setNotReady');
		pl.call('inventory:setTradeInv', [inv]);
	},
	'plTrade:close': (player) =>
	{
		let pl = mp.players.at(player.iteractionTrade);
		pl.iteractionTrade = undefined;
		player.iteractionTrade = undefined;
		pl.confirmTrade = undefined;
		player.confirmTrade = undefined;
		pl.tradeSum = undefined;
		player.tradeSum = undefined;
	},
	'plTrade:confirmTradeOffer': (player, sum) =>
	{
		let pl = mp.players.at(player.iteractionTrade);
		if(pl === undefined) return;
		if(pl.confirmTrade !== undefined){
			pl.call('inventory:trade');
			player.call('inventory:trade');
			if(pl.tradeSum === undefined)
				pl.tradeSum = 0;
			if(player.tradeSum === undefined)
				player.tradeSum = 0;
			player.data.cash += pl.tradeSum;
			pl.data.cash += player.tradeSum;
			DB.Handle.query(`UPDATE players set Cash = ${player.data.cash}, Card = ${player.data.card} WHERE Nickname = ?`, [player.data.nickname], function(e, result) {
				if(e) console.log(e);
			});
			DB.Handle.query(`UPDATE players set Cash = ${pl.data.cash}, Card = ${pl.data.card} WHERE Nickname = ?`, [pl.data.nickname], function(e, result) {
				if(e) console.log(e);
			});
			mp.events.call('plTrade:close', player);
		} else {
			player.call('inventory:setReady');
			pl.call('inventory:setAnotherReady');
			player.tradeSum = sum;
			player.confirmTrade = true;
		}
	},
	'plTrade:setTradeSum': (player, sum) =>
	{
		player.tradeSum = sum;
		let pl = mp.players.at(player.iteractionTrade);
		pl.confirmTrade = undefined;
		player.confirmTrade = undefined;
		pl.call('inventory:setNotReady');
		player.call('inventory:setNotReady');
		pl.call('inventory:setNewSum', [sum]);
	},
	'plDocuments': (player, anotherPlayerId) =>
	{

	},
	'plDocuments:confirm': (player, flag) =>
	{
		
	},
	'plWayPoint': (player, position, anotherPlayerId) =>
	{
		if(global.calls.indexOf(anotherPlayerId) !== -1) return player.call('SendAlert', ['Игрок мертв', 'red']);
		let pl = mp.players.at(anotherPlayerId);
		if(pl === undefined) return;
		if(pl.newPoint !== undefined) return player.call('SendAlert', ['Игрок занят', 'red']);
		pl.call('SendYesOrNoAlert', ['Игрок(' + player.id + ') хочет поделиться своей меткой', 'plWayPoint:confirm']);
		pl.newPoint = JSON.parse(position);
		setTimeout(function(){
			if(pl.newPoint)
				pl.newPoint = undefined;
		}, 15000);
		
	},
	'plWayPoint:confirm': (player, flag) =>
	{
		if(player.newPoint === undefined) return;
		if(flag){
			player.call('setWaypoint', [player.newPoint.x, player.newPoint.y]);
			player.newPoint = undefined;
			return player.call('SendAlert', ['Новая метка поставлена', 'green']);	
		} else {
			return player.call('SendAlert', ['Вы отказались', 'red']);	
		}
	},
});