global.homeBrowser = false;
global.homeBrowserIsOpen = false;
let house;
let houseTypes = {
	'1': 'Стандарт',
	'2': 'Стандарт +',
	'3': 'Комфорт', 
	'4': 'Премиум',
	'5': 'Люкс',
	'6': 'Люкс +',
	'7': 'Люкс ++',
	'8': 'Люкс +++',
	'9': 'Вип'
};

mp.events.add({
	'homeInteraction:open': (params) =>
	{
		let info = JSON.parse(params);
		house = info.id;
		global.homeBrowser = mp.browsers.new('package://cef/homes-iteraction/index.html');
		global.homeBrowserIsOpen = true;
		mp.gui.cursor.show(true, true);
		if(info.owner !== mp.players.local.getVariable('sqlID') && info.owner !== -1){
			global.homeBrowser.execute(`$('.select_header').html('Дом ${houseTypes[info.type]} №${info.houseId}');
										$('.first').html('Войти')
										$('.second').html('Постучаться');
										$('.first').on('click', function(){mp.trigger('homeInteraction:enter', ${info.close});});
										$('.second').on('click', function(){mp.trigger('homeInteraction:knockTheDoor');});`);
										
		} else if(info.owner === mp.players.local.getVariable('sqlID')){
			global.homeBrowser.execute(`$('.select_header').html('Дом ${houseTypes[info.type]} №${info.houseId}');
										$('.first').html('Войти');
										$('.second').html('${(info.close ? 'Открыть' : 'Закрыть')}');
										$('.first').on('click', function(){mp.trigger('homeInteraction:enter', ${info.close});});
										$('.second').on('click', function(){mp.trigger('homeInteraction:OpenOrClose');});`);
		} else {
			global.homeBrowser.execute(`$('.select_header').html('Дом ${houseTypes[info.type]} №${info.houseId}');
										$('.first').html('Купить - ${(info.price + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.')} $');
										$('.second').html('Посмотреть');
										$('.first').on('click', function(){$('.modal').addClass('active');});
										$('.second').on('click', function(){mp.trigger('homeInteraction:enter', 0);});`);
		}
	},
	'homeInteraction:enter': (isClose) =>
	{
		if(isClose) return mp.events.call('SendAlert', 'Закрыто', 'red');
		mp.events.callRemote('home:spawnInHome', house);
	},
	'homeInteraction:knockTheDoor': () =>
	{
		mp.events.callRemote('home:knockTheDoor', house);
	},
	'homeInteraction:semiUpdate': (close) =>
	{
		mp.events.call('SendAlert', 'Дом ' + (close ? 'закрыт' : 'открыт'), 'green');
		global.homeBrowser.execute(`$('.second').html('${(close ? 'Открыть' : 'Закрыть')}');
									$('.first').prop("onclick", null).off("click");
									$('.first').on('click', function(){mp.trigger('homeInteraction:enter', ${close});});`);
	},
	'homeInteraction:buyHouse': (type) =>
	{
		mp.events.callRemote('home:buyHouse', house, type);
	},
	'homeInteraction:OpenOrClose': () =>
	{
		mp.events.callRemote('home:openOrClose', house);
	},
	'homeInteraction:close': () =>
	{
		try{
			global.homeBrowser.destroy();
			global.homeBrowser = false;
			global.homeBrowserIsOpen = false;
			house = undefined;
			mp.gui.cursor.show(false, false);
		} catch(e) {}
	},	
});