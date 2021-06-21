setInterval(function(){updatePolice();},1000);
global.police = [];
global.police.browserIsOpen = false;
function updatePolice() {
	if(!global.police.browserIsOpen) return;
	mp.events.callRemote('startUpdatingPoliceBrowser');
};
var lastMyHTML = '';
global.attached = false;

var POLICE_ranks = {
	0: ['Рядовой', 10000],
	1: ['Офицер', 20000],
	2: ['Капитан', 50000],
	3: ['Шеф', 100000]
};
global.policeArrest = false;


mp.events.add({
	'showPoliceBrowser': () => {
		global.police.browser = mp.browsers.new('package://cef/faction/lspd.html');
		if(global.localplayer.data.faction_rank < 2)
			global.police.browser.execute("info.setGlava(false);");
		global.police.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${lastMyHTML}');`);
		global.police.browser.execute(`$(".second-scroll").niceScroll({
			cursorcolor:"#e7e7e7",
			hidecursordelay: 550,
			cursorfixedheight: 118,
			cursorwidth: "24px",
			horizrailenabled: false
		});`);
		global.police.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		global.police.browserIsOpen = true;
		mp.gui.cursor.show(true, true);
	},
	'POLICE:attachToPlayer': (player_id, attached) => {
		
		if(attached){
			global.iteractionWithItems = false;
		}
		if(!global.attached){
			let police = mp.players.atRemoteId(player_id);
			let pos = police.position;
			global.policeArrest = player_id;
			mp.players.local.clearTasks();
			setTimeout(function(){
				mp.players.local.taskFollowToOffsetOf(police.handle, 1, 1, 1, 1, -1, 1, true);
			}, 300);
			global.attached = attached;
			mp.events.call('SendAlert', 'Вы задержаны', 'red');
		} else {
			global.policeArrest = false;
			mp.players.local.clearTasks();
			global.attached = attached;
			mp.events.call('SendAlert', 'Вас отпустили', 'green');
		}
	},
	'POLICE:setJail': (time) => {
		mp.players.local.clearTasks();
		global.player_dont_close_iteraction = true;
		global.policeArrest = true;
		global.attached = true;
		mp.events.call('TimeOutAlert', 'Тюрьма', 'Вы задержаны', parseInt(time)*60);
	},
	'POLICE:releaseJail': () => {
		global.attached = false;
		global.policeArrest = false;
		global.player_dont_close_iteraction = false;
		mp.gui.cursor.show(false, false);
		mp.events.call('SendAlert', 'Вас отпустили', 'green');
	},
	'POLICE:findPlayerData': (player_id) => {
		if(!global.police.browserIsOpen) return;
		mp.events.callRemote('police:findPlayer', player_id);
	},
	'POLICE:updateBase': (data) => {
		if(!global.police.browserIsOpen) return;
		data = JSON.parse(data);
		if(data['notFound'])
			global.police.browser.execute(`$('.base-info').html(''); 
										   $('.base-info').append('Игрок не найден');`);
		else{
			let html = '<img src="img/photo.png" class="base-photo">' +
						'<div>' +
							'<p class="base-id">ID: ' + data.id + '</p>' + 
							'<p class="base-name">' + data.name + '</p>' +
							'<p class="fraction-title">Фракция</p>' +
							'<p class="fraction-desc">' + data.faction + '</p>' +
						'</div>'
			global.police.browser.execute(`$('.base-info').html(''); 
										   $('.base-info').append('${html}');`);
			global.police.browser.execute(`$('.last-arrest .arrest-desc').html(''); 
										   $('.last-arrest .arrest-desc').append('${(data.lastArrest ? data.lastArrest : 'нет')}');
										   $('.reason-arrest .arrest-desc').html(''); 
										   $('.reason-arrest .arrest-desc').append('${(data.reason ? data.reason : 'нет')}');`);
		}
	},
	'POLICE:updatePlayerInfo': (data) => {
		if(!global.police.browserIsOpen) return;
		data = JSON.parse(data);
		let html = '<p class="info-id">ID: ' + data.id + '</p>' + 
				   '<p class="info-nick">' + global.localplayer.data.nickname + '</p>' +
				   '<p class="lvl-title">Уровень</p>' +
				   '<p class="lvl-desc">' + data.level + '</p>' +
				   '<p class="rank-title">Ранг</p>' + 
				   '<p class="rank-desc">' + POLICE_ranks[data.rank][0] + '</p>'
		global.police.browser.execute(`$('.info-text').html(''); 
									   $('.info-text').append('${html}');`);
	},
	'POLICE:wantedLevel': (data) => {
		if(!global.police.browserIsOpen) return;
		data = JSON.parse(data);
		let html = '';
		for(let i=0; i<data.length; i++)
			html += '<li class="wanted-item">' +
						'<div class="wanted-info">' +
							'<p class="wanted-id">ID: ' + String(data[i].id) + '</p>' +
							'<p class="wanted-nick">' + String(data[i].nick) + '</p>' +
						'</div>' +
						'<div class="wanted-level">' + 
							'<p class="level-title">Уровень розыска</p>' +
							'<p class="level">' + String(data[i].wantedLevel) + '</p>' +
						'</div>' +
					'</li>'
		global.police.browser.execute(`$('.wanted-list').html(''); 
									   $('.wanted-list').append('${html}');`);
		global.police.browser.execute(`$(".second-scroll").niceScroll({
			cursorcolor:"#e7e7e7",
			hidecursordelay: 550,
			cursorfixedheight: 118,
			cursorwidth: "24px",
			horizrailenabled: false
		});`);
	},
	'POLICE:calls': (data) => {
		if(!global.police.browserIsOpen) return;
		data = JSON.parse(data);
		let html = '';
		for(var i=0; i < data.length; i++){
			if(i > 8) break;
			html += '<div class="call">' +
						'<div class="call-text">' +
							'<p class="call-from">Вызов от</p>' +
							'<p class="nick">' + data[i].name + '</p>' +
							'<p class="call-dist">' + String(data[i].dist.toFixed()) + ' м</p>' + 
						'</div>' + 
						'<button class="btn btn-police" onclick="mp.trigger(`POLICE:newCall`,' + data[i].id + ');">' +
							'<span class="btn-check btn-check-white">Принять</span>' +
						'</button>' +
					'</div>'
		}
		global.police.browser.execute(`$('.calls-wrapper').html('');
									   $('.calls-wrapper').append('${html}');`);
	},
	'POLICE:newCall': (player_id) => {
		mp.gui.cursor.show(false, false);
		global.police.browserIsOpen = false;
		global.police.browser.destroy();
		mp.events.call('SendAlert', 'Помогите игроку ' + player_id + '. Метка к нему установлена!', 'blue');
		mp.events.callRemote('police:acceptCall', player_id);
	},
	'POLICE:addPlayer': (player_id, status) => {
		if(!global.police.browserIsOpen) return;
		if(status === 'Уволить')
		{
			mp.events.callRemote('police:deletePlayer', player_id);
		}else{
			mp.events.callRemote('police:addPlayer', player_id);
		}
	},
	'POLICE:bustUpPlayer': (player_id) => {
		if(!global.police.browserIsOpen) return;
		mp.events.callRemote('police:bustUpPlayer', player_id);		
	},
	'POLICE:bustDownPlayer': (player_id) => {
		if(!global.police.browserIsOpen) return;
		mp.events.callRemote('police:bustDownPlayer', player_id);		
	},
	'POLICE:updateWorkerList': (answer) => {
		if(!global.police.browserIsOpen) return;
		answer = JSON.parse(answer);
		let newHTML = '';
		for(let i=0; i<answer.length; i++)
			newHTML += '<li class="worker">' +
							'<p class="worker-id">ID: ' + answer[i].id + '</p>' + 
							'<div class="worker-info">' + 
								'<p class="nick">' + answer[i].nick + '</p>' + 
								'<p class="worker-rank">' + (answer[i].rank === -1 ? 'Не работает' : (answer[i].rank === -2 ? 'Работает' : POLICE_ranks[answer[i].rank][0])) + '</p>' + 
								'<div class="uniform-slider"><div class="slider slider3"><div class="sliderContent">' + 
									'<div class="item">' +
										'<button class="btn btn-mini btn-mini-lspd" onclick="mp.trigger(`POLICE:bustUpPlayer`, ' + answer[i].id + ')">' + 
											'<span class="white-text">' +
												'<span class="btn-text-lspd">Повысить</span>' +
											'</span>' +
										'</button>' +
									'</div>' + 
									'<div class="item">' +
										'<button class="btn btn-mini btn-mini-lspd" onclick="mp.trigger(`POLICE:bustDownPlayer`, ' + answer[i].id + ')">' + 
											'<span class="white-text">' +
												'<span class="btn-text-lspd">Понизить</span>' +
											'</span>' +
										'</button>' +
									'</div>' + 
								'</div></div></div>' +
								'<div class="work-slider"><div class="slider slider3"><div class="sliderContent">' +
									'<div class="item">' +
										'<button class="btn btn-mini btn-mini-lspd btn-mini-white" onclick="mp.trigger(`POLICE:addPlayer`, ' + answer[i].id + ', `' + (answer[i].work ? 'Уволить' : 'Нанять') + '`)">' + 
											'<span>' + (answer[i].work ? 'Уволить' : 'Нанять') + '</span>' +
										'</button>' +
									'</div>' + 
								'</div></div></div>' +
							'</div>' +						
						'</li>'
		if(lastMyHTML !== newHTML){ 
			global.police.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${newHTML}');`);
			global.police.browser.execute(`$(".second-scroll").niceScroll({
				cursorcolor:"#e7e7e7",
				hidecursordelay: 550,
				cursorfixedheight: 118,
				cursorwidth: "24px",
				horizrailenabled: false
			});`);
			global.police.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		}
		lastMyHTML = newHTML;
	},
	'closePoliceBrowser': () => {
		mp.gui.cursor.show(false, false);
		global.police.browserIsOpen = false;
		global.police.browser.destroy();
	},
	'POLICE:setnewrank': (rank) => {
		global.localplayer.data.faction_rank = rank;
		if(global.police.browserIsOpen){
			global.police.browserIsOpen = true;
			global.police.browser.destroy();
			global.police.browser = mp.browsers.new('package://cef/ambandlspd/lspd.html');
			if(global.localplayer.data.faction_rank < 2)
				global.police.browser.execute("info.setGlava(false);");
			global.police.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${lastMyHTML}');`);
			global.police.browser.execute(`$(".second-scroll").niceScroll({
				cursorcolor:"#e7e7e7",
				hidecursordelay: 550,
				cursorfixedheight: 118,
				cursorwidth: "24px",
				horizrailenabled: false
			});`);
			global.police.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		}
		global.localplayer.data.faction = 'Police';
		global.hud.execute(`interactionWithPlayer.pol=${(global.localplayer.data.faction === 'Police' ? true : false)}`);
	},
	'POLICE:setworkFalse': () => {
		if(global.police.browserIsOpen){
			mp.gui.cursor.show(false, false);
			global.police.browserIsOpen = false;
			global.police.browser.destroy();
		}
		global.localplayer.data.faction = 'None';
		global.hud.execute(`interactionWithPlayer.pol=${(global.localplayer.data.faction === 'Police' ? true : false)}`);
	},
});