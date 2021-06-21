const animations = require('../../configs/animations/animations.json');

mp.events.add({
	"animation:play" : (player, item_id, anim_id) => {
		if(player.data.cuff === true || player.data.tie === true) return;
		let item = animations[item_id];
		if(item === undefined) return;
		let anim = item[anim_id];
		if(anim === undefined) return;
		let [dict, name, speed, flag] = anim;
		player.playAnimation(dict, name, speed, flag);
	},	
	"animation:stop" : (player) => {
		if(player.data.cuff === true || player.data.tie === true) return;
		player.stopAnimation();
	},
});