global.bankBrowser = false;
global.bankIsOpen = false;

mp.events.add({
	'bank:open': (params) =>
	{
		global.eButton = 0;
		global.hud.execute(`interactionIndicator.show=0`);
		let execute = function (val) {global.mainBrowser.call('sendInfoToWindow', 'container-bank', val)};
		global.mainBrowser.execute('all_windows["container-bank"] = true;$(".container-bank").css("z-index", "1000");updateWindows();');
		execute(`$('.nocash .value').html('${(global.localplayer.data.card + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.')} $'); $('.cash .value').html('${(global.localplayer.data.cash + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.')} $');`);
		let timer = setInterval(function(){
			if(global.bankIsOpen)
				execute(`$('.nocash .value').html('${(global.localplayer.data.card + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.')} $'); $('.cash .value').html('${(global.localplayer.data.cash + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.')} $');`);
			else
				clearInterval(timer);
		}, 500);
		global.bankIsOpen = true;
		global.player_dont_close_iteraction = true;
	},
	'bank:close': () =>
	{
		global.mainBrowser.execute('all_windows["container-bank"] = false;updateWindows();');
		global.bankIsOpen = false;
		global.player_dont_close_iteraction = false;
		mp.gui.cursor.show(false, false);	
	},
	'bank:getCard': (cash) =>
	{	
		cash = cash.replace(/[\D]/, '');
		cash = cash.replace(/[\D]/, '');
		cash = cash.replace(/[\D]/, '');
		if(global.localplayer.data.cash < parseInt(cash))
			return mp.events.call('SendAlert', 'У вас недостаточно средств', 'red');
		mp.events.callRemote('bank:trans', 0, parseInt(cash));		
	},
	'bank:getCash': (card) =>
	{
		card = card.replace(/[\D]/, '');
		card = card.replace(/[\D]/, '');
		card = card.replace(/[\D]/, '');
		if(global.localplayer.data.card < parseInt(card))
			return mp.events.call('SendAlert', 'У вас недостаточно средств', 'red');
		mp.events.callRemote('bank:trans', 1, parseInt(card));
	},
	'bank:transfer': (playerId, transSum) =>
	{
		transSum = transSum.replace(/[\D]/, '');
		transSum = transSum.replace(/[\D]/, '');
		transSum = transSum.replace(/[\D]/, '');
		if(global.localplayer.data.card < parseInt(transSum))
			return mp.events.call('SendAlert', 'У вас недостаточно средств', 'red');
		mp.events.callRemote('bank:trans', 2, parseInt(transSum), playerId);
	},	
	'bank:payTax': (money) =>
	{
		money = money.replace(/[\D]/, '');
		money = money.replace(/[\D]/, '');
		money = money.replace(/[\D]/, '');
		if(global.localplayer.data.tax < parseInt(money))
			return mp.events.call('SendAlert', 'У вас недостаточно средств', 'red');
		
	},
});