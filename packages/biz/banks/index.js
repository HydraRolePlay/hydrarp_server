const DB = require('../../MySQL/modules/db.js');

mp.events.add({
	'bank:trans': (player, type, money, anotherPlayer=undefined) =>
	{
		if(String(type) === '0'){
			if(player.data.cash < money)
				return player.call('SendAlert', ['Ошибка', 'red']);
			player.data.cash -= money;
			player.data.card += money;
		} else if(String(type) === '1'){
			if(player.data.card < money)
				return player.call('SendAlert', ['Ошибка', 'red']);
			player.data.cash += money;
			player.data.card -= money;
		} else if(String(type) === '2'){
			if(player.data.card < money)
				return player.call('SendAlert', ['Ошибка', 'red']);
			let needPlayer = false;
			mp.players.forEach((_player) => {
				if(_player.getVariable('sqlID') === parseInt(anotherPlayer))
					needPlayer = _player;
			});
			if(!needPlayer)
				return player.call('SendAlert', ['Игрок не найден', 'red']);
			needPlayer.data.card += money;
			player.data.card -= money;
			DB.Handle.query(`UPDATE players set Cash = ${needPlayer.data.cash}, Card = ${needPlayer.data.card} WHERE Nickname = ?`, [needPlayer.data.nickname], function(e, result) {
				if(e) console.log(e);
			});
			needPlayer.call('SendAlert', ['Вам перевели ' + money + '&#8381;', 'green']);
			needPlayer.call("UpdateMoneyClient", [needPlayer.data.cash, needPlayer.data.card, needPlayer.admin]);
			
		}
		player.call('SendAlert', ['Успешно!', 'green']);
		DB.Handle.query(`UPDATE players set Cash = ${player.data.cash}, Card = ${player.data.card} WHERE Nickname = ?`, [player.data.nickname], function(e, result) {
			if(e) console.log(e);
		});
		player.call("UpdateMoneyClient", [player.data.cash, player.data.card, player.admin]);
	},
});