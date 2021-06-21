
mp.events.add('setText', (txt, ll) => {
	if(global.localplayer.data.login) return;
	global.auth.execute(`auth.txt="${txt}"`);
	global.auth.execute(`registr.txt="${txt}"`);
});

mp.events.add('regEnd', () => {
	global.auth.execute(`registr.show=0`);
	global.auth.execute(`auth.show=1`);
	global.auth.execute(`registr.txt=""`);
});

mp.events.add('loginFunction', (login, pas) => {
	if(global.localplayer.data.login) return;
	if(pas.length == 0 || login.length == 0) return mp.events.call('setText', "Заполните поля!", true);
	mp.events.call('setText', "Заполните поля!", false);
	mp.storage.data.login = login;
	mp.storage.data.password = pas;
	mp.events.callRemote('login', login, pas);
});

mp.events.add('register', (login, email, pas) => {
	if(global.localplayer.data.login) return;
	if(!email.includes("@")) return mp.events.call('setText', "Почта введена неверно", false);
	if(pas.length == 0 || login.length == 0 || email.length == 0) return mp.events.call('setText', "Заполните поля!", false);
	if(pas.length < 8) return mp.events.call('setText', "Пароль слишком короткий!", false);
	mp.events.callRemote('register', login, email, pas);
	global.auth.execute(`registr.txt="${login}"`);
});