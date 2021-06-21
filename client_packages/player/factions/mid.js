setInterval(function(){updateMid();},1000);
global.mid = [];
global.mid.browserIsOpen = false;
function updateMid() {
	if(!global.mid.browserIsOpen) return;
	mp.events.callRemote('startUpdatingMidBrowser');
};
var lastMyHTML = '';
var MID_ranks = {
	0: ['Сотрудник', 50000],
	1: ['Глава СБ', 150000],
	2: ['Зам. губернатора', 250000],
	3: ['Губернатор', 300000],
};

mp.events.add({
	'showMidBrowser': () => {
		global.mid.browser = mp.browsers.new('package://cef/faction/MID.html');
		if(global.localplayer.data.faction_rank < 3)
			global.mid.browser.execute("info.setGlava(false);");
		global.mid.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${lastMyHTML}');`);
		global.mid.browser.execute(`$(".second-scroll").niceScroll({
			cursorcolor:"#e7e7e7",
			hidecursordelay: 550,
			cursorfixedheight: 118,
			cursorwidth: "24px",
			horizrailenabled: false
		});`);
		global.mid.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		global.mid.browserIsOpen = true;
		mp.gui.cursor.show(true, true);
	},
	'MID:sendNews': (msg) => {
		if(!global.mid.browserIsOpen) return;
		mp.events.callRemote('mid:addNews', msg);
	},
	'MID:UpdateNewsBox': (answer) => {
		if(!global.mid.browserIsOpen) return;
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
		global.mid.browser.execute(`$('.news-box').html(''); $('.news-box').append('${newHTML}');`);
	},
	'MID:updatePlayerInfo': (data) => {
		if(!global.mid.browserIsOpen) return;
		data = JSON.parse(data);
		let html = '<p class="info-id">ID: ' + data.id + '</p>' + 
				   '<p class="info-nick">' + global.localplayer.data.nickname + '</p>' +
				   '<p class="lvl-title">Уровень</p>' +
				   '<p class="lvl-desc">' + data.level + '</p>' +
				   '<p class="rank-title">Ранг</p>' + 
				   '<p class="rank-desc">' + MID_ranks[data.rank][0] + '</p>'
		global.mid.browser.execute(`$('.info-text').html(''); 
									   $('.info-text').append('${html}');`);
	},
	'MID:addPlayer': (player_id, status) => {
		if(!global.mid.browserIsOpen) return;
		if(status === 'Уволить')
		{
			mp.events.callRemote('mid:deletePlayer', player_id);
		}else{
			mp.events.callRemote('mid:addPlayer', player_id);
		}
	},
	'MID:bustUpPlayer': (player_id) => {
		if(!global.mid.browserIsOpen) return;
		mp.events.callRemote('mid:bustUpPlayer', player_id);		
	},
	'MID:bustDownPlayer': (player_id) => {
		if(!global.mid.browserIsOpen) return;
		mp.events.callRemote('mid:bustDownPlayer', player_id);		
	},
	'MID:updateWorkerList': (answer) => {
		if(!global.mid.browserIsOpen) return;
		answer = JSON.parse(answer);
		let newHTML = '';
		for(let i=0; i<answer.length; i++)
			newHTML += '<li class="worker">' +
							'<p class="worker-id">ID: ' + answer[i].id + '</p>' + 
							'<div class="worker-info">' + 
								'<p class="nick">' + answer[i].nick + '</p>' + 
								'<p class="worker-rank">' + (answer[i].rank === -1 ? 'Не работает' : (answer[i].rank === -2 ? 'Работает' : MID_ranks[answer[i].rank][0])) + '</p>' + 
								'<div class="uniform-slider"><div class="slider slider3"><div class="sliderContent">' + 
									'<div class="item">' +
										'<button class="btn btn-mini" onclick="mp.trigger(`MID:bustUpPlayer`, ' + answer[i].id + ')">' + 
											'<span class="white-text">' +
												'<span class="btn-text-gradient">Повысить</span>' +
											'</span>' +
										'</button>' +
									'</div>' + 
									'<div class="item">' +
										'<button class="btn btn-mini" onclick="mp.trigger(`MID:bustDownPlayer`, ' + answer[i].id + ')">' + 
											'<span class="white-text">' +
												'<span class="btn-text-gradient">Понизить</span>' +
											'</span>' +
										'</button>' +
									'</div>' + 
								'</div></div></div>' +
								'<div class="work-slider"><div class="slider slider3"><div class="sliderContent">' +
									'<div class="item">' +
										'<button class="btn btn-mini btn-mini-white" onclick="mp.trigger(`MID:addPlayer`, ' + answer[i].id + ', `' + (answer[i].work ? 'Уволить' : 'Нанять') + '`)">' + 
											'<span>' + (answer[i].work ? 'Уволить' : 'Нанять') + '</span>' +
										'</button>' +
									'</div>' + 
								'</div></div></div>' +
							'</div>' +						
						'</li>'
		if(lastMyHTML !== newHTML){ 
			global.mid.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${newHTML}');`);
			global.mid.browser.execute(`$(".second-scroll").niceScroll({
				cursorcolor:"#e7e7e7",
				hidecursordelay: 550,
				cursorfixedheight: 118,
				cursorwidth: "24px",
				horizrailenabled: false
			});`);
			global.mid.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		}
		lastMyHTML = newHTML;
	},
	'closeMidBrowser': () => {
		mp.gui.cursor.show(false, false);
		global.mid.browserIsOpen = false;
		global.mid.browser.destroy();
	},
	'MID:setnewrank': (rank) => {
		global.localplayer.data.faction_rank = rank;
		if(global.mid.browserIsOpen){
			global.mid.browserIsOpen = true;
			global.mid.browser.destroy();
			global.mid.browser = mp.browsers.new('package://cef/ambandlspd/MID.html');
			if(global.localplayer.data.faction_rank < 3)
				global.mid.browser.execute("info.setGlava(false);");
			global.mid.browser.execute(`$('.workers-list').html(''); $('.workers-list').append('${lastMyHTML}');`);
			global.mid.browser.execute(`$(".second-scroll").niceScroll({
				cursorcolor:"#e7e7e7",
				hidecursordelay: 550,
				cursorfixedheight: 118,
				cursorwidth: "24px",
				horizrailenabled: false
			});`);
			global.mid.browser.execute(`$('.slider3').mobilyslider({
				transition: 'fade',
				animationSpeed: 300,
				bullets: false,
				arrows: true,
				arrowsHide: false
			});`);
		}
		global.localplayer.data.faction = 'Mayoralty';
	},
	'MID:setworkFalse': () => {
		if(global.mid.browserIsOpen){
			mp.gui.cursor.show(false, false);
			global.mid.browserIsOpen = false;
			global.mid.browser.destroy();
		}
		global.localplayer.data.faction = 'None';
	},
});