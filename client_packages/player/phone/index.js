/*
	iPhone
	1) Contacts
	2) Message
	3) Settings
	4) Carshering
	5) Works
*/

global.car = {};
var payCost = [
	150,
	500,
	3000
];
setInterval(function(){payForCar();},60000);

function payForCar() {
	if(global.car.model === undefined) return;
	if(global.car.model !== undefined && !global.car.sitDownCar)
	{
		if(global.car.min === undefined)
			global.car.min = 0;
		else
			global.car.min += 1;
		if(global.car.min > 4)
		{
			mp.events.callRemote('carsharing:deleteKeys', global.car.model.remoteId);
			smth = {
				"owner": null,
				"engine": false,
				"vehDoors": true,
			};
			mp.events.callRemote('setCarVariable', global.car.model.remoteId, JSON.stringify(smth));
			global.car = [];
			mp.events.call('SendAlert', 'Аренда закончилась. Вы не сели вовремя', 'red');
		}
		return;
	}
	let player = mp.players.local;
	let veh = mp.vehicles.atRemoteId(global.car.model.remoteId);
	if(global.localplayer.data.cash < payCost[global.localplayer.data.level]){
		mp.events.callRemote('carsharing:deleteKeys', global.car.model.remoteId);
		smth = {
			"owner": null,
			"engine": false,
			"vehDoors": true,
		};
		mp.events.callRemote('setCarVariable', veh.remoteId, JSON.stringify(smth));
		global.car = [];
		mp.events.call('SendAlert', 'Аренда закончилась. У Вас нехватает денег на счету', 'red');
		return
	}
	mp.events.callRemote('buyThingsInTheShop', payCost[global.localplayer.data.level], 0);
};

function openClosePhone() {
	if(global.PlayerPhone.browsIsOpen){
		global.PlayerPhone.browsIsOpen = false;
		mp.gui.cursor.show(false, false);
		global.PlayerPhone.browser.execute('$(".mobile").css("bottom", "-70%")');
		global.mainBrowser.execute('all_windows["container-phone"] = false;updateWindows();');
	} else {
		global.PlayerPhone.browser.execute('$(".mobile").css("bottom", "5%")');
		global.mainBrowser.execute('all_windows["container-phone"] = true;updateWindows();');
		mp.gui.cursor.show(true, true);
		global.PlayerPhone.browsIsOpen = true;
	}
}

