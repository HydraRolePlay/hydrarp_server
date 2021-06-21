var DB = require('../../MySQL/modules/db');

mp.events.add("buyThingsInTheShop", (player, cost, type) => {
	DB.Handle.query("SELECT Cash, Card FROM players WHERE Nickname = ? LIMIT 1", [player.data.nickname], function(e, result) {
		if(player.data.cash !== result[0]['Cash'] && player.data.card !== result[0]['Card']){
			player.data.card = parseInt(result[0]['Card']);
			player.data.cash = parseInt(result[0]['Cash']);
		}
	});
	setTimeout(function(){
		if(type)
			player.data.card -= parseInt(cost);
		else 
			player.data.cash -= parseInt(cost);
		DB.Handle.query(`UPDATE players set Cash = ${player.data.cash}, Card = ${player.data.card} WHERE Nickname = ?`, [player.data.nickname], function(e, result) {});
		player.call("UpdateMoneyClient", [player.data.cash, player.data.card, player.admin]);
	},300);
});

mp.events.add("work:getMoney", (player, money) => {
	DB.Handle.query("SELECT Cash, Card FROM players WHERE Nickname = ? LIMIT 1", [player.data.nickname], function(e, result) {
		if(player.data.cash !== result[0]['Cash'] && player.data.card !== result[0]['Card']){
			player.data.card = parseInt(result[0]['Card']);
			player.data.cash = parseInt(result[0]['Cash']);
		}
	});
	setTimeout(function(){
		if(player.date_start_work === undefined) return;
		let now = new Date();
		let diff = (now - player.date_start_work) / 1000 / 60 / 60;
		player.date_start_work = undefined;
		diff *= parseInt(money);
		player.data.card += diff;
		player.call('SendAlert', ['Вы заработали ' + diff, 'green']);
		DB.Handle.query(`UPDATE players set Cash = ${player.data.cash}, Card = ${player.data.card} WHERE Nickname = ?`, [player.data.nickname], function(e, result) {});
		player.call("UpdateMoneyClient", [player.data.cash, player.data.card, player.admin]);
	},300);
});

mp.events.add("buySmthInEasyBrowser", (player, cost) => {
	
	DB.Handle.query("SELECT Cash, Card FROM players WHERE Nickname = ? LIMIT 1", [player.data.nickname], function(e, result) {
		if(player.data.cash !== result[0]['Cash'] && player.data.card !== result[0]['Card']){
			player.data.card = parseInt(result[0]['Card']);
			player.data.cash = parseInt(result[0]['Cash']);
		}
	});
	setTimeout(function(){
		if(player.data.cash > cost){
			player.data.cash -= parseInt(cost);
			DB.Handle.query(`UPDATE players set Cash = ${player.data.cash}, Card = ${player.data.card} WHERE Nickname = ?`, [player.data.nickname], function(e, result) {
				if(e) console.log(e);
			});
			player.call("UpdateMoneyClient", [player.data.cash, player.data.card, player.admin]);
			player.call("GoodPaymentInEasyBrowser");
				
		} else {
			player.call("BadPaymentInEasyBrowser");
		}
	},200);
});