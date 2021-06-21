const controlsIds =
{
	F5: 167,
	W: 32, //232
	S: 33, //31, 219, 233, 268, 269
	A: 34, //234
	D: 35, //30, 218, 235, 266, 267
	Space: 321,
	LCtrl: 326
};

global.fly = { flying: false, f: 1.0, w: 1.0, h: 1.0 };
global.gameplayCam = mp.cameras.new("gameplay");

mp.events.add('admin_fly', () => {
	let controls = mp.game.controls;
	fly.flying = !fly.flying;
	const player = mp.players.local;
	
	player.setInvincible(fly.flying);
	player.freezePosition(fly.flying);
	player.setAlpha(fly.flying ? 0 : 255);
	
	if(!fly.flying
		&& !controls.isControlPressed(0, controlsIds.Space))
	{
		let position = mp.players.local.position;
		position.z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
		mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
	}
	mp.events.call('SendAlert', `Полет ${fly.flying ? "Включен" : "Выключен"}`, fly.flying ? 'green': 'red')
});

mp.events.add("render", () =>
{
	let controls = mp.game.controls;
	let fly = global.fly;
	const direction = global.gameplayCam.getDirection();
	if(controls.isControlJustPressed(0, controlsIds.F5)){}
	else if(fly.flying)
	{
		let updated = false;
		let position = mp.players.local.position;
		
		if(controls.isControlPressed(0, controlsIds.W))
		{
			if(fly.f < 8.0)
				fly.f *= 1.025;	
			
			position.x += direction.x * fly.f;
			position.y += direction.y * fly.f;
			position.z += direction.z * fly.f;
			updated = true;
		}
		else if(controls.isControlPressed(0, controlsIds.S))
		{
			if(fly.f < 8.0)
				fly.f *= 1.025;	
			
			position.x -= direction.x * fly.f;
			position.y -= direction.y * fly.f;
			position.z -= direction.z * fly.f;
			updated = true;
		}
		else
		{
			fly.f = 1.0;
		}
		
		if(controls.isControlPressed(0, controlsIds.A))
		{				
			if(fly.l < 8.0)
				fly.l *= 1.025;	
		
			position.x += (-direction.y) * fly.l;
			position.y += direction.x * fly.l;
			updated = true;
		}
		else if(controls.isControlPressed(0, controlsIds.D))
		{
			if(fly.l < 8.0)
				fly.l *= 1.05;
		
			position.x -= (-direction.y) * fly.l;
			position.y -= direction.x * fly.l;
			updated = true;
		}
		else
		{
			fly.l = 1.0;
		}
		
		if(controls.isControlPressed(0, controlsIds.Space))
		{
			if(fly.h < 8.0)
				fly.h *= 1.025;	
			
			position.z += fly.h;
			updated = true;
		}
		else if(controls.isControlPressed(0, controlsIds.LCtrl))
		{
			if(fly.h < 8.0)
				fly.h *= 1.05;	
			
			position.z -= fly.h;
			updated = true;
		}
		else
		{
			fly.h = 1.0;
		}
		
		if(updated)
		{
			mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
		}
	}
});