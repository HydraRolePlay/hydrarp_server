setInterval(function(){updateFib();},1000);
global.fib = [];
global.fib.browserIsOpen = false;
function updateFib() {
	if(!global.fib.browserIsOpen) return;
	mp.events.callRemote('startUpdatingFibBrowser');
};
var lastMyHTML = '';
var FIB_ranks = {
	0: ['Агент FIB', 75000],
	1: ['Старший агент FIB', 90000],
	2: ['Заместитель директора FIB', 300000],
	3: ['Директор FIB', 350000],
};


mp.events.add({
	'showFibBrowser': () => {
		global.fib.browser = mp.browsers.new('package://cef/faction/FIB.html');
		if(global.localplayer.data.faction_rank < 1)
			global.fib.browser.execute("info.setGlava(false);");
		global.fib.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${lastMyHTML}');`);
		global.fib.browser.execute(`$(".second-scroll").niceScroll({
			cursorcolor:"#e7e7e7",
			hidecursordelay: 550,
			cursorfixedheight: 118,
			cursorwidth: "24px",
			horizrailenabled: false
		});`);
		global.fib.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		global.fib.browserIsOpen = true;
		mp.gui.cursor.show(true, true);
	},
	'FIB:findPlayerData': (player_id) => {
		if(!global.fib.browserIsOpen) return;
		mp.events.callRemote('fib:findPlayer', player_id);
	},
	'FIB:updateBase': (data) => {
		if(!global.fib.browserIsOpen) return;
		data = JSON.parse(data);
		if(data['notFound'])
			global.fib.browser.execute(`$('.base-info').html(''); 
										   $('.base-info').append('Игрок не найден');`);
		else{
			let html = '<img src="img/photo.png" class="base-photo">' +
						'<div>' +
							'<p class="base-id">ID: ' + data.id + '</p>' + 
							'<p class="base-name">' + data.name + '</p>' +
							'<p class="fraction-title">Фракция</p>' +
							'<p class="fraction-desc">' + data.faction + '</p>' +
						'</div>'
			global.fib.browser.execute(`$('.base-info').html(''); 
										   $('.base-info').append('${html}');`);
			global.fib.browser.execute(`$('.last-arrest .arrest-desc').html(''); 
										   $('.last-arrest .arrest-desc').append('${(data.lastArrest ? data.lastArrest : 'нет')}');
										   $('.reason-arrest .arrest-desc').html(''); 
										   $('.reason-arrest .arrest-desc').append('${(data.reason ? data.reason : 'нет')}');`);
		}
	},
	'FIB:updatePlayerInfo': (data) => {
		if(!global.fib.browserIsOpen) return;
		data = JSON.parse(data);
		let html = '<p class="info-id">ID: ' + data.id + '</p>' + 
				   '<p class="info-nick">' + global.localplayer.data.nickname + '</p>' +
				   '<p class="lvl-title">Уровень</p>' +
				   '<p class="lvl-desc">' + data.level + '</p>' +
				   '<p class="rank-title">Ранг</p>' + 
				   '<p class="rank-desc">' + FIB_ranks[data.rank][0] + '</p>'
		global.fib.browser.execute(`$('.info-text').html(''); 
									   $('.info-text').append('${html}');`);
	},
	'FIB:wantedLevel': (data) => {
		if(!global.fib.browserIsOpen) return;
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
		global.fib.browser.execute(`$('.wanted-list').html(''); 
									   $('.wanted-list').append('${html}');`);
		global.fib.browser.execute(`$(".second-scroll").niceScroll({
			cursorcolor:"#e7e7e7",
			hidecursordelay: 550,
			cursorfixedheight: 118,
			cursorwidth: "24px",
			horizrailenabled: false
		});`);
	},
	'FIB:addPlayer': (player_id, status) => {
		if(!global.fib.browserIsOpen) return;
		if(status === 'Уволить')
		{
			mp.events.callRemote('fib:deletePlayer', player_id);
		}else{
			mp.events.callRemote('fib:addPlayer', player_id);
		}
	},
	'FIB:bustUpPlayer': (player_id) => {
		if(!global.fib.browserIsOpen) return;
		mp.events.callRemote('fib:bustUpPlayer', player_id);		
	},
	'FIB:bustDownPlayer': (player_id) => {
		if(!global.fib.browserIsOpen) return;
		mp.events.callRemote('fib:bustDownPlayer', player_id);		
	},
	'FIB:updateWorkerList': (answer) => {
		if(!global.fib.browserIsOpen) return;
		answer = JSON.parse(answer);
		let newHTML = '';
		for(let i=0; i<answer.length; i++)
			newHTML += '<li class="worker">' +
							'<p class="worker-id">ID: ' + answer[i].id + '</p>' + 
							'<div class="worker-info">' + 
								'<p class="nick">' + answer[i].nick + '</p>' + 
								'<p class="worker-rank">' + (answer[i].rank === -1 ? 'Не работает' : (answer[i].rank === -2 ? 'Работает' : FIB_ranks[answer[i].rank][0])) + '</p>' + 
								'<div class="uniform-slider"><div class="slider slider3"><div class="sliderContent">' + 
									'<div class="item">' +
										'<button class="btn btn-mini btn-mini-lspd" onclick="mp.trigger(`FIB:bustUpPlayer`, ' + answer[i].id + ')">' + 
											'<span class="white-text">' +
												'<span class="btn-text-lspd">Повысить</span>' +
											'</span>' +
										'</button>' +
									'</div>' + 
									'<div class="item">' +
										'<button class="btn btn-mini btn-mini-lspd" onclick="mp.trigger(`FIB:bustDownPlayer`, ' + answer[i].id + ')">' + 
											'<span class="white-text">' +
												'<span class="btn-text-lspd">Понизить</span>' +
											'</span>' +
										'</button>' +
									'</div>' + 
								'</div></div></div>' +
								'<div class="work-slider"><div class="slider slider3"><div class="sliderContent">' +
									'<div class="item">' +
										'<button class="btn btn-mini btn-mini-lspd btn-mini-white" onclick="mp.trigger(`FIB:addPlayer`, ' + answer[i].id + ', `' + (answer[i].work ? 'Уволить' : 'Нанять') + '`)">' + 
											'<span>' + (answer[i].work ? 'Уволить' : 'Нанять') + '</span>' +
										'</button>' +
									'</div>' + 
								'</div></div></div>' +
							'</div>' +						
						'</li>'
		if(lastMyHTML !== newHTML){ 
			global.fib.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${newHTML}');`);
			global.fib.browser.execute(`$(".second-scroll").niceScroll({
				cursorcolor:"#e7e7e7",
				hidecursordelay: 550,
				cursorfixedheight: 118,
				cursorwidth: "24px",
				horizrailenabled: false
			});`);
			global.fib.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		}
		lastMyHTML = newHTML;
	},
	'closeFibBrowser': () => {
		mp.gui.cursor.show(false, false);
		global.fib.browserIsOpen = false;
		global.fib.browser.destroy();
	},
	'FIB:setnewrank': (rank) => {
		global.localplayer.data.faction_rank = rank;
		if(global.fib.browserIsOpen){
			global.fib.browserIsOpen = true;
			global.fib.browser.destroy();
			global.fib.browser = mp.browsers.new('package://cef/ambandlspd/FIB.html');
			if(global.localplayer.data.faction_rank < 1)
				global.fib.browser.execute("info.setGlava(false);");
			global.fib.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${lastMyHTML}');`);
			global.fib.browser.execute(`$(".second-scroll").niceScroll({
				cursorcolor:"#e7e7e7",
				hidecursordelay: 550,
				cursorfixedheight: 118,
				cursorwidth: "24px",
				horizrailenabled: false
			});`);
			global.fib.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		}
		global.localplayer.data.faction = 'FIB';
		global.hud.execute(`interactionWithPlayer.pol=true`);
	},
	'FIB:setworkFalse': () => {
		if(global.fib.browserIsOpen){
			mp.gui.cursor.show(false, false);
			global.fib.browserIsOpen = false;
			global.fib.browser.destroy();
		}
		global.localplayer.data.faction = 'None';
		global.hud.execute(`interactionWithPlayer.pol=false`);
	},
});