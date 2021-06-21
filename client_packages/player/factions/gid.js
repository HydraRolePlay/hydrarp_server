setInterval(function(){updateGid();},1000);
global.gid = [];
global.gid.browserIsOpen = false;
function updateGid() {
	if(!global.gid.browserIsOpen) return;
	mp.events.callRemote('startUpdatingGidBrowser');
};
var lastMyHTML = '';
var GID_ranks = {
	0: ['Агент GIDRALEX', 75000],
	1: ['Старший агент GIDRALEX', 90000],
	2: ['Заместитель директора GIDRALEX', 300000],
	3: ['Директор GIDRALEX', 350000],
};


mp.events.add({
	'showGidBrowser': () => {
		global.gid.browser = mp.browsers.new('package://cef/faction/GID.html');
		if(global.localplayer.data.faction_rank < 1)
			global.gid.browser.execute("info.setGlava(false);");
		global.gid.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${lastMyHTML}');`);
		global.gid.browser.execute(`$(".second-scroll").niceScroll({
			cursorcolor:"#e7e7e7",
			hidecursordelay: 550,
			cursorfixedheight: 118,
			cursorwidth: "24px",
			horizrailenabled: false
		});`);
		global.gid.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		global.gid.browserIsOpen = true;
		mp.gui.cursor.show(true, true);
	},
	'GID:findPlayerData': (player_id) => {
		if(!global.gid.browserIsOpen) return;
		mp.events.callRemote('gid:findPlayer', player_id);
	},
	'GID:updateBase': (data) => {
		if(!global.gid.browserIsOpen) return;
		data = JSON.parse(data);
		if(data['notFound'])
			global.gid.browser.execute(`$('.base-info').html(''); 
										   $('.base-info').append('Игрок не найден');`);
		else{
			let html = '<img src="img/photo.png" class="base-photo">' +
						'<div>' +
							'<p class="base-id">ID: ' + data.id + '</p>' + 
							'<p class="base-name">' + data.name + '</p>' +
							'<p class="fraction-title">Фракция</p>' +
							'<p class="fraction-desc">' + data.faction + '</p>' +
						'</div>'
			global.gid.browser.execute(`$('.base-info').html(''); 
										   $('.base-info').append('${html}');`);
			global.gid.browser.execute(`$('.last-arrest .arrest-desc').html(''); 
										   $('.last-arrest .arrest-desc').append('${(data.lastArrest ? data.lastArrest : 'нет')}');
										   $('.reason-arrest .arrest-desc').html(''); 
										   $('.reason-arrest .arrest-desc').append('${(data.reason ? data.reason : 'нет')}');`);
		}
	},
	'GID:updatePlayerInfo': (data) => {
		if(!global.gid.browserIsOpen) return;
		data = JSON.parse(data);
		let html = '<p class="info-id">ID: ' + data.id + '</p>' + 
				   '<p class="info-nick">' + global.localplayer.data.nickname + '</p>' +
				   '<p class="lvl-title">Уровень</p>' +
				   '<p class="lvl-desc">' + data.level + '</p>' +
				   '<p class="rank-title">Ранг</p>' + 
				   '<p class="rank-desc">' + GID_ranks[data.rank][0] + '</p>'
		global.gid.browser.execute(`$('.info-text').html(''); 
									   $('.info-text').append('${html}');`);
	},
	'GID:wantedLevel': (data) => {
		if(!global.gid.browserIsOpen) return;
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
		global.gid.browser.execute(`$('.wanted-list').html(''); 
									   $('.wanted-list').append('${html}');`);
		global.gid.browser.execute(`$(".second-scroll").niceScroll({
			cursorcolor:"#e7e7e7",
			hidecursordelay: 550,
			cursorfixedheight: 118,
			cursorwidth: "24px",
			horizrailenabled: false
		});`);
	},
	'GID:addPlayer': (player_id, status) => {
		if(!global.gid.browserIsOpen) return;
		if(status === 'Уволить')
		{
			mp.events.callRemote('gid:deletePlayer', player_id);
		}else{
			mp.events.callRemote('gid:addPlayer', player_id);
		}
	},
	'GID:bustUpPlayer': (player_id) => {
		if(!global.gid.browserIsOpen) return;
		mp.events.callRemote('gid:bustUpPlayer', player_id);		
	},
	'GID:bustDownPlayer': (player_id) => {
		if(!global.gid.browserIsOpen) return;
		mp.events.callRemote('gid:bustDownPlayer', player_id);		
	},
	'GID:updateWorkerList': (answer) => {
		if(!global.gid.browserIsOpen) return;
		answer = JSON.parse(answer);
		let newHTML = '';
		for(let i=0; i<answer.length; i++)
			newHTML += '<li class="worker">' +
							'<p class="worker-id">ID: ' + answer[i].id + '</p>' + 
							'<div class="worker-info">' + 
								'<p class="nick">' + answer[i].nick + '</p>' + 
								'<p class="worker-rank">' + (answer[i].rank === -1 ? 'Не работает' : (answer[i].rank === -2 ? 'Работает' : GID_ranks[answer[i].rank][0])) + '</p>' + 
								'<div class="uniform-slider"><div class="slider slider3"><div class="sliderContent">' + 
									'<div class="item">' +
										'<button class="btn btn-mini btn-mini-lspd" onclick="mp.trigger(`GID:bustUpPlayer`, ' + answer[i].id + ')">' + 
											'<span class="white-text">' +
												'<span class="btn-text-lspd">Повысить</span>' +
											'</span>' +
										'</button>' +
									'</div>' + 
									'<div class="item">' +
										'<button class="btn btn-mini btn-mini-lspd" onclick="mp.trigger(`GID:bustDownPlayer`, ' + answer[i].id + ')">' + 
											'<span class="white-text">' +
												'<span class="btn-text-lspd">Понизить</span>' +
											'</span>' +
										'</button>' +
									'</div>' + 
								'</div></div></div>' +
								'<div class="work-slider"><div class="slider slider3"><div class="sliderContent">' +
									'<div class="item">' +
										'<button class="btn btn-mini btn-mini-lspd btn-mini-white" onclick="mp.trigger(`GID:addPlayer`, ' + answer[i].id + ', `' + (answer[i].work ? 'Уволить' : 'Нанять') + '`)">' + 
											'<span>' + (answer[i].work ? 'Уволить' : 'Нанять') + '</span>' +
										'</button>' +
									'</div>' + 
								'</div></div></div>' +
							'</div>' +						
						'</li>'
		if(lastMyHTML !== newHTML){ 
			global.gid.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${newHTML}');`);
			global.gid.browser.execute(`$(".second-scroll").niceScroll({
				cursorcolor:"#e7e7e7",
				hidecursordelay: 550,
				cursorfixedheight: 118,
				cursorwidth: "24px",
				horizrailenabled: false
			});`);
			global.gid.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		}
		lastMyHTML = newHTML;
	},
	'closeGidBrowser': () => {
		mp.gui.cursor.show(false, false);
		global.gid.browserIsOpen = false;
		global.gid.browser.destroy();
	},
	'GID:setnewrank': (rank) => {
		global.localplayer.data.faction_rank = rank;
		if(global.gid.browserIsOpen){
			global.gid.browserIsOpen = true;
			global.gid.browser.destroy();
			global.gid.browser = mp.browsers.new('package://cef/faction/GID.html');
			if(global.localplayer.data.faction_rank < 1)
				global.gid.browser.execute("info.setGlava(false);");
			global.gid.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${lastMyHTML}');`);
			global.gid.browser.execute(`$(".second-scroll").niceScroll({
				cursorcolor:"#e7e7e7",
				hidecursordelay: 550,
				cursorfixedheight: 118,
				cursorwidth: "24px",
				horizrailenabled: false
			});`);
			global.gid.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		}
		global.localplayer.data.faction = 'GID';
		global.hud.execute(`interactionWithPlayer.pol=true`);
	},
	'GID:setworkFalse': () => {
		if(global.gid.browserIsOpen){
			mp.gui.cursor.show(false, false);
			global.gid.browserIsOpen = false;
			global.gid.browser.destroy();
		}
		global.localplayer.data.faction = 'None';
		global.hud.execute(`interactionWithPlayer.pol=false`);
	},
});