mp.keys.bind(global.Keys.VK_UP, true, function() {
	if(mp.gui.cursor.visible && !global.PlayerPhone.browsIsOpen) return;
	if(global.policeArrest) return;
	if(global.PlayerPhone.browsIsOpen){
		global.PlayerPhone.browsIsOpen = false;
		mp.gui.cursor.show(false, false);
		global.PlayerPhone.browser.execute('$(".mobile").css("bottom", "-70%")');
		global.mainBrowser.execute('all_windows["container-phone"] = false;updateWindows();');
	} else {
		mp.gui.cursor.show(true, true);
		global.PlayerPhone.browser.execute('$(".mobile").css("bottom", "5%")');
		global.mainBrowser.execute('all_windows["container-phone"] = true;updateWindows();');
		global.PlayerPhone.browsIsOpen = true;
	}
});
let apps = {
	'caller': 'phone:refreshCaller',
	'messenger': 'phone:refreshMessenger',
	'settings': 'phone:refreshSettings',
	'carsharing': 'phone:refreshCarsharing',
	'case': 'phone:refreshCase',
	'biz': 'phone:showBiz',
	//other
}
mp.events.add({
	"phone:openApp": (app) => {
		mp.events.call(apps[app]);
	},
	'phone:showBiz': () =>
	{
		global.PlayerPhone.browser.execute("$('.biz_list.biz_b_target').html('');")
		mp.events.callRemote('getAllFreeBiz');
	},
	'phone:addBiz': (data) =>
	{
		global.PlayerPhone.browser.execute("$('.biz_list.biz_b_target').html('');")
		let html = '';
		data = JSON.parse(data);
		for(let i in data){
			let biz = data[i];
			if(JSON.stringify(biz).length !== 2)
				html += '<div class="biz_list__option buy">' +
							'<div class="model">' + biz.name + '</div>' +
							'<div class="tuning">Государство: <span>Да</span></div>' +
							'<div class="price">' + biz.price + ' $</div>' +
							'<div class="submit" onclick="mp.trigger(`biz:buy`, ' + biz.id + ')">Купить</div>' +
						'</div>'
		}
		global.PlayerPhone.browser.execute("$('.biz_list.biz_b_target').append('" + html + "');")
		global.PlayerPhone.browser.execute(`
			$('.biz_list__option').on('click', (e) => {
				if (!$(e.currentTarget).hasClass('active')) {
					$('.biz_list__option').removeClass('active')
					$(e.currentTarget).addClass('active')
				}
			})
		`);
	},
	'biz:buy': (id) => {
		mp.events.callRemote('biz:buy', id);
	},
	"phone:refreshCaller": () => {
		let html = '';
		let PlayerPhones_and_name = [];
		global.PlayerPhone.browser.execute("$('ul.caller_list__list').html('');")
		mp.players.forEach(
			(pl) => 
			{
				if(global.playerFriends.indexOf(pl.getVariable('sqlID')) !== -1)
					PlayerPhones_and_name.push([pl.getVariable('phone'), pl.getVariable('nick')]);
			}
		);
		for(let i=0; i < PlayerPhones_and_name.length; i++)
			html += '<li class="caller_list__item">' +
                        '<div>' +
							'<span class="number">&ensp;' + PlayerPhones_and_name[i][0] + '</span>' +
                            '<span class="divider"> | </span>' +
                            '<span class="name">' + PlayerPhones_and_name[i][1] + '</span>' +
                        '</div>' +
                    '</li>'
		global.PlayerPhone.browser.execute("$('ul.caller_list__list').append('" + html + "');");
	},
	"phone:refreshMessenger": () => {
		let html = '';
		let PlayerPhones_and_name = [];
		global.PlayerPhone.browser.execute("$('ul.messenger_list__list').html('');")
		mp.players.forEach(
			(pl) => 
			{
				if(global.playerFriends.indexOf(pl.getVariable('sqlID')) !== -1)
					PlayerPhones_and_name.push([pl.getVariable('phone'), pl.getVariable('nick')]);
			}
		);
		for(let i=0; i < PlayerPhones_and_name.length; i++)
			html += '<li class="messenger_list__item">' +
                        '<div>' +
							'<span class="number">&ensp;' + PlayerPhones_and_name[0] + '</span>' +
                            '<span class="divider"> | </span>' +
                            '<span class="name">' + PlayerPhones_and_name[1] + '</span>' +
                        '</div>' +
                    '</li>'
		global.PlayerPhone.browser.execute("$('ul.messenger_list__list').append('" + html + "');");
	},
	"phone:refreshCarsharing": () => {
		global.PlayerPhone.browser.execute("$('.carsharing_price').html('');");
		let html = '<span>Стоимость:</span>' +
				   '<span>' + payCost[global.localplayer.data.level] + ' $/мин</span>'
				   
		global.PlayerPhone.browser.execute("$('.carsharing_price').append('" + html + "');");
		global.PlayerPhone.browser.execute("$('.carsharing_submit').on('click', function(){mp.trigger(`phone:carsharingFound`)});");
	},
	"phone:carsharingFound": () => {
		openClosePhone();
		let needVeh = [];
		let player = mp.players.local;
		if(global.car.model !== undefined)
		{
			let veh = mp.vehicles.atRemoteId(global.car.model.remoteId);
			if(mp.players.local.vehicle && mp.players.local.vehicle.remoteId === veh.remoteId)
				return mp.events.call('SendAlert', 'Выйдите из уже арендованной машины, чтобы найти другую', 'red');
			mp.events.callRemote('carsharing:deleteKeys', global.car.model.remoteId);
			smth = {
				"owner": null,
				"engine": false,
				"vehDoors": true,
			};
			mp.events.callRemote('setCarVariable', veh.remoteId, JSON.stringify(smth));
			global.car = [];
		}
		mp.events.callRemote('phone:vehFound', global.localplayer.data.level);
		
	},
	"phone:carsharingCar": (needVeh) => {
		let goodVeh = mp.vehicles.atRemoteId(needVeh);
		mp.events.call('SendAlert', 'Найдена машина - ' + goodVeh.getVariable('name'), 'green');
		let semiProduct = {id: 68, weight: 0.1, model: "p_car_keys_01", description: "Ключи от арендованной машины", entity: goodVeh.getVariable('keys'), putOff: 1, count: 1, maxCount: 1};
		mp.events.callRemote('items:buyItemsInShop', JSON.stringify(semiProduct));
		global.car.model = goodVeh;
		global.car.sitDownCar = false; 
		let smthCar = {
			"owner": mp.players.local.remoteId,
		};
		mp.events.callRemote('setCarVariable', needVeh, JSON.stringify(smthCar));
		mp.events.callRemote('phone:vehPoint', needVeh);	
	},
	'phone:destroyLastCarKeys': () =>
	{
		if(global.car.model === undefined) return;
		mp.events.callRemote('carsharing:deleteKeys', global.car.model.remoteId);
		smth = {
			"owner": null,
			"engine": false,
			"vehDoors": true,
		};
		mp.events.callRemote('setCarVariable', global.car.model.remoteId, JSON.stringify(smth));
		global.car = [];
	}
});