setInterval(function(){updateAmb();},1000);

function updateAmb() {
	if(!global.ambulance.browserIsOpen) return;
	mp.events.callRemote('startUpdatingAnotherAmb');
};
var lastMyHTML = '';

mp.events.add({
	'showAmbulanceBrowser': () => {
		global.ambulance.browser = mp.browsers.new('package://cef/faction/index.html');
		global.ambulance.browser.execute("info.setShow(true)");
		if(global.localplayer.data.faction_rank < 2)
			global.ambulance.browser.execute("info.setGlava(false);");
		global.ambulance.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${lastMyHTML}');`);
		global.ambulance.browser.execute(`$('.slider3').mobilyslider({
			transition: 'fade',
			animationSpeed: 300,
			bullets: false,
			arrows: true,
			arrowsHide: false
		});`);
		global.ambulance.browserIsOpen = true;
		mp.gui.cursor.show(true, true);
	},
	'UpdateDiedPlayers': (answer) => {
		if(!global.ambulance.browserIsOpen) return;
		global.ambulance.browser.execute(`info.dataDiedPlayers = ${answer}`);
		global.ambulance.browser.execute(`info.setPlayersDieData(${answer})`);
	},
	'EMC:sendNews': (msg) => {
		if(!global.ambulance.browserIsOpen) return;
		mp.events.callRemote('emc:addNews', msg);
	},
	'EMC:addPlayer': (player_id, status) => {
		if(!global.ambulance.browserIsOpen) return;
		if(status === 'Уволить')
		{
			mp.events.callRemote('emc:deletePlayer', player_id);
		}else{
			mp.events.callRemote('emc:addPlayer', player_id);
		}
	},
	'UpdateNewsBox': (answer) => {
		if(!global.ambulance.browserIsOpen) return;
		answer = JSON.parse(answer);
		let newHTML = '';
		for(let i=answer.length - 1; i>=0; i--)
			newHTML += '<div class="news-item">' +
							'<div class="news-left">' +
								'<p class="nick">' + answer[i].name + '</p>' + 
								'<p class="news-date">' + answer[i].date + '</p>' +
							'</div>' +
							'<p class="news-text">' + answer[i].text.replace('\n', '<br>').replace('\ '.replace(' ', ''), '') + '</p>' +
						'</div>'
		global.ambulance.browser.execute(`$('.news-box').html(''); $('.news-box').append('${newHTML}');`);
	},
	'EMC:bustUpPlayer': (player_id) => {
		if(!global.ambulance.browserIsOpen) return;
		mp.events.callRemote('emc:bustUpPlayer', player_id);		
	},
	'EMC:bustDownPlayer': (player_id) => {
		if(!global.ambulance.browserIsOpen) return;
		mp.events.callRemote('emc:bustDownPlayer', player_id);		
	},
	'UpdatePlayersList': (answer) => {
		if(!global.ambulance.browserIsOpen) return;
		let EMC_ranks = {
			0: ['Стажер', 10000],
			1: ['Врач', 15000],
			2: ['Заведующий', 30000],
			3: ['Глав. врач', 100000]
		};
		answer = JSON.parse(answer);
		let newHTML = '';
		for(let i=0; i<answer.length; i++)
			newHTML += '<li class="worker">' +
							'<p class="worker-id">ID: ' + answer[i].id + '</p>' + 
							'<div class="worker-info">' + 
								'<p class="nick">' + answer[i].nick + '</p>' + 
								'<p class="worker-rank">' + (answer[i].rank === -1 ? 'Не работает' : (answer[i].rank === -2 ? 'Работает' : EMC_ranks[answer[i].rank][0])) + '</p>' + 
								'<div class="uniform-slider"><div class="slider slider3"><div class="sliderContent">' + 
									'<div class="item">' +
										'<button class="btn btn-mini" onclick="mp.trigger(`EMC:bustUpPlayer`, ' + answer[i].id + ')">' + 
											'<span class="white-text">' +
												'<span class="btn-text-gradient">Повысить</span>' +
											'</span>' +
										'</button>' +
									'</div>' + 
									'<div class="item">' +
										'<button class="btn btn-mini" onclick="mp.trigger(`EMC:bustDownPlayer`, ' + answer[i].id + ')">' + 
											'<span class="white-text">' +
												'<span class="btn-text-gradient">Понизить</span>' +
											'</span>' +
										'</button>' +
									'</div>' + 
								'</div></div></div>' +
								'<div class="work-slider"><div class="slider slider3"><div class="sliderContent">' +
									'<div class="item">' +
										'<button class="btn btn-mini btn-mini-white" onclick="mp.trigger(`EMC:addPlayer`, ' + answer[i].id + ', `' + (answer[i].work ? 'Уволить' : 'Нанять') + '`)">' + 
											'<span>' + (answer[i].work ? 'Уволить' : 'Нанять') + '</span>' +
										'</button>' +
									'</div>' + 
								'</div></div></div>' +
							'</div>' +						
						'</li>'
		if(lastMyHTML !== newHTML){ 
			global.ambulance.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${newHTML}');`);
			global.ambulance.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		}
		lastMyHTML = newHTML;
	},
	'closeAmbulanceBrowser': () => {
		mp.gui.cursor.show(false, false);
		global.ambulance.browserIsOpen = false;
		global.ambulance.browser.destroy();
	},
	'EMC:setmedic': (rank) => {
		global.localplayer.data.faction_rank = rank;
		if(global.ambulance.browserIsOpen){
			global.ambulance.browserIsOpen = true;
			global.ambulance.browser.destroy();
			global.ambulance.browser = mp.browsers.new('package://cef/ambandlspd/index.html');
			global.ambulance.browser.execute("info.setShow(true)");
			if(global.localplayer.data.faction_rank < 2)
				global.ambulance.browser.execute("info.setGlava(false);");
			global.ambulance.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${lastMyHTML}');`);
			global.ambulance.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		}
		global.localplayer.data.faction = 'EMC';
		global.hud.execute(`interactionWithPlayer.medic=${(global.localplayer.data.faction === 'EMC' ? true : false)}`);
	},
	'EMC:setmedicFalse': () => {
		if(global.ambulance.browserIsOpen){
			mp.gui.cursor.show(false, false);
			global.ambulance.browserIsOpen = false;
			global.ambulance.browser.destroy();
		}
		global.localplayer.data.faction = 'None';
		global.hud.execute(`interactionWithPlayer.medic=${(global.localplayer.data.faction === 'EMC' ? true : false)}`);
	},
	'TakeNewOrder': (player_id, player_name) => {
		mp.gui.cursor.show(false, false);
		global.ambulance.browserIsOpen = false;
		global.ambulance.browser.destroy();
		mp.events.call('SendAlert', 'Вылечите игрока ' + player_name + '. Метка к нему установлена!', 'green');
		mp.events.callRemote('setAmbBlip', player_id);
	}
});